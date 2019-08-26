Title: Pelican e os static site generators
Date: 2014-03-26 12:00:00
Category: desenvolvimento
Tags: desenvolvimento, web, blog, pelican, python
Slug: pelican-e-os-static-site-generators
meta_description: O Django é de longe o meu framework Python favorito. Mas para determinadas tarefas, ele vira overhead. É aí que entra o Pelican.


{% img representative-image /images/blog/pelican.png 180 180 Logo do Pelican %}
O [*Django*][] é de longe o meu *framework* [*Python*][] favorito. Fácil,
extensível, com uma série de "baterias inclusas" que tornam o desenvolvimento
de aplicações [*Web*][] muito mais fácil e divertido.

Mas verdade seja dita, para algumas soluções, é como se utilizássemos um
canhão para matar um mosquito. Existe toda uma preocupação no que diz respeito
a persistência, [*caching*][], serviço de aplicação e serviço *Web*, que em
determinados contextos não passa de "overhead".

<!-- PELICAN_END_SUMMARY -->

Foi em cima dessa linha de pensamento que resolvi abandonar a *engine* de
*blog* [*django-diario*][], e me aventurar pelo mundo dos geradores de sites
estáticos.

Por que um static site generator?
---------------------------------

Geradores de sites estáticos não são nenhuma novidade, e 
[existem aos montes][staticsitegenerators]. Seja em [*Ruby*][], [*Node.js*][],
[*PHP*][] ou até mesmo em [*Perl*][], a sua popularidade é notória e no mínimo
curiosa.

Alguns amam, [outros odeiam][odeiam]. A verdade é que (uma vez a sua ferramenta
devidamente configurada) eles tornam a publicação de conteúdo muito simples:
Basta pegar o [*HTML*][] gerado e jogar no seu servidor favorito, podendo 
inclusive ser aquela sua hospedagem nacional, que mal funciona e que você sonha
um dia ter suporte a *Python 3*.

Já passei por problemas com indisponibilidade de banco de dados, *websites*
invadidos por falhas de segurança em aplicações como *Joomla!* e *Wordpress*,
e nem vou mencionar as dores de cabeça que já tive para configurar um servidor 
[*WSGI*][] dentro de uma hospedagem.

Com ferramentas como o [*Pelican*][] esses problemas deixam de existir. A
persistência é feita no seu próprio disco, o que é ótimo, já que você pode
manter o seu *blog* inteiro (inclusive o seu conteúdo) versionado no
[*GitHub*][].

Não estamos "regredindo" para um *web* estática, estamos apenas explorando
diferentes meios para publicação de conteúdo :)

Pelican FTW!
------------

Por que *Pelican*? Porque é feito em *Python*. Simples assim.

Foi a primeira ferramenta que encontrei feita na linguagem, e desde lá venho
explorando as suas funcionalidades. Logo, seria hipocrisia dar qualquer
resposta diferente desta.

É claro que a ferramenta possui seus atrativos, a começar pela ótima
integração com o [*Jinja2*][], que torna o processo de criação dos temas muito
mais  fácil e intuitivo. Estender o *Pelican* [é simples][estender], embora
ele já possua uma série de [*plugins*][] e [temas][] para diferentes fins,
prontinhos para uso.

Nesse processo [escrevi um tema][tema] para o *blog*, e tendo escrito
*templates* para *Joomla!*, *Wordpress* e até mesmo *Django*, sou obrigado a
dizer: É muito, muito mais simples! 

Além de ser fácil de usar, a ferramenta **pelican-quickstart** te entrega logo
de cara uma estrutura de projeto bem consistente, incluindo *tasks* de
publicação através de *Makefile* e [*Fabric*][]. É configurar o seu
**pelicanconf.py**, escolher o seu tema preferido, e sair usando.

Lembro de começar a usar o *Pelican* antes da sua versão **3.3**, e foi uma
tremenda dor de cabeça. Essa última versão está mais "redonda", sua
documentação abrange muito bem os passos de escrita conteúdo e criação de temas.

Minha maior crítica fica na fraca solução dada para instalação e gerência de
temas e *plugins*. Fico na esperança de alguma boa alma chegar com uma ideia
muito boa para resolver esse problema.

Considerações finais
--------------------

*Hype* ou não, os *static site generators* possuem sim o seu valor. Se você
está querendo blogar, ou está cansado de lidar com aquele seu *Wordpress* que
mais parece um elefante branco, considere utilizar uma dessas ferramentas.

E se você é pythonista, considere utilizar o *Pelican*. Quanto mais gente
talentosa estendendo-o, melhor ele ficará!

Até a próxima.


  [*Django*]: {tag}django "Leia mais sobre Django"
  [*Python*]: {tag}python "Leia mais sobre Python"
  [*Web*]: {tag}web "Leia mais sobre Web"
  [*caching*]: {tag}cache "Leia mais sobre Cache"
  [*django-diario*]: https://bitbucket.org/semente/django-diario "Conheça a engine de blogs escrita em Python e Django"
  [*Ruby*]: http://jekyllrb.com/ "Transform your plain text into static websites and blogs"
  [*Node.js*]: http://docpad.org/ "Designers and developers can create websites faster than ever before"
  [*PHP*]: http://dropplets.com/ "A fresh platform dedicated to making blogging simple again"
  [*Perl*]: http://ikiwiki.info/ "Ikiwiki is a wiki compiler. It converts wiki pages into HTML pages suitable for publishing on a website"
  [staticsitegenerators]: http://staticsitegenerators.net/ "The definitive listing of Static Site Generators"
  [odeiam]: http://blog.millermedeiros.com/static-site-generators/ "Static site generators"
  [*HTML*]: {tag}html5 "Leia mais sobre HTML"
  [*WSGI*]: {filename}entendendo-o-cgi-fastcgi-e-wsgi.md "Entendendo o CGI, FastCGI e o WSGI"
  [*Pelican*]: http://docs.getpelican.com/ "Pelican is a static site generator, written in Python"
  [*GitHub*]: https://github.com/kplaube/blog "Contribua com o código deste blog!"
  [*Jinja2*]: http://jinja.pocoo.org/docs/ "Jinja2 is a modern and designer friendly templating language for Python, modelled after Django’s templates"
  [*plugins*]: https://github.com/getpelican/pelican-plugins "A bunch of plugins for the pelican blog engine."
  [temas]: https://github.com/getpelican/pelican-themes "Themes for pelican"
  [estender]: http://docs.getpelican.com/en/3.3.0/plugins.html#how-to-create-plugins "Como criar plugins para o Pelican"
  [*Fabric*]: {filename}automatize-o-deploy-dos-seus-projetos-com-fabric.md "Automatize o deploy dos seus projetos com Fabric"
  [tema]: https://github.com/kplaube/maggner-pelican "Contribua com o Maggner-Pelican"
