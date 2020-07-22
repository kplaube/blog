---
title: Tipo assim... tipo em Python
date: 2020-07-30 12:00:00
tags: ["python", "typing-hints", "qualidade", "linter", "mypy"]
slug: tipo-assim-tipo-python
thumbnail: ./images/python-logo.png
---

E mais uma vez venho por meio de um _post_ dar o braço a torcer em relação a algum tópico que,
por muito tempo, fui cético, ignorante, ou simplesmente teimoso. De [_IDEs vs. editores_](/2018/06/04/eu-me-rendo-vscode.html "Eu me rendo: VS Code"), passando por
[_GraphQL_](/2020/07/01/alem-do-rest-com-graphql.html "Além do REST com GraphQL")
e chegando até mesmo ao uso de [_Java_](/tag/java.html "Leia mais sobre Java"). Agora é a vez de tipagem em [_Python_](/tag/python.html "Leia mais sobre Python").

Nota-se uma "nem tão recente onda" na utilização de tipagem estática. Alimentada por linguagens como _Go_ e _Typescript_, os
argumentos (assim como prós e contras) são dos mais variados, e vem influenciando (direta ou indiretamente) linguagens amplamente conhecidas
por serem de tipagem dinâmica, como [_Python_](https://realpython.com/python-type-checking/ "Python Type Checking") e
[_Ruby_](https://news.ycombinator.com/item?id=19697405 "Types will be part of Ruby 3").

Mais fundamental que entender o "como", é crucial ficar por dentro da motivação por trás da [_PEP 484_](https://www.python.org/dev/peps/pep-0484/ "Type hints").
Vamos viajar um pouquinho no tempo e tentar compreender o "por quê".

## No meu tempo é que era bom

Conheci o _Python_ lá pelos idos de 2009, e [venho falando sobre a linguagem desde então](https://pt.slideshare.net/kplaube/python-7648643 "Slideshare: Python").
E sempre posso contar com o [artigo do _Wikipedia_](https://pt.wikipedia.org/wiki/Python "Wikipedia - Python") para definir a linguagem com os atributos que mais me identifico:

> Python é uma linguagem de programação de alto nível, interpretada, de script, imperativa, orientada a objetos, funcional, de tipagem dinâmica e forte.

E sem mais rodeios, abrimos o nosso primeiro parênteses.

### Tipagem dinâmica e forte

_Python_, _PHP_, _Javascript_ e _Ruby_ tem algo em comum: Elas são linguagens de tipagem dinâmica. Em outras palavras,
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

O _Javascript_ é um exemplo de linguagem com tipagem fraca. Com ela, somos capazes de misturar tipos sem
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

Depois de passar alguns anos com _Javascript_ e _PHP_, tipagem dinâmica e forte foram duas das características
mais apaixonantes do _Python_. A linguagem estava me ajudando a ser mais coerente com o _design_ do código,
e com isso, me dando uma camada a mais de segurança (e por consequência, qualidade).

### Type hints

A primeira vez que ouvi falar sobre tipagem estática em _Python_, foi por volta de 2016. Segundo o
["Our journey to type checking 4 million lines of Python"](https://dropbox.tech/application/our-journey-to-type-checking-4-million-lines-of-python "Leia o artigo no Dropbox.Tech"),
no ano anterior (com o _Python 3.5_) era lançada a _PEP 484_.

Essa _Python Enhancement Proposal_ oficializava a proposta de _Jukka Lehtosalo_ para o uso de tipos em _Python_. A diferença
aqui, em relação a outras linguagem, é que utilizamos anotações para sugerir qual tipo uma variável ou parâmetro receberá (chamadas de _type hints_):

```python
def greeting(name: str) -> str:
    return 'Hello ' + name
```

Por anotações entende-se que estamos sugerindo ao **programador**, e não ao **intepretador**, quais são os tipos.
De fato, o interpretador ignora tais instruções e [elas não tem efeito no código rodando](https://stackoverflow.com/questions/41692473/does-python-type-hint-annotations-cause-some-run-time-effects#:~:text=2%20Answers,-2&text=Type%20hints%20and%20annotations%20do,way%20that%20comments%20don't. "Leia a thread no Stackoverflow").

Na época, o _mypy_ não era essa _lib_ bem estabelecida que é hoje. Conceitos e ferramentas ao redor desse tópico
ainda eram confusos, e o mesmo gerava debates acalorados.

Nem preciso dizer que fui um dos programadores que logo de cara torceu o nariz.

## Os tempos são outros

Quantas vezes você já precisou abrir uma função para compreender o que exatamente ela retornava? Quantos
_Docstrings_ você leu, dando dicas de tipos de parâmetros e retorno? Quantos `print` e `pdb.set_trace()` para
entender a razão de um atributo de instância estar disparando algum erro de tipo ou chave?

À medida que o seu projeto vai crescendo em tamanho e complexidade, a ausência de tipos começa a afetar a qualidade do seu projeto,
como afirma Joãozinho, no talk de Pycon 2020 Tipos em Python:

Imagem

Se você tiver 28 minutos, e o Inglês estiver afiado, dê uma pausa neste artigo e confira a apresentação na íntegra:

Youtube

Tipagem estática serve como uma excelente forma de documentação. Pelo menos esse é um dos argumentos apresentados e explorados
no _paper_ ["_An empirical study on the impact of static typingon software maintainability_"](https://www.researchgate.net/publication/259634489_An_empirical_study_on_the_impact_of_static_typing_on_software_maintainability "Leia a pesquisa na íntegra").

## Como faz?

## Referências

- [PEP 484 - Type hints](https://www.python.org/dev/peps/pep-0484/)
- [TreinaWeb - Quais as diferenças entre tipagens: estática ou dinâmica e forte ou fraca](https://www.treinaweb.com.br/blog/quais-as-diferencas-entre-tipagens-estatica-ou-dinamica-e-forte-ou-fraca/)
- [Wikipedia - Python](https://pt.wikipedia.org/wiki/Python)

https://www.researchgate.net/publication/259634489_An_empirical_study_on_the_impact_of_static_typing_on_software_maintainability
