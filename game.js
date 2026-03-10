/* ============================================
   SPACE RACE: SNAKES & LADDERS — GAME ENGINE
   ============================================ */

// ── Event Data (extracted from the document) ──────────────────────────

const SPACE_EVENTS = [
  {
    square: 3, date: "Oct 4, 1957", year: "1957",
    country: "ussr", sentiment: "good",
    title: "Sputnik 1",
    desc: "The Soviet Union launched Sputnik 1, the first artificial satellite to orbit the Earth."
  },
  {
    square: 6, date: "Nov 3, 1957", year: "1957",
    country: "ussr", sentiment: "good",
    title: "Sputnik 2 — Laika",
    desc: "Sputnik 2 carried a dog named Laika, the first living thing sent to space. Sadly she passed away a few hours into orbit."
  },
  {
    square: 9, date: "Jan 31, 1958", year: "1958",
    country: "usa", sentiment: "good",
    title: "Explorer 1",
    desc: "The first US satellite to orbit Earth. Its equipment led to the discovery of the Van Allen radiation belt."
  },
  {
    square: 12, date: "Oct 1, 1958", year: "1958",
    country: "usa", sentiment: "good",
    title: "NASA Founded",
    desc: "The National Aeronautics and Space Administration (NASA) was created."
  },
  {
    square: 15, date: "Dec 18, 1958", year: "1958",
    country: "usa", sentiment: "good",
    title: "Project SCORE",
    desc: "The world's first communication satellite. It broadcast a Christmas message from President Eisenhower — the first human voice from space."
  },
  {
    square: 18, date: "Jan 2, 1959", year: "1959",
    country: "ussr", sentiment: "good",
    title: "Luna 1",
    desc: "The first cosmic rocket. It overshot the Moon and became the first man-made object to orbit the Sun."
  },
  {
    square: 22, date: "Apr 9, 1959", year: "1959",
    country: "usa", sentiment: "good",
    title: "Mercury 7 Selected",
    desc: "NASA selected the first astronaut group for Project Mercury — the famous Mercury 7."
  },
  {
    square: 24, date: "Aug 2, 1959", year: "1959",
    country: "usa", sentiment: "good",
    title: "Explorer 6",
    desc: "The world's first weather satellite, which took the first pictures of Earth from space."
  },
  {
    square: 27, date: "Sep 12, 1959", year: "1959",
    country: "ussr", sentiment: "good",
    title: "Luna 2 — Moon Contact",
    desc: "The first spacecraft to reach the surface of the Moon."
  },
  {
    square: 30, date: "Oct 4, 1959", year: "1959",
    country: "ussr", sentiment: "good",
    title: "Luna 3 — Far Side Photos",
    desc: "Successfully orbited the Moon and photographed its far side for the first time."
  },
  {
    square: 33, date: "Mar 1960", year: "1960",
    country: "ussr", sentiment: "good",
    title: "First Cosmonauts Chosen",
    desc: "The Soviet Union selected its first group of cosmonauts."
  },
  {
    square: 36, date: "Aug 19, 1960", year: "1960",
    country: "ussr", sentiment: "good",
    title: "Sputnik 5 — Belka & Strelka",
    desc: "Two dogs and several plants were sent to space on Sputnik 5 — all survived and returned to Earth alive."
  },
  {
    square: 39, date: "Jan 31, 1961", year: "1961",
    country: "usa", sentiment: "good",
    title: "Ham the Astrochimp",
    desc: "A chimpanzee named Ham became the first ape to go to space and survive the landing."
  },
  {
    square: 42, date: "Apr 12, 1961", year: "1961",
    country: "ussr", sentiment: "good",
    title: "Yuri Gagarin — First Human in Space",
    desc: "Yuri Gagarin aboard Vostok 1 became the first human in space, orbiting Earth for 1 hour 48 minutes."
  },
  {
    square: 45, date: "May 5, 1961", year: "1961",
    country: "usa", sentiment: "good",
    title: "Alan Shepard — First American in Space",
    desc: "Alan Shepard flew on Mercury-Redstone 3/Freedom 7, reaching 187 km altitude for 15 minutes."
  },
  {
    square: 48, date: "Feb 20, 1962", year: "1962",
    country: "usa", sentiment: "good",
    title: "John Glenn — First US Orbit",
    desc: "John Glenn orbited Earth 3 times aboard Friendship 7, spending about 5 hours in space."
  },
  {
    square: 51, date: "Jun 16, 1963", year: "1963",
    country: "ussr", sentiment: "good",
    title: "Valentina Tereshkova — First Woman in Space",
    desc: "Tereshkova spent nearly 3 days in space aboard Vostok 6, orbiting Earth 48 times."
  },
  {
    square: 54, date: "Aug 1964", year: "1964",
    country: "ussr", sentiment: "good",
    title: "Moon Programs Approved",
    desc: "The Soviet government authorized work on two Moon programs: a flyby and a landing mission."
  },
  {
    square: 57, date: "Oct 12, 1964", year: "1964",
    country: "ussr", sentiment: "good",
    title: "Voskhod 1 — First Multi-Crew",
    desc: "The first spacecraft to carry more than one person, with cosmonauts Komarov, Feoktistov, and Yegorov."
  },
  {
    square: 60, date: "Mar 18, 1965", year: "1965",
    country: "ussr", sentiment: "good",
    title: "Alexei Leonov — First Spacewalk",
    desc: "Leonov performed the first ever spacewalk from Voskhod 2, lasting about 12 minutes."
  },
  {
    square: 63, date: "Mar 23, 1965", year: "1965",
    country: "usa", sentiment: "good",
    title: "Gemini 3 — First US Multi-Crew",
    desc: "First US spacecraft to carry more than one person, with Grissom and Young aboard."
  },
  {
    square: 66, date: "Jun 3, 1965", year: "1965",
    country: "usa", sentiment: "good",
    title: "Ed White — First US Spacewalk",
    desc: "Ed White performed the first American spacewalk during the Gemini 4 mission."
  },
  {
    square: 69, date: "Jul 14, 1965", year: "1965",
    country: "usa", sentiment: "good",
    title: "Mariner 4 — First to Mars",
    desc: "Completed the first successful flyby of Mars, returning the first detailed pictures of the Martian surface."
  },
  {
    square: 72, date: "Dec 15, 1965", year: "1965",
    country: "usa", sentiment: "good",
    title: "First Orbital Rendezvous",
    desc: "Gemini 6A and Gemini 7 achieved the first orbital rendezvous — two spacecraft meeting in orbit."
  },
  {
    square: 75, date: "Jan 14, 1966", year: "1966",
    country: "ussr", sentiment: "bad",
    title: "Death of Sergei Korolev",
    desc: "The Soviet Union's chief spacecraft designer Sergei Korolev died, a devastating blow to their program."
  },
  {
    square: 78, date: "Mar 16, 1966", year: "1966",
    country: "usa", sentiment: "good",
    title: "Gemini 8 — First Docking",
    desc: "Neil Armstrong and David Scott completed the first docking in space aboard Gemini 8."
  },
  {
    square: 81, date: "Jan 27, 1967", year: "1967",
    country: "usa", sentiment: "bad",
    title: "Apollo 1 Fire",
    desc: "Astronauts Grissom, White, and Chaffee perished in a launchpad fire, delaying Apollo by 1.5 years."
  },
  {
    square: 84, date: "Apr 24, 1967", year: "1967",
    country: "ussr", sentiment: "bad",
    title: "Soyuz 1 — Komarov's Death",
    desc: "Vladimir Komarov died when Soyuz 1's parachute failed during re-entry — the first death in spaceflight."
  },
  {
    square: 87, date: "Sep 15, 1968", year: "1968",
    country: "ussr", sentiment: "good",
    title: "Zond 5 — Lunar Flyby",
    desc: "The unmanned Zond 5 became the first probe to fly around the Moon and return to Earth."
  },
  {
    square: 90, date: "Oct 11, 1968", year: "1968",
    country: "usa", sentiment: "good",
    title: "Apollo 7 — First Apollo Flight",
    desc: "The first crewed Apollo flight with Schirra, Eisele, and Cunningham aboard."
  },
  {
    square: 93, date: "Dec 24, 1968", year: "1968",
    country: "usa", sentiment: "good",
    title: "Apollo 8 — Lunar Orbit",
    desc: "The first crewed spacecraft to orbit the Moon and return, with Borman, Lovell, and Anders."
  },
  {
    square: 96, date: "Jul 3, 1969", year: "1969",
    country: "ussr", sentiment: "bad",
    title: "N1 Rocket Explosion",
    desc: "The Soviet Union's N1 Moon rocket exploded, ending their hopes of a crewed lunar landing."
  },
  {
    square: 100, date: "Jul 20, 1969", year: "1969",
    country: "usa", sentiment: "good",
    title: "Apollo 11 — Moon Landing!",
    desc: "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, watched by 723 million people."
  }
];

