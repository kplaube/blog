variable "do_token" {}
variable "google_site_verification" {}
variable "hostname" {}
variable "pub_key" {}
variable "pvt_key" {}
variable "ssh_fingerprint" {}

provider "digitalocean" {
    token = "${var.do_token}"
}
