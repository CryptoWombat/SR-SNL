const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const htmlContent = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
const gameJS = fs.readFileSync(path.join(__dirname, "game.js"), "utf-8");

const dom = new JSDOM(htmlContent, {
  runScripts: "dangerously",
  resources: "usable",
  pretendToBeVisual: true,
  url: "file:///" + __dirname.replace(/\\/g, "/") + "/index.html"
});

const { window } = dom;
const { document } = window;

window.alert = () => {};

window.HTMLElement.prototype.getBoundingClientRect = function() {
  return { width: 500, height: 500, top: 0, left: 0, right: 500, bottom: 500, x: 0, y: 0 };
};

window.fetch = function() {
  return Promise.reject(new Error("no network in tests"));
};

window.HTMLCanvasElement.prototype.getContext = function() {
  return {
    clearRect() {}, beginPath() {}, moveTo() {}, bezierCurveTo() {}, quadraticCurveTo() {},
    stroke() {}, fill() {}, arc() {}, save() {}, restore() {},
    setLineDash() {}, fillText() {},
    createLinearGradient() { return { addColorStop() {} }; },
    strokeStyle: "", fillStyle: "", lineWidth: 0, font: "",
    textAlign: "", textBaseline: ""
  };
};

const modifiedJS = gameJS
  .replace(/^const SPACE_EVENTS/m, "window.SPACE_EVENTS")
  .replace(/^const eventMap/m, "window.eventMap")
  .replace(/^const state/m, "window.state")
  .replace(/^const game/m, "window.game")
  .replace(/^function /gm, "window.$& ".replace("window.function ", "window."))
  ;

const wrappedJS = gameJS
  .replace("const SPACE_EVENTS", "window.SPACE_EVENTS")
  .replace("const eventMap", "window.eventMap")
  .replace("let customSquares", "window.customSquares")
  .replace("const state", "window.state")
  .replace("const game =", "window.game =");

const initWrapped = wrappedJS.replace("init();", "window._initPromise = init();");
window.eval(initWrapped);

(async () => {
await window._initPromise;

const squareToGridPos = window.squareToGridPos;
const gridPosToSquare = window.gridPosToSquare;
const getSquareCenter = window.getSquareCenter;
const SPACE_EVENTS = window.SPACE_EVENTS;
const eventMap = window.eventMap;
const state = window.state;
const validateConnection = window.validateConnection;
const switchTurn = window.switchTurn;
const renderConnectionsList = window.renderConnectionsList;
const endGame = window.endGame;
const gameObj = window.game;
const getEventText = window.getEventText;

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    passed++;
    console.log(`  \x1b[32m✓ ${testName}\x1b[0m`);
  } else {
    failed++;
    console.log(`  \x1b[31m✗ ${testName}\x1b[0m`);
  }
}

function assertEqual(actual, expected, testName) {
  if (actual === expected) {
    passed++;
    console.log(`  \x1b[32m✓ ${testName}\x1b[0m`);
  } else {
    failed++;
    console.log(`  \x1b[31m✗ ${testName} — expected: ${expected}, got: ${actual}\x1b[0m`);
  }
}

console.log("\n\x1b[33m=== SPACE RACE: Snakes & Ladders — Test Suite ===\x1b[0m\n");

// ── Test: squareToGridPos ──
console.log("\x1b[36mBoard positioning:\x1b[0m");
(function() {
  let pos;
  pos = squareToGridPos(1);
  assertEqual(pos.gridRow, 9, "Square 1 → gridRow 9");
  assertEqual(pos.col, 0, "Square 1 → col 0");

  pos = squareToGridPos(10);
  assertEqual(pos.gridRow, 9, "Square 10 → gridRow 9");
  assertEqual(pos.col, 9, "Square 10 → col 9");

  pos = squareToGridPos(11);
  assertEqual(pos.gridRow, 8, "Square 11 → gridRow 8");
  assertEqual(pos.col, 9, "Square 11 → col 9 (zigzag row)");

  pos = squareToGridPos(20);
  assertEqual(pos.gridRow, 8, "Square 20 → gridRow 8");
  assertEqual(pos.col, 0, "Square 20 → col 0 (zigzag row)");

  pos = squareToGridPos(100);
  assertEqual(pos.gridRow, 0, "Square 100 → gridRow 0 (top-left)");
  assertEqual(pos.col, 0, "Square 100 → col 0");

  pos = squareToGridPos(91);
  assertEqual(pos.gridRow, 0, "Square 91 → gridRow 0");
  assertEqual(pos.col, 9, "Square 91 → col 9 (top-right)");
})();

