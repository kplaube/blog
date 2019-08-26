Title: As pseudo-classes e os pseudo-elementos
Date: 2012-09-05 09:42:49
Category: desenvolvimento
Tags: desenvolvimento, web, padroes-web, css3
Slug: pseudo-classes-e-os-pseudo-elementos
meta_description: O CSS tem diversas coisas legais. Uma quantidade de propriedades, valores, funcionalidades, que por inúmeras vezes me fogem da memória. Uma das coisas mais interessantes do CSS, mas que geralmente me confundem, são as pseudo-classes e os pseudo-elementos.


{% img representative-image /images/blog/css3-logo.png 180 180 Logo do CSS3 %}

O [*CSS*][] tem diversas coisas legais. Uma quantidade
de propriedades, valores e funcionalidades, que por inúmeras vezes me
fogem da memória. Uma das coisas mais interessantes do *CSS*, mas que
geralmente me confunde, são as **pseudo-classes** e os
**pseudo-elementos**.

<!-- PELICAN_END_SUMMARY -->

Então eu resolvi escrever este *post*, e nele vou explicar a diferença e
aplicabilidade dos dois. Espero colaborar com outras mentes tão
preguiçosas na arte da lembrança, quanto a minha :)


Pseudo-classes
--------------

As pseudo-classes são muito úteis para fazermos manipulações
estruturais, ou alterações de estilos de forma dinâmica. Uma forma
interessante de pensarmos sobre pseudo-classes é que o seu resultado
pode ser obtido com [*Javascript*][], através de eventos ou de seletores
(como o **:eq**). Com a ajuda deste artifício, conseguimos entregar uma
solução muito simples e funcional. Exemplo:

    ::css
    #menu a {
        color: blue;
    }
    
    #menu a:hover {
        color: red;
    }

Veja o exemplo no [*jsFiddle*][].

Na demonstração acima, utilizamos a pseudo-classe **:hover** para
alterar a cor do *link* de azul para vermelho. O evento “hover” acontece
quando estamos com o mouse sobre o elemento. Outros eventos podem
acontecer, como o **:active** (quando pressionamos o botão do mouse
sobre o *link*), e **:visited**.

Outro exemplo muito bom, é se precisássemos que apenas o primeiro item
fosse de cor laranja:


    ::css
    #menu li:first-child a {
        color: orange;
    }

Veja o exemplo no [*jsFiddle*][1].

Note que o caso poderia ser resolvido adicionando uma classe “first” ao
primeiro elemento da lista, e atribuindo a propriedade **color** à esta
classe. Mas com o uso de pseudo-classes, é possível economizar todo esse
esforço.


Pseudo-elementos
----------------

Os pseudo-elementos, assim como as pseudo-classes, levam à economia de
esforço, de interpretação de *Javascript*, e de elementos
“não-semânticos”. Por exemplo, queremos que a primeira letra de um
parágrafo ganhe destaque:

    ::html
    <p>
        <span>L</span>orem ipsum dolor sit amet, consectetur
        adipiscing elit. Pellentesque in scelerisque quam...
    </p>

O *CSS* ficaria mais ou menos assim:

    ::css
    p {
        font-size: 14px;
    }

    p span {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 3px;
    }

Veja exemplo no [*jsFiddle*][2].

Podemos alcançar o mesmo resultado, sem necessitar do **span**, através
do pseudo-elemento **first-letter**:

    ::css
    p {
        font-size: 14px;
    }
    
    p::first-letter {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 3px;
    }

Veja o exemplo no [*jsFiddle*][3].

Outros pseudo-elementos interessantes são os clássicos **after** e
**before**, o **first-line** e o **selection**.


Considerações finais
--------------------

Os pseudo-elementos e pseudo-classes não são nenhum “bicho de sete
cabeças”, e podem economizar preciosas linhas de código (e tempo de
processamento do usuário).

Quando bater aquela dúvida sobre qual utilizar, lembre-se: Quando o
resultado pode ser obtido através de uma classe, use pseudo-classes;
Quando o resultado pode ser obtido através de elementos não-semânticos,
use pseudo-elementos.

Até a próxima…


Referências
-----------

* [*Mozilla Developer Network: CSS – Pseudo-classes*][]
* [*Mozilla Developer Network: CSS – Pseudo-elements*][]
* [*Tableless*: Seletor do *CSS* – Pseudo-classes][]


  [*CSS*]: {tag}css3 "Leia mais sobre CSS"
  [*Javascript*]: {tag}javascript
    "Leia mais sobre Javascript"
  [*jsFiddle*]: http://jsfiddle.net/kplaube/vv7Yu/
    "Exemplo de utilização de pseudo-classes"
  [1]: http://jsfiddle.net/kplaube/vv7Yu/3/embedded/result/
    "Exemplo de uso do first-child"
  [2]: http://jsfiddle.net/kplaube/MW5p9/
    "Exemplo com elemento não-semântico"
  [3]: http://jsfiddle.net/kplaube/MW5p9/1/
    "Exemplo com pseudo-elemento"
  [*Mozilla Developer Network: CSS – Pseudo-classes*]: https://developer.mozilla.org/en-US/docs/CSS/Pseudo-classes
    "Página sobre pseudo-classes na MDN"
  [*Mozilla Developer Network: CSS – Pseudo-elements*]: https://developer.mozilla.org/en-US/docs/CSS/Pseudo-elements
    "Página sobre pseudo-elementos na MDN"
  [*Tableless*: Seletor do *CSS* – Pseudo-classes]: http://tableless.com.br/pseudo-classes-css/
    "Artigo no Tableless sobre pseudo-classes no CSS"
