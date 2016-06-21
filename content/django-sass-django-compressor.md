Title: Django e Sass com django-compressor
Date: 2016-06-04 16:00:00
Category: desenvolvimento
Tags: desenvolvimento, web, python, django, sass, css
Slug: django-e-sass-com-django-compressor
meta_description: Eu sempre gostei da proposta do django-compressor: Concatenar e comprimir estáticos, utilizando como agrupadores os blocos da engine de templates do Django. Vamos dar uma espiada sobre como utilizar o Django Compressor para interpretar arquivos Sass.

{% img align-left /images/blog/django-sass-logo.png 180 180 Logo do Django e Sass %}

Eu sempre gostei da proposta do `django-compressor`: Concatenar e comprimir
estáticos, utilizando como agrupadores os blocos da *engine* de *templates*
do [*Django*]({tag}django "Leia mais sobre Django").
Além de manter a declaração dos *assets* no [*HTML*]({tag}html "Leia mais sobre HTML"),
ele ainda abre uma margem interessante para quando você precisa customizar um grupo
de estáticos para uma determinada página.

<!-- PELICAN_END_SUMMARY -->

Com a chegada dos pré-processadores, como [*Sass*](http://sass-lang.com/ "CSS with superpower")
e [*CoffeeScript*](http://coffeescript.org/ "CoffeeScript is a little language that compiles into JavaScript"),
 e fatalmente com o advento das ferramentas de *build*, deixar esse processo
para o *Django* passou a ser questionável. É extremamente razoável passar toda
essa responsabilidade para o [*Grunt*]({tag}grunt "Leia mais sobre Grunt"),
e colocar apenas no seu *template* *Django* a *URL* do estático já "buildado".

Na minha opinião, isso tira um pouco da vantagem descrita no primeiro parágrafo,
e adiciona certa complexidade à nossa *stack* de desenvolvimento. Baseado nisso,
e indo na [onda da simplificação de *build*]({filename}vivendo-sem-o-grunt.md "Vivendo sem o Grunt"),
que eu resolvi devolver esse poder ao *Django*.
E já te adianto: Estou relativamente satisfeito com o resultado!

## Concat e minify sem Node.js

O *Django Compressor* é um *app* *Django* que comprime *Javascript*
ou *CSS*, em um único arquivo cacheável.

Para usá-lo, começamos instalando através do `pip`:

    ::shell
    $ pip install django-compressor

Na sequência, precisamos adicioná-lo ao arquivo de configuração do seu projeto *Django*:

    ::python
    # settings.py
    INSTALLED_APPS = (
        ...
        'compressor',
        ...
    )

Não esqueça de adicioná-lo ao `STATICFILES_FINDERS`:

    ::python
    # settings.py
    STATICFILES_FINDERS = (
        'django.contrib.staticfiles.finders.FileSystemFinder',
        'django.contrib.staticfiles.finders.AppDirectoriesFinder',
        ...
        'compressor.finders.CompressorFinder',
    )

E no seu *template* *Django*, utilizamos a `templatetag` de compressão
para *CSS* e *JS*:

    <!-- index.html -->

    {% load compress %}
    {% load staticfiles %}

    {% compress css %}
        <link rel="stylesheet" href="{% static 'vendor/skeleton/normalize.css' %}" type="text/css">
        <link rel="stylesheet" href="{% static 'vendor/skeleton/skeleton.css' %}" type="text/css">
    {% endcompress %}

    {% compress js %}
        <script src="{% static 'vendor/jquery/jquery.js' %}"></script>
        <script src="{% static 'js/app.js' %}"></script>
    {% endcompress %}

Quando o internauta acessar a sua página, o resultado final será parecido com esse:

    <!-- index.html -->

    <link rel="stylesheet" href="/static/CACHE/css/0fb9d388202c.css" type="text/css">
    <script type="text/javascript" src="/static/CACHE/js/82f4dc99bcc1.js"></script>

Bacana, não? Como a opção `COMPRESS_ENABLED` é por padrão o inverso de `DEBUG`,
em tempo de desenvolvimento você não verá os *assets* comprimidos,
mas em tempo de *QA* e produção, se o seu *Django* estiver corretamente configurado,
sim.

## Pré-compiladores

Você não precisa do *Ruby* para utilizar *Sass*. Hoje, com o advento da especificação
do *libsass*, é possível ter a ferramenta em diferentes linguagens, como
[*Node.js*]({tag}node "Leia mais sobre Node.js") e [*Python*]({tag}python "Leia mais sobre Python"):

    ::shell
    $ pip install libsass

O `django-compressor` dá suporte a execução de compiladores/transpiladores dado um
determinado `type`. Vamos ilustrar esse cenário com o uso de *Sass*:

    ::python
    # settings.py
    COMPRESS_PRECOMPILERS = (
        ('text/x-sass', 'sassc {infile} {outfile}'),
    )

O binário `sassc` foi instalado no comando `pip install` acima. O parâmetro `infile`
será o próprio arquivo `scss`, e `outfile` será a saída do arquivo, já compilado para *CSS*.

{% img align-center /images/blog/django-style.jpg 620 254 Django com estilo! %}

Agora, a jogada será declarar em nosso *template* que todas as folhas de estilo escritas
em *Sass*, terão como `type` o valor `text/x-sass`:

    <!-- index.html -->

    {% compress css %}
        <link rel="stylesheet" href="{% static 'vendor/skeleton/normalize.css' %}" type="text/css">
        <link rel="stylesheet" href="{% static 'vendor/skeleton/skeleton.css' %}" type="text/css">
        <link rel="stylesheet" href="{% static 'scss/app.scss' %}' type="text/x-sass">
    {% endcompress %}

A partir de agora, no momento de execução do *Compressor*, além de minificar e concatenar
as folhas de estilo, também interpretará arquivos *Sass*.

## Considerações finais

E com isso, mais uma vez, mostramos que é possível ter um projeto [*Web*]({tag}web "Leia mais sobre Web"),
utilizando ferramentas bacanas (como o *Sass*), sem necessariamente
adicionar uma linguagem diferente à sua *stack*.

O ideal é que o processo de *build* seja executado durante o procedimento
de *deploy* do seu projeto (através do comando `python manage.py compress`). Para isso,
é necessário ativar o
[*offline compression* do *Django Compressor*](http://django-compressor.readthedocs.io/en/latest/scenarios/#offline-compression "Offline compression").

No próximo *post* vamos falar sobre *Django* + *ES6*.

Até a próxima...

## Referências

* [*Django Compressor - Compresses linked and inline JavaScript or CSS into a single cached file*](https://django-compressor.readthedocs.io/en/latest/)
* [*libsass - Sass/SCSS for Python*](https://hongminhee.org/libsass-python/)
