---
title: "Streamando dados no Django"
date: 2017-05-14 15:45:00
tags:
  [
    "desenvolvimento-web",
    "python",
    "django",
    "streaming",
    "generators",
    "wsgi",
    "csv",
  ]
slug: streaming-dados-django
thumbnail: ./images/django-pony.png
---

Recentemente na [_Loadsmart_](http://loadsmart.com/ "Book a truck with Loadsmart"),
houve a necessidade de lidar com um cenário onde se faz necessário acessar uma _view_
que retorna um _CSV_ de tamanho considerável, gerado a partir de parâmetros dinâmicos,
no melhor esquema "imprima um relatório".

Embora o [_Django_](/tag/django.html "Leia mais sobre Django") seja desenhado para requisições curtas, existe a possibilidade
de fazer _streaming_ de grandes arquivos _CSVs_ através da classe `StreamingHttpResponse`.

Vale a nota: Esse artigo é sobre _CSVs_, mas você também pode ["streamar" outros tipos de dados](http://stackoverflow.com/questions/30791228/serving-a-django-static-text-file "Serving a django static text file")
através desse método supimpa.

## Motivação

Em determinados cenários, precisamos retornar arquivos relativamente grandes para
o usuário. O exemplo acima, uma requisição com parâmetros que irão gerar um relatório
em _CSV_, é um caso bem comum.

O comportamento de resposta padrão do _Django_ é retornar uma instância de `HttpResponse`.
O problema é que nesse modo carregaremos o arquivo inteiro para a memória do
servidor, e só depois enviamos o arquivo para o cliente. Além de prejudicarmos o _Time To
First Byte_ (TTBT), podemos gerar picos de memória na máquina hospedeira (que podem afetar
demais requisições sendo processadas) e _timeouts_ de conexão.

Um exemplo de como faríamos esse retorno através do `HttpResponse`:

```python
import csv
from django.http import HttpResponse
from django.view import View


class CsvReportView(View):
    def get(self, request, *args, **kwargs):
        # Abstraindo a logica de filtro por parametros do request
        cargoes = Cargoes.objects.filter_by_request_parms(request)

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="filtered_cargoes.csv"'

        writer = csv.writer(response)

        for row in cargoes.values_list('id', 'commodity', 'weight'):
            writer.writerow(row)

        return response
```

Se você tem certa intimidade com geradores, deve estar supondo que essa pode ser uma
maneira de solucionar esse problema... e você está certo!

## Como funciona o StreamingHttpResponse?

O `StreamingHttpResponse` funciona com a ajuda do conceito de _generators_. Achei
uma excelente definição no [_Stackoverflow_](http://stackoverflow.com/questions/1756096/understanding-generators-in-python "Understanding Generators in Python"):

> (...) is simply a function which returns an object on which you can
> call next, such that for every call it returns some value, until it raises
> a StopIteration exception, signaling that all values have been generated.
> Such an object is called an iterator.

[Leia mais sobre iteráveis e geradores](https://www.slideshare.net/ramalho/iteraveis-e-geradores-em-python "Iteraveis e geradores em Python").

Para tanto, o uso da palavra reservada `yield` se faz necessário. Logo, ao invés de termos o exemplo abaixo:

```python
def my_view(request):
    message = 'Hello, there!'
    response =  HttpResponse(message)
    response['Content-Length'] = len(message)

    return response
```

Teremos:

```python
def hello():
    yield 'Hello,'
    yield 'there!'

def my_view(request):
    return StreamingHttpResponse(hello)
```

[Leia mais no excelente "How does Django's StreamingHttpResponse work, exactly?"](https://andrewbrookins.com/django/how-does-djangos-streaminghttpresponse-work-exactly/ "How does Django’s StreamingHttpResponse work, exactly").

Voltando ao exemplo do _CSV_, teremos:

```python
import csv
from django.db import models
from django.http import StreamingHttpResponse
from django.views.generic import View

class Echo(object):
    """
    Interface parecida com a que usamos para escrever arquivos.
    """

    def write(self, value):
        return value


class CsvReportView(View):
    def get(self, request, *args, **kwargs):
        # Abstraindo a logica de filtro por parametros do request
        cargoes = Cargoes.objects.filter_by_request_parms(request)

        # Usamos a mesma interface de buffer utilizada para escrever
        # um arquivo. No entanto, apenas damos um `return value`
        # aos inves de persistirmos o valor
        pseudo_buffer = Echo()
        writer = csv.writer(pseudo_buffer)

        # Construimos o nosso gerador
        gen_func = (writer.writerow(row) for row in cargos.values_list('id', 'commodity', 'weight'))

        response = StreamingHttpResponse(gen_func, content_type='text/csv')
        response['Content-Disposition'] = 'attachment;filename="filtered_cargoes.csv"'

        return response
```

Antes mesmo de termos todo o _CSV_ montado, já estamos retornando dados ao usuário.

[Veja o exemplo da documentação ofical do _Django_](https://docs.djangoproject.com/en/1.11/howto/outputting-csv/#streaming-large-csv-files "Leia mais na documentação do Django").

## É a melhor maneira de resolver esse problema?

Caso a sua única opção seja retornar o dado através de uma _view_ _Django_, sim. Além
de um uso mais eficiente de memória, o retorno do `StreamingHttpResponse`
vai impedir que, por exemplo, um _load balancer_ feche a conexão do seu usuário pelo
fato de o serviço _Django_ estar levando muito tempo para montar a resposta.

!["O Django com StreamingHttpResponse fica mais biznis (thelegomovie.wikia.com)"](./images/biznis-cat.png "O Django com StreamingHttpResponse fica mais biznis (thelegomovie.wikia.com)")

Mas segundo a recomendação da [própria documentação](https://docs.djangoproject.com/en/1.11/ref/request-response/#django.http.StreamingHttpResponse "Veja mais na documentação do Django")
do `StreamingHttpResponse`, já que essa é uma "operação bloqueante",
o ideal seria realizá-la em um _background job_ (por exemplo) e deixar com que o
usuário acesse essa informação quando ela já estiver pronta.

O `django-report-builder` entrega essa [modalidade de "asynchronous reports"](https://django-report-builder.readthedocs.io/en/latest/quickstart/#asynchronous-report-generation "Leia mais na documentação da biblioteca")
através do [_Celery_](http://www.celeryproject.org/ "Celery: Distributed Task Queue").

## Considerações finais

É fato que a "mágica pesada" fica no lado do [_WSGI_](/tag/wsgi.html "Leia mais sobre WSGI"), como você pode ver [aqui](https://andrewbrookins.com/django/how-does-djangos-streaminghttpresponse-work-exactly/#the-wsgi-server "How does Django’s StreamingHttpResponse work, exactly?").
O _Django_ "faz o que pode" quando o assunto é lidar com grandes volumes de dados. Mas
o ideal é sempre deixar essa carga de processamento fora do ciclo de vida da requisição do usuário.

Mesmo assim, o `StreamingHttpResponse` vem como uma boa alternativa para resolver
alguns problemas de _views_ com tempos de resposta e consumo de recursos muito altos, podendo
ser a solução ideal para alguns relatórios que você emite em sua aplicação.

Até a próxima.

## Referências

- [_Aeguana - How to export data as a CSV – Django model_](http://blog.aeguana.com/2015/12/12/csv-export-data-for-django-model/)
- [_Andrew Brookins - How does Django's StreamingHttpResponse work, exactly?_](https://andrewbrookins.com/django/how-does-djangos-streaminghttpresponse-work-exactly/)
- [_Django Documentation - StreamingHttpResponse_](https://docs.djangoproject.com/en/1.11/ref/request-response/#streaminghttpresponse-objects)
- [_nerdery - Streaming Django responses on Heroku_](http://www.ericcarmichael.com/streaming-django-responses-on-heroku.html)
- [_rodvdka - Django long running report on Django_](http://www.rodvdka.co.za/heroku/long-polling/h12/h18/django/2016/10/13/long-polling-heroku.html)
- [_Stackoverflow - Streaming video/mp4 file using HttpResponse_](http://stackoverflow.com/questions/33208849/python-django-streaming-video-mp4-file-using-httpresponse)
- [_Stackoverflow - Understanding Generators in Python_](http://stackoverflow.com/questions/1756096/understanding-generators-in-python)
