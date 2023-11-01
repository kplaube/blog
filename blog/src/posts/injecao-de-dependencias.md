---
title: "Injeção de Dependência"
date: 2015-10-24 16:30:00
modified: 2023-11-01 09:32:00
tags:
  [
    "desenvolvimento-web",
    "design-patterns",
    "dependency injection",
    "angularjs",
  ]
slug: injecao-de-dependencia
thumbnail: ./images/angular-logo.png
---

Se você já teve contato com [_Laravel_](http://laravel.com/ "PHP framework for web artisans")
ou [_AngularJS_](https://angularjs.org/ "HTML enhanced for web apps"), sabe muito bem que
um dos maiores motivos de orgulho desses (e de tantos outros) _frameworks_
é a "Injeção de Dependência", ou do inglês, _Dependency Injection_.
Imagine-se em uma reunião, o seu _Product Owner_ pede soluções para problemas
complexos, e você manda logo um "precisamos usar injeções de dependências";
É aumento salarial na hora!

Brincadeiras à parte, estou fazendo um curso de
[_AngularJS_ no _Udemy_](https://www.udemy.com/learn-angularjs/ "Aprenda AngularJS"),
e toda vez que o professor se depara com uma palavra "pomposa", ele para a
aula para fazer um "big word alert".

Resolvi copiar essa ideia e mostrar como esse conceito na verdade é relativamente simples.

## Dependency Injection é um Design Pattern

Assim como [_Closures_](/2011/05/29/afinal-o-que-sao-closures.html "Leia mais sobre Closures")
e [_Decorators_](/2011/08/02/decorators-em-python.html "Leia mais sobre Decorators"),
o nome pode até causar certo calafrio. _Don't panic_! Segundo a documentação da _AngularJS_:

> Dependency Injection (DI) is a software design pattern that deals with how components
> get hold of their dependencies.

Ou seja, ao invés de permitir que o seu componente de _software_ manuseie dependências,
você explicitamente passará as dependências que ele necessita.

No _Stackoverflow_ temos o
[melhor exemplo da face da terra](http://stackoverflow.com/questions/130794/what-is-dependency-injection "What's dependency injection?")
para ilustrar uma injeção de dependência. Abaixo um código sem o _DI_:

```java
public SomeClass() {
    myObject = Factory.getObject();
}
```

Agora, com _DI_:

```java
public SomeClass(MyClass myObject) {
    this.myObject = myObject;
}
```

Simples, não?! As dependências do seu componente ficam explícitas, fáceis de gerenciar, e
seu código fica mais fácil de manter.

![Injenções podem te dar super poderes... Ou não. (hanhchampion.blogspot.com.br)](/media/dependency-injection-hulk.jpg "Injenções podem te dar super poderes... Ou não. (hanhchampion.blogspot.com.br)")

A _Angular_ utiliza esse conceito para que seja possível passar para o seu _controller_,
uma série de _services_ necessários para a resolução de um problema:

```javascript
var myApp = angular.module("myApp", []);

myApp.controller("mainController", [
  "$scope",
  "$log",
  function($scope, $log) {
    $scope.foo = "bar";
    $log.log($scope.foo);
  },
]);
```

Imagine o trabalhão que seria em todo _controller_ ter que instanciar o
serviço de `$scope` ou de `$log`?

## Considerações finais

Testar um código que utiliza _Dependency Injection_ é muito mais fácil, pois
[_mockar_](/2015/06/29/os-testes-e-os-dubles-parte-2.html "Os testes e os dublês - Parte 2")
as dependências e garantir o comportamente esperado pode ser feito com muito menos linhas de código.

Além disso, se o contrato de uma dependência mudar, com essa prática fica mais fácil de
alterar o seu código, fazendo com que a integração entre componentes seja mais _smooth_.

Se você ainda duvida desse _design pattern_, fica a constatação: É fácil
assegurar que a _AngularJS_ não seria o _framework_ que é hoje, sem o uso dessa prática.

Até a próxima.

## Referências

- _[AngularJS Developer Guide - Dependency Injection](https://docs.angularjs.org/guide/di "Leia mais na documentação da Angular")_
- _[Stackoverflow - What's dependency injection](http://stackoverflow.com/questions/130794/what-is-dependency-injection "Leia mais no Stackoverflow")_
