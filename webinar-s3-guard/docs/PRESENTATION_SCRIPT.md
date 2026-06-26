# From User to Creator — Full Presentation Script (90 minutes)

**Talk:** From user to creator: launching open-source tools that matter in the cloud ecosystem
**Speakers:** Olamide Kosile (lead / technical) · Delightsome Asolo (host / moderator)
**Format:** 90 minutes, beginner-friendly, with a live build

> The verbatim narration below is a guide — speak it naturally, don't read it. Stage
> directions are in *italics*. Timings are cumulative targets. Every slide also has these
> notes embedded in PowerPoint's Presenter View.

| Section | Slides | Budget | Ends at |
|---|---|---|---|
| Welcome & framing | 1–3 | 5 min | 0:05 |
| Part 1 — The engineering mindset | 4–8 | 17 min | 0:22 |
| Part 2 — Open source in the cloud | 9–12 | 13 min | 0:35 |
| Part 3 — Finding a problem | 13–16 | 11 min | 0:46 |
| Part 4 — Live build & demo | 17–24 | 28 min | 1:14 |
| Part 5 — From code to community | 25–29 | 9 min | 1:23 |
| Challenge & Q&A | 30–31 | 7 min | 1:30 |

---

## Welcome & framing — 5 min

### Slide 1 — Title  *(Delightsome opens, then hands to Olamide)*

**Delightsome:** "Welcome, everyone, and thank you for spending the next 90 minutes with us. Quick housekeeping: you're muted on entry, drop questions in the chat at any time, and we'll have dedicated Q&A at the end. This session is being recorded and we'll share the slides and the project repo afterwards. I'm Delightsome Asolo, I'll be your host — and I'm joined by our lead speaker, Olamide."

**Olamide:** "Thanks, Delightsome. Here's my promise for today, and it's a big one: by the time we finish, you will have watched a real, useful, open-source cloud tool get built from an empty folder and run live — and you'll know exactly how to do the same thing yourself. Every single one of you already uses the cloud every day. Today, you stop being *only* a user."

### Slide 2 — Speakers

**Delightsome:** "Thirty seconds on why you should listen to us. Olamide is a Senior Multi-Cloud and DevOps Engineer, an AWS Community Builder, and 5x AWS Certified — but more importantly, everything you'll see today comes from real production experience, not theory. I'm a Cloud Engineer and an AWS Student Community Leader, and I care a lot about helping people make exactly the leap we're talking about today."

### Slide 3 — What you'll leave with

**Olamide:** "Here's the map. We start with mindset — the single most important shift. Then where open source fits in a cloud career. Then we find a real problem, *build* the tool to solve it live, and finally launch it and turn it into something that grows your career. The heart of the talk is parts 4 and 5. One thing — for the first half, just listen. When we get to the build, you *can* follow along, because we use a free local sandbox: no AWS account, no credit card, nothing to install but Python."

---

## Part 1 — The engineering mindset — 17 min

### Slide 4 — Part 1 divider

**Olamide:** "Part one. Before we touch a single line of code, we have to talk about how you think. Because the tools don't matter if this part doesn't land." *(Audience interaction — do this:)* "Quick show of hands — how many of you would call yourself an engineer?" *(pause, most hands up)* "Keep your hand up if you've ever built a tool that someone else — a teammate, a stranger on the internet — actually uses." *(pause, watch most hands drop)* "That gap, between the hands that stayed up and the hands that dropped — that's the entire reason we're here today."

### Slide 5 — Technician vs. Engineer  *(THE anchor slide — slow down)*

**Olamide:** "Here's the distinction I want to burn into your memory. A technician *uses and maintains* tools. An engineer *builds* tools to solve problems. Now — hear me clearly: both are valuable. A great technician keeps the world running, and most of us spend part of our careers here. But they are *different mindsets.*

The technician operates the tools other people built, follows the runbook, fixes today's broken thing. The engineer creates the tools, *questions* the runbook, and removes the entire class of problem so it never comes back. The technician asks 'how do I use this?' The engineer asks 'why does this problem even exist?'

Here's what the cloud did: it gave every one of us technician-level superpowers. You can spin up a server in 60 seconds. That used to be a specialist's job. So that skill is now common. The scarcity — and the opportunity — has moved to *building.*"

*(Personal story — tell your own version, ~60 sec:)* "The first time I crossed this line, I was doing the same manual check over and over — [your real example]. One day instead of following the steps again, I wrote a script that did them for me. That tiny moment — automating the thing the runbook described instead of just doing it — that's when I became an engineer. Key line: **a certificate proves you can use the cloud; a tool you built proves you can engineer it.**"

