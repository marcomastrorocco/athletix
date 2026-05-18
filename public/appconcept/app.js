/* ============================================================
   Athletix Mobile App — Demo (vanilla JS SPA)
   ============================================================ */

// ---------- DATA -------------------------------------------------

const COACHES = {
  marco: { id: 'marco', name: 'Marco Mastrorocco', role: 'Director of Ath. Performance', initials: 'MM' },
  reza:  { id: 'reza',  name: 'Reza Sharifian',    role: 'Head Coach',                  initials: 'RS' },
  sam:   { id: 'sam',   name: 'Sam Mulherin',      role: 'S&C Coach',                   initials: 'SM' },
  ritti: { id: 'ritti', name: 'Ritti Kagi',        role: 'S&C Coach',                   initials: 'RK' },
  sasha: { id: 'sasha', name: 'Sasha Cochrane',    role: 'S&C Coach',                   initials: 'SC' },
};

const CLASSES = [
  { id: 'c1', day: 'today',    time: '06:00', period: 'AM', type: 'STRENGTH',     name: 'LIFT — Strength Block',      coach: 'marco', duration: 45, booked: 8,  capacity: 12 },
  { id: 'c2', day: 'today',    time: '09:30', period: 'AM', type: 'CONDITIONING', name: 'MET-CON Conditioning',       coach: 'reza',  duration: 45, booked: 3,  capacity: 12 },
  { id: 'c3', day: 'today',    time: '12:15', period: 'PM', type: 'YOUTH',        name: 'Youth Fitness Foundation',   coach: 'sam',   duration: 45, booked: 5,  capacity: 10 },
  { id: 'c4', day: 'today',    time: '04:15', period: 'PM', type: 'YOUTH',        name: 'Youth Strength Development', coach: 'sam',   duration: 45, booked: 7,  capacity: 10 },
  { id: 'c5', day: 'today',    time: '06:00', period: 'PM', type: 'STRENGTH',     name: 'Strength & Con',             coach: 'reza',  duration: 45, booked: 9,  capacity: 12 },
  { id: 'c6', day: 'today',    time: '06:30', period: 'PM', type: 'RECOVERY',     name: 'Mobility & Mat Pilates',     coach: 'sasha', duration: 45, booked: 6,  capacity: 16 },
  { id: 'c7', day: 'tomorrow', time: '06:00', period: 'AM', type: 'STRENGTH',     name: 'LIFT — Power Block',         coach: 'marco', duration: 45, booked: 4,  capacity: 12 },
  { id: 'c8', day: 'tomorrow', time: '09:30', period: 'AM', type: 'RECOVERY',     name: 'Mobility Recovery',          coach: 'sasha', duration: 45, booked: 7,  capacity: 16 },
  { id: 'c9', day: 'tomorrow', time: '06:00', period: 'PM', type: 'CONDITIONING', name: 'HIIT — Push & Drag',         coach: 'ritti', duration: 45, booked: 11, capacity: 12 },
  { id: 'c10',day: 'week',     time: '07:00', period: 'AM', type: 'YOUTH',        name: 'Youth Open Workout',         coach: 'sam',   duration: 60, booked: 6,  capacity: 12 },
  { id: 'c11',day: 'week',     time: '09:30', period: 'AM', type: 'STRENGTH',     name: 'LIFT — Hypertrophy Block',   coach: 'marco', duration: 45, booked: 5,  capacity: 12 },
  { id: 'c12',day: 'week',     time: '06:00', period: 'PM', type: 'CONDITIONING', name: 'MET-CON Friday Finisher',    coach: 'reza',  duration: 45, booked: 8,  capacity: 12 },
];

