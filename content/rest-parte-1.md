title: REST - Parte 1
date: 2016-01-06 13:00:00
category: desenvolvimento
tags: desenvolvimento, rest, microservices, apis
slug: rest-parte-1
meta_description: A Internet já passou por muita coisa quando o assunto é API, O REST vem como uma solução elegante que está longe de ser "anárquica", porém mais longe ainda de ser complicada.

{% img representative-image /images/blog/soap-vs-rest.png 180 180 SOAP vs REST %}

Em tempos onde os [microservices](http://www.infoq.com/br/news/2015/04/microservices-current-state "O estado da arte em micro serviços") ganham cada vez mais força, e [aplicações de sucesso](https://dev.twitter.com/rest/public "Conheça a API do Twitter") liberam a sua *API* para desenvolvedores construírem um ecossistema ao redor delas, não considerar seguir boas práticas na construção de um serviço pode ser uma tomada de decisão arriscada, tanto no quesito do negócio, quanto no quesito técnico.

<!-- PELICAN_END_SUMMARY -->

A *Internet* já passou por muita coisa quando o assunto é *API*, desde a total falta de padrões até a criação de protocolos exageradamente complexos. O *REST* vem como uma solução elegante que está longe de ser "anárquica", porém mais longe ainda de ser complicada.


## Serviços Web podem ser burocráticos

Antes de mais nada é preciso dizer que a "*Internet* é maior que a [*Web*]({tag}web "Leia mais sobre Web")". Ou seja, quando digo que você deveria utilizar *REST*, estou sendo específico para um determinado tipo de solução na camada *HTTP*.

Quando falo sobre serviços na *Web*, automaticamente sou remetido a *[SOA](https://en.wikipedia.org/wiki/Service-oriented_architecture "Leia mais sobre SOA")* ou *[SOAP](https://pt.wikipedia.org/wiki/SOAP "Leia mais sobre SOAP")*. Até então, nunca consegui pensar nesses dois termos de forma dissociada, mas não é bem assim que as coisas funcionam...

A Arquitetura Orientada a Serviço (SOA) é um padrão onde aplicações provém serviços para demais componentes através de protocolos de comunicação. Uma arquitetura *SOA* vai além de definir uma *[API](https://en.wikipedia.org/wiki/Application_programming_interface "Leia mais sobre API")*, ela define a interface em termos de protocolo e funcionalidade, provendo assim uma maior interoperabilidade do seu serviço.

Mas o que necessariamente significa o termo "serviço"? Segundo o *[Open Group](https://en.wikipedia.org/wiki/The_Open_Group "Leia mais sobre o Open Group")*:

> Is a logical representation of a repeatable business activity that has a specified outcome (e.g., check customer credit, provide weather data, 	consolidate drilling reports).
Is self-contained.
May be composed of other services.
Is a "black box" to consumers of the service.

Já o *SOAP*, de forma bem resumida, é um protocolo que utiliza a linguagem de marcação *XML* e baseia-se nos protocolos de comunicação *RPC* e *HTTP* para negociação e transmissão de mensagens. Quem já trabalhou com a tecnologia pode até duvidar, mas a sua premissa é simplicidade e independência de linguagem, modelo e transporte.

Com o passar do tempo os termos acima ficaram estigmatizados por serem "bloated". O excesso de "corporativismo" para construir um serviço e distribuir dados pode terminar em um processo muito bem documentado, porém, é uma "carga" de banda e desenvolvimento que nem sempre estamos dispostos a pagar.

É aí que entra o *REST*.


## Serviços Web podem ser simples

O *REpresentational State Transfer* (*REST*) é um estilo de arquitetura amplamente utilizado no desenvolvimento de serviços *Web*. Segundo o *InfoQ*:

> REST é um conjunto de princípios que definem como Web Standards como HTTP e URIs devem ser usados (o que freqüentemente difere um pouco do que muitas pessoas atualmente fazem). A promessa é que se você aderir a princípios REST enquanto estiver desenhando sua aplicação, você terá um sistema que explora a arquitetura da Web em seu benefício.

Em outras palavras, você não precisa de um programa específico no lado do *back-end* e um *client* exclusivo no *front-end* para consumir serviços *REST*... Basta lermos arquivos *XML* ou *JSON* utilizando os verbos (*GET*, *POST*, *PUT* e *DELETE*) do protocolo *HTTP*.

{% img align-center /images/blog/soap-vs-rest-lawrence.jpg 600 562 Considere o Martin Lawrence como seu dado (stackoverflow.com) %}

Na verdade, espera-se que o consumidor e produtor do serviço não possuam qualquer vínculo maior que o "respeito" ao contrato daquela determinada *API*, reduzindo consideravelmente o consumo de banda, limitando o número de operações ao número de verbos do protocolo e evitando ambigüidade.

Na **parte 2** desse artigo iremos explorar de forma prática a utilização de *REST* para a construção de uma *API* na *Web*.

Até a próxima...

## Referências

* [*InfoQ*: Uma rápida introdução ao *REST* ](http://www.infoq.com/br/articles/rest-introduction)
* *[Salesfoce Developers: REST API](https://developer.salesforce.com/page/REST_API)*
* *[Stackoverflow: Representational state transfer (REST) and Simple Object Access Protocol (SOAP)](http://stackoverflow.com/questions/209905/representational-state-transfer-rest-and-simple-object-access-protocol-soap)*
* *[TechTarget: REST (representational state transfer) definition](http://searchsoa.techtarget.com/definition/REST)*
* *[Webopedia: API - application program interface](http://www.webopedia.com/TERM/A/API.html)*
* *[Wikipedia: Service-oriented Architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture "Leia sobre SOA no Wikipedia")*
* *[Wikipedia: SOAP](https://pt.wikipedia.org/wiki/SOAP)*
