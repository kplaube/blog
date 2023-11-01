---
title: "Javascript: A diferença entre Constructor Function e Object Literal"
date: 2011-10-23 15:07:00
tags: ["desenvolvimento-web", "javascript", "prototype", "oop"]
slug: javascript-constructor-function-object-literal
thumbnail: ./images/javascript-code.jpg
---

Meses atrás, [escrevi sobre como era fácil criar objetos em *Javascript*][].
Devo confessar que, a minha visão sobre a utilização da [Orientação a Objetos][]
em [*Javascript*][] era muito superficial, e que uma dúvida muito pertinente
surgiu na época: Onde usar _object literal_ e onde usar classes?

Hoje, depois de entender que a Orientação a Objetos no _Javascript_ não é
muito diferente da utilizada em outras linguagens, sou capaz de enxergar
as possibilidades utilizando as duas maneiras. E este é o objetivo deste
_post_: **compartilhar esta visão com vocês**.

## Traçando um paralelo

O [*Nettuts*][] fez um [ótimo *post*][] comparando as diferenças entre
os dois métodos de criação de objetos (este artigo é fortemente baseado
na publicação deles). Vamos adotar a estratégia deles e criar estruturas
semelhantes utilizando _object literal_ e _constructors_:

```javascript
var object_literal = {
  Automovel: {
    quantidadeRodas: 4,
  },
};

var constructor = {
  Automovel: function() {
    this.quantidadeRodas = 4;
  },
};
```

Acima já reparamos numa das maiores vantagens do _object literal_:
**criar _namespaces_**. Isolamos as duas declarações para que possamos
usar os mesmos nomes:

```javascript
// object literal
var carro = object_literal.Automovel;
console.log("quantidade de rodas:", carro.quantidadeRodas); // 4

// constructor function
var carro = new constructor.Automovel();
console.log("quantidade de rodas:", carro.quantidadeRodas); // 4
```

Acessar `quantidadeRodas` de `object_literal.Automovel` é muito
mais fácil do que de `constructor.Automovel`. Não é errado dizer que
`quantidadeRodas` de `constructor.Automovel` é um “atributo de
instância”, logo, é necessário criar uma instância da classe para
acessá-lo.

## Os métodos entram em ação

Vamos atribuir aos nossos automóveis a capacidade de `ligarMotor`:

```javascript
var object_literal = {
  Automovel: {
    quantidadeRodas: 4,
    motorLigado: false,

    ligarMotor: function() {
      //object_literal.Automovel.motorLigado = true;
      this.motorLigado = true;
    },
  },
};

var constructor = {
  Automovel: function() {
    this.quantidadeRodas = 4;
    this.motorLigado = false;
  },
};

constructor.Automovel.prototype.ligarMotor = function() {
  this.motorLigado = true;
};
```

Aqui que as diferenças começam a ficar mais “gritantes”.

Por não conseguirmos criar uma instância de um _object literal_ (afinal
de contas, ele já é um objeto), ~~não conseguimos fazer uma referência
`this` como em classes~~ não temos a definição de atributos e métodos
via _Prototype_. ~~Se o fizéssemos, estaríamos explorando atributos da
função anônima associada à propriedade `ligarMotor`, da propriedade
`Automovel`, da variável `object_literal`~~. Mas, conseguimos
**sim** explorar atributos e métodos do objeto através do `this`. O
mesmo ocorre em `ligarMotor` de constructor, o `this` é capaz de
acessar os valores e métodos nas instâncias de `Automovel`:

```javascript
// object literal
carro.ligarMotor();
console.log("motor ligado:", carro.motorLigado); // true

// constructor function
carro.ligarMotor();
console.log("motor ligado:", carro.motorLigado); // true
```

## Atributos diferentes para instâncias diferentes

Sabemos que um automóvel pode ter 2, 4, 6 ou até 8 rodas, então vamos
adaptá-los:

```javascript
var constructor = {
  Automovel: function(qtndRodas) {
    this.quantidadeRodas = qtndRodas;
    this.motorLigado = false;
  },
};
```

Ué?! Mas e o **object literal**? Pois é.. como ele não pode gerar
instâncias (novamente, ele já é um objeto), temos que alterar “na mão”:

```javascript
// object literal
var moto = object_literal.Automovel;
moto.quantidadeRodas = 2;
console.log("quantidade de rodas (moto):", moto.quantidadeRodas); // 2

// constructor function
var moto = new constructor.Automovel(2);
console.log("quantidade de rodas (moto):", moto.quantidadeRodas); // 2
```