const WORKOUT = {
  title: 'Lower Body — A',
  date: 'Today',
  coachId: 'marco',
  blocks: [
    {
      tag: 'A · MAIN',
      name: 'Back Squat',
      sets: [
        { id: 'A1', label: 'Set 1', meta: '5 × 100 kg' },
        { id: 'A2', label: 'Set 2', meta: '5 × 105 kg' },
        { id: 'A3', label: 'Set 3', meta: '5 × 110 kg · RPE 8' },
        { id: 'A4', label: 'Set 4', meta: '5 × 115 kg · RPE 8' },
        { id: 'A5', label: 'Set 5', meta: '5 × 115 kg · RPE 9' },
      ],
    },
    {
      tag: 'B · ACCESSORY',
      name: 'Romanian Deadlift',
      sets: [
        { id: 'B1', label: 'Set 1', meta: '8 × 90 kg · 2 min rest' },
        { id: 'B2', label: 'Set 2', meta: '8 × 90 kg · 2 min rest' },
        { id: 'B3', label: 'Set 3', meta: '8 × 90 kg · 2 min rest' },
      ],
    },
    {
      tag: 'C · POWER',
      name: 'Box Jumps',
      sets: [
        { id: 'C1', label: 'Set 1', meta: '3 reps · 60 cm box · max intent' },
        { id: 'C2', label: 'Set 2', meta: '3 reps · 60 cm box' },
        { id: 'C3', label: 'Set 3', meta: '3 reps · 60 cm box' },
        { id: 'C4', label: 'Set 4', meta: '3 reps · 60 cm box' },
      ],
    },
  ],
};

const PRS = [
  { name: 'Back Squat', value: 140, unit: 'kg', delta: '+5 kg this month', up: true },
  { name: 'Bench Press', value: 95, unit: 'kg', delta: '+2.5 kg', up: true },
  { name: 'Deadlift', value: 165, unit: 'kg', delta: '+10 kg', up: true },
  { name: '10m Sprint', value: 1.78, unit: 's', delta: '-0.04 s', up: true },
];

const JUMP_HEIGHTS = [55, 62, 58, 68, 74, 82, 88];

const NOTIFICATIONS = [
  { id: 'n1', ic: '⏰', t: 'Class starting in 90 minutes', d: 'Strength & Con · 6:00 PM with Coach Reza', when: '4 min ago', unread: true },
  { id: 'n2', ic: '🏆', t: 'New personal record!', d: 'You set a new Back Squat PR: 140 kg', when: '2 days ago', unread: true },
  { id: 'n3', ic: '💬', t: 'Marco sent you a message', d: '"Massive! Let\'s push it to 117.5 kg next week."', when: 'Yesterday', unread: false },
  { id: 'n4', ic: '🔥', t: '12-day streak!', d: 'You\'ve trained 12 days in a row. Keep it up.', when: '2 days ago', unread: false },
  { id: 'n5', ic: '📊', t: 'Force plate test scheduled', d: 'VALD test on Friday 16 May at 5:30 PM', when: '3 days ago', unread: false },
];

const CHAT_INITIAL = [
  { from: 'me',   text: "Hey Marco — just hit my squat target today, 5 × 115 kg at RPE 8.5. Felt strong.", when: '2:14 PM' },
  { from: 'them', text: "Massive! Let's push it to 117.5 kg next week. Send the video?", when: '2:18 PM' },
  { from: 'me',   text: "[video] squat-set-4.mp4 · 0:08", when: '2:24 PM' },
  { from: 'them', text: "Beautiful brace at the bottom. Keep that exact intent next session 💪", when: '2:31 PM' },
];

// ---------- STATE -----------------------------------------------

const state = load() || {
  screen: 'home',
  user: { name: 'Mazharul Abir', initials: 'MA', memberSince: 'Jan 2024', plan: 'Adult 12-Month', price: '$58/week', renews: '12 Jan 2027', streak: 12 },
  bookings: ['c5'],
  classFilter: { day: 'today', type: 'all' },
  workout: { completed: { A1: true, A2: true } },
  chat: CHAT_INITIAL.slice(),
  notificationsRead: false,
};

function save() {
  try { localStorage.setItem('athletix-app-state', JSON.stringify(state)); } catch (e) {}
}
function load() {
  try { return JSON.parse(localStorage.getItem('athletix-app-state')); } catch (e) { return null; }
}

// ---------- HELPERS ---------------------------------------------

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content; };
const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.hidden = true; }, 2500);
}

function showOverlay(html) {
  const el = $('#overlay');
  el.innerHTML = html;
  el.hidden = false;
  el.onclick = (e) => { if (e.target === el) closeOverlay(); };
}
function closeOverlay() { $('#overlay').hidden = true; $('#overlay').innerHTML = ''; }

