---
title: "Ferramentas de testes em Django - Parte 2"
date: 2011-07-23 18:00:00
tags: ["desenvolvimento-web", "python", "django", "bdd", "tdd", "testes"]
slug: ferramentas-de-testes-em-django-parte-2
thumbnail: ./images/crash-test-2.jpg
---

No [*post* anterior][],
conhecemos as ferramentas _default_ para construção de testes
automatizados em [*Django*][]. Acontece que você pode “sair um pouco da
caixa” e usufruir de ferramentas “third-party“, que enriquecerão o seu
ambiente de desenvolvimento e lhe trarão maior segurança em seus [testes
de *software*][].

## splinter – Testando a sua aplicação com um navegador

É perfeitamente possível criar testes de aceitação em _Django_ com a
[*TestClient*][] e [*lxml*][]. Mas vamos ser sinceros, é deveras
trabalhoso “parsear” os resultados das suas _views_.

Com a [_Splinter_][], uma ferramenta para testes de aplicações
[*web*][], você pode automatizar ações executadas por navegadores, como
visitar uma página, preencher um formulário ou clicar em um _link_; tudo
isso sem preocupar-se com _parsing_, nós, _DOM_, nem nada do tipo:

```python
from splinter.browser
import Browser

browser = Browser()

# Visitar uma URL
url = "http://search.twitter.com"
browser.visit(url)
browser.fill('q', "#cobrateam")

# Procurar e clicar no botão 'search'
button = browser.find_by_css("#searchButton input").first

# Interagir com os elementos
button.click()

if browser.is_text_present("No results for #cobrateam"):
    print "nobody likes us =("
else:
    print "we're popular =)"
```

O que eu acho mais bacana nesta ferramenta são os seletores, facilitam
muito na hora de checar resultados e comportamentos.

A comunidade em volta desta ferramenta está em constante crescimento e
atividade. Portanto, caso você queira contribuir com o projeto, vá agora
mesmo para o [repositório no *GitHub* e colabore][].

## nose – Caçando testes em seu projeto (Python)

E quando queremos fugir da regra? Aposto que chegará um momento em que a
estrutura de diretórios padrão, necessária para a execução dos seus
testes em _Django_, não te satisfará mais. O que fazer neste caso?
Simples, recorra ao _Nose_!

O [_Nose_][] estende os recursos da _unittest_ e facilita a escrita
e carregamento dos testes em projetos [*Python*][]. De uma forma mais
detalhada, ele percorre o seu projeto (ou uma determinada região de seu
escolha) executando subclasses da `unittest.TestCase` ou funções que
contenham “test”. Por exemplo:

```python
# test_subclasse.py
import unittest

class SubclasseTest(unittest.TestCase):
    def test_um_eh_verdadeiro(self):
        self.assertTrue(1)

# test_funcao.py
def test_zero_eh_falso():
    assert 0 == False
```

Ao executar o comando **nosetests** o _nose_ se encarregará de procurar
e carregar os testes:

```text
$ nosetests
..
----------------------------------------------------------------------
Ran 2 tests in 0.005s

OK
```

É claro que existe uma “mágica” aí. Na verdade o _nose_ pesquisará por
**arquivos** _Python_ com “test” em seu nome, por **funções** com “test”
em seu enunciado, e por **classes** com métodos “test” em sua
declaração. Ele age mesmo como um “runner“, tendo a capacidade de lidar
com testes escritos com _unittest_ ou não.

Essa é só a ponta do _iceberg_. É possível construir _plugins_ para o
_nose_, permitindo melhorar ainda mais o seu ambiente de testes (como
por exemplo, permitir que o [*nose* funcione em *subprocess*
separados][]).

### Caçando testes em seu projeto (Django)

Para facilitar ainda mais a escrita de testes em _Django_ existem
_plugins_ como o [*django-nose*][], que permite que você substitua o
_Test Runner_ padrão da _framework_ por um específico que utiliza o
_nose_, unindo assim a facilidade e “add-ons” do _nose_ com o ambiente
de testes do _Django_.

## lettuce – BDD em Django

E se você estava se perguntando sobre [*BDD*][] em _Django_, eu
apresento a [_Lettuce_][]!

Esta ferramenta, baseada na [*Cucumber*][], permite com que você escreva
histórias utilizando linguagem ubíqua, mais próxima da área de negócios
do que da área técnica, e automatize a validação delas.

O mais bacana é que ela já vem preparada para o _Django_, permitindo que
a gente execute os testes de comportamento de forma fácil e rápida:

```gherkin
Feature: Rocking with lettuce and django

    Scenario: Simple Hello World
        Given I access the url "/"
        Then I see the header "Hello World"

    Scenario: Hello + capitalized name
        Given I access the url "/some-name"
        Then I see the header "Hello Some Name"
```

História escrita, vamos escrever o _script_ _Python_ que validará se está
tudo de acordo:

```python
from lettuce import *
from lxml import html
from django.test.client import Client

@before.all
def set_browser():
    world.browser = Client()

@step(r'I access the url "(.*)"')
def access_url(step, url):
    response = world.browser.get(url)
    world.dom = html.fromstring(response.content)

@step(r'I see the header "(.*)"')
def see_header(step, text):
    header = world.dom.cssselect('h1')[0]
    assert header.text == text
```

Basta executá-lo da seguinte maneira:

```text
$ python manage.py harvest
```

[Confira mais informações sobre como utilizar o *lettuce* com *Django*][].

## fudge – Ajude o Python a mentir

