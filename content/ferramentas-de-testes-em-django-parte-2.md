Title: Ferramentas de testes em Django - Parte 2
Date: 2011-07-23 18:00:00
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, django, bdd, tdd, testes
Slug: ferramentas-de-testes-em-django-parte-2
meta_description: Conheça algumas ferramentas que irão enriquecer o seu ambiente de desenvolvimento Python e Django, e lhe trarão maior segurança em seus testes de software.


{% img align-left /images/blog/crash-test-2.jpg 180 180 Imagem de um boneco de testes automotivos %}
No [*post* anterior][],
conhecemos as ferramentas *default* para construção de testes
automatizados em [*Django*][]. Acontece que você pode “sair um pouco da
caixa” e usufruir de ferramentas “third-party“, que enriquecerão o seu
ambiente de desenvolvimento e lhe trarão maior segurança em seus [testes
de *software*][].

<!-- PELICAN_END_SUMMARY -->


splinter – Testando a sua aplicação com um navegador
----------------------------------------------------

É perfeitamente possível criar testes de aceitação em Django com a
[*TestClient*][] e [*lxml*][]. Mas vamos ser sinceros, é deveras
trabalhoso “parsear” os resultados das suas *views*.

Com a [***Splinter***][], uma ferramenta para testes de aplicações
[*Web*][], você pode automatizar ações executadas por navegadores, como
visitar uma página, preencher um formulário ou clicar em um *link*; tudo
isso sem preocupar-se com *parsing*, nós, *DOM*, nem nada do tipo:

    ::python
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


O que eu acho mais bacana nesta ferramenta são os seletores, facilitam
muito na hora de checar resultados e comportamentos.

A comunidade em volta desta ferramenta está em constante crescimento e
atividade. Portanto, caso você queira contribuir com o projeto, vá agora
mesmo para o [repositório no *GitHub* e colabore][].


nose – Caçando testes em seu projeto (Python)
---------------------------------------------

E quando queremos fugir da regra? Aposto que chegará um momento em que a
estrutura de diretórios padrão, necessária para a execução dos seus
testes em *Django*, não te satisfará mais. O que fazer neste caso?
Simples, recorra ao *Nose*!

O [***Nose***][] estende os recursos da *unittest* e facilita a escrita
e carregamento dos testes em projetos [*Python*][]. De uma forma mais
detalhada, ele percorre o seu projeto (ou uma determinada região de seu
escolha) executando subclasses da **unittest.TestCase** ou funções que
contenham “test”. Por exemplo:

    ::python
    # test_subclasse.py
	import unittest
	
	class SubclasseTest(unittest.TestCase):
		def test_um_eh_verdadeiro(self):
			self.assertTrue(1)
	
	# test_funcao.py
	def test_zero_eh_falso():
		assert 0 == False


Ao executar o comando **nosetests** o *nose* se encarregará de procurar
e carregar os testes:

    ::bash
    $ nosetests
    ..
    ----------------------------------------------------------------------
    Ran 2 tests in 0.005s

    OK


É claro que existe uma “mágica” aí. Na verdade o *nose* pesquisará por
**arquivos** *Python* com “test” em seu nome, por **funções** com “test”
em seu enunciado, e por **classes** com métodos “test” em sua
declaração. Ele age mesmo como um “runner“, tendo a capacidade de lidar
com testes escritos com *unittest* ou não.

Essa é só a ponta do *iceberg*. É possível construir *plugins* para o
*nose*, permitindo melhorar ainda mais o seu ambiente de testes (como
por exemplo, permitir que o [*nose* funcione em *subprocess*
separados][]).


### Caçando testes em seu projeto (Django)

Para facilitar ainda mais a escrita de testes em *Django* existem
*plugins* como o [*django-nose*][], que permite que você substitua o
*Test Runner* padrão da *framework* por um específico que utiliza o
*nose*, unindo assim a facilidade e “add-ons” do *nose* com o ambiente
de testes do *Django*.


lettuce – BDD em Django
-------------------------------------------------

E se você estava se perguntando sobre [*BDD*][] em *Django*, eu
apresento a [***Lettuce***][]!

Esta ferramenta, baseada na [*Cucumber*][], permite com que você escreva
estórias utilizando linguagem ubíqua, mais próxima da área de negócios
do que da área técnica, e automatize a validação delas.

O mais bacana é que ela já vem preparada para o *Django*, permitindo que
a gente execute os testes de comportamento de forma fácil e rápida:

    ::text
    Feature: Rocking with lettuce and django
	
		Scenario: Simple Hello World
			Given I access the url "/"
			Then I see the header "Hello World"
		
		Scenario: Hello + capitalized name
			Given I access the url "/some-name"
			Then I see the header "Hello Some Name"


Estória escrita, vamos escrever o *script* *Python* que validará se está
tudo de acordo:

    ::python
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


Basta executá-lo da seguinte maneira:

    ::bash
    $ python manage.py harvest

[Confira mais informações sobre como utilizar o *lettuce* com *Django*][].


fudge – Ajude o Python a mentir
-------------------------------

O [***Fudge***][] é um módulo *Python* que auxilia na construção de
objetos “dublês” ([*mocks* e *stubs*][]), que permitem escrever testes
sem necessariamente possuir um serviço ativo ou um objeto construído.

