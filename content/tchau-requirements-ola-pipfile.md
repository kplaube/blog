title: Tchau, requirements. Olá, Pipfile!
date: 2018-06-11 16:40:00
category: desenvolvimento
tags: desenvolvimento, python, pip, virtualenv, pipfile, pipenv
slug: tchau-requirements-ola-pipfile
meta_description: Admito que no começo fui cético em relação ao Pipfile. Mas hoje, após artigos e debates sobre a ferramenta, não tenho dúvida sobre a sua utilidade. Venha comigo entender como o Pipfile + Pipenv podem tornar a sua stack mais simples.

{% img representative-image /images/blog/python-logo.png 180 180 Logotipo do Python %}

Admito que no começo fui cético em relação ao [*Pipfile*](https://github.com/pypa/pipfile "The replacement for requirements.txt"). Pode ser a idade, mas questionei a real necessidade do mesmo. Para mim era muito óbvio! Eu já tinha o [*pip*]({tag}pip "Leia mais sobre pip"), o [*virtualenv*]({tag}virtualenv "Leia mais sobre virtualenv") e até mesmo o [*pyenv*]({tag} "Leia mais sobre Pyenv"). Hoje, após ler alguns artigos e debater com alguns colegas, fico até envergonhado de não ter visto o potencial da ferramenta no seu primeiro momento.

<!-- PELICAN_END_SUMMARY -->

Se você está na dúvida, assim como eu estive, vem comigo que te mostro as principais vantagens do *Pipfile* (e do *Pipenv*).

## O que há de errado com o requirements.txt?

Esse foi o meu "turning point" em relação ao *Pipfile*. E foi o [*@rcmachado*](https://twitter.com/rcmachado "Perfil no Twitter") quem respondeu essa pergunta:

> O build não é determinístico.

Vamos supor que estamos desenvolvendo um projeto em [*Django*]({tag}django "Leia mais sobre Django"). Instalamos via `pip install Django`, e jogamos a dependência no `requirements.txt`:

    # requirements.txt

    Django

Como você garante que a mesma versão do *Django* está instalada nos diferentes ambientes do projeto (dev, qa, staging, production, etc)? Da forma acima, você não garante. O `pip` instalará a última versão do pacote disponível no [*PyPI*](https://pypi.org/ "The Python Package Index").

Para minimizar esse problema, podemos "pinar" a versão do *Django*:

    # requirements.txt

    Django==2.0.6

Agora garantimos a versão do *framework* em todos os ambientes do projeto. Sabemos que o *Django* tem uma dependência, o [*pytz*](http://pytz.sourceforge.net/ "World Timezone Definitions for Python"), o que acontece com ela?

Bem... se o *framework* estabelecer exatamente qual versão da dependência ele utiliza, não será um problema. Mas [nem sempre isso acontece](https://github.com/django/django/blob/master/setup.py#L86):

    ::python
    # django/setup.py

    (...)

    setup(
        (...)
        install_requires=['pytz'],
        (...)
    )

    (...)

Para garantir que a mesma versão do *pytz* está sendo instalada nos diferentes ambientes do projeto, podemos "pinar" a sua versão no `requirements.txt`:

    # requirements.txt

    Django==2.0.6
    pytz==2018.4

E por fim, adicionar um `--no-deps` ao comando `pip`, assim ele se manterá fiel às dependências descritas no `requirements.txt`:

    ::shell
    $ pip install -r requirements.txt --no-deps

Note que você virou responsável por uma função que deveria ser desempenhada pelo *package manager*. Com o passar do tempo, esse tipo de gestão passa a ser árdua e suscetível a erros.

## Pipfile to the rescue

Segundo o [repositório oficial](https://github.com/pypa/pipfile "the replacement for requirements.txt"), o *Pipfile* é:

> (...) a replacement for the existing standard pip's requirements.txt file.

Como esperado, o padrão traz melhorias em relação ao `requirements.txt`. O já citado "ambientes determinísticos" é alcançado através do `Pipfile.lock`, um conceito usado em gerenciadores de pacotes de outras linguagens, como [*Bundler*](http://bundler.io/ "Package manager do Ruby"), [*Cargo*](https://crates.io/ "Package manager do Rust") ou [*Yarn*](https://yarnpkg.com/en/ "Package manager do Node"), onde as versões das dependências são "congeladas", garantindo que você obtenha o mesmo resultado em qualquer ambiente, e executando quantas vezes quiser.

Outra vantagem é o uso de um único arquivo para diferentes ambientes. Com o uso de *requirements*, geralmente acabamos com um arquivo de texto específico para cada ambiente:

    # requirements.txt

    Django

Mais um para dependências exclusivas do ambiente de desenvolvimento:

    # requirements-dev.txt

    -r requirements.txt

    django-debug-toolbar
    pytest

Com o *Pipfile*, é possível utilizar o mesmo arquivo:

    ::ini
    # Pipfile

    [[source]]
    url = "https://pypi.org/simple"
    verify_ssl = true
    name = "pypi"

    [dev-packages]
    pytest = "*"

    [packages]
    Django = "*"

    [requires]
    python_version = "3.6"


## Pipfile != Pipenv

Grande parte dos artigos que lí sobre *Pipfile* começavam com algum comando como o abaixo:

    ::shell
    $ pipenv install django

Uma coisa que tem que ficar clara é: O *Pipenv* está para o *pip*, assim como o *Pipfile* está para o *requirements*.

{% img align-center-keep-size /images/blog/rambo-knife.jpg 640 310 Pipenv é tipo a faca do Rambo. Resolve qualquer parada (mann.tv) %}

Até o momento da publicação desse artigo, o `pip` não suporta o formato do *Pipfile* (ou pelo menos a versão que tenho instalada aqui). Portanto, a maneira mais conveniente de utilizar o *Pipfile* hoje é através do utilitário de linha de comando `pipenv`.

Segundo o [repositório oficial](https://github.com/pypa/pipenv "Python Development Workflow for Humans"), o *Pipenv* é:

> (...) a tool that aims to bring the best of all packaging worlds (bundler, composer, npm, cargo, yarn, etc.) to the Python world. Windows is a first–class citizen, in our world.

Através do *parsing* do *Pipfile*, a ferramenta resolve dependências do projeto (através dos parâmetros `install`, `uninstall` ou `update`), exibe a árvore de dependências (através do parâmetro `graph`) e analisa as mesmas (através do `check`). Mas além de atuar como um gerenciador de pacotes, o *Pipenv* tem uma funcionalidade fantástica: Cria e gerencia *virtualenvs* de forma automática.

## Virtualização out of the box

Já escrevi sobre virtualização com [*virtualenv*]({filename}virtualenvwrapper-o-basico-para-um-bom-ambiente-de-desenvolvimento-python.md "Artigo sobre Virtualenvwrapper") e [*pyenv*]({filename}o-simples-e-poderoso-pyenv.md "Artigo sobre pyenv"). Com o *Pipenv*, a coisa fica significativamente mais simples.

Ao executar o comando `pipenv install`, por exemplo, a ferramenta automaticamente criará um *virtualenv* (caso não exista) para o projeto no qual você está trabalhando. Por exemplo:

    $ mkdir -p ~/workspace/test-pipenv
    $ cd ~/workspace/test-pipenv/
    $ pipenv install django

    Creating a virtualenv for this project…
    Using /home/klaus/.pyenv/versions/2.7.14/bin/python2.7 (2.7.14) to create virtualenv…

Caso você esteja curioso para saber aonde o seu *virtualenv* foi parar, o comando abaixo pode ajudar:

    $ pipenv --venv

    /home/klaus/.local/share/virtualenvs/test-pipenv-BzNa0eOE

Mas você não precisa se preocupar em saber onde o `activate.sh` está. Para ativar o *virtualenv* criado, o parâmetro `shell` é a melhor saída:

    $ pipenv shell

    Spawning environment shell (/bin/zsh). Use 'exit' to leave.
    . /home/klaus/.local/share/virtualenvs/test-pipenv-BzNa0eOE/bin/activate

Frustrado com o *Python 2.7*? Sem problemas! Vamos transformar o projeto em *Python 3*:

    $ pipenv install --three

O comando criará um novo *virtualenv*, dessa vez com a versão mais recente da linguagem. Não esqueça de atualizar o `python_version` do `Pipfile`.

## Considerações finais

Com o [*Heroku* adotando *Pipfile*](https://devcenter.heroku.com/articles/python-support "Python Support - Heroku"), me senti mais motivado a migrar alguns projetos para o padrão.

Como resultado, tenho simplificado a *stack* dos mesmos. Antes, eu gerenciava os ambientes virtuais com um *mix* de *virtualenvwrapper* e *pyenv*. Hoje, com apenas um utilitário de linha de comando, sou capaz de gerenciar dependências e virtualização. Além disso, acredito que o *setup* de um projeto *Python* fique mais homogêneo, uma vez que não há necessidade de um combo `pip + {virtualenv,virtualenvwrapper,pyenv}`.

Até a próxima.

## Referências

- [mattlayman - Using Pipfile for fun and profit](https://www.mattlayman.com/2017/using-pipfile-for-fun-and-profit.html)
- [Medium - Gerenciando suas dependências e ambientes python com pipenv](https://medium.com/grupy-rn/gerenciando-suas-depend%C3%AAncias-e-ambientes-python-com-pipenv-9e5413513fa6)
- [Pipenv - Python Dev Workflow for Humans](https://docs.pipenv.org)
- [Real Python - Pipenv: A Guide to the New Python Packaging Tool](https://realpython.com/pipenv-guide/)
