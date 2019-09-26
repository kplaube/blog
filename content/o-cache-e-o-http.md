Title: O cache e o HTTP
Date: 2012-05-14 23:14:46
Category: desenvolvimento
Tags: desenvolvimento, web, infraestrutura, cache, http
Slug: o-cache-e-o-http
meta_description: Em tempos de alta demanda, o cache pode tornar-se o melhor amigo das aplicações Web. Qualquer milissegundo economizado é um ponto a mais com o seu usuário, com os mecanismos de busca e com o seu serviço de hospedagem.
Image: /images/blog/performance.jpg
Alt: Cache e tempo de requisição

Em tempos de alta demanda, o **_cache_** pode tornar-se o melhor amigo das
aplicações [*web*][].
Através dele temos uma opção prática, acessível e barata para melhorar
performance, diminuir consumo de recursos e tempos de resposta. Qualquer
milissegundo economizado é um ponto a mais com o seu usuário, com os
mecanismos de busca e com o seu serviço de hospedagem.

<!-- PELICAN_END_SUMMARY -->

Antes de falarmos de _cache_ em aplicações [*Django*][] ou
[*Codeigniter*][], acho interessante falarmos sobre o uso de _cache_ com
o protocolo _HTTP_. Afinal, é esta a primeira camada a “atacar” quando
precisamos melhorar os tempos de resposta das nossas aplicações _web_.

## O que é “caching”?

Segundo [*Kalid Azad*][]:

> Caching is a great example of the ubiquitous time-space tradeoff
> in programming. You can save time by using space to store
> results.

Basicamente, **_caching_** é o ato de “economizar processamento”
armazenando os seus resultados. Um bom exemplo é o temporário do seu
navegador, onde uma imagem que não teve alteração desde o momento do seu
_download_ é resgatada do seu disco e não da _internet_. Uma tarefa mais
rápida e menos custosa.

Logo, entendemos que o **_cache_** é um local em disco ou memória
utilizado para armazenar estes resultados. Ele pode se aplicar ao
_front-end_ (como ilustrado no exemplo acima), ou ao _back-end_, através
dos servidores _web_, como o _Apache_ e o [*Nginx*][], ou através de
ferramentas mais específicas, como _Memcached_ e _Redis_.

Assim como a definição de [*cookies* e sessões][], a utilização de
_cache_ nos navegadores _Web_ é feita através de informações
transmitidas pelo cabeçalho da requisição e resposta.

Existem quatro tipos de cabeçalhos específicos para _cache_ em _HTTP_.
Mas todos partem da premissa que o arquivo em questão (pode ser um
documento, imagem, _script_, etc) já está armazenado no disco do
internauta, acessível ao navegador.

## Last-Modified

Com o `Last-Modified`, o navegador informa ao servidor que irá baixar
um arquivo desde que a sua data de modificação seja diferente da data do
arquivo armazenado. Na requisição é passado o cabeçalho
`If-Modified-Since`, e se a data do arquivo no servidor for mais
recente, o navegador faz um novo _download_.

Vamos fazer uma requisição tendo como resposta um cabeçalho
`Last-Modified`:

    ::bash
    $ curl -i -I http://klauslaube.com.br/media/blog/security.jpg

    HTTP/1.1 200 OK
    ...
    Date: Tue, 01 May 2012 19:20:27 GMT
    Last-Modified: Sat, 07 Apr 2012 17:51:10 GMT
    ...

Uma vez que o arquivo esteja em disco, o navegador tem como informar a
data da última alteração. Então, fazemos uma nova requisição ao arquivo
`security.jpg`, passando esta data no cabeçalho `If-Modified-Since`:

    ::bash
    $ curl -i -H "If-Modified-Since: Sat, 07 Apr 2012 17:51:10 GMT" http://klauslaube.com.br/media/blog/security.jpg

    HTTP/1.1 304 Not Modified
    Date: Tue, 01 May 2012 19:22:00 GMT
    Last-Modified: Sat, 07 Apr 2012 17:51:10 GMT

A resposta `304 Not Modified` não traz o conteúdo do arquivo em seu
corpo, e é através desta resposta que o navegador sabe que não precisa
fazer o _download_ do arquivo, utilizando assim a versão que está em seu
_cache_.

## ETag

O modo como a `ETag` funciona é bem parecido com o conceito do
`Last-Modified`. A diferença está no método de comparação: ao invés de
fazer comparações pela data, são realizadas comparações através de
identificadores únicos, atribuídos aos arquivos envolvidos nas
requisições.

Quando trabalhamos com `ETag`, obtemos respostas com o seguinte
cabeçalho:

    ::bash
    $ curl -i -I http://localhost/exemplo-cache.html

    HTTP/1.1 200 OK
    ...
    Date: Tue, 01 May 2012 19:46:18 GMT
    ETag: "2c6b0d8-13-4befe555d6f80"
    ...

