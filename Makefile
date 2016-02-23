PRODUCTION_HOST=192.241.239.141

SITEURL=http://localhost:8000
BASEDIR=$(CURDIR)
OUTPUTDIR=$(BASEDIR)/output
CONFFILE=$(BASEDIR)/pelicanconf.py
REMOTEOUTPUTDIR=/srv/blog

help:
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make clean                       Remove the generated files         '
	@echo '   make help                        This screen                        '
	@echo '   make html                        Generate articles                  '
	@echo '   make publish                     Publish articles                   '
	@echo '   make run                         Serve site at http://localhost:8000'
	@echo '   make setup                       Install all project dependencies   '
	@echo '                                                                       '

vagrant:
	@$(eval SITEURL := 'http://local.klauslaube.com.br:8080')
	@$(eval HOST := 'localhost')

prod:
	@$(eval SITEURL := 'http://klauslaube.com.br')
	@$(eval HOST := $(PRODUCTION_HOST))


clean:
	find $(OUTPUTDIR) -mindepth 1 -delete

html: clean
	SITEURL=$(SITEURL) pelican content -s $(CONFFILE)

publish: html
	rsync -Cravzp $(OUTPUTDIR)/* $(user)@$(HOST):$(REMOTEOUTPUTDIR)/

run: html
	cd $(OUTPUTDIR) && python -m pelican.server

setup:
	mkdir -p $(OUTPUTDIR)
	pip install -r requirements.txt
	vagrant plugin install vagrant-salt

.PHONY: vagrant prod clean html run publish setup
