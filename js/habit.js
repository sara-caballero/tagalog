const TRACK = { active: Date.now(), ticks: 0 };
["pointerdown", "keydown", "wheel", "touchstart", "scroll"].forEach(ev => document.addEventListener(ev, () => { TRACK.active = Date.now(); }, { passive: true, capture: true }));
const goalMin = () => S.settings.goalMin || 30, goalDays = () => S.settings.goalDays || 5;
const minsOn = k => Math.floor(((S.time || {})[k] || 0) / 60);
function tickStudy() {
  const now = Date.now();
  if (document.visibilityState !== "visible" || now - TRACK.active > 120000) return;
  if (!S.time) S.time = {};
  const k = dkey(now), before = minsOn(k);
  S.time[k] = (S.time[k] || 0) + 15;
  if (++TRACK.ticks % 4 === 0) {
    const keys = Object.keys(S.time); if (keys.length > 420) keys.slice(0, keys.length - 420).forEach(x => delete S.time[x]);
    save();
  }
  if (minsOn(k) !== before) {
    habitChrome();
    if (minsOn(k) === goalMin()) toast(`${goalMin()} minutes today. Goal done! Magaling!`);
    if (!SESSION.active && currentRoute() === "today") { const w = $("#weekcard"); if (w) w.outerHTML = weekCardHTML(); }
  }
}
setInterval(tickStudy, 15000);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") save(); });

