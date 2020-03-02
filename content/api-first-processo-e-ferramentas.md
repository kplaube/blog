title: API-First: Processo e ferramentas
Date: 2020-03-02 10:15:00
Category: desenvolvimento
Tags: desenvolvimento, web, rest, prism, dredd, apis, api-first, swagger, drf, oai
Slug: api-first-processo-e-ferramentas
Image: /images/blog/swaggerhub-logo.png
Alt: Logotipo do Swagger

No [_post_ anterior]({filename}api-first.md "O API-First") tive a oportunidade de falar
de uma forma mais abrangente sobre o [_API-First_]({tag}api-first "Leia mais sobre API-First").
O exercício é interessante, uma vez que é possível focar no conceito,
ao invés de ferramentas e processos. Mas o objetivo
desse artigo é cairmos de cabeça em como exercitar a ideia de forma prática.

<!-- PELICAN_END_SUMMARY -->

O problema a ser solucionado será explicado mais abaixo, mas antes de cairmos na tentação
de pensar no _framework [web]({tag}web "Leia mais sobre web")_, na modelagem de dados,
em qual servidor de aplicação usar, ou em virtualizar com [_Docker_]({tag}docker "Leia mais sobre Docker")
e _Kubernetes_, vamos focar primeiro na especificação.

{% img align-center-keep-size /images/blog/api-first-flow.png 422 296 Diferença de fluxos %}

Com sorte seremos capazes de produzir uma [_API_]({tag}apis "Leia mais sobre APIs")
que atenda a necessidade dos nossos _stakeholders_.

## O problema

Vamos "reciclar" o problema proposto no _post_ sobre [_Django REST Framework_]({filename}construindo-apis-em-django-com-drf.md "Construindo APIs em Django com DRF")
e construir um "Feedly-clone". Então, partiremos da análise do seguinte requisito funcional:

```text
Eu como usuário,
Quero poder visualizar notícias recentes de websites que me cadastrei,
Para que assim eu fique atualizado sobre assuntos de meu interesse
```

Com essa _user story_, podemos pensar no processo que envolve a prática do _API-First_.

## O processo

