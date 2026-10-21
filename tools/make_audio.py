import asyncio
import json
import pathlib
import sys

try:
    import edge_tts
except ImportError:
    sys.exit("edge-tts is missing. Run: pip install edge-tts")

HERE = pathlib.Path(__file__).parent
OUT = HERE.parent / "mp3"
VOICE = "fil-PH-BlessicaNeural"


async def record(key, text, sem):
    f = OUT / f"{key}.mp3"
    if f.exists() and f.stat().st_size > 1000:
        return "skip"
    variants = [(text, "-10%"), (text, "+0%"), (text.rstrip("!.?") + ".", "-5%"),
                (text.replace("!", ",").rstrip(",") + ".", "+0%"), ("... " + text, "-10%"), (text.lower(), "+0%")]
    async with sem:
        for attempt in range(6):
            t, rate = variants[attempt % len(variants)]
            try:
                await edge_tts.Communicate(t, VOICE, rate=rate).save(str(f))
                if f.stat().st_size > 1000:
                    await asyncio.sleep(0.4)
                    return "ok"
                raise RuntimeError("empty file")
            except Exception as e:
                err = e
                if f.exists():
                    f.unlink()
                await asyncio.sleep(3 * (attempt + 1))
        print(f"  failed: {text!r} ({err})")
        return "fail"


async def main():
    OUT.mkdir(exist_ok=True)
    phrases = json.loads((HERE / "phrases.json").read_text(encoding="utf-8"))
    sem = asyncio.Semaphore(2)
    print(f"Recording {len(phrases)} phrases with {VOICE}...")
    res = await asyncio.gather(*(record(k, t, sem) for k, t in phrases.items()))
    print(f"Done: {res.count('ok')} new, {res.count('skip')} already there, {res.count('fail')} failed.")
    if res.count("fail"):
        print("Run it again to retry the missing ones.")


asyncio.run(main())
