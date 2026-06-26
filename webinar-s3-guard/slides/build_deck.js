/*
 * "From user to creator: launching open-source tools that matter in the cloud ecosystem"
 * 90-minute webinar deck. Speakers: Olamide Kosile (lead) & Delightsome Asolo (host).
 *
 * Build:  node build_deck.js   ->  webinar-user-to-creator.pptx
 */
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "Olamide Kosile & Delightsome Asolo";
pres.title = "From User to Creator: Open-Source Tools That Matter in the Cloud";

const W = 13.333;
const H = 7.5;

// ---- Palette: "Cloud Security" -------------------------------------------
const C = {
  navy:  "0A1F3C", // dark background
  navy2: "12284B",
  panel: "0F2747", // dark card
  teal:  "14B8A6", // primary accent
  tealD: "0D9488",
  ice:   "CADCFC",
  amber: "F59E0B",
  orange:"F97316",
  red:   "E11D48",
  ink:   "16233A", // dark text on light
  body:  "334155",
  mute:  "64748B",
  white: "FFFFFF",
  light: "FFFFFF",
  card:  "F1F5F9",
  cardT: "ECFDF5", // teal tint
  cardA: "FFF7ED", // amber tint
  line:  "E2E8F0",
};

const F = { head: "Calibri", body: "Calibri", mono: "Courier New" };

const sh = () => ({ type: "outer", color: "0A1F3C", blur: 9, offset: 3, angle: 90, opacity: 0.16 });

let pageNo = 0;
function footer(slide, dark) {
  pageNo++;
  if (pageNo === 1) return;
  slide.addText("From User to Creator  •  Cloud Webinar", {
    x: 0.6, y: H - 0.42, w: 8, h: 0.3, fontFace: F.body, fontSize: 9,
    color: dark ? C.ice : C.mute, align: "left", margin: 0,
  });
  slide.addText(String(pageNo), {
    x: W - 1.1, y: H - 0.42, w: 0.5, h: 0.3, fontFace: F.body, fontSize: 9,
    color: dark ? C.ice : C.mute, align: "right", margin: 0,
  });
}

// Colored circle badge with a glyph/number
function badge(slide, x, y, d, fill, txt, txtColor, fs) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" } });
  slide.addText(txt, { x, y, w: d, h: d, align: "center", valign: "middle",
    fontFace: F.head, fontSize: fs || 18, bold: true, color: txtColor || C.white, margin: 0 });
}

function card(slide, x, y, w, h, fill) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.09,
    fill: { color: fill || C.card }, line: { type: "none" }, shadow: sh() });
}

// Section title used on light content slides
function title(slide, kicker, text) {
  if (kicker) slide.addText(kicker.toUpperCase(), { x: 0.6, y: 0.45, w: 12, h: 0.35,
    fontFace: F.head, fontSize: 13, bold: true, color: C.tealD, charSpacing: 2, margin: 0 });
  slide.addText(text, { x: 0.6, y: 0.78, w: 12.1, h: 0.95, fontFace: F.head,
    fontSize: 31, bold: true, color: C.ink, margin: 0 });
}

// ===========================================================================
// SLIDE 1 — Title
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  // faint motif: concentric cloud-circles top-right
  s.addShape(pres.shapes.OVAL, { x: 9.7, y: -1.7, w: 5.5, h: 5.5, fill: { color: C.navy2 }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: 11.0, y: -0.7, w: 3.2, h: 3.2, fill: { color: "13315C" }, line: { type: "none" } });
  badge(s, 0.85, 0.8, 0.85, C.teal, "</>", C.navy, 20);
  s.addText("CLOUD ENGINEERING WEBINAR  •  90 MINUTES", { x: 1.9, y: 0.95, w: 9, h: 0.4,
    fontFace: F.head, fontSize: 13, bold: true, color: C.teal, charSpacing: 2, margin: 0 });

  s.addText("From User to Creator", { x: 0.85, y: 2.25, w: 11.6, h: 1.2, fontFace: F.head,
    fontSize: 54, bold: true, color: C.white, margin: 0 });
  s.addText("Launching open-source tools that matter in the cloud ecosystem", {
    x: 0.85, y: 3.5, w: 11.0, h: 0.9, fontFace: F.head, fontSize: 23, color: C.ice, margin: 0 });

  s.addShape(pres.shapes.LINE, { x: 0.9, y: 4.75, w: 3.2, h: 0, line: { color: C.teal, width: 2 } });

  s.addText([
    { text: "Olamide Kosile", options: { bold: true, color: C.white, fontSize: 17, breakLine: true } },
    { text: "Senior Multi-Cloud & DevOps Engineer  •  AWS Community Builder  •  5x AWS Certified", options: { color: C.ice, fontSize: 12 } },
  ], { x: 0.9, y: 5.05, w: 7.4, h: 0.9, fontFace: F.body, margin: 0, lineSpacingMultiple: 1.1 });
  s.addText([
    { text: "Delightsome Asolo", options: { bold: true, color: C.white, fontSize: 17, breakLine: true } },
    { text: "Cloud Engineer  •  AWS Student Community Leader  •  Host & Moderator", options: { color: C.ice, fontSize: 12 } },
  ], { x: 0.9, y: 6.05, w: 7.4, h: 0.9, fontFace: F.body, margin: 0, lineSpacingMultiple: 1.1 });

  s.addNotes("Welcome everyone. Title slide. One-sentence promise: by the end of these 90 minutes you will have watched a real open-source cloud tool be built from nothing and run live — and you'll know exactly how to do the same. Today you stop being only a user of the cloud and start becoming a creator. Introduce yourself (Olamide) and hand to Delightsome for housekeeping/logistics.");
  footer(s, true);
}

// ===========================================================================
// SLIDE 2 — Speakers
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Your hosts today", "Who's walking you through this");

  const cw = 5.75, cx2 = 7.0, cy = 2.0, ch = 4.6;
  // Olamide
  card(s, 0.6, cy, cw, ch, C.card);
  badge(s, 1.0, cy + 0.4, 1.0, C.tealD, "OK", C.white, 24);
  s.addText("Olamide Kosile", { x: 2.2, y: cy + 0.45, w: 3.3, h: 0.5, fontFace: F.head, fontSize: 22, bold: true, color: C.ink, margin: 0 });
  s.addText("Lead Speaker  •  Technical Session Lead", { x: 2.2, y: cy + 0.95, w: 3.3, h: 0.4, fontFace: F.body, fontSize: 12, color: C.tealD, bold: true, margin: 0 });
  s.addText([
    { text: "Senior Multi-Cloud & DevOps Engineer", options: { bullet: true, breakLine: true } },
    { text: "AWS Community Builder", options: { bullet: true, breakLine: true } },
    { text: "5x AWS Certified practitioner", options: { bullet: true, breakLine: true } },
    { text: "Founder focused on developing cloud engineers and scalable cloud systems", options: { bullet: true } },
  ], { x: 1.05, y: cy + 1.7, w: cw - 0.8, h: 2.6, fontFace: F.body, fontSize: 14, color: C.body, margin: 0, paraSpaceAfter: 8 });

  // Delightsome
  card(s, cx2, cy, cw, ch, C.cardT);
  badge(s, cx2 + 0.4, cy + 0.4, 1.0, C.teal, "DA", C.navy, 24);
  s.addText("Delightsome Asolo", { x: cx2 + 1.6, y: cy + 0.45, w: 3.6, h: 0.5, fontFace: F.head, fontSize: 22, bold: true, color: C.ink, margin: 0 });
  s.addText("Host  •  Moderator  •  Community & Partnerships", { x: cx2 + 1.6, y: cy + 0.95, w: 3.9, h: 0.4, fontFace: F.body, fontSize: 12, color: C.tealD, bold: true, margin: 0 });
  s.addText([
    { text: "Cloud Engineer", options: { bullet: true, breakLine: true } },
    { text: "AWS Student Community Leader", options: { bullet: true, breakLine: true } },
    { text: "AWS Solutions Architect – Associate", options: { bullet: true, breakLine: true } },
    { text: "Driving community engagement & partnerships for this session", options: { bullet: true } },
  ], { x: cx2 + 0.45, y: cy + 1.7, w: cw - 0.8, h: 2.6, fontFace: F.body, fontSize: 14, color: C.body, margin: 0, paraSpaceAfter: 8 });

  s.addNotes("Delightsome introduces both speakers and frames credibility — this is grounded in real production experience, not theory. Keep it brief, the audience wants to get to the build. Mention the LinkedIn handles will be on the closing slide.");
  footer(s);
}

