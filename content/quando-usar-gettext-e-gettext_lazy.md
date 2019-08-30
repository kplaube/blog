Title: Quando usar gettext e gettext_lazy?
Date: 2011-06-01 09:41:00
Category: desenvolvimento
Tags: desenvolvimento, python, django, i18n
Slug: quando-usar-gettext-gettext_lazy
meta_description: O que devo utilizar? gettext ou ugettext? Aprenda neste tutorial quando o onde utilizar a internacionalização do Django.
Image: /images/blog/python-logo.png
Alt: Logotipo do Python %}

Para vocês que desenvolvem em [*Python*][] e [*Django*][] preocupando-se
com internacionalização, já devem ter feito a seguinte pergunta: Quando
usar `gettext` e `gettext_lazy`?

<!-- PELICAN_END_SUMMARY -->

Acredito que antes de responder esta pergunta, temos que responder outra
questão pertinente: Devo utilizar `gettext` ou `ugettext`?

## gettext vs ugettext

Essas duas funções seguem o mesmo princípio dos métodos mágicos
`__str__` e `__unicode__`. Onde `gettext` retornará um texto traduzido
como uma _string_ “comum”, e `ugettext` retornará um texto traduzido
como uma _string_ _Unicode_.

Como nosso idioma nativo abusa do uso de caracteres especiais, aconselho
sempre que possível a utilização do `ugettext`. Na verdade, é uma
forma de garantir sucesso na tradução de qualquer idioma sem quebrar a
cabeça com _encoding_ (já que o _Unicode_ tem uma ampla tabela de
caracteres).

Além disso, passe a mensagem como _Unicode_ para a função sempre que
necessário:

    ::python
    texto_traduzido = ugettext(u'Descrição do produto em estoque')

## ugettext vs ugettext_lazy

A principal diferença entre `ugettext` e `ugettext_lazy` é que o
último é literalmente um preguiçoso. Ele faz uma referência para a
_string_ (e não necessariamente para a tradução), fazendo com que a
operação seja executada apenas quando a renderização da _string_ é
necessária (ao contrário de `ugettext` que é processado assim que a
expressão é interpretada).

Confuso? Talvez o [_Marinho Brandão_][] possa ser mais claro:

> A função “**ugettext_lazy()**“ é **preguiçosa**. Isso significa que a
> tradução é feita somente quando ela é requisitada, o que é  
> relativamente melhor para o caso de classes de modelo, pois elas  
> são constantemente utilizadas sem que a tradução de um termo seja  
> necessário de fato.
>
> Por outro lado a função “**ugettext()**“ traduz a string  
> **instantaneamente**, o que é melhor para casos como o de formulários  
> dinâmicos e views, pois eles não são usados de maneira tão constante  
> quanto classes de modelo.

Então… utilize `ugettext_lazy` nos campos e meta-informações dos
modelos (onde a tradução pode ser feita sob demanda), e `ugettext` em
métodos, funções e views (onde a tradução tem quer ser “instantânea”).

## Referências

- [*Python Documentation – gettext*][]
- [*Django Documentation – Internationalization*][]
- [*The Django Book – Internationalization*][]
- [Aprendendo *Django* no Planeta Terra – O mesmo *site* em vários idiomas][]

Até a próxima…

[*python*]: {tag}python "Leia mais sobre Python"
[*django*]: {tag}django "Leia mais sobre Django"
[_marinho brandão_]: http://www.aprendendodjango.com/o-mesmo-site-em-varios-idiomas/ "Aprendendo Django no Planeta Terra - O mesmo site em vários idiomas"
[*python documentation – gettext*]: http://docs.python.org/library/gettext.html "gettext - Multilingual internationalization services"
[*django documentation – internationalization*]: https://docs.djangoproject.com/en/dev/topics/i18n/internationalization/#lazy-translation "Django Docs - Lazy Translation"
[*the django book – internationalization*]: http://www.djangobook.com/en/1.0/chapter18/ "The Django Book - i18n"
[aprendendo *django* no planeta terra – o mesmo *site* em vários idiomas]: http://www.aprendendodjango.com/o-mesmo-site-em-varios-idiomas/ "Aprendendo Django - O mesmo site em vários idiomas"
