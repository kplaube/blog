PELICAN=pelican

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/output
CONFFILE=$(BASEDIR)/pelicanconf.py

help:
	@echo 'Makefile for a pelican Web site                                        '
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make setup				       install all project dependencies   '
	@echo '   make html                        (re)generate the web site          '
	@echo '   make clean                       remove the generated files         '
	@echo '   make publish                     generate using production settings '
	@echo '   make run 	                       serve site at http://localhost:8000'
	@echo '   rsync_upload                     upload the web site via rsync+ssh  '
	@echo '                                                                       '


html: clean
	pelican content -s $(CONFFILE)

clean:
	find $(OUTPUTDIR) -mindepth 1 -delete

run: html
	cd $(OUTPUTDIR) && python -m pelican.server

publish:
	@fab $(host) publish

rsync_upload: publish
	@fab $(host) upload_content -u $(user)

setup:
	mkdir -p $(OUTPUTDIR)
	pip install -r requirements.txt
	vagrant plugin install vagrant-salt

.PHONY: html help clean regenerate serve devserver publish ssh_upload rsync_upload