// ===========================================================================
// SLIDE 3 — Agenda / what you'll leave with
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "The next 90 minutes", "What you'll leave with");

  const items = [
    ["1", "The mindset", "Technician vs engineer — and why creators win", C.tealD],
    ["2", "Open source in cloud", "Where you fit as a builder, not just a user", C.teal],
    ["3", "Find a problem", "Turn everyday cloud frustrations into projects", C.amber],
    ["4", "Build it live", "We code & run a real AWS tool together", C.orange],
    ["5", "Launch it", "GitHub, README, first users, and your CV", C.tealD],
    ["6", "Your roadmap", "A repeatable path to keep shipping", C.teal],
  ];
  const cols = 3, cw = 3.9, chh = 1.95, gx = 0.25, gy = 0.3, x0 = 0.6, y0 = 2.0;
  items.forEach((it, i) => {
    const cxx = x0 + (i % cols) * (cw + gx);
    const cyy = y0 + Math.floor(i / cols) * (chh + gy);
    card(s, cxx, cyy, cw, chh, C.card);
    badge(s, cxx + 0.3, cyy + 0.32, 0.7, it[3], it[0], C.white, 20);
    s.addText(it[1], { x: cxx + 1.15, y: cyy + 0.34, w: cw - 1.3, h: 0.5, fontFace: F.head, fontSize: 17, bold: true, color: C.ink, margin: 0 });
    s.addText(it[2], { x: cxx + 0.3, y: cyy + 1.05, w: cw - 0.55, h: 0.8, fontFace: F.body, fontSize: 12.5, color: C.body, margin: 0 });
  });

  s.addNotes("Quick map of the journey. Don't dwell — 30 seconds. The centerpiece is parts 4 (build) and 5 (launch). Tell them: keep your laptop closed for the first half, then if you want, you can follow along during the build because we use a free local sandbox — no AWS account needed.");
  footer(s);
}

// ===========================================================================
// Helper: dark section divider
// ===========================================================================
function divider(part, kicker, text, sub) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.6, y: 3.6, w: 5.2, h: 5.2, fill: { color: C.navy2 }, line: { type: "none" } });
  s.addShape(pres.shapes.OVAL, { x: 10.6, y: -2.2, w: 5.4, h: 5.4, fill: { color: C.navy2 }, line: { type: "none" } });
  badge(s, 0.9, 2.5, 1.4, C.teal, part, C.navy, 40);
  s.addText(kicker.toUpperCase(), { x: 2.7, y: 2.55, w: 9, h: 0.4, fontFace: F.head, fontSize: 14, bold: true, color: C.teal, charSpacing: 2, margin: 0 });
  s.addText(text, { x: 2.7, y: 2.95, w: 9.8, h: 1.4, fontFace: F.head, fontSize: 40, bold: true, color: C.white, margin: 0 });
  if (sub) s.addText(sub, { x: 2.72, y: 4.35, w: 9.6, h: 0.8, fontFace: F.body, fontSize: 16, color: C.ice, margin: 0 });
  return s;
}

// ===========================================================================
// SLIDE 4 — PART 1 divider
// ===========================================================================
{
  const s = divider("1", "The foundation", "The engineering mindset",
    "Before tools, before code — how creators think differently.");
  s.addNotes("Transition. This is the heart of the talk's premise. Slow down here. Everything technical later only matters if this mindset lands. Ask the room: 'How many of you would call yourself an engineer?' — most hands go up. 'Keep your hand up if you've ever built a tool that someone else uses.' Watch the hands drop. That gap is what we're here to close.");
  footer(s, true);
}

// ===========================================================================
// SLIDE 5 — Technician vs Engineer  (the requested core distinction)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "The core distinction", "Technician vs. Engineer");

  const cy = 2.0, cw = 5.75, ch = 4.45;
  // Technician
  card(s, 0.6, cy, cw, ch, C.card);
  badge(s, 1.0, cy + 0.38, 0.9, C.mute, "T", C.white, 28);
  s.addText("The Technician", { x: 2.05, y: cy + 0.45, w: 3.5, h: 0.6, fontFace: F.head, fontSize: 23, bold: true, color: C.ink, margin: 0 });
  s.addText("Uses & maintains tools", { x: 2.05, y: cy + 1.0, w: 3.5, h: 0.4, fontFace: F.body, fontSize: 13, italic: true, color: C.mute, margin: 0 });
  s.addText([
    { text: "Operates the tools others built", options: { bullet: true, breakLine: true } },
    { text: "Follows the runbook and the docs", options: { bullet: true, breakLine: true } },
    { text: "Fixes today's broken thing", options: { bullet: true, breakLine: true } },
    { text: "Value is tied to a specific job/stack", options: { bullet: true, breakLine: true } },
    { text: "Asks: \"How do I use this?\"", options: { bullet: true } },
  ], { x: 1.05, y: cy + 1.6, w: cw - 0.8, h: 2.6, fontFace: F.body, fontSize: 14.5, color: C.body, margin: 0, paraSpaceAfter: 9 });

  // Engineer
  const x2 = 7.0;
  card(s, x2, cy, cw, ch, C.cardT);
  badge(s, x2 + 0.4, cy + 0.38, 0.9, C.tealD, "E", C.white, 28);
  s.addText("The Engineer", { x: x2 + 1.45, y: cy + 0.45, w: 3.9, h: 0.6, fontFace: F.head, fontSize: 23, bold: true, color: C.ink, margin: 0 });
  s.addText("Builds tools to solve problems", { x: x2 + 1.45, y: cy + 1.0, w: 4.0, h: 0.4, fontFace: F.body, fontSize: 13, italic: true, color: C.tealD, margin: 0 });
  s.addText([
    { text: "Creates the tools others use", options: { bullet: true, breakLine: true } },
    { text: "Writes the runbook — and questions it", options: { bullet: true, breakLine: true } },
    { text: "Removes the whole class of problem", options: { bullet: true, breakLine: true } },
    { text: "Value travels with them, everywhere", options: { bullet: true, breakLine: true } },
    { text: "Asks: \"Why does this problem exist?\"", options: { bullet: true } },
  ], { x: x2 + 0.45, y: cy + 1.6, w: cw - 0.8, h: 2.6, fontFace: F.body, fontSize: 14.5, color: C.body, margin: 0, paraSpaceAfter: 9 });

  s.addNotes("THE anchor slide. Both roles are valuable and respected — a technician keeps the world running. But they are different mindsets. The technician consumes and maintains; the engineer questions and builds. The cloud gave everyone technician-level power (spin up anything in minutes). The opportunity — and the scarcity — is in building. Personal story: tell a 60-second story of the first time you stopped following a runbook and instead automated the thing the runbook described. That's the moment you crossed over. Key line: 'A certificate proves you can use the cloud. A tool you built proves you can engineer it.'");
  footer(s);
}