// ── Test: roundtrip ──
console.log("\n\x1b[36mRoundtrip (all 100 squares):\x1b[0m");
(function() {
  let allOk = true;
  for (let n = 1; n <= 100; n++) {
    const { gridRow, col } = squareToGridPos(n);
    const back = gridPosToSquare(gridRow, col);
    if (back !== n) {
      allOk = false;
      assertEqual(back, n, `Roundtrip failed for square ${n}`);
    }
  }
  if (allOk) assert(true, "squareToGridPos ↔ gridPosToSquare roundtrip (all 100 squares)");
})();

// ── Test: getSquareCenter (meteor/rocket positioning) ──
console.log("\n\x1b[36mgetSquareCenter (rocket/meteor positioning):\x1b[0m");
(function() {
  const board = document.getElementById("board");
  if (!board) return;
  const rect = { width: 500, height: 500 };
  const cellW = rect.width / 10;
  const cellH = rect.height / 10;
  const tolerance = 2;
  const near = (a, b) => Math.abs(a - b) <= tolerance;
  const c91 = getSquareCenter(91, board, null);
  const c68 = getSquareCenter(68, board, null);
  const c26 = getSquareCenter(26, board, null);
  const c46 = getSquareCenter(46, board, null);
  assert(near(c91.x, 9 * cellW + cellW / 2) && near(c91.y, 0 * cellH + cellH / 2), "Sq 91 at top-right");
  assert(near(c68.x, 7 * cellW + cellW / 2) && near(c68.y, 3 * cellH + cellH / 2), "Sq 68 at correct position");
  assert(near(c26.x, 5 * cellW + cellW / 2) && near(c26.y, 7 * cellH + cellH / 2), "Sq 26 at correct position");
  assert(near(c46.x, 5 * cellW + cellW / 2) && near(c46.y, 5 * cellH + cellH / 2), "Sq 46 at correct position");
})();

// ── Test: Event data ──
console.log("\n\x1b[36mEvent data:\x1b[0m");
(function() {
  assertEqual(SPACE_EVENTS.length, 33, "33 space events loaded");

  const countries = new Set(SPACE_EVENTS.map(e => e.country));
  assert(countries.has("ussr"), "Events include USSR");
  assert(countries.has("usa"), "Events include USA");
  assertEqual(countries.size, 2, "Only 2 countries");

  const ussrEvents = SPACE_EVENTS.filter(e => e.country === "ussr");
  const usaEvents = SPACE_EVENTS.filter(e => e.country === "usa");
  assert(ussrEvents.length === 16, `USSR has 16 events (got ${ussrEvents.length})`);
  assert(usaEvents.length === 17, `USA has 17 events (got ${usaEvents.length})`);

  const badUssr = SPACE_EVENTS.filter(e => e.country === "ussr" && e.sentiment === "bad");
  const badUsa = SPACE_EVENTS.filter(e => e.country === "usa" && e.sentiment === "bad");
  assertEqual(badUssr.length, 3, "3 USSR setbacks (Korolev, Komarov, N1)");
  assertEqual(badUsa.length, 1, "1 USA setback (Apollo 1)");

  assertEqual(eventMap[3].title, "Sputnik 1", "eventMap[3] = Sputnik 1");
  assertEqual(eventMap[100].title, "Apollo 11 — Moon Landing!", "eventMap[100] = Apollo 11");
  assertEqual(eventMap[42].title, "Yuri Gagarin — First Human in Space", "eventMap[42] = Gagarin");
  assertEqual(eventMap[51].title, "Valentina Tereshkova — First Woman in Space", "eventMap[51] = Tereshkova");
})();

