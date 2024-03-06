---
title: "Ferramentas de testes em Django - Parte 1"
date: 2011-07-18 22:06:00
tags: ["desenvolvimento-web", "python", "django", "testes", "bdd", "tdd"]
slug: ferramentas-de-testes-em-django-parte-1
thumbnail: /media/crash-test.jpg
---

Dando continuidade à série
“[Montando seu ambiente de desenvolvimento *Django* no *Linux*][]“, vou
indicar algumas ferramentas de testes para que você também possa deixar
com que os [testes guiem o desenvolvimento de suas aplicações][].

Afinal, testar é preciso ;)

## Testar em Django é possível?

Sem dúvida nenhuma! Mas não espere que o _framework_ adeque-se a você,
você precisa ter a iniciativa de tentar compreender as melhores maneiras
para escrever testes em [*Django*][].

Por exemplo, se você tem por hábito isolar os modelos para [testá-los][]
de forma unitária, pode passar por certa dor de cabeça com o
[*Python*][] / _Django_. Não que seja impossível, mas o comportamento
_default_ do _framework_ é criar uma base de dados “fake” para você não
precisar ter este trabalho.

Enfim, talvez a forma de **utilizar** estas ferramentas **caiba em um
outro _post_**, o objetivo deste é **apenas apresentá-las**.

## unittest – Testando unidades através de classes

A [*unittest*][] é uma biblioteca padrão do _Python_ que ajuda (e muito)
a escrever testes automatizados com a linguagem.

Os testes são escritos através de classes, onde utilizamos os esquemas
de [*assertions*][] para garantir o comportamento do código testado
(nenhuma novidade até aqui). Para quem utiliza testes unitários no
_Java_ não vai sentir grandes mudanças na abordagem, já que a _unittest_
é inspirada na [*JUnit*][] (sendo muitas vezes até chamada de _PyUnit_):

```python
import unittest
from myapp.models import Animal

class AnimalTestCase(unittest.TestCase):
  def setUp(self):
    self.lion = Animal.objects.create(name="lion", sound="roar")
    self.cat = Animal.objects.create(name="cat", sound="meow")

  def testSpeaking(self):
    self.assertEquals(self.lion.speak(), 'The lion says "roar"')
    self.assertEquals(self.cat.speak(), 'The cat says "meow"')
```

O _test runner_ padrão do _Django_ irá procurar por subclasses de
`unittest.TestCase` nos arquivos `models.py` e `tests.py`. A suíte
de testes tenta facilitar ao máximo a sua vida… execute a seguinte
instrução e confira se a sua aplicação está _ok_ ou não:

```text
$ python manage.py test
```

### Peraí que não acabou! Apresentando a TestCase

Testar aplicações [*Web*][] com a _unittest_ pode ser dureza. Pensando
nisso o _Django_ disponibiliza a `TestCase`, que estende a _unittest_
adicionando funcionalidades como carregamento de _fixtures_, roteamento
de _urls_ e um _client_ para fazer requisições _Web_ e testar as suas
_views_ (o _TestClient_, detalhado mais abaixo).

## doctest – Testando através de docstrings

Admito que escrever documentação de _software_ não é o meu forte… mas
com _doctests_ pode-se documentar métodos ao mesmo tempo em que
escreve-se testes!

A [*doctest*][] é uma biblioteca padrão do _Python_ que procura e
interpreta [*docstrings*][] na aplicação. A sintaxe nesses trechos de
_docstrings_ é diferenciada, simulando um interpretador interativo do
_Python_:

```python
# models.py
from django.db import models

class Animal(models.Model):
  """
  An animal that knows how to make noise

  # Create some animals
  >>> lion = Animal.objects.create(name="lion", sound="roar")
  >>> cat = Animal.objects.create(name="cat", sound="meow")

  # Make 'em speak
  >>> lion.speak()
  'The lion says "roar"'
  >>> cat.speak()
  'The cat says "meow"'
  """
  name = models.CharField(max_length=20)
  sound = models.CharField(max_length=20)

  def speak(self):
    return 'The %s says "%s"' % (self.name, self.sound)
```

Assim como com a _unittest_, o _test runner_ padrão do _Django_
procurará por ocorrências de _docstests_ em `models.py` e
`tests.py`.

## Django Test Client – Testando a sua aplicação como se fosse um navegador

E como fazer para testar requisições _Web_? Por exemplo, você não quer
testar a sua _view_ de forma isolada, quer testar desde a parte de
roteamento ao comportamento com o banco de dados, como se você se
estivesse realmente visitando a página. Neste caso entra a [*test
client*][].