function showSheet(html) {
  const el = $('#sheet');
  el.innerHTML = `<div class="sheet-grip"></div>` + html;
  el.hidden = false;
}
function closeSheet() { $('#sheet').hidden = true; $('#sheet').innerHTML = ''; }

function updateClock() {
  const now = new Date();
  const hh = now.getHours();
  const mm = now.getMinutes().toString().padStart(2, '0');
  $('#statusTime').textContent = `${hh}:${mm}`;
}

// ---------- APP BAR ---------------------------------------------

function renderAppBar(opts) {
  const bar = $('#appBar');
  bar.innerHTML = '';
  if (opts.back) {
    bar.appendChild(h(`
      <button class="app-bar-back" onclick="navigate('${opts.back}')">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    `));
  }
  bar.appendChild(h(`
    <div class="app-bar-title">
      ${opts.eyebrow ? `<div class="eyebrow">${escape(opts.eyebrow)}</div>` : ''}
      <h1>${escape(opts.title)}</h1>
    </div>
  `));

  const actions = document.createElement('div');
  actions.className = 'app-bar-actions';

  // Notifications bell on most screens
  if (opts.notifications !== false) {
    const unread = NOTIFICATIONS.filter((n) => n.unread && !state.notificationsRead).length;
    actions.appendChild(h(`
      <button class="icon-btn" onclick="openNotifications()" aria-label="Notifications">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        ${unread > 0 ? `<span class="badge"></span>` : ''}
      </button>
    `));
  }

  // Avatar opens profile
  if (opts.avatar !== false) {
    actions.appendChild(h(`
      <button class="avatar-btn" onclick="navigate('profile')">${escape(state.user.initials)}</button>
    `));
  }

  bar.appendChild(actions);
}

// ---------- TAB NAV ---------------------------------------------

function highlightTab() {
  document.querySelectorAll('.tab-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.screen === state.screen);
  });
}

// ---------- NAVIGATION ------------------------------------------

function navigate(screen, opts = {}) {
  if (screen === 'chat') { renderChat(); return; }
  state.screen = screen;
  save();
  render();
  $('#screenWrap').scrollTop = 0;
}
window.navigate = navigate;

// ---------- SCREENS ---------------------------------------------

const TYPE_CLASS = { CONDITIONING: 'conditioning', RECOVERY: 'recovery', YOUTH: 'youth' };

function nextClass() {
  // Pick the next booked class for the "next class" hero
  const booked = CLASSES.find((c) => state.bookings.includes(c.id));
  return booked || CLASSES[0];
}

function classCardHtml(c) {
  const isBooked = state.bookings.includes(c.id);
  const pct = Math.min(100, (c.booked / c.capacity) * 100);
  const coach = COACHES[c.coach];
  const tagClass = TYPE_CLASS[c.type] || '';
  return `
    <div class="class-card ${isBooked ? 'booked' : ''}" onclick="openClassDetail('${c.id}')">
      <div class="cc-top">
        <div class="cc-time">
          <span class="h">${c.time}</span>
          <span class="am">${c.period}</span>
        </div>
        <span class="cc-tag ${tagClass}">${c.type}</span>
      </div>
      <div class="cc-name">${escape(c.name)}</div>
      <div class="cc-coach">Coach ${escape(coach.name.split(' ')[0])} · ${c.duration} min${isBooked ? ' · ✓ Booked' : ''}</div>
      <div class="cc-bottom">
        <div class="cap">
          ${c.booked}/${c.capacity}
          <div class="cap-bar"><div class="cap-fill ${pct === 100 ? 'full' : ''}" style="width:${pct}%"></div></div>
        </div>
        ${isBooked
          ? `<button class="btn ghost sm" onclick="event.stopPropagation(); cancelBooking('${c.id}')">Cancel</button>`
          : `<button class="btn primary sm" onclick="event.stopPropagation(); bookClass('${c.id}')">${pct >= 100 ? 'Waitlist' : 'Book'}</button>`
        }
      </div>
    </div>
  `;
}

// ---------- HOME ------------------------------------------------

