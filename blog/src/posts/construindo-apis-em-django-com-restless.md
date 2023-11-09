---
title: "Construindo APIs em Django com Restless"
date: 2017-01-06 10:45:00
modified: 2023-11-09 21:58:00
tags: ["desenvolvimento-web", "api", "python", "django", "rest", "restless"]
thumbnail: ./images/rest-api-logo.png
slug: construindo-apis-em-django-com-restless
---

Construir _APIs_ [_REST_](/tag/rest.html "Leia mais sobre REST") em
[_Django_](/tag/django.html "Leia mais sobre Django") nos dias atuais é uma
tarefa no máximo corriqueira. Com a ajuda de bibliotecas consagradas, como
[_Django REST Framework_](http://www.django-rest-framework.org/) e
[_Tastypie_](https://django-tastypie.readthedocs.io/en/latest/),
e utilizando toda a abstração que envolve os _Models_ do _framework_, é
possível ter _endpoints_ respondendo em questão de minutos.

Mas existem alternativas que são capazes de tornar esse processo ainda
mais prático, e com uma curva de aprendizado um pouquinho menor. Nesse
seleto grupo, uma biblioteca que me agrada é o [_Restless_](https://github.com/toastdriven/restless).

## Por que Restless (e não as outras)?

[_Daniel Lindsley_](https://github.com/toastdriven) (também conhecido como _Toast Driven_),
um dos criadores do _Tastypie_ (famosa biblioteca _Django_ para construção de _APIs RESTful_),
também é criador do _Restless_. Segundo ele, o que o motivou a escrever uma alternativa ao _Tastypie_ foi:

> Quite simply, I care about creating flexible & RESTFul APIs. In building Tastypie, I tried
> to create something extremely complete & comprehensive. The result was writing a lot of hook
> methods (for easy extensibility) & a lot of (perceived) bloat, as I tried to accommodate for
> everything people might want/need in a flexible/overridable manner.

Não há dúvidas que as duas bibliotecas citadas no início desse artigo são extremamente completas.
Se você estiver procurando um _engine_ poderoso para a criação de _APIs_ em _Django_, pule logo
para a [documentação do _Django REST Framework_](http://www.django-rest-framework.org/tutorial/quickstart/ "Comece agora com o REST Framework").

Mas nem sempre precisamos de todo esse poderio para dar vida ao nosso projeto. E é exatamente
com esse posicionamento que _Daniel_ fecha o seu argumento:

> But in reality, all I really ever personally want are the RESTful verbs, JSON serialization &
> the ability of override behavior.

Se assim como o autor você só precisa dos verbos _HTTP_, serialização _JSON_ e uma leve camada
de customização, talvez o _Restless_ seja tudo o que você necessita.

Por último mas não menos importante: O _Restless_, é "framework agnostic" e funciona com _Django_,
_Flask_, _Pyramid_ e _Tornado_.

## Mão na massa

Lembra do nosso "mini IMDB", lá do [_post_ sobre _REST_](/2016/05/20/rest-parte-2.html "Leia mais sobre REST")? Vamos aproveitar a temática para exemplificar
o uso de _Restless_ com _Django_. Mas antes, aquele `pip` "de leve" para instalar o pacote:

```text
pip install restless
```

Não é necessária a adição da biblioteca ao `settings.py`.

Relembrando o exemplo do _post_ anterior, precisaremos construir os seguintes recursos:

- `GET /movies`: Trará uma lista de filmes
- `POST /movies`: Adicionará um novo filme ao banco de dados
- `GET /movies/{id}`: Trará um filme específico
- `PUT /movies/{id}`: Atualizará um filme específico
- `DELETE /movies/{id}`: Removerá um filme específico do banco de dados

Para tanto, teremos um _model_ _Django_ similar ao abaixo:

```python
# movies/models.py

import uuid
from django.db import models


class Movie(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
```

Podemos partir agora para a criação dos _resources_.

## Resourcers e Preparers

_Resources_ são classes que descrevem um recurso _REST_, dentro do _Restless_. É através deles
que definiremos _endpoints_ e todos os verbos suportados. Já os _Preparers_ fazem
o papel do "mapping" do objeto que você está expondo na API.

Para começar, vamos criar um arquivo `api.py` dentro do nosso _app_:

```python
# movies/api.py

from restless.dj import DjangoResource
from restless.preparers import FieldsPreparer

from movies.models import Movie


class MovieResource(DjangoResource):
    preparer = FieldsPreparer(fields={
        'id': 'id',
        'title': 'title',
        'description': 'description',
    })

    def list(self):
        return Movie.objects.all()
```

O `DjangoResource` é um _Resource_ _Restless_ com algumas "facilidades" para funcionar dentro do
framework _Django_. Uma dessas facilidades é o roteamento (que veremos logo abaixo).

Todo recurso precisa de um atributo `preparer`, é através dele que o _Resource_ fará o "de-para"
dos campos no seu banco dados, e os campos que serão exibidos em sua _API_. Nesse caso
estamos utilizando o `FieldsPreparer`, e através de um dicionário (onde a chave é o nome do campo
na _API_ e o valor é o caminho para o dado) fazemos o mapeamento necessário para expor os
dados do recurso.

O método `list` será o responsável por responder uma rota `GET /movies/` em nosso projeto. Aqui já
podemos ver o conceito de _BYOD_ (_Bring Your Own Data_) em ação. O _Restless_ não "introspecta"
os seus _models_ _Django_ para entender o que e como ele deve expor dados. É necessário que
você faça isso explicitamente... é esse princípio que torna fácil o trabalho da biblioteca com outros
_frameworks_ e bancos de dados.

Falta atualizar o `urls.py` para que o _Django_ possa fazer o roteamento dos endereços
com as _views_:

```python
# urls.py

from django.conf.urls import url, include

from movies.api import MovieResource

urlpatterns = [
    url(r'movies/', include(MovieResource.urls())),
]
```

Aquele `.urls()` é uma das facilidades que o `DjangoResource` oferece. Caso você esteja trabalhando
com algum outro _framework_, você pode estender o comportamento de `Resource` e resolver o roteamento
manualmente.

Pronto! O _endpoint_ `movies/` já está respondendo:

```text
$ curl -X GET http://localhost:8000/movies/ | json_pp

{
   "objects" : [
      {
         "description" : "The Rebel Alliance makes a risky move to steal the plans for the Death Star, setting up the epic saga to follow. (133 mins.)",
         "id" : "7e383f9c-5dc4-4b0d-9864-71e05a5d271b",
         "title" : "Rogue One"
      },
      (...)
   ]
}
```

## Criação e autorização

Para adicionar um filme, faremos um POST em `movies/`, para isso, precisamos adicionar um método `create`:

```python
# movies/api.py

(...)

class MovieResource(DjangoResource):
    (...)

    def list(self):
        return Movie.objects.all()

    def create(self):
        return Movie.objects.create(
            title=self.data['title'],
            description=self.data['description'],
        )
```

Mais uma vez o _Restless_ não introspecta o modelo, logo, é necessário fazer a validação e criação do objeto
em banco "na mão".

Vamos testar se o comportamento é o esperado:

```text
curl -X POST -H "Content-Type: application/json" -d '{"title": "just a test", "description": "foo bar"}' http://localhost:8000/movies/
```

Provavelmente retornará um _exception_ dizendo que o acesso não foi autorizado. O _Restless_ por padrão espera
que todo o `POST`, `PUT` e `DELETE` seja realizado através de uma requisição autenticada. Para isso, antes
de executar cada verbo, ele consulta o método `is_authenticated`.

![is_authenticated retornando True é pior que o problema de segurança na Estrela da Morte (movieweb.com)](/media/deathstar.jpg "is_authenticated retornando True é pior que o problema de segurança na Estrela da Morte (movieweb.com)")

Para fins educacionais, vamos informar à biblioteca que todas as requisições são aceitas:

```python
# movies/api.py

(...)

class MovieResource(DjangoResource):
    (...)

    def create(self):
        return Movie.objects.create(
            title=self.data['title'],
            description=self.data['description'],
        )

    def is_authenticated(self):
        return True
```

Mais uma vez executamos o _POST_ via `curl`, e _voilà_:

```json
{
  "title": "just a test",
  "id": "bd02d0eb-4b75-4bfe-8222-ba24f7a1cad4",
  "description": "foo bar"
}
```

## Verbos por ID

Já listamos e criamos novos filmes. Como fazemos para ver os detalhes de um filme através do
seu _ID_? Simples! O método `detail` resolve essa para a gente:

```python
# movies/api.py

from django.shortcuts import get_object_or_404

(...)

class MovieResource(DjangoResource):
    (...)

    def detail(self, pk):
        return get_object_or_404(Movie, pk=pk)
```

Um `GET` para `movies/{id}` retornará os detalhes do recurso:

```text
$ curl -X GET http://localhost:8000/movies/7e383f9c-5dc4-4b0d-9864-71e05a5d271b/

{
  "description": "The Rebel Alliance makes a risky move to steal the plans for the Death Star, setting up the epic saga to follow. (133 mins.)",
  "id": "7e383f9c-5dc4-4b0d-9864-71e05a5d271b",
  "title": "Rogue One"
}
```

Note que o `DjangoResource` resolveu a passagem do parâmetro `pk`.

Para finalizar, vamos criar os métodos `update` e `delete`, que serão responsáveis
por atualizar e remover o recurso:

```python

# movies/api.py

(...)


class MovieResource(DjangoResource):

    (...)

    def detail(self, pk):
        return get_object_or_404(Movie, pk=pk)

    def update(self, pk):
        movie = self.detail(pk)

        movie.title = self.data['title']
        movie.description = self.data['description']
        movie.save()

        return movie

    def delete(self, pk):
        movie = self.detail(pk)
        movie.delete()
```

Assim como o método `create`, não há nenhuma "mágica" resolvendo a operação para a gente.
Precisamos explicitamente realizar a atualização e remoção do dado através do _ORM_ do _Django_.

Agora somos capazes de atualizar:

```text
$ curl -X PUT -H "Content-Type: application/json" -d '{"title": "Zombieland", "description": "So much fun"}' http://localhost:8000/movies/bd02d0eb-4b75-4bfe-8222-ba24f7a1cad4/

{
  "title": "Zombieland",
  "description": "So much fun",
  "id": "bd02d0eb-4b75-4bfe-8222-ba24f7a1cad4"
}
```

E remover um filme através da API:

```
curl -X DELETE http://localhost:8000/movies/bd02d0eb-4b75-4bfe-8222-ba24f7a1cad4/
```

## Considerações finais

Gosto bastante do _Restless_ pela sua filosofia de manter-se simples. Mas nem tudo são rosas!
A falta de autorização, _HATEOAS_ e saídas em outros formatos (como _XML_, por exemplo)
podem ser argumentos decisivos para a escolha de uma biblioteca mais completa.

Eu costumo utilizar o _Restless_ em projetos muito específicos, onde sei que a _API_ será sempre
_JSON_, e integrações com o _ORM_ trarão mais dores de cabeça do que soluções (em um cenário
onde há interação com bancos _NoSQL_, o _Restless_ se mostra uma ferramenta muito útil).

[Confira o exemplo desse _post_ no Github](https://github.com/kplaube/post-django-restless "Veja o exemplo completo no Github").

Até a próxima.
