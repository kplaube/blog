ubuntu:
  user.present:
    - shell: /bin/bash
    - home: /home/ubuntu
    - password: $6$uWzke5FO$/6cPRGDsHdYM/Zs6DQPm.Zr6QseA.Rhdb1UHTF/wMVycs0So5cyJotTzuFHvMdHsbA4rJYIN1jAqDudTCOXs20
    - enforce_password: False
    - groups:
      - ssh
      - www-data
