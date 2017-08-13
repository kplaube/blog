Title: Decorators em Python
Date: 2011-08-02 20:00:00
Category: desenvolvimento
Tags: desenvolvimento, python, oop, design-patterns, decorators
Slug: decorators-em-python
meta_description: Decorators alteram dinamicamente a funcionalidade de uma função, método ou classe, sem uso direto de subclasses ou alterando o código-fonte da função “decorada”.


{% img align-left /images/blog/python-logo.png 180 180 Logotipo do Python %}

E na mesma linha dos [*closures*][], eu passei a
saber realmente o que são *decorators* depois de utilizar a *framework*
[*Django*][]. Se você está trabalhando com [Orientação a Objetos][] e
até agora não se deparou com este recurso, te garanto que um dia você
precisará dele… afinal, é um dos [*Design Patterns*][] mais bacanas (e
úteis) que já vi.

<!-- PELICAN_END_SUMMARY -->

Vamos lá “decorar” nossos métodos [*Python*][]!


Decoradores? Really?
--------------------

Eu não saberia explicar de uma forma melhor do que foi explicado pela
[*Wikipedia*][], o que é o padrão decorator:

* **Intenção:** Acrescentar responsabilidades a um objeto
    dinamicamente. Prover alternativa flexível ao uso de subclasses para
    se estender a funcionalidade de uma classe;
* **Motivação:** Objeto usado possui as funcionalidades básicas, mas é
    necessário adicionar funcionalidades adicionais a ele que podem
    ocorrer antes ou depois da funcionalidade básica. Funcionalidades
    devem ser adicionadas em instancias individuais e não na classe;
* **Consequências:** Mais flexibilidade do que herança.

Encontramos na [*Wiki* do *Python*][] uma explicação mais objetiva e
esclarecedora:

> Decorators alteram dinamicamente a funcionalidade de uma função,
> método ou classe, sem uso direto de subclasses ou alterando o
> código-fonte da função “decorada”.


O uso de decorators em Python
-----------------------------

O *Python* começou a dar suporte a *decorators* a partir da **versão
2.4**.

Você terá a sua disposição alguns decoradores *built-in* e também poderá
criar os seus próprios sem muito dificuldade. É possível identificar um
*decorator* através do caractere **@**, por exemplo, a instrução abaixo
declara o método **say\_hello** da classe **People** como estático:

    ::python
    class People:
		@staticmethod
		def say_hello():
			print 'Hello!'


Vale notar que podemos reproduzir o comportamento acima sem utilizar a
sintaxe especial de *decorators* (mas não deixamos de utilizar o
conceito):

    ::python
    class People:
		def say_hello():
			print 'Hello!'
		say_hello = staticmethod(say_hello)


Quer conhecer mais sobre *decorators* em *Python*? Leia a
[*PEP 318 – Decorators for functions and methods*][].


Um pouco de prática
-------------------

Vamos por a mão na massa e criar o nosso próprio *decorator*:

    ::python
	# meu_decorator.py
	
	def meu_decorador(alvo):
		def wrapper():
			print 'Chamando a funcao "%s"' % alvo.__name__
			return alvo()
		
		return wrapper

	@meu_decorador
	def meu_alvo():
		print 'Eu sou um alvo!'

	meu_alvo()


Chamando o *script* acima, teremos o seguinte resultado:

    ::bash
    $ python meu_decorator.py

    Chamando a funcao "meu_alvo"
    Eu sou um alvo!


Vou tentar seguir um fluxo que deixe claro o que o procedimento está
realizando.

O comportamento da função **meu\_alvo** é muito simples: imprimir **“Eu
sou um alvo!”** na tela. Mas o **@meu\_decorador** está lá para
complicar a nossa vida :D

