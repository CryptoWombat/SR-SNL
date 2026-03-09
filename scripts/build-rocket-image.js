/**
 * Build assets/rocket.png from a reference image:
 * - Resize to 50% so the rocket fits board squares
 * - Make dark/blue (sky) background transparent so only rocket + exhaust show
 *
 * Usage: node scripts/build-rocket-image.js [path-to-reference.png]
 * If no path given, uses REFERENCE_ROCKET env or a default path.
 */

const fs = require("fs");
const path = require("path");

const outPath = path.join(__dirname, "..", "assets", "rocket.png");
const refPath = process.argv[2] || process.env.REFERENCE_ROCKET;

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch (e) {
    console.error("Need sharp: npm install --save-dev sharp");
    process.exit(1);
  }

  if (!refPath || !fs.existsSync(refPath)) {
    console.error("Reference image path required.");
    console.error("Usage: node scripts/build-rocket-image.js <path-to-reference.png>");
    console.error("Or set REFERENCE_ROCKET env to the reference image path.");
    process.exit(1);
  }

  const img = await sharp(refPath);
  const meta = await img.metadata();
  const w = meta.width || 0;
  const h = meta.height || 0;
  const halfW = Math.max(1, Math.round(w * 0.5));
  const halfH = Math.max(1, Math.round(h * 0.5));

  const resized = await img
    .resize(halfW, halfH)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = resized;
  const { width: nw, height: nh, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const sum = r + g + b;
    const isDarkBlue =
      (r < 110 && g < 110 && b > 60) || (sum < 140 && b > r && b > g);
    const isVeryDark = sum < 90;
    if (isDarkBlue || isVeryDark) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: {
      width: nw,
      height: nh,
      channels: 4,
    },
  })
    .png()
    .toFile(outPath);

  console.log("Wrote", outPath, "(" + nw + "x" + nh + ") from", refPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
