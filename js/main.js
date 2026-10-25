let PENDING = null;
const ACTIONS = {
  say(t) { const it = ITEMS[t.dataset.id]; if (it) speak(sayText(it), { slow: !!t.dataset.slow, btn: t }); },
  saytext(t) { const x = t.dataset.text; if (x.includes(" ... ")) speakSeq(x.split(/\s*\.\.\.\s*/).filter(Boolean)); else speak(x, { slow: !!t.dataset.slow, btn: t }); },
  sayage() { const o = $("#ageout"); if (o && o.textContent) speak(o.textContent); },
  step(t) { startStep(t.dataset.id); },
  resume() { resume(); },
  "practice-due"() { startPractice(true); },
  pstart() { startPractice(false); },
  pcat(t) {
    const c = t.dataset.c; let a = S.settings.pcats.slice();
    if (c === "all") a = []; else a = a.includes(c) ? a.filter(x => x !== c) : [...a, c];
    S.settings.pcats = a; save(); render();
  },
  pmore() { const t = dkey(Date.now()); if (S.daily.date !== t) S.daily = { date: t, n: 0, bonus: 0 }; S.daily.bonus = (S.daily.bonus || 0) + 10; save(); render(); toast("10 more new words for today"); },
  pmode(t) { S.settings.mode = t.dataset.m; save(); render(); },
  wbcat(t) { WB.cat = t.dataset.c; WB.open = null; wbFilter(); },
  wopen(t, e) {
    if (e.target.closest(".wmore")) return;
    WB.open = WB.open === t.dataset.id ? null : t.dataset.id; WB.del = null; wbFilter();
    if (WB.open) { const it = ITEMS[WB.open]; speak(sayText(it)); }
  },
  wdel(t) { WB.del = t.dataset.id; wbFilter(); },
  wadd(t) { S.wanted[t.dataset.id] = 1; save(); wbFilter(); chrome(); toast(`“${ITEMS[t.dataset.id].tl}” added to Practice`); },
  waddcat(t) {
    const ids = allIds().filter(id => catOf(ITEMS[id]) === t.dataset.c && !inPractice(id));
    ids.forEach(id => S.wanted[id] = 1); save(); wbFilter();
    toast(`${ids.length} words added to Practice · ${S.settings.newPerDay} new per day (change it in Progress)`);
  },
  wdel2(t) {
    const id = t.dataset.id; S.custom = S.custom.filter(w => w.id !== id); delete S.cards[id];
    syncCustom(); WB.del = null; WB.open = null; save(); wbFilter(); toast("Word deleted");
  },
  addtoggle() { WB.adding = !WB.adding; const f = $("#addform"); if (f) { f.hidden = !WB.adding; if (WB.adding) { const q = $("#wbq"); if (q && q.value && !$("#nw-tl").value) $("#nw-tl").value = q.value; $("#nw-tl").focus(); } } },
  drill(t) { startDrill(t.dataset.id); },
  scene(t) { if (SESSION.active) { $("#session").hidden = true; SESSION.active = false; } runScene(t.dataset.id); },
  again() { const f = SESSION.again; if (f) f(); },
  after() { const f = SESSION.after; if (f) f(); else closeSession(); },
  "close-session"() { closeSession(); },
  introplay() { speakSeq(introLines().map(l => l.tl)); },
  introfade() { fadeLevel = fadeLevel >= 4 ? 0 : fadeLevel + 1; drawIntro(); },
  interview() { startInterview(); },
  revealen(t, e) { if (e.target.closest(".play")) return; const en = $(".en", t); if (en) en.hidden = !en.hidden; },
  tstart() { if (Tutor.ctl) Tutor.ctl.abort(); Tutor.turns = []; Tutor.msgs = []; Tutor.started = false; Tutor.busy = false; tutorDraw(); tutorInit().then(() => { if (Tutor.sample) tutorSend(""); }); const b = $("[data-act=tstart]"); if (b) b.innerHTML = IC.repeat + " Start over"; },
  nbkind(t, e) { e.preventDefault(); NB.kind = t.dataset.k; render(); },
  nbjump(t, e) { e.preventDefault(); const el = document.getElementById(t.dataset.to); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); },
  "reset-ask"() { $("#resetbox").innerHTML = `<div class="confirm"><b>Erase all progress?</b><span class="small">Your progress, your own words and your intro details will be deleted.</span><div class="row"><button class="btn sm" data-act="reset-no">Keep my progress</button><button class="btn sm primary" style="background:var(--bad);border-color:var(--bad);color:#fff" data-act="reset-yes">Erase everything</button></div></div>`; },
  "reset-no"() { render(); },
  exam(t) { const sc = t.dataset.scope || ($("#exam-scope") ? $("#exam-scope").value : "all"); startExam(sc); },
  "exam-cat"(t) { S.settings.pcats = [t.dataset.c]; save(); closeSession(); location.hash = "practice"; },
  "exam-add"(t) { const ids = t.dataset.ids.split(",").filter(Boolean); ids.forEach(id => { S.wanted[id] = 1; if (S.cards[id]) S.cards[id].due = Math.min(S.cards[id].due, Date.now()); }); save(); t.disabled = true; t.textContent = "Added to Practice"; },
  hookedit(t) { WB.hookEdit = t.dataset.id; wbFilter(); const ta = $("#hook-ta"); if (ta) ta.focus(); },
  hookcancel() { WB.hookEdit = null; wbFilter(); },
  hooksave(t) { const v = ($("#hook-ta").value || "").trim(); if (v) S.hooks[t.dataset.id] = v; else delete S.hooks[t.dataset.id]; WB.hookEdit = null; save(); wbFilter(); toast(v ? "Your hook is saved. It shows on the flashcard too." : "Hook removed"); },
  "plan-start"() { planStart(); },
  "plan-go"() { PLAN.i = nextBlock(); runBlock(); },
  "plan-pick"(t) { PLAN.i = +t.dataset.i; runBlock(); },
  "plan-view"() { planOverview(); },
  "plan-next"() { PLAN.i = nextBlock(); runBlock(); },
  "plan-stop"() { closeSession(); },
  "plan-more"() { const ids = Object.keys(S.cards).filter(id => ITEMS[id]); PLAN.blocks.push({ k: "mixed", label: "Mixed practice", est: 5 }); PLAN.i = PLAN.blocks.length - 1; runBlock(); if (!ids.length) toast("Learn a few words first"); },
  calnav(t) { CAL.m += +t.dataset.d; if (CAL.m < 0) { CAL.m = 11; CAL.y--; } if (CAL.m > 11) { CAL.m = 0; CAL.y++; } CAL.sel = null; calRefresh(); },
  calday(t) { CAL.sel = CAL.sel === t.dataset.k ? null : t.dataset.k; CAL.selT = t.dataset.t; calRefresh(); },
  caladd(t) { const k = CAL.sel, sec = +t.dataset.min * 60; S.time[k] = (S.time[k] || 0) + sec; S.manual[k] = (S.manual[k] || 0) + sec; save(); calRefresh(); habitChrome(); toast(`Added ${t.dataset.min} minutes`); },
  calundo() { const k = CAL.sel, sec = S.manual[k] || 0; S.time[k] = Math.max(0, (S.time[k] || 0) - sec); delete S.manual[k]; save(); calRefresh(); habitChrome(); },
  pnadd() {
    const cat = $("#pn-cat").value, title = $("#pn-title").value.trim() || "Class notes";
    const rows = $$("[data-pn]").filter(c => c.checked).map(c => ({ tl: $(`[data-pt="${c.dataset.pn}"]`).value.trim(), en: $(`[data-pe="${c.dataset.pn}"]`).value.trim() })).filter(r => r.tl && r.en);
    if (!rows.length && !PN.text.trim()) { toast("Paste your notes first"); return; }
    const t0 = Date.now();
    rows.forEach((r, i) => S.custom.push({ id: "c" + (t0 + i).toString(36), tl: r.tl, en: r.en, cat }));
    S.notes.push({ id: "n" + t0.toString(36), title, date: t0, text: PN.text, cat, n: rows.length });
    syncCustom(); save();
    PN.text = ""; PN.title = ""; PN.cat = ""; WB.cat = rows.length ? cat : "all"; WB.q = "";
    toast(rows.length ? `${rows.length} words added · notes saved in your Notebook` : "Notes saved in your Notebook");
    location.hash = rows.length ? "wordbook" : "nb-mine";
  },
  ndel(t) { NB.del = t.dataset.id; render(); },
  nnew(t) { NBE.id = null; NBE.lesson = t.dataset.l || ""; NBE.back = currentRoute(); NB.del = null; location.hash = "nb-edit"; },
  nedit(t) { NBE.id = t.dataset.id; NBE.back = currentRoute(); NB.del = null; location.hash = "nb-edit"; },
  annedit(t) { NB.annEdit = t.dataset.k; const y = window.scrollY; render(); window.scrollTo(0, y); const ta = $("#annot-ta"); if (ta) ta.focus({ preventScroll: true }); },
  anncancel() { NB.annEdit = null; const y = window.scrollY; render(); window.scrollTo(0, y); },
  annsave(t) { const v = ($("#annot-ta").value || "").trim(); if (v) S.annot[t.dataset.k] = v; else delete S.annot[t.dataset.k]; NB.annEdit = null; save(); const y = window.scrollY; render(); window.scrollTo(0, y); toast(v ? "Explanation saved" : "Explanation removed"); },
  anndel(t) { delete S.annot[t.dataset.k]; NB.annEdit = null; save(); const y = window.scrollY; render(); window.scrollTo(0, y); toast("Explanation removed"); },
  ndel2(t) { S.notes = S.notes.filter(c => c.id !== t.dataset.id); NB.del = null; save(); if (currentRoute() === "nb-edit") location.hash = NBE.back === "nb-edit" ? "nb-mine" : NBE.back; else render(); toast("Note deleted"); },
  async export() {
    const data = JSON.stringify(S), filename = `tagalog-progress-${new Date().toISOString().slice(0, 10)}.json`;
    let dl = null; try { if (window.claude && typeof window.claude.use === "function") dl = await window.claude.use("downloads"); } catch (e) { }
    if (dl) { try { await dl.save({ filename, data }); toast("Backup saved"); } catch (e) { if (e && e.code !== "cancelled" && e.code !== "declined") toast("The download didn't go through"); } return; }
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([data], { type: "application/json" })); a.download = filename; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  },
  "import-yes"() { if (!PENDING) return; S = normalize(PENDING); PENDING = null; syncCustom(); save(); cloudSave(); render(); toast("Progress restored"); },
  "reset-yes"() { S = blank(); syncCustom(); save(); cloudSave(); render(); toast("Progress erased"); }
};
document.addEventListener("click", e => {
  const t = e.target.closest("[data-act]"); if (!t || t.tagName === "INPUT") return;
  const f = ACTIONS[t.dataset.act]; if (f) f(t, e);
});
document.addEventListener("change", e => {
  const t = e.target;
  if (t.id === "set-new") { S.settings.newPerDay = +t.value; save(); }
  if (t.id === "set-goalmin") { S.settings.goalMin = +t.value; save(); render(); }
  if (t.id === "set-goaldays") { S.settings.goalDays = +t.value; save(); render(); }
  if (t.id === "set-dir") { S.settings.dir = t.value; save(); }
  if (t.id === "set-auto") { S.settings.autoNext = t.value === "1"; save(); }
  if (t.id === "voicesel") { S.settings.voice = t.value; save(); ttsSpeak("Salamat!", {}, () => { }); }
  if (t.id === "pn-swap") { PN.swap = t.checked; pnPreview(); }
  if (t.id === "pn-cat") PN.cat = t.value;
  if (t.dataset && t.dataset.pn != null) pnCount();
  if (t.id === "importfile" && t.files && t.files[0]) {
    const r = new FileReader();
    r.onload = () => {
      try {
        const o = JSON.parse(r.result); if (!o || typeof o !== "object" || !o.cards) throw 0;
        PENDING = o;
        $("#resetbox").innerHTML = `<div class="confirm"><b>Replace your progress with this backup?</b><span class="small">${Object.keys(o.cards).length} words practised, ${(o.custom || []).length} of your own words${o.updatedAt ? ", saved " + new Date(o.updatedAt).toLocaleString("en-GB") : ""}.</span><div class="row"><button class="btn sm" data-act="reset-no">Cancel</button><button class="btn sm primary" data-act="import-yes">Replace with backup</button></div></div>`;
      } catch (e) { toast("That file isn't a Tagalog backup"); }
    };
    r.readAsText(t.files[0]); t.value = "";
  }
  if (t.id === "nw-cat") { $("#nw-newwrap").hidden = t.value !== "__new"; if (t.value === "__new") $("#nw-newcat").focus(); }
});
document.addEventListener("input", e => {
  const t = e.target;
  if (t.id === "wbq") { WB.q = t.value; wbFilter(); }
  if (t.id === "nbq") { NB.q = t.value; nbSearch(); }
  if (t.id === "pn-text") { PN.text = t.value; pnPreview(); }
  if (t.id === "pn-title") PN.title = t.value;
  if (t.id === "agein") updateAge();
  if (t.id === "ratesel") { S.settings.rate = +t.value; $("#ratev").textContent = S.settings.rate.toFixed(2) + "×"; save(); }
});
document.addEventListener("submit", e => {
  if (e.target.id === "noteform") {
    e.preventDefault();
    const title = $("#ne-title").value.trim(), text = $("#ne-text").value.replace(/\s+$/, ""), lesson = $("#ne-lesson").value, now = Date.now();
    if (!title) { toast("Give your note a title"); $("#ne-title").focus(); return; }
    const c = NBE.id ? S.notes.find(x => x.id === NBE.id) : null;
    if (c) Object.assign(c, { title, text, lesson, updated: now }); else S.notes.push({ id: "n" + now.toString(36), title, text, lesson, date: now, updated: now });
    save(); toast("Note saved"); location.hash = NBE.back && NBE.back !== "nb-edit" ? NBE.back : "nb-mine"; return;
  }
  if (e.target.id !== "addform") return;
  e.preventDefault();
  const tl = $("#nw-tl").value.trim(), en = $("#nw-en").value.trim(); let cat = $("#nw-cat").value;
  if (!tl || !en) { toast("Add the Tagalog word and its meaning"); return; }
  if (cat === "__new") { const nm = $("#nw-newcat").value.trim(); if (!nm) { toast("Give the new category a name"); $("#nw-newcat").focus(); return; } cat = "u:" + nm; }
  const ex = $("#nw-ex").value.trim();
  S.custom.push({ id: "c" + Date.now().toString(36), tl, en, cat, ex });
  syncCustom(); save();
  WB.adding = false; WB.q = ""; WB.cat = cat; render();
  toast(`“${tl}” added to ${catName(cat)}`);
});
function updateAge() {
  const i = $("#agein"); if (!i) return;
  const n = parseInt(i.value, 10), s = ageTL(n);
  $("#ageout").textContent = s ? s + " ako." : "Enter a number from 1 to 99";
  $("#ageen").textContent = s ? `I am ${n} years old.` : "";
}
document.addEventListener("keydown", e => {
  const typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
  if (!SESSION.active) { if (e.target.classList && e.target.classList.contains("wrow") && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); e.target.click(); } return; }
  if (typing) return;
  if (SESSION.swipe) {
    if (e.key === "ArrowRight") { e.preventDefault(); SESSION.swipe.decide(true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); SESSION.swipe.decide(false); }
    else if (e.key === " " && e.target.id !== "card") { e.preventDefault(); SESSION.swipe.flip(); }
    return;
  }
  if (/^[1-5]$/.test(e.key)) { const all = $$("#session .opt"), b = all[+e.key - 1]; if (b && !b.disabled) b.click(); }
});

syncCustom();
render();
cloudInit();
