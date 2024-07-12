---
title: "Nginx: Poderoso, rápido e fácil"
date: 2011-12-19 20:41:00
tags: ["infraestrutura", "nginx", "linux", "slackware", "desenvolvimento-web"]
slug: nginx-poderoso-rapido-facil
thumbnail: ./images/nginx-logo.png
---

Para quem (assim como eu) começou com o [*PHP*][], uma das opções mais viáveis
para servir projetos na [*web*][] sempre foi o [*Apache*][]. _Open source_,
prático e disponível em quase toda hospedagem de respeito (afinal, ele vem por
padrão em quase toda distro [*Linux*][]), há anos que ele faz a famosa
tríade "AMP" (_Apache_, [*MySQL*][] e _PHP_).

Acontece que com as demandas recentes que a _internet_ tem exigido de
algumas aplicações _web_ (como _Twitter_ e _Facebook_), a necessidade
por performance começou a ser uma grande premissa em determinados tipos
de projetos. E é apoiado nesse cenário que o _Nginx_ vem ganhando
cada vez mais força no mercado. Afinal, não é a toa que ele é conhecido
por “aguentar porrada”.

## A verdade sobre o Nginx (ou não)

O [*Nginx*][] é um [**servidor Web**][], [**proxy reverso**][],
**proxy balanceador de carga**, e faz praticamente tudo que o _Apache_
faz, só que muito mais rápido!

Técnicamente, o _Nginx_ consome menos memória que o _Apache_, pois lida
com requisições _web_ através do conceito de “event-based web server“,
já o _Apache_ é baseado no conceito “process-based server“. _David E.
Chen_ faz uma excelente analogia entre os dois conceitos em seu artigo
“[Explain “Event-Driven” Web Servers to Your Grandma][]“.

Eles não são necessariamente “concorrentes”, _Apache_ e _Nginx_ podem
trabalhar juntos! _Paulo Higa_, através do seu artigo
[“Usando Nginx como proxy reverso e diminuindo o consumo do servidor][]“, nos mostra
como ele diminuiu o consumo de memória do _Apache_ fazendo com que as
requisições _web_ passassem primeiro pelo _Nginx_. Desse modo, o
_Apache_ não precisou servir arquivos estáticos, e pode depender do bom
controle de _cache_ feito pelo _Nginx_.

Bom, a intenção não é denegrir a imagem do _Apache_ (até parece que um
simples mortal como eu conseguiria tal feito), então vamos adiante.

## Fácil?! Instalando e sendo bem recebido

Estou utilizando o [*Slackware 13.37*][] para realizar os procedimentos
abaixo, mas acredito que eles possam ser executados em qualquer
distribuição _Linux_, sem maiores problemas.

Vamos começar fazendo o _download_ da versão mais recente (até então),
direto do site oficial do _Nginx_:

```text
$ wget http://nginx.org/download/nginx-1.0.11.tar.gz
```

O procedimento de instalação não difere em nada do método tradicional
que estamos acostumados no _Linux_. Apenas lembre-se de executar o
`make install` como `root`:

```text
$ tar -zxvf nginx-1.0.11.tar.gz; cd nginx-1.0.11
$ ./configure
$ make
$ make install
```

O _Nginx_ será instalado em `/usr/local/nginx/`. Você pode iniciar o
serviço através do comando (como `root`):

```text
$ /usr/local/nginx/sbin/nginx
```

Acessando o seu `localhost`, o serviço estará pronto e dando boas
vindas!

## Configurando um servidor simples

Para homenagear o nosso amigo _Apache_, vamos fazer o _Nginx_ servir um
[*HTML*][] com a clássica mensagem “It works“, em outra porta e _path_.

Abra (como `root`) o arquivo `/usr/local/nginx/conf/nginx.conf`, no
final do arquivo, adicione a seguinte expressão antes do fechamento das
chaves:

```config
include example;
```

Esta expressão importará o arquivo `/usr/local/nginx/conf/example`,
que criaremos a seguir:

```config
server {
    listen        127.0.0.1:8080;
    server_name   example;
    access_log    /usr/local/nginx/logs/example.access.log;
    error_log     /usr/local/nginx/logs/example.error.log;
    location / {
        root  /var/www/example;
        index index.html index.htm;
    }
}
```

Intuitivo não?! Vamos criar o _path_ onde armazenaremos o _HTML_:

