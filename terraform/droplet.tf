resource "digitalocean_droplet" "blog" {
    image = "ubuntu-17-04-x64"
    name = "blog"
    region = "sfo2"
    size = "512mb"
    ssh_keys = [
        "${var.ssh_fingerprint}"
    ]

    connection {
        user = "root"
        type = "ssh"
        private_key = "${file("${var.pvt_key}")}"
        timeout = "2m"
    }

    provisioner "remote-exec" {
        inline = [
            "sudo apt-get update",
            "sudo apt-get -y install nginx"
        ]
    }

    provisioner "file" {
        source = "./conf/nginx.conf"
        destination = "/etc/nginx/sites-available/blog"
    }

    provisioner "remote-exec" {
        inline = [
            "ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/",
            "rm -f /etc/nginx/sites-enabled/default"
        ]
    }
}
