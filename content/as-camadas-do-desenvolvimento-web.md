Title: As camadas do desenvolvimento Web
Date: 2011-02-16 16:09
Category: desenvolvimento
Tags: desenvolvimento, web, html, css, javascript, acessibilidade
Slug: camadas-desenvolvimento-web


|img "/images/blog/www.jpg" 180 179 "World Wide Web" "align-left"|
Se eu aprendi alguma coisa com o *xHTML*, foi:
**Separar marcação, estilos e comportamento tornam a sua vida muito mais
feliz**.

Assim como tratando-se de [acessibilidade][], quando falamos em “camadas
de desenvolvimento [*Web*][]“, estamos (a grosso modo) falando de
semântica. E nisso, o [*HTML5*][] vem nos presenteando com *tags*
supimpas como a **section** e **article**.

Vamos conhecer um pouco mais sobre desenvolvimento e padrões Web?

<!-- PELICAN_END_SUMMARY -->


Marcação com uma boa dose de semântica
--------------------------------------

|img "/images/blog/html-icon.png" 180 180 "Representação de documentos HTML" "align-left"|
Algumas referências vão chamar esta camada de “marcação”, outras vão direto ao
ponto chamando-a de “informação”. Eu gosto de pensar que é através da **marcação**
que damos significado a **informação**.

Este conceito foi fortemente utilizado no *xHTML* (devido ao seu vínculo
com o próprio *XML*). Para dar significado a nossa informação através de
hipertexto, utilizamos o *HTML* … e nada mais!

É nesta camada que “diremos” às máquinas que determinada parte da nossa
informação é mais relevante que a outra, que determinado bloco na
verdade é um conjunto de meta-informação ou que o bloco no fim do
arquivo contém informações menos relevantes. Sendo mais minucioso, é
nesta camada que diremos o que é um parágrafo, o que é um título, um
vínculo com outro documento, um trecho de código que mereça ênfase, uma
lista não-ordenada que servirá como menu de navegação, etc.

Não importando qual o tipo de sistema que interpretará esta informação
(*crawlers*, navegadores, leitores de e-mail ou leitores *RSS*), eles
sabem (através do padrão *HTML*) do que aquela informação se trata e
como eles devem lidar com ela.


Embelezando com estilos
-----------------------

</p>

|img "/images/blog/css-icon.png" 180 180 "Ícone representando documento CSS" "align-left"|
Antes de fazer minha primeira
aula de *Tableless*, eu nem fazia ideia de quão importante são as folhas
de estilos. Você já deve imaginar como eu desenvolvia para a *Web*:
*WYSIWYG* cuspindo tabelas e mais tabelas, com milhares de atributos
“font” e “color” espalhados por dezenas de arquivos.

* Um trecho de informação ser da cor verde ou azul irá afetar a
    semântica? Salvo exceções… **não.**
* Um título **h1** ser de tamanho 38px vai afetar a semântica?
    **Não.**
* A imagem de fundo utilizada no topo deste *blog* altera o
    siginifcado deste *post*? **Não.**
* Tabelas posicionarem elementos na tela é algo semântico? **Não!**

O *Tableless*, além de defender que as tabelas devem ser usadas apenas
para dados tabulares, prega que a informação deve estar separada da
formatação. Levando em conta que hoje possuímos vários tipos de
navegadores (*desktop*, *mobile*, *embed*, leitores de tela, etc), a
informação deveria ser a mesma para todos os navegadores, mas a
formatação não.

Com o [*CSS*][] e as folhas de estilos, aplicar diferentes formatações
para um mesmo conteúdo passou a ser trivial. Antes, quando você tinha a
formatação mesclada a informação, você era obrigado a reescrever a
informação para diferentes formatos.

Outro exemplo, meu leitor [*RSS*][] não utiliza a formatação que eu
escrevi para o meu *site* … ele utiliza uma formatação própria. Estamos
permitindo que nossa informação seja propagada em uma espécie de
“acoplamento fraco”. Para o pessoal que curte uma *buzzword*, essa é a
premissa da *Web 3.0*.


Interação e comportamento
-------------------------

|img "/images/blog/js-icon.png" 180 180 "Ícone representando documento Javascript" "align-left"|
O [*Javascript*][] é interpretado pelo navegador. Com ele, nossas aplicações *Web* podem
fazer com que o navegador tenha um comportamento (ou interaja com os
elementos) de uma maneira diferente da usual.

Por exemplo, podemos fazer uma página inteira ser aberta de forma
assíncrona através de *Ajax*, ou podemos fazer com que nossos
formulários sejam validados antes mesmo da informação ser enviada ao
servidor. Você pode notar que fazemos com que o navegador interaja com
nossa informação de uma forma “fora do padrão”… já ouvi pessoas chamando
esta camada de “interação”, outras de “comportamento”. Na minha opinião,
a última opção faz mais sentido.

Os seus *scripts*, assim como os seus estilos, não devem estar
“mesclados” com a informação. Pense comigo, se a informação pode ser
acessada por leitores *RSS*, é bem provável que eles não entendam
*Javascript* (ou que não entendam na plenitude de um navegador Web).
Certo?


Considerações finais
--------------------

Mas afinal de contas, como separo as camadas de desenvolvimento? Muito
simples:

* Informação deve ser sempre acessível, indiferente do estilo ou
    comportamento da sua aplicação (ou seja, só *HTML*)
* Qualquer espécie de formato que você irá aplicar deve estar contido
    em folhas de estilo *CSS* (ou seja, fontes, tamanhos, cores)
* *Javascript* não devem estar misturados com *HTML*! Nem mesmo em
    atributos como *onClick* (com a *jQuery* isso se torna muito fácil)

Sei muito bem que na prática a coisa pode não ser bem assim. Os
navegadores estão preparados para lidar com esse tipo de situação, mas
não caia nessa! Separar o seu desenvolvimento em camadas só faz bem para
você, para o seu cliente e para a sociedade.


  [acessibilidade]: |filename|/tag/acessibilidade/
    "Leia mais sobre Acessibilidade"
  [*Web*]: |filename|/tag/web.html "Leia mais sobre Web"
  [*HTML5*]: |filename|/tag/html5.html "Leia mais sobre HTML5"
  [*CSS*]: |filename|/tag/css3.html "Leia mais sobre CSS3"
  [*RSS*]: |filename|/o-que-e-rss.md
    "O que é RSS?"
  [*Javascript*]: |filename|/tag/javascript.html
    "Leia mais sobre Javascript"
