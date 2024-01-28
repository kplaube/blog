---
title: "Do WSGI ao ASGI - Parte 1"
date: 2021-03-01 17:45:00
modified: 2023-11-13 16:39:00
tags:
  [
    "python",
    "django",
    "wsgi",
    "asgi",
    "async",
    "asyncio",
    "threads",
    "paralelismo",
    "concorrencia",
    "desenvolvimento-web",
  ]
slug: do-wsgi-ao-asgi-parte-1
thumbnail: /media/python-logo-2.png
---

O [_Django 3_](/tag/django.html "Leia mais sobre Django") veio para sacudir as estruturas. Parece que foi ontem, mas
a versão já está aí desde 2019. Entre todas as suas adições,
a de maior destaque certamente é a adoção de capacidades _async_ através do _ASGI_ (_Asynchronous Server Gateway Interface_).

Se você, assim como eu, não vê motivos para largar o [_WSGI_](/2012/11/02/entendendo-o-cgi-fastcgi-e-wsgi.html "Entendendo o CGI, FastCGI e WSGI") (_Web Server Gateway Interface_),
e ainda tem dificuldades para compreender o que é de fato esse novo _Gateway Interface_, vem comigo.

Mas antes de mergulhar na prática, essa é uma boa oportunidade para falarmos sobre _async_, _threads_, concorrência e paralelismo.

## CPU, cores, processos e threads

O _CPU_ é a cabeça por trás de todo o processamento. Ele funciona em ciclos que correspondem ao tempo necessário para a execução de uma operação. Um
_CPU_ pode ter múltiplos _cores_, e cada _core_ é capaz de executar múltiplos processos.

No caso dos processos _Python_, cada um possui um interpretador _Python_, _memory space_, e o famigerado _GIL_ (mais a seguir).

Quando executamos o processo _Python_, ele:

- Pode executar múltiplos subprocessos.
- A partir da _main thread_, pode iniciar múltiplas _threads_.

![Diagrama mostrando a diferença entre multithreading e multiprocessing](/media/python-thread-multiprocessing.png "Multithreading vs. Multiprocessing")

Uma _thread_ é uma unidade de execução dentro de um processo. Cada _thread_ utiliza o espaço de memória do mesmo, compartilhando-o com as demais.

## Concorrência e paralelismo

A motivação por trás do uso de _threads_ e subprocessos é permitir que diferentes tarefas aconteçam ao mesmo tempo. E "ao mesmo tempo" pode significar
que a intenção seja de um resultado simultâneo, mas na prática, não necessariamente ocorrendo no mesmo instante.

