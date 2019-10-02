title: Swagger e o Open API Initiative
date: 2017-11-25 20:52:00
category: desenvolvimento
tags: desenvolvimento, web, rest, microservices, apis, swagger, oai
slug: swagger-e-o-open-api-initiative
meta_description: Swagger é a opção mais famosa no que tange a modelagem e documentação de APIs. Mas qual é a sua relação com outras especificações, incluindo a OpenApi Specification?
Image: /images/blog/oai-logo.png
Alt: Logotipo Open API Initiative

Já falamos sobre [_RAML_]({tag}raml "Leia mais sobre RAML") aqui no _blog_. Uma maneira
de descrever _APIs_, facilitando a vida de clientes, fornecedores, e até mesmo
máquinas. Acontece que há uma alternativa muito mais popular,
chamada [_Swagger_](https://swagger.io/ "The world's most popular API tooling"),
que na minha opinião tem por principal ponto positivo ser base para a criação da
[_OpenAPI Specification_](https://github.com/OAI/OpenAPI-Specification "The OpenAPI Spec repository").

<!-- PELICAN_END_SUMMARY -->

Se até aqui tudo isso pareceu "sopa de letrinhas", _keep calm_! Vamos abrir o glossário e detalhar
termo por termo.

## Swagger: Um framework completo

As vantagens de utilizar o _Swagger_ são basicamente as mesmas de usar _RAML_ (ou
[_API Blueprint_](https://apiblueprint.org/ "Powerful high-level API description language")):
Modelar e documentar _APIs_ [_REST_]({tag}rest "Leia mais sobre REST").

O _Swagger_ é um _framework_, composto por diferentes ferramentas, que ajudam no desenvolvimento
de _APIs_. Dentre essas ferramentas podemos destacar as de código aberto:

- [_Swagger Editor_](https://swagger.io/swagger-editor/ "Design, describe, and document your API on the first open source editor fully dedicated to Swagger-based APIs"):
  Um editor poderosíssimo que pode ser usado _online_, e que facilita (e muito) na escrita de arquivos
  _Swagger_.
- [_Swagger UI_](https://swagger.io/swagger-ui/):
  Uma plataforma para a geração e publicação da documentação de _APIs_.
- [_Swagger Codegen_](https://swagger.io/swagger-codegen/): Esse aqui é o meu favorito. Através
  da especificação da sua _API_, cria _SDKs_ para diferentes linguagens.
- [_Swagger Inspector_](https://swagger.io/swagger-inspector/): Para fechar com chave de ouro.
  O _Inspector_ é um serviço que testa _APIs_ com base em um contrato _Swagger_.

Além disso temos o [_SwaggerHub_](https://swaggerhub.com/ "The platform for designing and documenting APIs with Swagger"),
que "empacota" isso tudo em um _Software As A Service_, prometendo aumentar produtividade e
colaboração entre times no que tange desenvolvimento de _APIs_.

Nos items acima citei "arquivos _Swagger_" e "contrato _Swagger_". Bem...
hoje o _Swagger_ (_framework_) é apto a trabalhar com o _Swagger_ (especificação). Mas não
é apenas essa especificação que ele suporta.

E é aqui que a _SmartBear_ (empresa por trás do desenvolvimento da "marca" _Swagger_) aparece e merece aplausos.

## Swagger Specification vira OpenAPI Specification

Deixa eu corrigir o primeiro parágrafo do capítulo anterior:

> As vantagens de utilizar o _OpenAPI Spec_ são basicamente as mesmas de usar _RAML Spec_,
> _Swagger Spec_, ou _API Blueprint Spec_: Modelar e documentar _APIs_ _REST_.

Com uma vantagem a mais: Ser aberta\*. (note o asterisco)

O _Swagger Specification_ desde o seu princípio é de código aberto. Mas sempre teve uma empresa
vinculada ao seu desenvolvimento (mais ou menos o que acontece com a [_MuleSoft_](https://www.mulesoft.com/ "We connect. You unnovate.")
e o _RAML_).

Em janeiro de 2016, a _SmartBear Software_ renomeou a _Swagger Specification_ para _OpenAPI Specification_.
Disponibilizando-a no _Github_ em [github.com/OAI/OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification "The OpenAPI Specification Repository"),
e tornando-a assim em uma especificação "vendor-neutral".

{% img align-center-keep-size /images/blog/oai-avengers.jpg 640 285 A OAI é tipo os Avengers do mundo das APIs (bestbuy.com) %}

Isso tudo, claro, com supervisão do consórcio que a mesma _SmartBear_ ajudou a construir:
O [_Open API Initiative_](https://www.openapis.org/ "OAI Consortium"). Que é também "curador"
do _OpenAPI Specification_ e tem como integrantes alguns gigantes da indústria como _Google_, _IBM_, _Microsoft_,
e as próprias _MuleSoft_ e _SmartBear_.

## Swagger & OpenAPI

Novamente, deixa eu corrigir o parágrafo do primeiro capítulo:

> As vantagens de utilizar _Swagger_ com _OpenAPI Spec_ são: Além de confiar
> em uma especificação aberta e _vendor-neutral_, você ainda conta com o poderoso ferramental
> de código aberto provido pelo Swagger.

O _Swagger_ "gira em torno" do _OpenAPI_, provendo ferramentas para a modelagem e documentação.
É sem dúvida uma combinação espetacular, e não a toa é a mais famosa e eficiente no momento.

## Considerações finais

Confesso que eu tive problemas para entender o relacionamento entre _RAML_, _Swagger_ e _OpenAPI_,
principalmente por ter adotado o _RAML_ e não seguido o desenvolvimento do _Swagger_.

Hoje, se você for usar _OpenAPI_ (você deveria) é improvável que não recorra ao _Swagger_
para produzir os seus documentos. Portanto, não é incomum vermos muitos materiais onde esses
dois conceitos se misturam e aparentam ser um só.

No próximo _post_ sobre _Swagger_, vamos para uma abordagem mais prática, mostrando como utilizar
as ferramentas com _OpenAPI_.

Até a próxima.

## Referências

- [Caelum - Modelando APIs REST com Swagger](http://blog.caelum.com.br/modelando-apis-rest-com-swagger/)
- [Google Cloud Platform - A especificação OpenAPI](https://cloud.google.com/endpoints/docs/open-api-spec?hl=pt-br)
- [Open API Initiative - About](https://www.openapis.org/about)
- [Swagger - The world's most popular API tooling](https://swagger.io/)
- [Wikipedia - OpenAPI Specification](https://en.wikipedia.org/wiki/OpenAPI_Specification)
- [Wikipedia - Swagger (software)](<https://en.wikipedia.org/wiki/Swagger_(software)>)