Com a chamada de **@meu\_decorador** logo acima de **meu\_alvo**, fica
claro que na verdade estamos passando **meu\_alvo** como um parâmetro
(**alvo**) para o método **meu\_decorador**, encontrado logo no início
do arquivo. Note que o método retorna **wrapper** sem os parênteses no
final (que caracterizam uma chamada de função), ele está retornando
apenas a referência ao método **wrapper**, que será de fato “executado”
externamente.

Dentro da função **wrapper** temos a impressão da *string* **‘Chamando a
funcao “meu\_alvo”‘** e a execução de **meu\_alvo**. Isto deve-se ao
fato de que **alvo** nada mais é que uma referência a função
**meu\_alvo**, que passamos como argumento para **meu\_decorador**
através do **@meu\_decorador** logo acima da função **meu\_alvo**,
certo?

Então resumindo isso tudo, o resultado final é que **meu\_alvo()** no
final do arquivo na verdade é a execução da referência a **wrapper**, ou
seja, é o mesmo que ler **“wrapper()“**. Ele fará o *print* e
posteriormente retornará o resultado de **meu\_alvo**, que nada mais é
que a impressão de **“Eu sou um alvo!”**.

Bacana não? Aqui vai mais um para deixar as coisas um pouco mais claras…
vamos simular o esquema de roteamento de uma *framework* [*Web*][]:

    ::python
    rotas = []
	
	def rota(endereco):
		def wrapper(fn):
			rotas.append((endereco, fn))
		
		return wrapper
	
	@rota('/index/')
	def home_view():
		return 'Pagina inicial'
	
	@rota('/contato/')
	def contato_view():
		return 'Pagina de contato'
	
	print rotas[0][1]()  # Pagina inicial
	print rotas[1][1]()  # Pagina de contato
	print rotas          
	# [('/index/', < function home_view at 0xb736580c >),
	#  ('/contato/', < function contato_view at 0xb7365b8c >)]


Referências
-----------

* [*Devlog – @decorators*][]
* [*Five Minutes – A quick introduction to Python decorators*][]
* [*Python.org – Design Patterns in Python*][]
* [*Python.org – Python Decorators*][]
* [*Siafoo – Python Decorators Don’t Have to be (that) Scary*][]
* [*Wikipedia – Decorator*][]

Até a próxima…


  [*closures*]: {filename}afinal-o-que-sao-closures.md
    "Afinal, o que são Closures?"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [Orientação a Objetos]: {tag}oop
    "Leia mais sobre OOP"
  [*Design Patterns*]: http://pt.wikipedia.org/wiki/Padr%C3%A3o_de_projeto_de_software
    "Conheça os Design Patterns"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*Wikipedia*]: http://pt.wikipedia.org/wiki/Decorator
    "Leia mais sobre o pattern Decorator"
  [*Wiki* do *Python*]: http://wiki.python.org/moin/FrontPage
    "Wiki oficial da linguagem Python"
  [*PEP 318 – Decorators for functions and methods*]: http://www.python.org/dev/peps/pep-0318/
    "Leia mais sobre a PEP318"
  [*Web*]: {tag}web
  [*Devlog – @decorators*]: http://devlog.waltercruz.com/python_decorators
    "Walter Cruz em um excelente post sobre Decorators em Python"
  [*Five Minutes – A quick introduction to Python decorators*]: http://www.fiveminutes.eu/a-quick-introduction-to-python-decorators/
    "Uma introdução rápida aos decorators em Python. Muito bom!"
  [*Python.org – Design Patterns in Python*]: http://www.python.org/workshops/1997-10/proceedings/savikko.html
    "Padrões de Projetos em Python."
  [*Python.org – Python Decorators*]: http://wiki.python.org/moin/PythonDecorators
    "Decorators em Python, direto da Wiki oficial do Python"
  [*Siafoo – Python Decorators Don’t Have to be (that) Scary*]: http://www.siafoo.net/article/68
    "Decorators em Python não precisam ser assustadores. Um ótimo artigo."
  [*Wikipedia – Decorator*]: http://pt.wikipedia.org/wiki/Decorator
    "Leia mais na Wikipedia sobre Decorators"
