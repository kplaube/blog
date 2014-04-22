Title: Entendendo o CGI, FastCGI e WSGI
Date: 2012-11-02 15:09:19
Category: desenvolvimento
Tags: desenvolvimento, infra-estrutura, web, python, cgi, fastcgi, wsgi, gunicorn
Slug: entendendo-o-cgi-fastcgi-e-wsgi
meta_description: Neste artigo, exploramos as diferenças entre CGI, FastCGI e WSGI e apresentamos exemplo, soluções e ferramentas para servir a sua aplicação Python na Web.


{% img align-left /images/blog/apache-fcgi-logo.png 180 180 Fast CGI %}
Pelos vários anos que programei com o [*PHP*][] e *Apache*,
nunca precisei me preocupar com o que acontecia entre esses dois. Para
mim, era tudo uma “mágica” maravilhosa, que entregava as minhas páginas
[*Web*][] de forma dinâmica. Era uma troca justa: Eles não me traziam
preocupação, logo, eu não me preocupava.

Com o passar do tempo, o uso do [*Nginx*][] e a necessidade de aprender
[*Python*][], comecei a me deparar com o famoso “**cgi-bin**“, e
entender que os truques que o [**mod_php**][] ocultava iam muito além
do que eu imaginava.

<!-- PELICAN_END_SUMMARY -->


O Common Gateway Interface
--------------------------

De um modo bem simples, podemos dizer que o *Common Gateway Interface* é
um “acordo” entre os servidores [*HTTP*][] e as aplicações *Web*. Por
baixo dos panos, o servidor *Web* vai informar uma série de parâmetros
para o seu programa, e é dever do seu programa entregar uma resposta
“bem formada” para o servidor *Web*.

Isso quer dizer que, para o *CGI*, não importa qual linguagem ou banco
de dados o seu programa está usando. Para ele, importa a passagem dos
parâmetros e a resposta. Logo, é perfeitamente possível desenvolvermos
nossas páginas até mesmo com a linguagem *C*:
  
<script src="https://gist.github.com/3734844.js?file=main.c"></script>
<noscript>
[Veja o exemplo][].
</noscript>

Basta compilar o código acima, jogar no **cgi-bin** do seu *Apache*, e
você verá a flexibilidade do protocolo em ação. Neste exemplo, acessando
nosso programa através da *URL* **http://localhost/cgi-bin/exemplo?red**
(por exemplo), veremos apenas uma página com o fundo vermelho. Mas é
importante reparar que, o parâmetro passado na URL (**?red**) está acessível através do
**argv**, ou seja, o protocolo está passando para o nosso programa os
parâmetros através da **STDIN**.

Através da **STDOUT**, estamos respondendo ao *Apache* utilizando de
artifícios do protocolo. A nossa mensagem é composta por um cabeçalho
informando o tipo da mensagem e o conteúdo. Neste exemplo, trata-se de
um *HTML* extremamente simples, *James Marshall* [escreveu um bom exemplo um pouco mais complexo utilizando a linguagem *C*][].

Outro comportamento fundamental do *CGI* é a criação de variáveis de
ambiente. Variáveis que você já deve ter usado, como **REMOTE\_HOST**,
**REMOTE\_ADDR**, **REQUEST\_METHOD** e **QUERY\_STRING**, são
preenchidas pelo servidor *Web* e passadas ao seu programa através do
protocolo:

<script src="https://gist.github.com/3734844.js?file=vars.c"></script>
<noscript>
[Veja o exemplo][1].
</noscript>


O FastCGI
---------

O *FastCGI* segue o mesmo princípio do *CGI*, mas possui uma série de
particularidades (e vantagens) em relação ao seu “primogênito”. Para
compreender a diferença entre eles, vamos analisar o ciclo de vida de
uma requisição utilizando o *CGI*:

* A cada requisição, o servidor *Web* **cria um novo processo**;
* Através deste processo, o servidor *Web* passa informações para o
    “programa *CGI*“ utilizando **variáveis de ambiente**;
* O servidor *Web* também passa qualquer *input* de dados do usuário
    através da ***STDIN***;
* O programa retorna uma saída ao servidor *Web* através do protocolo
    *CGI* (utilizando a ***STDOUT***);
* Quando o **programa acabar**, a requisição é finalizada.

Em um cenário com poucas requisições, este fluxo atende perfeitamente.
Os problemas começam a aparecer quando temos que lidar com **alto
consumo** (algo comum hoje em dia, mas nem tão comum quando conceberam o
protocolo *CGI*). Dentre os principais problemas, temos:

