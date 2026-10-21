import asyncio
import json
import pathlib
import re
import sys

try:
    import edge_tts
except ImportError:
    sys.exit("edge-tts is missing. Run: pip install edge-tts")

HERE = pathlib.Path(__file__).parent
OUT = HERE.parent / "mp3"
VOICE = "fil-PH-BlessicaNeural"
FIXED = HERE / "pronunciation_done.json"

PRONUNCIATION = {
    r"\bate\b": "Ahte",
}


def respell(text):
    for pattern, spelling in PRONUNCIATION.items():
        text = re.sub(pattern, spelling, text, flags=re.I)
    return text


async def record(key, text, sem, done):
    f = OUT / f"{key}.mp3"
    spoken = respell(text)
    needs_fix = spoken != text and done.get(key) != spoken
    if f.exists() and f.stat().st_size > 1000 and not needs_fix:
        return "skip"
    text = spoken
    variants = [(text, "-10%"), (text, "+0%"), (text.rstrip("!.?") + ".", "-5%"),
                (text.replace("!", ",").rstrip(",") + ".", "+0%"), ("... " + text, "-10%"), (text.lower(), "+0%")]
    async with sem:
        for attempt in range(6):
            t, rate = variants[attempt % len(variants)]
            try:
                await edge_tts.Communicate(t, VOICE, rate=rate).save(str(f))
                if f.stat().st_size > 1000:
                    if needs_fix:
                        done[key] = spoken
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
    done = json.loads(FIXED.read_text(encoding="utf-8")) if FIXED.exists() else {}
    sem = asyncio.Semaphore(2)
    print(f"Recording {len(phrases)} phrases with {VOICE}...")
    res = await asyncio.gather(*(record(k, t, sem, done) for k, t in phrases.items()))
    FIXED.write_text(json.dumps(done, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"Done: {res.count('ok')} new, {res.count('skip')} already there, {res.count('fail')} failed.")
    if res.count("fail"):
        print("Run it again to retry the missing ones.")


asyncio.run(main())
