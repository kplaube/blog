---
title: "API Blueprint: Markdown é vida!"
date: 2020-04-05 07:40:00
tags:
  ["desenvolvimento-web", "rest", "api", "api-first", "api-blueprint", "mson"]
slug: api-blueprint-markdown-e-vida
thumbnail: /images/api-blueprint-logo.png
---

Estamos falando sobre escrever especificações de [_APIs_](/tag/api.html "Leia mais sobre APIs")
há um bom tempo aqui no _blog_. [_RAML_](/tag/raml.html "Leia mais sobre RAML"),
[_Swagger_](/tag/swagger.html "Leia mais sobre Swagger") e
[_OpenAPI Specification_](/tag/oai.html "Leia mais sobre OpenAPI") já foram explorados, e
com os dois últimos encontramos um ecossistema rico com ferramentas extremamente
interessantes.

Há um outro simpático _player_ no mercado, o [_API Blueprint_](https://apiblueprint.org/ "Visite a página oficial do projeto"),
e o _post_ de hoje é sobre essa prática ferramenta.

## A menor curva de aprendizado do Oeste

Um colega de trabalho, há muito tempo atrás, me apresentou o _API Blueprint_. Na
ótica dele, um dos aspectos mais interessantes era a escrita utilizando _Markdown_.

![Antony Hopkins em Westworld](/images/westworld-antony-hopkins.jpg "É um formato para máquinas? É um formato para humanos? Que diferença faz? (tvguide.com)")

Sim! É verdade! Claro que utilizando o formato/extensão específico há ganhos
como _syntax highlighting_, mas ainda assim é possível escrever a especificação de uma _API_ somente
com _Markdown_, o que torna a leitura do documento mais amigável, e interoperável com ferramentas
como o seu editor de textos, ou o próprio _Github_.

![Como o documento é apresentado pelo Github](/images/api-blueprint-github-example.png)

Para quem já tem um `README.md` em seu repositório, ter um `api.md` não parece ser
nenhum grande sacrifício. E dependendo do seu público alvo, ter a "documentação final gerada"
pode ser tão simples quanto compartilhar o _link_ da especificação no _Github_.

## Mas o que é API Blueprint mesmo?

A documentação oficial o define da seguinte forma:

> (...) is simple and accessible to everybody involved in the API lifecycle. Its syntax is concise yet expressive. With API Blueprint you can quickly design and prototype APIs to be created or document and test already deployed mission-critical APIs.

Assim como os já citados _RAML_ e _Swagger_, o _API Blueprint_ é uma linguagem de _design_ utilizada para
descrever _APIs_. O seu propósito é o de encorajar o diálogo e colaboração, logo, uma ferramenta
mais que ideal para adoção no seu processo de _API-First_.

Para ter os ganhos que citei anteriormente, o _API Blueprint_ usa um "melhoramento" do _Markdown_
chamado de _MSON_ (_Markdown Syntax for Object Notation_). É com essa notação que utilizamos a síntaxe
do _Markdown_ para descrever estruturas de dados, heranças e recursos.

[Leia a especificação do _MSON_](https://github.com/apiaryio/mson/blob/master/MSON%20Specification.md "Leia no Github").

## Começando

Voltando ao bom e velho exemplo do [_mini IMDB_](/2016/05/20/rest-parte-2.html "REST: Parte 2"), vamos criar um arquivo `api.md`
e pôr a mão na massa.

Começamos por definir qual versão do _API Blueprint_ utilizaremos, bem como descrevendo o nome da _API_ e seu propósito:

```markdown
FORMAT: A1

# Movies API

This is an API Blueprint example describing a movies API.
```

O `#`, no _Markdown_, é associado a um "título de nível 1". Ou seja, o `# Movies API` se convertido em _HTML_ produziria um `<h1>Movies API</h1>`.
Nesse caso, o `#` produz o título da _API_. O `#` também é utilizado para agrupar recursos, mas nesse caso, ele necessita da _keyword_
`Group`:

```markdown
FORMAT: A1

# Movies API

This is an API Blueprint example describing a movies API.

# Group Movies

Resources related to movies in the API.
```

## Descrevendo recursos

O próximo passo é descrever o recurso e seus _endpoints_. Começaremos pelo
_endpoint_ `/movies`. Para descrever o recurso, utilizamos o `##`, já a ação
é representada através de 3 _hashtags_ (`###`):

```markdown
(...)

## Movie collection [/movies]

### List all Movies [GET]

List movies in reverse order of publication.

- Response 200 (application/json)
```

Quando o recurso `/movies` receber uma requisição `GET`, ele responderá com
o _status code_ `200`, e com o `content-type` `application/json`. Essa última
parte é descrita através da linha `+ Response 200 (application/json)`.

![Exemplo de representação do endpoint](/images/api-blueprint-resource-example.png)

Podemos também descrever como será o _payload_ dessa resposta.

## Descrevendo os dados

É possível utilizar [_JSON Schema_](https://json-schema.org/ "A vocabulary that allows you to annotate and validate JSON documents")
para descrever o _payload_ de requisições e respostas. Como ilustrado nesse exemplo tirado da documentação oficial:

```markdown
### Create a New Question [POST]

You may create your own question using this action. It takes a JSON object
containing a question and a collection of answers in the form of choices.

- Request (application/json)

  - Body

          {
            "question": "Favourite language?"
            "choices": [
              "Swift",
              "Objective-C"
            ]
          }

  - Schema

          {
            "$schema": "http://json-schema.org/draft-04/schema#",
            "type": "object",
            "properties": {
              "question": {
                "type": "string"
              },
              "choices": {
                "type": "array",
                "items": {
                  "type": "string"
                },
                "minItems": 2
              }
            }
          }
```

O _JSON Schema_ é um vocabulário poderoso para anotar e validar documentos _JSON_. No entanto, ele pode "destoar" do resto do seu documento.

Há uma alternativa utilizando o próprio _MSON_. Através da seção `## Data structure`, conseguimos algo semelhante com o ilustrado acima.

```markdown
(...)

## Data structures

### Movie

- id: 810b43d0-fc0d-4199-8a79-25b471c880bf (string, required)
- title: Avengers: Endgame (string, required)
- description (string)
```

Descrevemos a estrutura `Movie`, informando o seu `id` (`string` e obrigatória),
`title` e `description`. Note que este último, além de não ser obrigatório, não
possui nenhum exemplo informado (como os dois outro campos).

Para associar a estrutura acima com a resposta de `/movies`, utilizamos
`Attributes`:

```markdown
(...)

### List all Movies [GET]

List movies in reverse order of publication.

- Response 200 (application/json)

  - Attributes (array[Movie])

(...)
```

Com ajuda do tipo `array`, descrevemos o _payload_ da resposta do _endpoint_.

![Exemplo de representação do payload](/images/api-blueprint-data-example.png)

No fim das contas, um _JSON body_ e _JSON Schema_ é gerado através dos
atributos _MSON_. Por isso do bloco `Schema`, exibido na imagem acima.

Visite o [tutorial do _API Blueprint_](https://apiblueprint.org/documentation/tutorial.html "Tutorial com demais verbos")
e veja como aplicar a especificação para os demais verbos _HTTP_.

[O exemplo completo pode ser conferido aqui](https://gist.github.com/kplaube/8cb39a98e0a2892412f060ad6c61704b "Veja o exemplo completo no Gist").

As imagens representando a especificação foram extraídas do _plugin_ [_API Blueprint Viewer_](https://marketplace.visualstudio.com/items?itemName=develiteio.api-blueprint-viewer), para o [_VS Code_](/tag/vscode.html "LEia mais sobre VS Code").

## Considerações finais

Na página de [_Tools_ do site oficial](https://apiblueprint.org/tools.html "Visite o site oficial do API Blueprint") é
possível conhecer as diferentes ferramentas à disposição, que vão desde editores até _mock servers_.

Nesse quesito, uma das ferramentas que me conquistou foi o [_Dredd_](https://github.com/apiaryio/dredd "Visite o repositório no Github"),
que é utilizado para validar especificação, e funciona tanto com o _API Blueprint_ quanto com o _OpenAPI_. Aliás,
_OpenAPI_/_Swagger_ ainda são "campeões" no quesito ferramentas disponíveis.

Pela característica do _Markdown_, e de ser relativamente mais barato de escrever, eu tive a oportunidade de utilizar o _API Blueprint_
da seguinte forma:

- Propostas de adições, remoções e alterações são escritas através de _API Blueprint_ e discutidas com os _stakeholders_;
- A solução é escrita e o contrato é validado através do _Dredd_;
- Mas a especificação pública é gerada através do código-fonte, com o _Swagger_;
- E a partir dessa especificação é gerada a documentação final e _SDKs_.

A facilidade de escrita de documentos _API Blueprint_ faz dele uma ótima opção e um _player_ mais que interessante
no cenário de _specs_ _REST_. Um terreno ainda dominado pelo _Swagger_...

Até a próxima.
