title: API-First
Date: 2020-02-20 06:15:00
Category: desenvolvimento
Tags: desenvolvimento, web, rest, apis
Image: /images/blog/rest-api-logo.png
Alt: API

Tratar _APIs_ como "first-class citizens" pode ser um desafio e tanto, principalmente quando estamos em um contexto
de entrega rápida ou de prova de conceito. Como desenvolvedor, admito que priorizo resolver a lógica de negócio
escrevendo código, do que discutindo contratos ou requisitos não funcionais.

<!-- PELICAN_END_SUMMARY -->

## Code-First

O modelo de trabalho ilustrado acima pode ser conhecido por "bottom up", "code first", ou apenas por "aquela forma que a gente
geralmente utiliza em nossos projetos". Onde focamos primeiro no código, e
deixamos para depois questões relacionadas à integração dos componentes.

_Kirsten Hunter_ [ilustra bem os efeitos colaterais de tal prática](https://www.programmableweb.com/news/introduction-to-api-first-design/analysis/2016/10/31 "Introduction to API-First Design"):

> APIs are created as an afterthought once the product has already been created as a tightly coupled system, with the frontend website and backend system entwined together in a highly codependent way and the REST API having to be ‘shoe-horned’ into this system as a separate entity.

Não há nada fundamentalmente errado com essa dinâmica (inclusive, [há opiniões a favor desse conceito](https://www.youtube.com/watch?v=Tb823aqgX_0 "Bottom Up vs Top Down Design in Clojure")), mas com o mundo
cada vez mais "microservices-driven", pensar primeiramente na interface e em quem irá usá-la pode antecipar problemas, diminuir riscos e definir contratos mais sólidos.

Não é raro escutarmos em pleno 2020 histórias sobre times distintos trabalhando em uma grande solução, que quando
colocaram seus serviços para funcionar juntos, descobriram uma série de problemas de integração (ou até mesmo que eles
simplesmente não resolviam o problema).

## O que é API-First?

_API-First_ pode ser grosseiramente resumido em "trate APIs como first-class citizens".

Em outras palavras, a proposta é que _APIs_ sejam consideradas partes fundamentais
do ecossistema de um produto, devem ser parte de sua estratégia e construção,
e não apenas um "extra" ou um "side product".

O _DZone_ define _API-First_ da [seguinte forma](https://dzone.com/articles/an-api-first-development-approach-1 "An API-First Development Approach"):

> (...) is a strategy in which the first order of business is to develop an API that puts your target developer’s interests first and then build the product on top of it (be it a website, mobile application, or a SaaS software). By building on top of APIs with developers in mind, you and your developers are saving a lot of work while laying down the foundations for others to build on.

Elas devem ser tão cruciais quanto usuários são em estratégias _user-centric_ e a experiência
_mobile_ é em um _approach_ _mobile-first_. Utilizar uma abordagem _api-centric_
fará com que o _design_ funcione de uma ótica diferente (possibilitando maior cuidado em relação
a consistência e reuso), e que o negócio gire em torno do contrato que está sendo definido (ocasionando
maior interação com outros _stakeholders_ de forma antecipada, dentro do tempo de vida de desenvolvimento).

### API-centric == Developer Experience

E se pararmos para analisar friamente o que essa ideia significa, ser _api-centric_ é no fim das contas ser _user-centric_.
O usuário nesse caso passa a ser outro desenvolvedor (do mesmo time, da mesma empresa, ou de terceiros), portanto,
_Developer eXperience_ também é parte fundamental dessa estratégia, e vem embutida em sua prática, como ilustra o ["Understanding the API-First Approach to Building Products"](https://swagger.io/resources/articles/adopting-an-api-first-approach/ "Leia mais no Swagger.io"):

> Consumers of APIs are most often developers, and developer experience (DX) can make or break the success of an API. API first ensures that developers have positive experiences using your APIs. Well-designed, well-documented, consistent APIs provide positive developer experiences because it’s easier to reuse code and onboard developers, and it reduces the learning curve.

## Os 3 princípios

_Lars Trieloff_, no [_Adobe Tech Blog_](https://medium.com/adobetech "Leia o blog de tecnologia da Adobe"), escreve sobre
[três princípios fundamentais para o sucesso da prática](https://medium.com/adobetech/three-principles-of-api-first-design-fa6666d9f694 "Veja mais no Adobe Tech Blog"),
que acredito serem essenciais para compreender a real motivação por trás da ideia.

### 1. Your API is the first user interface of your application

Vale estressar esse ponto: Pessoas utilizando a sua _API_ são os seus usuários, e a sua _API_ precisa ser projetada com
esses usuários em mente.

Partindo do princípio que a _API_ é o caminho mais importante de interação com o seu produto, isso significa que ela
deve ter um investimento de tempo equivalente (ou superior) ao tempo investido no desenvolvimento de (por exemplo) interfaces
gráficas.

### 2. Your API comes first, then the implementation

> Your implementation will change frequently, your API should not.

Sua _API_ se torna um contrato que servirá como especificação para a implementação, portanto, o ideal é pensarmos como
duas coisas separadas. Conforme a sua aplicação for evoluindo é muito provável que a sua implementação mude, mas o
contrato deve (dentro do possível) manter-se o mesmo.

### 3. Your API is described (and maybe even self-descriptive)

Sua _API_ precisa ser compreendida por pessoas que não estavam envolvidas em seu desenvolvimento. E aqui é difícil
escaparmos da necessidade de documentação.

E por documentação, é impossível deixar de questionar todo o esforço envolvido em ter uma documentação válida, atualizada,
e que deveras é usável. Ferramentas estão disponíveis, e existem diferentes formas de automatizar esse processo. Tais
ferramentas servem não somente para a criação de documentação, mas também da especificação em si (que pode ser
também consumida por uma máquina). Por exemplo, [_RAML_]({tag}raml "Leia mais sobre RAML") e
[_Swagger_]({tag}swagger "Leia mais sobre Swagger"), já abordados no _blog_, são excelentes iniciativas para
resolver essa questão.

Mas além disso, seguir padrões é outro esforço que trará resultados na usabilidade da _API_:

> When it comes to documentation for APIs, structured documentation beats unstructured documentation. Following a standard pattern for URLs, resource types, request methods, headers, request parameters, and response formats will make it easier to explore and understand functionality, and reduces surprises when your API grows.

_Hypermedia_ parece outra excelente ideia, uma vez que serve como documentação e oferece meios para
humanos e máquinas compreenderem melhor a sua funcionalidade.

## Camadas: API-First Development x API-First Design

_API-First_ é sobre fazer a _API_ antes da interface [_web_]({tag}web "Leia mais sobre web") e _mobile_? Ou
seria sobre primeiro fazer o _design_ da _API_ e a partir daí passar para a implementação?

Uma ótica interessante sobre esse debate pode ser lida no ["What Is An API First Strategy? Adding Some Dimensions To This New Question"](https://apievangelist.com/2014/08/11/what-is-an-api-first-strategy-adding-some-dimensions-to-this-new-question/ "Leia mais no API Evangelist"), do _apievangelist.com_.

Durante a pesquisa para a escrita desse _post_, fui exposto a diferentes perspectivas, e é muito provável que eu
tenha apresentado elas de forma "misturada" até aqui:

- Do ponto de vista de negócio, é sobre ter uma _API_ primeiro e torná-la um produto _per se_;
- Do ponto de vista de tecnologia, é sobre ter uma plataforma primeiro;
- Do ponto de vista de arquitetura, é sobre ter um _design_ coeso, reusável, e construído através da colaboração de diferentes _stakeholders_;
- Do ponto de vista de _UX_, é sobre ter uma _API_ bem estruturada e documentada;
- Do ponto de vista do desenvolvedor, é sobre ter uma especificação antes de partir para a implementação.

Qual visão você pretende adotar depende muito do contexto. Haverá casos em que o produto já existe,
soluções já estão no ar, e você fará o movimento para um consumo baseado em _APIs_. Ou, com sorte, você fundará
uma _startup_ e terá o controle o suficiente para primeiramente produzir uma _API_ e depois as interfaces gráficas.

Assim como há diferentes "níveis de _REST_" que podemos usar no cotidiano, _API-First_ pode ser adotado em diferentes níveis
e maneiras.

No meu caso, que atualmente trabalho em um ambiente _enterprise_ e tenho pouca influência sobre o negócio, é basicamente
sobre [discutir o contrato primeiro](https://en.wikipedia.org/wiki/Design_by_contract "Design by contract"), e ter uma especificação que sirva como documentação e que guie o meu desenvolvimento.

## Os passos

contract first

## Benefícios

https://www.oreilly.com/ideas/an-api-first-approach-for-cloud-native-app-development
https://en.wikipedia.org/wiki/Design_by_contract

## Considerações finais

não é sobre _REST_

## Referências

- [Adobe Tech Blog - Three Principles of API First Design](https://medium.com/adobetech/three-principles-of-api-first-design-fa6666d9f694)
- [API Evangelist - What Is An API First Strategy? Adding Some Dimensions To This New Question](https://apievangelist.com/2014/08/11/what-is-an-api-first-strategy-adding-some-dimensions-to-this-new-question/)
- [API Friends - What is an API First definition?](https://apifriends.com/api-creation/api-first/)
- [DZone - An API-First Development Approach](https://dzone.com/articles/an-api-first-development-approach-1)
- [DZone - What is API First?](https://dzone.com/articles/what-api-first)
- [ProgrammableWeb - Introduction to API-First Design](https://www.programmableweb.com/news/introduction-to-api-first-design/analysis/2016/10/31)
- [Swagger.io - Understanding the API-First Approach to Building Products](https://swagger.io/resources/articles/adopting-an-api-first-approach/)
- [Wikipedia - Design by contract](https://en.wikipedia.org/wiki/Design_by_contract)