Complicado? Para fins didáticos
vamos utilizar o exemplo proposto pelo [_FinTechExplained_](https://medium.com/fintechexplained/advanced-python-concurrency-and-parallelism-82e378f26ced "Advanced Python: Concurrency And Parallelism"):

> Eu estou esperando 10 amigos para almoçar, e eu tenho 3 horas para cozinhar o suficiente para 10 pessoas.

Os passos para um prato são:

- Começo lavando os vegetais (~5 minutos);
- Corto os vegetais (~13 minutos);
- Cozinho os mesmos (~30 minutos);
- Sirvo (~2 minutos).

![Fluxograma mostrando os passos iniciando pela lavagem e terminando em servir](/media/cooking-sync.png "O fluxo de forma linear")

Imagine que temos apenas uma boca no fogão, e que só conseguimos cozinhar um prato por vez.
Se pensarmos de forma linear, um prato leva aproximadamente 50 minutos para ficar pronto. Se multiplicarmos
pelo número de amigos, precisaremos de `8 horas` cozinhando para atender a demanda.

### Concorrência

Para reduzir o tempo total, uma possibilidade é adquirirmos outro fogão. Continuamos
a cortar os vegetais de forma sequencial, mas o passo de cozimento pode acontecer de uma
maneira na qual eu possa ter as duas bocas funcionando, e checar periodicamente o estado de cozimento
de cada prato.

![Com duas bocas, consigo ter concorrência no cozimento](/media/concurrency.png "Com duas bocas, consigo ter concorrência no cozimento")

[_Diogo M. Martins_ define concorrência como](https://diogommartins.wordpress.com/2017/04/07/concorrencia-e-paralelismo-threads-multiplos-processos-e-asyncio-parte-1/ "CONCORRÊNCIA E PARALELISMO – THREADS, MÚLTIPLOS PROCESSOS E ASYNCIO – PARTE 1"):

> Quando duas ou mais tarefas podem começar a ser executadas e terminar em espaços de tempo que se sobrepõem,
> não significando que elas precisam estar em execução necessariamente no mesmo instante.

Logo, ao invés de 60 minutos (2 pratos x 30 minutos de cozimento) podemos alcançar um tempo menor.

### Paralelismo

Com dois cozinheiros, cada um trabalhando de sua casa, conseguimos dividir a carga, e portanto, em `4 horas` seremos capazes de atender a demanda.

![Com dois cozinheiros, consigo paralelizar o trabalho](/media/parallelism.png "Com dois cozinheiros, consigo paralelizar o trabalho")

E talvez essa seja a forma mais simplista de definir paralelismo: Quando duas ou mais tarefas são executadas literalmente ao mesmo tempo.

Bom... se a motivação por trás das _threads_ e subprocessos é permitir que tarefas aconteçam ao mesmo tempo, podemos
utilizar qualquer um deles para alcançar paralelismo, certo?

![Diagrama com a diferença de execução entre concorrência e paralelismo](/media/concurrency-parallelism.jpg "Uma imagem pode valer mais que mil palavras (stackoverflow.com)")

Não necessariamente.

## GIL (Global Interpreter Lock)

O _Python Global Interpreter Lock_ (ou _GIL_) é uma "trava" que permite que apenas uma _thread_ tenha controle sobre o interpretador. Ou seja,
apenas uma _thread_ executa por vez, mesmo em uma arquitetura _multi-thread_ com mais de um _core_.

Infame? No mínimo. Mas há uma boa motivação para essa trava existir. De forma resumida, ela está relacionada
com a forma como a linguagem [gerencia memória](https://stackify.com/python-garbage-collection/ "Leia sobre o gerenciamento de memória em Python"), e previne
problemas de _memory leak_ e _deadlocks_, ao mesmo tempo que oferece números interessantes de performance.

O artigo do _RealPython_,
["What Is the Python Global Interpreter Lock (GIL)?"](https://realpython.com/python-gil/ "Leia o artigo na íntegra"),
é uma excelente referência para você saber tudo a respeito.

Para o bem ou para o mal, na prática você não consegue atingir paralelismo utilizando _threads_ em _Python_ (e note, essa é uma realidade específica da linguagem).
Ainda assim, fazer `multithreading` te dará o resultado concorrente que você deseja.

![Fluxograma de como a GIL funciona](/media/gil-lock.png "GIL e o gerenciamento de threads")

E como conseguimos de fato paralelismo então? Utilizando processos!

Com a biblioteca de `multiprocessing`, ao invés de iniciarmos
uma _thread_, iniciamos um novo processo _Python_ que se encarregará de executar o que for requisitado. E citando o início desse artigo:

> No caso dos processos Python, cada um possui um interpretador Python, memory space, e o famigerado GIL.

Logo, não sofremos a limitação da trava uma vez que estamos
falando de processos à parte, gerenciados pelo Sistema Operacional.

## Multithreading e Multiprocessing

Para ficar um pouco mais claro, vamos a um exemplo prático. Verificaremos o tamanho de alguns sites.

A forma mais recomendada de dar os primeiros passos com _threads_ em _Python_ é através da biblioteca `concurrent.futures`:

```python
# thread.py

import concurrent.futures
import urllib.request

URLS = ['http://www.foxnews.com/',
        'http://www.cnn.com/',
        'http://www.bbc.co.uk/',]

def load_url(url, timeout):
    with urllib.request.urlopen(url, timeout=timeout) as conn:
        return conn.read()

def main():
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        future_to_url = {executor.submit(load_url, url, 60): url for url in URLS}

        for future in concurrent.futures.as_completed(future_to_url):
            url = future_to_url[future]
            data = future.result()
            print('%r tem %d bytes' % (url, len(data)))


if __name__ == "__main__":
    main()
```

Caso você queira saber mais sobre a sintaxe, vale a pena conferir a [documentação
oficial do _Python_](https://docs.python.org/3.6/library/concurrent.futures.html#concurrent.futures.ThreadPoolExecutor "Leia sobre ThreadPoolExecutor").

A execução deve apresentar um resultado parecido com o abaixo:

```text
'http://www.bbc.co.uk/' tem 361696 bytes
'http://www.cnn.com/' tem 1143256 bytes
'http://www.foxnews.com/' tem 334772 bytes
```

O `ThreadPoolExecutor` estende do tipo `Executor`. Possuímos também o filho `ProcessPoolExecutor`, que tem uma interface semelhante, mas utiliza o módulo `multiprocessing`
por baixo dos panos:

```python
# process.py

import concurrent.futures
import urllib.request

URLS = ['http://www.foxnews.com/',
        'http://www.cnn.com/',
        'http://www.bbc.co.uk/',]

def load_url(url, timeout):
    with urllib.request.urlopen(url, timeout=timeout) as conn:
        return conn.read()

def main():
    with concurrent.futures.ProcessPoolExecutor(max_workers=3) as executor:
        future_to_url = {executor.submit(load_url, url, 60): url for url in URLS}

        for future in concurrent.futures.as_completed(future_to_url):
            url = future_to_url[future]
            data = future.result()
            print('%r tem %d bytes' % (url, len(data)))


if __name__ == "__main__":
    main()
```

Para maiores detalhes sobre a implementação, [confira a documentação do _ProcessPoolExecutor_](https://docs.python.org/3.6/library/concurrent.futures.html#concurrent.futures.ProcessPoolExecutor "Leia mais sobre").

Com auxílio da ferramenta de linha de comando `time`, podemos calcular quanto tempo
cada _script_ leva para executar as tarefas concorrentemente:

```text
$ time python thread.py
'http://www.bbc.co.uk/' tem 360652 bytes
'http://www.foxnews.com/' tem 336778 bytes
'http://www.cnn.com/' tem 1143341 bytes
python thread.py  0.15s user 0.06s system 38% cpu 0.555 total

$ time python process.py
'http://www.bbc.co.uk/' tem 360652 bytes
'http://www.cnn.com/' tem 1143341 bytes
'http://www.foxnews.com/' tem 336779 bytes
python process.py  0.41s user 0.12s system 74% cpu 0.715 total
```

E surpreendentemente vemos que o exemplo com _threads_ (`0.15s`) leva
menos tempo que o com subprocessos (`0.41s`).

## I/O-bound e CPU-bound

Pela ideia de que _threads_ em _Python_ não são paralelas, podemos chegar erroneamente à conclusão de que _multiprocessing_ é a solução
definitiva.

Depende do tipo de problema que estamos tentando resolver. Há duas categorias distintas
que influenciam na decisão:

- Problemas _CPU-bound_: Onde o progresso do processo é limitado pela velocidade da _CPU_ .
- Problemas _I/O-bound_: O progresso é limitado pela velocidade do subsistema de entrada/saída.

Um exemplo do primeiro é um conjunto de operações matemáticas complexas, que dependem exclusivamente do uso da _CPU_. O código
da seção anterior é um exemplo de _I/O-bound_.

### Threads e I/O

O Sistema Operacional é responsável pelo gerenciamento de uma _thread_. [Ele a interrompe a qualquer momento, salva o seu estado, e executa qualquer outra em seu lugar,
podendo resumi-la ao fim do processo](https://en.wikipedia.org/wiki/Preemption_%28computing%29#Preemptive_multitasking "Preemption (computing)").

_Larry Hastings_, no ["Python's Infamous GIL"](https://www.youtube.com/watch?t=11m40s&v=4zeHStBowEk&feature=youtu.be "Veja o talk no Youtube"), descreve
como o gerenciamento da _GIL_ funciona do ponto de vista da linguagem:

> The way Python threads work with the GIL is with a simple counter. With every 100 byte codes executed the
> GIL is supposed to be released by the thread currently executing in order to give other threads a chance to execute code.

Quando acessamos um banco de dados em outro servidor, um serviço _web_, ou um arquivo em um sistema de arquivos, estamos
realizando uma operação _I/O-bound_. Qualquer ação que demande comunicação com o _hardware_ (como os _sockets_), envolve comunicação
com o _kernel_ da máquina, e essa operação é mais lenta que as operações de uma _CPU_.

![Diagrama de tempo comparando I/O waiting e CPU processing com Threads](/media/iobound.png "I/O e CPU em um contexto I/O-Bound com Threads (realpython.com)")

Como resultado, a maioria das operações _I/O-bound_ ficará em um estado de "espera" até o momento em que ela receba um resultado. E como afirma _Cody Piersall_,
nessa [incrivelmente simples resposta no _Stackoverflow_](https://stackoverflow.com/questions/32256775/how-does-the-gil-in-python-affect-the-downloading-of-webpages-in-parallel "How does the GIL in python affect the downloading of webpages in parallel?"):

> The GIL won't hurt you here.
>
> For I/O bound tasks (like downloading webpages), the GIL is not a problem. Python releases the GIL when I/O is happening,
> which means all the threads will be able execute the requests in parallel.

Em outras palavras, a _thread_ que necessita pegar dados de uma fonte externa irá adquirir a _GIL_. Subseqüentemente o _lock_ é liberado
e é adquirido por outra _thread_ que inicia outro código _I/O-bound_ (por exemplo). Quando a _GIL_ é adquirida novamente pela primeira _thread_, possivelmente
ela já tenha recebido os dados.

![Fluxograma com threads e os passos de acquire GIL, waiting for GIL, e releasing GIL](/media/gil-lock-threads.png "Exemplo onde a GIL é aquirida e liberada em diferentes threads (medium.com/fintechexplained)")

Some isso ao fato de que [criar novos processos é normalmente mais caro do que _threads_](https://stackoverflow.com/questions/3044580/multiprocessing-vs-threading-python] "Multiprocessing vs Threading Python [duplicate]"), e temos uma resposta satisfatória aos números
apresentados no experimento anterior.

Portanto, se:

- _CPU-bound_: Use _multiprocessing_;
- _I/O-bound_: Use _threads_ ou _asyncio_.

## Async

E voltamos ao _asynchronous_, afinal esse é um _post_ sobre _ASGI_ 🙂

Segundo _Miguel Grinberg_, no _talk_ ["Asynchronous Python for the Complete Beginner"](https://www.youtube.com/watch?v=iG6fr81xHKA "Veja a apresentação na íntegra"), _async_
é:

> A style of concurrent programming in which tasks release the CPU during waiting
> periods, so that other tasks can use it.

É importante salientar que:

- _Async_ (_async IO_, _asynchoronous_, ou _asynchronous IO_) e _asyncio_ não são exatamente a mesma coisa;
- O _asynchronous IO_, de forma geral, é um estilo de programação concorrente;
- Já o [_asyncio_](https://docs.python.org/3/library/asyncio.html "Leia mais na documentação oficial") é uma das implementações _Python_ desse estilo (há outras implementações,
  como o [_uvloop_](http://github.com/MagicStack/uvloop "Veja o repositório")).

Continuamos dentro dos domínios da concorrência, mas ainda assim, apresentando uma técnica completamente diferente.

### Event loop

De forma simplista, imagine que há um objeto _Python_ chamado de _event loop_, e esse camarada é
quem controla como e quando cada _task_ irá rodar. Ele é consciente de cada _task_,
e sabe em qual estado cada uma está.

![Ilustração mostrando de forma subjetiva como o event loop funciona](/media/python-event-loop.png "O event loop é um pouco abstrato, e não consegui pensar em nenhum diagrama para explicá-lo (fadeevab.com)")

Por exemplo, o estado "pronto" indica que a tarefa tem trabalho a fazer e está pronta para rodar. O "esperando" indica
que a tarefa está esperando que alguma coisa externa termine, como as _I/O-bounds operations_ que discutimos anteriormente.

Para deixar as coisas simples, vamos imaginar que o _event loop_ mantenha uma lista para tarefas "prontas para executar", e outra para "esperando". Ele
pega uma das _tasks_ prontas para executar e bota para rodar. E aqui vai um detalhe importante: [A tarefa terá total controle da execução até o momento que
ela, cooperativamente, devolve o controle para o _event loop_](https://en.wikipedia.org/wiki/Cooperative_multitasking "Cooperative multitasking").

Quando a tarefa devolve o controle para o _event loop_, ele a coloca na determinada fila dependendo do seu estado. Ele (o _event loop_) percorre a lista de tarefas "esperando"
para checar se o _I/O_ de alguma delas já acabou, e portanto, se o seu estado agora é "pronta para executar". Essa tarefa é então movida para a lista de prontos para executar,
e o _event loop_ pega a próxima tarefa dessa mesma lista.

![Diagrama de tempo comparando I/O waiting e CPU processing com asyncio](/media/iobound-asyncio.png "I/O e CPU em um contexto I/O-Bound com asyncio (realpython.com)")

E o processo se repete.

### asyncio x multithreading

O _async_ e _threads_ podem até parecer ter algumas semelhanças, mas há muitas diferenças. Para começar, as "tarefas" no contexto
do _asyncio_ são chamadas de _coroutines_. Recorremos ao [_Stackoverflow_ para deixar as coisas mais claras](https://stackoverflow.com/questions/1934715/difference-between-a-coroutine-and-a-thread "Difference between a “coroutine” and a “thread”?"):

> With threads, the operating system switches running threads preemptively according to its scheduler, which is an algorithm in
> the operating system kernel. With coroutines, the programmer and programming language determine when to switch coroutines;
> in other words, tasks are cooperatively multitasked by pausing and resuming functions at set points, typically (but not
> necessarily) within a single thread.

Duas coisas importantes precisam ser observadas com essa afirmação:

1. Tarefas nunca são interrompidas no meio de uma operação, portanto, é mais fácil e seguro compartilhar recursos com _asyncio_ em comparação com _threads_.
2. É isso mesmo que você leu: Tipicamente (mas não necessariamente) dentro de uma única _thread_.

Outro ponto importante é que assim como _threads_, corrotinas são mais leves que subprocessos. Mas aposto que você ainda está chocado com o _single-thread_, então
vamos voltar a ele.

### O exemplo da enxadrista

O _asyncio_ é ([por padrão](https://docs.python.org/3/library/asyncio-dev.html#concurrency-and-multithreading "Concurrency and Multithreading")) _single-threaded_ e _single-process_. Como ele consegue ser uma alternativa tão interessante quanto os seus primos?

![Protagonista de Gambit's Queen jogando xadrez](/media/queens-gambit.jpg "Achou que não ia ter referência ao Gambito? (lifestyleasia.com)")

Voltamos a citar o _RealPython_, [trazendo o exemplo da enxadrista](https://realpython.com/async-io-python/ "Async IO in Python"):

> Chess master Judit Polgár hosts a chess exhibition in which she plays multiple amateur players.
> She has two ways of conducting the exhibition: synchronously and asynchronously.
>
> Assumptions
>
> - 24 opponents
> - Judit makes each chess move in 5 seconds
> - Opponents each take 55 seconds to make a move
> - Games average 30 pair-moves (60 moves total)
>
> **Synchronous version:** Judit plays one game at a time, never two at the same time, until the game is complete.
> Each game takes (55 + 5) _ 30 == 1800 seconds, or 30 minutes. The entire exhibition takes 24 _ 30 == 720 minutes, or **12 hours**.
>
> **Asynchronous version:** Judit moves from table to table, making one move at each table. She leaves the table and lets the opponent
> make their next move during the wait time. One move on all 24 games takes Judit 24 _ 5 == 120 seconds, or 2 minutes.
> The entire exhibition is now cut down to 120 _ 30 == 3600 seconds, or just **1 hour**.

Temos apenas uma _Judit_, que pode fazer um movimento por vez por ela mesma. Ela jogar cada jogo de forma síncrona limita ela
também ao tempo que o outro enxadrista tem para respondê-la. Mas de forma assíncrona, ela consegue lidar com múltiplas tarefas acontecendo concorrentemente,
em turnos que permitem que ao tempo que um enxadrista está pensando em uma resposta, ela se move para o próximo, e retorna quando o primeiro estiver pronto.

Imagine que _Judit_ é o _event loop_, e que as jogadas com os 24 oponentes são tarefas acontecendo concorrentemente.

### async/await

Mas como?

O _Python_ apresenta algumas palavras reservadas que permitem informar ao _event loop_ o estado da tarefa sendo executada.
Você provavelmente já ouviu falar das principais: `async` e `await`.

Com a primeira, indicamos ao _Python_ que uma função trata-se de uma corrotina (ou um [_generator_ assíncrono](https://www.python.org/dev/peps/pep-0525/ "Leia a PEP 525")).
Já com o `await`, estamos dando o controle de volta ao _event loop_, e sinalizando que podemos esperar pelo resultado de determinada operação.

Ou seja, com o código abaixo:

```python
async def g():
    r = await f()
    return r
```

Queremos dizer:

```text
Suspenda a execução de g(),
até que o que quer que a gente esteja esperando em f()
seja retornado.

Nesse meio tempo, vá executar alguma outra coisa...
```

E note que bibliotecas para _I/O_ precisam suportar essa forma de escrita, caso contrário não estaremos de fato fazendo uso das propriedades do _async_.

### Na prática

Voltamos ao mesmo exemplo usado com _threads_ e _multiprocessing_, mas agora reescrito para utilizar a biblioteca `asyncio`:

```python
# async.py

import asyncio
import httpx
import itertools

URLS = ['http://www.foxnews.com/',
        'http://www.cnn.com/',
        'http://www.bbc.co.uk/', ]


async def measure_url(client, url):
    resp = await client.get(url)
    length = len(resp.text)
    return (url, length)


async def main():
    async with httpx.AsyncClient() as client:
        results = await asyncio.gather(
            *map(measure_url, itertools.repeat(client), URLS)
        )

    for (url, length) in results:
        print(f"{url} tem {length} bytes")


if __name__ == "__main__":
    asyncio.run(main())

```

Note o uso das palavras reservadas `async` e `await`, e do inicializador do _event loop_. Além, claro,
do uso de bibliotecas não bloqueantes como o caso da [_httpx_](https://www.python-httpx.org "A next-generation HTTP client for Python").

E como fica o comparativo com _threads_ e processos? Mais uma vez rodando com `time`, temos:

```text
$ time python async.py
http://www.foxnews.com/ tem 339756 bytes
http://www.cnn.com/ tem 1145150 bytes
http://www.bbc.co.uk/ tem 317556 bytes
python async.py  0.22s user 0.07s system 13% cpu 2.151 total
```

Nada mal. Quase metade do tempo usando `multiprocessing`, e um pouco mais que usando _threads_. Isso não quer
dizer que _asyncio_ é necessariamento mais lento, [apenas que o contexto desse experimento favoreceu o exemplo com _threads_](https://stackoverflow.com/questions/8546273/is-non-blocking-i-o-really-faster-than-multi-threaded-blocking-i-o-how "Is non-blocking I/O really faster than multi-threaded blocking I/O? How?").

O propósito do comparativo com `time` nesse artigo é apenas ilustrar que há diferença entre as opções possíveis. Mas se
você não está satisfeito com o resultado, o _Stackoverflow_ [pode ajudar novamente](https://stackoverflow.com/questions/27435284/multiprocessing-vs-multithreading-vs-asyncio-in-python-3 "multiprocessing vs multithreading vs asyncio in Python 3"):

> - CPU Bound => Multi Processing
> - I/O Bound, Fast I/O, Limited Number of Connections => Multi Threading
> - I/O Bound, Slow I/O, Many connections => Asyncio

Vai depender do contexto do problema sendo resolvido.

## Considerações finais

Eu lembro de estar em mais de uma entrevista de emprego, e ser perguntado
sobre como fazer _CPU-bound_ e _IO-bound_ em _Python_.

Agora sabemos o básico sobre os principais conceitos relacionados à concorrência em _Python_. Temos uma perspectiva
mais detalhada sobre a _GIL_, e não entramos no mérito de debater se ela é boa ou ruim.
Entender a natureza das _threads_ na linguagem é mais importante, e é crucial para decidirmos da melhor forma como solucionar
problemas concorrentes.

E optar pelo _async/ASGI_ faz parte disso também. Portanto, agora que temos todo o contexto de concorrência e paralelismo,
no próximo _post_ vamos revisitar o funcionamento do _WSGI_, compará-lo com o seu primo mais novo, e compreender a motivação por trás da alternativa.

Até a próxima.

## Referências

- [CallHub - Understanding Python GIL](https://callhub.io/understanding-python-gil/)
- [Dev.to - Multi-threading vs Event Loop in Python](https://dev.to/mervynlee94/multi-threading-vs-event-loop-in-python-1h4h)
- [Diogo M Martins - Concorrência e paralelismo: Threads, múltiplos processos e asyncio - Parte 1](https://diogommartins.wordpress.com/2017/04/07/concorrencia-e-paralelismo-threads-multiplos-processos-e-asyncio-parte-1/)
- [FinTechExplained - Advanced Python: Concurrency And Parallelism](https://medium.com/fintechexplained/advanced-python-concurrency-and-parallelism-82e378f26ced)
- [FullStackAI - Concurrency in Python: Cooperative vs Preemptive Scheduling](https://medium.com/fullstackai/concurrency-in-python-cooperative-vs-preemptive-scheduling-5feaed7f6e53)
- [Gitconnected - DIY: Multithreading vs Multiprocessing in Python](https://levelup.gitconnected.com/diy-multithreading-vs-multiprocessing-in-python-fb93698ca7f3)
- [Miguel Grinberg - Sync vs. Async Python: What is the Difference?](https://blog.miguelgrinberg.com/post/sync-vs-async-python-what-is-the-difference)
- [Oxford Protein Informatics Group - Making the most of your CPUs when using python](https://www.blopig.com/blog/2019/01/making-the-most-of-your-cpus-when-using-python/)
- [RealPython - Async IO in Python: A Complete Walkthrough](https://realpython.com/async-io-python/)
- [RealPython - Speed Up Your Python Program With Concurrency](https://realpython.com/python-concurrency/)
- [RealPython - What Is the Python Global Interpreter Lock (GIL)?](https://realpython.com/python-gil/)
- [Stackify - Python Garbage Collection: What It Is and How It Works](https://stackify.com/python-garbage-collection/)
- [Stackoverflow - Difference between a “coroutine” and a “thread”?](https://stackoverflow.com/questions/1934715/difference-between-a-coroutine-and-a-thread)
- [Stackoverflow - How does python handle thread locking / context switching?](https://stackoverflow.com/questions/33352298/how-does-python-handle-thread-locking-context-switching)
- [Stackoverflow - Is non-blocking I/O really faster than multi-threaded blocking I/O? How?](https://stackoverflow.com/questions/8546273/is-non-blocking-i-o-really-faster-than-multi-threaded-blocking-i-o-how)
- [Stackoverflow - multiprocessing vs multithreading vs asyncio in Python 3](https://stackoverflow.com/questions/27435284/multiprocessing-vs-multithreading-vs-asyncio-in-python-3)
- [Stackoverflow - Multiprocessing vs Threading Python [duplicate]](https://stackoverflow.com/questions/3044580/multiprocessing-vs-threading-python)
- [Stackoverflow - What do the terms “CPU bound” and “I/O bound” mean?](https://stackoverflow.com/questions/868568/what-do-the-terms-cpu-bound-and-i-o-bound-mean)
- [Stackoverflow - What is the difference between concurrency and parallelism?](https://stackoverflow.com/questions/1050222/what-is-the-difference-between-concurrency-and-parallelism)
- [Testdriven.io - Parallelism, Concurrency, and AsyncIO in Python - by example](https://testdriven.io/blog/python-concurrency-parallelism/)
- [Timber - Multiprocessing Vs. Threading In Python: What You Need To Know.](https://timber.io/blog/multiprocessing-vs-multithreading-in-python-what-you-need-to-know/)
- [Youtube - Miguel Grinberg Asynchronous Python for the Complete Beginner PyCon 2017](https://www.youtube.com/watch?v=iG6fr81xHKA)
