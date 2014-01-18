Title: Django e Cache: Uma dupla de alta performance - Parte 1
Date: 2012-06-17 15:52:22
Category: desenvolvimento
Tags: desenvolvimento, web, python, django, memcached, cache
Slug: django-e-cache-uma-dupla-de-alta-performance-1


|img "/images/blog/django-logo.png" 180 180 "Logo do Django" "align-left"|
Embora o [*caching HTTP*][] seja essencial
para qualquer aplicação [*Web*][], **(IMO)**
essa modalidade de [*cache*][] deve ser encarada como um acréscimo à
experiência de uso, e não necessariamente como uma “arma” contra
problemas de performance. Os usuários poderão abdicar desta
funcionalidade, e aí a sua aplicação não poderá depender do protocolo
para atingir tempos de resposta atrativos.

Desenvolvedores [*Django*][] podem contar com boas soluções, do próprio
*framework* e de terceiros, que podem melhorar o *caching* das
aplicações (e consequentemente a performance). A grande notícia é que
essas ferramentas são fáceis e práticas. Vamos conhecê-las?

<!-- PELICAN_END_SUMMARY -->

O Memcached
-----------

Eu juro que tentei escrever uma introdução
para este tópico, mas a descricão contida no [site oficial do *Memcached*][] é
tão boa, que vou simplesmente copiá-la:

> Memcached is an in-memory key-value store for small chunks of arbitrary
> data (strings, objects) from results of database calls,
> API calls, or page rendering.

Em outras palavras, é uma ferramenta *open source*, que tem como função
o armazenamento (e gerenciamento) de resultados de *queries*, conteúdo
de arquivos, processamentos avançados, ou qualquer tipo de informação,
em memória (um meio muito mais rápido de ser lido que em disco, por
exemplo). Embora esse potencial possa ser utilizado para os mais
diferentes fins, é como mecanismo de *caching* que ele se destaca.

O *Memcached* foi construído em um esquema “cliente-servidor”, e é
possível utilizá-lo com uma grande quantidade de linguagens de
programação. Mas o que eu acho mais bacana na ferramenta é a
possibilidade de utilizá-la de forma distribuída. Isso propicia uma
flexibilidade muito maior na hora de construirmos a [infra-estrutura][]
para servir as nossas aplicações *Web*.

Mas a “cereja do bolo” é: O *Django* funciona muito bem com o
*Memcached*.


Framework de cache do Django
----------------------------


O uso do *Memcached* não é obrigatório! Na verdade, podemos utilizar
diferentes *backends* para diferentes tipos de mecanismos de *cache*. O
*Django* possui algumas opções disponíveis, sem necessitar utilizar
nenhum “código de terceiro”. Temos a opção de fazer *cache* em disco,
banco de dados ou até mesmo “simularmos” a interação com *cache* (muito
bom para ambientes de desenvolvimento). [Leia mais sobre][].

Neste *post*, vamos nos concentrar na configuração do *Django* com o
*Memcached*. Para instalar, [basta compilar através do make][]:

    ::bash
    $ wget http://memcached.org/latest
    $ tar -zxvf memcached-1.4.13.tar.gz
    $ cd memcached-1.4.13
    $ ./configure
    $ make && make test
    $ make install

Utilizando a [*python-memcached*][] como *binding* *Python* para o
*Memcached*, basta adicionarmos o seguinte *backend* ao **settings.py**:

    ::python
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
            'LOCATION': '127.0.0.1:11211',
            'TIMEOUT': 60,  # Default: 300 segundos,
            'KEY_PREFIX': 'djcache',
        }
    }

Onde:

* **BACKEND:** É o módulo responsável por se comunicar com o
  *Memcached*. Estamos utilizando este *backend* pois optamos pela
  *python-memcached*.
* **LOCATION:** É a porta (ou *socket*) onde o serviço do *Memcached*
  está respondendo. A porta padrão é a 11211.
* **TIMEOUT:** É o tempo de vida do informação “cacheada”. Acima
  informamos 60 segundos, o padrão é 5 minutos.
* **KEY\_PREFIX:** É um valor que precederá todas as chaves que
  utilizarmos com o *Django*. Bem útil para prevenir que duas
  aplicações utilizem o mesmo valor no *Memcached* (quando este não é
  o comportamento esperado).

[Conheça outras opções de configurações.][]


Considerações finais
--------------------


Pronto! As ferramentas estão apresentadas e estamos prontos para partir
para uma abordagem prática.

O *Django* já vem “preparado” para trabalhar com mecanismos de *cache*.
O seu esquema de *backends* permite que você “acople” diferentes módulos
para atender os mais exóticos mecanismos de *cache*, sem necessariamente
precisar alterar código nas suas *apps*.

É bem verdade que o *Memcached* é um tanto “tradicional”, e que hoje
existem alternativas mais “atrativas”, como o [*Redis*][]. Na prática,
depende muito do cenário no qual você está inserido, por exemplo, no
[*Globoesporte.com*][] utilizamos o *Memcached* e ele nos atende muito
bem.

No próximo *post* vamos partir para uma abordagem mais prática, cobrindo
as diferentes maneiras de utilizar *caching* com *Django*.

Até lá...


Referências
-----------


* [*Amix.dk – memcached: Benchmark of 4 Python libraries*][]
* [*Django Documentation – Django’s cache framework*][]
* [*Memcached.org*][]
* [*pylibmc – Python client for memcached*][]
* [*Wikipedia: Memcached*][]


  [*caching HTTP*]: {filename}/09-o-cache-e-o-http.md
    "O cache e o HTTP"
  [*Web*]: {tag}web
    "Leia mais sobre Web"
  [*cache*]: {tag}cache
    "Leia mais sobre Cache"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [site oficial do *Memcached*]: http://memcached.org/
    "A distributed memory object caching system"
  [infra-estrutura]: {tag}infra-estrutura
    "Leia mais sobre infra"
  [Leia mais sobre]: https://docs.djangoproject.com/en/1.3/topics/cache/#setting-up-the-cache
    "Setting up cache"
  [basta compilar através do make]: http://code.google.com/p/memcached/wiki/NewInstallFromSource
    "Memcached - Why build from source"
  [*python-memcached*]: ftp://ftp.tummy.com/pub/python-memcached/
    "Conheça a python-memcached"
  [Conheça outras opções de configurações.]: https://docs.djangoproject.com/en/dev/topics/cache/#cache-arguments
    "Cache Arguments - Django Documentation"
  [*Redis*]: http://redis.io/
    "Redis is an open source, advanced key-value store"
  [*Globoesporte.com*]: http://globoesporte.globo.com/
    "a melhor cobertura sobre o Futebol e Outros Esportes, no Brasil e no Mundo"
  [*Amix.dk – memcached: Benchmark of 4 Python libraries*]: http://amix.dk/blog/post/19471
    "Um post antigo, com o comparativo entre pylibmc e python-memcached"
  [*Django Documentation – Django’s cache framework*]: https://docs.djangoproject.com/en/dev/topics/cache/
    "Leia a documentação do framework de cache do Django"
  [*Memcached.org*]: http://memcached.org/
    "Página principal do projeto Memcached"
  [*pylibmc – Python client for memcached*]: http://sendapatch.se/projects/pylibmc/
    "Cliente Python escrito em C para trabalhar com o Memcached"
  [*Wikipedia: Memcached*]: http://en.wikipedia.org/wiki/Memcached
    "Leia mais sobre o Memcached no Wikipedia"
