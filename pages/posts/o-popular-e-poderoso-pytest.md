---
title: O popular e poderoso Pytest
date: 2021-01-24 17:37:00
tags: ["python", "testes", "tdd", "pytest", "django", "bdd"]
slug: o-popular-e-poderoso-pytest
thumbnail: ./images/python-logo.png
---

Ok. Eu admito. O primeiro _post_ de 2021 será só para cumprir tabela. Afinal,
se você já programa em [_Python_](/tag/python.html "Leia mais sobre Python"), provavelmente já ouviu falar do
[_Pytest_](https://docs.pytest.org/en/stable/ "helps you write better programs").
E é pela sua popularidade, mas acima de tudo sua versatilidade, que eu me sinto na
obrigação de pelo menos arranhar o assunto.

10 anos de _blog_, e [escrevi quase nada sobre a ferramenta](https://www.google.com/search?sxsrf=ALeKk01qQM8UPLiwJ7HSSqmN5BBbdsb_DQ%3A1609852895254&ei=32f0X_WHD_-GwPAP9pClgAw&q=klauslaube.com.br+%22pytest%22&oq=klauslaube.com.br+%22pytest%22&gs_lcp=CgZwc3ktYWIQAzoECAAQRzoECCMQJ1D9gQFY-ZQBYKCXAWgAcAJ4AIABeYgB0QGSAQMxLjGYAQCgAQGqAQdnd3Mtd2l6yAECwAEB&sclient=psy-ab&ved=0ahUKEwi189iv8YTuAhV_AxAIHXZICcAQ4dUDCA0&uact=5). Shame!

## Um baita framework de testes

Já falamos sobre os benefícios de escrever testes:

- [TDD: Desenvolvimento Orientado a Testes](/2011/01/27/tdd-desenvolvimento-orientado-testes.html "Leia na íntegra")
- [Ferramentas de testes em Django - Parte 1](/2011/07/18/ferramentas-de-testes-em-django-parte-1.html "Leia na íntegra")
- [Ferramentas de testes em Django - Parte 2](/2011/07/23/ferramentas-de-testes-em-django-parte-2.html "Leia na íntegra")
- [BDD com Django e Behave](/2016/02/03/bdd-com-django-e-behave.html "Leia na íntegra")
- [Testando apps Django com Tox](/2018/01/05/testando-apps-django-com-tox.html "Leia na íntegra")
- [Os testes e os dublês - Parte 1](/2014/08/07/os-testes-e-os-dubles-parte-1.html "Leia na íntegra")
- [Os testes e os dublês - Parte 2](/2015/06/29/os-testes-e-os-dubles-parte-2.html "Leia na íntegra")

Então podemos partir do princípio que testes são mais do que essenciais como ferramenta de _design_ e desenvolvimento.

O _Pytest_ se considera um _framework_ que tem por objetivo te permitir escrever testes pequenos de maneira fácil, e ainda assim
ser possível escalar o seu uso para testes funcionais complexos.

Livre e de código-aberto ([MIT](https://github.com/pytest-dev/pytest/blob/master/LICENSE "Leia na íntegra")), é hoje
uma alternativa [mais popular que o próprio _unittest_](https://www.jetbrains.com/lp/python-developers-survey-2019/#FrameworksLibraries "Veja o resultado do survey de 2019") (que faz parte da _standard lib_). Rico em _plugins_, com ele é possível escrever
testes em diferentes formatos, para diferentes fins.

## Mão na massa!

Vamos aproveitar o [_Poetry_](/2020/12/30/poesia-pythonista-com-poetry.html "Leia o artigo na íntegra") e iniciar um projeto:

```
$ poetry new my_calc
$ cd my_calc/
```

O _Pytest_ já é listado como uma dependência de projetos criados via `poetry`. Portanto, um `poetry install` é o suficiente para
instalá-lo:

```
$ poetry install
```

Ou com o `pip`:

```
$ pip install pytest
```

Vamos ativar o virtualenv com o _Poetry_, para que assim as instruções daqui para frente sejam as mesmas para os não-usuários da ferramenta:

```
$ poetry shell
```

## Encontrando os testes

Por padrão, o _Pytest_ espera que o seus arquivos de teste comecem com `test_`, ou terminem com `_test.py`. Customizações [são possíveis](https://docs.pytest.org/en/stable/example/pythoncollection.html#changing-naming-conventions "Changing naming conventions"), mas o padrão já nos atende.

Vamos começar o teste pela forma convencional, utilizando `unittest`.

```python
# tests/test_my_calc.py

from unittest import TestCase


class TestSum(TestCase):

    def test_one_plus_one_is_equal_two(self):
        result = calc(1, "+", 1)
        self.assertEqual(2, result)
```

Ainda com a `unittest`, executamos o teste:

```
$ python -m unittest
E
======================================================================
ERROR: test_one_plus_one_is_equal_two (tests.test_my_calc.TestSum)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/Users/klauslaube/Workspace/my_calc/tests/test_my_calc.py", line 7, in test_one_plus_one_is_equal_two
    result = calc(1, "+", 1)
NameError: name 'calc' is not defined

----------------------------------------------------------------------
Ran 1 test in 0.000s

FAILED (errors=1)
```

Agora utilizando o utilitário de linha de comando, `pytest`:

```
$ pytest
======================================================================================== test session starts =========================================================================================
platform darwin -- Python 3.8.1, pytest-5.4.3, py-1.10.0, pluggy-0.13.1
rootdir: /Users/klauslaube/Workspace/my_calc
collected 1 item

tests/test_my_calc.py F                                                                                                                                                                        [100%]

============================================================================================== FAILURES ==============================================================================================
_______________________________________________________________________________ TestSum.test_one_plus_one_is_equal_two _______________________________________________________________________________

self = <tests.test_my_calc.TestSum testMethod=test_one_plus_one_is_equal_two>

    def test_one_plus_one_is_equal_two(self):
>       result = calc(1, "+", 1)
E       NameError: name 'calc' is not defined

tests/test_my_calc.py:7: NameError
====================================================================================== short test summary info =======================================================================================
FAILED tests/test_my_calc.py::TestSum::test_one_plus_one_is_equal_two - NameError: name 'calc' is not defined
========================================================================================= 1 failed in 0.10s ==========================================================================================
```

Como é possível notar, o _output_ é um pouco mais _verbose_. Mas o ponto alto aqui é que, mesmo que o seu projeto esteja
utilizando `unittest` como biblioteca de testes, o _test runner_ do `pytest` ainda assim
consegue identificar e executá-los.

Fazer o teste passar vai demandar a criação da função `calc`:

```python
# my_calc/calc.py

def calc(num1, operation, num2):
    return 2

```

E importar a mesma nos testes:

```python
# tests/test_my_calc.py

from unittest import TestCase
from my_calc.calc import cal

(...)
```

Executar novamente o `pytest` deve trazer um resultado positivo dessa vez.

## Escrevendo os testes

E se quisermos abrir mão do uso da `unittest`? É perfeitamente possível. O _Pytest_
(por padrão) busca por classes de teste com prefixo `Test`, e prefixo `test` para os métodos:

```python
# tests/test_my_calc.py

from my_calc.calc import calc


class TestSum:

    def test_one_plus_one_is_equal_two(self):
        result = calc(1, "+", 1)
        assert 2 == result

```

Podemos ir além, e ao invés de métodos utilizar funções. Isso simplificará bastante o
_boilterplate_ de código necessário para escrever um teste simples:

```python
# tests/test_my_calc.py

from my_calc.calc import calc


def test_one_plus_one_is_equal_two():
    result = calc(1, "+", 1)
    assert 2 == result

```

Antes de ir, vamos refatorar a solução:

```python
# my_calc/calc.py

OPERATIONS = {
    "+": lambda x, y: x + y
}


def calc(num1, operation, num2):
    return OPERATIONS[operation](num1, num2)

```

### Fixtures

Para apresentar o conceito de _fixtures_, vamos deixar a calculadora ainda mais "maluca" (para esconder a falta de criatividade de quem vos escreve). Vamos supor que há a seguinte demanda:

```python
# tests/test_my_calc.py

from dataclasses import dataclass
from my_calc.calc import calc


@dataclass
class FakeWrappedValue:
    value: float = None

(...)

def test_wrapper_object_with_twenty_plus_one_is_equal_to_twenty_one():
    wrapped_value = FakeWrappedValue(value=20)
    result = calc(wrapped_value, "+", 1)
    assert 21 == result
```

Os testes vão obviamente falhar. Vamos corrigir a função `calc`:

```python
def calc(num1, operation, num2):
    x = getattr(num1, "value", num1)

    return OPERATIONS[operation](x, num2)
```

Ainda precisamos garantir que `num2` possa também receber um objeto com atributo `value`.
Para fins didáticos, vamos escrever um novo teste:

```python
# tests/test_my_calc.py

(...)

def test_one_plus_wrapper_object_with_twentyis_equal_to_twenty_one():
    wrapped_value = FakeWrappedValue(value=20)
    result = calc(1, "+", wrapped_value)
    assert 21 == resul
```

O testes falharão novamente. Corrigimos novamente a função:

```python
def calc(num1, operation, num2):
    x = getattr(num1, "value", num1)
    y = getattr(num2, "value", num2)

    return OPERATIONS[operation](x, y)
```

Pronto! Testes passando novamente, e enfim podemos falar sobre _fixtures_. Segundo o
[_Real Python_](https://realpython.com/pytest-python-testing/ "Leia o excelente artigo sobre Pytest"), _fixtures_ são:

> (...) a way of providing data, test doubles, or state setup to your tests. Fixtures are functions that can return a wide range of values. Each test that depends on a fixture must explicitly accept that fixture as an argument.

Com auxílio do _decorator_ `@fixture`, somos capazes de escrever uma função que pode
ser reaproveitada por diferentes testes. Faremos isso com a instância de `FakeWrappedValue`:

```python
# tests/test_my_calc.py

import pytest
from dataclasses import dataclass
from my_calc.calc import calc


@dataclass
class FakeWrappedValue:
    value: float = None


@pytest.fixture
def wrapped_value_with_twenty():
    return FakeWrappedValue(value=20)


def test_one_plus_one_is_equal_two():
    result = calc(1, "+", 1)
    assert 2 == result


def test_wrapper_object_with_twenty_plus_one_is_equal_to_twenty_one(wrapped_value_with_twenty):
    result = calc(wrapped_value_with_twenty, "+", 1)
    assert 21 == result


def test_one_plus_wrapper_object_with_twentyis_equal_to_twenty_one(wrapped_value_with_twenty):
    result = calc(1, "+", wrapped_value_with_twenty)
    assert 21 == result

```

Note a função `wrapped_value_with_twenty` decorada com `pytest.fixture`. Outro ponto importante é que as funções que utilizam esse parâmetro agora recebem ele como argumento.
Por exemplo:

```python
def test_wrapper_object_with_twenty_plus_one_is_equal_to_twenty_one(wrapped_value_with_twenty):
    result = calc(wrapped_value_with_twenty, "+", 1)
    assert 21 == result
```

_Fixtures_ podem ajudar a abstrair complexidades que não fazem sentido serem evidenciadas
no corpo do teste. Por exemplo (e perceba que esse é um exemplo infinitamente bobo), podemos esconder a "complexidade" de instanciar um objeto com `value` vazio:

```python
(...)

@pytest.fixture
def empty_wrapped_value():
    return FakeWrappedValue(value=None)


def test_wrapper_object_with_empty_value_plus_one_is_equal_to_one(empty_wrapped_value):
    result = calc(empty_wrapped_value, "+", 1)
    assert 1 == result

```

Os testes vão quebrar. Ficará ao seu encargo resolver essa aí ;)

### Escopos

Juntamente com as _fixtures_ vem o conceito de _scopes_. É possível encontrar cinco tipos diferentes,
e podemos começar pelo já explorado "function".

No exemplo de _fixtures_ da seção anterior, utilizamos esse tipo de escopo. Por padrão, _fixtures_ são definidas
com o escopo de função, significando que a _fixture_ será executada por _test function_.

O escopo `class` traz um comportamento um pouco diferente. Quando aplicado a uma classe,
ele funciona como o `setUpClass` do `unittest`. Vamos mudar o arquivo de testes para
vislumbrar a diferença entre esses dois tipos de escopo:

```python
# tests/test_my_calc.py

from dataclasses import dataclass

import pytest
from my_calc.calc import calc


@dataclass
class FakeWrappedValue:
    value: float = None


@pytest.fixture
def wrapped_value_with_twenty():
    print("Function fixture")
    return FakeWrappedValue(value=20)


@pytest.fixture(scope="class")
def x_and_y(request):
    print("Class fixture")
    request.cls.x = 1
    request.cls.y = 1


@pytest.mark.usefixtures("x_and_y")
class TestAddingThingsUp:

    def test_one_plus_one_is_equal_two(self):
        result = calc(self.x, "+", self.y)
        assert 2 == result

    def test_wrapper_object_with_twenty_plus_one_is_equal_to_twenty_one(self, wrapped_value_with_twenty):
        result = calc(wrapped_value_with_twenty, "+", self.y)
        assert 21 == result

    def test_one_plus_wrapper_object_with_twentyis_equal_to_twenty_one(self, wrapped_value_with_twenty):
        result = calc(self.x, "+", wrapped_value_with_twenty)
        assert 21 == result
```

Alguns pontos importantes não podem passar em branco:

- Note o uso do argumento `scope="class"` decorando a assinatura da _fixture_ `x_and_y`
- `pytest.mark.usefixtures` é quem ativa o uso da _fixture_ na classe `TestAddingThingsUp`
- Para visualizar o resultado dos `print`, é preciso executar o `pytest` com o parâmetro `-s`
- Note que esse é outro exemplo bobo (:

Já que temos o comportamento do `setUp`, conseguimos ter o `tearDown`? Sim! Com um `yield`
dentro da _fixture_, você consegue "agendar" código a ser executado como parte do
_off-load_ da mesma:

```python
@pytest.fixture(scope="class")
def x_and_y(request):
    print("Class fixture")
    request.cls.x = 1
    request.cls.y = 1
    yield
    print("Tearing things down!!!")
```

Uma vez que fica claro o funcionamento dos _scopes_, os três restantes são quase intuitivos:

- **Module:** Executa a _fixture_ por módulo;
- **Package:** Executa a _fixture_ por pacote;
- **Session:** Cada vez que você executa o _Pytest_.

Para fins didáticos, vamos utilizar outro argumento na construção das _fixtures_
que exemplificarão como esses escopos funcionam. Estamos falando do `autouse`, e sem
nenhuma surpresa, ele faz a _fixture_ ser executada automaticamente:

```python
@pytest.fixture(scope="module", autouse=True)
def saying_hello_per_module():
    print("Module fixture")


@pytest.fixture(scope="package", autouse=True)
def saying_hello_per_package():
    print("Package fixture")


@pytest.fixture(scope="session", autouse=True)
def saying_hello_per_session():
    print("Session fixture")
```

Agora com o `pytest -s`, podemos ver na prática o que acontece:

```
$ pytest -s

(...)

tests/test_my_calc.py Session fixture
Package fixture
Module fixture
Class fixture
.Function fixture
.Function fixture
.Tearing things down!!!

```

## Baterias inclusas + plugins == sucesso!

Há muitos outros conceitos por trás do _Pytest_. Do arquivo _conftest.py_ ao
[@parametrize](https://stribny.name/blog/pytest/#parametrized-tests "Testing Python applications with Pytest"), você vai encontrar funcionalidades incríveis que aumentarão
a sua produtividade escrevendo testes.

E quando adicionamos os _plugins_ do _Pytest_ à equação, tudo fica mais divertido.
Para começar, se você está escrevendo testes em [_Django_](/tag/django.html "Leia mais sobre Django") e quer utilizar _Pytest_, o [pytest-django](https://pytest-django.readthedocs.io/en/latest/ "Leia a documentação da biblioteca") é mais que obrigatório. Ele resolverá tudo o que precisa-se resolver (banco de dados, sessões, transações, etc)
_out of the box_.

Outros grande _plugins_ são:

- [pytest-bdd](https://github.com/pytest-dev/pytest-bdd "Acesse o repositório no Github"): _BDD_ sem precisar de outro _test runner_
- [pytest-cov](https://github.com/pytest-dev/pytest-cov "Acesse o repositório no Github"): Relatório de _test coverage_
- [pytest-freezegun](https://github.com/ktosiek/pytest-freezegun "Acesse o repositório no Github"): Congele o tempo com essa integração com o _Freezegun_
- [pytest-instafail](https://github.com/pytest-dev/pytest-instafail "Acesse o repositório no Github"): Mostra falhas e erros antes do fim da sessão de testes
- [pytest-socket](https://github.com/miketheman/pytest-socket "Acesse o repositório no Gihub"): Previna _network calls_ indesejadas
- [pytest-sugar](https://github.com/Teemu/pytest-sugar "Acesse o repositório no Github"): Progress bar e uma melhor visualização de falhas e erros
- [pytest-xdist](https://github.com/pytest-dev/pytest-xdist "Acesse o repositório no Github"): Paralelize a execução dos testes

[A lista é imensa](https://awesomeopensource.com/projects/pytest "Veja projetos relacionados com Pytest"), e garanto que há um _plugin_ por aí pronto para resolver os seus problemas.

## Considerações finais

O _Pytest_ faz parte daquele seleto grupo de bibliotecas que instalamos imediatamente após iniciar um projeto. É rico, poderoso, flexível,
e faz do desenvolvimento orientado a testes uma experiência muito mais satisfatória, do que com a opção utilizando a _standard lib_.

Atualmente na [_Son of a Tailor_](https://www.sonofatailor.com/ "Custom fitted T-shirts"), estamos aumentando o nosso _coverage_ e gradativamente
adotando as baterias inclusas do _Pytest_. Todos os testes, no entanto, utilizam a `django.tests.TestCase`. Mesmo assim, fomos capazes de trocar o _test runner_ para o _Pytest_,
e tirar proveito de seus _plugins_.

Sem nenhum problema.

Até a próxima!

## Referências

- [BetterProgramming: Understand 5 Scopes of Pytest Fixtures](https://medium.com/better-programming/understand-5-scopes-of-pytest-fixtures-1b607b5c19ed)
- [Real Python: Effective Python Testing with Pytest](https://realpython.com/pytest-python-testing/)
- [Semaphore: Testing Python Applications with Pytest](https://semaphoreci.com/community/tutorials/testing-python-applications-with-pytest)
- [Software development and beyond: Testing Python applications with Pytest](https://stribny.name/blog/pytest/)
