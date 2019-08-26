Title: As built-in migrations do Django
Date: 2016-10-18 12:43:00
Category: desenvolvimento
Tags: desenvolvimento, migrations, python, django, south
Slug: as-built-in-migrations-do-django
meta_description: O South ficou famoso por tornar as database migrations do Django fáceis. Com as novas versões do framework, uma maneira ainda mais intuitiva está disponível.

{% img representative-image /images/blog/django-logo.png 180 180 Logotipo do Django %}

Quem usa o [*Django*]({tag}django "Leia mais sobre Django") há mais tempo já ouviu
falar do [*South*]({tag}south "Leia mais sobre South"). Famosa biblioteca
responsável por trazer o comportamento de [*migrations*]({tag}migrations "Leia mais sobre Migrations")
para o *Django*. Sem dúvida impactou inúmeros projetos e transformou o processo de
*deploy* de toda a comunidade envolvida com o *framework*.

<!-- PELICAN_END_SUMMARY -->

Nas versões mais recentes do *Django*, contamos com um *engine* *built-in*,
muito prático, e que traz alguns conceitos que ficaram famosos com o *South*.

Vamos nessa dar adeus ao `syncdb`, e começar a nossa aventura com o `migrate`.

## O que são migrations?

Diretamente da documentação do *South*:

> (...) são uma forma de alterar o schema do seu banco de dados de uma versão para outra.

Você mantém em seu projeto uma série de instruções que modificam o *database*
de acordo com a evolução do projeto. Quando uma nova pessoa fizer parte do time,
não é necessário a realização de nenhum "dump" *SQL*, apenas a execução dessas *migrations*
é o suficiente para você ter o *db* pronto para uso.

Dentro do ecossistema *Django*, as *built-in migrations* vieram como uma excelente
contribuição ao projeto. A distribuição de *apps* fica mais coerente, agora que o
desenvolvedor não precisa mais de uma "segunda biblioteca" para passar a usar
um app que estamos distribuindo.

## Faça migrations

Para exemplificar como toda essa mágica funciona, vamos criar um *app* chamado "lista_de_compras":

    ::bash
    $ python manage.py startapp lista_de_compras

Nosso *application* terá uma estrutura similar a essa:

    ::text
    lista_de_compras/
        __init__.py
        admin.py
        apps.py
        migrations/
            __init__.py
        models.py
        tests.py
        views.py

Não esqueça de adicioná-lo ao `INSTALLED_APPS`.

Vamos nos focar na pasta `migrations` e no `models.py`. Nesse último, criaremos o modelo `Item`:

    ::python
    # models.py

    class Item(models.Model):
        nome = models.CharField(max_length=255)
        quantidade = models.IntegerField(default=1)

Agora, na linha de comando, invocamos o comando de criação de *migrations*:

    ::bash
    $ python manage.py makemigrations

Se tudo ocorreu bem, na pasta `migrations` do *app*, um novo arquivo
[*Python*]({tag}python "Leia mais sobre Python") foi criado:

    ::python
    # migrations/0001_initial.py

    from __future__ import unicode_literals
    from django.db import migrations, models


    class Migration(migrations.Migration):

        initial = True

        dependencies = [
        ]

        operations = [
            migrations.CreateModel(
                name='Item',
                fields=[
                    ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                    ('nome', models.CharField(max_length=255)),
                    ('quantidade', models.IntegerField(default=1)),
                ],
            ),
        ]

Por partes:

