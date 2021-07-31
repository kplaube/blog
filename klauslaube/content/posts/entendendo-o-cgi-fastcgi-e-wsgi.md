---
title: "Entendendo o CGI, FastCGI e WSGI"
date: 2012-11-02 15:09:19
tags:
  [
    "desenvolvimento-web",
    "infraestrutura",
    "python",
    "cgi",
    "fastcgi",
    "wsgi",
    "gunicorn",
  ]
slug: entendendo-o-cgi-fastcgi-e-wsgi
thumbnail: /images/apache-fcgi-logo.png
---

Pelos vários anos que programei com o [*PHP*][] e _Apache_,
nunca precisei me preocupar com o que acontecia entre esses dois. Para
mim, era tudo uma “mágica” maravilhosa, que entregava as minhas páginas
[*web*][] de forma dinâmica. Era uma troca justa: Eles não me traziam
preocupação, logo, eu não me preocupava.

Com o passar do tempo, o uso do [*Nginx*][] e a necessidade de aprender
[*Python*][], comecei a me deparar com o famoso `cgi-bin`, e
entender que os truques que o [**mod_php**][] ocultava iam muito além
do que eu imaginava.

## O Common Gateway Interface

De um modo bem simples, podemos dizer que o _Common Gateway Interface_ é
um “acordo” entre os servidores [*HTTP*][] e as aplicações _web_. Por
baixo dos panos, o servidor _web_ vai informar uma série de parâmetros
para o seu programa, e é dever do seu programa entregar uma resposta
“bem formada” para o servidor _web_.

Isso quer dizer que, para o _CGI_, não importa qual linguagem ou banco
de dados o seu programa está usando. Para ele, importa a passagem dos
parâmetros e a resposta. Logo, é perfeitamente possível desenvolvermos
nossas páginas até mesmo com a linguagem _C_:

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
	printf("Content-type:text/html\n\n");
	printf("<html>\n");
	printf("<body bgcolor=\"%s\">\n", argv[1]);
	printf("</body>");
	printf("</html>");

	return 0;
}
```

Basta compilar o código acima, jogar no `cgi-bin` do seu _Apache_, e
você verá a flexibilidade do protocolo em ação. Neste exemplo, acessando
nosso programa através da _URL_ `http://localhost/cgi-bin/exemplo?red`
(por exemplo), veremos apenas uma página com o fundo vermelho. Mas é
importante reparar que, o parâmetro passado na URL (`?red`) está acessível através do
`argv`, ou seja, o protocolo está passando para o nosso programa os
parâmetros através da `STDIN`.

Através da `STDOUT`, estamos respondendo ao _Apache_ utilizando de
artifícios do protocolo. A nossa mensagem é composta por um cabeçalho
informando o tipo da mensagem e o conteúdo. Neste exemplo, trata-se de
um _HTML_ extremamente simples, _James Marshall_ [escreveu um bom exemplo um pouco mais complexo utilizando a linguagem *C*][].

