RENDER.note = (ctx, q) => {
  const n = q.n, body = (n.h || "").replace(/<table/g, "<div class='tablewrap'><table").replace(/<\/table>/g, "</table></div>").replace(/href='#ako'/g, "href='#intro'");
  ctx.body.innerHTML = `${technique(n.k === "grammar" ? "New in your Notebook" : n.k === "practice" ? "Practice" : "Good to know")}
    <div class="notecard"><div class="row" style="justify-content:space-between"><h3>${esc(n.t)}</h3>${n.say ? playText(n.say) : ""}</div>${body}</div>${contBtn("Continue")}`;
  wireCont(ctx);
};

function learnQueue(ids) {
  const out = [];
  for (let i = 0; i < ids.length; i += 3) {
    const chunk = ids.slice(i, i + 3);
    chunk.forEach(id => out.push({ kind: "present", item: ITEMS[id], noscore: true }));
    shuffle(chunk).forEach((id, k) => out.push({ kind: "mc", item: ITEMS[id], dir: k % 2 ? "en2tl" : "tl2en", learn: true }));
  }
  return out;
}
function mixedQueue(ids, n, kinds) {
  const out = []; let pool = [];
  while (out.length < n && ids.length) {
    if (!pool.length) pool = shuffle(ids);
    const id = pool.pop(), it = ITEMS[id], b = level(id);
    let ks = kinds || (b < 2 ? ["mc_tl2en", "audio", "mc_en2tl"] : ["mc_en2tl", "type", "build", "audio", "mc_tl2en"]);
    ks = ks.filter(k => (k !== "build" || buildable(it)) && (k !== "type" || typeable(it)) && (k !== "audio" || !it.custom || TTS.ok));
    if (!ks.length) ks = ["mc_tl2en"];
    const k = ks[Math.floor(Math.random() * ks.length)];
    if (k === "type") out.push({ kind: "type", item: it });
    else if (k === "build") out.push({ kind: "build", item: it });
    else out.push({ kind: "mc", item: it, dir: k === "audio" ? "audio" : k === "mc_en2tl" ? "en2tl" : "tl2en" });
  }
  return out;
}
function pairsSet(ids, n) {
  const out = [];
  for (const id of shuffle(ids)) { if (out.length >= n) break; if (!out.some(o => clash(o, id)) && qtext(ITEMS[id]).tl.length < 40) out.push(id); }
  return out;
}

function startStep(id) {
  const s = STEP_BY_ID[id]; if (!s) return;
  const L = LESSON_BY_ID[s.lesson];
  const after = () => { const nx = nextStep(); return nx ? { label: "Next step", fn: () => startStep(nx.id) } : null; };
  if (s.scene) { S.resume = { kind: "step", id }; save(); return runScene(s.scene, () => { S.steps[id] = 1; S.resume = null; save(); }); }
  S.resume = { kind: "step", id }; save();
  const q = learnQueue(s.ids);
  s.notes.forEach(n => q.push({ kind: "note", n, noscore: true }));
  if (s.ids.length >= 4) q.push({ kind: "pairs", ids: pairsSet(s.ids, Math.min(5, s.ids.length)), learn: true });
  runQuiz(s.title, q, {
    doneTitle: "Step complete!",
    summary: `${s.ids.length} words are now in your <a href="#wordbook">Wordbook</a>${s.notes.some(n => n.k === "grammar") ? ` and the rule is in your <a href="#notebook">Notebook</a>` : ""}. They'll come back in Practice tomorrow.`,
    onFinish: () => { S.steps[id] = 1; S.resume = null; save(); },
    get after() { return after(); }
  });
}

