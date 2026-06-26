from __future__ import annotations

from dataclasses import dataclass
from typing import Callable, Optional

from botocore.exceptions import ClientError


SEVERITY_ORDER = {"LOW": 1, "MEDIUM": 2, "HIGH": 3, "CRITICAL": 4}


@dataclass
class Finding:
    bucket: str
    check: str       # e.g. "public-access"
    severity: str    # LOW | MEDIUM | HIGH | CRITICAL
    message: str
    remediation: str


Check = Callable[[object, str], Optional[Finding]]


def _is_no_such_error(error: ClientError, *codes: str) -> bool:
    # S3 signals missing configs by raising rather than returning an empty result.
    code = error.response.get("Error", {}).get("Code", "")
    return code in codes


def check_public_access(client, bucket: str) -> Optional[Finding]:
    # All four flags must be on — any gap lets an ACL or policy expose the bucket.
    try:
        resp = client.get_public_access_block(Bucket=bucket)
        cfg = resp["PublicAccessBlockConfiguration"]
        all_blocked = all(
            cfg.get(key, False)
            for key in (
                "BlockPublicAcls",
                "IgnorePublicAcls",
                "BlockPublicPolicy",
                "RestrictPublicBuckets",
            )
        )
        if all_blocked:
            return None
        return Finding(
            bucket=bucket,
            check="public-access",
            severity="CRITICAL",
            message="Public Access Block is not fully enabled - bucket can be exposed publicly.",
            remediation="Enable all four Block Public Access settings on the bucket (or account-wide).",
        )
    except ClientError as error:
        if _is_no_such_error(error, "NoSuchPublicAccessBlockConfiguration"):
            return Finding(
                bucket=bucket,
                check="public-access",
                severity="CRITICAL",
                message="No Public Access Block configured at all - bucket can be exposed publicly.",
                remediation="Enable all four Block Public Access settings on the bucket (or account-wide).",
            )
        raise


def check_encryption(client, bucket: str) -> Optional[Finding]:
    try:
        client.get_bucket_encryption(Bucket=bucket)
        return None
    except ClientError as error:
        if _is_no_such_error(error, "ServerSideEncryptionConfigurationNotFoundError"):
            return Finding(
                bucket=bucket,
                check="encryption",
                severity="HIGH",
                message="No default encryption - objects may be stored unencrypted at rest.",
                remediation="Enable default SSE-S3 (AES256) or SSE-KMS on the bucket.",
            )
        raise


def check_versioning(client, bucket: str) -> Optional[Finding]:
    # Without versioning an accidental overwrite or delete is unrecoverable.
    resp = client.get_bucket_versioning(Bucket=bucket)
    if resp.get("Status") == "Enabled":
        return None
    return Finding(
        bucket=bucket,
        check="versioning",
        severity="MEDIUM",
        message="Versioning is not enabled - overwrites and deletes are unrecoverable.",
        remediation="Enable bucket versioning to protect against accidental or malicious data loss.",
    )


def check_logging(client, bucket: str) -> Optional[Finding]:
    resp = client.get_bucket_logging(Bucket=bucket)
    if resp.get("LoggingEnabled"):
        return None
    return Finding(
        bucket=bucket,
        check="logging",
        severity="LOW",
        message="No access logging - you have no audit trail of who accessed this bucket.",
        remediation="Enable S3 server access logging (or CloudTrail data events) to a separate log bucket.",
    )


ALL_CHECKS: list[Check] = [
    check_public_access,
    check_encryption,
    check_versioning,
    check_logging,
]
