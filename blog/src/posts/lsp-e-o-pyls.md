---
title: LSP e o PyLS
date: 2019-05-24 10:53:00
modified: 2023-11-02 18:48:00
tags:
  [
    "desenvolvimento-web",
    "editores",
    "ide",
    "vscode",
    "vim",
    "python",
    "pyls",
    "lsp",
  ]
slug: lsp-e-o-pyls
thumbnail: /media/python-code.jpg
---

Uma das virtudes do [_VS Code_](/tag/vscode.html "Leia mais sobre o editor") é como ele integra-se facilmente com diferentes linguagens.
O esforço é pequeno, geralmente resumindo-se à instalação de um único _plugin_. Essa característica o torna uma ferramenta extremamente
produtiva, e que vem conquistando o coração dos desenvolvedores ao redor do mundo.

O curioso é que o _VS Code_ utiliza um protocolo aberto para ter esse "jeitão" de _IDE_, chamado _Language Server Protocol_,
que entre outras funcionalidades traz ao editor a possibilidade de _autocomplete_, _go to definition_, _diagnosis_ e _documentation_.

É... _Microsoft_ popularizando protocolos abertos. Tempos interessantes esses que vivemos, não?

## LSP - Language Server Protocol

Durante o desenvolvimento do _VS Code_, a _Microsoft_ introduziu o [_Language Server Protocol_](https://microsoft.github.io/language-server-protocol/ "Leia na página oficial do projeto").
O [langserver.org](https://langserver.org/ "A community-driven source of knowledge for Language Server Protocol implementations") o define da seguinte forma:

> The Language Server protocol is used between a tool (the client) and a language smartness provider (the server) to integrate
> features like auto complete, go to definition, find all references and alike into the tool.

Em outras palavras, é um [protocolo](https://microsoft.github.io/language-server-protocol/specification "Leia a especificação completa") que descreve
a comunicação entre um cliente (um editor de textos, por exemplo) e um servidor (ligado à uma determinada linguagem), com a motivação de proporcionar e enriquecer
ferramentas de desenvolvimento.

![Ilustração de como funciona a comunicação entre cliente e servidor (kieranbamforth.me)](/media/vim-lsp.jpg "Ilustração de como funciona a comunicação entre cliente e servidor (kieranbamforth.me)")

Ou seja, podemos ter uma solução única para [_Python_](/tag/python.html "Leia mais sobre Python"), que traga as mesmas funcionalidades para diferentes
editores ou _IDEs_. Em contrapartida, podemos ter um único editor que suporte diferentes linguagens e tais funcionalidades avançadas.
O _langserver.org_ chama esse problema de "The Matrix Problem":

![Com LSP, temos Go funcionando para diferentes editores, seguindo os mesmos princípios (langserver.org)](/media/lsp-the-matrix-problem.png "Com LSP, temos Go funcionando para diferentes editores, seguindo os mesmos princípios (langserver.org)")

Como afirma o site oficial do projeto:

> LSP is a win for both language providers and tooling vendors!

## Como funciona?

Na prática, o que acontece é uma comunicação inter-processos entre o _language server_ e a ferramenta de desenvolvimento. O protocolo utilizado para tal operação é o _JSON-RPC_,
um protocolo simples, e com um formato de dados extremamente popular.

![Exemplo de como funciona a comunicação entre cliente e servidor (microsoft.github.io)](/media/language-server-sequence.png "Exemplo de como funciona a comunicação entre cliente e servidor (microsoft.github.io)")

Nem toda linguagem pode suportar todas as funcionalidade definidas pelo protocolo (o mesmo vale para as ferramentas de desenvolvimento), mas isso não impede a sua adoção.
O protocolo permite que tanto cliente como servidor "anunciem" suas capacidades, portanto, as duas pontas podem ter um comportamento preventivo quando determinada capacidade
(como _go to definition_) não é suportada.

## PyLS - Python Language Server

Para _Python_, além do _language server_ implementado pela própria _Microsoft_ e [usado no _VS Code_](https://github.com/microsoft/python-language-server "Repositório do Microsoft Python Language Server"),
temos o [_Python Language Server_](https://github.com/palantir/python-language-server "Repositório do projeto"). Ele conta com as seguintes funcionalidades:

- _Auto completion_
- _Code linting_
- _Signature help_
- _Go to definition_
- _Hover_
- _Find references_
- _Document symbols_
- _Document formatting_

O que acho mais interessante em relação ao projeto é que ele não reinventa a roda. Por exemplo, ele não implementa uma nova ferramenta de _linting_, pelo contrário, ele utiliza ferramentas
que já são bem conhecidas pela comunidade:

- _Auto completion_, _definitions_, _hover_, _references_, _signature help_ e _symbols_ são resolvidos via [_Jedi_](https://github.com/davidhalter/jedi "Awesome completion and static analysis for Python")
- _Auto completion_ e _renaming_ é resolvido via [_Rope_](https://github.com/python-rope/rope "Python refactoring library")
- _Linting_ é resolvido via [_McCabe_](https://github.com/PyCQA/mccabe "McCabe complexity checker"),
  [_Pyflakes_](https://github.com/PyCQA/pyflakes "Checks Python source files for errors"), [_pycodestyle_](https://github.com/pycqa/pycodestyle "Python style checker")
  e [_pydocstyle_](https://github.com/PyCQA/pydocstyle "Docstring style checker")
- _Formatting_ é resolvido via [_autopep8_](https://github.com/hhatto/autopep8 "Formats Python code to PEP 8")
  e [_YAPF_](https://github.com/google/yapf "A formatter for Python files")

Há um certo grau de customização, como por exemplo usar o [_Black_](/2019/02/07/deixe-darem-pitaco-no-seu-codigo-com-black.html "Leia mais sobre Black") ao invés de _YAPF_. Discutiremos
mais sobre esse tópico a seguir.

## Clientes LSP

Segundo o _langserver.org_, os principais _IDEs_ e editores já possuem alguma forma de cliente implementado. Seja através de extensões (como _JetBrains IDE_, [_Vim_](/tag/vim.html "Leia mais sobre Vim"),
_Sublime_, _Atom_ e _Emacs_), ou através de suporte _built-in_ (como _VS Code_ e _Oni_).

![O Um Anel](/media/lsp-one-ring.jpeg "Sauron faz um anel para juntar a todos. Sem querer comparar Microsoft com Sauron, mas espero que isso não acabe em uma guerra (lego-lord-of-the-rings.wikia.com)")

Para _Vim_, uma opção que tenho usado com sucesso é o [_LanguageClient-neovim_](https://github.com/autozimu/LanguageClient-neovim "Repositório oficial do projeto"), que embora possa parecer
exclusivo para o _Neovim_, possui suporte para _Vim 8.x_.

## Na prática

### Configurando o servidor

Vamos para um exemplo prático de como usar _LSP_ e _Vim_ com _Python_. Mas antes, deixa eu definir algumas _constraints_ do meu ambiente de desenvolvimento:

- Quero utilizar _flake8_ ao invés de _pycodestyle_;
- Quero utilizar _Black_ ao invés de _YAPF_ ou _autopep8_;
- Quero utilizar _isort_ como uma das opções de formatação.

Para começar, vamos instalar o _language server_. Eu prefiro tê-lo dentro do [ambiente virtual](/tag/virtualenv.html "Leia mais sobre Virtualenv") do projeto em que estou trabalhando. É trabalhoso
e repetitivo se você estiver trabalhando em diferentes projetos e _virtualenvs_!
Uma alternativa mais prática é tê-lo instalado em uma instância global do [_pyenv_](/2016/04/26/o-simples-e-poderoso-pyenv.html "O simples e poderoso Pyenv"). Fica a seu critério o destino
da instalação:

```text
pip install python-language-server
```

O próprio servidor identificará quais ferramentas você tem instaladas e habilitará determinada capacidade proporcionada por tal ferramenta (por exemplo, se o _Rope_ estiver instalado,
será capaz de fazer _renaming_). Mas dentre elas o _Jedi_ é fundamental, e por isso é instalada automaticamente como dependência do _PyLS_.

Nesse momento temos grande parte das funcionalidades cobertas pelo _LSP_ habilitadas pelo servidor. Uma muito útil, que ainda está faltando, é o _renaming_. Segundo a lista acima, conseguimos
tal capacidade ao instalar o _Rope_:

```text
pip install 'python-language-server[rope]'
```

Se você está interessado em utilizar a configuração padrão do _python-language-server_, uma opção mais prática é instalar todos os _providers_ de uma só vez:

```text
pip install 'python-language-server[all]'
```

Para fins didáticos estamos resolvendo as dependências manualmente. Há uma outra forma de gerenciar quais _providers_ serão utilizados, que discutiremos a seguir.

Para termos o _isort_ e o _Black_ habilitados como ferramentas de formatação, precisaremos recorrer à _plugins_ de terceiros:

```text
pip install pyls-isort pyls-black
```

Infelizmente, o `pyls-black` exige que você não tenha o `autopep8` instalado para funcionar. Como não há um controle manual para decidir qual será usado,
a melhor forma é garantindo que apenas uma das duas extensões esteja instalada.

Temos tudo o que é necessário para o lado do servidor.

### Configurando o cliente

A melhor forma de instalarmos o _LanguageClient-neovim_ é através do utilitário `Plug`:

```vim
" ~/.vimrc

Plug 'autozimu/LanguageClient-neovim', {
    \ 'branch': 'next',
    \ 'do': 'bash install.sh',
    \ }

Plug 'junegunn/fzf'
```

Ele funciona muito bem com o [_fzf_](https://github.com/junegunn/fzf.vim "Veja o repositório oficial do projeto"), portanto, é uma boa pedida termos os dois disponíveis.

O próximo passo é informar ao cliente como encontrar o servidor da linguagem:

```vim
" ~/.vimrc

(...)

let g:LanguageClient_serverCommands = {
    \ 'python': ['pyls'],
    \ }
```

Ainda precisamos dizer ao _LSP_ sobre as nossas preferências. O arquivo abaixo está situado na raíz do projeto que estou trabalhando,
mais especificamente em `./.vim/settings.json`:

```json
{
  "pyls": {
    "configurationSources": ["flake8"],
    "plugins": {
      "yapf": {
        "enabled": false
      }
    }
  }
}
```

Para fins didáticos adicionei o `yapf` à configuração. Alguns _plugins_ possuem a flexibilidade de mesmo que instalados, poderem ser desabilitados.

Pronto! O cliente está configurado, e com os seguintes comandos você pode explorar todas as funcionalidades do _LSP_:

- `Ctrl+x Ctrl+o`: _Auto completion_ via _Omni completion_ (o [_Deoplete_](https://github.com/Shougo/deoplete.nvim "Dark powered asynchronous completion framework for neovim/Vim8") é uma boa pedida)
- `:call LanguageClient#textDocument_definition()`: _Go to definition_
- `:call LanguageClient#textDocument_hover()`: _Hover_
- `:call LanguageClient#textDocument_references()`: _References_
- `:call LanguageClient#textDocument_documentSymbol()`: Lista de _Symbols_
- `:call LanguageClient#textDocument_rename()`: _Renaming_
- `:call LanguageClient#textDocument_formatting()`: _Formatting_
- `:call LanguageClient_contextMenu()`: Menu de contexto mostrando todas as opções disponíveis

![Exemplo do LSP funcionando com o Vim](/media/vim-lsp-autocomplete.png "Exemplo do LSP funcionando com o Vim")

Agora é só configurar os _key bindings_ e correr para o abraço :)

## Referências

- [kieranbamforth.me - Vim + Language Server Protocol—in 2019](https://www.kieranbamforth.me/blog/vim-lsp.html)
- [Langserver.org - A community-driven source of knowledge](https://langserver.org/)
- [Language Server Protocol official page](https://microsoft.github.io/language-server-protocol/)
- [This is Vini - Vim: Better "Go to definition" and completion using ALE](https://www.thisisvini.com/vim-better-go-to-definition-completion/)
- [Wikipedia - JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC)
