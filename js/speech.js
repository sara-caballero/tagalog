const UNITS = ["", "isa", "dalawa", "tatlo", "apat", "lima", "anim", "pito", "walo", "siyam"];
const TENS = { 1: "sampu", 2: "dalawampu", 3: "tatlumpu", 4: "apatnapu", 5: "limampu", 6: "animnapu", 7: "pitumpu", 8: "walumpu", 9: "siyamnapu" };
const TEENS = { 11: "labing-isa", 12: "labindalawa", 13: "labintatlo", 14: "labing-apat", 15: "labinlima", 16: "labing-anim", 17: "labimpito", 18: "labingwalo", 19: "labinsiyam" };
function numTL(n) {
  if (n < 10) return UNITS[n];
  if (n === 10) return "sampu";
  if (n < 20) return TEENS[n];
  const t = Math.floor(n / 10), u = n % 10;
  return u ? TENS[t] + "'t " + UNITS[u] : TENS[t];
}
const linkWord = w => /[aeiou]$/i.test(w) ? w + "ng" : /n$/i.test(w) ? w + "g" : w + " na";
function ageTL(n) {
  n = parseInt(n, 10); if (!(n >= 1 && n <= 99)) return "";
  const s = linkWord(numTL(n)) + " taon na";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const TTS = { voices: [], ok: "speechSynthesis" in window };
function rankVoice(v) {
  const l = (v.lang || "").toLowerCase(), n = (v.name || "").toLowerCase();
  let r = 0;
  if (l.startsWith("fil") || l.startsWith("tl") || /filipino|tagalog/.test(n)) r = 100;
  else if (l.startsWith("id")) r = 60; else if (l.startsWith("ms")) r = 55; else if (l.startsWith("es")) r = 50; else if (l.startsWith("it")) r = 40;
  if (/natural|online|google|premium|enhanced/.test(n)) r += 5;
  return r;
}
function loadVoices() { if (!TTS.ok) return; TTS.voices = speechSynthesis.getVoices().slice().sort((a, b) => rankVoice(b) - rankVoice(a)); }
if (TTS.ok) { loadVoices(); speechSynthesis.onvoiceschanged = () => { loadVoices(); if (currentRoute() === "progress" && !SESSION.active) render(); }; }
function voice() {
  if (!TTS.voices.length) return null;
  return TTS.voices.find(v => v.voiceURI === S.settings.voice) || TTS.voices[0];
}
const hasFilipino = () => TTS.voices.some(v => rankVoice(v) >= 100);
function cleanSpeech(t) {
  return String(t).replace(/\p{Extended_Pictographic}|️|‍/gu, "").replace(/…|_{2,}/g, " ").replace(/\s\/\s/g, ", ")
    .replace(/\([^)]*\)/g, "").replace(/\bng\b/gi, "nang").replace(/\bmga\b/gi, "manga").replace(/\s+/g, " ").trim();
}
const AUDIO = new Set(typeof AUDIO_KEYS !== "undefined" ? AUDIO_KEYS : []);
const audioClean = t => String(t).replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, "").replace(/…|_{2,}/g, " ").replace(/\s\/\s/g, ", ")
  .replace(/\([^)]*\)/g, "").replace(/^.*—\s*/, "").replace(/\s+/g, " ").trim();
const fnv = s => { let h = 0x811c9dc5; for (const c of s) { h ^= c.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, "0"); };
const hasRecording = text => AUDIO.has(fnv(audioClean(text)));
let speakingBtn = null, curAudio = null, seqToken = 0;
function stopAudio() { if (curAudio) { curAudio.onended = null; curAudio.pause(); curAudio = null; } if (TTS.ok) speechSynthesis.cancel(); }
function speak(text, opt) {
  opt = opt || {};
  if (typeof TRACK !== "undefined") TRACK.active = Date.now();
  if (!opt.seq) seqToken++;
  stopAudio();
  if (speakingBtn) speakingBtn.classList.remove("speaking");
  if (opt.btn) { speakingBtn = opt.btn; opt.btn.classList.add("speaking"); }
  const done = () => { if (opt.btn) opt.btn.classList.remove("speaking"); if (opt.onend) opt.onend(); };
  const key = fnv(audioClean(text));
  if (AUDIO.has(key)) {
    const a = new Audio("mp3/" + key + ".mp3");
    a.playbackRate = opt.slow ? 0.7 : Math.max(0.7, Math.min(1.3, S.settings.rate / 0.9));
    a.onended = a.onerror = done; curAudio = a;
    a.play().catch(() => { curAudio = null; ttsSpeak(text, opt, done); });
    return;
  }
  ttsSpeak(text, opt, done);
}
function ttsSpeak(text, opt, done) {
  if (!TTS.ok) { toast("Audio isn't available in this browser"); return; }
  const u = new SpeechSynthesisUtterance(cleanSpeech(text));
  const v = voice();
  if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "fil-PH";
  u.rate = Math.max(0.4, Math.min(1.4, (opt.slow ? 0.62 : 1) * S.settings.rate));
  u.onend = u.onerror = done;
  speechSynthesis.speak(u);
}
function speakSeq(texts) {
  const my = ++seqToken; let i = 0;
  const next = () => { if (my !== seqToken || i >= texts.length) return; speak(texts[i++], { seq: true, onend: () => setTimeout(next, 250) }); };
  next();
}
const sayText = it => it.say || (it.pat ? it.ex[0] : it.tl);
const playBtn = (attrs, label, slow) => `<button class="play${slow ? " slow" : ""}" ${attrs} aria-label="${esc(label)}" title="${esc(label)}">${slow ? '<b style="font-size:11px">½×</b>' : IC.play}</button>`;
const playItem = (id, slow) => playBtn(`data-act="say" data-id="${id}"${slow ? ' data-slow="1"' : ""}`, slow ? "Play slowly" : "Play", slow);
const playText = (txt, slow) => playBtn(`data-act="saytext" data-text="${esc(txt)}"${slow ? ' data-slow="1"' : ""}`, slow ? "Play slowly" : "Play", slow);
