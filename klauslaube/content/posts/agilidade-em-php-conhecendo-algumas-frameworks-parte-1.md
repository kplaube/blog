---
title: "Agilidade em PHP: Conhecendo algumas frameworks – Parte 1"
date: 2010-11-27 13:21:00
tags:
  [
    "desenvolvimento-web",
    "php",
    "frameworks",
    "akelos",
    "cakephp",
    "codeigniter",
    "zend framework",
  ]
slug: agilidade-em-php-conhecendo-algumas-frameworks
thumbnail: /images/php-logo.png
---

Embora eu me considere um admirador do [_Python_][python] e [_Django_][django], é o
[_PHP_][php] que vem “colocando comida na mesa”. É inegável a importância
desta linguagem para o meio [_web_][web]. Basta reparar que a grande parte
dos cursos focados nesta área têm o _PHP_ em sua grade.

Isto pode ser uma “faca de dois gumes”, pois com a oferta de cursos em
_PHP_ em alta é normal que apareçam novos bons profissionais, e maus
profissionais (como em qualquer outra linguagem). Recentemente notei que
o profissional _PHP_ tem **fama** de escrever **“código ruim”** ou
“código cheirando mal”. Esta linguagem foi a minha porta de entrada para
o desenvolvimento _web_ (como é de muitos outros), e acredito que não
seja a linguagem que faça do profissional um mau programador…
experiência (e competência) adquirimos com tempo e prática.

Resumindo, conheço profissionais _PHP_ que **mandam muito bem**! Então
se você está começando… _PHP_ é sim uma ótima escolha (mas não limite-se
a ele).

E vamos ao post ;)

## Framework pra quê?

Sejamos sinceros. Quem já usou um _framework_ na vida sabe muito bem
como responder esta pergunta. Além do _set_ de funcionalidades “ready to
use“, temos os benefícios da organização, de algumas boas práticas de
segurança (em alguns casos), de testes automatizados, etc. Hoje, não me
vejo escrevendo um _software_ do zero… seria um total desperdício de
esforço e tempo.

Se você está meio cético quanto a isso tudo, eu lanço o desafio:
Pergunte a qualquer usuário do _jQuery_ se o mesmo deixaria de usá-lo e
voltaria a desenvolver suas soluções com [_Javascript_][javascript] puro.

## Botando o _PHP_ nos trilhos com _Akelos_

!["Logotipo do framework Akelos"](/images/akelos-logo.jpg "Logotipo do framework Akelos")

O _Akelos_ foi o primeiro _framework
PHP_ que eu experimentei. Na época (cerca de 2 anos atrás) ele tinha
sérios problemas com documentação e era um pouco “difícil de lidar”.

A premissa do _Akelos_ é ser o **_[Ruby on Rails][ror] do PHP_**.
Inclusive, quem tem certa experiência com _RoR_ vai notar várias
similaridades entre ambos (na verdade é um verdadeiro “port” do _RoR_
pro _PHP_). Cheguei a publicar um projeto em _Akelos_, e devo admitir
que na época tive um pouco de dificuldade… talvez hoje ele esteja mais
maduro.

O que eu realmente gostei nele foi o esquema de “admin generator”
semelhante ao do _Django_, seu poderoso esquema de _scaffolding_ e a
postura humilde dos desenvolvedores de indicarem outros _frameworks_ na
sua página oficial.

Se você já desenvolve em _[Ruby][ruby] (on Rails)_ e necessita passear pelo
mundo do _PHP_, _Akelos_ é uma boa pedida. Na minha opinião, se você não
tem nenhuma ligação com _Ruby_, recomendo experimentar outros
_frameworks_.

[Conheça o _Akelos Framework_][akelos].

## Cozinhando aplicações em CakePHP

!["Logotipo do framework CakePHP"](/images/cake-logo.png "Logotipo do framework CakePHP")

Posso considerar a _CakePHP_ o meu **_framework_ “oficial”** para _PHP_.
Para começar a sua página oficial já chama a atenção pelo visual e pela disposição de conteúdo.

A premissa da _CakePHP_ é “rapid development”. Já publiquei alguns
projetos em _Cake_ e devo admitir que ela lhe agrega uma produtividade
excepcional sem criar complexidade desnecessária.

