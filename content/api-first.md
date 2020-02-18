title: API-First
Date: 2020-02-20 06:15:00
Category: desenvolvimento
Tags: desenvolvimento, web, rest, apis, swagger, oai
Image: /images/blog/rest-api-logo.png
Alt: API

Tratar _APIs_ como "first-class citizens" pode ser um desafio e tanto, principalmente quando estamos em um contexto
de entrega rápida ou de prova de conceito. Como desenvolvedor, admito que estou mais interessado em resolver
a lógica de negócio escrevendo código do que discutindo contratos ou requisitos não funcionais.

<!-- PELICAN_END_SUMMARY -->

## Code-First

O modelo de trabalho ilustrado acima pode ser conhecido por "bottom up", "code first", ou apenas por "aquela forma que a gente
geralmente utiliza em nossos projetos". Onde focamos primeiro no código, e
deixamos para depois questões relacionadas à integração dos componentes.

_Kirsten Hunter_ [ilustra bem os efeitos colaterais de tal prática](https://www.programmableweb.com/news/introduction-to-api-first-design/analysis/2016/10/31 "Introduction to API-First Design"):

> APIs are created as an afterthought once the product has already been created as a tightly coupled system, with the frontend website and backend system entwined together in a highly codependent way and the REST API having to be ‘shoe-horned’ into this system as a separate entity.

Não há nada fundamentalmente errado com essa prática (inclusive, [há opiniões a favor desse conceito](https://www.youtube.com/watch?v=Tb823aqgX_0 "Bottom Up vs Top Down Design in Clojure")), mas com o mundo
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
maior interação com outros _stakeholders_ de forma antecipada).

E se pararmos para analisar friamente o que essa ideia significa, ser _api-centric_ é no fim das contas ser _user-centric_.
O usuário nesse caso passa a ser outro desenvolvedor (do seu time, ou de terceiros), portanto,
_Developer eXperience_ também é parte fundamental dessa estratégia, e vem embutida em sua prática, como ilustra o ["Understanding the API-First Approach to Building Products"](https://swagger.io/resources/articles/adopting-an-api-first-approach/ "Leia mais no Swagger.io"):

> Consumers of APIs are most often developers, and developer experience (DX) can make or break the success of an API. API first ensures that developers have positive experiences using your APIs. Well-designed, well-documented, consistent APIs provide positive developer experiences because it’s easier to reuse code and onboard developers, and it reduces the learning curve.

## Os 3 princípios

## Dimensões: API-First x API-First Design x API-First Development?

## Benefícios

## Na prática

## Conclusões finais

## Referências

- [DZone - An API-First Development Approach](https://dzone.com/articles/an-api-first-development-approach-1)
- [DZone - What is API First?](https://dzone.com/articles/what-api-first)
- [ProgrammableWeb - Introduction to API-First Design](https://www.programmableweb.com/news/introduction-to-api-first-design/analysis/2016/10/31)
- [Swagger.io - Understanding the API-First Approach to Building Products](https://swagger.io/resources/articles/adopting-an-api-first-approach/)
