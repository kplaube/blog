Title: Uma ode ao PostgreSQL
Date: 2013-01-31 20:39:21
Category: desenvolvimento
Tags: banco-de-dados, ambiente-de-desenvolvimento, postgres, objeto-relacional
Slug: uma-ode-ao-postgresql
meta_description: O Postgres está sob a licença PostgreSQL License, muito similar a BSD e MIT, que nos permite o livre uso, cópia, modificação e distribuição. Assumidamente o “banco de dados open source mais avançado do mundo”, ele é conhecido pela sua estabilidade.


{% img representative-image /images/blog/postgresql-logo.png 180 180 Logotipo do PostgreSQL %}

O [*MySQL*][] é um dos meus mais leais companheiros de
projetos, desde os meus tempos de [*PHP*][] até projetos mais recentes
com o [*Python*][]. A sua agilidade e facilidade são indiscutivelmente
boas, tanto que renderam ao projeto um “domínio global” no ramo.

<!-- PELICAN_END_SUMMARY -->

Hoje, sob “cuidados” da [*Oracle*][], o projeto tem causado [certas desconfianças][].
A criação de [um *fork*][] pelo autor original não
ajudou, e isso [abriu margem][] para um velho, confiável e simpático
banco de dados: o [*Postgres*][].

Qual o motivo de começar um *post* sobre o *Postgres* falando do
*MySQL*? Eu sempre me apoiei na “facilidade de uso” na hora de escolher
entre os dois, e só recentemente me “obriguei” a experimentar o
*Postgres* em alguns projetos. O resultado foi a total satisfação com a
experiência, e a (surpreendente) conclusão que ele é tão fácil de mexer
quanto o seu concorrente.


O que há de especial no Postgres?
---------------------------------

O *Postgres* está sob a licença [*PostgreSQL License*][], muito similar
a *BSD* e *MIT*, que nos permite o livre uso, cópia, modificação e
distribuição. Assumidamente o “banco de dados *open source* mais
avançado do mundo”, ele é conhecido pela sua estabilidade, servindo
[projetos de larga escala em todo o mundo][]. Embora eu nunca pude por à
prova a sua confiabilidade e escalabilidade, o fato de ele ser usado
como [banco relacional pelo *Heroku*][] apresenta credenciais o
suficiente.

Entre as [diversas funcionalidades do *Postgres*][], o suporte a
operações assíncronas, o [*Full Text Search*][] e o [*PostGIS*][] se
mostraram um bom diferencial para mim. Este último na verdade trata-se
de uma extensão do *Postgres* (comprovando outra característica valiosa
do banco, a extensibilidade), e tive a oportunidade de utilizá-lo em um
projeto recente com [*Python*][1] e [*Django*][]. Embora a sua
implantação não tenha sido tão trivial quanto o esperado, o resultado
atendeu completamente as expectativas.

Outro ponto que acho muito bacana no projeto, é o seu [compromisso em seguir o padrão *SQL*][].
Atualmente (versão 9.2), o *Postgres* se
compromete em atender o padrão *ANSI-SQL: 2008*. Acho muito bacana esse
compromisso, principalmente se formos levar em consideração a
[quantidade de dialetos *SQL*][] que temos hoje em dia.

Junte isso tudo a facilidade de uso, e temos uma excelente ferramenta à
nossa disposição. Ainda não está satisfeito? Então vamos falar um pouco
sobre uma das características mais marcantes (e discutidas) do
*Postgres*: O modelo objeto-relacional.


Objeto-Relacional?
------------------

A definição de banco de dados objeto-relacional da [*Wikipedia*][] é a
seguinte:

> (...) é um sistema de gerenciamento de banco de dados
> (SGBD) semelhante a um banco de dados
> relacional, porém com um modelo de banco de dados orientado a objetos:
> objetos, classes e herança são suportados diretamente nos esquemas do
> banco de dados e na linguagem de consulta. Além disso, ele suporta
> extensão do modelo de dados com a personalização de tipos de dados e
> métodos.

