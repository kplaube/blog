Title: Fazendo Javascript OO de forma fácil
Date: 2011-05-16 22:27
Category: desenvolvimento
Tags: desenvolvimento, web, javascript, oop
Slug: fazendo-javascript-oo-de-forma-facil


|img "/images/blog/javascript-logo.png" 180 180 "Logotipo do Javascript" "align-left"|
Essa é uma dica valiosa para o pessoal que quer escrever um [*Javascript*][] mais “bonito”.

Embora a linguagem (em sua essência) seja **Orientada a Objetos**, temos
que admitir que ela foge um pouco do convencional através do estilo de
escrita ***prototype***. Quero dizer que, é possível utilizarmos
conceitos como encapsulamento, herança, atributos e métodos públicos e
privados, etc. Mas de uma maneira um pouco diferente se comparada a
linguagens como [*Python*][] ou [*PHP*][].

<!-- PELICAN_END_SUMMARY -->


Encapsular para conquistar!
---------------------------

A linguagem é composta por alguns objetos muito utilizados no cotidiano,
como os objetos **Array**, **Math** e **String**. Estes (e outros
[objetos de *core*][]) são instâncias do objeto **Object**, que você
pode representar através da seguinte expressão:

    var meuObjeto = { };
    typeof(meuObjeto); // object
    typeof(Math);      // object

Você encontrará uma forma (muito bacana por sinal) de construir objetos
através de expressões como essas:

    var fooBar = {
        init: function() {
            console.log("Posso funcionar como um inicializador!");
        },
        _private: function(tipo) {
            console.log("Testando chamada " + tipo + ".");
        },
        eggs: function() {
            console.log("Eggs.");
            fooBar._private("interna");
        },
        spam: function(msg) {
            console.log("Spam: " + msg + ".");
        },
    };

    fooBar.init();  // Posso funcionar como um inicializador!
    fooBar.eggs();  // Eggs.

    // Testando chamada interna
    fooBar._private("externa");
    
    // Testando chamada externa
    fooBar.spam("Eggs and Spam");  // Spam: Eggs and Spam

Pode-se observar que é uma prática válida para organizar código através
de namespaces.

**Referência:** [*Using Objects to organize your code*][]


Função ou Classe?
-----------------

Já utilizei algumas vezes o modelo acima… mas devo dizer que sou adepto
a uma outra forma de construirmos classes em *Javascript*:

    var Pessoa = function() {
        console.log("Pessoa instanciada!");
    };

    Pessoa();  // Pessoa instanciada!
    console.log(typeof(Pessoa));   // function
    
    var pessoa1 = new Pessoa();    // Pessoa instanciada!
    console.log(typeof(pessoa1));  // object

No exemplo acima, podemos reparar que seguindo o comportamento normal de
uma função, não há surpresas na execução da expressão *Pessoa*. Porém,
quando adicionamos o operador **new** na frente, o *Javascript* cria uma
instância do tipo *Pessoa*. Basicamente é como se a expressão
**function** fosse “multiuso”, sendo útil para definir funções e
classes.

O mais legal disso é que, como você já deve ter reparado, com o uso do
**new** ganhamos de graça um constructor (ou inicializador, como
preferir) em nossa classe *Pessoa*.

**Referência:** [*Introduction to Object-Oriented Javascript*][]


Métodos, propriedades e um pouco de confusão
--------------------------------------------

Do constructor em diante, já me deparei com algumas vertentes de
implementações do *Javascript*. Já encontrei algumas [bem simples][],
outras [um pouco mais complicadas][] … vou mostrar aqui a que eu
acredito ser a mais usual. Não tenho propriedade para dizer se é o modo
certo ou mais elegante, apenas é o modo que incorpora características de
*OOP* que melhor me atendeu:

    var Linguagem = function(nome, versao) {
        this.nome = nome;
        this.versao = versao;
    };

Acima temos a construção da classe *Linguagem*. Em seu constructor
aproveitamos para setar alguns atributos, como nome e versao, que são
passados imediatamente na hora de instanciá-la.

Para criar um método para esta classe, vamos recorrer ao *prototype* do
*Javascript*:

    Linguagem.prototype.descricaoCompleta = function() {
        return this.nome + " vr. " + this.versao;
    };

Resumidamente, estamos adicionando um método de instância na estrutura
da classe. Fazemos isso adicionando uma função ao *prototype* da classe.
Dessa forma o método terá acesso as propriedades do objeto na hora que
for instanciado.

Se tentarmos executar a expressão **Linguagem.descricaoCompleta**,
iremos nos deparar com um erro de método inexistente. Mas, se
instanciarmos a classe veremos que o método está acessível:

    var python = new Linguagem("Python", "2.7");
    console.log(python);                      // Linguagem
    console.log(python.descricaoCompleta());  // Python vr.2.7

