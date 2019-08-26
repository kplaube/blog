Title: Vim para desenvolvimento em Python
Date: 2017-10-15 19:20:00
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, editores-de-texto, vim, python
Slug: vim-para-desenvolvimento-python
meta_description: Ter o Vim configurado para desenvolvimento Python é em teoria algo simples. Nesse artigo vamos dar uma olhada nos mais variados plugins que podem te ajudar com esta tarefa.

{% img representative-image /images/blog/macvim-logo.png 180 180 Logotipo do MacVim %}

Já mencionei as motivações de utilizar [*Vim*]({tag}vim "Leia mais sobre Vim")
no ["Vim: O meu editor favorito"]({filename}vim-o-meu-editor-favorito.md "Leia o artigo completo").
E embora eu já tenha "caído em tentação" e utilizado [*Atom*](https://atom.io/ "A hackable text editor")
e [*Spacemacs*](http://spacemacs.org/ "The best editor is neither Emacs nor Vim, it's Emacs and Vim!")
(esse último é simplesmente fantástico), acabo sempre retornando ao *Vim*. Principalmente
após o [lançamento da versão 8](https://www.reddit.com/r/linux/comments/52e4qo/vim_8_released/ "Vim 8 released"),
onde processamento assíncrono foi adicionado ao editor.

<!-- PELICAN_END_SUMMARY -->

Ter o *Vim* configurado para trabalhar com projetos [*Python*]({tag}python "Leia mais sobre Python")
é em teoria algo simples (se você optar por usar extensões). O problema é que durante a seleção de ferramentas, alguns detalhes aparecem
e interferem na construção de um [ambiente de desenvolvimento]({tag}ambiente-de-desenvolvimento "Leia mais sobre ambiente de desenvolvimento")
capaz de operar sem problemas.

E como diz o poeta: O diabo está nos detalhes.

## Packaging: vim-plug

Para começar é preciso selecionar um sistema de empacotamento, afim de facilitar a instalação e remoção de *plugins*.
Embora o editor possua um [mecanismo *built-in*](https://shapeshed.com/vim-packages/ "Vim: So long Pathogen, hello native package loading")
em sua versão mais recente, o [*vim-plug*](https://github.com/junegunn/vim-plug "Minimalist Vim Plugin Manager ") mostra-se
muito (mas muito) mais simples de usar.

Para instalar o *vim-plug*:

    ::bash
    curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
        https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

O controle dos *plugins* é feito através do `.vimrc`:

    ::vim
    " ~/.vimrc

    call plug#begin('~/.vim/plugged')

    " Lista de plugins

    call plug#end()

Uma vez que o *plugin* desejado fora adicionado ao `.vimrc`, o comando
`:PlugInstall` fará o *download* e instalação do pacote.

{% img align-center-keep-size /images/blog/vim-plug-install.png 640 650 Exemplo de utilização do vim-plug %}

## Syntax highlight: vim-polyglot

*Syntax highlighting* é um dos recursos mais básicos (e úteis) que qualquer editor de texto
possa oferecer. É no mínimo curioso o quanto a disposição de cores facilita na leitura
de códigos-fonte.

O [*vim-polyglot*](https://github.com/sheerun/vim-polyglot "A solid language pack for Vim") suporta
dezenas de linguagens (incluindo *Python*, claro), e o próprio projeto alega que a sua utilização
não prejudica o *startup time* do editor. Logo, uma excelente opção caso o usuário não queira perder
tempo fazendo *setup* desse tipo de *feature*:

    ::vim
    " ~/.vimrc

    call plug#begin('~/.vim/plugged')

    " Lista de plugins
    Plug 'sheerun/vim-polyglot'

    call plug#end()

Para uma rápida instalação, execute `:source $MYVIMRC` (para atualizar o `.vimrc` em memória) e 
em seguida `:PlugInstall`.

## Lint: ALE + flake8 + isort + yapf

O [*Asynchronous Lint Engine*](https://github.com/w0rp/ale "Asynchronous Lint Engine for Vim") é um desses
projetos que foram feitos para tirar o máximo da nova versão do *Vim*. A sua função é na realidade
servir de interface assíncrona para *linters* de diferentes linguagens, resultando em validações
do código-fonte sem travar a *UI* do editor.

{% img align-center-keep-size /images/blog/vim-ale-linters.png 640 468 Lista de linters suportados pelo ALE %}

Uma "traquinagem" que ajuda no uso do *ALE* é utilizar o parâmetro `do`, do *vim-plug*, tornando
mais fácil a instalação dos utilitários necessários para que o *plugin* funcione:

    ::vim
    " ~/.vimrc

    (...)

    Plug 'w0rp/ale', { 'do': 'pip install flake8 isort yapf' }

    call plug#end()

Importante notar que se o *Vim* for aberto dentro de um [*virtualenv*]({tag}virtualenv "Leia mais sobre Virtualenv"),
os pacotes *Python* serão instalados no ambiente virtual ativo. Para contornar esse problema,
e tornar essas ferramentas "globais", é possível utilizar o [*pyenv*](https://medium.com/@henriquebastos/the-definitive-guide-to-setup-my-python-workspace-628d68552e14 "The definitive guide to setup my Python workspace").
Executar `:PlugInstall!` para cada *virtualenv* pode ser uma opção também.

Caso algo não esteja funcionando, o `:ALEInfo` dará dicas de onde o problema está escondido.

### Linter: flake8

O [*flake8*](http://flake8.pycqa.org/en/latest/ "Flake8: Your Tool For Style Guide Enforcement") assegura
que o código escrito esteja dentro das convenções da [*PEP8*]({filename}assegure-a-qualidade-do-seu-codigo-python-pep8.md "Leia mais sobre PEP8").
Alguns alertas aparecerão na tela do editor quando alguma violação acontecer:

{% img align-center-keep-size /images/blog/vim-ale-flake8.png 640 402 Flake8 + ALE %}

### Fixers: isort e yapf

O *ALE* possui o conceito de "fixers". Eles são executados para realizar reparos no código-fonte
aberto, sem a necessidade da chamada de nenhum comando adicional. Em um arquivo *Python*, o `:ALEFixSuggest`
trará sugestões de *fixers* para a linguagem:

    ::vim
    Try the following fixers appropriate for the filetype:

    'add_blank_lines_for_python_control_statements' - Add blank lines before control statements.
    'autopep8' - Fix PEP8 issues with autopep8.
    'isort' - Sort Python imports with isort.
    'yapf' - Fix Python files with yapf.

    Try the following generic fixers:

    'remove_trailing_lines' - Remove all blank lines at the end of a file.
    'trim_whitespace' - Remove all trailing whitespace characters at the end of every line.

    See :help ale-fix-configuration

    Press q to close this window

O [*isort*](https://pypi.python.org/pypi/isort "A Python utility / library to sort Python imports")
é uma ferramenta muito útil que ajuda na ordenação dos `import` *Python*. Já o
[*yapf*](https://github.com/google/yapf  A formatter for Python files") formatará
os arquivos respeitando a *PEP8*.

Para habilitar esses recursos, basta adicionar a seguinte configuração ao `~/.vimrc`:

    ::vim
    " ~/.vimrc

    (...)

    call plug#end()

    let g:ale_fix_on_save = 1
    let g:ale_fixers = {
    \   'python': [
    \       'isort',
    \       'yapf',
    \       'remove_trailing_lines',
    \       'trim_whitespace'
    \   ]
    \}

Com o `g:ale_fix_on_save = 1`, ao salvar o arquivo os *fixers* serão executados automaticamente.
É possível executá-los também através do comando `:ALEFix`.

## Code Completion: completor.vim

Embora o [*YouCompleteMe*](https://github.com/Valloric/YouCompleteMe "A code-completion engine for Vim")
seja a opção *standard* para *autocomplete* no *Vim*, foi no [*completor*](https://github.com/maralla/completor.vim "Async completion framework made ease")
que eu encontrei um bom balanço entre complexidade e benefícios.

Utilizando o *engine* de *async* do *Vim 8*, o *plugin* é capaz de entregar *code completion*
de uma maneira muito rápida, e ainda possui uma boa abstração a *semantic completion* (que fará
o *autocomplete* funcionar "de fato" no caso do *Python*).

{% img align-center-keep-size /images/blog/vim-completor-example.png 640 253 Exemplo de uso do Completor %}

O [*jedi*](https://github.com/davidhalter/jedi " Awesome autocompletion and static analysis library for python")
é o utilitário "hors concours" para essa tarefa:

    ::vim
    " ~/.vimrc

    (...)

    Plug 'maralla/completor.vim', { 'do': 'pip install jedi' }

    call plug#end()

A dica de usar *pyenv* ou de instalar para cada *virtualenv* (do tópico de *Lint*), vale aqui também.

## Navegar pelo código-fonte: jedi-vim

E falando de *jedi*, o [*jedi-vim*](https://github.com/davidhalter/jedi-vim "Using the jedi autocompletion library for VIM")
é outra figurinha carimbada nos `.vimrc` de muitos desenvolvedores *Python*. Assim como o
*completor*, ele fornece *autocompletion* e uma excelente ferramenta de *static analysis*.

{% img align-center-keep-size /images/blog/vim-jedi.jpg 640 360 Nunca renda-se ao lado emacs da força (jovemnerd.com.br) %}

Se você programa somente em *Python*, esqueça o *completor* e use apenas o *jedi-vim*. Caso contrário,
se você programa em mais linguagens, o *completor* ainda é uma opção atraente (por ser "genérico").

Além do *completion* o *jedi-vim* tem outras funcionalidades que são muito úteis para lidar com grandes projetos:

* *Goto assignments* (`<leader>g`)
* *Goto definitions* (`<leader>d`)
* Mostrar documentação (`K`)
* Renomear (`<leader>r`)
* Exibir uso (`<leader>n`)

Portanto, é sempre útil tê-lo no seu ambiente de desenvolvimento:

    ::vim
    " ~/.vimrc

    (...)

    Plug 'davidhalter/jedi-vim', { 'do': 'pip install jedi' }

    call plug#end()

    (...)

    let g:jedi#completions_enabled = 0

A última linha acima é essencial para que o *completion* do *jedi-vim* não conflite com o do *completor*.

## Navegar pelo sistema de arquivos: NERDTree e ctrlp.vim

Aqui eu vou "chover no molhado" e indicar [*NERDTree*](https://github.com/scrooloose/nerdtree "A tree explorer plugin for vim")
e [*ctrlp.vim*](https://github.com/ctrlpvim/ctrlp.vim "Fuzzy file, buffer, mru, tag, etc finder").

O primeiro exibe um simpático *file explorer* no lado esquerdo do editor, muito útil quando você não faz
ideia do que está procurando, e tem que ter uma visão dos arquivos e diretórios do projeto:

{% img align-center-keep-size /images/blog/vim-nerdtree.png 640 503 Exemplo de uso do NERDTree %}

Com o uso do [*nerdtree-git-plugin*](https://github.com/Xuyuanp/nerdtree-git-plugin "A plugin of NERDTree showing git status")
ele fica ainda mais interessante, pois sinaliza os arquivos que sofreram modificações dentro de um
repositório [*Git*]({tag}git "Leia mais sobre Git").

Já o *ctrlp.vim* é usado para buscas de arquivos e *buffers*. Muito útil para quando você já tem ideia
do que vai procurar:

{% img align-center-keep-size /images/blog/vim-ctrlp.png 640 447 Exemplo de uso do ctrlp.vim %}

A instalação através do *vim-plug* é simples, como sempre:

    ::vim
    " ~/.vimrc

    (...)

    Plug 'ctrlpvim/ctrlp.vim'
    Plug 'scrooloose/nerdtree' | Plug 'Xuyuanp/nerdtree-git-plugin'

    call plug#end()

    (...)

**Bônus:** O [*ack.vim*](https://github.com/mileszs/ack.vim "Vim plugin for the Perl module / CLI script 'ack'")
é um excelente *plugin* para buscas por conteúdo.

## Executar testes: vim-test

O [*vim-test*](https://github.com/janko-m/vim-test "Run your tests at the speed of thought") é um
dos meus *plugins* favoritos! Ele é um *wrapper* que executa testes de diferentes granularidades, ou seja,
executa o teste de um arquivo apenas, da suíte inteira, do mais próximo, do último testado, etc.

    ::vim
    " ~/.vimrc

    (...)

    Plug 'janko-m/vim-test'

    call plug#end()

    (...)

    let test#python#runner = 'pytest'

No exemplo acima, o *runner* configurado foi o [*pytest*](https://docs.pytest.org/en/latest/ "pytest: helps you write better programs¶"),
mas dentro do ecossistema *Python* ele suporta os seguintes *frameworks* de testes: `PyTest`, `Django`, `Nose`, `Nose2`, e `PyUnit`.

É possível evocar o *plugin* para os diferentes níveis de testes através dos comandos `:TestNearest`, `:TestFile`, `:TestSuite`, `:TestLast`
e `:TestVisit`.

**Bônus:** Utilizando o [*dispatch.vim*](https://github.com/tpope/vim-dispatch "dispatch.vim: asynchronous build and test dispatcher")
como *strategy* no *vim-test*, será possível executar os testes assincronamente.

## Executar comandos: dispatch.vim

Com o [*dispatch.vim*](https://github.com/tpope/vim-dispatch "asynchronous build and test dispatcher"),
do [*Tim Pope*](https://github.com/tpope "Perfil no Github"), é possível executar comandos (como por exemplo,
*build* ou testes) de forma assíncrona. O *plugin* se responsabiliza por escolher a melhor plataforma
(*tmux*, tela, *iTerm*, *headless*, etc) de acordo com o ambiente no qual o *Vim* está rodando.

{% img align-center-keep-size /images/blog/vim-dispatch.png 640 656 Exemplo de utilização do vim-dispatch %}

O *plugin* (até o momento) não utiliza a estratégia de *jobs* do *Vim 8*. Mas [discussões sobre o assunto](https://github.com/tpope/vim-dispatch/pull/193 "Add initial vim jobs strategy")
tem ocorrido, e é possível que uma solução seja incorporada em breve. Se utilizar o *async* do *Vim* é um desejo,
o [*asyncrun.vim*](https://github.com/skywind3000/asyncrun.vim "Run Async Shell Commands in Vim 8.0 / NeoVim and Output to Quickfix Window")
pode ser uma melhor opção.

### Bônus: tmux

Com o [*tmux*](https://github.com/tmux/tmux/wiki "tmux is a terminal multiplexer"), tanto o *vim-test* quanto o *dispatch.vim*
ficam ainda mais interessantes:

{% img align-center-keep-size /images/blog/vim-dispatch-tmux.png 640 516 Exemplo de utilização do vim-dispatch com tmux %}

Interessado no *tmux*? O *bugsnag* possui um bom [artigo sobre *tmux* + *Vim*](https://blog.bugsnag.com/tmux-and-vim/ "Tmux and Vim - even better together").

## Considerações finais

O `.vimrc` abaixo é o resultado de todos os *plugins* apresentados nesse artigo:

    ::vim
    " ~/.vimrc

    call plug#begin('~/.vim/plugged')

    " Lista de plugins
    Plug 'sheerun/vim-polyglot'
    Plug 'w0rp/ale', { 'do': 'pip install flake8 isort yapf' }
    Plug 'maralla/completor.vim', { 'do': 'pip install jedi' }
    Plug 'davidhalter/jedi-vim'
    Plug 'ctrlpvim/ctrlp.vim'
    Plug 'scrooloose/nerdtree' | Plug 'Xuyuanp/nerdtree-git-plugin'
    Plug 'janko-m/vim-test'
    Plug 'tpope/vim-dispatch'

    call plug#end()

    " Ale
    let g:ale_fix_on_save = 1
    let g:ale_fixers = {
    \   'python': [
    \       'isort',
    \       'yapf',
    \       'remove_trailing_lines',
    \       'trim_whitespace'
    \   ]
    \}

    " Jedi
    let g:jedi#completions_enabled = 0

    " vim-test
    let test#python#runner = 'pytest'

Embora haja uma vertente que defende o uso mínimo (ou nulo) de *plugins* no *Vim*, para mim eles são um dos pontos altos do editor
e sem dúvida são os responsáveis por me ajudar a manter uma boa produtividade. Se você, assim como eu, não tem a mínima pretensão de
ser um "vim-master", use sem medo. Tenho certeza que eles te ajudarão a lidar com os problemas do dia a dia.

Até a próxima.

## Referências

- [*Justin Abrahms - Vim & Python: Making yourself at home*](https://justin.abrah.ms/vim/vim_and_python.html)
- [*Liu-Cheng Xu - Use Vim as a Python IDE*](http://liuchengxu.org/posts/use-vim-as-a-python-ide/)
- [*Real Python - VIM and Python: a Match Made in Heaven*](https://realpython.com/blog/python/vim-and-python-a-match-made-in-heaven/)
- [*Shapeshed - Vim: So long Pathogen, hello native package loading*](https://shapeshed.com/vim-packages/)