* Criar e destruir um processo a cada requisição aumenta o *load* do
    seu servidor, o que fatalmente degrada performance;
* Não há reúso de recursos, como conexões com banco de dados e
    *caches* em memória (já que a cada nova requisição é iniciado um
    novo processo);
* Não é trivial separar a sua aplicação do seu servidor *Web*.

Foi pensando em performance e escalabilidade que o *FastCGI* foi criado.
Ao contrário do *CGI*, ele utiliza “processos persistentes”, onde o
servidor *Web* é capaz de iniciar um processo que responde a uma série
de requisições. Além disso, ele usa [multiplexação][] para transmitir e
receber informações dentro de uma única conexão, que pode ser um
*socket* ou uma conexão *TCP*. Desse modo, você pode ter o seu servidor
*Web* e o seu processo *FastCGI* em máquinas diferentes.

O ciclo de vida de uma requisição *FastCGI*, é basicamente composto por:

* O servidor *Web* **cria um processo _FastCGI_** para receber
    requisições;
* A sua aplicação é inicializada, e **aguarda por uma nova conexão**
    vinda do servidor *Web*;
* Quando o cliente envia uma requisição, o servidor *Web* abre uma
    **conexão com o processo _FastCGI_**. O servidor envia as variáveis
    de ambiente e entradas de dados através desta conexão;
* O processo *FastCGI* retorna a **saída através desta mesma
    conexão**;
* O processo *FastCGI* fecha a conexão, e a **requisição é
    concluída**, porém, o **processo fica “vivo”**, esperando por outra
    requisição do servidor *Web*.

É claro que para atingir este resultado, aplicações *FastCGI* possuem
uma arquitetura mais “rebuscada” que aplicações *CGI*. Por exemplo, para
suportar a [multiplexação][2], o servidor *Web* e o processo *FastCGI*
se comunicam através de mensagens. Nestas mensagens (**BEGIN\_REQUEST**,
**ABORT\_REQUEST**, **END\_REQUEST**, **PARAMS**, **STDIN** e
**STDOUT**) possuímos um cabeçalho chamado **Request ID**, que é
responsável por identificar a qual requisição o pacote pertence.

Essa mudança de arquitetura acaba influenciando na escrita das
aplicações *Web*, trazendo alterações marcantes em comparação aos
programas escritos para o bom e velho *CGI*. Por exemplo, você terá que
[recompilar o seu *PHP*][] com a *flag* **—enable-fast-cgi**.

O site oficial do *FastCGI* possui um bom exemplo de implementação de
uma [aplicação em *C* com *FastCGI*][].


O Web Server Gateway Interface
------------------------------

No universo *Python* começaram a aparecer diferentes formas de
comunicação entre servidor e aplicação, seja com *CGI*, *FastCGI*, [*mod
python*][] ou até mesmo com *APIs* próprias e não padronizadas. Isso
acarretou no seguinte cenário: A escolha de um *framework* influenciava
diretamente na escolha do servidor *Web*, e geralmente o *framework*
escolhido era “incompatível” com os demais disponíveis para uso.

O *WSGI* é uma [especificação][] que tem por objetivo garantir que o
desenvolvedor da aplicação não se preocupe com qual servidor *Web* será
escolhido, bem como o profissional responsável pelo servidor *Web* não
se preocupe com a arquitetura escolhida pela aplicação. Uma forma
“universal” de proporcionar interoperabilidade entre servidores e
aplicações escritas em *Python*.

Veja um exemplo de *script Python* utilizando o protocolo *CGI*:

<script src="https://gist.github.com/3734844.js?file=main.py"></script>
<noscript>
[Veja o exemplo][3].
</noscript>

Seguindo a especificação do *WSGI*, devemos servir nossa aplicação da
seguinte maneira:

<script src="https://gist.github.com/3734844.js?file=wsgi.py"></script>
<noscript>
[Veja o exemplo][4].
</noscript>

Encapsulamos a nossa entrega em uma função chamada **application**, e
nela possuímos dois parâmetros: **environ** e **start\_response**. O
primeiro é responsável por informar quais as variáveis ambientais que
temos à nossa disposição. O segundo, nomeado como **start\_response**, é
na verdade uma função de *callback* onde informamos o *status code* e
demais cabeçalhos para resposta.

