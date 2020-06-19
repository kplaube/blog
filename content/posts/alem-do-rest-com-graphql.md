---
title: Além do REST com GraphQL
date: 2020-06-01 12:00:00
tags: ["desenvolvimento-web", "rest", "graphql", "api"]
slug: alem-do-rest-com-graphql
thumbnail: ./images/graphql-logo.png
serie: Além do REST
---

Construir [_APIs_](/tag/api.html "Leia mais sobre API") virou uma das coisas mais comuns no que tange
o [desenvolvimento _web_](/tag/desenvolvimento-web.html "Leia mais sobre Desenvolvimento Web"). Não obstante,
escolher uma biblioteca ou _framework_ com bom suporte a [_REST_](/tag/rest.html "Leia mais sobre REST")
é parte fundamental da tomada de decisão ao iniciar um projeto.

Em tempos de [_API-First_](/tag/api-first.html "Leia mais sobre API-First"), debater arquitetura, _design_, e considerar
opções deve fazer parte da concepção de um produto (por mais "padrãozinho" que ele possa parecer). E nessa etapa,
questionar a adoção do _REST_ pode resultar em impactos positivos, dependendo do contexto e público alvo.

Uma das alternativas é o _GraphQL_. E agora, com o _hype_ ao redor da tecnologia um pouco mais frio, dá para falar
sobre ela com menos paixão e mais razão.

## Antes de ir: O que é REST, mesmo?

Para a comparação ficar mais rica, é fundamental que haja um entendimento sobre o que é _REST_. Já exploramos
o conceito nos dois artigos abaixo:

- [REST - Parte 1](/2016/01/06/rest-parte-1.html "Leia mais sobre o conceito e um comparativo com SOAP")
- [REST - Parte 2](/2016/05/20/rest-parte-2.html "Veja uma aplicação prática com Python e Hug")

