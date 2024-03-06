---
title: Tipo assim... tipo em Python
date: 2021-10-20 15:00:00
modified: 2023-09-30 17:20
tags: ["python", "typing-hints", "qualidade", "linter", "mypy"]
slug: tipo-assim-tipo-python
thumbnail: /media/python-logo.png
---

Tipos em _Python_ é aquele "tipo" de assunto que vai agitar qualquer papo de almoço entre programadores.
Eu mesmo fui cético por muito tempo, e franzia a testa constantemente quando esse tópico aparecia.
Mas já mudei de opinião algumas vezes, e escrever sobre tais mudanças rendeu alguns dos artigos
mais acessados do _blog_.  De [_IDEs vs. editores_](/2018/06/04/eu-me-rendo-vscode.html "Eu me rendo: VS Code"), passando por
[_GraphQL_](/2020/07/01/alem-do-rest-com-graphql.html "Além do REST com GraphQL")
e chegando até mesmo ao uso de [_Java_](/tag/java.html "Leia mais sobre Java"). Agora é a vez de tipagem em [_Python_](/tag/python.html "Leia mais sobre Python").

Nota-se uma "nem tão recente onda" na utilização de tipagem estática. Alimentada por linguagens como _Go_ e _Typescript_, os
argumentos (assim como prós e contras) são dos mais variados, e vem influenciando linguagens amplamente conhecidas
por serem de tipagem dinâmica, como [_Python_](https://realpython.com/python-type-checking/ "Python Type Checking") e
[_Ruby_](https://news.ycombinator.com/item?id=19697405 "Types will be part of Ruby 3").

Mais fundamental que entender o "como", é crucial ficar por dentro da motivação por trás da [_PEP 484_](https://www.python.org/dev/peps/pep-0484/ "Type hints").
Vamos viajar um pouquinho no tempo e tentar compreender o "por quê".

## No meu tempo é que era bom

Conheci o _Python_ lá pelos idos de 2009, e [venho falando sobre a linguagem desde então](https://pt.slideshare.net/kplaube/python-7648643 "Slideshare: Python").
Sempre posso contar com o [artigo do _Wikipedia_](https://pt.wikipedia.org/wiki/Python "Wikipedia - Python") para definir a linguagem com os atributos que mais admiro:

> Python é uma linguagem de programação de alto nível, interpretada, de script, imperativa, orientada a objetos, funcional, de tipagem dinâmica e forte.

E sem mais rodeios, abrimos o nosso primeiro parênteses.

### Tipagem dinâmica e forte

_Python_, [_PHP_](/tag/php.html "Leia mais sobre PHP"), _Javascript_ e _Ruby_ tem algo em comum: Elas são linguagens de tipagem dinâmica. Em outras palavras,
elas são capazes de escolher o tipo de dado de acordo com o valor que está sendo atribuído a uma variável:

```python
a = "foo"

a = 1
b = 2
print(a + b)  # 3
```

Ao contrário de linguagens com tipagem estática, como o _Java_; onde uma vez que a variável esteja setada com o seu respectivo tipo,
não podemos mais alterá-lo:

```java
public class MyClass {
    public static void main(String args[]) {
        String a = "foo";
        a = 1;  // TypeError
    }
}
```

Mesmo se utilizarmos recursos mais modernos, como a inferência de tipo, ainda assim estamos sujeitos à tipagem estática:

```java
public class MyClass {
    public static void main(String args[]) {
        var a = "foo";
        a = 1;  // TypeError
    }
}
```

O _Javascript_ é um exemplo de linguagem com tipagem fraca. Com ela somos capazes de misturar tipos sem
maiores restrições, e contar com conversões realizadas automaticamente pela linguagem, como no exemplo abaixo:

```javascript
var a = "foo";
var b = 2;

console.log(a + b); // foo2
```

O mesmo não acontece com o _Python_, que tem por característica a tipagem forte, sendo assim
mais restritivo com esse tipo de operação:

```python
a = "foo"
b = 2

print(a + b)  # TypeError: can only concatenate str (not "int") to str
```

Tipagem dinâmica e forte foram duas das características
mais apaixonantes do _Python_. A linguagem estava me ajudando a ser mais coerente com o _design_ do código,
e com isso, me dando uma camada a mais de segurança (e por consequência, qualidade).

### Type hints

A primeira vez que ouvi falar sobre tipagem estática em _Python_, foi por volta de 2016. Segundo o
["Our journey to type checking 4 million lines of Python"](https://dropbox.tech/application/our-journey-to-type-checking-4-million-lines-of-python "Leia o artigo no Dropbox.Tech"),
no ano anterior (com o _Python 3.5_) era lançada a _PEP 484_.

Essa _Python Enhancement Proposal_ oficializava a proposta de _Jukka Lehtosalo_ para o uso de tipos em _Python_. A diferença
aqui, em relação a outras linguagens, é que utilizamos anotações para sugerir qual tipo uma variável ou parâmetro receberá (chamadas de _type hints_):

```python
def greeting(name: str) -> str:
    return 'Hello ' + name
```

Por anotações entende-se que estamos sugerindo ao **programador**, e não ao **intepretador**, quais são os tipos.
De fato, o interpretador ignora tais instruções e [elas não tem efeito no código rodando](https://stackoverflow.com/questions/41692473/does-python-type-hint-annotations-cause-some-run-time-effects#:~:text=2%20Answers,-2&text=Type%20hints%20and%20annotations%20do,way%20that%20comments%20don't. "Leia a thread no Stackoverflow").

Na época, o _mypy_ não era essa _lib_ bem estabelecida que é hoje. Conceitos e ferramentas ao redor desse tópico
ainda eram confusos, e o mesmo gerava debates acalorados.

## Static type é cool novamente

Quantas vezes você já precisou abrir uma função para compreender o que exatamente ela retornava? Quantos
_Docstrings_ você leu, dando dicas de tipos de parâmetros e retorno? Quantos `print` e `pdb.set_trace()` para
entender a razão de um atributo de instância estar disparando algum erro de tipo ou chave?

À medida que o seu projeto vai crescendo em tamanho e complexidade, a ausência de tipos começa a afetar a qualidade do mesmo,
pelo menos é isso que afirma _Dustin Ingram_ no _talk_ [_Static Typing in Python_](https://www.youtube.com/watch?v=ST33zDM9vOE "Veja no Youtube"):

![Gráfico com a complexidade subindo ao aumentar linhas de código](/media/type-hint.png "Quando migrar para Type Hint (youtube.com)")

Se você tiver 28 minutos, dê uma pausa neste artigo e confira a apresentação na íntegra:

<iframe src="https://www.youtube.com/embed/ST33zDM9vOE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Há o argumento de que se o código fosse claro, seguindo padrões e boas práticas, não precisaríamos de tais artifícios. Acho
difícil discordar dessa afirmação. Tão difícil quanto encontrar tal código.

[Código legível é subjetivo](https://trishagee.com/2020/09/07/reading-code-is-a-skill/ "Reading code is a skill"), enquanto
que tipagem estática serve como uma forma de documentação e (supostamente) auxilia na manutenibilidade de _software_.
Esse é um dos argumentos apresentados
no _paper_ ["_An empirical study on the impact of static typing on software maintainability_"](https://www.researchgate.net/publication/259634489_An_empirical_study_on_the_impact_of_static_typing_on_software_maintainability "Leia a pesquisa na íntegra").

Em suma, com o passar do tempo, fazendo parte de grandes projetos _front-end_ em _React_, e utilizando de tipagem para entender
o que estava acontecendo, eu enxergo e entendo o argumento a favor do uso de _type hints_ em _Python_.

## Como faz?

A melhor forma de começar é através do [_mypy_](http://mypy-lang.org "Optional static type checker for Python"):

```shell
pip install mypy
```

O próximo passo é adicionar as anotações ao código, indicando os tipos:

```python
# calculadora.py

def soma(a: int, b: int) -> int:
    return a + b

result = soma(2.5, 1)
print(result)
```

Anotamos os parâmetros da função através de `: int`, e o retorno com `-> int`. Com o utilitário de linha
de comando executamos a checagem:

```text
$ mypy calculadora.py

Success: no issues found in 1 source file
```

Se alterarmos um dos parâmetros passados para `float`, o `mypy` nos alertará que há uma inconsistência:

```text
$ mypy calculadora.py

calculadora.py:5: error: Argument 1 to "soma" has incompatible type "float"; expected "int"
Found 1 error in 1 file (checked 1 source file)
```

Mas ainda assim será possível executar o código sem problemas.

### VS Code

Com o [_VS Code_](/tag/vscode.html "Leia mais sobre VS Code") e
o [_plugin Python_](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
instalado, basta o interpretador configurado ter acesso ao _mypy_, ou que você explicitamente
passe o caminho do executável nas configurações do editor:

![Interface do VS Code mostrando um erro de tipo](/media/type-hint-vscode.png "Como o erro do mypy é exibido no VS Code")

[Leia mais sobre como configurar o Mypy com VS Code](https://code.visualstudio.com/docs/python/linting#_mypy).

### Vim

No [_Vim_](/tag/vim.html "Leia mais sobre Vim") há diferentes alternativas. Talvez a forma mais simples
e prática seja com o uso do [_vim-ale_](https://github.com/dense-analysis/ale "Veja o repositório no Github").

Caso você se aventure pelo mundo do [_LSP_](/tag/lsp.html "Leia mais sobre Language Server Protocol"),
uma combinação interessante é a do [_vim-lsp_](https://github.com/prabirshrestha/vim-lsp "LSP com Vim") +
[_Python Language Server_](https://github.com/python-lsp/python-lsp-server "Acesse o repositório no GitHub"):

```text
pip install pip install python-lsp-server pylsp-mypy
```

![Interface do Vim mostrando um erro de tipo](/media/type-hint-vim.png "Como o erro do mypy é exibido no vim com vim-lsp")

## Considerações finais

Volto a mencionar a minha experiência em um projeto complexo em _Javascript_: Ter os tipos declarados e explícitos foi de muita ajuda,
e sem dúvida acelerou o desenvolvimento e o _onboarding_ de novos membros à equipe com o passar do tempo. Não é tão difícil de enxergar as vantagens por esses termos.

Mas o debate sobre _Python_ em si ser um bom candidato a esse tipo de prática é muito válido. Fazendo um contraponto ao parágrafo acima,
um código bem escrito poderia sim ser o suficiente para resolver alguns dos problemas que estamos tentando resolver com _type hint_.

Eu ainda trocaria um código **mal escrito** por um **bem escrito**, ao invés de um **mal escrito** por um **mal escrito com type hints**.

Em cima do muro 🙂

Quem sabe no próximo grande projeto...

Até a próxima.


## Referência

- [dev.to - Does Python need types?](https://dev.to/tusharsadhwani/does-python-need-types-59if)
- [dev.to - The comprehensive guide to mypy](https://dev.to/tusharsadhwani/the-comprehensive-guide-to-mypy-561m)
- [PEP 484 - Type hints](https://www.python.org/dev/peps/pep-0484/)
- [ResearchGate - An empirical study on the impact of static typing on software maintainability](https://www.researchgate.net/publication/259634489_An_empirical_study_on_the_impact_of_static_typing_on_software_maintainability)
- [TreinaWeb - Quais as diferenças entre tipagens: estática ou dinâmica e forte ou fraca](https://www.treinaweb.com.br/blog/quais-as-diferencas-entre-tipagens-estatica-ou-dinamica-e-forte-ou-fraca/)
- [Wikipedia - Python](https://pt.wikipedia.org/wiki/Python)
