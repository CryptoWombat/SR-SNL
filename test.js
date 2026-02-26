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

window.HTMLCanvasElement.prototype.getContext = function() {
  return {
    clearRect() {}, beginPath() {}, moveTo() {}, bezierCurveTo() {},
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
  .replace("const state", "window.state")
  .replace("const game =", "window.game =");

window.eval(wrappedJS);

const squareToGridPos = window.squareToGridPos;
const gridPosToSquare = window.gridPosToSquare;
const SPACE_EVENTS = window.SPACE_EVENTS;
const eventMap = window.eventMap;
const state = window.state;
const validateConnection = window.validateConnection;
const switchTurn = window.switchTurn;
const renderConnectionsList = window.renderConnectionsList;
const gameObj = window.game;

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

// ── Test: Cell classes ──
console.log("\n\x1b[36mCell classification:\x1b[0m");
(function() {
  const cell3 = document.querySelector('.cell[data-square="3"]');
  assert(cell3.classList.contains("cell-ussr-good"), "Sq 3 (Sputnik 1) → cell-ussr-good");

  const cell81 = document.querySelector('.cell[data-square="81"]');
  assert(cell81.classList.contains("cell-usa-bad"), "Sq 81 (Apollo 1 fire) → cell-usa-bad");

  const cell75 = document.querySelector('.cell[data-square="75"]');
  assert(cell75.classList.contains("cell-ussr-bad"), "Sq 75 (Korolev death) → cell-ussr-bad");

  const cell9 = document.querySelector('.cell[data-square="9"]');
  assert(cell9.classList.contains("cell-usa-good"), "Sq 9 (Explorer 1) → cell-usa-good");

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