Basicamente, um banco de dados objeto-relacional armazena os seus dados
de forma “relacional”, mas é capaz de abstrair o seu acesso através de
objetos, possibilitando assim a construção de operações mais complexas
que podem envolver conceitos da orientação a objetos. No *Postgres*,
tabelas, relacionamentos, restrições e *triggers* são considerados
objetos.

Mas não são os “objetos” que vemos nas linguagens de programação. O
termo “objeto” aqui é um pouco diferente (e eu diria até limitado),
embora podemos encontrar [heranças][], [polimorfismo][] e [object ids][].
No caso do *Postgres*, o “objeto” de “objeto-relacional” está
ligado a todos os aspectos citados anteriormente, mais a organização dos
“recursos”, como na utilização de [*schemas*][], e na criação de tipos e
manipulação de dados complexos.

Ou seja, você não verá uma notação como essa em uma *query*:

    ::sql
    SELECT NOW().to_char('HH12:MI:SS');

E sim, a notação utilizando funções:

    ::sql
    SELECT to_char(NOW(), 'HH12:MI:SS');

Mas em compensação, você verá que **to\_char** é uma [função polimórfica][]:

    ::sql
    SELECT to_char(10.3333333, '99.99');

Se você não está satisfeito, e não se sente confortável com o termo
“objeto” usado pelo *Postgres*, fique tranquilo… [mais pessoas carregam esta angústia][].
*Michael Stonebraker* criou [um esquema para identificar um *ORDBMS*][],
e partindo dele sou obrigado a concordar que
o *Postgres* é de fato um banco objeto-relacional quando me deparo com o
seguinte cenário:

    ::sql
    CREATE TYPE inventory_item AS (
        name            text,
        supplier_id     integer,
        price             numeric
    );

    CREATE TABLE on_hand (
        item      inventory_item,
        count     integer
    );
    
    INSERT INTO on_hand VALUES (ROW('fuzzy dice', 42, 1.99), 1000);
    INSERT INTO on_hand VALUES (ROW('cards', 42, 6.99)::inventory_item, 500);

Uma manipulação complexa, com tipos criados pelo próprio usuário,
utilizando *queries*.


Considerações finais
--------------------

O *Postgres* é poderoso! Disso eu não tinha dúvidas. Mas ficar mais
próximo do banco me fez perceber o quanto ele pode agregar ao projeto.
Se em um próximo projeto você estiver em dúvida, e achar que a
utilização dele pode ser complicada, eu recomendo que experimente.

Até a próxima…


Referências
-----------