function renderHome() {
  renderAppBar({ title: 'Home', eyebrow: 'Athletix' });

  const nc = nextClass();
  const coach = COACHES[nc.coach];
  const isBooked = state.bookings.includes(nc.id);

  // Today's planned exercises (first 3 from workout)
  const todayItems = WORKOUT.blocks.slice(0, 3).map((b) => ({
    icon: b.tag.startsWith('A') ? '🏋️' : b.tag.startsWith('B') ? '💪' : '⚡',
    title: b.name,
    sub: `${b.sets.length} sets · ${b.tag.split(' · ')[1] || ''}`,
    meta: b.tag.split(' · ')[0],
  }));

  $('#screenWrap').innerHTML = `
    <section class="screen">
      <div class="greeting">
        <div class="hi">${greetingTime()}</div>
        <div class="name">${escape(state.user.name.split(' ')[0])}</div>
      </div>

      <div class="next-class-card">
        <div class="ncc-tag">${isBooked ? 'Next class · Booked' : 'Featured class'}</div>
        <h3 class="ncc-h">${escape(nc.name)}</h3>
        <p class="ncc-sub">with Coach ${escape(coach.name)} · ${nc.duration} min</p>
        <div class="ncc-row">
          <div class="ncc-time">
            <strong>${nc.time} ${nc.period}</strong>
            <span>${nc.day === 'today' ? 'Today' : nc.day === 'tomorrow' ? 'Tomorrow' : 'This Week'}</span>
          </div>
          ${isBooked
            ? `<button class="btn primary" onclick="checkIn()">Check In</button>`
            : `<button class="btn primary" onclick="bookClass('${nc.id}')">Book</button>`
          }
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card"><strong>4</strong><span>This Week</span></div>
        <div class="stat-card"><strong>${state.user.streak}</strong><span>Day Streak</span></div>
        <div class="stat-card"><strong>3</strong><span>New PRs</span></div>
      </div>

      <div class="quick-actions">
        <button class="qa" onclick="checkIn()">
          <div class="qa-ic">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          </div>
          <span class="qa-lbl">Check-in</span>
        </button>
        <button class="qa" onclick="navigate('classes')">
          <div class="qa-ic">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <span class="qa-lbl">Book Class</span>
        </button>
        <button class="qa" onclick="openChat()">
          <div class="qa-ic">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <span class="qa-lbl">Coach</span>
        </button>
        <button class="qa" onclick="navigate('progress')">
          <div class="qa-ic">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <span class="qa-lbl">Progress</span>
        </button>
      </div>

      <div class="section-title">Today's Plan <a class="more" onclick="navigate('train')">VIEW ALL</a></div>
      ${todayItems.map((it) => `
        <div class="row" onclick="navigate('train')">
          <div class="row-ic">${it.icon}</div>
          <div class="row-body">
            <div class="row-title">${escape(it.title)}</div>
            <div class="row-sub">${escape(it.sub)}</div>
          </div>
          <div class="row-meta">${it.meta}</div>
        </div>
      `).join('')}

      <div class="section-title">Suggested for You <a class="more" onclick="navigate('classes')">SEE MORE</a></div>
      ${CLASSES.filter((c) => c.day === 'today' && !state.bookings.includes(c.id)).slice(0, 2).map(classCardHtml).join('')}
    </section>
  `;
}

function greetingTime() {
  const hr = new Date().getHours();
  if (hr < 12) return 'Good Morning';
  if (hr < 18) return 'Good Afternoon';
  return 'Good Evening';
}

// ---------- CLASSES ---------------------------------------------

function renderClasses() {
  renderAppBar({ title: 'Classes', eyebrow: 'Book' });
  const f = state.classFilter;
  const filtered = CLASSES.filter((c) => c.day === f.day && (f.type === 'all' || c.type === f.type.toUpperCase()));

  $('#screenWrap').innerHTML = `
    <section class="screen">
      <div class="tabs">
        ${['today', 'tomorrow', 'week'].map((d) => `
          <button class="tab-pill ${f.day === d ? 'active' : ''}" onclick="setClassFilter('day','${d}')">${d}</button>
        `).join('')}
      </div>
      <div class="filter-pills">
        ${['all', 'STRENGTH', 'CONDITIONING', 'RECOVERY', 'YOUTH'].map((t) => `
          <button class="filter-pill ${f.type === t ? 'active' : ''}" onclick="setClassFilter('type','${t}')">${t}</button>
        `).join('')}
      </div>
      ${filtered.length === 0
        ? `<div class="empty"><h3>No classes</h3><p>Try a different day or filter.</p></div>`
        : filtered.map(classCardHtml).join('')
      }
    </section>
  `;
}

