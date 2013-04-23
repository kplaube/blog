Title: TDD: Desenvolvimento Orientado a Testes
Date: 2011-01-27 11:30
Category: desenvolvimento
Tags: desenvolvimento, testes, tdd, agile
Slug: tdd-desenvolvimento-orientado-testes


|img "/images/blog/tdd-all-code-is-guilty.jpg" 180 152 "Todo código é culpado, até provarem o contrário" "align-left"|
Esse post foi originalmente escrito para o [*Profissionais TI*][], você
pode conferi-lo na [íntegra aqui][].

**O caos!**

Hoje em dia o [*agile*][] passou de uma “técnica anarquista” para uma
saborosa realidade, principalmente nas *startups* de tecnologia.

<!-- PELICAN_END_SUMMARY -->

Uma das características de qualquer método ou ferramenta *agile* é que:
**Qualidade não é negociável**; Como podemos garantir que ao final de
cada ciclo de entregas estamos entregando uma solução que atenda escopo,
prazo e também qualidade?


Test first
----------

Metodologias ágeis como o [*Scrum*][] e o *XP* adotam a técnica “Test
First”:

* Primeiro escreva um teste que falhe
* Depois escreva um código que faça o teste passar
* Melhore o código escrito

|img "/images/blog/red-green-refactor.png" "Red, Green, Refactor!" "align-left"|
Além da garantia de que sua aplicação irá
funcionar após uma atualização ou *bugfix*, devemos levar em conta que
estamos indo além do simples ato de testar. É nisso que muita gente se
confunde quando fala-se em [*Test-Driven Development*][]: **Não trata-se
apenas de testes, trata-se de design!**

Os testes passam a ser a sua especificação, passam a ser a forma de você
medir se o seu *software* está sendo conduzido para o real objetivo ou
não. Literalmente, os **testes guiam o seu desenvolvimento** – mas isso
não garante que a solução como um todo esteja funcional, por isso é
necessário uma pitada de bom senso (como em tudo na vida).

Quando você menos espera, a construção dos testes automatizados passou
de “testes” para “desenvolvimento”. Ou seja, esse método irá fazer parte
do processo de construção de código e você começará a medir qualquer
estimativa referente a codificação com os testes inclusos, naturalmente.

A *Web* está repleta de artigos sobre como construir estes testes, como
executá-los, etc. Então, não vou ficar repetindo o que já foi “dito” e
vou deixar referências de pessoas mais “conhecidas” do assunto:

* ***Vinicius Quaiato***: *TDD – Test Driven
    Development* –
    [http://viniciusquaiato.com/blog/index.php/tdd-test-driven-development-c/][]
* ***Coding Dojo Floripa***: Tudo sobre *TDD* –
    [http://dojofloripa.wordpress.com/2007/09/10/tudo-sobre-tdd/][]
* ***Improve It***: Desenvolvimento Orientado a Testes –
    [http://improveit.com.br/xp/praticas/tdd][]
* ***Agile Testing***: *Articles and Tutorials* –
    [http://agilistas.org/articles/][]
* ***Python Brasil***: *Test Driven Development* –
    [http://www.python.org.br/wiki/TestDrivenDevelopment][]
* ***Django Testing*** – [http://djangotesting.com/][]


Automatizar = Agilidade?
------------------------

Mas porque ***TDD*** ajuda tanto? Será que vale a pena praticar?

Quando comecei a programar orientado a objetos, tinha em mente que
aquilo era só curiosidade, que no modo estruturado estava muito bom e
não via a real utilidade daquilo tudo. Claro, isso até ser completamente
envolvido por *OOP*, e quando me dei conta não sabia mais viver sem ele.

Agora já posso dizer o mesmo de *TDD*. O prazer de construirmos
orientados a testes, através de um processo *baby-steps*, é desafiador…
voltei a acreditar que posso fazer *software* bom e de qualidade, pois:

* A taxa de acerto é alta
* A ocorrência de erros diminui
* Você ganha confiança no que está produzindo

Mesmo que você perca tempo não previsto no desenvolvimento, poupa tempo
(espero eu que) previsto nos testes. No começo a performance do
desenvolvedor cai significativamente… mas com o tempo irá tornar-se uma
prática para dar maior segurança em relação a qualidade do seu
*software*, e também dar maior segurança a você.


  [*Profissionais TI*]: http://www.profissionaisti.com.br/
    "Tudo sobre Tecnologia! ProfissionaisTI"
  [íntegra aqui]: http://www.profissionaisti.com.br/2009/11/tdd-desenvolvimento-orientado-a-testes/
    "TDD: Desenvolvimento Orientado a Testes"
  [*agile*]: |filename|/tag/agile.html "Leia mais sobre Agile"
  [*Scrum*]: |filename|/tag/scrum.html "Leia mais sobre Scrum"
  [*Test-Driven Development*]: |filename|/tag/tdd.html "Leia mais sobre TDD"
  [http://viniciusquaiato.com/blog/index.php/tdd-test-driven-development-c/]: http://viniciusquaiato.com/blog/index.php/tdd-test-driven-development-c/
    "Leia mais no blog do nosso amigo Vinicius"
  [http://dojofloripa.wordpress.com/2007/09/10/tudo-sobre-tdd/]: http://dojofloripa.wordpress.com/2007/09/10/tudo-sobre-tdd/
    "Leia mais no Coding Dojo"
  [http://improveit.com.br/xp/praticas/tdd]: http://improveit.com.br/xp/praticas/tdd
    "Leia mais no Improve it"
  [http://agilistas.org/articles/]: http://agilistas.org/articles/
    "Leia mais no Agilistas.org"
  [http://www.python.org.br/wiki/TestDrivenDevelopment]: http://www.python.org.br/wiki/TestDrivenDevelopment
    "Leia mais no Python Brasil"
  [http://djangotesting.com/]: http://djangotesting.com/
    "Dicas de testes em Django"
