Title: Python, Django e virtualenv
Date: 2011-03-18 20:24
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, django, slackware, virtualenv
Slug: python-django-virtualenv
meta_description: Utilizar o Python e Django em um ambiente virtual criado pelo virtualenv, além de simples é uma boa-prática.


{% img align-left /images/blog/python-django.jpg 180 180 Python e Django %}

Olá pessoas!

Dando continuidade a série “[Montando seu ambiente de desenvolvimento
*Django* em *Linux*][]”, vamos dar uma pincelada na tríade [*Python*][],
[*Django*][] e [*virtualenv*][].


Python
------

[Conheça alguns motivos que lhe convencerão a usar *Python*][].

O *Python* já vem instalado na maioria das distribuições [*Linux*][]. Na
verdade, até hoje nunca usei uma distro *Linux* que não tivesse o
*Python* préviamente instalado. No *Slackware 13.1*, o *Python* está na
versão 2.6.4. No *Debian 6*, o *Python* está na versão 2.6.6.

<!-- PELICAN_END_SUMMARY -->

O portal *Python Brasil* possui um excelente material para você
[instalar][] e dar os [primeiros passos][] com *Python*.


virtualenv
----------

A linguagem *Python* não vem “de bobeira” nas distribuições *Linux*, ela
faz parte delas, sendo utilizada para criação de uma série de *scripts*
fundamentais. Passei por uma situação peculiar com o *Python*: estava
usando o *OpenSuse* (não recordo a versão) e decidi atualizar a versão
do *Python* utilizando o sistema de pacotes da distro… confirmei algumas
operações de remoção (que não deveria ter autorizado) e acabei
danificando minha instalação do [*SO*][].

Então, para aqueles que programam em computadores pessoais, e não querem
comprometer tanto o *SO* quanto o *workspace*, podem criar **ambientes
isolados** para os projetos utilizando o [*virtualenv*][1].

No *Slackware* vamos instalar o [*setuptools*][], que é um *framework*
que facilita a instalação e criação de pacotes *Python*:

    ::bash
    $ wget http://peak.telecommunity.com/dist/ez_setup.py

Para instalá-lo é necessário ser ***root***:

    ::bash
    $ python ez_setup.py

Em seguida, vamos instalar o *virtualenv* com a ajuda do
***easy_install*** (que faz parte do pacote *setuptools*):

    ::bash
    $ easy_install virtualenv

Esta é uma forma interessante para você instalar módulos *Python* em seu
sistema sem recorrer ao sistema de pacotes do *SO*.

Agora, como um **usuário comum**, vamos criar um ambiente em nosso
***home*** para testarmos o *virtualenv*:

    ::bash
    $ virtualenv ~/projeto_django

Entrando nesta pasta, você irá se deparar com três diretórios:

* **bin:** Os executáveis do seu ambiente isolado estarão aí. Você
    poderá notar o executável *python*, o *easy_install*, o *pip* e
    um carinha chamado “activate” (falaremos deste mais tarde).
* **lib:** Nesta pasta você encontrará os módulos e bibliotecas
    *Python* utilizadas por este ambiente.
* **include:** Segundo o [*Osvaldo Santana*][], dentro desse diretório
    estão os *links* simbólicos para todos os *headers* do *Python* que
    são necessário para se compilar extensões escritas em *C* para ele.

Você apenas criou seu ambiente… para ativá-lo basta dar o seguinte
comando:

    ::bash
    $ source ~/projeto_django/bin/activate

Pronto! Se você executar o *Python* agora, você estará utilizando as
*libs* **deste ambiente**. Isso pode permitir que você mova este
ambiente entre máquinas, que você instale *libs* somente neste ambiente
(deixando o *Python* do seu *SO* “limpo”, isso pode te garantir maior
performance da distro) e que você tenha um controle maior sobre as
dependências do seu projeto.

Para “sair” do ambiente, basta executar o comando **deactivate**:

    ::bash
    $ deactivate

Pronto… muito simples, não?


Django
------

[Saiba um pouco mais sobre a programação *Python* para *Web*][].

Vamos instalar o *Django* neste **ambiente isolado**. Ativaremos
novamente o **virtualenv** e usaremos o ***easy_install*** para nos
ajudar com esta tarefa:

    ::bash
    $ source ~/projeto_django/bin/activate $ easy_install django

No final da operação, você irá se deparar com uma saída similar a esta:

    ::text
    Installed /home/user/projeto_django/lib/python2.6/site-packages/Django-1.2.5-py2.6.egg Processing dependencies for django Finished processing dependencies for django

Isto é a garantia que o *Django* foi **instalado dentro deste
ambiente**, e não está visível para o escopo global da distribuição.
Tente importa o *Django* no terminal interativo do *Python* da sua
distro e do *Python* do seu ambiente isolado e veja o que acontece…

[Entenda o que é o *Django* e como ele funciona][].

Até a próxima…


  [Montando seu ambiente de desenvolvimento *Django* em *Linux*]: {filename}03-montando-seu-ambiente-de-desenvolvimento-django-no-linux.md
    "Montando seu ambiente de desenvolvimento Django em Linux"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [*virtualenv*]: {tag}virtualenv
    "Leia mais sobre Virtualenv"
  [Conheça alguns motivos que lhe convencerão a usar *Python*]: http://www.profissionaisti.com.br/2009/01/10-motivos-para-voce-aprender-a-programar-em-python/
    "10 motivos para se usar Python"
  [*Linux*]: {tag}linux "Leia mais sobre Linux"
  [instalar]: http://www.python.org.br/wiki/InicieSe
    "Inicie-se no Python"
  [primeiros passos]: http://www.python.org.br/wiki/AprendaMais
    "Aprenda mais sobre Python"
  [*SO*]: {tag}sistemas-operacionais
    "Leia mais sobre Sistemas Operacionais"
  [1]: http://pypi.python.org/pypi/virtualenv
    "Virtual Python Environment Builder"
  [*setuptools*]: http://pypi.python.org/pypi/setuptools
    "Download, build, install, upgrade, and uninstall Python packages"
  [*Osvaldo Santana*]: http://blog.triveos.com.br/2008/03/03/ambiente-isolado-para-python-com-virtualenv/
    "Ambiente Isolado para Python com virtualenv"
  [Saiba um pouco mais sobre a programação *Python* para *Web*]: http://www.profissionaisti.com.br/2009/02/programando-python-para-a-web/
    "Programando Python para Web"
  [Entenda o que é o *Django* e como ele funciona]: http://www.profissionaisti.com.br/2009/04/entendendo-o-django/
    "Entendendo o Django"