É através do valor `2c6b0d8-13-4befe555d6f80` que navegador e servidor
saberão se aquele arquivo em questão já está armazenado em _cache_. Isso
é possível através do cabeçalho `If-None-Match`, enviado pelo
navegador na requisição:

    ::bash
    $ curl -i -I -H "If-None-Match: \"2c6b0d8-13-4befe555d6f80\"" http://localhost/exemplo-cache.html

    HTTP/1.1 304 Not Modified
    Date: Tue, 01 May 2012 19:50:40 GMT
    ETag: "2c6b0d8-13-4befe555d6f80"

Uma vez que o valor bata com o identificador do arquivo, o servidor
informa ao navegador que não houve alterações. Então, o navegador
utiliza a versão do arquivo que está no temporário.

## Expires

A grande desvantagem dos dois métodos acima é que necessitamos consultar
o servidor para verificar a procedência do arquivo. Com o `Expires` e
`max-age` a “data de validade” vem junto com a requisição, logo, o
navegador já sabe quando o arquivo em seu _cache_ irá expirar, e só
voltará a consultar o servidor quando este tempo for alcançado.

Com o `Expires`, o servidor retorna no cabeçalho da resposta uma data
de validade para um determinado arquivo:

    ::bash
    $ curl -i -I http://klauslaube.com.br/media/blog/cookies.jpg

    HTTP/1.1 200 OK
    Date: Tue, 08 May 2012 01:49:13 GMT
    ...
    Expires: Thu, 31 Dec 2037 23:55:55 GMT
    ...

Solicitando uma nova requisição para este mesmo arquivo, o navegador
analisará a data local e a data de expiração. Se a data atual for maior
que `Expires`, aí sim o navegador se comunicará com o servidor _web_,
e fará um novo _download_ do arquivo.

## max-age

Embora o `max-age` possa parecer um pouco enigmático, ele é (na minha
opinião) uma solução mais elegante e fácil de implementar que o
`Expires`.

Com o `Expires`, temos que informar uma data “absoluta” no cabeçalho,
ou seja, somos obrigados a dizer o dia da semana, mês, ano, hora, minuto
e até mesmo segundo em que determinado arquivo irá expirar. Logo, temos
o trabalho de interpretar a data da requisição (seja no servidor ou na
aplicação) adicionando o tempo que desejamos de _cache_ e imprimindo
este valor por extenso.

Com o `max-age` temos a opção de utilizar datas “relativas”, ou seja,
podemos dizer ao navegador que o arquivo irá expirar em 1 dia (em
segundos):

    ::bash
    $ curl -i http://localhost/exemplo-cache.html

    HTTP/1.1 200 OK
    Date: Mon, 14 May 2012 17:04:29 GMT
    ...
    Cache-Control: max-age=86400, must-revalidate
    ...

Como você já deve ter reparado, não existe um índice de cabeçalho
específico chamado `max-age`. Ele é na verdade um valor do índice
`Cache-Control`.

O valor `must-revalidate` solicita aos mecanismos de _cache_ (você
pode estar “atrás” de um _proxy_) o seguinte: Quando o arquivo
ultrapassar o `max-age`, o _user-agent_ deve revalidar o conteúdo
junto ao servidor _Web_. Embora esse seja o comportamento esperado por
estes mecanismos, tornar esta informação explícita pode garantir que
ferramentas mais “obscuras” sigam este comportamento.

### Um pouco sobre o Cache-Control

O `Cache-Control` foi adicionado na especificação do
[*HTTP 1.1*][] com a finalidade de contornar
as limitações do `Expires`, e também de melhorar o controle sobre o
_cache_ de determinado conteúdo por diferentes tipos de mecanismos.

Além do uso do `max-age`, é através do `Cache-Control` que podemos
especificar o comportamento de _cache_ para o navegador (`private`),
para algum _proxy_, servidores intermediários ou requisições _HTTPS_
(`public`), ou ainda informarmos que não queremos fazer _caching_ do
conteúdo (`no-cache`).

[Leia mais sobre *Cache-Control*][].

Vale ressaltar que o `Cache-Control` tem precedência sobre o
`Expires`.

## Qual forma utilizar?

A resposta é: depende do cenário.

Para servir arquivos estáticos, a [*Webfaction*][] utiliza os cabeçalhos
`Last-Modified`, `Expires` e `max-age`, atribuindo aos dois
últimos valores absurdos de _cache_ (por exemplo, datas de expiração
para o ano de 2037). Isso garante que o seu navegador, _proxy_ ou
_gateway_ “nunca esqueça” de uma determina imagem, folha de estilos ou
arquivo [*Javascript*][].