const mondayOf = t => { const d = new Date(startOfDay(t)); const wd = (d.getDay() + 6) % 7; return d.getTime() - wd * DAY + 3 * 3600e3; };
const weekDays = t => { const m = startOfDay(mondayOf(t)); return [0, 1, 2, 3, 4, 5, 6].map(i => startOfDay(m + i * DAY + 3 * 3600e3)); };
const dayMet = k => minsOn(k) >= goalMin();
function weekMet(t) { return weekDays(t).filter(d => dayMet(dkey(d))).length; }
function weekStreak() {
  let n = 0, t = Date.now();
  if (weekMet(t) >= goalDays()) n++;
  t = mondayOf(t) - 2 * DAY;
  while (weekMet(t) >= goalDays()) { n++; t = mondayOf(t) - 2 * DAY; }
  return n;
}
function dotHTML(k, size) {
  const m = minsOn(k), p = Math.min(1, m / goalMin()), r = size / 2 - 3, c = 2 * Math.PI * r;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="${p >= 1 ? "var(--green)" : "none"}" stroke="var(--line)" stroke-width="3"/>${p > 0 && p < 1 ? `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linecap="round" stroke-dasharray="${c * p} ${c}" transform="rotate(-90 ${size / 2} ${size / 2})"/>` : ""}${p >= 1 ? `<path d="M${size * .32} ${size * .52} l${size * .12} ${size * .12} l${size * .24} -${size * .26}" fill="none" stroke="var(--green-ink)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>` : ""}</svg>`;
}
function weekCardHTML() {
  const days = weekDays(Date.now()), today = dkey(Date.now()), met = weekMet(Date.now()), m = minsOn(today), g = goalMin();
  return `<div class="card weekcard" id="weekcard"><div class="row" style="justify-content:space-between"><span class="eyebrow">Your week</span><a class="small" href="#progress">Calendar</a></div>
    <div class="weekrow">${days.map(d => { const k = dkey(d); return `<div class="wd ${k === today ? "today" : ""}">${dotHTML(k, 40)}<span>${new Date(d).toLocaleDateString("en-GB", { weekday: "narrow" })}</span><small>${minsOn(k) ? minsOn(k) + "′" : ""}</small></div>`; }).join("")}</div>
    <div class="goalbar"><div class="row" style="justify-content:space-between"><b>${Math.min(m, 999)} of ${g} minutes today</b><span class="small muted">${met} of ${goalDays()} days this week</span></div><div class="meter"><i style="width:${Math.min(100, m / g * 100)}%"></i></div></div></div>`;
}
function habitChrome() {
  const el = $("#sstreak"); if (!el) return;
  const met = weekMet(Date.now()), m = minsOn(dkey(Date.now()));
  el.innerHTML = `<div style="display:grid;gap:8px;width:100%"><div class="row" style="justify-content:space-between"><span class="small"><b style="font:400 26px/1 var(--f-display)">${met}</b>/${goalDays()} days this week</span></div>
    <div class="miniweek">${weekDays(Date.now()).map(d => dotHTML(dkey(d), 26)).join("")}</div><span class="small muted">${m} of ${goalMin()} min today</span></div>`;
}

const CAL = { y: new Date().getFullYear(), m: new Date().getMonth(), sel: null };
function calendarHTML() {
  const first = new Date(CAL.y, CAL.m, 1), lead = (first.getDay() + 6) % 7, days = new Date(CAL.y, CAL.m + 1, 0).getDate();
  const today = dkey(Date.now()), cells = [];
  for (let i = 0; i < lead; i++) cells.push(`<span class="cal-cell empty"></span>`);
  let total = 0, metDays = 0;
  for (let d = 1; d <= days; d++) {
    const t = new Date(CAL.y, CAL.m, d).getTime(), k = dkey(t), m = minsOn(k), lvl = m === 0 ? 0 : m < goalMin() / 2 ? 1 : m < goalMin() ? 2 : 3;
    total += m; if (m >= goalMin()) metDays++;
    cells.push(`<button class="cal-cell l${lvl} ${k === today ? "today" : ""} ${CAL.sel === k ? "sel" : ""}" data-act="calday" data-k="${k}" data-t="${t}" aria-label="${new Date(t).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}: ${m} minutes"><span>${d}</span>${m ? `<small>${m}′</small>` : ""}</button>`);
  }
  const monthName = first.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  let sel = "";
  if (CAL.sel) {
    const t = +CAL.selT, m = minsOn(CAL.sel), future = t > Date.now();
    sel = `<div class="calsel"><b>${new Date(t).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</b><span class="muted small">${m} minutes${m >= goalMin() ? " · goal met" : ""}</span>
      ${future ? "" : `<div class="row"><span class="small">Studied away from the site (a class, homework)?</span><button class="btn sm" data-act="caladd" data-min="15">+15 min</button><button class="btn sm" data-act="caladd" data-min="30">+30 min</button><button class="btn sm" data-act="caladd" data-min="60">+1 hour</button>${(S.manual || {})[CAL.sel] ? `<button class="btn sm ghost" data-act="calundo">Undo added time</button>` : ""}</div>`}</div>`;
  }
  return `<div class="panel" id="calpanel"><div class="row" style="justify-content:space-between"><h3>Study calendar</h3><div class="row" style="gap:6px"><button class="iconbtn" data-act="calnav" data-d="-1" aria-label="Previous month">${IC.back}</button><b style="min-width:9em;text-align:center">${esc(monthName)}</b><button class="iconbtn" data-act="calnav" data-d="1" aria-label="Next month">${IC.arrow}</button></div></div>
    <div class="cal">${["M", "T", "W", "T", "F", "S", "S"].map(x => `<span class="cal-h">${x}</span>`).join("")}${cells.join("")}</div>
    <div class="legend"><span><i class="l0b"></i>No study</span><span><i class="l1b"></i>A little</span><span><i class="l2b"></i>Over half</span><span><i class="l3b"></i>${goalMin()}+ min</span></div>
    <p class="small muted">${Math.round(total / 6) / 10} hours this month · goal met on ${metDays} ${metDays === 1 ? "day" : "days"} · ${weekStreak()} ${weekStreak() === 1 ? "week" : "weeks"} in a row at ${goalDays()}+ days</p>${sel}</div>`;
}
function calRefresh() { const p = $("#calpanel"); if (p) p.outerHTML = calendarHTML(); }