// ===========================================================================
// SLIDE 6 — User vs Creator (extend to cloud)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Same idea, in the cloud", "User vs. Creator");

  s.addText("Everyone here is already a power user of the cloud. The leap is small — but it changes everything.",
    { x: 0.6, y: 1.75, w: 12, h: 0.5, fontFace: F.body, fontSize: 15, color: C.body, margin: 0 });

  const rows = [
    ["Consumes services", "Builds things others depend on"],
    ["Reads the AWS docs", "Writes the tool the docs are missing"],
    ["Has skills in a private repo", "Has proof in a public repo"],
    ["Visible to one employer", "Visible to the whole ecosystem"],
  ];
  const y0 = 2.55, rh = 0.95, lw = 5.75, rw = 5.75;
  s.addText("USER", { x: 0.6, y: y0 - 0.55, w: lw, h: 0.4, fontFace: F.head, fontSize: 14, bold: true, color: C.mute, align: "center", margin: 0 });
  s.addText("CREATOR", { x: 7.0, y: y0 - 0.55, w: rw, h: 0.4, fontFace: F.head, fontSize: 14, bold: true, color: C.tealD, align: "center", margin: 0 });
  rows.forEach((r, i) => {
    const yy = y0 + i * (rh + 0.12);
    card(s, 0.6, yy, lw, rh, C.card);
    s.addText(r[0], { x: 0.85, y: yy, w: lw - 0.5, h: rh, fontFace: F.body, fontSize: 15, color: C.body, valign: "middle", margin: 0 });
    badge(s, 6.45, yy + rh / 2 - 0.22, 0.44, C.teal, "→", C.navy, 16);
    card(s, 7.0, yy, rw, rh, C.cardT);
    s.addText(r[1], { x: 7.25, y: yy, w: rw - 0.5, h: rh, fontFace: F.body, fontSize: 15, bold: true, color: C.ink, valign: "middle", margin: 0 });
  });

  s.addNotes("Make it concrete and non-intimidating. 'Creator' does not mean founder of the next Kubernetes. It means you noticed a gap and shipped something — even 100 lines — that someone else can install. The right-hand column is the entire goal of today. By the end you'll have crossed every one of these rows.");
  footer(s);
}

// ===========================================================================
// SLIDE 7 — The mindset shift (process flow)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "How creators are made", "The shift: notice → own → ship");

  const steps = [
    ["1", "Notice", "A small, repeated, annoying problem in your daily cloud work."],
    ["2", "Own it", "Realize YOU can fix it — not wait for AWS or a vendor to."],
    ["3", "Build", "Scope it small. One tool, one job, done well."],
    ["4", "Ship", "Make it public. Now it's proof, not just effort."],
  ];
  const cw = 2.95, gx = 0.25, x0 = 0.6, cy = 2.3, ch = 3.1;
  steps.forEach((st, i) => {
    const cxx = x0 + i * (cw + gx);
    card(s, cxx, cy, cw, ch, i % 2 ? C.cardT : C.card);
    badge(s, cxx + cw / 2 - 0.5, cy + 0.35, 1.0, [C.tealD, C.teal, C.amber, C.orange][i], st[0], C.white, 26);
    s.addText(st[1], { x: cxx, y: cy + 1.5, w: cw, h: 0.5, align: "center", fontFace: F.head, fontSize: 19, bold: true, color: C.ink, margin: 0 });
    s.addText(st[2], { x: cxx + 0.25, y: cy + 2.05, w: cw - 0.5, h: 0.95, align: "center", fontFace: F.body, fontSize: 12.5, color: C.body, margin: 0 });
    if (i < 3) badge(s, cxx + cw - 0.02, cy + ch / 2 - 0.18, 0.36, C.navy, "›", C.white, 16);
  });

  s.addText("Today we'll run this exact loop, live, in 40 minutes.", { x: 0.6, y: 5.9, w: 12, h: 0.5,
    fontFace: F.body, fontSize: 15, italic: true, bold: true, color: C.tealD, align: "center", margin: 0 });

  s.addNotes("This four-step loop is the repeatable framework promised in the concept note. Emphasize 'scope it small' — the #1 reason first projects die is scope. The whole second half of this talk is one full lap of this loop. Tell them to keep a note open and jot down the small annoyances they hit this week — those are their project ideas.");
  footer(s);
}

// ===========================================================================
// SLIDE 8 — Why now: the experience gap (stat callouts)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Why this matters now", "Certificates teach. Building proves.");

  s.addText("Training and certs have never been more accessible — so they no longer set you apart. What sets you apart is a public, verifiable body of work.",
    { x: 0.6, y: 1.75, w: 12.1, h: 0.7, fontFace: F.body, fontSize: 15, color: C.body, margin: 0 });

  const stats = [
    ["Knowing", "concepts is now table-stakes", C.tealD],
    ["Showing", "what you've built is the differentiator", C.teal],
    ["Public", "work is forkable, permanent, global", C.amber],
  ];
  const cw = 3.9, gx = 0.25, x0 = 0.6, cy = 2.75, ch = 2.5;
  stats.forEach((st, i) => {
    const cxx = x0 + i * (cw + gx);
    card(s, cxx, cy, cw, ch, C.card);
    s.addText(st[0], { x: cxx + 0.3, y: cy + 0.35, w: cw - 0.6, h: 0.9, fontFace: F.head, fontSize: 30, bold: true, color: st[2], margin: 0 });
    s.addText(st[1], { x: cxx + 0.3, y: cy + 1.3, w: cw - 0.6, h: 1.0, fontFace: F.body, fontSize: 14.5, color: C.body, margin: 0 });
  });

  s.addText("Open source is the fastest way to turn skills you already have into equity employers and communities can see.",
    { x: 0.6, y: 5.55, w: 12.1, h: 0.6, fontFace: F.body, fontSize: 15, italic: true, bold: true, color: C.ink, margin: 0 });

  s.addNotes("The 'problem statement' from the concept note, made visceral. The gap is NOT skill or drive — it's direction and visibility. Most talented engineers' best work is buried in private repos, earning zero professional equity. We're going to fix that today by building in public.");
  footer(s);
}

// ===========================================================================
// SLIDE 9 — PART 2 divider
// ===========================================================================
{
  const s = divider("2", "The landscape", "Open source in the cloud",
    "The cloud you use every day is built on it. You can build on it too.");
  s.addNotes("Transition to the open-source landscape. Lighter, faster section. Goal: demystify OSS and show where cloud engineers fit.");
  footer(s, true);
}

// ===========================================================================
// SLIDE 10 — The cloud runs on open source
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "You already depend on it", "The cloud runs on open source");

  const tools = [
    ["Kubernetes", "Orchestrates containers everywhere"],
    ["Terraform / OpenTofu", "Infrastructure as code"],
    ["LocalStack & moto", "Run/emulate AWS locally"],
    ["boto3 & the AWS SDKs", "How your code talks to AWS"],
    ["Prometheus & Grafana", "Metrics and dashboards"],
    ["Docker", "Package and ship anything"],
  ];
  const cols = 3, cw = 3.9, chh = 1.55, gx = 0.25, gy = 0.3, x0 = 0.6, y0 = 2.05;
  tools.forEach((t, i) => {
    const cxx = x0 + (i % cols) * (cw + gx);
    const cyy = y0 + Math.floor(i / cols) * (chh + gy);
    card(s, cxx, cyy, cw, chh, i % 2 ? C.cardT : C.card);
    badge(s, cxx + 0.28, cyy + 0.3, 0.55, C.tealD, "★", C.white, 16);
    s.addText(t[0], { x: cxx + 1.0, y: cyy + 0.28, w: cw - 1.2, h: 0.5, fontFace: F.head, fontSize: 16, bold: true, color: C.ink, margin: 0 });
    s.addText(t[1], { x: cxx + 0.3, y: cyy + 0.85, w: cw - 0.55, h: 0.6, fontFace: F.body, fontSize: 12.5, color: C.body, margin: 0 });
  });

  s.addText("Every one of these started as someone deciding to solve a problem in the open.",
    { x: 0.6, y: 6.05, w: 12, h: 0.5, fontFace: F.body, fontSize: 15, italic: true, color: C.tealD, align: "center", margin: 0 });

  s.addNotes("Drive home: open source isn't a side-hobby, it IS the cloud. The tools you use to do your job are open source. Note LocalStack and moto specifically — we'll use moto in the live demo, so we'll be using an open-source cloud tool WHILE building one. Very on-theme.");
  footer(s);
}

