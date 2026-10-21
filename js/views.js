const footer = () => "";
const starsHTML = n => `<span class="stars" aria-label="${n} of 3 stars">${[1, 2, 3].map(k => IC.star.replace("<svg", `<svg class="${k <= n ? "on" : ""}"`)).join("")}</span>`;
const ph = (eyebrow, h1, lede) => `<header class="ph"><span class="eyebrow">${eyebrow}</span><h1>${h1}</h1>${lede ? `<p class="lede">${lede}</p>` : ""}</header>`;
const tabs = (items, on) => `<nav class="tabs" aria-label="Sections">${items.map(([k, l]) => `<a href="#${k}" class="${k === on ? "on" : ""}">${l}</a>`).join("")}</nav>`;

function moreHTML(id, edit) {
  const it = ITEMS[id], parts = [];
  parts.push(`<div class="row">${playItem(id)}${playItem(id, 1)}<span class="small muted">${it.pron ? "Sounds like: " + esc(it.pron) : it.syl ? sylHTML(it.syl) : "Listen, then say it out loud."}</span></div>`);
  if (it.lit) parts.push(`<div class="lit">${it.lit.map(([w, m]) => `<span><b>${esc(w)}</b><i>${esc(m)}</i></span>`).join("")}</div>`);
  if (it.mn) parts.push(`<div class="hook">${IC.bulb}<p><small>Memory hook</small>${esc(it.mn)}</p></div>`);
  const own = (S.hooks || {})[id];
  if (edit && WB.hookEdit === id) parts.push(`<div class="hook mine"><label class="f" for="hook-ta" style="width:100%">My own memory hook<textarea id="hook-ta" rows="2" placeholder="A picture, a sound-alike, a link to Spanish or French…">${esc(own || "")}</textarea></label><div class="row"><button class="btn sm primary" data-act="hooksave" data-id="${esc(id)}">Save</button><button class="btn sm ghost" data-act="hookcancel">Cancel</button></div></div>`);
  else if (own) parts.push(`<div class="hook mine">${IC.pen}<p><small>My hook</small>${esc(own)}</p>${edit ? `<button class="btn sm ghost" data-act="hookedit" data-id="${esc(id)}">Edit</button>` : ""}</div>`);
  else if (edit) parts.push(`<div><button class="btn sm ghost" data-act="hookedit" data-id="${esc(id)}">${IC.pen} Write my own memory hook</button> <span class="small muted">Hooks you invent yourself stick best.</span></div>`);
  if (it.es) parts.push(`<div class="hook es">${IC.link}<p><small>Spanish link</small>${esc(it.es)}</p></div>`);
  if (it.ex && it.ex[0]) parts.push(`<div class="row" style="flex-wrap:nowrap">${playText(it.ex[0])}<div><b class="tl">${esc(it.ex[0])}</b>${it.ex[1] ? `<br><span class="small muted">${esc(it.ex[1])}</span>` : ""}</div></div>`);
  if (it.note) parts.push(`<p class="small">${esc(it.note)}</p>`);
  return parts.join("");
}