O `unicode_literals` é uma ferramenta que torna possível a execução de seu projeto em *Python* 2 e 3.
Ela tem a função de "marcar" suas *strings* como *unicode*, como explicado na [documentação do *Django*](https://docs.djangoproject.com/en/1.10/topics/migrations/#supporting-python-2-and-3 "Suportando Python 2 e 3").

É criada (automaticamente) uma classe `Migration` herdando de `migrations.Migration`. Nela, temos
3 propriedades muito importantes:

* `initial`: Informamos explicitamente ao *Django* que essa é a *migration* inicial do *app*. Essa
informação é importante para alguns casos, como quando é [preciso executar o --fake-initial](https://docs.djangoproject.com/en/1.10/topics/migrations/#django.db.migrations.Migration.initial "Leia mais na documentação do Django").
* `dependencies`: Aqui informamos as dependências da nossa *migration*. Por exemplo, se dependermos
de outra *migration* ou *app*, precisamos deixar claro que há uma dependência para manter uma ordem
coerente de execução.
* `operations`: Por fim, as operações que precisam ser executadas. No exemplo acima, estamos criando
a tabela `lista_de_compras_item`, com os campos `id`, `nome` e `quantidade`.

## No more syncdb

Calma! A tabela ainda não existe no banco dados. Para que isso aconteça é necessário executar o comando
`migrate`:

    ::bash
    $ python manage.py migrate

`migrate` executará todas as *migrations* pendentes do seu projeto. Caso queira executar
apenas de um *app*:

    ::bash
    $ python manage.py migrate lista_de_compras

## Evoluindo o Schema

Vamos supor que exista o requisito de criar um [*API REST*]({tag}rest "Leia mais sobre REST") para o projeto,
logo, expor o campo `id` não é uma boa prática! Precisamos de um campo único e não
sequencial, que trará um pouco de *obfuscation* e segurança ao nosso *endpoint*.

Primeiro, adicionamos o campo ao modelo:

    ::python
    # models.py

    class Item(models.Model):
        uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
        nome = models.CharField(max_length=255)
        quantidade = models.IntegerField(default=1)

Seguindo o procedimento, para homologar as alterações em uma *migration*, precisamos do `makemigrations`:

    ::bash
    $ python manage.py makemigrations lista_de_compras

Se você executar o `migrate` em um banco de dados vazio, provavelmente não terá nenhum problema. Mas
em um banco já existente, provavelmente uma *exception* acontecerá. O fato é que o uso do campo `unique`
e o campo `default`, em uma *migration*, não é tão [intuitivo como parece](https://code.djangoproject.com/ticket/23932 "Document how to set a unique value for new fields using migrations").

{% img align-center /images/blog/croods-migration.jpg 640 360 Migrar é preciso (indiewire.com) %}

Para fazer esse procedimento, vamos seguir as recomendações da [documentação do Django](https://docs.djangoproject.com/en/1.10/howto/writing-migrations/#migrations-that-add-unique-fields "Migrations that add unique fields").

Primeiro, removemos os atributos `unique=True` e `default=uuid.uuid4` da *migration* recém criada, e adicionamos
o parâmetro `null=True`:

    ::python
    # migrations/0002_item_uuid.py

    class Migration(migrations.Migration):

        dependencies = [
            ('lista_de_compras', '0001_initial'),
        ]

        operations = [
            migrations.AddField(
                model_name='item',
                name='uuid',
                field=models.UUIDField(editable=False, null=True),
            ),
        ]

O próximo passo é popular as linhas já existentes com `uuids`. Faremos isso através de *data migrations*.

## Data migrations

Diretamente da documentação do *Django*:

> Migrations that alter data are usually called “data migrations”;
> they’re best written as separate migrations, sitting alongside your schema migrations.

Em alguns casos precisamos inserir ou alterar dados, de acordo com a evolução do *database*
do nosso projeto. O *Django* não possui nenhuma forma "automática" para geração de
*data migrations*, por isso, o caminho ideal é utilizar o comando `--empty`:

    ::bash
    $ python manage.py makemigrations --empty lista_de_compras

Com isso, uma *migration* "em branco" será criada, pronta para customização:

    ::python
    # migrations/0003_auto_20161010_1635.py

    class Migration(migrations.Migration):

        dependencies = [
            ('lista_de_compras', '0002_item_uuid'),
        ]

        operations = [
        ]

Importante notar que agora o atributo `dependencies` está preenchido com a *migration*
anterior à recém criada. É sempre necessário ter atenção à sua lista de dependências,
para certificar-se que o fluxo acontecerá numa ordem coerente.

Criaremos a função responsável por inserir *UUIDs* nos registros já existentes:

    ::python
    # migrations/0003_auto_20161010_1635.py
    import uuid

    def gen_uuid(apps, schema_editor):
        Item = apps.get_model('lista_de_compras', 'Item')
        items = Item.objects.all()
        for item in items:
            item.uuid = uuid.uuid4()
            item.save()


Usamos o parâmetro `apps` para "importar" o modelo. Na sequência, utilizamos o *ORM*
para pegar todos os items do banco de dados, iteramos por eles preenchendo o campo
`uuid`.

Precisamos adicionar essa função ao atributo `operations`, da *migration*:

    ::python
    # migrations/0003_auto_20161010_1635.py

    class Migration(migrations.Migration):

        dependencies = [
            ('lista_de_compras', '0002_item_uuid'),
        ]

        operations = [
            migrations.RunPython(gen_uuid, reverse_code=migrations.RunPython.noop),
        ]

Utilizamos a função `RunPython` para executar operações em nossa *migration*
que dependem de processamento por parte da linguagem (ou do *Django*). Em alguns
cenários, esse tipo de operação não tem um processo de *rollback*, portanto,
deixamos explícito que não temos como desfazer a operação através do parâmetro
`reverse_code` com valor `migrations.RunPython.noop`.

A *migration* deve ter ficado mais ou menos assim:

    ::python
    # migrations/0003_auto_20161010_1635.py
    from __future__ import unicode_literals

    import uuid
    from django.db import migrations, transaction


    def gen_uuid(apps, schema_editor):
        Item = apps.get_model('lista_de_compras', 'Item')
        items = Item.objects.all()
        for item in items:
            item.uuid = uuid.uuid4()
            item.save()


    class Migration(migrations.Migration):

        dependencies = [
            ('lista_de_compras', '0002_item_uuid'),
        ]

        operations = [
            migrations.RunPython(gen_uuid, reverse_code=migrations.RunPython.noop),
        ]

Ainda não acabou! Uma vez que todos os registros já possuam o seu `uuid`
preenchido, precisamos voltar à proposta original do nosso modelo: Com
um campo default, e com preenchimento obrigatório. Para tanto, basta
executar novamente o `makemigrations`. Uma nova *migration* será criada,
com todas as *constraints* definidas corretamente.

Agora rode o `migrate`. Acabamos de criar um campo `uuid`,
preenchemos os registros já existentes no *database*, e criamos
*constraints* para os registros que virão no futuro.

Até a próxima.

## Referências

* [Django documentation: Migrations](https://docs.djangoproject.com/en/1.10/topics/migrations/)
* [South documentation: What are migrations?](https://south.readthedocs.io/en/latest/whataremigrations.html)
