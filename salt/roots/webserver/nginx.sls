nginx:
  pkg:
    - installed
  service.running:
    - enable: True
    - watch:
      - file: /etc/nginx/sites-available/blog

/etc/nginx/sites-available/blog:
  file.managed:
    - source: salt://webserver/nginx.conf
    - user: root
    - group: root
    - mode: 644
    - template: jinja

/etc/nginx/sites-enabled/blog:
  file.symlink:
    - target: /etc/nginx/sites-available/blog

rm /etc/nginx/sites-enabled/default:
  cmd.run:
    - onlyif:  [ -f /etc/nginx/sites-enabled/default ]

/srv/blog:
  file.directory:
    - user: ubuntu
    - group: www-data
    - dir_mode: 755
