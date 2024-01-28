---
title: "CSS3: Cantos arredondados, sombras e degradês até no IE"
date: 2010-12-27 13:00
modified: 2023-10-04 15:58
tags:
  [
    "desenvolvimento-web",
    "padroes-web",
    "css3",
    "graceful-degradation",
    "html5",
  ]
slug: css3-cantos-arredondados-sombras-degrades-ate
thumbnail: /media/css3-logo.png
---

Enquanto o [movimento em prol do HTML5 ganha cada vez mais força][], o
que podemos falar do [*CSS3*][]?

Para a nossa felicidade, _Opera_, _Safari_, _Google Chrome_, _Firefox_ e
(o polêmico) _IE9_ já apresentam (ou apresentarão, no caso do _IE_) bom
suporte às principais propriedades do _CSS3_. Mas vale ressaltar que,
assim como o [*HTML5*][] o _CSS3_ é apenas um “draft“, com os navegadores
suportando algumas características através de expressões proprietárias
(então a cautela neste caso também é necessária).

Isto pode (e deve) ser encarado de uma forma muito negativa. Mas temos
que entender que estas expressões proprietárias estão calcadas em
especificações do _W3C_, ou seja, é bem provável que o `border-radius`
do _Firefox_ (realizado através da expressão `-moz-border-radius`) irá
reproduzir um efeito similar ao `border-radius` do _Chrome_ (que já
segue a especificação do _W3C_). A dica que eu dou é a seguinte: Utilize
[*Graceful Degradation*][], ou seja, escreva seus estilos com
_CSS3_, e vá **adicionando exceções para suportar os demais
navegadores** que não suportam certas propriedades.

Vamos ao que interessa?!

## CSS3 Please!

O site [*CSS3 Please! The Cross-Browser CSS3 Rule Generator*][] nos
ensina como fazer `border-radius`, `box-shadow`, `transform`,
`transition`, `text-shadow` e `font-face`; de forma muito simples
e prática, e que funcione no _Safari_, _Chrome_, _Opera_ e _Firefox_ (e
algumas propriedades até no _IE_).

É uma referência muito interessante que deve estar sempre disponível
para quando bater aquela dúvida. Podemos reparar que são (na maioria dos
casos) expressões proprietárias, mas que atingem a experiência obtida
utilizando uma expressão _standard_ (como no caso do `border-radius`).

## CSS3 PIE

O _CSS3 Please!_ já quebra um bom galho na utilização de alguns recursos
do _CSS3_. Mas no caso do _IE_, algumas propriedades como
`border-radius` e `box-shadow` (que no meu caso são as propriedades
mais “salva-vidas” da linguagem) não possuem alternativas.

O site [*CSS3 PIE*][] apresenta uma forma de utilizar estas propriedades
sem precisar utilizar _PNGs_ com transparência. Através de um arquivo
**.htc** importado na folha de estilo, podemos fazer com que o _IE_ (do
6 ao 8 ) possa compreender as seguintes propriedades:

- border-radius
- box-shadow
- border-image
- Múltiplas imagens de fundo (background images)
- Gradiente como fundo (linear-gradient as background image)

Já é uma boa economia de trabalho, não?

## jQuery e Graceful Degradation

Recentemente o _Tableless_ fez um [excelente *post*][] sobre como usar a
[*jQuery*][] como meio de fazer alguns navegadores lidarem da melhor
forma possível com novos recursos do _CSS3_ e _HTML5_. Sempre fui muito
a favor da visão deles e dessa vez não será diferente.

Nivelar por baixo pode ser uma excelente forma de garantir
acessibilidade. Mas não é pecado “vendermos” um pouco de “boa
experiência” para nossos usuários.

Enriquecer a experiência do usuário não é crime, mas esquecer da
acessibilidade sim.

[movimento em prol do html5 ganha cada vez mais força]: /2010/11/13/usando-html5-sem-medo.html "Usando o HTML5 sem medo"
[*css3*]: /tag/css3.html "Leia mais sobre CSS3"
[*html5*]: /tag/html5.html "Leia mais sobre HTML5"
[*graceful degradation*]: http://www.tableless.com.br/graceful-degradation-e-tudo-sobre-acessibilidade "Graceful degradation é tudo sobre Acessibilidade"
[*css3 please! the cross-browser css3 rule generator*]: http://css3please.com/ "Saiba como fazer CSS3 Cross-Browser"
[*css3 pie*]: http://css3pie.com/ "CSS3 decorations for IE"
[excelente *post*]: http://www.tableless.com.br/jquery-para-layouts "jQuery para produção de layouts"
[*jquery*]: /tag/jquery.html
