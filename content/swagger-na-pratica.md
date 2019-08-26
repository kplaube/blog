title: Swagger na prática
date: 2018-03-15 18:15:00
category: desenvolvimento
tags: desenvolvimento, web, rest, microservices, apis, swagger, oai
slug: swagger-na-pratica
meta_description: Voltamos a falar de APIs e Swagger. Nesse artigo, vamos escrever uma especificação para uma API de filmes, e pincelar as ferramentas Swagger disponíveis no mercado.

{% img representative-image /images/blog/swaggerhub-logo.png 180 180 Logotipo do SwaggerHub %}

Voltamos a falar de [*APIs*]({tag}apis "Leia mais sobre APIs"), e voltamos a falar sobre especificações.
Para continuar o assunto sobre [*Swagger*]({filename}swagger-e-o-open-api-initiative.md "Swagger e o OAI"),
hoje vamos abordar o tema de uma maneira prática. Afinal, é com ela que a gente vê as principais
vantagens de utilizar *Swagger* + *Open API Spec*, em relação aos concorrentes.

<!-- PELICAN_END_SUMMARY -->

Não deixe de conferir uma abordagem prática ao [*RAML*]({tag}raml "Leia mais sobre RAML"), no *post*
"[Ramilificando as suas APIs]({filename}ramilificando-as-suas-apis.md "Leia o artigo completo")".

## Aquecendo

E mais uma vez vamos usar o nosso [mini *IMDB*]({filename}rest-parte-2.md "REST - Parte 2") como exemplo.

