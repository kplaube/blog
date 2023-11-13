---
title: "Django e ES6 com django-compressor"
date: 2016-06-20 23:04:00
modified: 2023-11-13 17:06:00
tags:
  [
    "desenvolvimento-web",
    "python",
    "django",
    "es6",
    "javascript",
    "babel",
    "browserify",
  ]
slug: django-e-es6-com-django-compressor
thumbnail: ./images/django-js-logo.png
---

No [_post_ anterior](/2016/06/04/django-e-sass-com-django-compressor.html "Django e Sass com django-compressor"),
falamos sobre como utilizar o [_Sass_](/tag/sass.html "Leia mais sobre Sass")
com o _framework_ [_Django_](/tag/django.html "Leia mais sobre Django")
através da biblioteca _Compressor_ (e sem necessitar de uma
ferramenta intermediária para _build_). Nesse artigo, vamos utilizar
o mesmo conceito e apresentar uma forma diferente de utilizar
a nova versão do [_Javascript_](/tag/javascript.html "Leia mais sobre Javascript")
com o `django-compressor`.

## Instalando e configurando o Compressor

Vamos recaptular o processo de instalação do `django-compressor`:

```text
pip install django-compressor
```

Não podemos esquecer de adicionar a _app_ ao `INSTALLED_APPS`:

```python
# settings.py
INSTALLED_APPS = (
    ...
    'compressor',
    ...
)
```

E para finalizar, precisamos fazer os estáticos serem "encontráveis":

```python
# settings.py
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    ...
    'compressor.finders.CompressorFinder',
)
```

Para simplificar o nosso exemplo, vou reaproveitar o cenário criado no _post_
anterior:

```django-html
<!-- index.html -->

{% load compress %}
{% load staticfiles %}

{% compress js %}
    <script src="{% static 'vendor/jquery/jquery.js' %}"></script>
    <script src="{% static 'js/app.js' %}"></script>
{% endcompress %}
```

Imagine que o nosso arquivo `js/app.js` é um _Javascript_, mas escrito seguindo as
especificações do [_ES6_](/tag/es6.html "Leia mais sobre ES6"). Podendo ser algo
semelhante ao exemplo abaixo:

```javascript
import { createStore } from "redux";

import rootReducer from "./reducers";
import App from "./components/app";

let store = createStore(rootReducer);
store.subscribe(app.subscriber);
```

O bloco de `{% compress js %}` será responsável por minificar e concatenar os nossos _scripts_.
Se executarmos o comando `manage.py compress`, provavelmente não teremos nenhum problema,
e o [_HTML_](/tag/html.html "Leia mais sobre HTML") de resposta será algo parecido com isso:

```html
<!-- index.html -->
<script type="text/javascript" src="/static/CACHE/js/3ffb288f8747.js"></script>
```

Mas o _ES6_ ainda não é amplamente suportado pelos navegadores... logo, teremos
que usar "transpiladores" para que o código seja traduzido em algo "entendível" pelos _browsers_.

## Hello NPM my old friend

