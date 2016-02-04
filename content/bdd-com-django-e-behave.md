title: BDD com Django e Behave
Date: 2016-02-03 23:50:00
Category: desenvolvimento
Tags: desenvolvimento, testes, bdd, aceitação, python, django, behave, splinter
Slug: bdd-com-django-e-behave
meta_description: Testar o comportamento da aplicação é uma grande prática de TDD. O Behave é uma biblioteca de BDD Python, que casa muito bem com o framework Django.


{% img align-left /images/blog/bdd-given-when-then.jpg 180 180 Given, When, Then (opkey.crestechglobal.com) %}

Testar o comportamento da sua aplicação, ao invés de pequenos módulos isolados,
é uma grande prática no que diz respeito a escrita de testes que guiem o
seu desenvolvimento. Deixando a polêmica do "[TDD is dead](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html "TDD is dead. Long live testing.")"
de lado, criar cenários que garantem um determinado fluxo, além de servir
como um excelente contrato à sua suite de aceitação, é uma ótima ferramenta
para garantir que a integração *back-end/front-end* está funcionando de acordo
com o esperado.

<!-- PELICAN_END_SUMMARY -->

Devo ser sincero com você, caro leitor: Fazer [*BDD*]({tag}bdd "Leia mais sobre BDD")
com [*Django*]({tag}django "Leia mais sobre Django") (IMO) sempre foi uma dor de cabeça.
Já utilizei algumas ferramentas, como [*unittest*]({filename}ferramentas-de-testes-em-django-parte-1.md)
focado em comportamento, [*doctests*]({filename}ferramentas-de-testes-em-django-parte-1.md),
[*Lettuce*]({filename}ferramentas-de-testes-em-django-parte-2.md), *Pycurracy* e até mesmo *Jasmine*...
Nada pareceu ser "o certo a se fazer".

