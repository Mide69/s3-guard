"""Tests for s3-guard, using moto to mock S3 entirely in-process.

moto means these tests need no AWS account, no credentials, and no Docker —
they run anywhere, instantly. This is also the same library that powers the
no-Docker live demo.
"""

from __future__ import annotations

import boto3
import pytest
from moto import mock_aws

from s3_guard.auditor import audit, audit_bucket
from s3_guard.checks import (
    check_encryption,
    check_logging,
    check_public_access,
    check_versioning,
)

REGION = "us-east-1"


@pytest.fixture
def s3():
    with mock_aws():
        yield boto3.client("s3", region_name=REGION)


def _lock_down(s3, name):
    # The log-delivery group needs write access to the logging target bucket;
    # grant it before enabling logging (matches real-world S3 requirements).
    s3.put_bucket_acl(
        Bucket=name,
        GrantWrite="uri=http://acs.amazonaws.com/groups/s3/LogDelivery",
        GrantReadACP="uri=http://acs.amazonaws.com/groups/s3/LogDelivery",
    )
    s3.put_bucket_logging(
        Bucket=name,
        BucketLoggingStatus={
            "LoggingEnabled": {"TargetBucket": name, "TargetPrefix": "logs/"}
        },
    )
    s3.put_bucket_encryption(
        Bucket=name,
        ServerSideEncryptionConfiguration={
            "Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]
        },
    )
    s3.put_bucket_versioning(Bucket=name, VersioningConfiguration={"Status": "Enabled"})
    s3.put_public_access_block(
        Bucket=name,
        PublicAccessBlockConfiguration={
            "BlockPublicAcls": True,
            "IgnorePublicAcls": True,
            "BlockPublicPolicy": True,
            "RestrictPublicBuckets": True,
        },
    )


# --------------------------------------------------------------------------- #
# Individual checks flag a brand-new (default) bucket.
# --------------------------------------------------------------------------- #

def test_new_bucket_flags_public_access(s3):
    s3.create_bucket(Bucket="bad")
    finding = check_public_access(s3, "bad")
    assert finding is not None
    assert finding.severity == "CRITICAL"


def test_new_bucket_flags_encryption(s3):
    s3.create_bucket(Bucket="bad")
    finding = check_encryption(s3, "bad")
    assert finding is not None
    assert finding.check == "encryption"


def test_new_bucket_flags_versioning(s3):
    s3.create_bucket(Bucket="bad")
    finding = check_versioning(s3, "bad")
    assert finding is not None
    assert finding.severity == "MEDIUM"


def test_new_bucket_flags_logging(s3):
    s3.create_bucket(Bucket="bad")
    finding = check_logging(s3, "bad")
    assert finding is not None
    assert finding.severity == "LOW"


# --------------------------------------------------------------------------- #
# A fully locked-down bucket produces no findings.
# --------------------------------------------------------------------------- #

def test_locked_down_bucket_is_clean(s3):
    s3.create_bucket(Bucket="good")
    _lock_down(s3, "good")
    assert audit_bucket(s3, "good") == []


# --------------------------------------------------------------------------- #
# End-to-end: a mix of buckets, sorted worst-first.
# --------------------------------------------------------------------------- #

def test_audit_sorts_worst_first(s3):
    s3.create_bucket(Bucket="wide-open")  # all four problems
    s3.create_bucket(Bucket="locked")
    _lock_down(s3, "locked")

    findings = audit(s3)

    # Only the wide-open bucket should appear, four times.
    assert {f.bucket for f in findings} == {"wide-open"}
    assert len(findings) == 4
    # Critical must sort to the top.
    assert findings[0].severity == "CRITICAL"


def test_audit_specific_bucket_only(s3):
    s3.create_bucket(Bucket="wide-open")
    s3.create_bucket(Bucket="ignore-me")
    findings = audit(s3, buckets=["wide-open"])
    assert {f.bucket for f in findings} == {"wide-open"}
