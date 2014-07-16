PELICAN=pelican

BASEDIR=$(CURDIR)
BINDIR=$(BASEDIR)/bin
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/output
CONFFILE=$(BASEDIR)/blog/pelicanconf.py

SSH_USER=ubuntu

help:
	@echo 'Makefile for a pelican Web site                                        '
	@echo '                                                                       '
	@echo 'Usage:                                                                 '
	@echo '   make install				       install all project dependencies   '
	@echo '   make html                        (re)generate the web site          '
	@echo '   make clean                       remove the generated files         '
	@echo '   make regenerate                  regenerate files upon modification '
	@echo '   make publish                     generate using production settings '
	@echo '   make serve                       serve site at http://localhost:8000'
	@echo '   make devserver                   start/restart develop_server.sh    '
	@echo '   rsync_upload                     upload the web site via rsync+ssh  '
	@echo '                                                                       '


html: clean $(OUTPUTDIR)/index.html
	@echo 'Done'

$(OUTPUTDIR)/%.html:
	$(PELICAN) $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

clean:
	find $(OUTPUTDIR) -mindepth 1 -delete

regenerate: clean
	$(PELICAN) -r $(INPUTDIR) -o $(OUTPUTDIR) -s $(CONFFILE) $(PELICANOPTS)

serve:
	cd $(OUTPUTDIR) && python -m SimpleHTTPServer

devserver:
	$(BINDIR)/develop_server.sh restart

devserver_stop:
	$(BINDIR)/develop_server.sh stop

publish:
	@fab $(host) publish

rsync_upload: publish
	@fab $(host) upload_content -u $(SSH_USER)

install:
	mkdir -p $(OUTPUTDIR)
	pip install -r requirements.txt
	vagrant plugin install vagrant-salt

.PHONY: html help clean regenerate serve devserver publish ssh_upload rsync_upload
