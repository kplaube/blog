Title: Fazendo Javascript OO de forma fácil - Parte 2
Date: 2016-03-15 13:20
Category: desenvolvimento
Tags: desenvolvimento, web, javascript, es6, oop
Slug: fazendo-javascript-oo-de-forma-facil-parte-2
meta_description: Vamos voltar ao assunto de Javascript OOP e explorar a sintaxe do ES6 para a construção de classes e objetos.


{% img representative-image /images/blog/javascript-logo.png 180 180 Logotipo do Javascript %}

Há cerca de 5 anos, fiz um *post* sobre como escrever
[Javascript OO de forma fácil]({filename}fazendo-javascript-oo-de-forma-facil.md "Leia o artigo completo")
utilizando a orientação a objetos da linguagem através de
[*Constructor Functions* e *Object Literal*]({filename}javascript-a-diferenca-entre-constructor-function-e-object-literal.md "Diferença entre Constructor Function e Object Literal").
Hoje, com o *ES6*, o esquema de *Prototype* ainda continua,
mas a sintaxe ficou muito mais fácil e intuitiva, valendo a pena dar um *revival*
no tema para explorar um pouquinho mais das novas funcionalidades.

<!-- PELICAN_END_SUMMARY -->

Então, nobre leitor, prepare o seu [*Babel*](https://babeljs.io/ "Javascript compiler") e vamos escrever algumas classes
na nova sintaxe do [*Javascript*]({tag}javascript "Leia mais sobre Javascript").

## Açúcares sintáticos

Sim! A sintaxe apresentada no *ECMAScript 6* não passa de açúcar sintático!

Na prática, o *Javascript* continua utilizando a orientação a objetos através de
*Prototype*. Mas isso não diminui em nada o valor desse *approach* para com a
linguagem. Fazer *Javascript* OOP é a realidade de muitas aplicações
(complexas ou não), e caso você queira escrever componentes utilizando *React*,
verá que a dupla *ES6* + *React* é capaz de produzir componentes com código
extremamente legível e elegante.

Vamos começar escrevendo nossa classe `Pessoa`:

    ::javascript
    class Pessoa {
      constructor({nome, idade}) {
        this.nome = nome
        this.idade = idade
      }

      sayTheName() {
        console.log(this.nome);
      }
    }

    let pessoa = new Pessoa({idade:18, nome:'Guido'});
    pessoa.sayTheName(); // Guido
    console.log(pessoa.__proto__.sayTheName); // function sayTheName

Agora possuímos a palavra reservada `class` para a construção de classes. Além
disso, temos a inserção do método `constructor`, que será executado no momento em que
a instância for criada.

Não precisamos mais da assinatura `Pessoa.prototype.method = function`
para adicionarmos um método. Agora há uma sintaxe específica, muito mais clara
e fácil de lembrar.

{% img align-center /images/blog/stay-classy.jpeg 600 345 Stay classy San Diego! (sandiegouniontribune.com) %}

Note que no momento de instanciar a classe, nada muda em relação à versão atual.
O que temos de mais "exótico" é a capacidade de nomearmos parâmetros
(como os `**kwargs` do [*Python*]({tag}python "Leia mais sobre Python")),
na definição do construtor.

Esse conceito, apresentado na linha `constructor({nome, idade})`, é chamado de
[*destructuring*](https://github.com/lukehoban/es6features#destructuring).

Para chegarmos a um resultado parecido no *ES5*, precisaríamos fazer o seguinte:

    ::javascript
    var Pessoa = function Pessoa(options) {
      var nome = options.nome;
      var idade = options.idade;

      this.nome = nome;
      this.idade = idade;
    };

## Herança

Lembra da confusão que era fazer heranças no *Javascript*? Pois bem, ganhamos
nessa nova versão da linguagem a palavra reservada `extends`:

    ::javascript
    class Atleta extends Pessoa {
      constructor({nome, idade, esporte='Basquete'}) {
        super({nome: nome, idade: idade})

        this.esporte = esporte
      }
    }

    let jogador = new Atleta({idade: 22, nome: 'Fulano', esporte: 'Futebol'})
    console.log(jogador.nome); // Fulano
    console.log(jogador.esporte); // Futebol

    let jogador2 = new Atleta({idade: 28, nome: 'Beltrano'});
    console.log(jogador2.nome); // Beltrano
    console.log(jogador2.esporte); // Basquete

E para tornar ainda mais fácil essa prática, também ganhamos a função reservada
`super`, que é responsável por executar o método pai, dada a chamada em um
determinado método de uma classe filha.

Para finalizar o nosso exemplo, na linha `constructor({nome, idade, esporte='Basquete'})`
temos a apresentação do recurso [*default*](https://github.com/lukehoban/es6features#default--rest--spread "Leia mais sobre default, rest e spread").
Com ele, somos capazes de definir valores padrões caso a passagem de determinado
parâmetro seja omitida.

## Considerações finais

Se tem algo que chama a atenção com o advento do *ECMAScript 6* é a facilidade
na construção de classes e objetos, uma coisa que sempre foi muito confusa
(mas não menos eficiente) em *Javascript*.

Bibliotecas como o *React* tem feito um bom uso desse recurso, proporcionando
soluções limpas e legíveis, fáceis de estender e customizar.

O suporte pelos *browsers* ainda não é dos melhores, se fazendo necessário
o uso do *Babel* para o *transpiling* de *ES6* para *ES5*. Mesmo assim, nada
que impeça o uso de sintaxe *ES6* nos seus próximos projetos.

Confira a [versão "transpilada" no *Babel*](https://babeljs.io/repl/#?evaluate=true&presets=es2015%2Cstage-2&code=class%20Pessoa%20%7B%0A%20%20constructor(%7Bnome%2C%20idade%7D)%20%7B%0A%20%20%20%20this.nome%20%3D%20nome%0A%20%20%20%20this.idade%20%3D%20idade%0A%20%20%7D%0A%20%20%0A%20%20sayTheName()%20%7B%0A%20%20%20%20console.log(this.nome)%3B%0A%20%20%7D%0A%7D%0A%0Alet%20pessoa%20%3D%20new%20Pessoa(%7Bidade%3A18%2C%20nome%3A'Guido'%7D)%3B%0Apessoa.sayTheName()%3B%20%2F%2F%20Guido%0Aconsole.log(pessoa.__proto__.sayTheName)%3B%20%2F%2F%20function%20sayTheName%0A%0Aclass%20Atleta%20extends%20Pessoa%20%7B%0A%20%20constructor(%7Bnome%2C%20idade%2C%20esporte%3D%22Basquete%22%7D)%20%7B%0A%20%20%20%20super(%7Bnome%2C%20idade%7D)%0A%0A%20%20%20%20this.esporte%20%3D%20esporte%0A%20%20%7D%0A%7D%0A%0Alet%20jogador%20%3D%20new%20Atleta(%7Bidade%3A%2022%2C%20nome%3A'Fulano'%2C%20esporte%3A'Futebol'%7D)%0Aconsole.log(jogador.nome)%3B%20%2F%2F%20Fulano%0Aconsole.log(jogador.esporte)%3B%20%2F%2F%20Futebol%0A%0Alet%20jogador2%20%3D%20new%20Atleta(%7Bidade%3A%2028%2C%20nome%3A%20'Beltrano'%7D)%3B%0Aconsole.log(jogador2.nome)%3B%20%2F%2F%20Beltrano%0Aconsole.log(jogador2.esporte)%3B%20%2F%2F%20Basquete "Veja o código transpilado no Babel").

Até a próxima!

## Referências

* [*2ality - Getting started with ECMAScript 6*](http://www.2ality.com/2015/08/getting-started-es6.html)
* [*lukehoban - Overview of ECMAScript 6 features*](https://github.com/lukehoban/es6features)