const eventMap = {};
SPACE_EVENTS.forEach(e => { eventMap[e.square] = e; });

let customSquares = {};

function loadCustomSquaresFromLocal() {
  try {
    const saved = JSON.parse(localStorage.getItem("spacerace-squares"));
    if (saved) customSquares = saved;
  } catch (e) {}
}

function loadConnectionsFromLocal() {
  try {
    const saved = JSON.parse(localStorage.getItem("spacerace-connections"));
    if (saved) {
      state.rockets = saved.rockets || [];
      state.meteors = saved.meteors || [];
      state.nextRocketId = saved.nextRocketId || 1;
      state.nextMeteorId = saved.nextMeteorId || 1;
    }
  } catch (e) {}
}

function applyDesign(d) {
  if (!d) return;
  const root = document.documentElement;
  if (d.headingText) {
    const h1 = document.querySelector("header h1");
    if (h1) h1.textContent = d.headingText;
  }
  if (d.accentColor) root.style.setProperty("--text-accent", d.accentColor);
  if (d.ussrColor) root.style.setProperty("--ussr", d.ussrColor);
  if (d.usaColor) root.style.setProperty("--usa", d.usaColor);
  let styleEl = document.getElementById("design-overrides");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "design-overrides";
    document.head.appendChild(styleEl);
  }
  const u = (d.turnMarkerUssrColor || "#cc2222").replace("#", "");
  const a = (d.turnMarkerUsaColor || "#2266cc").replace("#", "");
  styleEl.textContent = [
    ".player-ship .ship-ussr { filter: drop-shadow(0 0 4px rgba(" + parseInt(u.slice(0,2), 16) + "," + parseInt(u.slice(2,4), 16) + "," + parseInt(u.slice(4,6), 16) + ", 0.6)); }",
    ".player-ship .ship-usa { filter: drop-shadow(0 0 4px rgba(" + parseInt(a.slice(0,2), 16) + "," + parseInt(a.slice(2,4), 16) + "," + parseInt(a.slice(4,6), 16) + ", 0.6)); }"
  ].join("\n");
  if (d.legendLabels && typeof d.legendLabels === "string") {
    const labels = d.legendLabels.split(",").map(s => s.trim()).filter(Boolean);
    const items = document.querySelectorAll(".legend-items .legend-item");
    items.forEach((el, i) => {
      if (labels[i] === undefined) return;
      const span = el.querySelector(".legend-swatch");
      el.textContent = "";
      if (span) el.appendChild(span);
      el.appendChild(document.createTextNode(" " + labels[i]));
    });
  }
  if (d.missionControlTitle && d.missionControlTitle.trim()) {
    const el = document.getElementById("mission-control-title");
    if (el) el.textContent = d.missionControlTitle.trim();
  }
  if (d.launchDiceButton && d.launchDiceButton.trim()) {
    const el = document.getElementById("roll-btn");
    if (el) el.textContent = d.launchDiceButton.trim();
  }
  if (d.legendTitle && d.legendTitle.trim()) {
    const el = document.getElementById("legend-title");
    if (el) el.textContent = d.legendTitle.trim();
  }
  if (d.newGameButton && d.newGameButton.trim()) {
    const el = document.getElementById("reset-btn");
    if (el) el.textContent = d.newGameButton.trim();
  }
  if (d.playAgainButton && d.playAgainButton.trim()) {
    const el = document.getElementById("play-again-btn");
    if (el) el.textContent = d.playAgainButton.trim();
  }
}

