Title: Django e ES6 com django-compressor
Date: 2016-06-20 23:04:00
Category: desenvolvimento
Tags: desenvolvimento, web, python, django, es6, javascript, babel, browserify
Slug: django-e-es6-com-django-compressor
meta_description: Vamos falar sobre como utilizar o Django e o django-compressor para transpilar scripts ES6 em ES5, com ajuda do Node.js e Babelify.

{% img align-left /images/blog/django-js-logo.png 180 180 Logo do Django e Javascript %}

No [*post* anterior]({filename}django-sass-django-compressor.md "Django e Sass com django-compressor"),
falamos sobre como utilizar o [*Sass*]({tag}sass "Leia mais sobre Sass")
com o *framework* [*Django*]({tag}django "Leia mais sobre Django")
através da biblioteca *Compressor* (e sem necessitar de uma
ferramenta intermediária para *build*). Nesse artigo, vamos utilizar
o mesmo conceito e apresentar uma forma diferente de utilizar
a nova versão do [*Javascript*]({tag}javascript "Leia mais sobre Javascript")
com o `django-compressor`.

<!-- PELICAN_END_SUMMARY -->

## Instalando e configurando o Compressor

Vamos recaptular o processo de instalação do `django-compressor`:

    ::shell
    $ pip install django-compressor

Não podemos esquecer de adicionar a *app* ao `INSTALLED_APPS`:

    ::python
    # settings.py
    INSTALLED_APPS = (
        ...
        'compressor',
        ...
    )

E para finalizar, precisamos fazer os estáticos serem "encontráveis":

    ::python
    # settings.py
    STATICFILES_FINDERS = (
        'django.contrib.staticfiles.finders.FileSystemFinder',
        'django.contrib.staticfiles.finders.AppDirectoriesFinder',
        ...
        'compressor.finders.CompressorFinder',
    )

Para simplificar o nosso exemplo, vou reaproveitar o cenário criado no *post*
anterior:

    <!-- index.html -->

    {% load compress %}
    {% load staticfiles %}

    {% compress js %}
        <script src="{% static 'vendor/jquery/jquery.js' %}"></script>
        <script src="{% static 'js/app.js' %}"></script>
    {% endcompress %}

Imagine que o nosso arquivo `js/app.js` é um *Javascript*, mas escrito seguindo as
especificações do [*ES6*]({tag}es6 "Leia mais sobre ES6"). Podendo ser algo
semelhante ao exemplo abaixo:

    ::javascript
    import {createStore} from 'redux'

    import rootReducer from './reducers'
    import App from './components/app'

    let store = createStore(rootReducer)
    store.subscribe(app.subscriber)

O bloco de `{% compress js %}` será responsável por minificar e concatenar os nossos *scripts*.
Se executarmos o comando `manage.py compress`, provavelmente não teremos nenhum problema,
e o [*HTML*]({tag}html "Leia mais sobre HTML") de resposta será algo parecido com isso:

    <!-- index.html -->
    <script type="text/javascript" src="/static/CACHE/js/3ffb288f8747.js"></script>

Mas o *ES6* ainda não é amplamente suportado pelos navegadores... logo, teremos
que usar "transpiladores" para que o código seja traduzido em algo "entendível" pelos *browsers*.

## Hello NPM my old friend

