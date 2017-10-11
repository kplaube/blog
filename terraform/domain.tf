resource "digitalocean_domain" "blog" {
    name = "${var.hostname}"
    ip_address = "${digitalocean_droplet.blog.ipv4_address}"
}

resource "digitalocean_record" "CNAME-www" {
    domain = "${digitalocean_domain.blog.name}"
    type = "CNAME"
    name = "WWW"
    value = "@"
}

resource "digitalocean_record" "TXT-google-site-verification" {
    domain = "${digitalocean_domain.blog.name}"
    type = "TXT"
    name = "@"
    value = "${var.google_site_verification}"
}

resource "digitalocean_record" "MX-aspmx" {
    domain = "${digitalocean_domain.blog.name}"
    type = "MX"
    name = "@"
    value ="aspmx.l.google.com."
    priority = 1
}

resource "digitalocean_record" "MX-alt1-aspmx" {
    domain = "${digitalocean_domain.blog.name}"
    type = "MX"
    name = "@"
    value ="alt1.aspmx.l.google.com."
    priority = 5
}

resource "digitalocean_record" "MX-alt2-aspmx" {
    domain = "${digitalocean_domain.blog.name}"
    type = "MX"
    name = "@"
    value ="alt2.aspmx.l.google.com."
    priority = 5
}

resource "digitalocean_record" "MX-alt3-aspmx" {
    domain = "${digitalocean_domain.blog.name}"
    type = "MX"
    name = "@"
    value ="alt3.aspmx.l.google.com."
    priority = 10
}

resource "digitalocean_record" "MX-alt4-aspmx" {
    domain = "${digitalocean_domain.blog.name}"
    type = "MX"
    name = "@"
    value ="alt4.aspmx.l.google.com."
    priority = 10
}
