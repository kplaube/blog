Title: Entendendo os Cookies e Sessões
Date: 2012-04-05 16:53:12
Category: desenvolvimento
Tags: desenvolvimento, infraestrutura, web, cookies, sessões, php
Slug: entendendo-os-cookies-e-sessoes
meta_description: O protocolo HTTP é stateless, ou seja, não mantém o estado de uma requisição. Para suprir esta necessidade, são apresentados os Cookies e Sessões.


{% img align-left /images/blog/cookies.jpg 180 180 Representação de cookies %}
Por muito tempo eu abstrai o conceito de
*cookies* e sessões, e nunca cheguei a prestar muita atenção no seu
funcionamento. Recentemente, trabalhando com uma infra mais preocupada
com a segurança, disponibilidade e performance, tive a oportunidade de
relembrar e me aprofundar em alguns conceitos e práticas.

O que já sabia é que os *cookies* são “persistências temporárias” feitas
no lado do usuário, e sessões são persistências dependentes de
*cookies*, mas realizadas no lado do servidor.

<!-- PELICAN_END_SUMMARY -->

A minha felicidade é que até aí, nada mudou :)


Para que servem Cookies e Sessões?
----------------------------------

O [protocolo *HTTP*][] é *stateless*, ou seja, ele não mantém um
estado/conexão. Toda a interação que o seu cliente fizer com um servidor
[*Web*][] acarretará em uma nova requisição e resposta.

As requisições são independentes e possuem um tempo de vida (conexão,
envio de mensagem, resposta, encerramento da conexão). O servidor *Web*
não é capaz de identificar se duas requisições vieram de um mesmo
navegador, e o mesmo não faz nenhum gerenciamento em memória para que
mensagens sejam compartilhadas entre requisições.

É para suprir esta necessidade que entram os *cookies* e sessões.


Cookies
-------

Através de *cookies* o servidor *Web* é capaz de trocar informações de
estado com o navegador do usuário. Desse modo, somos capazes de
adicionar produtos a um carrinho de compras, sem perder estas
informações ao mudar de página, sair do *website* ou até mesmo fechar o
navegador.

Tecnicamente falando, um *cookie* é uma pequena quantidade de informação
persistida temporariamente pelo navegador. Os navegadores normalmente
limitam o tamanho dos *cookies* em até 4KB, e apagam *cookies* com a
data de “validade vencida”.

Para entender como essa troca de informação é feita, vamos criar um
*cookie* com o [*PHP*][]:

    ::php
    <?php
        // cookies.php
        
        if (isset($_COOKIE['cookie_teste'])) {
            echo 'Você JÁ passou por aqui!';
        } else {
            echo 'Você NUNCA passou por aqui.';
            setcookie('cookie_teste', 'Algum valor...', time() + 3600);
        }
    ?>

O código acima verifica se o *cookie* atendendo pelo identificador
**“cookie\_teste”** já existe, caso não exista, cria um *cookie* com
identificador **“cookie\_teste”**, valor **“Algum valor...”** e com **1
hora de vida** (a hora atual mais 3600 segundos).

Quando visitamos pela primeira vez o **cookies.php**, temos a seguinte
resposta:

    ::bash
    $ curl -I localhost/cookies.php

    HTTP/1.1 200 OK
    Date: Wed, 04 Apr 2012 00:35:33 GMT
    Server: Apache/2.2.21 (Unix) mod_ssl/2.2.21 OpenSSL/0.9.8r DAV/2 PHP/5.3.8
    X-Powered-By: PHP/5.3.8
    Set-Cookie: cookie_teste=Algum+valor...; expires=Wed, 04-Apr-2012 01:35:33 GMT
    Content-Type: text/html

Através da função **setcookie** do *PHP*, estamos enviando um item
chamado **Set-Cookie** no cabeçalho *HTTP* da resposta. É através deste
que o navegador entende que deve armazenar o valor **“Algum valor…”**,
atendendo pelo identificador **“cookie\_teste”**, e que esta informação
expira em 1 hora (verifique a data da requisição e a data de validade do
*cookie*).

Na próxima vez que o navegador acessar esta *URL*, ele verificará se
possui algum *cookie* para aquele domínio e *path*, caso exista, ele
passa as informações do *cookie* no cabeçalho da requisição. Desse modo,
a nossa aplicação é capaz de perceber a existência de um *cookie* (no
caso do *PHP*, através do *array* global **$\_COOKIE**).

Abaixo, um exemplo de requisição utilizando o *Google Chrome*:

{% img align-center /images/blog/exemplo-php-cookies.png 610 315 Item cookie no cabeçalho de resposta da requisição HTTP %}

[Clique para ampliar](/images/blog/exemplo-php-cookies.png)

Se excluirmos os *cookies*, ou o tempo de expiração for atingido, o
navegador deixa de anexar esta informação ao cabeçalho da requisição.


Sessões
-------

As sessões têm um princípio similar aos *cookies*, só que o
armazenamento do estado é feito pelo servidor *Web*, e não pelo
navegador.

Por exemplo, quando construímos uma aplicação que necessita de
autenticação, no momento em que o usuário efetuar o *login*, podemos até
permitir que algumas informações sejam armazenadas em um *cookie*, mas
dados mais “sensíveis”, como usuário e *e-mail*, são mais interessantes
de serem guardadas em sessões. Isto, pois **não é seguro** que esse tipo
de informação fique “viajando” pela *Web*.

Mas se o *HTTP* é *stateless*, e o servidor *Web* não tem como
identificar que a requisição anterior veio do meu *browser*, como é que
ele sabe que as informações que eu guardei em sessão são de fato minhas?
Simples… **através de *cookies*!**

