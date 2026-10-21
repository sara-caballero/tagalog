const SESSION = { active: false, st: null };
function openShell(title) {
  const el = $("#session"); el.hidden = false; document.body.style.overflow = "hidden";
  el.innerHTML = `<div class="s-top"><button class="iconbtn" data-act="close-session" aria-label="Close">${IC.x}</button><div class="title">${esc(title)}</div><div class="s-bar"><i style="width:0%"></i></div><div class="s-count"></div></div><div class="s-body"><div class="s-inner" id="sbody"></div></div>`;
  SESSION.active = true;
  return $("#sbody");
}
function setBar(done, total) {
  const b = $("#session .s-bar i"); if (b) b.style.width = (total ? Math.round(done / total * 100) : 0) + "%";
  const c = $("#session .s-count"); if (c) c.textContent = total ? `${Math.min(done + 1, total)} / ${total}` : "";
}
function closeSession() {
  const el = $("#session"); el.hidden = true; el.innerHTML = ""; document.body.style.overflow = "";
  SESSION.active = false; SESSION.st = null; PLAN.active = false; stopAudio();
  render();
}
function scrollBottom() { const b = $("#session .s-body"); if (b) b.scrollTo({ top: b.scrollHeight, behavior: "smooth" }); }
const technique = t => `<span class="technique">${esc(t)}</span>`;

function runQuiz(title, queue, opts) {
  opts = opts || {};
  const body = openShell(title);
  const st = { queue: queue.slice(), i: 0, right: 0, wrong: 0, xp: 0, missed: [], retried: new Set(), opts };
  SESSION.st = st;
  const scored = () => st.queue.filter(q => !q.noscore).length;
  const ctx = {
    body,
    answer(q, ok, xp, anchor) {
      if (q.onAnswer && !q.retry) q.onAnswer(ok);
      if (q.noscore) { if (xp) { st.xp += xp; addXP(xp, anchor); } return; }
      if (ok) { st.right++; if (xp) { st.xp += xp; addXP(xp, anchor); } }
      else {
        st.wrong++;
        if (q.item && !st.missed.includes(q.item.id)) st.missed.push(q.item.id);
        const key = q.kind + (q.item ? q.item.id : "") + (q.x ? q.x.q + q.x.a : "");
        if (!st.retried.has(key) && opts.requeue !== false && q.kind !== "pairs" && q.kind !== "interview") { st.retried.add(key); st.queue.push(Object.assign({}, q, { retry: true })); }
      }
    },
    next() { st.i++; step(); }
  };
  function step() {
    setBar(st.i, st.queue.length);
    if (st.i >= st.queue.length) return finish();
    const q = st.queue[st.i];
    body.innerHTML = "";
    $("#session .s-body").scrollTop = 0;
    RENDER[q.kind](ctx, q);
  }
  function finish() {
    setBar(1, 1);
    const tot = st.right + st.wrong, pct = tot ? Math.round(st.right / tot * 100) : 100;
    if (opts.renderResult) { if (opts.onFinish) opts.onFinish(st, pct); return opts.renderResult(st, pct); }
    if (opts.onFinish) opts.onFinish(st, pct);
    const msg = opts.doneTitle || (pct >= 90 ? "Galing! Excellent." : pct >= 70 ? "Magaling! Well done." : "Kaya mo 'yan! You can do it.");
    body.innerHTML = `<div class="result"><span class="eyebrow">${esc(title)}</span>
      <div class="score">${tot ? pct + "%" : IC.check.replace("<svg", '<svg width="64" height="64"')}</div><h2>${msg}</h2>
      <p class="muted">${tot ? `${st.right} right on the first try out of ${tot} answers` : ""}</p>${opts.summary ? `<p>${opts.summary}</p>` : ""}
      ${st.missed.length ? `<div class="missed"><span class="eyebrow">These come back in your next review</span>${st.missed.map(id => { const it = ITEMS[id], T = qtext(it); return `<div class="m"><span style="font-size:24px">${it.em || ""}</span><div class="main"><b class="tl">${esc(T.tl)}</b><br><span class="small muted">${esc(T.en)}</span></div>${playItem(id)}</div>`; }).join("")}</div>` : ""}
      <div class="s-foot">${opts.again ? `<button class="btn" data-act="again">${IC.repeat} Go again</button>` : ""}${opts.after ? `<button class="btn" data-act="close-session">Done</button><button class="btn primary" data-act="after" data-cont>${esc(opts.after.label)} ${IC.arrow}</button>` : `<button class="btn primary" data-act="close-session" data-cont>Done</button>`}</div></div>`;
    SESSION.again = opts.again || null; SESSION.after = opts.after ? opts.after.fn : null; planHook();
  }
  step();
}

