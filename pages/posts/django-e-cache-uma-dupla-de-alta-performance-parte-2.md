---
title: "Django e Cache: Uma dupla de alta performance - Parte 2"
date: 2012-07-22 14:33:58
tags:
  [
    "desenvolvimento-web",
    "python",
    "django",
    "memcached",
    "johnny-cache",
    "cache",
  ]
slug: django-e-cache-uma-dupla-de-alta-performance-2
thumbnail: ./images/memcached-logo.jpg
---

Continuando o _post_ [*Django* e *Cache*: Uma dupla de alta performance][], vamos
ver na prática como utilizar o _framework_ de [*cache*][] do [*Django*][].

Embora eu esteja utilizando o [*Memcached*][] para escrever estes
artigos, vale ressaltar que a abstração do _Django_ lhe permite utilizar
a [ferramenta mais apropriada para você][].

## Diferentes maneiras de “cachear” a aplicação

Podemos utilizar a camada de _cache_ em diferentes pontos da aplicação.
Por exemplo, podemos utilizá-la antes de uma consulta ao banco de dados,
armazenar resultados de operações complexas, armazenar o _parsing_ de um
_template_, etc. Com o esquema de _middlewares_ do _Django_, podemos ter
essa camada aplicada diretamente ao fluxo de interpretação do
_framework_, o que pode reduzir consideravelmente o uso de recursos de
nossa hospedagem, sem mesmo termos alterado código das nossas _apps_.

Vamos ver a diferença, e casos de usos, dessas formas de utilização do
_cache_.

### Granular

Quando você quer ser “incisivo”, utilizar a _API_ de forma “granular” é
uma ótima opção.

Por exemplo, no [*Globoesporte.com*][] nós fazemos algumas consultas a
um [banco de dados semântico][] para trazer informações de eventos,
jogos e atletas. Como esta consulta é consideravelmente demorada,
utilizamos a _API_ de _cache_ para melhorar os tempos de resposta.
Exemplo:

```python
from django.core.cache import cache
...
def jogos_por_edicao(edicao_slug):
    jogos = cache.get('jogos_%s' % edicao_slug)
    if not jogos:
        jogos = pega_jogos_da_semantica(edicao_slug)
        cache.set('jogos_%s' % edicao_slug, jogos)
    ...
```

Passamos ao `cache.set` uma chave (que deve ser menor que 250
caracteres, e não utilizar caracteres especiais) e um valor. Ele também
aceita um terceiro parâmetro, que é o tempo de vida desta informação em
_cache_. Quando omitido, o tempo definido nas configurações do _backend_
é utilizado.

Para remover esta informação do _cache_, basta utilizarmos o método
`cache.delete`:

```python
cache.delete('jogos_%s' % edicao_slug)
```

Você tem a liberdade de fazer _caching_ de qualquer região da sua
aplicação. Mas é bom tomarmos cuidado para que o gerenciamento desses
pontos não passem a ser um problema. O _framework_ de _cache_ pode ser
aplicado em outras camadas da abstração, dispensando (em muitos casos) a
necessidade desse tipo de controle em modelos e _views_.

### Template

Assim como é possível fazer _caching_ de forma minuciosa com a _API_
acima, é possível fazer um controle muito interessante de _cache_ com os
_templates_ do _Django_.

#### Prevenindo acesso a disco

A cada nova requisição, o _Django_ carrega o arquivo de _template_ do
disco, interpreta-o com o contexto, e retorna o seu resultado. Podemos
melhorar um pouquinho este fluxo, sem necessitar do _Memcached_, basta
adicionarmos o `django.template.loaders.cached.Loader` ao
`TEMPLATE_LOADERS` do `settings.py`:

```python
TEMPLATE_LOADERS = (
    ('django.template.loaders.cached.Loader', (
        'django.template.loaders.filesystem.Loader',
        'django.template.loaders.app_directories.Loader',
    )),
)
```

