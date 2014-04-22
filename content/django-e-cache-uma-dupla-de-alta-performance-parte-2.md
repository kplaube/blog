Title: Django e Cache: Uma dupla de alta performance - Parte 2
Date: 2012-07-22 14:33:58
Category: desenvolvimento
Tags: desenvolvimento, web, python, django, memcached, johnny-cache, cache
Slug: django-e-cache-uma-dupla-de-alta-performance-2
meta_description: Podemos utilizar a camada de cache em diferentes pontos da aplicação. Com o esquema de middlewares do Django, podemos ter essa camada aplicada diretamente ao fluxo de interpretação do framework, o que pode reduzir consideravelmente o uso de recursos de nossa hospedagem, sem mesmo termos alterado código das nossas apps.


{% img align-left /images/blog/memcached-logo.jpg 180 180 Logo do Memcached %}
Continuando o *post* [*Django* e *Cache*: Uma dupla de alta performance][], vamos
ver na prática como utilizar o *framework* de [*cache*][] do [*Django*][].

Embora eu esteja utilizando o [*Memcached*][] para escrever estes
artigos, vale ressaltar que a abstração do *Django* lhe permite utilizar
a [ferramenta mais apropriada para você][].

<!-- PELICAN_END_SUMMARY -->


Diferentes maneiras de “cachear” a aplicação
--------------------------------------------

Podemos utilizar a camada de *cache* em diferentes pontos da aplicação.
Por exemplo, podemos utilizá-la antes de uma consulta ao banco de dados,
armazenar resultados de operações complexas, armazenar o *parsing* de um
*template*, etc. Com o esquema de *middlewares* do *Django*, podemos ter
essa camada aplicada diretamente ao fluxo de interpretação do
*framework*, o que pode reduzir consideravelmente o uso de recursos de
nossa hospedagem, sem mesmo termos alterado código das nossas *apps*.

Vamos ver a diferença, e casos de usos, dessas formas de utilização do
*cache*.


### Granular

Quando você quer ser “incisivo”, utilizar a *API* de forma “granular” é
uma ótima opção.

Por exemplo, no [*Globoesporte.com*][] nós fazemos algumas consultas a
um [banco de dados semântico][] para trazer informações de eventos,
jogos e atletas. Como esta consulta é consideravelmente demorada,
utilizamos a *API* de *cache* para melhorar os tempos de resposta.
Exemplo:

    ::python
    from django.core.cache import cache
    ...
    def jogos_por_edicao(edicao_slug):
        jogos = cache.get('jogos_%s' % edicao_slug)
        if not jogos:
            jogos = pega_jogos_da_semantica(edicao_slug)
            cache.set('jogos_%s' % edicao_slug, jogos)
        ...

Passamos ao **cache.set** uma chave (que deve ser menor que 250
caracteres, e não utilizar caracteres especiais) e um valor. Ele também
aceita um terceiro parâmetro, que é o tempo de vida desta informação em
*cache*. Quando omitido, o tempo definido nas configurações do *backend*
é utilizado.

Para remover esta informação do *cache*, basta utilizarmos o método
**cache.delete**:

    ::python
    cache.delete('jogos_%s' % edicao_slug)

Você tem a liberdade de fazer *caching* de qualquer região da sua
aplicação. Mas é bom tomarmos cuidado para que o gerenciamento desses
pontos não passem a ser um problema. O *framework* de *cache* pode ser
aplicado em outras camadas da abstração, dispensando (em muitos casos) a
necessidade desse tipo de controle em modelos e *views*.


### Template

Assim como é possível fazer *caching* de forma minuciosa com a *API*
acima, é possível fazer um controle muito interessante de *cache* com os
*templates* do *Django*.

#### Prevenindo acesso a disco

A cada nova requisição, o *Django* carrega o arquivo de *template* do
disco, interpreta-o com o contexto, e retorna o seu resultado. Podemos
melhorar um pouquinho este fluxo, sem necessitar do *Memcached*, basta
adicionarmos o **django.template.loaders.cached.Loader** ao
**TEMPLATE\_LOADERS** do **settings.py**:

    ::python
    TEMPLATE_LOADERS = (
        ('django.template.loaders.cached.Loader', (
            'django.template.loaders.filesystem.Loader',
            'django.template.loaders.app_directories.Loader',
        )),
    )

