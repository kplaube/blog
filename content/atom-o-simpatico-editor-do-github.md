Title: Atom: O simpático editor do GitHub
Date: 2018-12-27 18:35:00
Category: desenvolvimento
Tags: desenvolvimento, web, editores, ide, atom, python, vim
Slug: atom-o-simpatico-editor-do-github

{% img align-left /images/blog/atom-editor-logo.png 180 180 Logo do Atom %}

Tenho "peregrinado" por diferentes editores e *IDEs* nesses últimos meses. Além
do [Vim]({tag}vim "Leia mais sobre Vim"), algumas "desventuras" com *IntelliJ IDEA*,
e [uma surpreendente experiência com o *VS Code*]({filename}eu-me-rendo-vscode.md "Eu me rendo: VS Code"),
tive a oportunidade de testar uma alternativa que sempre me deixou intrigado:
[O *Atom*](https://atom.io/ "A hackable text editor for the 21st Century")

<!-- PELICAN_END_SUMMARY -->

Embora notícias recentes em relação ao editor sejam "preocupantes", o veredicto
é o melhor possível. Recomendo desde já o uso, e abaixo dou mais detalhes
sobre essa minha conclusão.

## O que é?

*Atom* é um editor de textos, gratuito e de código aberto
([*MIT*](https://en.wikipedia.org/wiki/MIT_License "Leia mais sobre a MIT License")),
construído em [*Electron*](https://github.com/electron/electron "Leia mais sobre Electron")
(portanto multiplataforma) e mantido pelo *GitHub*.

O editor ganha vida através de
[*Javascript*]({tag}javascript "Leia mais sobre Javascript")/[*CoffeeScript*](https://coffeescript.org/ "CoffeeScript is a little language that compiles into JavaScript") e
[*Less*](http://lesscss.org/ "It's CSS, with just a little more."), e com essas
mesmas tecnologias é possível estendê-lo de maneira impressionante. Aliás, o
processo de customização é muito bem documentado, no
[*Atom Flight Manual*](https://flight-manual.atom.io/ "Leia mais na página oficial"),
e escrever seus próprios *plugins* tem uma curva de aprendizado mínima se você
já trabalhar com desenvolvimento [*Web*]({tag}web "Leia mais sobre web").

Por padrão o *Atom* oferece *syntax highlighting* para uma grande gama de linguagens,
além de outros utilitários, como *fuzzy finder*, *tree view*, corretor ortográfico,
e um simples *auto-complete*.

## O que há de bom?

Gosto muito do visual do *Atom*. Na minha opinião, é um dos editores mais bonitos
disponíveis por aí. As fontes, cores (muito graças aos temas incríveis)
e ícones são renderizados de forma suave, e o "conforto visual" não pode deixar de ser
mencionado.

{% img align-center-keep-size /images/blog/ant-man-atom.jpg 540 297 Não tive criatividade para fazer uma referência melhor (collider.com) %}

Por vir com uma configuração mais "básica"
por *default*, o editor é muito simples de usar. Sem requerer funções avançadas
(comuns em *IDEs*, como *auto-complete*, *debugging* e *go to definition*), basta
abrí-lo e começar a escrever código. Sem dúvida ele apresenta uma interface
mais amigável que outras opções no mercado.

Como não há almoço grátis, o *Atom* leva a fama de ser mais lento que
opções como *VS Code* e *Vim*. E embora o time de desenvolvedores
[tenha trabalhado nessa questão](https://blog.atom.io/2017/04/18/improving-startup-time.html "Improving Startup time"),
é possível notar os "soluços" do editor em algumas ocasiões.

A integração com *Git* (e obviamente *GitHub*) é bem interessante, e pode ajudar
bastante quem não tem intimidade com a linha de comando. E um extra bacana é o
[*Teletype*](https://teletype.atom.io/ "Collaborate in real time in Atom"):
Pacote que vem com a distribuição padrão e que permite desenvolvedores colaborarem
em *real time* com o código aberto no editor.

Por falar em pacotes e extensões, talvez esse seja o ponto mais alto do editor.

Dentre eles vale mencionar o [*vim-mode-plus*](https://atom.io/packages/vim-mode-plus "vim-mode improved")
e o [*ex-mode*](https://atom.io/packages/ex-mode "Ex for Atom's vim-mode"). Estes
trazem os *key bindings* do *Vim* para o *Atom*. Eles funcionam extremamente bem
e é a "experiência *Vim-like*" mais eficiente que já experimentei.

Configurar um *set* de *plugins* para as suas linguagens favoritas pode
ser maçante e *error prone*. O *VS Code* resolveu isso através de "plugins agregadores"
que acabam instalando e configurando uma série de outros *plugins* menores para você. No
*Atom*, o *Atom-IDE* se destaca nesse quesito.

### Atom-IDE

O [*Atom-IDE*](https://ide.atom.io/ "Improve language integration") é uma coletânea
de *plugins* e funcionalidades que trazem características comuns em *IDEs* para o
*Atom*.

{% img align-center-keep-size /images/blog/atom-ide-ui.png 540 405 Atom-IDE UI %}

Em uma colaboração entre *Facebook* e *GitHub*, tornou-se possível ter um *auto-complete*
mais rico, *outline view*, *go to definition*, *find all references*, *diagnosis*,
*debugging*, *document formatting*, entre outras *features* que você está acostumado a ver
em ferramentas como *Netbeans* ou *Eclipse*.

A boa notícia é que existe uma grande quantidade de *plugins* que dão [suporte a diferentes linguagens](https://atom.io/packages/search?q=IDE "Veja mais plugins de Atom-IDE"). Por exemplo,
recentemente testei o [*ide-elixir*](https://atom.io/packages/ide-elixir "Plugin para o Elixir")
e foi uma experiência muito boa.

Mas é claro que tem a má notícia...

### Facebook deixa de dar suporte

Diretamente do [*Blog do Atom*](https://blog.atom.io/2018/12/12/facebook-retires-nuclide-extension.html "Facebook retires Nuclide extension"):

  >A few years ago, Facebook introduced Nuclide to provide a first-class IDE experience which included associated repos such as Atom IDE. Both Nuclide and Atom IDE were developed by Facebook and supported by an open source community. At this time, Facebook has decided to retire their open source efforts on Nuclide, the Atom IDE, and other associated repos. All of the source code will remain available in the Facebook Open Source Archives, and, if you’re interested, we encourage you to check it out and continue to build on top of it.

Na prática não há motivos para pânico. Os *plugins* que estendem o *Atom-IDE*
para suportar diferentes linguagens são mantidos por diferentes pessoas da
comunidade. O *Facebook* "arquivou" os repositórios do *Atom-IDE* e *Nuclide*,
mas seu código continua disponível. O *framework* que foi montado
até aqui deve continuar funcionando sem maiores problemas. Possíveis melhorias e correções
dependerão de contribuições da comunidade. É esperar para ver se algum grande *player* ficará
responsável por coordenar esse esforço.

Mas com a compra do *GitHub* pela *Microsoft*,
o *VS Code* (da mesma *Microsoft*) [ganhando cada vez mais usuários](https://www.infoq.com/br/news/2018/12/the-rise-vscode "A crescente adoção do Visual Studio Code"), e esse anúncio do
time *Nuclide*, fica difícil não ficar com [a pulga atrás da orelha](https://news.ycombinator.com/item?id=18507817 "Is Atom now dead in the water?").

## Atom-IDE + Python

O [*ide-python*](https://atom.io/packages/ide-python) é o *plugin* para *Atom-IDE*
que adiciona suporte à linguagem [*Python*]({tag}python "Leia mais sobre Python")
ao editor.

{% img align-center-keep-size /images/blog/ide-python-ui.png 640 410 Atom-IDE com Python %}

Assim como outros *plugins* dependentes do mesmo *framework*, ele utiliza [*Language Server Protocol*](https://github.com/Microsoft/language-server-protocol "Defines a common protocol for language servers")
para habilitar recursos como *completion* e *refactoring*. No caso do *Python*, isso é
possível através do [*python-language-server*](https://github.com/palantir/python-language-server "An implementation of the Language Server Protocol for Python"). Logo, o primeiro passo
é instalar a dependência em sua máquina:

    ::bash
    $ pip install python-language-server[all]

Com o `[all]`, você terá disponível *completions* e *renaming* (através do
[*Rope*](https://github.com/python-rope/rope "Repositório do Rope")),
*linter* e *style checking* (através do [*Pyflakes*](https://github.com/PyCQA/pyflakes "Repositório do Pyflakes"), [*McCabe*](https://github.com/PyCQA/mccabe "Repositório do McCabe"),
[*pycodestyle*](https://github.com/PyCQA/pycodestyle "Repositório do pycodestyle") e
[*pydocstyle*](https://github.com/PyCQA/pydocstyle "Repositório do pydocstyle")) e
*code formatting* (através de [*autopep8*](https://github.com/hhatto/autopep8 "Repositório do autopep8")
ou [*YAPF*](https://github.com/google/yapf "Repositório do YAPF")).

Na sequência, basta instalar os *plugins* do *Atom*:

    ::bash
    $ apm install atom-ide-ui
    $ apm install ide-python

Pronto! Você já pode começar a usar o *Atom-IDE* para escrever código *Python*.    

Mas para deixar o seu ambiente ótimo, sugiro a instalação do [*atom-management*](https://atom.io/packages/atomic-management "Per-project Atom config"). Com ele, você poderá
configurar o *Python* de acordo com o *virtualenv* de cada projeto que esteja trabalhando:

    ::bash
    $ apm install atomic-management

Agora basta criar o arquivo de configuração para cada projeto. Aqui está um exemplo:

    ::cson
    "*":
      "ide-python":
        pylsPlugins:
          autopep8:
            enabled: false
          yapf:
            enabled: false
        python: "/Users/klaus/.local/share/virtualenvs/yatla-kWU5r6Dm/bin/python"

Acima, eu propositalmente desligo o `autopep8` e `yapf`, uma vez que para este
projeto eu estou utilizando [*Black*](https://github.com/rupert/pyls-black "Black plugin for the Python Language Server"). Já na chave `python`, eu explicitamente digo qual instalação
do *Python* pretendo utilizar.

## Considerações finais

Reforço a opinião do começo desse *post*: Recomendo.

É um editor muito amigável e confortável de usar. Os *key bidings* do *Vim* são
um *plus*, e além disso a documentação para criação de *plugins*
e configurações diversas é impressionante. O fato de não se render à componentização (IMO) é
outro fator positivo, assim como a riqueza de pacotes e a grande comunidade em sua volta.

Mas se você é um *developer* que gosta de seguir o *hype*, eu diria que o *Visual
Studio Code* é uma opção mais atraente. Na dúvida, teste os dois e nos conte suas
conclusões nos comentários abaixo.

Até a próxima.


## Referências

- [Atom: Introducing Atom-IDE](https://blog.atom.io/2017/09/12/announcing-atom-ide.html)
- [Atom: Facebook retires Nuclide extension](https://blog.atom.io/2018/12/12/facebook-retires-nuclide-extension.html)
- [Hacker News: Is Atom now dead in the water?](https://news.ycombinator.com/item?id=18507817)
- [InfoQ: A crescente adoção do Visual Studio Code](https://www.infoq.com/br/news/2018/12/the-rise-vscode)
- [Wikipedia: Atom \(text editor\)](https://en.wikipedia.org/wiki/Atom_\(text_editor\))
