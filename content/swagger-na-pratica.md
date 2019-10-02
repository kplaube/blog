title: Swagger na prática
date: 2018-03-15 18:15:00
category: desenvolvimento
tags: desenvolvimento, web, rest, microservices, apis, swagger, oai
slug: swagger-na-pratica
meta_description: Voltamos a falar de APIs e Swagger. Nesse artigo, vamos escrever uma especificação para uma API de filmes, e pincelar as ferramentas Swagger disponíveis no mercado.
Image: /images/blog/swaggerhub-logo.png
Alt: Logotipo do SwaggerHub

Voltamos a falar de [_APIs_]({tag}apis "Leia mais sobre APIs"), e voltamos a falar sobre especificações.
Para continuar o assunto sobre [_Swagger_]({filename}swagger-e-o-open-api-initiative.md "Swagger e o OAI"),
hoje vamos abordar o tema de uma maneira prática. Afinal, é com ela que a gente vê as principais
vantagens de utilizar _Swagger_ + _Open API Spec_, em relação aos concorrentes.

<!-- PELICAN_END_SUMMARY -->

Não deixe de conferir uma abordagem prática ao [_RAML_]({tag}raml "Leia mais sobre RAML"), no _post_
"[Ramilificando as suas APIs]({filename}ramilificando-as-suas-apis.md "Leia o artigo completo")".

## Aquecendo

E mais uma vez vamos usar o nosso [mini _IMDB_]({filename}rest-parte-2.md "REST - Parte 2") como exemplo.

