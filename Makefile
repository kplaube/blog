build:
	python freeze.py

devserver:
	python app.py

localserver: build
	cd build && python -m http.server 8000