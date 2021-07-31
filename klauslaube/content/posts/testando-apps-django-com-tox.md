---
title: "Testando apps Django com Tox"
date: 2018-01-05 17:05:00
tags:
  [
    "desenvolvimento-web",
    "testes",
    "tdd",
    "tox",
    "django",
    "python",
    "virtualenv",
  ]
slug: testando-apps-django-com-tox
thumbnail: /images/django-logo.png
---

O [_Django 2.0_](https://docs.djangoproject.com/pt-br/2.0/releases/2.0/ "Django 2.0 release notes") foi lançado,
e com ele o suporte a [_Python_](/tag/python.html "Leia mais sobre Python") `2.7` deixa de existir para
as próximas versões do _framework_. Alegria para os usuários, preocupação para os desenvolvedores
dos [_apps_](http://henriquebastos.net/desmistificando-o-conceito-de-django-apps/ "Desmistificando O Conceito De Django Apps").
Afinal, a versão `1.11` é _LTS_ (Long Term Support), logo, alguns _apps_ (ainda) não podem abraçar
incondicionalmente a versão `3.x` da linguagem.

É nesse cenário que bibliotecas como o [_six_](http://six.readthedocs.io/ "Python 2 and 3 Compatibility Library")
e [_tox_](https://tox.readthedocs.io/en/latest/ "Standardize testing in Python") mostram o seu valor. Nesse artigo,
vamos falar um pouquinho mais sobre a última.

## Antes de começar: Vida longa ao Python 3!

O _Python 2_ estará aí por mais um tempo (até 2020). Portanto, qual a motivação para mudar para o _Python 3_ agora?

Na [_Loadsmart_](https://loadsmart.com/ "Book a truck in seconds"), o nosso principal projeto é em _Python_ `2.7`.
Mas estamos experimentando _Python_ `3.x` há um bom tempo em projetos paralelos. O fato é que a nova versão da linguagem está mais eficiente,
possui suporte a assincronicidade, melhor controle de exceções e o fogo ardente do "unicode hell" foi controlado.

!["Indiana Jones encarando uma cobra"](/images/python-snakes.jpg "Migrar para Python 3 pode parecer assustador. Mas é tranquilo, Indy...")

É verdade que há quebra de compatibilidade entre as versões, mas se considerarmos que a `2.7` só tem mais 2 anos de "vida",
a urgência de migração fica mais latente.

## tox é uma sacada das boas!

O site oficial da biblioteca a define como:

> (...) a generic virtualenv management and test command line tool (...)

Com _tox_ é possível:

- Validar o seu pacote contra diferentes versões do _Python_;
- Rodar os seus testes em diferentes _environments_.

Não é só por usar [_ambientes virtuais_](/tag/virtualenv.html "Leia mais sobre Virtualenv") que o _tox_ é
uma boa ideia. Ele vem sendo uma mão na roda para os desenvolvedores de pacotes _Python_
que precisam dar suporte às versões `2.x` e `3.x`, e que utilizam testes automatizados como
_design_ das soluções.

Com o _Django_ a "granularidade" pode ser ainda maior, rodando testes em ambientes
que são combinações entre diferentes versões da linguagem e do _framework_.

## Antes de continuar: Travis e Build Matrix

Se você estiver utilizando o [_Travis CI_](), poderoso serviço de Continuous Integration, consegue reproduzir o comportamento que apresentaremos
a seguir através do uso de [_Build Matrix_](https://docs.travis-ci.com/user/customizing-the-build/#Build-Matrix "Customizing the build").

A diferença é que com o _tox_, podemos obter o mesmo comportamento em tempo de desenvolvimento. Agilizando um pouco mais o processo.

Veja mais em ["Travis CI for Python project"](https://vevurka.github.io/dsp17/git/quality/django/python/travis_ci_frisor/ "Setting up Travis CI for github repo in Python").

## Na prática

Vou aproveitar o tema e usar o _tox_ para me ajudar em um _refactoring_ de um _app_ de
código aberto, que há muito não dou suporte: O [django-simple-contact](https://github.com/kplaube/django-simple-contact "Veja no Github").

Se você quiser acompanhar o passo-a-passo, clone o projeto e dê um `git checkout` da _revisão_ `80145ae`:

```
$ git clone git@github.com:kplaube/django-simple-contact.git
$ cd django-simple-contact/
$ git checkout 80145ae
```

Na estrutura atual, é possível executar os testes através do `setup.py` ou `python runtests.py`:

```
$ python setup.py test
(...)
-----------------------------------------------
Ran 6 tests in 0.230s

OK
Destroying test database for alias 'default'...
```

É possível fazer a troca da versão do _Python/Django_ de forma manual (através do [_pyenv_](/tag/pyenv.html "Leia mais sobre pyenv"), por exemplo).
Obviamente que o _tox_ deixa tudo mais interessante (e automatizado).

### Instalando o tox

Finalmente, vamos adicionar a ferramenta ao projeto:

```
$ pip install tox
```

Caso esteja usando _pyenv_, a instalação do `tox-pyenv` é sugerida.
[Leia mais sobre a biblioteca](https://pypi.python.org/pypi/tox-pyenv "tox plugin that makes tox use `pyenv which` to find python executables").

Para deixar tudo mais organizado, vamos nos inspirar na estrutura do projeto
[_modelmommy_](https://github.com/vandersonmota/model_mommy "Object factory for django"). Criaremos um arquivo `requirements.txt` com o seguinte conteúdo:

```
# requirements.txt

bleach
django>=1.8.0
```

A versão `1.8.0` (até o momento) é a _LTS_ mais antiga, portanto, garantiremos suporte dessa versão em diante.
O [_bleach_](https://pypi.python.org/pypi/bleach "An easy safelist-based HTML-sanitizing tool") é uma dependência do projeto, não
relevante ao exemplo desse artigo.

É interessante deixarmos explícito a instalação do _tox_... um `requirements-dev.txt` pode ser uma solução:

```
# requirements-dev.txt

tox
```

Agora, quando um _dev_ juntar-se ao projeto, ele poderá executar o comando `pip install -r requirements-dev.txt`, e ter
as dependências necessárias para contribuir com o _app_.

### Configurando

Antes de executar a ferramenta é necessário criar um arquivo `tox.ini`, que será responsável por configurar os ambientes
e disparar os testes:

```ini
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
```

Por partes:

- `[tox]`: Aqui colocamos as configurações globais. `envlist` conterá a lista de ambientes nos quais executaremos os testes.
- `[testenv]`: Configurações por ambiente de teste. Poderíamos ter configurações específicas ao utilizar `[testenv:py36-django20]`, por exemplo.
  - `commands`: O comando a ser executado.
  - `setenv`: Variáveis de ambiente setadas para a execução dos testes.
  - `basepython`: Nome do interpretador _Python_ utilizado para a criação do ambiente virtual. Repare no "match" com `py27-` e `py36-` do `envlist`.
  - `deps`: Dependências para determinado ambiente de teste. Repare no "match" com `django{18,111,20}`.

Com o uso dos _brackets_, ao invés de criarmos um `testenv` para cada combinação (exemplo: `py27-django18`, `py27-django111`, `py36-django18`, etc),
o _tox_ fica responsável por fazer a "matriz de combinações".

Agora sim, podemos executar a ferramenta de linha de comando:

```
$ tox
(...)
ERROR:   py27-django18: commands failed
ERROR:   py27-django111: commands failed
ERROR:   py36-django18: commands failed
ERROR:   py36-django111: commands failed
py36-django20: commands succeeded
```

No meu ambiente local, como esperado, apenas os testes do ambiente `py36-django20` passaram. Para ter acesso a versão corrigida,
dê um _checkout_ da revisão `a37ebd1608`:

```
$ git checkout a37ebd1608
$ tox
(...)
py27-django18: commands succeeded
py27-django111: commands succeeded
py36-django18: commands succeeded
py36-django111: commands succeeded
py36-django20: commands succeeded
```

Perfeito!

Ainda é possível executar apenas os testes de um ambiente específico:

```
$ tox -e py36-django20
(...)
-----------------------------------------------
Ran 6 tests in 0.055s

OK
Destroying test database for alias 'default'...
```

O resultado final está disponível na _tag_ `0.3.0` do projeto.

## Considerações finais

Que esse movimento da comunidade _Django_ consiga influenciar ainda mais a adoção do _Python 3_. Admito que sem essa
"motivação extra", dificilmente cogitaria o _upgrade_ da linguagem em meus projetos nesse momento.

O _tox_ é sem dúvida uma ferramenta que pode auxiliar nessa fase de transição, portanto, não hesite em adicioná-la ao seu _toolbelt_.

Para uma integração _seamless_ com o _Travis CI_, o [_tox-travis_](https://github.com/tox-dev/tox-travis "Seamless integration of Tox into Travis CI")
é recomendado.

Até a próxima!

## Referências

- [ActiveState - Python 3 vs Python 2: It's different this time](https://www.activestate.com/blog/2017/01/python-3-vs-python-2-its-different-time)
- [Henrique Bastos - Desmistificando O Conceito De Django Apps](http://henriquebastos.net/desmistificando-o-conceito-de-django-apps/)
- [Jeremy Satterfield - Using Tox with Travis CI to Test Django Apps](http://jsatt.com/blog/using-tox-with-travis-ci-to-test-django-apps/)
- [vevurka-dev - Travis CI for Python project](https://vevurka.github.io/dsp17/git/quality/django/python/travis_ci_frisor/)