async function loadConfigFromAPI() {
  try {
    const res = await fetch("/api/config");
    if (!res.ok) throw new Error(res.status);
    const cfg = await res.json();
    if (cfg.rockets) state.rockets = cfg.rockets;
    if (cfg.meteors) state.meteors = cfg.meteors;
    if (cfg.customSquares) {
      customSquares = cfg.customSquares;
      // One-off content tweak: move the Luna 1 event from square 17 → 16
      // so that 17 can be neutral. If 16 already has custom content we
      // leave it alone.
      if (customSquares[17] && !customSquares[16]) {
        const ev17 = customSquares[17];
        customSquares[16] = Object.assign({}, ev17, { square: 16 });
        delete customSquares[17];
      }
      // One-off content tweak: move the Mercury 7 event from square 21 → 22
      // so that 21 can be neutral. If 22 already has custom content we
      // leave it alone.
      if (customSquares[21] && !customSquares[22]) {
        const ev21 = customSquares[21];
        customSquares[22] = Object.assign({}, ev21, { square: 22 });
        delete customSquares[21];
      }
      // One-off typo fix: “American managed” → “America managed” on square 48
      const ev48 = customSquares[48];
      if (ev48 && typeof ev48.desc === "string") {
        ev48.desc = ev48.desc.replace("American managed", "America managed");
      }
    }
    if (cfg.design) applyDesign(cfg.design);
    return true;
  } catch (e) {
    return false;
  }
}

function getSquareData(n) {
  if (customSquares[n]) return customSquares[n];
  if (eventMap[n]) return eventMap[n];
  return null;
}

function getActionForPlayer(ev, pid) {
  if (!ev) return 0;
  if (pid === "usa" && ev.actionUSA) return ev.actionUSA;
  if (pid === "ussr" && ev.actionUSSR) return ev.actionUSSR;
  if (ev.actionUSA || ev.actionUSSR) return pid === "usa" ? (ev.actionUSA || 0) : (ev.actionUSSR || 0);
  if (ev.action && ev.country && ev.country !== pid) return 0;
  return ev.action || 0;
}

// ── Game State ────────────────────────────────────────────────────────

const state = {
  players: {
    ussr: { pos: 1, name: "USSR", icon: "" },
    usa:  { pos: 1, name: "USA",  icon: "" }
  },
  currentPlayer: "ussr",
  rockets: [],
  meteors: [],
  rolling: false,
  gameOver: false,
  nextRocketId: 1,
  nextMeteorId: 1
};

// Meteor: fixed head size and tail width (80px ref), tail length = full path. Prevents oversized head.
let meteorImageCanvas = null;
const METEOR_REFERENCE_LEN = 80;
const METEOR_HEAD_FRAC = 0.2;

// Rocket: your image, background removed, 50% size. We only set direction and exhaust length; body is drawn unchanged (no smush).
let rocketImageCanvas = null;
// Body = entire shuttle (nose to engine bells). Exhaust = flame strip only; we only vary exhaust drawn length.
const ROCKET_BODY_FRAC = 0.62;
const ROCKET_BODY_DISPLAY_H = 52;

function loadRocketImage() {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function() {
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, w, h);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];
      const sum = r + g + b;
      const isDarkBlue = (r < 110 && g < 110 && b > 60) || (sum < 140 && b > r && b > g);
      const isVeryDark = sum < 90;
      if (isDarkBlue || isVeryDark) d[i + 3] = 0;
    }
    ctx.putImageData(data, 0, 0);
    rocketImageCanvas = canvas;
    drawConnections();
  };
  img.onerror = function() { rocketImageCanvas = null; };
  img.src = "assets/rocket.png";
}