function setClassFilter(key, value) {
  state.classFilter[key] = value;
  save();
  renderClasses();
}
window.setClassFilter = setClassFilter;

function openClassDetail(id) {
  const c = CLASSES.find((x) => x.id === id);
  if (!c) return;
  const coach = COACHES[c.coach];
  const isBooked = state.bookings.includes(c.id);
  const pct = Math.min(100, (c.booked / c.capacity) * 100);

  showSheet(`
    <span class="cc-tag ${TYPE_CLASS[c.type] || ''}">${c.type}</span>
    <h3 style="margin-top:10px;">${escape(c.name)}</h3>
    <p class="sheet-sub">${c.duration} minute session with Coach ${escape(coach.name)}</p>

    <div class="detail-row"><span>When</span><span>${c.day === 'today' ? 'Today' : c.day === 'tomorrow' ? 'Tomorrow' : 'This Week'} · ${c.time} ${c.period}</span></div>
    <div class="detail-row"><span>Coach</span><span>${escape(coach.name)}</span></div>
    <div class="detail-row"><span>Duration</span><span>${c.duration} min</span></div>
    <div class="detail-row"><span>Spots</span><span>${c.booked} / ${c.capacity} booked</span></div>
    <div class="detail-row"><span>Location</span><span>42 Baxter St, Fortitude Valley</span></div>

    <div class="actions">
      <button class="btn ghost" onclick="closeSheet()">Close</button>
      ${isBooked
        ? `<button class="btn danger-ghost" onclick="cancelBooking('${c.id}'); closeSheet();">Cancel Booking</button>`
        : `<button class="btn primary" onclick="bookClass('${c.id}'); closeSheet();">${pct >= 100 ? 'Join Waitlist' : 'Book Class'}</button>`
      }
    </div>
  `);
}
window.openClassDetail = openClassDetail;

function bookClass(id) {
  if (!state.bookings.includes(id)) state.bookings.push(id);
  const c = CLASSES.find((x) => x.id === id);
  if (c && c.booked < c.capacity) c.booked++;
  save();
  toast(`✓ Booked ${c.name}`);
  if (state.screen === 'classes') renderClasses();
  else render();
}
window.bookClass = bookClass;

function cancelBooking(id) {
  state.bookings = state.bookings.filter((x) => x !== id);
  const c = CLASSES.find((x) => x.id === id);
  if (c && c.booked > 0) c.booked--;
  save();
  toast(`Booking cancelled`);
  if (state.screen === 'classes') renderClasses();
  else render();
}
window.cancelBooking = cancelBooking;

// ---------- TRAIN -----------------------------------------------

function renderTrain() {
  renderAppBar({ title: WORKOUT.title, eyebrow: 'Today · Program' });
  const coach = COACHES[WORKOUT.coachId];
  const total = WORKOUT.blocks.reduce((n, b) => n + b.sets.length, 0);
  const done = Object.values(state.workout.completed).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  $('#screenWrap').innerHTML = `
    <section class="screen">
      <div class="coach-card">
        <div class="ca">${escape(coach.initials)}</div>
        <div style="flex:1;">
          <div class="nm">${escape(coach.name)}</div>
          <div class="ro">${escape(coach.role)}</div>
        </div>
        <button class="btn ghost sm" onclick="openChat()">Message</button>
      </div>

      <div style="background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 14px; margin-bottom: 14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:11px; color: var(--muted); letter-spacing:.14em; text-transform:uppercase; font-weight:700;">Workout Progress</span>
          <span style="font-family: 'Anton', sans-serif; font-size:20px; color: var(--cyan);">${pct}%</span>
        </div>
        <div style="height: 6px; background: rgba(255,255,255,.06); border-radius: 3px; overflow:hidden;">
          <div style="height:100%; width:${pct}%; background: var(--cyan); transition: width .3s;"></div>
        </div>
        <div style="margin-top:6px; font-size:11px; color: var(--muted);">${done} / ${total} sets complete</div>
      </div>

      ${WORKOUT.blocks.map((b) => `
        <div class="workout-block">
          <span class="wb-tag">${escape(b.tag)}</span>
          <h3 class="wb-title">${escape(b.name)}</h3>
          ${b.sets.map((s) => `
            <div class="set-row ${state.workout.completed[s.id] ? 'done' : ''}">
              <span class="check ${state.workout.completed[s.id] ? 'on' : ''}" onclick="toggleSet('${s.id}')">${state.workout.completed[s.id] ? '✓' : ''}</span>
              <span class="set-label">${escape(s.label)}</span>
              <span class="set-meta">${escape(s.meta)}</span>
            </div>
          `).join('')}
        </div>
      `).join('')}

      <button class="btn primary block" style="margin-top:12px;" onclick="finishWorkout()">
        Finish Workout
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-left:4px;"><polyline points="20 6 9 17 4 12"/></svg>
      </button>
    </section>
  `;
}

