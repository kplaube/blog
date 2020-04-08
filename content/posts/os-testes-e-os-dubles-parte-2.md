---
title: "Os testes e os dublês - Parte 2"
date: 2015-06-29 12:30:00
tags: ["testes", "mock", "python"]
slug: os-testes-e-os-dubles-parte-2
thumbnail: ./images/tdd-red-green-refactor.png
---

No [_post_ anterior](/2014/08/07/os-testes-e-os-dubles-parte-1.html "Os testes e os Dublês - Parte 1"), vimos um dos
cenários de testes utilizados por times da [_Globo.com_](http://globo.com "Absolutamente tudo sobre notícias, esportes e entretenimento"), onde não escrevemos testes "isolados"
(famigerados _[microtests](https://elearning.industriallogic.com/gh/submit?Action=AlbumContentsAction&album=theBasics&devLanguage=Java "Testing Single Responsibilities at High Speed")_),
e abusamos da integração entre classes e serviços.

Mas até mesmo para nós existe um limite que não podemos ultrapassar: O caso
de uma consulta a uma _API_ externa, por exemplo. Nesse cenário, precisamos
fingir que estamos fazendo isso, sem perder a segurança em nossas asserções.

## Dublês ao resgate

Como já mencionado, os _test doubles_ têm por finalidade substituir um objeto
real, afim de validar algum conceito em nossos testes.

Para auxiliar-nos nessa demanda, vamos utilizar a **Python Mock**, biblioteca
de _mocking_ padrão do _Python 3_. Com ela, poderemos fingir integrações
complexas da nossa aplicação, com o objetivo de testar um determinado
comportamento em "custo" e tempos atrativos.

!["I find your lack of tests disturbing (jasonpolites.github.io)"](./images/testing-vader.jpg "I find your lack of tests disturbing (jasonpolites.github.io)")

Se você (assim como eu) ainda está no _Python 2.7.X_, podemos instalar a _lib_
através do `pip`:

```text
$ pip install mock
```

[Mais instruções para instalação da _Mock_](http://www.voidspace.org.uk/python/mock/#installing "Mock - Installing").

Uma vez instalada, podemos partir para conceituar de forma prática cada um dos
tipos de dublês listados no _post_ anterior.

## Dummys

Um _Dummy Object_ é um tipo de dublê muito simples, que é usado apenas para
preencher passagens de parâmetros:

```python
class Carro:
    rodas = 4

    def __init__(self, descricao, fabricante):
        self.descricao = descricao
        self.fabricante = fabricante

# Teste

def test_usando_dummy():
    fabricante = None
    carro = Carro('Fusca', fabricante)

    assert carro.rodas == 4
```

Como observado, um _Dummy_ não precisa ser necessariamente um _mock_. Um valor
em branco, nulo, uma string vazia, qualquer coisa usada para substituir um
objeto real em uma passagem de parâmetro, pode ser considerado um _Dummy_.

## Fakes

Um _Fake_ é um objeto com certa funcionalidade, muito útil para resolver
alguma dependência em testes, mas que não é ideal para o ambiente de
produção:

```python
class Carro:
    rodas = 4

    def __init__(self, descricao, fabricante):
        self.descricao = descricao
        self.fabricante = fabricante

    def __str__(self):
        return "{0} ({1})".format(
            self.descricao,
            self.fabricante.get_descricao(),
        )

# Teste

class FabricanteFake:
    descricao = 'Volkswagen'

    def get_descricao(self):
        return self.descricao

def test_usando_fake():
    fabricante = FabricanteFake()
    carro = Carro('Fusca', fabricante)

    assert str(carro) == 'Fusca (Volkswagen)'
```

No exemplo acima, (ainda) não utilizamos nenhum recurso da **Mock**. Dependendo
do contexto, não precisamos de uma biblioteca para criarmos um _Fake_, e isso
pode ser encarado de forma positiva, pois fica muito clara a nossa intenção
no teste.

É relativamente comum vermos _Fakes_ sendo utilizados para "dublar" acessos
a um banco de dados. Quando falamos de testes em [_Django_](/tag/django.html "Leia mais sobre Django"),
geralmente utilizamos uma persistência mais leve (como um banco _SQLite_, por exemplo)
que substitui um banco mais complexo, tornando a nossa suíte de testes
mais simples.

## Mocks

Um tipo de dublê criado para um teste específico. Com ele, somos capazes
de setar retornos de valores pré-definidos, bem como verificar se algum
método foi chamado durante a execução do teste:

```python
class Carro:
    rodas = 4

    def __init__(self, descricao, fabricante):
        self.descricao = descricao
        self.fabricante = fabricante

    def __str__(self):
        return "{0} ({1})".format(
            self.descricao,
            self.fabricante.get_descricao(),
        )

# Teste

def test_usando_mock():
    fabricante = MagicMock()
    fabricante.get_descricao.return_value = 'Volkswagen'
    carro = Carro('Fusca', fabricante)

    assert str(carro) == 'Fusca (Volkswagen)'
    fabricante.get_descricao.assert_called_once_with()
```

_Mocks_ são fundamentais quando estamos lidando com interações
das quais não podemos (ou fica muito custoso) prever o comportamento.
Particularmente, gosto de usar _Mocks_ para garantir que o contrato entre o
meu método/classe e meu serviço/_API_ esteja coerente.

## Stubs

Semelhantes aos _Mocks_, com os _Stubs_ temos a capacidade de retornar
respostas pré-definidas durante a execução de um teste. A principal diferença
entre ambos é que com _Stubs_, não costumamos checar se eles foram propriamente
executados:

```python
class Carro:
    rodas = 4

    def __init__(self, descricao, fabricante):
        self.descricao = descricao
        self.fabricante = fabricante

    def __str__(self):
        return "{0} ({1})".format(
            self.descricao,
            self.fabricante.get_descricao(),
        )

# Teste

from mock import MagicMock


def test_usando_stub():
    fabricante = MagicMock()
    fabricante.get_descricao.return_value = 'Volkswagen'
    carro = Carro('Fusca', fabricante)

    assert str(carro) == 'Fusca (Volkswagen)'

test_usando_stub()
```

_Stubs_ são excelentes para fingir interações com bibliotecas _third-party_. Não
precisamos compreender a sua complexidade, apenas fingimos que ela está lá e
retornando valores para os nossos _test cases_. Exemplo:

```python
from datetime import date
with patch('mymodule.date') as mock_date:
    mock_date.today.return_value = date(2010, 10, 8)
    mock_date.side_effect = lambda *args, **kw: date(*args, **kw)

    assert mymodule.date.today() == date(2010, 10, 8)
    assert mymodule.date(2009, 6, 8) == date(2009, 6, 8)
```

## Spies

Com _Spies_, ao invés de setarmos expectativas, armazenamos as chamadas
realizadas por colaboradores:

```python
class Carro:
    rodas = 4

    def __init__(self, descricao, fabricante):
        self.descricao = descricao
        self.fabricante = fabricante

    def __str__(self):
        return "{0} ({1})".format(
            self.descricao,
            self.fabricante.get_descricao(),
        )

# Teste

from mock import MagicMock


def test_usando_spy():
    fabricante = MagicMock()
    fabricante.get_descricao.return_value = 'Volkswagen'

    fusca = Carro('Fusca', fabricante)
    gol = Carro('Gol', fabricante)

    str(fusca)
    str(gol)

    assert fabricante.get_descricao.call_count == 2
```

Costumo usar _Spies_ com frequência em testes _front-end_,
principalmente utilizando [_QUnit_](https://qunitjs.com/ "Conheça a suíte de testes JS, QUnit") e [_Sinon.JS_](http://sinonjs.org/ "Spies, stubs and mocks for Javascript"),
para garantir a chamada de um determinado método dentro de eventos complexos,
onde não consigo ter certeza sobre o resultado esperado.

## Conclusão

Já dizia o filósofo que "mockar é uma arte". A verdade é que o uso de _doubles_
nos ajuda muito quando estamos trabalhando dentro de um contexto de _TDD_,
simplificando assim um relacionamento complexo entre classes/objetos, afim de
agilizar o nosso desenvolvimento e facilitar os nosso testes.

Recentemente participei de um treinamento da [_Industrial Logic_](http://www.industriallogic.com/ "Developing Software Doesn't Have To Be Slow, Stressful And Filled With Unpleasant Surprises"), sobre _Refactoring_, e a lição que ficou foi:
Use _mocks_ moderadamente. Sempre dê preferência a uma alteração na arquitetura
do seu _software_ (como por exemplo, o uso de [Injeção de Dependência](https://pt.wikipedia.org/wiki/Inje%C3%A7%C3%A3o_de_depend%C3%AAncia "Leia mais no Wikipedia")).

Se o uso de dublês for inevitável, prefira tipos mais simples
(_Dummys_ e _Fakes_). Dessa forma, os seus testes ficarão simples, legíveis e
mais fáceis de manter.

Até a próxima.

## Referências

- _[Niraj Bhatt - Dummy vs. Stub vs. Spy vs. Fake vs. Mock](https://nirajrules.wordpress.com/2011/08/27/dummy-vs-stub-vs-spy-vs-fake-vs-mock/ "Leia o artigo completo sobre as nomenclaturas")_
- _[StackOverflow - What's the difference between faking, mocking, and stubbing?](http://stackoverflow.com/questions/346372/whats-the-difference-between-faking-mocking-and-stubbing "Leia mais no StackOverflow")_
- _[Tuts+ - TDD Terminology Simplified](http://code.tutsplus.com/articles/tdd-terminology-simplified--net-30626 "Leia mais sobre TDD no Tuts+")_
