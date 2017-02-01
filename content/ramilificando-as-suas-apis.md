title: Ramilificando as suas APIs
date: 2017-01-31 21:30:00
category: desenvolvimento
tags: desenvolvimento, rest, microservices, apis, raml
slug: ramilificando-as-suas-apis
meta_description: RAML é uma linguagem baseada em YAML que serve para descrever APIs REST. Nesse artigo vamos abordar de forma prática o funcionamento do RAML, e citar algumas ferramentas fantásticas.

{% img align-left /images/blog/raml-logo.png 180 180 Logotipo do RAML %}

Você já tem a sua [*API*]({tag}apis "Leia mais sobre APIs")! Ela é [*REST*]({tag}rest "Leia mais sobre REST"),
performa muito bem, e todos os seus aplicativos estão
conversando com a mesma. Vem uma oportunidade de negócio de abrí-la para consumo
de parceiros. Agora não basta só a técnica perfeita, você precisa de especificação, documentações,
exemplos de uso e validadores para garantir que os contratos da sua *API* não sofram alterações drásticas,
deixando seu cliente na mão.

<!-- PELICAN_END_SUMMARY -->

Essa é a realidade da [*Loadsmart*](http://loadsmart.com "Book a truck with Loadsmart") no momento da
publicação desse *post*. Lá, optamos por seguir os mesmos passos do [*Spotify*](http://spotify.com "Você já sabe o que é isso :)")
e utilizar o *RAML* para descrever as nossas *APIs*.

## RAML é quase YAML

O *RAML* (RESTful API Modeling Language) é uma maneira simples
de descrever/projetar suas *APIs*. Através de uma linguagem concisa, baseada
em YAML, você é capaz de escrever especificações que podem ser usadas como
documentação, ferramenta de *build* e de testes automatizados.

Ao invés de tentar cultivar a motivação para a utilização do *RAML*, vou descrever
de forma prática os principais aspectos do padrão. Para tanto, já começo
recomendando a instalação do [*API Workbench*](http://apiworkbench.com/ "IDE for designing APIs"),
um excelente *plugin* para o *Atom* que facilita (e muito) a escrita de documentos *RAML*.

## Como começar?

Vamos voltar ao nosso "mini IMDB", exemplo utilizado em [alguns *posts*]({tag}rest "Veja os posts sobre REST") aqui do *blog*.
Os principais *endpoints* que temos são:

* `GET /movies`: Listagem de filmes;
* `POST /movies`: Adição de um filme;
* `GET /movies/{id}`: Detalhes de um filme;
* `PUT /movies/{id}`: Atualização de um filme;
* `DELETE /movies/{id}`: Remoção de um filme.

Podemos começar criando um arquivo `api.raml` com o seguinte conteúdo:

```yaml
#%RAML 1.0
title: Movies API
```

No momento desse artigo, o *RAML* possui duas especificações ativas: a `0.8` e a `1.0`. Dependendo
das ferramentas que você for utilizar posteriormente, talvez seja interessante optar pela especificação `0.8`.
Nesse exemplo utilizaremos a `1.0`.

Vamos continuar descrevendo a nossa *API*:

```yaml
#%RAML 1.0
title: Movies API
version: v1
baseUri: https://api.movies.com/{version}
mediaType: application/json
```

Setamos a versão da *API* como `v1`, atendendo pelo endereço `https://api.movies.com/v1`. Trabalharemos
com objetos *JSON*. Caso a *API* necessite trabalhar com mais de um tipo (*XML*, por exemplo),
é possível declará-lo no `mediaType`:

```yaml
mediaType: [application/json, application/xml]
```

## Descrevendo os dados

Se você optar pela versão `0.8` do padrão, a palavra `schemas` aparecerá com certa frequência durante
a construção do documento. Com a `1.0`, a comunidade depreciou o termo em prol da palavra-chave `types`, e é com
ela que descreveremos o tipo `Movie`:

```yaml
(...)

types:
  Movie:
    properties:
      id: string
      title: string
      description?: string
```

`Movie` possui três propriedades do tipo `string`: `id`, `title` e `description`. O `?` em `description?`
indica que essa última é uma propriedade opcional (ao contrário de `id` e `title` que são obrigatórias).

O *RAML* suporta uma série de tipos *built-in*, para saber mais, leia sobre [definição de tipos](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md/#defining-types).

## Descrevendo os endpoints

Agora que temos um tipo definido, podemos partir para a descrição dos nossos *endpoints*. Em *RAML*,
a semântica correta é chamarmos um *endpoint* de *Resource*. Vamos iniciar pelo `/movies`:

```yaml
(...)

/movies:
  description: A set of movies.

  get:
    description: Get a list of movies.
    responses:
      200:
        body: Movie[]
  post:
    description: Add a new movie to the set.
    body:
      type: Movie
    responses:
      201:
        description: Returns the new movie.
        body: Movie
```

Começamos ao criar um bloco `/movies`. Nele, além de adicionarmos uma descrição através da propriedade
`description`, também deixamos explícito a possibilidade de enviarmos dois métodos: `get` e `post`.
Em `get`, podemos ter como resposta um *status code* `200` e uma lista de `Movie` (por isso o sufixo `[]`).

Já em `post`, além de deixar claro que retornaremos o objeto recém criado, apontamos que a resposta
será um `201` com um único `Movie`. Note que nesse caso descrevemos que o `post` também possui um tipo,
através da palavra-chave `body`. Isso quer dizer que, ao fazermos `POST /movies/`, precisamos
passar um objeto que atenda as especificações do tipo `Movie`.

{% img align-center-keep-size /images/blog/raml-vogons.jpg 640 432 RAML pode parecer poesia Vogon, mas não entre em pânico! (fundividedattention) %}

Caso a sua regra de negócio vá além da criação de um elemento, é possível descrevê-la
também. Por exemplo, vamos imaginar que exista a necessidade de verificar se o filme já existe no
banco de dados:

```yaml
(...)

      201:
        description: Returns the new movie.
        body: Movie
      409:
        description: The movie already exists in our database.
        body:
          properties:
            error: string
```

Note que o padrão *RAML* é flexível. Nesse caso não criamos um tipo `Error`, apenas descrevemos o corpo
da resposta através das palavras-chave `body` e `properties`.

Vamos finalizar descrevendo os dois métodos restantes:

```yaml
(...)

  /{id}:
    uriParameters:
      id:
        description: The Movie identifier.
        type: string

     get:
       description: Gets a specific movie.
       responses:
         200:
           description: Returns the specific movie.
           body: Movie

    put:
      body:
        type: Movie
      description: Updates an already created movie.
      responses:
        200:
          description: Returns the updated movie.
          body: Movie

    delete:
      description: Deletes the movie.
      responses:
        204:
          description: Confirms the deletion.
```

Dentro de `/movies`, criamos um novo bloco chamado `/{id}`. Através da propriedade `uriParameters` deixamos
claro que `id` é na verdade uma `string` (no nosso caso, estamos usando um `uuid`). Além disso, descrevemos
os métodos `get`, `put` e `delete` para `/movies/{id}`, que não diferem tanto assim dos demais explicados
anteriormente.

## Descrevendo sem se repetir

No nosso [exemplo utilizando *Restless*]({filename}construindo-apis-em-django-com-restless.md "Construindo APIs em Django com Restless"),
ao fazer um `POST` ou `PUT` com dados inválidos, retornamos um `BadRequest`. Podemos especificar esse
comportamento para o recurso `POST movies/` e `PUT movies/{id}`.

Logo após o bloco `types`, vamos adicionar um novo bloco chamado `traits`:

```yaml
(...)

mediaType: application/json

types:
(...)

traits:
  dataValidation:
    responses:
      400:
        description: A BadRequest happens when data validation fails.
        body:
          properties:
            error: string
```

Através de `traits` somos capazes de escrever regras de uso que podem ser reaproveitadas por dados e recursos.
No exemplo acima, dizemos que recursos que utilizarem esse *trait* terão como resposta o *status code* `400`.

Agora basta apontarmos nossos recursos ao *trait* de nome `dataValidation`:

```yaml
(...)

/movies:
(...)

  post:
    is: [dataValidation]

  (...)

  /{id}:
  (...)

    put:
      is: [dataValidation]

(...)
```

*Traits* são extremamente úteis para descrever comportamentos que são comuns entre recursos (por exemplo, listagens
que possuem paginação). Outro conceito similar é o *Resource Types*, no qual você pode ler mais sobre na [documentação oficial](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md/#declaration-resource-types-and-traits "Resource Types and Traits").

## Descrevendo a segurança

Para finalizar nosso exemplo. Vamos supor que o acesso à *API* é limitado, e o usuário precisa ter uma
conta para acessá-la. Para não reinventar a roda, vamos supor que optamos pelo padrão [*OAuth 2*](https://aaronparecki.com/oauth-2-simplified/ "OAuth 2 simplified")
para autenticação e autorização.

Abaixo da propriedade `mediaType` vamos criar um novo bloco chamado `securitySchemes`:

```yaml
(...)

securitySchemes:
  oauth_2_0:
    description: We support OAuth 2.0 for authenticating all API requests.
    type: OAuth 2.0
    describedBy:
      headers:
        Authorization:
          description: |
             Used to send a valid OAuth 2 access token. Do not use
             with the "access_token" query string parameter.
          type: string
      queryParameters:
        access_token:
          description: |
             Used to send a valid OAuth 2 access token.
             Do not use with the "Authorization" header.
          type: string
      responses:
        401:
          description: |
              Bad or expired token. This can happen if the
              user or Movie API revoked or expired an access
              token. To fix, re-authenticate the user.
        403:
          description: |
              Bad OAuth request (wrong consumer key, bad nonce,
              expired timestamp...). Unfortunately,
              re-authenticating the user won't help here.
    settings:
      authorizationUri: https://www.movies.com/1/oauth2/authorize
      accessTokenUri: https://api.movies.com/1/oauth2/token
      authorizationGrants: [ authorization_code, implicit ]
```

Serei sincero com você, caro leitor, o código acima é uma receita de bolo para descrever
o `securitySchemes` do tipo *OAuth 2*. Nada de muito diferente do que a gente viu até aqui,
com exceção do uso do `|`, que nesse caso serve para fazer textos em bloco, e da
propriedade `type` com valor `OAuth 2.0`.

No nosso cenário, apenas temos intenção de proteger a escrita de dados na *API*. Para tanto,
Vamos adicionar a propriedade `securedBy` aos blocos `post` e `put`:

```yaml
(...)

  post:
    is: [dataValidation]
    securedBy: [oauth_2_0]

(...)

    put:
      is: [dataValidation]
      securedBy: [oauth_2_0]

(...)
```

Pronto! A especificação da nossa *API* está completa! Temos uma documentação forte, que pode ser lida
por humanos e máquinas. Para fins didáticos não utilizei recursos
interessantes como a propriedade `example` ou a ferramenta `!include`. Mas você pode ler sobre
eles na [especificação do *RAML* 1.0](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md).

## Considerações finais

[Veja como ficou a versão final do nosso arquivo api.raml](https://github.com/kplaube/post-raml/blob/8e580fa4d328a3f5f9e89e23d8b283ec04cf9637/api.raml).

Através de uma linguagem clara fomos capazes de construir uma especificação legível para a nossa *API*.
Com isso, outros desenvolvedores (ou até mesmo máquinas) serão capazes de entender como funciona cada *endpoint*.
Com a adição de ferramentas como o [*Abao*](https://github.com/cybertk/abao "REST API automated testing tool")
e [*raml2html*](https://github.com/raml2html/raml2html "RAML to HTML documentation generator"), os resultados
do uso do *RAML* podem ser surpreendentes, como no exemplo abaixo:

{% img align-center-keep-size /images/blog/example-raml.png 640 383 Exemplo de documentação gerada pelo raml2html %}

Até a próxima.

# Referências

* [Github: RAML Version 1.0 specification](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md)
* [Sitepoint: RAML, the RESTful API modeling language](https://www.sitepoint.com/raml-restful-api-modeling-language/)
