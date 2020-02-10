title: Construindo APIs em Django com Django REST Framework
Date: 2020-02-20 10:45:00
Category: desenvolvimento
Tags: desenvolvimento, web, apis, python, django, rest, drf
Image: /images/blog/django-logo.png
Alt: Logotipo do Django

No [_post_ anterior]({filename}eu-me-rendo-django-rest-framework.md "Leia o meu depoimento sobre a rendição ao DRF")
tive a oportunidade de "destilar" a minha simpatia pelo [_Django REST Framework_]({tag}drf "Leia mais sobre o Django REST Framework"),
e de salientar alguns aspectos positivos da ferramenta. A praticidade
é sem dúvida um de seus pontos mais altos, e nesse _post_ vamos explorá-la através
de código escrito (que vale mais do que mil palavras).

<!-- PELICAN_END_SUMMARY -->

## Instalando

Sem mais delongas, o _REST Framework_ é facilmente instalado através dos comandos `pip` ou `pipenv`:

```text
$ pipenv install djangorestframework
```

Não esqueça de adicionar a _app_ ao seu `INSTALLED_APPS`:

```python
# settings.py

INSTALLED_APPS = [
    (...)
    'rest_framework',
]
```

Estamos prontos para mergulhar nos conceitos de _routers_, serializadores e _views_.

## Antes de ir: O problema

