python:
  pkg.installed:
    - version: 2.7.3

python-pip:
  pkg.installed

virtualenv:
  pip.installed:
    - require:
      - pkg: python-pip
