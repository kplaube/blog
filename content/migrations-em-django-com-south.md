Title: Migrations em Django com South
Date: 2011-11-20 21:35:00
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, django, migrations, south
Slug: migrations-em-django-south
meta_description: Em um mundo ideal, o procedimento de deploy (para entregas contínuas) deve ser automatizado. Com o South, &quot;migrar&quot; a estrutura e os dados da sua base de dados para a versão presente em seu novo deploy, é simples, prático e 100% integrado ao Django.
Image: /images/blog/south-logo.png
Alt: Logotipo do South

E quem nunca precisou adicionar ou remover alguma
coluna, nas tabelas do seu banco de dados, depois que a aplicação já
estava em produção? Os riscos existem (e são altos), e podem ser
diminuidos através de processos automatizados.

<!-- PELICAN_END_SUMMARY -->

Em um mundo ideal, o procedimento de _deploy_ (para entregas contínuas)
**deve ser automatizado**. Com o _South_, “migrar” a estrutura e os
dados da sua base de dados para a versão presente em seu novo deploy, é
simples, prático e 100% integrado ao [*Django*][].

## Instalando o South

O [*South*][] é muito, mas muito simples de instalar. Utilizando o
_pip_, basta o seguinte comando para termos os _eggs_ em nosso
`PYTHONPATH`:

    ::bash
    $ pip install south

Não podemos esquecer de adicioná-lo ao `INSTALLED_APPS` do
`settings.py` (afinal, trata-se de uma _app Django_):

    ::python
    INSTALLED_APPS = (
        'django.contrib.auth',
        ...
        'south',
    )

Pronto! Você acabou de ganhar alguns comandos para construir as suas
_migrations_.

## Direto para a prática

Sem perder tempo, vamos construir uma _app Django_ para que possamos
demonstrar o uso do _South_:

    ::bash
    $ python manage.py startapp blog

Lembrando de adicioná-la ao `settings.py`:

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

Através do comando `schemamigration`, com parâmetro `–-initial`,
criaremos a nossa primeira migration:

    ::bash
    $ python manage.py schemamigration blog --initial

Vale notar que o comando acima não cria nenhuma tabela no banco de
dados. O que ele faz é criar um conjunto de instruções que representa
este modelo. Na medida que são feitas alterações no modelo, é necessário
gerar novas _migrations_, que serão sempre baseados nas estruturas já
criadas.

Por exemplo, vamos de fato criar a tabela _blog_ no banco de dados:

    ::bash
    $ python manage.py migrate blog

    Running migrations for blog:
    - blog:0001_initial
    - Loading initial data for blog.
    No fixtures found.

Se houvesse alguma _fixture_, o _South_ faria o _insert_ das informações
para você.

A primeira _migration_ foi criada. Como mencionado antes, a partir de
agora toda migration criada será baseada na _migration_ “anterior”
(podemos deduzir a ordem das _migrations_ através do prefixo numérico,
no caso acima, o `0001` indica que esta é a primeira).

Vamos adicionar um campo no modelo (que equivale a uma coluna no banco
de dados), para ilustrar a criação de novas _migrations_:

    ::python
    # blog/models.py

    class Blog(models.Model):
        titulo = models.CharField('Titulo', max_length=100)
        resumo = models.TextField('Resumo', blank=True, null=True)
        texto = models.TextField('Texto')

Não é mais necessário o uso do parâmetro `-–initial`, de agora em
diante precisaremos do parâmetro `–-auto` (que construirá a
_migration_ automaticamente, de acordo com a primeira já existente):

    ::bash
    $ python manage.py schemamigration blog --auto

    + Added field resumo on blog.Blog
    Created 0002_auto__add_field_blog_resumo.py. You can now apply this migration
    with: ./manage.py migrate blog

Pronto! Uma nova _migration_ foi criada… e com um nome bem intuitivo
(repare no prefixo numérico). Basta darmos a ordem de replicar estas
instruções no banco de dados:

    ::bash
    $ python manage.py migrate blog

    Running migrations for blog:
    - Migrating forwards to 0002_auto__add_field_blog_resumo.
    - blog:0002_auto__add_field_blog_resumo
    - Loading initial data for blog.
    No fixtures found.

A nova coluna foi inserida na tabela _blog_, sem necessitar de nenhuma
intervenção manual. Se você ficou curioso para saber como essa “mágica”
acontece, basta abrir as _migrations_ e ver que são instruções escritas
em [*Python*][], que interagem com o banco de dados “por trás” do _ORM_
do _Django_.

O _South_ possui mais alguns recursos interessantes (como _data
migrations_), que você pode conferir [neste tutorial][].

## Referências

- [*South – Intelligent schema and data migrations for Django*][]

[*django*]: {tag}django "Leia mais sobre Django"
[*south*]: http://south.aeracode.org/ "Página oficial do projeto South"
[*python*]: {tag}python "Leia mais sobre Python"
[neste tutorial]: http://south.aeracode.org/docs/tutorial/index.html "Aprenda mais sobre o South"
[*south – intelligent schema and data migrations for django*]: http://south.aeracode.org/ "Visite a página oficial do projeto South"
