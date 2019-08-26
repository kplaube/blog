Title: Usando o HTML5 sem medo
Date: 2010-11-13 11:30
Category: desenvolvimento
Tags: desenvolvimento, html5, css3, web
Slug: usando-html5-sem-medo
meta_description: É notável como gradativamente a gente vem ouvindo cada vez mais sobre HTML5 e CSS3. Os sites com experimentos não param de aparecer na Web...

{% img representative-image /images/blog/html5-logo.png 180 180 Logotipo HTML5 %}

É notável como gradativamente a gente vem ouvindo cada vez mais sobre
_HTML5_ e [_CSS3_][css3]. Os sites com experimentos não param de aparecer na
[_web_][web], muitas referências boas com excelentes dicas sobre escrita e
semântica, e até mesmo _websites_ profissionais (desenvolvidos por
empresas da área do desenvolvimento _web_), começam a tornar-se cada vez
mais comuns.

<!-- PELICAN_END_SUMMARY -->

Mas é óbvio que o _HTML5_ não está maduro o bastante para simplesmente
abandonarmos a cautela e acharmos que todo o nosso público utiliza
[_Google Chrome_][chrome]. Na verdade, acredito que os desenvolvedores _Web_
já aprenderam muito com o _IE 6_ (e [vibraram muito com a sua morte][morte_ie6])
para cometer este tipo de equívoco de novo.

Mas então, até onde podemos “arriscar” no _HTML5_ e _CSS3_? Quando
poderemos enfim falar para os nossos clientes que utilizaremos _HTML5_
nos sites deles?

O site [_When can I use…_][when_can_i_use] pode responder esta pergunta para você!

Ele apresenta alguns recursos da _HTML5_ e _CSS3_ e qual a previsão de suporte para
determinado navegador (_IE_, _Opera_, _Safari_, _Firefox_ e _Chrome_).
Por exemplo, segundo o site, o _IE_ só terá suporte nativo ao _Canvas_
em sua versão 9.

## Mas dá pra usar ou não?

{% img align-left /images/blog/we-can-do-html5.jpg 192 245 Comunidade Drupal incentivando ao uso do HTML5 %}
Já utilizei _HTML5_ em alguns projetos. Devo confidenciar que foram projetos “na
surdina”, ou seja, os clientes e demais envolvidos não sabiam que o
desenvolvimento estava sendo feito em _HTML5_ (sendo revelado somente
depois de concluído). Como fiz para utilizar a _HTML5_ sem me preocupar
com _IE_? Bom, por mim eu simplesmente ignoraria o _IE_, mas
comercialmente falando isto seria um tiro no pé.

Então assistindo a uma [conferência da _W3C_ Brasil][cafe_com_browser], o [_Elcio_][elcio] do
[_Tableless_][tableless] mostrou algumas soluções para quem enfrenta o dilema de
fazer funcionar nos bons e nos maus navegadores.

Primeiramente, deixa eu parabenizar o _Tableless_ pelo excelente
“[_HTML5_ – Guia de referência para os desenvolvedores _web_][guia_html5]”. É
justamente neste guia, mais exatamente no capítulo 2, que são
apresentadas técnicas de detecção para sabermos se o _browser_ do
internauta suporta determinado recurso ou não.

Outra excelente referência é o [_Dive into HTML5_][dive_into_html5]. Onde, além dos
conceitos somos levados à prática em um material muito bem escrito e
divertido.

Utilizando estas técnicas eu digo: É possível sim! Mas tenha em mente
que muitas coisas ainda são _Drafts_, ou seja, amanhã simplesmente podem
deixar de existir (o que já aconteceu). Então não invente… use sem medo
essa nova safra de elementos como _article_, _section_, _aside_, etc.
Também experimente as _tags_ _video_ e _audio_, elementos _canvas_ e
brinque com o _localStorage_, mas evite recursos muito “extravagantes”.

Para finalizar, visitem o “[_HTML5 Unleashed: Tips, Tricks and
Techniques_][html5_unleashed]”. É um megaboga tutorial de _HTML5_ que aborda desde os
elementos “mais seguros” até técnicas para detecção e para renderização
no _IE_.

E vamos aguardar o [livro do _Maujor_][livro_maujor].

[html5]: {tag}html5 "Leia mais sobre HTML5"
[css3]: {tag}css3 "Leia mais sobre CSS3"
[web]: {tag}web "Leia mais sobre Web"
[chrome]: http://www.google.com/chrome?hl=pt-BR "Baixe o Google Chrome gratuitamente"
[morte_ie6]: http://www.tableless.com.br/aonde-nos-leva-a-morte-do-internet-explorer-6 "Aonde nos leva a morte do IE6?"
[when_can_i_use]: http://caniuse.com/ "Quando poderemos usar plenamente o HTML5?"
[cafe_com_browser]: http://elcio.com.br/amanha-cafe-com-browser-sobre-html/ "Eu assisti ao Café com Browser pela internet"
[elcio]: http://elcio.com.br/ "Visite o blog do Elcio"
[tableless]: http://www.tableless.com.br/ "Desenvolvimento Web com XHTML e CSS"
[guia_html5]: http://tableless.com.br/html5/ "Saiba tudo sobre HTML5 no Tableless"
[dive_into_html5]: http://diveintohtml5.org/ "Mergulhe no HTML5 agora mesmo"
[html5_unleashed]: http://www.w3avenue.com/2010/05/07/html5-unleashed-tips-tricks-and-techniques/ "HTML5 Unleashed: Tips, Tricks and Techniques"
[livro_maujor]: http://www.livrohtml5.com.br/ "Ficamos no aguardo do livro do Maujor sobre HTML5"
