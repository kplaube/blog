title: API-First na prática com Django
Date: 2020-02-28 09:15:00
Category: desenvolvimento
Tags: desenvolvimento, web, python, django, rest, apis, api-first, swagger, drf, oai
Slug: api-first-na-pratica-com-django
Image: /images/blog/swaggerhub-logo.png
Alt: Logotipo do Swagger

No [_post_ anterior]({filename}api-first.md "O API-First") tive a oportunidade de falar
de uma forma mais abrangente sobre o [_API-First_]({tag}api-first "Leia mais sobre API-First").
O exercício é interessante, uma vez que é possível focar no conceito,
ao invés de ferramentas e processos. Mas o objetivo
desse artigo é cairmos de cabeça em como exercitar a ideia de forma prática.

<!-- PELICAN_END_SUMMARY -->

O problema a ser solucionado será explicado mais abaixo, mas antes de cairmos na tentação
de pensar na modelagem de dados, em qual servidor de aplicação usar, ou em virtualizar
com [_Docker_]({tag}docker "Leia mais sobre Docker") e _Kubernetes_,
vamos nos focar primeiro na especificação.

-> Diagrama bottom-up

Analisaremos o contrato sob a ótica de três diferentes _stakeholders_:

- O _website_
- A aplicação _mobile_
- E um cliente terceiro

Com sorte seremos capazes de produzir uma [_API_]({tag}apis "Leia mais sobre APIs")
apenas que atenda as três necessidades.

Obviamente, a única decisão "up front" que estamos propensos a tomar é o uso de
[_Django_]({tag}django "Leia mais sobre Django"). Afinal,
[_Python_]({tag}python "Leia mais sobre Python") é maneiro e nós amamos _Django_, não é mesmo?

## O problema

Vamos "reciclar" o problema proposto no _post_ sobre [_Django REST Framework_]({filename}construindo-apis-em-django-com-drf.md "Construindo APIs em Django com DRF")
e construir um "Feedly-clone". Então, vamos partir da análise do seguinte requisito funcional:

```text
Eu como usuário,
Quero poder visualizar notícias recentes de websites que me cadastrei,
Para que assim eu fique atualizado sobre assuntos de meu interesse
```

Com essa _user story_, podemos pensar no processo que envolve a prática do _API-First_.

## O processo

No [_post_ anterior]({filename}api-first.md "O API-First") mencionei alguns passos
que não podem faltar em um contexto de _API-First_. _Jennifer Riggins_, no ["How to Design Great APIs with Api-First Design"](https://www.programmableweb.com/news/how-to-design-great-apis-api-first-design-and-raml/how-to/2015/07/10 "Leia o artigo na íntegra") traz uma visão mais prática sobre como o processo deveria
ser definido:

- **Planeje:** Mesmo antes de começar, decida o propósito do produto e comece a esboçar a _API_;
- **Projete e valide:** Debata o conceito com outros _stakeholders_ e progrida com o _design_ da _API_. Prove o conceito através de _mocks_ (mais a seguir) e compreenda como a _API_ será utilizada;
- **Oficialize a especificação:** Construa a especificação de acordo com o planejamento e _design_. Gere
  a documentação baseada na _spec_ enriqueça o _mock_ com os casos de uso, e faça o _release_ da mesma;
- **Teste:** Teste para garantir que a _API_ funcione. Teste para garantir que os casos de uso são atendidos.
  Teste para se assegurar que nenhuma nova alteração quebrou o contrato estabelecido. E considere testes automatizados sempre que possível;
- **Implemente:** Não apenas você (_backend_), é hora de outros _stakeholders_ (_mobile_, por exemplo) fazerem
  parte do processo de concepção. Quanto antes interagirem, mais cedo e (teoricamente) mais fácil será a reação
  à mudança;
- **Opere e engage:** Publique-a! Interaja com seus clientes, aprenda com necessidades que ainda precisam ser atendidas,
  e repita o processo. _API-First_ é tão sobre negócios quanto é sobre tecnologia.

-> Diagram do iterativo e api-first

Vamos esmiuçar de forma prática cada um dos passos acima.

### Antes de ir: Single source of truth

A abordagem apresentada nesse _post_ seguirá valores apresentados no
["Three Principles of API First Design"](https://medium.com/adobetech/three-principles-of-api-first-design-fa6666d9f694 "Leia o artigo na íntegra). Mais especificamente:

> Your API comes first, then the implementation

E nesse exemplo vamos separar especificação da implementação de forma "concreta". Ou seja, serão dois artefatos
independentes.

Existem alternativas a esse _approach_, por exemplo, o uso do [_drf-yasg_](https://github.com/axnsan12/drf-yasg "Yet another Swagger generator"). Esta é uma ferramenta que gera a especificação (_Swagger_ e _Open API Spec_) automaticamente de acordo com
o código fonte do seu projeto _Django_ (com _REST Framework_).

Algo deve ser muito claro independente do que optar: Só deve haver uma verdade absoluta; No caso desse artigo,
será a especificação escrita à parte.

## 1: Planeje

Vamos usar _REST_ como padrão de comunicação entre o nosso servidor e os clientes. Portanto, poderemos utilizar _Open API Spec_
para especificar a _API_. Caso a solução fosse outra a adoção de outra tecnologia (por exemplo, _GraphQL_ ou _gRPC_), alternativas para o passo de descrição e documentação da interface devem ser aplicadas.

Além disso, vamos ser o mais "compliant" possível com o _RESTful_, ou seja, seguiremos à risca recomendações
em relação a _path_, _status codes_ e verbos. O versionamento da _API_ acontecerá via fragmento no _path_ (ex.: `/v1/`),
e a princípio apresentaremos apenas respostas em _JSON_.

Imaginemos que depois de ponderar com outros _stakeholders_, chegamos a conclusão que o _JSON_ a seguir atende
as expectativas:

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

Falaremos mais deles ao descrever a _API_.

## 2: Projete e valide

## 3: Oficialize a especificação

## 4: Teste

### Antes de ir: Scanapi

## 5: Implemente

## 6: Opere e engage

## Mock-first para ter paralelismo

flask
prism
lepo (old)

https://stoplight.io/blog/python-rest-api/
https://github.com/stoplightio/prism
https://github.com/akx/lepo

## Especificação que possibilidade documentação e testes

## Marketplace para todos dominar

https://rapidapi.com/community/api/open-weather-map
https://rapidapi.com/blog/python-django-rest-api-tutorial/

https://github.com/scanapi/scanapi

https://openapi.tools/#data-validators
https://github.com/rsinger86/drf-flex-fields

## Referências

- [ProgrammableWeb - How To Design Great APIs With API-First Design](https://www.programmableweb.com/news/how-to-design-great-apis-api-first-design-and-raml/how-to/2015/07/10)
- [Trimble MAPS Engineering Blog - API-First Development and OpenAPI](https://medium.com/trimble-maps-engineering-blog/api-first-development-and-openapi-835afb46b7f1)
