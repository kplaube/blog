Title: O simples e poderoso Pyenv
Date: 2016-04-26 09:53:00
Category: desenvolvimento
tags: desenvolvimento, python, pyenv, virtualenv, virtualenvwrapper, macosx
slug: o-simples-e-poderoso-pyenv
meta_description: Após ter problemas com o meu pip e virtualenvwrapper, após a atualização do Mac OS X para o El Capitan, eu conheci o Pyenv... e vou compartilhar com você o motivo pelo qual ele é uma excelente ideia!

{% img align-left /images/blog/pyenv.jpg 180 180 Esquema explicando o Pyenv (mateuspaduaweb.com.br) %}

Num certo dia, eu resolvi deixar a preguiça de lado e atualizar
a versão do *Mac OS X* para o *El Capitan*. Na cara e coragem,
e dotado de uma ingenuidade ímpar, simplesmente apertei o botão
*Update* e deixei com que os deuses resolvessem qual seria o
destino do meu *workspace* após essa fatídica operação.

<!-- PELICAN_END_SUMMARY -->

Obviamente, [algumas ferramentas deixaram de funcionar](https://ohthehugemanatee.org/blog/2015/10/01/how-i-got-el-capitain-working-with-my-developer-tools/ "Veja o que fazer com se o update do El Capitan quebrar o seu ambiente de desenvolvimento"),
incluindo a minha instalação "system wide" do [*pip*]({tag}pip "Leia mais sobre pip")
e o meu [*virtualenvwrapper*]({tag}virtualenvwrapper} "Leia mais sobre Virtualenv").

