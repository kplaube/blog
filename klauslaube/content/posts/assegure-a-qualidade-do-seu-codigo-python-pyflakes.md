---
title: "Assegure a qualidade do seu código Python - Pyflakes"
date: 2011-10-02 17:58:00
category: desenvolvimento
tags: ["python", "pyflakes", "linter", "qualidade"]
slug: assegure-qualidade-seu-codigo-python-pyflakes
thumbnail: /images/software-quality.jpg
---

Depois da dar uma pincelada na [*pep8*][] e no [*Pylint*][], chegou a hora de
falarmos um pouco sobre o **_Pyflakes_**.

Resumidamente, o [*Pyflakes*][] é uma ferramenta de qualidade que
analisa o seu código [*Python*][] atrás de erros (de sintaxe e
importação, por exemplo), retornando um relatório muito objetivo com o
arquivo, linha e o tipo de incoerência que ele encontrou.

Uma excelente ferramenta para você ter “plugada” ao seu editor favorito.

## O que o Pyflakes faz que o Pylint não faz?

As comparações, acredito, serão inevitáveis. Afinal, o que o _Pyflakes_
faz que o _Pylint_ não faz? A resposta que você encontrará é muito
simples: O **_Pyflakes_ não analisa a “beleza”** do seu **código**. Ou
seja, ele apenas **verifica erros de lógica e de sintaxe**, não de
convenções de código.

Isso faz do _Pyflakes_ o parceiro ideal do seu editor de código
favorito. Por ser objetivo, favorece a análise e traz resultados
interessantes, por exemplo, apontando variáveis criadas que nunca foram
usadas, ou métodos importados que nunca foram chamados no escopo de um
módulo _Python_.

Logo, ter as duas ferramentas à mão é uma excelente pedida para
incrementar ainda mais o seu ambiente de desenvolvimento.

## Na prática

Vamos analisar o código de um projeto da faculdade que eu fiz, chamado
[*Social portal for soccer players*][] (encontra-se aberto no
_BitBucket_):

```text
$ pyflakes apps/notificate/views.py
```

A resposta é muito clara. Existem classes sendo importadas, mas que não
estão sendo usadas:

```text
apps/notificate/views.py:3: 'EmptyPage' imported but unused
apps/notificate/views.py:3: 'InvalidPage' imported but unused
```

O funcionamento básico do _Pyflakes_ é esse… simples como as melhores
coisas devem ser!

## Pyflakes + Vim

Se assim como eu, você tem um “tropeço” pelo [*vim*][], você não pode
deixar passar esse bom _plugin_ chamado [*pyflakes.vim*][].

Para instalá-lo, basta seguir o guia de instalação contido no arquivo
**README** ([leia diretamente do *GitHub*][]). Para que o _plugin_
funcione corretamente, o seu _vim_ deve ter suporte a _Python_ (se não
tiver, basta compilá-lo com o parâmetro **-–enable-pythoninterp**).

Uma vez instalado, quando estiver editando um código _Python_, basta
utilizar o comando **:cc** para navegar entre os erros encontrados pelo
_plugin_.

## Referências

- [*Pyflakes in Launchpad*][]
- [*pyflakes.vim: check Python code on the fly*][]

Até a próxima…

[*pep8*]: /2011/08/26/assegure-qualidade-seu-codigo-python-pep.html "Assegura a qualidade do seu código Python com a pep8"
[*pylint*]: /2011/09/06/assegura-a-qualidade-de-codigo-python-pylint.html "Assegure a qualidade do seu código Python com o Pylint"
[*pyflakes*]: https://launchpad.net/pyflakes "Pyflakes no Launchpad"
[*python*]: /tag/python.html "Leia mais sobre Python"
[*social portal for soccer players*]: https://bitbucket.org/kplaube/social-portal-for-soccer-players/overview "Visite o repositório do projeto no BitBucket"
[*vim*]: http://www.vim.org/ "Página oficial do Vi Improved"
[*pyflakes.vim*]: http://symbolsystem.com/pyflakes-vim/ "pyflakes.vim - Verifique o seu código em tempo real"
[leia diretamente do *github*]: https://github.com/kevinw/pyflakes-vim#readme "README do pyflakes.vim no GitHub"
[*pyflakes in launchpad*]: https://launchpad.net/pyflakes "Faça download agora mesmo do Pyflakes"
[*pyflakes.vim: check python code on the fly*]: http://symbolsystem.com/pyflakes-vim/ "Utilize o Pyflakes em seu VIM"
