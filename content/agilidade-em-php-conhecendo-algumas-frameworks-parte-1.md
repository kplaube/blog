Title: Agilidade em PHP: Conhecendo algumas frameworks – Parte 1
Date: 2010-11-27 13:21
Category: desenvolvimento
Tags: desenvolvimento, web, php, frameworks, akelos, cakephp, codeigniter, zend framework
Slug: agilidade-em-php-conhecendo-algumas-frameworks

|img "/images/blog/php-logo.png" 180 180 "O elefante mascote do PHP" "align-left"|
Olá pessoal!

Embora eu me considere um admirador do [*Python*][python] e [*Django*][django], é o
[*PHP*][php] que vem “colocando comida na mesa”. É inegável a importância
desta linguagem para o meio [*Web*][web]. Basta reparar que a grande parte
dos cursos focados nesta área têm o *PHP* em sua grade.

<!-- PELICAN_END_SUMMARY -->

Isto pode ser uma “faca de dois gumes”, pois com a oferta de cursos em
*PHP* em alta é normal que apareçam novos bons profissionais, e maus
profissionais (como em qualquer outra linguagem). Recentemente notei que
o profissional *PHP* tem **fama** de escrever **“código ruim”** ou
“código cheirando mal”. Esta linguagem foi a minha porta de entrada para
o desenvolvimento *Web* (como é de muitos outros), e acredito que não
seja a linguagem que faça do profissional um mau programador…
experiência (e competência) adquirimos com tempo e prática.

Resumindo, conheço profissionais *PHP* que **mandam muito bem**! Então
se você está começando… *PHP* é sim uma ótima escolha (mas não limite-se
a ele).

E vamos ao post ;)

Framework pra quê?
------------------

Sejamos sinceros. Quem já usou um *framework* na vida sabe muito bem
como responder esta pergunta. Além do *set* de funcionalidades “ready to
use“, temos os benefícios da organização, de algumas boas práticas de
segurança (em alguns casos), de testes automatizados, etc. Hoje, não me
vejo escrevendo um *software* do zero… seria um total desperdício de
esforço e tempo.

Se você está meio cético quanto a isso tudo, eu lanço o desafio:
Pergunte a qualquer usuário do *jQuery* se o mesmo deixaria de usá-lo e
voltaria a desenvolver suas soluções com [*Javascript*][javascript] puro.

Botando o *PHP* nos trilhos com *Akelos*
--------------------------------------------------------------

|img "/images/blog/akelos-logo.jpg" 180 95 "Logotipo do framework Akelos" "align-left"|
O *Akelos* foi o primeiro *framework
PHP* que eu experimentei. Na época (cerca de 2 anos atrás) ele tinha
sérios problemas com documentação e era um pouco “difícil de lidar”.

A premissa do *Akelos* é ser o ***[Ruby on Rails][ror] do PHP***.
Inclusive, quem tem certa experiência com *RoR* vai notar várias
similaridades entre ambos (na verdade é um verdadeiro “port” do *RoR*
pro *PHP*). Cheguei a publicar um projeto em *Akelos*, e devo admitir
que na época tive um pouco de dificuldade… talvez hoje ele esteja mais
maduro.

O que eu realmente gostei nele foi o esquema de “admin generator”
semelhante ao do *Django*, seu poderoso esquema de *scaffolding* e a
postura humilde dos desenvolvedores de indicarem outros *frameworks* na
sua página oficial.

Se você já desenvolve em *[Ruby][ruby] (on Rails)* e necessita passear pelo
mundo do *PHP*, *Akelos* é uma boa pedida. Na minha opinião, se você não
tem nenhuma ligação com *Ruby*, recomendo experimentar outros
*frameworks*.

[Conheça o *Akelos Framework*][akelos].


Cozinhando aplicações em CakePHP
--------------------------------

|img "/images/blog/cake-logo.png" 180 180 "Logotipo do framework CakePHP" "align-left"|
Posso considerar a *CakePHP* o meu ***framework* “oficial”** para *PHP*.
Para começar a sua página oficial já chama a atenção pelo visual e pela disposição de conteúdo.

A premissa da *CakePHP* é “rapid development”. Já publiquei alguns
projetos em *Cake* e devo admitir que ela lhe agrega uma produtividade
excepcional sem criar complexidade desnecessária.