Esse *loader* manterá o arquivo de *template* em memória, evitando com
que o *Django* tenha que recorrer ao disco para obter o seu conteúdo. O
“trade-off” é mais utilização da memória do seu servidor (que,
dependendo do cenário, nem é um problema tão grande assim) e a
necessidade de, quando houver atualizações em *templates*, efetuar o
*restart* do serviço de *WSGI* que você utiliza.

Outro ponto a se observar é que as *template tags* que você utilizar
deverão ser [*thread-safe*][].


#### Prevenindo parsing desnecessário

O *framework* de *cache* permite “cachear” fragmentos de um *template*.
Essa modalidade de *cache* é bem interessante quando utilizamos filtros
ou *tags* que executam operações que aumentam consideravelmente o tempo
de interpretação do *template*.

Na [documentação][] há um exemplo bem interessante, onde é feito o
*cache* de um *sidebar* inteiro:

    ::html
    {% load cache %}

    {% cache 500 sidebar %}
        <!-- conteúdo do sidebar -->
    {% endcache %}

Passamos para a *template tag* **cache** o tempo de vida do conteúdo
(500 segundos), e o identificador deste conteúdo (**sidebar**). Se a
chave não existir, o *Django* interpretará as instruções dentro do bloco
e armazenará o seu resultado no *Memcached* para que, num próximo
acesso, esse resultado seja recuperado sem necessitar interpretar todo o
bloco novamente.


### Views

Uma das maneiras mais práticas de utilizarmos o *cache* em nossos
*websites* e aplicações *Web* escritos em *Django*, é através do método
chamado [*per-site cache*][].

Basicamente, o *Django* analisará requisições realizadas através dos
métodos **GET** e **HEAD**, e utilizará a sua *URL* como chave para a
verificação em *cache*. Caso ele encontre a ocorrência, retornará ao
usuário o resultado “cacheado”, senão, interpretará a *view* e ao final
armazenará o seu resultado.

Para que isso seja possível, é necessário a utilização dos *middlewares*
**django.middleware.cache.UpdateCacheMiddleware** e
**django.middleware.cache.FetchFromCacheMiddleware**:

    ::python
    MIDDLEWARE_CLASSES = (
        'django.middleware.cache.UpdateCacheMiddleware',
        ...
        'django.middleware.cache.FetchFromCacheMiddleware',
    )

Além da configuração das seguintes constantes:

* **CACHE\_MIDDLEWARE\_ALIAS** : O identificador da conexão (padrão
    **default**)
* **CACHE\_MIDDLEWARE\_SECONDS** : O tempo de vida (em segundos) das
    páginas em *cache* (padrão **600 segundos**)
* **CACHE\_MIDDLEWARE\_KEY\_PREFIX** : Chave para prevenir problemas
    quando o *cache* é um serviço compartilhado entre diferentes
    instâncias *Django*. Pode-se, por exemplo, colocar o nome do *site*
    como prefixo.

Ao acessar as *views*, temos uma agradável surpresa:

    ::bash
    $ curl -I http://localhost:8000/
    
    HTTP/1.0 200 OK
    Date: Wed, 04 Jul 2012 00:12:17 GMT
    Server: WSGIServer/0.1 Python/2.7.2
    Cache-Control: max-age=600
    Vary: Cookie
    Expires: Wed, 04 Jul 2012 00:22:17 GMT
    Content-Type: text/html; charset=utf-8
    Last-Modified: Wed, 04 Jul 2012 00:12:17 GMT

Ganhamos [cabeçalhos *HTTP*][] com os valores correspondentes às nossas
configurações de *cache*! Por exemplo, **Last-Modified** corresponde a
data de acesso, **Expires** é a data de acesso acrescentando os 600
segundos de *cache*, e o **Expires** corresponde ao tempo de
**CACHE\_MIDDLEWARE\_SECONDS**.

Interessante não? Temos um controle de *cache* na “borda” da nossa
aplicação… não precisamos interferir nas nossas *views*, modelos ou
consultas.


#### O método per-view

É natural que certas *views* necessitem de um tempo de *cache* diferente
de outras. Para tanto, podemos utilizar *decorators* que “sobrescrevem”
as configurações utilizadas pelo *per-site*, permitindo assim um
controle mais granular sobre o tempo de *cache* das *views*. Exemplo:

    ::python
    from django.views.generic.simple import direct_to_template
    from django.views.decorators.cache import cache_page

    urlpatterns = patterns('',
        ...
        url(r'^outra-view/$', cache_page(60 * 2)(direct_to_template),
            {'template': 'outra-view.html'}, name='outra-view'),
        ...
    )