O que me chamou a atenção, em relação aos outros _frameworks_
que testei, foi o seu esquema de **_ORM_**. Agregado ao seu mecanismo de
_scaffolding_, torna nossa vida muito mais simples em relação a
construção de modelos de dados, formulários e consultas.

A documentação é muito boa, e existem vários componentes de terceiros
que a fazem uma das escolhas mais certeiras para o seu ambiente de
desenvolvimento em _PHP_.

[Conheça a _CakePHP Framework_][cakephp].

## Injetando combustível com CodeIgniter

!["Logotipo do framework CodeIgniter"](/images/codeigniter-logo.png "Logotipo do framework CodeIgniter")

Antes de mais nada, devo dizer que só utilizo “oficialmente” a _CakePHP_ por
causa do seu _ORM_. Caso contrário, sem dúvida nenhuma, seria usuário assíduo do
_CodeIgniter_.

Ele é um _framework_ **muito legal**, pelo fato de ser mais abrangente
que os dois _frameworks_ citados anteriormente. Como assim “abrangente”? Explico:
_CodeIgniter_ **faz menos coisas para você** que a _Akelos_, _Cake_ ou
_Zend_.

Se você está pensando que isto é uma desvantagem, está enganado. O _CI_
é um _framework_ extremamente simples de usar. Gostei muito e recomendo
sem dó. Para aqueles projetos em que você quer ter total controle sobre
tudo o que ocorre em cada região da sua aplicação… _CI_ é uma excelente
pedida.

A sua documentação é muito boa, e talvez seja um grande fator positivo
para a escolha da ferramenta. Ela não é tão “rapid development” quanto a
_Cake_, mas garante uma produtividade incrível e um prazer indescritível
em programar em _PHP_.

Muito provável que eu volte a utilizá-lo em outros projetos.

[Conheça a _CodeIgniter_][codeigniter].

## O poderio do famoso Zend Framework

!["Logotipo do Zend Framework"](/images/zend-framework-logo.png "Logotipo do Zend Framework")

O meu contato com o _Zend Framework_ foi um tanto superficial, mas isso já me
dá propriedade para dizer: de todos as citados é o _framework_ mais poderoso.

Para ser sincero não tenho motivos para não usar o _Zend_, acredito que
a _Cake_ seja mais simples e “rapid”, por isso da minha escolha. Mas
conheço algumas agências _Web_ que a adotaram como ferramenta de
desenvolvimento seguindo a lógica: **excelente documentação**,
**excelente suporte**, **excelente participação da comunidade**. Para se
ter ideia, o _Zend_ já possui livros escritos por autores brasileiros,
fora a bibliografia estrangeira que também é muito boa.

Usei _Zend_ (na verdade prestei suporte a um projeto existente) em um
_blog_ com bom número de visitas diárias, utilizando um banco
_Postgres_. E talvez isso tenho refletido na minha escolha, pois o autor
do código não sabia utilizar o esquema de _ORM_ do _Zend_, fazendo com
que instruções referentes a consultas (que deveriam estar em modelos,
seguindo o _MVC_) estavam nos controladores, o que deixava o código
“macarrônico” demais para o meu gosto.

Mas é uma excelente ferramenta, possui um esquema de validadores muito
bom, e embora pareça um pouco complexa de início, com a prática você
acaba desmistificando e apaixonando-se por este _framework_.

[Conheça o _Zend Framework_][zend].

## Considerações finais

Como você pode ver, este papo de que o ambiente de desenvolvimento _PHP_
é “pobre” é lenda.

Até a próxima.

[python]: /tag/python.html "Leia mais sobre Python"
[django]: /tag/django.html "Leia mais sobre Django"
[php]: /tag/php.html "Leia mais sobre PHP"
[web]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[javascript]: /tag/javascript.html "Leia mais sobre Javascript"
[ror]: http://rubyonrails.org/ "Conheça a framework Ruby on Rails"
[ruby]: http://www.ruby-lang.org/pt/ "Conheça a linguagem Ruby"
[akelos]: http://www.akelos.org/ "Página oficial do projeto Akelos"
[cakephp]: http://cakephp.org/ "Página oficial do projeto CakePHP"
[codeigniter]: http://codeigniter.com/ "Página oficial do projeto CodeIgniter"
[zend]: http://framework.zend.com/ "Página oficial do projeto Zend Framework"
