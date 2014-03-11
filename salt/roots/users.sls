ubuntu:
  user.present:
    - shell: /bin/bash
    - home: /home/ubuntu
    - password: $6$nmm2fkGT$67./YFbrtqs9SBhOcVEigxOj.PhqXXme41PkOiGIzThIknEKWYAWT2pnoKnQxN8SRkpp68WIgyGDfNGgati6F/
    - enforce_password: False
    - groups:
      - ssh
      - www-data
