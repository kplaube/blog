---
title: "Django e Sass com django-compressor"
date: 2016-06-04 16:00:00
modified: 2023-11-13 15:40:00
tags: ["desenvolvimento-web", "python", "django", "sass", "css"]
slug: django-e-sass-com-django-compressor
thumbnail: /media/django-sass-logo.png
---

Eu sempre gostei da proposta do `django-compressor`: Concatenar e comprimir
estáticos, utilizando como agrupadores os blocos da _engine_ de _templates_
do [_Django_](/tag/django.html "Leia mais sobre Django").
Além de manter a declaração dos _assets_ no [_HTML_](/tag/html.html "Leia mais sobre HTML"),
ele ainda abre uma margem interessante para quando você precisa customizar um grupo
de estáticos para uma determinada página.

Com a chegada dos pré-processadores, como [_Sass_](http://sass-lang.com/ "CSS with superpower")
e [_CoffeeScript_](http://coffeescript.org/ "CoffeeScript is a little language that compiles into JavaScript"),
e fatalmente com o advento das ferramentas de _build_, deixar esse processo
para o _Django_ passou a ser questionável. É extremamente razoável passar toda
essa responsabilidade para o [_Grunt_](/tag/grunt.html "Leia mais sobre Grunt"),
e colocar apenas no seu _template_ _Django_ a _URL_ do estático já "buildado".

Na minha opinião, isso tira um pouco da vantagem descrita no primeiro parágrafo,
e adiciona certa complexidade à nossa _stack_ de desenvolvimento. Baseado nisso,
e indo na [onda da simplificação de _build_](/2016/02/22/vivendo-sem-o-grunt.html "Vivendo sem o Grunt"),
que eu resolvi devolver esse poder ao _Django_.
E já te adianto: Estou relativamente satisfeito com o resultado!

## Concat e minify sem Node.js

O _Django Compressor_ é um _app_ _Django_ que comprime _Javascript_
ou _CSS_, em um único arquivo cacheável.

Para usá-lo, começamos instalando através do `pip`:

```text
pip install django-compressor
```

Na sequência, precisamos adicioná-lo ao arquivo de configuração do seu projeto _Django_:

```python
# settings.py
INSTALLED_APPS = (
    ...
    'compressor',
    ...
)
```

Não esqueça de adicioná-lo ao `STATICFILES_FINDERS`:

```python
# settings.py
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    ...
    'compressor.finders.CompressorFinder',
)
```

E no seu _template_ _Django_, utilizamos a `templatetag` de compressão
para _CSS_ e _JS_:

```html
<!-- index.html -->

{% load compress %}
{% load staticfiles %}

{% compress css %}
    <link rel="stylesheet" href="{% static 'vendor/skeleton/normalize.css' %}" type="text/css">
    <link rel="stylesheet" href="{% static 'vendor/skeleton/skeleton.css' %}" type="text/css">
{% endcompress %}

{% compress js %}
    <script src="{% static 'vendor/jquery/jquery.js' %}"></script>
    <script src="{% static 'js/app.js' %}"></script>
{% endcompress %}
```

Quando o internauta acessar a sua página, o resultado final será parecido com esse:

```html
<!-- index.html -->

<link rel="stylesheet" href="/static/CACHE/css/0fb9d388202c.css" type="text/css">
<script type="text/javascript" src="/static/CACHE/js/82f4dc99bcc1.js"></script>
```

Bacana, não? Como a opção `COMPRESS_ENABLED` é por padrão o inverso de `DEBUG`,
em tempo de desenvolvimento você não verá os _assets_ comprimidos,
mas em tempo de _QA_ e produção, se o seu _Django_ estiver corretamente configurado,
sim.

## Pré-compiladores

Você não precisa do _Ruby_ para utilizar _Sass_. Hoje, com o advento da especificação
do _libsass_, é possível ter a ferramenta em diferentes linguagens, como
[_Node.js_](/tag/node.html "Leia mais sobre Node.js") e [_Python_](/tag/python.html "Leia mais sobre Python"):

```text
pip install libsass
```

O `django-compressor` dá suporte a execução de compiladores/transpiladores dado um
determinado `type`. Vamos ilustrar esse cenário com o uso de _Sass_:

```python
# settings.py
COMPRESS_PRECOMPILERS = (
    ('text/x-sass', 'sassc {infile} {outfile}'),
)
```

O binário `sassc` foi instalado no comando `pip install` acima. O parâmetro `infile`
será o próprio arquivo `scss`, e `outfile` será a saída do arquivo, já compilado para _CSS_.

![Django com estilo!](/media/django-style.jpg "Django com estilo!")

Agora, a jogada será declarar em nosso _template_ que todas as folhas de estilo escritas
em _Sass_, terão como `type` o valor `text/x-sass`:

```html
<!-- index.html -->

{% compress css %}
    <link rel="stylesheet" href="{% static 'vendor/skeleton/normalize.css' %}" type="text/css">
    <link rel="stylesheet" href="{% static 'vendor/skeleton/skeleton.css' %}" type="text/css">
    <link rel="stylesheet" href="{% static 'scss/app.scss' %}" type="text/x-sass">
{% endcompress %}
```

A partir de agora, no momento de execução do _Compressor_, além de minificar e concatenar
as folhas de estilo, também interpretará arquivos _Sass_.

## Considerações finais

E com isso, mais uma vez, mostramos que é possível ter um projeto [_web_](/tag/desenvolvimento-web.html "Leia mais sobre web"),
utilizando ferramentas bacanas (como o _Sass_), sem necessariamente
adicionar uma linguagem diferente à sua _stack_.

O ideal é que o processo de _build_ seja executado durante o procedimento
de _deploy_ do seu projeto (através do comando `python manage.py compress`). Para isso,
é necessário ativar o
[_offline compression_ do _Django Compressor_](http://django-compressor.readthedocs.io/en/latest/scenarios/#offline-compression "Offline compression").

No próximo _post_ vamos falar sobre _Django_ + _ES6_.

Até a próxima.

## Referências

- [_Django Compressor - Compresses linked and inline JavaScript or CSS into a single cached file_](https://django-compressor.readthedocs.io/en/latest/)
- [_libsass - Sass/SCSS for Python_](https://hongminhee.org/libsass-python/)
