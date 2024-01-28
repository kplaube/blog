---
title: "Como versionar projetos Django com o Mercurial - Parte 3"
date: 2011-06-04 12:27
modified: 2023-11-12 19:39
tags:
  [
    "desenvolvimento-web",
    "python",
    "django",
    "virtualenv",
    "mercurial",
    "pip",
    "vcs",
  ]
slug: como-versionar-projetos-django-mercurial-parte-3
thumbnail: /media/django-logo.png
---

Dando continuidade a micro-série _Como versionar projetos \_Django_ com o
_Mercurial_ (confira a [parte 1][] e a [parte 2][]), vamos finalizar com
um exemplo prático de um projeto [_Django_][] usando o [_Mercurial_][].

## Começando

Vamos reutilizar a estrutura dos _posts_ anteriores. Para isso, inicie
um projeto com o [_virtualenv_][]:

```text
cd ~/Projetos/
virtualenv DjangoComHG --no-site-packages
cd DjangoComHG/
```

Vamos aproveitar os procedimentos descritos na [parte 2][1] deste
_post_. Caso você ainda não tenha criado um repositório no
[_Bitbucket_][], essa é uma boa oportunidade.

```text
hg clone <caminho> django_com_hg
```

Não esqueça de mudar o **caminho** para o **endereço do seu
repositório**.

## Instalando o Django

Com o _virtualenv_ ativado, vamos instalar o _Django_ apenas para o
nosso ambiente _virtual_ através do _pip_:

```text
source bin/activate
pip install django
```

Só para ter certeza que ele instalou o _Django_ dentro do nosso ambiente
virtual, vamos abrir o terminal do [_Python_][] e digitar as seguintes
instruções:

```python
import django
django.__path__
```

Você deverá obter como resposta uma _string_ semelhante a esta:

```text
$HOME/Projetos/DjangoComHG/lib/python2.6/site-packages/django/
```

## Iniciando um projeto

Vamos fazer uma pequena brincadeira de troca de nomes de pastas, para
que possamos criar o nosso projeto _Django_ com o mesmo nome do
repositório _Mercurial_:

```text
mv post_django_com_hg post_django_com_hg.bk
```

Agora mandamos o `django-admin.py` iniciar o projeto:

```text
django-admin.py startproject post_django_com_hg
```

Movemos os arquivos do nosso repositório para dentro de
`post_django_com_hg`:

```text
mv post_django_com_hg.bk/* post_django_com_hg/
mv post_django_com_hg.bk/.hg post_django_com_hg/
mv post_django_com_hg.bk/.hgignore post_django_com_hg/
```

Entre no diretório `post_django_com_hg` e dê um `hg status`. Os
arquivos base do _Django_ não estão no projeto. Vamos adicioná-los,
comitá-los e dar um `push` deles para o repositório _Mercurial_ no
_Bitbucket_:

```text
hg add .
hg commit -m "Projeto Django iniciado"
hg push
```

Nos _changesets_ do repositório, veremos a contribuição enviada:

![Changeset no BitBucket](/media/changesets-no-bitbucket.png "Changeset no BitBucket")

**Pronto!** Basicamente, para termos o _Mercurial_ versionando um
projeto _Django_, são estes os procedimentos… mas eu sei como deixar a
coisa ainda mais interessante

## Hora de congelar

Digamos que você tenha um colaborador envolvido com o projeto. Quer
dizer que ele vai ter que criar um _virtualenv_, clonar o repositório e
instalar as dependências do projeto? A resposta é “sim” – Mas podemos
facilitar esta última parte através do _pip_:

```text
$ pip freeze

Django==1.3
wsgiref==0.1.2
```

O comando `pip freeze` vai coletar os pacotes _Python_ instalados
(nesse nosso caso, dentro do nosso ambiente virtual através do
_virtualenv_) e exibir para a gente em formato de lista. Com isso,
podemos criar um arquivo que armazene as dependências do nosso projeto:

```text
pip freeze > requirements.txt
```

Vamos desativar o ambiente atual, criar um novo e instalar as
dependências listadas nesta arquivo `requirements.txt` neste novo
ambiente:

```text
deactivate
cd ~/Projetos/
virtualenv DjangoComHG-2 --no-site-packages
source DjangoComHG-2/bin/activate
pip install -r DjangoComHG/post_django_com_hg/requirements.txt
```

Veja a mágica acontecendo… o _pip_ instalará todas as dependências
contidas em `requirements.txt` em nosso novo ambiente virtual.

Podemos resumir os comandos acima em:

```text
pip install -E DjangoComHG-2 -r DjangoComHG/post_django_com_hg/requirements.txt
```

A instrução acima deverá ser escrita em um linha só.

## Versionando dependências do projeto

Logo o `requirements.txt` sendo um arquivo de texto, pode ser
facilmente versionado pelo _Mercurial_:

```text
cd ~/Projetos/DjangoComHG/post_django_com_hg
hg add requirements.txt
hg commit -m "Adicionado arquivo de dependências do pip"
hg push
```

Finalmente, temos um projeto _Django_ versionado com _Mercurial_,
disponível no _Bitbucket_, e com dependências facilmente gerenciáveis
através do _pip_ em conjunto com o _virtualenv_.

E você… utiliza controle de versão com o _Django_ de uma outra forma?
Conte-nos através dos comentários abaixo.

Até a próxima.

[parte 1]: /2011/05/10/como-versionar-projetos-django-mercurial-parte.html
[parte 2]: /2011/05/22/como-versionar-projetos-django-mercurial-parte-2.html "Como versionar projetos Django com o Mercurial - Parte 2"
[_django_]: /tag/django.html "Leia mais sobre Django"
[_mercurial_]: /tag/mercurial.html "Leia mais sobre Mercurial"
[_virtualenv_]: /tag/virtualenv.html "Leia mais sobre virtualenv"
[_bitbucket_]: http://www.bitbucket.org/ "Versione e compartilhe código com o Mercurial"
[_python_]: /tag/python.html "Leia mais sobre Python"