### Slide 6 — User vs. Creator

**Olamide:** "Same idea, mapped onto the cloud. A user consumes services; a creator builds things others depend on. A user reads the AWS docs; a creator writes the tool the docs are missing. A user has skills sitting in a private repo; a creator has *proof* in a public one. And the difference in visibility is everything — a user is visible to one employer, a creator is visible to the whole ecosystem.

And please hear this: 'creator' does not mean you have to build the next Kubernetes. It means you noticed a gap and shipped something — even 100 lines — that someone else can install. That right-hand column is the entire goal of today, and by the end you'll have crossed every row."

### Slide 7 — The shift: notice → own → ship

**Olamide:** "So how are creators actually made? It's a four-step loop. You *notice* a small, repeated, annoying problem. You *own it* — you realize *you* can fix this, you don't have to wait for AWS or some vendor. You *build* — and the most important word here is **small.** The number one reason first projects die is scope. Then you *ship* — you make it public, and the moment you do, it stops being effort and becomes proof. We are going to run this exact loop, live, in about forty minutes. Open a notes app this week and write down every small thing that annoys you in your cloud work — those are your project ideas."

### Slide 8 — Why this matters now

**Olamide:** "Why now? Because training and certifications have never been more accessible — which means they no longer *set you apart.* Knowing the concepts is table-stakes. *Showing* what you've built is the differentiator. And public work is forkable, permanent, and global.

This is the real problem we're solving today: the gap most engineers face is **not** skill and it's **not** drive. It's direction and visibility. Most talented people's best work is buried in a private repo earning zero professional equity. Open source is the fastest way to turn the skills you already have into something employers and communities can actually see."

---

## Part 2 — Open source in the cloud — 13 min

### Slide 9 — Part 2 divider

**Delightsome:** "So let's talk about the playground where all of this happens — open source in the cloud."

### Slide 10 — The cloud runs on open source

**Olamide:** "Here's something people forget: open source isn't a side-hobby separate from 'real' cloud work. It *is* the cloud. Kubernetes orchestrates containers everywhere. Terraform and OpenTofu are how we build infrastructure. boto3 and the AWS SDKs are literally how your code talks to AWS. Prometheus, Grafana, Docker — all open source. And notice LocalStack and moto there — tools that emulate AWS on your laptop. We'll use moto in the live build today, which means we'll be *using* an open-source cloud tool *while building one.* Every one of these started as someone deciding to solve a problem in the open."

### Slide 11 — What you gain by creating

**Olamide:** "What's in it for you? Four things. A living portfolio — verifiable, forkable, and alive; it works while you sleep, getting read by recruiters when you're not in the room. Global visibility and credibility that accelerates hiring and promotion. Real collaboration with experienced engineers across organizations. And production-grade skills, working with the exact technologies industry uses."

### Slide 12 — What makes a tool actually matter

**Olamide:** "Before we build, the rubric. A tool that matters: one, solves a *real* pain — cost, security, time, or visibility, something people *feel.* Two, has a small surface area — does one thing well. Three, is easy to install and run — friction kills adoption. And four — write this down — a great README is about *half* of why a tool ever gets adopted. Most engineers over-invest in features and under-invest in the README. A clear README with a screenshot beats a clever feature nobody can figure out how to run. Keep these four in your head; we'll hold our own tool to them."

---

## Part 3 — Finding a problem worth solving — 11 min

### Slide 13 — Part 3 divider

**Olamide:** "Now the fun part — finding something worth building."

### Slide 14 — How to find problems worth solving

**Olamide:** "Where do good projects come from? Four places. Your daily friction — the command you keep re-typing, the check you keep doing by hand. The scary gap — that 'I hope nobody misconfigured that...' feeling; automate the worry away. The onboarding pain — whatever confused you on day one will confuse the next person. And the expensive surprise — the bill, the outage, the breach you want to prevent. Our pick today lives squarely in 'the scary gap.'"

### Slide 15 — The problem: S3 misconfigurations

**Olamide:** "Here's our problem: misconfigured S3 buckets. Why S3? It's everywhere — almost every AWS workload uses it. A single wrong setting can expose data to the entire internet. And leaky S3 buckets are a perennial cause of real breaches — you've seen the headlines. Here's the kicker: the fixes are *simple settings.* The real problem isn't difficulty, it's *consistency* — nobody checks every bucket every time. And that is *exactly* the kind of problem a tool solves. We'll catch four risks: public access — critical; no encryption — high; no versioning — medium; and no logging — low. Those four severities will show up in our demo in a minute."

