Title: Como organizar seus projetos Django
Date: 2011-04-11 20:11
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, django, virtualenv
Slug: como-organizar-seus-projetos-django


|img "/images/blog/django-logo.png" 180 180 "Logotipo do Django" "align-left"|
Olá pessoas!

Pretendo compartilhar com vocês a forma que venho utilizando para
**organizar meus projetos** [*Django*][] com o uso do [*virtualenv*][].
Não entrarei em muitos detalhes, até porque você verá que é um
procedimento muito simples, mas que poderá garantir melhor organização
dos seus projetos e dos seus ambientes de desenvolvimento.

<!-- PELICAN_END_SUMMARY -->

É interessante que você leia o post [*Python*, *Django* e
*virtualenv*][] antes de continuar.


Simplesmente um projeto Django
------------------------------

Antes de conhecer (e utilizar) o *virtualenv*, utilizei algo parecido
com o modelo “tradicional” de organização de pastas e códigos em um
projeto *Django*. Ou seja, parecido com aquela **estrutura padrão**
gerada pelo comando **django-admin.py startproject**.

O modelo é bom, e funcionou para mim durante muito tempo. Mas de uns
tempos para cá venho utilizando o esquema abaixo (confira um exemplo
real):

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

A diferença principal está na utilização da pasta **apps** para
encapsular as aplicações do projeto, e a criação de uma pasta (ou
pacote, como preferir) **core**. Nesta última, gosto de armazenar
*snippets* de código que serão aproveitados pelo projeto inteiro.

Outro ponto que vale ser notado é a criação de uma pasta chamada
**tests** para cada *app*. Embora haja casos em que um arquivo
**tests.py** seja o suficiente, podemos nos deparar com um arquivo
gigantesco testando vários aspectos de uma *app* (o que pode dificultar
a legibilidade de código). Categorizar os testes por tipo, e em arquivos
separados, irá facilitar a adição de novos testes e funcionalidades.

A abordagem dos testes também pode ser utilizada para o **urls.py**.
Quando o seu arquivo de roteamento ficar muito grande, crie uma pasta
**urls** e “quebre” suas rotas em arquivos diferentes. Categorize-os,
sinta-se “zen” e nunca mais tenha medo de criar *URLs* novamente

Comecei a utilizar esta estrutura após “xeretar” alguns projetos
*Django* *open source*. Posso dizer por experiência própria que é uma
prática interessante, e que tem me ajudado muito na organização de
código.


O projeto Django com o virtualenv
---------------------------------

Tratando-se do ambiente de desenvolvimento (construído pelo
*virtualenv*), já utilizei-o de duas formas:

* **O *environment* em uma pasta separada do projeto:** Você pode
    possuir uma pasta “environments” e lá ter diferentes ambientes para
    diferentes projetos.
* **O projeto *Django* ficar dentro da pasta de *environment*:** Você
    primeiramente constrói um ambiente com o *virtualenv*, e depois cria
    um projeto dentro dessa mesma pasta (como demonstrado [neste *post* do *Osvaldo Santana*][]).

Particularmente eu prefiro a segunda opção (nunca precisei de 2
*environments* idênticos). Além de manter todo o seu projeto agrupado,
fica mais fácil para criação de *scripts* de automatização de *deploy*,
por exemplo.

No fim das contas, geralmente a estrutura de pastas dos projetos
*Django* fica assim:

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

E você? De que forma organiza os seus projetos em *Django*? Conte-nos
através dos comentários abaixo!

Até a próxima…


  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [*virtualenv*]: {tag}virtualenv
    "Leia mais sobre virtualenv"
  [*Python*, *Django* e *virtualenv*]: {filename}python-django-e-virtualenv.md
    "Leia mais sobre a tríade Python, Django e virtualenv"
  [neste *post* do *Osvaldo Santana*]: http://blog.triveos.com.br/2010/04/25/trabalhando-com-python-e-django/
    "Trabalhando com Python e Django à moda Osvaldo"