Eu sinceramente desconheço uma ferramenta que faça [*transpiling*](https://www.stevefenton.co.uk/2012/11/compiling-vs-transpiling/ "Compiling vs Transpiling")
de *ES6* para *ES5* melhor que o [*Babel*](https://babeljs.io/ "Use next generation JavaScript, today").

E embora a gente "torça o nariz" para a necessidade de adicionar [*Node.js*]({tag}node "Leia mais sobre Node")
à nossa *stack* [*Python*]({tag}python "Leia mais sobre Python"), o uso do *Babel* nessas condições faz
certo sentido. Primeiro, por nos permitir escrever *Javascript*
numa versão mais prática, legível e divertida. Segundo, que com o auxílio do
[*Browserify*](http://browserify.org/ "Browserify lets you require modules in the browser") (por exemplo),
podemos deixar a resolução de *path* do *JS* nas mãos da tríade *NPM/Browserify/Babel*
(ou você achou que aquele `import 'redux'` veio de graça?).

Isso nos permite escrever *Javascript* modular, utilizando recursos que já são *built-in*
(na especificação) da linguagem, sem necessariamente nos preocuparmos em como resolveremos as
questões de importação (como por exemplo, se usaremos [*RequireJS*](http://requirejs.org/ "RequireJS is a JavaScript file and module loader")
ou [*curl.js*](https://github.com/cujojs/curl "curl.js is small, fast, extensible module loader"))
e deixamos toda essa responsabilidade nas mãos da ferramenta de *bundling* de sua escolha.

{% img align-center /images/blog/django-babel-auf-wiedersehen.png 620 258 Django + Babel é como dar um Auf Wiedersehen para o ES5 (fallsdownz.blogspot.com.br) %}

Sem mais delongas, vamos instalar as dependências que precisaremos para o nosso exemplo:

    ::bash
    npm install --save-dev babelify babel-preset-es2015 redux

Dos pacotes acima, os mais fundamentais são:

* `babelify`: Um [*transform*](http://babeljs.io/docs/plugins/#transform "Babel plugins") de *Babel* para o *Browserify*;
* `babel-preset-es2015`: Um *preset* com um apanhado de *plugins* necessários para compilar *ES2015* para *ES5*;

O pacote `redux` é apenas uma dependência utilizada pelo exemplo, e não
influencia diretamente no processo de *build*.

Para facilitar a comunicação entre o *Django* e o *Babel*, vamos criar um arquivo de configuração
`.babelrc`, na raíz do nosso projeto, com a seguinte configuração:

    ::json
    {
      "presets": ["es2015"]
    }

Voltamos ao *Django*, para terminar de configurar o nosso projeto.

## Back to the Django

Como no exemplo do *post* anterior, vamos utilizar a capacidade de setarmos
compiladores/transpiladores, no `django-compressor`, e passaremos a interpretar
os arquivos *Javascript* utilizando o *Babel*:

    ::python
    # settings.py
    COMPRESS_PRECOMPILERS = (
        ('text/es6', './node_modules/.bin/browserify {infile} -t babelify --outfile {outfile}'),
    )

O *path* `./node_modules/.bin/browserify` é onde está o binário após ser instalado
via `npm`. Os parâmetros `infile` e `outfile` dizem respeito ao arquivo de entrada e
de saída, respectivamente.

Agora basta voltarmos ao nosso *template*, e adicionarmos o atributo `type="text/es6` à
nossa *tag* `<script>`:

    <!-- index.html -->

    {% load compress %}
    {% load staticfiles %}

    {% compress js %}
        <script src="{% static 'vendor/jquery/jquery.js' %}"></script>
        <script src="{% static 'js/app.js' %}" type="text/es6"></script>
    {% endcompress %}

Pronto! Agora é só ver o resultado através do comando `python manage.py compress`.

## Considerações finais

Tratando-se de uma aplicação em produção, onde é recomendado utilizar o `django-compressor`
com [*offline compression*](http://django-compressor.readthedocs.io/en/latest/scenarios/#offline-compression "Offline compression"),
a adição do *Browserify* não impactará no tempo de resposta
do seu servidor. No entanto, é certo que o servidor local, levantado através do
`manage.py runserver`, leve um tempo maior para responder depois dessa adição.

Na dúvida, não custa testar...

Inicie utilizando o *Django* com *Compressor*. A partir do momento onde os
tempos de resposta tornem-se muito altos, opte por uma ferramenta que
[execute o *build* em paralelo]({filename}vivendo-sem-o-grunt.md "Vivendo sem o Grunt").

Até a próxima!

## Referências

* [*Babelify - Browserify transform for Babel*](https://github.com/babel/babelify)
* [*Django Compressor - Compresses linked and inline JavaScript or CSS into a single cached file*](https://django-compressor.readthedocs.io/en/latest/)