### Slide 16 — Meet s3-guard

**Olamide:** "So here's what we're going to build: s3-guard. A tiny open-source CLI that scans your S3 buckets, flags those four misconfigurations, and prints a clean, colour-coded report. Four checks, beautiful output with a JSON mode, CI-ready so it can fail a pipeline, and extensible — you can add a new check in about ten lines. The stack is deliberately beginner-friendly: Python, boto3, Typer for the CLI, and Rich for the pretty output. Let's build it."

---

## Part 4 — Live build & demo — 28 min  *(switch to editor + terminal)*

> *Slides 17–24 are your safety net. Drive from the editor and terminal; flip back to a
> slide only if a command is running or something hiccups. Keep narrating the WHY.*

### Slide 17 — Part 4 divider

**Olamide:** "This is the centerpiece. I'm switching to my editor and terminal now. Reminder: no AWS account, no Docker — we use moto, a fake AWS that runs in Python. If you want to follow along, you can; if you'd rather just watch, that's great too."

### Slide 18 — The safe sandbox  *(run these live)*

**Olamide:** "The trick that makes a live *cloud* demo safe and repeatable: instead of pointing at real AWS, we point at a local fake. I'll start moto's server — `python -m moto.server -p 5000`. Now I have a fake S3 on my laptop. I'll seed some deliberately broken buckets with our seed script. And then I'll scan them. Notice the `--endpoint-url` flag — that same flag could point at LocalStack, or if I *remove* it, at real AWS. Designing your tool around an endpoint URL is *why* it's testable. That's a real engineering lesson, not just a demo trick."

### Slide 19 — How s3-guard is built  *(open the files in order)*

**Olamide:** "Let me show you the shape of the code — it's three small files. `checks.py` — one tiny function per security check; each returns a 'Finding' or nothing. `auditor.py` — connects to S3, runs every check on every bucket, sorts the worst problems to the top. `cli.py` — the Typer command and the Rich report; the part the user touches. The important habit here: the checks don't know *how* results are displayed, and the CLI doesn't know *how* S3 works. Separating 'what to check' from 'how to show it' is what makes this easy to read, test, and extend. That's how senior engineers structure code."

### Slide 20 — A check is ~10 lines  *(vibecode the remaining checks live)*

**Olamide:** "Here's the whole idea in one function. A check asks AWS a question — 'is versioning enabled?' If the answer is safe, return nothing. Otherwise, return a Finding that describes the problem. That's it. An API call and an if-statement. If you can read this, you can write one. Let me build the next check live with an AI assistant — and watch how I describe the *intent* first, then let it draft the code, then I read every line and adjust. The AI is the junior pair; *you're* still the engineer making the decisions."

### Slide 21 — Three buckets, on purpose  *(run seed_buckets.py)*

**Olamide:** "Before I scan, I need something to find. I'm seeding three buckets on purpose. `tek-public-data` — wide open, nothing configured. `tek-logs-unsafe` — half-done: encrypted and locked, but no versioning or logging. And `tek-secure-backups` — the gold standard, locked down on all four. That last one matters: a security tool that *only* ever screams is useless. A good tool also tells you 'this one is fine.'"

### Slide 22 — s3-guard catches them all  *(THE payoff — run the scan)*

**Olamide:** *(run `s3-guard scan --endpoint-url http://localhost:5000`, then pause)* "And there it is. Look at this. Critical floats to the top — public access on the wide-open bucket. Then high — no encryption. Two mediums, two lows. And notice the gold-standard bucket produced *nothing* — exactly right. The summary line, and the exit code is 1 — which is the thing that lets this gate a CI pipeline. *(pause, let it land)* That — right there — is a real, useful tool. You just watched one get built and run. If you did nothing else this week but recreate this, you'd have crossed from user to creator."

### Slide 23 — Extend it live, then break it  *(two live moments)*

**Olamide:** "Two quick things to make this real. First — let's *extend* it. I'll add a new check — say, logging — in about ten lines, add it to the `ALL_CHECKS` list, re-run, and... a new finding appears. We just shipped a feature.

Second — and this is the most useful thing I can show beginners — let me *break* it on purpose." *(introduce a typo, run it)* "Look — a traceback. This is normal. This is not failure. Watch what I do: I read the error, I find the line, I form a hypothesis, I fix it, I re-run. That calm loop, right there, is 90% of real engineering. Errors are information, not judgment."