function toggleSet(id) {
  state.workout.completed[id] = !state.workout.completed[id];
  save();
  renderTrain();
}
window.toggleSet = toggleSet;

function finishWorkout() {
  const total = WORKOUT.blocks.reduce((n, b) => n + b.sets.length, 0);
  const done = Object.values(state.workout.completed).filter(Boolean).length;
  if (done === 0) { toast('Mark at least one set first.'); return; }
  showOverlay(`
    <div class="overlay-card">
      <div class="ic-circle">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h3>WORKOUT LOGGED</h3>
      <p>${done} / ${total} sets · Great work, ${escape(state.user.name.split(' ')[0])}.<br>Marco will see your log and message you back tonight.</p>
      <div class="btn-row">
        <button class="btn ghost" onclick="closeOverlay()">Close</button>
        <button class="btn primary" onclick="closeOverlay(); openChat()">Tell Coach</button>
      </div>
    </div>
  `);
}
window.finishWorkout = finishWorkout;

// ---------- PROGRESS --------------------------------------------

function renderProgress() {
  renderAppBar({ title: 'Progress', eyebrow: 'Your Stats' });

  $('#screenWrap').innerHTML = `
    <section class="screen">
      <div class="chart-card">
        <div class="chart-h">
          <div>
            <h4>Jump Height — last 7 tests</h4>
            <div class="sub">VALD Force Decks</div>
          </div>
          <div>
            <div class="val">42.6<span style="font-size:14px;color:var(--muted);"> cm</span></div>
            <div class="delta">↑ +3.1 cm</div>
          </div>
        </div>
        <div class="bars">
          ${JUMP_HEIGHTS.map((v) => `<div style="height:${v}%"></div>`).join('')}
        </div>
        <div class="bar-labels">
          <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span>
        </div>
      </div>

      <div class="section-title">Personal Records</div>
      <div class="pr-grid">
        ${PRS.map((pr) => `
          <div class="pr-card">
            <div class="pr-lbl">${escape(pr.name)}</div>
            <div class="pr-val">${pr.value}<span>${escape(pr.unit)}</span></div>
            <div class="pr-d ${pr.up ? '' : 'down'}">${pr.up ? '↑' : '↓'} ${escape(pr.delta)}</div>
          </div>
        `).join('')}
      </div>

      <div class="section-title">Recent Sessions</div>
      <div class="row">
        <div class="row-ic">🏋️</div>
        <div class="row-body">
          <div class="row-title">Lower Body — A</div>
          <div class="row-sub">Yesterday · 12 sets · 45 min</div>
        </div>
        <div class="row-meta">RPE 8</div>
      </div>
      <div class="row">
        <div class="row-ic">⚡</div>
        <div class="row-body">
          <div class="row-title">Upper Push — B</div>
          <div class="row-sub">Sat 10 May · 10 sets · 40 min</div>
        </div>
        <div class="row-meta">RPE 7</div>
      </div>
      <div class="row">
        <div class="row-ic">🏃</div>
        <div class="row-body">
          <div class="row-title">Speed & Agility</div>
          <div class="row-sub">Fri 9 May · 8 drills · 55 min</div>
        </div>
        <div class="row-meta">RPE 8</div>
      </div>
    </section>
  `;
}