// ── Test: Mission Control text formatting (no leading year) ──
console.log("\n\x1b[36mMission Control text formatting:\x1b[0m");
(function() {
  const sample = {
    year: "1957",
    date: "1957",
    title: "Sputnik 1",
    desc: "October 4, 1957, the Soviet Union launch Sputnik 1 into space and becomes the first artificial satellite to orbit the Earth."
  };
  const txt = getEventText(sample);
  assert(!txt.startsWith("1957"), "Event text does not start with leading year");
  assert(txt.startsWith("October 4, 1957"), "Event text starts with full human-readable date");
})();

// ── Test: Event squares validity ──
console.log("\n\x1b[36mEvent square validity:\x1b[0m");
(function() {
  const squares = SPACE_EVENTS.map(e => e.square);
  const uniqueSquares = new Set(squares);
  assertEqual(squares.length, uniqueSquares.size, "All event squares are unique");

  const allValid = squares.every(s => s >= 1 && s <= 100);
  assert(allValid, "All squares between 1 and 100");

  const isSorted = squares.every((s, i) => i === 0 || squares[i] >= squares[i - 1]);
  assert(isSorted, "Events in ascending square order (chronological)");
})();

// ── Test: Board generation ──
console.log("\n\x1b[36mBoard DOM:\x1b[0m");
(function() {
  const cells = document.querySelectorAll(".cell");
  assertEqual(cells.length, 100, "Board has 100 cells");

  const squareNums = Array.from(cells).map(c => parseInt(c.dataset.square));
  const uniqueNums = new Set(squareNums);
  assertEqual(uniqueNums.size, 100, "All 100 unique square numbers");
  assertEqual(Math.min(...squareNums), 1, "Min square is 1");
  assertEqual(Math.max(...squareNums), 100, "Max square is 100");
})();

// ── Test: Neutral override renders as neutral ──
console.log("\n\x1b[36mNeutral override rendering:\x1b[0m");
(function() {
  const buildBoard = window.buildBoard;
  window.customSquares[18] = { square: 18, country: "", year: "1959", date: "1959", title: "Luna 1", desc: "Test" };
  buildBoard();
  const cell18 = document.querySelector('.cell[data-square="18"]');
  assert(cell18.classList.contains("cell-neutral"), "Sq 18 overridden to neutral renders cell-neutral");
  delete window.customSquares[18];
  buildBoard();
})();

// ── Test: Blank square rendering (number only) ──
console.log("\n\x1b[36mBlank square rendering:\x1b[0m");
(function() {
  const buildBoard = window.buildBoard;
  const showTooltip = window.showTooltip;
  const hideTooltip = window.hideTooltip;
  const tooltip = document.getElementById("tooltip");

  window.customSquares[18] = { square: 18, country: "", blank: true, year: "1959", date: "1959", title: "Luna 1", desc: "Test" };
  buildBoard();
  const cell18 = document.querySelector('.cell[data-square="18"]');
  assert(cell18.classList.contains("cell-neutral"), "Blank sq 18 still renders as neutral");
  assert(cell18.querySelector(".cell-year") === null, "Blank sq 18 shows no year label");

  // Tooltip should not show content for blank square
  hideTooltip();
  showTooltip({ clientX: 10, clientY: 10 }, window.customSquares[18]);
  assert(tooltip.classList.contains("hidden"), "Blank square tooltip remains hidden");

  delete window.customSquares[18];
  buildBoard();
})();