// ===========================================================================
// SLIDE 11 — What you gain as a creator
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "The payoff", "What you gain by creating");

  const gains = [
    ["◆", "A living portfolio", "Verifiable, forkable, alive — it works while you sleep."],
    ["●", "Global visibility", "Credibility across orgs and time zones; accelerates hiring."],
    ["▲", "Real collaboration", "Work with experienced engineers on real constraints."],
    ["■", "Production-grade skills", "Modern cloud-native tech in contexts that mirror industry."],
  ];
  const cols = 2, cw = 5.9, chh = 1.9, gx = 0.25, gy = 0.3, x0 = 0.6, y0 = 2.0;
  gains.forEach((g, i) => {
    const cxx = x0 + (i % cols) * (cw + gx);
    const cyy = y0 + Math.floor(i / cols) * (chh + gy);
    card(s, cxx, cyy, cw, chh, C.card);
    badge(s, cxx + 0.35, cyy + 0.5, 0.9, [C.tealD, C.teal, C.amber, C.orange][i], g[0], C.white, 24);
    s.addText(g[1], { x: cxx + 1.5, y: cyy + 0.35, w: cw - 1.8, h: 0.55, fontFace: F.head, fontSize: 18, bold: true, color: C.ink, margin: 0 });
    s.addText(g[2], { x: cxx + 1.5, y: cyy + 0.95, w: cw - 1.8, h: 0.8, fontFace: F.body, fontSize: 13, color: C.body, margin: 0 });
  });

  s.addNotes("These map directly to the concept note's benefits list. Keep it punchy. The killer line: 'A portfolio that works while you sleep' — your public repo is being read by recruiters and engineers when you're not even in the room.");
  footer(s);
}

// ===========================================================================
// SLIDE 12 — What makes a cloud tool actually matter
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Before you build", "What makes a tool actually matter");

  const crit = [
    ["1", "Solves a real pain", "Cost, security, time, or visibility — something people feel."],
    ["2", "Small surface area", "Does ONE thing well. Easy to understand, easy to trust."],
    ["3", "Easy to install & run", "One command. Friction kills adoption."],
    ["4", "Great README", "~50% of why tools get adopted. Show, don't tell."],
  ];
  const y0 = 2.0, rh = 1.0, x0 = 0.6, ww = 12.1;
  crit.forEach((c, i) => {
    const yy = y0 + i * (rh + 0.15);
    card(s, x0, yy, ww, rh, i % 2 ? C.cardT : C.card);
    badge(s, x0 + 0.3, yy + rh / 2 - 0.32, 0.64, [C.tealD, C.teal, C.amber, C.orange][i], c[0], C.white, 22);
    s.addText(c[1], { x: x0 + 1.2, y: yy, w: 3.7, h: rh, fontFace: F.head, fontSize: 17, bold: true, color: C.ink, valign: "middle", margin: 0 });
    s.addText(c[2], { x: x0 + 5.0, y: yy, w: ww - 5.3, h: rh, fontFace: F.body, fontSize: 14, color: C.body, valign: "middle", margin: 0 });
  });

  s.addNotes("This is the rubric we'll hold our own tool to. Call out the README line hard — most engineers under-invest in the README and over-invest in features. A great README with a screenshot beats a clever feature nobody can figure out how to run. Keep these four criteria in their heads for the build.");
  footer(s);
}

// ===========================================================================
// SLIDE 13 — PART 3 divider
// ===========================================================================
{
  const s = divider("3", "From frustration to project", "Finding a problem worth solving",
    "We'll pick a real, common, painful cloud problem — and scope it.");
  s.addNotes("Transition into the concrete problem we will solve. Energy should pick up here — we're about to get hands-on.");
  footer(s, true);
}

// ===========================================================================
// SLIDE 14 — How to find problems worth solving
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Where good projects come from", "How to find problems worth solving");

  const where = [
    ["Your daily friction", "The command you keep re-typing. The check you keep doing by hand."],
    ["The scary gap", "\"I hope nobody misconfigured that...\" — automate the worry away."],
    ["The onboarding pain", "What confused you on day one will confuse the next person."],
    ["The expensive surprise", "The bill, the outage, the breach you want to prevent."],
  ];
  const cols = 2, cw = 5.9, chh = 1.95, gx = 0.25, gy = 0.3, x0 = 0.6, y0 = 2.0;
  where.forEach((wv, i) => {
    const cxx = x0 + (i % cols) * (cw + gx);
    const cyy = y0 + Math.floor(i / cols) * (chh + gy);
    card(s, cxx, cyy, cw, chh, C.card);
    badge(s, cxx + 0.32, cyy + 0.32, 0.6, C.tealD, "?", C.white, 20);
    s.addText(wv[0], { x: cxx + 1.05, y: cyy + 0.32, w: cw - 1.3, h: 0.5, fontFace: F.head, fontSize: 17, bold: true, color: C.ink, margin: 0 });
    s.addText(wv[1], { x: cxx + 0.32, y: cyy + 0.95, w: cw - 0.6, h: 0.85, fontFace: F.body, fontSize: 13, color: C.body, margin: 0 });
  });

  s.addText("Our pick today lives squarely in \"the scary gap.\"", { x: 0.6, y: 6.05, w: 12, h: 0.4,
    fontFace: F.body, fontSize: 15, italic: true, bold: true, color: C.tealD, align: "center", margin: 0 });

  s.addNotes("Give one real personal example per quadrant if time allows. The goal: every attendee leaves able to generate 3 project ideas from their own week. Then narrow to ours: misconfigured S3 buckets — the classic 'scary gap'.");
  footer(s);
}

// ===========================================================================
// SLIDE 15 — The problem: S3 misconfigurations
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Our chosen problem", "S3 misconfigurations leak data");

  card(s, 0.6, 2.0, 5.9, 4.4, C.cardA);
  s.addText("Why S3?", { x: 0.95, y: 2.3, w: 5, h: 0.5, fontFace: F.head, fontSize: 20, bold: true, color: C.ink, margin: 0 });
  s.addText([
    { text: "S3 is everywhere — almost every AWS workload uses it", options: { bullet: true, breakLine: true } },
    { text: "A single wrong setting can expose data publicly", options: { bullet: true, breakLine: true } },
    { text: "Misconfigured buckets are a top, recurring cause of real breaches", options: { bullet: true, breakLine: true } },
    { text: "The checks are simple — but nobody does them consistently", options: { bullet: true, breakLine: true } },
    { text: "Perfect: real pain, small surface, easy to automate", options: { bullet: true } },
  ], { x: 1.0, y: 2.9, w: 5.2, h: 3.3, fontFace: F.body, fontSize: 14.5, color: C.body, margin: 0, paraSpaceAfter: 11 });

  card(s, 6.75, 2.0, 5.95, 4.4, C.card);
  s.addText("The four risks we'll catch", { x: 7.1, y: 2.3, w: 5.3, h: 0.5, fontFace: F.head, fontSize: 20, bold: true, color: C.ink, margin: 0 });
  const risks = [
    ["Public access", "Bucket can be reached by anyone", C.red, "CRITICAL"],
    ["No encryption", "Data sits unencrypted at rest", C.orange, "HIGH"],
    ["No versioning", "Overwrites/deletes unrecoverable", C.amber, "MEDIUM"],
    ["No logging", "No audit trail of access", C.teal, "LOW"],
  ];
  risks.forEach((r, i) => {
    const yy = 2.95 + i * 0.82;
    s.addText(r[3], { x: 7.1, y: yy, w: 1.4, h: 0.5, fontFace: F.head, fontSize: 11, bold: true, color: C.white,
      fill: { color: r[2] }, align: "center", valign: "middle", margin: 0 });
    s.addText([{ text: r[0] + "  ", options: { bold: true, color: C.ink } }, { text: r[1], options: { color: C.body } }],
      { x: 8.65, y: yy, w: 4.0, h: 0.5, fontFace: F.body, fontSize: 12.5, valign: "middle", margin: 0 });
  });

  s.addNotes("Anchor the problem in stakes people feel. You don't need exact breach statistics — the point is qualitative and well known: leaky S3 buckets are a perennial headline. Then reframe positively: the fixes are simple settings; the real problem is consistency. That's exactly what a tool solves. Introduce the four checks — they map 1:1 to the severities we'll see in the demo.");
  footer(s);
}

