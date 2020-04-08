---
title: "Uma ode ao Docker - Parte 2"
date: 2017-05-01 22:25:00
tags: ["infraestrutura", "virtualizacao", "containerizacao", "docker", "nginx"]
slug: uma-ode-ao-docker-parte-2
thumbnail: ./images/docker-logo-2.png
---

No [_post_ anterior](/2017/01/14/uma-ode-ao-docker-parte-1.html "Uma ode ao Docker - Parte 1")
falamos sobre o _Docker_, e arranhamos um pouco sobre a diferença entre
virtualização com _Hypervisor_ e _Container_. Nesse _post_,
vamos explorar um pouquinho mais alguns conceitos, mostrando como funciona essa
ferramenta que é sensação quando o assunto é _virtual machines_.

Mas antes, vamos relembrar o que é o _Docker_:

> "Docker is an open platform for building, shipping and running distributed
> applications. It gives programmers, development teams, and operations engineers
> the common toolbox they need to take advantage of the distributed and networked
> nature of modern applications."

Em uma linguagem mais simples, _Docker_ lhe dá a habilidade de executar
aplicações dentro de um ambiente controlado, conhecido como _Container_.
_Containers_ são similares às tradicionais máquinas virtuais, contudo, eles
compartilham o mesmo sistema operacional e provém um conjunto de comandos
que permitem a execução e controle da sua aplicação ou processo.

