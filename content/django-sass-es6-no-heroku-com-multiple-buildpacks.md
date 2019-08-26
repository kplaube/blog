Title: Django, Sass e ES6 no Heroku com Multiple Buildpacks
Date: 2016-08-27 16:00:00
Category: desenvolvimento
Tags: desenvolvimento, web, python, django, sass, es6, css, js, heroku, buildpack
Slug: django-sass-es6-no-heroku-com-multiple-buildpacks
meta_description: Vamos falar sobre como utilizar Python e Node.JS em uma mesma instância Heroku, utilizando a feature Multiple Buildpacks.

{% img representative-image /images/blog/heroku-logo.png 180 180 Logo do Heroku %}

Anteriormente, falamos sobre como utilizar o `django-compressor` com [*Sass*]({tag}sass "Leia mais sobre Sass")
e [*ES6*]({tag}es6 "Leia mais sobre ES6"). Se você quisesse utilizar o *Heroku*,
com uma aplicação [*Python*]({tag}python "Leia mais sobre Python") executando operações de *build*
em [*Node.js*]({tag}node "Leia mais sobre Node.JS"), seria uma tarefa um tanto árdua,
que exigiria um certo nível de paciência na
construção do seu próprio *Buildpack*. Hoje, com o *Multiple Buildpacks*, isso não é mais necessário.

<!-- PELICAN_END_SUMMARY -->

## Build o quê?

*Buildpack*.

São conjuntos de scripts que, dependendo da linguagem de programação que você escolher,
resolverão dependências, geração de *assets* e até mesmo compilação arquivos, dentro da plataforma *Heroku*.

Ou seja, eles são uma espécie de "provisionamento", onde você escreverá uma série de
instruções que deixarão o ambiente preparado para receber o seu projeto.

Antigamente, para você trabalhar com compilação/transpilação de *assets* em um projeto
*Django* no *Heroku*, você tinha duas opções:

