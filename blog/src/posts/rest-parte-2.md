---
title: "REST - Parte 2"
date: 2016-05-20 12:35:00
modified: 2023-11-09 21:56:00
tags: ["desenvolvimento-web", "rest", "microservices", "api"]
slug: rest-parte-2
thumbnail: /media/rest-logo.png
---

No [_post_ anterior](/2016/01/06/rest-parte-1.html "Leia a parte 1"), demos uma pequena introdução
ao conceito de _REST_ e fizemos um raso comparativo com o seu "rival", o _SOAP_.
Nesse artigo falaremos mais sobre como interagir com _APIs_ _REST_ utilizando
os verbos do protocolo _HTTP_, e a biblioteca [_hug_](http://www.hug.rest/ "Embrace APIs of the future"),
que nos ajudará a ilustrar como uma _API_ funciona na prática.

Segundo o [_InfoQ_](https://www.infoq.com/br/articles/rest-introduction "Introdução ao REST"),
o _REST_ possui cinco princípios fundamentais:

- Dê a todas as coisas um identificador
- Vincule as coisas
- Utilize métodos padronizados
- Recursos com múltiplas representações
- Comunique sem estado

Esses cinco itens nos guiarão daqui para frente.

## O Uniform Resource Identifier

Você já parou para pensar que na _Internet_ tudo tem um "endereço único"?
Do formulário de contato do seu _blog_ até um vídeo no _Youtube_?

Todo recurso tem um nome e pode ser identificado de forma única.
Esse conceito é conhecido por _Uniform Resource Identifier_ (_URI_) e é
composto pelo _Uniform Resource Locator_ (_URL_) e _Uniform Resource Name_ (_URN_).

Logo, quando falamos do endereço `http://google.com/index.html`, podemos assumir a seguinte
estrutura:

```text
http://google.com/index.html
|------ URL -----|-- URN --|
|----------- URI ----------|
```

Como uma _API_ _REST_ é um recurso disponível na [_web_](/tag/desenvolvimento-web.html "Leia mais sobre web"),
essa regra não é diferente. Daremos identificadores únicos para cada recurso exposto.

Utilizaremos o `localhost:8000` para os exemplos a seguir. Portanto, vamos imaginar que
temos uma _API_ de filmes, e gostaríamos de listar todos os filmes. Uma boa prática
é utilizarmos o substantivo no plural. Exemplo:

```text
http://localhost:8000/movies/
```

Vamos supor que o filme "The Matrix", dentro da nossa base de dados, tenha o _ID_ `20`.
Na nossa _API_ poderíamos acessá-lo através da seguinte _URI_:

```text
http://localhost:8000/movies/20/
```

Consequentemente, outro filme teria um identificador diferente. Por exemplo, para acessarmos
o filme "Swordfish", que no nosso exemplo possui o _ID_ `55`, temos:

```text
http://localhost:8000/movies/55/
```

Outra boa prática é utilizarmos [_UUIDs_](https://en.wikipedia.org/wiki/Universally_unique_identifier "Leia mais sobre UUID")
ao invés das chaves primárias do nosso banco de dados. Isso obscurece o funcionamento da
aplicação, tornando-a ligeiramente mais segura:

```text
http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/
```

Legal! Já tenho como acessar o filme _The Matrix_, dentro da nossa "_API_ imaginária". Será
que temos alguma maneira fácil de acessar, por exemplo, os atores que fazem parte desse
filme?

## Hipermídia

O conceito de hipermídia pode ser bastante abstrato. Segundo o _Wikipedia_:

> Hipermídia é a reunião de várias mídias num ambiente computacional, suportada por sistemas eletrônicos
> de comunicação. Hipermídia, diferentemente de multimídia, não é a mera reunião dos meios existentes, e
> sim a fusão desses meios a partir de elementos não-lineares.

A melhor forma de entender esse conceito é se olharmos para uma forma de hipermídia muito conhecida: o hipertexto (sim,
o "H" do [_Hypertext Markup Language_](/tag/html.html "Leia mais sobre HTML")). Nele, temos um "texto interativo",
não necessariamente linear e composto por diferentes outras mídias (como som, vídeo, imagens, etc).

Mas o ponto que mais ilustra o que é um hipertexto é a capacidade de um texto referenciar a outro. Esse
conceito, chamado de hiperlinks (ou somente _links_, para os mais jovens) permite com que eu seja capaz de navegar
entre documentos apenas seguindo as suas referências, sem conhecer previamente o destino do meu passo seguinte.

![Aqui de boas fazendo umas APIs com os meus amigos (cosmopolitan.com)](/media/social-network-movie.jpg "Aqui de boas fazendo umas APIs com os meus amigos (cosmopolitan.com)")

Quando esse conceito é aplicado ao contexto de _REST_, temos o que chamamos de _Hypermedia as the Engine
of Application State_ ([_HATEOAS_](https://en.wikipedia.org/wiki/HATEOAS "Leia mais sobre HATEOAS")).
Segundo ele, nosso cliente deve ser capaz de interagir com a nossa aplicação
(e até mesmo demais aplicações vinculadas a ela) através de hipermídia. Dessa forma, eu não preciso necessariamente
conhecer todos os _endpoints_ de uma _API_, ela me informará dada uma determinada _URI_, para onde eu posso navegar.

Pegando a nossa _API_ de filmes, eu deveria ter dentro da resposta do filme "The Matrix" alguma informação me dizendo
que para listar os atores desse filme, eu deveria acessar `http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/actors/`.
E uma vez eu estando nessa listagem, deveria haver um _link_ me dizendo que para ver os detalhes da
[_Carrie-Anne Moss_](http://www.imdb.com/name/nm0005251/ "Carrie-Anne Moss no IMDB"), por exemplo,
eu devo acessar a _URI_ `http://localhost:8000/actors/A3531BF5-C089-4A44-8A92-5A5AC08261AA/`.

Exemplo:

```xml
<movie>
  <uuid>DED621D5-08F4-4D32-ADFA-84375BA415B9</uuid>
  <title>The Matrix</title>

  <link rel="actors" href="http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/actors/" />
</movie>
```

Ou em uma resposta em _JSON_, poderíamos ter algo parecido com o exemplo abaixo:

```json
{
  "uuid": "DED621D5-08F4-4D32-ADFA-84375BA415B9",
  "title": "The Matrix",

  "_links": {
    "actors": "http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/actors/"
  }
}
```

## Um pouquinho de prática

Antes de falarmos sobre os verbos _HTTP_, vamos utilizar o _hug_ para uma abordagem um
pouco mais prática. Iniciamos com a instalação da biblioteca:

```text
$ pip3 install hug
```

Para tornar as coisas simples, vamos simular o acesso ao banco de dados com o uso de dicionários _Python_.

```python
# api.py

import hug

MOVIES = [
  {
    'id': 'DED621D5-08F4-4D32-ADFA-84375BA415B9',
    'title': 'The Matrix',
    'description': 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
  }
]
```

A _URI_ por si só não significa nada. Precisamos de métodos para acessá-la (e manipulá-la), e o protocolo _HTTP_
possui alguns verbos que podem executar essas operações para nós.

### Listagem e detalhes

O _GET_ é sem dúvida o mais famoso deles. É através dele que somos capazes de "pegar" os recursos da _web_, incluindo
páginas na Internet como essa que você está lendo. Com esse verbo, podemos listar e visualizar mais detalhes de um
determinado recurso na _web_.

Vamos começar retornando a listagem de filmes:

```python
# api.py

import hug

...

@hug.get()
def movies():
  return {
    'objects': MOVIES,
  }
```

Para executar a _API_ no seu ambiente local, utilize o seguinte comando:

```text
$ hug -f api.py
```

Agora, ao acessar a _URI_ `http://localhost:8000/movies/`, obtemos a seguinte resposta:

```json
{
  "objects": [
    {
      "description": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      "title": "The Matrix",
      "id": "DED621D5-08F4-4D32-ADFA-84375BA415B9"
    }
  ]
}
```

Vamos ilustrar como seria o acesso via _GET_ para ver detalhes do recurso "The Matrix". Primeiro,
criamos o método na aplicação que é responsável por dar detalhes de um filme:

```python
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
```

Seguindo uma boa prática, visualizar detalhes de um determinado recurso deveria ter um endereço
composto pelo seu nome (no caso, `movies`), mais o seu identificador (no caso, `DED621D5-08F4-4D32-ADFA-84375BA415B9`):

```text
$ curl -i http://localhost:8000/movies/DED621D5-08F4-4D32-ADFA-84375BA415B9/

HTTP/1.0 200 OK
Date: Fri, 13 May 2016 00:58:57 GMT
Server: WSGIServer/0.2 CPython/3.4.4
content-type: application/json
content-length: 221

{"description": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", "title": "The Matrix", "id": "DED621D5-08F4-4D32-ADFA-84375BA415B9"}
```

### Adicionando

Outro verbo bem conhecido do protocolo é o _POST_. Quem aqui nunca submeteu um formulário _web_?

O princípio desse método é o envio de dados, do cliente para o servidor. Vamos aproveitar dessa sua
natureza para adicionar o filme "Swordish" à nossa _API_. Para isso, precisamos alterar nossa função `movies`:

```python
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
```

Como é possível reparar no código acima, pretendemos adicionar um filme e o destino da nossa requisição
será o `/movies/`. Desse modo, o _GET_ lista e o _POST_ adiciona novos filmes:

```text
$ curl -i -XPOST -d "title=Swordfish&description=Some hackish description..." http://localhost:8000/movies

HTTP/1.0 201 Created
Date: Fri, 13 May 2016 01:51:43 GMT
Server: WSGIServer/0.2 CPython/3.4.4
content-type: application/json
content-length: 116

{"title": "Swordfish", "uuid": "a96e7212-6a29-478a-a24e-07720a286944", "description": "Some hackish description..."}
```

Agora temos dois filmes cadastrados na nossa API:

```json
{
  "objects": [
    {
      "description": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      "title": "The Matrix",
      "id": "DED621D5-08F4-4D32-ADFA-84375BA415B9"
    },
    {
      "description": "Some hackish description...",
      "title": "Swordfish",
      "id": "a96e7212-6a29-478a-a24e-07720a286944"
    }
  ]
}
```

### Atualizando e removendo

Uma vez que _POST_ e _GET_ acontecem no _endpoint_ responsável por "listar" os nossos filmes,
é natural assumirmos que o _PUT_ e _DELETE_ acontecerão no _endpoint_ responsável por
"detalhar" determinado filme.

O _PUT_ é o método _HTTP_ responsável por atualizar um determinado recurso. Assim como o _POST_,
ele permite a passagem de parâmetros que podem ser interpretados como "campos".

Já o _DELETE_, como o nome sugere, é o método padrão quando insinuamos a remoção de um determinado
recurso à nossa _API_.

Na prática, para suportar esses dois verbos, nossa função `movie` ficará assim:

```python
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
```

Agora podemos atualizar o filme "Swordfish":

```text
curl -i -XPUT -d "title=A Senha&description=Um filme sobre Hackers" http://localhost:8000/movies/a96e7212-6a29-478a-a24e-07720a286944/

HTTP/1.0 200 OK
Date: Fri, 13 May 2016 02:25:42 GMT
Server: WSGIServer/0.2 CPython/3.4.4
content-type: application/json
content-length: 107

{"title": "A Senha", "id": "a96e7212-6a29-478a-a24e-07720a286944", "description": "Um filme sobre Hackers"}
```

E até mesmo apagá-lo:

```text
curl -i -XDELETE http://localhost:8000/movies/a96e7212-6a29-478a-a24e-07720a286944/

HTTP/1.0 200 OK
Date: Fri, 13 May 2016 02:26:52 GMT
Server: WSGIServer/0.2 CPython/3.4.4
content-type: application/json
content-length: 9

"Deleted"
```

E com isso fechamos as operações de _CRUD_ através dos métodos _POST_, _GET_, _PUT_ e _DELETE_.

## Ser JSON, ou não ser...

Uma das premissas do _REST_ é que um recurso possa ser apresentado de diferentes maneiras.
Por exemplo, o nosso filme se acessado pelo navegador, poderia ser representado através de
um _HTML_. Por outro lado, se ele fosse acessado por uma requisição _Ajax_, ele poderia
ser representado por um _JSON_.

Uma terceira modalidade de entrega poderia ser em _XML_, ou em qualquer formato
que tanto cliente quanto fornecedor entendam. Esse "acordo" entre as partes é realizado
através do cabeçalho de requisição `Accept`, e pelo cabeçalho de resposta `content-type`:

```text
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
```

Com isso, permitimos que tanto cliente quanto fornecedor conversem livremente,
desde que em um mesmo dialeto. Embora não haja um padrão formal, é comum vermos
_APIs_ dando suporte a renderizações em _JSON_ e _XML_.

Isso pode parecer até um exagero, e uma complexidade questionável na sua aplicação.
A boa notícia é que a maioria das bibliotecas _REST_ dão suporte _built-in_ a essa
funcionalidade.

## Stateless

Uma das premissas do _REST_ é a comunicação sem estados. Isso significa que,
assim como o próprio [protocolo _HTTP_](/2012/04/05/entendendo-os-cookies-e-sessoes.html "Leia mais sobre stateless, Cookies e Sessions"),
não "conserva-se informações" entre as requisições.

Na prática, isso significa que cliente pode enviar múltiplas requisições
para o servidor, no entanto, cada uma delas deve ser independente. Cada uma
deve possuir toda a informação necessária para que o servidor possa interpretá-las
completamente (e separadamente).

Isso facilita o [_caching_](/2012/05/14/o-cache-e-o-http.html "O Cache e o HTTP") e
escalabilidade da sua solução.

Caso estados precisem ser armazenados, é uma responsabilidade do cliente fazê-los.

## Considerações finais

Chegamos ao fim desse artigo, e uma pergunta fica: Mas o que é _RESTful_?

Uma _API RESTful_ na verdade é uma _API_ que segue os princípios do _REST_ de
forma mais "fiel". Enquadrando-se plenamente nas seguintes regras:

- Cliente/servidor
- _Stateless_
- Cacheável
- Interface uniforme para comunicação entre o cliente e o servidor
- Uso de camadas (facilitando escalabilidade, confiabilidade e segurança)

No fim das contas, sendo _REST_ ou _RESTful_, utilizar os conceitos
é uma boa forma de criar serviços (de baixo custo) para as suas aplicações,
que podem ser aplicados, por exemplo, dentro de uma arquitetura de microserviços.

Até a próxima.

## Referências

- [_Hug - Embrace APIs from the future_](http://www.hug.rest/website/quickstart)
- [_iMasters - REST Architecture Model: Definition, Constraints and Benefits_](http://imasters.expert/rest-architecture-model-definition-constraints-benefits/)
- [_InfoQ - REST Introduction_](https://www.infoq.com/br/articles/rest-introduction)
- [_Wikipedia - HATEOAS_](https://en.wikipedia.org/wiki/HATEOAS)
- [_Wikipedia_ - Hipermídia](https://pt.wikipedia.org/wiki/Hiperm%C3%ADdia)
- [_Wikipedia_ - Hipertexto](https://pt.wikipedia.org/wiki/Hipertexto)
- [_Wikipedia - URI_](https://pt.wikipedia.org/wiki/URI)
