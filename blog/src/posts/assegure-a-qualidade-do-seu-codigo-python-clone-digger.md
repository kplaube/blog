---
title: "Assegure a qualidade do seu código Python - Clone Digger"
date: 2011-10-16 22:10:00
modified: 2023-11-08 15:41:00
category: desenvolvimento
tags: ["python", "qualidade", "linter", "clone-digger"]
slug: assegure-qualidade-seu-codigo-python-clone-digger
thumbnail: /media/ovelha-dolly.jpg
---

Mesmo que você possa verificar a qualidade do seu
código com [*pep8*][], [*Pylint*][] e [*Pyflakes*][], uma das virtudes
de um projeto de _software_ é não possuir código duplicado (leia mais
sobre [*DRY*][]). O fato é que tanto intencionalmente como
propositalmente, podemos duplicar um trecho de código e acabar
prejudicando manutenções futuras (atire a primeira pedra quem nunca deu
aquele `CTRL+C` e `CTRL+V`, e prometeu um _refactoring_ depois).

Para facilitar a busca por código duplicado, podemos utilizar uma
ferramenta chamada **_Clone Digger_**. Prático, rápido e muito simples.
Agora ficou fácil “caçar” código duplicado em projetos [*Python*][].

## Na prática

Por tratar-se de uma ferramenta bem objetiva, não há muito o que falar
sobre o [*Clone Digger*][]. Então, vamos direto para a parte prática.

Para iniciar a análise, basta chamar o executável apontando para o
diretório do seu projeto:

```text
clonedigger meuprojeto/
```

Será gerado um arquivo chamado `output.html`, com um relatório
detalhado ([como este][]). Serão apresentadas informações como a
quantidade de arquivos analisados, quantidade de “clones”, de linhas
duplicadas e um apontamento com os trechos de código que a ferramenta
concluiu como “clones” (não necessariamente iguais, mas semelhantes).

Particularmente, a ferramenta me ajuda bastante a determinar se certos
trechos de código não poderiam ser herdados por uma classe pai, ou
algumas rotinas costumeiras não poderiam ser encapsuladas em funções.

## Referências

- [_Clone Digger: Discovers duplicate code in Python and Java_][*clone digger*]
- [*Andrews Medina:* Análise de código em *Python*][]

Até a próxima.

[*pep8*]: /2011/08/26/assegure-qualidade-seu-codigo-python-pep.html "Assegure a qualidade do seu código Python – pep8"
[*pylint*]: /2011/09/06/assegura-a-qualidade-de-codigo-python-pylint.html "Assegure a qualidade do seu código Python – Pylint"
[*pyflakes*]: /2011/10/02/assegure-qualidade-seu-codigo-python-pyflakes.html "Assegure a qualidade do seu código Python – Pyflakes"
[*dry*]: http://pt.wikipedia.org/wiki/Don%27t_repeat_yourself "Leia mais sobre Don't Repeat Yourself no Wikipedia"
[*python*]: /tag/python.html "Leia mais sobre Python"
[*clone digger*]: http://clonedigger.sourceforge.net/index.html "Página oficial do projeto Clone Digger"
[como este]: http://clonedigger.sourceforge.net/examples/nltk_first_50.html "Exemplo de relatório do Clone Digger"
[*andrews medina:* análise de código em *python*]: http://www.andrewsmedina.com/2011/01/31/analise-de-codigo-em-python/ "Excelente post do Andrews Medina sobre ferramentas de análise de código em Python"