```text
mkdir /var/www/example
echo "It works! " > /var/www/example/index.html
```

Basta acessar o endereço `localhost:8080`, e pronto!

Como é possível perceber, os arquivos de configuração do _Nginx_ são
simples e intuitivos. Existem várias referências na _web_ ensinando a
montar _proxy_ reverso, servir páginas dinâmicas com _FastCGI_ ou
_WSGI_, utilizar _SSL_, etc. Nada que o bom amigo _Google_ não possa
resolver.

## Considerações finais

Quer dizer que agora eu tenho que largar tudo e correr para utilizar o
_Nginx_? A resposta é **não**.

Gosto dos ensinamentos do pessoal da [*37Signals*][], e um deles é para
deixarmos a preocupação com performance para quando isto for realmente
um problema (caso contrário, ninguém começaria projetos em _Ruby_ ou
_Python_).

Portanto, se você tem um _blog_ em _WordPress_ servido através de um
_Apache_... deixe estar. Garanto que o _Apache_ é a melhor solução para
você neste momento. E caso você venha a ter problemas com performance,
garanto que instalar e configurar um _Nginx_ dentro da sua
infraestrutura será o menor dos seus problemas.

## Referências

- [Site oficial do projeto *Nginx* (em Inglês)][]
- [*Daverecycles.com – Explain “Event-Driven” Web Servers to Your Grandma*][]
- [*Linux Journal – Nginx: the High-Performance Web Server and Reverse Proxy*][]
- [*Paulo Higa* – Usando o *nginx* como *proxy* reverso e diminuindo o consumo do servidor][]
- [*Wikipedia* – *Proxy* reverso][]
- [*Wikipedia* – Servidor *Web*][]
- [*WikiVS – Apache vs Nginx*][]

[*php*]: /tag/php.html "Leia mais sobre PHP"
[*web*]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[*apache*]: http://httpd.apache.org/ "Página oficial do projeto Apache"
[*linux*]: /tag/linux.html "Leia mais sobre Linux"
[*mysql*]: http://www.mysql.com/ "Conheça o banco de dados open source mais popular do mundo"
[*nginx*]: http://nginx.org/ "Conheça o Nginx!"
[**servidor web**]: http://pt.wikipedia.org/wiki/Servidor_web "Entenda o que é um servidor Web"
[**proxy reverso**]: http://pt.wikipedia.org/wiki/Proxy_reverso "Entenda o que é um Proxy Reverso"
[explain “event-driven” web servers to your grandma]: http://daverecycles.com/post/3104767110/explain-event-driven-web-servers-to-your-grandma "Leia esta boa analogia entre os conceitos"
[“usando nginx como proxy reverso e diminuindo o consumo do servidor]: http://paulohiga.com/posts/nginx-proxy-reverso-php-apache.php "Aprenda como fazer o Nginx tornar-se um proxy reverso"
[*slackware 13.37*]: http://www.slackware.com/ "Conheça e delicie-se com o Slackware Linux"
[*html*]: /tag/html5.html "Leia mais sobre HTML5"
[*37signals*]: http://37signals.com/ "Você não sabe o que é a 37Signals?"
[site oficial do projeto *nginx* (em inglês)]: http://nginx.org/ "Conheça, instale e use agora o Nginx!"
[*daverecycles.com – explain “event-driven” web servers to your grandma*]: http://daverecycles.com/post/3104767110/explain-event-driven-web-servers-to-your-grandma "Entenda a diferença entre o webserver baseado em eventos, e outro baseado em processos"
[*linux journal – nginx: the high-performance web server and reverse proxy*]: http://www.linuxjournal.com/article/10108 "Excelente artigo sobre o Nginx"
[*paulo higa* – usando o *nginx* como *proxy* reverso e diminuindo o consumo do servidor]: http://paulohiga.com/posts/nginx-proxy-reverso-php-apache.php "Artigo de Paulo Higa sobre Nginx e proxy reverso, com Apache"
[*wikipedia* – *proxy* reverso]: http://pt.wikipedia.org/wiki/Proxy_reverso "Leia mais na Wikipedia"
[*wikipedia* – servidor *web*]: http://pt.wikipedia.org/wiki/Servidor_web "Leia mais na Wikipedia"
[*wikivs – apache vs nginx*]: http://www.wikivs.com/wiki/Apache_vs_nginx "Entenda um pouco mais a diferença entre Apache e Nginx"
