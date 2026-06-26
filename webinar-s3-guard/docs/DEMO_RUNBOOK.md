# s3-guard — live demo runbook

Two ways to demo. **Path A (no Docker)** is the safe webinar default. **Path B**
scans a real AWS account — great if you have a sandbox account handy.

---

## Path A — local fake S3 (no AWS account, no Docker, no bill)

Open **two terminals** in the project folder with the venv activated.

**Terminal 1 — start the fake S3 server (leave it running):**

```bash
python -m moto.server -p 5000
```

**Terminal 2 — seed broken buckets, then scan:**

```bash
export AWS_ACCESS_KEY_ID=test AWS_SECRET_ACCESS_KEY=test AWS_DEFAULT_REGION=us-east-1

python scripts/seed_buckets.py --endpoint-url http://localhost:5000
s3-guard scan --endpoint-url http://localhost:5000
```

You should see `tek-public-data` and `tek-logs-unsafe` flagged, and
`tek-secure-backups` clean.

### The "extend it live" moment

The `logging` check is already in `checks.py`. To show how easy extending is,
**delete it from `ALL_CHECKS`** before the talk, then add it back live:

1. Open `s3_guard/checks.py`, scroll to `check_logging` — read how short it is.
2. Add `check_logging` to the `ALL_CHECKS` list at the bottom.
3. Re-run `s3-guard scan --endpoint-url http://localhost:5000` — a new LOW
   finding appears. "We just shipped a feature."

### The "break it and fix it" moment

Introduce a typo (e.g. rename `LoggingEnabled` to `LoggingEnabledX` in
`check_logging`), run the scan, read the traceback together, fix it. Teaches
debugging and keeps it real.

---

## Path B — scan a REAL AWS account (read-only)

Every call `s3-guard` makes is read-only (`list_buckets`, `get_bucket_*`). It
never changes anything. Still, use a non-production/sandbox account for a demo.

```bash
# with a named profile:
s3-guard scan --profile my-sandbox --region eu-west-2

# or with SSO:
aws sso login --profile my-sandbox
s3-guard scan --profile my-sandbox
```

Show the JSON mode and the CI gate too:

```bash
s3-guard scan --profile my-sandbox --json
s3-guard scan --profile my-sandbox --fail-level CRITICAL; echo "exit=$?"
```

---

## Pre-flight checklist (run an hour before)

- [ ] `pip install -e ".[dev]" "moto[server]" flask`
- [ ] `pytest -q` → all green
- [ ] Path A produces the report
- [ ] (If using Path B) `aws sts get-caller-identity --profile …` works
- [ ] Terminal font size bumped up for screen-share
- [ ] `seed_buckets.py` already run so buckets exist if the network is flaky
