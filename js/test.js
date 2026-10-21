let EXAMLOG = [];
const SKILLS = ["Vocabulary", "Listening", "Grammar", "Writing", "Conversation"];
const SKILL_TIP = {
  Vocabulary: ["Practice › Flashcards", "pmode-flash"], Listening: ["Practice › Listen", "pmode-listen"], Writing: ["Practice › Write", "pmode-write"],
  Grammar: ["the Notebook rules and their exercises", "notebook"], Conversation: ["Speak › Role-plays", "speak"]
};
const SCENE_CHOICES = SCENES.flatMap(sc => sc.steps.map((st, i) => ({ sc, st, i })).filter(x => x.st.prompt).map(x => {
  let npc = null; for (let j = x.i - 1; j >= 0; j--) if (x.sc.steps[j].who) { npc = x.sc.steps[j]; break; }
  return { sc: x.sc, npc, choice: x.st };
}));
function buildExam(scope) {
  const lessons = scope === "all" ? LESSONS.map(l => l.id) : [scope];
  const ids = lessons.flatMap(lessonIds).filter(id => !ITEMS[id].pat), used = new Set(), q = [];
  const byCat = {}; ids.forEach(id => (byCat[catOf(ITEMS[id])] = byCat[catOf(ITEMS[id])] || []).push(id));
  const pick = (n, ok) => { const cats = shuffle(Object.keys(byCat)), out = []; for (let i = 0; out.length < n && i < 400; i++) { const c = cats[i % cats.length], cand = shuffle(byCat[c]).find(x => !used.has(x) && (!ok || ok(ITEMS[x]))); if (cand) { used.add(cand); out.push(cand); } } return out; };
  const tag = (o, skill, cat) => Object.assign(o, { exam: true, skill, onAnswer: ok => EXAMLOG.push({ skill, id: o.item ? o.item.id : null, cat: cat || (o.item ? catOf(o.item) : null), drill: o.d ? o.d.id : null, ok }) });
  const big = scope === "all";
  pick(big ? 5 : 4).forEach(id => q.push(tag({ kind: "mc", item: ITEMS[id], dir: "tl2en" }, "Vocabulary")));
  pick(big ? 4 : 3).forEach(id => q.push(tag({ kind: "mc", item: ITEMS[id], dir: "en2tl" }, "Vocabulary")));
  pick(big ? 4 : 3).forEach(id => q.push(tag({ kind: "mc", item: ITEMS[id], dir: "audio" }, "Listening")));
  const drills = shuffle(DRILLS.filter(d => lessons.includes(d.lesson) || (scope !== "all" && d.lesson === "trial" && scope === "trial")));
  drills.slice(0, big ? 4 : 3).forEach(d => q.push(tag({ kind: "drill", d, x: shuffle(d.items)[0] }, "Grammar", d.title)));
  pick(big ? 3 : 2, typeable).forEach(id => q.push(tag({ kind: "type", item: ITEMS[id] }, "Writing")));
  shuffle(SCENE_CHOICES.filter(c => c.sc.lessons.some(l => lessons.includes(l)))).slice(0, big ? 3 : 2).forEach(c => q.push(tag({ kind: "situ", c }, "Conversation", c.sc.title)));
  return q;
}
RENDER.situ = (ctx, q) => {
  const { sc, npc, choice } = q.c, who = npc ? CAST[npc.who] : null;
  ctx.body.innerHTML = `${technique("Real-life situation")}<div class="setup">${esc(sc.setup)}</div>
    ${npc ? `<div class="npcrow"><span class="avatar" aria-hidden="true">${esc(who.name.split(" ").pop().charAt(0))}</span><div class="bubble npc"><span class="who">${esc(who.name)}</span><div class="brow"><span class="tl">${esc(fillVars(npc.tl))}</span>${playText(fillVars(npc.tl))}</div></div></div>` : ""}
    <p class="q small muted" style="font-weight:600">${esc(fillVars(choice.prompt))}</p>
    <div class="opts">${shuffle(choice.opts.map((o, k) => ({ o, k }))).map(({ o, k }, n) => `<button class="opt" data-k="${k}"><span class="k">${n + 1}</span><span class="t tl">${esc(fillVars(o.t))}</span></button>`).join("")}</div><div id="fb"></div>`;
  if (npc) speak(fillVars(npc.tl));
  $$(".opt", ctx.body).forEach(b => b.addEventListener("click", () => {
    const o = choice.opts[+b.dataset.k], ok = o.r === "good";
    $$(".opt", ctx.body).forEach(x => { x.disabled = true; if (choice.opts[+x.dataset.k].r === "good") x.classList.add("right"); });
    if (!ok) b.classList.add(o.r === "ok" ? "meh" : "wrong");
    ctx.answer(q, ok, ok ? 5 : 0, b);
    $("#fb", ctx.body).innerHTML = feedback(ok ? "good" : o.r === "ok" ? "ok" : "bad", ok ? "Tama!" : o.r === "ok" ? "That works, but…" : "Not quite.", `<p class="small">${esc(fillVars(o.fb))}</p>`) + contBtn();
    wireCont(ctx, $("#fb", ctx.body));
  }));
};
const levelName = p => p >= 90 ? "Excellent" : p >= 75 ? "Solid" : p >= 55 ? "Getting there" : "Keep practising";
function startExam(scope) {
  EXAMLOG = [];
  const label = scope === "all" ? "All lessons" : lessonLabel(LESSON_BY_ID[scope]) + " · " + LESSON_BY_ID[scope].title;
  runQuiz("Level test · " + label, buildExam(scope), { requeue: false, renderResult: () => examResult(scope, label) });
}
function examResult(scope, label) {
  const body = $("#sbody"), log = EXAMLOG, tot = log.length, right = log.filter(x => x.ok).length, pct = tot ? Math.round(right / tot * 100) : 0;
  const skills = {}; SKILLS.forEach(s => { const r = log.filter(x => x.skill === s); if (r.length) skills[s] = Math.round(r.filter(x => x.ok).length / r.length * 100); });
  const prev = (S.exams || []).filter(e => e.scope === scope).slice(-1)[0];
  if (!S.exams) S.exams = [];
  S.exams.push({ date: Date.now(), scope, label, pct, skills }); if (S.exams.length > 50) S.exams.shift(); save();
  const missedWords = [...new Set(log.filter(x => !x.ok && x.id).map(x => x.id))];
  const weakCats = {}; log.filter(x => !x.ok && x.id).forEach(x => { weakCats[x.cat] = (weakCats[x.cat] || 0) + 1; });
  const missedDrills = [...new Set(log.filter(x => !x.ok && x.drill).map(x => x.drill))];
  const weakest = Object.entries(skills).sort((a, b) => a[1] - b[1])[0];
  const todo = [];
  if (weakest && weakest[1] < 100) { const [where] = SKILL_TIP[weakest[0]]; todo.push(`<li><b>${esc(weakest[0])}</b> is your weakest skill (${weakest[1]}%). Spend a few minutes a day in ${esc(where)}.</li>`); }
  Object.entries(weakCats).sort((a, b) => b[1] - a[1]).slice(0, 3).forEach(([c]) => todo.push(`<li>Words in <b>${esc(catName(c))}</b> <button class="btn sm" data-act="exam-cat" data-c="${esc(c)}">Practise ${esc(catName(c))}</button></li>`));
  missedDrills.slice(0, 2).forEach(d => { const D = DRILLS.find(x => x.id === d); todo.push(`<li>The rule <b>${esc(D.title)}</b> <button class="btn sm" data-act="drill" data-id="${d}">Practise this rule</button></li>`); });
  body.innerHTML = `<div class="result" style="text-align:left;justify-items:stretch"><span class="eyebrow">Level test · ${esc(label)}</span>
    <div class="row" style="align-items:baseline;gap:18px"><span class="score">${pct}%</span><h2>${levelName(pct)}</h2></div>
    <p class="muted">${right} of ${tot} right${prev ? ` · ${pct >= prev.pct ? "+" : ""}${pct - prev.pct} points since your last test on ${new Date(prev.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}` : " · this is your first test, it sets your starting point"}</p>
    <div class="panel"><h3>By skill</h3>${Object.entries(skills).map(([s, v]) => `<div class="skillrow"><span>${esc(s)}</span><div class="meter"><i style="width:${v}%;background:${v >= 75 ? "var(--green)" : v >= 50 ? "var(--gold)" : "var(--bad)"}"></i></div><b>${v}%</b></div>`).join("")}</div>
    ${todo.length ? `<div class="panel"><h3>What to work on</h3><ul class="todo">${todo.join("")}</ul></div>` : `<div class="panel"><h3>Nothing to fix!</h3><p class="muted">Every answer was right. Try the test for all lessons, or come back next week.</p></div>`}
    ${missedWords.length ? `<div class="missed"><div class="row" style="justify-content:space-between"><span class="eyebrow">Words you missed</span><button class="btn sm" data-act="exam-add" data-ids="${missedWords.join(",")}">${IC.plus} Add them to Practice</button></div>${missedWords.map(id => { const it = ITEMS[id], T = qtext(it); return `<div class="m"><span style="font-size:24px">${it.em || ""}</span><div class="main"><b class="tl">${esc(T.tl)}</b><br><span class="small muted">${esc(T.en)}</span></div>${playItem(id)}</div>`; }).join("")}</div>` : ""}
    <div class="s-foot"><button class="btn primary" data-act="close-session" data-cont>Done</button></div></div>`;
  setBar(1, 1); planHook();
}
function examPanelHTML() {
  const hist = (S.exams || []).slice(-6).reverse();
  return `<div class="panel" id="exampanel"><div class="row" style="justify-content:space-between"><h3>Level test</h3><span class="small muted">about 10 minutes</span></div>
    <p class="small muted">Vocabulary, listening, writing, grammar and real-life situations. You get a score per skill and a list of what to work on. Take it every week or two to see your progress.</p>
    <div class="row"><label class="sr" for="exam-scope">What to test</label><select id="exam-scope" style="width:auto">${[["all", "All lessons"], ...LESSONS.map(L => [L.id, lessonLabel(L) + " · " + L.title])].map(([v, t]) => `<option value="${v}">${esc(t)}</option>`).join("")}</select><button class="btn primary" data-act="exam">${IC.play} Start the test</button></div>
    ${hist.length ? `<div class="examhist">${hist.map(e => `<div class="eh"><span class="small muted">${new Date(e.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span><span class="small">${esc(e.label)}</span><div class="meter"><i style="width:${e.pct}%"></i></div><b>${e.pct}%</b></div>`).join("")}</div>` : ""}</div>`;
}
