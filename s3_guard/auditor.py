from __future__ import annotations

import boto3
from botocore.config import Config

from .checks import ALL_CHECKS, SEVERITY_ORDER, Finding


def make_client(endpoint_url: str | None = None, region: str = "us-east-1",
                profile: str | None = None):
    # endpoint_url lets tests point at LocalStack or moto instead of real AWS.
    session = boto3.Session(profile_name=profile) if profile else boto3.Session()
    return session.client(
        "s3",
        endpoint_url=endpoint_url,
        region_name=region,
        config=Config(retries={"max_attempts": 2, "mode": "standard"}),
    )


def list_buckets(client) -> list[str]:
    resp = client.list_buckets()
    return [b["Name"] for b in resp.get("Buckets", [])]


def audit_bucket(client, bucket: str) -> list[Finding]:
    findings: list[Finding] = []
    for check in ALL_CHECKS:
        result = check(client, bucket)
        if result is not None:
            findings.append(result)
    return findings


def audit(client, buckets: list[str] | None = None) -> list[Finding]:
    targets = buckets if buckets else list_buckets(client)
    findings: list[Finding] = []
    for bucket in targets:
        findings.extend(audit_bucket(client, bucket))

    findings.sort(
        key=lambda f: (-SEVERITY_ORDER.get(f.severity, 0), f.bucket, f.check)
    )
    return findings
