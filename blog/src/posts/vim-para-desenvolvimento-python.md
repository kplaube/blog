---
title: "Vim para desenvolvimento em Python"
date: 2017-10-15 19:20:00
modified: 2023-11-08 15:23:00
tags: ["editores-de-texto", "vim", "python"]
slug: vim-para-desenvolvimento-python
thumbnail: ./images/macvim-logo.png
---

Já mencionei as motivações de utilizar [_Vim_](/tag/vim.html "Leia mais sobre Vim")
no ["Vim: O meu editor favorito"](/2013/03/04/vim-o-meu-editor-favorito.html "Leia o artigo completo").
E embora eu já tenha "caído em tentação" e utilizado [_Atom_](https://atom.io/ "A hackable text editor")
e [_Spacemacs_](http://spacemacs.org/ "The best editor is neither Emacs nor Vim, it's Emacs and Vim!")
(esse último é simplesmente fantástico), acabo sempre retornando ao _Vim_. Principalmente
após o [lançamento da versão 8](https://www.reddit.com/r/linux/comments/52e4qo/vim_8_released/ "Vim 8 released"),
onde processamento assíncrono foi adicionado ao editor.

Ter o _Vim_ configurado para trabalhar com projetos [_Python_](/tag/python.html "Leia mais sobre Python")
é em teoria algo simples (se você optar por usar extensões). O problema é que durante a seleção de ferramentas, alguns detalhes aparecem
e interferem na construção de um [ambiente de desenvolvimento](/tag/ambiente-de-desenvolvimento.html "Leia mais sobre ambiente de desenvolvimento")
capaz de operar sem problemas.

E como diz o poeta: O diabo está nos detalhes.

## Packaging: vim-plug

Para começar é preciso selecionar um sistema de empacotamento, afim de facilitar a instalação e remoção de _plugins_.
Embora o editor possua um [mecanismo _built-in_](https://shapeshed.com/vim-packages/ "Vim: So long Pathogen, hello native package loading")
em sua versão mais recente, o [_vim-plug_](https://github.com/junegunn/vim-plug "Minimalist Vim Plugin Manager ") mostra-se
muito (mas muito) mais simples de usar.

Para instalar o _vim-plug_:

```text
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \\
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

O controle dos _plugins_ é feito através do `.vimrc`:

```vim
" ~/.vimrc

call plug#begin('~/.vim/plugged')

" Lista de plugins

call plug#end()
```

Uma vez que o _plugin_ desejado fora adicionado ao `.vimrc`, o comando
`:PlugInstall` fará o _download_ e instalação do pacote.

![Exemplo de utilização do vim-plug](/media/vim-plug-install.png "Exemplo de utilização do vim-plug")

## Syntax highlight: vim-polyglot

_Syntax highlighting_ é um dos recursos mais básicos (e úteis) que qualquer editor de texto
possa oferecer. É no mínimo curioso o quanto a disposição de cores facilita na leitura
de códigos-fonte.

O [_vim-polyglot_](https://github.com/sheerun/vim-polyglot "A solid language pack for Vim") suporta
dezenas de linguagens (incluindo _Python_, claro), e o próprio projeto alega que a sua utilização
não prejudica o _startup time_ do editor. Logo, uma excelente opção caso o usuário não queira perder
tempo fazendo _setup_ desse tipo de _feature_:

```vim
" ~/.vimrc

call plug#begin('~/.vim/plugged')

" Lista de plugins
Plug 'sheerun/vim-polyglot'

call plug#end()
```

Para uma rápida instalação, execute `:source $MYVIMRC` (para atualizar o `.vimrc` em memória) e
em seguida `:PlugInstall`.

## Lint: ALE + flake8 + isort + yapf

O [_Asynchronous Lint Engine_](https://github.com/w0rp/ale "Asynchronous Lint Engine for Vim") é um desses
projetos que foram feitos para tirar o máximo da nova versão do _Vim_. A sua função é na realidade
servir de interface assíncrona para _linters_ de diferentes linguagens, resultando em validações
do código-fonte sem travar a _UI_ do editor.

![Lista de linters suportados pelo ALE](/media/vim-ale-linters.png "Lista de linters suportados pelo ALE")

Uma "traquinagem" que ajuda no uso do _ALE_ é utilizar o parâmetro `do`, do _vim-plug_, tornando
mais fácil a instalação dos utilitários necessários para que o _plugin_ funcione:

```vim
" ~/.vimrc

(...)

Plug 'w0rp/ale', { 'do': 'pip install flake8 isort yapf' }

call plug#end()
```

Importante notar que se o _Vim_ for aberto dentro de um [_virtualenv_](/tag/virtualenv.html "Leia mais sobre Virtualenv"),
os pacotes _Python_ serão instalados no ambiente virtual ativo. Para contornar esse problema,
e tornar essas ferramentas "globais", é possível utilizar o [_pyenv_](https://medium.com/@henriquebastos/the-definitive-guide-to-setup-my-python-workspace-628d68552e14 "The definitive guide to setup my Python workspace").
Executar `:PlugInstall!` para cada _virtualenv_ pode ser uma opção também.

Caso algo não esteja funcionando, o `:ALEInfo` dará dicas de onde o problema está escondido.

### Linter: flake8

O [_flake8_](http://flake8.pycqa.org/en/latest/ "Flake8: Your Tool For Style Guide Enforcement") assegura
que o código escrito esteja dentro das convenções da [_PEP8_](/2011/08/26/assegure-qualidade-seu-codigo-python-pep.html "Leia mais sobre PEP8").
Alguns alertas aparecerão na tela do editor quando alguma violação acontecer:

![Flake8 + ALE](/media/vim-ale-flake8.png "Flake8 + ALE")

### Fixers: isort e yapf

O _ALE_ possui o conceito de "fixers". Eles são executados para realizar reparos no código-fonte
aberto, sem a necessidade da chamada de nenhum comando adicional. Em um arquivo _Python_, o `:ALEFixSuggest`
trará sugestões de _fixers_ para a linguagem:

```vim
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
```

O [_isort_](https://pypi.python.org/pypi/isort "A Python utility / library to sort Python imports")
é uma ferramenta muito útil que ajuda na ordenação dos `import` _Python_. Já o
[*yapf*](https://github.com/google/yapf "A formatter for Python files") formatará
os arquivos respeitando a _PEP8_.

Para habilitar esses recursos, basta adicionar a seguinte configuração ao `~/.vimrc`:

```vim
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
```

Com o `g:ale_fix_on_save = 1`, ao salvar o arquivo os _fixers_ serão executados automaticamente.
É possível executá-los também através do comando `:ALEFix`.

## Code Completion: completor.vim

Embora o [_YouCompleteMe_](https://github.com/Valloric/YouCompleteMe "A code-completion engine for Vim")
seja a opção _standard_ para _autocomplete_ no _Vim_, foi no [_completor_](https://github.com/maralla/completor.vim "Async completion framework made ease")
que eu encontrei um bom balanço entre complexidade e benefícios.

Utilizando o _engine_ de _async_ do _Vim 8_, o _plugin_ é capaz de entregar _code completion_
de uma maneira muito rápida, e ainda possui uma boa abstração a _semantic completion_ (que fará
o _autocomplete_ funcionar "de fato" no caso do _Python_).

![Exemplo de uso do Completor](/media/vim-completor-example.png "Exemplo de uso do Completor")

O [_jedi_](https://github.com/davidhalter/jedi " Awesome autocompletion and static analysis library for python")
é o utilitário "hors concours" para essa tarefa:

```vim
" ~/.vimrc

(...)

Plug 'maralla/completor.vim', { 'do': 'pip install jedi' }

call plug#end()
```

A dica de usar _pyenv_ ou de instalar para cada _virtualenv_ (do tópico de _Lint_), vale aqui também.

## Navegar pelo código-fonte: jedi-vim

E falando de _jedi_, o [_jedi-vim_](https://github.com/davidhalter/jedi-vim "Using the jedi autocompletion library for VIM")
é outra figurinha carimbada nos `.vimrc` de muitos desenvolvedores _Python_. Assim como o
_completor_, ele fornece _autocompletion_ e uma excelente ferramenta de _static analysis_.

![Nunca renda-se ao lado emacs da força (jovemnerd.com.br)](/media/vim-jedi.jpg "Nunca renda-se ao lado emacs da força (jovemnerd.com.br)")

Se você programa somente em _Python_, esqueça o _completor_ e use apenas o _jedi-vim_. Caso contrário,
se você programa em mais linguagens, o _completor_ ainda é uma opção atraente (por ser "genérico").

Além do _completion_ o _jedi-vim_ tem outras funcionalidades que são muito úteis para lidar com grandes projetos:

- _Goto assignments_ (`<leader>g`)
- _Goto definitions_ (`<leader>d`)
- Mostrar documentação (`K`)
- Renomear (`<leader>r`)
- Exibir uso (`<leader>n`)

Portanto, é sempre útil tê-lo no seu ambiente de desenvolvimento:

```vim
" ~/.vimrc

(...)

Plug 'davidhalter/jedi-vim', { 'do': 'pip install jedi' }

call plug#end()

(...)

let g:jedi#completions_enabled = 0
```

A última linha acima é essencial para que o _completion_ do _jedi-vim_ não conflite com o do _completor_.

## Navegar pelo sistema de arquivos: NERDTree e ctrlp.vim

Aqui eu vou "chover no molhado" e indicar [_NERDTree_](https://github.com/scrooloose/nerdtree "A tree explorer plugin for vim")
e [_ctrlp.vim_](https://github.com/ctrlpvim/ctrlp.vim "Fuzzy file, buffer, mru, tag, etc finder").

O primeiro exibe um simpático _file explorer_ no lado esquerdo do editor, muito útil quando você não faz
ideia do que está procurando, e tem que ter uma visão dos arquivos e diretórios do projeto:

![Exemplo de uso do NERDTree](/media/vim-nerdtree.png "Exemplo de uso do NERDTree")

Com o uso do [_nerdtree-git-plugin_](https://github.com/Xuyuanp/nerdtree-git-plugin "A plugin of NERDTree showing git status")
ele fica ainda mais interessante, pois sinaliza os arquivos que sofreram modificações dentro de um
repositório [_Git_](/tag/git.html "Leia mais sobre Git").

Já o _ctrlp.vim_ é usado para buscas de arquivos e _buffers_. Muito útil para quando você já tem ideia
do que vai procurar:

![Exemplo de uso do ctrlp.vim](/media/vim-ctrlp.png "Exemplo de uso do ctrlp.vim")

A instalação através do _vim-plug_ é simples, como sempre:

```vim
" ~/.vimrc

(...)

Plug 'ctrlpvim/ctrlp.vim'
Plug 'scrooloose/nerdtree' | Plug 'Xuyuanp/nerdtree-git-plugin'

call plug#end()

(...)
```

**Bônus:** O [_ack.vim_](https://github.com/mileszs/ack.vim "Vim plugin for the Perl module / CLI script 'ack'")
é um excelente _plugin_ para buscas por conteúdo.

## Executar testes: vim-test

O [_vim-test_](https://github.com/janko-m/vim-test "Run your tests at the speed of thought") é um
dos meus _plugins_ favoritos! Ele é um _wrapper_ que executa testes de diferentes granularidades, ou seja,
executa o teste de um arquivo apenas, da suíte inteira, do mais próximo, do último testado, etc.

```vim
" ~/.vimrc

(...)

Plug 'janko-m/vim-test'

call plug#end()

(...)

let test#python#runner = 'pytest'
```

No exemplo acima, o _runner_ configurado foi o [_pytest_](https://docs.pytest.org/en/latest/ "pytest: helps you write better programs¶"),
mas dentro do ecossistema _Python_ ele suporta os seguintes _frameworks_ de testes: `PyTest`, `Django`, `Nose`, `Nose2`, e `PyUnit`.

É possível evocar o _plugin_ para os diferentes níveis de testes através dos comandos `:TestNearest`, `:TestFile`, `:TestSuite`, `:TestLast`
e `:TestVisit`.

**Bônus:** Utilizando o [_dispatch.vim_](https://github.com/tpope/vim-dispatch "dispatch.vim: asynchronous build and test dispatcher")
como _strategy_ no _vim-test_, será possível executar os testes assincronamente.

## Executar comandos: dispatch.vim

Com o [_dispatch.vim_](https://github.com/tpope/vim-dispatch "asynchronous build and test dispatcher"),
do [_Tim Pope_](https://github.com/tpope "Perfil no Github"), é possível executar comandos (como por exemplo,
_build_ ou testes) de forma assíncrona. O _plugin_ se responsabiliza por escolher a melhor plataforma
(_tmux_, tela, _iTerm_, _headless_, etc) de acordo com o ambiente no qual o _Vim_ está rodando.

![Exemplo de utilização do vim-dispatch](/media/vim-dispatch.png "Exemplo de utilização do vim-dispatch")

O _plugin_ (até o momento) não utiliza a estratégia de _jobs_ do _Vim 8_. Mas [discussões sobre o assunto](https://github.com/tpope/vim-dispatch/pull/193 "Add initial vim jobs strategy")
tem ocorrido, e é possível que uma solução seja incorporada em breve. Se utilizar o _async_ do _Vim_ é um desejo,
o [_asyncrun.vim_](https://github.com/skywind3000/asyncrun.vim "Run Async Shell Commands in Vim 8.0 / NeoVim and Output to Quickfix Window")
pode ser uma melhor opção.

### Bônus: tmux

Com o [_tmux_](https://github.com/tmux/tmux/wiki "tmux is a terminal multiplexer"), tanto o _vim-test_ quanto o _dispatch.vim_
ficam ainda mais interessantes:

![Exemplo de utilização do vim-dispatch com tmux](/media/vim-dispatch-tmux.png "Exemplo de utilização do vim-dispatch com tmux")

Interessado no _tmux_? O _bugsnag_ possui um bom [artigo sobre _tmux_ + _Vim_](https://blog.bugsnag.com/tmux-and-vim/ "Tmux and Vim - even better together").

## Considerações finais

O `.vimrc` abaixo é o resultado de todos os _plugins_ apresentados nesse artigo:

```vim
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
```

Embora haja uma vertente que defende o uso mínimo (ou nulo) de _plugins_ no _Vim_, para mim eles são um dos pontos altos do editor
e sem dúvida são os responsáveis por me ajudar a manter uma boa produtividade. Se você, assim como eu, não tem a mínima pretensão de
ser um "vim-master", use sem medo. Tenho certeza que eles te ajudarão a lidar com os problemas do dia a dia.

Até a próxima.

## Referências

- [_Justin Abrahms - Vim & Python: Making yourself at home_](https://justin.abrah.ms/vim/vim_and_python.html)
- [_Liu-Cheng Xu - Use Vim as a Python IDE_](http://liuchengxu.org/posts/use-vim-as-a-python-ide/)
- [_Real Python - VIM and Python: a Match Made in Heaven_](https://realpython.com/blog/python/vim-and-python-a-match-made-in-heaven/)
- [_Shapeshed - Vim: So long Pathogen, hello native package loading_](https://shapeshed.com/vim-packages/)
