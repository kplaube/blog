Title: SEO ainda é relevante?
Date: 2019-07-20 20:00:00
Category: desenvolvimento
Tags: desenvolvimento, web, seo
Slug: seo-ainda-e-relevante

{% img align-left /images/blog/algoritmos-ordernacao.jpeg 180 180 Ordenação %}

Se há uma constante em desenvolvimento de _software_ é o [_hype_](https://www.significados.com.br/hype/ "Significado de hype"). Hoje vivemos o _buzz_
ao redor de _microservices_, _machine learning_, _blockchain_, etc. Mas há algum tempo um dos _hypes_ que varreu o mundo do desenvolvimento [_web_]({tag}web "Leia mais sobre Web") foi o _SEO_ (ou _Search Engine Optimization_).

<!-- PELICAN_END_SUMMARY -->

Quem aqui nunca fez um freela de "otimização para mecanismos de buscas" que atire a primeira pedra.

## Eu (ainda) preciso me importar com SEO?

Essa pergunta tem rondado a minha cabeça nos últimos meses...

(Infelizmente) Tenho me distanciado cada vez mais do desenvolvimento utilizando [_Python_]({tag}python "Leia mais sobre Python") e [_Django_]({tag}django "Leia mais sobre Django"), e portanto, a oportunidade de escrever sobre a linguagem tem diminuído com o tempo. Logo, o título da página inicial "Python, Django e desenvolvimento" começa a perder o sentido.

Você pode me sugerir: É só colocar uma _metatag_ `robots` com `noindex,follow`, e [fazer com que os robôs indexem apenas as páginas de artigos](http://dan-nolan.com/what-is-noindex/ "What is noindex / follow?"); E aí vem a minha pergunta: Em 2019, ainda precisamos dizer para os mecanismos de busca como eles devem se comportar?

## Recaptulando: SEO - Search Engine Optimization

Fui na segunda página dos resultados de busca do [DuckDuckGo](https://duckduckgo.com/ "The search engine that doesn't track you") para achar uma [boa definição de _SEO_](https://resultadosdigitais.com.br/especiais/o-que-e-seo/ "Tudo sobre Search Engine Optimization"):

> Como a própria tradução já sugere, SEO é uma otimização para os motores de busca, isto é, um conjunto de técnicas que influenciam os algoritmos dos buscadores a definir o ranking de uma página para determinada palavra-chave que foi pesquisada.

Os sites de buscas (como _Google_), de forma bem genérica, utilizam um processo composto por três passos:

- Rastreamento: Onde o robô identifica e prioriza as páginas que devem ser indexadas;
- Indexação: São armazenadas informações como conteúdo da página, data de publicação, região da publicação, título, descrição, etc;
- Exibição de resultados: A consulta realizada pelo usuário, sendo que o resultado é alterado de acordo com a relevância da busca.

O trabalho do profissional de _SEO_ tem sido fazer com que determinado conteúdo seja encontrado pelos robôs de busca, bem como que ele ganhe prioridade e relevância, dado um contexto de busca. Além disso, facilitar a indexação proporcionando um conteúdo acessível e bem estruturado faz parte desse esforço.

Pode até parecer um serviço simples, mas os fatores que determinam o ranqueamento das páginas são inúmeros (como por exemplo, seu site possuir _HTTPS_ ou ser _mobile friendly_), e nem todos são necessariamente conhecidos pelo grande público. E até mesmo os amplamente conhecidos necessitam de um trabalho rebuscado, como por exemplo, a estratégia de [_link building_](https://moz.com/beginners-guide-to-seo/growing-popularity-and-links "Link Building & Estabilishing Authority").

## Otimizar é preciso?

O [Resultados Digitais](https://resultadosdigitais.com.br "Referência em Marketing Digital de resultado") traz um bom argumento para continuarmos a se importar com _SEO_:

> A otimização de sites para mecanismos de buscas é feita para alcançar o usuário entregando a resposta que ele procura com o formato ideal, oferecendo a melhor experiência possível no ambiente da marca e seguindo as diretrizes dos buscadores.

Do ponto de vista de estratégia de _marketing_, é sim interessante que o conteúdo do seu site possua um público alvo bem definido, e que artifícios sejam utilizados para "assegurar" que o conteúdo esteja chegando a esse público. Partindo dessa ótica, o mercado de _digital_ é super aquecido e soluções vem e vão o tempo todo. Seria no mínimo inocente de nossa parte acreditar que somente ao realizar um bom trabalho técnico estamos cumprindo todas as expectativas em relação ao retorno do investimento.

As possibilidades vão desde a qualidade do conteúdo, passando pela sua característica de "freshness" ou não, até táticas de crescimento como uso de anúncios patrocinados, uso de _social media_ e viralização.

Do ponto de vista de desenvolvimento de _software_, se seguirmos as boas práticas de desenvolvimento _web_, possivelmente estaremos produzindo uma solução "SEO friendly". _URLs_ amigáveis, boa performance (velocidade), _markup_ semântico, etc. São algumas das práticas _top of mind_, mas na realidade temos algumas outras que possuem impacto de igual importância (ou até superiores).

## Checklist

Quando trabalhei no time do _Globoesporte.com_, uma das garantias de bom resultado nos mecanismos de busca era sempre fazer um site acessível. Naquela época, isso era facilmente validado com um leitor de telas, ou assegurando que pessoas com dificuldade motora poderiam navegar pelo site. Hoje em dia possuímos alguns outros aspectos que facilitam a construir um site ou aplicação "SEO-friendly".

https://www.woorank.com/en/www/klauslaube.com.br

### SEO

- `title` _tag_: É fundamental possuir a tag `<title></title>`, e que ela de forma concisa explique do que se trata o seu conteúdo/aplicação

https://backlinko.com/seo-checklist
https://ahrefs.com/blog/seo-checklist/
https://www.woorank.com

## Considerações finais

## Referências

- [Resultados Digitais: Tudo sobre Search Engine Optimization](https://resultadosdigitais.com.br/especiais/o-que-e-seo/)
