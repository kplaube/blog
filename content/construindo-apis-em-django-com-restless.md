title: Construindo APIs em Django com Restless
Date: 2017-01-06 10:45:00
Category: desenvolvimento
Tags: desenvolvimento, web, apis, python, django, rest, restless
meta_description: Construir APIs REST em Django nos dias atuais é uma tarefa no máximo corriqueira. Conheça o Restless, simpática biblioteca que tem por filosofia ser simples e objetiva.

{% img align-left /images/blog/rest-api-logo.png 180 180 API Rest %}

Construir *APIs* [*REST*]({tag}rest "Leia mais sobre REST") em
[*Django*]({tag}django "Leia mais sobre Django") nos dias atuais é uma
tarefa no máximo corriqueira. Com a ajuda de bibliotecas consagradas, como
[*Django REST Framework*](http://www.django-rest-framework.org/) e
[*Tastypie*](https://django-tastypie.readthedocs.io/en/latest/),
e utilizando toda a abstração que envolve os *Models* do *framework*, é
possível ter *endpoints* respondendo em questão de minutos.

<!-- PELICAN_END_SUMMARY -->

Mas existem alternativas que são capazes de tornar esse processo ainda
mais prático, e com uma curva de aprendizado um pouquinho menor. Nesse
seleto grupo, uma biblioteca que me agrada é o [*Restless*](https://github.com/toastdriven/restless).

## Por que Restless (e não as outras)?

[*Daniel Lindsley*](https://github.com/toastdriven) (também conhecido como *Toast Driven*),
um dos criadores do *Tastypie* (famosa biblioteca *Django* para construção de *APIs RESTful*),
também é criador do *Restless*. Segundo ele, o que o motivou a escrever uma alternativa ao *Tastypie* foi:

> Quite simply, I care about creating flexible & RESTFul APIs. In building Tastypie, I tried
> to create something extremely complete & comprehensive. The result was writing a lot of hook
> methods (for easy extensibility) & a lot of (perceived) bloat, as I tried to accommodate for
> everything people might want/need in a flexible/overridable manner.

Não há dúvidas que as duas bibliotecas citadas no início desse artigo são extremamente completas.
Se você estiver procurando um *engine* poderoso para a criação de *APIs* em *Django*, pule logo
para a [documentação do *Django REST Framework*](http://www.django-rest-framework.org/tutorial/quickstart/ "Comece agora com o REST Framework").

Mas nem sempre precisamos de todo esse poderio para dar vida ao nosso projeto. E é exatamente
com esse posicionamento que *Daniel* fecha o seu argumento:

> But in reality, all I really ever personally want are the RESTful verbs, JSON serialization &
> the ability of override behavior.

Se assim como o autor você só precisa dos verbos *HTTP*, serialização *JSON* e uma leve camada
de customização, talvez o *Restless* seja tudo o que você necessita.

Por último mas não menos importante: O *Restless*, é "framework agnostic" e funciona com *Django*,
*Flask*, *Pyramid* e *Tornado*.

## Mão na massa

Lembra do nosso "mini IMDB", lá do [*post* sobre *REST*]({filename}rest-parte-2.md "Leia mais sobre REST")? Vamos aproveitar a temática para exemplificar
o uso de *Restless* com *Django*. Mas antes, aquele `pip` "de leve" para instalar o pacote:

```
$ pip install restless
```

Não é necessária a adição da biblioteca ao `settings.py`.

Relembrando o exemplo do *post* anterior, precisaremos construir os seguintes recursos:

* `GET /movies`: Trará uma lista de filmes
* `POST /movies`: Adicionará um novo filme ao banco de dados
* `GET /movies/{id}`: Trará um filme específico
* `PUT /movies/{id}`: Atualizará um filme específico
* `DELETE /movies/{id}`: Removerá um filme específico do banco de dados

Para tanto, teremos um *model* *Django* similar ao abaixo:

```python
# movies/models.py

import uuid
from django.db import models


class Movie(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
```

Podemos partir agora para a criação dos *resources*.

## Resourcers e Preparers

*Resources* são classes que descrevem um recurso *REST*, dentro do *Restless*. É através deles
que definiremos *endpoints* e todos os verbos suportados. Já os *Preparers* fazem
o papel do "mapping" do objeto que você está expondo na API.

Para começar, vamos criar um arquivo `api.py` dentro do nosso *app*:

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

O `DjangoResource` é um *Resource* *Restless* com algumas "facilidades" para funcionar dentro do
framework *Django*. Uma dessas facilidades é o roteamento (que veremos logo abaixo).

Todo recurso precisa de um atributo `preparer`, é através dele que o *Resource* fará o "de-para"
dos campos no seu banco dados, e os campos que serão exibidos em sua *API*. Nesse caso
estamos utilizando o `FieldsPreparer`, e através de um dicionário (onde a chave é o nome do campo
na *API* e o valor é o caminho para o dado) fazemos o mapeamento necessário para expor os
dados do recurso.

O método `list` será o responsável por responder uma rota `GET /movies/` em nosso projeto. Aqui já
podemos ver o conceito de *BYOD* (*Bring Your Own Data*) em ação. O *Restless* não "introspecta"
os seus *models* *Django* para entender o que e como ele deve expor dados. É necessário que
você faça isso explicitamente... é esse princípio que torna fácil o trabalho da biblioteca com outros
*frameworks* e bancos de dados.

Falta atualizar o `urls.py` para que o *Django* possa fazer o roteamento dos endereços
com as *views*:

```python
# urls.py

from django.conf.urls import url, include

from movies.api import MovieResource

urlpatterns = [
    url(r'movies/', include(MovieResource.urls())),
]
```

Aquele `.urls()` é uma das facilidades que o `DjangoResource` oferece. Caso você esteja trabalhando
com algum outro *framework*, você pode estender o comportamento de `Resource` e resolver o roteamento
manualmente.

Pronto! O *endpoint* `movies/` já está respondendo:

```
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

Para adicionar um filme, faremos um POST em `movies/`, para isso, precisamos adicionar um método `created`:

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

Mais uma vez o *Restless* não introspecta o modelo, logo, é necessário fazer a validação e criação do objeto
em banco "na mão".

Vamos testar se o comportamento é o esperado:

```
$ curl -X POST -H "Content-Type: application/json" -d '{"title": "just a test", "description": "foo bar"}' http://localhost:8000/movies/
```

Provavelmente retornará um *exception* dizendo que o acesso não foi autorizado. O *Restless* por padrão espera
que todo o `POST`, `PUT` e `DELETE` seja realizado através de uma requisição autenticada. Para isso, antes
de executar cada verbo, ele consulta o método `is_authenticated`.

{% img align-center /images/blog/deathstar.jpg 600 317 is_authenticated retornando True é pior que o problema de segurança na Estrela da Morte (movieweb.com) %}

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

Mais uma vez executamos o *POST* via `curl`, e *voilà*:

```json
{
  "title": "just a test",
  "id": "bd02d0eb-4b75-4bfe-8222-ba24f7a1cad4",
  "description": "foo bar"
}
```

## Verbos por ID

Já listamos e criamos novos filmes. Como fazemos para ver os detalhes de um filme através do
seu *ID*? Simples! O método `detail` resolve essa para a gente:

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

```
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
Precisamos explicitamente realizar a atualização e remoção do dado através do *ORM* do *Django*.

Agora somos capazes de atualizar:

```
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

Gosto bastante do *Restless* pela sua filosofia de manter-se simples. Mas nem tudo são rosas!
A falta de autorização, *HATEOAS* e saídas em outros formatos (como *XML*, por exemplo)
podem ser argumentos decisivos para a escolha de uma biblioteca mais completa.

Eu costumo utilizar o *Restless* em projetos muito específicos, onde sei que a *API* será sempre
*JSON*, e integrações com o *ORM* trarão mais dores de cabeça do que soluções (em um cenário
onde há interação com bancos *NoSQL*, o *Restless* se mostra uma ferramenta muito útil).

[Confira o exemplo desse *post* no Github](https://github.com/kplaube/post-django-restless "Veja o exemplo completo no Github").

Até a próxima.
