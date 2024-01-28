---
title: "Como organizar seus projetos Django"
date: 2011-04-11 20:11
tags: ["desenvolvimento-web", "python", "django", "virtualenv"]
slug: como-organizar-seus-projetos-django
thumbnail: /media/django-logo.png
---

Pretendo compartilhar com vocês a forma que venho utilizando para
organizar meus projetos [*Django*][] com o uso do [*virtualenv*][].
Não entrarei em muitos detalhes, até porque você verá que é um
procedimento muito simples, mas que poderá garantir melhor organização
dos seus projetos e dos seus ambientes de desenvolvimento.

É interessante que você leia o post [*Python*, *Django* e
*virtualenv*][] antes de continuar.

## Simplesmente um projeto Django

Antes de conhecer (e utilizar) o _virtualenv_, utilizei algo parecido
com o modelo “tradicional” de organização de pastas e códigos em um
projeto _Django_. Ou seja, parecido com aquela estrutura padrão
gerada pelo comando `django-admin.py startproject`.

O modelo é bom, e funcionou para mim durante muito tempo. Mas de uns
tempos para cá venho utilizando o esquema abaixo (confira um exemplo
real):

```text
mysite/
    apps/
        __init__.py
        eggs/
            fixtures/
                eggs_testdata.json
            tests/
                __init__.py
                models.py
                views.py
            __init__.py
            models.py
            urls.py
            views.py
        core/
            __init__.py
            extras.py
    __init__.py
    manage.py
    settings.py
    urls.py
```

A diferença principal está na utilização da pasta `apps` para
encapsular as aplicações do projeto, e a criação de uma pasta (ou
pacote, como preferir) `core`. Nesta última, gosto de armazenar
_snippets_ de código que serão aproveitados pelo projeto inteiro.

Outro ponto que vale ser notado é a criação de uma pasta chamada
`tests` para cada _app_. Embora haja casos em que um arquivo
`tests.py` seja o suficiente, podemos nos deparar com um arquivo
gigantesco testando vários aspectos de uma _app_ (o que pode dificultar
a legibilidade de código). Categorizar os testes por tipo, e em arquivos
separados, irá facilitar a adição de novos testes e funcionalidades.

A abordagem dos testes também pode ser utilizada para o `urls.py`.
Quando o seu arquivo de roteamento ficar muito grande, crie uma pasta
`urls` e “quebre” suas rotas em arquivos diferentes. Categorize-os,
sinta-se “zen” e nunca mais tenha medo de criar _URLs_ novamente

Comecei a utilizar esta estrutura após “xeretar” alguns projetos
_Django_ _open source_. Posso dizer por experiência própria que é uma
prática interessante, e que tem me ajudado muito na organização de
código.

## O projeto Django com o virtualenv

Tratando-se do ambiente de desenvolvimento (construído pelo
_virtualenv_), já utilizei-o de duas formas:

- **O _environment_ em uma pasta separada do projeto:** Você pode
  possuir uma pasta “environments” e lá ter diferentes ambientes para
  diferentes projetos.
- **O projeto _Django_ ficar dentro da pasta de _environment_:** Você
  primeiramente constrói um ambiente com o _virtualenv_, e depois cria
  um projeto dentro dessa mesma pasta (como demonstrado [neste *post* do *Osvaldo Santana*][]).

Particularmente eu prefiro a segunda opção (nunca precisei de 2
_environments_ idênticos). Além de manter todo o seu projeto agrupado,
fica mais fácil para criação de _scripts_ de automatização de _deploy_,
por exemplo.

No fim das contas, geralmente a estrutura de pastas dos projetos
_Django_ fica assim:

```text
MySiteProject/
    bin/
    include/
    lib/
    mysite/
        apps/
            __init__.py
            eggs/
                fixtures/
                    eggs_testdata.json
                tests/
                    __init__.py
                    models.py
                    views.py
                __init__.py
                models.py
                urls.py
                views.py
            core/
                __init__.py
                extras.py
        __init__.py
        manage.py
        settings.py
        urls.py
```

E você? De que forma organiza os seus projetos em _Django_? Conte-nos
através dos comentários abaixo!

Até a próxima…

[*django*]: /tag/django.html "Leia mais sobre Django"
[*virtualenv*]: /tag/virtualenv.html "Leia mais sobre virtualenv"
[*python*, *django* e *virtualenv*]: /2011/03/18/python-django-virtualenv.html "Leia mais sobre a tríade Python, Django e virtualenv"
[neste *post* do *osvaldo santana*]: http://blog.triveos.com.br/2010/04/25/trabalhando-com-python-e-django/ "Trabalhando com Python e Django à moda Osvaldo"
