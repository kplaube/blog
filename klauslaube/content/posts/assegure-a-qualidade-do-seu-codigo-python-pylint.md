---
title: "Assegure a qualidade do seu código Python - Pylint"
date: 2011-09-06 17:48:00
category: desenvolvimento
tags: ["python", "pylint", "linter", "qualidade"]
slug: assegura-a-qualidade-de-codigo-python-pylint
thumbnail: /images/code-quality.png
---

Se você precisa de uma ferramenta mais poderosa que o [*pep8*][], talvez você
precise do _Pylint_.

De forma (bem) resumida, o _Pylint_ analisa de forma minuciosa o código
do seu projeto [*Python*][], lhe retornando uma variedade de relatórios
(as vezes, detalhistas até demais) sobre todo o tipo de problema que ele
encontra. Indo de incoerências com a _PEP 8_, até nome de variáveis.

É sem dúvida, uma das melhores ferramentas feitas para o _Python_, e é
essencial para você deixar o seu código mais próximo do “estado da
arte”.

Mas o que eu achei mais legal sobre o _Pylint_, foi um comentário em sua
documentação. O [autor salienta][] muito bem que a ferramenta pode ser
eficiente em certos contextos, mas não em todos. Então, antes de
“pularmos de cabeça”, peço que você utilize o bom senso e saiba mensurar
as suas necessidades em relação ao que a ferramenta tem a oferecer.

## Na prática

Vamos testar as conformidades do arquivo `site.py` segundo o _Pylint_:

```text
$ pylint /usr/lib/python2.7/dist-packages/site.py
```

O resultado pode parecer assustador. Então “vamos começar pelo começo”.

O resultado do _Pylint_ é dividido em duas grandes seções: **análise de
código** e **relatório**; O primeiro, como o nome sugere, apresenta uma
análise de código bem semelhante a apresentada pelo _pep8_. Porém no
seguinte formato:

```text
MESSAGE_TYPE: LINE_NUM:[OBJECT:] MESSAGE
```

Vamos pegar a primeira linha gerada pelo _Pylint_ para entender melhor:

```text
C:  1: Missing docstring
```

**C** é o tipo da mensagem, **1** é o número da linha (no arquivo) onde
o problema foi constatado, **Missing docstring** é a mensagem gerada. O
_Pylint_ poderá apresentar os seguintes tipos de mensagens:

```text
[R]efactor for a "good practice" metric violation
[C]onvention for coding standard violation
[W]arning for stylistic problems, or minor programming issues
[E]rror for important programming issues (i.e. most probably bug)
[F]atal for errors which prevented further processing
```

Quase posso ver o brilho em seus olhos. A saída do _Pylint_ deixou de
ser enigmática, não?!

A segunda seção, a de relatório, apresentará alguns números
interessantes sobre o seu projeto. Como o número de _warnings_ e
_errors_, uma nota para o seu projeto (e um comparativo com a execução
anterior do _Pylint_), quantidade de código duplicado, quantidade de
código documentado e “desenhará” uma árvore de dependências do seu
projeto.

## Diminuindo o ruído

Eu avisei que o _Pylint_ era “barulhento”!

Vamos reduzir um pouco o nível de detalhes da ferramenta, passando
alguns parâmetros:

```text
$ pylint /usr/lib/python2.7/dist-packages/site.py --reports=n --include-ids=y --disable=W0232
```

Primeiro, com o parâmetro **–-reports=n** dizemos que não queremos
aquele relatório gigantesco no final da análise. O **–-include-ids=y**
exibe para gente os _ids_ das mensagens de erros do _Pylint_. É útil,
pois todas as mensagens que você julgar desnecessárias para a análise
você adiciona no parâmetro **-–disable** (separadas por vírgula).

Para que não seja necessário passar todos esses parâmetros todas as
vezes que executar o _Pylint_ basta gerar um arquivo **.pylintrc**:

```text
$ pylint --reports=n --include-ids=y --disable=W0232 --generate-rcfile > ~/.pylintrc
```

É possível gerar este arquivo por projeto, podendo mudar a
especificidade das métricas de acordo com a necessidade. Quer saber
mais? [Leia este tutorial muito bom][], direto da documentação do
_Pylint_.

Para entender os códigos das mensagens, [confira a listagem nesta *wiki*][],
ou utilize o parâmetro **-–help-msg**:

```text
$ pylint --help-msg=R0904:

R0904: \*Too many public methods (%s/%s)\*
Used when class has too many public methods, try to reduce this to get a more
simple (and so easier to use) class. This message belongs to the design checker.
```

## Referências

- [*Pylint: analyzes Python source code looking for bugs and signs of poor quality*][]
- [*Logilab.org: Pylint User Manual*][]
- [*Logilab.org: Pylint Tutorial*][]
- [*TurboGears Documentation: Using Pylint to improve the quality of your code*][]

Até a próxima…

[*pep8*]: /2011/08/26/assegure-qualidade-seu-codigo-python-pep.html "Assegure a qualidade do seu código Python – pep8"
[*python*]: /tag/python.html "Leia mais sobre Python"
[autor salienta]: http://www.logilab.org/card/pylint_manual#what-is-pylint "O que é o pylint?"
[leia este tutorial muito bom]: http://www.logilab.org/card/pylint_tutorial "Pylint tutorial"
[confira a listagem nesta *wiki*]: http://pylint-messages.wikidot.com/all-codes "Todos os códigos retornados pelo Pylint"
[*pylint: analyzes python source code looking for bugs and signs of poor quality*]: http://www.logilab.org/857 "Obtenha o Pylint gratuitamente"
[*logilab.org: pylint user manual*]: http://www.logilab.org/card/pylint_manual "Leia o manual oficial do Pylint"
[*logilab.org: pylint tutorial*]: http://www.logilab.org/card/pylint_tutorial "Leia agora mesmo este excelente tutorial sobre Pylint"
[*turbogears documentation: using pylint to improve the quality of your code*]: http://turbogears.org/1.0/docs/UsingPylint.html "Leia as recomendações de uso do Pylint com TurboGears"
