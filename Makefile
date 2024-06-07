generate:
	python freeze.py

devserver:
	python app.py

localserver: generate
	cd build && python -m http.server 8000