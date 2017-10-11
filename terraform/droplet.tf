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
            "sudo add-apt-repository ppa:certbot/certbot -y",
            "sudo apt-get update",
            "sudo apt-get -y install nginx python-certbot-nginx",
            "sudo ufw allow OpenSSH",
            "sudo ufw allow 80",
            "sudo ufw allow 443",
            "sudo ufw enable",
            "sudo certbot certonly --standalone --preferred-challenges tls-sni -d klauslaube.com.br",
            "sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048"
        ]
    }

    provisioner "file" {
        source = "./terraform/conf/nginx.conf"
        destination = "/etc/nginx/sites-available/blog"
    }

    provisioner "remote-exec" {
        inline = [
            "ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/",
            "rm -f /etc/nginx/sites-enabled/default",
            "sudo service nginx restart"
        ]
    }
}