// ---------- PROFILE ---------------------------------------------

function renderProfile() {
  renderAppBar({ title: 'Profile', avatar: false });

  const u = state.user;

  $('#screenWrap').innerHTML = `
    <section class="screen">
      <div class="profile-head">
        <div class="avatar-lg">${escape(u.initials)}</div>
        <div>
          <div class="nm">${escape(u.name)}</div>
          <div class="sub">Member since · ${escape(u.memberSince)}</div>
          <div class="streak">${u.streak}-Day Streak</div>
        </div>
      </div>

      <div class="plan-card">
        <div class="plan-tag">Current Plan</div>
        <h3 class="plan-name">${escape(u.plan)}</h3>
        <div class="plan-sub">${escape(u.price)} · renews ${escape(u.renews)}</div>
        <div class="plan-btns">
          <button class="btn primary">Manage</button>
          <button class="btn ghost">Upgrade</button>
        </div>
      </div>

      <div class="qr-card">
        <div class="lbl">Gym Check-in QR</div>
        <div class="qr-box">${qrSvg()}</div>
        <small>Show at the door</small>
      </div>

      <div class="section-title">Quick Links</div>
      <div class="row" onclick="toast('Billing — coming soon')">
        <div class="row-ic">💳</div>
        <div class="row-body">
          <div class="row-title">Billing & Invoices</div>
          <div class="row-sub">View payments, update card</div>
        </div>
        <div class="row-meta">→</div>
      </div>
      <div class="row" onclick="openChat()">
        <div class="row-ic">👤</div>
        <div class="row-body">
          <div class="row-title">My Coach</div>
          <div class="row-sub">Marco Mastrorocco</div>
        </div>
        <div class="row-meta">→</div>
      </div>
      <div class="row" onclick="toast('Physio booking — coming soon')">
        <div class="row-ic">🏥</div>
        <div class="row-body">
          <div class="row-title">Physio & Allied Health</div>
          <div class="row-sub">Book a session</div>
        </div>
        <div class="row-meta">→</div>
      </div>
      <div class="row" onclick="toast('Notifications & settings')">
        <div class="row-ic">⚙️</div>
        <div class="row-body">
          <div class="row-title">Settings & Notifications</div>
        </div>
        <div class="row-meta">→</div>
      </div>
      <div class="row" onclick="resetState()">
        <div class="row-ic">↻</div>
        <div class="row-body">
          <div class="row-title">Reset Demo</div>
          <div class="row-sub">Clear all stored progress</div>
        </div>
        <div class="row-meta">→</div>
      </div>
    </section>
  `;
}

function resetState() {
  if (!confirm('Reset all demo data?')) return;
  localStorage.removeItem('athletix-app-state');
  location.reload();
}
window.resetState = resetState;

// ---------- QR (simple SVG pattern, not a real QR) ---------------

function qrSvg() {
  // Fake but visually plausible QR. Seeded random.
  const seed = 42;
  let s = seed;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const size = 21;
  let rects = '';
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Finder patterns in 3 corners
      const finder = (x < 7 && y < 7) || (x > size - 8 && y < 7) || (x < 7 && y > size - 8);
      let on = rnd() > 0.5;
      if (finder) {
        const inX = x < 7 ? x : x - (size - 7);
        const inY = y < 7 ? y : y - (size - 7);
        const isBorder = inX === 0 || inX === 6 || inY === 0 || inY === 6;
        const isCenter = inX >= 2 && inX <= 4 && inY >= 2 && inY <= 4;
        on = isBorder || isCenter;
      }
      if (on) rects += `<rect x="${x * 6}" y="${y * 6}" width="6" height="6" fill="#000"/>`;
    }
  }
  return `<svg viewBox="0 0 ${size * 6} ${size * 6}" xmlns="http://www.w3.org/2000/svg">${rects}</svg>`;
}

// ---------- CHAT (full-screen, slides over) ----------------------

function openChat() { renderChat(); }
window.openChat = openChat;