Toda a classe `TestCase` possui uma instância da **Django Test
Client**. Então escrever testes com requisições à sua aplicação fica
muito simples utilizando classes:

```python
from django.test import TestCase

class SimpleTest(TestCase):
  def test_details(self):
    response = self.client.get('/customer/details/')
    self.assertEqual(response.status_code, 200)

  def test_index(self):
    response = self.client.get('/customer/index/')
    self.assertEqual(response.status_code, 200)
```

É perfeitamente possível utilizar a **test client** em _doctests_
também:

```python
"""
>>> from django.test.client import Client
>>> c = Client()
>>> response = c.post('/login/', {'username': 'john',
...        'password': 'smith'})
>>> response.status_code
200
"""
```

## Considerações finais

Particularmente, tive a oportunidade de implementar testes unitários já
no início do meu aprendizado em _Django_. Deixar os testes te guiarem é
uma prática excelente!

Tudo parte do bom senso, óbvio. Nenhum processo ou ferramenta deveria
substituir o “feeling” do profissional… também não é muito sadio ser
extremamente “by the book“. Mas se puder utilizar testes para guiar o
seu desenvolvimento, use-os!

Na segunda parte deste _post_ pretendo apresentar algumas ferramentas
que irão turbinar ainda mais o seu desenvolvimento orientado a testes.

Até lá!

## Referências

- [*Django Documentation – Writing unit tests*][]
- [*Django Documentation – Writing doctests*][]
- [*Django Documentation – TestCase*][]
- [*Python Documentation – unittest: Unit testing framework*][]
- [*Dougal Matthews – Testing your first Django app*][]
- [*Konrad’s Kode, Konfigs & Konstructions – Testing Django*][]
- [*Marinho Brandão* – Programação dirigida a testes no *Django*][]

[montando seu ambiente de desenvolvimento *django* no *linux*]: /2011/03/03/montando-seu-ambiente-de-desenvolvimento-django.html "Veja outros posts desta série"
[testes guiem o desenvolvimento de suas aplicações]: /2011/01/27/tdd-desenvolvimento-orientado-testes.html "TDD: Desenvolvimento Orientado a Testes"
[*django*]: /tag/django.html "Leia mais sobre Django"
[testá-los]: /tag/testes.html "Leia mais sobre testes"
[*python*]: /tag/python.html "Leia mais sobre Python"
[*unittest*]: http://docs.python.org/library/unittest.html "unittest — Unit testing framework"
[*assertions*]: http://docs.python.org/library/unittest.html#assert-methods "Veja a lista de asserts da unittest"
[*junit*]: http://javafree.uol.com.br/wiki/JUnit "Leia mais sobre a JUnit"
[*web*]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[*doctest*]: http://docs.python.org/library/doctest.html "Leia mais sobre a doctest"
[*docstrings*]: http://www.python.org/dev/peps/pep-0257/ "Entenda o que é uma docstring"
[*test client*]: https://docs.djangoproject.com/en/dev/topics/testing/#module-django.test.client "Testando aplicações Django com requisições Web falsas"
[*django documentation – writing unit tests*]: https://docs.djangoproject.com/en/1.1/topics/testing/#writing-unit-tests "Leia direto da fonte como escrever testes em Django"
[*django documentation – writing doctests*]: https://docs.djangoproject.com/en/1.1/topics/testing/#writing-doctests "Leia direto da fonte sobre como escrever testes com docstrings"
[*django documentation – testcase*]: https://docs.djangoproject.com/en/1.1/topics/testing/#testcase "Entenda a diferença entre unittest do Python e o TestCase do Django"
[*python documentation – unittest: unit testing framework*]: http://docs.python.org/library/unittest.html "Leia sobre a unittest direto da documentação do Python"
[*dougal matthews – testing your first django app*]: http://dougalmatthews.com/articles/2010/jan/20/testing-your-first-django-app/ "Aprenda a testar a sua primeira aplicação em Django"
[*konrad’s kode, konfigs & konstructions – testing django*]: http://kokoko.fluxionary.net/testing-django-part-1-nose "O Konrad apresenta algumas ferramentas muito boas para testes com Django"
[*marinho brandão* – programação dirigida a testes no *django*]: http://www.marinhobrandao.com/blog/programacao-dirigida-a-testes-no-django/ "Aprenda Django de uma forma divertida com o Marinho"