// ===========================================================================
// SLIDE 16 — Meet s3-guard
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "The tool we'll build", "Meet s3-guard");

  s.addText("A tiny open-source CLI that scans your S3 buckets and flags the misconfigurations that cause breaches — then prints a clean, colour-coded report.",
    { x: 0.6, y: 1.75, w: 12.1, h: 0.7, fontFace: F.body, fontSize: 15.5, color: C.body, margin: 0 });

  const feats = [
    ["◆", "4 security checks", "Public access, encryption, versioning, logging"],
    ["●", "Beautiful output", "Rich tables, severity colours, JSON mode"],
    ["▲", "CI-ready", "Non-zero exit gates your pipeline on risk"],
    ["■", "Extensible", "Add a new check in ~10 lines"],
  ];
  const cols = 2, cw = 5.9, chh = 1.6, gx = 0.25, gy = 0.28, x0 = 0.6, y0 = 2.65;
  feats.forEach((f, i) => {
    const cxx = x0 + (i % cols) * (cw + gx);
    const cyy = y0 + Math.floor(i / cols) * (chh + gy);
    card(s, cxx, cyy, cw, chh, i % 2 ? C.cardT : C.card);
    badge(s, cxx + 0.32, cyy + 0.42, 0.78, [C.tealD, C.teal, C.amber, C.orange][i], f[0], C.white, 20);
    s.addText(f[1], { x: cxx + 1.35, y: cyy + 0.3, w: cw - 1.6, h: 0.5, fontFace: F.head, fontSize: 16.5, bold: true, color: C.ink, margin: 0 });
    s.addText(f[2], { x: cxx + 1.35, y: cyy + 0.85, w: cw - 1.6, h: 0.6, fontFace: F.body, fontSize: 12.5, color: C.body, margin: 0 });
  });

  s.addText("Python · boto3 · Typer · Rich  —  pip install, one command to run.",
    { x: 0.6, y: 6.45, w: 12.1, h: 0.4, fontFace: F.mono, fontSize: 12.5, color: C.tealD, align: "center", margin: 0 });

  s.addNotes("Show the destination before the journey. This is what we're about to build live. Note the stack is deliberately beginner-friendly and standard. Reassure: every piece is something they can learn. Then move to the build.");
  footer(s);
}

// ===========================================================================
// SLIDE 17 — PART 4 divider
// ===========================================================================
{
  const s = divider("4", "Hands-on", "Live build & demo",
    "From empty folder to working tool — and we run it for real.");
  s.addNotes("The centerpiece — ~40 minutes. Switch to the editor + terminal now. Slides from here are a safety net / visual backup in case of demo hiccups. Re-state: no AWS account or Docker needed — we use moto, a local fake S3.");
  footer(s, true);
}

// ===========================================================================
// SLIDE 18 — The safe sandbox
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Demo safely", "The sandbox: no account, no Docker, no bill");

  card(s, 0.6, 2.0, 5.9, 4.3, C.cardT);
  badge(s, 0.95, 2.3, 0.8, C.tealD, "✓", C.white, 22);
  s.addText("moto — a fake AWS in Python", { x: 1.95, y: 2.35, w: 4.4, h: 0.7, fontFace: F.head, fontSize: 18, bold: true, color: C.ink, margin: 0 });
  s.addText([
    { text: "Runs entirely on your laptop", options: { bullet: true, breakLine: true } },
    { text: "No AWS account or credentials", options: { bullet: true, breakLine: true } },
    { text: "Zero risk of a surprise bill", options: { bullet: true, breakLine: true } },
    { text: "Everyone can follow along", options: { bullet: true, breakLine: true } },
    { text: "It's itself an open-source cloud tool!", options: { bullet: true } },
  ], { x: 1.0, y: 3.25, w: 5.2, h: 3.0, fontFace: F.body, fontSize: 14.5, color: C.body, margin: 0, paraSpaceAfter: 9 });

  card(s, 6.75, 2.0, 5.95, 4.3, C.panel);
  s.addText("Terminal", { x: 7.05, y: 2.2, w: 4, h: 0.4, fontFace: F.mono, fontSize: 12, color: C.ice, margin: 0 });
  s.addText([
    { text: "# start a local fake S3 (no Docker)", options: { color: "7DD3FC", breakLine: true } },
    { text: "python -m moto.server -p 5000", options: { color: "A7F3D0", breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "# create deliberately broken buckets", options: { color: "7DD3FC", breakLine: true } },
    { text: "python scripts/seed_buckets.py \\", options: { color: "A7F3D0", breakLine: true } },
    { text: "    --endpoint-url http://localhost:5000", options: { color: "A7F3D0", breakLine: true } },
    { text: "", options: { breakLine: true } },
    { text: "# scan them", options: { color: "7DD3FC", breakLine: true } },
    { text: "s3-guard scan \\", options: { color: "FDE68A", breakLine: true } },
    { text: "    --endpoint-url http://localhost:5000", options: { color: "FDE68A" } },
  ], { x: 7.05, y: 2.65, w: 5.5, h: 3.5, fontFace: F.mono, fontSize: 12.5, margin: 0, lineSpacingMultiple: 1.08 });

  s.addNotes("Explain the trick that makes a live cloud demo safe and reproducible. The same --endpoint-url flag points at LocalStack (4566) if they have it, or REAL AWS if you omit it. This is also the design lesson: building against an endpoint-url makes your tool testable. Run these three commands live now.");
  footer(s);
}

// ===========================================================================
// SLIDE 19 — How it's built (architecture)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "The shape of the code", "How s3-guard is built");

  const boxes = [
    ["checks.py", "One small function per check. Returns a Finding, or nothing.", C.tealD],
    ["auditor.py", "Connects to S3, runs every check on every bucket, sorts worst-first.", C.teal],
    ["cli.py", "Typer command + Rich report. The part the user touches.", C.amber],
  ];
  const cw = 3.9, gx = 0.3, x0 = 0.6, cy = 2.3, ch = 2.8;
  boxes.forEach((b, i) => {
    const cxx = x0 + i * (cw + gx);
    card(s, cxx, cy, cw, ch, C.card);
    s.addText(b[0], { x: cxx + 0.3, y: cy + 0.35, w: cw - 0.6, h: 0.6, fontFace: F.mono, fontSize: 18, bold: true, color: b[2], margin: 0 });
    s.addText(b[1], { x: cxx + 0.3, y: cy + 1.15, w: cw - 0.6, h: 1.5, fontFace: F.body, fontSize: 13.5, color: C.body, margin: 0 });
    if (i < 2) badge(s, cxx + cw + gx / 2 - 0.18, cy + ch / 2 - 0.18, 0.36, C.navy, "›", C.white, 16);
  });

  s.addText("Separating \"what to check\" from \"how to show it\" is what makes the tool easy to read, test, and extend.",
    { x: 0.6, y: 5.55, w: 12.1, h: 0.6, fontFace: F.body, fontSize: 14.5, italic: true, color: C.tealD, align: "center", margin: 0 });

  s.addNotes("Teach the design principle: separation of concerns. checks don't know about display; cli doesn't know about S3 internals. This is a senior-engineer habit worth modeling explicitly for the audience. Open the files in order as you talk.");
  footer(s);
}

