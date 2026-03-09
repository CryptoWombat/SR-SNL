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
    square: 21, date: "Apr 9, 1959", year: "1959",
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
}

async function loadConfigFromAPI() {
  try {
    const res = await fetch("/api/config");
    if (!res.ok) throw new Error(res.status);
    const cfg = await res.json();
    if (cfg.rockets) state.rockets = cfg.rockets;
    if (cfg.meteors) state.meteors = cfg.meteors;
    if (cfg.customSquares) customSquares = cfg.customSquares;
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

function getSquareCenter(n, boardEl) {
  const rect = boardEl.getBoundingClientRect();
  const cellW = rect.width / 10;
  const cellH = rect.height / 10;
  const { gridRow, col } = squareToGridPos(n);
  return {
    x: col * cellW + cellW / 2,
    y: gridRow * cellH + cellH / 2
  };
}

// ── Build the Board ───────────────────────────────────────────────────

function buildBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let gr = 0; gr < 10; gr++) {
    for (let gc = 0; gc < 10; gc++) {
      const sq = gridPosToSquare(gr, gc);
      const ev = getSquareData(sq);
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

      if (ev && ev.year) {
        const yearSpan = document.createElement("span");
        yearSpan.className = "cell-year";
        yearSpan.textContent = ev.year;
        cell.appendChild(yearSpan);
      }

      if (ev && ev.action) {
        const actionSpan = document.createElement("span");
        actionSpan.className = "cell-icon";
        actionSpan.textContent = ev.action > 0 ? "⏩" : "⏪";
        cell.appendChild(actionSpan);
      }

      if (ev) {
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
  const flagLabel = ev.country === "ussr" ? "USSR" : ev.country === "usa" ? "USA" : "";
  const sentLabel = ev.sentiment === "good" ? "Achievement" : ev.sentiment === "bad" ? "Setback" : "";
  const dateLine = [flagLabel, ev.date].filter(Boolean).join(" — ");
  const titleLine = [ev.title, sentLabel ? `(${sentLabel})` : ""].filter(Boolean).join(" ");
  const actionLine = ev.action
    ? `<div class="tt-action">${ev.action > 0 ? "⏩" : "⏪"} Move ${Math.abs(ev.action)} square${Math.abs(ev.action) !== 1 ? "s" : ""} ${ev.action > 0 ? "forward" : "backward"}</div>`
    : "";
  const hasContent = dateLine || titleLine || ev.desc || actionLine;
  tooltipEl.innerHTML = hasContent
    ? `
    ${dateLine ? `<div class="tt-date">${dateLine}</div>` : ""}
    ${titleLine ? `<div class="tt-title">${titleLine}</div>` : ""}
    ${ev.desc ? `<div class="tt-desc">${ev.desc}</div>` : ""}
    ${actionLine}
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
  const rect = board.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

function drawConnections() {
  const canvas = document.getElementById("connections-canvas");
  const board = document.getElementById("board");
  const ctx = canvas.getContext("2d");
  resizeCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  state.rockets.forEach(r => drawRocket(ctx, r.from, r.to, board));
  state.meteors.forEach(m => drawMeteor(ctx, m.from, m.to, board));
}

function drawRocket(ctx, from, to, boardEl) {
  const a = getSquareCenter(from, boardEl);
  const b = getSquareCenter(to, boardEl);

  const cpOffset = (b.x - a.x) * 0.3 + 20;
  const cp1x = a.x + cpOffset;
  const cp1y = a.y - (a.y - b.y) * 0.3;
  const cp2x = b.x - cpOffset;
  const cp2y = b.y + (a.y - b.y) * 0.3;

  ctx.save();

  const path = new Path2D();
  path.moveTo(a.x, a.y);
  path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, b.x, b.y);

  // Exhaust trail: stylized flame (yellow core → orange edges) along full path
  ctx.strokeStyle = "rgba(241, 196, 15, 0.35)";
  ctx.lineWidth = 20;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke(path);
  const trailGrad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
  trailGrad.addColorStop(0, "#f1c40f");
  trailGrad.addColorStop(0.3, "#e67e22");
  trailGrad.addColorStop(0.7, "#d35400");
  trailGrad.addColorStop(1, "rgba(230, 126, 34, 0.4)");
  ctx.strokeStyle = trailGrad;
  ctx.lineWidth = 12;
  ctx.stroke(path);

  // Rocket at destination (inspiration style: nose, band, body, porthole, fins, engine, nozzle, flame)
  const scale = 14;
  const rx = b.x;
  const ry = b.y;
  ctx.translate(rx, ry);
  ctx.scale(1, -1);

  // Flame at rocket base (teardrop-style)
  ctx.beginPath();
  ctx.moveTo(0, -scale * 1.5);
  ctx.lineTo(scale * 0.35, -scale * 1.1);
  ctx.lineTo(scale * 0.25, -scale * 0.7);
  ctx.lineTo(0, -scale * 0.9);
  ctx.lineTo(-scale * 0.25, -scale * 0.7);
  ctx.lineTo(-scale * 0.35, -scale * 1.1);
  ctx.closePath();
  const flameGrad = ctx.createLinearGradient(0, -scale * 1.5, 0, -scale * 0.6);
  flameGrad.addColorStop(0, "#f1c40f");
  flameGrad.addColorStop(0.6, "#e67e22");
  flameGrad.addColorStop(1, "#c0392b");
  ctx.fillStyle = flameGrad;
  ctx.fill();

  // Engine / nozzle (red-orange)
  ctx.fillStyle = "#e74c3c";
  ctx.fillRect(-scale * 0.35, -scale * 1.35, scale * 0.7, scale * 0.25);
  ctx.strokeStyle = "#c0392b";
  ctx.lineWidth = 1;
  ctx.strokeRect(-scale * 0.35, -scale * 1.35, scale * 0.7, scale * 0.25);

  // Main body (light cyan, rounded corners)
  const bw = scale * 0.64;
  const bh = scale * 0.85;
  const bx = -scale * 0.32;
  const by = -scale * 1.1;
  const r = 2;
  ctx.beginPath();
  ctx.moveTo(bx + r, by);
  ctx.lineTo(bx + bw - r, by);
  ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + r);
  ctx.lineTo(bx + bw, by + bh - r);
  ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - r, by + bh);
  ctx.lineTo(bx + r, by + bh);
  ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - r);
  ctx.lineTo(bx, by + r);
  ctx.quadraticCurveTo(bx, by, bx + r, by);
  ctx.closePath();
  ctx.fillStyle = "#7ec8e3";
  ctx.fill();
  ctx.strokeStyle = "#5dade2";
  ctx.lineWidth = 1;
  ctx.stroke();
  // Highlight on body
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.fillRect(-scale * 0.28, -scale * 0.9, scale * 0.2, scale * 0.6);

  // Porthole
  ctx.fillStyle = "#2c3e50";
  ctx.beginPath();
  ctx.arc(0, -scale * 0.35, scale * 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#3498db";
  ctx.beginPath();
  ctx.arc(0, -scale * 0.35, scale * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.beginPath();
  ctx.arc(-scale * 0.04, -scale * 0.38, scale * 0.04, 0, Math.PI * 2);
  ctx.fill();

  // Red-orange band below nose
  ctx.fillStyle = "#e67e22";
  ctx.fillRect(-scale * 0.33, scale * 0.5, scale * 0.66, scale * 0.12);

  // Nose cone (dark blue-grey)
  ctx.beginPath();
  ctx.moveTo(0, scale * 1.2);
  ctx.lineTo(scale * 0.33, scale * 0.5);
  ctx.lineTo(-scale * 0.33, scale * 0.5);
  ctx.closePath();
  ctx.fillStyle = "#2c3e50";
  ctx.fill();
  ctx.strokeStyle = "#34495e";
  ctx.stroke();

  // Fins (dark blue-grey, triangular)
  ctx.fillStyle = "#2c3e50";
  ctx.strokeStyle = "#34495e";
  ctx.beginPath();
  ctx.moveTo(-scale * 0.32, -scale * 0.9);
  ctx.lineTo(-scale * 0.6, -scale * 1.25);
  ctx.lineTo(-scale * 0.32, -scale * 1.05);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(scale * 0.32, -scale * 0.9);
  ctx.lineTo(scale * 0.6, -scale * 1.25);
  ctx.lineTo(scale * 0.32, -scale * 1.05);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Launch pad at start
  ctx.beginPath();
  ctx.arc(a.x, a.y, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#34495e";
  ctx.fill();
  ctx.strokeStyle = "#2c3e50";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

function drawMeteor(ctx, from, to, boardEl) {
  const a = getSquareCenter(from, boardEl);
  const b = getSquareCenter(to, boardEl);

  const cpOffset = (b.x - a.x) * 0.3 - 20;
  const cp1x = a.x + cpOffset;
  const cp1y = a.y + (b.y - a.y) * 0.3;
  const cp2x = b.x - cpOffset;
  const cp2y = b.y - (b.y - a.y) * 0.3;

  ctx.save();

  // Curve from meteor head (a) to impact (b) for tail
  const curve = (t) => {
    const mt = 1 - t;
    const mt2 = mt * mt, mt3 = mt2 * mt;
    const t2 = t * t, t3 = t2 * t;
    return {
      x: mt3 * a.x + 3 * mt2 * t * cp1x + 3 * mt * t2 * cp2x + t3 * b.x,
      y: mt3 * a.y + 3 * mt2 * t * cp1y + 3 * mt * t2 * cp2y + t3 * b.y
    };
  };

  const pts = [];
  for (let t = 0; t <= 1; t += 0.025) pts.push(curve(t));
  const dx = b.x - a.x, dy = b.y - a.y;
  const perp = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / perp, ny = dx / perp;

  // Tail: wispy, white near body → slightly golden → fade (distinct from rocket orange/red)
  const tailWidth = (i) => {
    const t = i / pts.length;
    const taper = 1 - t * 0.92;
    const wave = Math.sin(i * 0.4) * 1.5 + Math.sin(i * 0.7 + 1) * 1;
    return (14 + wave) * taper;
  };
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    const w = tailWidth(i);
    const p = pts[i];
    const x = p.x + nx * w, y = p.y + ny * w;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  for (let i = pts.length - 1; i >= 0; i--) {
    const w = tailWidth(i);
    const p = pts[i];
    ctx.lineTo(p.x - nx * w, p.y - ny * w);
  }
  ctx.closePath();
  const tailGrad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
  tailGrad.addColorStop(0, "rgba(255, 255, 255, 0.85)");
  tailGrad.addColorStop(0.08, "rgba(255, 252, 240, 0.75)");
  tailGrad.addColorStop(0.25, "rgba(255, 248, 220, 0.5)");
  tailGrad.addColorStop(0.5, "rgba(241, 219, 160, 0.35)");
  tailGrad.addColorStop(0.75, "rgba(245, 222, 179, 0.15)");
  tailGrad.addColorStop(1, "rgba(255, 248, 220, 0)");
  ctx.fillStyle = tailGrad;
  ctx.fill();

  // Outer soft glow along tail
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    const t = i / pts.length;
    const w = (18 + Math.sin(i * 0.3) * 2) * (1 - t * 0.9);
    const p = pts[i];
    if (i === 0) ctx.moveTo(p.x + nx * w, p.y + ny * w);
    else ctx.lineTo(p.x + nx * w, p.y + ny * w);
  }
  for (let i = pts.length - 1; i >= 0; i--) {
    const t = i / pts.length;
    const w = (18 + Math.sin(i * 0.3 + 2) * 2) * (1 - t * 0.9);
    const p = pts[i];
    ctx.lineTo(p.x - nx * w, p.y - ny * w);
  }
  ctx.closePath();
  const glowGrad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
  glowGrad.addColorStop(0, "rgba(255, 248, 220, 0.2)");
  glowGrad.addColorStop(0.4, "rgba(245, 222, 179, 0.08)");
  glowGrad.addColorStop(1, "rgba(255, 248, 220, 0)");
  ctx.fillStyle = glowGrad;
  ctx.fill();

  // Meteor body: prominent yellow/orange glowing sphere (like reference image)
  const cx = a.x, cy = a.y;
  const rOuter = 16;
  const rAura = 13;
  const rCore = 10;
  const rInner = 7;
  ctx.beginPath();
  ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 200, 100, 0.25)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, rAura, 0, Math.PI * 2);
  const auraGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rAura);
  auraGrad.addColorStop(0, "rgba(255, 220, 120, 0.5)");
  auraGrad.addColorStop(0.5, "rgba(255, 180, 80, 0.35)");
  auraGrad.addColorStop(1, "rgba(230, 140, 50, 0.1)");
  ctx.fillStyle = auraGrad;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, rCore, 0, Math.PI * 2);
  const coreGrad = ctx.createRadialGradient(cx - 2, cy - 2, 0, cx, cy, rCore);
  coreGrad.addColorStop(0, "#fff5cc");
  coreGrad.addColorStop(0.4, "#ffdd66");
  coreGrad.addColorStop(0.7, "#f1c40f");
  coreGrad.addColorStop(1, "#e6a020");
  ctx.fillStyle = coreGrad;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, rInner, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy, rCore, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 220, 140, 0.6)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Impact at destination: soft golden glow
  ctx.beginPath();
  ctx.arc(b.x, b.y, 12, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 235, 180, 0.25)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(b.x, b.y, 6, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(241, 219, 160, 0.4)";
  ctx.fill();

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
      if (ev && ev.action) {
        const actionDest = target + ev.action;
        const clampedDest = Math.max(1, Math.min(100, actionDest));
        const dir = ev.action > 0 ? "forward" : "backward";
        const msg = ev.title
          ? `Landed on: ${ev.title} — Move ${Math.abs(ev.action)} ${dir}!`
          : `Square effect: Move ${Math.abs(ev.action)} ${dir}!`;
        showMessage(msg);
        setTimeout(() => {
          animateMovement(pid, target, clampedDest, () => {
            player.pos = clampedDest;
            updatePlayerInfo();
            updateTokenPositions();
            if (player.pos === 100) { endGame(pid); return; }
            finishTurn();
          });
        }, 600);
      } else if (ev && ev.title) {
        showMessage(`Landed on: ${ev.title}${ev.date ? ` (${ev.date})` : ""}`);
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
  if (state.currentPlayer === "ussr") {
    el.textContent = "USSR's Turn";
    el.className = "turn-ussr";
  } else {
    el.textContent = "USA's Turn";
    el.className = "turn-usa";
  }
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
      : "The Soviet Union conquers the cosmos!";
  overlay.classList.remove("hidden");
  launchConfetti(winnerId);
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

  window.addEventListener("resize", () => {
    drawConnections();
    updateTokenPositions();
  });
}

init();