function loadMeteorImage() {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function() {
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, w, h);
    const d = data.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];
      const sum = r + g + b;
      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const saturation = maxC > 0 ? (maxC - minC) / maxC : 0;
      const isDarkBlue = (r < 110 && g < 110 && b > 60) || (sum < 140 && b > r && b > g);
      const isVeryDark = sum < 90;
      const isDarkGrey = sum < 200;
      const isDarkGreyShadow = sum < 250 && saturation < 0.4;
      if (isDarkBlue || isVeryDark || isDarkGrey || isDarkGreyShadow) d[i + 3] = 0;
    }
    ctx.putImageData(data, 0, 0);
    meteorImageCanvas = canvas;
    drawConnections();
  };
  img.onerror = function() { meteorImageCanvas = null; };
  img.src = "assets/meteor.png";
}

// ── Board Utilities ───────────────────────────────────────────────────

function squareToGridPos(n) {
  const boardRow = Math.floor((n - 1) / 10);
  const gridRow = 9 - boardRow;
  const col = (boardRow % 2 === 0)
    ? (n - 1) % 10
    : 9 - (n - 1) % 10;
  return { gridRow, col };
}

function gridPosToSquare(gridRow, gridCol) {
  const boardRow = 9 - gridRow;
  return (boardRow % 2 === 0)
    ? boardRow * 10 + gridCol + 1
    : boardRow * 10 + (9 - gridCol) + 1;
}

function getSquareCenter(n, boardEl, canvasEl) {
  const board = boardEl || (typeof document !== "undefined" && document.getElementById("board"));
  const canvas = canvasEl || (typeof document !== "undefined" && document.getElementById("connections-canvas"));

  if (board && canvasEl) {
    const cell = board.querySelector(".cell[data-square='" + n + "']");
    const canvasRect = canvasEl.getBoundingClientRect();
    if (cell && canvasRect.width > 0 && canvasRect.height > 0) {
      const cellRect = cell.getBoundingClientRect();
      const cx = (cellRect.left + cellRect.width / 2 - canvasRect.left) * (canvasEl.width / canvasRect.width);
      const cy = (cellRect.top + cellRect.height / 2 - canvasRect.top) * (canvasEl.height / canvasRect.height);
      return { x: cx, y: cy };
    }
  }

  const rect = (board && board.getBoundingClientRect && board.getBoundingClientRect()) || { width: 400, height: 400 };
  const cellW = rect.width / 10;
  const cellH = rect.height / 10;
  const { gridRow, col } = squareToGridPos(n);
  const cx = col * cellW + cellW / 2;
  const cy = gridRow * cellH + cellH / 2;
  if (canvasEl && canvasEl.width && canvasEl.height && rect.width && rect.height) {
    return { x: cx * (canvasEl.width / rect.width), y: cy * (canvasEl.height / rect.height) };
  }
  return { x: cx, y: cy };
}

// ── Build the Board ───────────────────────────────────────────────────

function buildBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let gr = 0; gr < 10; gr++) {
    for (let gc = 0; gc < 10; gc++) {
      const sq = gridPosToSquare(gr, gc);
      const ev = getSquareData(sq);
      const isBlank = ev && ev.blank;
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.square = sq;

      if (sq === 1) {
        cell.classList.add("cell-start");
      } else if (sq === 100) {
        cell.classList.add("cell-finish");
      } else if (ev && ev.country) {
        cell.classList.add(`cell-${ev.country}`);
      } else {
        cell.classList.add("cell-neutral");
      }

      const numSpan = document.createElement("span");
      numSpan.className = "cell-number";
      numSpan.textContent = sq;
      cell.appendChild(numSpan);

      if (!isBlank && ev && ev.year) {
        const yearSpan = document.createElement("span");
        yearSpan.className = "cell-year";
        yearSpan.textContent = ev.year;
        cell.appendChild(yearSpan);
      }

      if (!isBlank && ev && (ev.date || ev.title || ev.desc)) {
        cell.addEventListener("mouseenter", (e) => showTooltip(e, ev));
        cell.addEventListener("mousemove", moveTooltip);
        cell.addEventListener("mouseleave", hideTooltip);
      }

      if (sq === 1) {
        const iconSpan = document.createElement("span");
        iconSpan.className = "cell-icon";
        iconSpan.textContent = "🏁";
        cell.appendChild(iconSpan);
      } else if (sq === 100) {
        const iconSpan = document.createElement("span");
        iconSpan.className = "cell-icon";
        iconSpan.textContent = "🌙";
        cell.appendChild(iconSpan);
      }

      board.appendChild(cell);
    }
  }
}

// ── Tooltip ───────────────────────────────────────────────────────────

const tooltipEl = document.getElementById("tooltip");

function showTooltip(e, ev) {
  if (ev && ev.blank) return;
  const flagLabel = ev.country === "ussr" ? "USSR" : ev.country === "usa" ? "USA" : "";
  const sentLabel = ev.sentiment === "good" ? "Achievement" : ev.sentiment === "bad" ? "Setback" : "";
  const dateLine = [flagLabel, ev.date].filter(Boolean).join(" — ");
  const titleLine = [ev.title, sentLabel ? `(${sentLabel})` : ""].filter(Boolean).join(" ");
  const hasContent = dateLine || titleLine || ev.desc;
  tooltipEl.innerHTML = hasContent
    ? `
    ${dateLine ? `<div class="tt-date">${dateLine}</div>` : ""}
    ${titleLine ? `<div class="tt-title">${titleLine}</div>` : ""}
    ${ev.desc ? `<div class="tt-desc">${ev.desc}</div>` : ""}
  `
    : `<div class="tt-title">Square ${ev.square || ""}</div>`;
  tooltipEl.classList.remove("hidden");
  moveTooltip(e);
}

