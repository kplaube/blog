title: Os testes e os dublês - Parte 2
date: 2015-06-29 12:30:00
category: desenvolvimento
tags: desenvolvimento, testes, mock, python
slug: os-testes-e-os-dubles-parte-2
meta_description: Vamos detalhar através de exemplos práticos os test doubles dummy, fake, stub, mock e spy.

{% img representative-image /images/blog/tdd-red-green-refactor.png 180 180 TDD (izenbridge.com) %}


No [*post* anterior]({filename}os-testes-e-os-dubles-parte-1.md "Os testes e os Dublês - Parte 1"), vimos um dos
cenários de testes utilizados por times da [*Globo.com*](http://globo.com "Absolutamente tudo sobre notícias, esportes e entretenimento"), onde não escrevemos testes "isolados"
(famigerados *[microtests](https://elearning.industriallogic.com/gh/submit?Action=AlbumContentsAction&album=theBasics&devLanguage=Java "Testing Single Responsibilities at High Speed")*),
e abusamos da integração entre classes e serviços.

Mas até mesmo para nós existe um limite que não podemos ultrapassar: O caso
de uma consulta a uma *API* externa, por exemplo. Nesse cenário, precisamos
fingir que estamos fazendo isso, sem perder a segurança em nossas asserções.

<!-- PELICAN_END_SUMMARY -->


## Dublês ao resgate

Como já mencionado, os *test doubles* têm por finalidade substituir um objeto
real, afim de validar algum conceito em nossos testes.

Para auxiliar-nos nessa demanda, vamos utilizar a **Python Mock**, biblioteca
de *mocking* padrão do *Python 3*. Com ela, poderemos fingir integrações
complexas da nossa aplicação, com o objetivo de testar um determinado
comportamento em "custo" e tempos atrativos.

{% img align-center /images/blog/testing-vader.jpg 500 400 I find your lack of tests disturbing (jasonpolites.github.io) %}

Se você (assim como eu) ainda está no *Python 2.7.X*, podemos instalar a *lib*
através do `pip`:

    ::bash
    $ pip install mock

[Mais instruções para instalação da *Mock*](http://www.voidspace.org.uk/python/mock/#installing "Mock - Installing").

Uma vez instalada, podemos partir para conceituar de forma prática cada um dos
tipos de dublês listados no *post* anterior.


## Dummys

Um *Dummy Object* é um tipo de dublê muito simples, que é usado apenas para
preencher passagens de parâmetros:

    ::python
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

Como observado, um *Dummy* não precisa ser necessariamente um *mock*. Um valor
em branco, nulo, uma string vazia, qualquer coisa usada para substituir um
objeto real em uma passagem de parâmetro, pode ser considerado um *Dummy*.


## Fakes

Um *Fake* é um objeto com certa funcionalidade, muito útil para resolver
alguma dependência em testes, mas que não é ideal para o ambiente de
produção:

    ::python
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

No exemplo acima, (ainda) não utilizamos nenhum recurso da **Mock**. Dependendo
do contexto, não precisamos de uma biblioteca para criarmos um *Fake*, e isso
pode ser encarado de forma positiva, pois fica muito clara a nossa intenção
no teste.

É relativamente comum vermos *Fakes* sendo utilizados para "dublar" acessos
a um banco de dados. Quando falamos de testes em [*Django*]({tag}django "Leia mais sobre Django"),
geralmente utilizamos uma persistência mais leve (como um banco *SQLite*, por exemplo)
que substitui um banco mais complexo, tornando a nossa suíte de testes
mais simples.


## Mocks

Um tipo de dublê criado para um teste específico. Com ele, somos capazes
de setar retornos de valores pré-definidos, bem como verificar se algum
método foi chamado durante a execução do teste:

    ::python
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

*Mocks* são fundamentais quando estamos lidando com interações
das quais não podemos (ou fica muito custoso) prever o comportamento.
Particularmente, gosto de usar *Mocks* para garantir que o contrato entre o
meu método/classe e meu serviço/*API* esteja coerente.


## Stubs

Semelhantes aos *Mocks*, com os *Stubs* temos a capacidade de retornar
respostas pré-definidas durante a execução de um teste. A principal diferença
entre ambos é que com *Stubs*, não costumamos checar se eles foram propriamente
executados:

    ::python
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

*Stubs* são excelentes para fingir interações com bibliotecas *third-party*. Não
precisamos compreender a sua complexidade, apenas fingimos que ela está lá e
retornando valores para os nossos *test cases*. Exemplo:

    ::python
    from datetime import date
    with patch('mymodule.date') as mock_date:
        mock_date.today.return_value = date(2010, 10, 8)
        mock_date.side_effect = lambda *args, **kw: date(*args, **kw)

        assert mymodule.date.today() == date(2010, 10, 8)
        assert mymodule.date(2009, 6, 8) == date(2009, 6, 8)


## Spies

Com *Spies*, ao invés de setarmos expectativas, armazenamos as chamadas
realizadas por colaboradores:

    ::python
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

Costumo usar *Spies* com frequência em testes *front-end*,
principalmente utilizando [*QUnit*](https://qunitjs.com/ "Conheça a suíte de testes JS, QUnit") e [*Sinon.JS*](http://sinonjs.org/ "Spies, stubs and mocks for Javascript"),
para garantir a chamada de um determinado método dentro de eventos complexos,
onde não consigo ter certeza sobre o resultado esperado.


## Conclusão

Já dizia o filósofo que "mockar é uma arte". A verdade é que o uso de *doubles*
nos ajuda muito quando estamos trabalhando dentro de um contexto de *TDD*,
simplificando assim um relacionamento complexo entre classes/objetos, afim de
agilizar o nosso desenvolvimento e facilitar os nosso testes.

Recentemente participei de um treinamento da [*Industrial Logic*](http://www.industriallogic.com/ "Developing Software Doesn't Have To Be Slow, Stressful And Filled With Unpleasant Surprises"), sobre *Refactoring*, e a lição que ficou foi:
Use *mocks* moderadamente. Sempre dê preferência a uma alteração na arquitetura
do seu *software* (como por exemplo, o uso de [Injeção de Dependência](https://pt.wikipedia.org/wiki/Inje%C3%A7%C3%A3o_de_depend%C3%AAncia "Leia mais no Wikipedia")).

Se o uso de dublês for inevitável, prefira tipos mais simples
(*Dummys* e *Fakes*). Dessa forma, os seus testes ficarão simples, legíveis e
mais fáceis de manter.

Até a próxima.


## Referências

* *[Niraj Bhatt - Dummy vs. Stub vs. Spy vs. Fake vs. Mock](https://nirajrules.wordpress.com/2011/08/27/dummy-vs-stub-vs-spy-vs-fake-vs-mock/ "Leia o artigo completo sobre as nomenclaturas")*
* *[StackOverflow - What's the difference between faking, mocking, and stubbing?](http://stackoverflow.com/questions/346372/whats-the-difference-between-faking-mocking-and-stubbing "Leia mais no StackOverflow")*
* *[Tuts+ - TDD Terminology Simplified](http://code.tutsplus.com/articles/tdd-terminology-simplified--net-30626 "Leia mais sobre TDD no Tuts+")*
