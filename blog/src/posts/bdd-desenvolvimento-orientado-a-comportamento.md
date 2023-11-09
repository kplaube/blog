---
title: "BDD: Desenvolvimento Orientado a Comportamento"
date: 2011-02-02 12:48
tags: ["testes", "bdd", "agile"]
slug: bdd-desenvolvimento-orientado-comportamento
thumbnail: ./images/bdd.jpg
---

Esse post foi originalmente escrito para o [*Profissionais TI*][], você
pode conferi-lo na [íntegra aqui][].

No [*post* anterior][], introduzi o conceito de [*TDD*][]. Mas para
relembrar, utilizando a prática “baby steps” temos os seguintes
procedimentos:

- Escreva um teste que falhe;
- Escreva um código (rudimentar) para o teste;
- Faça o teste passar;
- Deixe o código “cheirando bem” (_refactoring_);
- Volte para o primeiro procedimento.

O _TDD_ é focado em testes unitários, onde você isola um modelo (por
exemplo) e monta-o de acordo com os testes que você escrever. Quando
você tiver um determinado número de modelos, aí você testa a integração
entre eles, e assim por diante.

Fazendo uma analogia, isso é mais ou menos como construir o _software_
**“de dentro para fora”**, onde partimos escrevendo testes específicos
(unitários) e depois vamos abrangendo outras regiões do sistema
(integração, funcional, aceitação, etc). Já em _BDD_ (_Behavior-Driven
Development_) podemos dizer que o _software_ é desenvolvido **“de fora
para dentro”**, onde os testes são construídos baseados nos requisitos
do cliente ou em um roteiro de aceitação (também conhecidos por
estórias).

Esta prática é semelhante ao _TDD_: **testes são escritos primeiro,
funções depois**; O diferencial está que _BDD_ aborda o
**comportamento** e o resultado como um todo, não preocupando-se
necessariamente com as classes, métodos e atributos de forma isolada.

## Mas então qual usar? TDD ou BDD?

Essa era a minha dúvida. E demorou até cair a ficha

Depois de uma boa conversa com o [*@andrewsmedina*][] (hoje já faz um
tempo que esta conversa aconteceu (: ), captei que pode-se utilizar os
dois! Claro! Garanta que a aplicação está indo de acordo com o teste de
aceitação escrito, e garanta que a escrita de determinada classe esteja
de acordo com os testes unitários criados.

Geralmente trabalho com testes automatizados da seguinte maneira:

- Escrevo estórias para determinada tarefa;
- Escrevo estas estórias em forma de testes. Estes testes podem ser
  classificados como funcionais (no meu caso testo as _views_ do
  [*Django*][], mas isso pode variar de acordo com a aplicação);
- E através de “baby step” e _unit_, crio testes isolados para os
  modelos, formulários, _views_, etc.

Testes de comportamento tendem a levar mais tempo para serem executados,
esta é outra razão para termos sempre em mãos os testes unitários.

Até hoje não ví uma maneira “silver bullet” de trabalhar com testes
automatizados. Encaro da seguinte maneira:

- Está cobrindo o teu sistema?
- Está guiando de forma correta o seu desenvolvimento?
- Está sendo escrito da forma correta (não deixando _bugs_ passarem
  despercebidos, por exemplo)?

Se todas as respostas forem sim, acredito que esteja sendo feito da
maneira adequada.

## Referências

- [_Superfície Reflexiva_ - Algumas considerações sobre _TDD_ e
  _BDD_][superficie-reflexiva]
- [_Portal do Arquiteto_ - Automação de testes funcionais e de
  aceitação][portal-do-arquiteto]
- [_Aprendendo Django no Planeta Terra_ - Programando com Testes
  Automatizados][aprendendo-django]
- [_Maré de Agilidade_: _BDD_ e _TDD_][mare-de-agilidade]
- [_Danilo Sato_ - Introduzindo Desenvolvimento Orientado por
  Comportamento][danilo-sato]

[*profissionais ti*]: http://www.profissionaisti.com.br/ "Artigos sobre Tecnologia da Informação"
[íntegra aqui]: http://www.profissionaisti.com.br/2010/01/bdd-desenvolvimento-orientado-a-comportamento/ "BDD: Desenvolvimento Orientado a Comportamento"
[*post* anterior]: /2011/01/27/tdd-desenvolvimento-orientado-testes.html "TDD: Desenvolvimento Orientado a Testes"
[*tdd*]: /tag/tdd.html
[*@andrewsmedina*]: http://twitter.com/andrewsmedina "Siga o Andrews no Twitter."
[*django*]: /tag/django.html "Leia mais sobre Django"
[superficie-reflexiva]: http://logbr.reflectivesurface.com/2008/10/27/algumas-consideracoes-sobre-tdd-e-bdd/ "Leia mais no Superfície Reflexiva."
[portal-do-arquiteto]: http://portalarquiteto.blogspot.com/2008/02/automao-de-testes-funcionais-e-de.html "Leia mais no Portal do Arquiteto."
[aprendendo-django]: http://www.aprendendodjango.com/programando-com-testes-automatizados/ "Leia mais no Aprendendo Django."
[mare-de-agilidade]: http://www.slideshare.net/cmilfont/mare-de-agilidade-bdd-e-tdd "Veja a apresentação no Slideshare."
[danilo-sato]: http://www.dtsato.com/blog/work/introduzindo_desenvolvimento_orientado_comportamento_bdd/ "Leia mais no blog do Sato."
