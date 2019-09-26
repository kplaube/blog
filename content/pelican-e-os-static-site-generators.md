Title: Pelican e os static site generators
Date: 2014-03-26 12:00:00
Category: desenvolvimento
Tags: desenvolvimento, web, blog, pelican, python
Slug: pelican-e-os-static-site-generators
meta_description: O Django é de longe o meu framework Python favorito. Mas para determinadas tarefas, ele vira overhead. É aí que entra o Pelican.
Image: /images/blog/pelican.png
Alt: Logo do Pelican

O [*Django*][] é de longe o meu _framework_ [*Python*][] favorito. Fácil,
extensível, com uma série de "baterias inclusas" que tornam o desenvolvimento
de aplicações [*web*][] muito mais fácil e divertido.

<!-- PELICAN_END_SUMMARY -->

Mas verdade seja dita, para algumas soluções, é como se utilizássemos um
canhão para matar um mosquito. Existe toda uma preocupação no que diz respeito
a persistência, [*caching*][], serviço de aplicação e serviço _Web_, que em
determinados contextos não passa de "overhead".

Foi em cima dessa linha de pensamento que resolvi abandonar a _engine_ de
_blog_ [*django-diario*][], e me aventurar pelo mundo dos geradores de sites
estáticos.

## Por que um static site generator?

Geradores de sites estáticos não são nenhuma novidade, e
[existem aos montes][staticsitegenerators]. Seja em [*Ruby*][], [*Node.js*][],
[*PHP*][] ou até mesmo em [*Perl*][], a sua popularidade é notória e no mínimo
curiosa.

Alguns amam, [outros odeiam][odeiam]. A verdade é que (uma vez a sua ferramenta
devidamente configurada) eles tornam a publicação de conteúdo muito simples:
Basta pegar o [*HTML*][] gerado e jogar no seu servidor favorito, podendo
inclusive ser aquela sua hospedagem nacional, que mal funciona e que você sonha
um dia ter suporte a _Python 3_.

Já passei por problemas com indisponibilidade de banco de dados, _websites_
invadidos por falhas de segurança em aplicações como _Joomla!_ e _Wordpress_,
e nem vou mencionar as dores de cabeça que já tive para configurar um servidor
[*WSGI*][] dentro de uma hospedagem.

Com ferramentas como o [*Pelican*][] esses problemas deixam de existir. A
persistência é feita no seu próprio disco, o que é ótimo, já que você pode
manter o seu _blog_ inteiro (inclusive o seu conteúdo) versionado no
[*GitHub*][].

Não estamos "regredindo" para um _web_ estática, estamos apenas explorando
diferentes meios para publicação de conteúdo :)

## Pelican FTW!

Por que _Pelican_? Porque é feito em _Python_. Simples assim.

Foi a primeira ferramenta que encontrei feita na linguagem, e desde lá venho
explorando as suas funcionalidades. Logo, seria hipocrisia dar qualquer
resposta diferente desta.

É claro que a ferramenta possui seus atrativos, a começar pela ótima
integração com o [*Jinja2*][], que torna o processo de criação dos temas muito
mais fácil e intuitivo. Estender o _Pelican_ [é simples][estender], embora
ele já possua uma série de [*plugins*][] e [temas][] para diferentes fins,
prontinhos para uso.

Nesse processo [escrevi um tema][tema] para o _blog_, e tendo escrito
_templates_ para _Joomla!_, _Wordpress_ e até mesmo _Django_, sou obrigado a
dizer: É muito, muito mais simples!

Além de ser fácil de usar, a ferramenta **pelican-quickstart** te entrega logo
de cara uma estrutura de projeto bem consistente, incluindo _tasks_ de
publicação através de _Makefile_ e [*Fabric*][]. É configurar o seu
**pelicanconf.py**, escolher o seu tema preferido, e sair usando.

Lembro de começar a usar o _Pelican_ antes da sua versão **3.3**, e foi uma
tremenda dor de cabeça. Essa última versão está mais "redonda", sua
documentação abrange muito bem os passos de escrita conteúdo e criação de temas.

Minha maior crítica fica na fraca solução dada para instalação e gerência de
temas e _plugins_. Fico na esperança de alguma boa alma chegar com uma ideia
muito boa para resolver esse problema.

## Considerações finais

_Hype_ ou não, os _static site generators_ possuem sim o seu valor. Se você
está querendo blogar, ou está cansado de lidar com aquele seu _Wordpress_ que
mais parece um elefante branco, considere utilizar uma dessas ferramentas.

E se você é pythonista, considere utilizar o _Pelican_. Quanto mais gente
talentosa estendendo-o, melhor ele ficará!

Até a próxima.

[*django*]: {tag}django "Leia mais sobre Django"
[*python*]: {tag}python "Leia mais sobre Python"
[*web*]: {tag}web "Leia mais sobre Web"
[*caching*]: {tag}cache "Leia mais sobre Cache"
[*django-diario*]: https://bitbucket.org/semente/django-diario "Conheça a engine de blogs escrita em Python e Django"
[*ruby*]: http://jekyllrb.com/ "Transform your plain text into static websites and blogs"
[*node.js*]: http://docpad.org/ "Designers and developers can create websites faster than ever before"
[*php*]: http://dropplets.com/ "A fresh platform dedicated to making blogging simple again"
[*perl*]: http://ikiwiki.info/ "Ikiwiki is a wiki compiler. It converts wiki pages into HTML pages suitable for publishing on a website"
[staticsitegenerators]: http://staticsitegenerators.net/ "The definitive listing of Static Site Generators"
[odeiam]: http://blog.millermedeiros.com/static-site-generators/ "Static site generators"
[*html*]: {tag}html5 "Leia mais sobre HTML"
[*wsgi*]: {filename}entendendo-o-cgi-fastcgi-e-wsgi.md "Entendendo o CGI, FastCGI e o WSGI"
[*pelican*]: http://docs.getpelican.com/ "Pelican is a static site generator, written in Python"
[*github*]: https://github.com/kplaube/blog "Contribua com o código deste blog!"
[*jinja2*]: http://jinja.pocoo.org/docs/ "Jinja2 is a modern and designer friendly templating language for Python, modelled after Django’s templates"
[*plugins*]: https://github.com/getpelican/pelican-plugins "A bunch of plugins for the pelican blog engine."
[temas]: https://github.com/getpelican/pelican-themes "Themes for pelican"
[estender]: http://docs.getpelican.com/en/3.3.0/plugins.html#how-to-create-plugins "Como criar plugins para o Pelican"
[*fabric*]: {filename}automatize-o-deploy-dos-seus-projetos-com-fabric.md "Automatize o deploy dos seus projetos com Fabric"
[tema]: https://github.com/kplaube/maggner-pelican "Contribua com o Maggner-Pelican"
