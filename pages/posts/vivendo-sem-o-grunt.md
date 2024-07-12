---
title: "Vivendo sem o Grunt"
date: 2016-02-22 12:35:00
tags: ["desenvolvimento-web", "javascript", "node", "npm", "grunt"]
slug: vivendo-sem-o-grunt
thumbnail: ./images/grunt-logo.png
---

No meu primeiro contato com o _Grunt_, ele não me convenceu. Qual era a
necessidade de um _task runner_ se eu já tinha o `Makefile`? O mesmo valia
para o _build_ de estáticos... _Frameworks_ como o _Django_ já possuíam um
_pipeline_ de concatenação e minificação, não sendo necessário que um processo
externo interferisse em algo que (até então) funcionava muito bem.

Foi ao trabalhar com _Single Page Applications_ que o _Grunt_ me conquistou.
Coisas que iam da otimização de imagens a deploy para ambientes passaram a
ser responsabilidade da ferramenta, e a partir desse momento eu a carreguei
para todo projeto que participei.

Mas o _Grunt_ não é "bala de prata". Se para determinados problemas ele funciona
muito bem, para outros ele representa um "peso" questionável na sua _stack_. Aumentando
tempo de desenvolvimento (alguém aí já sofreu com o `grunt-contrib-watch`?),
_build_ e _setup_ do seu ambiente.

