Title: Nginx: Poderoso, rápido e fácil
Date: 2011-12-19 20:41:00
Category: infraestrutura
Tags: infraestrutura, ambiente-de-desenvolvimento, nginx, linux, slackware
Slug: nginx-poderoso-rapido-facil
meta_description: O Nginx é um servidor Web, proxy reverso, proxy balanceador de carga, e faz praticamente tudo que o Apache faz, só que muito mais rápido!


{% img representative-image /images/blog/nginx-logo.png 180 180 Logotipo do Nginx %}

Para quem (assim como eu) começou com o [*PHP*][], uma das opções mais viáveis
para servir projetos na [*Web*][] sempre foi o [*Apache*][]. *Open source*,
prático e disponível em quase toda hospedagem de respeito (afinal, ele vem por
padrão em quase toda distro [*Linux*][]), há anos que ele faz a famosa
tríade "AMP" (*Apache*, [*MySQL*][] e *PHP*).

<!-- PELICAN_END_SUMMARY -->

Acontece que com as demandas recentes que a *internet* tem exigido de
algumas aplicações *Web* (como *Twitter* e *Facebook*), a necessidade
por performance começou a ser uma grande premissa em determinados tipos
de projetos. E é apoiado nesse cenário que o ***Nginx*** vem ganhando
cada vez mais força no mercado. Afinal, não é a toa que ele é conhecido
por “aguentar porrada”.


A verdade sobre o Nginx (ou não)
--------------------------------

O [*Nginx*][] é um [**servidor Web**][], [**proxy reverso**][],
**proxy balanceador de carga**, e faz praticamente tudo que o *Apache*
faz, só que muito mais rápido!

Técnicamente, o *Nginx* consome menos memória que o *Apache*, pois lida
com requisições *Web* através do conceito de “event-based web server“,
já o *Apache* é baseado no conceito “process-based server“. *David E.
Chen* faz uma excelente analogia entre os dois conceitos em seu artigo
“[Explain “Event-Driven” Web Servers to Your Grandma][]“.

Eles não são necessariamente “concorrentes”, *Apache* e *Nginx* podem
trabalhar juntos! *Paulo Higa*, através do seu artigo
[“Usando Nginx como proxy reverso e diminuindo o consumo do servidor][]“, nos mostra
como ele diminuiu o consumo de memória do *Apache* fazendo com que as
requisições *Web* passassem primeiro pelo *Nginx*. Desse modo, o
*Apache* não precisou servir arquivos estáticos, e pode depender do bom
controle de *cache* feito pelo *Nginx*.

Bom, a intenção não é denegrir a imagem do *Apache* (até parece que um
simples mortal como eu conseguiria tal feito), então vamos adiante.


Fácil?! Instalando e sendo bem recebido
---------------------------------------

Estou utilizando o [*Slackware 13.37*][] para realizar os procedimentos
abaixo, mas acredito que eles possam ser executados em qualquer
distribuição *Linux*, sem maiores problemas.

Vamos começar fazendo o *download* da versão mais recente (até então),
direto do site oficial do *Nginx*:

    ::bash
    $ wget http://nginx.org/download/nginx-1.0.11.tar.gz

O procedimento de instalação não difere em nada do método tradicional
que estamos acostumados no *Linux*. Apenas lembre-se de executar o
**make install** como **root**:

    ::bash
    $ tar -zxvf nginx-1.0.11.tar.gz; cd nginx-1.0.11
    $ ./configure
    $ make
    $ make install

O *Nginx* será instalado em **/usr/local/nginx/**. Você pode iniciar o
serviço através do comando (como **root**):

    ::bash
    $ /usr/local/nginx/sbin/nginx

Acessando o seu *localhost*, o serviço estará pronto e dando boas
vindas!


Configurando um servidor simples
--------------------------------

Para homenagear o nosso amigo *Apache*, vamos fazer o *Nginx* servir um
[*HTML*][] com a clássica mensagem “It works“, em outra porta e *path*.

Abra (como **root**) o arquivo **/usr/local/nginx/conf/nginx.conf**, no
final do arquivo, adicione a seguinte expressão antes do fechamento das
chaves:

    ::nginx
    include example;

Esta expressão importará o arquivo **/usr/local/nginx/conf/example**,
que criaremos a seguir:

    ::nginx
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

Intuitivo não?! Vamos criar o *path* onde armazenaremos o *HTML*:

    ::bash
    mkdir /var/www/example
    echo "It works! " > /var/www/example/index.html

Basta acessar o endereço **localhost:8080**, e pronto!

