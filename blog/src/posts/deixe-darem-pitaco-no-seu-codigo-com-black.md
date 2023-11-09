---
title: "Deixe darem pitaco no seu código com Black"
date: 2019-02-07 14:20:00
modified: 2023-11-09 21:47:00
tags: ["formatters", "editores", "black", "python", "vscode", "vim"]
slug: deixe-darem-pitaco-no-seu-codigo-com-black
thumbnail: ./images/black-logo.png
---

Já abordamos [_code formatters_](/tag/formatters.html "Leia mais sobre formatters") aqui no _blog_. Para [_Javascript_](/tag/javascript.html "Leia mais sobre Javascript") temos o [_Prettier_](/2019/01/12/deixe-darem-pitaco-no-seu-codigo-com-prettier.html "Deixe darem pitaco no seu código com Prettier") como solução mais famosa, e há de se reconhecer a série de vantagens no uso da mesma. Acontece que para [_Python_](/tag/python.html "Leia mais sobre Python") temos algumas ferramentas tão interessantes quanto, como o _autopep8_, _yapf_ e o _Black_.

E é sobre o último que falaremos nesse _post_.

Se você está interessado em um comparativo, _Kevin Peters_ escreveu um artigo bem interessante para o _Medium_ chamado ["Auto formatters for Python"](https://medium.com/3yourmind/auto-formatters-for-python-8925065f9505 "Leia o artigo na íntegra").

## Além do PEP 8

A motivação para usar o _Black_ é a mesma descrita no _post_ sobre _Prettier_: Reduzir tempo discutindo _code style_, e deixar com que uma ferramenta tome essa decisão pelo time.

Em _Python_, o caminho para chegarmos a um consenso é relativamente menor. Uma das primeiras coisas que aprendi ao iniciar a minha jornada programando com a linguagem foi seguir a [_PEP 8_](https://www.python.org/dev/peps/pep-0008/ "Style Guide for Python Code") religiosamente. Nela estão descritas as convenções de código adotadas oficialmente, como linhas em branco, indentação, nomes, comentários, etc. Qual o motivo de perder tempo pensando em um _style guide_ para o seu projeto se isso já foi discutido e formalizado pela comunidade?

Ferramentas de _linting_ como [_pycodestyle_](https://github.com/PyCQA/pycodestyle "Simple Python style checker in one Python file") e [_flake8_](https://github.com/PyCQA/flake8 "Flake8 is a wrapper around PyFlakes, pycodestyle and McCabe") são essenciais e muito comuns. São elas que irão te alertar sobre possíveis quebras de estilo de código.

Mas com o _Black_ vamos além.

## Formatador descompromissado

O _Black_ é um _code formatter_ para _Python_, de código aberto ([_MIT_](https://github.com/ambv/black/blob/master/LICENSE "The MIT License")), que tem por lema tornar a formatação "transparente", para que você possa focar no conteúdo.

O time do _Black_ alega que a ferramenta é "descompromissada", mas nem por isso ela deixa de ser pretensiosa. Diretamente do [repositório no _Github_](https://github.com/ambv/black/ "Black no Github"):

> By using it, you agree to cede control over minutiae of hand-formatting. In return, Black gives you speed, determinism, and freedom from pycodestyle nagging about formatting. You will save time and mental energy for more important matters.

Em outras palavras, a ferramenta segue as recomendações da _PEP 8_ e formata seu código automaticamente. Na verdade, o _coding style_ utilizado é um _subset_ da _PEP 8_, logo, algumas regras são "manipuladas" (como [_line-length_](https://github.com/ambv/black#line-length "Leia na documentação do Black") e [aspas ao invés de apóstrofos](https://github.com/ambv/black#strings "Leia na documentação do Black")) de acordo com decisões tomadas pelo time de desenvolvedores da ferramenta.

![Foto do filme A Vida Secreta de Walter Mitty](/media/black-walter.jpg "Pare de perder tempo discutindo convenção de código no code review e vá viver sua vida, como o Walter fez (gq.co.za)")

Caso você não concorde com algumas liberdades que a ferramenta toma, é possível customizar algumas regras adotadas pelo editor. Por exemplo, se você é um usuário assíduo de _single quotes_ e não concorda com o uso de _double quotes_, pode executar o utilitário com o argumento `--skip-string-normalization`. Na humilde opinião de quem vos escreve, se você se pegar usando o _Black_ com muitas exceções, talvez valha a pena procurar outra ferramenta de _formatting_, como os próprios desenvolvedores sugerem:

> Pro-tip: If you're asking yourself "Do I need to configure anything?" the answer is "No". Black is all about sensible defaults.

## No terminal

Mas chega de papo, vamos ao que interessa:

```text
pip install black
```

Como qualquer biblioteca _Python_, instalamos o _Black_ através do utilitário `pip`. Na sequência, basta executá-lo apontando qual arquivo você pretende formatar.

```text
$ black test.py
reformatted test.py
All done! ✨ 🍰 ✨
1 file reformatted.
```

Também é possível passar um diretório como argumento:

```text
$ black plugins/
reformatted /Users/klaus/Workspace/blog/plugins/global_license.py
reformatted /Users/klaus/Workspace/blog/plugins/slideshare.py
All done! ✨ 🍰 ✨
2 files reformatted, 4 files left unchanged.
```

Não estranhe se a simpática fatia de bolo acima abrir o seu apetite.

Customizações, embora possam ser chamadas através de parâmetros de linha de comando, também podem ser armazenadas no `pyproject.toml` do seu projeto, como ilustra a [documentação oficial](https://github.com/ambv/black#pyprojecttoml "Leia mais na documentação do Black").

## No editor

Mas o melhor mesmo é ter o _Black_ disponível no seu editor, deixando-o trabalhar em tempo de escrita de código.

Há uma vasta opção de [editores que suportam o _Black_](https://github.com/ambv/black#editor-integration "Editor integration"). Para o [_Vim_](/tag/vim.html "Leia mais sobre o Vim"), continuo com a opinião do artigo ["Vim para desenvolvimento Python"](/2017/10/15/vim-para-desenvolvimento-python.html "Leia o artigo na íntegra") e recomendo a utilização do [_ALE_](https://github.com/w0rp/ale "Asynchronous Lint Engine for Vim"):

```vim
" ~/.vimrc

Plug 'w0rp/ale', { 'do': 'pip install black' }
call plug#end()

let g:ale_fix_on_save = 1
let g:ale_fixers = {
\   'python': [
\       'black',
\       'remove_trailing_lines',
\       'trim_whitespace'
\   ]
\}
```

Já para o [_VS Code_](/tag/vscode.html "Leia mais sobre VS Code"), com o [_plugin_ oficial para _Python_](https://marketplace.visualstudio.com/items?itemName=ms-python.python "Python extension for Visual Studio Code"), podemos configurá-lo como ferramenta de _formatting_:

```json
{
  "python.formatting.blackPath": "black",
  "python.formatting.provider": "black"
}
```

## Em todo lugar

Outra opção que deveria ser adotada, independente da utilização do _Black_ no editor, é o uso de _commit hooks_ para formatar arquivos alterados controlados via _git_. Volto a recomendar o [_pre-commit_](https://pre-commit.com/ "A framework for managing and maintaining multi-language pre-commit hooks") como ferramenta, e a boa notícia é que existe um _hook_ com _Black_ configurado e prontinho para uso:

```yaml
repos:
- repo: https://github.com/ambv/black
rev: stable
hooks:
- id: black
    language_version: python3.7
```

## Considerações finais

É impressionante a quantidade de tempo e atrito que economizamos quando adotamos uma ferramenta como _Black_ ou _yapf_. Discussões relacionadas a _style guide_ praticamente inexistem, e os _code reviews_ são mais focados no problema e na qualidade do código, do que com convenções.

Já tive experiências ruins com _formatters_ em _Python_, é verdade. Nem todo time ou projeto se adapta bem com esse tipo de "ferramenta impositiva", e embora os pontos positivos sejam óbvios, é na prática que você verá os negativos. Mas não me vejo mais deixando de ter esse tipo de auxílio enquanto escrevo código.

É também uma forma de pensarmos na experiência dos outros desenvolvedores, que se juntarão ao projeto durante o seu ciclo de vida.

Até a próxima.

## Referências

- [Black - The uncompromising code formatter](https://black.readthedocs.io/en/stable/)
- [Matt Leyman - Consistent Python code with Black](https://www.mattlayman.com/blog/2018/python-code-black/)
- [Visual Studio Code - Editing Python code in VS Code](https://code.visualstudio.com/docs/python/editing#_formatting)