Após algum tempo "googlando" eu encontrei o [*Pyenv*](https://github.com/yyuu/pyenv "Conheça o Pyenv"),
e vou compartilhar com você a razão pela qual ele é uma excelente ideia.

## Múltiplas versões de Python, sem dor de cabeça

O *Pyenv* é uma ferramenta que te permite selecionar qual a versão
do [*Python*]({tag}python "Leia mais sobre Python") você está utilizando,
de maneira muito fácil e prática.

Antes de conhecer o *Pyenv*, eu geralmente baixava o código fonte e
compilava as versões "adicionais" do *Python* (2.6, 3.3, 3.4, etc)
no `/opt/` da minha máquina, utilizando a versão do sistema (2.7.x)
para a maioria dos projetos que desenvolvia. Aí no momento de criação
do meu `virtualenv`, apontava o executável da linguagem para a versão
específica.

Com essa ferramenta eu deixo uma versão do sistema intacta, e utilizo
de forma completamente isolada a determinada versão do *Python* do
qual necessito, com alguns atalhos que me auxiliam na transição de
uma versão para a outra.

## Instalando

Instalar o *Pyenv* é tão trivial quanto dar um `pip install`. Por ele não
depender do *Python* (e ser em *shell* puro) podemos utilizar o seu
[instalador de linha de comando](https://github.com/yyuu/pyenv-installer "Veja no Github"):

    ::bash
    $ curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
    $ pyenv update

Com o comando `pyenv install -l` somos apresentados a uma lista de possíveis versões
a serem instaladas através do utilitário (indo de *Python 2.1* até *PyPy*).

Suponha que você queira instalar a versão 3.5.1 da linguagem:

    ::bash
    $ pyenv install 3.5.1

Genial, não?

## Transitando entre versões

Para utilizar a versão instalada no terminal que está aberto, usamos o parâmetro `shell`:

    ::bash
    $ pyenv shell 3.5.1
    $ python -V
    Python 3.5.1

Talvez seja necessário executar o comando `pyenv rehash`, caso você não esteja
obtendo o resultado esperado.

Com o comando `versions` obtemos as versões disponíveis no computador:

    ::bash
    $ pyenv versions
    system
    * 3.5.1 (set by PYENV_VERSION environment variable)

O asterisco indica a versão em uso atualmente.

Com o comando `local`, setamos uma determinada versão do *Python* para um
determinado *path*. Exemplo:

    ::bash
    $ cd ~/Workspace/blog
    $ pyenv local 3.5.1
    $ pyenv version
    3.5.1 (set by /Users/klaus/Workspace/blog/.python-version)

O *Pyenv* criará um arquivo `.python-version` no diretório, e
todo o momento que você acessá-lo trocará a versão corrente do
interpretador, automaticamente.

{% img align-center /images/blog/sparrow.jpg 610 293 Minha cara após o update do El Capitan (thewrap.com) %}

Um *workaround* para fazer o meu ambiente de trabalho funcionar,
no *El Capitan*, foi baixar uma versão 2.7.x do *Python* e torná-la
`global`. Exemplo:

    ::bash
    $ pyenv install 2.7.10
    $ pyenv rehash
    $ pyenv global 2.7.10
    system
    * 2.7.10 (set by /usr/local/opt/pyenv/version)
    3.5.1

Com isso, o comando `pip` voltou a funcionar "system wide", bem como
as minhas integrações do `zsh` com o `virtualenvwrapper`.

## Bônus: virtualenvwrapper

E assim a minha vida continuou pacata e serena... até o momento que eu
tiver que criar um `virtualenv` para uma versão diferente da minha
versão `global`.

O *Pyenv* com *virtualenvwrapper* não se entendem muito bem.
Para facilitar a nossa vida, temos o [*pyenv-virtualenvwrapper*](https://github.com/yyuu/pyenv-virtualenvwrapper "Veja o repositório no GitHub"):

    ::bash
    $ pip install virtualenvwrapper
    $ brew install pyenv-virtualenvwrapper

É necessário ativá-lo em seu *shell*:

    ::bash
    $ pyenv virtualenvwrapper

E agora sim, criar o seu ambiente virtual:

    ::bash
    $ pyenv shell 3.5.1
    $ mkvirtualenv test
    Using base prefix '/usr/local/opt/pyenv/versions/3.5.1'
    New python executable in /Users/klaus/.virtualenvs/test/bin/python3.5
    Also creating executable in /Users/klaus/.virtualenvs/test/bin/python
    Installing setuptools, pip, wheel...done.
    virtualenvwrapper.user_scripts creating /Users/klaus/.virtualenvs/test/bin/predeactivate
    virtualenvwrapper.user_scripts creating /Users/klaus/.virtualenvs/test/bin/postdeactivate
    virtualenvwrapper.user_scripts creating /Users/klaus/.virtualenvs/test/bin/preactivate
    virtualenvwrapper.user_scripts creating /Users/klaus/.virtualenvs/test/bin/postactivate
    virtualenvwrapper.user_scripts creating /Users/klaus/.virtualenvs/test/bin/get_env_details

E "esquecer" do comando `pyenv` a partir do momento que você tem os seus *virtualenvs* criados:

    ::bash
    $ workon meu_projeto_em_py_27
    $ python -V
    Python 2.7.10

    $ workon test
    $ python -V
    Python 3.5.1

## Considerações finais

O *Pyenv* é, assim como o *virtualenv*, aquele tipo de ferramenta que te mantém são e salvo
quando a sua necessidade é trabalhar com versões completamente diferentes do *Python*.

Infelizmente, o seu uso com o *virtualenvwrapper* não é lá tão *smooth* (mas está longe de
ser complicado). Para facilitar a vida, talvez adicionar o comando `pyenv virtualenvwrapper`
ao seu `.bash_profile` ou `.zshrc` seja uma dica interessante.

Ou ainda, você pode utilizar o *virtualenvwrapper* para os
projetos *Python* 2.7.x, e o [*pyvenv*](https://docs.python.org/3/library/venv.html "Creation of virtual environments in Python 3")
para projetos > 3.2.

Até a próxima.


## Referências

* [*Pyenv - Simple Python version management*](https://github.com/yyuu/pyenv)
* [*Pyenv-virtualenvwrapper - An alternative approach to manage virtualenvs from pyenv*](https://github.com/yyuu/pyenv-virtualenvwrapper)
* [*Schichao's Blog - Setting up virtualenvwrapper with pyenv using pyenv-virtualenvwrapper*](https://blog.shichao.io/2014/10/01/setup_virtualenvwrapper_with_pyenv_using_pyenv_virtualenvwrapper.html)
* [*The Tao of Mac - Using Pyenv with El Capitan*](http://taoofmac.com/space/blog/2015/10/03/1245)