const feedback = (kind, head, html) => `<div class="feedback ${kind}"><b class="h">${esc(head)}</b>${html || ""}</div>`;
function contBtn(label) { return `<div class="s-foot"><button class="btn primary big" data-cont>${esc(label || "Continue")} ${IC.arrow}</button></div>`; }
function wireCont(ctx, el) { const b = $("[data-cont]", el || ctx.body); if (b) { b.addEventListener("click", () => ctx.next(), { once: true }); b.focus({ preventScroll: true }); } scrollBottom(); }
function revealHTML(it, withHook) {
  const T = qtext(it);
  return `<div class="row" style="flex-wrap:nowrap">${playText(T.tl)}<div><b class="tl" style="font-size:18px">${esc(T.tl)}</b><br><span class="small">${esc(T.en)}</span></div></div>${withHook && it.mn ? `<p class="small"><b>Hook:</b> ${esc(it.mn)}</p>` : ""}`;
}

const RENDER = {
  present(ctx, q) {
    const it = q.item;
    ctx.body.innerHTML = `${technique("New word")}
      <div class="learncard">
        <div class="prompt"><span class="em">${it.em || ""}</span><span class="big">${esc(it.tl)}</span>${it.syl ? `<span class="syl sub">${sylHTML(it.syl)}</span>` : ""}<span class="sub" style="color:var(--ink);font-weight:700">${esc(it.en)}</span></div>
        <div class="saybtns">${playItem(it.id)}${playItem(it.id, 1)}</div>
        ${moreHTML(it.id).replace(/^<div class="row">.*?<\/div>/, "")}
        <div style="display:grid;gap:8px;justify-items:center;border-top:1px dashed var(--line);padding-top:14px"><span class="small muted">Say it out loud three times. Hearing yourself helps it stick.</span>
          <div class="sayc" aria-live="polite"><i></i><i></i><i></i></div><button class="btn sm" data-said>${IC.mic} I said it</button></div>
      </div>${contBtn("Got it")}`;
    let n = 0;
    $("[data-said]", ctx.body).addEventListener("click", e => { if (n < 3) { $$(".sayc i", ctx.body)[n].classList.add("on"); n++; if (n === 3) { ctx.answer(q, true, 3, e.currentTarget); e.currentTarget.disabled = true; } } });
    speak(sayText(it));
    wireCont(ctx);
  },
  mc(ctx, q) {
    const it = q.item, T = qtext(it), dir = q.dir;
    const ids = shuffle([it.id, ...distractors(it.id, 3)]);
    const label = id => dir === "en2tl" ? qtext(ITEMS[id]).tl : qtext(ITEMS[id]).en;
    let prompt;
    if (dir === "tl2en") prompt = `<span class="q">What does this mean?</span><span class="em">${it.em || ""}</span><div class="row" style="justify-content:center"><span class="big">${esc(T.tl)}</span>${playText(T.tl)}</div>`;
    else if (dir === "en2tl") prompt = `<span class="q">How do you say this in Tagalog?</span><span class="em">${it.em || ""}</span><span class="big">${esc(T.en)}</span>`;
    else prompt = `<span class="q">What did you hear?</span><button class="play" style="width:88px;height:88px" data-act="saytext" data-text="${esc(T.tl)}" aria-label="Play again">${IC.play.replace("<svg", '<svg style="width:36px;height:36px"')}</button><span class="sub">Tap to hear it again</span>`;
    ctx.body.innerHTML = `${technique(dir === "audio" ? "Listening · retrieval" : q.learn ? "Quick check · retrieval" : "Retrieval practice")}<div class="prompt">${prompt}</div>
      <div class="opts">${ids.map((id, k) => `<button class="opt" data-id="${id}"><span class="k">${k + 1}</span><span class="t ${dir === "en2tl" ? "tl" : ""}">${esc(label(id))}</span></button>`).join("")}</div><div id="fb"></div>`;
    if (dir === "audio") speak(T.tl);
    $$(".opt", ctx.body).forEach(b => b.addEventListener("click", () => {
      const ok = b.dataset.id === it.id;
      $$(".opt", ctx.body).forEach(o => { o.disabled = true; if (o.dataset.id === it.id) o.classList.add("right"); });
      if (!ok) b.classList.add("wrong");
      if (!q.retry) recordResult(q, it.id, ok);
      ctx.answer(q, ok, ok ? 5 : 0, b);
      if (dir !== "en2tl" || ok) speak(T.tl);
      if (ok && S.settings.autoNext) { $("#fb", ctx.body).innerHTML = feedback("good", "Tama! Correct.", revealHTML(it)); const st = SESSION.st; setTimeout(() => { if (SESSION.st === st && $("#fb", ctx.body) && $("#fb", ctx.body).innerHTML) ctx.next(); }, 1600); }
      else if (ok) { $("#fb", ctx.body).innerHTML = feedback("good", "Tama! Correct.", revealHTML(it, true)) + contBtn(); wireCont(ctx, $("#fb", ctx.body)); }
      else { $("#fb", ctx.body).innerHTML = feedback("bad", "Not quite.", revealHTML(it, true)) + contBtn(); wireCont(ctx, $("#fb", ctx.body)); speak(T.tl); }
    }));
  },
  type(ctx, q) {
    const it = q.item, T = qtext(it);
    const hint = T.tl.split(" ").map(w => w.replace(/[A-Za-z]/g, (c, i) => i === 0 ? c : "_")).join("  ");
    ctx.body.innerHTML = `${technique("Generation effect · type from memory")}<div class="prompt"><span class="q">Type it in Tagalog</span><span class="em">${it.em || ""}</span><span class="big">${esc(T.en)}</span></div>
      <form class="typebox" autocomplete="off"><label class="sr" for="typein">Your answer</label><input id="typein" type="text" autocapitalize="off" spellcheck="false" placeholder="Type here…"><button class="btn primary">Check</button></form>
      <div class="row" style="justify-content:center"><button class="btn ghost sm" data-hint>Show a hint</button></div><div id="fb"></div>`;
    const inp = $("#typein", ctx.body); setTimeout(() => inp.focus(), 50);
    $("[data-hint]", ctx.body).addEventListener("click", e => { e.currentTarget.outerHTML = `<span class="diff muted" style="letter-spacing:.06em">${esc(hint)}</span>`; });
    $("form", ctx.body).addEventListener("submit", e => {
      e.preventDefault(); if ($("#fb", ctx.body).innerHTML) return;
      const res = checkTyped(it, inp.value), ok = res.r !== "bad";
      inp.disabled = true; $("form button", ctx.body).disabled = true;
      if (!q.retry) recordResult(q, it.id, ok);
      ctx.answer(q, ok, ok ? 10 : 0, $("form button", ctx.body));
      speak(T.tl);
      $("#fb", ctx.body).innerHTML = feedback(res.r, res.r === "good" ? "Tama! Correct." : res.r === "ok" ? "Close enough!" : "Not quite.", (res.tip ? `<p class="small">${esc(res.tip)}</p>` : "") + revealHTML(it, !ok)) + contBtn();
      wireCont(ctx, $("#fb", ctx.body));
    });
  },
  build(ctx, q) {
    const it = q.item, T = qtext(it), toks = tokens(T.tl);
    const pool = shuffle(allIds().filter(id => id !== it.id)).flatMap(id => tokens(qtext(ITEMS[id]).tl)).filter(w => !toks.some(t => t.toLowerCase() === w.toLowerCase()) && !w.includes("…"));
    const extra = [...new Set(pool)].slice(0, 2);
    const bank = shuffle([...toks, ...extra].map((w, i) => ({ w, i })));
    const chosen = [];
    ctx.body.innerHTML = `${technique("Generation effect · build the sentence")}<div class="prompt"><span class="q">Build this in Tagalog</span><span class="em">${it.em || ""}</span><span class="big">${esc(T.en)}</span></div>
      <div class="slots" aria-label="Your sentence"></div><div class="bank">${bank.map(b => `<button class="wtile" data-i="${b.i}">${esc(b.w)}</button>`).join("")}</div>
      <div class="s-foot"><button class="btn" data-clear>Clear</button><button class="btn primary" data-check disabled>Check</button></div><div id="fb"></div>`;
    const slots = $(".slots", ctx.body), chk = $("[data-check]", ctx.body);
    const draw = () => { slots.innerHTML = chosen.map((b, k) => `<button class="wtile" data-k="${k}">${esc(b.w)}</button>`).join(""); chk.disabled = !chosen.length; $$(".bank .wtile", ctx.body).forEach(t => t.classList.toggle("used", chosen.some(c => String(c.i) === t.dataset.i))); };
    $$(".bank .wtile", ctx.body).forEach(t => t.addEventListener("click", () => { if (t.classList.contains("used") || $("#fb", ctx.body).innerHTML) return; chosen.push(bank.find(b => String(b.i) === t.dataset.i)); draw(); }));
    slots.addEventListener("click", e => { const t = e.target.closest(".wtile"); if (!t || $("#fb", ctx.body).innerHTML) return; chosen.splice(+t.dataset.k, 1); draw(); });
    $("[data-clear]", ctx.body).addEventListener("click", () => { if ($("#fb", ctx.body).innerHTML) return; chosen.length = 0; draw(); });
    chk.addEventListener("click", () => {
      const ok = chosen.map(c => c.w.toLowerCase()).join(" ") === toks.map(t => t.toLowerCase()).join(" ");
      chk.disabled = true;
      if (!q.retry) recordResult(q, it.id, ok);
      ctx.answer(q, ok, ok ? 10 : 0, chk); speak(T.tl);
      $("#fb", ctx.body).innerHTML = feedback(ok ? "good" : "bad", ok ? "Tama! Correct." : "Not quite. Here's the order:", revealHTML(it)) + contBtn();
      wireCont(ctx, $("#fb", ctx.body));
    });
  },
  pairs(ctx, q) {
    const ids = q.ids, left = shuffle(ids), right = shuffle(ids);
    let sel = null, matched = 0, miss = 0; const t0 = Date.now();
    ctx.body.innerHTML = `${technique("Pares · fast matching")}<div class="prompt"><span class="q">Match each Tagalog phrase with its meaning</span></div>
      <div class="pairs">${left.map((id, k) => `<button class="ptile tlt" data-id="${id}" data-side="l" style="grid-column:1;grid-row:${k + 1}">${esc(qtext(ITEMS[id]).tl)}</button>`).join("")}${right.map((id, k) => `<button class="ptile" data-id="${id}" data-side="r" style="grid-column:2;grid-row:${k + 1}">${esc(qtext(ITEMS[id]).en)}</button>`).join("")}</div><div id="fb"></div>`;
    $$(".ptile", ctx.body).forEach(b => b.addEventListener("click", () => {
      if (b.classList.contains("done")) return;
      if (b.dataset.side === "l") speak(qtext(ITEMS[b.dataset.id]).tl);
      if (!sel || sel.dataset.side === b.dataset.side) { if (sel) sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
      if (sel.dataset.id === b.dataset.id) {
        [sel, b].forEach(x => { x.classList.remove("sel"); x.classList.add("done"); x.disabled = true; }); matched++; addXP(3, b);
        if (matched === ids.length) { const secs = Math.round((Date.now() - t0) / 1000), ok = miss <= 1; ctx.answer(q, ok, ok ? 5 : 0, b); $("#fb", ctx.body).innerHTML = feedback(ok ? "good" : "ok", `All matched in ${secs}s`, `<p class="small">${miss ? miss + " wrong tries" : "No mistakes!"}</p>`) + contBtn(); wireCont(ctx, $("#fb", ctx.body)); }
      } else { miss++; [sel, b].forEach(x => { x.classList.add("shake"); setTimeout(() => x.classList.remove("shake", "sel"), 350); }); recordResult(q, sel.dataset.side === "l" ? sel.dataset.id : b.dataset.id, false); }
      sel = null;
    }));
  },
  drill(ctx, q) {
    const d = q.d, x = q.x;
    const blank = `<span style="display:inline-block;min-width:3.2em;border-bottom:3px solid var(--sea);color:var(--sea)">&nbsp;?&nbsp;</span>`;
    const fillDisplay = a => a === "-ng" ? x.q.replace("___", "ng") : x.q.replace("___", a);
    const opts = d.opts.slice();
    ctx.body.innerHTML = `${technique("Grammar gym · " + d.title)}<div class="prompt"><span class="q">${esc(d.desc)}</span><span class="big" style="font-size:clamp(24px,5vw,34px)">${esc(x.q).replace("___", blank)}</span></div>
      <div class="opts ${opts.length === 2 ? "two" : ""}">${opts.map((o, k) => `<button class="opt" data-o="${esc(o)}"><span class="k">${k + 1}</span><span class="t tl">${esc(o)}</span></button>`).join("")}</div><div id="fb"></div>`;
    $$(".opt", ctx.body).forEach(b => b.addEventListener("click", () => {
      const ok = b.dataset.o === x.a;
      $$(".opt", ctx.body).forEach(o => { o.disabled = true; if (o.dataset.o === x.a) o.classList.add("right"); });
      if (!ok) b.classList.add("wrong");
      ctx.answer(q, ok, ok ? 5 : 0, b);
      const full = fillDisplay(x.a);
      speak(full.replace(/^.*—\s*/, ""));
      $("#fb", ctx.body).innerHTML = feedback(ok ? "good" : "bad", ok ? "Tama! Correct." : "Not quite.", `<div class="row" style="flex-wrap:nowrap">${playText(full)}<div><b class="tl">${esc(full)}</b><br><span class="small">${esc(x.en)}</span></div></div><p class="small">${esc(x.why)}</p>`) + contBtn();
      wireCont(ctx, $("#fb", ctx.body));
    }));
  },
  interview(ctx, q) {
    ctx.body.innerHTML = `${technique("Retrieval · answer out loud")}<div class="prompt"><span class="q">Answer out loud, then check</span><span class="em">${q.em}</span><div class="row" style="justify-content:center"><span class="big">${esc(q.ask)}</span>${playText(q.ask)}</div><span class="sub">${esc(q.askEn)}</span></div>
      <div class="s-foot"><button class="btn primary big" data-reveal>Show my answer</button></div><div id="fb"></div>`;
    speak(q.ask);
    $("[data-reveal]", ctx.body).addEventListener("click", e => {
      e.currentTarget.parentElement.remove();
      $("#fb", ctx.body).innerHTML = `<div class="feedback ok" style="background:var(--surface);border:1px solid var(--line)"><div class="row" style="flex-wrap:nowrap">${playText(q.ans)}<div><b class="tl" style="font-size:20px">${esc(q.ans)}</b><br><span class="small muted">${esc(q.ansEn)}</span></div></div></div>
        <div class="s-foot"><button class="btn" data-self="0">Not yet</button><button class="btn primary" data-self="1">I said it right</button></div>`;
      speak(q.ans);
      $$("[data-self]", ctx.body).forEach(b => b.addEventListener("click", () => { ctx.answer(q, b.dataset.self === "1", b.dataset.self === "1" ? 8 : 0, b); ctx.next(); }));
      scrollBottom();
    });
  }
};
