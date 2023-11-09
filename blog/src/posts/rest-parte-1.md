---
title: "REST - Parte 1"
date: 2016-01-06 13:00:00
modified: 2023-11-09 21:54:00
tags: ["desenvolvimento-web", "rest", "microservices", "api"]
slug: rest-parte-1
thumbnail: ./images/soap-vs-rest.png
---

Em tempos onde os [microservices](http://www.infoq.com/br/news/2015/04/microservices-current-state "O estado da arte em micro serviços") ganham cada vez mais força, e [aplicações de sucesso](https://dev.twitter.com/rest/public "Conheça a API do Twitter") liberam a sua _API_ para desenvolvedores construírem um ecossistema ao redor delas, não considerar seguir boas práticas na construção de um serviço pode ser uma tomada de decisão arriscada, tanto no quesito do negócio, quanto no quesito técnico.

A _Internet_ já passou por muita coisa quando o assunto é _API_, desde a total falta de padrões até a criação de protocolos exageradamente complexos. O _REST_ vem como uma solução elegante que está longe de ser "anárquica", porém mais longe ainda de ser complicada.

## Serviços web podem ser burocráticos

Antes de mais nada é preciso dizer que a "_internet_ é maior que a [_web_](/tag/desenvolvimento-web.html "Leia mais sobre web")". Ou seja, quando digo que você deveria utilizar _REST_, estou sendo específico para um determinado tipo de solução na camada _HTTP_.

Quando falo sobre serviços na _web_, automaticamente sou remetido a [_SOA_](https://en.wikipedia.org/wiki/Service-oriented_architecture "Leia mais sobre SOA") ou [_SOAP_](https://pt.wikipedia.org/wiki/SOAP "Leia mais sobre SOAP"). Até então, nunca consegui pensar nesses dois termos de forma dissociada, mas não é bem assim que as coisas funcionam...

A Arquitetura Orientada a Serviço (SOA) é um padrão onde aplicações provém serviços para demais componentes através de protocolos de comunicação. Uma arquitetura _SOA_ vai além de definir uma [_API_](https://en.wikipedia.org/wiki/Application_programming_interface "Leia mais sobre API"), ela define a interface em termos de protocolo e funcionalidade, provendo assim uma maior interoperabilidade do seu serviço.

Mas o que necessariamente significa o termo "serviço"? Segundo o [_Open Group_](https://en.wikipedia.org/wiki/The_Open_Group "Leia mais sobre o Open Group"):

> Is a logical representation of a repeatable business activity that has a specified outcome (e.g., check customer credit, provide weather data, consolidate drilling reports).
> Is self-contained.
> May be composed of other services.
> Is a "black box" to consumers of the service.

Já o _SOAP_, de forma bem resumida, é um protocolo que utiliza a linguagem de marcação _XML_ e baseia-se nos protocolos de comunicação _RPC_ e _HTTP_ para negociação e transmissão de mensagens. Quem já trabalhou com a tecnologia pode até duvidar, mas a sua premissa é simplicidade e independência de linguagem, modelo e transporte.

Com o passar do tempo os termos acima ficaram estigmatizados por serem "bloated". O excesso de "corporativismo" para construir um serviço e distribuir dados pode terminar em um processo muito bem documentado, porém, é uma "carga" de banda e desenvolvimento que nem sempre estamos dispostos a pagar.

É aí que entra o _REST_.

## Serviços web podem ser simples

O _REpresentational State Transfer_ (_REST_) é um estilo de arquitetura amplamente utilizado no desenvolvimento de serviços _web_. Segundo o _InfoQ_:

> REST é um conjunto de princípios que definem como Web Standards como HTTP e URIs devem ser usados (o que freqüentemente difere um pouco do que muitas pessoas atualmente fazem). A promessa é que se você aderir a princípios REST enquanto estiver desenhando sua aplicação, você terá um sistema que explora a arquitetura da Web em seu benefício.

Em outras palavras, você não precisa de um programa específico no lado do _back-end_ e um _client_ exclusivo no _front-end_ para consumir serviços _REST_... Basta lermos arquivos _XML_ ou _JSON_ utilizando os verbos (_GET_, _POST_, _PUT_ e _DELETE_) do protocolo _HTTP_.

![Considere o Martin Lawrence como seu dado (stackoverflow.com)](/media/soap-vs-rest-lawrence.jpg "Considere o Martin Lawrence como seu dado (stackoverflow.com)")

Na verdade, espera-se que o consumidor e produtor do serviço não possuam qualquer vínculo maior que o "respeito" ao contrato daquela determinada _API_, reduzindo consideravelmente o consumo de banda, limitando o número de operações ao número de verbos do protocolo e evitando ambigüidade.

Na segunda parte desse artigo iremos explorar de forma prática a utilização de _REST_ para a construção de uma _API_ na _web_.

Até a próxima.

## Referências

- [_InfoQ_: Uma rápida introdução ao _REST_ ](http://www.infoq.com/br/articles/rest-introduction)
- [_Salesfoce Developers: REST API_](https://developer.salesforce.com/page/REST_API)
- [_Stackoverflow: Representational state transfer (REST) and Simple Object Access Protocol (SOAP)_](http://stackoverflow.com/questions/209905/representational-state-transfer-rest-and-simple-object-access-protocol-soap)
- [_TechTarget: REST (representational state transfer) definition_](http://searchsoa.techtarget.com/definition/REST)
- [_Webopedia: API - application program interface_](http://www.webopedia.com/TERM/A/API.html)
- [_Wikipedia: Service-oriented Architecture_](https://en.wikipedia.org/wiki/Service-oriented_architecture "Leia sobre SOA no Wikipedia")
- [_Wikipedia: SOAP_](https://pt.wikipedia.org/wiki/SOAP)