// ── Test: Cell classes ──
console.log("\n\x1b[36mCell classification:\x1b[0m");
(function() {
  const cell3 = document.querySelector('.cell[data-square="3"]');
  assert(cell3.classList.contains("cell-ussr"), "Sq 3 (Sputnik 1) → cell-ussr");

  const cell81 = document.querySelector('.cell[data-square="81"]');
  assert(cell81.classList.contains("cell-usa"), "Sq 81 (Apollo 1 fire) → cell-usa");

  const cell75 = document.querySelector('.cell[data-square="75"]');
  assert(cell75.classList.contains("cell-ussr"), "Sq 75 (Korolev death) → cell-ussr");

  const cell9 = document.querySelector('.cell[data-square="9"]');
  assert(cell9.classList.contains("cell-usa"), "Sq 9 (Explorer 1) → cell-usa");

  const cell5 = document.querySelector('.cell[data-square="5"]');
  assert(cell5.classList.contains("cell-neutral"), "Sq 5 → cell-neutral");

  const cell1 = document.querySelector('.cell[data-square="1"]');
  assert(cell1.classList.contains("cell-start"), "Sq 1 → cell-start");

  const cell100 = document.querySelector('.cell[data-square="100"]');
  assert(cell100.classList.contains("cell-finish"), "Sq 100 → cell-finish");
})();

// ── Test: Initial state ──
console.log("\n\x1b[36mInitial game state:\x1b[0m");
(function() {
  assertEqual(state.players.ussr.pos, 1, "USSR starts at 1");
  assertEqual(state.players.usa.pos, 1, "USA starts at 1");
  assertEqual(state.currentPlayer, "ussr", "USSR goes first");
  assertEqual(state.gameOver, false, "Game not over");
  assertEqual(state.rockets.length, 0, "No rockets initially");
  assertEqual(state.meteors.length, 0, "No meteors initially");
})();

// ── Test: validateConnection ──
console.log("\n\x1b[36mConnection validation:\x1b[0m");
(function() {
  assert(validateConnection(5, 50, "rocket") === true, "Valid rocket 5→50");
  assert(validateConnection(50, 5, "meteor") === true, "Valid meteor 50→5");
  assert(validateConnection(NaN, 50, "rocket") === false, "Reject NaN from");
  assert(validateConnection(5, NaN, "rocket") === false, "Reject NaN to");
  assert(validateConnection(1, 50, "rocket") === false, "Reject from=1");
  assert(validateConnection(5, 100, "rocket") === false, "Reject to=100");
  assert(validateConnection(50, 50, "rocket") === false, "Reject same square");
  assert(validateConnection(50, 5, "rocket") === false, "Reject rocket going down");
  assert(validateConnection(5, 50, "meteor") === false, "Reject meteor going up");

  state.rockets.push({ id: 999, from: 5, to: 50 });
  assert(validateConnection(5, 60, "rocket") === false, "Reject duplicate from-square");
  state.rockets = state.rockets.filter(r => r.id !== 999);
})();

// ── Test: switchTurn ──
console.log("\n\x1b[36mTurn switching:\x1b[0m");
(function() {
  state.currentPlayer = "ussr";
  switchTurn();
  assertEqual(state.currentPlayer, "usa", "USSR → USA");
  switchTurn();
  assertEqual(state.currentPlayer, "ussr", "USA → USSR");
})();

// ── Test: Turn background (red/blue) ──
console.log("\n\x1b[36mTurn background:\x1b[0m");
(function() {
  const updateTurnIndicator = window.updateTurnIndicator;
  state.currentPlayer = "ussr";
  updateTurnIndicator();
  const redBg = document.body.style.background;
  assert(redBg.includes("4a1010") || redBg === "rgb(74, 16, 16)", "USSR turn = red background");

  state.currentPlayer = "usa";
  updateTurnIndicator();
  const blueBg = document.body.style.background;
  assert(blueBg.includes("10104a") || blueBg === "rgb(16, 16, 74)", "USA turn = blue background");
})();