Recentemente esbarrei com um artigo ensinando a usar o [*Behave*](http://pythonhosted.org/behave/ "BDD for Python"),
um *engine* de testes *BDD* para [*Python*]({tag}python "Leia mais sobre Python")...
E foi aí que a minha opinião mudou.


## Oh, behave!

O *Behave* é uma biblioteca *Python* que permite a escrita de *specs* em linguagem humana,
e a execução dos cenários através de *asserts* em "linguagem de programação". Agnóstico de *framework*,
é um *engine* promissor, [fácil de usar](http://pythonhosted.org/behave/tutorial.html "Conheça o tutorial do Behave"),
e que possui uma boa comunidade dando suporte.

{% img align-center /images/blog/oh-behave.jpg 480 415 Austin Powers: Oh behave (flickr.com) %}

Você pode escrever a integração do *lib* com o *Django*, como demonstrado na [documentação oficial](http://pythonhosted.org/behave/django.html "Exemplo de integração entre Behave e Django").
Como eu sou preguiçoso, prefiro utilizar o módulo `behave-django`,
criado por [Mitchel Cabuloy](https://github.com/mixxorz "Perfil do mixxorz no GitHub"):

    ::bash
    $ pip install behave-django


Não podemos esquecer de colocá-lo no `INSTALLED_APPS`:

    ::python
    INSTALLED_APPS = (
        ...
        'behave_django',
        ...
    )


Agora basta criar uma estrutura na raíz do seu projeto (no mesmo nível do `manage.py`), com a seguinte formação:

    features/
        steps/
            steps.py
        environment.py
        funcionalidade.feature

Vamos para um exemplo mais prático: *Eu quero que minha home exiba meu nome de usuário, caso eu esteja logado*.

Começaremos pelo arquivo `.feature`. Vou chamá-lo de `features/home-logada.feature`:

```
Feature: Logged in page

    Scenario: Access index page

        Given an authenticated user
        When I access the home page
        Then I see my username printed
```

Já podemos executar o `behave` através do `manage.py`:

    ::bash
    $ python manage.py behave

Você verá uma saída sinalizando que nosso cenário está montado, mas
que ainda não há testes executando de fato.

O arquivo de teste pode ter o nome que você desejar, o *Behave* olhará
para cada ocorrência dentro de `steps/` e coletará os passos que serão
usados para a execução das especificações.

Mas antes de escrevermos os testes, vamos falar de uma ferramenta essencial
quando estamos fazendo testes de interface *Web* com *Python*.


## Splinter

Diretamente da [documentação oficial](https://splinter.readthedocs.org/en/latest/ "Documentação do Splinter") do *Splinter*:

> Splinter is an open source tool for testing web applications using Python. It lets you automate browser actions,
> such as visiting URLs and interacting with their items.

A ferramenta fornece uma *API* única para diferentes ferramentas de
testes de interface *Web*, como *Selenium*, *PhantomJS* e *zope.testbrowser*.

Conseguimos instalá-la de forma muito fácil, através do comando `pip`:

    ::bash
    $ pip install splinter


É ele que nos permite, através de sua interface, escrever testes utilizando o driver do
*Firefox* (por exemplo), e deixar as *tasks* executando em nosso servidor de integração
contínua com um driver *headless*, como o *PhantomJS*.


### Django + Behave + Splinter == Epic Win

Podemos utilizar o *Splinter* juntamente com a mecânica de teste do *Behave*.
A maneira mais fácil é através do esquema de configuração da suite,
criando o arquivo `features/environment.py`, com o seguinte conteúdo:

    ::python
    from splinter import Browser


    def before_all(context):
        context.browser = Browser()
        context.server_url = 'http://localhost:8000'


    def after_all(context):
        context.browser.quit()


Pronto! O contexto dos nossos testes tem a propriedade `browser`, que é a instância do *Splinter*
para execução dos testes de interface.

As *specs* executarão com o *Firefox*, por padrão. Caso queira alterar o navegador,
basta especificá-lo na instância de `Browser`:

    ::python
    context.browser = Browser('chrome')


## Dado um determinado cenário

Vamos escrever o código *Python* necessário para atender a seguinte condição:

	Given an authenticated user

Para isso, criaremos um *step* específico para autenticação:

    ::python
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


O código acima é simples e objetivo. Através do *decorator* `@given` associamos um determinado
pedaço de código *Python* a um trecho das histórias escritas em `.feature`.

Rodando o `behave`, teremos uma saída similar a essa:

    ::bash
    $ python manage.py behave

    Creating test database for alias 'default'...
    Feature: Logged in page # features/home-logada.feature:1

      Scenario: Access index page      # features/home-logada.feature:3
        Given an authenticated user    # features/steps/auth.py:5 0.646s
        When I access the home page    # None
        Then I see my username printed # None


O motor de testes, além de identificar e executar o trecho de código necessário
para contemplar uma expressão, exibe o tempo de execução da mesma.


## Quando alguma coisa acontece

Vamos para a parte onde o usuário interage com a aplicação.

    ::python
    # features/steps/actions.py

    from behave import when


    @when('I access the home page')
    def access_the_home_page(context):
        br = context.browser
        br.visit(context.base_url + '/')


Aqui começa a ficar mais evidente o funcionamento de *steps*. Se amanhã
eu precisar de um novo cenário onde é necessário acessar a página inicial,
eu posso aproveitar o `when` criado acima. O *Behave* fará isso automaticamente
para você... Portanto, organizar os *steps* de uma forma que eles agrupem
um determinado grupo de ações é uma sugestão interessante.


## Então eu espero algum resultado

E para finalizar o nosso exemplo, vamos para o *decorator*  de `@then`,
que é o passo onde validamos o resultado dos acontecimentos disparados por `@when`:

    ::python
    # features/steps/results.py

    from behave import then


    @then('I see my username printed')
    def see_my_username(context):
        br = context.browser
        body = br.find_by_css('body')

        assert 'Hello test!' in body.text


Pronto! Executamos nossas *specs* e temos o seguinte resultado:

    ::bash
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


Garantimos através dos cenários acima que, dado um usuário logado,
imprimiremos o seu *username* na rota `http://localhost:8000/`.


## Considerações finais

O *Behave* é uma ótima ferramenta de *BDD* para *Python*. Sua integração
com o *Django* e demais *frameworks* é relativamente simples, o que só
aumenta a simpatia pela ferramenta.

Já sofri muito com escrita de testes de aceitação com *Django*. Não é
um veredicto, mas até o momento o sentimento é extremamente positivo em relação
ao casamento entre *Behave* e *Django*.

Até a próxima!


## Referências

* [*Behave: Behavior-Driven Development, Python style*](http://pythonhosted.org/behave/)
* [*GitHub: behave-django*](https://github.com/mixxorz/behave-django)
* [*Splinter: Tool for testing web applications using Python*](https://splinter.readthedocs.org/en/latest/)
