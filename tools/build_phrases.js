const fs = require("fs");
const vm = require("vm");
const path = require("path");

const root = path.join(__dirname, "..");
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "js/data.js"), "utf8") + "\nthis.ITEMS = ITEMS; this.LESSONS = LESSONS; this.DRILLS = DRILLS; this.SCENES = SCENES;", ctx);

const clean = t => String(t)
  .replace(/\p{Extended_Pictographic}|️|‍/gu, "")
  .replace(/…|_{2,}/g, " ")
  .replace(/\s\/\s/g, ", ")
  .replace(/\([^)]*\)/g, "")
  .replace(/^.*—\s*/, "")
  .replace(/\s+/g, " ")
  .trim();
const fnv = s => {
  let h = 0x811c9dc5;
  for (const c of s) { h ^= c.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, "0");
};

const phrases = new Set();
const add = t => { const c = clean(t); if (c && !/[{}]/.test(c) && /[a-z]/i.test(c)) phrases.add(c); };

for (const it of Object.values(ctx.ITEMS)) {
  add(it.say || (it.pat ? it.ex[0] : it.tl));
  if (it.ex) add(it.ex[0]);
}
for (const l of ctx.LESSONS) for (const t of l.topics) for (const n of t.notes || []) if (n.say) n.say.split(/\s*\.\.\.\s*/).forEach(add);
for (const d of ctx.DRILLS) for (const x of d.items) add(x.a === "-ng" ? x.q.replace("___", "ng") : x.q.replace("___", x.a));
for (const s of ctx.SCENES) for (const st of s.steps) { if (st.tl) add(st.tl); (st.opts || []).forEach(o => add(o.t)); }
["Magandang umaga! Kumusta ka?", "Salamat!", "Magandang umaga!", "Magandang tanghali!", "Magandang hapon!", "Magandang gabi!", "Ikinagagalak kitang makilala!", "Wala akong palayaw."].forEach(add);

const out = {};
for (const t of phrases) out[fnv(t)] = t;
fs.writeFileSync(path.join(__dirname, "phrases.json"), JSON.stringify(out, null, 1));

const have = new Set(fs.existsSync(path.join(root, "mp3")) ? fs.readdirSync(path.join(root, "mp3")).map(f => f.replace(/\.mp3$/, "")) : []);
const keys = Object.keys(out).filter(k => have.has(k)).sort();
fs.writeFileSync(path.join(root, "js/audio.js"), "const AUDIO_KEYS = " + JSON.stringify(keys) + ";\n");
console.log(`${Object.keys(out).length} phrases, ${keys.length} with audio`);
