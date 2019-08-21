GITHUB_REPO?=kplaube/blog

LOCAL_SETTINGS?=settings/pelicanconf.py
PROD_SETTINGS?=settings/publishconf.py

OUTPUT_DIR=$(CURDIR)/output

clean:
	find $(OUTPUT_DIR) -mindepth 1 -delete

html: clean
	pipenv run pelican content -v -s $(PROD_SETTINGS)

run:
	pipenv run pelican content -r -l -s $(LOCAL_SETTINGS)

publish: html
	@cd $(OUTPUT_DIR) && \
	git init . && \
	git add . && \
	git commit -m "Publishing..."; \
	git push "git@github.com:$(GITHUB_REPO).git" master:gh-pages --force && \
	rm -rf .gi	

setup:
	pipenv install
	test -d "vendor" || git submodule add https://github.com/getpelican/pelican-plugins.git vendor
	test -d "plugins/extended_meta" || git submodule add https://github.com/kplaube/extended_meta.git plugins/extended_meta
	git submodule update --init --recursive
	mkdir -p $(OUTPUT_DIR)