// ── Test: Connection list rendering ──
console.log("\n\x1b[36mConnection list UI:\x1b[0m");
(function() {
  state.rockets = [];
  state.meteors = [];
  renderConnectionsList();
  const content = document.getElementById("connections-list-content");
  assert(content.innerHTML.includes("No rockets or meteors"), "Empty state message");

  state.rockets.push({ id: 1, from: 10, to: 40 });
  state.meteors.push({ id: 1, from: 80, to: 20 });
  renderConnectionsList();
  assert(content.innerHTML.includes("Sq 10"), "Rocket shown in list");
  assert(content.innerHTML.includes("Sq 80"), "Meteor shown in list");
  assertEqual(content.querySelectorAll(".rocket-item").length, 1, "1 rocket in list");
  assertEqual(content.querySelectorAll(".meteor-item").length, 1, "1 meteor in list");

  state.rockets = [];
  state.meteors = [];
  renderConnectionsList();
})();

// ── Test: Country-specific actions (getActionForPlayer) ──
console.log("\n\x1b[36mCountry-specific actions:\x1b[0m");
(function() {
  const getActionForPlayer = window.getActionForPlayer;

  const evBoth = { actionUSA: 2, actionUSSR: -3 };
  assertEqual(getActionForPlayer(evBoth, "usa"), 2, "USA gets actionUSA=2");
  assertEqual(getActionForPlayer(evBoth, "ussr"), -3, "USSR gets actionUSSR=-3");

  const evUSAOnly = { actionUSA: 5, actionUSSR: 0 };
  assertEqual(getActionForPlayer(evUSAOnly, "usa"), 5, "USA gets actionUSA=5 when USSR=0");
  assertEqual(getActionForPlayer(evUSAOnly, "ussr"), 0, "USSR gets 0 when actionUSSR=0");

  const evUSSROnly = { actionUSA: 0, actionUSSR: -2 };
  assertEqual(getActionForPlayer(evUSSROnly, "usa"), 0, "USA gets 0 when actionUSA=0");
  assertEqual(getActionForPlayer(evUSSROnly, "ussr"), -2, "USSR gets actionUSSR=-2");

  const evLegacyNeutral = { action: 4 };
  assertEqual(getActionForPlayer(evLegacyNeutral, "usa"), 4, "USA gets legacy action=4 on neutral square");
  assertEqual(getActionForPlayer(evLegacyNeutral, "ussr"), 4, "USSR gets legacy action=4 on neutral square");

  const evLegacyUSSR = { action: 3, country: "ussr" };
  assertEqual(getActionForPlayer(evLegacyUSSR, "ussr"), 3, "USSR gets legacy action=3 on USSR square");
  assertEqual(getActionForPlayer(evLegacyUSSR, "usa"), 0, "USA gets 0 on USSR square with legacy action");

  const evLegacyUSA = { action: 2, country: "usa" };
  assertEqual(getActionForPlayer(evLegacyUSA, "usa"), 2, "USA gets legacy action=2 on USA square");
  assertEqual(getActionForPlayer(evLegacyUSA, "ussr"), 0, "USSR gets 0 on USA square with legacy action");

  const evNone = { title: "No action" };
  assertEqual(getActionForPlayer(evNone, "usa"), 0, "USA gets 0 for no-action event");
  assertEqual(getActionForPlayer(evNone, "ussr"), 0, "USSR gets 0 for no-action event");

  assertEqual(getActionForPlayer(null, "usa"), 0, "null event returns 0");
})();

// ── Test: Country-specific actions in customSquares ──
console.log("\n\x1b[36mCustom square country actions (integration):\x1b[0m");
(function() {
  const getSquareData = window.getSquareData;
  const getActionForPlayer = window.getActionForPlayer;

  window.customSquares[50] = {
    square: 50, country: "usa", sentiment: "good",
    title: "Test USA square", desc: "Only USA moves",
    actionUSA: 3, actionUSSR: 0
  };

  const data = getSquareData(50);
  assertEqual(data.actionUSA, 3, "Custom sq 50 has actionUSA=3");
  assertEqual(data.actionUSSR, 0, "Custom sq 50 has actionUSSR=0");
  assertEqual(getActionForPlayer(data, "usa"), 3, "USA player gets +3 on sq 50");
  assertEqual(getActionForPlayer(data, "ussr"), 0, "USSR player gets 0 on sq 50");

  delete window.customSquares[50];
})();