Ou se você preferir, o [artigo na _Wikipedia_](https://en.wikipedia.org/wiki/Representational_state_transfer "REST na Wikipedia")
é uma referência bem completa.

## O que é GraphQL?

Bom, definitivamente não é mais um _framework_ [_Javascript_](/tag/javascript.html "Leia mais sobre Javascript").
E dizer que é unicamente um _query language_ é uma afirmação incompleta.

Segundo [_Adriano Lisboa_](https://adrianolisboa.com/o-minimo-que-voce-precisa-saber-sobre-graphql-para-nao-passar-vergonha-em-uma-conversa/ "O mínimo que você precisa saber sobre GraphQL para não passar vergonha em uma conversa"):

> Resumidamente, GraphQL é uma especificação open-source de uma linguagem de consulta criada pelo Facebook.

Hoje mantido pela [_GraphQL Foundation_](https://foundation.graphql.org/ "An open and neutral home for the GraphQL community"), sob a licença [_OWFa 1.0_](https://github.com/graphql/graphql-spec/blob/master/signed-agreements/Facebook-GraphQL-OWFa1.0.pdf "Open Web Foundation License"), o _GraphQL_
(_Graph Query Language_, ou Linguagem de Consulta de Grafos) não só é uma linguagem de consulta, como também de manipulação.

É possível fazer uma analogia ao _SQL_ (Linguagem de Consulta Estruturada), que também é uma especificação que
possui diferentes implementações, e que realiza consulta e manipulação de dados. Só que ao contrário (das implementações) do _SQL_, o _GraphQL_ não é um banco de dados,
como ilustra o [_How to GraphQL_](https://www.howtographql.com/basics/0-introduction/ "Basics Tutorial - Introduction"):

> GraphQL is often confused with being a database technology. This is a misconception, GraphQL is a query language for APIs - not databases. In that sense it’s database agnostic and effectively can be used in any context where an API is used.

E por ser uma linguagem de consulta para _APIs_, que ela se encaixa como uma alternativa ao _REST_.

## Qual a sua principal vantagem em relação ao REST?

Um dos problemas fundamentais do _REST_ é a flexibilidade do dado sendo transmitido. Quando diferentes
clientes, com diferentes necessidades, começam a consumir a sua _API_, é possível que você enfrente um fenômeno
conhecido por _over-fetching_ e _under-fetching_:

- **over-fetching:** É quando você está recebendo dados demais, não necessários para o seu propósito, em sua requisição;
- **under-fetching:** O oposto. Quando você não recebe dados o suficiente, e precisa realizar outras chamadas para cumprir o seu propósito.

![Diagrama com três diferentes chamadas REST para os endpoints de perfil do usuário, artigos, e seguidores](./images/graphql-rest-calls.png "Imagine uma aplicação com a necessidade de exibir o perfil do usuário, seus artigos e seguidores, em uma mesma visualização (howtographql.com)")

Já com a flexibilidade do _GraphQL_, é possível obter toda a informação necessária através de uma consulta, como ilustrado
no diagrama abaixo:

![Diagrama com apenas uma requisição HTTP, utilizando GraphQL, e consultando por perfil do usuário, seus artigos e seguidores](./images/graphql-query.png "Através de uma requisição HTTP, o cliente é capaz de obter os dados na medida certa (howtographql.com)")

Vale lembrar que existe complementos ao _REST_ que possibilitam uma maior flexibilidade do
_payload_ (como por exemplo, passar quais campos você quer coletar através de _query string_),
ainda assim é necessário salientar a legibilidade e até mesmo elegância da consulta realizada no exemplo acima.

[Leia sobre outras vantagens do _GraphQL_ em comparação ao _REST_](https://dev.to/mshossain110/3-major-rest-api-problem-can-solve-using-graphql-1dg2 "3 major REST API problem can solve using GraphQL").

## Qual a sua principal desvantagem em relação ao REST?

"Cada escolha uma renúncia", já dizia o poeta.

O _GraphQL_ não é bala de prata, e possui desvantagens quando comparado ao _REST_. [Essa _thread_ no _Stackoverflow_ lista algumas delas](https://stackoverflow.com/questions/40689858/are-there-any-disadvantages-to-graphql "Are there any disadvantages to GraphQL?").

Talvez a mais popular seja a ausência de _cache built-in_. Com _REST_, por utilizarmos o protocolo _HTTP_, os mecanismos
para _caching_ já estão lá. [Dos cabeçalhos utilizados para indicar _caching_ à compreensão dos clientes](/2012/05/14/o-cache-e-o-http.html "O cache e o HTTP"). Diferentes recursos podem ter estratégias de _caching_ diferentes, uma
vez que eles são servidos em diferentes _endpoints_.

Com o _GraphQL_ utilizamos apenas um _endpoint_. Portanto, precisamos implementar uma camada extra de _caching_. [Nada impossível de ser alcançado](https://graphql.org/learn/caching/ "GraphQL: Caching"),
mas ainda assim, uma complexidade a mais.

[Veja mais desvantagens em relação ao _REST_](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/ "REST vs GraphQL APIs, the Good, the Bad, the Ugly").

## Como funciona?

## Um pouquinho de prática

## Então devo adotar o GraphQL?

Possivelmente. E isso não significa necessariamente abandonar o _REST_.

A retórica do "GraphQL ser o substituto do REST", inclusive, foi um dos motivos do meu ceticismo em relação ao mesmo por muito tempo.

Uma das análises mais sóbrias que encontrei foi da [_ThoughtWorks_](https://www.thoughtworks.com/radar/languages-and-frameworks/graphql "Technology Radar"), que categoriza o _GraphQL_ como `ASSESS` (ou seja, recomendada a exploração para compreender
como ele impactará o seu _business_):

> We've seen many successful GraphQL implementations on our projects. We've seen some interesting patterns of use too, including GraphQL for server-side resource aggregation. That said, we've concerns about misuse of this framework and some of the problems that can occur. Examples include performance gotchas around N+1 queries and lots of boilerplate code needed when adding new models, leading to complexity. There are workarounds to these gotchas such as query caching. Even though it's not a silver bullet, we still think it's worth assessing as part of your architecture.

Se o seu produto compartilha do mesmo contexto do _Facebook_, de ter controle total do _backend_ e do
_client_ (_web_ e _mobile_), utilizar o _GraphQL_ faz muito sentido. Ou ainda, se a sua motivação for de reduzir o número de chamadas _HTTP_, assim como foi a do
_Github_, é um argumento completamente válido para a adoção da linguagem.

O que talvez precise ficar claro na sua tomada de decisão é que um não substitui o outro completamente, como afirma
[_Mike Stowe, no ProgrammableWeb_](https://www.programmableweb.com/news/just-because-github-has-graphql-api-doesnt-mean-you-should-too/analysis/2016/09/21 "Just Because Github Has a GraphQL API Doesn’t Mean You Should Too"):

> However, that does not mean that in GitHub’s case, pushing out a public GraphQL API was the right choice. In an effort to reduce calls, they are giving up the very layers of flexibility that I believe will drive future APIs. In essence, they chose a solution to one problem they were facing, but in doing so disregarded solutions for the problems REST was designed to solve (...)

Dependendo da sua _stack_, disponibilizar os dois formatos não é nenhum sacrifício. Aliás, ter o _GraphQL_ como uma
espécie de _API Gateway_, agregando o resultado de demais _endpoints_ _REST_, [parece ser uma tendência](https://levelup.gitconnected.com/graphql-is-the-new-api-gateway-383edeed4bcd "GraphQL is the New API Gateway").

![Topologia de serviços quando adicionado GraphQL como API Gateway](./images/graphql-api-gateway.png "Exemplo de uso de GraphQL como API Gateway, à frente de outras APIs GraphQL e REST (labs.getninjas.com.br)")

## Considerações finais

Para mim, a linguagem brilhou quando migrei o _blog_ para [_Gatsby_](https://www.gatsbyjs.org/ "GatsbyJS"). A flexibilidade e assertividade que ela me proporcionou,
mesmo em um ambiente de [_static site generator_](/tag/static-site-generators.html "Leia mais sobre sites estáticos"), me deixou impressionado e até mesmo apaixonado por toda a ideia por trás da tecnologia.

E esse caso de uso, na minha opinião, é motivação o suficiente para pelo menos compreendermos a linguagem.
Se há ceticismo em relação ao uso dela em uma solução que já existe, talvez ele dê uma abrandada quando
você experimentá-la em um contexto diferente.

Como o livro ["GraphQL or Bust: To Use It Or Not: That is the Question"](https://www.goodreads.com/book/show/40861856-graphql-or-bust "Veja no Goodreads") dá a entender, não tem almoço grátis:

> GraphQL has often been sold as a perfect solution for every problem, but the reality is that it meets one requirement better than most other, and if that’s not part of your requirements, it may not be the best solution for your implementation.

Até a próxima.

https://graphql.org/learn/

https://medium.com/@paigen11/what-is-graphql-really-76c48e720202#:~:text=GraphQL%20does%20not.&text=One%20thing%20that%20cannot%20be,where%20an%20API%20is%20used.

https://www.howtographql.com/basics/1-graphql-is-the-better-rest/

https://graphql.org/swapi-graphql

## Referências

- [Adriano Lisboa: O mínimo que você precisa saber sobre GraphQL para não passar vergonha em uma conversa](https://adrianolisboa.com/o-minimo-que-voce-precisa-saber-sobre-graphql-para-nao-passar-vergonha-em-uma-conversa/)
- [API Evangelist: GraphQL Seems Like We Do Not Want To Do The Hard Work Of API Design](http://apievangelist.com/2016/08/30/graphql-seems-like-we-do-not-want-to-do-the-hard-work-of-api-design/)
- [Apollo Blog: GraphQL - The next generation of API design](https://www.apollographql.com/blog/graphql-the-next-generation-of-api-design-f24b1689756a#.6hh9mb30w)
- [DZone: GraphQL - Core Features, Architecture, Pros, and Cons](https://dzone.com/articles/graphql-core-features-architecture-pros-and-cons)
- [GetNinjas: Sharing data in a Microservices Architecture using GraphQL](https://labs.getninjas.com.br/sharing-data-in-a-microservices-architecture-using-graphql-97db59357602)
- [Gitconnected: GraphQL is the New API Gateway](https://levelup.gitconnected.com/graphql-is-the-new-api-gateway-383edeed4bcd)
- [How to GraphQL](https://www.howtographql.com/)
- [Medium: What is GraphQL, really?](https://medium.com/@paigen11/what-is-graphql-really-76c48e720202)
- [Moesif: REST vs GraphQL APIs, the Good, the Bad, the Ugly](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/)
- [Stable Kernel: Advantages and Disadvantages of GraphQL](https://stablekernel.com/article/advantages-and-disadvantages-of-graphql/)
- [Stackoverflow: Are there any disadvantages to GraphQL?](https://stackoverflow.com/questions/40689858/are-there-any-disadvantages-to-graphql)
- [ThoughyWorks: Technology Radar - GraphQL](https://www.thoughtworks.com/radar/languages-and-frameworks/graphql)
- [Wikipedia: GraphQL](https://en.wikipedia.org/wiki/GraphQL)
