HOST='localhost'
VAGRANT_HOST=$(LOCAL_HOST)
PRODUCTION_HOST=192.241.239.141

SITEURL='http://localhost:8000'
VAGRANT_SITEURL='http://local.klauslaube.com.br:8080'
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

vagrant:
	@$(eval SITEURL := $(VAGRANT_SITEURL))
	@$(eval HOST := $(LOCAL_HOST))

prod:
	@$(eval SITEURL := $(PRODUCTION_SITEURL))
	@$(eval HOST := $(PRODUCTION_HOST))


clean:
	find $(OUTPUT_DIR) -mindepth 1 -delete

html: clean
	SITEURL=$(SITEURL) pelican content -s $(CONF_FILE) --debug

publish: html
	rsync -Cravzp $(OUTPUT_DIR)/* $(user)@$(HOST):$(REMOTE_OUTPUT_DIR)/

run:
	$(BASE_DIR)/develop_server.sh restart 8000

setup:
	mkdir -p $(OUTPUT_DIR)
	pip install -r requirements.txt
	vagrant plugin install vagrant-salt


stop_server:
	$(BASE_DIR)/develop_server.sh stop

.PHONY: vagrant prod clean html run publish setup stop_server
