Title: Montando seu ambiente de desenvolvimento Django no Linux
Date: 2011-03-03 21:16
Category: desenvolvimento
Tags: desenvolvimento, web, python, django, ambiente-de-desenvolvimento, linux
Slug: montando-seu-ambiente-de-desenvolvimento-django
meta_description: Série de publicações sobre ambiente de desenvolvimento Python/Django em Linux. Veja como é fácil ter um ambiente de alto nível para os seus projetos.


|img "/images/blog/django-logo.png" 180 180 "Logotipo do Django" "align-left"|
Olá pessoas!

Vou iniciar uma série de publicações mostrando na prática como montar o
seu ambiente de desenvolvimento para trabalhar com [*Python*][] e
[*Django*][].

O objetivo é ilustrar como você pode facilmente ingressar no *Django* e
ter um conjunto de ferramentas simples e eficientes que lhe ajudarão a
desenvolver de forma produtiva e com qualidade.

Os tópicos serão os seguintes (sujeito a alteração):

* [Motivação (este *post*)][]
* [Diferentes ambientes: *Development*, *Testing*, *Staging* e *Production*][]
* [*Python*, *Django* e *virtualenv*][]
* [Como organizar seus projetos *Django*][]
* [Como versionar projetos *Django* com o *Mercurial* – Parte 1][]
* [Como versionar projetos *Django* com o *Mercurial* – Parte 2][]
* [Como versionar projetos *Django* com o *Mercurial* – Parte 3][]
* [Ferramentas de testes em *Django* – Parte 1][]
* [Ferramentas de testes em *Django* – Parte 2][]
* [Assegure a qualidade do seu código *Python* – *pep8*][]
* [Assegure a qualidade do seu código *Python* – *Pylint*][]
* [Assegure a qualidade do seu código *Python* – *Pyflakes*][]
* [Assegure a qualidade do seu código *Python* – *Clone Digger*][]
* [Migrations em *Django*][]
* [*Nginx*: poderoso, rápido e fácil][]
* [*Supervisor*: Aumentando a disponibilidade das suas aplicações *Web*][]
* [Automatize o *deploy* dos seus projetos com *Fabric*][]
* [*Django* e *Cache*: Uma dupla de alta performance – Parte 1][]
* [*Django* e *Cache*: Uma dupla de alta performance – Parte 2][]
* Criando um servidor para projetos *Django*

<!-- PELICAN_END_SUMMARY -->


Requisitos
----------

Existem centenas (senão milhares) de tutoriais deste tipo espalhados
pela [*Web*][], portanto, para variar um pouquinho vamos usar um
ambiente de desenvolvimento diferente:


### Sistemas Operacionais: Debian e Slackware

|img "/images/blog/tux.png" 120 120 "Tux, o mascote do Linux" "align-left"|
Embora eu vá utilizar o [*Debian 6*][] no
ambiente de desenvolvimento, isolarei o ambiente de *staging* em uma
máquina virtual. Nela, terei o [*Slackware 13.1*][] “básico”, e a partir
daí instalaremos banco de dados e servidor *Web*.

Não iremos abordar a instalação das distribuições… existem tutoriais
suficientes na Web sobre isto.


### Banco de Dados: SQLite e PostgreSQL

Para o seu ambiente de desenvolvimento, o [*SQLite*][] quebra um galho.
Pequeno, leve e suficientemente bom para quando você está desenvolvendo
suas aplicações com *Django*. Porém, para ambientes de produção (onde a
demanda pode ser grande), o *SQLite* é pouco recomendado… então podemos
escolher (tratando-se de bancos relacionais) entre o [*MySQL*][] e o
[*PostgreSQL*][].

Embora eu seja um usuário “fervoroso” do *MySQL*, a aquisição dele pela
*Oracle* me deixou com a pulga atrás da orelha. Então, vou aproveitar
para aprender um pouco mais sobre *PostgreSQL* enquanto escrevo este
tutorial

### Servidor Web: Nginx

Aposto que você achou que iríamos utilizar *Apache* :D

O [*Nginx*][] é considerado por alguns desenvolvedores o servidor *Web*
mais robusto da atualidade. [Segundo o *Wikipedia*][], é o quarto
servidor *Web* mais utilizado no mundo.

Ótima oportunidade para usá-lo!

### Python 2.x e Django 1.x.x

Até a data desta publicação, o *Python (2.x)* estava em sua versão
[*2.7.1 (stable)*][] e o [*Django* na 1.2.5 *(stable)*][].

Utilizarei a versão 2.6 do *Python* por ser mais facilmente encontrada
nas hospedagens *Web*. Fique livre para escolher o que for melhor para
você.

Se você quiser acompanhar a produção destes artigos, [assine o *RSS*][]
ou [siga-me no *Twitter*][].

