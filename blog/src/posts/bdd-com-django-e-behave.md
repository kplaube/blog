---
title: "BDD com Django e Behave"
date: 2016-02-03 23:50:00
modified: 2023-11-09 21:52:00
tags:
  [
    "desenvolvimento-web",
    "testes",
    "bdd",
    "aceitação",
    "python",
    "django",
    "behave",
    "splinter",
  ]
slug: bdd-com-django-e-behave
thumbnail: ./images/bdd-given-when-then.jpg
---

Testar o comportamento da sua aplicação, ao invés de pequenos módulos isolados,
é uma grande prática no que diz respeito a escrita de testes que guiem o
seu desenvolvimento.

Deixando a polêmica do "[TDD is dead](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html "TDD is dead. Long live testing.")"
de lado, criar cenários que garantem um determinado fluxo, além de servir
como um excelente contrato à sua suite de aceitação, é uma ótima ferramenta
para garantir que a integração _back-end/front-end_ está funcionando de acordo
com o esperado.

Devo ser sincero com você: Fazer [_BDD_](/tag/bdd.html "Leia mais sobre BDD")
com [_Django_](/tag/django.html "Leia mais sobre Django") (IMO) sempre foi uma dor de cabeça.
Já utilizei algumas ferramentas, como [_unittest_](/2011/07/18/ferramentas-de-testes-em-django-parte-1.html)
focado em comportamento, [_doctests_](/2011/07/18/ferramentas-de-testes-em-django-parte-1.html),
[_Lettuce_](/2011/07/23/ferramentas-de-testes-em-django-parte-2.html), _Pycurracy_ e até mesmo _Jasmine_...
Nada pareceu ser "o certo a se fazer".

