function fillVars(s) {
  const p = S.profile, age = parseInt(p.age, 10) >= 1 && parseInt(p.age, 10) <= 99 ? parseInt(p.age, 10) : 28;
  return String(s).replace(/\{NAME\}/g, p.name || "Alex").replace(/\{NICK\}/g, p.nick || "Lex").replace(/\{AGE_TL\}/g, ageTL(age)).replace(/\{AGE\}/g, age)
    .replace(/\{FROM\}/g, p.from || "France").replace(/\{GREW\}/g, p.grew || "Madrid");
}
function runScene(id, onDone) {
  const sc = SCENES.find(s => s.id === id), body = openShell(sc.tl + " · " + sc.title);
  const total = sc.steps.filter(s => s.prompt).length;
  let i = 0, done = 0, clean = 0;
  SESSION.st = { scene: id };
  body.innerHTML = `${technique("Role-play · context + choice")}<div class="setup"><div class="row" style="justify-content:space-between;margin-bottom:6px"><span class="plate">${esc(sc.time)}</span><label class="small row" style="gap:6px;cursor:pointer"><input type="checkbox" id="showen" ${S.settings.showEn ? "checked" : ""}> Show English</label></div>${esc(sc.setup)}</div><div class="chat" id="chat"></div><div id="choices"></div>`;
  const chat = $("#chat", body), choices = $("#choices", body);
  $("#showen", body).addEventListener("change", e => { S.settings.showEn = e.target.checked; save(); $$(".bubble.npc .en", chat).forEach(x => x.hidden = !S.settings.showEn); });
  function npc(s) {
    const c = CAST[s.who], tl = fillVars(s.tl);
    chat.insertAdjacentHTML("beforeend", `<div class="npcrow"><span class="avatar${c.hue === "sea" || c.hue === "sky" ? " alt" : ""}" aria-hidden="true">${esc(c.name.split(" ").pop().charAt(0))}</span><div class="bubble npc" data-act="revealen"><span class="who">${esc(c.name)} · ${esc(c.role)}</span><div class="brow"><span class="tl">${esc(tl)}</span>${playText(tl)}</div><span class="en" ${S.settings.showEn ? "" : "hidden"}>${esc(fillVars(s.en))}</span>${s.gloss ? `<span class="gl">${esc(s.gloss)}</span>` : ""}</div></div>${s.act ? `<p class="act">${esc(s.act)}</p>` : ""}`);
    speak(tl); scrollBottom();
  }
  function step() {
    setBar(done, total);
    if (i >= sc.steps.length) return end();
    const s = sc.steps[i];
    if (!s.prompt) { npc(s); i++; return setTimeout(step, 650); }
    let tries = 0;
    choices.innerHTML = `<p class="q small muted" style="font-weight:700;margin:6px 0 10px">${esc(fillVars(s.prompt))}</p><div class="opts">${shuffle(s.opts.map((o, k) => ({ o, k }))).map(({ o, k }, n) => `<button class="opt" data-k="${k}"><span class="k">${n + 1}</span><span class="t"><span class="tl">${esc(fillVars(o.t))}</span>${S.settings.showEn ? `<span class="en">${esc(fillVars(o.en))}</span>` : ""}</span></button>`).join("")}</div><div id="sfb"></div>`;
    scrollBottom();
    $$(".opt", choices).forEach(b => b.addEventListener("click", () => {
      const o = s.opts[+b.dataset.k], t = fillVars(o.t);
      const fb = $("#sfb", choices);
      if (o.r === "bad") { tries++; b.classList.add("wrong"); b.disabled = true; fb.innerHTML = feedback("bad", "Hmm, not that one.", `<p class="small">${esc(fillVars(o.fb))}</p>`); scrollBottom(); return; }
      $$(".opt", choices).forEach(x => x.disabled = true);
      b.classList.add(o.r === "good" ? "right" : "meh");
      if (!tries && o.r === "good") { clean++; addXP(10, b); } else addXP(4, b);
      done++;
      speak(t);
      fb.innerHTML = feedback(o.r === "good" ? "good" : "ok", o.r === "good" ? "Tama!" : "That works, but…", `<p class="small">${esc(fillVars(o.fb))}</p>`) + contBtn();
      const cb = $("[data-cont]", fb); cb.focus({ preventScroll: true }); scrollBottom();
      cb.addEventListener("click", () => {
        choices.innerHTML = "";
        chat.insertAdjacentHTML("beforeend", `<div class="bubble me"><span class="who">You</span><div class="brow"><span class="tl">${esc(t)}</span>${playText(t)}</div><span class="en">${esc(fillVars(o.en))}</span></div>`);
        i++; setTimeout(step, 400);
      }, { once: true });
    }));
  }
  function end() {
    setBar(1, 1);
    const ratio = total ? clean / total : 1, stars = ratio >= .9 ? 3 : ratio >= .6 ? 2 : 1;
    S.scenes[id] = Math.max(S.scenes[id] || 0, stars); save();
    if (onDone) onDone();
    const nx = onDone ? nextStep() : null; SESSION.after = nx ? () => startStep(nx.id) : null;
    choices.innerHTML = `<div class="result" style="margin-top:20px"><div style="transform:scale(1.8);margin:10px 0">${starsHTML(stars)}</div><h2>${stars === 3 ? "Ang galing mo! You're great." : stars === 2 ? "Magaling! Well done." : "Kaya mo 'yan! You can do it."}</h2>
      <p class="muted">${clean} of ${total} replies were the best choice on the first try.</p><div class="s-foot"><button class="btn" data-act="scene" data-id="${id}">${IC.repeat} Replay</button>${nx ? `<button class="btn" data-act="close-session">Done</button><button class="btn primary" data-act="after" data-cont>Next step ${IC.arrow}</button>` : `<button class="btn primary" data-act="close-session" data-cont>Done</button>`}</div></div>`;
    scrollBottom(); planHook();
  }
  step();
}

