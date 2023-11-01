---
title: "PHP ágil e divertido com CodeIgniter"
date: 2012-03-05 10:06:57
modified: 2023-11-01 09:27:00
tags: ["desenvolvimento-web", "php", "codeigniter"]
slug: php-agil-e-divertido-com-codeigniter
thumbnail: ./images/ci-logo.png
---

Após experimentar [alguns *frameworks*][] [*PHP*][], recentemente tenho
aplicado bastante tempo no estudo do [**CodeIgniter**][], e tive o prazer de
redescobrir a diversão em programar nessa linguagem um tanto controversa.

Logo de cara, quero recomendar o _screencast_ da [*Nettus+*][] chamado
[*CodeIgniter From Scratch*][]. Um excelente material para aprender (e
se aperfeiçoar) a desenvolver aplicações [*web*][] com [*PHP*][].

## PHP e MVC

Não há mistérios na forma como o _CodeIgniter_ trabalha com o [*MVC*][],
utilizando o “_MVC_ clássico”, com as rotas baseadas nos nomes do
controlador e das _actions_, modelos com [*ORM*][] através da
[*ActiveRecord*][], e _views_ utilizando a linguagem natural do _PHP_
para gerar a visualização das suas páginas.

E este último, acredito ser uma das grandes vantagens do _PHP_ com
_MVC_. Escrever _views_ com _PHP_ é muito mais “natural” do que em
qualquer outra linguagem. Não é
necessário aprender nenhuma linguagem de template, como em alguns
_frameworks_, pois é normal escrever o _PHP_ “mesclado” ao [*HTML*][].

Em comparação à [*CakePHP*][] ou à [*Zend Framework*][], a verdade é que
o _CodeIgniter_ é relativamente “seco”. Ou seja, temos menos “recursos
mágicos” e somos obrigados a por a mão na massa de verdade em algumas
situações. Embora isso seja encarado como um ponto negativo por alguns,
essa característica acaba resultando em maior performance e
simplicidade.

## Performance

A partir da versão `2.0`, o _CodeIgniter_ deixou de dar suporte ao
_PHP 4_, o que alavancou a sua performance (já que não é mais necessário criar
_fallbacks_ para os recursos do _PHP 5_). Essa decisão permite que o
_framework_ rume cada vez mais para o caminho da [Orientação a Objetos][],
e que torne a nossa vida cada dia mais simples 🙂

E performance é uma das qualidades e diferenciais do _CodeIgniter_.
Segundo o [*benchmark* realizado por *Leng Sheng Hong*][], o
_CodeIgniter_ fica atrás apenas do (também excelente) _DooPHP_:

![Comparativo entre Frameworks PHP](/media/benchmark-php.png "Comparativo entre Frameworks PHP")

Em tempos onde performance e disponibilidade são premissas, e não mais
diferenciais, ter uma boa ferramenta ao seu lado facilita muito o
trabalho de atender a essas expectativas.

## Simplicidade

Essa qualidade eu descobri recentemente, quando tive que usar a
[*SDK* do *Facebook*][] para desenvolver uma aplicação social com o
_CodeIgniter_.

Foi tão simples quanto jogar a classe como uma biblioteca, fazer alguns
ajustes de nomenclatura e construção, e pronto! Estava pronta para usar,
dentro da estrutura e fluxo do _CodeIgniter_.

Estender o _framework_ é simples e prático. Escrever _hooks_ e _helpers_
é tão natural quanto escrever funções. Essa simplicidade vem aliada a
uma coleção de funcionalidades prontas disponíveis com o _core_ do
_framework_. Também vale mencionar a facilidade de configuração e
instalação.

## Considerações finais

Se você procura um _framework PHP_ simples, que não seja tão “mágico” e
que permita para você um trabalho descomplicado com o _MVC_, recomendo
_CodeIgniter_.

É claro que ele tem algumas desvantagens se comparado a outros
_frameworks_ do mercado. Por exemplo, acredito que o desenvolvimento com
o _CakePHP_ seja mais ágil e fácil se comparado ao _CI_. Mas com a versão **2.x**, é
visível que a ferramenta está caminhando para um desenvolvimento de alto
nível.

[alguns *frameworks*]: /2010/11/27/agilidade-em-php-conhecendo-algumas-frameworks.html "Agilidade em PHP: Conhecendo algumas frameworks – Parte 1"
[*php*]: /tag/php.html "Leia mais sobre PHP"
[**codeigniter**]: http://codeigniter.com/ "CodeIgniter: Open source PHP web application framework"
[*nettus+*]: http://net.tutsplus.com/ "Web development tutorials, from beginner to advanced"
[*codeigniter from scratch*]: http://net.tutsplus.com/sessions/codeigniter-from-scratch/ "Confira a série de screencasts sobre desenvolvimento com PHP e CodeIgniter"
[*web*]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[*mvc*]: http://pt.wikipedia.org/wiki/MVC "Leia mais sobre Model-View-Controller"
[*orm*]: http://pt.wikipedia.org/wiki/Mapeamento_objeto-relacional "Leia mais sobre Mapeamento Objeto-Relacional"
[*activerecord*]: http://www.phpactiverecord.org/ "Faça ORM em PHP com a ActiveRecord"
[*html*]: /tag/html5.html "Leia mais sobre HTML"
[*cakephp*]: http://cakephp.org/ "Conheça a CakePHP"
[*zend framework*]: http://framework.zend.com/ "Conheça a poderosa Zend"
[orientação a objetos]: /tag/oop.html "Leia mais sobre OOP"
[*benchmark* realizado por *leng sheng hong*]: https://github.com/darkredz/Web-Framework-Benchmark/blob/master/benchmark.png "Veja o repositório no GitHub do benchmark"
[*sdk* do *facebook*]: https://github.com/facebook/php-sdk "Conheça a SDK-PHP do Facebook, no GitHub"
