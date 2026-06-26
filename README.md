# s3-guard

A command-line tool that scans your AWS S3 buckets and flags the misconfigurations that cause real-world data breaches. One command, a colour-coded report, and a CI-ready exit code.

```
┌──────────────────────────────────────── s3-guard findings ─────────────────────────────────────────┐
│ Severity  │ Bucket                          │ Check          │ Problem                              │
├───────────┼─────────────────────────────────┼────────────────┼──────────────────────────────────────┤
│ CRITICAL  │ s3guard-demo-all-issues-a1b2    │ public-access  │ No Public Access Block configured …  │
│ CRITICAL  │ s3guard-demo-pub-only-a1b2      │ public-access  │ Public Access Block is not fully …   │
│ MEDIUM    │ s3guard-demo-ver-disabled-a1b2  │ versioning     │ Versioning is not enabled …          │
│ LOW       │ s3guard-demo-log-only-a1b2      │ logging        │ No access logging …                  │
└───────────┴─────────────────────────────────┴────────────────┴──────────────────────────────────────┘
┌───────────────────────────── Summary ──────────────────────────────┐
│  Scanned and found: 2 critical, 1 medium, 1 low.                   │
└────────────────────────────────────────────────────────────────────┘
```

---

## What it checks

| Check | Severity | What it catches |
|-------|----------|-----------------|
| `public-access` | CRITICAL | S3 Block Public Access not fully enabled — bucket can be exposed to the internet |
| `encryption` | HIGH | No default server-side encryption — objects stored unencrypted at rest |
| `versioning` | MEDIUM | Versioning disabled — overwrites and deletes are unrecoverable |
| `logging` | LOW | No server access logging — no audit trail of who accessed your data |

---

## How it works

Understanding what happens between typing `s3-guard scan` and seeing the report.

### The three modules

```
cli.py  →  auditor.py  →  checks.py
```

- **`checks.py`** — the security rules. One small function per check. Each function asks AWS a question and returns a `Finding` if something is wrong, or `None` if the bucket is clean.
- **`auditor.py`** — the engine. Connects to AWS, loops over every bucket, runs all the checks, and sorts results worst-first.
- **`cli.py`** — the interface. Parses your flags, calls the auditor, and renders the report. Knows nothing about how S3 works — it only knows how to display results.

Each layer has one job and doesn't know about the others. This is what keeps the tool easy to read, test, and extend.

### What a Finding is

Every check either returns `None` (bucket is fine) or a `Finding`:

```python
# checks.py — the data structure every check returns when it finds a problem
@dataclass
class Finding:
    bucket: str       # which bucket
    check: str        # which rule fired, e.g. "public-access"
    severity: str     # CRITICAL | HIGH | MEDIUM | LOW
    message: str      # what is wrong
    remediation: str  # what to do about it
```

`Finding` is the only thing that travels between the three modules.

### How each check works

**`check_public_access`** calls `GetPublicAccessBlock` on the bucket. S3 has four independent flags that must all be `true`:

| Flag | What it blocks |
|------|---------------|
| `BlockPublicAcls` | Requests that set a public ACL |
| `IgnorePublicAcls` | Existing public ACLs on objects |
| `BlockPublicPolicy` | Bucket policies that grant public access |
| `RestrictPublicBuckets` | All public access regardless of policy |

If any flag is `false`, or if no block configuration exists at all, the check returns **CRITICAL**. A single gap is enough for a bad actor to expose the bucket.

> S3 signals "no configuration set" by *throwing an exception* (`NoSuchPublicAccessBlockConfiguration`) rather than returning an empty response. The check catches this and maps it to a CRITICAL finding — the same as having all flags off.

**`check_encryption`** calls `GetBucketEncryption`. If no encryption rule is configured, S3 throws `ServerSideEncryptionConfigurationNotFoundError` and the check returns **HIGH**.

> AWS has auto-enabled SSE-S3 (AES256) on all new buckets since January 2023. On modern accounts this finding will not fire because `GetBucketEncryption` returns the AWS-managed default, even without an explicit config.

**`check_versioning`** calls `GetBucketVersioning` and checks the `Status` field. The check passes only when `Status == "Enabled"`. Both absent and `"Suspended"` produce a **MEDIUM** finding — a suspended bucket is just as unrecoverable as one that never had versioning.

**`check_logging`** calls `GetBucketLogging`. If the response has no `LoggingEnabled` key, the check returns **LOW**. No logging means no audit trail after a breach.

### The scan flow

