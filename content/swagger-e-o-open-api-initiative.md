title: Swagger e o Open API Initiative
date: 2017-11-25 20:52:00
category: desenvolvimento
tags: desenvolvimento, web, rest, microservices, apis, swagger, oai
slug: swagger-e-o-open-api-initiative
meta_description: Swagger é a opção mais famosa no que tange a modelagem e documentação de APIs. Mas qual é a sua relação com outras especificações, incluindo a OpenApi Specification?

{% img align-left /images/blog/oai-logo.png 180 180 Logotipo Open API Initiative %}

Já falamos sobre [*RAML*]({tag}raml "Leia mais sobre RAML") aqui no *blog*. Uma maneira
de descrever *APIs*, facilitando a vida de clientes, fornecedores, e até mesmo
máquinas. Acontece que há uma alternativa muito mais popular,
chamada [*Swagger*](https://swagger.io/ "The world's most popular API tooling"),
que na minha opinião tem por principal ponto positivo ser base para a criação da
[*OpenAPI Specification*](https://github.com/OAI/OpenAPI-Specification "The OpenAPI Spec repository").

<!-- PELICAN_END_SUMMARY -->

Se até aqui tudo isso pareceu "sopa de letrinhas", *keep calm*! Vamos abrir o glossário e detalhar
termo por termo.

## Swagger: Um framework completo

As vantagens de utilizar o *Swagger* são basicamente as mesmas de usar *RAML* (ou
[*API Blueprint*](https://apiblueprint.org/ "Powerful high-level API description language")):
Modelar e documentar *APIs* [*REST*]({tag}rest "Leia mais sobre REST").

O *Swagger* é um *framework*, composto por diferentes ferramentas, que ajudam no desenvolvimento
de *APIs*. Dentre essas ferramentas podemos destacar as de código aberto:

* [*Swagger Editor*](https://swagger.io/swagger-editor/ "Design, describe, and document your API on the first open source editor fully dedicated to Swagger-based APIs"):
Um editor poderosíssimo que pode ser usado *online*, e que facilita (e muito) na escrita de arquivos
*Swagger*.
* [*Swagger UI*](https://swagger.io/swagger-ui/):
Uma plataforma para a geração e publicação da documentação de *APIs*.
* [*Swagger Codegen*](https://swagger.io/swagger-codegen/): Esse aqui é o meu favorito. Através
da especificação da sua *API*, cria *SDKs* para diferentes linguagens.
* [*Swagger Inspector*](https://swagger.io/swagger-inspector/): Para fechar com chave de ouro.
O *Inspector* é um serviço que testa *APIs* com base em um contrato *Swagger*.

Além disso temos o [*SwaggerHub*](https://swaggerhub.com/ "The platform for designing and documenting APIs with Swagger"),
que "empacota" isso tudo em um *Software As A Service*, prometendo aumentar produtividade e
colaboração entre times no que tange desenvolvimento de *APIs*.

Nos items acima citei "arquivos *Swagger*" e "contrato *Swagger*". Bem...
hoje o *Swagger* (*framework*) é apto a trabalhar com o *Swagger* (especificação). Mas não
é apenas essa especificação que ele suporta.

E é aqui que a *SmartBear* (empresa por trás do desenvolvimento da "marca" *Swagger*) aparece e merece aplausos.

## Swagger Specification vira OpenAPI Specification

Deixa eu corrigir o primeiro parágrafo do capítulo anterior:

> As vantagens de utilizar o *OpenAPI Spec* são basicamente as mesmas de usar *RAML Spec*,
> *Swagger Spec*, ou *API Blueprint Spec*: Modelar e documentar *APIs* *REST*.

Com uma vantagem a mais: Ser aberta*. (note o asterisco)

O *Swagger Specification* desde o seu princípio é de código aberto. Mas sempre teve uma empresa
vinculada ao seu desenvolvimento (mais ou menos o que acontece com a [*MuleSoft*](https://www.mulesoft.com/ "We connect. You unnovate.")
e o *RAML*).

Em janeiro de 2016, a *SmartBear Software* renomeou a *Swagger Specification* para *OpenAPI Specification*.
Disponibilizando-a no *Github* em [github.com/OAI/OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification "The OpenAPI Specification Repository"),
e tornando-a assim em uma especificação "vendor-neutral".

{% img align-center-keep-size /images/blog/oai-avengers.jpg 640 285 A OAI é tipo os Avengers do mundo das APIs (bestbuy.com) %}

Isso tudo, claro, com supervisão do consórcio que a mesma *SmartBear* ajudou a construir:
O [*Open API Initiative*](https://www.openapis.org/ "OAI Consortium"). Que é também "curador"
do *OpenAPI Specification* e tem como integrantes alguns gigantes da indústria como *Google*, *IBM*, *Microsoft*,
e as próprias *MuleSoft* e *SmartBear*.

## Swagger & OpenAPI

Novamente, deixa eu corrigir o parágrafo do primeiro capítulo:

> As vantagens de utilizar *Swagger* com *OpenAPI Spec* são: Além de confiar
> em uma especificação aberta e *vendor-neutral*, você ainda conta com o poderoso ferramental
> de código aberto provido pelo Swagger.

O *Swagger* "gira em torno" do *OpenAPI*, provendo ferramentas para a modelagem e documentação.
É sem dúvida uma combinação espetacular, e não a toa é a mais famosa e eficiente no momento.

## Considerações finais

Confesso que eu tive problemas para entender o relacionamento entre *RAML*, *Swagger* e *OpenAPI*,
principalmente por ter adotado o *RAML* e não seguido o desenvolvimento do *Swagger*.

Hoje, se você for usar *OpenAPI* (você deveria) é improvável que não recorra ao *Swagger*
para produzir os seus documentos. Portanto, não é incomum vermos muitos materiais onde esses
dois conceitos se misturam e aparentam ser um só.

No próximo *post* sobre *Swagger*, vamos para uma abordagem mais prática, mostrando como utilizar
as ferramentas com *OpenAPI*.

Até a próxima.

## Referências

* [Caelum - Modelando APIs REST com Swagger](http://blog.caelum.com.br/modelando-apis-rest-com-swagger/)
* [Google Cloud Platform - A especificação OpenAPI](https://cloud.google.com/endpoints/docs/open-api-spec?hl=pt-br)
* [Open API Initiative - About](https://www.openapis.org/about)
* [Swagger - The world's most popular API tooling](https://swagger.io/)
* [Wikipedia - OpenAPI Specification](https://en.wikipedia.org/wiki/OpenAPI_Specification)
* [Wikipedia - Swagger (software)](https://en.wikipedia.org/wiki/Swagger_(software))
