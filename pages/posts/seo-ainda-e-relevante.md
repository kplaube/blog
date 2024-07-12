---
title: SEO ainda é relevante?
date: 2019-08-20 16:05:00
tags: ["desenvolvimento-web", "seo"]
slug: seo-ainda-e-relevante
thumbnail: ./images/seo.jpg
---

Se há uma constante em desenvolvimento de _software_ é o [_hype_](https://www.significados.com.br/hype/ "Significado de hype"). Hoje vivemos o _buzz_
ao redor de _microservices_, _machine learning_ e _blockchain_. Mas há algum tempo um dos _hypes_ que varreu o mundo do desenvolvimento [_web_](/tag/desenvolvimento-web.html "Leia mais sobre web") foi o _SEO_ (ou _Search Engine Optimization_).

Quem aqui nunca fez um freela de "otimização para mecanismos de buscas" que atire a primeira pedra.

## Eu (ainda) preciso me importar com SEO?

Essa pergunta tem rondado a minha cabeça nos últimos meses...

(Infelizmente) tenho me distanciado cada vez mais do desenvolvimento utilizando [_Python_](/tag/python.html "Leia mais sobre Python") e [_Django_](/tag/django.html "Leia mais sobre Django"), e portanto, a oportunidade de escrever sobre a linguagem tem diminuído consideravelmente. Logo, o título da página inicial "Python, Django e desenvolvimento" começa a perder o sentido.

Você pode me sugerir: É só colocar uma _metatag_ `robots` com `noindex,follow`, e [fazer com que os robôs indexem apenas as páginas de artigos](http://dan-nolan.com/what-is-noindex/ "What is noindex / follow?"); E aí vem a minha pergunta: Em 2019, ainda precisamos dizer para os mecanismos de busca como eles devem se comportar?

_Long story short_: Sim.

## Recapitulando: SEO - Search Engine Optimization

Fui na segunda página dos resultados de busca do [DuckDuckGo](https://duckduckgo.com/ "The search engine that doesn't track you") para achar uma [boa definição de _SEO_](https://resultadosdigitais.com.br/especiais/o-que-e-seo/ "Tudo sobre Search Engine Optimization"):

> Como a própria tradução já sugere, SEO é uma otimização para os motores de busca, isto é, um conjunto de técnicas que influenciam os algoritmos dos buscadores a definir o ranking de uma página para determinada palavra-chave que foi pesquisada.

Os sites de buscas (como _Google_), de forma bem genérica, utilizam um processo composto por três passos:

- Rastreamento: Onde o robô identifica e prioriza as páginas que devem ser indexadas;
- Indexação: São armazenadas informações como conteúdo da página, data de publicação, região da publicação, título, descrição, etc;
- Exibição de resultados: A consulta realizada pelo usuário, sendo que o resultado é alterado de acordo com a relevância da busca.

![Imagem do filme Chappy](./images/seo-crawlers.jpg "Quando falam em robôs de busca, eu imagino os robôs do filme Chappie (wearemoviegeeks.com)")

O trabalho do profissional de _SEO_ tem sido fazer com que determinado conteúdo seja encontrado pelos robôs de busca, bem como que ele ganhe prioridade e relevância, dado um contexto de busca. Além disso, facilitar a indexação proporcionando um conteúdo acessível e bem estruturado faz parte desse esforço.

Pode até parecer um serviço simples, mas os fatores que determinam o ranqueamento das páginas são inúmeros (como por exemplo, seu site possuir _HTTPS_ ou ser _mobile friendly_), e nem todos são necessariamente conhecidos pelo grande público. E até mesmo os amplamente conhecidos necessitam de um trabalho rebuscado, como por exemplo, a estratégia de [_link building_](https://moz.com/beginners-guide-to-seo/growing-popularity-and-links "Link Building & Estabilishing Authority").

## Otimizar é preciso?

O [Resultados Digitais](https://resultadosdigitais.com.br "Referência em Marketing Digital de resultado") traz um bom argumento para continuarmos a se importar com _SEO_:

> A otimização de sites para mecanismos de buscas é feita para alcançar o usuário entregando a resposta que ele procura com o formato ideal, oferecendo a melhor experiência possível no ambiente da marca e seguindo as diretrizes dos buscadores.

Do ponto de vista de estratégia de _marketing_, **é sim** interessante que o conteúdo do seu site possua um público alvo bem definido, e que artifícios sejam utilizados para "assegurar" que o conteúdo esteja chegando a esse público. Partindo dessa ótica, o mercado de _digital_ é super aquecido e soluções vem e vão o tempo todo. Seria no mínimo inocente de nossa parte acreditar que somente ao realizar um bom trabalho técnico estamos cumprindo todas as expectativas em relação ao retorno sobre o investimento.

As possibilidades vão desde a qualidade do conteúdo, _design_, passando pela sua característica de "freshness" ou não, até táticas de crescimento como uso de anúncios patrocinados e viralização.

Do ponto de vista de desenvolvimento de _software_, se seguirmos as boas práticas de desenvolvimento _web_ possivelmente estaremos produzindo uma solução "SEO friendly". _URLs_ amigáveis, boa performance (velocidade), _markup_ semântico, etc. São algumas das práticas _top of mind_, mas na realidade temos algumas outras que possuem impacto de igual importância.

## Checklist

Quando trabalhei no [_Globoesporte.com_](https://globoesporte.globo.com/ "O site de esportes da Globo"), uma das garantias de bom resultado nos mecanismos de busca era sempre fazer um site acessível. Naquela época isso era "facilmente" validado com um leitor de telas, ou assegurando que pessoas com dificuldade motora pudessem navegar pelo site.

![Lista do Capitão América](./images/seo-caps-todolist.png "Anote aí no seu caderninho para entender a referência depois (marvelcinematicuniverse.wikia.com)")

Mas naquela época também havia todo um time de arquitetos da informação para ajudar na estruturação de conteúdo, _markup_ e rotas.

Hoje em dia, além desses fundamentais aspectos, possuímos alguns outros que devem ser levados em consideração ao se construir um site ou aplicação "SEO-friendly".

Para me ajudar a compreender tais aspectos, utilizei o site [_Woorank_](https://www.woorank.com/ "Make your site easy to find") para gerar um _checklist_ do que é necessário cumprir quando o assunto é otimização.

### Markup & conteúdo

- `title`: É fundamental possuir a tag `<title></title>`, e que ela de forma concisa explique do que se trata o seu conteúdo/aplicação.
- `description`: Com o uso da `<meta name="description" content="..." />` somos capazes de descrever a página e influenciar em como ela será exibida em um resultado de busca. É recomendado algo em torno de 70 e 160 caracteres, e que a descrição contenha as _keywords_ mais importantes do seu conteúdo.
- `headings`: De `<h1>` a `<h6>`, os títulos são uma grande forma de estruturar o seu conteúdo. Possuir as palavras-chaves mais importantes neles impacta positivamente o ranqueamento.
- Atributo `alt`: Textos alternativos são importantes para imagens. Leitores de tela usarão esse atributo para descrever a imagem para os seus usuários.

Nos itens acima temos a responsabilidade dividida: Enquanto o desenvolvedor se compromete em produzir um _HTML_ válido e bem estruturado, a produção de conteúdo se compromete em produzir títulos e palavras-chaves relevantes para o assunto sendo publicado.

### Gestão de URLs

- Links quebrados: Um problema grave e que deve ser evitado sempre. Teoricamente abalam a reputação do seu site, e sem dúvida nenhuma prejudicam a usabilidade. Ferramentas como o [Google SearchConsole](https://search.google.com/search-console/about "Monitore o seu site") são fundamentais para prevenir esse tipo de problema.
- Resolução `www`: Com o _HTTPS_, é normal solicitarmos ao navegador do usuário o _redirect_ para a versão segura, quando o acesso é realizado via _HTTP_. O domínio _HTTPS_ deveria ser sempre o seu "preferred domain", mesmo se o usuário utilizar o prefixo `www.` na _URL_.
- `robots.txt`: É a forma de você informar aos robôs que determinadas páginas ou diretórios não precisam ser acessados. Útil para ocultar áreas restritas ou de testes do seu site dos mecanismos de busca.
- `sitemap.xml`: Um mapa do site legível para robôs. Nele, além de especificar as _URLs_, você também pode descrever a sua prioridade, última atualização, com qual frequência a mesma muda, etc.
- _URLs amigáveis_: _URLs_ sem _underscore_, sem parâmetros (como `noticia.php?id=421`), e que de fato fazem algum sentido para o usuário. _URLs_ amigáveis são preferidas pelos mecanismos de buscas, e se pensarmos pelo "humano" da coisa, é mais fácil para seu público identificar e até memorizar a rota para um conteúdo. Sem contar que palavras-chave na _URL_ são um _plus_ para o ranqueamento.
- Domínio: Evite domínios longos. Prefira descrever alguma página levando em consideração a sua _URL_ completa (exemplo: meusite.com/produtos/camiseta).

Nessa categoria temos uma presença mais técnica. Utilizar ferramentas como o _SearchConsole_ ajuda a identificar problemas com _URL_. Ter um _CMS_ que produza _URLs_ amigáveis é mais que obrigatório, e gerenciar artefatos como `robots.txt` e `sitemap.xml` deve fazer parte do _pipeline_ de produção do seu conteúdo.

### Outros

- `favicon`: Faz parte da sua marca, portanto, essencial.
- _Assets_: Minificados, comprimidos e cacheáveis (essa tática pode mudar caso você suporte amplamente _HTTP/2_).
- Performance: Relacionado com o item acima, mas com maior profundidade. Métricas como [_Time to First Byte_](https://www.searchenginepeople.com/blog/16081-time-to-first-byte-seo.html "What Is Time To First Byte, And How To Improve It") são importantes e precisam ser monitoradas. O [_Google PageSpeed_](https://developers.google.com/speed/pagespeed "PageSpeed") é fundamental nesse processo.
- Idioma: Especificar o idioma pode ajudar o navegador do usuário a lidar com traduções e renderização de fontes e textos.

Aqui é chover no molhado para quem já tem certa experiência com _web_. Amplamente técnico, e parte de qualquer _build_ e _dashboard_ de métricas.

### Conteúdo estruturado

Embora um _HTML_ bem escrito, com _tags_ da _HTML5_, teoricamente seja o suficiente para uma boa apresentação e compreensão do conteúdo, você sempre pode dar um passo além e adicionar mais marcação que traga ainda mais significado ao seu texto.

O [_Open Graph protocol_](https://opengraphprotocol.org "The Open Graph protocol") é uma maneira de enriquecer o seu documento através de _markup_ simples, que acrescentam metadados e resultam em uma melhor interação com as redes sociais. Em outras palavras, são as propriedades `og`:

```html
<html prefix="og: http://ogp.me/ns#">
  <head>
    <title>The Rock (1996)</title>
    <meta property="og:title" content="The Rock" />
    <meta property="og:type" content="video.movie" />
    <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
    <meta
      property="og:image"
      content="http://ia.media-imdb.com/images/rock.jpg"
    />
    ...
  </head>
  ...
</html>
```

Dessa forma você possui maior controle sobre como o seu documento irá se "comportar" quando interagindo com o _Facebook_ (por exemplo). [Leia mais sobre Open Graph](https://sitechecker.pro/open-graph/ "What is Open Graph and How to Use It in Social Networks").

Uma maneira de dar significado a cada pedaço do seu conteúdo é através do [Schema.org](https://schema.org/docs/gs.html#microdata_how "Getting started with schema.org using Microdata"). Se você utilizar o vocabulário com _Microdata_, é possível aplicar semântica com pouca alteração no seu _HTML_:

```html
<div itemscope itemtype="http://schema.org/Movie">
  <h1 itemprop="name">Avatar</h1>
  <span
    >Director: <span itemprop="director">James Cameron</span> (born August 16,
    1954)</span
  >
  <span itemprop="genre">Science fiction</span>
  <a href="../movies/avatar-theatrical-trailer.html" itemprop="trailer"
    >Trailer</a
  >
</div>
```

Note a presença de atributos como `itemscope`, `itemtype` e `itemprop`. Leia mais sobre [Schema.org](https://schema.org/ "a collaborative, community activity with a mission to create, maintain, and promote schemas for structured data on the Internet, on web pages, in email messages, and beyond").

Aqui, estamos falando de uma tarefa dividida entre o desenvolvedor e o arquiteto da informação. Não acredito que a sua utilização fará alguma diferença para o usuário em seu navegador, porém, outras "máquinas" (como o _Facebook_ ou a busca do _Google_) podem tirar proveito disso para entender mais sobre o seu conteúdo.

### Mobile

Praticar o [_Mobile-First_](http://bradfrost.com/blog/post/mobile-first-responsive-web-design/ "mobile-first responsive web design"), é uma prática mais que essencial no seu processo de desenvolvimento. O _Google_ possui uma [ferramenta bem interessante](https://search.google.com/test/mobile-friendly "Mobile-Friendly") que valida se o seu _website_ está otimizado para dispositivos móveis.

Puramente técnica essa parte, com responsabilidade dividida entre engenharia, _design_ e arquitetura da informação. Se você estiver utilizando [_Responsive Design_](https://www.smashingmagazine.com/2011/01/guidelines-for-responsive-web-design/ "Responsive web Design – What It Is And How To Use It") e pensando na renderização do site primeiro no _mobile_, você já está no caminho certo.

## Considerações finais

Do ponto de vista do desenvolvedor _web_, produzir uma solução seguindo as boas práticas amplamente conhecidas no mercado (de desenvolvimento, segurança e performance), e tendo como ponto focal o usuário e sua usabilidade/acessibilidade, produzirá quase o mesmo resultado que desenvolver orientado à otimizações para mecanismos de busca.

Mas vale levar em consideração que a técnica não para por aí. _Design_ e arquitetura da informação também são fundamentais para atingirmos tais resultados. Não subestime o seu time de _UX_! Eles provavelmente entendem mais sobre o comportamento e contexto do usuário do que você (programador).

Ainda há o aspecto de _marketing_ e publicidade do conteúdo. Essa é uma área na qual eu sou um completo ignorante, portanto, só posso imaginar que exista uma gama de práticas e ferramentas que devem fazer parte do dia a dia desse profissional.

Talvez a palavra "otimizar" dê a impressão que "algo além" deva ser feito para atingir determinados resultados. E no fim das contas, isso faz sentido. _SEO_ abrange diferentes disciplinas que, separadas podem resultar em produtos razoáveis, mas que unidas em um objetivo comum são mais propensas a ter um bom resultado.

De qualquer forma, dar uma ajudinha na indexação do seu conteúdo não faz mal a ninguém.

## Referências

- [Resultados Digitais: Tudo sobre Search Engine Optimization](https://resultadosdigitais.com.br/especiais/o-que-e-seo/)
