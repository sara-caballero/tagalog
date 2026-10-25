const PLAN = { active: false, blocks: [], i: 0 };
const stepEst = s => s.scene ? 6 : Math.max(4, Math.round(s.ids.length * 0.9));
function buildPlan() {
  const blocks = [], remaining = Math.max(10, goalMin() - minsOn(dkey(Date.now())));
  const due = dueIds();
  if (due.length) blocks.push({ k: "review", label: `Review ${Math.min(due.length, 40)} ${due.length === 1 ? "word" : "words"}`, est: Math.max(2, Math.round(Math.min(due.length, 40) * 0.3)) });
  const undone = STEPS.filter(s => !S.steps[s.id]);
  if (undone[0]) blocks.push({ k: "step", id: undone[0].id, label: "Lesson: " + undone[0].title, est: stepEst(undone[0]) });
  const pool = practicePool([]);
  if (pool.fresh.length) blocks.push({ k: "new", label: `${pool.fresh.length} new ${pool.fresh.length === 1 ? "word" : "words"}`, est: Math.max(2, Math.round(pool.fresh.length * 0.4)) });
  const reached = new Set(STEPS.filter(s => S.steps[s.id]).map(s => s.lesson)); reached.add("trial");
  const dr = DRILLS.filter(d => reached.has(d.lesson)).sort((a, b) => (S.drills[a.id] ?? -1) - (S.drills[b.id] ?? -1))[0];
  if (dr) blocks.push({ k: "drill", id: dr.id, label: "Grammar: " + dr.title, est: 4 });
  let total = blocks.reduce((a, b) => a + b.est, 0);
  for (const st of undone.slice(1, 4)) { if (total >= remaining - 4) break; blocks.push({ k: "step", id: st.id, label: "Lesson: " + st.title, est: stepEst(st) }); total += stepEst(st); }
  const sc = SCENES.filter(s => s.lessons.every(l => reached.has(l)) && !blocks.some(b => b.k === "step" && STEP_BY_ID[b.id].scene === s.id)).sort((a, b) => (S.scenes[a.id] || 0) - (S.scenes[b.id] || 0))[0];
  if (total < remaining && sc) { blocks.push({ k: "scene", id: sc.id, label: "Conversation: " + sc.title, est: 6 }); total += 6; }
  const learned = Object.keys(S.cards).filter(id => ITEMS[id]);
  if (total < remaining && learned.length >= 6) blocks.push({ k: "mixed", label: "Mixed practice", est: Math.max(4, remaining - total) });
  return blocks;
}
const nextBlock = () => PLAN.blocks.findIndex(b => !b.done);
function planOverview() {
  const body = openShell(`My ${goalMin()} minutes`), B = PLAN.blocks, m = minsOn(dkey(Date.now()));
  PLAN.i = nextBlock();
  const done = PLAN.i < 0, started = B.some(b => b.done);
  setBar(B.filter(b => b.done).length, B.length || 1);
  const sum = B.filter(b => !b.done).reduce((a, b) => a + b.est, 0);
  body.innerHTML = `<div class="planbox"><span class="eyebrow">Today's plan</span>
    <h2>${done ? (m >= goalMin() ? "Goal done! Magaling!" : "Plan complete!") : started ? "Keep going." : `Your ${goalMin()} minutes.`}</h2>
    <p class="muted">${m} of ${goalMin()} minutes today${done ? "" : ` · about ${sum} minutes left in this plan`}</p>${done ? "" : `<p class="small muted" style="margin-top:-8px">${started ? "Tap the one you want to do next, or Continue to go in order." : "Tap the one you want to start with, or Start to go in order."}</p>`}
    <div class="meter"><i style="width:${Math.min(100, m / goalMin() * 100)}%"></i></div>
    <ol class="planlist">${B.map((b, i) => `<li class="${b.done ? "done" : i === PLAN.i ? "cur" : ""}"><button class="plrow" data-act="plan-pick" data-i="${i}"${b.done ? " disabled" : ""}><span class="dot">${b.done ? IC.check : i + 1}</span><span class="pl"><b>${esc(b.label)}</b><small>${b.done ? (b.skipped ? "nothing to do" : "done") : `about ${b.est} min`}</small></span>${b.done ? "" : `<span class="go">${IC.arrow}</span>`}</button></li>`).join("")}</ol>
    <div class="s-foot">${done ? `<button class="btn" data-act="plan-more">Keep going: mixed practice</button><button class="btn primary" data-act="plan-stop" data-cont>Done for today</button>`
      : `<button class="btn" data-act="plan-stop">Not now</button><button class="btn primary big" data-act="plan-go" data-cont>${started ? "Continue" : "Start"} ${IC.arrow}</button>`}</div></div>`;
}
function runBlock() {
  const b = PLAN.blocks[PLAN.i];
  if (!b) return planOverview();
  const skip = () => { b.done = true; b.skipped = true; PLAN.i = nextBlock(); runBlock(); };
  if (b.k === "review") { const ids = shuffle(dueIds()).slice(0, 40); return ids.length ? runSwipe(ids, "Review") : skip(); }
  if (b.k === "step") return startStep(b.id);
  if (b.k === "new") { const ids = practicePool([]).fresh; return ids.length ? runSwipe(ids, "New words") : skip(); }
  if (b.k === "drill") return startDrill(b.id);
  if (b.k === "scene") return runScene(b.id);
  if (b.k === "mixed") { const ids = Object.keys(S.cards).filter(id => ITEMS[id]); return ids.length ? runQuiz("Mixed practice", mixedQueue(ids, 12)) : skip(); }
  skip();
}
function planHook() {
  if (!PLAN.active) return;
  const b = PLAN.blocks[PLAN.i]; if (b) b.done = true;
  const f = $("#session .result .s-foot"); if (!f) return;
  const nx = PLAN.blocks[nextBlock()], left = PLAN.blocks.filter(x => !x.done).length;
  f.innerHTML = `<button class="btn" data-act="plan-stop">Stop for today</button>${left > 1 ? `<button class="btn" data-act="plan-view">Choose next</button>` : ""}<button class="btn primary" data-act="plan-next" data-cont>${nx ? "Next: " + esc(nx.label.replace(/^(Lesson|Grammar|Conversation): /, "")) : "See my plan"} ${IC.arrow}</button>`;
  const r = $("#session .result"); if (r && !$(".plantag", r)) r.insertAdjacentHTML("afterbegin", `<span class="tag green plantag">My ${goalMin()} minutes · ${PLAN.blocks.length - left} of ${PLAN.blocks.length} done · ${minsOn(dkey(Date.now()))} min today</span>`);
}
function planStart() { PLAN.active = true; PLAN.blocks = buildPlan(); PLAN.i = 0; planOverview(); }
function planTodayHTML() {
  const m = minsOn(dkey(Date.now())), g = goalMin();
  return `<div class="plan30"><button class="btn primary big" data-act="plan-start">${IC.play} Start my ${g} minutes</button>
    <span class="small muted">${m >= g ? `Goal done today (${m} min). Extra time still counts.` : `${g - m} minutes left today. Review, your next lesson step, grammar and a conversation, one after the other.`}</span></div>`;
}
