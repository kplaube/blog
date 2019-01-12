Title: Deixe darem pitaco no seu código com Prettier
Date: 2019-01-12 10:55:00
Category: desenvolvimento
Tags: desenvolvimento, web, formatters, editores, prettier, javascript, html, css
Slug: deixe-darem-pitaco-no-seu-codigo-com-prettier

{% img align-left /images/blog/prettier-logo.png 180 180 Logo do Prettier %}

_Code formatters_ são uma boa ideia. Acredite! Demorei a dar o braço a torcer,
mas depois de alguns "Hello world" em [_Go_](https://golang.org/ "Leia mais sobre Golang")
admito que a ideia de ter um código bem formatado, sem necessitar da destreza do
programador para isso, é uma ideia excelente.

<!-- PELICAN_END_SUMMARY -->

Em _Go_ temos o `go fmt`, que
poupa um tempo absurdo tornando o seu código "go-like" com pouco esforço.
Já para [_Javascript_]({tag}javascript "Leia mais sobre Javascript"), temos o [_Prettier_](https://prettier.io/ "Opiniated Code Formatter").
E é sobre ele que falaremos nesse artigo.

## Mais bonito

O _Prettier_ é um _code formatter_ livre ([_MIT_](https://github.com/prettier/prettier/blob/master/LICENSE "Leia o documento completo")) e de código aberto, que tem por finalidade "forçar" um padrão de código. Ele realiza isso analisando o seu código e alterando-o de acordo com regras pré-definidas.

Todos nós temos algum vício na forma como escrevemos nosso código. A ideia de ferramentas como o _Prettier_ é fazer com que todos os integrantes de um projeto tenham um estilo comum de escrita. Tornando a leitura do código consistente, não importando o seu autor (ou editor).

{% img align-center-keep-size /images/blog/sam-elliot-prettier.jpg 640 389 Prettier é como trabalhar para o Sr. Bennett, de The Ranch. Na dúvida, você está errado (heighline) %}

Com "estilo comum de escrita" não estamos falando necessariamente de qualidade de código. Por exemplo, o _Prettier_ não está preocupado com variáveis sendo usadas antes de serem declaradas. Para isso existe os [_linters_]({tag}qualidade "Leia mais sobre qualidade de código"), e no caso do _Javascript_ o [_ESLint_](https://eslint.org/ "The pluggable linting utility for JavaScript and JSX") é (provavelmente) a opção mais famosa. Por outro lado, ele estará preocupado com a quantidade de espaços em branco, quantidade de caracteres por linha, uso de vírgulas, etc. Tópicos que geralmente demandam energia durante um _code review_.

E talvez esse seja o ponto marcante por trás do _Prettier_. Diretamente da [página que fala sobre a filosofia da ferramenta](https://prettier.io/docs/en/option-philosophy.html "Option Philosophy"):

```
By far the biggest reason for adopting Prettier is to stop all the on-going debates over styles.
```

## Na prática

A ferramenta é escrita em _Node.js_, portanto, um `npm install` é o suficiente para tê-la em seu ambiente:

    ::text
    $ npm install --global prettier

A documentação da ferramenta sugere "pinnar" a versão exata no `package.json` do seu projeto, uma vez que diferentes versões podem ter diferentes sugestões de escrita.

Com o utilitário de linha de comando, basta executarmos passando o arquivo _JS_ desejado como parâmetro:

    ::text
    $ prettier file.js

    function HelloWorld({
        greeting = "hello",
        greeted = '"World"',
        silent = false,
    onMouseOver
    }) {
        if (!greeting) {
            return null;
        }

        // TODO: Don't use random in render
        let num = Math.floor(Math.random() * 1e7)
            .toString()
            .replace(/\.\d+/gi, "");

        return (
            <div
            className="HelloWorld"
            title={`You are visitor number ${num}`}
            onMouseOver={onMouseOver}
            >
            <strong>
                {greeting.slice(0, 1).toUpperCase() + greeting.slice(1).toLowerCase()}
            </strong>
            {greeting.endsWith(",") ? (
                " "
            ) : (
                <span style={{ color: "grey" }}>", "</span>
            )}
            <em>{greeted}</em>
            {silent ? "." : "!"}
            </div>
        );
    }

O _output_ é o conteúdo do seu arquivo já formatado. Se quiser a alteração "in-place", temos a opção `--write` disponível.

É possível customizar a ferramenta de acordo com as suas escolhas [passando argumentos durante sua chamada](https://prettier.io/docs/en/options.html "Options"). No exemplo abaixo, queremos formatar o arquivo `file.js` sem _semicolons_ no final das linhas, e com _single quotes_ ao invés de _double quotes_:

    ::text
    $ prettier --no-semi --single-quote file.js

O mais recomendado é a criação de um [arquivo de configuração](https://prettier.io/docs/en/configuration.html "Configuration file") (geralmente chamado de `.prettierrc`), com todas a regras explícitas:

    ::json
    {
        "trailingComma": "es5",
        "tabWidth": 4,
        "semi": false,
        "singleQuote": true
    }

## Na prática (de verdade)

É inviável ir na linha de comando e executar a ferramenta toda a vez que você alterar o seu código. Uma opção mais eficiente é deixar com que o seu editor ou _IDE_ tome conta desse processo.

Os principais editores do mercado possuem suporte ao _Prettier_, como pode ser visto em [Editor Integration](https://prettier.io/docs/en/editors.html "Leia na documentação da ferramenta"). Para o [_Vim_]({tag}vim "Leia mais sobre Vim"), recomendo o uso com o _plugin_ [_Ale_](https://github.com/w0rp/ale "Asynchronous linting/fixing for Vim and Language Server Protocol (LSP) integration").

É esperado que nem todo membro do seu projeto configurará o editor apropriadamente na primeira interação. Portanto, uma "salvaguarda" pode ser habilitar um _pre-commit hook_. Com isso, ao executar `git add`, o _Prettier_ será executado automaticamente nos arquivos alterados pelo desenvolvedor. O capítulo [Pre-commit Hook](https://prettier.io/docs/en/precommit.html "Leia na documentação oficial") da documentação oficial dá várias sugestões de uso. Para esse caso, simpatizo bastante com o [pre-commit](https://pre-commit.com/ "A framework for managing and maintaining multi-language pre-commit hooks").

## ESLint vs Prettier? ESLint + Prettier!

Sabe o que é melhor que usar o _Prettier_? É usar o _Prettier_ integrado com as regras que você já conhece do _ESlint_. Obviamente que executar os dois em paralelo pode resultar em comportamentos inesperados. Existe inúmeros tutoriais na internet recomendando como fazer essas duas ferramentas funcionarem em conjunto.

Recomendo o [Integrating Prettier + ESLint + Airbnb Style Guide in VSCode](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a "Leia o artigo original"), do _Echobind_.

## Considerações finais

Não perca tempo tentando controlar "na conversa" o estilo de código do seu time ou projeto. Já passei por isso e não compensa o estresse e tempo investido. Adote uma ferramenta como o _Prettier_, e reserve tempo e energia para coisas mais importantes, relacionados ao seu negócio ou produto.

Até a próxima.

## Referências

- [Echobind - Integrating Prettier + ESLint + Airbnb Style Guide in VSCode](https://blog.echobind.com/integrating-prettier-eslint-airbnb-style-guide-in-vscode-47f07b5d7d6a)
- [Future Hosting - Prettier vs Eslint: What's the difference?](https://www.futurehosting.com/blog/prettier-vs-eslint-whats-the-difference/)
- [Joshua Crass - Javascript Linting and Formatting with ESLint, Prettier, and Airbnb](https://medium.com/@joshuacrass/javascript-linting-and-formatting-with-eslint-prettier-and-airbnb-30eb746db862)