* [*Perspectives on LedgerSMB – O/R Modelling Part 1: Intro to PostgreSQL as Object-Relational Database Management System*][]
* [*Perspectives on LedgerSMB – Three Approaches to Object-Relational Databases: PostgreSQL, Oracle, and Informix*][]
* [*PostgreSQL – About*][]
* [*Web Services and Service-Oriented Architectures – Stonebraker’s DBMS Matrix*][]
* [*WikiVS – MySQL vs. PostgreSQL*][]


  [*MySQL*]: http://www.mysql.com/
    "Leia mais sobre o MySQL na página oficial do projeto"
  [*PHP*]: {tag}php
    "Leia mais sobre PHP"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*Oracle*]: http://www.oracle.com/
    "Página oficial da Oracle"
  [certas desconfianças]: http://www.infoq.com/br/news/2012/08/oracle-mysql-preocupa#.UDfedu0QkJA.twitter
    "MySQL será fechado?"
  [um *fork*]: https://mariadb.org/pt-br/
    "Conheça o MariaDB"
  [abriu margem]: http://br-linux.org/2013/mais-um-opensuse-confirma-que-vai-abandonar-mysql-e-adotar-mariadb/
    "OpenSUSE deixa o MySQL"
  [*Postgres*]: http://www.postgresql.org/
    "Página oficial do projeto"
  [*PostgreSQL License*]: http://www.postgresql.org/about/licence/
    "Leia mais sobre a licença PostgreSQL"
  [projetos de larga escala em todo o mundo]: http://www.postgresql.org/about/users/
    "Conheça alguns projetos relevantes que utilizam o Postgres"
  [banco relacional pelo *Heroku*]: https://postgres.heroku.com/postgres
    "Why Postres"
  [diversas funcionalidades do *Postgres*]: http://www.postgresql.org/about/featurematrix/
    "Feature Matrix"
  [*Full Text Search*]: http://www.postgresql.org/docs/9.2/static/textsearch.html
    "Leia mais sobre na documentação do Postgres"
  [*PostGIS*]: http://postgis.refractions.net/
    "Leia mais sobre PostGIS"
  [1]: {tag}python
    "Leia mais sobre Python"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [compromisso em seguir o padrão *SQL*]: http://www.postgresql.org/docs/9.2/static/features.html
    "SQL Conformance"
  [quantidade de dialetos *SQL*]: http://en.wikibooks.org/wiki/SQL_dialects_reference
    "SQL dialects"
  [*Wikipedia*]: http://pt.wikipedia.org/wiki/Banco_de_dados_objeto-relacional
    "Leia mas sobre Objeto-Relacional na Wikipedia"
  [heranças]: http://www.postgresql.org/docs/9.2/static/ddl-inherit.html
    "Leia mais sobre herança de tabelas no Postgres"
  [polimorfismo]: http://www.postgresql.org/docs/9.2/static/extend-type-system.html#EXTEND-TYPES-POLYMORPHIC
    "Leia mais sobre tipos polimórficos no Postgres"
  [object ids]: http://stackoverflow.com/questions/5625585/sql-postgres-oids-what-are-they-and-why-are-they-useful
    "Saiba mais sobre os OIDs"
  [*schemas*]: http://www.postgresql.org/docs/9.2/static/ddl-schemas.html
    "Leia mais sobre Schemas no Postgres"
  [função polimórfica]: http://www.postgresql.org/docs/8.3/static/xfunc-sql.html#AEN40446
    "Leia mais sobre funções polimórficas no Postgres"
  [mais pessoas carregam esta angústia]: http://www.postgresql.org/message-id/1335420139.28653.59.camel@jdavis
    "Devemos parar de usar o termo objeto no Postgres?"
  [um esquema para identificar um *ORDBMS*]: http://www.service-architecture.com/object-oriented-databases/articles/stonebrakers_dbms_matrix.html
    "Stonebraker's DBMS Matrix"
  [*Perspectives on LedgerSMB – O/R Modelling Part 1: Intro to PostgreSQL as Object-Relational Database Management System*]: http://ledgersmbdev.blogspot.com.br/2012/08/intro-to-postgresql-as-object.html
    "Leia mais sobre o modelo objeto-relacional do Postgres"
  [*Perspectives on LedgerSMB – Three Approaches to Object-Relational Databases: PostgreSQL, Oracle, and Informix*]: http://ledgersmbdev.blogspot.com.br/2012/10/three-approaches-to-object-relational.html
    "Leia o comparativo do approach de Postgres e Oracle em relação ao termo Object-Relational"
  [*PostgreSQL – About*]: http://www.postgresql.org/about/
    "Leia tudo sobre o Postgres"
  [*Web Services and Service-Oriented Architectures – Stonebraker’s DBMS Matrix*]: http://www.service-architecture.com/object-oriented-databases/articles/stonebrakers_dbms_matrix.html
    "Conheça a linha tênue que separa um ORDBMS de um ODBMS"
  [*WikiVS – MySQL vs. PostgreSQL*]: http://www.wikivs.com/wiki/MySQL_vs_PostgreSQL
    "Veja um comparativo entre MySQL e PostgreSQL"
