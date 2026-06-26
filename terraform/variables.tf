variable "region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "prefix" {
  description = "Prefix for all bucket names — must be lowercase with no spaces"
  type        = string
  default     = "s3guard-demo"
}