```
s3-guard scan -b my-bucket --fail-level HIGH
       │
       ▼
cli.py parses flags → builds a boto3 client
       │
       ▼
auditor.audit() is called
  ├── list_buckets() if no -b flag given
  └── for each bucket → audit_bucket()
        ├── check_public_access()  →  Finding | None
        ├── check_encryption()     →  Finding | None
        ├── check_versioning()     →  Finding | None
        └── check_logging()        →  Finding | None
       │
       ▼
all Findings sorted: worst severity first, then bucket name, then check name
       │
       ▼
cli.py renders the Rich table + summary panel
cli.py sets the exit code
```

### How the output is built

The report is rendered by [Rich](https://github.com/Texel/rich). Each severity level gets a distinct colour applied at render time:

| Severity | Style |
|----------|-------|
| CRITICAL | white text on red background |
| HIGH | bold red |
| MEDIUM | yellow |
| LOW | cyan |

The summary panel below the table turns **red** if any findings exist, **green** if the scan is clean.

### Exit codes and CI gating

| Code | Meaning |
|------|---------|
| `0` | No findings at or above `--fail-level` |
| `1` | At least one finding at or above `--fail-level` |
| `2` | Error (connection failure, permission denied, etc.) |

`--fail-level` defaults to `HIGH`. This is what lets s3-guard act as a CI/CD gate — a misconfigured bucket fails the build before it reaches production.

---

## Install

```bash
# clone the repo and install s3-guard as a CLI command
git clone https://github.com/Mide69/s3-guard.git
cd s3-guard
pip install -e .
```

---

## Usage

Scan every bucket in your account:

```bash
# auditor.py calls ListBuckets then runs all 4 checks against every bucket it finds
s3-guard scan
```

Scan specific buckets:

```bash
# skips ListBuckets — auditor.py runs checks only against the buckets you name
s3-guard scan -b my-bucket -b another-bucket
```

Use a named AWS profile and region:

```bash
# cli.py passes the profile to boto3 — credentials are loaded from ~/.aws/config
s3-guard scan --profile prod --region eu-west-2
```

JSON output for pipelines and dashboards:

```bash
# cli.py skips the Rich table and prints raw JSON — one object per Finding
s3-guard scan --json
```

Fail a CI build on critical findings only:

```bash
# cli.py exits with code 1 if any Finding severity >= CRITICAL — gates the pipeline
s3-guard scan --fail-level CRITICAL
```

---

## Deploy 20 demo buckets on real AWS

The `terraform/` directory provisions 20 buckets with deliberate misconfigurations — one for every combination of issues — so you can see the tool catch real findings on a live account.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full walkthrough.

Quick version:

```bash
# provision 20 misconfigured S3 buckets, then run s3-guard against all of them
cd terraform
terraform init
terraform apply
eval $(terraform output -raw scan_command)
```

| Bucket | Issues introduced | Expected findings |
|--------|------------------|-------------------|
| `all-issues` | nothing configured | CRITICAL + MEDIUM + LOW |
| `pub-only` | all public block flags false | CRITICAL |
| `pub-acls-off` | ACL flags off | CRITICAL |
| `pub-policy-off` | policy flags off | CRITICAL |
| `enc-only` | no encryption config | HIGH* |
| `ver-disabled` | versioning never set | MEDIUM |
| `ver-suspended` | versioning suspended | MEDIUM |
| `log-only` | no logging | LOW |
| `pub-enc` … `enc-ver-log` | two/three issue combos | varies |
| `compliant-a`, `compliant-b` | everything correct | none |

> *Encryption finding may not fire — see note in the How it works section above.

---

## Add your own check

1. Write a function in `checks.py`:

```python
# checks.py — a new check function; asks AWS one question, returns a Finding or None
def check_mfa_delete(client, bucket: str) -> Optional[Finding]:
    resp = client.get_bucket_versioning(Bucket=bucket)
    if resp.get("MFADelete") == "Enabled":
        return None
    return Finding(
        bucket=bucket,
        check="mfa-delete",
        severity="LOW",
        message="MFA Delete is not enabled.",
        remediation="Enable MFA Delete to require MFA for permanent object deletion.",
    )
```

2. Add it to `ALL_CHECKS` in `checks.py`:

```python
# checks.py — register the new check; auditor.py picks it up automatically on next run
ALL_CHECKS: list[Check] = [
    check_public_access,
    check_encryption,
    check_versioning,
    check_logging,
    check_mfa_delete,   # ← new line
]
```

That's it. The auditor picks it up automatically on the next run.

---

## Run the tests

```bash
# install dev dependencies (pytest + moto) and run the full test suite locally
pip install -e ".[dev]"
pytest
```

Tests run entirely in-process via [moto](https://github.com/getmoto/moto) — no AWS account or Docker needed.

---

## License

MIT © Olamide Kosile — see [LICENSE](LICENSE).