Recentemente esbarrei com um artigo ensinando a usar o [_Behave_](http://pythonhosted.org/behave/ "BDD for Python"),
um _engine_ de testes _BDD_ para [_Python_](/tag/python.html "Leia mais sobre Python").
E foi aí que a minha opinião mudou.

## Oh, behave

O _Behave_ é uma biblioteca _Python_ que permite a escrita de _specs_ em linguagem humana,
e a execução dos cenários através de _asserts_ em "linguagem de programação". Agnóstico de _framework_,
é um _engine_ promissor, [fácil de usar](http://pythonhosted.org/behave/tutorial.html "Conheça o tutorial do Behave"),
e que possui uma boa comunidade dando suporte.

![Austin Powers: Oh behave (flickr.com)](/media/oh-behave.jpg "Austin Powers: Oh behave (flickr.com)")

Você pode escrever a integração do _lib_ com o _Django_, como demonstrado na [documentação oficial](http://pythonhosted.org/behave/django.html "Exemplo de integração entre Behave e Django").
Como eu sou preguiçoso, prefiro utilizar o módulo `behave-django`,
criado por [Mitchel Cabuloy](https://github.com/mixxorz "Perfil do mixxorz no GitHub"):

```text
pip install behave-django
```

Não podemos esquecer de colocá-lo no `INSTALLED_APPS`:

```python
INSTALLED_APPS = (
    ...
    'behave_django',
    ...
)
```

Agora basta criar uma estrutura na raíz do seu projeto (no mesmo nível do `manage.py`), com a seguinte formação:

```text
features/
    steps/
        steps.py
    environment.py
    funcionalidade.feature
```

Vamos para um exemplo mais prático: _Eu quero que minha home exiba meu nome de usuário, caso eu esteja logado_.

Começaremos pelo arquivo `.feature`. Vou chamá-lo de `features/home-logada.feature`:

```text
Feature: Logged in page

    Scenario: Access index page

        Given an authenticated user
        When I access the home page
        Then I see my username printed
```

Já podemos executar o `behave` através do `manage.py`:

```text
python manage.py behave
```

Você verá uma saída sinalizando que nosso cenário está montado, mas
que ainda não há testes executando de fato.

O arquivo de teste pode ter o nome que você desejar, o _Behave_ olhará
para cada ocorrência dentro de `steps/` e coletará os passos que serão
usados para a execução das especificações.

Mas antes de escrevermos os testes, vamos falar de uma ferramenta essencial
quando estamos fazendo testes de interface _web_ com _Python_.

## Splinter

Diretamente da [documentação oficial](https://splinter.readthedocs.org/en/latest/ "Documentação do Splinter") do _Splinter_:

> Splinter is an open source tool for testing web applications using Python. It lets you automate browser actions,
> such as visiting URLs and interacting with their items.

A ferramenta fornece uma _API_ única para diferentes ferramentas de
testes de interface _web_, como _Selenium_, _PhantomJS_ e _zope.testbrowser_.

Conseguimos instalá-la de forma muito fácil, através do comando `pip`:

```text
pip install splinter
```

É ele que nos permite, através de sua interface, escrever testes utilizando o driver do
_Firefox_ (por exemplo), e deixar as _tasks_ executando em nosso servidor de integração
contínua com um driver _headless_, como o _PhantomJS_.

### Django + Behave + Splinter == Epic Win

Podemos utilizar o _Splinter_ juntamente com a mecânica de teste do _Behave_.
A maneira mais fácil é através do esquema de configuração da suite,
criando o arquivo `features/environment.py`, com o seguinte conteúdo:

```python
from splinter import Browser


def before_all(context):
    context.browser = Browser()
    context.server_url = 'http://localhost:8000'


def after_all(context):
    context.browser.quit()
```

Pronto! O contexto dos nossos testes tem a propriedade `browser`, que é a instância do _Splinter_
para execução dos testes de interface.

As _specs_ executarão com o _Firefox_, por padrão. Caso queira alterar o navegador,
basta especificá-lo na instância de `Browser`:

```python
context.browser = Browser('chrome')
```

## Dado um determinado cenário

Vamos escrever o código _Python_ necessário para atender a seguinte condição:

```text
Given an authenticated user
```

Para isso, criaremos um _step_ específico para autenticação:

```python
# features/steps/auth.py

from behave import given
from django.contrib.auth.models import User


@given('an authenticated user')
def given_auth_user(context):
    User.objects.create_superuser(username='test', email='foo@bar', password='test')

    br = context.browser
    br.visit(context.base_url + '/admin/')
    br.fill('username', 'test')
    br.fill('password', 'test')
    br.find_by_css('.submit-row input').first.click()
```

O código acima é simples e objetivo. Através do _decorator_ `@given` associamos um determinado
pedaço de código _Python_ a um trecho das histórias escritas em `.feature`.

Rodando o `behave`, teremos uma saída similar a essa:

```text
$ python manage.py behave

Creating test database for alias 'default'...
Feature: Logged in page # features/home-logada.feature:1

    Scenario: Access index page    # features/home-logada.feature:3
    Given an authenticated user    # features/steps/auth.py:5 0.646s
    When I access the home page    # None
    Then I see my username printed # None
```

O motor de testes, além de identificar e executar o trecho de código necessário
para contemplar uma expressão, exibe o tempo de execução da mesma.

## Quando alguma coisa acontece

Vamos para a parte onde o usuário interage com a aplicação.

```python
# features/steps/actions.py

from behave import when


@when('I access the home page')
def access_the_home_page(context):
    br = context.browser
    br.visit(context.base_url + '/')
```

Aqui começa a ficar mais evidente o funcionamento de _steps_. Se amanhã
eu precisar de um novo cenário onde é necessário acessar a página inicial,
eu posso aproveitar o `when` criado acima. O _Behave_ fará isso automaticamente
para você... Portanto, organizar os _steps_ de uma forma que eles agrupem
um determinado grupo de ações é uma sugestão interessante.

## Então eu espero algum resultado

E para finalizar o nosso exemplo, vamos para o _decorator_ de `@then`,
que é o passo onde validamos o resultado dos acontecimentos disparados por `@when`:

```python
# features/steps/results.py

from behave import then


@then('I see my username printed')
def see_my_username(context):
    br = context.browser
    body = br.find_by_css('body')

    assert 'Hello test!' in body.text
```

Pronto! Executamos nossas _specs_ e temos o seguinte resultado:

```text
$ python manage.py behave

Creating test database for alias 'default'...
Feature: Logged in page # features/home-logada.feature:1

    Scenario: Access index page      # features/home-logada.feature:3
    Given an authenticated user    # features/steps/auth.py:5 0.654s
    When I access the home page    # features/steps/actions.py:4 0.888s
    Then I see my username printed # features/steps/results.py:4 0.075s

1 feature passed, 0 failed, 0 skipped
1 scenario passed, 0 failed, 0 skipped
3 steps passed, 0 failed, 0 skipped, 0 undefined
Took 0m1.617s
Destroying test database for alias 'default'...
```

Garantimos através dos cenários acima que, dado um usuário logado,
imprimiremos o seu _username_ na rota `http://localhost:8000/`.

## Considerações finais

O _Behave_ é uma ótima ferramenta de _BDD_ para _Python_. Sua integração
com o _Django_ e demais _frameworks_ é relativamente simples, o que só
aumenta a simpatia pela ferramenta.

Já sofri muito com escrita de testes de aceitação com _Django_. Não é
um veredicto, mas até o momento o sentimento é extremamente positivo em relação
ao casamento entre _Behave_ e _Django_.

Até a próxima.

## Referências

- [_Behave: Behavior-Driven Development, Python style_](http://pythonhosted.org/behave/)
- [_GitHub: behave-django_](https://github.com/mixxorz/behave-django)
- [_Splinter: Tool for testing web applications using Python_](https://splinter.readthedocs.org/en/latest/)
