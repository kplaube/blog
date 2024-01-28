---
title: Além do REST com GraphQL
date: 2020-07-01 17:17:00
modified: 2023-09-30 11:31
tags: ["desenvolvimento-web", "rest", "graphql", "api", "pokemon"]
slug: alem-do-rest-com-graphql
thumbnail: /media/graphql-logo.png
serie: Além do REST
---

Construir [_APIs_](/tag/api.html "Leia mais sobre API") virou uma das coisas mais comuns no que tange
o [desenvolvimento _web_](/tag/desenvolvimento-web.html "Leia mais sobre Desenvolvimento Web"). Não obstante,
escolher uma biblioteca ou _framework_ com bom suporte a [_REST_](/tag/rest.html "Leia mais sobre REST")
é parte fundamental da tomada de decisão ao iniciar um projeto.

Em tempos de [_API-First_](/tag/api-first.html "Leia mais sobre API-First"), debater arquitetura, _design_, e considerar
opções deve fazer parte da concepção de um produto. E nessa etapa,
questionar a adoção do _REST_ pode resultar em impactos positivos, dependendo do contexto e público alvo.

![Grafos, árvores e florestas](/media/graph.jpg "Grafos! Grafos everywhere! (sitepoint.com)")

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

Hoje mantido pela [_GraphQL Foundation_](https://foundation.graphql.org/ "An open and neutral home for the GraphQL community"), sob a licença [_OWFa 1.0_](https://github.com/graphql/graphql-spec/blob/master/signed-agreements/Facebook-GraphQL-OWFa1.0.pdf "Open Web Foundation License"), o _GraphQL_ não só é uma linguagem de consulta, como também de manipulação.

É possível fazer uma analogia ao _SQL_ (Linguagem de Consulta Estruturada), que também é uma especificação que
possui diferentes implementações, e que realiza consulta e manipulação de dados. Só que ao contrário (das implementações) do _SQL_, o _GraphQL_ não é um banco de dados em si,
como ilustra o [_How to GraphQL_](https://www.howtographql.com/basics/0-introduction/ "Basics Tutorial - Introduction"):

> GraphQL is often confused with being a database technology. This is a misconception, GraphQL is a query language for APIs - not databases. In that sense it’s database agnostic and effectively can be used in any context where an API is used.

E por ser uma linguagem de consulta para _APIs_, que ela se encaixa como uma alternativa ao _REST_.

## Qual a sua principal vantagem em relação ao REST?

Um dos problemas fundamentais do _REST_ é a flexibilidade do dado sendo transmitido. Quando diferentes
clientes, com diferentes necessidades, começam a consumir a sua _API_, é possível que você enfrente um fenômeno
conhecido por _over-fetching_ e _under-fetching_:

- **over-fetching:** É quando você está recebendo dados demais, não necessários para o seu propósito, em sua requisição;
- **under-fetching:** O oposto. Quando você não recebe dados o suficiente, e precisa realizar outras chamadas para cumprir o seu propósito.

![Diagrama com três diferentes chamadas REST para os endpoints de perfil do usuário, artigos, e seguidores](/media/graphql-rest-calls.png "Imagine uma aplicação com a necessidade de exibir o perfil do usuário, seus artigos e seguidores, em uma mesma visualização (howtographql.com)")

Já com a flexibilidade do _GraphQL_, é possível obter toda a informação necessária através de uma consulta, como ilustrado
no diagrama abaixo:

![Diagrama com apenas uma requisição HTTP, utilizando GraphQL, e consultando por perfil do usuário, seus artigos e seguidores](/media/graphql-query.png "Através de uma requisição HTTP, o cliente é capaz de obter os dados na medida certa (howtographql.com)")

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

## Falando GraphQL

Possivelmente a melhor forma de adicionar o _GraphQL_ ao seu projeto é através de plataformas como o [_Apollo_](https://www.apollographql.com/ "Simplify app development by combining APIs, databases, and microservices into a single data graph that you can query with GraphQL"), ou com a utilização de bibliotecas, como é o caso (para _servers_ em [_Django_](/tag/django.html "Leia mais sobre Django")) da [_graphene-django_](https://github.com/graphql-python/graphene-django "A Django integration for Graphene") e
(para _clients_ em _Javascript_) da [_Relay_](https://relay.dev/ "The production-ready GraphQL client for React").

![Diagrama exibindo uma arquitetura com Serverless e Apollo Platform](/media/graphql-apollo-serverless-architecture.png "Exemplo de arquitetura GraphQL e Serverless com Apollo-Server-Lambda (serverless.com)")

Por tratar-se de uma especificação, implementações existirão para diferentes linguagens, arquiteturas, e fins (o próprio [_Gatsby_](https://www.gatsbyjs.org/ "Fast in every way that matters") é um bom exemplo).

Não vamos focar em como desenvolver sua _API_ com _GraphQL_, e sim em como utilizar a _query language_. [Esse repositório no _Github_](https://github.com/APIs-guru/graphql-apis "Public GraphQL APIs")
disponibiliza algumas _APIs_ públicas na qual podemos utilizar para praticar. A [_GraphQL Pokémon_](https://github.com/lucasbento/graphql-pokemon "Visite o repositório") parece uma boa candidata.

### Tipos

Partimos do princípio que queremos definir os tipos que serão servidos pela nossa _API_. O _GraphQL_ possui uma sintaxe específica para definição de tipos chamada _Schema Definition Language_ (_SDL_). No caso
do exemplo do _Pokémon_, temos o seguinte:

```graphql
type Pokemon {
  id: ID!
  number: String
  name: String
  weight: PokemonDimension
  height: PokemonDimension
  classification: String
  types: [String]
  resistant: [String]
  attacks: PokemonAttack
  weaknesses: [String]
  fleeRate: Float
  maxCP: Int
  evolutions: [Pokemon]
  evolutionRequirements: PokemonEvolutionRequirement
  maxHP: Int
  image: String
}
```

[Veja o _schema_ na íntegra](https://github.com/lucasbento/graphql-pokemon/blob/master/schemas/schema.graphql "Veja o arquivo no Github").

Para quem já teve contato com [_Swagger_](/tag/swagger.html "Leia mais sobre Swagger"), a sintaxe acima não é estranha. A estrutura consiste em basicamente
`field: type`. Onde em `field` damos o nome do campo, e `type` descrevemos o tipo.

Além dos tipos básicos
(como `String`, `ID`, `Int`), temos estruturas mais complexas, como as listas `[String]` e `[Pokemon]`. `PokemonDimension`, `PokemonAttack` e `PokemonEvolutionRequirement`,
são tipos customizados criados com a mesma sintaxe usada no próprio `Pokemon`. Por exemplo, na linha `evolutions: [Pokemon]`, está expresso o relacionamento
de um `Pokemon` para muitas evoluções (que tratam-se de outras "instâncias" do tipo `Pokemon`).

Por fim, vale notar o `!` em `ID`, que anota o campo como `required`.

### Consulta

Todas as _queries_ abaixo podem ser reproduzidas na interface [_Pokémon GraphiQL_](https://graphql-pokemon.now.sh/ "Execute as queries agora!"). Ou ainda,
se você preferir, através de _API calls_.

Para aquecer, vamos visualizar o _schema_:

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

Ou utilizando o `curl`:

```shell
curl 'https://graphql-pokemon.now.sh/?' \\
  -H 'content-type: application/json' \\
  --data-binary '{"query":"{ __schema { types{ name } } }", "variables":null, "operationName":null}'
```

Como resultado teremos o seguinte:

```json
{
  "data": {
    "__schema": {
      "types": [
        {
          "name": "Query"
        },
        {
          "name": "Int"
        },
        {
          "name": "Pokemon"
        },
        {
          "name": "ID"
        },
        {
          "name": "String"
        },
        {
          "name": "PokemonDimension"
        },
        {
          "name": "PokemonAttack"
        },
        {
          "name": "Attack"
        },
        {
          "name": "Float"
        },
        {
          "name": "PokemonEvolutionRequirement"
        },
        {
          "name": "__Schema"
        },
        {
          "name": "__Type"
        },
        {
          "name": "__TypeKind"
        },
        {
          "name": "Boolean"
        },
        {
          "name": "__Field"
        },
        {
          "name": "__InputValue"
        },
        {
          "name": "__EnumValue"
        },
        {
          "name": "__Directive"
        },
        {
          "name": "__DirectiveLocation"
        }
      ]
    }
  }
}
```

Através do `__schema` descobrimos quais tipos são utilizados pelo servidor. Não muito útil para o propósito desse artigo,
mas ainda assim, uma boa forma de olharmos pela primeira vez para uma resposta. Além do fato dela ser em _JSON_, repare o "envelopamento"
do _payload_ através da chave `data`.

Para compreender os tipos listados acima, podemos utilizar outra ferramenta de introspecção, chamada `__type`:

```graphql
{
  __type(name: "ID") {
    name
    kind
  }
}
```

E como resposta, temos a descrição do tipo `ID` como `SCALAR`:

```json
{
  "data": {
    "__type": {
      "name": "ID",
      "kind": "SCALAR"
    }
  }
}
```

Vamos listar todos os 151 _Pokémons_ originais:

```graphql
{
  pokemons(first: 151) {
    name
  }
}
```

A resposta será algo semelhante com o _JSON_ abaixo:

```json
{
  "data": {
    "pokemons": [
      {
        "name": "Bulbasaur"
      },

      (...)

      {
        "name": "Mew"
      }
    ]
  }
}
```

Com o parâmetro `first`, estamos solicitando todos os `n` primeiros resultados. Essa _query_ é declarada na linha `88` do `schema.graphql`:

```graphql
type Query {
  query: Query
  pokemons(first: Int!): [Pokemon]
  pokemon(id: String, name: String): Pokemon
}
```

Com o `type Query` estamos expressando quais serão as consultas que poderemos executar. Em `pokemons`, o atributo `first` é do tipo inteiro e obrigatório.
A sua resposta será uma lista de instâncias do tipo `Pokemon`. É possível também requisitar um _Pokémon_ através do seu `id` ou `name`, como
explícito na instrução `pokemon`, dentro do bloco `Query`:

```graphql
{
  pokemon(name: "Pikachu") {
    id
    number
    name
    weight {
      maximum
      minimum
    }
    height {
      maximum
      minimum
    }
    classification
    types
    resistant
    attacks {
      fast {
        name
        type
        damage
      }
      special {
        name
        type
        damage
      }
    }
    weaknesses
    fleeRate
    maxCP
    evolutions {
      id
      number
      name
    }
    evolutionRequirements {
      amount
      name
    }
    maxHP
    image
  }
}
```

E como resultado teremos todos os dados do nosso queridíssimo _Pikachu_.

### Mutações

Além de requisitar informação, podemos também manusear dados. Isso é realizado através do conceito de _Mutations_.

Para esse exemplo vamos utilizar a [_GraphQL Jobs API_](https://graphql.jobs/docs/api/ "Veja o projeto rodando"), acessível
através [dessa interface](https://api.graphql.jobs/ "Veja o Playground do projeto").

Vamos dar `subscribe` na _API_, para que assim possamos receber propostas de empregos que envolvam _GraphQL_:

```graphql
mutation {
  subscribe(input: { name: "<seu-nome>", email: "<seu-email>" }) {
    id
    name
    email
  }
}
```

Como resposta, temos um _JSON_ com `id`, `name` e `email`:

```JSON
{
  "data": {
    "subscribe": {
      "id": "ckc3r7uqs004w0725u5sf0g1o",
      "name": "John Doe",
      "email": "myamazingemail@mail.com"
    }
  }
}
```

Ok... Aqui pode ter ficado um pouco confuso. Vamos verificar quais _Mutations_ temos disponíveis:

```graphql
{
  __schema {
    mutationType {
      fields {
        name
        args {
          name
          type {
            kind
            ofType {
              name
              kind
              inputFields {
                name
                type {
                  ofType {
                    name
                  }
                }
              }
            }
          }
        }
        type {
          kind
          ofType {
            name
            fields {
              name
              type {
                kind
                ofType {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
```

O resultado, de forma resumida, será o seguinte:

```json
{
  "data": {
    "__schema": {
      "mutationType": {
        "fields": [
          {
            "name": "subscribe",
            "args": [
              {
                "name": "input",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "name": "SubscribeInput",
                    "kind": "INPUT_OBJECT",
                    "inputFields": [
                      {
                        "name": "name",
                        "type": {
                          "ofType": {
                            "name": "String"
                          }
                        }
                      },
                      {
                        "name": "email",
                        "type": {
                          "ofType": {
                            "name": "String"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "name": "User",
                "fields": [
                  {
                    "name": "id",
                    "type": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "name": "ID"
                      }
                    }
                  },
                  {
                    "name": "name",
                    "type": {
                      "kind": "SCALAR",
                      "ofType": null
                    }
                  },
                  {
                    "name": "email",
                    "type": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "name": "String"
                      }
                    }
                  },
                  {
                    "name": "subscribe",
                    "type": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "name": "Boolean"
                      }
                    }
                  },
                  {
                    "name": "createdAt",
                    "type": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "name": "DateTime"
                      }
                    }
                  },
                  {
                    "name": "updatedAt",
                    "type": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "name": "DateTime"
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}
```

A _query_ ficou um pouco mais clara agora. A _Mutation_ `subscribe` aceita um parâmetro com nome `input`, do
tipo `SubscribeInput`. Esse, além de ser obrigatório (`NON_NULL`), possui dois campos: `name` e `email`. Isso
explica a linha `subscribe(input: { name: "<seu-nome>", email: "<seu-email>" }) {`, na consulta anterior.

`subscribe` retorna um tipo `User`, também obrigatório. Esse tipo possui os campos `id`, `name`, `subscribe`,
`createdAt`, e `updatedAt`. Como especificamos dentro do bloco `subscribe` os campos `id`, `name`, e `email`,
esse é o resultado que obtemos no _JSON_ de resposta. Que representa a _subscription_ sendo efetuada, e meus
dados como usuário sendo retornados.

### Por baixo dos panos

Existem outros conceitos não explorados nesse artigo, como por exemplo as [_Subscriptions_](https://www.digitalocean.com/community/tutorials/graphql-mutations-subscriptions "Mutations and Subscriptions in GraphQL"). O que
pode estar confuso para você é como que o servidor interpreta o _GraphQL_, e coleta os dados para formar
a resposta da requisição.

![Imagem do filme Detective Pikachu, mostrando o Pikachu com uma lupa](/media/detective-pikachu.jpg "Será que conseguimos encontrar um emprego de detetive, para Pokémons, utilizando GraphQL? (www.geekgirlauthority.com/)")

Comigo o "click" aconteceu depois de checar o código dos repositórios abaixo:

- [lucasbento/graphql-pokemon](https://github.com/lucasbento/graphql-pokemon "Confira o repositório no Github")
- [igorlima/todo-mongo-graphql-server](https://github.com/igorlima/todo-mongo-graphql-server "Confira o repositório no Github")

Não é feitiçaria...

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
espécie de _API Gateway_, agregando o resultado de demais _endpoints_ _REST_ [parece ser uma tendência](https://levelup.gitconnected.com/graphql-is-the-new-api-gateway-383edeed4bcd "GraphQL is the New API Gateway").

![Topologia de serviços quando adicionado GraphQL como API Gateway](/media/graphql-api-gateway.png "Exemplo de uso de GraphQL como API Gateway, à frente de outras APIs GraphQL e REST (labs.getninjas.com.br)")

## Considerações finais

Para mim, a linguagem brilhou quando migrei o _blog_ para [_Gatsby_](https://www.gatsbyjs.org/ "GatsbyJS"). A flexibilidade e assertividade que ela me proporcionou,
mesmo em um ambiente de [_static site generator_](/tag/static-site-generators.html "Leia mais sobre sites estáticos"), me deixou impressionado e até mesmo apaixonado por toda a ideia por trás da tecnologia.

E esse caso de uso, na minha opinião, é motivação o suficiente para pelo menos compreendermos a linguagem.
Se há ceticismo em relação ao uso dela em uma solução que já existe, talvez ele dê uma abrandada quando
você experimentá-la em um contexto diferente.

Como o livro ["GraphQL or Bust: To Use It Or Not: That is the Question"](https://www.goodreads.com/book/show/40861856-graphql-or-bust "Veja no Goodreads") dá a entender, não tem almoço grátis:

> GraphQL has often been sold as a perfect solution for every problem, but the reality is that it meets one requirement better than most other, and if that’s not part of your requirements, it may not be the best solution for your implementation.

A discussão continua nas referências abaixo. Não deixe de conferir.

Até a próxima.

## Referências

- [Adriano Lisboa: O mínimo que você precisa saber sobre GraphQL para não passar vergonha em uma conversa](https://adrianolisboa.com/o-minimo-que-voce-precisa-saber-sobre-graphql-para-nao-passar-vergonha-em-uma-conversa/)
- [API Evangelist: GraphQL Seems Like We Do Not Want To Do The Hard Work Of API Design](http://apievangelist.com/2016/08/30/graphql-seems-like-we-do-not-want-to-do-the-hard-work-of-api-design/)
- [Apollo Blog: GraphQL - The next generation of API design](https://www.apollographql.com/blog/graphql-the-next-generation-of-api-design-f24b1689756a#.6hh9mb30w)
- [Digital Ocean - Mutations and Subscriptions in GraphQL](https://www.digitalocean.com/community/tutorials/graphql-mutations-subscriptions)
- [DZone: GraphQL - Core Features, Architecture, Pros, and Cons](https://dzone.com/articles/graphql-core-features-architecture-pros-and-cons)
- [GetNinjas: Sharing data in a Microservices Architecture using GraphQL](https://labs.getninjas.com.br/sharing-data-in-a-microservices-architecture-using-graphql-97db59357602)
- [Gitconnected: GraphQL is the New API Gateway](https://levelup.gitconnected.com/graphql-is-the-new-api-gateway-383edeed4bcd)
- [Github: Public GraphQL APIs](https://github.com/APIs-guru/graphql-apis)
- [Hitch: GraphQL - 3 reasons not to use it](https://blog.hitchhq.com/graphql-3-reasons-not-to-use-it-7715f60cb934#.j0xhx31xg)
- [How to GraphQL](https://www.howtographql.com/)
- [Medium: What is GraphQL, really?](https://medium.com/@paigen11/what-is-graphql-really-76c48e720202)
- [Moesif: REST vs GraphQL APIs, the Good, the Bad, the Ugly](https://www.moesif.com/blog/technical/graphql/REST-vs-GraphQL-APIs-the-good-the-bad-the-ugly/)
- [OPENGraphQL: Moving existing API from REST to GraphQL](https://medium.com/open-graphql/moving-existing-api-from-rest-to-graphql-205bab22c184)
- [Serverless: Running a scalable & reliable GraphQL endpoint with Serverless](https://www.serverless.com/blog/running-scalable-reliable-graphql-endpoint-with-serverless/)
- [Stable Kernel: Advantages and Disadvantages of GraphQL](https://stablekernel.com/article/advantages-and-disadvantages-of-graphql/)
- [Stackoverflow: Are there any disadvantages to GraphQL?](https://stackoverflow.com/questions/40689858/are-there-any-disadvantages-to-graphql)
- [ThoughyWorks: Technology Radar - GraphQL](https://www.thoughtworks.com/radar/languages-and-frameworks/graphql)
- [Wikipedia: GraphQL](https://en.wikipedia.org/wiki/GraphQL)
