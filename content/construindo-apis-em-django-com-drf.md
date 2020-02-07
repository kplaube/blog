title: Construindo APIs em Django com Django REST Framework
Date: 2020-02-20 10:45:00
Category: desenvolvimento
Tags: desenvolvimento, web, apis, python, django, rest, drf
Image: /images/blog/django-logo.png
Alt: Logotipo do Django

No [_post_ anterior]({filename}eu-me-rendo-django-rest-framework.md "Leia o meu depoimento sobre a rendição ao DRF")
tive a oportunidade de "destilar" a minha simpatia pelo [_Django REST Framework_]({tag}drf "Leia mais sobre o Django REST Framework"),
e de salientar alguns aspectos positivos da ferramenta. A praticidade
é sem dúvida um de seus pontos mais altos, e nesse _post_ vamos explorá-la através
de código escrito (que vale mais do que mil palavras).

<!-- PELICAN_END_SUMMARY -->

## Instalando

Sem mais delongas, o _REST Framework_ é facilmente instalado através dos comandos `pip` ou `pipenv`:

```text
$ pipenv install djangorestframework
```

Não esqueça de adicionar a _app_ ao seu `INSTALLED_APPS`:

```python
# settings.py

INSTALLED_APPS = [
    (...)
    'rest_framework',
]
```

Estamos prontos para mergulhar nos conceitos de _routers_, serializadores e _views_.
