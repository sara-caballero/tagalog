"use strict";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const DAY = 864e5;
const dkey = t => { const d = new Date(t); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); };
const startOfDay = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
const LESSON_BY_ID = Object.fromEntries(LESSONS.map(l => [l.id, l]));
const lessonIds = lid => LESSON_BY_ID[lid].topics.flatMap(t => t.items);
const topicOf = (lid, tid) => LESSON_BY_ID[lid].topics.find(t => t.id === tid);

const sv = (p, f) => `<svg viewBox="0 0 24 24" aria-hidden="true" ${f ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'}>${p}</svg>`;
const IC = {
  home: sv('<path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1h-5v-6h-5v6h-5a1 1 0 0 1-1-1z"/>'),
  lessons: sv('<path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v17H5.5A2.5 2.5 0 0 1 3 17.5zM21 5.5A2.5 2.5 0 0 0 18.5 3H13v17h5.5a2.5 2.5 0 0 0 2.5-2.5z"/>'),
  wordbook: sv('<rect x="4" y="3" width="13" height="18" rx="2"/><path d="M8 8h5M8 12h5M8 16h3M20 6v15"/>'),
  notebook: sv('<rect x="5" y="3" width="15" height="18" rx="2"/><path d="M9 8h7M9 12h7M9 16h5M3 7h3M3 12h3M3 17h3"/>'),
  speak: sv('<path d="M20.5 11.5a8 8 0 0 1-11.6 7.2L3.5 20.5l1.8-5.1A8 8 0 1 1 20.5 11.5z"/><path d="M8.5 11.5h.01M12.5 11.5h.01M16.5 11.5h.01"/>'),
  progress: sv('<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>'),
  play: sv('<path d="M8 5.6v12.8L18.5 12z"/>', 1),
  star: sv('<path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z"/>', 1),
  x: sv('<path d="M6 6l12 12M18 6 6 18"/>'),
  check: sv('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
  plus: sv('<path d="M12 5v14M5 12h14"/>'),
  chev: sv('<path d="m6 9 6 6 6-6"/>'),
  arrow: sv('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  back: sv('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  bulb: sv('<path d="M9 18h6M10 21.5h4M12 2.5a6.5 6.5 0 0 0-3.8 11.8c.6.5 1 1.2 1.1 2V16h5.4v-.2c.1-.8.5-1.5 1.1-2A6.5 6.5 0 0 0 12 2.5z"/>'),
  link: sv('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
  mic: sv('<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5v4"/>'),
  repeat: sv('<path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 11.5V10a4 4 0 0 1 4-4h13M7 21.5 3.5 18 7 14.5"/><path d="M20.5 12.5V14a4 4 0 0 1-4 4h-13"/>'),
  cards: sv('<rect x="3" y="6" width="13" height="15" rx="2.5"/><path d="M8 3h10.5A2.5 2.5 0 0 1 21 5.5V17"/>'),
  ear: sv('<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="2.5" y="13.5" width="4.5" height="7" rx="2"/><rect x="17" y="13.5" width="4.5" height="7" rx="2"/>'),
  pen: sv('<path d="M4 20h4L19.5 8.5a2.8 2.8 0 0 0-4-4L4 16z"/>'),
  blocks: sv('<rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><rect x="8" y="3" width="8" height="8" rx="1.5"/>'),
  pairs: sv('<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>'),
  choose: sv('<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>'),
  mix: sv('<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>'),
  trash: sv('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>')
};

const KEY = "tara-tagalog-v1";
function blank() {
  return { v: 2, cards: {}, xp: 0, streak: { last: null, count: 0 }, log: {}, scenes: {}, drills: {}, steps: {}, custom: [], notes: [], wanted: {}, time: {}, manual: {}, annot: {}, hooks: {}, exams: [], resume: null, daily: { date: "", n: 0 },
    profile: { name: "", full: "", nick: "", age: "", gender: "f", from: "", born: "", grew: "", job: "", jobOther: "", hobbies: [], feel: "" },
    settings: { rate: 0.9, voice: "", showEn: false, newPerDay: 10, dir: "tl", pcats: [], mode: "flash", goalMin: 30, goalDays: 5 }, updatedAt: 0 };
}
const BOX_DAYS = [0, 1, 3, 7, 14, 30, 60, 120, 240];
function normalize(o) {
  const b = blank(), s = Object.assign(b, o || {});
  s.profile = Object.assign(blank().profile, s.profile || {});
  s.settings = Object.assign(blank().settings, s.settings || {});
  s.streak = Object.assign(blank().streak, s.streak || {});
  s.daily = Object.assign(blank().daily, s.daily || {});
  if (!Array.isArray(s.custom)) s.custom = [];
  if (!Array.isArray(s.notes)) s.notes = [];
  if (!s.wanted || typeof s.wanted !== "object") s.wanted = {};
  if (!s.time || typeof s.time !== "object") s.time = {};
  if (!s.manual || typeof s.manual !== "object") s.manual = {};
  if (!s.annot || typeof s.annot !== "object") s.annot = {};
  if (!s.hooks || typeof s.hooks !== "object") s.hooks = {};
  if (!Array.isArray(s.exams)) s.exams = [];
  for (const [id, c] of Object.entries(s.cards)) {
    if (c && c.box == null) {
      const iv = c.iv || 0; let box = 0;
      for (let k = BOX_DAYS.length - 1; k >= 1; k--) if (iv >= BOX_DAYS[k]) { box = k; break; }
      s.cards[id] = { box, due: c.due || Date.now(), n: c.reps || 0, miss: c.lapses || 0, seen: c.seen || Date.now() };
    }
  }
  return s;
}
let S = blank();
try { const raw = localStorage.getItem(KEY); if (raw) S = normalize(JSON.parse(raw)); } catch (e) { }
let saveT = null;
function save() {
  S.updatedAt = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { }
  clearTimeout(saveT); saveT = setTimeout(cloudSave, 2500);
}

const Cloud = { ref: null, status: "local" };
async function cloudInit() {
  if (!window.claude || typeof window.claude.use !== "function") return;
  try {
    const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
    if (!db || !user) return;
    const id = await user.id(); if (!id) return;
    Cloud.ref = db.collection("data/users/" + id).doc("progress");
    const snap = await Cloud.ref.get();
    if (snap.exists) {
      const d = snap.data();
      if (d && typeof d.json === "string" && (d.updatedAt || 0) > (S.updatedAt || 0)) {
        S = normalize(JSON.parse(d.json)); syncCustom();
        try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { }
        if (!SESSION.active) render();
      }
    }
    Cloud.status = "cloud";
    if ((!snap.exists && S.updatedAt) || (snap.exists && (snap.data().updatedAt || 0) < S.updatedAt)) cloudSave();
  } catch (e) { Cloud.ref = null; Cloud.status = "local"; }
}
async function cloudSave() {
  if (!Cloud.ref) return;
  try { await Cloud.ref.set({ json: JSON.stringify(S), updatedAt: S.updatedAt }); }
  catch (e) { if (e && e.code === "invalid_argument") { Cloud.ref = null; Cloud.status = "local"; } }
}

function streakNow() { const t = dkey(Date.now()), y = dkey(Date.now() - DAY); return (S.streak.last === t || S.streak.last === y) ? S.streak.count : 0; }
function addXP(n) {
  if (!n) return;
  S.xp += n;
  const t = dkey(Date.now());
  S.log[t] = (S.log[t] || 0) + n;
  if (S.streak.last !== t) { S.streak.count = (S.streak.last === dkey(Date.now() - DAY)) ? S.streak.count + 1 : 1; S.streak.last = t; }
  const keys = Object.keys(S.log); if (keys.length > 90) keys.slice(0, keys.length - 90).forEach(k => delete S.log[k]);
  save();
}

function newToday() { return S.daily.date === dkey(Date.now()) ? S.daily.n : 0; }
function countNew() { const t = dkey(Date.now()); if (S.daily.date !== t) S.daily = { date: t, n: 0 }; S.daily.n++; }
function review(id, ok, o) {
  const now = Date.now(); let c = S.cards[id];
  if (!c) {
    countNew();
    const b0 = o && o.hinted ? 1 : 2;
    S.cards[id] = ok ? { box: b0, due: startOfDay(now) + BOX_DAYS[b0] * DAY, n: 1, miss: 0, seen: now } : { box: 0, due: now, n: 1, miss: 1, seen: now };
    save(); return;
  }
  c.n = (c.n || 0) + 1;
  if (!ok) { c.box = 0; c.due = now; c.miss = (c.miss || 0) + 1; }
  else if (c.due <= now) { c.box = c.box === 0 ? 1 : (o && o.hinted) ? c.box : Math.min(8, c.box + 1); c.due = startOfDay(now) + BOX_DAYS[c.box] * DAY; }
  save();
}
function learnResult(id, ok) {
  const now = Date.now(), c = S.cards[id];
  if (!c) { S.cards[id] = ok ? { box: 1, due: startOfDay(now) + DAY, n: 1, miss: 0, seen: now } : { box: 0, due: now, n: 1, miss: 1, seen: now }; save(); return; }
  review(id, ok);
}
function recordResult(q, id, ok) {
  if (q && q.exam) { if (!ok && S.cards[id]) { S.cards[id].due = Math.min(S.cards[id].due, Date.now()); save(); } return; }
  if (q && q.learn) learnResult(id, ok); else review(id, ok);
}
const level = id => { const c = S.cards[id]; return c ? c.box : -1; };
const dueIds = () => { const n = Date.now(); return Object.keys(S.cards).filter(id => ITEMS[id] && S.cards[id].due <= n); };
const isKnown = id => level(id) >= 5;
const isTricky = id => { const c = S.cards[id]; return !!c && (c.miss || 0) >= 3 && c.box <= 2; };
const myHook = id => (S.hooks || {})[id] || (ITEMS[id] && ITEMS[id].mn) || "";
function levelHTML(id) {
  const b = level(id);
  if (b < 0) return `<span class="lv new" title="Not practised yet">${[1, 2, 3, 4, 5].map(() => "<i></i>").join("")}</span>`;
  const on = Math.min(5, Math.ceil(b * 5 / 8));
  return `<span class="lv" title="${b === 0 ? "Still learning" : "Next review in " + BOX_DAYS[b] + " day" + (BOX_DAYS[b] > 1 ? "s" : "")}">${[1, 2, 3, 4, 5].map(k => `<i class="${k <= on ? "on" : ""}"></i>`).join("")}</span>`;
}

const CATS = [
  { id: "greet", name: "Greetings", tl: "Pagbati", topics: ["greet"] },
  { id: "polite", name: "Respect, yes and no", tl: "Po at opo", topics: ["polite"] },
  { id: "me", name: "About me", tl: "Tungkol sa akin", topics: ["intro", "origin", "taglish"] },
  { id: "hobby", name: "Hobbies", tl: "Hilig", topics: ["hobby"] },
  { id: "job", name: "Jobs", tl: "Trabaho", topics: ["job"] },
  { id: "likes", name: "Likes and dislikes", tl: "Gusto at ayaw", topics: ["gusto"] },
  { id: "feel", name: "Emotions", tl: "Damdamin", topics: ["feel"] },
  { id: "family", name: "Family", tl: "Pamilya", topics: ["family", "siang"] },
  { id: "food", name: "Food and taste", tl: "Pagkain at lasa", topics: ["food", "taste"] },
  { id: "napa", name: "Now, still, more", tl: "Na at pa", topics: ["napa"] },
  { id: "people", name: "Describing people", tl: "Tao", topics: ["plural"] }
];
const TOPIC_CAT = {}; CATS.forEach(c => c.topics.forEach(t => TOPIC_CAT[t] = c.id));
const catOf = it => it.cat || TOPIC_CAT[it.topic] || "u:My words";
function catList() {
  const out = CATS.map(c => ({ id: c.id, name: c.name, tl: c.tl }));
  const own = [...new Set(S.custom.map(w => w.cat).filter(c => c.startsWith("u:")))];
  own.forEach(c => out.push({ id: c, name: c.slice(2), tl: "Your words", own: true }));
  return out;
}
const catName = id => (catList().find(c => c.id === id) || { name: id.replace(/^u:/, "") }).name;
function syncCustom() {
  Object.keys(ITEMS).forEach(k => { if (ITEMS[k].custom) delete ITEMS[k]; });
  S.custom.forEach(w => { ITEMS[w.id] = { id: w.id, lesson: "mine", topic: "mine", cat: w.cat, tl: w.tl, en: w.en, em: w.em || "", ex: w.ex ? [w.ex, ""] : null, note: w.note || "", custom: 1 }; });
}
const allIds = () => Object.keys(ITEMS);

const qtext = it => it.pat ? { tl: it.ex[0], en: it.ex[1] } : { tl: it.tl, en: it.en };
const sylHTML = s => esc(s || "").replace(/[A-Z]{2,}/g, m => "<b>" + m.toLowerCase() + "</b>");
const SYN = [["ayoslang", "okaylang", "mabuti", "mabutipo"], ["oo", "opo"], ["gutom", "gutomako"], ["anak", "bata"], ["tagaako", "tagapilipinas"], ["akoay", "angtrabaho"],
  ["gutompaako", "oogutompa"], ["gutomnaako", "oogutomna"], ["lemon", "angasim", "asimnaman", "maasim"], ["kendi", "angtamis", "tamisnaman", "matamis"], ["chips", "angalat", "alatnaman", "maalat"],
  ["sili", "anganghang", "anghangnaman", "maanghang"], ["masarap", "sobrangmasarap", "sarapnaman", "angsarap", "sinigang"], ["kumusta", "kumustapo"], ["age28", "age28short"], ["simaria", "angnanay"],
  ["silolaana", "anglola"], ["sititarosa", "angtita"], ["masayangmasaya", "sobrangmasaya"], ["masaya", "oomasaya"], ["gustonggusto", "sobranggusto"], ["hiligko", "hobbyat"], ["pangalannanay", "angpangalannanay", "siyaaysi"]];
const SYNMAP = {}; SYN.forEach((g, i) => g.forEach(id => SYNMAP[id] = i));
const clash = (a, b) => a === b || (SYNMAP[a] != null && SYNMAP[a] === SYNMAP[b]) || norm(qtext(ITEMS[a]).en) === norm(qtext(ITEMS[b]).en) || norm(qtext(ITEMS[a]).tl) === norm(qtext(ITEMS[b]).tl);
function distractors(id, n) {
  const it = ITEMS[id], cat = catOf(it), out = [];
  const pools = [shuffle(allIds().filter(x => catOf(ITEMS[x]) === cat)), shuffle(allIds())];
  for (const pool of pools) for (const c of pool) { if (out.length >= n) return out; if (!clash(c, id) && !out.some(o => clash(o, c))) out.push(c); }
  return out;
}
const tokens = s => s.replace(/[.,!?¿¡]/g, "").split(/\s+/).filter(Boolean);
const buildable = it => !it.tl.includes("/") && (() => { const n = tokens(qtext(it).tl).length; return n >= 3 && n <= 9; })();
const typeable = it => qtext(it).tl.length <= 44 && !/^\d/.test(it.tl);
function norm(s) {
  return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[’'`\-]/g, "")
    .replace(/[.,!?¿¡…"“”]/g, " ").replace(/\bkamusta\b/g, "kumusta").replace(/\s+/g, " ").trim();
}
function lev(a, b) {
  const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let p = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; }
  return p[n];
}
function accepted(it) {
  const T = qtext(it).tl, list = [T];
  if (!it.pat) { (it.alt || []).forEach(a => list.push(a)); if (T.includes(" / ")) T.split(" / ").forEach(a => list.push(a)); }
  return list;
}
function checkTyped(it, input) {
  const u = norm(input); if (!u) return { r: "bad" };
  const acc = accepted(it).map(norm);
  if (acc.includes(u)) return { r: "good" };
  if (acc.some(a => a.replace(/\bpo\b/g, "").replace(/\s+/g, " ").trim() === u)) return { r: "good", tip: "Add po when you speak to an elder." };
  const best = Math.min(...acc.map(a => lev(a, u)));
  if (best <= (u.length > 7 ? 2 : 1)) return { r: "ok", tip: "Almost! Check the spelling." };
  return { r: "bad" };
}

const SCENE_FOR = { l1: ["katrabaho"], l2: ["pinsan"], l3: ["karinderya", "lola"] };
const STEP_MAX = 7;
const STEPS = [];
LESSONS.forEach(l => {
  l.steps = [];
  l.topics.forEach(t => {
    const n = t.items.length, parts = Math.ceil(n / STEP_MAX), size = Math.ceil(n / parts);
    for (let k = 0; k < parts; k++) {
      const ids = t.items.slice(k * size, (k + 1) * size);
      const notes = k === parts - 1 ? (t.notes || []).filter(x => x.k !== "tool") : [];
      l.steps.push({ id: `${l.id}.${t.id}.${k}`, lesson: l.id, topic: t.id, title: t.title + (parts > 1 ? ` · part ${k + 1}` : ""), tl: t.tl, ids, notes });
    }
  });
  (SCENE_FOR[l.id] || []).forEach(sid => { const sc = SCENES.find(s => s.id === sid); l.steps.push({ id: `${l.id}.scene.${sid}`, lesson: l.id, scene: sid, title: "Conversation: " + sc.title, tl: sc.tl, ids: [], notes: [] }); });
  STEPS.push(...l.steps);
});
const STEP_BY_ID = Object.fromEntries(STEPS.map(s => [s.id, s]));
const ITEM_STEPS = {}; STEPS.forEach(s => s.ids.forEach(id => (ITEM_STEPS[id] = ITEM_STEPS[id] || []).push(s.id)));
const stepDoneFor = id => (ITEM_STEPS[id] || []).some(sid => S.steps[sid]);
const inPractice = id => !!S.cards[id] || !!(ITEMS[id] && ITEMS[id].custom) || stepDoneFor(id) || !!S.wanted[id];
const nextStep = () => STEPS.find(s => !S.steps[s.id]) || null;
const lessonDone = l => l.steps.every(s => S.steps[s.id]);

let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2600); }
const NAV = [["today", "Today", IC.home], ["lessons", "Lessons", IC.lessons], ["wordbook", "Wordbook", IC.wordbook], ["notebook", "Notebook", IC.notebook], ["speak", "Speak", IC.speak], ["progress", "Progress", IC.progress]];
const NAV_OF = { practice: "wordbook", notes: "wordbook", mia: "speak", intro: "speak", about: "progress" };
function chrome() {
  const h = currentRoute(), on = NAV_OF[h] || (h.startsWith("nb-") ? "notebook" : h), due = dueIds().length;
  const link = ([k, label, ic], tab) => `<a href="#${k}" class="${on === k ? "on" : ""}" ${on === k ? 'aria-current="page"' : ""}>${ic}<span>${label}</span>${k === "wordbook" && due ? `<span class="badge" title="${due} words to review">${due}</span>` : ""}</a>`;
  $("#snav").innerHTML = NAV.map(n => link(n)).join("");
  $("#tabbar").innerHTML = NAV.map(n => link(n, 1)).join("");
  habitChrome();
}
const VIEWS = {};
function currentRoute() { const h = (location.hash || "").slice(1); return VIEWS[h] ? h : "today"; }
function render() {
  const h = currentRoute();
  $("#view").innerHTML = `<div class="view">${VIEWS[h]()}</div>`;
  chrome();
  if (h === "mia") tutorMount();
  if (h === "intro") introMount();
  if (h === "wordbook") wbFilter();
  if (h === "notebook") nbSearch();
  if (h.startsWith("nb-")) updateAge();
  if (h === "notes") pnPreview();
}
window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
