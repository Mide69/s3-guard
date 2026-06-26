# Deployment Guide

## Prerequisites

- Python 3.9+
- Terraform 1.5+
- AWS CLI v2 with active credentials

Verify everything is ready:

```bash
python --version
terraform version
aws sts get-caller-identity
```

If the last command returns your account ID you're good to go. If not, log in first:

```bash
aws sso login --profile <your-profile>
export AWS_PROFILE=<your-profile>        # bash
$env:AWS_PROFILE = "<your-profile>"      # PowerShell
```

---

## 1. Install s3-guard

Run this from the project root:

```bash
pip install -e .
```

---

## 2. Deploy the demo infrastructure

```bash
cd terraform
terraform init
terraform apply
```

Type `yes` when prompted. This creates 20 intentionally misconfigured S3 buckets plus a log target bucket — about 30 seconds on a normal connection.

---

## 3. Run the scan

After apply, Terraform prints a `scan_command` output. Copy and run it:

```bash
# bash
eval $(terraform output -raw scan_command)

# PowerShell
Invoke-Expression (terraform output -raw scan_command)
```

Or paste the command manually — it looks like:

```bash
s3-guard scan -b s3guard-demo-all-issues-a1b2c3d4 -b s3guard-demo-pub-only-a1b2c3d4 ...
```

To get JSON output instead of the table:

```bash
s3-guard scan -b <bucket> --json
```

---

## 4. Tear down

```bash
terraform destroy
```

Type `yes`. All buckets and their contents are deleted.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `NoCredentials` | Run `aws sso login --profile <name>` and export `AWS_PROFILE` |
| `Token has expired` | Re-run `aws sso login --profile <name>` |
| `BucketAlreadyExists` | Change the prefix: `terraform apply -var="prefix=yourname-demo"` |
| `s3-guard: command not found` | Run `pip install -e .` from the project root |
