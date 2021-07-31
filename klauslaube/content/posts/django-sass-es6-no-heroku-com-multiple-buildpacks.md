---
title: "Django, Sass e ES6 no Heroku com Multiple Buildpacks"
date: 2016-08-27 16:00:00
category: desenvolvimento
tags: ["desenvolvimento", "web", "python", "django", "sass", "es6", "css", "js", "heroku", "buildpack"]
slug: django-sass-es6-no-heroku-com-multiple-buildpacks
thumbnail: /images/heroku-logo.png
---

Anteriormente, falamos sobre como utilizar o `django-compressor` com [_Sass_](/tag/sass.html "Leia mais sobre Sass")
e [_ES6_](/tag/es6.html "Leia mais sobre ES6"). Se você quisesse utilizar o _Heroku_,
com uma aplicação [_Python_](/tag/python.html "Leia mais sobre Python") executando operações de _build_
em [_Node.js_](/tag/node.html "Leia mais sobre Node.JS"), seria uma tarefa um tanto árdua,
que exigiria um certo nível de paciência na
construção do seu próprio _Buildpack_. Hoje, com o _Multiple Buildpacks_, isso não é mais necessário.

## Build o quê?

_Buildpack_.

São conjuntos de scripts que, dependendo da linguagem de programação que você escolher,
resolverão dependências, geração de _assets_ e até mesmo compilação arquivos, dentro da plataforma _Heroku_.

Ou seja, eles são uma espécie de "provisionamento", onde você escreverá uma série de
instruções que deixarão o ambiente preparado para receber o seu projeto.

Antigamente, para você trabalhar com compilação/transpilação de _assets_ em um projeto
_Django_ no _Heroku_, você tinha duas opções:

- Utilizar (ou construir) um _Buildpack_ customizado que realizasse o procedimento de instalação das dependências e build (como o [heroku-buildpack-django](https://github.com/jiaaro/heroku-buildpack-django "Veja o repositório no GitHub"));
- "Commitar" os arquivos "buildados" e utilizar o _Buildpack Python_ padrão.

Eu nunca tive muita paciência com a questão de provisionamento no _Heroku_,
então geralmente eu partia para a ignorância e vivia "commitando" _CSS_ e _JS_ compilados.

## Repita comigo: Nunca mais vou commitar arquivos compilados

É uma péssima ideia! Principalmente quando você está trabalhando em uma equipe grande.
A quantidade de _merge hells_ envolvendo arquivos compilados é aquele tipo de dor de
cabeça que você deveria evitar desde o princípio.

!["Não dá pra pilotar um Jaeger sozinho (deadline.com)"](/images/multipack-pacific-rim.jpg "Não dá pra pilotar um Jaeger sozinho (deadline.com)")

De forma bem resumida, vamos ilustrar como funcionaria o fluxo de _build_ de estáticos com
múltiplos _Buildpacks_. Para começar, vamos criar um novo _app_ no _Heroku_:

```
$ heroku create
```

Caso você tenha dúvidas sobre como criar um projeto _Python_ no _Heroku_,
o "[Getting started](https://devcenter.heroku.com/articles/getting-started-with-python#introduction "Leia documentação oficial")" deles é muito bacana e fácil de seguir.

Supondo que já instalamos o _Django_, e que criamos os arquivos `runtime.txt`,
determinando qual a versão do _Python_ que usaremos, e `requirements.txt`,
para resolução de dependências, automaticamente o _Heroku_ saberá preparar
o ambiente para o nosso projeto.

Mas caso você queira ter certeza disso, podemos usar o comando `buildpacks:set`:

```
$ heroku buildpacks:set heroku/python
```

Como no [_post_ sobre _Django_ e _Sass_](/2016/06/04/django-e-sass-com-django-compressor.html "Django e Sass com django-compressor"),
utilizaremos a biblioteca _Python_ `libsass`. Logo, vamos adicioná-la ao `requirements.txt`:

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

Mas e o _ES6_? Precisaremos do [BabelJS](/tag/babel.html "Leia mais sobre BabelJS"),
e consequentemente do _Node.js_, para realizar o _transpiling_.

## Python + Node.js em uma mesma instância Heroku

Para adicionar um novo _Buildpack_, temos o seguinte comando:

```
$ heroku buildpacks:add --index 1 heroku/nodejs
```

Onde `--index` determina qual será a ordem de execução do _Buildpack_.
Nesse caso, opto por ele ser o primeiro e o do _Python_ segundo,
somente para garantir que todas as dependências estejam sanadas quando
a resolução de estáticos do _Django_ acontecer.

O _Buildpack Python_ executa operações dependendo de alguns arquivos
do nosso projeto. Por exemplo, como mencionado acima, precisamos especificar
a versão da linguagem (`runtime.txt`), instalar as dependências do projeto
(`requirements.txt`) e no caso do _Django_, executar a operação de
`collectstatic` após o deploy (`manage.py`).

No caso do _Node.js_, precisaremos ter um arquivo `package.json` na raíz do
projeto, contendo todas as bibliotecas que o projeto usa, para essa linguagem:

```
$ npm init .
$ npm install --save babelify babel-preset-es2015
```

Não podemos esquecer do `.babelrc`, essencial para a execução do _Babel_:

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
_Buildback Node.js_, e na sequência o _Buildpack Python_. No momento de entrega das
páginas, teremos os binários `browserify` e `sassc` instalados em nossa instância,
e poderemos entregar nossas páginas com _CSS_ e _JS_ compilados sem a necessidade de "commitá-los".

## Comprimindo no momento do deploy

Comprimir/compilar _assets_ no momento da requisição também é algo que deve ser evitado.
Embora o _Django Compressor_ faça um excelente trabalho nesse quesito, se estivermos usando
uma _CDN_ para a entrega desses estáticos, esse procedimento não deve acontecer durante a requisição de um usuário.

Para executar o comando `compress` da biblioteca `django-compressor` em tempo de _deploy_,
basta fazermos duas coisas:

- Garantir que `COMPRESS_OFFLINE`, na configuração do seu projeto, esteja setado como `True`;
- Criar um diretório `bin`, e dentro dele um arquivo `post_compile`, com a instrução de `compress`.

Exemplo:

```bash
#!/usr/bin/env bash

python manage.py compress
```

Feito! Agora a cada _deploy_ da sua aplicação, o _build_ dos _assets_ acontecerá
automaticamente, dispensando assim a necessidade de ficar enviando _CSS_ e _JS_ "buildados"
através de `git push`.

Dúvidas sobre a relação entre Django, Sass e ES6? Eu a detalho um pouco melhor nesses dois posts:

- [Django e ES6 com django-compressor](http://klauslaube.com.br/2016/06/20/django-e-es6-com-django-compressor.html)
- [Django e Sass com django-compressor](http://klauslaube.com.br/2016/06/04/django-e-sass-com-django-compressor.html)

Até a próxima.

## Referências

- [Heroku Dev Center: Using Multiple Buildpacks for an App](https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app)
