---
title: "Eu me rendo: Material Design"
date: 2017-04-19 12:00:00
tags:
  [
    "desenvolvimento-web",
    "mobile",
    "android",
    "css",
    "material-design",
    "materializecss",
    "material-design-lite",
    "eu-me-rendo",
  ]
slug: eu-me-rendo-material-design
thumbnail: ./images/mdl-logo.png
serie: "Eu me rendo"
---

Lembro como se fosse hoje de um camarada dos tempos de _Globo.com_ me falando de
modo efusivo: Você deveria experimentar o _MaterializeCSS_, vai te poupar muito
tempo e te entregar uma interface elegante; Na época eu estava munido da minha
ignorância, e acabei não seguindo o conselho do nobre amigo.

Pouco tempo se passou, e entrei em um projeto muito importante da empresa. Nele,
houve um complexo trabalho por parte do time de estratégia e de _UX_ para determinar
a arquitetura da informação e _design_. Imagine a minha surpresa quando descobri que o
_Material Design_ foi usado como base para uma série de decisões tomadas. Uma luz amarela
acendeu-se em minha cabeça, mas ainda não tinha sido o suficiente para saber mais.

Finalmente, ao inscrever-me no [_Nanodegree_ de _Android_ do _Udacity_](https://br.udacity.com/course/android-basics-nanodegree-by-google--nd803/ "Android Basics"),
que eu desisti e me rendi ao _Material Design_.

## O Material Design

Diretamente do [material.io](http://material.io "Visite o site oficial"):

> Material Design is a unified system that combines theory, resources, and tools for crafting digital experiences.

Em uma definição mais descritiva, podemos dizer que o _Material Design_ é
uma completíssima "linguagem de design". Criado a partir de um profundo estudo de
_branding_, _interaction_ e _motion_, o _Material_ é uma compilação de estilos
e princípios que funcionam consistentemente em diferentes soluções.

Com sua origem no universo _Mobile_ da _Google_, a partir da versão 2.1 do
_Android_, hoje é possível apreciarmos o _Material Design_ sendo utilizado
também em soluções _web_. Existem duas bibliotecas bem-quistas em "traduzir"
a especificação para os _browsers_: [_MaterializeCSS_](http://materializecss.com/ "Leia mais sobre o Materialize")
e [_Material Design Lite_](https://getmdl.io/index.html "Leia mais sobre o MDL").

## MaterializeCSS ou Material Design Lite?

Sem rodeios:

- **MaterializeCSS**: Iniciativa _open source_, com mais de 25 mil _stars_ no
  [_Github_](https://github.com/dogfalo/materialize/ "Veja o repositório"). Possui como dependência o _jQuery_,
  tornando-a uma opção ligeiramente "pesada". Possui uma documentação fácil de ler, mas
  infelizmente o seu _showcase_ está desatualizado.
- **MDL**: A biblioteca "oficial" da _Google_. Também _open source_, com cerca de 26 mil _stars_ no
  [_Github_](https://github.com/google/material-design-lite), não possui dependência de outras bibliotecas e é
  declarada como opção mais fiel às especificações do _Material Design_.

Não vou fazer uma análise profunda entre os dois, pois para ser sincero, só tive
um contato mais íntimo com o _MaterializeCSS_. O que posso dizer é que ambos
cumprem bem a sua proposta (e possuem uma boa camada de customização através de [_Sass_](/tag/sass.html "Leia mais sobre Sass")),
e (na minha opinião) a biblioteca do _Google_ leva certa vantagem por ser ligeiramente
mais leve, não ter o _jQuery_ como dependência, e ainda por cima usar
[_BEM_](http://getbem.com/ "Saiba o que é o BEM e como ele pode te ajudar a escrever CSS").

!["Ao contrário do Batman, eu me rendi"](./images/batman-fear-face.jpg "Ao contrário do Batman, eu me rendi")

Em defesa do _Materialize_, acho a curva de aprendizagem menor que a do concorrente,
e uma rápida leitura do seu _getting started_ já te dá conteúdo o suficiente para ter
as suas primeiras páginas escritas.

Se você deseja uma análise mais completa, recomendo o [_Google release Material Design Lite, time to switch?_](https://andreapaiola.name/2015-07-materialize-css-vs-material-design-lite/)

## Considerações finais

Acredito que ter qualquer uma das duas bibliotecas no seu _toolbox_ é recomendado, principalmente
se a sua solução for flertar com o ambiente _Mobile_. Então, no seu próximo projeto, antes
de ir "por padrão" no _Bootstrap_ ou _Foundation_, dê uma chance ao _Material_.

Se você estiver usando _React_, o [_Material-UI_](http://www.material-ui.com/) pode
ser uma boa pedida. Para a galera do _Angular_, existe o [_Angular Material_](https://material.angular.io/)
que cumpre bem o seu papel. O _Vue_ não fica de fora com o [_Vue Material_](https://vuematerial.github.io/).

Até a próxima.

## Referências

- [_Material Design.io_](https://material.io/)
- [_Material Design Lite_](https://getmdl.io/)
- [_Materialize_](http://materializecss.com/)
- [_MyWay_ - _Material Design_: O que é e sua aplicação](https://www.myway.com.br/material-design-o-que-e-e-sua-aplicacao/)
- [_Wikipedia_ - _Material Design_](https://pt.wikipedia.org/wiki/Material_Design)
