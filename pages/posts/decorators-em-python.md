---
title: "Decorators em Python"
date: 2011-08-02 20:00:00
tags: ["python", "oop", "design-patterns", "decorators"]
slug: decorators-em-python
thumbnail: ./images/python-logo.png
---

E na mesma linha dos [*closures*][], eu passei a
saber realmente o que são _decorators_ depois de utilizar o _framework_
[*Django*][]. Se você está trabalhando com [Orientação a Objetos][] e
até agora não se deparou com este recurso, te garanto que um dia você
precisará dele… afinal, é um dos [*Design Patterns*][] mais bacanas (e
úteis) que já vi.

Vamos lá “decorar” nossos métodos [*Python*][]!

## Decoradores? Really?

Eu não saberia explicar de uma forma melhor do que foi explicado pela
[*Wikipedia*][], o que é o padrão decorator:

- **Intenção:** Acrescentar responsabilidades a um objeto
  dinamicamente. Prover alternativa flexível ao uso de subclasses para
  se estender a funcionalidade de uma classe;
- **Motivação:** Objeto usado possui as funcionalidades básicas, mas é
  necessário adicionar funcionalidades adicionais a ele que podem
  ocorrer antes ou depois da funcionalidade básica. Funcionalidades
  devem ser adicionadas em instancias individuais e não na classe;
- **Consequências:** Mais flexibilidade do que herança.

Encontramos na [*Wiki* do *Python*][] uma explicação mais objetiva e
esclarecedora:

> Decorators alteram dinamicamente a funcionalidade de uma função,
> método ou classe, sem uso direto de subclasses ou alterando o
> código-fonte da função “decorada”.

## O uso de decorators em Python

O _Python_ começou a dar suporte a _decorators_ a partir da **versão
2.4**.

Você terá a sua disposição alguns decoradores _built-in_ e também poderá
criar os seus próprios sem muito dificuldade. É possível identificar um
_decorator_ através do caractere `@`, por exemplo, a instrução abaixo
declara o método `say_hello` da classe `People` como estático:

```python
class People:
  @staticmethod
  def say_hello():
    print 'Hello!'
```

Vale notar que podemos reproduzir o comportamento acima sem utilizar a
sintaxe especial de _decorators_ (mas não deixamos de utilizar o
conceito):

```python
class People:
  def say_hello():
    print 'Hello!'
  say_hello = staticmethod(say_hello)
```

Quer conhecer mais sobre _decorators_ em _Python_? Leia a
[*PEP 318 – Decorators for functions and methods*][].

## Um pouco de prática

Vamos por a mão na massa e criar o nosso próprio _decorator_:

```python
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
```

Chamando o _script_ acima, teremos o seguinte resultado:

```text
$ python meu_decorator.py

Chamando a funcao "meu_alvo"
Eu sou um alvo!
```

Vou tentar seguir um fluxo que deixe claro o que o procedimento está
realizando.

O comportamento da função `meu_alvo` é muito simples: imprimir `“Eu sou um alvo!”` na tela. Mas o `@meu_decorador` está lá para
complicar a nossa vida :D

Com a chamada de `@meu_decorador` logo acima de `meu_alvo`, fica
claro que na verdade estamos passando `meu_alvo` como um parâmetro
(`alvo`) para o método `meu_decorador`, encontrado logo no início
do arquivo. Note que o método retorna `wrapper` sem os parênteses no
final (que caracterizam uma chamada de função), ele está retornando
apenas a referência ao método `wrapper`, que será de fato “executado”
externamente.

Dentro da função `wrapper` temos a impressão da _string_ `‘Chamando a funcao “meu_alvo”‘` e a execução de `meu_alvo`. Isto deve-se ao
fato de que `alvo` nada mais é que uma referência a função
`meu_alvo`, que passamos como argumento para `meu_decorador`
através do `@meu_decorador` logo acima da função `meu_alvo`,
certo?

Então resumindo isso tudo, o resultado final é que `meu_alvo()` no
final do arquivo na verdade é a execução da referência a `wrapper`, ou
seja, é o mesmo que ler `“wrapper()“`. Ele fará o _print_ e
posteriormente retornará o resultado de `meu_alvo`, que nada mais é
que a impressão de `“Eu sou um alvo!”`.

Bacana não? Aqui vai mais um para deixar as coisas um pouco mais claras…
vamos simular o esquema de roteamento de um _framework_ [*web*][]:

```python
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
```

## Referências

- [*Devlog – @decorators*][]
- [*Five Minutes – A quick introduction to Python decorators*][]
- [*Python.org – Design Patterns in Python*][]
- [*Python.org – Python Decorators*][]
- [*Siafoo – Python Decorators Don’t Have to be (that) Scary*][]
- [*Wikipedia – Decorator*][]

Até a próxima…

[*closures*]: /2011/05/29/afinal-o-que-sao-closures.html "Afinal, o que são Closures?"
[*django*]: /tag/django.html "Leia mais sobre Django"
[orientação a objetos]: /tag/oop.html "Leia mais sobre OOP"
[*design patterns*]: http://pt.wikipedia.org/wiki/Padr%C3%A3o_de_projeto_de_software "Conheça os Design Patterns"
[*python*]: /tag/python.html "Leia mais sobre Python"
[*wikipedia*]: http://pt.wikipedia.org/wiki/Decorator "Leia mais sobre o pattern Decorator"
[*wiki* do *python*]: http://wiki.python.org/moin/FrontPage "Wiki oficial da linguagem Python"
[*pep 318 – decorators for functions and methods*]: http://www.python.org/dev/peps/pep-0318/ "Leia mais sobre a PEP318"
[*web*]: /tag/desenvolvimento-web.html
[*devlog – @decorators*]: http://devlog.waltercruz.com/python_decorators "Walter Cruz em um excelente post sobre Decorators em Python"
[*five minutes – a quick introduction to python decorators*]: http://www.fiveminutes.eu/a-quick-introduction-to-python-decorators/ "Uma introdução rápida aos decorators em Python. Muito bom!"
[*python.org – design patterns in python*]: http://www.python.org/workshops/1997-10/proceedings/savikko.html "Padrões de Projetos em Python."
[*python.org – python decorators*]: http://wiki.python.org/moin/PythonDecorators "Decorators em Python, direto da Wiki oficial do Python"
[*siafoo – python decorators don’t have to be (that) scary*]: http://www.siafoo.net/article/68 "Decorators em Python não precisam ser assustadores. Um ótimo artigo."
[*wikipedia – decorator*]: http://pt.wikipedia.org/wiki/Decorator "Leia mais na Wikipedia sobre Decorators"