Até mais…


  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [Motivação (este *post*)]: http://klauslaube.com.br/2011/03/03/montando-seu-ambiente-de-desenvolvimento-django/
    "Montando seu ambiente de desenvolvimento Django no Linux"
  [Diferentes ambientes: *Development*, *Testing*, *Staging* e *Production*]: http://klauslaube.com.br/2011/03/07/diferentes-ambientes/
    "Descubra a diferença entre os ambientes de desenvolvimento"
  [*Python*, *Django* e *virtualenv*]: http://klauslaube.com.br/2011/03/18/python-django-virtualenv/
    "Python, Django e virtualenv"
  [Como organizar seus projetos *Django*]: http://klauslaube.com.br/2011/04/11/como-organizar-seus-projetos-django/
    "Conheça uma forma bacana para você organizar seus projetos Django"
  [Como versionar projetos *Django* com o *Mercurial* – Parte 1]: http://klauslaube.com.br/2011/05/10/como-versionar-projetos-django-mercurial-parte/
    "Leia uma introdução ao Mercurial e saiba a razão de não falar sobre Git"
  [Como versionar projetos *Django* com o *Mercurial* – Parte 2]: http://klauslaube.com.br/2011/05/22/como-versionar-projetos-django-mercurial-parte-2/
    "Continuação do post sobre Mercurial e Django"
  [Como versionar projetos *Django* com o *Mercurial* – Parte 3]: http://klauslaube.com.br/2011/06/04/como-versionar-projetos-django-mercurial-parte-3/
    "Parte final do tutorial sobre Mercurial e Django"
  [Ferramentas de testes em *Django* – Parte 1]: http://klauslaube.com.br/2011/07/18/ferramentas-de-testes-em-django-parte-1/
    "Descubra que é possível sim escrever testes em Django"
  [Ferramentas de testes em *Django* – Parte 2]: http://klauslaube.com.br/2011/07/23/ferramentas-de-testes-em-django-parte-2/
    "A continuação do post sobre testes em Django com algumas ferramentas eficientes"
  [Assegure a qualidade do seu código *Python* – *pep8*]: http://klauslaube.com.br/2011/08/26/assegure-qualidade-seu-codigo-python-pep/
    "Conheça o pep8, e deixe o seu código dentro das convenções do Python"
  [Assegure a qualidade do seu código *Python* – *Pylint*]: http://klauslaube.com.br/2011/09/06/assegura-a-qualidade-de-codigo-python-pylint/
    "Assegure a qualidade do seu código utilizando o Pylint"
  [Assegure a qualidade do seu código *Python* – *Pyflakes*]: http://klauslaube.com.br/2011/10/02/assegure-qualidade-seu-codigo-python-pyflakes/
    "Conheça o Pyflakes, e garanta a qualidade do seu código Python"
  [Assegure a qualidade do seu código *Python* – *Clone Digger*]: http://klauslaube.com.br/2011/10/16/assegure-qualidade-seu-codigo-python-clone-digger/
    "Aprenda a prevenir código duplicado com o Clone Digger"
  [Migrations em *Django*]: http://klauslaube.com.br/2011/11/20/migrations-em-django-south/
    "Aprenda a fazer atualização da estrutura do seu banco de dados, de forma automatizada"
  [*Nginx*: poderoso, rápido e fácil]: http://klauslaube.com.br/2011/12/19/nginx-poderoso-rapido-facil/
    "Conheça o Nginx! Uma alternativa mais poderosa ao Apache"
  [*Supervisor*: Aumentando a disponibilidade das suas aplicações *Web*]: http://klauslaube.com.br/2012/01/23/supervisor-gerencie-os-processos-seu-servidor-web/
    "Conheça o Supervisor, e tenha os processos do seu servidor, sob controle"
  [Automatize o *deploy* dos seus projetos com *Fabric*]: http://klauslaube.com.br/2012/02/26/automatize-o-deploy-dos-seus-projetos-com-fabric/
    "Veja um exemplo prático de automatização de deploy com Fabric"
  [*Django* e *Cache*: Uma dupla de alta performance – Parte 1]: http://klauslaube.com.br/2012/06/17/django-e-cache-uma-dupla-de-alta-performance-1/
    "Conheça o framework de cache do Django e como usá-lo com o Memcached"
  [*Django* e *Cache*: Uma dupla de alta performance – Parte 2]: http://klauslaube.com.br/2012/07/22/django-e-cache-uma-dupla-de-alta-performance-2/
    "Conheça um pouco mais do framework de cache do Django"
  [*Web*]: {tag}web "Leia mais sobre Web"
  [*Debian 6*]: http://www.debian.org/
    "Debian, uma das mais famosas e estáveis distros Linux"
  [*Slackware 13.1*]: http://www.slackware.com/
    "Slackware, uma das distros Linux mais "
  [*SQLite*]: http://www.sqlite.org/
    "Baixe um dos bancos de dados mais simpáticos da atualidade"
  [*MySQL*]: http://www.mysql.com/
    "MySQL, o banco de dados mais popular do mundo"
  [*PostgreSQL*]: http://www.postgresql.org/
    "PostgreSQL, o banco de dados open source mais avançado do mundo"
  [*Nginx*]: http://nginx.org/ "Um dos servidores Web mais "
  [Segundo o *Wikipedia*]: http://pt.wikipedia.org/wiki/Nginx
    "Leia mais sobre Nginx na Wikipedia"
  [*2.7.1 (stable)*]: http://www.python.org/getit/
    "Baixe o Python gratuitamente"
  [*Django* na 1.2.5 *(stable)*]: http://www.djangoproject.com/download/
    "Baixe o Django gratuitamente"
  [assine o *RSS*]: http://www.klauslaube.com.br/feed/rss.xml
    "Leia os posts deste Blog no seu leitor RSS favorito"
  [siga-me no *Twitter*]: http://www.twitter.com/kplaube
    "Acompanhe o desenvolvimento deste e de outros posts"
