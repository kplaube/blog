Title: Injeção de Dependência
Date: 2015-10-24 16:30:00
Category: desenvolvimento
Tags: desenvolvimento, design-pattern, dependency injection, angularjs
Slug: injecao-de-dependencia
meta_description: Se você já teve contato com Laravel ou AngularJS, sabe muito bem que um dos maiores motivos de orgulho desses frameworks é a Injeção de Dependência. Embora o termo possa assustar, esse conceito na verdade é relativamente simples de entender.


{% img align-left /images/blog/angular-logo.png 180 180 Logotipo do AngularJS (titanui.com) %}

Se você já teve contato com [*Laravel*](http://laravel.com/ "PHP framework for web artisans")
ou [*AngularJS*](https://angularjs.org/ "HTML enhanced for web apps"), sabe muito bem que
um dos maiores motivos de orgulho desses (e de tantos outros) *frameworks*
é a "Injeção de Dependência", ou do inglês, *Dependency Injection*.
Imagine-se em uma reunião, o seu *Product Owner* pede soluções para problemas
complexos, e você manda logo um "precisamos usar injeções de dependências"...
É aumento salarial na hora!

<!-- PELICAN_END_SUMMARY -->

Brincadeiras à parte, estou fazendo um curso de
[*AngularJS* no *Udemy*](https://www.udemy.com/learn-angularjs/ "Aprenda AngularJS"),
e toda vez que o professor se depara com uma palavra "pomposa", ele para a
aula para fazer um "big word alert".

Resolvi copiar essa ideia e mostrar como esse conceito na verdade é relativamente simples.


## Dependency Injection é um Design Pattern

Assim como [*Closures*]({filename}/afinal-o-que-sao-closures.md "Leia mais sobre Closures")
e [*Decorators*]({filename}/decorators-em-python.md "Leia mais sobre Decorators"),
o nome pode até causar certo calafrio... *Don't panic*! Segundo a documentação da *AngularJS*:

> Dependency Injection (DI) is a software design pattern that deals with how components
> get hold of their dependencies.

Ou seja, ao invés de permitir que o seu componente de *software* manuseie dependências,
você explicitamente passará as dependências que ele necessita.

No *Stackoverflow* temos o
[melhor exemplo da face da terra](http://stackoverflow.com/questions/130794/what-is-dependency-injection "What's dependency injection?")
para ilustrar uma injeção de dependência. Abaixo um código sem o *DI*:

    ::java
    public SomeClass() {
        myObject = Factory.getObject();
    }

Agora, com *DI*:

    ::java
    public SomeClass(MyClass myObject) {
        this.myObject = myObject;
    }

Simples, não?! As dependências do seu componente ficam explícitas, fáceis de gerenciar, e
seu código fica mais fácil de manter.

{% img align-center /images/blog/dependency-injection-hulk.jpg 600 333 Injenções podem te dar super poderes... Ou não. (hanhchampion.blogspot.com.br) %}

A *Angular* utiliza esse conceito para que seja possível passar para o seu *controller*,
uma série de *services* necessários para a resolução de um problema:

    ::javascript
    var myApp = angular.module('myApp', []);

    myApp.controller('mainController', ['$scope', '$log', function($scope, $log) {

        $scope.foo = 'bar';
        $log.log($scope.foo);

    }]);

Imagine o trabalhão que seria em todo *controller* ter que instanciar o
serviço de `$scope` ou de `$log`?


## Considerações finais

**Testar um código** que utiliza *Dependency Injection* é **muito mais fácil**, pois
[*mockar*]({filename}/os-testes-e-os-dubles-parte-2.md "Os testes e os dublês - Parte 2")
as dependências e garantir o comportamente esperado pode ser feito com muito menos linhas de código.

Além disso, se o contrato de uma dependência mudar, com essa prática fica mais fácil de
alterar o seu código, fazendo com que a integração entre componentes seja mais *smooth*.

Se você ainda duvida desse *design pattern*, fica a constatação: É fácil
assegurar que a *AngularJS* não seria o *framework* que é hoje, sem o uso dessa prática.

Até a próxima.

## Referências

* *[AngularJS Developer Guide - Dependency Injection](https://docs.angularjs.org/guide/di "Leia mais na documentação da Angular")*
* *[Stackoverflow - What's dependency injection](http://stackoverflow.com/questions/130794/what-is-dependency-injection "Leia mais no Stackoverflow")*