Outro comportamento fundamental do _CGI_ é a criação de variáveis de
ambiente. Variáveis que você já deve ter usado, como `REMOTE_HOST`,
`REMOTE_ADDR`, `REQUEST_METHOD` e `QUERY_STRING`, são
preenchidas pelo servidor _Web_ e passadas ao seu programa através do
protocolo:

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    char *addr, *method, *query_string;

    addr = getenv("REMOTE_ADDR");
    method = getenv("REQUEST_METHOD");
    query_string = getenv("QUERY_STRING");

    printf("Content-type:text/html\n\n");
    printf("Remote address: %s<br/>", addr);
    printf("Method: %s<br/>", method);
    printf("Query string: %s<br/>", query_string);
}
```

## O FastCGI

O _FastCGI_ segue o mesmo princípio do _CGI_, mas possui uma série de
particularidades (e vantagens) em relação ao seu “primogênito”. Para
compreender a diferença entre eles, vamos analisar o ciclo de vida de
uma requisição utilizando o _CGI_:

- A cada requisição, o servidor _web_ **cria um novo processo**;
- Através deste processo, o servidor _web_ passa informações para o
  “programa _CGI_“ utilizando **variáveis de ambiente**;
- O servidor _web_ também passa qualquer _input_ de dados do usuário
  através da **_STDIN_**;
- O programa retorna uma saída ao servidor _web_ através do protocolo
  _CGI_ (utilizando a **_STDOUT_**);
- Quando o **programa acabar**, a requisição é finalizada.

Em um cenário com poucas requisições, este fluxo atende perfeitamente.
Os problemas começam a aparecer quando temos que lidar com **alto
consumo** (algo comum hoje em dia, mas nem tão comum quando conceberam o
protocolo _CGI_). Dentre os principais problemas, temos:

- Criar e destruir um processo a cada requisição aumenta o _load_ do
  seu servidor, o que fatalmente degrada performance;
- Não há reúso de recursos, como conexões com banco de dados e
  _caches_ em memória (já que a cada nova requisição é iniciado um
  novo processo);
- Não é trivial separar a sua aplicação do seu servidor _Web_.

Foi pensando em performance e escalabilidade que o _FastCGI_ foi criado.
Ao contrário do _CGI_, ele utiliza “processos persistentes”, onde o
servidor _web_ é capaz de iniciar um processo que responde a uma série
de requisições. Além disso, ele usa [multiplexação][] para transmitir e
receber informações dentro de uma única conexão, que pode ser um
_socket_ ou uma conexão _TCP_. Desse modo, você pode ter o seu servidor
_web_ e o seu processo _FastCGI_ em máquinas diferentes.

O ciclo de vida de uma requisição _FastCGI_, é basicamente composto por:

- O servidor _web_ **cria um processo _FastCGI_** para receber
  requisições;
- A sua aplicação é inicializada, e **aguarda por uma nova conexão**
  vinda do servidor _web_;
- Quando o cliente envia uma requisição, o servidor _web_ abre uma
  **conexão com o processo _FastCGI_**. O servidor envia as variáveis
  de ambiente e entradas de dados através desta conexão;
- O processo _FastCGI_ retorna a **saída através desta mesma
  conexão**;
- O processo _FastCGI_ fecha a conexão, e a **requisição é
  concluída**, porém, o **processo fica “vivo”**, esperando por outra
  requisição do servidor _web_.

É claro que para atingir este resultado, aplicações _FastCGI_ possuem
uma arquitetura mais “rebuscada” que aplicações _CGI_. Por exemplo, para
suportar a [multiplexação][2], o servidor _web_ e o processo _FastCGI_
se comunicam através de mensagens. Nestas mensagens (`BEGIN_REQUEST`,
`ABORT_REQUEST`, `END_REQUEST`, `PARAMS`, `STDIN` e
`STDOUT`) possuímos um cabeçalho chamado `Request ID`, que é
responsável por identificar a qual requisição o pacote pertence.

Essa mudança de arquitetura acaba influenciando na escrita das
aplicações _web_, trazendo alterações marcantes em comparação aos
programas escritos para o bom e velho _CGI_. Por exemplo, você terá que
[recompilar o seu *PHP*][] com a _flag_ `—enable-fast-cgi`.

O site oficial do _FastCGI_ possui um bom exemplo de implementação de
uma [aplicação em *C* com *FastCGI*][].

## O Web Server Gateway Interface

No universo _Python_ começaram a aparecer diferentes formas de
comunicação entre servidor e aplicação, seja com _CGI_, _FastCGI_, [*mod
python*][] ou até mesmo com _APIs_ próprias e não padronizadas. Isso
acarretou no seguinte cenário: A escolha de um _framework_ influenciava
diretamente na escolha do servidor _web_, e geralmente o _framework_
escolhido era “incompatível” com os demais disponíveis para uso.

O _WSGI_ é uma [especificação][] que tem por objetivo garantir que o
desenvolvedor da aplicação não se preocupe com qual servidor _web_ será
escolhido, bem como o profissional responsável pelo servidor _web_ não
se preocupe com a arquitetura escolhida pela aplicação. Uma forma
“universal” de proporcionar interoperabilidade entre servidores e
aplicações escritas em _Python_.

Veja um exemplo de _script Python_ utilizando o protocolo _CGI_:

```python
#!/usr/bin/python

from os import environ


print "Content-Type: text/html\n\n"
print "<html><body>Hello %s!</body></html>" % environ.get('REMOTE_ADDR')
```

Seguindo a especificação do _WSGI_, devemos servir nossa aplicação da
seguinte maneira:

```python
#!/usr/bin/python


def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    return ['<html><body>Hello %s</body></html>' % environ.get('REMOTE_ADDR')]
```

Encapsulamos a nossa entrega em uma função chamada `application`, e
nela possuímos dois parâmetros: `environ` e `start_response`. O
primeiro é responsável por informar quais as variáveis ambientais que
temos à nossa disposição. O segundo, nomeado como `start_response`, é
na verdade uma função de _callback_ onde informamos o _status code_ e
demais cabeçalhos para resposta.

Por fim, retornamos ao servidor _web_ o nosso [*HTML*][]. O servidor
_web_ pode “iterar” sobre a aplicação, retornando conteúdo ao usuário
conforme a aplicação for retornando conteúdo para ele. Neste caso,
utilizamos na resposta um tipo [sequencial][].

Agora somos capazes de servir a aplicação através de _CGI_:

```python
from wsgiref.handlers import CGIHandler

