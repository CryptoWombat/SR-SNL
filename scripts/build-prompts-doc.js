/**
 * Build Prompts_and_Responses.docx from the prompts/responses table.
 * Run: node scripts/build-prompts-doc.js
 */
const fs = require("fs");
const path = require("path");

const data = [
  [41, "square number 3 doesnt show any thing when i hover over it", "Fixed tooltips so any cell with data gets a tooltip (not only when ev.title exists), and added a fallback like \"Square N\" when there's no other text."],
  [42, "i cant edit the last square(100)", "Removed the block on editing square 100 in the admin and made the board use one delegated click handler so square 100 is clickable; set the grid above the canvas so cells receive clicks."],
  [43, "it is not working", "(In context this was about square 100 / admin clicks — same fixes as for 42.)"],
  [44, "how do i deploy", "Explained deploying via Wrangler CLI: npx wrangler pages deploy . --project-name sr-snl after commit/push, or using the Cloudflare dashboard."],
  [45, "commit and push to remote", "Added a ship script and showed how to use it: npm run ship to add, commit, push, and deploy in one go."],
  [46, "can you please change the turn markers (the red and blue cricles) to be a red spaceship and a blue spaceship", "Replaced the circles with inline SVG rockets for USSR and USA in the Mission Control panel and used drop-shadow so the red and blue ships are distinct."],
  [47, "what does deploy mean", "Explained that \"deploy\" means uploading your built site to Cloudflare Pages so the live URL (e.g. spacerace.wombat.team) serves the latest version."],
  [48, "can you deploy it for me", "Said I could run the deploy command if you want."],
  [49, "yes please", "Ran npm run ship (or the deploy step) so the site was committed, pushed, and deployed."],
  [50, "the rocket shape din't change please fix, secondly the meteors and rockets are lines not the actual thing and it is super hard to tell apart", "Redrew board rockets (exhaust trail + rocket at destination) and meteors (rocky head, flame tail, impact) in game.js with Canvas, and made the Mission Control tokens use the new rocket SVGs."],
  [51, "i think you need inspo because it doesnt look good, attached are some inspo pictures", "Used your reference images to redraw rockets and meteors in a clearer cartoon style (rocket: nose, band, body, porthole, fins, engine, flame; meteor: rocky head, layered flame tail, impact)."],
  [52, "npm run ship", "Ran npm run ship; reported commit, push, and deploy success and the live URL."],
  [53, "can you please make me in the board editor where i can edit the rockets, meteors, turn markers and all the other design elements", "Added a \"Design & theme\" section in admin (heading, accent, USSR/USA colours, turn-marker colours, legend labels), load/save via the same API, and applied design in the game when config loads."],
  [54, "npm run ship", "Ran npm run ship; reported commit, push, and deploy success."],
  [55, "please delete the acheviemnts and setbacks thing like the colours and on the key. just make it two colours red for ussr and blue for usa", "Switched to single red/blue (no good/bad); board uses cell-ussr and cell-usa; legend is USSR, USA, Neutral; updated CSS, game, tests, and admin placeholder."],
  [56, "npm run ship", "Ran npm run ship; reported commit, push, and deploy success."],
  [57, "fix it i said remove the dark red and change it to the normal red and do it for the dark blue it the normal blue too, after that make the legend so that ussr is the normal red colour, usa is the normal blue colour and neutral is the normal gray colour", "Board USSR/USA cells now use solid var(--ussr) and var(--usa); legend swatches use the same red and blue; added --neutral-gray and set the Neutral swatch to that gray."],
  [58, "Please show me all the prompts sent to you today", "Listed the prompts from this chat only (no timestamps), and said I can't see other sessions or filter by \"today.\""],
  [59, "Di you show me all the prompts from today in this chat?", "Confirmed that the list I gave was all prompts from this chat and that I can't separate \"today\" from other days."],
  [60, "You did NOT!!! I want to see ALL the prompts here from TODAY!", "Listed every user prompt from the full context (summary + this chat), numbered 1–60, and explained I don't get timestamps so I can't know which were \"today\" without you saying (e.g. 41 onward)."],
];

async function main() {
  const docx = await import("docx");
  const Document = docx.Document;
  const Packer = docx.Packer;
  const Paragraph = docx.Paragraph;
  const Table = docx.Table;
  const TableRow = docx.TableRow;
  const TableCell = docx.TableCell;
  const TextRun = docx.TextRun;
  const WidthType = docx.WidthType;

  const tableRows = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "#", bold: true })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Prompt", bold: true })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Response", bold: true })] })] }),
      ],
    }),
    ...data.map(([num, prompt, response]) =>
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(String(num))] }),
          new TableCell({ children: [new Paragraph(prompt)] }),
          new TableCell({ children: [new Paragraph(response)] }),
        ],
      })
    ),
  ];

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "Prompts and Responses (Today)",
            heading: docx.HeadingLevel.HEADING_1,
            spacing: { after: 240 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: tableRows,
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath = path.join(__dirname, "..", "Prompts_and_Responses.docx");
  fs.writeFileSync(outPath, buffer);
  console.log("Wrote", outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