No exemplo acima estou usando a *generic view* **direct\_to\_template**
para ilustrar. Através do *decorator* **cache\_page** eu informo o tempo
de vida desta *view* em *cache* (2 minutos, 60 \* 2 para ficar mais
legível).

E quando acessamos esta *view*, é possível reparar que inclusive os
valores dos cabeçalhos *HTTP* são outros:

    ::bash
    $ curl -I http://localhost:8000/outra-view/
    
    HTTP/1.0 200 OK
    Date: Wed, 04 Jul 2012 00:28:07 GMT
    Server: WSGIServer/0.1 Python/2.7.2
    Last-Modified: Wed, 04 Jul 2012 00:28:07 GMT
    Expires: Wed, 04 Jul 2012 00:30:07 GMT
    Content-Type: text/html; charset=utf-8
    Vary: Cookie
    Cache-Control: max-age=120

Ainda é possível passar como parâmetro para o **cache\_page**, o
**cache** que você deseja utilizar (por padrão **default**), e um
**key\_prefix**.


Caching de queries com o Johnny Cache
-------------------------------------

É normal que algumas rotas da sua aplicação não possam fazer utilização
desse tipo de *cache*. Por exemplo, *views* para usuários autenticados,
que necessitam transitar informações de sessão e *cookies*, ou até mesmo
*views* que precisam receber informações através de **POST**.

Vamos imaginar que, dentro desse cenário, a sua *app* faça uma consulta
“custosa” ao banco de dados. Logo, concluímos que adicionar um controle
de *cache* a esta consulta seria extremamente interessante para a
velocidade de resposta da *view*. A primeira opção é utilizar o
*framework* de *cache* do *Django* de forma granular, através de sua
*API*. A outra opção é fazer *caching* “dentro” do *ORM*.

É apoiado nessa última proposta que o [*Johnny Cache*][] se baseia:
“cachear” dados transitados através do *ORM* do *Django*, não
interferindo no código das *apps*.

O *Johnny Cache* está no [*PyPi*][], então basta um **pip install
johnny-cache** para realizarmos a instalação. Para configurar,
precisamos adicionar algumas informações ao **settings.py**:

    ::python
    MIDDLEWARE_CLASSES = (
        'johnny.middleware.LocalStoreClearMiddleware',
        'johnny.middleware.QueryCacheMiddleware',
        ...
    )
    
    CACHES = {
        'default' : {
            'BACKEND': 'johnny.backends.memcached.MemcachedCache',
            'LOCATION': ['127.0.0.1:11211'],
            'JOHNNY_CACHE' True,
        )
    }

Onde:

* **johnny.middleware.LocalStoreClearMiddleware:** O *Johnny* utiliza
    este *middleware* para gerenciar o *cache* de uma [maneira "thread-safe"][].
    Ele basicamente limpa este objeto ao final de cada
    requisição.
* **johnny.middleware.QueryCacheMiddleware:** É o *middleware*
    responsável pela “mágica” de *caching* no *ORM*.

O *backend* **johnny.backends.memcached.MemcachedCache** é basicamente
uma [subclasse do *backend built-in* do *Django* para o *Memcached*][],
com a adição do seguinte comportamento: Se o *timeout* for setado como 0
(zero), o *cache* fica “infinito”.

Com a opção **JOHNNY\_CACHE** como **True**, estamos informando ao
*Johnny* que este é o *pool* de *cache* que ele deve usar para *caching*
das *queries*. É possível ter uma configuração diferenciada, como
encontrada no [projeto Cifonauta][].

Com a ajuda do [django-debug-toolbar][], podemos ver o número de
*queries* diminuírem consideravelmente (fatalmente ocasionando um tempo
de resposta menor). Quando um registro for adicionado, editado ou
removido, o *Johnny Cache* remove as *queries* envolvendo determinada
tabela do *cache*, permitindo assim uma nova “batida” no banco de dados
(e um novo armazenamento dos resultados).


Considerações finais
--------------------