function runSwipe(ids, title, opts) {
  opts = opts || {};
  const body = openShell(title);
  const queue = ids.slice(), seen = new Set(), missed = new Set();
  let i = 0, known = 0;
  SESSION.st = { swipe: true };
  const dirFor = id => S.settings.dir === "mix" ? (level(id) >= 2 && Math.random() < .5 ? "en" : "tl") : S.settings.dir;
  function draw() {
    setBar(i, queue.length);
    if (i >= queue.length) return finish();
    const id = queue[i], it = ITEMS[id], T = qtext(it), dir = dirFor(id), isNew = !S.cards[id];
    const front = dir === "tl" ? `<span class="prompt"><span class="big">${esc(T.tl)}</span></span>` : `<span class="em" style="font-size:46px">${it.em || ""}</span><span class="prompt"><span class="big" style="font-size:clamp(30px,6vw,44px)">${esc(T.en)}</span></span>`;
    body.innerHTML = `<div class="row" style="justify-content:space-between"><span class="technique">${isNew ? "New word" : level(id) === 0 ? "Still learning" : "Review"} · ${esc(catName(catOf(it)))}</span>${playText(T.tl)}</div>
      <div class="swipewrap"><div class="swipe" id="card" tabindex="0" aria-label="Flashcard. Tap to reveal.">
        <span class="lbl yes">I know</span><span class="lbl no">Still learning</span>
        ${front}<span class="hint" id="hint">${dir === "tl" ? "What does it mean? Tap to check." : "Say it in Tagalog. Tap to check."}</span>
        <div class="ans" id="ans" hidden>${dir === "tl" ? `<span class="em" style="font-size:40px">${it.em || ""}</span><span class="meaning">${esc(T.en)}</span>` : `<span class="meaning">${esc(T.tl)}</span>`}
          ${it.syl && !it.pat ? `<span class="small muted syl">${sylHTML(it.syl)}</span>` : ""}${myHook(id) ? `<span class="small muted" style="max-width:40ch">${(S.hooks || {})[id] ? "<b>My hook:</b> " : ""}${esc(myHook(id))}</span>` : ""}</div>
        <span class="lvl">${levelHTML(id)}</span></div></div>
      <div class="row" style="justify-content:center"><button class="btn sm ghost" data-hint>${IC.bulb} Hint</button>${isTricky(id) ? `<span class="tag cream">Tricky word: write your own hook in the Wordbook</span>` : ""}</div>
      <div class="swipebtns"><button class="btn no" data-sw="0">${IC.x} Don't know</button><button class="btn yes" data-sw="1">${IC.check} I know</button></div>
      <p class="keyhint">Tap the card to check · swipe or use ← → keys</p>`;
    if (dir === "tl") speak(T.tl);
    const card = $("#card", body); let x0 = null, dx = 0, moved = false, flipped = false, hinted = 0;
    const fl = s => s.split(" ").map(w => w.charAt(0) + w.slice(1).replace(/[A-Za-z]/g, "_")).join(" ");
    const hints = (dir === "tl" ? [it.em ? "Picture: " + it.em : "", "Starts with: " + fl(T.en)] : ["Starts with: " + fl(T.tl), it.syl && !it.pat ? "Sounds: " + it.syl.toLowerCase() : ""]).filter(Boolean);
    if (myHook(id)) hints.push("Hook: " + myHook(id));
    $("[data-hint]", body).addEventListener("click", e => {
      if (flipped) return; const h = $("#hint", body);
      if (hinted < hints.length) { h.textContent = hints.slice(0, hinted + 1).join("  ·  "); hinted++; }
      if (hinted >= hints.length) e.currentTarget.disabled = true;
    });
    const flip = () => { if (flipped) return; flipped = true; $("#ans", body).hidden = false; $("#hint", body).hidden = true; if (dir === "en") speak(T.tl); };
    const decide = ok => {
      if (card.dataset.done) return; card.dataset.done = 1;
      card.style.transform = `translateX(${ok ? 140 : -140}%) rotate(${ok ? 18 : -18}deg)`; card.style.opacity = "0";
      review(id, ok, { hinted: hinted > 0 }); addXP(1);
      if (!seen.has(id)) { seen.add(id); if (ok) known++; else missed.add(id); }
      if (!ok) queue.splice(Math.min(queue.length, i + 4), 0, id);
      i++; setTimeout(draw, 260);
    };
    card.addEventListener("click", () => { if (!moved) flip(); });
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
    card.addEventListener("pointerdown", e => { x0 = e.clientX; dx = 0; moved = false; card.setPointerCapture(e.pointerId); card.classList.add("drag"); });
    card.addEventListener("pointermove", e => {
      if (x0 == null) return; dx = e.clientX - x0; if (Math.abs(dx) > 6) moved = true;
      card.style.transform = `translateX(${dx}px) rotate(${dx / 22}deg)`;
      $(".lbl.yes", card).style.opacity = Math.max(0, Math.min(1, dx / 90)); $(".lbl.no", card).style.opacity = Math.max(0, Math.min(1, -dx / 90));
    });
    const up = () => { if (x0 == null) return; x0 = null; card.classList.remove("drag"); if (Math.abs(dx) > 100) decide(dx > 0); else { card.style.transform = ""; $$(".lbl", card).forEach(l => l.style.opacity = 0); } setTimeout(() => moved = false, 0); };
    card.addEventListener("pointerup", up); card.addEventListener("pointercancel", up);
    $$("[data-sw]", body).forEach(b => b.addEventListener("click", () => decide(b.dataset.sw === "1")));
    SESSION.swipe = { flip, decide };
  }
  function finish() {
    SESSION.swipe = null; setBar(1, 1); if (opts.onFinish) opts.onFinish();
    const total = seen.size;
    body.innerHTML = `<div class="result"><span class="eyebrow">${esc(title)}</span><div class="score">${known}/${total}</div><h2>${total && known === total ? "Galing! You knew them all." : "Magaling! Session done."}</h2>
      <p class="muted">${known} known at first sight${missed.size ? `, ${missed.size} practised until you got them` : ""}. Known words come back later; the others come back tomorrow.</p>
      ${missed.size ? `<div class="missed"><span class="eyebrow">Practise these again</span>${[...missed].map(id => { const it = ITEMS[id], T = qtext(it); return `<div class="m"><span style="font-size:24px">${it.em || ""}</span><div class="main"><b class="tl">${esc(T.tl)}</b><br><span class="small muted">${esc(T.en)}</span></div>${playItem(id)}</div>`; }).join("")}</div>` : ""}
      <div class="s-foot"><button class="btn primary" data-act="close-session" data-cont>Done</button></div></div>`;
    planHook();
  }
  draw();
}