CGIHandler().run(application)
```

E até mesmo _FastCGI_:

```python
from flup.server.fcgi import WSGIServer

WSGIServer(application).run()
```

A biblioteca [*wsgiref*][] implementa as especificações do _WSGI_ e
provê ferramentas para a comunicação entre servidores e aplicações. No
segundo exemplo utilizamos a [*flup*][], uma biblioteca com algumas
soluções _WSGI_, incluindo a possibilidade de servir aplicações
_FastCGI_.

Com esse “código de cola”, basta [configurar o seu servidor *Web*][]
favorito para servir a sua aplicação.

### mod_wsgi

Uma vez construída a interface para a sua aplicação através do padrão
_WSGI_, você pode serví-la em um servidor _Apache_ através do
[mod_wsgi][]. Existem soluções equivalentes para outros servidores,
como por exemplo, no [_Nginx_][5] temos o [*NgxWSGIModule*][].

Com o _mod_wsgi_, você não precisa de nenhum “código de cola” (como
apresentado nos exemplos de _CGI_ e _FastCGI_), basta [configurar o seu *Apache*][]
e apontar o seu script _WSGI_ através da instrução `WSGIScriptAlias`:

```text
<VirtualHost *:80>

    ServerName www.example.com
    ServerAlias example.com
    ServerAdmin webmaster@example.com

    DocumentRoot /usr/local/www/documents

    Alias /robots.txt /usr/local/www/documents/robots.txt
    Alias /favicon.ico /usr/local/www/documents/favicon.ico

    Alias /media/ /usr/local/www/documents/media/

    <Directory /usr/local/www/documents>
    Order allow,deny
    Allow from all
    </Directory>

    WSGIScriptAlias / /usr/local/www/wsgi-scripts/wsgi.py

    <Directory /usr/local/www/wsgi-scripts>
    Order allow,deny
    Allow from all
    </Directory>