O que me chamou a atenção, em relação aos outros *frameworks*
que testei, foi o seu esquema de ***ORM***. Agregado ao seu mecanismo de
*scaffolding*, torna nossa vida muito mais simples em relação a
construção de modelos de dados, formulários e consultas.

A documentação é muito boa, e existem vários componentes de terceiros
que a fazem uma das escolhas mais certeiras para o seu ambiente de
desenvolvimento em *PHP*.

[Conheça a *CakePHP Framework*][cakephp].

Injetando combustível com CodeIgniter
-------------------------------------

|img "/images/blog/codeigniter-logo.png" 180 214 "Logotipo do framework CodeIgniter" "align-left"|
Antes de mais nada, devo dizer que só utilizo “oficialmente” a *CakePHP* por
causa do seu *ORM*. Caso contrário, sem dúvida nenhuma, seria usuário assíduo do
*CodeIgniter*.

Ele é um *framework* **muito legal**, pelo fato de ser mais abrangente
que os dois *frameworks* citados anteriormente. Como assim “abrangente”? Explico:
*CodeIgniter* **faz menos coisas para você** que a *Akelos*, *Cake* ou
*Zend*.

Se você está pensando que isto é uma desvantagem, está enganado. O *CI*
é um *framework* extremamente simples de usar. Gostei muito e recomendo
sem dó. Para aqueles projetos em que você quer ter total controle sobre
tudo o que ocorre em cada região da sua aplicação… *CI* é uma excelente
pedida.

A sua documentação é muito boa, e talvez seja um grande fator positivo
para a escolha da ferramenta. Ela não é tão “rapid development” quanto a
*Cake*, mas garante uma produtividade incrível e um prazer indescritível
em programar em *PHP*.

Muito provável que eu volte a utilizá-lo em outros projetos.

[Conheça a *CodeIgniter*][codeigniter].


O poderio do famoso Zend Framework
----------------------------------

|img "/images/blog/zend-framework-logo.png" 180 123 "Logotipo do Zend Framework" "align-left"|
O meu contato com o *Zend Framework* foi um tanto superficial, mas isso já me
dá propriedade para dizer: de todos as citados é o *framework* mais poderoso.

Para ser sincero não tenho motivos para não usar o *Zend*, acredito que
a *Cake* seja mais simples e “rapid”, por isso da minha escolha. Mas
conheço algumas agências *Web* que a adotaram como ferramenta de
desenvolvimento seguindo a lógica: **excelente documentação**,
**excelente suporte**, **excelente participação da comunidade**. Para se
ter ideia, o *Zend* já possui livros escritos por autores brasileiros,
fora a bibliografia estrangeira que também é muito boa.

Usei *Zend* (na verdade prestei suporte a um projeto existente) em um
*blog* com bom número de visitas diárias, utilizando um banco
*Postgres*. E talvez isso tenho refletido na minha escolha, pois o autor
do código não sabia utilizar o esquema de *ORM* do *Zend*, fazendo com
que instruções referentes a consultas (que deveriam estar em modelos,
seguindo o *MVC*) estavam nos controladores, o que deixava o código
“macarrônico” demais para o meu gosto.

Mas é uma excelente ferramenta, possui um esquema de validadores muito
bom, e embora pareça um pouco complexa de início, com a prática você
acaba desmistificando e apaixonando-se por este *framework*.

[Conheça o *Zend Framework*][zend].


Considerações finais
--------------------

Como você pode ver, este papo de que o ambiente de desenvolvimento *PHP*
é “pobre” é lenda.

Na parte dois deste post iremos falar da “brazuca” *Spaghetti*,
*Kohana*, e outras… até lá!

  [python]: {tag}python
    "Leia mais sobre Python"
  [django]: {tag}django
    "Leia mais sobre Django"
  [php]: {tag}php "Leia mais sobre PHP"
  [web]: {tag}web "Leia mais sobre Web"
  [javascript]: {tag}javascript
    "Leia mais sobre Javascript"
  [ror]: http://rubyonrails.org/
    "Conheça a framework Ruby on Rails"
  [ruby]: http://www.ruby-lang.org/pt/ "Conheça a linguagem Ruby"
  [akelos]: http://www.akelos.org/
    "Página oficial do projeto Akelos"
  [cakephp]: http://cakephp.org/
    "Página oficial do projeto CakePHP"
  [codeigniter]: http://codeigniter.com/
    "Página oficial do projeto CodeIgniter"
  [zend]: http://framework.zend.com/
    "Página oficial do projeto Zend Framework"
