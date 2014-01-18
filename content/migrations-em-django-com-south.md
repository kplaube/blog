Title: Migrations em Django com South
Date: 2011-11-20 21:35:00
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, django, migrations, south
Slug: migrations-em-django-south


|img "/images/blog/south-logo.png" 180 180 "Logotipo do South" "align-left"|
E quem nunca precisou adicionar ou remover alguma
coluna, nas tabelas do seu banco de dados, depois que a aplicação já
estava em produção? Os riscos existem (e são altos), e podem ser
diminuidos através de processos automatizados.

Em um mundo ideal, o procedimento de *deploy* (para entregas contínuas)
**deve ser automatizado**. Com o ***South***, “migrar” a estrutura e os
dados da sua base de dados para a versão presente em seu novo deploy, é
simples, prático e 100% integrado ao [*Django*][].

<!-- PELICAN_END_SUMMARY -->


Instalando o South
------------------

O [*South*][] é muito, mas muito simples de instalar. Utilizando o
*pip*, basta o seguinte comando para termos os *eggs* em nosso
**PYTHONPATH**:

    ::bash
    $ pip install south

Não podemos esquecer de adicioná-lo ao **INSTALLED\_APPS** do
**settings.py** (afinal, trata-se de uma *app Django*):

    ::python
    INSTALLED_APPS = (
        'django.contrib.auth',  
        ... 
        'south',
    )

Pronto! Você acabou de ganhar alguns comandos para construir as suas
*migrations*.


Direto para a prática
---------------------

Sem perder tempo, vamos construir uma *app Django* para que possamos
demonstrar o uso do *South*:

    ::bash
    $ python manage.py startapp blog

Lembrando de adicioná-la ao nossos **settings.py**:

    ::python
    # settings.py
    INSTALLED_APPS = (
        'django.contrib.auth',
        ...
        'south',
        'blog',
    )

Vamos criar um modelo bem básico, com alguns campos (posteriormente,
incrementaremos esta estrutura):

    ::python
    # blog/models.py
    from django.db import models
    
    class Blog(models.Model):
        titulo = models.CharField('Titulo', max_length=100)
        texto = models.TextField('Texto')

Através do comando **schemamigration**, com parâmetro **–-initial**,
criaremos a nossa primeira migration:

    ::bash
    $ python manage.py schemamigration blog --initial

Vale notar que o comando acima não cria nenhuma tabela no banco de
dados. O que ele faz é criar um conjunto de instruções que representa
este modelo. Na medida que são feitas alterações no modelo, é necessário
gerar novas *migrations*, que serão sempre baseados nas estruturas já
criadas.

Por exemplo, vamos de fato criar a tabela *blog* no banco de dados:

    ::bash
    $ python manage.py migrate blog

    Running migrations for blog:
    - blog:0001_initial
    - Loading initial data for blog.
    No fixtures found.

Se houvesse alguma *fixture*, o *South* faria o *insert* das informações
para você.

A primeira *migration* foi criada. Como mencionado antes, a partir de
agora toda migration criada será baseada na *migration* “anterior”
(podemos deduzir a ordem das *migrations* através do prefixo numérico,
no caso acima, o **0001** indica que esta é a primeira).

Vamos adicionar um campo no modelo (que equivale a uma coluna no banco
de dados), para ilustrar a criação de novas *migrations*:

    ::python
    # blog/models.py
    
    class Blog(models.Model):
        titulo = models.CharField('Titulo', max_length=100)
        resumo = models.TextField('Resumo', blank=True, null=True)
        texto = models.TextField('Texto')

Não é mais necessário o uso do parâmetro **-–initial**, de agora em
diante precisaremos do parâmetro **–-auto** (que construirá a
*migration* automaticamente, de acordo com a primeira já existente):

    ::bash
    $ python manage.py schemamigration blog --auto

    + Added field resumo on blog.Blog
    Created 0002_auto__add_field_blog_resumo.py. You can now apply this migration
    with: ./manage.py migrate blog

Pronto! Uma nova *migration* foi criada… e com um nome bem intuitivo
(repare no prefixo numérico). Basta darmos a ordem de replicar estas
instruções no banco de dados:

    ::bash
    $ python manage.py migrate blog

    Running migrations for blog:
    - Migrating forwards to 0002_auto__add_field_blog_resumo.
    - blog:0002_auto__add_field_blog_resumo
    - Loading initial data for blog.
    No fixtures found.

A nova coluna foi inserida na tabela *blog*, sem necessitar de nenhuma
intervenção manual. Se você ficou curioso para saber como essa “mágica”
acontece, basta abrir as *migrations* e ver que são instruções escritas
em [*Python*][], que interagem com o banco de dados “por trás” do *ORM*
do *Django*.

O *South* possui mais alguns recursos interessantes (como *data
migrations*), que você pode conferir [neste tutorial][].


Referências
-----------

* [*South – Intelligent schema and data migrations for Django*][]


  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [*South*]: http://south.aeracode.org/
    "Página oficial do projeto South"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [neste tutorial]: http://south.aeracode.org/docs/tutorial/index.html
    "Aprenda mais sobre o South"
  [*South – Intelligent schema and data migrations for Django*]: http://south.aeracode.org/
    "Visite a página oficial do projeto South"