Além disso, vamos aproveitar as ferramentas que o pessoal do *Swagger* disponibiliza gratuitamente. A começar pelo
[*Swagger Editor*](https://swagger.io/swagger-editor/ "API Development Tools"). Não é necessário fazer
nenhum tipo de cadastro ou instalação no momento, apenas abrir o editor através do *link* "Online Editor".

{% img align-center-keep-size /images/blog/poesia-vogon.jpg 600 344 Aguenta um pouco mais dessa poesia Vogon (imagilendo.wordpress.com) %}

Ele trará um exemplo de especificação. Vamos limpar o editor e começar do zero.

## Como começar?

Como explicado no *post* anterior, *Swagger* é um padrão de *API Spec* mas também é um conjunto de ferramentas que podem trabalhar tanto com *Swagger Spec* quanto com [*Open API Spec*](https://github.com/OAI/OpenAPI-Specification "The OpenAPI Specification"). Vamos começar o documento deixando clara a nossa escolha:

	::yaml
	openapi: "3.0.1"

[Confira a versão 3.0.1 do *OAI*](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md "Open API Spec Version 3.0.1").

A essa altura o editor já deve ter apontado alguns erros. Por exemplo, é obrigatória a presença de um atributo [*info*](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#infoObject "Veja na especificação") e [*path*](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#pathsObject). Vamos corrigí-los:

	::yaml
	openapi: "3.0.1"
	info:
	  title: Movies API
	  version: v1
	paths:
	  /movies:
	    summary: A set of movies

Em `info`, descrevemos o título da nossa *API* e sobre qual versão da mesma estamos falando (nesse caso, `v1`). Em `paths`, descreveremos os *endpoints*. Com a adição dessas duas propriedades, podemos progredir com a construção da *API*:

{% img align-center-keep-size /images/blog/swagger-editor-example.png 640 152 Exemplo Swagger Editor %}

[Conheça os atributos do *OpenAPI Object*](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#openapi-object "Leia na especificação").

## Descrevendo os dados

Antes mesmo de adicionarmos os *endpoints* na propriedade `paths`, vamos parar e descrever o *schema* dos nossos dados. Nesse exemplo, o uso da propriedade `components` pode ser um "overhead", mas para *APIs* grandes, com vários *endpoints*, essa separação ajudará na legibilidade e reaproveitamento de código:

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

[Saiba mais sobre *Schema Objects*](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#schemaObject "Veja na especificação").

## Descrevendo os endpoints

Os principais *endpoints* que imaginamos para esse projeto são:

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

Através do `/movies`, dentro de `paths`, estamos descrevendo o *endpoint*. Com o uso de `get:`, declaramos que o *endpoint* aceitará o método `GET`. Ainda abusando da indentação do *YAML*, deixamos claro que existe uma resposta `200` (sucesso), que o seu conteúdo é `application/json`, e que dentro desse conteúdo haverá uma listagem de filmes.

Com o `$ref` somos capazes de referenciar um [*Path Item Object*](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#pathItemObject "Leia mais na especificação") do próprio arquivo que estamos trabalhando (nesse caso, o `#/components/schemas/Movie` está referência ao bloco de *YAML* que criamos no capítulo anterior) ou até mesmo recursos externos. O que possibilita quebrar a *spec* em diferentes arquivos.

Se você já conhece o [*JSON Schema*](http://json-schema.org/ "a vocabulary that allows you to annotate and validate JSON documents"), essa notação não lhe parecerá estranha.

### Criando filmes

Ainda em `/movies`, ao enviar um `POST`, somos capazes de criar um novo filme. Se você já leu sobre [*REST*]({tag}rest "Leia mais sobre REST") sabe que essa prática é recomendada. Vamos adicionar o seguinte bloco abaixo do `get`:

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

Com o `post:`, temos a necessidade do uso de uma nova propriedade chamada [*requestBody*](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#requestBodyObject "Veja mais na spec"). É com ela que descreveremos quais parâmetros o usuário precisará passar para criar um filme. Já o `responses` descreve o retorno de um `201` (created), com o recém criado filme como um *JSON*  como conteúdo da resposta.

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

Com o uso do tipo `NewMovie`, o *request* feito pelo usuário está descrito da maneira correta (sem `id`). Note que em `components` aproveitamos todas as características de `NewMovie`, e adicionamos uma nova (ter `id`) para o tipo `Movie`. Isso tudo graças ao `$ref` e ao [*allOf*](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#composition-and-inheritance-polymorphism "Leia mais na spec").

{% img align-center-keep-size /images/blog/swagger-editor-example-3.png 640 370 Editor Swagger exibindo a documentação dos endpoints %}

A essa altura, descrever os demais métodos e *endpoints* não será nenhum mistério. Portanto, vamos dar um "fast forward".

## Segurança

Segurança é importante, e tão importante quanto é deixar explícito para os desenvolvedores e usuários quais protocolos de autenticação/autorização que estão sendo praticados pela *API*. No nosso caso, vamos descrever o uso do protocolo [*OAuth 2.0*]({filename}oauth20-autorizacao-simples.md "Leia mais sobre OAuth 2.0"), com o `grant type` `password`:

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

Falta anotar a propriedade `security` em cada *endpoint*:

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

Um ícone de cadeado deve ter aparecido no *preview* do *Swagger Editor*.

## Outras ferramentas Swagger

Com a especificação acima temos o suficiente para publicar a documentação da nossa *API*, e até mesmo gerar algum código *client*. O *Swagger Editor* quebrou um grande galho, auxiliando na escrita do documento, e é altamente recomendável o seu uso.

Um *disclaimer* especial vai para a versão do *OpenAPI Spec* que usamos nos exemplos. Infelizmente, nem toda ferramenta suporta a versão mais recente da especificação, logo, você terá que usar versões mais antigas caso queira utilizar as demais ferramentas que o *Swagger* disponibiliza.

### Gerando código com o *Codegen*

O [*Swagger Code Generator*](https://github.com/swagger-api/swagger-codegen "Veja o repositório no Github") é um projeto super bacana que interpreta a especificação e gera código para diferentes linguagens. Infelizmente, a versão estável do *swagger-codegen* só suporta até a versão `2.0` do *OpenAPI Spec*, e o *snapshot* mais recente ainda não possui uma gama grande de linguagens disponíveis.

Construir *SDKs* nunca foi tão fácil:

    ::bash
    java -jar ~/Downloads/swagger-codegen-cli-3.0.0-20180314.142155-42.jar generate \
        -i ~/Downloads/openapi.yaml \
        -l java -o ~/Projects/java/mini-imdb

Se você quer usufruir dessa ferramenta, é recomendado que utilize as versões do *OpenAPI Spec* descritas no repositório do projeto: [https://github.com/swagger-api/swagger-codegen#compatibility](https://github.com/swagger-api/swagger-codegen#compatibility "Veja a grade de compatibilidade do codegen").

[API client generator HOWTO](https://github.com/swagger-api/swagger-codegen/wiki/api-client-generator-howto "Veja mais no Wiki do projeto").

### Gerando documentação com o *UI*

Com o [*Swagger UI*](https://github.com/swagger-api/swagger-ui "Veja o repositório no Gihub"), a partir da especificação recém criada, podemos gerar documentações elegantes e acessíveis ao nosso usuário final. O projeto é em *NodeJS*, e necessita de algum "Javascript-fu" para executá-lo. 

A maneira mais fácil de usá-lo é através da plataforma [*SwaggerHub*](https://swaggerhub.com/ "The Platform for Designing and Documenting APIs with Swagger"). Onde você pode criar um usuário gratuitamente e ter 1 (um) projeto publicado no plano *free*.

{% img align-center-keep-size /images/blog/swagger-ui-example.png 640 375 Exemplo Swagger UI %}

[Confira o exemplo no *SwaggerHub*](https://app.swaggerhub.com/apis/kplaube/movies-api/v1 "Veja no SwaggerHub").

Vale notar que a documentação é "viva", ou seja, ela interage com os endpoints do seu serviço. Para que esse recurso funcione corretamente, você precisa anotar a propriedade `servers` na especificação da *API*.

[Leia mais sobre *Server Object*](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#serverObject "Veja na documentação oficial").

### Testando com *Inspector*

Se você já usou o [*Insomnia*](https://insomnia.rest/ "Debug APIs like a human, not a robot") ou [*Postman*](https://www.getpostman.com/ "Postman Makes API Development Simple"), vai se sentir em casa com o [*Swagger Inspector*](https://inspector.swagger.io/builder "Veja a aplicação"). 

O *Inspector* é uma *GUI* que auxilia nos testes de *endpoints* *REST*. Com ele, fica mais fácil inspecionar *endpoints* e validar o contrato e comportamento dos mesmos.

Confesso que acho o *Postman* muito mais eficiente nesse quesito. Mas infelizmente, o aplicativo só suporta até a versão `2.0` do *Swagger Spec*. Nada que impeça que você configure os *requests* para os *endpoints* manualmente.

## Considerações finais

A *spec* final você encontra [aqui](https://gist.github.com/kplaube/509c52f13dc966c915600733db60c2bb "Veja o exemplo completo").

O ambiente em torno do *OpenAPI* é rico, e vale a pena considerar escrever suas próximas especificações de *APIs* com esse padrão. Se você, assim como eu, vem de outros formatos (como o *RAML* ou *JSON Schema*), não notará grande diferença na forma de escrita com o *OAI*.

É claro que não é só o pessoal do *Swagger* que cria ferramentas para *Swagger Spec* e *OpenAPI Spec*. Você pode conferir as diversas ferramentas criadas pela comunidade em [*Tools and Integrations*](https://swagger.io/open-source-integrations/#community-driven-language-integrations-2 "Veja mais em swagger.io").

Sem dúvida, falaremos sobre *Python* + *Swagger* nos próximos *posts*.

Até lá.
