Title: Como versionar projetos Django com o Mercurial - Parte 3
Date: 2011-06-04 12:27
Category: Desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, django, virtualenv, mercurial, pip
Slug: como-versionar-projetos-django-mercurial-parte-3

|img "/images/blog/django-logo.png" 180 180 "Logotipo do Django" "align-left"|

Olá pessoas!

Dando continuidade a micro-série *Como versionar projetos Django com o
Mercurial* (confira a [parte 1][] e a [parte 2][]), vamos finalizar com
um exemplo prático de um projeto [*Django*][] usando o [*Mercurial*][].

<!-- PELICAN_END_SUMMARY -->


Começando…
----------

Vamos reutilizar a estrutura dos *posts* anteriores. Para isso, inicie
um projeto com o [*virtualenv*][]:

    ::bash
    $ cd ~/Projetos/
    $ virtualenv DjangoComHG --no-site-packages
    $ cd DjangoComHG/

Vamos aproveitar os procedimentos descritos na [parte 2][1] deste
*post*. Caso você ainda não tenha criado um repositório no
[*Bitbucket*][], essa é uma boa oportunidade.

    ::bash
    $ hg clone <caminho> django_com_hg

Não esqueça de mudar o **caminho** para o **endereço do seu
repositório**.


Instalando o Django
-------------------

Com o *virtualenv* ativado, vamos instalar o *Django* apenas para o
nosso ambiente *virtual* através do *pip*:

    ::bash
    $ source bin/activate
    $ pip install django

Só para ter certeza que ele instalou o *Django* dentro do nosso ambiente
virtual, vamos abrir o terminal do [*Python*][] e digitar as seguintes
instruções:

    ::python
    import django
    django.__path__

Você deverá obter como resposta uma _string_ semelhante a esta:

    ::bash
    $HOME/Projetos/DjangoComHG/lib/python2.6/site-packages/django/


Iniciando um projeto
--------------------

Vamos fazer uma pequena brincadeira de troca de nomes de pastas, para
que possamos criar o nosso projeto *Django* com o mesmo nome do
repositório *Mercurial*:

    ::bash
    $ mv post_django_com_hg post_django_com_hg.bk

Agora mandamos o **django-admin.py** iniciar o projeto:

    ::bash
    $ django-admin.py startproject post_django_com_hg

Movemos os arquivos do nosso repositório para dentro de
**post\_django\_com\_hg**:

    ::bash
    $ mv post_django_com_hg.bk/* post_django_com_hg/
    $ mv post_django_com_hg.bk/.hg post_django_com_hg/
    $ mv post_django_com_hg.bk/.hgignore post_django_com_hg/

Entre no diretório **post\_django\_com\_hg** e dê um **hg status**. Os
arquivos base do \_Django- não estão no projeto. Vamos adicioná-los,
comitá-los e dar um **push** deles para o repositório *Mercurial* no
*Bitbucket*:

    ::bash
    $ hg add .
    $ hg commit -m "Projeto Django iniciado"
    $ hg push

Nos *changesets* do repositório, veremos a contribuição enviada:

|img "/images/blog/changesets-no-bitbucket.png" 568 167 "Changeset no BitBucket" "align-center"|

**Pronto!** Basicamente, para termos o *Mercurial* versionando um
projeto *Django*, são estes os procedimentos… mas eu sei como deixar a
coisa ainda mais interessante


Hora de congelar!
-----------------

Digamos que você tenha um colaborador envolvido com o projeto. Quer
dizer que ele vai ter que criar um *virtualenv*, clonar o repositório e
instalar as dependências do projeto? A resposta é “sim” – Mas podemos
facilitar esta última parte através do *pip*:

    ::bash
    $ pip freeze

    Django==1.3
    wsgiref==0.1.2

O comando **pip freeze** vai coletar os pacotes *Python* instalados
(nesse nosso caso, dentro do nosso ambiente virtual através do
*virtualenv*) e exibir para a gente em formato de lista. Com isso,
podemos criar um arquivo que armazene as dependências do nosso projeto:

    ::bash
    $ pip freeze > requirements.txt

Vamos desativar o ambiente atual, criar um novo e instalar as
dependências listadas nesta arquivo **requirements.txt** neste novo
ambiente:

    ::bash
    $ deactivate
    $ cd ~/Projetos/
    $ virtualenv DjangoComHG-2 --no-site-packages
    $ source DjangoComHG-2/bin/activate
    $ pip install -r DjangoComHG/post_django_com_hg/requirements.txt

Veja a mágica acontecendo… o *pip* instalará todas as dependências
contidas em **requirements.txt** em nosso novo ambiente virtual.

Podemos resumir os comandos acima em:

    ::bash
    $ pip install -E DjangoComHG-2 -r DjangoComHG/post_django_com_hg/requirements.txt

A instrução acima deverá ser escrita em um linha só.


Versionando dependências do projeto
-----------------------------------

Logo o **requirements.txt** sendo um arquivo de texto, pode ser
facilmente versionado pelo *Mercurial*:

    ::bash
    $ cd ~/Projetos/DjangoComHG/post_django_com_hg
    $ hg add requirements.txt
    $ hg commit -m "Adicionado arquivo de dependências do pip"
    $ hg push

Finalmente, temos um projeto *Django* versionado com *Mercurial*,
disponível no *Bitbucket*, e com dependências facilmente gerenciáveis
através do *pip* em conjunto com o *virtualenv*.

E você… utiliza controle de versão com o *Django* de uma outra forma?
Conte-nos através dos comentários abaixo.

Até a próxima…


  [parte 1]: {filename}/como-versionar-projetos-django-com-o-mercurial-parte-1.md
  [parte 2]: {filename}/como-versionar-projetos-django-com-o-mercurial-parte-2.md
    "Como versionar projetos Django com o Mercurial - Parte 2"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [*Mercurial*]: {tag}mercurial
    "Leia mais sobre Mercurial"
  [*virtualenv*]: {tag}virtualenv
    "Leia mais sobre virtualenv"
  [1]: {filename}/como-versionar-projetos-django-com-o-mercurial-parte-2.md
    "Aprenda a como criar um repositório Mercurial no Bitbucket"
  [*Bitbucket*]: http://www.bitbucket.org/
    "Versione e compartilhe código com o Mercurial"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [Changeset no Bitbucket]: {filename}/images/blog/changesets-no-bitbucket.png
    "Changeset no Bitbucket"