Embora o "iMDB-clone" seja o exemplo que eu mais goste de usar, dessa vez vamos imaginar que estamos desenvolvendo
um "Feedly-clone". O [_Feedly_](https://feedly.com/ "Visite o Feedly") é uma espécie de leitor [_RSS_]({filename}o-que-e-rss.md "O que é RSS?")
(com esteroides).

Por hora vamos focar em dois tipos: `Channel` e `Item`; _Channel_ é de fato o _website_ ou _blog_ que queremos registrar em
nossa plataforma. Esse é o mesmo nome utilizado pelo formato _RSS_:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>RSS Title</title>
 <description>This is an example of an RSS feed</description>
 <link>http://www.example.com/main.html</link>
 <lastBuildDate>Mon, 06 Sep 2010 00:01:00 +0000 </lastBuildDate>
 <pubDate>Sun, 06 Sep 2009 16:20:00 +0000</pubDate>
 <ttl>1800</ttl>

 <item>
  <title>Example entry</title>
  <description>Here is some text containing an interesting description.</description>
  <link>http://www.example.com/blog/post/1</link>
  <guid isPermaLink="false">7bd204c6-1655-4c27-aeee-53f933c5395f</guid>
  <pubDate>Sun, 06 Sep 2009 16:20:00 +0000</pubDate>
 </item>

</channel>
</rss>
```

Já item, como ilustrado no exemplo acima, é de fato a notícia/artigo/música/podcast que aquele canal está publicando.

Então, partiremos do princípio que os seguintes modelos já estão estabelecidos:

```python
# channels/models.py

from django.db import models


class Channel(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    link = models.URLField()

    def __str__(self):
        return self.title


class Item(models.Model):
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    link = models.URLField()
    pub_date = models.DateTimeField()

    def __str__(self):
        return self.title

```

O próximo passo será definir a _API_ para que um possível cliente _mobile_ (por exemplo) a consuma.

## Os serializadores

Segundo a [documentação oficial](https://www.django-rest-framework.org/api-guide/serializers/ "Serializers"):

> Serializers allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types. Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.

Eles funcionam como um espécie de `Form`, proporcionando ferramental para o _parsing_ e validação das requisições, bem como controlando o que será mandado como _output_ para o usuário. Dentro dessa analogia, o `ModelSerializer` faz mais ou menos o que o `ModelForm` faz. Logo, um bom candidato para começarmos a escrever o _endpoint_:

```python
# channels/serializers.py

from rest_framework import serializers

from channels.models import Channel


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = [
            "description",
            "link",
            "title",
        ]

```

Uma vez que estamos expondo todos os campos do modelo, é possível trocar a lista em `fields`, pela _string_ `__all__`.

## Viewsets

Continuando com as analogias, um _viewset_ seria mais ou menos o que são as _class-based views_ no _Django_. Elas abstraem uma
porção de lógica repetitiva (como _CRUD_) através de uma estrutura muito familiar aos que já possuem certa vivência com o _framework_:

```python
# channels/api.py

from rest_framework import viewsets

from channels.models import Channel
from channels.serializers import ChannelSerializer


class ChannelViewSet(viewsets.ModelViewSet):
    queryset = Channel.objects.all()
    serializer_class = ChannelSerializer
```

Note que em `queryset` apontamos para o modelo `Channel`, e em `serializer_class` para a classe serializadora criada anteriormente.

## Fazendo o roteamento

Como último passo para termos algo de fato visual, vamos mapear a rotas para o novo recurso criado.

Uma das vantagens de utilizar um _viewset_ é que ele também se encarrega de fazer o mapeamento das _URLs_. Por exemplo, o `ChannelViewSet` uma vez que mapeado,
responderá para rotas terminando em `/` e `/<id-do-channel>`. Além disso compreenderá que um `POST` em `/` é relacionado à criação de um novo elemento, bem como `DELETE` em `/<id-do-channel>` está relação à remoção:

```python
# urls.py

from django.urls import include, path

from rest_framework import routers
from channels.api import ChannelViewSet

api_router = routers.DefaultRouter()
api_router.register(r"channels", ChannelViewSet)

urlpatterns = [
    path("api/", include(api_router.urls)),
]

```

Nesse momento já é possível presenciar um resultado mais sólido ao acessar `http://localhost:8000/api`:

{% img align-center /images/blog/django-rest-framework-example.png 740 405 Exemplo ao acessar o endereço no browser %}

Não ligue para a porta `:5000` no exemplo acima.

Se você não é fã do _browsable api_, e não quer ter essa visão do `API Root`, troque o `DefaultRouter` por `SimpleRouter`.

## CRUD em ação

Considerando tudo o que foi dito até então, podemos esperar que temos o recurso mapeado no endereço `http://localhost:8000/api/channels`,
e que a partir desse, poderemos desempenhar a listagem, adição, edição e exclusão de dados desse recurso.

Começamos então adicionando um elemento, ao enviar o método `POST` para o endereço com final `channels/`:

```shell
curl -XPOST http://localhost:8000/api/channels/ --data '{
    "id": 1,
    "title": "Klaus Laube",
    "description": "Python, Django e desenvolvimento Web",
    "link": "https://klauslaube.com.br"
}' --header "Content-Type: application/json"

{"id":1,"title":"Klaus Laube","description":"Python, Django e desenvolvimento Web","link":"https://klauslaube.com.br"}
```

Como estamos falando de uma _API_ _REST_, é normal esperarmos que um `GET` no mesmo endereço traga uma lista de _channels_:

```shell
curl http://localhost:8000/api/channels/

[{"id":1,"title":"Klaus Laube","description":"Python, Django e desenvolvimento Web","link":"https://klauslaube.com.br"}]
```

E normalmente, um `GET` em `channels/1` deve trazer detalhes daquele recurso:

```shell
curl http://localhost:8000/api/channels/1/

{"id":1,"title":"Klaus Laube","description":"Python, Django e desenvolvimento Web","link":"https://klauslaube.com.br"}
```

Para atualizar o registro, enviamos o método `PUT`:

```shell
curl -XPUT http://localhost:8000/api/channels/1/ --data '{
    "title": "Klaus Laube",
    "description": "Python, Django, APIs, e desenvolvimento Web",
    "link": "https://klauslaube.com.br"
}' --header "Content-Type: application/json"

{"id":1,"title":"Klaus Laube","description":"Python, Django, APIs, e desenvolvimento Web","link":"https://klauslaube.com.br"}
```

E para finalizar, com `DELETE` é possível remover o recurso:

```shell
curl -XDELETE http://localhost:5000/api/channels/2/
```

Mágico, não?!

## Serializando relacionamentos

Vamos para a parte dos items.

## Referências

- [Django REST Framework - Quickstart](https://www.django-rest-framework.org/tutorial/quickstart/)
- [Wikipedia - RSS](https://en.wikipedia.org/wiki/RSS)
