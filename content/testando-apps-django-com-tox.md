Title: Testando apps Django com Tox
Date: 2018-01-05 17:05:00
Category: desenvolvimento
Tags: desenvolvimento, testes, tdd, tox, django, python, virtualenv
Slug: testando-apps-django-com-tox
meta_description: O Django 2.0 foi lançado, e com ele o suporte a Python 2.7 deixa de existir. Conheça o tox, uma poderosa ferramenta para executar testes em diferentes virtualenvs.

{% img representative-image /images/blog/django-logo.png 180 180 Logotipo do Django %}

O [*Django 2.0*](https://docs.djangoproject.com/pt-br/2.0/releases/2.0/ "Django 2.0 release notes") foi lançado,
e com ele o suporte a [*Python*]({tag}python "Leia mais sobre Python") `2.7` deixa de existir para
as próximas versões do *framework*. Alegria para os usuários, preocupação para os desenvolvedores
dos [*apps*](http://henriquebastos.net/desmistificando-o-conceito-de-django-apps/ "Desmistificando O Conceito De Django Apps").
Afinal, a versão `1.11` é *LTS* (Long Term Support), logo, alguns *apps* (ainda) não podem abraçar
incondicionalmente a versão `3.x` da linguagem.

<!-- PELICAN_END_SUMMARY -->

É nesse cenário que bibliotecas como o [*six*](http://six.readthedocs.io/ "Python 2 and 3 Compatibility Library")
e [*tox*](https://tox.readthedocs.io/en/latest/ "Standardize testing in Python") mostram o seu valor. Nesse artigo,
vamos falar um pouquinho mais sobre a última.

## Antes de começar: Vida longa ao Python 3!

O *Python 2* estará aí por mais um tempo (até 2020). Portanto, qual a motivação para mudar para o *Python 3* agora?

Na [*Loadsmart*](https://loadsmart.com/ "Book a truck in seconds"), o nosso principal projeto é em *Python* `2.7`.
Mas estamos experimentando *Python* `3.x` há um bom tempo em projetos paralelos. O fato é que a nova versão da linguagem está mais eficiente,
possui suporte a assincronicidade, melhor controle de exceções e o fogo ardente do "unicode hell" foi controlado.

{% img align-center-keep-size /images/blog/python-snakes.jpg 640 400 Migrar para Python 3 pode parecer assustador. Mas é tranquilo, Indy... %}

É verdade que há quebra de compatibilidade entre as versões, mas se considerarmos que a `2.7` só tem mais 2 anos de "vida",
a urgência de migração fica mais latente.

## tox é uma sacada das boas!

O site oficial da biblioteca a define como:

> (...) a generic virtualenv management and test command line tool (...)

Com *tox* é possível:

- Validar o seu pacote contra diferentes versões do *Python*;
- Rodar os seus testes em diferentes *environments*.

Não é só por usar [*ambientes virtuais*]({tag}virtualenv "Leia mais sobre Virtualenv") que o *tox* é
uma boa ideia. Ele vem sendo uma mão na roda para os desenvolvedores de pacotes *Python*
que precisam dar suporte às versões `2.x` e `3.x`, e que utilizam testes automatizados como
*design* das soluções.

Com o *Django* a "granularidade" pode ser ainda maior, rodando testes em ambientes
que são combinações entre diferentes versões da linguagem e do *framework*.

## Antes de continuar: Travis e Build Matrix

Se você estiver utilizando o [*Travis CI*](), poderoso serviço de Continuous Integration, consegue reproduzir o comportamento que apresentaremos
a seguir através do uso de [*Build Matrix*](https://docs.travis-ci.com/user/customizing-the-build/#Build-Matrix "Customizing the build").

A diferença é que com o *tox*, podemos obter o mesmo comportamento em tempo de desenvolvimento. Agilizando um pouco mais o processo.

Veja mais em ["Travis CI for Python project"](https://vevurka.github.io/dsp17/git/quality/django/python/travis_ci_frisor/ "Setting up Travis CI for github repo in Python").

## Na prática

Vou aproveitar o tema e usar o *tox* para me ajudar em um *refactoring* de um *app* de
código aberto, que há muito não dou suporte: O [django-simple-contact](https://github.com/kplaube/django-simple-contact "Veja no Github").

Se você quiser acompanhar o passo-a-passo, clone o projeto e dê um `git checkout` da *revisão* `80145ae`:

    ::shell
    $ git clone git@github.com:kplaube/django-simple-contact.git
    $ cd django-simple-contact/
    $ git checkout 80145ae

Na estrutura atual, é possível executar os testes através do `setup.py` ou `python runtests.py`:

    ::shell
    $ python setup.py test
    (...)
    -----------------------------------------------
    Ran 6 tests in 0.230s

    OK
    Destroying test database for alias 'default'...

É possível fazer a troca da versão do *Python/Django* de forma manual (através do [*pyenv*]({tag}pyenv "Leia mais sobre pyenv"), por exemplo).
Obviamente que o *tox* deixa tudo mais interessante (e automatizado).

### Instalando o tox

Finalmente, vamos adicionar a ferramenta ao projeto:

    ::shell
    $ pip install tox

Caso esteja usando *pyenv*, a instalação do `tox-pyenv` é sugerida.
[Leia mais sobre a biblioteca](https://pypi.python.org/pypi/tox-pyenv "tox plugin that makes tox use `pyenv which` to find python executables").

Para deixar tudo mais organizado, vamos nos inspirar na estrutura do projeto
[*modelmommy*](https://github.com/vandersonmota/model_mommy "Object factory for django"). Criaremos um arquivo `requirements.txt` com o seguinte conteúdo:

    # requirements.txt

    bleach
    django>=1.8.0

A versão `1.8.0` (até o momento) é a *LTS* mais antiga, portanto, garantiremos suporte dessa versão em diante.
O [*bleach*](https://pypi.python.org/pypi/bleach "An easy safelist-based HTML-sanitizing tool") é uma dependência do projeto, não
relevante ao exemplo desse artigo.

É interessante deixarmos explícito a instalação do *tox*... um `requirements-dev.txt` pode ser uma solução:

    # requirements-dev.txt

    tox

Agora, quando um *dev* juntar-se ao projeto, ele poderá executar o comando `pip install -r requirements-dev.txt`, e ter
as dependências necessárias para contribuir com o *app*.


### Configurando

Antes de executar a ferramenta é necessário criar um arquivo `tox.ini`, que será responsável por configurar os ambientes
e disparar os testes:

    ::ini
    # tox.ini

    [tox]
    envlist = py27-django{18,111}, py36-django{18,111,20}

    [testenv]
    commands = python runtests.py
    setenv =
        DJANGO_SETTINGS_MODULE=simple_contact.tests.test_settings
        PYTHONPATH={toxinidir}
    basepython =
        py27: python2.7
        py36: python3.6
    deps =
        bleach
        django18: Django==1.8
        django111: Django==1.11
        django20: Django==2.0

Por partes:

* `[tox]`: Aqui colocamos as configurações globais. `envlist` conterá a lista de ambientes nos quais executaremos os testes.
* `[testenv]`: Configurações por ambiente de teste. Poderíamos ter configurações específicas ao utilizar `[testenv:py36-django20]`, por exemplo.
    * `commands`: O comando a ser executado.
    * `setenv`: Variáveis de ambiente setadas para a execução dos testes.
    * `basepython`: Nome do interpretador *Python* utilizado para a criação do ambiente virtual. Repare no "match" com `py27-` e `py36-` do `envlist`.
    * `deps`: Dependências para determinado ambiente de teste. Repare no "match" com `django{18,111,20}`.

Com o uso dos *brackets*, ao invés de criarmos um `testenv` para cada combinação (exemplo: `py27-django18`, `py27-django111`, `py36-django18`, etc),
o *tox* fica responsável por fazer a "matriz de combinações".

Agora sim, podemos executar a ferramenta de linha de comando:

    ::bash
    $ tox
    (...)
    ERROR:   py27-django18: commands failed
    ERROR:   py27-django111: commands failed
    ERROR:   py36-django18: commands failed
    ERROR:   py36-django111: commands failed
    py36-django20: commands succeeded

No meu ambiente local, como esperado, apenas os testes do ambiente `py36-django20` passaram. Para ter acesso a versão corrigida,
dê um *checkout* da revisão `a37ebd1608`:

    ::bash
    $ git checkout a37ebd1608
    $ tox
    (...)
    py27-django18: commands succeeded
    py27-django111: commands succeeded
    py36-django18: commands succeeded
    py36-django111: commands succeeded
    py36-django20: commands succeeded

Perfeito!

Ainda é possível executar apenas os testes de um ambiente específico:

    ::bash
    $ tox -e py36-django20
    (...)
    -----------------------------------------------
    Ran 6 tests in 0.055s

    OK
    Destroying test database for alias 'default'...

O resultado final está disponível na *tag* `0.3.0` do projeto.

## Considerações finais

Que esse movimento da comunidade *Django* consiga influenciar ainda mais a adoção do *Python 3*. Admito que sem essa
"motivação extra", dificilmente cogitaria o *upgrade* da linguagem em meus projetos nesse momento.

O *tox* é sem dúvida uma ferramenta que pode auxiliar nessa fase de transição, portanto, não hesite em adicioná-la ao seu *toolbelt*.

Para uma integração *seamless* com o *Travis CI*, o [*tox-travis*](https://github.com/tox-dev/tox-travis "Seamless integration of Tox into Travis CI")
é recomendado.

Até a próxima!


## Referências

* [ActiveState - Python 3 vs Python 2: It's different this time](https://www.activestate.com/blog/2017/01/python-3-vs-python-2-its-different-time)
* [Henrique Bastos - Desmistificando O Conceito De Django Apps](http://henriquebastos.net/desmistificando-o-conceito-de-django-apps/)
* [Jeremy Satterfield - Using Tox with Travis CI to Test Django Apps](http://jsatt.com/blog/using-tox-with-travis-ci-to-test-django-apps/)
* [vevurka-dev - Travis CI for Python project](https://vevurka.github.io/dsp17/git/quality/django/python/travis_ci_frisor/)