// ── Test: Simulated game — handleMove with country-specific actions ──
console.log("\n\x1b[36mSimulated game (handleMove with country actions):\x1b[0m");
await (async function() {
  const handleMove = window.handleMove;
  const buildBoard = window.buildBoard;

  // Patch setTimeout to fire instantly — makes all animations synchronous
  const realSetTimeout = window.setTimeout;
  window.setTimeout = function(fn, _delay) { fn(); return 0; };

  // --- Setup: USSR square with legacy action (old saved data format) ---
  window.customSquares[3] = {
    square: 3, country: "ussr", sentiment: "good",
    title: "Sputnik 1", desc: "USSR achievement",
    action: 2
  };

  // --- Setup: USA square with legacy action ---
  window.customSquares[9] = {
    square: 9, country: "usa", sentiment: "good",
    title: "Explorer 1", desc: "USA achievement",
    action: 3
  };

  // --- Setup: square with new per-country actions ---
  window.customSquares[15] = {
    square: 15, country: "usa", sentiment: "good",
    title: "Project SCORE", desc: "USA comms satellite",
    actionUSA: 2, actionUSSR: 0
  };

  // --- Setup: neutral square with legacy action (should affect both) ---
  window.customSquares[5] = {
    square: 5, country: "", sentiment: "",
    title: "Neutral event", desc: "Affects everyone",
    action: 1
  };

  buildBoard();

  function runMove(pid, startPos, otherPid, otherPos, diceRoll) {
    state.players[pid].pos = startPos;
    state.players[otherPid].pos = otherPos;
    state.currentPlayer = pid;
    state.rolling = true;
    state.gameOver = false;
    document.getElementById("roll-btn").disabled = true;
    handleMove(diceRoll);
  }

  // ── Scenario 1: USA lands on USSR square (sq 3, legacy action: 2) ──
  // USA should NOT move forward — it's a USSR square.
  runMove("usa", 1, "ussr", 1, 2);
  assertEqual(state.players.usa.pos, 3, "Scenario 1: USA lands on USSR sq 3, stays at 3 (no forward move)");
  assert(state.currentPlayer === "ussr", "Scenario 1: Turn passed to USSR");

  // ── Scenario 2: USSR lands on USSR square (sq 3, legacy action: 2) ──
  // USSR SHOULD move forward 2 → end up at 5.
  runMove("ussr", 1, "usa", 3, 2);
  assertEqual(state.players.ussr.pos, 5, "Scenario 2: USSR lands on USSR sq 3, moves forward to 5");
  assert(state.currentPlayer === "usa", "Scenario 2: Turn passed to USA");

  // ── Scenario 3: USSR lands on USA square (sq 9, legacy action: 3) ──
  // USSR should NOT move forward — it's a USA square.
  runMove("ussr", 5, "usa", 3, 4);
  assertEqual(state.players.ussr.pos, 9, "Scenario 3: USSR lands on USA sq 9, stays at 9 (no forward move)");

  // ── Scenario 4: USA lands on USA square (sq 9, legacy action: 3) ──
  // USA SHOULD move forward 3 → end up at 12.
  runMove("usa", 5, "ussr", 9, 4);
  assertEqual(state.players.usa.pos, 12, "Scenario 4: USA lands on USA sq 9, moves forward to 12");

  // ── Scenario 5: USA lands on sq 15 (new format: actionUSA=2, actionUSSR=0) ──
  // USA moves forward 2 → 17.
  runMove("usa", 12, "ussr", 9, 3);
  assertEqual(state.players.usa.pos, 17, "Scenario 5: USA lands on sq 15, moves forward to 17 (actionUSA=2)");

  // ── Scenario 6: USSR lands on sq 15 (new format: actionUSA=2, actionUSSR=0) ──
  // USSR stays at 15 — actionUSSR is 0.
  runMove("ussr", 12, "usa", 17, 3);
  assertEqual(state.players.ussr.pos, 15, "Scenario 6: USSR lands on sq 15, stays at 15 (actionUSSR=0)");

  // ── Scenario 7: USA lands on neutral sq 5 (legacy action: 1, no country) ──
  // Both players should be affected by neutral squares.
  runMove("usa", 2, "ussr", 15, 3);
  assertEqual(state.players.usa.pos, 6, "Scenario 7: USA on neutral sq 5, moves forward to 6 (action=1)");

  // ── Scenario 8: USSR lands on neutral sq 5 (legacy action: 1, no country) ──
  runMove("ussr", 2, "usa", 6, 3);
  assertEqual(state.players.ussr.pos, 6, "Scenario 8: USSR on neutral sq 5, moves forward to 6 (action=1)");

  // Restore setTimeout and cleanup
  window.setTimeout = realSetTimeout;
  delete window.customSquares[3];
  delete window.customSquares[5];
  delete window.customSquares[9];
  delete window.customSquares[15];
  buildBoard();
})();