function moveTooltip(e) {
  const pad = 14;
  let x = e.clientX + pad;
  let y = e.clientY + pad;
  const tw = tooltipEl.offsetWidth;
  const th = tooltipEl.offsetHeight;
  if (x + tw > window.innerWidth - 10) x = e.clientX - tw - pad;
  if (y + th > window.innerHeight - 10) y = e.clientY - th - pad;
  tooltipEl.style.left = x + "px";
  tooltipEl.style.top = y + "px";
}

function hideTooltip() {
  tooltipEl.classList.add("hidden");
}

// ── Player Tokens (same rocket as Mission Control: USSR red, USA blue) ──

function getBoardTokenRocketSvg(pid) {
  const isUssr = pid === "ussr";
  const gradId = `board-token-${pid}-body`;
  const bodyFrom = isUssr ? "#e74c3c" : "#5dade2";
  const bodyTo = isUssr ? "#c0392b" : "#3498db";
  const portholeInner = isUssr ? "#e74c3c" : "#3498db";
  return `<svg viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg" class="token-rocket-svg"><defs><linearGradient id="${gradId}" x1="14" y1="40" x2="14" y2="0"><stop offset="0" stop-color="${bodyTo}"/><stop offset="1" stop-color="${bodyFrom}"/></linearGradient></defs><path d="M14 0 L24 8 L24 20 L28 28 L24 26 L14 34 L4 26 L0 28 L4 20 L4 8 Z" fill="#2c3e50"/><rect x="2" y="20" width="24" height="8" rx="1" fill="url(#${gradId})"/><rect x="4" y="8" width="20" height="4" fill="#e67e22"/><circle cx="14" cy="24" r="4" fill="#2c3e50"/><circle cx="14" cy="24" r="2.5" fill="${portholeInner}"/><circle cx="13" cy="23" r="0.8" fill="rgba(255,255,255,0.7)"/><path d="M4 26 L0 36 L4 32 L4 26 M24 26 L28 36 L24 32 L24 26" fill="#2c3e50"/><rect x="6" y="32" width="16" height="4" fill="#2c3e50"/><rect x="8" y="34" width="12" height="3" fill="#e74c3c"/><path d="M14 37 L18 32 L16 37 L14 40 L12 37 L10 32 Z" fill="#f1c40f"/></svg>`;
}

function createTokens() {
  const container = document.getElementById("player-tokens");
  container.innerHTML = "";
  ["ussr", "usa"].forEach(pid => {
    const token = document.createElement("div");
    token.className = `token token-${pid}`;
    token.id = `token-${pid}`;
    token.innerHTML = getBoardTokenRocketSvg(pid);
    container.appendChild(token);
  });
  updateTokenPositions();
}

function updateTokenPositions() {
  const board = document.getElementById("board");
  const rect = board.getBoundingClientRect();
  const cellW = rect.width / 10;
  const cellH = rect.height / 10;
  const tokenSize = Math.min(28, cellW * 0.45);

  ["ussr", "usa"].forEach(pid => {
    const token = document.getElementById(`token-${pid}`);
    if (!token) return;
    const pos = state.players[pid].pos;
    const center = getSquareCenter(pos, board);

    const bothSame = state.players.ussr.pos === state.players.usa.pos;
    const offset = bothSame ? (pid === "ussr" ? -tokenSize * 0.4 : tokenSize * 0.4) : 0;

    token.style.width = tokenSize + "px";
    token.style.height = tokenSize + "px";
    token.style.fontSize = (tokenSize * 0.55) + "px";
    token.style.left = (center.x - tokenSize / 2 + offset) + "px";
    token.style.top = (center.y - tokenSize / 2) + "px";
  });
}

// ── Canvas: Draw Rockets & Meteors ────────────────────────────────────

