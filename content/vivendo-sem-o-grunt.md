title: Vivendo sem o Grunt
date: 2016-02-22 12:35:00
category: desenvolvimento
tags: desenvolvimento, web, javascript, node, npm, grunt
slug: vivendo-sem-o-grunt
meta_description: No meu primeiro contato com o Grunt, ele não me convenceu. Foi ao trabalhar com Single Page Applications que a ferramenta me conquistou. Hoje, com Browserify e PostCSS fica a dúvida: Talvez você não precise do Grunt.

{% img align-left /images/blog/grunt-logo.png 180 180 Logotipo do Grunt %}

No meu primeiro contato com o *Grunt*, ele não me convenceu. Qual era a
necessidade de um *task runner*  se eu já tinha o `Makefile`? O mesmo valia
para o *build* de estáticos... *Frameworks*  como o *Django*  já possuíam um
*pipeline*  de concatenação e minificação, não sendo necessário que um processo
externo interferisse em algo que (até então) funcionava muito bem.

<!-- PELICAN_END_SUMMARY -->

Foi ao trabalhar com *Single Page Applications* que o *Grunt* me conquistou.
Coisas que iam da otimização de imagens a deploy para ambientes passaram a
ser responsabilidade da ferramenta, e a partir desse momento eu a carreguei
para todo projeto que participei.

Mas o *Grunt* não é "bala de prata". Se para determinados problemas ele funciona
muito bem, para outros ele representa um "peso" questionável na sua *stack*. Aumentando
tempo de desenvolvimento (alguém aí já sofreu com o `grunt-contrib-watch`?),
*build* e *setup* do seu ambiente.

