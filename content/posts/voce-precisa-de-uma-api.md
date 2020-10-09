---
title: Você precisa de uma API?
date: 2020-10-09 06:00:00
tags:
  [
    "desenvolvimento-web",
    "api",
    "rest",
    "ssr",
    "javascript",
    "saas",
    "mashup",
    "microservice",
  ]
slug: voce-precisa-de-uma-api
thumbnail: ./images/modern-web-development.jpg
---

Nos últimos anos tenho advogado em prol do [_API-First_](/tag/api-first.html "Leia mais sobre API-First"). Não apenas
por acreditar nos impactos econômicos que a prática pode apresentar, como também nos benefícios de arquitetura,
organização e integração. Sem falar no "supracitado" _Developer eXperience_, que vem quase que embutido ao
realizar o _design_ de suas [_APIs_](/tag/api.html "Leia mais sobre APIs") antes mesmo de implementá-las.

- [O API-First](/2020/02/21/o-api-first.html "Leia o artigo na íntegra")
- [API-First: Processo e ferramentas](/2020/03/02/api-first-processo-e-ferramentas.html "Leia o artigo na íntegra")
- [API Blueprint: Markdown é vida!](/2020/04/05/api-blueprint-markdown-e-vida.html "Leia o artigo na íntegra")
- [Swagger e o Open API Initiative](/2017/11/25/swagger-e-o-open-api-initiative.html "Leia o artigo na íntegra")
- [Swagger na prática](/2018/03/15/swagger-na-pratica.html "Leia o artigo na íntegra")
- [Ramilificando as suas APIs](/2017/01/31/ramilificando-as-suas-apis.html "Leia o artigo na íntegra")

Como nem tudo em desenvolvimento pode ser considerado "bala de prata" (estou olhando para você, _microservices_),
o propósito desse artigo é estressar a motivação por trás da construção de uma _API_.

## O que é uma API?