Por fim, retornamos ao servidor *Web* o nosso [*HTML*][]. O servidor
*Web* pode “iterar” sobre a aplicação, retornando conteúdo ao usuário
conforme a aplicação for retornando conteúdo para ele. Neste caso,
utilizamos na resposta um tipo [sequencial][].

Agora somos capazes de servir a aplicação através de *CGI*:

    ::python
    from wsgiref.handlers import CGIHandler

    CGIHandler().run(application)

E até mesmo *FastCGI*:

    ::python
    from flup.server.fcgi import WSGIServer
    
    WSGIServer(application).run()

A biblioteca [*wsgiref*][] implementa as especificações do *WSGI* e
provê ferramentas para a comunicação entre servidores e aplicações. No
segundo exemplo utilizamos a [*flup*][], uma biblioteca com algumas
soluções *WSGI*, incluindo a possibilidade de servir aplicações
*FastCGI*.

Com esse “código de cola”, basta [configurar o seu servidor *Web*][]
favorito para servir a sua aplicação.


### mod_wsgi

Uma vez construída a interface para a sua aplicação através do padrão
*WSGI*, você pode serví-la em um servidor *Apache* através do
[mod_wsgi][]. Existem soluções equivalentes para outros servidores,
como por exemplo, no [*Nginx*][5] temos o [*NgxWSGIModule*][].

Com o mod\_wsgi, você não precisa de nenhum “código de cola” (como
apresentado nos exemplos de *CGI* e *FastCGI*), basta [configurar o seu *Apache*][]
e apontar o seu script *WSGI* através da instrução **WSGIScriptAlias**:

<script src="https://gist.github.com/3734844.js?file=http_mod_wsgi.conf"></script>
<noscript>
[Veja o exemplo][6].
</noscript>

Uma particularidade do mod\_wsgi é a escolha de execução no modo
**daemon**, que opera de uma forma [similar ao esquema utilizado pelo
*FastCGI*][].


### Servidores WSGI

Você pode utilizar servidores especialmente escritos para servir as suas
aplicações *WSGI*, como por exemplo o [*Gunicorn*][], o [*uWSGI*][] ou
até mesmo o [*Tornado*][]. Além da versatilidade e performance, a
facilidade é outra característica marcante em muitas dessas ferramentas:

    ::bash
    $ gunicorn -w 4 -b 127.0.0.1:5000 wsgi:application

No exemplo acima, levantamos o *Gunicorn* na **porta 5000**, e
reservamos **4 _workers_** para servir a nossa aplicação.

Além de diminuirmos a carga do servidor *Web*, e ganharmos um controle
mais apurado de memória e processos, ganhamos também o uso de *workers*.
Por exemplo, o *Gunicorn* trabalha com *pre-fork* de *workers*, onde um
processo “master” gerencia um conjunto de processos que são de fato os
responsáveis por servir a sua aplicação. Ganhamos mais uma ferramenta de
baixo custo para lidar com concorrência.

Servidores *WSGI* conseguem servir as aplicações sem o auxílio de um
*Apache* ou *Nginx*, mas uma prática muito comum hoje em dia é, “na
frente” de um *Gunicorn* (por exemplo), termos um *Nginx* servindo
estáticos, fazendo *caching* e “aguentando porrada”, enquanto que o
servidor *WSGI* está totalmente focado em servir o conteúdo dinâmico. O
servidor *Web* acaba fazendo uma espécie de [*proxy* reverso][] e até
mesmo servindo como [balanceador][].

A comunicação entre servidores pode ser feita via *TCP* ou *socket*.
Isso nos dá uma série de vantagens, que vão desde a facilidade em
[escalar][] e distribuir, até o *restart* individual de serviços (por
exemplo, se a sua aplicação travar, você pode reiniciar apenas o
servidor *WSGI* e não perder o *caching* do servidor *Web*).

Um exemplo muito interessante de uso de servidores *WSGI* é fazendo
[*deploy* de aplicações *Python* para o *Heroku*][]. Configurar um
servidor [*Nginx* para se comunicar com servidores *WSGI*][] também é
relativamente simples.


Considerações finais
--------------------

Um assunto muito interessante e que pretendo explorar mais aqui no
*blog*, principalmente em relação a processos e *workers*.

Servir aplicações *Python* para a *Web* é algo relativamente simples,
limpo e elegante. Através do *WSGI*, escalar aplicações passou a ser
algo quase trivial, que demanda pouco esforço. Combiná-los com o *Nginx*
dão mais fôlego a sua aplicação (principalmente se estivermos falando do
*uWSGI* ou [*gevent*][]), e com um [sistema de provisionamento automático][]
podem facilitar e muito o seu trabalho de infra-estrutura quando o consumo se tornar um problema.