function renderChat() {
  const coach = COACHES.marco;
  $('#screenWrap').innerHTML = '';
  // overlay chat as full screen replacing app bar
  $('#appBar').innerHTML = '';
  $('#screenWrap').innerHTML = `
    <div class="chat-screen">
      <div class="chat-head">
        <button class="app-bar-back" onclick="navigate('${state.previousScreen || 'home'}')">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div class="ca">${escape(coach.initials)}</div>
        <div style="flex:1;">
          <div class="nm">${escape(coach.name)}</div>
          <div class="st">● Online</div>
        </div>
        <button class="icon-btn" onclick="toast('Calling Marco...')" aria-label="Call">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </button>
      </div>

      <div class="chat-body" id="chatBody">
        <div class="chat-day">Today</div>
        ${state.chat.map((m) => `
          <div class="msg ${m.from}">${escape(m.text)}<span class="when">${escape(m.when)}${m.from === 'me' ? ' · ✓✓ Read' : ''}</span></div>
        `).join('')}
      </div>

      <div class="chat-input">
        <button class="add" aria-label="Add" onclick="toast('Attach photo/video — coming soon')">+</button>
        <input id="chatInput" type="text" placeholder="Message Marco..." onkeydown="if(event.key==='Enter')sendChat()" />
        <button class="send" onclick="sendChat()" aria-label="Send">→</button>
      </div>
    </div>
  `;
  highlightTab(); // keep current tab highlight
  // Scroll to bottom
  setTimeout(() => {
    const b = $('#chatBody');
    if (b) b.scrollTop = b.scrollHeight;
  }, 50);
}

function sendChat() {
  const input = $('#chatInput');
  const text = input.value.trim();
  if (!text) return;
  const now = new Date();
  const when = `${(now.getHours() % 12 || 12)}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
  state.chat.push({ from: 'me', text, when });
  save();
  renderChat();
  // Auto-reply after a moment
  setTimeout(() => {
    const replies = [
      "On it, let me check.",
      "Great work today 💪",
      "Watch your knee position next set.",
      "Send me a video and I'll review the form.",
      "Sounds like a solid session — keep at it!",
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    state.chat.push({ from: 'them', text: reply, when });
    save();
    renderChat();
  }, 1400);
}
window.sendChat = sendChat;

// ---------- NOTIFICATIONS (sheet) --------------------------------

function openNotifications() {
  state.notificationsRead = true;
  save();
  showSheet(`
    <h3>Notifications</h3>
    <p class="sheet-sub">${NOTIFICATIONS.length} recent updates</p>
    <div class="notif-list">
      ${NOTIFICATIONS.map((n) => `
        <div class="notif ${n.unread ? 'unread' : ''}">
          <div class="notif-ic">${n.ic}</div>
          <div class="notif-body">
            <div class="notif-t">${escape(n.t)}</div>
            <div class="notif-d">${escape(n.d)}</div>
            <div class="notif-when">${escape(n.when)}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="actions"><button class="btn ghost" onclick="closeSheet()">Close</button></div>
  `);
  // Re-render app bar so the badge dot updates immediately
  if (state.screen !== 'profile') renderAppBar({ title: capitalize(state.screen) });
}
window.openNotifications = openNotifications;

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ---------- CHECK-IN -------------------------------------------

function checkIn() {
  showOverlay(`
    <div class="overlay-card">
      <div class="ic-circle" style="background: rgba(26,214,135,.18); color: var(--green); width: 72px; height: 72px;">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h3>CHECKED IN</h3>
      <p>Welcome back, ${escape(state.user.name.split(' ')[0])} — you're inside at ${new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}.<br>Have a great session.</p>
      <button class="btn primary block" onclick="closeOverlay()">Let's Go</button>
    </div>
  `);
  setTimeout(() => closeOverlay(), 4000);
}
window.checkIn = checkIn;

// ---------- ROUTER ----------------------------------------------

function render() {
  switch (state.screen) {
    case 'home':     renderHome();     break;
    case 'classes':  renderClasses();  break;
    case 'train':    renderTrain();    break;
    case 'progress': renderProgress(); break;
    case 'profile':  renderProfile();  break;
    default:         renderHome();
  }
  highlightTab();
}

// ---------- BOOTSTRAP -------------------------------------------

document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    closeSheet(); closeOverlay();
    state.previousScreen = state.screen;
    navigate(btn.dataset.screen);
  });
});

updateClock();
setInterval(updateClock, 30000);
render();
