---
title: "Django e Cache: Uma dupla de alta performance - Parte 1"
date: 2012-06-17 15:52:22
tags: ["desenvolvimento-web", "python", "django", "memcached", "cache"]
slug: django-e-cache-uma-dupla-de-alta-performance-1
thumbnail: /media/django-logo.png
---

Embora o [*caching HTTP*][] seja essencial
para qualquer aplicação [*web*][], **(IMO)**
essa modalidade de [*cache*][] deve ser encarada como um acréscimo à
experiência de uso, e não necessariamente como uma “arma” contra
problemas de performance. Os usuários poderão abdicar desta
funcionalidade, e aí a sua aplicação não poderá depender do protocolo
para atingir tempos de resposta atrativos.

Desenvolvedores [*Django*][] podem contar com boas soluções, do próprio
_framework_ e de terceiros, que podem melhorar o _caching_ das
aplicações (e consequentemente a performance). A grande notícia é que
essas ferramentas são fáceis e práticas. Vamos conhecê-las?

## O Memcached

Eu juro que tentei escrever uma introdução
para este tópico, mas a descricão contida no [site oficial do *Memcached*][] é
tão boa, que vou simplesmente copiá-la:

> Memcached is an in-memory key-value store for small chunks of arbitrary
> data (strings, objects) from results of database calls,
> API calls, or page rendering.

Em outras palavras, é uma ferramenta _open source_, que tem como função
o armazenamento (e gerenciamento) de resultados de _queries_, conteúdo
de arquivos, processamentos avançados, ou qualquer tipo de informação,
em memória (um meio muito mais rápido de ser lido que em disco, por
exemplo). Embora esse potencial possa ser utilizado para os mais
diferentes fins, é como mecanismo de _caching_ que ele se destaca.

O _Memcached_ foi construído em um esquema “cliente-servidor”, e é
possível utilizá-lo com uma grande quantidade de linguagens de
programação. Mas o que eu acho mais bacana na ferramenta é a
possibilidade de utilizá-la de forma distribuída. Isso propicia uma
flexibilidade muito maior na hora de construirmos a [infraestrutura][]
para servir as nossas aplicações _web_.

Mas a “cereja do bolo” é: O _Django_ funciona muito bem com o
_Memcached_.

## Framework de cache do Django

O uso do _Memcached_ não é obrigatório! Na verdade, podemos utilizar
diferentes _backends_ para diferentes tipos de mecanismos de _cache_. O
_Django_ possui algumas opções disponíveis, sem necessitar utilizar
nenhum “código de terceiro”. Temos a opção de fazer _cache_ em disco,
banco de dados ou até mesmo “simularmos” a interação com _cache_ (muito
bom para ambientes de desenvolvimento). [Leia mais sobre][].

Neste _post_, vamos nos concentrar na configuração do _Django_ com o
_Memcached_. Para instalar, [basta compilar através do make][]:

```text
$ wget http://memcached.org/latest
$ tar -zxvf memcached-1.4.13.tar.gz
$ cd memcached-1.4.13
$ ./configure
$ make && make test
$ make install
```

Utilizando a [*python-memcached*][] como _binding_ _Python_ para o
_Memcached_, basta adicionarmos o seguinte _backend_ ao **settings.py**:

```python
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
        'TIMEOUT': 60,  # Default: 300 segundos,
        'KEY_PREFIX': 'djcache',
    }
}
```

Onde:

- `BACKEND:` É o módulo responsável por se comunicar com o
  _Memcached_. Estamos utilizando este _backend_ pois optamos pela
  _python-memcached_.
- `LOCATION:` É a porta (ou _socket_) onde o serviço do _Memcached_
  está respondendo. A porta padrão é a 11211.
- `TIMEOUT:` É o tempo de vida do informação “cacheada”. Acima
  informamos 60 segundos, o padrão é 5 minutos.
- `KEY_PREFIX:` É um valor que precederá todas as chaves que
  utilizarmos com o _Django_. Bem útil para prevenir que duas
  aplicações utilizem o mesmo valor no _Memcached_ (quando este não é
  o comportamento esperado).

[Conheça outras opções de configurações.][]

## Considerações finais

Pronto! As ferramentas estão apresentadas e estamos prontos para partir
para uma abordagem prática.

O _Django_ já vem “preparado” para trabalhar com mecanismos de _cache_.
O seu esquema de _backends_ permite que você “acople” diferentes módulos
para atender os mais exóticos mecanismos de _cache_, sem necessariamente
precisar alterar código nas suas _apps_.

É bem verdade que o _Memcached_ é um tanto “tradicional”, e que hoje
existem alternativas mais “atrativas”, como o [*Redis*][]. Na prática,
depende muito do cenário no qual você está inserido, por exemplo, no
[*Globoesporte.com*][] utilizamos o _Memcached_ e ele nos atende muito
bem.

No próximo _post_ vamos partir para uma abordagem mais prática, cobrindo
as diferentes maneiras de utilizar _caching_ com _Django_.

Até lá...

## Referências

- [*Amix.dk – memcached: Benchmark of 4 Python libraries*][]
- [*Django Documentation – Django’s cache framework*][]
- [*Memcached.org*][]
- [*pylibmc – Python client for memcached*][]
- [*Wikipedia: Memcached*][]

[*caching http*]: /2012/05/14/o-cache-e-o-http.html "O cache e o HTTP"
[*web*]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[*cache*]: /tag/cache.html "Leia mais sobre Cache"
[*django*]: /tag/django.html "Leia mais sobre Django"
[site oficial do *memcached*]: http://memcached.org/ "A distributed memory object caching system"
[infraestrutura]: /tag/infraestrutura.html "Leia mais sobre infra"
[leia mais sobre]: https://docs.djangoproject.com/en/1.3/topics/cache/#setting-up-the-cache "Setting up cache"
[basta compilar através do make]: http://code.google.com/p/memcached/wiki/NewInstallFromSource "Memcached - Why build from source"
[*python-memcached*]: ftp://ftp.tummy.com/pub/python-memcached/ "Conheça a python-memcached"
[conheça outras opções de configurações.]: https://docs.djangoproject.com/en/dev/topics/cache/#cache-arguments "Cache Arguments - Django Documentation"
[*redis*]: http://redis.io/ "Redis is an open source, advanced key-value store"
[*globoesporte.com*]: http://globoesporte.globo.com/ "a melhor cobertura sobre o Futebol e Outros Esportes, no Brasil e no Mundo"
[*amix.dk – memcached: benchmark of 4 python libraries*]: http://amix.dk/blog/post/19471 "Um post antigo, com o comparativo entre pylibmc e python-memcached"
[*django documentation – django’s cache framework*]: https://docs.djangoproject.com/en/dev/topics/cache/ "Leia a documentação do framework de cache do Django"
[*memcached.org*]: http://memcached.org/ "Página principal do projeto Memcached"
[*pylibmc – python client for memcached*]: http://sendapatch.se/projects/pylibmc/ "Cliente Python escrito em C para trabalhar com o Memcached"
[*wikipedia: memcached*]: http://en.wikipedia.org/wiki/Memcached "Leia mais sobre o Memcached no Wikipedia"