Segundo [_Tyler Elliot_](https://medium.com/@TebbaVonMathenstien/what-is-an-api-and-why-should-i-use-one-863c3365726b "What Is an API and Why Should I Use One?"):

> In general, APIs define the rules that programmers must follow in order to interact with a programming language, a software library, or any other software tool. Lately though, the term API is most often used to describe a particular kind of web interface. These Web APIs are a set of rules for interacting with a webserver (such as a Salesforce server), with the most common use case being data retrieval.

![Ilustração sobre o que é uma API](./images/what-is-an-api.jpg "Uma máquina normalmente consome uma API. Já uma pessoa, geralmente, uma interface visual (callr.com)")

Em outras palavras, você acessa o _Gmail_ diariamente do seu _browser_ através da interface [_web_](/tag/web.html "Leia mais sobre web"). Porém, integrações com outras máquinas são realizadas através de _APIs_.

Na verdade, mesmo o _Gmail_ aberto em seu navegador depende de _APIs_ para funcionar. Possivelmente as mesmas _APIs_ que alimentam a _app mobile_ do próprio _Google_,
ou clientes terceiros (como o _Mail_, da _Apple_).

## Mashup, SaaS, e economia

E o primeiro argumento gira em torno dessa oportunidade de integrações e negócios com terceiros.

O termo _Mashup_ ganhou popularidade após a [_Web 2.0_](https://pt.wikipedia.org/wiki/Web_2.0) (entreguei a idade nessa referência) transformar a forma como a _web_ era desenvolvida. _Mashups_ são _APIs_, _websites_ ou serviços que misturam diferentes fontes afim de entregar uma solução. Um bom exemplo de _mashup_ é a interface de busca do _Airbnb_, integrada ao _Google Maps_.

![Interface de busca do Airbnb com o Google Maps](./images/interface-airbnb.png "Na interface web, no desktop, é possível buscar por proximidade e ter auxílio do Google Maps para encontrar um lugar")

Integrações com terceiros fazem parte do cotidiano dos desenvolvedores _web_, e não é raro tais integrações se materializarem na forma de _APIs_. Além disso, o conceito
de "Software Como Serviço" ([_SaaS_](https://www.techradar.com/news/what-is-saas "What is SaaS")) está amplamente estabelecido no mercado, e há uma certa expectativa que
o seu produto possua algumas de suas características.

Oras! Você já é um desenvolvedor _web_, desenvolvendo para a nuvem. O que te custa fazer disso um serviço e disponibilizar alguns endereços para que um cliente
conecte-se com a sua solução?

![Diferenças e similaridades entre SaaS e SOA](./images/saas-vs-soa.png "Diferenças e similaridades entre SaaS e SOA (tecnetit.com.br)")

E aqui é possível enxergar que além da técnica em relação à integrações, há um fator econômico que precisa ser levado em consideração. _Jennifer Riggins_, no [_How To Design Great APIs With API-First Design_](https://www.programmableweb.com/news/how-to-design-great-apis-api-first-design-and-raml/how-to/2015/07/10 "Leia o artigo na íntegra"), explora um pouco mais dessa vertente. [Mas uma das melhores definições vem do pessoal da _MuleSoft_](https://www.mulesoft.com/resources/api/what-is-an-api-economy "What is the API Economy"):

> The innovative power of APIs has led to the realization that APIs can be a critical component of enterprise solutions that impact the operational bottom line, contributing to efficiencies, growth, and innovation. That, in turn, has created the API economy, which is loosely defined as the way APIs can positively affect an organization's profitability.

Portanto, se você estiver construindo um produto onde tais integrações podem ser um novo canal de distribuição (ou até mesmo o principal canal de distribuição), ter uma _API_ faz todo o sentido.

### Em contrapartida...

Embora seja de conhecimento público que a [_Netflix_ utilize microsserviços](https://netflixtechblog.com/tagged/microservices "Leia mais no blog técnico do Netflix")
(e os serviços possuam _APIs_ para uso interno), a "locadora vermelha" não possui _API_ pública (até o momento da escrita desse artigo). E esse
exemplo pode servir como argumento para ilustrar que nem tudo precisa ser concebido com uma ideia de integração desde o seu princípio.

No entanto, assim como no exemplo do _Gmail_, para entregar um conteúdo de forma coesa para tantos clientes diferentes (_TV_, _mobile_, _web_, etc), há uma necessidade técnica que fortalece o argumento
do uso de protocolos de comunicação.

## Front-end x Mobile x Back-end

No caso do _Gmail_, por exemplo, o protocolo [_POP_](https://pt.wikipedia.org/wiki/Post_Office_Protocol "Leia mais no Wikipedia")
seria o suficiente para conectar um cliente com o servidor, afim de ler os e-mails. Ao falarmos de soluções _web_, e portanto, funcionando sobre a camada _HTTP_,
esse tipo de interação é comumente efetuada através de [_APIs REST_](/tag/rest.html "Leia mais sobre REST").

![Ilustração separando front-end de back-end](./images/front-back-end.jpeg "Full-stack ou Fool-stack? (quora.com)")

Há nem tanto tempo atrás, _full-stack developers_ eram comuns no mercado de desenvolvimento _web_. Soluções eram basicamente
[_HTMLs_](/tag/html.html "Leia mais sobre HTML") sendo entregues com a interface tendo apenas intervenções de [_Javascript_](/tag/javascript.html "Leia mais sobre Javascript") para enriquecer a experiência.

Com os navegadores evoluindo cada vez mais, as interfaces _web_ ficando cada vez mais complexas, e demandas nos domínios de _front-end_ e _back-end_ exigindo
maior especialidade; Hoje o padrão de mercado é encontrarmos desenvolvedores especializados em _front-end_, ou em _back-end_, ou até mesmo _mobile_.

_Full-stack developers_
são considerados "unicórnios", e por mais que eu tenha passado a maior parte da minha carreira como um, admito que hoje
em dia é muito difícil ficar nessa posição e manter-se atualizado com as novidades e tendências ([principalmente no mercado _front-end_](https://medium.com/better-programming/do-not-follow-javascript-trends-ca2f0dc19ec1 "Don’t Follow JavaScript Trends")).

![Anúncio de muito tempo atrás mostrando tecnologias ligadas ao Rich Internet Application](./images/ria.jpg "Deixa eu pegar esse pergaminho aqui que cita tecnologias usadas para construir interfaces ricas para a internet (dotcom-monitor.com)")

Portanto, é bem provável que o time de _front-end_ do seu projeto adote _React_ ou _Vue.js_, e demande
do time de _back-end_ algumas _APIs_ ([_REST_ ou não](/2020/07/01/alem-do-rest-com-graphql.html "Além do REST com GraphQL")) para que possam
entregar conteúdo dinâmico ao usuário final. É certo que essa demanda acontecerá se, por exemplo, o seu produto tiver uma versão _mobile_ nativa.

### Em contrapartida...

Há um debate em torno de especialidades e do papel de um _full-stack_. _David Humphrey_ sugere que nessa condição, [deveríamos
ser capazes de "subir ou descer", e oferecer ajuda, independente da _expertise_ em cada nível de uma _stack_](https://blog.humphd.org/fool-stack-programmer/ "How to become a Fool Stack Programmer"):

> (...) is not about becoming an expert at every level of the stack. Rather, its goal is to erase the boundary between the levels such that you can reach up or down in order to offer help, even if that help is only to offer a kind word of encouragement when the problem is particularly hard: these are our problems, after all.

Outro argumento gira em torno do excesso de complexidade que virou desenvolver (qualquer coisa) para a _web_.

<iframe src="https://www.youtube.com/embed/SWEts0rlezA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Com um time multidisciplinar, é possível que você não precise confiar em uma _API_ para conectar as duas especialidades, e com
o bom e velho modo de fazer _web_ (por exemplo, [_Django_](/tag/django.html "Leia mais sobre Django") entregando _HTML_)
seu time seja capaz de entregar um produto (ainda assim) interessante.

![Piada com full-stack e fool-stack](./images/fool-stack.jpg "Pela graça da piada, deixo esse meme para mexer com o seu brio (devrant.com)")

Só para não parecer um _post_ "anti-SPA" ou "anti-React", [faço das palavras de _Tom MacWright_ as minhas](https://macwright.com/2020/05/10/spa-fatigue.html "Second-guessing the modern web"):

> I don’t think that everyone’s using the SPA pattern for no reason. For large corporations, it allows teams to work independently: the “frontend engineers” can “consume” “APIs” from teams that probably work in a different language and can only communicate through the hierarchy. For heavily interactive applications, it has real benefits in modularity, performance, and structure. And it’s beneficial for companies to shift computing requirements from their servers to their customers browsers: a real win for reducing their spend on infrastructure.

Se você acha que sua empresa ou produto não se encaixa nos critérios levantados na citação a cima,
[_HTML_ renderizado no _server side_, com pitadas de _Javascript_, ainda é uma realidade](https://m.signalvnoise.com/stimulus-1-0-a-modest-javascript-framework-for-the-html-you-already-have/ "Stimulus 1.0: A modest JavaScript framework for the HTML you already have").

## Microservices

_Microservices_ foi uma das ondas que sacudiu o mundo do desenvolvimento _back-end_ recentemente. O conceito de computação distribuída
não é velho, mas com a popularização de ferramentas como _Kubernetes_ e [_Docker_](/tag/docker.html "Leia mais sobre Docker"), fica difícil resistir à
tentação de mover toda uma solução para microsserviços.

O portal da _Red Hat_ [define a arquitetura da seguinte forma](https://www.redhat.com/pt-br/topics/microservices/what-are-microservices "O que são os microsserviços?"):

> Microsserviços são uma abordagem de arquitetura para a criação de aplicações. O que diferencia a arquitetura de microsserviços das abordagens monolíticas tradicionais é como ela decompõe a aplicação por funções básicas. Cada função é denominada um serviço e pode ser criada e implantada de maneira independente. Isso significa que cada serviço individual pode funcionar ou falhar sem comprometer os demais.

As vantagens são numerosas, dentre elas:

- Habilidade de escalar horizontalmente qualquer um de seus componentes;
- Serviços são independentes. O que significa maior liberdade de desenvolvimento;
- A arquitetura é plugável, permitindo maior flexibilidade no gerenciamento de serviços internos e externos.

Uma arquitetura baseada em microsserviços fatalmente te levará a construir _APIs_. Embora haja outras formas
de fazer com que os serviços dentro da mesma se comuniquem, _APIs REST_ são a forma mais comum para esse tipo de comunicação.

![Diagrama de uma arquitetura orientada a microsserviços](./images/microservice-diagram.png "Uma visão muito simplista de uma arquitetura baseada em microsserviços (jaxenter.com)")

Não importando se as _APIs_ serão públicas ou privadas (como no exemplo do _Netflix_), a sua necessidade é clara. Mais que isso, elas são
partes fundamentais da arquitetura em si, e proporcionam o tipo de interface e abstração que faz com que a arquitetura de microsserviços fique
cada dia mais popular, principalmente em empresas com uma grande quantidade de desenvolvedores e projetos.

### Em contrapartida...

Você não é o _Netflix_. Ou o _Google_. Ou o _Uber_. [Nas palavras de _David Heinemeier Hansson_](https://m.signalvnoise.com/the-majestic-monolith/),
_microservices_ é:

> (...) a great pattern. No, really. Not being sarcastic here. If you’re Amazon or Google or any other software organization with thousands of developers, it’s a wonderful way to parallelize opportunities for improvement. Each service can be its own team with its own timeline, staff, and objectives. It can evolve independently, at least somewhat, of whatever else the rest of the constellation is doing.

Todos os prós de utilizar microsserviços vêm com um preço, e reverter essa decisão não costuma ser uma das experiências mais prazerosas,
como descreve _Thomas Betts_, no [_To Microservices and Back Again - Why Segment Went Back to a Monolith_](https://www.infoq.com/news/2020/04/microservices-back-again/ "Leia na íntegra no InfoQ").

Tive a oportunidade de trabalhar por dois anos em uma empresa que utiliza esse tipo de arquitetura, e confesso que o isolamento do teu domínio, juntamente com
a flexibilidade e controle sobre o que você está executando e entregando, é incrível. Mas sem um time de _DevOps_ para dar o devido suporte,
não consigo nem imaginar o quão traumática essa experiência poderia ser.

<iframe src="https://www.youtube.com/embed/y8OnoxKotPQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Todo o _buzz_ em volta de _SOA_ e _microservices_ fez com que automaticamente aplicações monolíticas passasem a ser "o que há de pior na sua stack".
Se ontem lemos um artigo sobre todo o _lore_ dos microsserviços, [amanhã estamos com um serrote desmembrando um monolito](https://changelog.com/posts/monoliths-are-the-future "Monoliths are the future"), e no fim do dia a motivação era porque não aguentamos
mais lidar com conflitos no _Git_.

Se _APIs_ for pura e simplesmente um efeito colateral da decisão de "provar" o mundo dos microsserviços, eu volto a citar o _DHH_:

> Run a small team, not a tech behemoth? Embrace the monolith and make it majestic. You Deserve It!

Agora, se _microservices_ é a resposta para os seus problemas, _API FTW_!

## Considerações finais

A motivação para esse artigo veio depois de uma palestra que dei sobre _API-First_, no [_DjangoDay 2020_](https://www.youtube.com/watch?v=cx8JGC_vrM8&list=PLEpW1LzVyQWhqb_OoWtURF5cfKSGof0It&index=3 "API First Design and Django"). Nos
corredores, conversei com alguns participantes do evento e sob a ótica deles eu pude ter um vislumbre do quão
"desconfortável" pode ser a adoção de um processo mais rígido visando a sua prática.

Em um dos diálogos, a analogia com [_TDD_](/tag/tdd.html "Leia mais sobre TDD") e _test-first_ apareceu. E se por um
lado ela pode ser encarada como algo positivo, por se referir a uma excelente ferramenta de _design_ e engenharia de _software_;
Por outro me fez refletir sobre todo o esforço e frustração que tenho até hoje em praticar _test-first_ (o que não me impede de ter cobertura de testes, e utilizar testes como ferramenta de _design_ de código).

No final, é tudo uma questão de contexto (e do famigerado "depende"). _APIs_ nem sempre fazem parte da necessidade de projeto em seu início, mas passam a ser depois de alguns _sprints_
e descobertas que o time vai fazendo. Portanto, dependendo do ponto específico no tempo em que seu projeto esteja, você não precisa de uma _API_.

E está tudo bem! Lembre-se que [_YAGNI_](https://www.exceptionnotfound.net/kiss-dry-yagni-good-code-basic-training/ "KISS, DRY, YAGNI - Good Code Basic Training")
é um bom padrão para se ter embaixo do braço.

## Referências

- [Better Programming - Don't follow Javascript trends](https://medium.com/better-programming/do-not-follow-javascript-trends-ca2f0dc19ec1)
- [Changelog - Monoliths are the future](https://changelog.com/posts/monoliths-are-the-future)
- [David Humphrey - How to become a Fool Stack Programmer](https://blog.humphd.org/fool-stack-programmer/)
- [FreeCodeCamp - The SaaS Handbook: How to Build Your First Software-as-a-Service Product Step-By-Step](https://www.freecodecamp.org/news/how-to-build-your-first-saas/)
- [Hackernoon - How Microservices Saved the Internet](https://hackernoon.com/how-microservices-saved-the-internet-30cd4b9c6230)
- [InfoQ - To Microservices and Back Again - Why Segment Went Back to a Monolith](https://www.infoq.com/news/2020/04/microservices-back-again/)
- [Lifewire - What is a Web Mashup?](https://www.lifewire.com/what-is-a-mashup-3486655)
- [MuleSoft - What is the API Economy](https://www.mulesoft.com/resources/api/what-is-an-api-economy)
- [Red Hat - O que são os microsserviços?](https://www.redhat.com/pt-br/topics/microservices/what-are-microservices)
- [Signal V. Noise - Stimulus 1.0: A modest JavaScript framework for the HTML you already have](https://m.signalvnoise.com/stimulus-1-0-a-modest-javascript-framework-for-the-html-you-already-have/)
- [Signal V. Noise - The Majestic Monolith](https://m.signalvnoise.com/the-majestic-monolith/)
- [Sitepoint - Do you need an API?](https://www.sitepoint.com/do-you-need-an-api/)
- [Tom MacWright - Second-guessing the modern web](https://macwright.com/2020/05/10/spa-fatigue.html)
