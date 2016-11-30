title: Construindo APIs em Django com Restless
Date: 2016-11-28 22:00:00
Category: desenvolvimento
Tags: desenvolvimento, web, apis, python, django, restless

{% img align-left /images/blog/rest-api-logo.png 180 180 API Rest %}

Construir um *API* [*REST*]({tag}rest "Leia mais sobre REST") em
[*Django*]({tag}django "Leia mais sobre Django") nos dias atuais é uma
tarefa no máximo corriqueira. Com a ajuda de bibliotecas consagradas, como
[*Django REST Framework*](http://www.django-rest-framework.org/) ou
[*Tastypie*](https://django-tastypie.readthedocs.io/en/latest/),
e utilizando toda a abstração que envolve os *Models* do *framework*, é
possível ter *endpoints* respondendo em questão de minutos.

<!-- PELICAN_END_SUMMARY -->

Mas existem alternativas que são capazes de tornar esse processo ainda
mais fácil, e com uma curva de aprendizado um pouquinho menor. Nesse
grupo, uma biblioteca que me agrada (e muito) é o [*Restless*](https://github.com/toastdriven/restless).

## Por que Restless (e não as outras)?

[*Daniel Lindsley*](https://github.com/toastdriven) (também conhecido como *Toast Driven*),
um dos criadores do *Tastypie* (famosa biblioteca *Django* para construção de *APIs RESTful*,
mas que veio perdendo força nos últimos tempos), também é criador do *Restless*. Segundo ele,
o que o motivou a escrever uma alternativa ao *Tastypie*, foi:

> Quite simply, I care about creating flexible & RESTFul APIs. In building Tastypie, I tried
> to create something extremely complete & comprehensive. The result was writing a lot of hook
> methods (for easy extensibility) & a lot of (perceived) bloat, as I tried to accommodate for
> everything people might want/need in a flexible/overridable manner.

Não há dúvidas que as duas bibliotecas citadas no início desse artigo são extremamente completas.
Se você estiver procurando um *engine* poderoso para a criação de *APIs* em *Django*, pule logo
para a [documentação do *Django REST Framework*](http://www.django-rest-framework.org/tutorial/quickstart/ "Comece agora com o REST Framework").

Mas nem sempre precisamos de todo esse poderio para dar vida ao nosso projeto. E é exatamente
com esse posicionamento que *Daniel* fecha o seu argumento:

> But in reality, all I really ever personally want are the RESTful verbs, JSON serialization &
> the ability of override behavior.

Se assim como o autor você só precisa dos verbos *HTTP*, serialização *JSON* e uma leve camada
de customização, talvez o *Restless* seja tudo o que você precisa.

Por último mas não menos importante: O *Restless* funciona com *Django*, *Flask*, *Pyramid* e *Tornado*.
Vamos focar em como as coisas funcionam utilizando *Django*.

## Mas afinal, é RESTFul ou não?
