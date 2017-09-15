Title: CSS3: Cantos arredondados, sombras e degradês até no IE
Date: 2010-12-27 13:00
Category: desenvolvimento
Tags: desenvolvimento, web, padroes-web, css3, graceful-degradation, html5
Slug: css3-cantos-arredondados-sombras-degrades-ate
meta_description: CSS3 permite fazer cantos arredondados, sombras e degradês. É possível fazê-los também no Internet Explorer.


{% img align-left /images/blog/css3-logo.png 180 180 Logotipo do CSS3 %}
Olá pessoas!

Enquanto o [movimento em prol do HTML5 ganha cada vez mais força][], o
que podemos falar da [*CSS3*][]?

Para a nossa felicidade, *Opera*, *Safari*, *Google Chrome*, *Firefox* e
(o polêmico) *IE9* já apresentam (ou apresentarão, no caso do *IE*) bom
suporte às principais propriedades do *CSS3*. Mas vale ressaltar que,
assim como o [*HTML5*][] o *CSS3* é apenas um “draft“… os navegadores
suportam algumas características através de expressões proprietárias
(então a cautela neste caso também é necessária).

<!-- PELICAN_END_SUMMARY -->

Isto pode (e deve) ser encarado de uma forma muito negativa. Mas temos
que entender que estas expressões proprietárias estão calcadas em
especificações do *W3C*, ou seja, é bem provável que o **border-radius**
do *Firefox* (realizado através da expressão “-moz-border-radius“) irá
reproduzir um efeito similar ao **border-radius** do *Chrome* (que já
segue a especificação do *W3C*). A dica que eu dou é a seguinte: Utilize
[*Graceful Degradation*][], ou seja, **escreva seus estilos com
_CSS3_**, e vá **adicionando exceções para suportar os demais
navegadores** que não suportam certas propriedades.

Vamos ao que interessa?!


CSS3 Please!
------------

O site [*CSS3 Please! The Cross-Browser CSS3 Rule Generator*][] nos
ensina como fazer **border-radius**, **box-shadow**, **transform**,
**transition**, **text-shadow** e **font-face**; de forma muito simples
e prática, e que funcione no *Safari*, *Chrome*, *Opera* e *Firefox* (e
algumas propriedades até no *IE*).

É uma referência muito interessante que deve estar sempre disponível
para quando bater aquela dúvida. Podemos reparar que são (na maioria dos
casos) expressões proprietárias, mas que atingem a experiência obtida
utilizando uma expressão *standard* (como no caso do **border-radius**).


CSS3 PIE
----------------------------------

O *CSS3 Please!* já quebra um bom galho na utilização de alguns recursos
da *CSS3*. Mas no caso do *IE*, algumas propriedades como
**border-radius** e **box-shadow** (que no meu caso são as propriedades
mais “salva-vidas” da *CSS3*) não possuem alternativas.

O site [*CSS3 PIE*][] apresenta uma forma de utilizar estas propriedades
sem precisar utilizar *PNGs* com transparência. Através de um arquivo
**.htc** importado na folha de estilo, podemos fazer com que o *IE* (do
6 ao 8 ) possa compreender as seguintes propriedades:

* border-radius
* box-shadow
* border-image
* Múltiplas imagens de fundo (background images)
* Gradiente como fundo (linear-gradient as background image)

Já é uma boa economia de trabalho, não?


jQuery e Graceful Degradation
-----------------------------

Recentemente o *Tableless* fez um [excelente *post*][] sobre como usar a
[*jQuery*][] como meio de fazer alguns navegadores lidarem da melhor
forma possível com novos recursos da *CSS3* e *HTML5*. Sempre fui muito
a favor da visão deles e dessa vez não será diferente.

Nivelar por baixo pode ser uma excelente forma de garantir
acessibilidade. Mas não é pecado “vendermos” um pouco de “boa
experiência” para nossos usuários.

Enriquecer a experiência do usuário não é crime… esquecer da
acessibilidade sim.


  [movimento em prol do HTML5 ganha cada vez mais força]: {filename}usando-o-html5-sem-medo.md
    "Usando o HTML5 sem medo"
  [*CSS3*]: {tag}css3 "Leia mais sobre CSS3"
  [*HTML5*]: {tag}html5 "Leia mais sobre HTML5"
  [*Graceful Degradation*]: http://www.tableless.com.br/graceful-degradation-e-tudo-sobre-acessibilidade
    "Graceful degradation é tudo sobre Acessibilidade"
  [*CSS3 Please! The Cross-Browser CSS3 Rule Generator*]: http://css3please.com/
    "Saiba como fazer CSS3 Cross-Browser"
  [*CSS3 PIE*]: http://css3pie.com/ "CSS3 decorations for IE"
  [excelente *post*]: http://www.tableless.com.br/jquery-para-layouts
    "jQuery para produção de layouts"
  [*jQuery*]: {tag}jquery
