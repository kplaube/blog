---
title: "Eu me rendo: Django REST Framework"
date: 2020-02-06 09:40:00
modified: 2023-11-08 10:00:00
tags:
  [
    "desenvolvimento-web",
    "api",
    "python",
    "django",
    "rest",
    "drf",
    "eu-me-rendo",
  ]
thumbnail: ./images/django-rest-framework-logo.png
slug: eu-me-rendo-django-rest-framework
serie: "Eu me rendo"
---

Confesso que nunca fui muito simpático ao [_Django REST Framework_](https://www.django-rest-framework.org/ "Visite a página oficial do projeto"). Antes de adotá-lo tive a oportunidade de explorar outras opções, como o [_Restless_](/2017/01/06/construindo-apis-em-django-com-restless.html "Leia mais sobre o Restless"), e admito que sempre havia algo faltando, ou algum esforço extra necessário para obter alguma funcionalidade que já vinha embutida no [_DRF_](/tag/drf.html "Leia mais sobre Django REST Framework").

Comecei a aceitar a sua natureza "baterias inclusas" após me distanciar do desenvolvimento [_Python_](/tag/python.html "Leia mais sobre Python"). Sob uma ótica diferente, compreendi o papel do _DRF_, e fiz as pazes com esse sentimento de confiar em uma biblioteca (supostamente) complexa para construir [_APIs_](/tag/api.html "Leia mais sobre APIs") (teoricamente) simples. Afinal, se "ser bloated" for um argumento decisivo, não escolheríamos [_Django_](/tag/django.html "Leia mais sobre Django") para escrever _APIs_ (principalmente em um contexto de microsserviços).

## Motivação

É claro que a minha atual simpatia pela ferramenta não se deve apenas ao fato de eu tê-la "aceitado". Pura ignorância da minha parte não ter compreendido antes todos os aspectos positivos que o projeto possui, e todas as facilidades que ele proporciona aos seus usuários.

### Patrocinado

O que faz do _REST Framework_ um projeto interessante é, para começo de conversa, que ele é financiado colaborativamente, com empresas do calibre de [_Sentry_](https://getsentry.com/welcome/ "Conheça o Sentry") e [_DigitalOcean_](https://www.digitalocean.com/ "Cloud sem complicação") fazendo parte da lista de patrocinadores. Essa característica faz com que a biblioteca tenha um _long-term_ mais provável, uma vez que os esforços de desenvolvimento são financiados. Além disso, _releases_ são mais substanciais e frequentes.

[Leia mais sobre como patrocinar o projeto](https://fund.django-rest-framework.org/topics/funding/ "Veja mais em Funding").

### Autenticação

Lidar com autenticação "from scratch" é no mínimo _error prone_. O _framework_ já possui uma série de mecanismos de autenticação _built-in_ (como `BasicAuthentication`, `SessionAuthentication` e `TokenAuthentication`), e uma infinidade de integrações com _third parties_ (como [django-oauth-toolkit](https://github.com/jazzband/django-oauth-toolkit "Veja a página do projeto no GitHub"), [django-rest-framework-simplejwt](https://github.com/davesque/django-rest-framework-simplejwt "Biblioteca para adoção de JWT") e [djoser](https://github.com/sunscrapers/djoser "Excelente opção de auth para APIs em Django")).

![Never give up, never surrender](/media/never-give-up.jpeg "Não há nada de errado em render-se de vez em quando (publishedtodeath.blogspot.com)")

A possibilidade de mesclar mecanismos num mesmo recurso permite que você tenha uma _API_ _session based_ para o seu _front-end_ em _React_ (por exemplo), e o mesmo recurso ser capaz de servir acessos utilizando _tokens_, para um possível cliente _mobile_.

[Leia mais sobre autenticação](https://www.django-rest-framework.org/api-guide/authentication/ "Veja mais em Authentication").

### SQL & NoSQL

Os serializadores são um aspecto muito interessante da biblioteca. Além do trabalho de _marshalling_, eles também servem como validadores. Com o `ModelSerializer` todos os aspectos do seu modelo são "traduzidos" para a _API_, no melhor estilo _Django Admin_.

Mas existe também a possibilidade de escrita de seu própria classe serializadora ao herdar de `serializers.Serializer`. Isso traz flexibilidade para trabalhar com artefatos não relacionados com a _ORM_ do _Django_.

E se _HATEOAS_ for a sua praia, o `HyperlinkedModelSerializer` promove _hyperlinks_ entre tais classes.

[Leia mais sobre serialização](https://www.django-rest-framework.org/api-guide/serializers/ "Veja mais em Serializers").

### Developer eXperience

_APIs_ escritas com o _REST Framework_ ainda ganham a funcionalidade de "web browsable API". Com isso é possível navegar pelas definições da sua _API_ (como _endpoints_, formatos e métodos) e interagir com a mesma através de uma interface amigável, pronta para ser compartilhada com outros desenvolvedores interessados em consumir a sua solução.

Uma outra opção é a geração de [_Swagger_](/tag/swagger.html "Leia mais sobre Swagger") através do [_Django REST Swagger_](https://django-rest-swagger.readthedocs.io/en/latest/ "Leia a documentação do projeto").

[Veja a _browsable API_ em ação](https://restframework.herokuapp.com/ "Visite a aplicação de exemplo da documentação oficial").

### Praticidade

E meu argumento final é em torno de sua praticidade. Ter uma _API_ [_REST_](/tag/rest.html "Leia mais sobre REST") em _Django_, com o _DRF_, leva minutos.

Algumas customizações poderão exigir um pouco mais de conhecimento da biblioteca, bem como um pouquinho de criatividade, mas nada que te impeça de proporcionar um serviço estável, bem escrito, e em baixíssimo tempo de desenvolvimento.

[Leia mais sobre como customizar _views_](https://www.django-rest-framework.org/api-guide/generic-views/#customizing-the-generic-views "Veja mais em Customizing the generic views").

## Considerações finais

Talvez seja só devaneio, mas depois de trabalhar com _Spring Boot_ para construção de _APIs_ [_Java_](/tag/java.html "(não) leia mais sobre Java") em um contexto de microserviços, foi que entendi o propósito do _REST Framework_. Deixar de lado essa "birra" com ele (supostamente) ser grande serviu para poder enxergar as qualidades da ferramenta.

Os pontos negativos ainda estão lá, e provavelmente você também vai achá-los quando estiver "entrincheirado" escrevendo a sua solução. Ainda assim, o _DRF_ deve ser considerado como possível escolha para escrita de suas _APIs_ em _Python_.

No próximo artigo falaremos de uma maneira prática sobre o _framework_.

Até lá.

## Referências

- [Django REST Framework](https://www.django-rest-framework.org/)