### Slide 24 — Wire it into CI/CD

**Olamide:** "Last piece of the build. Because s3-guard exits non-zero when it finds risk, you can drop it straight into a CI pipeline — `pip install`, then `s3-guard scan --fail-level CRITICAL` — and the build *fails* before insecure infrastructure ever ships. That's how a 100-line tool becomes part of a real team's safety net. Our repo already ships a GitHub Actions workflow that runs the tests on every push."

---

## Part 5 — From code to community — 9 min

### Slide 25 — Part 5 divider

**Delightsome:** "Okay — you've built a tool. But a tool nobody can find helps nobody. Let's launch it properly."

### Slide 26 — The launch checklist

**Olamide:** "Six steps, and our repo already has all six. Push to a public GitHub repo with a clear name. Add a LICENSE — MIT keeps it simple. Write the README. Package it with a `pyproject.toml` so people can `pip install` it — and that one entry in `[project.scripts]` is what turns your package into a real command. Add CI so tests run on every push and people trust it. And announce it. Do step six *today* if you build something — and tag both of us."

### Slide 27 — The README is ~50% of adoption

**Olamide:** "I said I'd come back to this. Your README is the single most under-rated file in your project. It should answer, fast: what is this, why should I care, how do I install it, how do I use it, and — show me — a screenshot or sample output. Why does it decide everything? It's the first and often *only* thing people read. A screenshot earns trust in two seconds. And it's doing triple duty — it's sales, it's onboarding, *and* it's your portfolio piece that recruiters read. Engineers love features and neglect docs; the market rewards the opposite."

### Slide 28 — First users, contributors & your CV

**Olamide:** "How do you get momentum? Share the *story*, not just the link — people share narratives, not READMEs. Post the problem and the fix. Invite contributions by adding a few 'good first issue' tasks — that's literally how you attract your first collaborators. Engage communities — Cloud Native, KCD, AWS groups, your university tech community. And put it on your CV and LinkedIn — because this is now a concrete, link-able achievement. That's the visibility this whole talk is about."

### Slide 29 — Your 30-day creator roadmap

**Olamide:** "Don't let this be a one-off. Here's a 30-day plan. This week: ship s3-guard or your own idea, make the repo public. Week two: add one feature and one test, and put a screenshot in the README. Week three: announce it, open a couple of 'good first issues.' Week four: contribute to someone *else's* project — reply to an issue, send a small PR. That last step closes the loop: creators are also better users and better community members. Consistency beats intensity — four small weeks gives you a visible, living body of work."

---

## Challenge & Q&A — 7 min

### Slide 30 — Your challenge + Q&A

**Olamide:** "Here's your homework, and I mean it: add one new feature to s3-guard this week — a new check, an HTML report, multi-profile scanning, or your own idea — and tag us when you do. We will look at every single one.

Now — questions. Ask us anything: cloud, careers, or code." *(If the room is quiet, seed it:)* "The most common question we get is 'how do I pick my first project?' The answer is the smallest thing that annoyed you this week."

*(Delightsome moderates the chat, batches questions, watches the clock — keep this to ~5 min.)*

### Slide 31 — Thank you & resources

**Delightsome:** "That's our time. Everything's in the repo — the tool, the demo runbook, and the tests — link on screen. Huge thanks to our partner communities for helping us reach you, and thank you all for being here."

**Olamide:** "One last line, and it's the whole talk in a sentence: you don't need anyone's permission to become a creator. You just need a small problem and a public repo. Go build the thing only you noticed. Thank you."

---

## Demo command cheat-sheet  *(keep this open in a second window)*

```bash
# one-time, in the project venv:
pip install -e ".[dev]" "moto[server]" flask

# Terminal 1 — fake S3 (leave running):
python -m moto.server -p 5000

# Terminal 2:
export AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test AWS_DEFAULT_REGION=us-east-1
python scripts/seed_buckets.py --endpoint-url http://localhost:5000
s3-guard scan --endpoint-url http://localhost:5000
s3-guard scan --endpoint-url http://localhost:5000 --json
s3-guard scan --endpoint-url http://localhost:5000 --fail-level CRITICAL; echo "exit=$?"
```

> Tip: set your terminal font large, and on Windows run `set PYTHONIOENCODING=utf-8`
> (PowerShell: `$env:PYTHONIOENCODING="utf-8"`) so the report's box-drawing renders cleanly.
> Full step-by-step, plus the "extend it / break it" moves, are in `DEMO_RUNBOOK.md`.