function resizeCanvas() {
  const canvas = document.getElementById("connections-canvas");
  const board = document.getElementById("board");
  if (!canvas || !board) return;
  // Force layout so getBoundingClientRect reflects current state
  void board.offsetHeight;
  const rect = board.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

function drawConnections() {
  const canvas = document.getElementById("connections-canvas");
  const board = document.getElementById("board");
  if (!canvas || !board) return;
  const ctx = canvas.getContext("2d");
  resizeCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  state.rockets.forEach(r => drawRocket(ctx, r.from, r.to, board, canvas));
  state.meteors.forEach(m => drawMeteor(ctx, m.from, m.to, board, canvas));
}

function drawRocket(ctx, from, to, boardEl, canvasEl) {
  if (!rocketImageCanvas) return;
  const a = getSquareCenter(from, boardEl, canvasEl);
  const b = getSquareCenter(to, boardEl, canvasEl);
  const pathLen = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const w = rocketImageCanvas.width;
  const h = rocketImageCanvas.height;
  const bodyHImg = Math.max(1, ROCKET_BODY_FRAC * h);
  const exhaustHImg = Math.max(1, h - bodyHImg);
  const bodyDispH = ROCKET_BODY_DISPLAY_H;
  const bodyDispW = bodyDispH * (w / bodyHImg);
  const exhaustDispW = bodyDispW;
  const exhaustLen = Math.max(0, pathLen - bodyDispH);

  // Origin so that: nose at b, exhaust end at a.
  const ox = b.x + (bodyDispH * (a.x - b.x)) / pathLen;
  const oy = b.y + (bodyDispH * (a.y - b.y)) / pathLen;
  const angle = Math.atan2(b.x - a.x, a.y - b.y);

  ctx.save();
  ctx.translate(ox, oy);
  ctx.rotate(angle);
  if (exhaustLen > 0) {
    ctx.drawImage(
      rocketImageCanvas,
      0, bodyHImg, w, exhaustHImg,
      -exhaustDispW / 2, 0, exhaustDispW, exhaustLen
    );
  }
  ctx.drawImage(
    rocketImageCanvas,
    0, 0, w, bodyHImg,
    -bodyDispW / 2, -bodyDispH, bodyDispW, bodyDispH
  );
  ctx.restore();
}

function drawMeteor(ctx, from, to, boardEl, canvasEl) {
  if (!meteorImageCanvas) return;
  const a = getSquareCenter(from, boardEl, canvasEl);
  const b = getSquareCenter(to, boardEl, canvasEl);
  const pathLen = Math.hypot(a.x - b.x, a.y - b.y) || 1;
  const imgW = meteorImageCanvas.width;
  const imgH = meteorImageCanvas.height;
  const scale = METEOR_REFERENCE_LEN / imgH;
  const dispW = imgW * scale;
  const headHImg = Math.max(1, imgH * METEOR_HEAD_FRAC);
  const tailHImg = Math.max(1, imgH - headHImg);
  const headDisplaySize = headHImg * scale;
  const headCropSize = Math.min(headHImg, imgW);
  const headSx = (imgW - headCropSize) / 2;

  const angle = Math.atan2(a.x - b.x, b.y - a.y);

  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(angle);
  ctx.drawImage(meteorImageCanvas, 0, tailHImg, imgW, -tailHImg, -dispW / 2, -pathLen, dispW, pathLen);
  ctx.drawImage(meteorImageCanvas, headSx, imgH - headHImg, headCropSize, headHImg, -headDisplaySize / 2, -headDisplaySize, headDisplaySize, headDisplaySize);
  ctx.restore();
}

// ── Dice ──────────────────────────────────────────────────────────────

const diceEl = document.getElementById("dice");
const rollBtn = document.getElementById("roll-btn");

function rollDice() {
  if (state.rolling || state.gameOver) return;
  state.rolling = true;
  rollBtn.disabled = true;

  diceEl.classList.add("rolling");
  let ticks = 0;
  const maxTicks = 12;

  const interval = setInterval(() => {
    diceEl.textContent = Math.floor(Math.random() * 6) + 1;
    ticks++;
    if (ticks >= maxTicks) {
      clearInterval(interval);
      const result = Math.floor(Math.random() * 6) + 1;
      diceEl.textContent = result;
      diceEl.classList.remove("rolling");
      handleMove(result);
    }
  }, 80);
}

rollBtn.addEventListener("click", rollDice);

// ── Game Logic ────────────────────────────────────────────────────────

function handleMove(steps) {
  const pid = state.currentPlayer;
  const player = state.players[pid];
  let target = player.pos + steps;

  if (target > 100) {
    showMessage(`Rolled ${steps} — need exact number to finish! Turn passes.`);
    state.rolling = false;
    rollBtn.disabled = false;
    switchTurn();
    return;
  }

  animateMovement(pid, player.pos, target, () => {
    player.pos = target;
    updatePlayerInfo();
    updateTokenPositions();

    if (target === 100) {
      endGame(pid);
      return;
    }

    const rocket = state.rockets.find(r => r.from === target);
    const meteor = state.meteors.find(m => m.from === target);

    if (rocket) {
      showMessage(`🚀 ROCKET LAUNCH! ${player.name} blasts from ${target} to ${rocket.to}!`);
      setTimeout(() => {
        animateDirectSlide(pid, target, rocket.to, () => {
          player.pos = rocket.to;
          updatePlayerInfo();
          updateTokenPositions();
          if (player.pos === 100) { endGame(pid); return; }
          finishTurn();
        });
      }, 600);
    } else if (meteor) {
      showMessage(`☄️ METEOR STRIKE! ${player.name} crashes from ${target} down to ${meteor.to}!`);
      setTimeout(() => {
        animateDirectSlide(pid, target, meteor.to, () => {
          player.pos = meteor.to;
          updatePlayerInfo();
          updateTokenPositions();
          finishTurn();
        });
      }, 600);
    } else {
      const ev = getSquareData(target);
      const actionVal = ev ? getActionForPlayer(ev, pid) : 0;
      if (actionVal) {
        const actionDest = target + actionVal;
        const clampedDest = Math.max(1, Math.min(100, actionDest));
        const dir = actionVal > 0 ? "forward" : "backward";
        const base = (ev.date ? ev.date + ", " : "") + (ev.desc || ev.title || "");
        showMessage(base ? `${base} — Move ${Math.abs(actionVal)} ${dir}!` : `Square effect: Move ${Math.abs(actionVal)} ${dir}!`);
        setTimeout(() => {
          animateMovement(pid, target, clampedDest, () => {
            player.pos = clampedDest;
            updatePlayerInfo();
            updateTokenPositions();
            if (player.pos === 100) { endGame(pid); return; }
            finishTurn();
          });
        }, 600);
      } else if (ev && !ev.blank && (ev.desc || ev.title)) {
        showMessage((ev.date ? ev.date + ", " : "") + (ev.desc || ev.title));
        finishTurn();
      } else {
        showMessage(`${player.name} moves to square ${target}.`);
        finishTurn();
      }
    }
  });
}

function animateMovement(pid, from, to, callback) {
  const board = document.getElementById("board");
  const token = document.getElementById(`token-${pid}`);
  const rect = board.getBoundingClientRect();
  const cellW = rect.width / 10;
  const tokenSize = Math.min(28, cellW * 0.45);

  const direction = to > from ? 1 : -1;
  let current = from;
  const stepDelay = 120;

  function stepOnce() {
    if (current === to) {
      callback();
      return;
    }
    current += direction;
    const center = getSquareCenter(current, board);

    const bothSame = (pid === "ussr" && state.players.usa.pos === current) ||
                     (pid === "usa" && state.players.ussr.pos === current);
    const offset = bothSame ? (pid === "ussr" ? -tokenSize * 0.4 : tokenSize * 0.4) : 0;

    token.style.left = (center.x - tokenSize / 2 + offset) + "px";
    token.style.top = (center.y - tokenSize / 2) + "px";

    highlightCell(current);
    setTimeout(stepOnce, stepDelay);
  }

  stepOnce();
}

function animateDirectSlide(pid, from, to, callback) {
  const board = document.getElementById("board");
  const token = document.getElementById(`token-${pid}`);
  const rect = board.getBoundingClientRect();
  const cellW = rect.width / 10;
  const tokenSize = Math.min(28, cellW * 0.45);

  const startCenter = getSquareCenter(from, board);
  const endCenter = getSquareCenter(to, board);
  const duration = 500;
  const startTime = performance.now();

  function frame(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const x = startCenter.x + (endCenter.x - startCenter.x) * ease;
    const y = startCenter.y + (endCenter.y - startCenter.y) * ease;

    token.style.left = (x - tokenSize / 2) + "px";
    token.style.top = (y - tokenSize / 2) + "px";

    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      highlightCell(to);
      callback();
    }
  }

  requestAnimationFrame(frame);
}