Referências
-----------

* [*Django Documentation – How to use Django with FastCGI, SCGI, or AJP*][]
* [*FastCGI – The Forgotten Treasure*][]
* [*FastCGI – A High-Performance Web Server Interface*][]
* [*Gunicorn – Python WSGI HTTP Server for Unix*][]
* [*irt.org – Speed Thrills: CGI Please... and Fast!*][]
* [*James Marshal* – *CGI* realmente fácil][]
* [*modwsgi – Python WSGI adapter module for Apache*][]
* [*PEP 333 – Python Web Server Gateway Interface*][]
* [*Python Documentation – HOWTO Use Python in the web*][]
* [*W3C – Common Gateway Interface*][]
* [*Wikipedia – Common Gateway Interface*][]
* [*Wikipedia – FastCGI*][]
* [*Wikipedia – Web Server Gateway Interface*][]
* [*XML.com – Introducing WSGI: Python’s Secret Web Weapon*][]


  [*PHP*]: {tag}php
    "Conheça mais sobre o Hypertext PreProcessor"
  [*Web*]: {tag}web
    "Leia mais sobre Web"
  [*Nginx*]: {filename}/08-nginx-poderoso-rapido-e-facil.md
    "Conheça o Nginx"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [**mod_php**]: http://stackoverflow.com/questions/2712825/what-is-mod-php
    "Não conhece o módulo do PHP para o Apache?"
  [*HTTP*]: {tag}http
    "Leia mais sobre HTTP"
  [Veja o exemplo]: https://raw.github.com/gist/3734844/ca93585721523b5ee02e50678951a3f771346729/main.c
  [escreveu um bom exemplo um pouco mais complexo utilizando a linguagem *C*]: http://www.jmarshall.com/easy/cgi/portuguese/getcgi.c.txt
    "Veja outro exemplo de C com CGI"
  [1]: https://raw.github.com/gist/3734844/af5ecfb342fe1dd4c95c519cc3e34ffdf8db4fba/vars.c
  [multiplexação]: http://pt.wikipedia.org/wiki/Multiplexador
    "Leia mais sobre Multiplexadores na Wikipedia"
  [2]: http://www.nongnu.org/fastcgi/#multiplexing
    "The wonders of multiplexing"
  [recompilar o seu *PHP*]: http://redmine.lighttpd.net/projects/1/wiki/Docs_ModFastCGI#FastCGI-and-Programming-Languages
    "Lighttp - the FastCGI Interface"
  [aplicação em *C* com *FastCGI*]: http://www.fastcgi.com/devkit/doc/fastcgi-prog-guide/ch2c.htm
    "Developing FastCGI Applications in C"
  [*mod python*]: http://www.modpython.org/
    "Leia mais sobre o mod_python"
  [especificação]: http://www.python.org/dev/peps/pep-0333/
    "Leia a PEP 333, especificação do WSGI"
  [3]: https://raw.github.com/gist/3734844/31189e743f9826ce38d8b9d5a7d34b46b812314a/main.py
  [4]: https://raw.github.com/gist/3734844/826a348a75ed2b12f50af6657f408cd79c44d39c/wsgi.py
  [*HTML*]: {tag}html 
    "Leia mais sobre HTML"
  [sequencial]: http://docs.python.org/2/library/stdtypes.html#sequence-types-str-unicode-list-tuple-bytearray-buffer-xrange
    "Leia sobre tipos sequenciais no Python"
  [*wsgiref*]: http://docs.python.org/2/library/wsgiref.html
    "Saiba mais direto da documentação do Python"
  [*flup*]: http://trac.saddi.com/flup "Saiba mais sobre"
  [configurar o seu servidor *Web*]: http://docs.python.org/2/howto/webservers.html
    "HOWTO Use Python in the web"
  [mod_wsgi]: http://code.google.com/p/modwsgi/
    "Página do módulo no Google Code"
  [5]: http://klauslaube.com.br/tags/nginx/ "Leia mais sobre Nginx"
  [*NgxWSGIModule*]: http://wiki.nginx.org/NgxWSGIModule
    "Veja mais na documentação do Nginx"
  [configurar o seu *Apache*]: http://code.google.com/p/modwsgi/wiki/QuickConfigurationGuide
    "Veja instruções para configurar o Apache com mod_wsgi"
  [6]: https://raw.github.com/gist/3734844/b9067ea2a6ad12eba61b0f2ad3a20fa01a4a1431/http_mod_wsgi.conf
  [similar ao esquema utilizado pelo *FastCGI*]: http://code.google.com/p/modwsgi/#Server_Performance
    "Leia mais sobre performance com mod_wsgi"
  [*Gunicorn*]: http://gunicorn.org/
    "Veja mais sobre este servidor WSGI"
  [*uWSGI*]: http://projects.unbit.it/uwsgi/
    "Um rápido servidor WSGI escrito em C"
  [*Tornado*]: http://www.tornadoweb.org/documentation/wsgi.html
    "Saiba mais sobre o suporte do Tornado ao WSGI"
  [*proxy* reverso]: http://pt.wikipedia.org/wiki/Proxy_reverso
    "Leia mais sobre Proxy Reverso na Wikipedia"
  [balanceador]: http://wiki.nginx.org/LoadBalanceExample
    "Veja exemplo de uso do Nginx como balanceador"
  [escalar]: http://docs.gunicorn.org/en/latest/design.html#how-many-workers
    "Veja como utilizar workers com Gunicorn"
  [*deploy* de aplicações *Python* para o *Heroku*]: https://devcenter.heroku.com/articles/python#using-a-different-wsgi-server
    "Using a different WSGI server - Heroku"
  [*Nginx* para se comunicar com servidores *WSGI*]: http://mirobetm.blogspot.com.br/2012/03/ive-been-lighttpd-fastcgi-django-user.html
    "Gunicorn + Nginx - a much better way to deploy your Django website"
  [*gevent*]: http://www.gevent.org/gevent.wsgi.html
    "Servindo aplicações WSGI com gevent"
  [sistema de provisionamento automático]: http://puppetlabs.com/
    "IT Automation Software for System Administrators"
  [*Django Documentation – How to use Django with FastCGI, SCGI, or AJP*]: https://docs.djangoproject.com/en/dev/howto/deployment/fastcgi/
    "Exemplo de uso do Django com FastCGI"
  [*FastCGI – The Forgotten Treasure*]: http://www.nongnu.org/fastcgi/
    "Material muito interessante sobre o protocolo FastCGI e seu uso com C++"
  [*FastCGI – A High-Performance Web Server Interface*]: http://www.fastcgi.com/drupal/node/6?q=node/15
    "Um documento bem objetivo, detalhando os diferenciais em usar o FastCGI"
  [*Gunicorn – Python WSGI HTTP Server for Unix*]: http://gunicorn.org/
    "Conheça o Gunicorn e descubra as vatangens de possuir um servidor WSGI"
  [*irt.org – Speed Thrills: CGI Please... and Fast!*]: http://www.irt.org/articles/js172/
    "Artigo de 1999 detalhando algumas características do CGI e do FastCGI"
  [*James Marshal* – *CGI* realmente fácil]: http://www.jmarshall.com/easy/cgi/portuguese/
    "Bom artigo, resumindo muito bem o funcionamento do CGI"
  [*modwsgi – Python WSGI adapter module for Apache*]: http://code.google.com/p/modwsgi/
    "Veja a página oficial do projeto"
  [*PEP 333 – Python Web Server Gateway Interface*]: http://www.python.org/dev/peps/pep-0333/
    "Leia a especificação direto do portal da linguagem Python"
  [*Python Documentation – HOWTO Use Python in the web*]: http://docs.python.org/howto/webservers.html
    "Compreenda a diferença do uso do Python com CGI, FastCGI, mod_python, mod_wsgi e servidores WSGI"
  [*W3C – Common Gateway Interface*]: http://www.w3.org/CGI/
    "Leia mais sobre a especificação do CGI"
  [*Wikipedia – Common Gateway Interface*]: http://en.wikipedia.org/wiki/Common_Gateway_Interface
    "Leia mais no artigo da Wikipedia"
  [*Wikipedia – FastCGI*]: http://en.wikipedia.org/wiki/FastCGI
    "Leia mais no artigo da Wikipedia"
  [*Wikipedia – Web Server Gateway Interface*]: http://en.wikipedia.org/wiki/Web_Server_Gateway_Interface
    "Leia mais no artigo da Wikipedia"
  [*XML.com – Introducing WSGI: Python’s Secret Web Weapon*]: http://www.xml.com/pub/a/2006/09/27/introducing-wsgi-pythons-secret-web-weapon.html
    "Artigo de 2006 explicando os principais benefícios do uso do WSGI"