No [_post_ anterior]({filename}api-first.md "O API-First") mencionei alguns passos
que não podem faltar em um contexto de _API-First_. _Jennifer Riggins_, no ["How to Design Great APIs with Api-First Design"](https://www.programmableweb.com/news/how-to-design-great-apis-api-first-design-and-raml/how-to/2015/07/10 "Leia o artigo na íntegra") traz uma visão mais prática sobre como o processo pode ser definido:

- **Planeje:** Mesmo antes de começar, decida o propósito do produto e comece a esboçar a _API_;
- **Projete e valide:** Debata o conceito com outros _stakeholders_ e progrida com o _design_ da _API_. Prove o conceito através de _mocks_ (mais a seguir) e compreenda como a _API_ será utilizada;
- **Oficialize a especificação:** Construa a especificação de acordo com o planejamento e _design_. Gere
  a documentação baseada na _spec_, enriqueça o _mock_ com os casos de uso e faça o _release_ da mesma;
- **Teste:** Teste para garantir que a _API_ funcione. Teste para garantir que os casos de uso são atendidos.
  Teste para se assegurar que nenhuma nova alteração quebrou o contrato estabelecido. E considere testes automatizados sempre que possível;
- **Implemente:** Não apenas você (_backend_), é hora de outros _stakeholders_ (_mobile_, por exemplo) fazerem
  parte do processo de concepção. Quanto antes interagirem, mais cedo e (teoricamente) mais fácil será a reação
  à mudança;
- **Opere e engage:** Publique-a! Interaja com seus clientes, aprenda com necessidades que ainda precisam ser atendidas,
  e repita o processo. _API-First_ é tão sobre negócios quanto é sobre tecnologia.

{% img align-center-keep-size /images/blog/api-first-processo.png 740 133 Exemplo de processo com o API-First %}

Vamos esmiuçar de forma prática cada um dos passos acima.

### Antes de ir: Single source of truth

A abordagem adotada nesse _post_ seguirá valores apresentados no
["Three Principles of API First Design"](https://medium.com/adobetech/three-principles-of-api-first-design-fa6666d9f694 "Leia o artigo na íntegra). Mais especificamente:

> Your API comes first, then the implementation

E nesse exemplo vamos separar especificação da implementação de forma "concreta". Ou seja, serão dois artefatos
independentes.

Existem alternativas a esse _approach_, por exemplo, o uso do [_drf-yasg_](https://github.com/axnsan12/drf-yasg "Yet another Swagger generator"). Esta é uma ferramenta que gera a especificação ([_Swagger_]({tag}swagger "Leia mais sobre Swagger")
e [_OpenAPI Spec_]({tag}oai "Leia mais sobre OpenApi")) automaticamente de acordo com
o código fonte do seu projeto [_Django_]({tag}django "Leia mais sobre Django") (com _REST Framework_).

Algo deve ser muito claro independente do que optar: Só deve haver uma verdade absoluta; No caso desse artigo,
será a especificação escrita à parte.

## 1: Planeje

Vamos usar [_REST_]({tag}rest "Leia mais sobre REST") como padrão de comunicação entre o nosso servidor e os clientes. Portanto, poderemos utilizar _Open API Spec_
para especificar a _API_. Caso a solução fosse a adoção de outra tecnologia (por exemplo, _GraphQL_ ou _gRPC_), alternativas para o passo de descrição e documentação da interface devem ser aplicadas.

Além disso, seremos o mais "compliant" possível com o _RESTful_, ou seja, seguiremos à risca recomendações
em relação a _path_, _status codes_ e verbos. O versionamento da _API_ acontecerá via fragmento no _path_ (ex.: `/v1/`),
e a princípio apresentaremos apenas respostas em _JSON_.

Imaginemos que depois de ponderar com outros _stakeholders_, chegamos à seguinte conclusão:

```json
[
  {
    "id": 1,
    "title": "Título do artigo publicado no canal ABC",
    "pub_date": "data-com-timezone-incluso",
    "summary": "Resumo do artigo",
    "content": "Conteúdo completo do artigo",
    "image": "imagem-principal-do-artigo.png",
    "channel": "ABC",
    "url": "http://article-1.html"
  },
  {
    "id": 2,
    "title": "Título do artigo publicado no canal XYZ",
    "pub_date": "data-com-timezone-incluso",
    "summary": "Resumo do artigo (2)",
    "content": "Conteúdo completo do artigo",
    "image": "imagem-principal-do-artigo-2.png",
    "channel": "XYZ",
    "url": "http://article-2.html"
  }
]
```

Além disso, esboçamos as seguintes rotas:

- `GET /api/v1/channels/<id-do-channel>`: Pega a lista de artigos
- `GET /api/v1/articles/<id-do-artigo>`: Pega o artigo completo

Vamos ocultar complexidades fora do escopo da _user story_ apresentada (como por exemplo, paginação e
autenticação). Além disso, propositalmente não definimos um formato "oficial" para `pub_date`, apenas
determinamos que deverá ser uma data em _UTC_.

Por tratar-se de um esboço inicial que gerará material para a definição do _style guide_ da _API_ e dos _endpoints_
em si, é natural deixarmos passar alguns detalhes que podem gerar problemas de integração.

## 2: Projete e valide

Abaixo, o documento representando exatamente o que foi acordado na seção anterior, com _OpenApi Specification_:

```yaml
openapi: "3.0.2"
info:
  title: Feedly-clone
  version: v1
paths:
  /channels:
    summary: Set of channels, e.g. blogs, websites or podcasts
    get:
      responses:
        "200":
          description: List of channels
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Channel"

  /channels/{id}:
    parameters:
      - $ref: "#/components/parameters/id"
    summary: Details of a channel
    get:
      responses:
        "200":
          description: Channel detail response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Channel"

  /articles:
    summary: Set of items
    get:
      responses:
        "200":
          description: List of articles
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Article"

  /articles/{id}:
    parameters:
      - $ref: "#/components/parameters/id"
    summary: Details of an article
    get:
      responses:
        "200":
          description: Article detail response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Article"

components:
  parameters:
    id:
      name: id
      in: path
      required: true
      schema:
        type: integer
  schemas:
    Channel:
      properties:
        id:
          type: integer
        name:
          type: string

    Article:
      properties:
        id:
          type: integer
        title:
          type: string
        pub_date:
          type: string
        summary:
          type: string
        content:
          type: string
        image:
          type: string
        channel:
          type: string
        url:
          type: string
```

O artigo ["Swagger na prática"]({filename}swagger-na-pratica.md "Leia o artigo na íntegra") pode ser de ajuda caso você não esteja familiarizado com a
síntaxe acima.

### Projete

A partir daqui podemos pensar sob a ótica de casos de uso.
[Práticas e ferramentas podem variar]({filename}software-design-x-software-architecture.md "Software Design x Software Architecture")
dependendo da sua criatividade e do seu time. Para fins didáticos vamos manter esse passo o mais simples possível.

Para início de conversa o _path_ `articles/` não está alinhado o suficiente com a semântica por trás do problema. O formato _RSS_ chama o que estamos chamando de `Article` de `Item`, logo,
se quisermos manter uma linguagem ubíqua é fundamental renomearmos esse elemento.

{% img align-center /images/blog/deathstar.jpg 600 317 Projetar é uma arte, desconhecida pelo Império (movieweb.com) %}

Outro ponto de controvérsia em nosso esboço é que o recurso `articles/` poderia ser um _nested resource_ de `channels/{id}/`:

- `channels/{id}`: Detalhes do _channel_
- `channels/{id}/items`: Lista de _items_ daquele _channel_
- `channels/{channel-id}/items/{item-id}`: Detalhes do _item_

Digamos que após consultar os _stakeholders_ de _mobile_ e _web_, eles concordem com a alteração. É exatamente esse tipo
de questionamento que esse passo deve trazer, além de instigar a discussão com demais interessados.

Por último, mas não menos importante, vamos supor que nossos possíveis clientes não estejam propensos a mostrar
o conteúdo completo dos artigos em sua listagem. Logo, eles estariam fazendo "over-fetching" de informação. Podemos
remover esse campo (`content`) de `channels/{id}/items/{id}`.

A especificação final você pode [conferir aqui](https://gist.github.com/kplaube/d9c16eec70895349c48f9e8ec9e3e5be "Veja mais no Gist").

#### Antes de ir: Over-fetching e Under-fetching

_Over-fetching_ (trazer mais conteúdo do que o necessário em um _request_) e _under-fetching_ (trazer menos conteúdo do
que o necessário) são problemas comuns em _APIs_ _REST_ que possuem pluralidade de clientes.

Soluções variam, das mais ingênuas (criar um _endpoint_ para _mobile_ e um para _web_, por exemplo) até as mais rebuscadas
(como deixar o _REST_ de lado e adotar _GraphQL_). O "meio-termo" seria a adoção de algum mecanismo que permita ao cliente
especificar quais campos ele deseja carregar na requisição.

E é exatamente isso que o [_FlexFields_](https://github.com/rsinger86/drf-flex-fields "Veja o repositório no Github") faz
para soluções escritas em _REST Framework_.

### Valide

É hora de validarmos o contrato.

Poderíamos escrever _views_ muito simples em _Django_ (por exemplo) que atendam a especificação ao responder conteúdo estático. Mas possivelmente a melhor forma de executarmos esse passo seja através de ferramentas chamadas [_mock servers_](https://openapi.tools/#mock "Veja uma lista de mock servers").

As opções são as mais variadas, em diferentes linguagens. A minha sugestão é o [_Prism_](https://github.com/stoplightio/prism "Veja o repositório no Github"),
uma ferramenta escrita em _Javascript_, fácil de instalar e usar.

[Veja como instalar o _Prism_](https://stoplight.io/p/docs/gh/stoplightio/prism/docs/getting-started/01-installation.md?srn=gh/stoplightio/prism/docs/getting-started/01-installation.md "Documentação oficial do Prism").

Executando o _Prism_ com a especificação passada como argumento, temos um servidor fornecendo o contrato via _REST_:

```bash
$ prism mock openapi.yml

› [CLI] …  awaiting  Starting Prism…
› [CLI] ℹ  info      GET        http://127.0.0.1:4010/channels
› [CLI] ℹ  info      GET        http://127.0.0.1:4010/channels/869
› [CLI] ℹ  info      GET        http://127.0.0.1:4010/channels/857/items
› [CLI] ℹ  info      GET        http://127.0.0.1:4010/channels/226/items/12
› [CLI] ▶  start     Prism is listening on http://127.0.0.1:4010

$ curl http://127.0.0.1:4010/channels/1/items/1

{"id":1,"title":"Anthony Mackie fala sobre se tornar o Capitão América","pub_date":"Sat, 29 Feb 2020 19:21:37 +0000","summary":"Quero que o meu Capitão América represente todo mundo, não só um grupo específico de pessoas","image":"https://uploads.jovemnerd.com.br/wp-content/uploads/2020/02/anthony-mackie-capitao-america.jpg","content":"Conteúdo completo","url":"https://jovemnerd.com.br/nerdbunker/anthony-mackie-fala-sobre-se-tornar-o-capitao-america/"}

```

Isso permite que novas avaliações sejam realizadas, modificações aconteçam com antecedência, casos de uso sejam testados,
e até mesmo que outros _stakeholders_ comecem a desenvolver a parte deles sem precisar esperar pelo _backend_ todo estar pronto.

## 3: Oficialize a especificação

Nesse passo estruturamos o _release_ da especificação, gerenciamos o processo e futuras iterações, e (claro) versionamos o arquivo.

Enquanto trabalhei na [_Loadsmart_](https://loadsmart.com/ "Book a truck in seconds"), mantínhamos a especificação em um repositório _Git_ e tínhamos
um _build_ no _CI_ para publicar a documentação baseada na versão do arquivo que encontrava-se no `master`.

Possuímos várias opções para esse passo. Talvez o [_ReDoc_](https://github.com/Redocly/redoc "Visite o repositório no Github")
seja a ferramenta mais estilosa para gerar documentação a partir do _OpenAPI_.

Para fins didáticos vou usar a ferramenta do _Swagger_ e expor a documentação no
[_SwaggerHub_](https://swagger.io/tools/swagger-ui/ "Teste na nuvem"): [https://app.swaggerhub.com/apis-docs/kplaube/feedly-clone/v1](https://app.swaggerhub.com/apis-docs/kplaube/feedly-clone/v1)

{% img align-center-keep-size /images/blog/api-first-swagger-ui.png 740 277 Documentação publicada no Swagger UI %}

## 4: Teste

Teste sempre. Automatize sempre que possível.

Nessa etapa validaremos e garantiremos o funcionamento do contrato. Casos de uso podem ser necessários para estressar
a coerência da _API_. Particularmente, não acho que essa seja a camada mais interessante para testar coisas além do
contrato estabelecido (como por exemplo, a própria lógica de negócio). Pode tornar-se uma linha tênue em sua
[pirâmide de testes](https://martinfowler.com/articles/practical-test-pyramid.html "The Practical Test Pyramid").

O [_Dredd_](https://dredd.org/en/latest/quickstart.html "Documentação do Dredd") é uma ferramenta bem interessante para testar
a especificação construída. Ela utiliza um servidor como alvo, portanto, podemos adicioná-la ao _build pipeline_,
levantarmos o nosso serviço, e ela operará como uma espécie de _Component Test_.

Executando contra o nosso servidor _mockado_, tudo deveria funcionar "out of the box":

```bash
$ dredd ./openapi.yml http://127.0.0.1:4010

warn: API description parser warning in /Users/klaus/Desktop/openapi.yml:66 (from line 66 column 7 to column 13): 'Parameter Object' contains unsupported key 'schema'
warn: API description parser warning in /Users/klaus/Desktop/openapi.yml:73 (from line 73 column 7 to column 13): 'Parameter Object' contains unsupported key 'schema'
warn: API description parser warning in /Users/klaus/Desktop/openapi.yml:102 (from line 102 column 7 to column 12): 'Schema Object' contains unsupported key 'allOf'
pass: GET (200) /channels duration: 63ms
pass: GET (200) /channels/1 duration: 20ms
pass: GET (200) /channels/1/items duration: 14ms
pass: GET (200) /channels/1/items/1 duration: 11ms
complete: 4 passing, 0 failing, 0 errors, 0 skipped, 4 total
complete: Tests took 116ms
```

Um outro extra muito interessante
é a [possibilidade de escrever _hooks_ em _Python_](https://dredd.org/en/latest/hooks/python.html "Leia mais na documentação do Dredd"), o que nos permite criar casos de uso de acordo com diferentes aspectos e contextos.

## 5: Implemente

Agora sim! Finalmente a parte divertida.

Agora é correr para o _Django_ e implementar a _API_. Se você estiver interessado no _Django REST Framework_, escrevi sobre ele recentemente no ["Construindo APIs em Django com Django REST Framework"]({filename}construindo-apis-em-django-com-drf.md "Leia o artigo na íntegra"). Não perca.

Ao fim do desenvolvimento, não esqueça de executar o _Dredd_ apontando para o serviço _Django_. Aliás, colocar essa checagem em um _CI_ é uma excelente ideia! Dependendo do seu _release train_, a falha dessa checagem pode inclusive bloquear o seu
_Continuous Delivery_.

## 6: Opere e engage

A sua funcionalidade está pronta. O seu produto está documentado. Agora é hora de "ir para a rua".

Com essa ideia de "uma _API_ para todos governar", fica mais fácil ser adepto da corrente do "eat your own dog food". Tendo
outros times da sua própria organização como usuários fica mais fácil coletar _feedbacks_ e reiniciar todo o processo
descrito com novas demandas e possíveis correções.

Para terceiros, é fundamental tratar a _API_ como parte do negócio, e ela (e sua documentação) precisa ter espaço de destaque no _website_ da sua empresa. O [_Twillio_](https://www.twilio.com/ "Communication APIs for SMS, Voice and Video") faz isso
muito bem:

{% img align-center-keep-size /images/blog/api-first-engage.png 740 198 Exemplo de exposição de documentação %}

Além disso, existem _marketplaces_ de _APIs_ espalhados pela _web_ que podem servir como canal de propaganda da sua _API_. O [RapidAPI](https://rapidapi.com/ "Find and Connect to Thousands of APIs") é um bom exemplo de plataforma para conectar-se
com possíveis consumidores.

Não esqueça que propiciar _SDKs_ para os seus consumidores faz parte dessa etapa. Não basta apenas escrevermos o _backend_,
precisamos nos engajar em escrever clientes para diferentes linguagens. O [_Swagger Codegen_](https://swagger.io/tools/swagger-codegen/ "Generate server stubs and client SDKs for any API") pode ajudar nessa tarefa, gerando _SDKs_
a partir da especificação da sua _API_.

## Considerações finais

Abordamos o processo, os passos, e quais ferramentas podemos utilizar para atender os requisitos necessários
em cada etapa. Faltou abordar de forma prática como "colocar isso tudo junto para funcionar". O _post_
ficou gigante, e possivelmente abordaremos em uma parte 2 como colocar isso tudo em um _CI_, e em como
orquestrar _release_ de especificação e _deploy_ de aplicação.

Há uma pluralidade interessante de ferramentas e serviços que giram em torno do conceito de _API-First_. Se
por um lado isso pode significar aumentar a complexidade do seu processo de desenvolvimento, por outro é
também uma certa garantia de que existem outros _players_ investindo nessa prática, e que se você tem na sua
_API_ o seu principal produto, talvez ficar por fora possa ocasionar um problema de estratégia.

Até a próxima.

## Referências

- [Dredd - HTTP API Testing Framework](https://dredd.org/en/latest/index.html)
- [OpenAPI.Tools](https://openapi.tools/)
- [ProgrammableWeb - How To Design Great APIs With API-First Design](https://www.programmableweb.com/news/how-to-design-great-apis-api-first-design-and-raml/how-to/2015/07/10)
- [Stoplightio - Prism](https://stoplight.io/p/docs/gh/stoplightio/prism)
- [Trimble MAPS Engineering Blog - API-First Development and OpenAPI](https://medium.com/trimble-maps-engineering-blog/api-first-development-and-openapi-835afb46b7f1)