// ===========================================================================
// SLIDE 20 — A check is ~10 lines (code)
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "The whole idea, in one function", "A security check is ~10 lines");

  card(s, 0.6, 1.95, 12.1, 3.5, C.panel);
  s.addText([
    { text: "def ", options: { color: "C792EA" } },
    { text: "check_versioning", options: { color: "82AAFF" } },
    { text: "(client, bucket):", options: { color: "ECEFF4", breakLine: true } },
    { text: "    resp = client.get_bucket_versioning(Bucket=bucket)", options: { color: "ECEFF4", breakLine: true } },
    { text: "    if ", options: { color: "C792EA" } },
    { text: "resp.get(", options: { color: "ECEFF4" } },
    { text: "\"Status\"", options: { color: "A7F3D0" } },
    { text: ") == ", options: { color: "ECEFF4" } },
    { text: "\"Enabled\"", options: { color: "A7F3D0" } },
    { text: ":", options: { color: "ECEFF4", breakLine: true } },
    { text: "        return None              ", options: { color: "ECEFF4" } },
    { text: "# all good", options: { color: "7DD3FC", breakLine: true } },
    { text: "    return ", options: { color: "C792EA" } },
    { text: "Finding(", options: { color: "ECEFF4", breakLine: true } },
    { text: "        bucket=bucket, check=", options: { color: "ECEFF4" } },
    { text: "\"versioning\"", options: { color: "A7F3D0" } },
    { text: ", severity=", options: { color: "ECEFF4" } },
    { text: "\"MEDIUM\"", options: { color: "A7F3D0" } },
    { text: ",", options: { color: "ECEFF4", breakLine: true } },
    { text: "        message=", options: { color: "ECEFF4" } },
    { text: "\"Versioning is not enabled.\"", options: { color: "A7F3D0" } },
    { text: ", ...)", options: { color: "ECEFF4" } },
  ], { x: 0.95, y: 2.25, w: 11.4, h: 2.9, fontFace: F.mono, fontSize: 14.5, margin: 0, lineSpacingMultiple: 1.18 });

  s.addText("Ask AWS a question. If the answer is safe, return nothing. Otherwise, describe the problem. That's it.",
    { x: 0.6, y: 5.75, w: 12.1, h: 0.6, fontFace: F.body, fontSize: 15, italic: true, color: C.ink, align: "center", margin: 0 });

  s.addNotes("Demystify the 'magic'. Each check is just an API call plus an if-statement. If they can read this, they can write one. This is where you vibecode the remaining checks live with an AI assistant, explaining WHY at each step. Keep narrating the intent, not just the syntax.");
  footer(s);
}

// ===========================================================================
// SLIDE 21 — The seeded buckets
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Set the stage", "Three buckets, on purpose");

  const b = [
    ["tek-public-data", "Wide open", "Nothing configured — every check should fire.", C.red],
    ["tek-logs-unsafe", "Half-done", "Encrypted & locked, but no versioning or logging.", C.amber],
    ["tek-secure-backups", "Gold standard", "Locked down on all four — should be clean.", C.tealD],
  ];
  const cw = 3.9, gx = 0.3, x0 = 0.6, cy = 2.2, ch = 3.5;
  b.forEach((bk, i) => {
    const cxx = x0 + i * (cw + gx);
    card(s, cxx, cy, cw, ch, C.card);
    s.addText(bk[1].toUpperCase(), { x: cxx + 0.3, y: cy + 0.35, w: cw - 0.6, h: 0.4, fontFace: F.head, fontSize: 12, bold: true, color: bk[3], charSpacing: 1, margin: 0 });
    s.addText(bk[0], { x: cxx + 0.3, y: cy + 0.8, w: cw - 0.6, h: 0.9, fontFace: F.mono, fontSize: 15.5, bold: true, color: C.ink, margin: 0 });
    s.addText(bk[2], { x: cxx + 0.3, y: cy + 1.85, w: cw - 0.6, h: 1.4, fontFace: F.body, fontSize: 13.5, color: C.body, margin: 0 });
  });

  s.addNotes("Explain why we seed a deliberately broken environment: a security tool is only convincing if you can SEE it catch real problems. The 'gold standard' bucket matters too — a tool that only ever screams is useless; it must also say 'this one is fine.' Run seed_buckets.py now.");
  footer(s);
}

// ===========================================================================
// SLIDE 22 — The result (findings report)  — THE PAYOFF
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "The payoff", "s3-guard catches them all");

  card(s, 0.6, 1.9, 12.1, 4.05, C.panel);
  s.addText("$ s3-guard scan --endpoint-url http://localhost:5000", { x: 0.95, y: 2.1, w: 11.4, h: 0.4, fontFace: F.mono, fontSize: 13, color: "7DD3FC", margin: 0 });

  const rows = [
    ["CRITICAL", "tek-public-data", "public-access", "No Public Access Block - can be exposed publicly", C.red],
    ["HIGH", "tek-public-data", "encryption", "No default encryption - data unencrypted at rest", C.orange],
    ["MEDIUM", "tek-logs-unsafe", "versioning", "Versioning off - overwrites/deletes unrecoverable", C.amber],
    ["MEDIUM", "tek-public-data", "versioning", "Versioning off - overwrites/deletes unrecoverable", C.amber],
    ["LOW", "tek-logs-unsafe", "logging", "No access logging - no audit trail", C.teal],
    ["LOW", "tek-public-data", "logging", "No access logging - no audit trail", C.teal],
  ];
  rows.forEach((r, i) => {
    const yy = 2.65 + i * 0.45;
    s.addText(r[0], { x: 0.95, y: yy, w: 1.25, h: 0.36, fontFace: F.mono, fontSize: 10.5, bold: true, color: C.white,
      fill: { color: r[4] }, align: "center", valign: "middle", margin: 0 });
    s.addText(r[1], { x: 2.35, y: yy, w: 2.5, h: 0.36, fontFace: F.mono, fontSize: 11.5, color: "ECEFF4", valign: "middle", margin: 0 });
    s.addText(r[2], { x: 4.85, y: yy, w: 2.0, h: 0.36, fontFace: F.mono, fontSize: 11.5, color: "A7F3D0", valign: "middle", margin: 0 });
    s.addText(r[3], { x: 6.95, y: yy, w: 5.6, h: 0.36, fontFace: F.mono, fontSize: 11, color: "CBD5E1", valign: "middle", margin: 0 });
  });
  s.addText("Summary:  1 critical · 1 high · 2 medium · 2 low        exit code 1", { x: 0.95, y: 5.45, w: 11.5, h: 0.4, fontFace: F.mono, fontSize: 12.5, bold: true, color: "FDE68A", margin: 0 });

  s.addText("Real findings, on real (fake) infrastructure — this is the moment they become a creator.",
    { x: 0.6, y: 6.05, w: 12.1, h: 0.5, fontFace: F.body, fontSize: 14.5, italic: true, color: C.tealD, align: "center", margin: 0 });

  s.addNotes("THE big moment — let it land. Pause. This is exactly the output we just generated in testing, so it will match the live run. Point out: critical floats to the top (smart sorting), the clean bucket produced nothing, and the exit code is 1 — which is what lets it gate CI. This is a real, useful tool now.");
  footer(s);
}

// ===========================================================================
// SLIDE 23 — Extend it live / break & fix
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Make it real", "Extend it live — then break it");

  card(s, 0.6, 2.0, 5.9, 4.3, C.cardT);
  badge(s, 0.95, 2.3, 0.8, C.tealD, "+", C.white, 26);
  s.addText("Add a check in 10 lines", { x: 1.95, y: 2.4, w: 4.3, h: 0.6, fontFace: F.head, fontSize: 18, bold: true, color: C.ink, margin: 0 });
  s.addText([
    { text: "Write a new function in checks.py", options: { bullet: true, breakLine: true } },
    { text: "Add it to the ALL_CHECKS list", options: { bullet: true, breakLine: true } },
    { text: "Re-run the scan", options: { bullet: true, breakLine: true } },
    { text: "A new finding appears — \"we just shipped a feature\"", options: { bullet: true } },
  ], { x: 1.0, y: 3.3, w: 5.2, h: 2.9, fontFace: F.body, fontSize: 14.5, color: C.body, margin: 0, paraSpaceAfter: 11 });

  card(s, 6.75, 2.0, 5.95, 4.3, C.cardA);
  badge(s, 7.1, 2.3, 0.8, C.orange, "!", C.white, 26);
  s.addText("Break it on purpose", { x: 8.1, y: 2.4, w: 4.3, h: 0.6, fontFace: F.head, fontSize: 18, bold: true, color: C.ink, margin: 0 });
  s.addText([
    { text: "Introduce a typo in a check", options: { bullet: true, breakLine: true } },
    { text: "Run it — read the traceback together", options: { bullet: true, breakLine: true } },
    { text: "Debug calmly; fix the line", options: { bullet: true, breakLine: true } },
    { text: "Lesson: errors are normal, not failure", options: { bullet: true } },
  ], { x: 7.15, y: 3.3, w: 5.3, h: 2.9, fontFace: F.body, fontSize: 14.5, color: C.body, margin: 0, paraSpaceAfter: 11 });

  s.addNotes("Two high-value teaching moments. Extending live proves the architecture pays off. Breaking it deliberately is the most reassuring thing you can do for beginners — they watch an experienced engineer hit an error and stay calm. Model the debugging loop: read the error, find the line, form a hypothesis, fix, re-run.");
  footer(s);
}