Eu sinceramente desconheço uma ferramenta que faça [_transpiling_](https://www.stevefenton.co.uk/2012/11/compiling-vs-transpiling/ "Compiling vs Transpiling")
de _ES6_ para _ES5_ melhor que o [_Babel_](https://babeljs.io/ "Use next generation JavaScript, today").

E embora a gente "torça o nariz" para a necessidade de adicionar [_Node.js_](/tag/node.html "Leia mais sobre Node")
à nossa _stack_ [_Python_](/tag/python.html "Leia mais sobre Python"), o uso do _Babel_ nessas condições faz
certo sentido. Primeiro, por nos permitir escrever _Javascript_
numa versão mais prática, legível e divertida. Segundo, que com o auxílio do
[_Browserify_](http://browserify.org/ "Browserify lets you require modules in the browser") (por exemplo),
podemos deixar a resolução de _path_ do _JS_ nas mãos da tríade _NPM/Browserify/Babel_
(ou você achou que aquele `import 'redux'` veio de graça?).

Isso nos permite escrever _Javascript_ modular, utilizando recursos que já são _built-in_
(na especificação) da linguagem, sem necessariamente nos preocuparmos em como resolveremos as
questões de importação (como por exemplo, se usaremos [_RequireJS_](http://requirejs.org/ "RequireJS is a JavaScript file and module loader")
ou [_curl.js_](https://github.com/cujojs/curl "curl.js is small, fast, extensible module loader"))
e deixamos toda essa responsabilidade nas mãos da ferramenta de _bundling_ de sua escolha.

![Django + Babel é como dar um Auf Wiedersehen para o ES5 (fallsdownz.blogspot.com.br)](/media/django-babel-auf-wiedersehen.png "Django + Babel é como dar um Auf Wiedersehen para o ES5 (fallsdownz.blogspot.com.br)")

Sem mais delongas, vamos instalar as dependências que precisaremos para o nosso exemplo:

```text
npm install --save-dev babelify babel-preset-es2015 redux
```

Dos pacotes acima, os mais fundamentais são:

- `babelify`: Um [_transform_](http://babeljs.io/docs/plugins/#transform "Babel plugins") de _Babel_ para o _Browserify_;
- `babel-preset-es2015`: Um _preset_ com um apanhado de _plugins_ necessários para compilar _ES2015_ para _ES5_;

O pacote `redux` é apenas uma dependência utilizada pelo exemplo, e não
influencia diretamente no processo de _build_.

Para facilitar a comunicação entre o _Django_ e o _Babel_, vamos criar um arquivo de configuração
`.babelrc`, na raíz do nosso projeto, com a seguinte configuração:

```json
{
  "presets": ["es2015"]
}
```

Voltamos ao _Django_, para terminar de configurar o nosso projeto.

## Back to the Django

Como no exemplo do _post_ anterior, vamos utilizar a capacidade de setarmos
compiladores/transpiladores, no `django-compressor`, e passaremos a interpretar
os arquivos _Javascript_ utilizando o _Babel_:

```python
# settings.py
COMPRESS_PRECOMPILERS = (
    ('text/es6', './node_modules/.bin/browserify {infile} -t babelify --outfile {outfile}'),
)
```

O _path_ `./node_modules/.bin/browserify` é onde está o binário após ser instalado
via `npm`. Os parâmetros `infile` e `outfile` dizem respeito ao arquivo de entrada e
de saída, respectivamente.

Agora basta voltarmos ao nosso _template_, e adicionarmos o atributo `type="text/es6` à
nossa _tag_ `<script>`:

```django-html
<!-- index.html -->

{% load compress %}
{% load staticfiles %}

{% compress js %}
    <script src="{% static 'vendor/jquery/jquery.js' %}"></script>
    <script src="{% static 'js/app.js' %}" type="text/es6"></script>
{% endcompress %}
```

Pronto! Agora é só ver o resultado através do comando `python manage.py compress`.

## Considerações finais

Tratando-se de uma aplicação em produção, onde é recomendado utilizar o `django-compressor`
com [_offline compression_](http://django-compressor.readthedocs.io/en/latest/scenarios/#offline-compression "Offline compression"),
a adição do _Browserify_ não impactará no tempo de resposta
do seu servidor. No entanto, é certo que o servidor local, levantado através do
`manage.py runserver`, leve um tempo maior para responder depois dessa adição.

Na dúvida, não custa testar...

Inicie utilizando o _Django_ com _Compressor_. A partir do momento onde os
tempos de resposta tornem-se muito altos, opte por uma ferramenta que
[execute o _build_ em paralelo](/2016/02/22/vivendo-sem-o-grunt.html "Vivendo sem o Grunt").

Até a próxima!

## Referências

- [_Babelify - Browserify transform for Babel_](https://github.com/babel/babelify)
- [_Django Compressor - Compresses linked and inline JavaScript or CSS into a single cached file_](https://django-compressor.readthedocs.io/en/latest/)
