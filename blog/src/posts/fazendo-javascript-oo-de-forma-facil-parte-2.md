---
title: "Fazendo Javascript OO de forma fácil - Parte 2"
date: 2016-03-15 13:20
modified: 2023-11-08 16:55
tags: ["desenvolvimento-web", "javascript", "es6", "oop"]
slug: fazendo-javascript-oo-de-forma-facil-parte-2
thumbnail: /media/javascript-logo.png
---

Há cerca de 5 anos, fiz um _post_ sobre como escrever
[Javascript OO de forma fácil](/2011/05/16/fazendo-javascript-oo-de-forma-facil.html "Leia o artigo completo")
utilizando a orientação a objetos da linguagem através de
[_Constructor Functions_ e _Object Literal_](/2011/10/23/javascript-constructor-function-object-literal.html "Diferença entre Constructor Function e Object Literal").
Hoje, com o _ES6_, o esquema de _Prototype_ ainda continua,
mas a sintaxe ficou muito mais fácil e intuitiva, valendo a pena dar um _revival_
no tema para explorar um pouquinho mais das novas funcionalidades.

Então, nobre leitor, prepare o seu [_Babel_](https://babeljs.io/ "Javascript compiler") e vamos escrever algumas classes
na nova sintaxe do [_Javascript_](/tag/javascript.html "Leia mais sobre Javascript").

## Açúcares sintáticos

Sim! A sintaxe apresentada no _ECMAScript 6_ não passa de açúcar sintático!

Na prática, o _Javascript_ continua utilizando a orientação a objetos através de
_Prototype_. Mas isso não diminui em nada o valor desse _approach_ para com a
linguagem. Fazer _Javascript_ OOP é a realidade de muitas aplicações
(complexas ou não), e caso você queira escrever componentes utilizando _React_,
verá que a dupla _ES6_ + _React_ é capaz de produzir componentes com código
extremamente legível e elegante.

Vamos começar escrevendo nossa classe `Pessoa`:

```javascript
class Pessoa {
  constructor({ nome, idade }) {
    this.nome = nome;
    this.idade = idade;
  }

  sayTheName() {
    console.log(this.nome);
  }
}

let pessoa = new Pessoa({ idade: 18, nome: "Guido" });
pessoa.sayTheName(); // Guido
console.log(pessoa.__proto__.sayTheName); // function sayTheName
```

Agora possuímos a palavra reservada `class` para a construção de classes. Além
disso, temos a inserção do método `constructor`, que será executado no momento em que
a instância for criada.

Não precisamos mais da assinatura `Pessoa.prototype.method = function`
para adicionarmos um método. Agora há uma sintaxe específica, muito mais clara
e fácil de lembrar.

![Stay classy San Diego (sandiegouniontribune.com)](/media/stay-classy.jpeg "Stay classy San Diego! (sandiegouniontribune.com)")

Note que no momento de instanciar a classe, nada muda em relação à versão atual.
O que temos de mais "exótico" é a capacidade de nomearmos parâmetros
(como os `**kwargs` do [_Python_](/tag/python.html "Leia mais sobre Python")),
na definição do construtor.

Esse conceito, apresentado na linha `constructor({nome, idade})`, é chamado de
[_destructuring_](https://github.com/lukehoban/es6features#destructuring).

Para chegarmos a um resultado parecido no _ES5_, precisaríamos fazer o seguinte:

```javascript
var Pessoa = function Pessoa(options) {
  var nome = options.nome;
  var idade = options.idade;

  this.nome = nome;
  this.idade = idade;
};
```

## Herança

Lembra da confusão que era fazer heranças no _Javascript_? Pois bem, ganhamos
nessa nova versão da linguagem a palavra reservada `extends`:

```javascript
class Atleta extends Pessoa {
  constructor({ nome, idade, esporte = "Basquete" }) {
    super({ nome: nome, idade: idade });

    this.esporte = esporte;
  }
}

let jogador = new Atleta({ idade: 22, nome: "Fulano", esporte: "Futebol" });
console.log(jogador.nome); // Fulano
console.log(jogador.esporte); // Futebol

let jogador2 = new Atleta({ idade: 28, nome: "Beltrano" });
console.log(jogador2.nome); // Beltrano
console.log(jogador2.esporte); // Basquete
```

E para tornar ainda mais fácil essa prática, também ganhamos a função reservada
`super`, que é responsável por executar o método pai, dada a chamada em um
determinado método de uma classe filha.

Para finalizar o nosso exemplo, na linha `constructor({nome, idade, esporte='Basquete'})`
temos a apresentação do recurso [_default_](https://github.com/lukehoban/es6features#default--rest--spread "Leia mais sobre default, rest e spread").
Com ele, somos capazes de definir valores padrões caso a passagem de determinado
parâmetro seja omitida.

## Considerações finais

Se tem algo que chama a atenção com o advento do _ECMAScript 6_ é a facilidade
na construção de classes e objetos, uma coisa que sempre foi muito confusa
(mas não menos eficiente) em _Javascript_.

Bibliotecas como o _React_ tem feito um bom uso desse recurso, proporcionando
soluções limpas e legíveis, fáceis de estender e customizar.

O suporte pelos _browsers_ ainda não é dos melhores, se fazendo necessário
o uso do _Babel_ para o _transpiling_ de _ES6_ para _ES5_. Mesmo assim, nada
que impeça o uso de sintaxe _ES6_ nos seus próximos projetos.

Até a próxima.

## Referências

- [_2ality - Getting started with ECMAScript 6_](http://www.2ality.com/2015/08/getting-started-es6.html)
- [_lukehoban - Overview of ECMAScript 6 features_](https://github.com/lukehoban/es6features)