function highlightCell(sq) {
  const cell = document.querySelector(`.cell[data-square="${sq}"]`);
  if (!cell) return;
  cell.style.outline = "2px solid #ffcc00";
  cell.style.outlineOffset = "-2px";
  setTimeout(() => {
    cell.style.outline = "";
    cell.style.outlineOffset = "";
  }, 300);
}

function finishTurn() {
  switchTurn();
  state.rolling = false;
  rollBtn.disabled = false;
}

function switchTurn() {
  state.currentPlayer = state.currentPlayer === "ussr" ? "usa" : "ussr";
  updateTurnIndicator();
}

function updateTurnIndicator() {
  const el = document.getElementById("turn-indicator");
  if (el) {
    el.textContent = state.currentPlayer === "ussr" ? "USSR's Turn" : "USA's Turn";
    el.className = "turn-" + state.currentPlayer;
  }
  document.body.style.background = state.currentPlayer === "ussr" ? "#4a1010" : "#10104a";
}

function updatePlayerInfo() {
  document.getElementById("ussr-pos").textContent = `Square: ${state.players.ussr.pos}`;
  document.getElementById("usa-pos").textContent = `Square: ${state.players.usa.pos}`;
}

function endGame(winnerId) {
  state.gameOver = true;
  state.rolling = false;
  rollBtn.disabled = true;
  const winner = state.players[winnerId];
  const overlay = document.getElementById("winner-overlay");
  document.getElementById("winner-text").textContent = `${winner.icon} ${winner.name} WINS! ${winner.icon}`;
  document.getElementById("winner-sub").textContent =
    winnerId === "usa"
      ? "America lands on the Moon first!"
      : "You were so close to walking on the Moon but you see that the United States have passed you and reached the Moon first. Better luck next time.";
  overlay.classList.remove("hidden");
  if (winnerId === "usa") {
    launchConfetti(winnerId);
  }
}

// ── Confetti Celebration ──────────────────────────────────────────────

function launchConfetti(winnerId) {
  const existing = document.getElementById("confetti-canvas");
  if (existing) existing.remove();

  const canvas = document.createElement("canvas");
  canvas.id = "confetti-canvas";
  document.body.appendChild(canvas);

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "9999";
  canvas.style.pointerEvents = "none";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;

  const colors = winnerId === "usa"
    ? ["#3498db", "#5dade2", "#ffffff", "#f4d03f", "#e8f8ff", "#2980b9"]
    : ["#e74c3c", "#ff6b6b", "#ffffff", "#f4d03f", "#ffe0e0", "#c0392b"];

  const shapes = ["rect", "circle", "strip"];
  const particles = [];
  const BURST_COUNT = 300;

  for (let i = 0; i < BURST_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 4;
    particles.push({
      x: cx + (Math.random() - 0.5) * 100,
      y: cy + (Math.random() - 0.5) * 100,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 6,
      w: Math.random() * 10 + 5,
      h: Math.random() * 8 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      spin: (Math.random() - 0.5) * 0.3,
      angle: Math.random() * Math.PI * 2,
      gravity: 0.12 + Math.random() * 0.08,
      drag: 0.98 + Math.random() * 0.015,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.08 + 0.02
    });
  }

  let frame = 0;
  const FADE_START = 200;
  const TOTAL_FRAMES = 320;

  function animate() {
    frame++;
    ctx.clearRect(0, 0, W, H);

    const alpha = frame > FADE_START
      ? Math.max(0, 1 - (frame - FADE_START) / (TOTAL_FRAMES - FADE_START))
      : 1;

    for (const p of particles) {
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.x += p.vx + Math.sin(p.wobble) * 1.5;
      p.y += p.vy;
      p.angle += p.spin;
      p.wobble += p.wobbleSpeed;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;

      if (p.shape === "rect") {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      } else if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -1, p.w, 2.5);
      }

      ctx.restore();
    }

    if (frame < TOTAL_FRAMES) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  requestAnimationFrame(animate);
}