Esse _loader_ manterá o arquivo de _template_ em memória, evitando com
que o _Django_ tenha que recorrer ao disco para obter o seu conteúdo. O
“trade-off” é mais utilização da memória do seu servidor (que,
dependendo do cenário, nem é um problema tão grande assim) e a
necessidade de, quando houver atualizações em _templates_, efetuar o
_restart_ do serviço de _WSGI_ que você utiliza.

Outro ponto a se observar é que as _template tags_ que você utilizar
deverão ser [*thread-safe*][].

#### Prevenindo parsing desnecessário

O _framework_ de _cache_ permite “cachear” fragmentos de um _template_.
Essa modalidade de _cache_ é bem interessante quando utilizamos filtros
ou _tags_ que executam operações que aumentam consideravelmente o tempo
de interpretação do _template_.

Na [documentação][] há um exemplo bem interessante, onde é feito o
_cache_ de um _sidebar_ inteiro:

```django-html
{% load cache %}

{% cache 500 sidebar %}
    <!-- conteúdo do sidebar -->
{% endcache %}
```

Passamos para a _template tag_ `cache` o tempo de vida do conteúdo
(500 segundos), e o identificador deste conteúdo (`sidebar`). Se a
chave não existir, o _Django_ interpretará as instruções dentro do bloco
e armazenará o seu resultado no _Memcached_ para que, num próximo
acesso, esse resultado seja recuperado sem necessitar interpretar todo o
bloco novamente.

### Views

Uma das maneiras mais práticas de utilizarmos o _cache_ em nossos
_websites_ e aplicações _Web_ escritos em _Django_, é através do método
chamado [*per-site cache*][].

Basicamente, o _Django_ analisará requisições realizadas através dos
métodos `GET` e `HEAD`, e utilizará a sua _URL_ como chave para a
verificação em _cache_. Caso ele encontre a ocorrência, retornará ao
usuário o resultado “cacheado”, senão, interpretará a _view_ e ao final
armazenará o seu resultado.

Para que isso seja possível, é necessário a utilização dos _middlewares_
`django.middleware.cache.UpdateCacheMiddleware` e
`django.middleware.cache.FetchFromCacheMiddleware`:

```python
MIDDLEWARE_CLASSES = (
    'django.middleware.cache.UpdateCacheMiddleware',
    ...
    'django.middleware.cache.FetchFromCacheMiddleware',
)
```

Além da configuração das seguintes constantes:

- `CACHE_MIDDLEWARE_ALIAS` : O identificador da conexão (padrão
  `default`)
- `CACHE_MIDDLEWARE_SECONDS` : O tempo de vida (em segundos) das
  páginas em _cache_ (padrão `600 segundos`)
- `CACHE_MIDDLEWARE_KEY_PREFIX` : Chave para prevenir problemas
  quando o _cache_ é um serviço compartilhado entre diferentes
  instâncias _Django_. Pode-se, por exemplo, colocar o nome do _site_
  como prefixo.

Ao acessar as _views_, temos uma agradável surpresa:

```text
$ curl -I http://localhost:8000/

HTTP/1.0 200 OK
Date: Wed, 04 Jul 2012 00:12:17 GMT
Server: WSGIServer/0.1 Python/2.7.2
Cache-Control: max-age=600
Vary: Cookie
Expires: Wed, 04 Jul 2012 00:22:17 GMT
Content-Type: text/html; charset=utf-8
Last-Modified: Wed, 04 Jul 2012 00:12:17 GMT
```

Ganhamos [cabeçalhos *HTTP*][] com os valores correspondentes às nossas
configurações de _cache_! Por exemplo, `Last-Modified` corresponde a
data de acesso, `Expires` é a data de acesso acrescentando os 600
segundos de _cache_, e o `Expires` corresponde ao tempo de
`CACHE_MIDDLEWARE_SECONDS`.

Interessante não? Temos um controle de _cache_ na “borda” da nossa
aplicação… não precisamos interferir nas nossas _views_, modelos ou
consultas.

#### O método per-view

É natural que certas _views_ necessitem de um tempo de _cache_ diferente
de outras. Para tanto, podemos utilizar _decorators_ que “sobrescrevem”
as configurações utilizadas pelo _per-site_, permitindo assim um
controle mais granular sobre o tempo de _cache_ das _views_. Exemplo:

```python
from django.views.generic.simple import direct_to_template
from django.views.decorators.cache import cache_page

urlpatterns = patterns('',
    ...
    url(r'^outra-view/$', cache_page(60 * 2)(direct_to_template),
        {'template': 'outra-view.html'}, name='outra-view'),
    ...
)
```

No exemplo acima estou usando a _generic view_ `direct_to_template`
para ilustrar. Através do _decorator_ `cache_page` eu informo o tempo
de vida desta _view_ em _cache_ (2 minutos, 60 \* 2 para ficar mais
legível).

E quando acessamos esta _view_, é possível reparar que inclusive os
valores dos cabeçalhos _HTTP_ são outros:

```text
$ curl -I http://localhost:8000/outra-view/

HTTP/1.0 200 OK
Date: Wed, 04 Jul 2012 00:28:07 GMT
Server: WSGIServer/0.1 Python/2.7.2
Last-Modified: Wed, 04 Jul 2012 00:28:07 GMT
Expires: Wed, 04 Jul 2012 00:30:07 GMT
Content-Type: text/html; charset=utf-8
Vary: Cookie
Cache-Control: max-age=120
```

Ainda é possível passar como parâmetro para o `cache_page`, o
`cache` que você deseja utilizar (por padrão `default`), e um
`key_prefix`.

## Caching de queries com o Johnny Cache

É normal que algumas rotas da sua aplicação não possam fazer utilização
desse tipo de _cache_. Por exemplo, _views_ para usuários autenticados,
que necessitam transitar informações de sessão e _cookies_, ou até mesmo
_views_ que precisam receber informações através de `POST`.

Vamos imaginar que, dentro desse cenário, a sua _app_ faça uma consulta
“custosa” ao banco de dados. Logo, concluímos que adicionar um controle
de _cache_ a esta consulta seria extremamente interessante para a
velocidade de resposta da _view_. A primeira opção é utilizar o
_framework_ de _cache_ do _Django_ de forma granular, através de sua
_API_. A outra opção é fazer _caching_ “dentro” do _ORM_.

É apoiado nessa última proposta que o [*Johnny Cache*][] se baseia:
“cachear” dados transitados através do _ORM_ do _Django_, não
interferindo no código das _apps_.

O _Johnny Cache_ está no [*PyPi*][], então basta um `pip install johnny-cache` para realizarmos a instalação. Para configurar,
precisamos adicionar algumas informações ao `settings.py`:

```python
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
```

Onde:

- `johnny.middleware.LocalStoreClearMiddleware:` O _Johnny_ utiliza
  este _middleware_ para gerenciar o _cache_ de uma [maneira "thread-safe"][].
  Ele basicamente limpa este objeto ao final de cada
  requisição.
- `johnny.middleware.QueryCacheMiddleware:` É o _middleware_
  responsável pela “mágica” de _caching_ no _ORM_.

O _backend_ `johnny.backends.memcached.MemcachedCache` é basicamente
uma [subclasse do *backend built-in* do *Django* para o *Memcached*][],
com a adição do seguinte comportamento: Se o _timeout_ for setado como 0
(zero), o _cache_ fica “infinito”.

Com a opção `JOHNNY_CACHE` como `True`, estamos informando ao
_Johnny_ que este é o _pool_ de _cache_ que ele deve usar para _caching_
das _queries_. É possível ter uma configuração diferenciada, como
encontrada no [projeto Cifonauta][].

Com a ajuda do [django-debug-toolbar][], podemos ver o número de
_queries_ diminuírem consideravelmente (fatalmente ocasionando um tempo
de resposta menor). Quando um registro for adicionado, editado ou
removido, o _Johnny Cache_ remove as _queries_ envolvendo determinada
tabela do _cache_, permitindo assim uma nova “batida” no banco de dados
(e um novo armazenamento dos resultados).

## Considerações finais

Como [já mencionei][], gosto muito dos ensinamentos e experiências
compartilhadas pelo pessoal da [*37Signals*][]. Um deles é para nos
preocuparmos com performance quando isto for realmente um problema.