É baseado nesse contexto que [faço coro com alguns *developers* espalhados por aí](https://www.google.com.br/search?q=stop%20using%20grunt&oq=stop%20using%20grunt&aqs=chrome..69i57j0l5.1498j0j7&sourceid=chrome&es_sm=91&ie=UTF-8 "Stop using Grunt"):
Talvez o seu projeto não precise do *Grunt*.


## O que há de errado com o ele?

**Nada!**

*Grunt*, *Gulp*, *Brocolli*, *Brunch*, etc. são ferramentas super bacanas que
cumprem com louvor o seu objetivo. Só que assim como o *jQuery*, para
determinados casos elas podem ser "too much".

Assim como há uma frente defendendo o [uso de *microlibs*](http://www.codemag.com/article/1501101 "Why Micro JavaScript Library Should Be Used in Your Next Application")
ao invés de *fat frameworks*, há uma frente defendendo o uso do [*NPM* como ferramenta de *build*](http://www.sitepoint.com/guide-to-npm-as-a-build-tool/ "Give Grunt the Boot! A Guide to Using npm as a Build Tool").
E por mais que possa parecer "[mimimi](https://www.youtube.com/watch?v=tSUtPkJhvOU "Chora mais")",
alguns argumentos fazem certo sentido. Como por exemplo, o do
*Keith Cirkel* no "[Why we should stop using Grunt & Gulp](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/ "Você deveria parar de usar Grunt")":

> None of these build tools work without plugins. Just found an awesome new
> tool which will revolutionise your build process? Great! Now just wait for
> someone to write a wrapper for Grunt/Gulp/Brocolli, or write it yourself.
> Rather than just learning the command line for the tool you want to use,
> you now have to learn its programatic API, plus the API for your build tool. 

*Flamewars* e "discursos de ódio" à parte, a pergunta que fica é: Será que é tão difícil assim
montar um *pipeline* de *build* sem o uso de *Grunt* e *Gulp*?

{% img align-center /images/blog/king-baratheon.jpg 610 411 Nem todo mundo gosta de Javalis (br.ign.com) %}

Ter uma ferramenta a menos na *stack* do projeto pode tornar-ser um diferencial
ao reduzir atrito e curva de aprendizado.  Mas tirar o *Grunt* da jogada não
significa necessariamente ter menos complexidade no seu projeto...
Apenas significa fazer a mesma coisa com uma dependência a menos.


## NPM como ferramenta de build

O *[Livereload](https://www.npmjs.com/package/livereload "LiveReload server")*
é uma biblioteca escrita em *Node* que levanta um servidor que monitora alterações
no seu projeto e promove um *refresh* no navegador *Web*.

Podemos executá-lo através da linha de comando:

    ::bash
    $ livereload meuprojeto/static/css

É possível usar o `package.json` como um "centralizador" de operações, assim
como fazemos com o nosso `Makefile`:

    ::bash
    $ npm run livereload

Para tanto, no arquivo `package.json`, precisamos adicionar a chave `scripts`
com as instruções de execução para o comando `livereload`:

    ::javascript

    // package.json

    ...
    "scripts": {
      "livereload": "livereload meuprojeto/static/css"
    }
    ...


Talvez haja a necessidade da execução de um comando mais complexo. Para isso,
podemos utilizar um *script* *Node* como ajuda:

    ::javascript

    // build/livereload.js

    var livereload = require('livereload');

    var PATH_CSS = 'meuprojeto/build/static/css';
    var PATH_JS = 'meuprojeto/build/static/js';

    var server = livereload.createServer();
    server.watch([PATH_CSS, PATH_JS]);

E o nosso arquivo de configuração ficaria assim:

    ::javascript

    // package.json

    ...
    "scripts": {
      "livereload": "node buid/livereload"
    }
    ...


Vale lembrar que o `npm` já possui alguns comandos padrões, que não necessitam
da instrução `run`. Por exemplo, temos a execução de testes através do comando `npm test`.


### Um exemplo mais complexo

O exemplo acima é simples e questionável. Vamos partir de uma necessidade
mais palpável e complexa: Quero compilar componentes escritos em *React* e *ES6*.

Para ilustrar, usaremos as bibliotecas *[React](https://facebook.github.io/react/ "A Javascript library for building UI")*,
*[Babelify](https://github.com/babel/babelify "Browserify transform for Babel")* e
*[UglifyJS](https://github.com/mishoo/UglifyJS2 "JavaScript parser / mangler / compressor / beautifier toolkit")*:

    ::bash

    $ npm install react --save
    $ npm install babelify babel-preset-react babel-preset-es2015 uglify-js --save-dev

Podemos criar dois comandos diferentes na nossa chave `scripts`, um para
*transpiling* de *Javascript* e outro para minificação:

    ::javascript

    // package.json

    "compile-js": "browserify meuprojeto/js/script.js -o meuprojeto/build/static/js/bundle.js -t [ babelify --presets [ es2015 react ] ]",

    "minify-js": "uglifyjs meuprojeto/build/static/js/bundle.js -o meuprojeto/build/static/js/bundle.min.js"


Grande demais? É possível isolar esses comandos em *scripts*, como no exemplo do *livereload*:

    ::javascript

    // package.json

    "compile-js": "node build/compile-js",
    "minify-js": "node build/minify-js"


Para tornar mais simples a execução, vamos criar uma *task* genérica de *build*:

    ::javascript

    // package.json

    "compile-js": "node build/compile-js",
    "minify-js": "node build/minify-js",
    "build": "npm run compile-js && npm run minify-js"


Com uma ajudinha da *lib* *[Watch](https://www.npmjs.com/package/watch "Utilities for watching file trees")*,
podemos incrementar ainda mais o nosso processo:

    ::javascript

    // package.json

    ...
    "scripts": {
      "compile-js": "node build/compile-js",
      "minify-js": "node build/minify-js",
      "build": "npm run compile-js && npm run minify-js",
      "watch": "watch 'npm run build' meuprojeto/static/js"
    }
    ...


Pronto! Agora temos os comandos `npm run build` e `npm run watch` que nos ajudarão na demanda
de "transpilar" e minificar componentes escritos em *React*.

Não foi tããããão difícil assim... Certo? Bastou abrir a documentação de
cada ferramenta e perder alguns minutinhos lendo.

"Mas você teve que escrever mais linhas que escreveria utilizando um *plugin*
do *Grunt*."

Possivelmente. Bem como é possível que eu nunca mais vá mexer nessas linhas escritas,
uma vez que o processo já esteja montado e operacional.


## Considerações finais

O mérito dos exemplos acima não está necessariamente na utilização do `npm`
como ferramenta de *build*, mas sim nos incríveis pacotes que a comunidade
*Javascript* tem construído para agilizar a construção de aplicações.

Ferramentas como o *Grunt*, em seu tempo, fizeram uma revolução no que tange o
desenvolvimento de aplicações *Web* (e não há dúvida que ainda o fazem).
Mas com o advento do *Webpack*, *Browserify* e *PostCSS*,
o seu uso passou de essencial para opcional.

Até a próxima.


## Referências

* [Addy Osmani: The Pros And Cons Of JavaScript Micro-Frameworks](https://addyosmani.com/blog/prosconsmicroframeworks/)
* [Hobsons Engineering: Build Tools vs npm Scripts: Why Not Both?](http://engineering.hobsons.com/2015/06/26/build-tools-vs-npm-scripts-why-not-both/)
* [Nader Dabit: Introduction to Using NPM as a Build Tool](https://medium.com/@dabit3/introduction-to-using-npm-as-a-build-tool-b41076f488b0#.hc5o17p1p)
* [Nick Heiner: Maybe you should stop using Grunt](https://medium.com/@nickheiner/maybe-you-should-stop-using-grunt-40ac57fd6ad9#.cpc7pdvwr)
* [Keith Cirkel: Why we should stop using Grunt & Gulp](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/)
* [Lucas M Reis: NPM is an amazing build tool (And solves 90% of the build issues)](http://lucasmreis.github.io/blog/npm-is-an-amazing-build-tool/)
* [Sitepoint: Give Grunt the Boot! A Guide to Using npm as a Build Tool](http://www.sitepoint.com/guide-to-npm-as-a-build-tool/)
* [Stackoverflow: Grunt is extremely slow - 100% CPU](http://stackoverflow.com/questions/28503800/grunt-is-extremely-slow-100-cpu)
* [Stackoverflow: Less compiling slow with Grunt](http://stackoverflow.com/questions/29244671/less-compiling-slow-with-grunt)