Um caso comum: Você está construindo uma *API* que autentica via *OAuth*
ao *Twitter* e está utilizando testes para guiar o seu desenvolvimento.
Não é interessante que nossos testes sejam dependentes da
disponibilidade do serviço do *Twitter*, portanto, escrevemos um “objeto
mentiroso”, que simulará este serviço, aceitando uma entrada e gerando
um saída:

    ::python
    import fudge
	
	@fudge.patch('oauthtwitter.OAuthApi')
	def test(FakeOAuthApi):
		(FakeOAuthApi.expects_call()
		.with_args('', '',
					'', '')
		.returns_fake()
		.expects('UpdateStatus').with_arg_count(1))
	
	post_msg_to_twitter("hey there fellow testing freaks!")


Pronto! Sabendo que valores serão passados, e quais os resultados,
podemos simular o comportamento daquele serviço. Prático, não?


Considerações finais
--------------------

Estas são as ferramentas que eu costumo utilizar em meus projetos
*Python/Django*. É claro que existem outras, na verdade existem várias.
Tenha em mente que a ferramenta é apenas um meio de garantir, através de
testes, que você está guiando a sua aplicação para o lugar certo. Os
testes automatizados no final servem para garantir que ela ainda segue
este caminho, que contribuições realizadas tardiamente não “quebraram” o
comportamento que você escreveu no início do desenvolvimento.

Tenho a intenção de escrever um *post* mais prático sobre testes e
*Django*. Fiquem no aguardo ;)

E você? Tem alguma ferramenta para recomendar? Utilize os comentários
abaixo para compartilhá-la.


Referências
-----------

* [*CillianO – Django Full Stack Testing and BDD with Lettuce and Splinter*][]
* [*Danilo Sato* – Introduzindo Desenvolvimento Orientado por Comportamento *BDD*][]
* [*django-nose – GitHub repository*][]
* [*Fudge – Using Fudge*][]
* [*JPz’log – nose: Testing in Python made easy*][]
* [*Nose – Writing tests*][]
* [*Splinter – Test framework for web applications*][]

Até a próxima…


  [*post* anterior]: {filename}ferramentas-de-testes-em-django-parte-1.md
    "Ferramentas de testes em Django - Parte 1"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [testes de *software*]: {tag}testes
    "Leia mais sobre testes"
  [*TestClient*]: https://docs.djangoproject.com/en/dev/topics/testing/#module-django.test.client
    "Testando aplicações web com test client em Django"
  [*lxml*]: http://lxml.de/ "Faça parser XML e HTML com lxml"
  [***Splinter***]: http://splinter.cobrateam.info/
    "Visite a documentação oficial da Splinter"
  [*Web*]: {tag}web "Leia mais sobre Web"
  [repositório no *GitHub* e colabore]: https://github.com/cobrateam/splinter
    "Repositório da Splinter no GitHub"
  [***Nose***]: http://somethingaboutorange.com/mrl/projects/nose/1.0.0/
    "Nose - is nicer testing for Python"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*nose* funcione em *subprocess* separados]: http://pypi.python.org/pypi/nosepipe/
    "Conheça o nosepipe"
  [*django-nose*]: http://pypi.python.org/pypi/django-nose
    "Utilize o nose em seus projetos Django"
  [*BDD*]: {tag}bdd "Leia mais sobre BDD"
  [***Lettuce***]: http://lettuce.it/intro/overview.html#intro-overview
    "Saiba mais sobre a lettuce"
  [*Cucumber*]: http://cukes.info/ "Cucumber - Making BDD fun"
  [Confira mais informações sobre como utilizar o *lettuce* com *Django*]: http://lettuce.it/recipes/django-lxml.html#recipes-django-lxml
    "Django + Lettuce, uma dupla interessante!"
  [***Fudge***]: http://farmdev.com/projects/fudge/
    "Fudge, criando objetos mentirosos"
  [*mocks* e *stubs*]: http://www.infoq.com/br/articles/mocks-Arent-Stubs
    "Mocks não são Stubs"
  [*CillianO – Django Full Stack Testing and BDD with Lettuce and Splinter*]: http://cilliano.com/blog/2011/02/07/django-bdd-with-lettuce-and-splinter/
    "Leia sobre Django, BDD, Lettuce e Splinter"
  [*Danilo Sato* – Introduzindo Desenvolvimento Orientado por Comportamento *BDD*]: http://www.dtsato.com/blog/work/introduzindo_desenvolvimento_orientado_comportamento_bdd/
    "Não sabe o que é BDD? Conheça neste artigo de Danilo Sato"
  [*django-nose – GitHub repository*]: https://github.com/jbalogh/django-nose
    "Visite o repositório do django-nose no GitHub"
  [*Fudge – Using Fudge*]: http://farmdev.com/projects/fudge/using-fudge.html#fudging-a-web-service
    "Documentação oficial do Fudge"
  [*JPz’log – nose: Testing in Python made easy*]: http://jpz-log.info/archives/2010/06/08/nose-testing-in-python-made-easy/
    "Testes em Python passam a ser mais fáceis com nose"
  [*Nose – Writing tests*]: http://somethingaboutorange.com/mrl/projects/nose/1.0.0/writing_tests.html
    "Aprenda a escrever testes Python com o Nose"
  [*Splinter – Test framework for web applications*]: http://splinter.cobrateam.info/
    "Conheça o projeto Splinter, e envolva-se"
