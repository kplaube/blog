Title: Usando o HTML5 sem medo
Date: 2010-11-13 11:30
Category: desenvolvimento
Tags: desenvolvimento, html5, css3, web

|img "/images/blog/html5-logo.png" 180 180 "Logotipo HTML5" "align-left"|
Para aqueles que ainda são resistentes ao
[*HTML5*][html5] eu digo: Desistam!

É notável como gradativamente a gente vem ouvindo cada vez mais sobre
*HTML5* e [*CSS3*][css3]. Os sites com experimentos não param de aparecer na
[*Web*][web], muitas referências boas com excelentes dicas sobre escrita e
semântica, e até mesmo *websites* profissionais (desenvolvidos por
empresas da área do desenvolvimento *Web*), começam a tornar-se cada vez
mais comuns.

<!-- PELICAN_END_SUMMARY -->

Mas é óbvio que o *HTML5* não está maduro o bastante para simplesmente
abandonarmos a cautela e acharmos que todo o nosso público utiliza
[*Google Chrome*][chrome]. Na verdade, acredito que os desenvolvedores *Web*
já aprenderam muito com o *IE 6* (e [vibraram muito com a sua morte][morte_ie6])
para cometer este tipo de equívoco de novo.

Mas então, até onde podemos “arriscar” no *HTML5* e *CSS3*? Quando
poderemos enfim falar para os nossos clientes que utilizaremos *HTML5*
nos sites deles?

O site [*When can I use…*][when_can_i_use] pode responder esta pergunta para você!

Ele apresenta alguns recursos da *HTML5* e *CSS3* e qual a previsão de suporte para
determinado navegador (*IE*, *Opera*, *Safari*, *Firefox* e *Chrome*).
Por exemplo, segundo o site, o *IE* só terá suporte nativo ao *Canvas*
em sua versão 9.

Mas dá pra usar ou não?
-----------------------

|img "/images/blog/we-can-do-html5.jpg" 192 245 "Comunidade Drupal incentivando ao uso do HTML5" "align-left"|
Já utilizei *HTML5* em alguns projetos. Devo confidenciar que foram projetos “na
surdina”, ou seja, os clientes e demais envolvidos não sabiam que o
desenvolvimento estava sendo feito em *HTML5* (sendo revelado somente
depois de concluído). Como fiz para utilizar a *HTML5* sem me preocupar
com *IE*? Bom, por mim eu simplesmente ignoraria o *IE*, mas
comercialmente falando isto seria um tiro no pé.

Então assistindo a uma [conferência da *W3C* Brasil][cafe_com_browser], o [*Elcio*][elcio] do
[*Tableless*][tableless] mostrou algumas soluções para quem enfrenta o dilema de
fazer funcionar nos bons e nos maus navegadores.

Primeiramente, deixa eu parabenizar o *Tableless* pelo excelente
“[*HTML5* – Guia de referência para os desenvolvedores *Web*][guia_html5]”. É
justamente neste guia, mais exatamente no capítulo 2, que são
apresentadas técnicas de detecção para sabermos se o *browser* do
internauta suporta determinado recurso ou não.

Outra excelente referência é o [*Dive into HTML5*][dive_into_html5]. Onde, além dos
conceitos somos levados à prática em um material muito bem escrito e
divertido.

Utilizando estas técnicas eu digo: É possível sim! Mas tenha em mente
que muitas coisas ainda são *Drafts*, ou seja, amanhã simplesmente podem
deixar de existir (o que já aconteceu). Então não invente… use sem medo
essa nova safra de elementos como *article*, *section*, *aside*, etc.
Também experimente as *tags* *video* e *audio*, elementos *canvas* e
brinque com o *localStorage*, mas evite recursos muito “extravagantes”.

Para finalizar, visitem o “[*HTML5 Unleashed: Tips, Tricks and
Techniques*][html5_unleashed]”. É um megaboga tutorial de *HTML5* que aborda desde os
elementos “mais seguros” até técnicas para detecção e para renderização
no *IE*.

E vamos aguardar o [livro do *Maujor*][livro_maujor].

  [logotipo_html5]: |filename|/media/blog/html5-logo.png
    "Logotipo HTML5"
  [html5]: |filename|/tag/html5.html "Leia mais sobre HTML5"
  [css3]: |filename|/tag/css3.html "Leia mais sobre CSS3"
  [web]: |filename|/tag/web.html "Leia mais sobre Web"
  [chrome]: http://www.google.com/chrome?hl=pt-BR
    "Baixe o Google Chrome gratuitamente"
  [morte_ie6]: http://www.tableless.com.br/aonde-nos-leva-a-morte-do-internet-explorer-6
    "Aonde nos leva a morte do IE6?"
  [when_can_i_use]: http://caniuse.com/
    "Quando poderemos usar plenamente o HTML5?"
  [drupal_html5]: |filename|/media/blog/we-can-do-html5.jpg
    "Comunidade do Drupal incentivando ao uso do HTML5"
  [cafe_com_browser]: http://elcio.com.br/amanha-cafe-com-browser-sobre-html/
    "Eu assisti ao Café com Browser pela internet"
  [elcio]: http://elcio.com.br/ "Visite o blog do Elcio"
  [tableless]: http://www.tableless.com.br/
    "Desenvolvimento Web com XHTML e CSS"
  [guia_html5]: http://tableless.com.br/html5/
    "Saiba tudo sobre HTML5 no Tableless"
  [dive_into_html5]: http://diveintohtml5.org/
    "Mergulhe no HTML5 agora mesmo"
  [html5_unleashed]: http://www.w3avenue.com/2010/05/07/html5-unleashed-tips-tricks-and-techniques/
    "HTML5 Unleashed: Tips, Tricks and Techniques"
  [livro_maujor]: http://www.livrohtml5.com.br/
    "Ficamos no aguardo do livro do Maujor sobre HTML5"
