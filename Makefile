HOST='localhost'
PRODUCTION_HOST=192.241.239.141

SITEURL='http://localhost:8000'
PRODUCTION_SITEURL='http://klauslaube.com.br'

BASE_DIR=$(CURDIR)
OUTPUT_DIR=$(BASE_DIR)/output
CONF_FILE=$(BASE_DIR)/pelicanconf.py
REMOTE_OUTPUT_DIR=/srv/blog

help:
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make clean                       Remove the generated files         '
	@echo '   make help                        This screen                        '
	@echo '   make html                        Generate articles                  '
	@echo '   make publish                     Publish articles                   '
	@echo '   make run                         Serve site at http://localhost:8000'
	@echo '   make setup                       Install all project dependencies   '
	@echo '   make stop_server                 Stop the site server               '
	@echo '                                                                       '

clean:
	find $(OUTPUT_DIR) -mindepth 1 -delete

html: clean
	SITEURL=$(SITEURL) pelican content -s $(CONF_FILE)

prod:
	@$(eval SITEURL := $(PRODUCTION_SITEURL))
	@$(eval HOST := $(PRODUCTION_HOST))

publish: html
	rsync -Cravzp $(OUTPUT_DIR)/* $(user)@$(HOST):$(REMOTE_OUTPUT_DIR)/

run:
	$(BASE_DIR)/develop_server.sh restart 8000

setup: _install_python_dependencies _install_pelican_plugins
	@mkdir -p $(OUTPUT_DIR)

stop_server:
	$(BASE_DIR)/develop_server.sh stop

_install_python_dependencies:
	pip install -r requirements.txt

_install_pelican_plugins:
	test -d "vendor" || git submodule add https://github.com/getpelican/pelican-plugins.git vendor
	test -d "plugins/extended_meta" || git submodule add https://github.com/kplaube/extended_meta.git plugins/extended_meta
	git submodule update --init --recursive


.PHONY: prod clean html run publish setup stop_server
