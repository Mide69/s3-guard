"""Create a handful of deliberately misconfigured buckets so we have something
for s3-guard to catch during the demo.

Run this against moto or LocalStack (NOT real AWS) via --endpoint-url:

    python scripts/seed_buckets.py --endpoint-url http://localhost:5000

It creates:
  * tek-public-data    — wide open: no public access block, no encryption, etc.
  * tek-logs-unsafe    — encrypted but no versioning and no logging
  * tek-secure-backups — the "good" bucket: locked down on every check
"""

from __future__ import annotations

import argparse

import boto3


def make_client(endpoint_url: str, region: str):
    return boto3.client(
        "s3",
        endpoint_url=endpoint_url,
        region_name=region,
        aws_access_key_id="test",
        aws_secret_access_key="test",
    )


def create_bucket(client, name: str, region: str):
    if region == "us-east-1":
        client.create_bucket(Bucket=name)
    else:
        client.create_bucket(
            Bucket=name,
            CreateBucketConfiguration={"LocationConstraint": region},
        )


def lock_down(client, name: str):
    """Apply all four checks' best-practice settings to a bucket."""
    # Grant the log-delivery group access before turning logging on.
    client.put_bucket_acl(
        Bucket=name,
        GrantWrite="uri=http://acs.amazonaws.com/groups/s3/LogDelivery",
        GrantReadACP="uri=http://acs.amazonaws.com/groups/s3/LogDelivery",
    )
    client.put_bucket_logging(
        Bucket=name,
        BucketLoggingStatus={
            "LoggingEnabled": {"TargetBucket": name, "TargetPrefix": "logs/"}
        },
    )
    client.put_bucket_encryption(
        Bucket=name,
        ServerSideEncryptionConfiguration={
            "Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]
        },
    )
    client.put_bucket_versioning(
        Bucket=name, VersioningConfiguration={"Status": "Enabled"}
    )
    client.put_public_access_block(
        Bucket=name,
        PublicAccessBlockConfiguration={
            "BlockPublicAcls": True,
            "IgnorePublicAcls": True,
            "BlockPublicPolicy": True,
            "RestrictPublicBuckets": True,
        },
    )


def main():
    parser = argparse.ArgumentParser(description="Seed demo S3 buckets.")
    parser.add_argument(
        "--endpoint-url", default="http://localhost:5000",
        help="moto/LocalStack endpoint (default: http://localhost:5000).",
    )
    parser.add_argument("--region", default="us-east-1")
    args = parser.parse_args()

    client = make_client(args.endpoint_url, args.region)

    # 1. The nightmare bucket — nothing configured.
    create_bucket(client, "tek-public-data", args.region)

    # 2. Partially configured — encrypted, but no versioning/logging.
    create_bucket(client, "tek-logs-unsafe", args.region)
    client.put_bucket_encryption(
        Bucket="tek-logs-unsafe",
        ServerSideEncryptionConfiguration={
            "Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]
        },
    )
    client.put_public_access_block(
        Bucket="tek-logs-unsafe",
        PublicAccessBlockConfiguration={
            "BlockPublicAcls": True,
            "IgnorePublicAcls": True,
            "BlockPublicPolicy": True,
            "RestrictPublicBuckets": True,
        },
    )

    # 3. The gold-standard bucket — should produce zero findings.
    create_bucket(client, "tek-secure-backups", args.region)
    lock_down(client, "tek-secure-backups")

    print("Seeded 3 demo buckets at", args.endpoint_url)
    print("  - tek-public-data     (wide open)")
    print("  - tek-logs-unsafe     (no versioning, no logging)")
    print("  - tek-secure-backups  (fully locked down)")


if __name__ == "__main__":
    main()