const JOBS = [["guro", "guro", "teacher"], ["estudyante", "estudyante", "student"], ["doktor", "doktor|doktora", "doctor"], ["inhinyero", "inhinyero", "engineer"], ["mangaawit", "mang-aawit", "singer"], ["abogado", "abogado|abogada", "lawyer"], ["negosyante", "negosyante", "businessperson"], ["other", "", "something else"]];
const HOBBIES = ["pagbabasa", "pagluluto", "paglalakbay", "pagpipinta", "pagsusulat", "paghahalaman", "paghahiking", "pagkakamping", "pagkanta"];
const FEELS = [["masaya", "Masaya", "happy"], ["nasasabik", "Nasasabik", "excited"], ["pagod", "Pagod", "tired"], ["antok", "Antok", "sleepy"], ["gutom", "Gutom", "hungry"], ["nahihiya", "Nahihiya", "shy"]];
function jobWord(p) {
  const j = JOBS.find(x => x[0] === p.job); if (!j) return null;
  if (j[0] === "other") return p.jobOther ? { tl: p.jobOther, en: p.jobOther } : null;
  const forms = j[1].split("|"); return { tl: forms[p.gender === "f" && forms[1] ? 1 : 0], en: j[2] };
}
const listTL = a => a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " at " + a[a.length - 1];
const listEN = a => a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
function introLines() {
  const p = S.profile, h = new Date().getHours(), L = [];
  const g = h < 11 ? ["Magandang umaga!", "Good morning!"] : h < 13 ? ["Magandang tanghali!", "Good noon!"] : h < 18 ? ["Magandang hapon!", "Good afternoon!"] : ["Magandang gabi!", "Good evening!"];
  L.push({ tl: g[0], en: g[1] });
  if (p.name) L.push({ tl: `Ako si ${p.name}.`, en: `I am ${p.name}.`, q: "pangalan" });
  if (p.full) L.push({ tl: `Ang buong pangalan ko ay ${p.full}.`, en: `My full name is ${p.full}.`, q: "buong" });
  L.push(p.nick ? { tl: `Ang palayaw ko ay ${p.nick}.`, en: `My nickname is ${p.nick}.`, q: "palayaw" } : { tl: "Wala akong palayaw.", en: "I don't have a nickname.", q: "palayaw" });
  if (ageTL(p.age)) L.push({ tl: ageTL(p.age) + " ako.", en: `I am ${parseInt(p.age, 10)} years old.`, q: "ilangtaon" });
  if (p.from) L.push({ tl: `Taga ${p.from} ako.`, en: `I'm from ${p.from}.`, q: "tagasaan" });
  if (p.born) L.push({ tl: `Ipinanganak ako sa ${p.born}.`, en: `I was born in ${p.born}.`, q: "pinanganak" });
  if (p.grew) L.push({ tl: `Lumaki ako sa ${p.grew}.`, en: `I grew up in ${p.grew}.`, q: "lumaki" });
  const j = jobWord(p); if (j) L.push({ tl: `Ako ay ${j.tl}.`, en: `I am ${/^[aeiou]/i.test(j.en) ? "an" : "a"} ${j.en}.`, q: "trabaho" });
  if (p.hobbies.length) { const hs = p.hobbies.filter(x => ITEMS[x]); L.push({ tl: `Hilig ko ang ${listTL(hs.map(x => ITEMS[x].tl))}.`, en: `My ${hs.length > 1 ? "hobbies are" : "hobby is"} ${listEN(hs.map(x => ITEMS[x].en))}.`, q: "hilig" }); }
  const f = FEELS.find(x => x[0] === p.feel); if (f) L.push({ tl: `${f[1]} ako ngayon.`, en: `I'm ${f[2]} today.`, q: "nararamdaman", gloss: "ngayon = now, today" });
  L.push({ tl: "Ikinagagalak kitang makilala!", en: "Nice to meet you!" });
  return L;
}
let fadeLevel = 0, fadeSeed = [];
function viewIntro() {
  const p = S.profile;
  return `${speakHead("intro")}<p class="muted" style="margin-bottom:20px;max-width:62ch">Fill in your details and your introduction writes itself. Listen to it, then hide the words step by step until you can say it all from memory.</p>
    <div class="builder">
      <form id="introform" autocomplete="off">
        <div class="two"><label class="f" for="pf-name">Name<input id="pf-name" data-k="name" type="text" value="${esc(p.name)}" placeholder="Maria"></label>
        <label class="f" for="pf-nick">Nickname<input id="pf-nick" data-k="nick" type="text" value="${esc(p.nick)}" placeholder="Leave empty if none"></label></div>
        <label class="f" for="pf-full">Full name<input id="pf-full" data-k="full" type="text" value="${esc(p.full)}" placeholder="Maria Santos"></label>
        <div class="two"><label class="f" for="pf-age">Age<input id="pf-age" data-k="age" type="number" min="1" max="99" value="${esc(p.age)}" placeholder="28"></label>
        <label class="f" for="pf-from"><span>Where you're from <span class="h">· country or city</span></span><input id="pf-from" data-k="from" type="text" value="${esc(p.from)}" placeholder="France"></label></div>
        <div class="two"><label class="f" for="pf-born">Born in<input id="pf-born" data-k="born" type="text" value="${esc(p.born)}" placeholder="Madrid"></label>
        <label class="f" for="pf-grew">Grew up in<input id="pf-grew" data-k="grew" type="text" value="${esc(p.grew)}" placeholder="Lyon"></label></div>
        <div class="two"><label class="f" for="pf-job">Job<select id="pf-job" data-k="job"><option value="">Choose…</option>${JOBS.map(j => `<option value="${j[0]}" ${p.job === j[0] ? "selected" : ""}>${j[1] ? esc(j[1].replace("|", " / ")) + " · " : ""}${esc(j[2])}</option>`).join("")}</select></label>
        <label class="f" for="pf-gender"><span>Word form <span class="h">· doktor/a, abogado/a</span></span><select id="pf-gender" data-k="gender"><option value="f" ${p.gender === "f" ? "selected" : ""}>Feminine (-a)</option><option value="m" ${p.gender === "m" ? "selected" : ""}>Masculine (-o)</option></select></label></div>
        <label class="f" for="pf-jobother" ${p.job === "other" ? "" : "hidden"} id="jobotherwrap">Your job, in English (Taglish is fine)<input id="pf-jobother" data-k="jobOther" type="text" value="${esc(p.jobOther)}" placeholder="IT engineer"></label>
        <fieldset style="border:0;padding:0;margin:0;display:grid;gap:8px"><legend class="f" style="font-weight:700;font-size:14px;margin-bottom:6px">Hobbies</legend><div class="chips">${HOBBIES.map(h => `<label><input type="checkbox" data-hobby="${h}" ${p.hobbies.includes(h) ? "checked" : ""}><span>${esc(ITEMS[h].tl)}</span></label>`).join("")}</div></fieldset>
        <fieldset style="border:0;padding:0;margin:0;display:grid;gap:8px"><legend class="f" style="font-weight:700;font-size:14px;margin-bottom:6px">How you feel today</legend><div class="chips">${FEELS.map(f => `<label><input type="radio" name="feel" data-feel="${f[0]}" ${p.feel === f[0] ? "checked" : ""}><span>${f[1]}</span></label>`).join("")}</div></fieldset>
      </form>
      <div class="introout" id="introout"></div>
    </div>`;
}
function drawIntro() {
  const box = $("#introout"); if (!box) return;
  const L = introLines();
  let wi = 0;
  const lines = L.map((l, k) => {
    const words = l.tl.split(" ").map(w => { const idx = wi++; const hid = fadeSeed.length && fadeSeed.indexOf(idx) < Math.round(fadeSeed.length * fadeLevel / 4) && fadeLevel > 0; return `<span class="w${hid ? " hid" : ""}">${esc(w)}</span>`; }).join(" ");
    return `<div class="iline">${playBtn(`data-act="saytext" data-text="${esc(l.tl)}"`, "Play")}<div class="t"><b>${words}</b><span>${esc(l.en)}${l.gloss ? " · " + esc(l.gloss) : ""}</span></div></div>`;
  }).join("");
  if (fadeSeed.length !== wi) { fadeSeed = shuffle([...Array(wi).keys()]); }
  const qs = L.filter(l => l.q).length;
  box.innerHTML = `<span class="eyebrow">Ang pagpapakilala ko · my introduction</span><div class="fade">${lines}</div>
    <div class="row"><button class="btn cream" data-act="introplay">${IC.play} Play all</button><button class="btn" data-act="introfade">${fadeLevel >= 4 ? IC.repeat + " Show all words" : "Hide more words (" + fadeLevel + "/4)"}</button>
    <button class="btn" data-act="interview" ${qs ? "" : "disabled"}>${IC.mic} Interview me</button></div>
    <p class="small" style="opacity:.7">Hiding words step by step (vanishing cues) forces you to recall them instead of reading. Interview mode asks you the ${qs} questions from the lessons, in random order.</p>`;
}
function introMount() {
  const f = $("#introform"); if (!f) return;
  drawIntro();
  f.addEventListener("input", e => {
    const t = e.target, p = S.profile;
    if (t.dataset.k) { p[t.dataset.k] = t.value.trim(); if (t.dataset.k === "job") $("#jobotherwrap").hidden = t.value !== "other"; }
    if (t.dataset.hobby) p.hobbies = $$("[data-hobby]", f).filter(x => x.checked).map(x => x.dataset.hobby);
    if (t.dataset.feel) p.feel = t.dataset.feel;
    fadeSeed = []; save(); drawIntro();
  });
}
function startInterview() {
  const L = introLines().filter(l => l.q);
  const Q = { pangalan: "Anong pangalan mo?", buong: "Anong buong pangalan mo?", palayaw: "Anong palayaw mo?", ilangtaon: "Ilang taon ka na?", tagasaan: "Taga saan ka?", pinanganak: "Saan ka pinanganak?", lumaki: "Saan ka lumaki?", trabaho: "Anong trabaho mo?", hilig: "Anong hilig mo?", nararamdaman: "Anong nararamdaman mo?" };
  runQuiz("Interview", shuffle(L).map(l => ({ kind: "interview", ask: Q[l.q], askEn: ITEMS[l.q].en, ans: l.tl, ansEn: l.en, em: ITEMS[l.q].em || "" })), { requeue: false, again: startInterview });
}