Quando iniciamos uma sessão, é enviado um *cookie* para o navegador, com
um valor único que corresponde a sessão aberta no servidor *Web*. Vamos
ilustrar através do exemplo abaixo:

    ::php
    <?php
        // sessions.php

        session_start();
        
        if (isset($_SESSION['usuario'])) {
            echo "Bem vindo {$_SESSION['usuario']}!";
        } else {
            echo 'Você NUNCA passou por aqui.';
            $_SESSION['usuario'] = 'João';
        }
    ?>

O código acima inicia uma sessão através do método **session\_start**.
Na primeira visita, será criado um índice **usuario** com o valor
**João**. A resposta da nossa requisição será a seguinte:

    ::bash
    $ curl -I localhost/sessions.php

    HTTP/1.1 200 OK
    Date: Wed, 04 Apr 2012 01:51:57 GMT
    Server: Apache/2.2.21 (Unix) mod_ssl/2.2.21 OpenSSL/0.9.8r DAV/2 PHP/5.3.8
    X-Powered-By: PHP/5.3.8
    Set-Cookie: PHPSESSID=4h91dkp7pcp8184nil8rt9ok13; path=/
    Expires: Thu, 19 Nov 1981 08:52:00 GMT
    Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0
    Pragma: no-cache
    Content-Type: text/html

Por partes:

* Como mencionei, **Set-Cookie** foi retornado com um identificador
  (**PHPSESSID**) e um valor que corresponde a sessão aberta no
  servidor (**4h91dkp7pcp8184nil8rt9ok13**). O complemento **path**
  está “dizendo” ao navegador que aquele *cookie* tem validade por
  todo o domínio (ou seja, valerá inclusive para outros arquivos *PHP*
  em outras subpastas). Quando não é informada a data de expiração, o
  navegador manterá o *cookie* até o momento em que ele for fechado.
* O *PHP* tomou a liberdade de adicionar alguns cabeçalhos de controle
  de *cache* (**Expires**, **Cache-Control** e **Pragma**) à nossa
  resposta. Em resumo, o servidor está dizendo ao navegador para que
  não armazene esta página em *cache*. Estes valores podem ser
  alterados em [tempo de desenvolvimento][], ou [através do **php.ini**][].
* Em nenhum momento o *Apache* informou ao navegador que temos um
  índice **usuario** com o valor **João**. Estas informações estão
  disponíveis somente no lado do servidor.

Quando visitarmos o **sessions.php** novamente, o navegador informará ao
servidor que ele possui um *cookie* chamado **PHPSESSID**. A partir daí
o *PHP* pega o valor deste *cookie*, recupera a sessão da memória (ou de
um banco de dados, ou arquivos em disco) e atribui este valor ao *array*
global **$\_SESSION**.

O nome do *cookie* varia de linguagem para linguagem e até mesmo de
*framework* para *framework*. Por exemplo, no [*Django*][] ele é chamado
por padrão de **sessionid**, no [*CodeIgniter*][] é chamado de
**ci\_session**.


Considerações finais
--------------------

Gostei muito de me aprofundar um pouquinho mais neste assunto, e gostei
mais ainda de poder traduzir este aprendizado através deste *post*.

É claro que há alguns cuidados com segurança quando o assunto é
*cookies* e sessões, bem como considerações em relação ao uso de
*cache*. Pretendo falar mais sobre esses temas em *posts* vindouros.

Até a próxima…


Referências
-----------

* [*PHP Manual – Session Handling*][]
* [*Stanford.edu – CS 142: Cookies and Session*][]
* [*Wagner Elias* – *HTTP Essentials*][]
* [*Wagner Elias* – Segurança de *Cookies* de sessão e *HTTPOnly*][]
* [*Wikipedia – HTTP Cookie*][]


  [protocolo *HTTP*]: http://wagnerelias.com/2009/02/06/http-essentials/
    "Conheça mais sobre o protocolo HTTP"
  [*Web*]: {tag}web
    "Leia mais sobre Web"
  [*PHP*]: {tag}php
    "Leia mais sobre PHP"
  [tempo de desenvolvimento]: http://www.php.net/manual/en/ref.session.php
    "PHP: Session functions"
  [através do **php.ini**]: http://www.php.net/manual/en/session.configuration.php
    "PHP: Runtime configuration"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [*CodeIgniter*]: {tag}codeigniter
    "Leia mais sobre CodeIgniter"
  [*PHP Manual – Session Handling*]: http://www.php.net/manual/en/book.session.php
    "Confira a documentação oficial do PHP que fala sobre Sessões"
  [*Stanford.edu – CS 142: Cookies and Session*]: http://www.stanford.edu/~ouster/cgi-bin/cs142-fall10/lecture.php?topic=cookie
    "Material resumido, mas muito bom, sobre sessões e Cookies"
  [*Wagner Elias* – *HTTP Essentials*]: http://wagnerelias.com/2009/02/06/http-essentials/
    "Wagner nos apresenta de forma objetiva o funcionamento do protocolo HTTP"
  [*Wagner Elias* – Segurança de *Cookies* de sessão e *HTTPOnly*]: http://wagnerelias.com/2009/04/21/seguranca-de-cookies-de-sessao-e-httponly/
    "Entenda as falhas de segurança apresentadas com o uso de sessões e cookies"
  [*Wikipedia – HTTP Cookie*]: http://en.wikipedia.org/wiki/HTTP_cookie
    "Leia este bom artigo em inglês sobre Cookies"