// ── Game Message ──────────────────────────────────────────────────────

let messageEl = null;

function ensureMessageEl() {
  if (messageEl) return;
  messageEl = document.createElement("div");
  messageEl.className = "game-message";
  messageEl.textContent = "Roll the dice to begin the Space Race!";
  const diceSection = document.querySelector(".dice-section");
  diceSection.appendChild(messageEl);
}

function showMessage(text) {
  ensureMessageEl();
  messageEl.textContent = text;
}

// ── Control Panel: Rockets & Meteors ──────────────────────────────────

const tabBtns = document.querySelectorAll(".tab-btn");
const rocketForm = document.getElementById("rocket-form");
const meteorForm = document.getElementById("meteor-form");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (btn.dataset.tab === "rocket") {
      rocketForm.classList.remove("hidden");
      meteorForm.classList.add("hidden");
    } else {
      rocketForm.classList.add("hidden");
      meteorForm.classList.remove("hidden");
    }
  });
});

document.getElementById("add-rocket-btn").addEventListener("click", () => {
  const from = parseInt(document.getElementById("rocket-from").value);
  const to = parseInt(document.getElementById("rocket-to").value);
  if (!validateConnection(from, to, "rocket")) return;
  state.rockets.push({ id: state.nextRocketId++, from, to });
  document.getElementById("rocket-from").value = "";
  document.getElementById("rocket-to").value = "";
  refreshConnections();
});

document.getElementById("add-meteor-btn").addEventListener("click", () => {
  const from = parseInt(document.getElementById("meteor-from").value);
  const to = parseInt(document.getElementById("meteor-to").value);
  if (!validateConnection(from, to, "meteor")) return;
  state.meteors.push({ id: state.nextMeteorId++, from, to });
  document.getElementById("meteor-from").value = "";
  document.getElementById("meteor-to").value = "";
  refreshConnections();
});

function validateConnection(from, to, type) {
  if (isNaN(from) || isNaN(to)) {
    alert("Please enter valid square numbers.");
    return false;
  }
  if (from < 2 || from > 99 || to < 2 || to > 99) {
    alert("Squares must be between 2 and 99.");
    return false;
  }
  if (from === to) {
    alert("Start and end squares must be different.");
    return false;
  }
  if (type === "rocket" && to <= from) {
    alert("Rocket destination must be a higher square number (rockets launch upward!).");
    return false;
  }
  if (type === "meteor" && to >= from) {
    alert("Meteor destination must be a lower square number (meteors crash downward!).");
    return false;
  }
  const allFroms = [
    ...state.rockets.map(r => r.from),
    ...state.meteors.map(m => m.from)
  ];
  if (allFroms.includes(from)) {
    alert(`Square ${from} already has a connection starting from it.`);
    return false;
  }
  return true;
}

function removeConnection(type, id) {
  if (type === "rocket") {
    state.rockets = state.rockets.filter(r => r.id !== id);
  } else {
    state.meteors = state.meteors.filter(m => m.id !== id);
  }
  refreshConnections();
}

function refreshConnections() {
  drawConnections();
  renderConnectionsList();
}

function renderConnectionsList() {
  const container = document.getElementById("connections-list-content");
  if (state.rockets.length === 0 && state.meteors.length === 0) {
    container.innerHTML = '<p class="empty-msg">No rockets or meteors placed yet.</p>';
    return;
  }

  let html = "";
  state.rockets.forEach(r => {
    html += `
      <div class="connection-item rocket-item">
        <span class="conn-info">🚀 Sq ${r.from} → Sq ${r.to}</span>
        <button class="btn btn-remove" onclick="removeConnection('rocket', ${r.id})">✕</button>
      </div>`;
  });
  state.meteors.forEach(m => {
    html += `
      <div class="connection-item meteor-item">
        <span class="conn-info">☄️ Sq ${m.from} → Sq ${m.to}</span>
        <button class="btn btn-remove" onclick="removeConnection('meteor', ${m.id})">✕</button>
      </div>`;
  });
  container.innerHTML = html;
}

// ── Reset ─────────────────────────────────────────────────────────────

document.getElementById("reset-btn").addEventListener("click", () => {
  game.reset();
});

const game = {
  reset() {
    state.players.ussr.pos = 1;
    state.players.usa.pos = 1;
    state.currentPlayer = "ussr";
    state.rolling = false;
    state.gameOver = false;
    rollBtn.disabled = false;

    document.getElementById("winner-overlay").classList.add("hidden");
    const confetti = document.getElementById("confetti-canvas");
    if (confetti) confetti.remove();
    updateTurnIndicator();
    updatePlayerInfo();
    createTokens();
    drawConnections();
    showMessage("Roll the dice to begin the Space Race!");
  }
};

// ── Initialize ────────────────────────────────────────────────────────

function loadConnectionsFromStorage() {
  loadConnectionsFromLocal();
}

async function init() {
  const apiOk = await loadConfigFromAPI();
  if (!apiOk) {
    loadCustomSquaresFromLocal();
    loadConnectionsFromLocal();
  }

  buildBoard();
  ensureMessageEl();
  createTokens();
  drawConnections();
  renderConnectionsList();
  loadMeteorImage();
  loadRocketImage();
  updateTurnIndicator();

  window.addEventListener("resize", () => {
    drawConnections();
    updateTokenPositions();
  });
}

updateTurnIndicator();
init();
