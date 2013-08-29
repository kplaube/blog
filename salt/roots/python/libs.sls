python-pip:
  pkg.installed

virtualenv:
  pip.installed:
    - require:
      - pkg: python-pip
