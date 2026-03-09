#!/usr/bin/env node
/**
 * Commit all changes, push to remote, and deploy to Cloudflare Pages.
 * Run: npm run ship
 * Optional message: npm run ship -- "your commit message"
 */
const { execSync } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname, "..");
const message = process.argv.slice(2).join(" ") || "Updates";

function run(cmd, opts = {}) {
  try {
    return execSync(cmd, { cwd: root, stdio: "inherit", ...opts });
  } catch (e) {
    process.exit(e.status || 1);
  }
}

// 1. Stage everything
run("git add -A");

// 2. Commit (allow nothing to commit)
try {
  execSync("git commit -m " + JSON.stringify(message), { cwd: root, stdio: "inherit" });
} catch {
  console.log("Nothing to commit, skipping.");
}

// 3. Push
run("git push origin master");

// 4. Deploy
run("npx wrangler pages deploy . --project-name sr-snl");

console.log("\nDone: committed, pushed, and deployed.");