O [_Fudge_][] é um módulo _Python_ que auxilia na construção de
objetos “dublês” ([*mocks* e *stubs*][]), que permitem escrever testes
sem necessariamente possuir um serviço ativo ou um objeto construído.

Um caso comum: Você está construindo uma _API_ que autentica via _OAuth_
ao _Twitter_ e está utilizando testes para guiar o seu desenvolvimento.
Não é interessante que nossos testes sejam dependentes da
disponibilidade do serviço do _Twitter_, portanto, escrevemos um “objeto
mentiroso”, que simulará este serviço, aceitando uma entrada e gerando
um saída:

```python
import fudge

@fudge.patch('oauthtwitter.OAuthApi')
def test(FakeOAuthApi):
    (FakeOAuthApi.expects_call()
    .with_args('', '',
                '', '')
    .returns_fake()
    .expects('UpdateStatus').with_arg_count(1))

post_msg_to_twitter("hey there fellow testing freaks!")
```

Pronto! Sabendo que valores serão passados, e quais os resultados,
podemos simular o comportamento daquele serviço. Prático, não?

## Considerações finais

Estas são as ferramentas que eu costumo utilizar em meus projetos
_Python/Django_. É claro que existem outras, na verdade existem várias.
Tenha em mente que a ferramenta é apenas um meio de garantir, através de
testes, que você está guiando a sua aplicação para o lugar certo. Os
testes automatizados no final servem para garantir que ela ainda segue
este caminho, que contribuições realizadas tardiamente não “quebraram” o
comportamento que você escreveu no início do desenvolvimento.

Tenho a intenção de escrever um _post_ mais prático sobre testes e
_Django_. Fiquem no aguardo ;)

E você? Tem alguma ferramenta para recomendar? Utilize os comentários
abaixo para compartilhá-la.

## Referências

- [*CillianO – Django Full Stack Testing and BDD with Lettuce and Splinter*][]
- [*Danilo Sato* – Introduzindo Desenvolvimento Orientado por Comportamento *BDD*][]
- [*django-nose – GitHub repository*][]
- [*Fudge – Using Fudge*][]
- [*JPz’log – nose: Testing in Python made easy*][]
- [*Nose – Writing tests*][]
- [*Splinter – Test framework for web applications*][]

Até a próxima…

[*post* anterior]: /2011/07/18/ferramentas-de-testes-em-django-parte-1.html "Ferramentas de testes em Django - Parte 1"
[*django*]: /tag/django.html "Leia mais sobre Django"
[testes de *software*]: /tag/testes.html "Leia mais sobre testes"
[*testclient*]: https://docs.djangoproject.com/en/dev/topics/testing/#module-django.test.client "Testando aplicações web com test client em Django"
[*lxml*]: http://lxml.de/ "Faça parser XML e HTML com lxml"
[_splinter_]: http://splinter.cobrateam.info/ "Visite a documentação oficial da Splinter"
[*web*]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[repositório no *github* e colabore]: https://github.com/cobrateam/splinter "Repositório da Splinter no GitHub"
[_nose_]: http://somethingaboutorange.com/mrl/projects/nose/1.0.0/ "Nose - is nicer testing for Python"
[*python*]: /tag/python.html "Leia mais sobre Python"
[*nose* funcione em *subprocess* separados]: http://pypi.python.org/pypi/nosepipe/ "Conheça o nosepipe"
[*django-nose*]: http://pypi.python.org/pypi/django-nose "Utilize o nose em seus projetos Django"
[*bdd*]: /tag/bdd.html "Leia mais sobre BDD"
[_lettuce_]: http://lettuce.it/intro/overview.html#intro-overview "Saiba mais sobre a lettuce"
[*cucumber*]: http://cukes.info/ "Cucumber - Making BDD fun"
[confira mais informações sobre como utilizar o *lettuce* com *django*]: http://lettuce.it/recipes/django-lxml.html#recipes-django-lxml "Django + Lettuce, uma dupla interessante!"
[_fudge_]: http://farmdev.com/projects/fudge/ "Fudge, criando objetos mentirosos"
[*mocks* e *stubs*]: http://www.infoq.com/br/articles/mocks-Arent-Stubs "Mocks não são Stubs"
[*cilliano – django full stack testing and bdd with lettuce and splinter*]: http://cilliano.com/blog/2011/02/07/django-bdd-with-lettuce-and-splinter/ "Leia sobre Django, BDD, Lettuce e Splinter"
[*danilo sato* – introduzindo desenvolvimento orientado por comportamento *bdd*]: http://www.dtsato.com/blog/work/introduzindo_desenvolvimento_orientado_comportamento_bdd/ "Não sabe o que é BDD? Conheça neste artigo de Danilo Sato"
[*django-nose – github repository*]: https://github.com/jbalogh/django-nose "Visite o repositório do django-nose no GitHub"
[*fudge – using fudge*]: http://farmdev.com/projects/fudge/using-fudge.html#fudging-a-web-service "Documentação oficial do Fudge"
[*jpz’log – nose: testing in python made easy*]: http://jpz-log.info/archives/2010/06/08/nose-testing-in-python-made-easy/ "Testes em Python passam a ser mais fáceis com nose"
[*nose – writing tests*]: http://somethingaboutorange.com/mrl/projects/nose/1.0.0/writing_tests.html "Aprenda a escrever testes Python com o Nose"
[*splinter – test framework for web applications*]: http://splinter.cobrateam.info/ "Conheça o projeto Splinter, e envolva-se"
