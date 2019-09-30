Title: Documentando a sua API com raml2html
Date: 2017-09-16 00:15:00
Tags: desenvolvimento, web, rest, apis, raml, nodejs
Slug: documentando-sua-api-com-raml2html
meta_description: O RAML possui algumas ferramentas super bacanas em seu repertório. O raml2html é uma delas, que ajuda (e muito) na geração de documentações.
Image: /images/blog/raml-logo.jpg
Alt: Logotipo do RAML

Uma das coisas mais legais em relação ao [_RAML_]({tag}raml "Leia mais sobre RAML")
(e afins) é a diversidade de ferramentas que existem em seu ecossistema.
Embora a especificação por si cumpra o seu papel, são elas que trazem
"mais cores" aos resultados práticos de ter uma _spec_ para a sua [_API_]({tag}apis "Leia mais sobre API").

<!-- PELICAN_END_SUMMARY -->

No universo do _RAML_, existe algumas boas ferramentas que geram documentação a partir da especificação.
Soluções que vão do [_Python_](https://github.com/spotify/ramlfications "Conheça o Ramlfications"),
[_Wikis_](https://github.com/jhitchcock/raml2wiki "Conheça o raml2wiki"),
[_ASP.net_](https://github.com/QuickenLoans/RAMLsharp "Leia mais sobre o RAMLsharp") e até ao
[_Java_](https://github.com/isaacloud/sdk-gen "Gere SDKs usando RAML"). Mas acredito
que a ferramenta mais atual seja o
[_raml2html_](https://github.com/raml2html/raml2html " RAML to HTML documentation generator"),
feito em [_Node.js_]({tag}nodejs "Leia mais sobre Node.js").

## Simples, como as melhores coisas da vida

O [_raml2html_](https://github.com/raml2html/raml2html "RAML to HTML documentation generator")
é uma biblioteca que transforma _specs_ _RAML_ em [_HTML_]({tag}html "Leia mais sobre HTML").
E o mais legal é que a sua versão 4 suporta a versão 1.0 da linguagem.

{% img align-center-keep-size /images/blog/poesia-vogon.jpg 600 344 Aguenta mais um pouco dessa poesia Vogon (imagilendo.wordpress.com) %}

Vamos aproveitar o "mini IMDB" construído no
[_post_ de _RAML_]({filename}ramilificando-as-suas-apis.md "Ramilificando as suas APIs"), para
ilustrar como essa ferramenta funciona. Mas antes, aquele `npm install` clássico:

    ::bash
    $ npm i -g raml2html

Agora é só chamar o utilitário de linha de comando:

    ::bash
    $ raml2html api.raml > index.html

Pronto! Basta abrir o arquivo no seu navegador favorito:

{% img align-center-keep-size /images/blog/raml2html-example.png 640 415 Exemplo de documentação RAML %}

Simples, não? Calma que ainda não acabou! Existe a possibilidade de utilizar temas juntamente com o `raml2html`:

    ::bash
    $ npm i -g raml2html-markdown-theme

Agora basta passar o tema na hora de gerar a documentação:

    ::bash
    $ raml2html --theme raml2html-markdown-theme api.raml > index.md

Sem dúvida, um dos templates mais legais que temos disponível é o `raml2html-slate-theme`.
Completo, e baseado no próprio
[_Slate_](https://github.com/lord/slate "Beautiful static documentation for your API"),
famosa ferramenta para criação de documentação de _APIs_:

{% img align-center-keep-size /images/blog/raml2html-example-2.png 640 341 Exemplo de documentação RAML %}

Você pode criar o seu próprio template! Eles são escritos utilizando o
[_Nunjucks_](https://mozilla.github.io/nunjucks/ " A rich and powerful templating language for JavaScript."),
linguagem de templates [_Javascript_]({tag}javascript "Leia mais sobre Javascript") da _Mozilla_.

## Considerações finais

O _post_ de hoje foi uma dica rápida e rasteira.

A partir do momento que você pratica o
[_design first_](https://swaggerhub.com/blog/api-design/design-first-or-code-first-api-development/ "Design First or Code First: What’s the Best Approach to API Development?"),
ter uma especificação _RAML_ como "single source of truth" é um caminho no mínimo razoável.
Com isso, gerar documentações através de ferramentas como a apresentada nesse artigo torna-se
algo rápido e prático.

Até a próxima!