// ===========================================================================
// SLIDE 24 — Put it in CI
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "From script to safeguard", "Wire it into CI/CD");

  s.addText("Because s3-guard exits non-zero on risk, it can fail a pipeline before bad infrastructure ships.",
    { x: 0.6, y: 1.75, w: 12.1, h: 0.6, fontFace: F.body, fontSize: 15, color: C.body, margin: 0 });

  card(s, 0.6, 2.55, 12.1, 2.45, C.panel);
  s.addText([
    { text: "# .github/workflows/security.yml", options: { color: "7DD3FC", breakLine: true } },
    { text: "- run: pip install s3-guard", options: { color: "ECEFF4", breakLine: true } },
    { text: "- run: s3-guard scan --fail-level CRITICAL", options: { color: "FDE68A", breakLine: true } },
    { text: "                                  ", options: { breakLine: true } },
    { text: "# build fails if any CRITICAL bucket is found  →  exit 1", options: { color: "A7F3D0" } },
  ], { x: 0.95, y: 2.8, w: 11.4, h: 1.9, fontFace: F.mono, fontSize: 14, margin: 0, lineSpacingMultiple: 1.2 });

  s.addText("This is how a 100-line tool becomes part of a real team's safety net.",
    { x: 0.6, y: 5.35, w: 12.1, h: 0.5, fontFace: F.body, fontSize: 15, italic: true, bold: true, color: C.tealD, align: "center", margin: 0 });

  s.addNotes("Show the leap from 'neat script' to 'thing teams depend on'. The exit code is the integration point — that's a small design decision with big leverage. Mention our repo already ships a GitHub Actions workflow that runs the tests on every push.");
  footer(s);
}

// ===========================================================================
// SLIDE 25 — PART 5 divider
// ===========================================================================
{
  const s = divider("5", "Ship it", "From code to community",
    "A tool nobody can find helps nobody. Let's launch it properly.");
  s.addNotes("Final content section. Shift from building to launching and sustaining. This is what converts a weekend project into career equity.");
  footer(s, true);
}

// ===========================================================================
// SLIDE 26 — Launch checklist
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Make it installable", "The launch checklist");

  const steps = [
    ["1", "Push to GitHub", "Public repo, clear name, descriptive topics."],
    ["2", "Add a LICENSE", "MIT keeps it simple and adoption-friendly."],
    ["3", "Write the README", "What, why, install, usage, a screenshot."],
    ["4", "Package it", "pyproject.toml → pip install your-tool."],
    ["5", "Add CI", "Tests on every push build trust."],
    ["6", "Announce it", "LinkedIn, X, communities — invite contributors."],
  ];
  const cols = 3, cw = 3.9, chh = 1.95, gx = 0.25, gy = 0.3, x0 = 0.6, y0 = 2.0;
  steps.forEach((st, i) => {
    const cxx = x0 + (i % cols) * (cw + gx);
    const cyy = y0 + Math.floor(i / cols) * (chh + gy);
    card(s, cxx, cyy, cw, chh, i % 2 ? C.card : C.cardT);
    badge(s, cxx + 0.3, cyy + 0.32, 0.7, C.tealD, st[0], C.white, 20);
    s.addText(st[1], { x: cxx + 1.15, y: cyy + 0.34, w: cw - 1.3, h: 0.5, fontFace: F.head, fontSize: 16.5, bold: true, color: C.ink, margin: 0 });
    s.addText(st[2], { x: cxx + 0.3, y: cyy + 1.05, w: cw - 0.55, h: 0.8, fontFace: F.body, fontSize: 12.5, color: C.body, margin: 0 });
  });

  s.addNotes("Our repo already has all six. Walk the actual files: LICENSE, README.md, pyproject.toml, .github/workflows/ci.yml. The 'pip install' moment is magic for beginners — point out the [project.scripts] entry that turns the package into a real command. Encourage them to do step 6 today, tagging both speakers.");
  footer(s);
}

// ===========================================================================
// SLIDE 27 — README is 50%
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Your most important file", "The README is ~50% of adoption");

  card(s, 0.6, 2.0, 5.9, 4.3, C.card);
  s.addText("A great README answers, fast:", { x: 0.95, y: 2.3, w: 5.2, h: 0.5, fontFace: F.head, fontSize: 17, bold: true, color: C.ink, margin: 0 });
  s.addText([
    { text: "What is this? (one sentence)", options: { bullet: true, breakLine: true } },
    { text: "Why should I care? (the pain)", options: { bullet: true, breakLine: true } },
    { text: "How do I install it? (one command)", options: { bullet: true, breakLine: true } },
    { text: "How do I use it? (copy-paste example)", options: { bullet: true, breakLine: true } },
    { text: "Show me. (a screenshot or output)", options: { bullet: true } },
  ], { x: 1.0, y: 2.95, w: 5.3, h: 3.2, fontFace: F.body, fontSize: 14.5, color: C.body, margin: 0, paraSpaceAfter: 12 });

  card(s, 6.75, 2.0, 5.95, 4.3, C.cardT);
  s.addText("Why it decides everything", { x: 7.1, y: 2.3, w: 5.3, h: 0.5, fontFace: F.head, fontSize: 17, bold: true, color: C.ink, margin: 0 });
  s.addText([
    { text: "It's the first — often only — thing people read", options: { bullet: true, breakLine: true } },
    { text: "A screenshot earns trust in 2 seconds", options: { bullet: true, breakLine: true } },
    { text: "Clear install = the difference between a star and a bounce", options: { bullet: true, breakLine: true } },
    { text: "It's also YOUR portfolio piece — recruiters read it", options: { bullet: true } },
  ], { x: 7.15, y: 2.95, w: 5.3, h: 3.2, fontFace: F.body, fontSize: 14.5, color: C.body, margin: 0, paraSpaceAfter: 12 });

  s.addNotes("Push hard on this — it's the most under-rated skill. Engineers love features and neglect docs; the market rewards the opposite. Show the actual s3-guard README with the output block near the top. The README is doing sales, onboarding, and portfolio work simultaneously.");
  footer(s);
}

// ===========================================================================
// SLIDE 28 — First users + your CV
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Turn it into momentum", "First users, contributors & your CV");

  const items = [
    ["◆", "Share the story", "Post the problem and the fix — not just the link."],
    ["●", "Invite contributions", "Add a few \"good first issue\" tasks for newcomers."],
    ["▲", "Engage communities", "Cloud Native, KCD, AWS & university groups."],
    ["■", "Put it on your CV", "Link the repo on LinkedIn and your résumé."],
  ];
  const cols = 2, cw = 5.9, chh = 1.9, gx = 0.25, gy = 0.3, x0 = 0.6, y0 = 2.0;
  items.forEach((g, i) => {
    const cxx = x0 + (i % cols) * (cw + gx);
    const cyy = y0 + Math.floor(i / cols) * (chh + gy);
    card(s, cxx, cyy, cw, chh, i % 2 ? C.cardT : C.card);
    badge(s, cxx + 0.35, cyy + 0.5, 0.9, [C.tealD, C.teal, C.amber, C.orange][i], g[0], C.white, 22);
    s.addText(g[1], { x: cxx + 1.5, y: cyy + 0.35, w: cw - 1.8, h: 0.55, fontFace: F.head, fontSize: 17, bold: true, color: C.ink, margin: 0 });
    s.addText(g[2], { x: cxx + 1.5, y: cyy + 0.95, w: cw - 1.8, h: 0.8, fontFace: F.body, fontSize: 13, color: C.body, margin: 0 });
  });

  s.addNotes("Practical, do-it-this-week advice. The story matters more than the code for reach — people share narratives, not READMEs. 'good first issue' labels are how you attract your first collaborators. And crucially: this is now a concrete, link-able achievement on their CV — exactly the visibility the whole webinar is about.");
  footer(s);
}