É baseado nesse contexto que [faço coro com alguns _developers_ espalhados por aí](https://www.google.com.br/search?q=stop%20using%20grunt&oq=stop%20using%20grunt&aqs=chrome..69i57j0l5.1498j0j7&sourceid=chrome&es_sm=91&ie=UTF-8 "Stop using Grunt"):
Talvez o seu projeto não precise do _Grunt_.

## O que há de errado com o ele?

**Nada!**

_Grunt_, _Gulp_, _Brocolli_, _Brunch_, etc. são ferramentas super bacanas que
cumprem com louvor o seu objetivo. Só que assim como o _jQuery_, para
determinados casos elas podem ser "too much".

Assim como há uma frente defendendo o [uso de _microlibs_](http://www.codemag.com/article/1501101 "Why Micro JavaScript Library Should Be Used in Your Next Application")
ao invés de _fat frameworks_, há uma frente defendendo o uso do [_NPM_ como ferramenta de _build_](http://www.sitepoint.com/guide-to-npm-as-a-build-tool/ "Give Grunt the Boot! A Guide to Using npm as a Build Tool").
E por mais que possa parecer "[mimimi](https://www.youtube.com/watch?v=tSUtPkJhvOU "Chora mais")",
alguns argumentos fazem certo sentido. Como por exemplo, o do
_Keith Cirkel_ no "[Why we should stop using Grunt & Gulp](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/ "Você deveria parar de usar Grunt")":

> None of these build tools work without plugins. Just found an awesome new
> tool which will revolutionise your build process? Great! Now just wait for
> someone to write a wrapper for Grunt/Gulp/Brocolli, or write it yourself.
> Rather than just learning the command line for the tool you want to use,
> you now have to learn its programatic API, plus the API for your build tool.

_Flamewars_ e "discursos de ódio" à parte, a pergunta que fica é: Será que é tão difícil assim
montar um _pipeline_ de _build_ sem o uso de _Grunt_ e _Gulp_?

!["Nem todo mundo gosta de Javalis (br.ign.com)"](./images/king-baratheon.jpg "Nem todo mundo gosta de Javalis (br.ign.com)")

Ter uma ferramenta a menos na _stack_ do projeto pode tornar-ser um diferencial
ao reduzir atrito e curva de aprendizado. Mas tirar o _Grunt_ da jogada não
significa necessariamente ter menos complexidade no seu projeto...
Apenas significa fazer a mesma coisa com uma dependência a menos.

## NPM como ferramenta de build

O _[Livereload](https://www.npmjs.com/package/livereload "LiveReload server")_
é uma biblioteca escrita em _Node_ que levanta um servidor que monitora alterações
no seu projeto e promove um _refresh_ no navegador _web_.

Podemos executá-lo através da linha de comando:

```text
$ livereload meuprojeto/static/css
```

É possível usar o `package.json` como um "centralizador" de operações, assim
como fazemos com o nosso `Makefile`:

```text
$ npm run livereload
```

Para tanto, no arquivo `package.json`, precisamos adicionar a chave `scripts`
com as instruções de execução para o comando `livereload`:

```javascript
// package.json

...
"scripts": {
    "livereload": "livereload meuprojeto/static/css"
}
...
```

Talvez haja a necessidade da execução de um comando mais complexo. Para isso,
podemos utilizar um _script_ _Node_ como ajuda:

```javascript
// build/livereload.js

var livereload = require("livereload");

var PATH_CSS = "meuprojeto/build/static/css";
var PATH_JS = "meuprojeto/build/static/js";

var server = livereload.createServer();
server.watch([PATH_CSS, PATH_JS]);
```

E o nosso arquivo de configuração ficaria assim:

```javascript
// package.json

...
"scripts": {
    "livereload": "node buid/livereload"
}
...
```

Vale lembrar que o `npm` já possui alguns comandos padrões, que não necessitam
da instrução `run`. Por exemplo, temos a execução de testes através do comando `npm test`.

### Um exemplo mais complexo

O exemplo acima é simples e questionável. Vamos partir de uma necessidade
mais palpável e complexa: Quero compilar componentes escritos em _React_ e _ES6_.

Para ilustrar, usaremos as bibliotecas _[React](https://facebook.github.io/react/ "A Javascript library for building UI")_,
_[Babelify](https://github.com/babel/babelify "Browserify transform for Babel")_ e
_[UglifyJS](https://github.com/mishoo/UglifyJS2 "JavaScript parser / mangler / compressor / beautifier toolkit")_:

```text
$ npm install react --save
$ npm install babelify babel-preset-react babel-preset-es2015 uglify-js --save-dev
```

Podemos criar dois comandos diferentes na nossa chave `scripts`, um para
_transpiling_ de _Javascript_ e outro para minificação:

```javascript
// package.json

"compile-js": "browserify meuprojeto/js/script.js -o meuprojeto/build/static/js/bundle.js -t [ babelify --presets [ es2015 react ] ]",

"minify-js": "uglifyjs meuprojeto/build/static/js/bundle.js -o meuprojeto/build/static/js/bundle.min.js"
```

Grande demais? É possível isolar esses comandos em _scripts_, como no exemplo do _livereload_:

```javascript
// package.json

"compile-js": "node build/compile-js",
"minify-js": "node build/minify-js"
```

Para tornar mais simples a execução, vamos criar uma _task_ genérica de _build_:

```javascript
// package.json

"compile-js": "node build/compile-js",
"minify-js": "node build/minify-js",
"build": "npm run compile-js && npm run minify-js"
```

Com uma ajudinha da _lib_ _[Watch](https://www.npmjs.com/package/watch "Utilities for watching file trees")_,
podemos incrementar ainda mais o nosso processo:

```javascript
// package.json

...
"scripts": {
    "compile-js": "node build/compile-js",
    "minify-js": "node build/minify-js",
    "build": "npm run compile-js && npm run minify-js",
    "watch": "watch 'npm run build' meuprojeto/static/js"
}
...
```

Pronto! Agora temos os comandos `npm run build` e `npm run watch` que nos ajudarão na demanda
de "transpilar" e minificar componentes escritos em _React_.

Não foi tããããão difícil assim... Certo? Bastou abrir a documentação de
cada ferramenta e perder alguns minutinhos lendo.

"Mas você teve que escrever mais linhas que escreveria utilizando um _plugin_
do _Grunt_."

Possivelmente. Bem como é possível que eu nunca mais vá mexer nessas linhas escritas,
uma vez que o processo já esteja montado e operacional.

## Considerações finais

O mérito dos exemplos acima não está necessariamente na utilização do `npm`
como ferramenta de _build_, mas sim nos incríveis pacotes que a comunidade
_Javascript_ tem construído para agilizar a construção de aplicações.

Ferramentas como o _Grunt_, em seu tempo, fizeram uma revolução no que tange o
desenvolvimento de aplicações _web_ (e não há dúvida que ainda o fazem).
Mas com o advento do _webpack_, _Browserify_ e _PostCSS_,
o seu uso passou de essencial para opcional.

Até a próxima.

## Referências

- [Addy Osmani: The Pros And Cons Of JavaScript Micro-Frameworks](https://addyosmani.com/blog/prosconsmicroframeworks/)
- [Hobsons Engineering: Build Tools vs npm Scripts: Why Not Both?](http://engineering.hobsons.com/2015/06/26/build-tools-vs-npm-scripts-why-not-both/)
- [Nader Dabit: Introduction to Using NPM as a Build Tool](https://medium.com/@dabit3/introduction-to-using-npm-as-a-build-tool-b41076f488b0#.hc5o17p1p)
- [Nick Heiner: Maybe you should stop using Grunt](https://medium.com/@nickheiner/maybe-you-should-stop-using-grunt-40ac57fd6ad9#.cpc7pdvwr)
- [Keith Cirkel: Why we should stop using Grunt & Gulp](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/)
- [Lucas M Reis: NPM is an amazing build tool (And solves 90% of the build issues)](http://lucasmreis.github.io/blog/npm-is-an-amazing-build-tool/)
- [Sitepoint: Give Grunt the Boot! A Guide to Using npm as a Build Tool](http://www.sitepoint.com/guide-to-npm-as-a-build-tool/)
- [Stackoverflow: Grunt is extremely slow - 100% CPU](http://stackoverflow.com/questions/28503800/grunt-is-extremely-slow-100-cpu)
- [Stackoverflow: Less compiling slow with Grunt](http://stackoverflow.com/questions/29244671/less-compiling-slow-with-grunt)
