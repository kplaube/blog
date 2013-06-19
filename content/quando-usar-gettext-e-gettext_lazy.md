Title: Quando usar gettext e gettext_lazy?
Date: 2011-06-01 09:41:00
Category: desenvolvimento
Tags: desenvolvimento, python, django, i18n
Slug: quando-usar-gettext-gettext_lazy


|img "/images/blog/python-logo.png" 180 180 "Logotipo do Python" "align-left"|
Olá pessoas!

Para vocês que desenvolvem em [*Python*][] e [*Django*][] preocupando-se
com internacionalização, já devem ter feito a seguinte pergunta: Quando
usar **gettext** e **gettext\_lazy**?

Acredito que antes de responder esta pergunta, temos que responder outra
questão pertinente: Devo utilizar **gettext** ou **ugettext**?

<!-- PELICAN_END_SUMMARY -->


gettext vs ugettext
-------------------

Essas duas funções seguem o mesmo princípio dos métodos mágicos
**\_\_str\_\_** e **\_\_unicode\_\_**. Onde **gettext** retornará um texto traduzido
como uma *string* “comum”, e **ugettext** retornará um texto traduzido
como uma *string* *Unicode*.

Como nosso idioma nativo abusa do uso de caracteres especiais, aconselho
sempre que possível a utilização do **ugettext**. Na verdade, é uma
forma de garantir sucesso na tradução de qualquer idioma sem quebrar a
cabeça com *encoding* (já que o *Unicode* tem uma ampla tabela de
caracteres).

Além disso, passe a mensagem como *Unicode* para a função sempre que
necessário:

> texto_traduzido = ugettext(u'Descrição do produto em estoque')


ugettext vs ugettext\_lazy
--------------------------

A principal diferença entre **ugettext** e **ugettext\_lazy** é que o
último é literalmente um preguiçoso. Ele faz uma referência para a
*string* (e não necessariamente para a tradução), fazendo com que a
operação seja executada apenas quando a renderização da *string* é
necessária (ao contrário de **ugettext** que é processado assim que a
expressão é interpretada).

Confuso? Talvez o [*Marinho Brandão*][] possa ser mais claro:

> A função “**ugettext\_lazy()**“ é **preguiçosa**. Isso significa que a
> tradução é feita somente quando ela é requisitada, o que é  
> relativamente melhor para o caso de classes de modelo, pois elas  
> são constantemente utilizadas sem que a tradução de um termo seja  
> necessário de fato.
>
> Por outro lado a função “**ugettext()**“ traduz a string  
> **instantaneamente**, o que é melhor para casos como o de formulários  
> dinâmicos e views, pois eles não são usados de maneira tão constante  
> quanto classes de modelo.

Então… utilize **ugettext\_lazy** nos campos e meta-informações dos
modelos (onde a tradução pode ser feita sob demanda), e **ugettext** em
métodos, funções e views (onde a tradução tem quer ser “instantânea”).


Referências
-----------

* [*Python Documentation – gettext*][]
* [*Django Documentation – Internationalization*][]
* [*The Django Book – Internationalization*][]
* [Aprendendo *Django* no Planeta Terra – O mesmo *site* em vários idiomas][]

Até a próxima…


  [*Python*]: |filename|/tag/python.html
    "Leia mais sobre Python"
  [*Django*]: |filename|/tag/django.html
    "Leia mais sobre Django"
  [*Marinho Brandão*]: http://www.aprendendodjango.com/o-mesmo-site-em-varios-idiomas/
    "Aprendendo Django no Planeta Terra - O mesmo site em vários idiomas"
  [*Python Documentation – gettext*]: http://docs.python.org/library/gettext.html
    "gettext - Multilingual internationalization services"
  [*Django Documentation – Internationalization*]: https://docs.djangoproject.com/en/dev/topics/i18n/internationalization/#lazy-translation
    "Django Docs - Lazy Translation"
  [*The Django Book – Internationalization*]: http://www.djangobook.com/en/1.0/chapter18/
    "The Django Book - i18n"
  [Aprendendo *Django* no Planeta Terra – O mesmo *site* em vários idiomas]: http://www.aprendendodjango.com/o-mesmo-site-em-varios-idiomas/
    "Aprendendo Django - O mesmo site em vários idiomas"