function startPractice(onlyDue) {
  const cats = onlyDue ? [] : S.settings.pcats.filter(c => c === "tricky" || catList().some(x => x.id === c));
  const pool = practicePool(cats), mode = onlyDue ? "flash" : S.settings.mode;
  let ids = onlyDue ? shuffle(pool.due).slice(0, 60) : [...shuffle(pool.due).slice(0, 60), ...pool.fresh];
  let title = onlyDue ? "Today's review" : (cats.length ? cats.map(c => c === "tricky" ? "Tricky words" : catName(c)).join(", ") : "All words");
  if (!ids.length) {
    const started = pool.ids.filter(id => S.cards[id]);
    ids = shuffle(started.length >= 6 ? started : pool.ids).slice(0, 15);
    title += " · extra";
  }
  if (!ids.length) { toast("No words in this selection yet"); return; }
  S.resume = { kind: "practice" }; save();
  const done = () => { S.resume = null; save(); };
  if (mode === "flash") return runSwipe(ids, title, { onFinish: done });
  const again = () => startPractice(onlyDue);
  if (mode === "pairs") { const rounds = Math.max(1, Math.min(4, Math.floor(ids.length / 5))); return runQuiz(title, [...Array(rounds)].map((_, k) => ({ kind: "pairs", ids: pairsSet(ids.slice(k * 6).concat(ids), 6) })), { requeue: false, onFinish: done, again }); }
  const kinds = { choose: ["mc_tl2en", "mc_en2tl"], listen: ["audio"], write: ["type"], build: ["build"], mixed: ["mc_tl2en", "mc_en2tl", "audio", "type", "build"] }[mode];
  let set = ids;
  if (mode === "write") set = ids.filter(id => typeable(ITEMS[id]));
  if (mode === "build") set = ids.filter(id => buildable(ITEMS[id]));
  if (!set.length) { toast(mode === "build" ? "These words have no full sentences to build. Try Mixed." : "Nothing to write here. Try another mode."); S.resume = null; save(); return; }
  runQuiz(title, mixedQueue(set, Math.min(set.length, 20), kinds), { onFinish: done, again });
}
function startDrill(id) {
  const d = DRILLS.find(x => x.id === id);
  runQuiz(d.title, shuffle(d.items).map(x => ({ kind: "drill", d, x })), { again: () => startDrill(id), onFinish: (st, pct) => { S.drills[id] = Math.max(S.drills[id] || 0, pct); save(); } });
}
function resume() {
  const r = S.resume; if (!r) return;
  if (r.kind === "step" && STEP_BY_ID[r.id]) startStep(r.id); else startPractice();
}
