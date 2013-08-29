/var/www/blog:
  virtualenv.managed:
    - system_site_packages: false

/var/www/blog/bin/pip install -r /vagrant/requirements.txt:
  cmd.run:
    - onlyif: /var/www/blog/bin/easy_install pytz
    - require:
      - virtualenv: /var/www/blog