VIEWS.today = () => {
  const ns = nextStep(), due = dueIds().length, total = STEPS.length, done = STEPS.filter(s => S.steps[s.id]).length;
  const known = Object.keys(S.cards).filter(id => ITEMS[id] && isKnown(id)).length, learned = Object.keys(S.cards).filter(id => ITEMS[id]).length;
  let banner = "";
  if (S.resume) {
    const r = S.resume, label = r.kind === "step" && STEP_BY_ID[r.id] ? STEP_BY_ID[r.id].title : "your practice";
    banner = `<div class="banner"><p>You have a session in progress: <b>${esc(label)}</b>.</p><button class="btn primary" data-act="resume">Continue</button></div>`;
  }
  let next;
  if (ns) {
    const L = LESSON_BY_ID[ns.lesson], idx = L.steps.indexOf(ns) + 1;
    next = `<div class="next"><span class="eyebrow">Your next small step</span>
      <p style="opacity:.75">${esc(L.code === "SIMULA" ? "Trial class" : L.code.replace("ARALIN", "Aralin"))} · step ${idx} of ${L.steps.length}</p>
      <h2>${esc(ns.title)}<br><em>${esc(ns.tl)}</em></h2>
      ${ns.scene ? `<p>A short role-play using what you've learned.</p>` : `<div class="words">${ns.ids.slice(0, 5).map(id => `<span>${esc(ITEMS[id].tl)}</span>`).join("")}${ns.ids.length > 5 ? `<span>+${ns.ids.length - 5}</span>` : ""}</div><p>${ns.ids.length} words${ns.notes.length ? " and a grammar note" : ""} · about ${Math.max(3, Math.round(ns.ids.length * 0.8))} minutes</p>`}
      <button class="btn big" data-act="step" data-id="${ns.id}">${IC.play} Start</button></div>`;
  } else next = `<div class="next"><span class="eyebrow">All lessons done</span><h2>Mahusay! <em>Well done.</em></h2><p>You finished every step. Keep your words fresh with daily practice and try a conversation.</p><a class="btn big" href="#speak">Go to Speak</a></div>`;
  const rev = due ? `<div class="card"><span class="eyebrow">Today's review</span><span class="big">${due}</span><p class="muted">${due === 1 ? "word is" : "words are"} ready to review. A few minutes keeps them from slipping away.</p><button class="btn primary" data-act="practice-due">Review now</button></div>`
    : `<div class="card"><span class="eyebrow">Today's review</span><h3>All caught up.</h3><p class="muted">${learned ? "Nothing to review right now. Words come back when it's time." : "Words you learn in lessons will show up here for review."}</p><a class="btn" href="#practice">Practice anyway</a></div>`;
  const pool = allIds().filter(id => !ITEMS[id].custom && !ITEMS[id].pat && hasRecording(sayText(ITEMS[id])));
  const pd = ITEMS[pool[Math.floor(startOfDay(Date.now()) / DAY) % pool.length]] || ITEMS.kumusta;
  return `${ph("Your daily practice", "A little Tagalog.<br><em>Every day.</em>", "Your five classes, made into small steps you can actually remember.")}
    ${planTodayHTML()}${banner}<div class="duo">${next}${rev}</div>
    <div style="margin-top:20px">${weekCardHTML()}</div>
    <div class="sh"><h2>Phrase of the day</h2></div>
    <div class="card"><div class="pod"><span class="em" aria-hidden="true">${pd.em || ""}</span><div style="flex:1;min-width:0"><div class="tl">${esc(qtext(pd).tl)}</div><p class="muted">${esc(qtext(pd).en)}</p></div>${playItem(pd.id)}</div>${pd.mn ? `<div class="hook">${IC.bulb}<p>${esc(pd.mn)}</p></div>` : ""}</div>
    <div class="statline"><span><b>${weekStreak()}</b>${weekStreak() === 1 ? "week" : "weeks"} in a row at ${goalDays()}+ days</span><span><b>${learned}</b>words started</span><span><b>${known}</b>words known</span><span><b>${done}/${total}</b>steps done</span></div>`;
};

function ringSVG(p) {
  const r = 20, c = 2 * Math.PI * r;
  return `<svg class="ring" viewBox="0 0 52 52" role="img" aria-label="${p}% done"><circle cx="26" cy="26" r="${r}" fill="none" stroke="var(--surface-2)" stroke-width="5"/><circle cx="26" cy="26" r="${r}" fill="none" stroke="var(--green)" stroke-width="5" stroke-linecap="round" stroke-dasharray="${c * p / 100} ${c}" transform="rotate(-90 26 26)"/><text x="26" y="30.5" text-anchor="middle">${p}%</text></svg>`;
}
VIEWS.lessons = () => {
  const ns = nextStep(), openId = ns ? ns.lesson : LESSONS[0].id;
  return `${ph("Lessons", "Your path.", "Your five classes as one path of small steps. Follow them in order: one or two steps a day is plenty.")}
  ${LESSONS.map(L => {
    const d = L.steps.filter(s => S.steps[s.id]).length, pct = Math.round(d / L.steps.length * 100);
    return `<details class="lesson ${lessonDone(L) ? "done" : ""}" ${L.id === openId ? "open" : ""}>
      <summary><span class="lnum">${lessonDone(L) ? IC.check.replace("<svg", '<svg width="26" height="26"') : esc(L.num)}</span><div><h2>${esc(L.title)}</h2><p class="sub">${esc(L.code === "SIMULA" ? "Trial class" : L.code.replace("ARALIN", "Aralin"))} · <i>${esc(L.tlTitle)}</i> · ${L.steps.length} steps</p></div><span class="row" style="gap:14px">${ringSVG(pct)}<span class="chev">${IC.chev}</span></span></summary>
      <div class="lbody"><div class="goals"><b>By the end you can:</b> ${L.goals.map(g => esc(g.charAt(0).toLowerCase() + g.slice(1))).join("; ")}.</div>
      <ol class="path">${L.steps.map((s, i) => {
        const dn = !!S.steps[s.id], nx = ns && ns.id === s.id;
        const preview = s.scene ? "Role-play · " + esc(SCENES.find(x => x.id === s.scene).setup) : s.ids.map(id => esc(ITEMS[id].tl)).join(" · ");
        return `<li class="step ${dn ? "done" : ""} ${nx ? "next" : ""}"><span class="dot">${dn ? IC.check : i + 1}</span><div class="st"><div class="row" style="gap:8px"><b>${esc(s.title)}</b>${nx ? '<span class="tag green">Next</span>' : ""}</div><p class="pv">${preview}</p></div>
          <span class="go"><button class="btn ${nx ? "primary" : "sm"}" data-act="step" data-id="${s.id}">${dn ? "Review" : nx ? "Start" : "Open"}</button></span></li>`;
      }).join("")}</ol><div class="row" style="margin-top:14px"><button class="btn sm" data-act="exam" data-scope="${L.id}">Test this lesson</button><span class="small muted">A short test of this lesson's words, grammar and situations.</span></div></div></details>`;
  }).join("")}`;
};

const WB = { q: "", cat: "all", adding: false, open: null, del: null };
const wbTabs = on => tabs([["wordbook", "Words"], ["practice", "Practice"], ["notes", "Paste notes"]], on);
VIEWS.wordbook = () => {
  const n = allIds().length, cats = catList();
  return `${ph("Wordbook", "Your words.", `Every word from your lessons, sorted into categories, plus the ones you add. ${n} words so far. Words join Practice when you do their lesson step, or when you press <b>+ Practice</b>.`)}
  ${wbTabs("wordbook")}
  <div class="tools"><label class="sr" for="wbq">Search your words</label><input id="wbq" type="search" placeholder="Search in Tagalog or English…" value="${esc(WB.q)}" autocomplete="off">
  <button class="btn primary" data-act="addtoggle">${IC.plus} Add a word</button></div>
  <form id="addform" class="addform" ${WB.adding ? "" : "hidden"} autocomplete="off">
    <label class="f" for="nw-tl">Tagalog<input id="nw-tl" type="text" required placeholder="e.g. kaibigan"></label>
    <label class="f" for="nw-en">Meaning<input id="nw-en" type="text" required placeholder="e.g. friend"></label>
    <label class="f" for="nw-cat">Category<select id="nw-cat">${cats.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("")}${cats.some(c => c.id === "u:My words") ? "" : `<option value="u:My words" selected>My words</option>`}<option value="__new">New category…</option></select></label>
    <label class="f" for="nw-newcat" id="nw-newwrap" hidden>New category name<input id="nw-newcat" type="text" placeholder="e.g. Travel"></label>
    <label class="f full" for="nw-ex">Example sentence <span class="h">(optional)</span><input id="nw-ex" type="text" placeholder="e.g. Siya ang kaibigan ko."></label>
    <div class="row full"><button class="btn primary">Save word</button><button type="button" class="btn ghost" data-act="addtoggle">Cancel</button><span class="small muted">Your words are practised with the device voice.</span></div>
  </form>
  <div class="cats" id="wbcats"></div><div id="wblist"></div>`;
};
function wbFilter() {
  const box = $("#wblist"); if (!box) return;
  const q = norm(WB.q), cats = catList();
  if (WB.cat !== "all" && !cats.some(c => c.id === WB.cat && allIds().some(id => catOf(ITEMS[id]) === c.id))) WB.cat = "all";
  const match = id => { const it = ITEMS[id]; return !q || norm(it.tl + " " + it.en + " " + (it.alt || []).join(" ")).includes(q); };
  $("#wbcats").innerHTML = `<button class="catchip ${WB.cat === "all" ? "on" : ""}" data-act="wbcat" data-c="all">All <i>${allIds().length}</i></button>` +
    cats.map(c => { const k = allIds().filter(id => catOf(ITEMS[id]) === c.id).length; return k ? `<button class="catchip ${WB.cat === c.id ? "on" : ""}" data-act="wbcat" data-c="${esc(c.id)}">${esc(c.name)} <i>${k}</i></button>` : ""; }).join("");
  let html = "", total = 0;
  cats.filter(c => WB.cat === "all" || WB.cat === c.id).forEach(c => {
    const ids = allIds().filter(id => catOf(ITEMS[id]) === c.id && match(id)); if (!ids.length) return; total += ids.length;
    const out = ids.filter(id => !inPractice(id)).length;
    html += `<section class="wgroup"><div class="row" style="justify-content:space-between;align-items:baseline"><h3>${esc(c.name)} <small>${esc(c.tl)} · ${ids.length}</small></h3>${out ? `<button class="btn sm" data-act="waddcat" data-c="${esc(c.id)}">${IC.plus} Add ${out === ids.length ? "all" : "the other " + out} to Practice</button>` : `<span class="tag green">${IC.check.replace("<svg", '<svg width="13" height="13"')} All in Practice</span>`}</div>${ids.map(id => {
      const it = ITEMS[id], open = WB.open === id;
      return `<div class="wrow ${open ? "open" : ""}" data-act="wopen" data-id="${esc(id)}" tabindex="0" role="button" aria-expanded="${open}"><span class="em" aria-hidden="true">${it.em || ""}</span><span class="tl">${esc(it.tl)}</span><span class="en">${esc(it.en)}</span>${inPractice(id) ? levelHTML(id) : `<button class="btn sm padd" data-act="wadd" data-id="${esc(id)}" title="Add to Practice">${IC.plus} Practice</button>`}
        <span class="row" style="gap:4px;flex-wrap:nowrap">${playItem(id)}${it.custom ? (WB.del === id ? `<button class="btn sm" style="color:var(--bad)" data-act="wdel2" data-id="${esc(id)}">Delete?</button>` : `<button class="x" data-act="wdel" data-id="${esc(id)}" aria-label="Delete ${esc(it.tl)}">${IC.trash.replace("<svg", '<svg width="18" height="18"')}</button>`) : ""}</span>
        ${open ? `<div class="wmore">${moreHTML(id, true)}</div>` : ""}</div>`;
    }).join("")}</section>`;
  });
  box.innerHTML = total ? html : `<div class="empty">No word matches “${esc(WB.q)}”.<button class="btn" data-act="addtoggle">${IC.plus} Add it to your Wordbook</button></div>`;
}

const MODES = [["flash", "Flashcards", "Swipe: I know / I don't", IC.cards], ["mixed", "Mixed", "A bit of everything", IC.mix], ["choose", "Choose", "Pick the right answer", IC.choose],
  ["listen", "Listen", "Hear it, pick the meaning", IC.ear], ["write", "Write", "Type it in Tagalog", IC.pen], ["build", "Build", "Put the sentence in order", IC.blocks], ["pairs", "Pairs", "Match words quickly", IC.pairs]];
function practicePool(cats) {
  const ids = allIds().filter(id => !cats.length || cats.includes(catOf(ITEMS[id])) || (cats.includes("tricky") && isTricky(id)));
  const now = Date.now();
  const due = ids.filter(id => S.cards[id] && S.cards[id].due <= now).sort((a, b) => S.cards[a].due - S.cards[b].due);
  const newLeft = Math.max(0, S.settings.newPerDay - newToday());
  const fresh = ids.filter(id => !S.cards[id] && inPractice(id)).slice(0, newLeft);
  return { ids, due, fresh, newLeft };
}
VIEWS.practice = () => {
  const cats = S.settings.pcats.filter(c => c === "tricky" || catList().some(x => x.id === c)), pool = practicePool(cats);
  const counts = c => { const ids = allIds().filter(id => catOf(ITEMS[id]) === c), n = Date.now(); return { n: ids.length, due: ids.filter(id => S.cards[id] && S.cards[id].due <= n).length }; };
  const totalDue = dueIds().length;
  return `${ph("Practice", "Practice.", "Choose your words and a way to practise. Words you know come back later and later; words you miss come back right away.")}
  ${wbTabs("practice")}
  <div class="setupgrid">
    <div><h3 style="margin-bottom:12px">Which words?</h3><div class="cats" style="margin:0">
      <button class="catchip ${!cats.length ? "on" : ""}" data-act="pcat" data-c="all">All words${totalDue ? ` <i>${totalDue} to review</i>` : ""}</button>
      ${allIds().some(isTricky) ? `<button class="catchip ${cats.includes("tricky") ? "on" : ""}" data-act="pcat" data-c="tricky" aria-pressed="${cats.includes("tricky")}">Tricky words <i>${allIds().filter(isTricky).length}</i></button>` : ""}
      ${catList().map(c => { const k = counts(c.id); return k.n ? `<button class="catchip ${cats.includes(c.id) ? "on" : ""}" data-act="pcat" data-c="${esc(c.id)}" aria-pressed="${cats.includes(c.id)}">${esc(c.name)}${k.due ? ` <i>${k.due}</i>` : ""}</button>` : ""; }).join("")}</div></div>
    <div><h3 style="margin-bottom:12px">How?</h3><div class="modes">${MODES.map(([k, t, d, ic]) => `<button class="mode ${S.settings.mode === k ? "on" : ""}" data-act="pmode" data-m="${k}" aria-pressed="${S.settings.mode === k}">${ic}<b>${t}</b><span>${d}</span></button>`).join("")}</div></div>
    <div class="startbar"><div><div class="n">${pool.due.length + pool.fresh.length ? `${pool.due.length} to review · ${pool.fresh.length} new` : "Nothing due today"}</div><span style="opacity:.8" class="small">${pool.due.length + pool.fresh.length ? `<b>To review</b>: words whose review day has come. <b>New</b>: words you added to Practice but haven\'t practised yet (${newToday()} of ${S.settings.newPerDay} new today).` : "You can still practise these words: misses will come back sooner."}</span></div>
      <button class="btn big" data-act="pstart">${IC.play} ${pool.due.length + pool.fresh.length ? "Start" : "Practise anyway"}</button></div>
    <p class="small muted">Flashcards work like Duocards: listen, try to remember, tap to check, then swipe right if you knew it or left if you didn't. A word you know comes back after 1, 3, 7, 14, 30 days and more. A word you miss comes back in the same session until you get it.</p>
  </div>`;
};

const NOTE_DRILL = { "Rin or din? Both mean too": "rindin", "Maganda means beautiful, and also good": "time", "Ng or ang after gusto?": "gustoayaw", "Double it for emphasis": "linker", "Very, very: sobra and doubling": "linker",
  "Name → si. General word → ang.": "siang", "Na = already / now. Pa = still / yet / more.": "napa", "Exclaim it: Ang + root + ng": "exclaim" };
const NB = { q: "" };
const nbNotes = L => L.topics.flatMap(t => (t.notes || []).map(n => Object.assign({ topic: t, lesson: L }, n))).filter(n => n.k !== "practice" && (n.k !== "tool" || n.tool === "age"));
const noteTitle = n => n.tool === "age" ? "Say your age" : n.t;
const lessonLabel = L => L.code === "SIMULA" ? "Trial class" : L.code.replace("ARALIN", "Aralin");
const annKey = n => n.lesson.id + "|" + n.t;
const NBE = { id: null, lesson: "", back: "notebook" };
const fmtText = t => esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
const backLink = (h, label) => `<a class="btn ghost sm" href="#${h}" style="margin:-8px 0 14px -12px">${IC.back} ${label}</a>`;
function noteHTML(n) {
  const K = { grammar: "Grammar", culture: "Culture", trivia: "Did you know?", spanish: "Memory shortcut", tool: "Try it" };
  let body = n.h || "";
  if (n.tool === "age") body = `<p>Numbers link to taon (years) with -ng after a vowel and na after a consonant: dalawampu't walo<b>ng</b> taon, dalawampu't apat <b>na</b> taon.</p><div class="agetool"><label class="f" for="agein">Your age<input id="agein" type="number" min="1" max="99" value="${esc(S.profile.age || 28)}" style="width:120px"></label><div class="row"><span class="out" id="ageout"></span>${playBtn('data-act="sayage"', "Play")}</div><span class="small muted" id="ageen"></span></div>`;
  body = body.replace(/<table/g, "<div class='tablewrap'><table").replace(/<\/table>/g, "</table></div>").replace(/href='#ako'/g, "href='#intro'");
  const d = NOTE_DRILL[n.t], ak = annKey(n), mine = (S.annot || {})[ak], editing = NB.annEdit === ak;
  const annot = editing ? `<div class="annot edit"><label class="f" for="annot-ta">My explanation<textarea id="annot-ta" rows="4" placeholder="Write it in your own words, add examples from class…">${esc(mine || "")}</textarea></label>
      <div class="row"><button class="btn sm primary" data-act="annsave" data-k="${esc(ak)}">Save</button><button class="btn sm ghost" data-act="anncancel">Cancel</button>${mine ? `<button class="btn sm ghost" style="color:var(--bad)" data-act="anndel" data-k="${esc(ak)}">Remove</button>` : ""}</div></div>`
    : mine ? `<div class="annot"><div class="row" style="justify-content:space-between"><span class="k">My explanation</span><button class="btn sm ghost" data-act="annedit" data-k="${esc(ak)}">Edit</button></div><div class="txt">${fmtText(mine)}</div></div>` : "";
  return `<article class="note ${n.k}"><span class="k">${K[n.k] || ""} · ${esc(n.topic.title)}</span><div class="row" style="justify-content:space-between"><h3>${esc(noteTitle(n))}</h3>${n.say ? playText(n.say) : ""}</div>${body}${annot}
    <div class="row">${d ? `<button class="btn sm" data-act="drill" data-id="${d}">${IC.play} Practise this rule</button>` : ""}${!mine && !editing ? `<button class="btn sm ghost" data-act="annedit" data-k="${esc(ak)}">${IC.pen} Add my explanation</button>` : ""}</div></article>`;
}
function myNoteHTML(c) {
  const L = c.lesson && LESSON_BY_ID[c.lesson];
  return `<article class="note mine"><span class="k">My note${L ? " · " + esc(L.title) : ""} · ${new Date(c.updated || c.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
    <div class="row" style="justify-content:space-between"><h3>${esc(c.title)}</h3><span class="row" style="gap:4px"><button class="btn sm ghost" data-act="nedit" data-id="${c.id}">${IC.pen} Edit</button>${NB.del === c.id ? `<button class="btn sm" style="color:var(--bad)" data-act="ndel2" data-id="${c.id}">Delete?</button>` : `<button class="x" data-act="ndel" data-id="${c.id}" aria-label="Delete note">${IC.trash.replace("<svg", '<svg width="18" height="18"')}</button>`}</span></div>
    ${c.text ? `<div class="rawnote">${fmtText(c.text)}</div>` : ""}${c.n ? `<p class="small muted">${c.n} words added to <a href="#wordbook">${esc(catName(c.cat))}</a></p>` : ""}</article>`;
}
VIEWS.notebook = () => {
  const cards = LESSONS.map(L => {
    const ns = nbNotes(L), own = (S.notes || []).filter(c => c.lesson === L.id).length + ns.filter(n => (S.annot || {})[annKey(n)]).length;
    return `<a class="nbcard" href="#nb-${L.id}"><span class="eyebrow">${esc(lessonLabel(L))}</span><h3>${esc(L.title)}</h3><p class="muted small">${ns.length} notes${own ? ` · ${own} of yours` : ""}</p><ul>${ns.slice(0, 4).map(n => `<li>${esc(noteTitle(n))}</li>`).join("")}${ns.length > 4 ? `<li class="muted">+ ${ns.length - 4} more</li>` : ""}</ul></a>`;
  }).join("");
  const mine = S.notes || [];
  return `${ph("Notebook", "Notebook.", "The grammar and culture notes from each class, plus your own. Pick a lesson, or search.")}
    <div class="tools"><label class="sr" for="nbq">Search the notebook</label><input id="nbq" type="search" placeholder="Search: rin, na, po, si, ang…" value="${esc(NB.q)}" autocomplete="off"><button class="btn primary" data-act="nnew">${IC.plus} New note</button></div>
    <div id="nbresults"></div>
    <div class="nbcards" id="nbcards"><a class="nbcard mine" href="#nb-mine"><span class="eyebrow">Your own</span><h3>My notes</h3><p class="muted small">${mine.length ? mine.length + " notes" : "Write your own notes and explanations here"}</p><ul>${mine.slice().sort((a, b) => (b.updated || b.date) - (a.updated || a.date)).slice(0, 4).map(c => `<li>${esc(c.title)}</li>`).join("")}</ul></a>${cards}</div>`;
};
LESSONS.forEach(L => {
  VIEWS["nb-" + L.id] = () => {
    const own = (S.notes || []).filter(c => c.lesson === L.id);
    return `${backLink("notebook", "Notebook")}${ph(esc(lessonLabel(L)), esc(L.title) + ".", "")}${nbNotes(L).map(noteHTML).join("")}
    <div class="sh"><h2>My notes for this lesson</h2><button class="btn primary" data-act="nnew" data-l="${L.id}">${IC.plus} New note</button></div>
    ${own.length ? own.map(myNoteHTML).join("") : `<p class="muted">No notes of yours here yet.</p>`}`;
  };
});
VIEWS["nb-mine"] = () => `${backLink("notebook", "Notebook")}${ph("Your own", "My notes.", "")}<div class="row" style="margin:-14px 0 20px"><button class="btn primary" data-act="nnew">${IC.plus} New note</button><a class="btn" href="#notes">Paste class notes</a></div>
  ${(S.notes || []).length ? S.notes.slice().sort((a, b) => (b.updated || b.date) - (a.updated || a.date)).map(myNoteHTML).join("") : `<div class="empty">No notes yet. Write your own explanations, questions for your teacher, or anything from class.</div>`}`;
VIEWS["nb-edit"] = () => {
  const c = NBE.id ? (S.notes || []).find(x => x.id === NBE.id) : null, lesson = c ? c.lesson || "" : NBE.lesson;
  return `${backLink(NBE.back, "Back")}${ph("Notebook", c ? "Edit note." : "New note.", "")}
  <form id="noteform" class="pastebox" autocomplete="off">
    <div class="grid2"><label class="f" for="ne-title">Title<input id="ne-title" type="text" required value="${esc(c ? c.title : "")}" placeholder="e.g. When to use po"></label>
    <label class="f" for="ne-lesson">Lesson<select id="ne-lesson"><option value="">No lesson</option>${LESSONS.map(L => `<option value="${L.id}" ${lesson === L.id ? "selected" : ""}>${esc(lessonLabel(L))} · ${esc(L.title)}</option>`).join("")}</select></label></div>
    <label class="f" for="ne-text">Note<textarea id="ne-text" rows="14" placeholder="Write anything: an explanation in your own words, examples from class, questions for your teacher…">${esc(c ? c.text : "")}</textarea></label>
    <p class="small muted">Tip: put a word between **double stars** to make it bold.</p>
    <div class="row"><button class="btn primary">Save note</button><a class="btn ghost" href="#${NBE.back}">Cancel</a>${c ? (NB.del === c.id ? `<button type="button" class="btn sm" style="color:var(--bad);margin-left:auto" data-act="ndel2" data-id="${c.id}">Delete this note?</button>` : `<button type="button" class="btn ghost" style="color:var(--bad);margin-left:auto" data-act="ndel" data-id="${c.id}">${IC.trash} Delete</button>`) : ""}</div>
  </form>`;
};
function nbSearch() {
  const box = $("#nbresults"); if (!box) return;
  const q = norm(NB.q); $("#nbcards").hidden = !!q;
  if (!q) { box.innerHTML = ""; return; }
  const hits = LESSONS.flatMap(nbNotes).filter(n => norm(noteTitle(n) + " " + (n.h || "").replace(/<[^>]+>/g, " ") + " " + ((S.annot || {})[annKey(n)] || "")).includes(q));
  const mine = (S.notes || []).filter(c => norm(c.title + " " + c.text).includes(q));
  box.innerHTML = hits.length || mine.length ? mine.map(myNoteHTML).join("") + hits.map(n => `<p class="small muted" style="margin:6px 0">${esc(lessonLabel(n.lesson))} · ${esc(n.lesson.title)}</p>` + noteHTML(n)).join("") : `<div class="empty">Nothing found for “${esc(NB.q)}”.</div>`;
  updateAge();
}

const PN = { text: "", swap: false, cat: "", title: "" };
function parseNotes(text) {
  return text.split(/\r?\n/).map(l => l.trim().replace(/^(?:[-•*·▪]\s+|\d+[.)]\s+)/, "")).filter(l => l && !/^#/.test(l)).map(l => {
    const m = l.match(/^(.+?)\s*(?:=|→|->|⇒|\t|\s[–—-]\s|:)\s*(.+)$/);
    let tl = m ? m[1].trim() : l, en = m ? m[2].trim() : "";
    if (PN.swap && en) [tl, en] = [en, tl];
    const dup = allIds().some(id => [ITEMS[id].tl, ...(ITEMS[id].alt || [])].some(x => norm(x) === norm(tl)));
    return { tl: tl.replace(/^["“']|["”']$/g, ""), en, dup };
  });
}
VIEWS.notes = () => {
  const cats = catList(), def = PN.cat || "u:" + "Class " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return `${ph("Wordbook", "Your words.", "")}${wbTabs("notes")}
  <div class="pastebox"><div><h3>Paste your class notes</h3><p class="muted small" style="margin-top:6px">One word or phrase per line, with its meaning after =, a dash, a colon or a tab. Bullets and numbers are fine. Check the list below, then add the words to your Wordbook. The notes are also kept in your Notebook.</p></div>
    <div class="grid2"><label class="f" for="pn-title">Title<input id="pn-title" type="text" value="${esc(PN.title || "Class of " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long" }))}"></label>
    <label class="f" for="pn-cat">Add the words to<select id="pn-cat">${cats.map(c => `<option value="${esc(c.id)}" ${PN.cat === c.id ? "selected" : ""}>${esc(c.name)}</option>`).join("")}<option value="${esc(def)}" ${!PN.cat || PN.cat === def ? "selected" : ""}>New: ${esc(def.slice(2))}</option></select></label></div>
    <label class="f" for="pn-text">Notes<textarea id="pn-text" rows="9" placeholder="kaibigan = friend&#10;- bahay: house&#10;Saan ka nakatira? → Where do you live?&#10;maganda ang panahon - the weather is nice">${esc(PN.text)}</textarea></label>
    <div class="row"><label class="row small" style="gap:8px;cursor:pointer"><input type="checkbox" id="pn-swap" ${PN.swap ? "checked" : ""}> My notes put the meaning first</label></div>
    <div id="pnpreview"></div></div>`;
};
function pnPreview() {
  const box = $("#pnpreview"); if (!box) return;
  const rows = parseNotes(PN.text);
  if (!rows.length) { box.innerHTML = ""; return; }
  box.innerHTML = `<div class="pnlist">${rows.map((r, i) => `<div class="pnrow ${r.dup ? "dup" : ""}"><input type="checkbox" data-pn="${i}" ${!r.dup && r.en ? "checked" : ""}><input type="text" data-pt="${i}" value="${esc(r.tl)}" aria-label="Tagalog"><input type="text" data-pe="${i}" value="${esc(r.en)}" placeholder="Add the meaning" aria-label="Meaning">${r.dup ? '<span class="tag">already in Wordbook</span>' : ""}</div>`).join("")}</div>
    <div class="row" style="justify-content:space-between"><span class="small muted" id="pncount"></span><button class="btn primary" data-act="pnadd">${IC.plus} Add to Wordbook</button></div>`;
  pnCount();
}
function pnCount() { const n = $$("[data-pn]").filter(c => c.checked).length; const el = $("#pncount"); if (el) el.textContent = `${n} of ${$$("[data-pn]").length} lines selected`; }

const speakHead = on => `${ph("Speak", "Speak.", "")}${tabs([["speak", "Role-plays"], ["mia", "Chat with Ate Mia"], ["intro", "My introduction"]], on)}`;
VIEWS.speak = () => `${speakHead("speak")}<p class="muted" style="margin-bottom:20px;max-width:62ch">Step into a real situation. Listen to each line, choose what you'd say, and see why one answer fits better than another. English is hidden at first to train your ear.</p>
  <div class="scenes">${SCENES.map(s => `<button class="scene-card" data-act="scene" data-id="${s.id}"><div class="row" style="justify-content:space-between"><span class="tag cream">${esc(s.time)}</span>${starsHTML(S.scenes[s.id] || 0)}</div><h3>${esc(s.tl)}</h3><p class="muted">${esc(s.title)}</p><p class="small">${esc(s.setup)}</p></button>`).join("")}</div>`;
VIEWS.mia = () => viewTutor();
VIEWS.intro = () => viewIntro();

function forecastSVG() {
  const now = Date.now(), sod = startOfDay(now), days = [0, 1, 2, 3, 4, 5, 6];
  const cards = Object.entries(S.cards).filter(([id]) => ITEMS[id]).map(([, c]) => c);
  const counts = days.map(d => cards.filter(c => d === 0 ? c.due < sod + DAY : c.due >= sod + d * DAY && c.due < sod + (d + 1) * DAY).length);
  const max = Math.max(4, ...counts), W = 420, H = 170, pl = 30, pb = 24, pt = 16, bw = (W - pl - 10) / 7;
  const y = v => H - pb - (v / max) * (H - pb - pt);
  const names = ["Today", "Tmrw", ...days.slice(2).map(d => new Date(sod + d * DAY).toLocaleDateString("en", { weekday: "short" }))];
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Words to review over the next 7 days">
    ${[0, Math.round(max / 2), max].map(t => `<line x1="${pl}" x2="${W - 6}" y1="${y(t)}" y2="${y(t)}" stroke="var(--line)" stroke-dasharray="${t ? "3 4" : "0"}"/><text x="${pl - 6}" y="${y(t) + 4}" text-anchor="end">${t}</text>`).join("")}
    ${counts.map((c, i) => `<rect x="${pl + i * bw + 7}" y="${y(c)}" width="${bw - 14}" height="${Math.max(0, H - pb - y(c))}" rx="6" fill="${i === 0 ? "var(--gold)" : "var(--green)"}"/>${c ? `<text x="${pl + i * bw + bw / 2}" y="${y(c) - 6}" text-anchor="middle" style="fill:var(--ink);font-weight:600">${c}</text>` : ""}<text x="${pl + i * bw + bw / 2}" y="${H - 6}" text-anchor="middle">${names[i]}</text>`).join("")}</svg>`;
}
VIEWS.progress = () => {
  const ids = allIds(), lv = id => level(id);
  const groups = [ids.filter(id => lv(id) < 0).length, ids.filter(id => lv(id) === 0).length, ids.filter(id => lv(id) >= 1 && lv(id) <= 2).length, ids.filter(id => lv(id) >= 3 && lv(id) <= 4).length, ids.filter(id => lv(id) >= 5).length];
  const names = ["Not started", "Still learning", "Learning", "Getting there", "Known"];
  const done = STEPS.filter(s => S.steps[s.id]).length, v = voice(), fil = hasFilipino();
  return `${ph("Progress", "Progress.", "")}
  <div class="grid3"><div class="card"><span class="eyebrow">This week</span><span class="big">${weekMet(Date.now())}<span style="font-size:.45em" class="muted">/${goalDays()}</span></span><p class="muted">days with ${goalMin()}+ minutes</p></div>
    <div class="card"><span class="eyebrow">Known words</span><span class="big">${groups[4]}</span><p class="muted">of ${ids.length} (reviewed after 30+ days)</p></div>
    <div class="card"><span class="eyebrow">Lesson steps</span><span class="big">${done}</span><p class="muted">of ${STEPS.length} done</p></div></div>
  <div style="margin-top:18px">${calendarHTML()}</div>
  <div style="margin-top:18px">${examPanelHTML()}</div>
  <div class="grid2" style="margin-top:18px">
    <div class="panel"><h3>Your words</h3><div class="stagebar">${groups.map((c, s) => c ? `<i class="st${s}" style="width:${c / ids.length * 100}%" title="${names[s]}: ${c}"></i>` : "").join("")}</div>
      <div class="legend">${groups.map((c, s) => `<span><i class="st${s}"></i>${names[s]} <b>${c}</b></span>`).join("")}</div></div>
    <div class="panel"><h3>Reviews this week</h3>${forecastSVG()}</div></div>
  <div class="sh"><h2>Settings</h2></div>
  <div class="grid2">
    <div class="panel"><h3>Study goal</h3>
      <div class="grid2" style="gap:12px"><label class="f" for="set-goalmin">Minutes a day<select id="set-goalmin">${[10, 15, 20, 30, 45, 60].map(n => `<option value="${n}" ${goalMin() === n ? "selected" : ""}>${n} min</option>`).join("")}</select></label>
      <label class="f" for="set-goaldays">Days a week<select id="set-goaldays">${[3, 4, 5, 6, 7].map(n => `<option value="${n}" ${goalDays() === n ? "selected" : ""}>${n} days</option>`).join("")}</select></label></div>
      <p class="small muted">Time counts automatically while you use the site and are active. It stops after 2 minutes without a click, key or sound. Add class time from the calendar.</p></div>
    <div class="panel"><h3>Practice</h3>
      <label class="f" for="set-new">New words per day<select id="set-new">${[5, 10, 15, 20, 30].map(n => `<option value="${n}" ${S.settings.newPerDay === n ? "selected" : ""}>${n}</option>`).join("")}</select></label>
      <label class="f" for="set-dir">Flashcards show first<select id="set-dir"><option value="tl" ${S.settings.dir === "tl" ? "selected" : ""}>Tagalog (you recall the meaning)</option><option value="en" ${S.settings.dir === "en" ? "selected" : ""}>English (you recall the Tagalog)</option><option value="mix" ${S.settings.dir === "mix" ? "selected" : ""}>A mix of both</option></select></label></div>
    <div class="panel"><h3>Voice</h3>
      <p class="small muted">${AUDIO.size} lesson phrases use a recorded Filipino voice. Your own words and sentences use your device's voice${fil ? " (Filipino)" : ", which has no Filipino voice: Edge on Windows has one"}.</p>
      ${TTS.ok && TTS.voices.length ? `<label class="f" for="voicesel">Device voice<select id="voicesel">${TTS.voices.slice(0, 40).map(x => `<option value="${esc(x.voiceURI)}" ${v && v.voiceURI === x.voiceURI ? "selected" : ""}>${esc(x.name)} (${esc(x.lang)})</option>`).join("")}</select></label>` : ""}
      <label class="f" for="ratesel">Speed <span class="h" id="ratev">${S.settings.rate.toFixed(2)}×</span><input id="ratesel" type="range" min="0.6" max="1.2" step="0.05" value="${S.settings.rate}"></label>
      <button class="btn sm" data-act="saytext" data-text="Magandang umaga! Kumusta ka?">${IC.play} Test the voice</button></div>
  </div>
  <div class="panel" style="margin-top:18px"><h3>Your data</h3><p class="small">${Cloud.status === "cloud" ? "Saved privately to your Claude account, so it follows you across devices." : "Saved in this browser on this device."}</p><div class="row"><button class="btn sm" data-act="export">Download a backup</button><label class="btn sm" for="importfile" style="cursor:pointer">Restore a backup<input id="importfile" type="file" accept=".json,application/json" class="sr"></label></div><p class="small muted">Use the backup to move your progress to another device or website, like a copy on Netlify.</p><div id="resetbox"><button class="btn sm" data-act="reset-ask">Reset all progress</button></div></div>`;
};

VIEWS.about = () => `${ph("How it works", "Why this sticks.", "Every part of the site uses a learning technique with solid research behind it.")}
  <div class="grid2">${SCIENCE.map(s => `<div class="sci"><b>${esc(s.k)}</b><p>${esc(s.s)}</p><p class="small">Where: ${esc(s.where.replace("Review", "Practice").replace("Every game", "Practice").replace("Situations, Kausap", "Speak").replace("Daily review, mixed practice", "Practice, mixed mode").replace("Type it, Build it", "Write, Build").replace("Cards", "Lessons").replace("Memory hooks", "Lessons, Wordbook").replace("Say it aloud", "Lessons"))}</p><p class="ref muted">${esc(s.ref)}</p></div>`).join("")}</div>
  <div class="panel" style="margin-top:18px"><h3>The review schedule</h3><p class="small">Practice uses Leitner boxes, the system behind flashcard apps like Duocards. Each word sits in a box. Know it, and it moves up a box and waits longer before coming back: 1, 3, 7, 14, 30, 60, 120, then 240 days. Miss it, and it goes back to the start and returns in the same session until you get it right. A word counts as known once it waits a month or more.</p></div>`;
