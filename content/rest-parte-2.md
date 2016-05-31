title: REST - Parte 2
date: 2016-05-20 12:35:00
category: desenvolvimento
tags: desenvolvimento, rest, microservices, apis
slug: rest-parte-2
meta_description: Vamos falar um pouco mais sobre como interagir com APIs REST, utilizando os verbos do protocolo HTTP e a biblioteca hug, que nos ajudará a ilustrar como funciona uma API na prática.

{% img align-left /images/blog/rest-logo.png 180 180 Logotipo REST %}

No [*post* anterior]({filename}rest-parte-1.md "Leia a parte 1"), demos uma pequena introdução
ao conceito de *REST* e fizemos um raso comparativo com o seu "rival", o *SOAP*.
Nesse artigo falaremos mais sobre como interagir com *APIs* *REST* utilizando
os verbos do protocolo *HTTP*, e a biblioteca [*hug*](http://www.hug.rest/ "Embrace APIs of the future"),
que nos ajudará a ilustrar como uma *API* funciona na prática.

<!-- PELICAN_END_SUMMARY -->

Segundo o [*InfoQ*](https://www.infoq.com/br/articles/rest-introduction "Introdução ao REST"),
o *REST* possui cinco princípios fundamentais:

* Dê a todas as coisas um identificador
* Vincule as coisas
* Utilize métodos padronizados
* Recursos com múltiplas representações
* Comunique sem estado

Esses cinco itens nos guiarão daqui para frente.

## O Uniform Resource Identifier

Você já parou para pensar que na *Internet* tudo tem um "endereço único"?
Do formulário de contato do seu *blog* até um vídeo no *Youtube*?

Todo recurso tem um nome e pode ser identificado de forma única.
Esse conceito é conhecido por *Uniform Resource Identifier* (*URI*) e é
composto pelo *Uniform Resource Locator* (*URL*) e *Uniform Resource Name* (*URN*).

Logo, quando falamos do endereço `http://google.com/index.html`, podemos assumir a seguinte
estrutura:

    http://google.com/index.html
    |------ URL -----|-- URN --|
    |----------- URI ----------|

Como uma *API* *REST* é um recurso disponível na [*Web*]({tag}web "Leia mais sobre Web"),
essa regra não é diferente. Daremos identificadores únicos para cada recurso exposto.

Utilizaremos o `localhost:8000` para os exemplos a seguir. Portanto, vamos imaginar que
temos uma *API* de filmes, e gostaríamos de listar todos os filmes. Uma boa prática
é utilizarmos o substantivo no plural. Exemplo:

    http://localhost:8000/movies/

Vamos supor que o filme "The Matrix", dentro da nossa base de dados, tenha o *ID* `20`.
Na nossa *API* poderíamos acessá-lo através da seguinte *URI*:

    http://localhost:8000/movies/20/

Consequentemente, outro filme teria um identificador diferente. Por exemplo, para acessarmos
o filme "Swordfish", que no nosso exemplo possui o *ID* `55`, temos:

    http://localhost:8000/movies/55/

Outra boa prática é utilizarmos [*UUIDs*](https://en.wikipedia.org/wiki/Universally_unique_identifier "Leia mais sobre UUID")
ao invés das chaves primárias do nosso banco de dados. Isso obscurece o funcionamento da
aplicação, tornando-a ligeiramente mais segura:

    http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/

Legal! Já tenho como acessar o filme *The Matrix*, dentro da nossa "*API* imaginária". Será
que temos alguma maneira fácil de acessar, por exemplo, os atores que fazem parte desse
filme?

## Hipermídia

O conceito de hipermídia pode ser bastante abstrato. Segundo o *Wikipedia*:

> Hipermídia é a reunião de várias mídias num ambiente computacional, suportada por sistemas eletrônicos
> de comunicação. Hipermídia, diferentemente de multimídia, não é a mera reunião dos meios existentes, e
> sim a fusão desses meios a partir de elementos não-lineares.

A melhor forma de entender esse conceito é se olharmos para uma forma de hipermídia muito conhecida: o hipertexto (sim,
o "H" do [*Hypertext Markup Language*]({tag}html "Leia mais sobre HTML")). Nele, temos um "texto interativo",
não necessariamente linear e composto por diferentes outras mídias (como som, vídeo, imagens, etc).

Mas o ponto que mais ilustra o que é um hipertexto é a capacidade de um texto referenciar a outro. Esse
conceito, chamado de hiperlinks (ou somente *links*, para os mais jovens) permite com que eu seja capaz de navegar
entre documentos apenas seguindo as suas referências, sem conhecer previamente o destino do meu passo seguinte.

{% img align-center /images/blog/social-network-movie.jpg 610 310 Aqui de boas fazendo umas APIs com os meus amigos (cosmopolitan.com) %}

Quando esse conceito é aplicado ao contexto de *REST*, temos o que chamamos de *Hypermedia as the Engine
of Application State* ([*HATEOAS*](https://en.wikipedia.org/wiki/HATEOAS "Leia mais sobre HATEOAS")).
Segundo ele, nosso cliente deve ser capaz de interagir com a nossa aplicação
(e até mesmo demais aplicações vinculadas a ela) através de hipermídia. Dessa forma, eu não preciso necessariamente
conhecer todos os *endpoints* de uma *API*, ela me informará dada uma determinada *URI*, para onde eu posso navegar.

Pegando a nossa *API* de filmes, eu deveria ter dentro da resposta do filme "The Matrix" alguma informação me dizendo
que para listar os atores desse filme, eu deveria acessar `http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/actors/`.
E uma vez eu estando nessa listagem, deveria haver um *link* me dizendo que para ver os detalhes da
[*Carrie-Anne Moss*](http://www.imdb.com/name/nm0005251/ "Carrie-Anne Moss no IMDB"), por exemplo,
eu devo acessar a *URI* `http://localhost:8000/actors/A3531BF5-C089-4A44-8A92-5A5AC08261AA/`.

Exemplo:

    ::xml
    <movie>
      <uuid>DED621D5-08F4-4D32-ADFA-84375BA415B9</uuid>
      <title>The Matrix</title>

      <link rel="actors" href="http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/actors/" />
    </movie>

Ou em uma resposta em *JSON*, poderíamos ter algo parecido com o exemplo abaixo:

    ::json
    {
      "uuid": "DED621D5-08F4-4D32-ADFA-84375BA415B9",
      "title": "The Matrix",

      "_links": {
        "actors": "http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/actors/"
      }
    }

## Um pouquinho de prática

Antes de falarmos sobre os verbos *HTTP*, vamos utilizar o *hug* para uma abordagem um
pouco mais prática. Iniciamos com a instalação da biblioteca:

    ::shell
    $ pip3 install hug

Para tornar as coisas simples, vamos simular o acesso ao banco de dados com o uso de dicionários *Python*.

    ::python
    # api.py

    import hug

    MOVIES = [
      {
        'id': 'DED621D5-08F4-4D32-ADFA-84375BA415B9',
        'title': 'The Matrix',
        'description': 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
      }
    ]

A *URI* por si só não significa nada. Precisamos de métodos para acessá-la (e manipulá-la), e o protocolo *HTTP*
possui alguns verbos que podem executar essas operações para nós.

### Listagem e detalhes

O *GET* é sem dúvida o mais famoso deles. É através dele que somos capazes de "pegar" os recursos da *Web*, incluindo
páginas na Internet como essa que você está lendo. Com esse verbo, podemos listar e visualizar mais detalhes de um
determinado recurso na *Web*.

Vamos começar retornando a listagem de filmes:

    ::python
    # api.py

    import hug

    ...

    @hug.get()
    def movies():
      return {
        'objects': MOVIES,
      }

Para executar a *API* no seu ambiente local, utilize o seguinte comando:

    ::shell
    $ hug -f api.py

Agora, ao acessar a *URI* `http://localhost:8000/movies/`, obtemos a seguinte resposta:

    ::json
    {
     "objects" : [
        {
           "description" : "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
           "title" : "The Matrix",
           "id" : "DED621D5-08F4-4D32-ADFA-84375BA415B9"
         }
       ]
    }

Vamos ilustrar como seria o acesso via *GET* para ver detalhes do recurso "The Matrix". Primeiro,
criamos o método na aplicação que é responsável por dar detalhes de um filme:

    ::python

    import hug
    from falcon import HTTP_404

    ...

    @hug.get('/movies/{movie_id}/')
    def movie(movie_id, response):
      movie_ids = map(lambda x: x['id'], MOVIES)

      if movie_id not in movie_ids:
        response.status = HTTP_404
        return 'Not found'

      movie = MOVIES[movie_ids.index(movie_id)]

Seguindo uma boa prática, visualizar detalhes de um determinado recurso deveria ter um endereço
composto pelo seu nome (no caso, `movies`), mais o seu identificador (no caso, `DED621D5-08F4-4D32-ADFA-84375BA415B9`):

    ::shell

    $ curl -i http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/

    HTTP/1.0 200 OK
    Date: Fri, 13 May 2016 00:58:57 GMT
    Server: WSGIServer/0.2 CPython/3.4.4
    content-type: application/json
    content-length: 221

    {"description": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", "title": "The Matrix", "id": "DED621D5-08F4-4D32-ADFA-84375BA415B9"}

### Adicionando

Outro verbo bem conhecido do protocolo é o *POST*. Quem aqui nunca submeteu um formulário *Web*?

O princípio desse método é o envio de dados, do cliente para o servidor. Vamos aproveitar dessa sua
natureza para adicionar o filme "Swordish" à nossa *API*. Para isso, precisamos alterar nossa função `movies`:

    ::python
    import hug
    import uuid
    from falcon import HTTP_201, HTTP_404

    ...

    @hug.get_post()
    def movies(request, response):
      if request.method == 'GET':
        return {
          'objects': MOVIES,
        }
      else:  # We are assuming it's a POST
        movie = {
          'uuid': str(uuid.uuid4()),
          'title': request.get_param('title'),
          'description': request.get_param('description'),
        }
        MOVIES.append(movie)

        response.status = HTTP_201
        return movie

	...

Como é possível reparar no código acima, pretendemos adicionar um filme e o destino da nossa requisição
será o `/movies/`. Desse modo, o *GET* lista e o *POST* adiciona novos filmes:

	::shell

	$ curl -i -XPOST -d "title=Swordfish&description=Some hackish description..." http://localhost:8000/movies

	HTTP/1.0 201 Created
	Date: Fri, 13 May 2016 01:51:43 GMT
	Server: WSGIServer/0.2 CPython/3.4.4
	content-type: application/json
	content-length: 116

	{"title": "Swordfish", "uuid": "a96e7212-6a29-478a-a24e-07720a286944", "description": "Some hackish description..."}

Agora temos dois filmes cadastrados na nossa API:

    ::json
    {
       "objects" : [
          {
             "description" : "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
             "title" : "The Matrix",
             "id" : "DED621D5-08F4-4D32-ADFA-84375BA415B9"
          },
          {
            "description": "Some hackish description...",
            "title" : "Swordfish",
            "id": "a96e7212-6a29-478a-a24e-07720a286944"
          }
       ]
    }

### Atualizando e removendo

Uma vez que *POST* e *GET* acontecem no *endpoint* responsável por "listar" os nossos filmes,
é natural assumirmos que o *PUT* e *DELETE* acontecerão no *endpoint* responsável por
"detalhar" determinado filme.

O *PUT* é o método *HTTP* responsável por atualizar um determinado recurso. Assim como o *POST*,
ele permite a passagem de parâmetros que podem ser interpretados como "campos".

Já o *DELETE*, como o nome sugere, é o método padrão quando insinuamos a remoção de um determinado
recurso à nossa *API*.

Na prática, para suportar esses dois verbos, nossa função `movie` ficará assim:

    ::python
    @hug.http('/movies/{movie_id}/', accept=('get', 'put', 'delete'))
    def movie(movie_id, request, response):
      movie_ids = map(lambda x: x['id'], MOVIES)

      if movie_id not in movie_ids:
        response.status = HTTP_404
        return 'Not found'

      movie = MOVIES[movie_ids.index(movie_id)]

      if request.method == 'DELETE':
        MOVIES.remove(movie)
        return 'Deleted'

      if request.method == 'PUT':
        movie['title'] = request.get_param('title')
        movie['description'] = request.get_param('description')
        return movie

      return movie

Agora podemos atualizar o filme "Swordfish":

    ::shell

    curl -i -XPUT -d "title=A Senha&description=Um filme sobre Hackers" http://localhost:8000/movies/a96e7212-6a29-478a-a24e-07720a286944/

    HTTP/1.0 200 OK
    Date: Fri, 13 May 2016 02:25:42 GMT
    Server: WSGIServer/0.2 CPython/3.4.4
    content-type: application/json
    content-length: 107

    {"title": "A Senha", "id": "a96e7212-6a29-478a-a24e-07720a286944", "description": "Um filme sobre Hackers"}

E até mesmo apagá-lo:

    ::shell

    curl -i -XDELETE http://localhost:8000/movies/a96e7212-6a29-478a-a24e-07720a286944/

    HTTP/1.0 200 OK
    Date: Fri, 13 May 2016 02:26:52 GMT
    Server: WSGIServer/0.2 CPython/3.4.4
    content-type: application/json
    content-length: 9

    "Deleted"

E com isso fechamos as operações de *CRUD* através dos métodos *POST*, *GET*, *PUT* e *DELETE*.


## Ser JSON, ou não ser...

Uma das premissas do *REST* é que um recurso possa ser apresentado de diferentes maneiras.
Por exemplo, o nosso filme se acessado pelo navegador, poderia ser representado através de
um *HTML*. Por outro lado, se ele fosse acessado por uma requisição *Ajax*, ele poderia
ser representado por um *JSON*.

Uma terceira modalidade de entrega poderia ser em *XML*, ou em qualquer formato
que tanto cliente quanto fornecedor entendam. Esse "acordo" entre as partes é realizado
através do cabeçalho de requisição `Accept`, e pelo cabeçalho de resposta `content-type`:

    ::shell

    $ curl -v -H "Accept: application/json" http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/

    GET /movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/ HTTP/1.1
    Host: localhost:8000
    User-Agent: curl/7.43.0
    Accept: application/json

    HTTP/1.0 200 OK
    Date: Fri, 13 May 2016 02:41:07 GMT
    Server: WSGIServer/0.2 CPython/3.4.4
    content-length: 221
    content-type: application/json

Com isso, permitimos que tanto cliente quanto fornecedor conversem livremente,
desde que em um mesmo dialeto. Embora não haja um padrão formal, é comum vermos
*APIs* dando suporte a renderizações em *JSON* e *XML*.

Isso pode parecer até um exagero, e uma complexidade questionável na sua aplicação.
A boa notícia é que a maioria das bibliotecas *REST* dão suporte *built-in* a essa
funcionalidade.

## Stateless

Uma das premissas do *REST* é a comunicação sem estados. Isso significa que,
assim como o próprio [protocolo *HTTP*]({filename}entendendo-os-cookies-e-sessoes.md "Leia mais sobre stateless, Cookies e Sessions"),
não "conserva-se informações" entre as requisições.

Na prática, isso significa que cliente pode enviar múltiplas requisições
para o servidor, no entanto, cada uma delas deve ser independente. Cada uma
deve possuir toda a informação necessária para que o servidor possa interpretá-las
completamente (e separadamente).

Isso facilita o [*caching*]({filename}09-o-cache-e-o-http.md "O Cache e o HTTP") e
escalabilidade da sua solução.

Caso estados precisem ser armazenados, é uma responsabilidade do cliente fazê-los.


## Considerações finais

Chegamos ao fim desse artigo, e uma pergunta fica: Mas o que é *RESTful*?

Uma *API RESTful* na verdade é uma *API* que segue os princípios do *REST* de
forma mais "fiel". Enquadrando-se plenamente nas seguintes regras:

* Cliente/servidor
* *Stateless*
* Cacheável
* Interface uniforme para comunicação entre o cliente e o servidor
* Uso de camadas (facilitando escalabilidade, confiabilidade e segurança)

No fim das contas, sendo *REST* ou *RESTful*, utilizar os conceitos
é uma boa forma de criar serviços (de baixo custo) para as suas aplicações,
que podem ser aplicados, por exemplo, dentro de uma arquitetura de microserviços.

Até a próxima.

## Referências

* [*Hug - Embrace APIs from the future*](http://www.hug.rest/website/quickstart)
* [*iMasters - REST Architecture Model: Definition, Constraints and Benefits*](http://imasters.expert/rest-architecture-model-definition-constraints-benefits/)
* [*InfoQ - REST Introduction*](https://www.infoq.com/br/articles/rest-introduction)
* [*Wikipedia - HATEOAS*](https://en.wikipedia.org/wiki/HATEOAS)
* [*Wikipedia* - Hipermídia](https://pt.wikipedia.org/wiki/Hiperm%C3%ADdia)
* [*Wikipedia* - Hipertexto](https://pt.wikipedia.org/wiki/Hipertexto)
* [*Wikipedia - URI*](https://pt.wikipedia.org/wiki/URI)
