---
title: Poesia pythonista com Poetry
date: 2020-12-30 07:00:00
modified: 2023-11-09 21:46:00
tags: ["python", "pip", "virtualenv", "poetry", "pyproject", "toml"]
slug: poesia-pythonista-com-poetry
thumbnail: /media/python-poetry.jpeg
---

O [_pip_](/tag/pip.html "Leia mais sobre pip") tem dado passos importantes em relação à
sua evolução, sendo um dos mais notórios deles a
[adoção por padrão de _backtracking_](https://pip.pypa.io/en/stable/user_guide/#dependency-resolution-backtracking "Dependency resolution backtracking").
Ainda assim, por suas atribuições serem exclusivamente de um gerenciador de dependências, ele pode deixar
um gostinho de "quero mais" no seu _flow_ de desenvolvimento. E é nessas necessidades não atendidas
que algumas opções se apresentam como alternativas/complementos ao simpático utilitário de linha de comando.

O [_Pipfile_](/tag/pipfile.html "Leia mais sobre Pipfile") é uma delas, e já falamos
sobre no ["Tchau, requirements. Olá, Pipfile!"](/2018/06/11/tchau-requirements-ola-pipfile.html "Leia o post na íntegra"). Demorou um pouco, mas hoje vamos falar do seu concorrente direto,
o [_Poetry_](https://python-poetry.org/ "Python packaging and dependency management made easy").

## Determinismo é só o começo

> I built Poetry because I wanted a single tool to manage my Python projects from start to finish.
> I wanted something reliable and intuitive that the community could use and enjoy.

Essas são as palavras do criador do _Poetry_, _Sébastien Eustace_. O mesmo argumento usado no artigo sobre
_Pipfile_, acerca de _build_ determinístico, se sustenta aqui. E assim como o _Pipenv_, há uma camada extra
de funcionalidades que "adoçam" o _build_ e o controle de [_virtualenvs_](/tag/virtualenv.html "Leia mais sobre virtualenv").

![Meme de Guerra Civil com Capitão América e Homem de Ferro](/media/determinism-meme.jpg "Não há razão para flamewar entre pip x pipenv/poetry (freethinkingministries.com)")

A sua instalação pode ocorrer de maneiras diferentes, dependendo do SO que você estiver utilizando. Portanto,
[uma visita à sua documentação é essencial](https://python-poetry.org/docs/#installation "Leia mais sobre como instalar o Poetry"). Ainda
assim, nada que o `pip` (que ironia) não resolva:

```text
pip install --user poetry
```

Para compreender como a ferramenta funciona de fato, vamos seguir os mesmos passos do _getting started_ da documentação oficial:

```text
$ poetry new poetry-demo
$ cd poetry-demo/
$ ls

README.rst     poetry_demo    pyproject.toml tests
```

Aqui nos deparamos com a primeira peculiaridade: o arquivo `pyproject.toml`.

## Pyproject? TOML?

O _pip_ utiliza o `requirements.txt`, o _Pipenv_ utiliza o `Pipfile` e `Pipfile.lock`, e o _Poetry_ o `pyproject.toml`
e `poetry.lock`.
Todos os arquivos citados são utilizados pelas respectivas ferramentas de controle de pacotes para
gerenciar atualizações e instalar novas dependências.

O _TOML_ (_Tom's Obvious, Minimal Language_) é um formato utilizado para a escrita de arquivos de configuração. Segundo o [site oficial](https://toml.io/en/ "Leia mais sobre TOML"):

> TOML aims to be a minimal configuration file format that's easy to read due to obvious semantics. TOML is designed to map unambiguously to a hash table. TOML should be easy to parse into data structures in a wide variety of languages.

Se você já conhece o _Pipfile_, a sintaxe utilizada no arquivo é a mesma. Mas qual é
a motivação por trás do arquivo `pyproject`?

### Senta que lá vem a história.

Antes do ano de 1998 havia o vazio, quando o assunto era empacotamento em [_Python_](/tag/python.html "Leia mais sobre Python").
A partir dos anos 2000, instalar, buildar, ou distribuir pacotes começou a ganhar
um novo sentido através da inserção da biblioteca `distutils` ao _standard lib_, e
da convenção de uso do _entrypoint_ `setup.py`.

![Diagrama de fluxo com os passos para distribuição de pacotes](/media/py-dev-cycle.png "Overview do workflow de desenvolvimento Python (py-generic-project.readthedocs.io)")

Quatro anos depois, somos apresentados ao `setuptools`, que introduz o pacote no formato
`egg` e a possibilidade de declarar e instalar dependências. Já em 2008, o `pip` é lançado
como uma alternativa aprimorada ao seu primo mais velho,
o `easy_install`, que possibilitava a
instalação de pacotes consultando um índice centralizado na _internet_, chamado _Python Package Index_ (_pypi_).

E após indas e vindas (e um novo formato, chamado "wheel"), em 2014
o `pip` e o `setuptools` viram finalmente o padrão para empacotamento em _Python_.

Confira a _timeline_ completa no [_Packaging History_](https://www.pypa.io/en/latest/history/ "Veja na ïntegra").

### O ovo ou a galinha?

A [_PEP 518_](https://www.python.org/dev/peps/pep-0518/ "Leia a proposta na íntegra") é
quem apresenta o arquivo `pyproject.toml`. [Segundo _Brett Cannon_](https://snarky.ca/what-the-heck-is-pyproject-toml/ "Leia mas sobre a motivação por trás da PEP 518"),
criador da proposta:

> (...) the purpose of PEP 518 was to come up with a way for projects to specify what build tools they required. That's it, real simple and straightforward.

Antes dela, não havia uma forma (prática) de dizer quais ferramentas de _build_ que um projeto requer para gerar um pacote `wheel`. Embora
o `setuptools` possua um argumento `setup_requires` para este fim, você não consegue ler esse parâmetro sem antes ter o próprio `setuptools` instalado,
e não havia um lugar onde você pudesse especificar que precisa do `setuptools` para ler a configuração dentro do `setuptools` (notou o problema do ovo-galinha?).

E como vivemos até então sem nos preocupar com esse problema? Simples! Ferramentas como o próprio _pip_ injetam o `setuptools` e o `wheel`
quando executando um arquivo `setup.py`.

E se então tivéssemos um lugar para dizer ao _pip_ sobre a necessidade dessas ferramentas?

```toml
# pyproject.toml

[build-system]
requires = ["setuptools >= 40.6.0", "wheel"]
build-backend = "setuptools.build_meta"
```

Booomm!!! Se amanhã [alternativas mais interessantes ao _setuptools_](https://flit.readthedocs.io/en/latest/index.html "Conheça o Flit") ou _pip_
aparecerem, estaremos preparados.

### E o que o Poetry tem a ver com isso?

O _Poetry_ declara qual será o _build backend_ através da utilização das PEPs
518 (citada acima) e [517](https://www.python.org/dev/peps/pep-0517/ "Leia a proposta na íntegra"):

```toml
# pyproject.toml

[tool.poetry]
name = "poetry-demo"
version = "0.1.0"
description = ""
authors = ["Klaus Laube <mail@mail.com>"]

[tool.poetry.dependencies]
python = "^3.7"

[tool.poetry.dev-dependencies]
pytest = "^5.2"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
```

O cliente, também instalado através do `pip install` anterior, sabe se comunicar
com o `poetry.core`, explicitamente declarado na seção `[build-system]`.

E com isso o _Poetry_ não apenas cuidará das dependências do seu projeto,
como também se responsabilizará por buildar o seu app ou _lib_, e distribuí-lo
no _Python Package Index_.

## Continuando a poesia

Para adicionar uma dependência ao projeto, passamos a utilizar o comando `poetry add`:

```text
poetry add django
```

Com isso, o _Django_ passa a ser adicionado ao "requirements":

```toml
# pyproject.toml

...

[tool.poetry.dependencies]
python = "^3.7"
Django = "^3.1.4"

...

```

Por consequência um arquivo `poetry.lock` foi criado, e é ele quem garantirá o determinismo durante
a instalação de dependências do projeto:

```text
$ poetry install

Installing dependencies from lock file
```

Outra consequência do comando `add` foi a criação automática de um _virtualenv_. Agora, através do comando
`poetry run`, podemos executar dependências _Python_ diretamente do ambiente virtual:

```text
poetry run django-admin.py -h
```

Ou ainda através do comando `shell`:

```text
$ poetry shell
$ which django-admin.py

/Users/klauslaube/Library/Caches/pypoetry/virtualenvs/poetry-demo-IqTsQBT7-py3.9/bin/django-admin
```

Note que em um ambiente diferente de _development_, [talvez você precise do parâmetro `--no-root`](https://python-poetry.org/docs/basic-usage/#installing-dependencies-only "Installing dependencies only"):

```text
poetry install --no-root
```

## Conclusão

Há cerca de 3 meses eu retornei do _Java_ ao _Python_, e tinha esquecido (ou nunca de fato notado)
o quão não intuitivo é a dança entre _pyenv_, _virtualenv_ e _pip_.

Nisso, tanto _Pipenv_ quanto _Poetry_ são fenomenais. O _Pipenv_ leva certa vantagem, uma vez que
é capaz de [gerenciar até mesmo a versão do _Python_](https://stackoverflow.com/questions/50161551/set-python-version-when-creating-virtualenv-using-pipenv#:~:text=When%20setting%20up%20your%20pipenv,6.&text=to%20the%20specific%20version%20of%20Python%20you%20want. "Leia a thread no Stackoverflow") (com _Poetry_, ainda necessitamos do _pyenv_).

Aparentemente há planos do _pip_ suportar um argumento `--pipfile`, o que faria do _Pipfile_ (e por consequência _Pipenv_) uma opção ainda mais
atraente que o concorrente.

Mas tenho certeza que o _Poetry_ será uma mão na roda caso você esteja escrevendo _libs_.

Até a próxima.

## Referências

- [Brett Cannon - Clarifying PEP 518 (a.k.a. pyproject.toml)](https://snarky.ca/clarifying-pep-518/)
- [Brett Cannon - What the heck is pyproject.toml?](https://snarky.ca/what-the-heck-is-pyproject-toml/)
- [PyPA - Packaging History](https://www.pypa.io/en/latest/history/)
- [PEP 517 - A build-system independent format for source trees](https://www.python.org/dev/peps/pep-0517/)
- [PEP 518 - Specifying Minimum Build System Requirements for Python Projects](https://www.python.org/dev/peps/pep-0518/)
- [PEP 621 - Storing project metadata in pyproject.toml](https://www.python.org/dev/peps/pep-0621/)
- [PEP 633 - Dependency specification in pyproject.toml using an exploded TOML table](https://www.python.org/dev/peps/pep-0633/)
- [Stackoverflow - What is pyproject.toml?](https://stackoverflow.com/questions/62983756/what-is-pyproject-toml)
- [The Hitchhiker's Guide to Packaging](https://the-hitchhikers-guide-to-packaging.readthedocs.io/en/latest/history.html)
- [Towards Data Science - Solving dependency management in Python with Poetry](https://towardsdatascience.com/solving-dependency-management-in-python-with-poetry-165b92069e9d)
- [Vinayak Mehta - Some PEP talk, or: What is a pyproject.toml?](https://vinayak.io/2020/08/17/day-6-some-pep-talk/)
- [Wikipedia - TOML](https://en.wikipedia.org/wiki/TOML)
