title: Virtualenvwrapper: O básico para um bom ambiente de desenvolvimento Python
date: 2015-07-23 12:30:00
category: desenvolvimento
tags: desenvolvimento, virtualenv, virtualenvwrapper, python
slug: virtualenvwrapper-o-basico-para-um-bom-ambiente-de-desenvolvimento-python
meta_description: Apesar do seu uso ser completamente trivial, ter virtualenvs espalhados pelo seu disco rígido pode ser chato de gerenciar. É aí que o virtualenvwrapper entra.

{% img align-left /images/blog/python-logo.png 180 180 Logotipo do Python %}

Já falamos sobre o [virtualenv]({tag}virtualenv "Leia mais sobre Virtualenv") há muito tempo atrás, aqui no *blog*. Tirando alguns
detalhes técnicos, a bem da verdade é que de lá para cá, pouca coisa
mudou.

Apesar do seu uso ser completamente trivial, ter *virtualenvs*
espalhados pelo seu disco rígido pode ser chato de gerenciar. Que
tal uma forma simples e centralizada de manipular os seus ambientes [*Python*]({tag}python "Leia mais sobre Python")?

<!-- PELICAN_END_SUMMARY -->

É aí que entra a
[*virtualenvwrapper*](https://virtualenvwrapper.readthedocs.org/en/latest/ "Conheça a virtualenvwrapper")!


## virtualenv + virtualenvwrapper == Win

O *virtualenvwrapper*, como o seu nome sugere, é um *wrapper* para o *virtualenv*, adicionando algumas funcionalidades para facilitar a vida dos Pythonistas.

Uma ferramenta simples, porém maravilhosa, que engloba as seguintes *features*:

* Organiza todos os seus ambientes virtuais em um único lugar.
* Adiciona funções de *create*, *delete* e *copy*.
* Troca de ambiente com um único comando.
* Permite a criação de *hooks* para todas as suas operações.

Além disso, é uma ferramenta bem documentada! As instruções a seguir
são todas retiradas da própria [documentação](https://virtualenvwrapper.readthedocs.org/en/latest/).

{% img align-center /images/blog/virtual-reality.jpg 600 405 Não confunda ambiente virtual com realidade virtual (oculus-news.com) %}


## Instalando

Para instalar o *virtualenvwrapper*, o `pip` é o caminho mais fácil:

    ::bash
    $ pip install virtualenvwrapper

Se você estiver usando o *Bash*, será necessário executar as seguintes instruções após a instalação (recomendável colocá-las em seu `~/.bash_profile`):

    ::bash
    $ export WORKON_HOME=~/.virtualenvs
    $ source /usr/local/bin/virtualenvwrapper.sh

Caso você utilize o [*oh-my-zsh*](https://github.com/robbyrussell/oh-my-zsh "A delightful community-driven framework for managing your zsh configuration"), basta adicionar o [*virtualenvwrapper*](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/virtualenvwrapper "Plugin do oh-my-zsh") ao seu `plugins`.

A partir de agora, temos novos comandos disponíveis em nossa linha de comando.

## Usando

Antes de mais nada, uma dica: Se você não quer mais cair no pecado de instalar
pacotes *Python* em seu sistema operacional,
e permitir apenas instalação em *virtualenvs*, basta exportar a seguinte variável de ambiente:

    ::bash
    export PIP_REQUIRE_VIRTUALENV=true

Pronto! O `pip` apenas continuará o procedimento de instalação de pacotes se você
estiver com o seu ambiente virtual ativo.

Para criar um *virtualenv*, utilizamos o comando `mkvirtualenv`:

    ::bash
    $ mkvirtualenv teste

Caso você queira criar um ambiente para uma versão de *Python* diferente da *default*
do seu sistema, basta especificar com o parâmetro `--python`:

    ::bash
    $ mkvirtualenv teste_py3 --python=/usr/local/bin/python3.4

Estamos com o ambiente ativo, isolado e totalmente limpo! Vamos instalar o
[*Django*]({tag}django "Leia mais sobre Django"):

    ::bash
    (teste) $ pip install django

E como sei que o meu pacote foi instalado em um ambiente isolado, e não no
`site-packages` do meu sistema operacional? No caso do exemplo acima, podemos
garantir verificando o *path* do executável `django-admin`:

    ::bash
    (teste) $ which django-admin
    /Users/<user>/.virtualenvs/teste/bin/django-admin

Notem o `.virtualenvs/teste/` no *path*. Muito legal, não? Dessa forma, se eu tiver
um projeto que necessite do *Django 1.4*, por exemplo, consigo instalá-lo sem
afetar os demais projetos na minha máquina.

Para desativar o *environ*, basta executar o comando `deactivate`:

    ::bash
    (teste) $ deactivate

E para trocar de ambiente virtual, usamos o comando `workon`:

    ::bash
    $ workon teste

Caso você queira ir para a pasta correspondente ao projeto,
sempre que realizar o `workon`, basta utilizar o comando `setvirtualenvproject`
no diretório escolhido:

    ::bash
    $ workon teste
    $ cd ~/Workspace/teste
    $ setvirtualenvproject
    Setting project for teste to /Users/<user>/Workspace/teste

Pronto! Agora toda vez que você fizer um `workon`, será automaticamente
direcionado para a pasta `~/Workspace/teste`.

## Considerações finais

Quando você trabalha com inúmeros projetos em *Python*, fica muito evidente
a necessidade de ambientes virtuais. Ter diferentes *libs*, de diferentes
projetos, em diferentes versões, de maneira isolada é sem dúvida nenhuma
uma das maiores vantagens de utilizar *virtualenv*.

Então, se você quer começar em *Python* (de forma "profissional"), a minha
dica é: Comece instalando o *virtualenvwrapper*.

## Referências

* [*virtualenvwrapper - Docs*](https://virtualenvwrapper.readthedocs.org/en/latest/ "Leia a documentação da ferramenta")
