---
title: "Python, Django e virtualenv"
date: 2011-03-18 20:24
tags: ["desenvolvimento-web", "python", "django", "slackware", "virtualenv"]
slug: python-django-virtualenv
thumbnail: ./images/python-django.jpg
---

Dando continuidade a série “[Montando seu ambiente de desenvolvimento
*Django* em *Linux*][]”, vamos dar uma pincelada na tríade [*Python*][],
[*Django*][] e [*virtualenv*][].

## Python

[Conheça alguns motivos que lhe convencerão a usar *Python*][].

O _Python_ já vem instalado na maioria das distribuições [*Linux*][]. Na
verdade, até hoje nunca usei uma distro _Linux_ que não tivesse o
_Python_ previamente instalado. No _Slackware 13.1_, o _Python_ está na
versão 2.6.4. No _Debian 6_, o _Python_ está na versão 2.6.6.

O portal _Python Brasil_ possui um excelente material para você
[instalar][] e dar os [primeiros passos][] com _Python_.

## virtualenv

A linguagem _Python_ não vem “de bobeira” nas distribuições _Linux_, ela
faz parte delas, sendo utilizada para criação de uma série de _scripts_
fundamentais. Passei por uma situação peculiar com o _Python_: estava
usando o _OpenSuse_ (não recordo a versão) e decidi atualizar a versão
do _Python_ utilizando o sistema de pacotes da distro… confirmei algumas
operações de remoção (que não deveria ter autorizado) e acabei
danificando minha instalação do [*SO*][].

Então, para aqueles que programam em computadores pessoais, e não querem
comprometer tanto o _SO_ quanto o _workspace_, podem criar _ambientes
isolados_ para os projetos utilizando o [_virtualenv_][1].

No _Slackware_ vamos instalar o [*setuptools*][], que é um _framework_
que facilita a instalação e criação de pacotes _Python_:

```text
$ wget http://peak.telecommunity.com/dist/ez_setup.py
```

Para instalá-lo é necessário ser _*root*_:

```text
$ python ez_setup.py
```

Em seguida, vamos instalar o _virtualenv_ com a ajuda do
`_easy_install_` (que faz parte do pacote _setuptools_):

```text
$ easy_install virtualenv
```

Esta é uma forma interessante para você instalar módulos _Python_ em seu
sistema sem recorrer ao sistema de pacotes do _SO_.

Agora, como um usuário comum, vamos criar um ambiente em nosso
`home` para testarmos o _virtualenv_:

```text
$ virtualenv ~/projeto_django
```

Entrando nesta pasta, você irá se deparar com três diretórios:

- `bin`: Os executáveis do seu ambiente isolado estarão aí. Você
  poderá notar o executável `python`, o `easy_install`, o `pip` e um carinha chamado `activate` (falaremos deste mais tarde).
- `lib`: Nesta pasta você encontrará os módulos e bibliotecas
  _Python_ utilizadas por este ambiente.
- `include`: Segundo o [*Osvaldo Santana*][], dentro desse diretório
  estão os _links_ simbólicos para todos os _headers_ do _Python_ que
  são necessário para se compilar extensões escritas em _C_ para ele.

Você apenas criou seu ambiente… para ativá-lo basta dar o seguinte
comando:

```text
$ source ~/projeto_django/bin/activate
```

Pronto! Se você executar o _Python_ agora, você estará utilizando as
_libs_ deste ambiente. Isso pode permitir que você mova este
ambiente entre máquinas, que você instale _libs_ somente neste ambiente
(deixando o _Python_ do seu _SO_ “limpo”, isso pode te garantir maior
performance da distro) e que você tenha um controle maior sobre as
dependências do seu projeto.

Para “sair” do ambiente, basta executar o comando `deactivate`:

```text
$ deactivate
```

Pronto… muito simples, não?

## Django

[Saiba um pouco mais sobre a programação *Python* para *Web*][].

Vamos instalar o _Django_ neste ambiente isolado. Ativaremos
novamente o _virtualenv_ e usaremos o _*easy_install*_ para nos
ajudar com esta tarefa:

```text
$ source ~/projeto_django/bin/activate
$ easy_install django
```

No final da operação, você irá se deparar com uma saída similar a esta:

```text
Installed /home/user/projeto_django/lib/python2.6/site-packages/Django-1.2.5-py2.6.egg Processing dependencies for django Finished processing dependencies for django
```

Isto é a garantia que o _Django_ foi **instalado dentro deste
ambiente**, e não está visível para o escopo global da distribuição.
Tente importa o _Django_ no terminal interativo do _Python_ da sua
distro e do _Python_ do seu ambiente isolado e veja o que acontece…

[Entenda o que é o *Django* e como ele funciona][].

Até a próxima…

[montando seu ambiente de desenvolvimento *django* em *linux*]: /2011/03/03/montando-seu-ambiente-de-desenvolvimento-django.html "Montando seu ambiente de desenvolvimento Django em Linux"
[*python*]: /tag/python.html "Leia mais sobre Python"
[*django*]: /tag/django.html "Leia mais sobre Django"
[*virtualenv*]: /tag/virtualenv.html "Leia mais sobre Virtualenv"
[conheça alguns motivos que lhe convencerão a usar *python*]: http://www.profissionaisti.com.br/2009/01/10-motivos-para-voce-aprender-a-programar-em-python/ "10 motivos para se usar Python"
[*linux*]: /tag/linux.html "Leia mais sobre Linux"
[instalar]: http://www.python.org.br/wiki/InicieSe "Inicie-se no Python"
[primeiros passos]: http://www.python.org.br/wiki/AprendaMais "Aprenda mais sobre Python"
[*so*]: /tag/sistemas-operacionais.html "Leia mais sobre Sistemas Operacionais"
[1]: http://pypi.python.org/pypi/virtualenv "Virtual Python Environment Builder"
[*setuptools*]: http://pypi.python.org/pypi/setuptools "Download, build, install, upgrade, and uninstall Python packages"
[*osvaldo santana*]: http://blog.triveos.com.br/2008/03/03/ambiente-isolado-para-python-com-virtualenv/ "Ambiente Isolado para Python com virtualenv"
[saiba um pouco mais sobre a programação *python* para *web*]: http://www.profissionaisti.com.br/2009/02/programando-python-para-a-web/ "Programando Python para Web"
[entenda o que é o *django* e como ele funciona]: http://www.profissionaisti.com.br/2009/04/entendendo-o-django/ "Entendendo o Django"