* Utilizar (ou construir) um *Buildpack* customizado que realizasse o procedimento de instalação das dependências e build (como o [heroku-buildpack-django](https://github.com/jiaaro/heroku-buildpack-django "Veja o repositório no GitHub"));
* "Commitar" os arquivos "buildados" e utilizar o *Buildpack Python* padrão.

Eu nunca tive muita paciência com a questão de provisionamento no *Heroku*,
então geralmente eu partia para a ignorância e vivia "commitando" *CSS* e *JS* compilados.

## Repita comigo: Nunca mais vou commitar arquivos compilados

É uma péssima ideia! Principalmente quando você está trabalhando em uma equipe grande.
A quantidade de *merge hells* envolvendo arquivos compilados é aquele tipo de dor de
cabeça que você deveria evitar desde o princípio.

{% img align-center /images/blog/multipack-pacific-rim.jpg 640 360 Não dá pra pilotar um Jaeger sozinho (deadline.com) %}

De forma bem resumida, vamos ilustrar como funcionaria o fluxo de *build* de estáticos com
múltiplos *Buildpacks*. Para começar, vamos criar um novo *app* no *Heroku*:

```
$ heroku create
```

Caso você tenha dúvidas sobre como criar um projeto *Python* no *Heroku*,
o "[Getting started](https://devcenter.heroku.com/articles/getting-started-with-python#introduction "Leia documentação oficial")" deles é muito bacana e fácil de seguir.

Supondo que já instalamos o *Django*, e que criamos os arquivos `runtime.txt`,
determinando qual a versão do *Python* que usaremos, e `requirements.txt`,
para resolução de dependências, automaticamente o *Heroku* saberá preparar
o ambiente para o nosso projeto.

Mas caso você queira ter certeza disso, podemos usar o comando `buildpacks:set`:

```
$ heroku buildpacks:set heroku/python
```

Como no [*post* sobre *Django* e *Sass*]({filename}django-sass-django-compressor.md "Django e Sass com django-compressor"),
utilizaremos a biblioteca *Python* `libsass`. Logo, vamos adicioná-la ao `requirements.txt`:

```
# requirements.txt

Django
django-compressor
libsass
```

Não podemos deixar de configurar o `django-compressor`:

```python
# settings.py

COMPRESS_PRECOMPILERS = (
    ('text/x-sass', 'sassc {infile} {outfile}'),
)
```

Mas e o *ES6*? Precisaremos do [BabelJS]({tag}babel "Leia mais sobre BabelJS"),
e consequentemente do *Node.js*, para realizar o *transpiling*.

## Python + Node.js em uma mesma instância Heroku

Para adicionar um novo *Buildpack*, temos o seguinte comando:

```
$ heroku buildpacks:add --index 1 heroku/nodejs
```

Onde `--index` determina qual será a ordem de execução do *Buildpack*.
Nesse caso, opto por ele ser o primeiro e o do *Python* segundo,
somente para garantir que todas as dependências estejam sanadas quando
a resolução de estáticos do *Django* acontecer.

O *Buildpack Python* executa operações dependendo de alguns arquivos
do nosso projeto. Por exemplo, como mencionado acima, precisamos especificar
a versão da linguagem (`runtime.txt`), instalar as dependências do projeto
(`requirements.txt`) e no caso do *Django*, executar a operação de
`collectstatic` após o deploy (`manage.py`).

No caso do *Node.js*, precisaremos ter um arquivo `package.json` na raíz do
projeto, contendo todas as bibliotecas que o projeto usa, para essa linguagem:

```
$ npm init .
$ npm install --save babelify babel-preset-es2015
```

Não podemos esquecer do `.babelrc`, essencial para a execução do *Babel*:

```javascript
// .babelrc
{
    "presets": ["es2015"]
}
```

E por fim, falta adicionar o pré-compilador ao `django-compressor`:

```python
# settings.py

COMPRESS_PRECOMPILERS = (
    ('text/x-sass', 'sassc {infile} {outfile}'),
    ('text/es6', './node_modules/.bin/browserify {infile} -t babelify --outfile {outfile}'),
)
```

Pronto! Ao dar o `git push heroku master`, a plataforma executará primeiro o
*Buildback Node.js*, e na sequência o *Buildpack Python*. No momento de entrega das
páginas, teremos os binários `browserify` e `sassc` instalados em nossa instância,
e poderemos entregar nossas páginas com *CSS* e *JS* compilados sem a necessidade de "commitá-los".

## Comprimindo no momento do deploy

Comprimir/compilar *assets* no momento da requisição também é algo que deve ser evitado.
Embora o *Django Compressor* faça um excelente trabalho nesse quesito, se estivermos usando
uma *CDN* para a entrega desses estáticos, esse procedimento não deve acontecer durante a requisição de um usuário.

Para executar o comando `compress` da biblioteca `django-compressor` em tempo de *deploy*,
basta fazermos duas coisas:

* Garantir que `COMPRESS_OFFLINE`, na configuração do seu projeto, esteja setado como `True`;
* Criar um diretório `bin`, e dentro dele um arquivo `post_compile`, com a instrução de `compress`.

Exemplo:

```bash
#!/usr/bin/env bash

python manage.py compress
```

Feito! Agora a cada *deploy* da sua aplicação, o *build* dos *assets* acontecerá
automaticamente, dispensando assim a necessidade de ficar enviando *CSS* e *JS* "buildados"
através de `git push`.

Dúvidas sobre a relação entre Django, Sass e ES6? Eu a detalho um pouco melhor nesses dois posts:

* [Django e ES6 com django-compressor](http://klauslaube.com.br/2016/06/20/django-e-es6-com-django-compressor.html)
* [Django e Sass com django-compressor](http://klauslaube.com.br/2016/06/04/django-e-sass-com-django-compressor.html)

Até a próxima.

## Referências

* [Heroku Dev Center: Using Multiple Buildpacks for an App](https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app)