[Veja a diferença entre _Vagrant_ e _Docker_](https://www.youtube.com/watch?v=pGYAg7TMmp0 "Docker Tutorial - What is Docker & Docker Containers, Images, etc?").

## Instalando

Talvez você se depare com alguns artigos na _Internet_, que ao falar sobre a
instalação do _Docker_, também mencionem **boot2docker** ou a necessidade do
**docker-machine**. Houve um tempo onde utilizar _Docker_ em máquinas
_Windows_ ou _OSX_ não era tão trivial assim... mas esse tempo ficou para trás.

Hoje, basta acessar a [página de _download_](https://www.docker.com/community-edition#/download "Baixe o Docker Community Edition"),
selecionar o seu sistema operacional, e seguir o passo a passo
(que geralmente consiste em uma série de "next-next-finish").

[Entenda a diferença entre o Docker Toolbox e Docker for Mac](https://docs.docker.com/docker-for-mac/docker-toolbox/ "Docker for Mac vs. Docker Toolbox").

Uma vez instalado, através do terminal execute o seguinte comando:

```
$ docker images

REPOSITORY   TAG   IMAGE  ID   CREATED   SIZE
```

Esse é o momento ideal para falarmos de outro conceito muito importante dentro
do _Docker_: **Images**.

## Imagens

Segundo a documentação oficial:

> An image is a lightweight, stand-alone, executable package that includes
> everything needed to run a piece of software, including the code, a runtime,
> libraries, environment variables, and config files.

Ou seja, um _Docker Image_ é um binário que inclui todos os requisitos
necessários para rodar um _Container_. Podemos pensar sobre esse
conceito como uma tecnologia para empacotamento (ou até mesmo como uma espécie _snapshot_),
onde não só definimos nossa distribuição _Linux_ ou serviços utilizados
(como _Postgres_ ou _Nginx_, por exemplo), como também adicionamos a nossa própria aplicação
ao pacote.

Uma imagem é imutável, ou seja, _read only_. Imagens
geralmente são compostas por outras camadas de imagens (_image layers_). Isso é um
_approach_ interessante, já que uma vez que uma camada seja baixada ela não precisará ser
baixada novamente, mesmo se outras imagens utilizarem da mesma camada:

!["Esquema representando o Sistema de Arquivo (docs.docker.com)"](./images/docker-image-container.jpg "Esquema representando o Sistema de Arquivo (docs.docker.com)")

Um _Docker Container_ em vias práticas é uma "instância" da imagem... é o que a imagem se torna em memória
ao ser executada. De forma preguiçosa, podemos fazer a analogia com a [Orientação a Objetos](/tag/oop.html "Leia mais sobre OOP"),
onde a imagem pode ser comparada com uma classe, e a instância com um _Container_. Podemos ter
tantos _containers_ quanto necessário para uma mesma imagem.

## Um pouco de prática

Vamos baixar a nossa primeira imagem _Docker_. Para isso, execute o seguinte comando:

```
$ docker pull docker/whalesay
```

O comando `docker pull` fará o _download_ da imagem `docker/whalesay`
para o seu computador. Essa imagem está hospedada (por padrão) no [_Docker Hub_](https://hub.docker.com/r/docker/whalesay/),
uma espécie de "Github para imagens Docker".

[Leia mais sobre o _Docker Hub_](https://hub.docker.com/ "Docker Hub").

É possível visualizarmos a imagem através do comando `docker images`:

```
$ docker images

REPOSITORY         TAG       IMAGE ID        CREATED          SIZE
docker/whalesay    latest    6b362a9f73eb    23 months ago    247 MB
```

É uma prática comum o repositório/nome da imagem ser chamado de
`<repositório>/<nome de imagem>`. Isso evita que haja duplicidade no _Docker Hub_. Para
executar a imagem (e por consequência criar um _Container_), temos o comando `docker run`:

```
$ docker run docker/whalesay cowsay boo
 _____
< boo >
 -----
    \
     \
      \
                    ##        .
              ## ## ##       ==
           ## ## ## ##      ===
       /""""""""""""""""___/ ===
  ~~~ {~~ ~~~~ ~~~ ~~~~ ~~ ~ /  ===- ~~~
       \______ o          __/
        \    \        __/
          \____\______/
```

Também é possível executarmos através do `ID` da imagem:

```
$ docker run 6b362a9f73eb cowsay boo2
```

## Welcome to Nginx!

É claro que o _Docker_ é muito mais poderoso do que isso. Por exemplo, vamos baixar o
[_Nginx_](/tag/nginx.html "Leia mais sobre o Nginx") e ver como podemos receber uma simpática tela de "It's working":

```
$ docker pull nginx
```

Notou a ausência do `<repositório>/`? Repositórios oficiais no _Docker Hub_ não necessitam
de um prefixo, e você pode encontrá-los na interface _web_ através do _path_ `_/<nome da imagem>`.
Por exemplo, o endereço do _Nginx_ no _Docker Hub_ é [https://hub.docker.com/\_/nginx/](https://hub.docker.com/_/nginx/).

!["Assim como em Memento, o Docker também depende de imagens e tem memória curta (problemasfilosoficos.blogspot.com.br)"](./images/memento-docker.png "Assim como em Memento, o Docker também depende de imagens e tem memória curta (problemasfilosoficos.blogspot.com.br)")

Vamos executar o _Nginx_:

```
$ docker run -p 5000:80 nginx
```

Mapemos a porta `5000` da nossa máquina para apontar para a porta `80` do _Container_. Logo, ao acessarmos
o `http://localhost:5000`, recebemos a simpática tela de boas vindas ao _Nginx_.

Podemos dar um nome ao processo, e ainda executá-lo em modo _daemon_:

```
$ docker run --name docker-nginx -p 5000:80 -d nginx

796ab2f0a662c045d0cfc99ff836a364a384406b8c6eaf03bcfb65e6cfd87751
```

O valor de retorno é o _ID_ do _Container_. Note a presença dos parâmetros `--name` e `-d`.

Para listar os _Containers_ ativos, usamos o comando `ps`:

```
$ docker ps

CONTAINER ID    IMAGE    COMMAND
796ab2f0a662    nginx    "nginx -g 'daemon ..."
CREATED           STATUS           PORTS                  NAMES
12 seconds ago    Up 11 seconds    0.0.0.0:5000->80/tcp   docker-nginx
```

Para parar o serviço:

```
$ docker stop docker-nginx
```

Pronto! Simples como as melhores coisas da vida.

## Considerações finais

Lembro até hoje do momento em que ouvi falar sobre _Docker_ pela primeira vez,
e me questionei: Onde é que eu encaixo a minha ferramenta de provisionamento?

Pois bem, não se faz necessário ter uma ferramenta de provisionamento uma vez que a sua
aplicação seja empacotada em uma imagem _Docker_. A forma de pensar no _deploy_ da
aplicação muda, uma vez que ela esteja "containerizada".

No próximo _post_ da série vamos utilizar _Docker_ em uma aplicação [_Python_](/tag/python.html "Leia mais sobre Python")
e [_Django_](/tag/django.html "Leia mais sobre Django"), e nos deparar com
algumas peculiaridades de ambientes _Docker_ (como por exemplo, os ambiente efêmeros).

Até a próxima!

## Referências

- [_Docker Docs_ - _Get started, Part 1: Orientation and Setup_](https://docs.docker.com/get-started/)
- [_MundoDocker_ - O que é uma imagem?](http://www.mundodocker.com.br/o-que-e-uma-imagem/)
- [_Openshift_ - _Docker images_](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/containers_and_images.html#docker-images)
- [_Semaphore_ - _Dockerizing a Python Django web Application_](https://semaphoreci.com/community/tutorials/dockerizing-a-python-django-web-application)
- [_Stackoverflow_ - _Docker image vs container_](http://stackoverflow.com/questions/23735149/docker-image-vs-container)
