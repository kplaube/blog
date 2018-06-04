Title: Eu me rendo: VS Code
Date: 2018-06-04 16:30:00
Category: desenvolvimento
Tags: desenvolvimento, web, editores, ide, vscode, vim, python, css, javascript
Slug: eu-me-rendo-vscode
meta_description: Chegou o momento de admitir: Estou usando um editor diferente do Vim. Nesse artigo descrevo as principais virtudes do VS Code, e a razão de simpatizar tanto com esse poderoso editor.

{% img align-left /images/blog/vscode-logo.png 180 180 Logo do VS Code %}

É, caro leitor... chegou o dia de admitir que tenho usado outro editor
além do [*Vim*]({tag}vim "Leia mais sobre o melhor editor do universo"). Pode
me julgar, me chamar de "poser" ou de "vendido", mas acontece que tenho descoberto no
[*VS Code*](https://code.visualstudio.com/ "Conheça o VS Code"), da *Microsoft*,
uma excelente ferramenta para desenvolvimento [*Web*]({tag}web "Leia mais sobre Web").

<!-- PELICAN_END_SUMMARY -->

Piadas à parte, ainda acho o *Vim* uma ferramenta fantástica. Mas também
reconheço que há uma curva de aprendizagem, e que montar um set de *plugins* para
um determinado ambiente de desenvolvimento pode ser uma tarefa maçante (sim,
eu estou olhando para você, `python-mode`). Nisso, tenho que reconhecer
que o *Visual Studio Code* faz um trabalho primoroso.

## Motivação

Tenho "advogado" contra o uso de *IDEs* [desde 2009](https://www.profissionaisti.com.br/2009/01/produtividade-x-programacao-voce-realmente-precisa-de-uma-ide/ "Produtividade x Programação: Você realmente precisa de uma IDE?").
De lá para cá, geralmente trabalhei com ambientes relativamente fáceis de lidar, como
[*Javascript*]({tag}javascript "Leia mais sobre Javascript"),
[*PHP*]({tag}php "Leia mais sobre PHP") e [*Python*]({tag}python "Leia mais sobre Python").
Essa opinião mudou a partir do momento que comecei a desenvolver para *Android*. Não digo
que usar editores de texto (como o *Vim* ou *Emacs*) para desenvolver *Java/Android* seja
impossível, mas (IMO) beira o masoquismo. Com o *Android Studio*, por exemplo, muitas barreiras
de *setup* de ambiente são derrubadas pela ferramenta, aumentando produtividade e diminuindo
o tempo necessário para ter a sua solução funcionando no dispositivo do seu usuário.

## IDE pero no mucho

Além de ser livre e de código-aberto, o *Visual Studio Code* é leve, extensível e [construído
em *Javascript*](https://github.com/Microsoft/vscode "Veja o repositório do vscode no Github"). Ele funciona "out of the box" para linguagens como [*CSS*]({tag}css "Leia mais sobre CSS"), *Javascript* e *HTML*,
inclusive, é impressionante como o *autocomplete* (através do
[*IntelliSense*](https://code.visualstudio.com/docs/editor/intellisense "Leia mais sobre o IntelliSense")) funciona 
"smoothly" para as mesmas.

{% img align-center-keep-size /images/blog/lando-traidor.jpg 640 277 Tô traindo o movimento tipo o Lando (theplaylist.net) %}

O seu *marketplace* de *plugins* é rico, e é sem dúvida um dos seus
pontos fortes. Adicionar *code formatters*, *autocomplete*, ou integrações com ferramentas
externas nunca foi tão fácil. Além disso, a opção de customizar o editor
globalmente ou por *workspace* é uma mão na roda para quem trabalha com mais de um projeto no cotidiano.

Utilitários de *refactoring*, *debugging*, controle de versão, além dos inúmeros *plugins* para *tests*, só aumentam
ainda mais o poderio do editor, e dão a ele esse "jeitão" de *IDE*, sem perder
a simplicidade peculiar dos editores de texto.

## Python

Para usar o editor com *Python*, a [extensão criada pela própria *Microsoft*](https://marketplace.visualstudio.com/items?itemName=ms-python.python "Python for VS Code")
deve ser o suficiente. Ela é simples de configurar e muito rica, trazendo comandos interessantes como
`Start REPL` ou `Run all unit tests`.

{% img align-center-keep-size /images/blog/vscode-python-example.png 640 320 VS Code com Python %}

A configuração granular do editor permite que você tenha um determinado conjunto de regras para
cada projeto que esteja envolvido. Por exemplo, em um projeto pessoal você usa `nose` como
*test runner*, além de `pylamas` e `mypy`. Mas no projeto da sua empresa o padrão é
`pytest`, `isort`, e a única ferramenta de *lint* é o `flake8`:

    ::json
    {
    "python.linting.flake8Path": "/home/klaus/.pyenv/versions/company-project/bin/flake8",
    "python.pythonPath": "/home/klaus/.pyenv/versions/company-project/bin/python",
    "python.sortImports.path": "/home/klaus/.pyenv/versions/company-project/bin/isort",
    "python.linting.pylintEnabled": false
    }

Notou o *path* com `pyenv`? Com a opção `python.venvPath` apontando para o diretório do *pyenv*,
fica muito mais conveniente configurar qual interpretador e ferramentas de *lint* utilizar. Ao
executar o comando `Python: Select interpreter` o *plugin* levará em consideração os seus
ambientes virtuais e irá sugerí-los.

## Vim bindings

É claro que você pode trazer umas das melhores coisas do *Vim* para o *VS Code*! Os *keys bindings*
vão te dar a velocidade de escrita que você já está acostumado, e o [*VSCodeVim*](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim "Vim emulation for Visual Studio Code") é uma excelente escolha como extensão.

Obviamente que, por tratar-se de um emulador, não temos toda a experiência do *Vim*. Para compensar a extensão já traz
algumas funcionalidades embutidas, como *easymotion*, *surround*, *commentary* e *sneak*.

## Considerações finais

Um dos maiores desafios que enfrentei com a adoção do *VS Code* foi quebrar esse preconceito
bobo que todo "fanboy" tem com tecnologias que rivalizam com a sua. Na verdade, testar novas
ferramentas (como o *VS Code*), tecnologias (como o *iOS*) e até outras linguagens (como *Java* e *Scala*),
tem agregado muito ao meu crescimento profissional.

E se você está torcendo o nariz para o fato do editor ser da *Microsoft*, lembre-se:
[*Github* também é dela](https://g1.globo.com/economia/tecnologia/noticia/microsoft-compra-github-por-us-75-bilhoes.ghtml "Microsoft compra GitHub por US$ 7,5 bilhões e anuncia mudanças").

Até a próxima.