Mesmo com o uso do `max-age`, é interessante ter o `Expires` como
alternativa, caso o navegador do internauta não compreenda instruções de
`Cache-Control`. Já a utilização do `Last-Modified`, segundo o [*Ask Apache*][],
não é lá muito interessante pois a sua utilização faz com
que alguns navegadores ignorem o cabeçalho `Expires`. Um argumento
mais relevante é a eliminação de procedimentos de validação (como o
`If-Modified-Since` e `If-None-Match`), deixando a cargo apenas do
`Expires` e `max-age` determinar o tempo de vida do estático em
_cache_.

Em páginas dinâmicas, onde um _cache_ de 5 ou 10 minutos possa ser
aplicado, o `max-age` com `Expires` é fundamental. Já em páginas que
necessitam de um conteúdo em tempo real, ou páginas que utilizam
informações de _cookies_ ou sessões, a ausência de _cache_ é
justificável.

Em documentos _HTML_ onde o conteúdo é atualizado com uma frequência
indeterminada, o uso de `Last-Modified` ou `ETag` é mais apropriado.
Uma vez que fica difícil determinar quando a atualização irá ocorrer, é
uma boa estratégia fazer com que o navegador atualize o conteúdo do seu
_cache_ quando necessário.

## Considerações Finais

Embora seja um conteúdo bem introdutório, acho fundamental sabermos as
diferentes maneiras de aplicar _cache_ com o protocolo _HTTP_ antes de
partirmos para soluções específicas. Essas recomendações não são
infalíveis, e em um cenário mais “extremo”, necessitam sim de auxílio de
algumas ferramentas disponíveis no mercado para tornar o _cache_
eficiente tanto para a experiência do usuário, quanto para a
estabilidade dos seus serviços.

Embora eu tenha utilizado o navegador _Web_ como foco das explicações,
“robôs”, ferramentas de _proxy_ e _gateways_ também podem fazer controle
de _cache_. O comportamento é basicamente o mesmo, variando de acordo
com instruções passadas no cabeçalho `Cache-Control`.

Como não sou nenhum “expert” no assunto, se você possui alguma sugestão
ou correção sobre o uso de _cache_ com _HTTP_, por favor, conte-nos
através dos comentários abaixo.

Até a próxima…

## Referências

- [*Ask Apache: Speed tips – Turn on Compressor*][]
- [*Better Explained: How To Optimize Your Site With HTTP Caching*][]
- [*Django Documentation: Django’s cache framework*][]
- [*Google Developers: HTTP Caching*][]
- [*John Yannakopoulos: HyperText Transfer Protocol – A Short Course*][]
- [*mnot.net: Caching Tutorial*][]
- [*Web Scaling Blog: Caching HTTP Headers, Cache-Control: max-age*][]

[*web*]: {tag}web "Leia mais sobre Web"
[*django*]: {tag}django "Leia mais sobre o Django"
[*codeigniter*]: {tag}codeigniter "Leia mais sobre Codeigniter"
[*kalid azad*]: http://betterexplained.com/articles/how-to-optimize-your-site-with-http-caching/ "How To Optimize Your Site With HTTP Caching"
[*nginx*]: {filename}/nginx-poderoso-rapido-e-facil.md "Leia mais sobre Nginx"
[*cookies* e sessões]: {filename}/entendendo-os-cookies-e-sessoes.md "Entendendo os Cookies e Sessões"
[*http 1.1*]: http://www.w3.org/Protocols/rfc2616/rfc2616.html "Conheça o protocolo HTTP versão 1.1"
[leia mais sobre *cache-control*]: http://www.mnot.net/cache_docs/#CACHE-CONTROL "Tutorial sobre HTTP caching"
[*webfaction*]: http://www.webfaction.com/ "Smarter web hosting"
[*javascript*]: {tag}javascript "Leia mais sobre Javascript"
[*ask apache*]: http://www.askapache.com/htaccess/apache-speed-last-modified.html "Remove Last-Modified Header"
[*ask apache: speed tips – turn on compressor*]: http://www.askapache.com/htaccess/apache-speed-compression.html "Material bem interessante sobre como melhorar a performance com Cache no Apache"
[*better explained: how to optimize your site with http caching*]: http://betterexplained.com/articles/how-to-optimize-your-site-with-http-caching/ "Excelente artigo falando sobre HTTP e cache"
[*django documentation: django’s cache framework*]: https://docs.djangoproject.com/en/dev/topics/cache/ "Leia mais sobre Cache no Django"
[*google developers: http caching*]: https://developers.google.com/speed/articles/caching "Bom material do Google sobre Caching"
[*john yannakopoulos: hypertext transfer protocol – a short course*]: http://condor.depaul.edu/dmumaugh/readings/handouts/SE435/HTTP/http.html "Conheça um pouco mais sobre o protocolo HTTP com este artigo científico"
[*mnot.net: caching tutorial*]: http://www.mnot.net/cache_docs/ "Excelente conteúdo sobre caching HTTP"
[*web scaling blog: caching http headers, cache-control: max-age*]: http://www.webscalingblog.com/performance/caching-http-headers-cache-control-max-age.html "Artigo bem objetivo descrevendo o uso do max-age"
