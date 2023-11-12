---
title: "O simples e poderoso Pyenv"
date: 2016-04-26 09:53:00
modified: 2023-11-12 19:36:00
tags: ["python", "pyenv", "virtualenv", "virtualenvwrapper", "macosx"]
slug: o-simples-e-poderoso-pyenv
thumbnail: ./images/pyenv.jpg
---

Num certo dia, eu resolvi deixar a preguiça de lado e atualizar
a versão do _Mac OS X_ para o _El Capitan_. Na cara e coragem,
e dotado de uma ingenuidade ímpar, simplesmente apertei o botão
_Update_ e deixei com que os deuses resolvessem qual seria o
destino do meu _workspace_ após essa fatídica operação.

Obviamente, [algumas ferramentas deixaram de funcionar](https://ohthehugemanatee.org/blog/2015/10/01/how-i-got-el-capitain-working-with-my-developer-tools/ "Veja o que fazer com se o update do El Capitan quebrar o seu ambiente de desenvolvimento"),
incluindo a minha instalação "system wide" do [_pip_](/tag/pip.html "Leia mais sobre pip")
e o meu [_virtualenvwrapper_](/tag/virtualenvwrapper.html} "Leia mais sobre Virtualenv").

Após algum tempo "googlando" eu encontrei o [_Pyenv_](https://github.com/yyuu/pyenv "Conheça o Pyenv"),
e vou compartilhar com você a razão pela qual ele é uma excelente ideia.

## Múltiplas versões de Python, sem dor de cabeça

O _Pyenv_ é uma ferramenta que te permite selecionar qual a versão
do [_Python_](/tag/python.html "Leia mais sobre Python") você está utilizando,
de maneira muito fácil e prática.

Antes de conhecer o _Pyenv_, eu geralmente baixava o código fonte e
compilava as versões "adicionais" do _Python_ (2.6, 3.3, 3.4, etc)
no `/opt/` da minha máquina, utilizando a versão do sistema (2.7.x)
para a maioria dos projetos que desenvolvia. Aí no momento de criação
do meu `virtualenv`, apontava o executável da linguagem para a versão
específica.

Com essa ferramenta eu deixo uma versão do sistema intacta, e utilizo
de forma completamente isolada a determinada versão do _Python_ do
qual necessito, com alguns atalhos que me auxiliam na transição de
uma versão para a outra.

## Instalando

Instalar o _Pyenv_ é tão trivial quanto dar um `pip install`. Por ele não
depender do _Python_ (e ser em _shell_ puro) podemos utilizar o seu
[instalador de linha de comando](https://github.com/yyuu/pyenv-installer "Veja no Github"):

```text
curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
pyenv update
```

Com o comando `pyenv install -l` somos apresentados a uma lista de possíveis versões
a serem instaladas através do utilitário (indo de _Python 2.1_ até _PyPy_).

Suponha que você queira instalar a versão 3.5.1 da linguagem:

```text
pyenv install 3.5.1
```

Genial, não?

## Transitando entre versões

Para utilizar a versão instalada no terminal que está aberto, usamos o parâmetro `shell`:

```text
$ pyenv shell 3.5.1
$ python -V
Python 3.5.1
```

Talvez seja necessário executar o comando `pyenv rehash`, caso você não esteja
obtendo o resultado esperado.

Com o comando `versions` obtemos as versões disponíveis no computador:

```text
$ pyenv versions
system
* 3.5.1 (set by PYENV_VERSION environment variable)
```

O asterisco indica a versão em uso atualmente.

Com o comando `local`, setamos uma determinada versão do _Python_ para um
determinado _path_. Exemplo:

```text
$ cd ~/Workspace/blog
$ pyenv local 3.5.1
$ pyenv version
3.5.1 (set by /Users/klaus/Workspace/blog/.python-version)
```

O _Pyenv_ criará um arquivo `.python-version` no diretório, e
todo o momento que você acessá-lo trocará a versão corrente do
interpretador, automaticamente.

![Minha cara após o update do El Capitan (thewrap.com)](/media/sparrow.jpg "Minha cara após o update do El Capitan (thewrap.com)")

Um _workaround_ para fazer o meu ambiente de trabalho funcionar,
no _El Capitan_, foi baixar uma versão 2.7.x do _Python_ e torná-la
`global`. Exemplo:

```text
$ pyenv install 2.7.10
$ pyenv rehash
$ pyenv global 2.7.10
system
* 2.7.10 (set by /usr/local/opt/pyenv/version)
3.5.1
```

Com isso, o comando `pip` voltou a funcionar "system wide", bem como
as minhas integrações do `zsh` com o `virtualenvwrapper`.

## Bônus: virtualenvwrapper

E assim a minha vida continuou pacata e serena... até o momento que eu
tiver que criar um `virtualenv` para uma versão diferente da minha
versão `global`.

O _Pyenv_ com _virtualenvwrapper_ não se entendem muito bem.
Para facilitar a nossa vida, temos o [_pyenv-virtualenvwrapper_](https://github.com/yyuu/pyenv-virtualenvwrapper "Veja o repositório no GitHub"):

```text
pip install virtualenvwrapper
brew install pyenv-virtualenvwrapper
```

É necessário ativá-lo em seu _shell_:

```text
pyenv virtualenvwrapper
```

E agora sim, criar o seu ambiente virtual:

```text
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
```

E "esquecer" do comando `pyenv` a partir do momento que você tem os seus _virtualenvs_ criados:

```text
$ workon meu_projeto_em_py_27
$ python -V
Python 2.7.10

$ workon test
$ python -V
Python 3.5.1
```

## Considerações finais

O _Pyenv_ é, assim como o _virtualenv_, aquele tipo de ferramenta que te mantém são e salvo
quando a sua necessidade é trabalhar com versões completamente diferentes do _Python_.

Infelizmente, o seu uso com o _virtualenvwrapper_ não é lá tão _smooth_ (mas está longe de
ser complicado). Para facilitar a vida, talvez adicionar o comando `pyenv virtualenvwrapper`
ao seu `.bash_profile` ou `.zshrc` seja uma dica interessante.

Ou ainda, você pode utilizar o _virtualenvwrapper_ para os
projetos _Python_ `2.7.x`, e o [_pyvenv_](https://docs.python.org/3/library/venv.html "Creation of virtual environments in Python 3")
para projetos > `3.2`.

Até a próxima.

## Referências

- [_Pyenv - Simple Python version management_](https://github.com/yyuu/pyenv)
- [_Pyenv-virtualenvwrapper - An alternative approach to manage virtualenvs from pyenv_](https://github.com/yyuu/pyenv-virtualenvwrapper)
- [_Schichao's Blog - Setting up virtualenvwrapper with pyenv using pyenv-virtualenvwrapper_](https://blog.shichao.io/2014/10/01/setup_virtualenvwrapper_with_pyenv_using_pyenv_virtualenvwrapper.html)
- [_The Tao of Mac - Using Pyenv with El Capitan_](http://taoofmac.com/space/blog/2015/10/03/1245)