// ── Test: Reset ──
console.log("\n\x1b[36mGame reset:\x1b[0m");
(function() {
  state.players.ussr.pos = 55;
  state.players.usa.pos = 77;
  state.currentPlayer = "usa";
  state.gameOver = true;
  gameObj.reset();
  assertEqual(state.players.ussr.pos, 1, "USSR reset to 1");
  assertEqual(state.players.usa.pos, 1, "USA reset to 1");
  assertEqual(state.currentPlayer, "ussr", "USSR goes first after reset");
  assertEqual(state.gameOver, false, "Game not over after reset");
})();

// ── Test: End game messages ──
console.log("\n\x1b[36mEnd game messages:\x1b[0m");
(function() {
  const winnerTextEl = document.getElementById("winner-text");
  const winnerSubEl = document.getElementById("winner-sub");
  const overlay = document.getElementById("winner-overlay");
  let usaConfetti = 0;
  let ussrConfetti = 0;
  const realLaunchConfetti = window.launchConfetti;
  window.launchConfetti = function(winnerId) {
    if (winnerId === "usa") usaConfetti++;
    if (winnerId === "ussr") ussrConfetti++;
    if (realLaunchConfetti) realLaunchConfetti(winnerId);
  };

  // USA wins
  state.players.usa.icon = "🚀";
  state.players.usa.name = "USA";
  endGame("usa");
  assert(overlay.classList.contains("hidden") === false, "Overlay visible when USA wins");
  assert(winnerTextEl.textContent.includes("USA WINS"), "Winner text shows USA WINS");
  assertEqual(
    winnerSubEl.textContent,
    "America lands on the Moon first!",
    "USA winner subtext correct"
  );
  assertEqual(usaConfetti, 1, "Confetti fired once for USA win");

  // Reset overlay hidden for next check
  overlay.classList.add("hidden");

  // USSR wins
  state.gameOver = false;
  state.players.ussr.icon = "🚀";
  state.players.ussr.name = "USSR";
  endGame("ussr");
  assert(overlay.classList.contains("hidden") === false, "Overlay visible when USSR wins");
  assert(winnerTextEl.textContent.includes("USSR WINS"), "Winner text shows USSR WINS");
  assertEqual(
    winnerSubEl.textContent,
    "You were so close to walking on the Moon but you see that the United States have passed you and reached the Moon first. Better luck next time.",
    "USSR winner subtext correct"
  );
  assertEqual(ussrConfetti, 0, "No confetti fired for USSR win");
  window.launchConfetti = realLaunchConfetti;
})();

// ── Summary ──
console.log("\n" + "─".repeat(50));
const total = passed + failed;
if (failed === 0) {
  console.log(`\x1b[32m\x1b[1mALL ${total} TESTS PASSED ✓\x1b[0m\n`);
  process.exit(0);
} else {
  console.log(`\x1b[31m${failed} FAILED\x1b[0m / \x1b[32m${passed} passed\x1b[0m (${total} total)\n`);
  process.exit(1);
}

})();