Logo, (_IMO_) não construa uma mega
[infraestrutura][] para uma aplicação que atende 50 usuários por dia.
Você está desperdiçando o seu tempo e linhas de código. Em
contrapartida, qualquer esforço para melhorar a experiência do usuário,
e para economizar recursos, **é sempre bem-vinda**.

Vale sempre ressaltar que problemas de performance podem estar
relacionados a qualidade do código produzido, e não necessariamente com
o consumo da aplicação. Então, se a demanda está baixa e mesmo assim
você tem tempos de resposta absurdamente altos, talvez seja a hora de
“refatorar” o seu código.

## Referências

- [*Django Documentation – Cache Framework*][]
- [*Django Documentation – The Django template language: Loader types*][]
- [*Johnny Cache Documentation*][]
- [*Jongales.com – Make Django keep templates in memory*][]

[*django* e *cache*: uma dupla de alta performance]: /2012/06/17/django-e-cache-uma-dupla-de-alta-performance-1.html "Leia a parte 1 deste artigo"
[*cache*]: /tag/cache.html "Leia mais sobre Cache"
[*django*]: /tag/django.html "Leia mais sobre Django"
[*memcached*]: /tag/memcached.html "Leia mais sobre Memcached"
[ferramenta mais apropriada para você]: https://docs.djangoproject.com/en/dev/topics/cache/#using-a-custom-cache-backend "Django Documentation - Custom backends"
[*globoesporte.com*]: http://globoesporte.globo.com "A melhor cobertura sobre o Futebol e Outros Esportes, no Brasil e no Mundo"
[banco de dados semântico]: http://virtuoso.openlinksw.com/ "Conheça o Virtuoso"
[*thread-safe*]: https://docs.djangoproject.com/en/dev/howto/custom-template-tags/#template-tag-thread-safety "Leia mais na documentação do Django"
[documentação]: https://docs.djangoproject.com/en/1.4/topics/cache/#template-fragment-caching "Template fragment caching"
[*per-site cache*]: https://docs.djangoproject.com/en/1.4/topics/cache/#the-per-site-cache "Leia mais sobre na documentação do Django"
[cabeçalhos *http*]: /2012/05/14/o-cache-e-o-http.html "O cache e o HTTP"
[*johnny cache*]: http://packages.python.org/johnny-cache/ "Conheça a ferramenta de caching, Johnny Cache"
[*pypi*]: http://pypi.python.org/pypi "the Python Package Index"
[maneira "thread-safe"]: https://github.com/jmoiron/johnny-cache/blob/master/johnny/transaction.py "Veja o uso dessa modalidade no módulo transaction.py"
[subclasse do *backend built-in* do *django* para o *memcached*]: https://github.com/jmoiron/johnny-cache/blob/master/johnny/backends/memcached.py "Veja o código-fonte"
[projeto cifonauta]: https://github.com/nelas/cifonauta/blob/master/dummy_settings_server.py#L33 "Veja o código-fonte do projeto no GitHub"
[django-debug-toolbar]: http://pypi.python.org/pypi/django-debug-toolbar/ "Excelente lib para debugging de projetos Django"
[já mencionei]: /2011/12/19/nginx-poderoso-rapido-facil.html "Nginx: Poderoso, rápido e fácil"
[*37signals*]: http://37signals.com/ "Making collaboration productive and enjoyable for people every day"
[infraestrutura]: /tag/infraestrutura.html "Leia mais sobre infra"
[*django documentation – cache framework*]: https://docs.djangoproject.com/en/1.4/topics/cache/ "Leia tudo sobre o framework de cache do Django"
[*django documentation – the django template language: loader types*]: https://docs.djangoproject.com/en/dev/ref/templates/api/#loader-types "Mais informações sobre os template loaders do Django"
[*johnny cache documentation*]: http://packages.python.org/johnny-cache/ "Mais informações sobre o uso do Johnny Cache"
[*jongales.com – make django keep templates in memory*]: http://www.jongales.com/blog/2012/02/16/make-django-keep-templates-in-memory/ "Leia mais sobre o cached.Loader"
