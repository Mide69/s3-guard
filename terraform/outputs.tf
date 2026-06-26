locals {
  demo_buckets = [
    aws_s3_bucket.all_issues.id,
    aws_s3_bucket.pub_only.id,
    aws_s3_bucket.pub_acls_off.id,
    aws_s3_bucket.pub_policy_off.id,
    aws_s3_bucket.enc_only.id,
    aws_s3_bucket.ver_disabled.id,
    aws_s3_bucket.ver_suspended.id,
    aws_s3_bucket.log_only.id,
    aws_s3_bucket.pub_enc.id,
    aws_s3_bucket.pub_ver.id,
    aws_s3_bucket.pub_log.id,
    aws_s3_bucket.enc_ver.id,
    aws_s3_bucket.enc_log.id,
    aws_s3_bucket.ver_log.id,
    aws_s3_bucket.pub_enc_ver.id,
    aws_s3_bucket.pub_enc_log.id,
    aws_s3_bucket.pub_ver_log.id,
    aws_s3_bucket.enc_ver_log.id,
    aws_s3_bucket.compliant_a.id,
    aws_s3_bucket.compliant_b.id,
  ]
}

output "bucket_names" {
  description = "All 20 demo bucket names"
  value = {
    "01_all_issues"    = aws_s3_bucket.all_issues.id
    "02_pub_only"      = aws_s3_bucket.pub_only.id
    "03_pub_acls_off"  = aws_s3_bucket.pub_acls_off.id
    "04_pub_policy_off"= aws_s3_bucket.pub_policy_off.id
    "05_enc_only"      = aws_s3_bucket.enc_only.id
    "06_ver_disabled"  = aws_s3_bucket.ver_disabled.id
    "07_ver_suspended" = aws_s3_bucket.ver_suspended.id
    "08_log_only"      = aws_s3_bucket.log_only.id
    "09_pub_enc"       = aws_s3_bucket.pub_enc.id
    "10_pub_ver"       = aws_s3_bucket.pub_ver.id
    "11_pub_log"       = aws_s3_bucket.pub_log.id
    "12_enc_ver"       = aws_s3_bucket.enc_ver.id
    "13_enc_log"       = aws_s3_bucket.enc_log.id
    "14_ver_log"       = aws_s3_bucket.ver_log.id
    "15_pub_enc_ver"   = aws_s3_bucket.pub_enc_ver.id
    "16_pub_enc_log"   = aws_s3_bucket.pub_enc_log.id
    "17_pub_ver_log"   = aws_s3_bucket.pub_ver_log.id
    "18_enc_ver_log"   = aws_s3_bucket.enc_ver_log.id
    "19_compliant_a"   = aws_s3_bucket.compliant_a.id
    "20_compliant_b"   = aws_s3_bucket.compliant_b.id
  }
}

output "scan_command" {
  description = "Ready-to-run s3-guard command targeting all 20 demo buckets"
  value       = "s3-guard scan ${join(" ", [for b in local.demo_buckets : "-b ${b}"])}"
}