Como [já mencionei][], gosto muito dos ensinamentos e experiências
compartilhadas pelo pessoal da [*37Signals*][]. Um deles é para nos
preocuparmos com performance quando isto for realmente um problema.

Logo, (*IMO*) não construa uma mega
[infra-estrutura][] para uma aplicação que atende 50 usuários por dia.
Você está desperdiçando o seu tempo e linhas de código. Em
contrapartida, qualquer esforço para melhorar a experiência do usuário,
e para economizar recursos, **é sempre bem-vinda**.

Vale sempre ressaltar que problemas de performance podem estar
relacionados a qualidade do código produzido, e não necessariamente com
o consumo da aplicação. Então, se a demanda está baixa e mesmo assim
você tem tempos de resposta absurdamente altos, talvez seja a hora de
“refatorar” o seu código.


Referências
-----------

* [*Django Documentation – Cache Framework*][]
* [*Django Documentation – The Django template language: Loader types*][]
* [*Johnny Cache Documentation*][]
* [*Jongales.com – Make Django keep templates in memory*][]


  [*Django* e *Cache*: Uma dupla de alta performance]: {filename}/django-e-cache-uma-dupla-de-alta-performance-parte-1.md
    "Leia a parte 1 deste artigo"
  [*cache*]: {tag}cache
    "Leia mais sobre Cache"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [*Memcached*]: {tag}memcached
    "Leia mais sobre Memcached"
  [ferramenta mais apropriada para você]: https://docs.djangoproject.com/en/dev/topics/cache/#using-a-custom-cache-backend
    "Django Documentation - Custom backends"
  [*Globoesporte.com*]: http://globoesporte.globo.com
    "A melhor cobertura sobre o Futebol e Outros Esportes, no Brasil e no Mundo"
  [banco de dados semântico]: http://virtuoso.openlinksw.com/
    "Conheça o Virtuoso"
  [*thread-safe*]: https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#template-tag-thread-safety
    "Leia mais na documentação do Django"
  [documentação]: https://docs.djangoproject.com/en/1.4/topics/cache/#template-fragment-caching
    "Template fragment caching"
  [*per-site cache*]: https://docs.djangoproject.com/en/1.4/topics/cache/#the-per-site-cache
    "Leia mais sobre na documentação do Django"
  [cabeçalhos *HTTP*]: {filename}/09-o-cache-e-o-http.md
    "O cache e o HTTP"
  [*Johnny Cache*]: http://packages.python.org/johnny-cache/
    "Conheça a ferramenta de caching, Johnny Cache"
  [*PyPi*]: http://pypi.python.org/pypi
    "the Python Package Index"
  [maneira "thread-safe"]: https://github.com/jmoiron/johnny-cache/blob/master/johnny/transaction.py
    "Veja o uso dessa modalidade no módulo transaction.py"
  [subclasse do *backend built-in* do *Django* para o *Memcached*]: https://github.com/jmoiron/johnny-cache/blob/master/johnny/backends/memcached.py
    "Veja o código-fonte"
  [projeto Cifonauta]: https://github.com/nelas/cifonauta/blob/master/dummy_settings_server.py#L33
    "Veja o código-fonte do projeto no GitHub"
  [django-debug-toolbar]: http://pypi.python.org/pypi/django-debug-toolbar/
    "Excelente lib para debugging de projetos Django"
  [já mencionei]: {filename}/08-nginx-poderoso-rapido-e-facil.md
    "Nginx: Poderoso, rápido e fácil"
  [*37Signals*]: http://37signals.com/
    "Making collaboration productive and enjoyable for people every day"
  [infra-estrutura]: {tag}infra-estrutura
    "Leia mais sobre infra"
  [*Django Documentation – Cache Framework*]: https://docs.djangoproject.com/en/1.4/topics/cache/
    "Leia tudo sobre o framework de cache do Django"
  [*Django Documentation – The Django template language: Loader types*]: https://docs.djangoproject.com/en/dev/ref/templates/api/#loader-types
    "Mais informações sobre os template loaders do Django"
  [*Johnny Cache Documentation*]: http://packages.python.org/johnny-cache/
    "Mais informações sobre o uso do Johnny Cache"
  [*Jongales.com – Make Django keep templates in memory*]: http://www.jongales.com/blog/2012/02/16/make-django-keep-templates-in-memory/
    "Leia mais sobre o cached.Loader"
