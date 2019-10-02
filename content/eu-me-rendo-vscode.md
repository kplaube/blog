Title: Eu me rendo: VS Code
Date: 2018-06-04 16:30:00
Category: desenvolvimento
Tags: desenvolvimento, web, editores, ide, vscode, vim, python, css, javascript
Slug: eu-me-rendo-vscode
meta_description: Chegou o momento de admitir: Estou usando um editor diferente do Vim. Nesse artigo descrevo as principais virtudes do VS Code, e a razão de simpatizar tanto com esse poderoso editor.
Image: /images/blog/vscode-logo.png
Alt: Logo do VS Code

É, caro leitor... chegou o dia de admitir que tenho usado outro editor
além do [_Vim_]({tag}vim "Leia mais sobre o melhor editor do universo"). Pode
me julgar, me chamar de "poser" ou de "vendido", mas acontece que tenho descoberto no
[_VS Code_](https://code.visualstudio.com/ "Conheça o VS Code"), da _Microsoft_,
uma excelente ferramenta para desenvolvimento [_web_]({tag}web "Leia mais sobre web").

<!-- PELICAN_END_SUMMARY -->

Piadas à parte, ainda acho o _Vim_ uma ferramenta fantástica. Mas também
reconheço que há uma curva de aprendizagem, e que montar um set de _plugins_ para
um determinado ambiente de desenvolvimento pode ser uma tarefa maçante (sim,
eu estou olhando para você, `python-mode`). Nisso, tenho que reconhecer
que o _Visual Studio Code_ faz um trabalho primoroso.

## Motivação

Tenho "advogado" contra o uso de _IDEs_ [desde 2009](https://www.profissionaisti.com.br/2009/01/produtividade-x-programacao-voce-realmente-precisa-de-uma-ide/ "Produtividade x Programação: Você realmente precisa de uma IDE?").
De lá para cá, geralmente trabalhei com ambientes relativamente fáceis de lidar, como
[_Javascript_]({tag}javascript "Leia mais sobre Javascript"),
[_PHP_]({tag}php "Leia mais sobre PHP") e [_Python_]({tag}python "Leia mais sobre Python").
Essa opinião mudou a partir do momento que comecei a desenvolver para _Android_. Não digo
que usar editores de texto (como o _Vim_ ou _Emacs_) para desenvolver _Java/Android_ seja
impossível, mas (IMO) beira o masoquismo. Com o _Android Studio_, por exemplo, muitas barreiras
de _setup_ de ambiente são derrubadas pela ferramenta, aumentando produtividade e diminuindo
o tempo necessário para ter a sua solução funcionando no dispositivo do seu usuário.

## IDE pero no mucho

Além de ser livre e de código-aberto, o _Visual Studio Code_ é leve, extensível e [construído
em _Javascript_](https://github.com/Microsoft/vscode "Veja o repositório do vscode no Github"). Ele funciona "out of the box" para linguagens como [_CSS_]({tag}css "Leia mais sobre CSS"), _Javascript_ e _HTML_,
inclusive, é impressionante como o _autocomplete_ (através do
[_IntelliSense_](https://code.visualstudio.com/docs/editor/intellisense "Leia mais sobre o IntelliSense")) funciona
"smoothly" para as mesmas.

{% img align-center-keep-size /images/blog/lando-traidor.jpg 640 277 Tô traindo o movimento tipo o Lando (theplaylist.net) %}

O seu _marketplace_ de _plugins_ é rico, e é sem dúvida um dos seus
pontos fortes. Adicionar _code formatters_, _autocomplete_, ou integrações com ferramentas
externas nunca foi tão fácil. Além disso, a opção de customizar o editor
globalmente ou por _workspace_ é uma mão na roda para quem trabalha com mais de um projeto no cotidiano.

Utilitários de _refactoring_, _debugging_, controle de versão, além dos inúmeros _plugins_ para _tests_, só aumentam
ainda mais o poderio do editor, e dão a ele esse "jeitão" de _IDE_, sem perder
a simplicidade peculiar dos editores de texto.

## Python

Para usar o editor com _Python_, a [extensão criada pela própria _Microsoft_](https://marketplace.visualstudio.com/items?itemName=ms-python.python "Python for VS Code")
deve ser o suficiente. Ela é simples de configurar e muito rica, trazendo comandos interessantes como
`Start REPL` ou `Run all unit tests`.

{% img align-center-keep-size /images/blog/vscode-python-example.png 640 320 VS Code com Python %}

A configuração granular do editor permite que você tenha um determinado conjunto de regras para
cada projeto que esteja envolvido. Por exemplo, em um projeto pessoal você usa `nose` como
_test runner_, além de `pylamas` e `mypy`. Mas no projeto da sua empresa o padrão é
`pytest`, `isort`, e a única ferramenta de _lint_ é o `flake8`:

    ::json
    {
    "python.linting.flake8Path": "/home/klaus/.pyenv/versions/company-project/bin/flake8",
    "python.pythonPath": "/home/klaus/.pyenv/versions/company-project/bin/python",
    "python.sortImports.path": "/home/klaus/.pyenv/versions/company-project/bin/isort",
    "python.linting.pylintEnabled": false
    }

Notou o _path_ com `pyenv`? Com a opção `python.venvPath` apontando para o diretório do _pyenv_,
fica muito mais conveniente configurar qual interpretador e ferramentas de _lint_ utilizar. Ao
executar o comando `Python: Select interpreter` o _plugin_ levará em consideração os seus
ambientes virtuais e irá sugerí-los.

## Vim bindings

É claro que você pode trazer umas das melhores coisas do _Vim_ para o _VS Code_! Os _keys bindings_
vão te dar a velocidade de escrita que você já está acostumado, e o [_VSCodeVim_](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim "Vim emulation for Visual Studio Code") é uma excelente escolha como extensão.

Obviamente que, por tratar-se de um emulador, não temos toda a experiência do _Vim_. Para compensar a extensão já traz
algumas funcionalidades embutidas, como _easymotion_, _surround_, _commentary_ e _sneak_.

## Considerações finais

Um dos maiores desafios que enfrentei com a adoção do _VS Code_ foi quebrar esse preconceito
bobo que todo "fanboy" tem com tecnologias que rivalizam com a sua. Na verdade, testar novas
ferramentas (como o _VS Code_), tecnologias (como o _iOS_) e até outras linguagens (como _Java_ e _Scala_),
tem agregado muito ao meu crescimento profissional.

E se você está torcendo o nariz para o fato do editor ser da _Microsoft_, lembre-se:
[_Github_ também é dela](https://g1.globo.com/economia/tecnologia/noticia/microsoft-compra-github-por-us-75-bilhoes.ghtml "Microsoft compra GitHub por US$ 7,5 bilhões e anuncia mudanças").

Até a próxima.
