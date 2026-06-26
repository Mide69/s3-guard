# Log target bucket — needs BucketOwnerPreferred + log-delivery-write ACL
# so the S3 log-delivery service can write into it.
resource "aws_s3_bucket" "logs" {
  bucket        = "${var.prefix}-logs-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "logs" {
  depends_on = [aws_s3_bucket_ownership_controls.logs]
  bucket     = aws_s3_bucket.logs.id
  acl        = "log-delivery-write"
}

resource "aws_s3_bucket_public_access_block" "logs" {
  bucket                  = aws_s3_bucket.logs.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_versioning" "logs" {
  bucket = aws_s3_bucket.logs.id
  versioning_configuration { status = "Enabled" }
}


# =============================================================================
# SINGLE-ISSUE BUCKETS
# =============================================================================

# 1. all-issues — CRITICAL + MEDIUM + LOW
# NOTE: HIGH (encryption) will not fire on modern AWS (auto-SSE since Jan 2023)
resource "aws_s3_bucket" "all_issues" {
  bucket        = "${var.prefix}-all-issues-${random_id.suffix.hex}"
  force_destroy = true
}


# 2. pub-only — CRITICAL
# Public Access Block resource exists but all four flags are explicitly false.
resource "aws_s3_bucket" "pub_only" {
  bucket        = "${var.prefix}-pub-only-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "pub_only" {
  bucket                  = aws_s3_bucket.pub_only.id
  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "pub_only" {
  bucket = aws_s3_bucket.pub_only.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_versioning" "pub_only" {
  bucket = aws_s3_bucket.pub_only.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_logging" "pub_only" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.pub_only.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "pub-only/"
}


# 3. pub-acls-off — CRITICAL
# Block exists but ACL-related flags are false (BlockPublicAcls + IgnorePublicAcls).
resource "aws_s3_bucket" "pub_acls_off" {
  bucket        = "${var.prefix}-pub-acls-off-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "pub_acls_off" {
  bucket                  = aws_s3_bucket.pub_acls_off.id
  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "pub_acls_off" {
  bucket = aws_s3_bucket.pub_acls_off.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_versioning" "pub_acls_off" {
  bucket = aws_s3_bucket.pub_acls_off.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_logging" "pub_acls_off" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.pub_acls_off.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "pub-acls-off/"
}


# 4. pub-policy-off — CRITICAL
# Block exists but policy-related flags are false (BlockPublicPolicy + RestrictPublicBuckets).
resource "aws_s3_bucket" "pub_policy_off" {
  bucket        = "${var.prefix}-pub-policy-off-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "pub_policy_off" {
  bucket                  = aws_s3_bucket.pub_policy_off.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "pub_policy_off" {
  bucket = aws_s3_bucket.pub_policy_off.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_versioning" "pub_policy_off" {
  bucket = aws_s3_bucket.pub_policy_off.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_logging" "pub_policy_off" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.pub_policy_off.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "pub-policy-off/"
}


# 5. enc-only — HIGH (may not fire on modern AWS)
resource "aws_s3_bucket" "enc_only" {
  bucket        = "${var.prefix}-enc-only-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "enc_only" {
  bucket                  = aws_s3_bucket.enc_only.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "enc_only" {
  bucket = aws_s3_bucket.enc_only.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_logging" "enc_only" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.enc_only.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "enc-only/"
}


# 6. ver-disabled — MEDIUM
# Versioning resource is absent — never configured.
resource "aws_s3_bucket" "ver_disabled" {
  bucket        = "${var.prefix}-ver-disabled-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "ver_disabled" {
  bucket                  = aws_s3_bucket.ver_disabled.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "ver_disabled" {
  bucket = aws_s3_bucket.ver_disabled.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_logging" "ver_disabled" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.ver_disabled.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "ver-disabled/"
}


# 7. ver-suspended — MEDIUM
# Versioning was enabled then explicitly suspended — also caught by the check.
resource "aws_s3_bucket" "ver_suspended" {
  bucket        = "${var.prefix}-ver-suspended-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "ver_suspended" {
  bucket                  = aws_s3_bucket.ver_suspended.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "ver_suspended" {
  bucket = aws_s3_bucket.ver_suspended.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_versioning" "ver_suspended" {
  bucket = aws_s3_bucket.ver_suspended.id
  versioning_configuration { status = "Suspended" }
}

resource "aws_s3_bucket_logging" "ver_suspended" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.ver_suspended.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "ver-suspended/"
}


# 8. log-only — LOW
resource "aws_s3_bucket" "log_only" {
  bucket        = "${var.prefix}-log-only-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "log_only" {
  bucket                  = aws_s3_bucket.log_only.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "log_only" {
  bucket = aws_s3_bucket.log_only.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_versioning" "log_only" {
  bucket = aws_s3_bucket.log_only.id
  versioning_configuration { status = "Enabled" }
}


# =============================================================================
# TWO-ISSUE BUCKETS
# =============================================================================

# 9. pub-enc — CRITICAL + HIGH
resource "aws_s3_bucket" "pub_enc" {
  bucket        = "${var.prefix}-pub-enc-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "pub_enc" {
  bucket                  = aws_s3_bucket.pub_enc.id
  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_versioning" "pub_enc" {
  bucket = aws_s3_bucket.pub_enc.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_logging" "pub_enc" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.pub_enc.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "pub-enc/"
}


# 10. pub-ver — CRITICAL + MEDIUM
resource "aws_s3_bucket" "pub_ver" {
  bucket        = "${var.prefix}-pub-ver-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "pub_ver" {
  bucket                  = aws_s3_bucket.pub_ver.id
  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "pub_ver" {
  bucket = aws_s3_bucket.pub_ver.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_logging" "pub_ver" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.pub_ver.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "pub-ver/"
}


# 11. pub-log — CRITICAL + LOW
resource "aws_s3_bucket" "pub_log" {
  bucket        = "${var.prefix}-pub-log-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "pub_log" {
  bucket                  = aws_s3_bucket.pub_log.id
  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "pub_log" {
  bucket = aws_s3_bucket.pub_log.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_versioning" "pub_log" {
  bucket = aws_s3_bucket.pub_log.id
  versioning_configuration { status = "Enabled" }
}


# 12. enc-ver — HIGH + MEDIUM
resource "aws_s3_bucket" "enc_ver" {
  bucket        = "${var.prefix}-enc-ver-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "enc_ver" {
  bucket                  = aws_s3_bucket.enc_ver.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_logging" "enc_ver" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.enc_ver.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "enc-ver/"
}


# 13. enc-log — HIGH + LOW
resource "aws_s3_bucket" "enc_log" {
  bucket        = "${var.prefix}-enc-log-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "enc_log" {
  bucket                  = aws_s3_bucket.enc_log.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "enc_log" {
  bucket = aws_s3_bucket.enc_log.id
  versioning_configuration { status = "Enabled" }
}


# 14. ver-log — MEDIUM + LOW
resource "aws_s3_bucket" "ver_log" {
  bucket        = "${var.prefix}-ver-log-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "ver_log" {
  bucket                  = aws_s3_bucket.ver_log.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "ver_log" {
  bucket = aws_s3_bucket.ver_log.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}


# =============================================================================
# THREE-ISSUE BUCKETS
# =============================================================================

# 15. pub-enc-ver — CRITICAL + HIGH + MEDIUM
resource "aws_s3_bucket" "pub_enc_ver" {
  bucket        = "${var.prefix}-pub-enc-ver-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "pub_enc_ver" {
  bucket                  = aws_s3_bucket.pub_enc_ver.id
  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_logging" "pub_enc_ver" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.pub_enc_ver.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "pub-enc-ver/"
}


# 16. pub-enc-log — CRITICAL + HIGH + LOW
resource "aws_s3_bucket" "pub_enc_log" {
  bucket        = "${var.prefix}-pub-enc-log-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "pub_enc_log" {
  bucket                  = aws_s3_bucket.pub_enc_log.id
  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_versioning" "pub_enc_log" {
  bucket = aws_s3_bucket.pub_enc_log.id
  versioning_configuration { status = "Enabled" }
}


# 17. pub-ver-log — CRITICAL + MEDIUM + LOW
resource "aws_s3_bucket" "pub_ver_log" {
  bucket        = "${var.prefix}-pub-ver-log-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "pub_ver_log" {
  bucket                  = aws_s3_bucket.pub_ver_log.id
  block_public_acls       = false
  ignore_public_acls      = false
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "pub_ver_log" {
  bucket = aws_s3_bucket.pub_ver_log.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}


# 18. enc-ver-log — HIGH + MEDIUM + LOW
resource "aws_s3_bucket" "enc_ver_log" {
  bucket        = "${var.prefix}-enc-ver-log-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "enc_ver_log" {
  bucket                  = aws_s3_bucket.enc_ver_log.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}


# =============================================================================
# COMPLIANT BUCKETS — no findings expected
# =============================================================================

# 19. compliant-a
resource "aws_s3_bucket" "compliant_a" {
  bucket        = "${var.prefix}-compliant-a-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "compliant_a" {
  bucket                  = aws_s3_bucket.compliant_a.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "compliant_a" {
  bucket = aws_s3_bucket.compliant_a.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_versioning" "compliant_a" {
  bucket = aws_s3_bucket.compliant_a.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_logging" "compliant_a" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.compliant_a.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "compliant-a/"
}


# 20. compliant-b
resource "aws_s3_bucket" "compliant_b" {
  bucket        = "${var.prefix}-compliant-b-${random_id.suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "compliant_b" {
  bucket                  = aws_s3_bucket.compliant_b.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "compliant_b" {
  bucket = aws_s3_bucket.compliant_b.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "AES256" }
  }
}

resource "aws_s3_bucket_versioning" "compliant_b" {
  bucket = aws_s3_bucket.compliant_b.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_logging" "compliant_b" {
  depends_on    = [aws_s3_bucket_acl.logs]
  bucket        = aws_s3_bucket.compliant_b.id
  target_bucket = aws_s3_bucket.logs.id
  target_prefix = "compliant-b/"
}