Só por curiosidade, como estarão os nossos objetos `carro`? (Lá vem a
pegadinha =P )

```javascript
// object literal
console.log("quantidade de rodas (carro):", carro.quantidadeRodas); // 2

// constructor function
console.log("quantidade de rodas (carro):", carro.quantidadeRodas); // 4
```

Pelo lado da instância de `constructor.Automovel`, nenhuma surpresa.
Mas o que aconteceu com o valor do atributo `quantidadeRodas` da
variável `carro` em `object_literal.Automovel`?

## Instâncias x Referências

A grosso modo, com uso de _constructor functions_, criamos uma
“estrutura” (classe), que a cada `new` é “copiada” para um novo espaço
na memória (instância). Assim, a propriedade `quantidadeRodas` de moto
é diferente da propriedade de mesmo nome, da instância `carro` ([leia mais sobre instâncias e classes][]):

```javascript
// constructor function
console.log("carro == moto:", carro == moto); // false
```

Já com _object literal_, não temos a capacidade de criar uma classe.
Criamos diretamente uma instância, e vinculamos o espaço na memória onde
esta foi criada à uma variável. No nosso caso, a variável em questão é
`object_literal.Automovel`.

Quando atribuímos `object_literal.Automovel` à variável `carro` e
depois à variável `moto`, na verdade estávamos criando referências a
instânca contida em `object_literal.Automovel` (ou seja, as três
variáveis correspondem ao mesmo endereço e valor na memória):

```javascript
// object literal
console.log("carro == moto:", carro == moto); // true
```

Portanto, se eu criar uma variável chamada `moto2` e atribuir a ela a
instância de `constructor.Automovel` contida em `moto`, terei o
mesmo resultado que acima:

```javascript
// constructor function
var moto2 = moto;
moto2.quantidadeRodas = 3;
console.log("quantidade de rodas (instancia carro):", carro.quantidadeRodas); // 4
console.log("quantidade de rodas (instancia moto):", moto.quantidadeRodas); // 3
console.log("quantidade de rodas (referencia moto2):", moto2.quantidadeRodas); // 3
console.log("moto == moto2:", moto == moto2); // true
```

Interessante, não?

## Considerações finais

Uma vez descobrindo a diferença entre _object literal_ e _constructor function_,
notamos que não há diferenças conceituais em relação a
linguagens como _Python_, _C++_ ou _Java_. Basta termos em mente que o
tipo de escrita, através da _prototype_, é diferente (e mais dinâmica)
do que o usual, mas os resultados são (conceitualmente falando)
praticamente os mesmos.

Então, quando você tiver um tipo que possuirá várias instâncias, utilize
_constructor functions_. Quando quiser criar objetos “estáticos”, que
não sofrerão alterações no decorrer de uma execução (como o exemplo do
namespace), utilize _object literal_.

## Referências

- [_Nettuts+ – The Basics of Object-Oriented JavaScript_][ótimo *post*]
- [*Nettuts+ – Stop Nesting Functions! (But Not All of Them)*][]

O exemplo completo está disponível para download em:
[https://github.com/kplaube/post-javascript-object-literal-constructors][]

Até a próxima…

[escrevi sobre como era fácil criar objetos em *javascript*]: /2011/05/16/fazendo-javascript-oo-de-forma-facil.html "Fazendo Javascript OO de forma fácil"
[orientação a objetos]: /tag/oop.html "Leia mais sobre OOP"
[*javascript*]: /tag/javascript.html "Leia mais sobre Javascript"
[*nettuts*]: http://net.tutsplus.com/ "Não conhece o Nettuts? Não perca tempo!"
[ótimo *post*]: http://net.tutsplus.com/tutorials/javascript-ajax/the-basics-of-object-oriented-javascript/ "The Basics of Object-Oriented JavaScript"
[leia mais sobre instâncias e classes]: http://pt.wikipedia.org/wiki/Inst%C3%A2ncia_(classe) "Leia mais sobre instância no Wikipedia"
[*nettuts+ – stop nesting functions! (but not all of them)*]: http://net.tutsplus.com/tutorials/javascript-ajax/stop-nesting-functions-but-not-all-of-them/ "Stop Nesting Functions! But Not All of Them"
[https://github.com/kplaube/post-javascript-object-literal-constructors]: https://github.com/kplaube/post-javascript-object-literal-constructors "Veja o exemplo completo no GitHub"