// ===========================================================================
// SLIDE 29 — Your roadmap
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  title(s, "Keep going", "Your 30-day creator roadmap");

  const road = [
    ["This week", "Ship s3-guard (or your own idea). Make the repo public.", C.tealD],
    ["Week 2", "Add one feature + one test. Write the README screenshot.", C.teal],
    ["Week 3", "Announce it. Open 2–3 \"good first issues.\"", C.amber],
    ["Week 4", "Contribute to one OTHER project. Reply to an issue.", C.orange],
  ];
  const y0 = 2.05, rh = 1.0, x0 = 0.6, ww = 12.1;
  road.forEach((r, i) => {
    const yy = y0 + i * (rh + 0.15);
    card(s, x0, yy, ww, rh, i % 2 ? C.card : C.cardT);
    s.addText(r[0], { x: x0 + 0.35, y: yy, w: 2.6, h: rh, fontFace: F.head, fontSize: 17, bold: true, color: r[2], valign: "middle", margin: 0 });
    s.addText(r[1], { x: x0 + 3.2, y: yy, w: ww - 3.5, h: rh, fontFace: F.body, fontSize: 14.5, color: C.body, valign: "middle", margin: 0 });
  });

  s.addText("Consistency beats intensity. Four small weeks = a visible, living body of work.",
    { x: 0.6, y: 6.7, w: 12.1, h: 0.4, fontFace: F.body, fontSize: 14, italic: true, color: C.tealD, align: "center", margin: 0 });

  s.addNotes("The 'personal roadmap for sustained involvement' from the objectives. Make it feel achievable — these are small steps. The week-4 step (contributing to someone else's project) closes the loop: creators are also better users and community members. Offer to be tagged on their week-3 announcements.");
  footer(s);
}

// ===========================================================================
// SLIDE 30 — Challenge + Q&A
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: 9.8, y: 3.4, w: 5.6, h: 5.6, fill: { color: C.navy2 }, line: { type: "none" } });
  badge(s, 0.9, 0.8, 0.9, C.amber, "★", C.navy, 24);
  s.addText("YOUR CHALLENGE", { x: 2.0, y: 0.95, w: 9, h: 0.5, fontFace: F.head, fontSize: 15, bold: true, color: C.amber, charSpacing: 2, margin: 0 });
  s.addText("Add one new feature to s3-guard this week — and tag us.", { x: 0.9, y: 1.7, w: 11.5, h: 1.4, fontFace: F.head, fontSize: 32, bold: true, color: C.white, margin: 0 });

  const ideas = ["A new check (MFA-delete? lifecycle policy?)", "An HTML report output", "Scan across multiple AWS profiles", "Your own idea from your own week"];
  s.addText(ideas.map((t, i) => ({ text: t, options: { bullet: true, color: C.ice, breakLine: i < ideas.length - 1 } })),
    { x: 1.0, y: 3.25, w: 7.5, h: 2.0, fontFace: F.body, fontSize: 16, margin: 0, paraSpaceAfter: 10 });

  card(s, 8.7, 3.2, 4.0, 2.2, C.panel);
  s.addText("Q & A", { x: 8.7, y: 3.5, w: 4.0, h: 0.8, align: "center", fontFace: F.head, fontSize: 30, bold: true, color: C.teal, margin: 0 });
  s.addText("Ask us anything —\ncloud, careers, or code.", { x: 8.7, y: 4.4, w: 4.0, h: 0.8, align: "center", fontFace: F.body, fontSize: 14, color: C.ice, margin: 0 });

  s.addText("From user to creator — you've now seen the whole loop. Go run it.", { x: 0.9, y: 6.5, w: 11.5, h: 0.5, fontFace: F.body, fontSize: 16, italic: true, color: C.teal, margin: 0 });

  s.addNotes("Leave them with the homework challenge from the original plan. Keep Q&A tight (5 min). If quiet, seed it: 'Most common question we get is — how do I pick my first project? Answer: the smallest thing that annoyed you this week.' Then move to resources/thanks.");
  footer(s, true);
}

// ===========================================================================
// SLIDE 31 — Resources & thank you
// ===========================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape(pres.shapes.OVAL, { x: -1.8, y: -1.8, w: 5.4, h: 5.4, fill: { color: C.navy2 }, line: { type: "none" } });
  s.addText("Thank you", { x: 0.9, y: 0.85, w: 11, h: 1.0, fontFace: F.head, fontSize: 44, bold: true, color: C.white, margin: 0 });
  s.addText("Now go build the thing only you noticed.", { x: 0.92, y: 1.85, w: 11, h: 0.6, fontFace: F.body, fontSize: 18, color: C.teal, margin: 0 });

  card(s, 0.9, 2.8, 5.75, 3.4, C.panel);
  s.addText("Resources", { x: 1.2, y: 3.05, w: 5, h: 0.5, fontFace: F.head, fontSize: 19, bold: true, color: C.teal, margin: 0 });
  s.addText([
    { text: "github.com/Mide69/s3-guard  (the tool)", options: { bullet: true, breakLine: true } },
    { text: "Demo runbook + tests in the repo", options: { bullet: true, breakLine: true } },
    { text: "moto: github.com/getmoto/moto", options: { bullet: true, breakLine: true } },
    { text: "LocalStack: localstack.cloud", options: { bullet: true, breakLine: true } },
    { text: "boto3 · Typer · Rich docs", options: { bullet: true } },
  ], { x: 1.25, y: 3.6, w: 5.2, h: 2.5, fontFace: F.body, fontSize: 13.5, color: C.ice, margin: 0, paraSpaceAfter: 8 });

  card(s, 6.9, 2.8, 5.8, 3.4, C.panel);
  s.addText("Connect with us", { x: 7.2, y: 3.05, w: 5, h: 0.5, fontFace: F.head, fontSize: 19, bold: true, color: C.teal, margin: 0 });
  s.addText([
    { text: "Olamide Kosile", options: { bold: true, color: C.white, fontSize: 15, breakLine: true } },
    { text: "linkedin.com/in/olamide-kosile-2b488baa", options: { color: C.ice, fontSize: 12.5, breakLine: true } },
    { text: "Lead Speaker · Technical Session Lead", options: { color: C.mute, fontSize: 11.5, breakLine: true } },
    { text: " ", options: { fontSize: 8, breakLine: true } },
    { text: "Delightsome Asolo", options: { bold: true, color: C.white, fontSize: 15, breakLine: true } },
    { text: "Host · Moderator · Community & Partnerships", options: { color: C.ice, fontSize: 12.5 } },
  ], { x: 7.25, y: 3.6, w: 5.3, h: 2.5, fontFace: F.body, margin: 0, lineSpacingMultiple: 1.15 });

  s.addNotes("Close warm. Reiterate the one-line takeaway: you don't need permission to become a creator — just a small problem and a public repo. Thank the partner communities (Cloud Native Lagos, KCD Nigeria, AWS communities, university groups). Invite them to tag both speakers when they ship.");
  footer(s, true);
}

pres.writeFile({ fileName: "webinar-user-to-creator.pptx" }).then((f) => console.log("WROTE", f));
