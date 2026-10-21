import json
import pathlib
import re
import time
import urllib.parse
import urllib.request

HERE = pathlib.Path(__file__).parent
OUT = HERE / "photos"
UA = "TagalogLittleByLittle/1.0 (personal language learning site)"
FREE = re.compile(r"^(cc0|cc[- ]by(-sa)?[- ]?\d|public domain|pd)", re.I)

DISHES = {
    "adobo": "Philippine adobo chicken",
    "sinigang": "sinigang",
    "lechon": "lechon Philippines",
    "karekare": "kare-kare",
    "sisig": "sisig",
    "pancit": "pancit",
    "lumpia": "lumpiang shanghai",
    "tapsilog": "tapsilog",
    "bulalo": "bulalo",
    "halohalo": "halo-halo",
    "bibingka": "bibingka",
    "turon": "turon",
}


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def clean(html):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html or "")).strip()


def search(query):
    params = {
        "action": "query", "format": "json", "generator": "search", "gsrnamespace": "6",
        "gsrsearch": f"filetype:bitmap {query}", "gsrlimit": "12", "prop": "imageinfo",
        "iiprop": "url|size|mime|extmetadata", "iiurlwidth": "900",
    }
    data = json.loads(get("https://commons.wikimedia.org/w/api.php?" + urllib.parse.urlencode(params)))
    pages = sorted(data.get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 99))
    found = []
    for p in pages:
        info = (p.get("imageinfo") or [{}])[0]
        meta = info.get("extmetadata", {})
        lic = clean(meta.get("LicenseShortName", {}).get("value"))
        if info.get("mime") not in ("image/jpeg", "image/png") or info.get("width", 0) < 600 or not FREE.match(lic):
            continue
        found.append({"file": p["title"], "thumb": info.get("thumburl"), "page": info.get("descriptionurl"),
                      "author": clean(meta.get("Artist", {}).get("value")) or "Unknown", "license": lic})
        if len(found) == 3:
            break
    return found


def main():
    OUT.mkdir(exist_ok=True)
    credits = {}
    for dish, query in DISHES.items():
        try:
            results = search(query)
        except Exception as e:
            print(f"{dish}: search failed ({e})")
            continue
        for i, r in enumerate(results, 1):
            name = f"{dish}_{i}.jpg"
            try:
                (OUT / name).write_bytes(get(r["thumb"]))
                credits[name] = r
                print(f"{name}  {r['license']}  {r['author'][:40]}")
            except Exception as e:
                print(f"{name}: download failed ({e})")
            time.sleep(0.5)
        if not results:
            print(f"{dish}: nothing found")
    (OUT / "credits.json").write_text(json.dumps(credits, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\nDone: {len(credits)} photos in {OUT}")


main()