</VirtualHost>
```

Uma particularidade do mod_wsgi é a escolha de execução no modo
`daemon`, que opera de uma forma [similar ao esquema utilizado pelo
*FastCGI*][].

### Servidores WSGI

Você pode utilizar servidores especialmente escritos para servir as suas
aplicações _WSGI_, como por exemplo o [*Gunicorn*][], o [*uWSGI*][] ou
até mesmo o [*Tornado*][]. Além da versatilidade e performance, a
facilidade é outra característica marcante em muitas dessas ferramentas:

```text
$ gunicorn -w 4 -b 127.0.0.1:5000 wsgi:application
```

No exemplo acima, levantamos o _Gunicorn_ na `porta 5000`, e
reservamos `4 workers` para servir a nossa aplicação.

Além de diminuirmos a carga do servidor _web_, e ganharmos um controle
mais apurado de memória e processos, ganhamos também o uso de _workers_.
Por exemplo, o _Gunicorn_ trabalha com _pre-fork_ de _workers_, onde um
processo “master” gerencia um conjunto de processos que são de fato os
responsáveis por servir a sua aplicação. Ganhamos mais uma ferramenta de
baixo custo para lidar com concorrência.

Servidores _WSGI_ conseguem servir as aplicações sem o auxílio de um
_Apache_ ou _Nginx_, mas uma prática muito comum hoje em dia é, “na
frente” de um _Gunicorn_ (por exemplo), termos um _Nginx_ servindo
estáticos, fazendo _caching_ e “aguentando porrada”, enquanto que o
servidor _WSGI_ está totalmente focado em servir o conteúdo dinâmico. O
servidor _web_ acaba fazendo uma espécie de [*proxy* reverso][] e até
mesmo servindo como [balanceador][].

A comunicação entre servidores pode ser feita via _TCP_ ou _socket_.
Isso nos dá uma série de vantagens, que vão desde a facilidade em
[escalar][] e distribuir, até o _restart_ individual de serviços (por
exemplo, se a sua aplicação travar, você pode reiniciar apenas o
servidor _WSGI_ e não perder o _caching_ do servidor _web_).

Um exemplo muito interessante de uso de servidores _WSGI_ é fazendo
[*deploy* de aplicações *Python* para o *Heroku*][]. Configurar um
servidor [*Nginx* para se comunicar com servidores *WSGI*][] também é
relativamente simples.

## Considerações finais

Um assunto muito interessante e que pretendo explorar mais aqui no
_blog_, principalmente em relação a processos e _workers_.

Servir aplicações _Python_ para a _web_ é algo relativamente simples,
limpo e elegante. Através do _WSGI_, escalar aplicações passou a ser
algo quase trivial, que demanda pouco esforço. Combiná-los com o _Nginx_
dão mais fôlego a sua aplicação (principalmente se estivermos falando do
_uWSGI_ ou [*gevent*][]), e com um [sistema de provisionamento automático][]
podem facilitar e muito o seu trabalho de infraestrutura quando o consumo se tornar um problema.

## Referências

- [*Django Documentation – How to use Django with FastCGI, SCGI, or AJP*][]
- [*FastCGI – The Forgotten Treasure*][]
- [*FastCGI – A High-Performance Web Server Interface*][]
- [*Gunicorn – Python WSGI HTTP Server for Unix*][]
- [*irt.org – Speed Thrills: CGI Please... and Fast!*][]
- [*James Marshal* – *CGI* realmente fácil][]
- [*modwsgi – Python WSGI adapter module for Apache*][]
- [*PEP 333 – Python Web Server Gateway Interface*][]
- [*Python Documentation – HOWTO Use Python in the web*][]
- [*W3C – Common Gateway Interface*][]
- [*Wikipedia – Common Gateway Interface*][]
- [*Wikipedia – FastCGI*][]
- [*Wikipedia – Web Server Gateway Interface*][]
- [*XML.com – Introducing WSGI: Python’s Secret Web Weapon*][]

[*php*]: /tag/php.html "Conheça mais sobre o Hypertext PreProcessor"
[*web*]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[*nginx*]: /2011/12/19/nginx-poderoso-rapido-facil.html "Conheça o Nginx"
[*python*]: /tag/python.html "Leia mais sobre Python"
[**mod_php**]: http://stackoverflow.com/questions/2712825/what-is-mod-php "Não conhece o módulo do PHP para o Apache?"
[*http*]: /tag/http.html "Leia mais sobre HTTP"
[veja o exemplo]: https://raw.github.com/gist/3734844/ca93585721523b5ee02e50678951a3f771346729/main.c
[escreveu um bom exemplo um pouco mais complexo utilizando a linguagem *c*]: http://www.jmarshall.com/easy/cgi/portuguese/getcgi.c.txt "Veja outro exemplo de C com CGI"
[1]: https://raw.github.com/gist/3734844/af5ecfb342fe1dd4c95c519cc3e34ffdf8db4fba/vars.c
[multiplexação]: http://pt.wikipedia.org/wiki/Multiplexador "Leia mais sobre Multiplexadores na Wikipedia"
[2]: http://www.nongnu.org/fastcgi/#multiplexing "The wonders of multiplexing"
[recompilar o seu *php*]: http://redmine.lighttpd.net/projects/1/wiki/Docs_ModFastCGI#FastCGI-and-Programming-Languages "Lighttp - the FastCGI Interface"
[aplicação em *c* com *fastcgi*]: http://www.fastcgi.com/devkit/doc/fastcgi-prog-guide/ch2c.htm "Developing FastCGI Applications in C"
[*mod python*]: http://www.modpython.org/ "Leia mais sobre o mod_python"
[especificação]: http://www.python.org/dev/peps/pep-0333/ "Leia a PEP 333, especificação do WSGI"
[3]: https://raw.github.com/gist/3734844/31189e743f9826ce38d8b9d5a7d34b46b812314a/main.py
[4]: https://raw.github.com/gist/3734844/826a348a75ed2b12f50af6657f408cd79c44d39c/wsgi.py
[*html*]: /tag/html.html "Leia mais sobre HTML"
[sequencial]: http://docs.python.org/2/library/stdtypes.html#sequence-types-str-unicode-list-tuple-bytearray-buffer-xrange "Leia sobre tipos sequenciais no Python"
[*wsgiref*]: http://docs.python.org/2/library/wsgiref.html "Saiba mais direto da documentação do Python"
[*flup*]: http://trac.saddi.com/flup "Saiba mais sobre"
[configurar o seu servidor *web*]: http://docs.python.org/2/howto/webservers.html "HOWTO Use Python in the web"
[mod_wsgi]: http://code.google.com/p/modwsgi/ "Página do módulo no Google Code"
[5]: http://klauslaube.com.br/tags/nginx/ "Leia mais sobre Nginx"
[*ngxwsgimodule*]: http://wiki.nginx.org/NgxWSGIModule "Veja mais na documentação do Nginx"
[configurar o seu *apache*]: http://code.google.com/p/modwsgi/wiki/QuickConfigurationGuide "Veja instruções para configurar o Apache com mod_wsgi"
[6]: https://raw.github.com/gist/3734844/b9067ea2a6ad12eba61b0f2ad3a20fa01a4a1431/http_mod_wsgi.conf
[similar ao esquema utilizado pelo *fastcgi*]: http://code.google.com/p/modwsgi/#Server_Performance "Leia mais sobre performance com mod_wsgi"
[*gunicorn*]: http://gunicorn.org/ "Veja mais sobre este servidor WSGI"
[*uwsgi*]: http://projects.unbit.it/uwsgi/ "Um rápido servidor WSGI escrito em C"
[*tornado*]: http://www.tornadoweb.org/documentation/wsgi.html "Saiba mais sobre o suporte do Tornado ao WSGI"
[*proxy* reverso]: http://pt.wikipedia.org/wiki/Proxy_reverso "Leia mais sobre Proxy Reverso na Wikipedia"
[balanceador]: http://wiki.nginx.org/LoadBalanceExample "Veja exemplo de uso do Nginx como balanceador"
[escalar]: http://docs.gunicorn.org/en/latest/design.html#how-many-workers "Veja como utilizar workers com Gunicorn"
[*deploy* de aplicações *python* para o *heroku*]: https://devcenter.heroku.com/articles/python#using-a-different-wsgi-server "Using a different WSGI server - Heroku"
[*nginx* para se comunicar com servidores *wsgi*]: http://mirobetm.blogspot.com.br/2012/03/ive-been-lighttpd-fastcgi-django-user.html "Gunicorn + Nginx - a much better way to deploy your Django website"
[*gevent*]: http://www.gevent.org/gevent.wsgi.html "Servindo aplicações WSGI com gevent"
[sistema de provisionamento automático]: http://puppetlabs.com/ "IT Automation Software for System Administrators"
[*django documentation – how to use django with fastcgi, scgi, or ajp*]: https://docs.djangoproject.com/en/dev/howto/deployment/fastcgi/ "Exemplo de uso do Django com FastCGI"
[*fastcgi – the forgotten treasure*]: http://www.nongnu.org/fastcgi/ "Material muito interessante sobre o protocolo FastCGI e seu uso com C++"
[*fastcgi – a high-performance web server interface*]: http://www.fastcgi.com/drupal/node/6?q=node/15 "Um documento bem objetivo, detalhando os diferenciais em usar o FastCGI"
[*gunicorn – python wsgi http server for unix*]: http://gunicorn.org/ "Conheça o Gunicorn e descubra as vatangens de possuir um servidor WSGI"
[*irt.org – speed thrills: cgi please... and fast!*]: http://www.irt.org/articles/js172/ "Artigo de 1999 detalhando algumas características do CGI e do FastCGI"
[*james marshal* – *cgi* realmente fácil]: http://www.jmarshall.com/easy/cgi/portuguese/ "Bom artigo, resumindo muito bem o funcionamento do CGI"
[*modwsgi – python wsgi adapter module for apache*]: http://code.google.com/p/modwsgi/ "Veja a página oficial do projeto"
[*pep 333 – python web server gateway interface*]: http://www.python.org/dev/peps/pep-0333/ "Leia a especificação direto do portal da linguagem Python"
[*python documentation – howto use python in the web*]: http://docs.python.org/howto/webservers.html "Compreenda a diferença do uso do Python com CGI, FastCGI, mod_python, mod_wsgi e servidores WSGI"
[*w3c – common gateway interface*]: http://www.w3.org/CGI/ "Leia mais sobre a especificação do CGI"
[*wikipedia – common gateway interface*]: http://en.wikipedia.org/wiki/Common_Gateway_Interface "Leia mais no artigo da Wikipedia"
[*wikipedia – fastcgi*]: http://en.wikipedia.org/wiki/FastCGI "Leia mais no artigo da Wikipedia"
[*wikipedia – web server gateway interface*]: http://en.wikipedia.org/wiki/Web_Server_Gateway_Interface "Leia mais no artigo da Wikipedia"
[*xml.com – introducing wsgi: python’s secret web weapon*]: http://www.xml.com/pub/a/2006/09/27/introducing-wsgi-pythons-secret-web-weapon.html "Artigo de 2006 explicando os principais benefícios do uso do WSGI"
