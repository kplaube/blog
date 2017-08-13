Title: PHP ágil e divertido com CodeIgniter
Date: 2012-03-05 10:06:57
Category: desenvolvimento
Tags: desenvolvimento, web, php, codeigniter
Slug: php-agil-e-divertido-com-codeigniter
meta_description: Não há mistérios na forma como a CodeIgniter trabalha com o MVC, utilizando o “MVC clássico”, com as rotas baseadas nos nomes do controlador e das actions, modelos com ORM através da ActiveRecord, e views utilizando a linguagem natural do PHP.


{% img align-left /images/blog/ci-logo.png 180 180 Logotipo do Codeigniter %}

Após experimentar [algumas *frameworks*][] [*PHP*][], recentemente tenho
aplicado bastante tempo no estudo da [**CodeIgniter**][], e tive o prazer de
redescobrir a diversão em programar nessa linguagem um tanto controversa.

Logo de cara, quero recomendar o *screencast* da [*Nettus+*][] chamado
[*CodeIgniter From Scratch*][]. Um excelente material para aprender (e
se aperfeiçoar) a desenvolver aplicações [*Web*][] com [*PHP*][].

<!-- PELICAN_END_SUMMARY -->


PHP e MVC
---------

Não há mistérios na forma como a *CodeIgniter* trabalha com o [*MVC*][],
utilizando o “*MVC* clássico”, com as rotas baseadas nos nomes do
controlador e das *actions*, modelos com [*ORM*][] através da
[*ActiveRecord*][], e *views* utilizando a linguagem natural do *PHP*
para gerar a visualização das suas páginas.

E este último, acredito ser uma das grandes vantagens do *PHP* com
*MVC*. Escrever *views* com *PHP* é muito mais “natural” do que em
qualquer outra linguagem (claro, se você entende de *PHP*). Não é
necessário aprender nenhuma “linguagem de template”, como em algumas
*frameworks*, pois é normal escrever o *PHP* “mesclado” ao [*HTML*][].

Em comparação à [*CakePHP*][] ou à [*Zend Framework*][], a verdade é que
a *CodeIgniter* é relativamente “seca”. Ou seja, temos menos “recursos
mágicos” e somos obrigados a por a “mão na massa de verdade” em algumas
situações. Embora isso seja encarado como um ponto negativo por alguns,
essa característica acaba resultando em maior performance e
simplicidade.


Performance
-----------

A partir da versão **2.0**, a *CodeIgniter* deixou de dar suporte ao
*PHP 4*, o que alavancou a sua performance (já que não é mais necessário criar
*fallbacks* para os recursos do *PHP 5*). Essa decisão permite que a
*framework* rume cada vez mais para o caminho da [Orientação a Objetos][],
e que torne a nossa vida cada dia mais simples :)

E performance é uma das qualidades e diferenciais da *CodeIgniter*.
Segundo o [*benchmark* realizado por *Leng Sheng Hong*][], a
*CodeIgniter* fica atrás apenas da (também excelente) *DooPHP*:

{% img align-center /images/blog/benchmark-php.png 610 365 Comparativo entre Frameworks PHP %}

Em tempos onde performance e disponibilidade são premissas, e não mais
diferenciais, ter uma boa ferramenta ao seu lado facilita muito o
trabalho de atender a essas expectativas.


Simplicidade
------------

Essa qualidade eu descobri recentemente, quando tive que usar a
[*SDK* do *Facebook*][] para desenvolver uma aplicação social com a
*CodeIgniter*.

Foi tão simples quanto jogar a classe como uma biblioteca, fazer alguns
ajustes de nomenclatura e construção, e pronto! Estava pronta para usar,
dentro da estrutura e fluxo da *CodeIgniter*.

Estender a *framework* é simples e prático. Escrever *hooks* e *helpers*
é tão natural quanto escrever funções. Essa simplicidade vem aliada a
uma coleção de *features* prontas disponíveis com o *core* da
*framework*. Também vale mencionar a facilidade de configuração e
instalação.


Considerações finais
--------------------

Se você procura uma *framework PHP* simples, que não seja tão “mágica” e
que permita para você um trabalho descomplicado com o *MVC*, recomendo a
*CodeIgniter*.

É claro que ela têm algumas desvantagens se comparada a outras
*frameworks* do mercado. Por exemplo, acredito que o desenvolvimento com
a *CakePHP* seja mais ágil e fácil se comparado ao da *CI* (é claro,
isso tem um custo na performance e tamanho). Mas com a versão **2.x**, é
visível que a ferramenta está caminhando para um desenvolvimento de alto
nível.


  [algumas *frameworks*]: {filename}agilidade-em-php-conhecendo-algumas-frameworks-parte-1.md
    "Agilidade em PHP: Conhecendo algumas frameworks – Parte 1"
  [*PHP*]: {tag}php 
    "Leia mais sobre PHP"
  [**CodeIgniter**]: http://codeigniter.com/
    "CodeIgniter: Open source PHP web application framework"
  [*Nettus+*]: http://net.tutsplus.com/
    "Web development tutorials, from beginner to advanced"
  [*CodeIgniter From Scratch*]: http://net.tutsplus.com/sessions/codeigniter-from-scratch/
    "Confira a série de screencasts sobre desenvolvimento com PHP e CodeIgniter"
  [*Web*]: {tag}web
    "Leia mais sobre Web"
  [*MVC*]: http://pt.wikipedia.org/wiki/MVC
    "Leia mais sobre Model-View-Controller"
  [*ORM*]: http://pt.wikipedia.org/wiki/Mapeamento_objeto-relacional
    "Leia mais sobre Mapeamento Objeto-Relacional"
  [*ActiveRecord*]: http://www.phpactiverecord.org/
    "Faça ORM em PHP com a ActiveRecord"
  [*HTML*]: {tag}html5
    "Leia mais sobre HTML"
  [*CakePHP*]: http://cakephp.org/ "Conheça a CakePHP"
  [*Zend Framework*]: http://framework.zend.com/
    "Conheça a poderosa Zend"
  [Orientação a Objetos]: {tag}oop
    "Leia mais sobre OOP"
  [*benchmark* realizado por *Leng Sheng Hong*]: https://github.com/darkredz/Web-Framework-Benchmark/blob/master/benchmark.png
    "Veja o repositório no GitHub do benchmark"
  [*SDK* do *Facebook*]: https://github.com/facebook/php-sdk
    "Conheça a SDK-PHP do Facebook, no GitHub"