Como é possível perceber, os arquivos de configuração do *Nginx* são
simples e intuitivos. Existem várias referências na *Web* ensinando a
montar *proxy* reverso, servir páginas dinâmicas com *FastCGI* ou
*WSGI*, utilizar *SSL*, etc. Nada que o bom amigo *Google* não possa
resolver.


Considerações finais
--------------------

Quer dizer que agora eu tenho que largar tudo e correr para utilizar o
*Nginx*? A resposta é **não**.

Gosto dos ensinamentos do pessoal da [*37Signals*][], e um deles é para
deixarmos a preocupação com performance para quando isto for realmente
um problema (caso contrário, ninguém começaria projetos em *Ruby* ou
*Python*).

Portanto, se você tem um *blog* em *WordPress* servido através de um
*Apache*... deixe estar. Garanto que o *Apache* é a melhor solução para
você neste momento. E caso você venha a ter problemas com performance,
garanto que instalar e configurar um *Nginx* dentro da sua
infraestrutura será o menor dos seus problemas.


Referências
-----------

* [Site oficial do projeto *Nginx* (em Inglês)][]
* [*Daverecycles.com – Explain “Event-Driven” Web Servers to Your Grandma*][]
* [*Linux Journal – Nginx: the High-Performance Web Server and Reverse Proxy*][]
* [*Paulo Higa* – Usando o *nginx* como *proxy* reverso e diminuindo o consumo do servidor][]
* [*Wikipedia* – *Proxy* reverso][]
* [*Wikipedia* – Servidor *Web*][]
* [*WikiVS – Apache vs Nginx*][]


  [*PHP*]: {tag}php "Leia mais sobre PHP"
  [*Web*]: {tag}web "Leia mais sobre Web"
  [*Apache*]: http://httpd.apache.org/
    "Página oficial do projeto Apache"
  [*Linux*]: {tag}linux "Leia mais sobre Linux"
  [*MySQL*]: http://www.mysql.com/
    "Conheça o banco de dados open source mais popular do mundo"
  [*Nginx*]: http://nginx.org/ "Conheça o Nginx!"
  [**servidor Web**]: http://pt.wikipedia.org/wiki/Servidor_web
    "Entenda o que é um servidor Web"
  [**proxy reverso**]: http://pt.wikipedia.org/wiki/Proxy_reverso
    "Entenda o que é um Proxy Reverso"
  [Explain “Event-Driven” Web Servers to Your Grandma]: http://daverecycles.com/post/3104767110/explain-event-driven-web-servers-to-your-grandma
    "Leia esta boa analogia entre os conceitos"
  [“Usando Nginx como proxy reverso e diminuindo o consumo do servidor]: http://paulohiga.com/posts/nginx-proxy-reverso-php-apache.php
    "Aprenda como fazer o Nginx tornar-se um proxy reverso"
  [*Slackware 13.37*]: http://www.slackware.com/
    "Conheça e delicie-se com o Slackware Linux"
  [*HTML*]: {tag}html5 "Leia mais sobre HTML5"
  [*37Signals*]: http://37signals.com/
    "Você não sabe o que é a 37Signals?"
  [Site oficial do projeto *Nginx* (em Inglês)]: http://nginx.org/
    "Conheça, instale e use agora o Nginx!"
  [*Daverecycles.com – Explain “Event-Driven” Web Servers to Your Grandma*]: http://daverecycles.com/post/3104767110/explain-event-driven-web-servers-to-your-grandma
    "Entenda a diferença entre o webserver baseado em eventos, e outro baseado em processos"
  [*Linux Journal – Nginx: the High-Performance Web Server and Reverse Proxy*]: http://www.linuxjournal.com/article/10108
    "Excelente artigo sobre o Nginx"
  [*Paulo Higa* – Usando o *nginx* como *proxy* reverso e diminuindo o consumo do servidor]: http://paulohiga.com/posts/nginx-proxy-reverso-php-apache.php
    "Artigo de Paulo Higa sobre Nginx e proxy reverso, com Apache"
  [*Wikipedia* – *Proxy* reverso]: http://pt.wikipedia.org/wiki/Proxy_reverso
    "Leia mais na Wikipedia"
  [*Wikipedia* – Servidor *Web*]: http://pt.wikipedia.org/wiki/Servidor_web
    "Leia mais na Wikipedia"
  [*WikiVS – Apache vs Nginx*]: http://www.wikivs.com/wiki/Apache_vs_nginx
    "Entenda um pouco mais a diferença entre Apache e Nginx"