Além disso, vamos aproveitar as ferramentas que o pessoal do _Swagger_ disponibiliza gratuitamente. A começar pelo
[_Swagger Editor_](https://swagger.io/swagger-editor/ "API Development Tools"). Não é necessário fazer
nenhum tipo de cadastro ou instalação no momento, apenas abrir o editor através do _link_ "Online Editor".

{% img align-center-keep-size /images/blog/poesia-vogon.jpg 600 344 Aguenta um pouco mais dessa poesia Vogon (imagilendo.wordpress.com) %}

Ele trará um exemplo de especificação. Vamos limpar o editor e começar do zero.

## Como começar?

Como explicado no _post_ anterior, _Swagger_ é um padrão de _API Spec_ mas também é um conjunto de ferramentas que podem trabalhar tanto com _Swagger Spec_ quanto com [_Open API Spec_](https://github.com/OAI/OpenAPI-Specification "The OpenAPI Specification"). Vamos começar o documento deixando clara a nossa escolha:

    ::yaml
    openapi: "3.0.1"

[Confira a versão 3.0.1 do _OAI_](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md "Open API Spec Version 3.0.1").

A essa altura o editor já deve ter apontado alguns erros. Por exemplo, é obrigatória a presença de um atributo [_info_](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#infoObject "Veja na especificação") e [_path_](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#pathsObject). Vamos corrigí-los:

    ::yaml
    openapi: "3.0.1"
    info:
      title: Movies API
      version: v1
    paths:
      /movies:
        summary: A set of movies

Em `info`, descrevemos o título da nossa _API_ e sobre qual versão da mesma estamos falando (nesse caso, `v1`). Em `paths`, descreveremos os _endpoints_. Com a adição dessas duas propriedades, podemos progredir com a construção da _API_:

{% img align-center-keep-size /images/blog/swagger-editor-example.png 640 152 Exemplo Swagger Editor %}

[Conheça os atributos do _OpenAPI Object_](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#openapi-object "Leia na especificação").

## Descrevendo os dados

Antes mesmo de adicionarmos os _endpoints_ na propriedade `paths`, vamos parar e descrever o _schema_ dos nossos dados. Nesse exemplo, o uso da propriedade `components` pode ser um "overhead", mas para _APIs_ grandes, com vários _endpoints_, essa separação ajudará na legibilidade e reaproveitamento de código:

    ::yaml
    (...)

    paths:
    	/movies:
    		summary: A set of movies

    components:
    	schemas:
    		Movie:
    			properties:
    				id:
    					type: string
    				title:
    					type: string
    				description:
    					type: string
    			required:
    				- id
    				- title
    			type: object

`Movie` é um objeto e possui três propriedades: `id`, `title` e `description`, e as duas primeiras são obrigatórias. Você pode estar estranhando o `id` ser do tipo `string`. Nesse exemplo estamos assumindo que os identificadores são `uuids`.

{% img align-center-keep-size /images/blog/swagger-editor-example-2.png 640 310 Editor do Swagger exibindo a seção models %}

[Saiba mais sobre _Schema Objects_](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#schemaObject "Veja na especificação").

## Descrevendo os endpoints

Os principais _endpoints_ que imaginamos para esse projeto são:

- `GET /movies`: Listagem de filmes;
- `POST /movies`: Adição de um filme;
- `GET /movies/{id}`: Detalhes de um filme;
- `PUT /movies/{id}`: Atualização de um filme;
- `DELETE /movies/{id}`: Remoção de um filme.

A listagem é um bom ponto de partida.

### Listando filmes

Voltando à propriedade `paths`, vamos melhorar a definição do `/movies`:

    ::yaml
    (...)

    paths:
      /movies:
        summary: A set of movies
        get:
          summary: Get a list of movies
          responses:
            '200':
              description: Movie list response
              content:
                application/json:
                  schema:
                    type: array
                    items:
                      $ref: '#/components/schemas/Movie'

Através do `/movies`, dentro de `paths`, estamos descrevendo o _endpoint_. Com o uso de `get:`, declaramos que o _endpoint_ aceitará o método `GET`. Ainda abusando da indentação do _YAML_, deixamos claro que existe uma resposta `200` (sucesso), que o seu conteúdo é `application/json`, e que dentro desse conteúdo haverá uma listagem de filmes.

Com o `$ref` somos capazes de referenciar um [_Path Item Object_](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#pathItemObject "Leia mais na especificação") do próprio arquivo que estamos trabalhando (nesse caso, o `#/components/schemas/Movie` está referência ao bloco de _YAML_ que criamos no capítulo anterior) ou até mesmo recursos externos. O que possibilita quebrar a _spec_ em diferentes arquivos.

Se você já conhece o [_JSON Schema_](http://json-schema.org/ "a vocabulary that allows you to annotate and validate JSON documents"), essa notação não lhe parecerá estranha.

### Criando filmes

Ainda em `/movies`, ao enviar um `POST`, somos capazes de criar um novo filme. Se você já leu sobre [_REST_]({tag}rest "Leia mais sobre REST") sabe que essa prática é recomendada. Vamos adicionar o seguinte bloco abaixo do `get`:

    ::yaml
    (...)

    paths:
    	/movies:
    		(...)

    	    post:
    	      summary: Add a new movie to the set
    	      requestBody:
    	        required: true
    	        content:
    	          application/json:
    	            schema:
    	              $ref: '#/components/schemas/Movie'
    	      responses:
    	        '201':
    	          description: Returns the new movie
    	          content:
    	            application/json:
    	              schema:
    	                $ref: '#/components/schemas/Movie'

Com o `post:`, temos a necessidade do uso de uma nova propriedade chamada [_requestBody_](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#requestBodyObject "Veja mais na spec"). É com ela que descreveremos quais parâmetros o usuário precisará passar para criar um filme. Já o `responses` descreve o retorno de um `201` (created), com o recém criado filme como um _JSON_ como conteúdo da resposta.

Opa! Temos um problema aqui! Nosso tipo `Movie` tem um campo `id` que é obrigatório por padrão. Esse campo não deveria ser enviado pelo cliente. Precisamos corrigir esse comportamento:

    ::yaml
    (...)

    paths:
    	/movies:
    		(...)

    	    post:
    	      summary: Add a new movie to the set
    	      requestBody:
    	        required: true
    	        content:
    	          application/json:
    	            schema:
    	              $ref: '#/components/schemas/NewMovie'

    (...)

    components:
      schemas:
        Movie:
          allOf:
            - $ref: '#/components/schemas/NewMovie'
            - required:
              - id
              properties:
                id:
                  type: string
        NewMovie:
          properties:
            title:
              type: string
            description:
              type: string
          required:
            - title

Com o uso do tipo `NewMovie`, o _request_ feito pelo usuário está descrito da maneira correta (sem `id`). Note que em `components` aproveitamos todas as características de `NewMovie`, e adicionamos uma nova (ter `id`) para o tipo `Movie`. Isso tudo graças ao `$ref` e ao [_allOf_](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#composition-and-inheritance-polymorphism "Leia mais na spec").

{% img align-center-keep-size /images/blog/swagger-editor-example-3.png 640 370 Editor Swagger exibindo a documentação dos endpoints %}

A essa altura, descrever os demais métodos e _endpoints_ não será nenhum mistério. Portanto, vamos dar um "fast forward".

## Segurança

Segurança é importante, e tão importante quanto é deixar explícito para os desenvolvedores e usuários quais protocolos de autenticação/autorização que estão sendo praticados pela _API_. No nosso caso, vamos descrever o uso do protocolo [_OAuth 2.0_]({filename}oauth20-autorizacao-simples.md "Leia mais sobre OAuth 2.0"), com o `grant type` `password`:

    ::yaml

    components:
      (...)

      securitySchemes:
        OAuth2:
          type: oauth2
          flows:
            password:
              tokenUrl: https://example.com/oauth/token
              scopes:
                read: Grants read access
                write: Grants write access

Falta anotar a propriedade `security` em cada _endpoint_:

    ::yaml

    paths:
      /movies:
        summary: A set of movies
        get:
          summary: Get a list of movies
          responses:
            (...)
          security:
            - OAuth2:
              - read
        post:
          summary: Add a new movie to the set
          requestBody:
            (...)
          responses:
            (...)
          security:
            - OAuth2:
              - write

Um ícone de cadeado deve ter aparecido no _preview_ do _Swagger Editor_.

## Outras ferramentas Swagger

Com a especificação acima temos o suficiente para publicar a documentação da nossa _API_, e até mesmo gerar algum código _client_. O _Swagger Editor_ quebrou um grande galho, auxiliando na escrita do documento, e é altamente recomendável o seu uso.

Um _disclaimer_ especial vai para a versão do _OpenAPI Spec_ que usamos nos exemplos. Infelizmente, nem toda ferramenta suporta a versão mais recente da especificação, logo, você terá que usar versões mais antigas caso queira utilizar as demais ferramentas que o _Swagger_ disponibiliza.

### Gerando código com o _Codegen_

O [_Swagger Code Generator_](https://github.com/swagger-api/swagger-codegen "Veja o repositório no Github") é um projeto super bacana que interpreta a especificação e gera código para diferentes linguagens. Infelizmente, a versão estável do _swagger-codegen_ só suporta até a versão `2.0` do _OpenAPI Spec_, e o _snapshot_ mais recente ainda não possui uma gama grande de linguagens disponíveis.

Construir _SDKs_ nunca foi tão fácil:

    ::bash
    java -jar ~/Downloads/swagger-codegen-cli-3.0.0-20180314.142155-42.jar generate \
        -i ~/Downloads/openapi.yaml \
        -l java -o ~/Projects/java/mini-imdb

Se você quer usufruir dessa ferramenta, é recomendado que utilize as versões do _OpenAPI Spec_ descritas no repositório do projeto: [https://github.com/swagger-api/swagger-codegen#compatibility](https://github.com/swagger-api/swagger-codegen#compatibility "Veja a grade de compatibilidade do codegen").

[API client generator HOWTO](https://github.com/swagger-api/swagger-codegen/wiki/api-client-generator-howto "Veja mais no Wiki do projeto").

### Gerando documentação com o _UI_

Com o [_Swagger UI_](https://github.com/swagger-api/swagger-ui "Veja o repositório no Gihub"), a partir da especificação recém criada, podemos gerar documentações elegantes e acessíveis ao nosso usuário final. O projeto é em _NodeJS_, e necessita de algum "Javascript-fu" para executá-lo.

A maneira mais fácil de usá-lo é através da plataforma [_SwaggerHub_](https://swaggerhub.com/ "The Platform for Designing and Documenting APIs with Swagger"). Onde você pode criar um usuário gratuitamente e ter 1 (um) projeto publicado no plano _free_.

{% img align-center-keep-size /images/blog/swagger-ui-example.png 640 375 Exemplo Swagger UI %}

[Confira o exemplo no _SwaggerHub_](https://app.swaggerhub.com/apis/kplaube/movies-api/v1 "Veja no SwaggerHub").

Vale notar que a documentação é "viva", ou seja, ela interage com os endpoints do seu serviço. Para que esse recurso funcione corretamente, você precisa anotar a propriedade `servers` na especificação da _API_.

[Leia mais sobre _Server Object_](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#serverObject "Veja na documentação oficial").

### Testando com _Inspector_

Se você já usou o [_Insomnia_](https://insomnia.rest/ "Debug APIs like a human, not a robot") ou [_Postman_](https://www.getpostman.com/ "Postman Makes API Development Simple"), vai se sentir em casa com o [_Swagger Inspector_](https://inspector.swagger.io/builder "Veja a aplicação").

O _Inspector_ é uma _GUI_ que auxilia nos testes de _endpoints_ _REST_. Com ele, fica mais fácil inspecionar _endpoints_ e validar o contrato e comportamento dos mesmos.

Confesso que acho o _Postman_ muito mais eficiente nesse quesito. Mas infelizmente, o aplicativo só suporta até a versão `2.0` do _Swagger Spec_. Nada que impeça que você configure os _requests_ para os _endpoints_ manualmente.

## Considerações finais

A _spec_ final você encontra [aqui](https://gist.github.com/kplaube/509c52f13dc966c915600733db60c2bb "Veja o exemplo completo").

O ambiente em torno do _OpenAPI_ é rico, e vale a pena considerar escrever suas próximas especificações de _APIs_ com esse padrão. Se você, assim como eu, vem de outros formatos (como o _RAML_ ou _JSON Schema_), não notará grande diferença na forma de escrita com o _OAI_.

É claro que não é só o pessoal do _Swagger_ que cria ferramentas para _Swagger Spec_ e _OpenAPI Spec_. Você pode conferir as diversas ferramentas criadas pela comunidade em [_Tools and Integrations_](https://swagger.io/open-source-integrations/#community-driven-language-integrations-2 "Veja mais em swagger.io").

Sem dúvida, falaremos sobre _Python_ + _Swagger_ nos próximos _posts_.

Até lá.
