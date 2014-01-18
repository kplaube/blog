Title: Assegure a qualidade do seu código Python - Clone Digger
Date: 2011-10-16 22:10:00
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, qualidade, clone-digger
Slug: assegure-qualidade-seu-codigo-python-clone-digger


|img "/images/blog/ovelha-dolly.jpg" 180 180 "Código clonado?" "align-left"|
Mesmo que você possa verificar a qualidade do seu
código com [*pep8*][], [*Pylint*][] e [*Pyflakes*][], uma das virtudes
de um projeto de *software* é não possuir código duplicado (leia mais
sobre [*DRY*][]). O fato é que tanto intencionalmente como
propositalmente, podemos duplicar um trecho de código e acabar
prejudicando manutenções futuras (atire a primeira pedra quem nunca deu
aquele **CTRL+C** e **CTRL+V**, e prometeu um *refactoring* depois).

<!-- PELICAN_END_SUMMARY -->

Para facilitar a busca por código duplicado, podemos utilizar uma
ferramenta chamada ***Clone Digger***. Prático, rápido e muito simples.
Agora ficou fácil “caçar” código duplicado em projetos [*Python*][].


Na prática
----------

Por tratar-se de uma ferramenta bem objetiva, não há muito o que falar
sobre o [*Clone Digger*][]. Então, vamos direto para a parte prática.

Para iniciar a análise, basta chamar o executável apontando para o
diretório do seu projeto:

    ::bash
    $ clonedigger meuprojeto/

Será gerado um arquivo chamado **output.html**, com um relatório
detalhado ([como este][]). Serão apresentadas informações como a
quantidade de arquivos analisados, quantidade de “clones”, de linhas
duplicadas e um apontamento com os trechos de código que a ferramenta
concluiu como “clones” (não necessariamente iguais, mas semelhantes).

Particularmente, a ferramenta me ajuda bastante a determinar se certos
trechos de código não poderiam ser herdados por uma classe pai, ou
algumas rotinas costumeiras não poderiam ser encapsuladas em funções.


Referências
-----------

* [*Clone Digger: Discovers duplicate code in Python and Java*][*Clone Digger*]
* [*Andrews Medina:* Análise de código em *Python*][]

Até a próxima…


  [*pep8*]: {filename}/04-assegure-a-qualidade-do-seu-codigo-python-pep8.md
    "Assegure a qualidade do seu código Python – pep8"
  [*Pylint*]: {filename}/05-assegure-a-qualidade-do-seu-codigo-python-pylint.md
    "Assegure a qualidade do seu código Python – Pylint"
  [*Pyflakes*]: {filename}/06-assegure-a-qualidade-do-seu-codigo-python-pyflakes.md
    "Assegure a qualidade do seu código Python – Pyflakes"
  [*DRY*]: http://pt.wikipedia.org/wiki/Don%27t_repeat_yourself
    "Leia mais sobre Don't Repeat Yourself no Wikipedia"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*Clone Digger*]: http://clonedigger.sourceforge.net/index.html
    "Página oficial do projeto Clone Digger"
  [como este]: http://clonedigger.sourceforge.net/examples/nltk_first_50.html
    "Exemplo de relatório do Clone Digger"
  [*Andrews Medina:* Análise de código em *Python*]: http://www.andrewsmedina.com/2011/01/31/analise-de-codigo-em-python/
    "Excelente post do Andrews Medina sobre ferramentas de análise de código em Python"