Acima utilizamos o conceito de métodos e atributos de instância. Através
do modelo *Object Literal* podemos ter um comportamento parecido com o
conceito de métodos de classe:

    var Linguagem = function(nome, versao) {
        this.nome = nome;
        this.versao = versao;  // Chamando um método que está fora do prototype da classe
        this.meuId = Linguagem.incId();
    };

    // Adicionando uma propriedade através de Object Literal
    Linguagem.id = 0;

    // Adicionando um método através de Object Literal
    Linguagem.incId = function() {
        this.id++;
        return this.id;
    }
    
    var javascript = new Linguagem("Javascript", "1.5");
    console.log(javascript);        // Linguagem
    console.log(javascript.meuId);  // 1

Esta forma de criar classes e objetos em *Javascript* é executada com
muito sucesso na biblioteca [*RGraph*][].

**Referências:** [*Javascript is Object Oriented Programming*][]


Herdar é preciso
----------------

Para entender como criar heranças com o *prototype* do *Javascript*,
vamos primeiramente criar um tipo chamado *Framework*:


    var Framework = function(nomeFramework, nome, versao) {
        this.nome = nome;
        this.versao = versao;
        this.nomeFramework = nomeFramework;
    };

No caso acima, iremos sobrescrever o comportamento do constructor da
classe *Linguagem*.

E é aqui que a mágica acontece… instanciamos o tipo *Linguagem* no
**prototype** da classe *Framework*. Isto fará com que o tipo
*Framework* possua todas as propriedades de Linguagem. Depois corrigimos
o constructor, apontando ele novamente para *Framework*:

    // Cria herança com Linguagem
    Framework.prototype = new Linguagem();

    // Corrige o ponteiro do constructor para Framework (está apontando para Linguagem)
    Framework.prototype.constructor = Framework;

Vamos adicionar um método exclusivo da classe *Framework*:

    Framework.prototype.feitoEm = function() {
        return this.nomeFramework + " é feito em " + this.nome;
    };

Instanciamos algumas vezes a classe *Framework*, e teremos o
comportamento esperado de uma herança:

    var django = new Framework("Django", "Python", "2.7");

    console.log(django);                      // Framework
    console.log(django.descricaoCompleta());  // Python vr.2.7
    console.log(django.feitoEm());            // Django é feito em Python
    
    var jquery = new Framework("jQuery", "Javascript", "1.5");

    console.log(jquery);                      // Framework
    console.log(jquery.descricaoCompleta());  // jQuery vr.1.5
    console.log(jquery.feitoEm());            // jQuery é feito em Javascript

Existem algumas *frameworks* (como a [*Mootools*][]) que facilitam a
criação de classes e heranças em *Javascript*.

O exemplo completo está disponível para *download* em:
[http://github.com/kplaube/post-javascript-oop][]

Até a próxima…


  [*Javascript*]: |filename|/tag/javascript.html
    "Leia mais sobre Javascript"
  [*Python*]: |filename|/tag/python.html
    "Leia mais sobre Python"
  [*PHP*]: |filename|/tag/php.html "Leia mais sobre PHP"
  [objetos de *core*]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects
    "Veja outros objetos globais da linguagem"
  [*Using Objects to organize your code*]: http://blog.rebeccamurphey.com/2009/10/15/using-objects-to-organize-your-code/
    "Um bom artigo da Rebecca Murphey sobre como organizar seus scripts através de Objects"
  [*Introduction to Object-Oriented Javascript*]: https://developer.mozilla.org/en/Introduction_to_Object-Oriented_JavaScript
    "Excelente artigo da Mozilla ensinando a como representar estados da Orientação a Objetos com Javascript"
  [bem simples]: http://jquery-howto.blogspot.com/2009/01/object-oriented-javascript-how-to_21.html
    "Object-Oriented JavaScript, how to achieve public properties/fields"
  [um pouco mais complicadas]: http://www.coolpage.com/developer/javascript/Correct%20OOP%20for%20Javascript.html
    "Correct OOP for Javascript"
  [*RGraph*]: http://www.rgraph.net/
    "RGraph: HTML5 canvas graph library based on the HTML5 canvas tag "
  [*Javascript is Object Oriented Programming*]: http://weblog.bocoup.com/javascript-is-object-oriented-programming
    "Excelente artigo mostrando os conceitos de OOP aplicados ao Javascript"
  [*Mootools*]: http://mootools.net/
    "MooTools, a compact javascript framework"
  [http://github.com/kplaube/post-javascript-oop]: http://github.com/kplaube/post-javascript-oop
    "Código do exemplo no GitHub"
