Title: Eu me rendo: Material Design
Date: 2017-04-19 12:00:00
Category: desenvolvimento
Tags: desenvolvimento, web, mobile, android, css, material-design, materializecss, material-design-lite, eu-me-rendo
Slug: eu-me-rendo-material-design
meta_description: O Material Design é uma iniciativa do Google para ter uma linguagem visual concisa em diferentes ambientes. Você sabia que é possível utilizar o Material em sua web app sem muito esforço?

{% img representative-image /images/blog/mdl-logo.png 180 180 Logotipo do MDL %}

Lembro como se fosse hoje de um camarada dos tempos de *Globo.com* me falando de
modo efusivo: Você deveria experimentar o *MaterializeCSS*, vai te poupar muito
tempo e te entregar uma interface elegante; Na época eu estava munido da minha
ignorância, e acabei não seguindo o conselho do nobre amigo.

<!-- PELICAN_END_SUMMARY -->

Pouco tempo se passou, e entrei em um projeto muito importante da empresa. Nele,
houve um complexo trabalho por parte do time de estratégia e de *UX* para determinar
a arquitetura da informação e *design*. Imagine a minha surpresa quando descobri que o
*Material Design* foi usado como base para uma série de decisões tomadas. Uma luz amarela
acendeu-se em minha cabeça, mas ainda não tinha sido o suficiente para saber mais.

Finalmente, ao inscrever-me no [*Nanodegree* de *Android* do *Udacity*](https://br.udacity.com/course/android-basics-nanodegree-by-google--nd803/ "Android Basics"),
que eu desisti e me rendi ao *Material Design*.

## O Material Design

Diretamente do [material.io](http://material.io "Visite o site oficial"):

> Material Design is a unified system that combines theory, resources, and tools for crafting digital experiences.

Em uma definição mais descritiva, podemos dizer que o *Material Design* é
uma completíssima "linguagem de design". Criado a partir de um profundo estudo de
*branding*, *interaction* e *motion*, o *Material* é uma compilação de estilos
e princípios que funcionam consistentemente em diferentes soluções.

Com sua origem no universo *Mobile* da *Google*, a partir da versão 2.1 do
*Android*, hoje é possível apreciarmos o *Material Design* sendo utilizado
também em soluções *Web*. Existem duas bibliotecas bem-quistas em "traduzir"
a especificação para os *browsers*: [*MaterializeCSS*](http://materializecss.com/ "Leia mais sobre o Materialize")
e [*Material Design Lite*](https://getmdl.io/index.html "Leia mais sobre o MDL").

## MaterializeCSS ou Material Design Lite?

Sem rodeios:

* **MaterializeCSS**: Iniciativa *open source*, com mais de 25 mil *stars* no
[*Github*](https://github.com/dogfalo/materialize/ "Veja o repositório"). Possui como dependência o *jQuery*,
tornando-a uma opção ligeiramente "pesada". Possui uma documentação fácil de ler, mas
infelizmente o seu *showcase* está desatualizado.
* **MDL**: A biblioteca "oficial" da *Google*. Também *open source*, com cerca de 26 mil *stars* no
[*Github*](https://github.com/google/material-design-lite), não possui dependência de outras bibliotecas e é
declarada como opção mais fiel às especificações do *Material Design*.

Não vou fazer uma análise profunda entre os dois, pois para ser sincero, só tive
um contato mais íntimo com o *MaterializeCSS*. O que posso dizer é que ambos
cumprem bem a sua proposta (e possuem uma boa camada de customização através de [*Sass*]({tag}sass "Leia mais sobre Sass")),
e (na minha opinião) a biblioteca do *Google* leva certa vantagem por ser ligeiramente
mais leve, não ter o *jQuery* como dependência, e ainda por cima usar
[*BEM*](http://getbem.com/ "Saiba o que é o BEM e como ele pode te ajudar a escrever CSS").

{% img align-center /images/blog/batman-fear-face.jpg 610 407 Ao contrário do Batman, eu me rendi %}

Em defesa do *Materialize*, acho a curva de aprendizagem menor que a do concorrente,
e uma rápida leitura do seu *getting started* já te dá conteúdo o suficiente para ter
as suas primeiras páginas escritas.

Se você deseja uma análise mais completa, recomendo o [*Google release Material Design Lite, time to switch?*](https://andreapaiola.name/2015-07-materialize-css-vs-material-design-lite/)

## Considerações finais

Acredito que ter qualquer uma das duas bibliotecas no seu *toolbox* é recomendado, principalmente
se a sua solução for flertar com o ambiente *Mobile*. Então, no seu próximo projeto, antes
de ir "por padrão" no *Bootstrap* ou *Foundation*, dê uma chance ao *Material*.

Se você estiver usando *React*, o [*Material-UI*](http://www.material-ui.com/) pode
ser uma boa pedida. Para a galera do *Angular*, existe o [*Angular Material*](https://material.angular.io/)
que cumpre bem o seu papel. O *Vue* não fica de fora com o [*Vue Material*](https://vuematerial.github.io/).

Até a próxima.

## Referências

* [*Material Design.io*](https://material.io/)
* [*Material Design Lite*](https://getmdl.io/)
* [*Materialize*](http://materializecss.com/)
* [*MyWay* - *Material Design*: O que é e sua aplicação](https://www.myway.com.br/material-design-o-que-e-e-sua-aplicacao/)
* [*Wikipedia* - *Material Design*](https://pt.wikipedia.org/wiki/Material_Design)
