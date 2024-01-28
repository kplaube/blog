---
title: "Afinal, o que são Closures?"
date: 2011-05-29 13:52:00
modified: 2023-09-30 17:53
tags: ["closures", "oop", "javascript"]
slug: afinal-o-que-sao-closures
thumbnail: /media/closures.jpg
---

Entendi o conceito de _closures_ enquanto estudava _Ruby_. Na verdade,
fica a dica: Se você quer aprender [Orientação a Objetos][], aprenda
linguagens dinâmicas como _Ruby_, [*Python*][] e até mesmo [*PHP*][].
Depois parta para linguagens mais estritas como _Java_ e _C++_.

Vamos deixar a [*Wikipedia*][] nos explicar o que é uma _closure_:

> Uma closure ocorre normalmente quando uma função é declarada dentro do
> corpo de outra, e a função interior referencia variáveis locais da
> função exterior. Em tempo de execução, quando a função exterior é
> executada, então uma closure é formada, que consiste do código da
> função interior e referências para quaisquer variáveis no escopo da
> função exterior que a closure necessita.

Vamos ao exemplo:

```javascript
var digaSeuNome = function(nome) {
  var msg = "Olá " + nome + ". Seja bem-vindo!";
  var exibeMensagem = function() {
    alert(msg);
  };

  exibeMensagem();
};

digaSeuNome("João"); // Olá João. Seja bem-vindo!
```

Temos uma função definida dentro de outra função. A função interna
utiliza de parâmetros e variáveis da função externa. Basicamente, este é
o conceito de _closure_.

Não achou muito útil? Dê uma olhada no exemplo abaixo:

```javascript
var FabricaDeUsuarios = function() {
  var id = 0;
  var criaUsuario = function(nome) {
    id++;
    return {
      id: id,
      nome: nome,
    };
  };

  return criaUsuario;
};

var novoUsuario = FabricaDeUsuarios();
var joao = novoUsuario("João");
var jose = novoUsuario("José");

alert(joao.id); // 1
alert(jose.id); // 2
```

Abusamos do contexto da linguagem, onde mesmo que estejamos “chamando” a função
fora do escopo de `FabricaDeUsuarios`, na verdade `novoUsuario`
trata-se de uma referência a função `criaUsuario`. Logo, ainda
estaremos utilizando os recursos do contexto de `FabricaDeUsuarios`.

E você? Tem algum exemplo bacana sobre _closures_?

## Referências

- [*Javascript Closures – They’re not magic*][]
- [*Morris Johns – Javascript Closures for Dummies*][]
- [*Mozilla Developer Network – Closures*][]
- [*Walter Cruz – Closures*][]

[orientação a objetos]: /tag/oop.html "Leia mais sobre Orientação a Objetos"
[*python*]: /tag/python.html "Leia mais sobre Python"
[*php*]: /tag/php.html "Leia mais sobre PHP"
[*wikipedia*]: http://pt.wikipedia.org/wiki/Closure "Leia sobre closure no Wikipedia"
[*javascript closures – they’re not magic*]: http://www.javascriptkit.com/javatutors/closures.shtml "Alguns exemplos de closures com Javascript"
[*morris johns – javascript closures for dummies*]: http://blog.morrisjohns.com/javascript_closures_for_dummies "Leia sobre Closures em Javascript"
[*mozilla developer network – closures*]: https://developer.mozilla.org/en/JavaScript/Guide/Closures "Leia sobre Closures no guia Javascript da Mozilla"
[*walter cruz – closures*]: http://devlog.waltercruz.com/closures "Closures em Ruby"
