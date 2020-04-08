---
title: "Uma ode ao Docker - Parte 3"
date: 2017-08-11 18:00:00
tags:
  [
    "desenvolvimento-web",
    "infraestrutura",
    "virtualizacao",
    "containerizacao",
    "docker",
    "nginx",
    "python",
    "django",
  ]
slug: uma-ode-ao-docker-parte-3
thumbnail: ./images/docker-logo-3.jpg
---

Nos [_posts_](/2017/01/14/uma-ode-ao-docker-parte-1.html "Uma ode ao Docker - Parte 1")
[anteriores](/2017/05/01/uma-ode-ao-docker-parte-2.html "Uma ode ao Docker - Parte 2")
arranhamos um pouco o conceito por trás do [_Docker_](/tag/docker.html "Leia mais sobre Docker"),
bem como introduzimos o utilitário de linha de comando `docker`. Nesse último artigo da série, vamos
explorar como usar o _Dockerfile_ no empacotamento de uma aplicação [_Django_](/tag/django.html "Leia mais sobre Django").

Se você ainda tem dúvidas em como "encaixar" o _Docker_ no seu fluxo de desenvolvimento,
o artigo ["Why I Switched from a Traditional Deployment to Using Docker"](http://www.patricksoftwareblog.com/why-i-switched-from-a-traditional-deployment-to-using-docker/ "Leia na íntegra")
pode ser uma boa leitura.

## Configurando a aplicação Django

Vamos configurar uma aplicação de exemplo para sermos capazes de dar os passos necessários
na criação do `Dockerfile`. Primeiramente, vamos criar
_[virtualenv](/tag/virtualenv.html "Leia mais sobre virtualenv") Python_ com [_pyenv_](/tag/pyenv.html "Leia mais sobre Pyenv"):

```
$ pyenv virtualenv 3.6.1 helloworld-django-docker
```

Criamos o diretório para o projeto:

```
$ mkdir ~/Workspace/helloworld
$ cd ~/Workspace/helloworld/
```

Ativamos o _virtualenv_:

```
$ pyenv activate helloworld-django-docker
```

Instalamos as dependências _Django_ e iniciamos o projeto:

```
$ pip install django gunicorn
(...)

$ pip freeze > requirements.txt
$ django-admin startproject helloworld ~/Workspace/helloworld
```

Rodamos o `python manage.py runserver` só para termos certeza que está tudo ok:

!["It worked"](./images/django-it-worked.png "It worked")

Além disso, garantimos que o `gunicorn` rodará sem maiores problemas:

```
$ gunicorn helloworld.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3
```

Para saber mais sobre o _Gunicorn_, leia a [documentação oficial](http://docs.gunicorn.org/en/stable/design.html "Documentação do Gunicorn") do projeto.

## Entra o Dockerfile

Com o [_Docker_ instalado](https://docs.docker.com/engine/installation/ "Instalando o Docker"),
vamos começar a escrever o `Dockerfile`. O [_Mundo Docker_](http://www.mundodocker.com.br/o-que-e-dockerfile/ "O que é o Dockerfile") define o arquivo como:

> (...) um arquivo de definição onde é possível realizar ou preparar todo ambiente a
> partir de um script de execução. Em resumo, o Dockerfile é um arquivo texto
> com instruções, comandos e passos que você executaria manualmente, basicamente
> o Docker executa uma receita de bolo.

É nesse arquivo que escreveremos todos os procedimentos que o _Docker_ executará para criar
a imagem da nossa aplicação.

### Por partes, como diria Jack

Começamos especificando qual será a "imagem base" da nossa imagem/_container_. Faremos isso
através da expressão `FROM`. Poderíamos dizer aqui que queremos estender a imagem [\_/debian](https://hub.docker.com/_/debian/ "Imagem Debian no Dockerhub")
e realizar toda a instalação do [_Python_](/tag/python.html "Leia mais sobre Python").
Mas felizmente já existem imagens prontas com a linguagem no _Docker Hub_.
Vamos com a [imagem oficial](https://hub.docker.com/_/python/ "Imagem Python no Docker Hub") como base:

```Dockerfile
# Dockerfile

FROM python:3
```

Quando "buildarmos", o _Docker_ baixará a imagem do _Python_ do repositório (se ela já não existir localmente
em sua máquina), e dará sequência às instruções encontradas no `Dockerfile`.

Uma boa prática é "fecharmos o escopo" de trabalho ao setar explicitamente qual será o
diretório no qual iremos realizar demais operações como cópia de arquivos ou execução de binários. Para isso
temos o comando `WORKDIR`:

```Dockerfile
FROM python:3

WORKDIR /usr/src/app
```

Agora podemos instalar o _Django_ e o _Gunicorn_, assim como fizemos no início desse artigo:

```Dockerfile
FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt
```

Você já deve ter reparado um padrão na escrita do `Dockerfile`, certo? Os comandos (em maiúsculo)
determinam qual operação será realizada. Os parâmetros (em minúsculo) determinam como isso irá ocorrer.

!["Escrever Dockerfile é tipo falar baleiês (insidethemagic.net)"](./images/docker-dory-whale.jpg "Escrever Dockerfile é tipo falar baleiês (insidethemagic.net)")

No caso do comando `COPY`, passamos o arquivo `requirements.txt` da nossa "máquina local" para
o _container_, assim o _Docker_ será capaz de encontrar o arquivo e realizar a instalação das dependências
através do comando `pip`.

Para finalizar, podemos copiar o resto do projeto e executar o servidor _WSGI_:

```Dockerfile
FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "helloworld.wsgi:application", "--bind=0.0.0.0:8000", "--workers=3"]
```

Comandos `RUN` serão executados em tempo de _build_. São essenciais para a construção do ambiente,
e são responsáveis pelos "layers" discutidos nos _posts_ anteriores. Portanto é bem comum
vermos comandos como `RUN apt-get dist-upgrade -y`. Já o `CMD` será executado no momento que a sua
imagem for executada.

[Diferença entre `RUN`, `CMD` e `ENTRYPONT`](http://goinbigdata.com/docker-run-vs-cmd-vs-entrypoint/ "Docker RUN vs CMD vs ENTRYPOINT").

E se você está se perguntando o motivo de termos dois `COPY`, essa prática é útil para o mecanismo de _caching_
do _Docker_ e invalidação do mesmo, como pode ser visto no [guia de boas práticas](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#add-or-copy "Dockerfile best practices").

### "Build" é quase BIRL!

Hora de "buildar"! Execute o seguinte comando:

```
$ docker build -t <docker-hub-user>/helloworld-django-docker .
```

Onde:

- `build`: É o comando para criar uma imagem _Docker_ a partir de um _Dockerfile_;
- `-t`: O parâmetro `-t` é utilizado para nomear e tagear a imagem em questão.
  É interessante usar o padrão `<usuario-ou-repositorio>/nome-da-imagem`;
- `.`: O caminho onde encontra-se o _Dockerfile_.

Se tudo der certo, será possível listar a imagem recém criada:

```
$ docker images

REPOSITORY                         TAG    IMAGE ID
kplaube/helloworld-django-docker   latest b8d3b0c234a9
```

Agora sim seremos capazes de executar a aplicação _Django_ através de um _container_:

```
$ docker run -it -p 8000:8000 <docker-hub-user>/helloworld-django-docker
```

E mais uma vez seremos capazes de ver o "It worked!" em `http://localhost:8000`.

Belezura! Uma vez que a imagem esteja ok, podemos publicá-la no _Docker Hub_ (afinal,
propaganda é a alma do negócio):

```
$ docker push <docker-hub-user>/helloworld-django-docker
```

E... _voilá_! A imagem foi publicada no [_Docker Hub_](https://hub.docker.com/r/kplaube/helloworld-django-docker/).

### Antes de ir: Efêmero

Nos _posts_ anteriores demos uma pincelada numa das características dos _containers_
que é a sua "efemeridade". Isso significa que, a cada nova versão da sua _app Django_
você terá que "buildar" uma nova versão da imagem _Docker_. A boa notícia é que com
o mecanismo de _caching_ do _Docker_ essa operação deverá ser ligeiramente mais
rápida do que da primeira vez.

Além disso, mesmo que você tenha uma leve camada de escrita ao executar um _container_,
a informação será perdida ao parar/reiniciar o mesmo. Portanto, o uso de [_Docker Volumes_](https://docs.docker.com/engine/admin/volumes/volumes/ "Use volumes")
é essencial quando se faz necessária a persistência de dados.

## Considerações finais

Com esse _post_ fechamos essa pequena ode ao _Docker_. Sem dúvida, uma ferramenta que vem mudando
paradigmas (o mais recente deles com o [lançamento da versão 1.0](https://www.opencontainers.org/announcement/2017/07/19/open-container-initiative-oci-releases-v1-0-of-container-standards "Open Container Initiative (OCI) Releases v1.0 of Container Standards") do _Container Standards_).

Pretendo abordar mais sobre _Docker_ aqui no _blog_, principalmente detalhando melhor
o uso do mesmo no [_deploy_](/tag/deploy.html "Leia mais sobre deploy") de aplicações _Django_.
Com a adoção de conteinerização por serviços _PaaS_ como _Heroku_ e _Openshift_,
há muito assunto a ser explorado nessa seara.

Até a próxima!

## Referências

- [Docker Docs - Best practices for writing Dockerfiles](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/)
- [Flavio Silveira - Criando Seu Container Com Dockerfile](http://flaviosilveira.com/2017/criando-seu-container-com-dockerfile/)
- [Mundo Docker - O que é Dockerfile](http://www.mundodocker.com.br/o-que-e-dockerfile/)
- [Patrick's Software Blog - How to use Docker and Docker Compose to Create a Flask Application](http://www.patricksoftwareblog.com/how-to-use-docker-and-docker-compose-to-create-a-flask-application/)
- [Semaphore - Dockerizing a Python Django web Application](https://semaphoreci.com/community/tutorials/dockerizing-a-python-django-web-application)