const Tutor = { sample: undefined, turns: [], msgs: [], busy: false, ctl: null, scen: "free", started: false };
const TSCEN = [
  ["free", "Kuwentuhan", "Free chat about your day"],
  ["intro", "Bagong kaibigan", "Meet a new friend: name, age, origin, job, hobbies"],
  ["food", "Sa karinderya", "Order food and talk about taste"],
  ["family", "Pamilya", "Talk about your family members"],
  ["feel", "Damdamin", "How are you feeling? Use na and pa"],
  ["lola", "Si Lola", "Visit an elder: use po and opo"]];
function tutorRules() {
  const p = S.profile, sc = TSCEN.find(s => s[0] === Tutor.scen);
  const vocab = allIds().filter(id => !ITEMS[id].pat).map(id => ITEMS[id].tl).join("; ");
  return `You are "Ate Mia", a warm, encouraging Filipina Tagalog tutor chatting by text with a beginner${p.name ? ` named ${p.name}` : ""}.
The learner has studied: greetings by time of day, po/opo, introducing yourself (name, full name, nickname, age), hobbies (pag- words), taga/sa for places, jobs, gusto/ayaw, feelings (gutom, masaya, antok, pagod, takot, malungkot...), sobra and doubling (masayang masaya), family words, si vs ang, ba questions, na vs pa, food and tastes (masarap, matamis, maalat, maanghang, maasim, Ang sarap ng...!, naman), sina and ang mga.
Known vocabulary: ${vocab}.
Scenario: ${sc[1]} — ${sc[2]}.${Tutor.scen === "lola" ? " You play Lola Nena, an elderly grandmother; expect the learner to use po/opo." : ""}
Rules:
- Reply in simple, natural Tagalog (light Taglish is fine): 1 or 2 short sentences, mostly with the known vocabulary. Use at most one new word per reply, and if you do, add it to "gloss".
- End every reply with one easy question the learner can answer with what they know.
- Read the learner's latest message. If it has a Tagalog mistake (wrong word, rin/din, si/ang, na/pa, -ng/na linker, word order, a missing po with an elder), give exactly one correction. If they wrote in English, give the Tagalog way to say it as the correction. If it was correct Tagalog, fix is null and give a short Tagalog praise.
Reply with ONLY a JSON object:
{"tl":"your Tagalog reply","en":"its English translation","gloss":null or "newword = meaning","fix":null or {"wrong":"the learner's phrase","right":"corrected Tagalog","why":"one short sentence in English"},"praise":null or "2 to 4 word Tagalog praise"}`;
}
function viewTutor() {
  return `${speakHead("mia")}<p class="muted" style="margin-bottom:20px;max-width:62ch">A real back-and-forth in Tagalog. Ate Mia sticks to words you know, corrects one mistake at a time, and always asks you something back. Stuck? Write it in English.</p>
    <div class="tutor"><aside>
      <div class="tbox"><b>Choose a scene</b><div class="radios">${TSCEN.map(s => `<label><input type="radio" name="tscen" value="${s[0]}" ${Tutor.scen === s[0] ? "checked" : ""}><span><b>${s[1]}</b><br><span class="muted">${s[2]}</span></span></label>`).join("")}</div>
      <button class="btn primary" data-act="tstart">${Tutor.started ? IC.repeat + " Start over" : IC.play + " Start chatting"}</button></div>
      <div class="tbox small"><label class="row" style="gap:8px;cursor:pointer"><input type="checkbox" id="tauto" ${S.settings.tautoplay !== false ? "checked" : ""}> Read replies aloud</label><label class="row" style="gap:8px;cursor:pointer"><input type="checkbox" id="ten" ${S.settings.tshowEn !== false ? "checked" : ""}> Show English translations</label></div>
    </aside>
    <div class="tchat"><div class="tlog" id="tlog" aria-live="polite"></div>
      <form class="tinput" id="tform"><label class="sr" for="tmsg">Your message</label><textarea id="tmsg" placeholder="Sumulat sa Tagalog… (English is okay too)" disabled></textarea><button class="btn primary" id="tsend" disabled>Send</button></form></div>
    </div>`;
}
function tutorDraw() {
  const log = $("#tlog"); if (!log) return;
  const showEn = S.settings.tshowEn !== false;
  let html = "";
  if (Tutor.sample === undefined) html = `<div class="empty">Connecting to Claude…</div>`;
  else if (Tutor.sample === null) html = `<div class="empty"><b style="color:var(--ink)">Kausap isn't available here</b><p>Ate Mia runs on Claude, so she works when this page is opened in Claude while you're signed in. Everything else on the site works without her.</p><a class="btn primary" href="#speak">Try a role-play instead</a></div>`;
  else if (!Tutor.msgs.length && !Tutor.busy) html = `<div class="empty"><span class="avatar" style="width:56px;height:56px;font-size:26px">Mia</span><b style="color:var(--ink)">Ate Mia is ready</b><p>Pick a scene on the left and press Start, or just type “Kumusta po!”</p></div>`;
  html += Tutor.msgs.map(m => m.who === "me" ? `<div class="bubble me"><span class="tl">${esc(m.text)}</span></div>`
    : m.who === "fix" ? `<div class="fix"><b>Correction</b><span><s>${esc(m.wrong)}</s> → <ins>${esc(m.right)}</ins></span><span class="small">${esc(m.why)}</span></div>`
    : m.who === "err" ? `<p class="act">${esc(m.text)}</p>`
    : `<div class="npcrow"><span class="avatar" aria-hidden="true">M</span><div class="bubble npc"><span class="who">Ate Mia${m.praise ? " · " + esc(m.praise) : ""}</span><div class="brow"><span class="tl">${esc(m.tl)}</span>${playText(m.tl)}</div>${showEn ? `<span class="en">${esc(m.en)}</span>` : ""}${m.gloss ? `<span class="gl">${esc(m.gloss)}</span>` : ""}</div></div>`).join("");
  if (Tutor.busy) html += `<div class="npcrow"><span class="avatar">M</span><div class="bubble npc"><div class="typing"><i></i><i></i><i></i></div></div></div>`;
  log.innerHTML = html; log.scrollTop = log.scrollHeight;
  const ready = !!Tutor.sample && !Tutor.busy;
  $("#tmsg").disabled = !Tutor.sample; $("#tsend").disabled = !ready;
}
function tutorMount() {
  tutorDraw();
  if (Tutor.sample === undefined) tutorInit();
  $$('input[name="tscen"]').forEach(r => r.addEventListener("change", () => { Tutor.scen = r.value; }));
  $("#tauto").addEventListener("change", e => { S.settings.tautoplay = e.target.checked; save(); });
  $("#ten").addEventListener("change", e => { S.settings.tshowEn = e.target.checked; save(); tutorDraw(); });
  $("#tform").addEventListener("submit", e => { e.preventDefault(); const v = $("#tmsg").value.trim(); if (!v || Tutor.busy || !Tutor.sample) return; $("#tmsg").value = ""; tutorSend(v); });
  $("#tmsg").addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#tform").requestSubmit(); } });
}
let tutorInitP = null;
function tutorInit() {
  if (tutorInitP) return tutorInitP;
  tutorInitP = (async () => {
    if (!window.claude || typeof window.claude.use !== "function") { Tutor.sample = null; }
    else { try { Tutor.sample = await window.claude.use("sample"); } catch (e) { Tutor.sample = null; } }
    if (currentRoute() === "kausap") tutorDraw();
  })();
  return tutorInitP;
}
async function tutorSend(text) {
  if (!Tutor.sample || Tutor.busy) return;
  if (!Tutor.started) { Tutor.turns = [{ role: "user", content: tutorRules() }]; Tutor.started = true; }
  if (text) { Tutor.msgs.push({ who: "me", text }); Tutor.turns.push({ role: "user", content: text }); }
  else Tutor.turns.push({ role: "user", content: "(Start the conversation now: greet me for this scene and ask your first easy question.)" });
  Tutor.busy = true; tutorDraw();
  const turns = [Tutor.turns[0], ...Tutor.turns.slice(1).slice(-16)];
  if (turns[1] && turns[1].role === "assistant") turns.splice(1, 1);
  Tutor.ctl = new AbortController();
  try {
    const r = await Tutor.sample.json(turns, { modelTier: "quick", cache: false, signal: Tutor.ctl.signal });
    if (!r || typeof r.tl !== "string") throw { code: "invalid_json" };
    Tutor.turns.push({ role: "assistant", content: JSON.stringify(r) });
    if (r.fix && r.fix.right) Tutor.msgs.push({ who: "fix", wrong: String(r.fix.wrong || ""), right: String(r.fix.right), why: String(r.fix.why || "") });
    Tutor.msgs.push({ who: "mia", tl: r.tl, en: String(r.en || ""), gloss: r.gloss ? String(r.gloss) : "", praise: r.praise ? String(r.praise) : "" });
    if (text) addXP(5);
    if (S.settings.tautoplay !== false) speak(r.tl);
  } catch (e) {
    const c = e && e.code;
    if (c === "not_granted") { Tutor.sample = null; }
    else if (c !== "cancelled") Tutor.msgs.push({ who: "err", text: c === "rate_limited" ? "Ate Mia needs a short break. Wait a moment, then send again." : "That message didn't go through. Send it again." });
    if (text && c !== "cancelled") Tutor.turns.pop();
  }
  Tutor.busy = false;
  if (currentRoute() === "kausap") tutorDraw();
}
