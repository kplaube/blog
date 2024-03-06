---
title: "Virtualenvwrapper: O básico para um bom ambiente de desenvolvimento Python"
date: 2015-07-23 12:30:00
modified: 2023-10-04 15:52
tags: ["virtualenv", "virtualenvwrapper", "python"]
slug: virtualenvwrapper-o-basico-para-um-bom-ambiente-de-desenvolvimento-python
thumbnail: /media/python-logo.png
---

Já falamos sobre o [virtualenv](/tag/virtualenv.html "Leia mais sobre Virtualenv") há muito tempo atrás, aqui no _blog_. Tirando alguns
detalhes técnicos, a bem da verdade é que de lá para cá, pouca coisa
mudou.

Apesar do seu uso ser completamente trivial, ter _virtualenvs_
espalhados pelo seu disco rígido pode ser chato de gerenciar. Que
tal uma forma simples e centralizada de manipular os seus ambientes [_Python_](/tag/python.html "Leia mais sobre Python")?

É aí que entra o
[_virtualenvwrapper_](https://virtualenvwrapper.readthedocs.org/en/latest/ "Conheça a virtualenvwrapper")!

## virtualenv + virtualenvwrapper == Win

O _virtualenvwrapper_, como o seu nome sugere, é um _wrapper_ para o _virtualenv_, adicionando algumas funcionalidades para facilitar a vida dos Pythonistas.

Uma ferramenta simples, porém maravilhosa, que engloba as seguintes _features_:

- Organiza todos os seus ambientes virtuais em um único lugar.
- Adiciona funções de _create_, _delete_ e _copy_.
- Troca de ambiente com um único comando.
- Permite a criação de _hooks_ para todas as suas operações.

Além disso, é uma ferramenta bem documentada! As instruções a seguir
são todas retiradas da própria [documentação](https://virtualenvwrapper.readthedocs.org/en/latest/).

![Não confunda ambiente virtual com realidade virtual (oculus-news.com)](/media/virtual-reality.jpg "Não confunda ambiente virtual com realidade virtual (oculus-news.com)")

## Instalando

Para instalar o _virtualenvwrapper_, o `pip` é o caminho mais fácil:

```text
pip install virtualenvwrapper
```

Se você estiver usando o _Bash_, será necessário executar as seguintes instruções após a instalação (recomendável colocá-las em seu `~/.bash_profile`):

```text
export WORKON_HOME=~/.virtualenvs
source /usr/local/bin/virtualenvwrapper.sh
```

Caso você utilize o [_oh-my-zsh_](https://github.com/robbyrussell/oh-my-zsh "A delightful community-driven framework for managing your zsh configuration"), basta adicionar o [_virtualenvwrapper_](https://github.com/robbyrussell/oh-my-zsh/tree/master/plugins/virtualenvwrapper "Plugin do oh-my-zsh") ao seu `plugins`.

A partir de agora, temos novos comandos disponíveis em nossa linha de comando.

## Usando

Antes de mais nada, uma dica: Se você não quer mais cair no pecado de instalar
pacotes _Python_ em seu sistema operacional,
e permitir apenas instalação em _virtualenvs_, basta exportar a seguinte variável de ambiente:

```text
export PIP_REQUIRE_VIRTUALENV=true
```

Pronto! O `pip` apenas continuará o procedimento de instalação de pacotes se você
estiver com o seu ambiente virtual ativo.

Para criar um _virtualenv_, utilizamos o comando `mkvirtualenv`:

```text
mkvirtualenv teste
```

Caso você queira criar um ambiente para uma versão de _Python_ diferente da _default_
do seu sistema, basta especificar com o parâmetro `--python`:

```text
mkvirtualenv teste_py3 --python=/usr/local/bin/python3.4
```

Estamos com o ambiente ativo, isolado e totalmente limpo! Vamos instalar o
[_Django_](/tag/django.html "Leia mais sobre Django"):

```text
(teste) $ pip install django
```

E como sei que o meu pacote foi instalado em um ambiente isolado, e não no
`site-packages` do meu sistema operacional? No caso do exemplo acima, podemos
garantir verificando o _path_ do executável `django-admin`:

```text
(teste) $ which django-admin

/Users/<user>/.virtualenvs/teste/bin/django-admin
```

Notem o `.virtualenvs/teste/` no _path_. Muito legal, não? Dessa forma, se eu tiver
um projeto que necessite do _Django 1.4_, por exemplo, consigo instalá-lo sem
afetar os demais projetos na minha máquina.

Para desativar o _environ_, basta executar o comando `deactivate`:

```text
(teste) $ deactivate
```

E para trocar de ambiente virtual, usamos o comando `workon`:

```text
workon teste
```

Caso você queira ir para a pasta correspondente ao projeto,
sempre que realizar o `workon`, basta utilizar o comando `setvirtualenvproject`
no diretório escolhido:

```text
$ workon teste
$ cd ~/Workspace/teste
$ setvirtualenvproject

Setting project for teste to /Users/<user>/Workspace/teste
```

Pronto! Agora toda vez que você fizer um `workon`, será automaticamente
direcionado para a pasta `~/Workspace/teste`.

## Considerações finais

Quando você trabalha com inúmeros projetos em _Python_, fica muito evidente
a necessidade de ambientes virtuais. Ter diferentes _libs_, de diferentes
projetos, em diferentes versões, de maneira isolada é sem dúvida nenhuma
uma das maiores vantagens de utilizar _virtualenv_.

Então, se você quer começar em _Python_ a minha
dica é: Comece instalando o _virtualenvwrapper_.

## Referências

- [_virtualenvwrapper - Docs_](https://virtualenvwrapper.readthedocs.org/en/latest/ "Leia a documentação da ferramenta")
