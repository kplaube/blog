Title: Uma ode ao Docker - Parte 2
Date: 2017-05-01 22:25:00
Category: infraestrutura
Tags: infraestrutura, virtualizacao, containerizacao, docker, nginx
Slug: uma-ode-ao-docker-parte-2
meta_description: Vamos deixar a parte de containers de lado para falar um pouco mais sobre imagens, e baixar a primeira imagem do Docker Hub

{% img align-left /images/blog/docker-logo-2.png 180 180 Logotipo do Docker %}

No [*post* anterior]({filename}uma-ode-ao-docker.md "Uma ode ao Docker - Parte 1")
falamos sobre o *Docker*, e arranhamos um pouco sobre a diferença entre
virtualização com *Hypervisor* e *Container*. Nesse *post*,
vamos explorar um pouquinho mais alguns conceitos, mostrando como funciona essa
ferramenta que é sensação quando o assunto é *virtual machines*.

<!-- PELICAN_END_SUMMARY -->

Mas antes, vamos relembrar o que é o *Docker*:

> "Docker is an open platform for building, shipping and running distributed
> applications. It gives programmers, development teams, and operations engineers
> the common toolbox they need to take advantage of the distributed and networked
> nature of modern applications."

Em uma linguagem mais simples, *Docker* lhe dá a habilidade de executar
aplicações dentro de um ambiente controlado, conhecido como *Container*.
*Containers* são similares às tradicionais máquinas virtuais, contudo, eles
compartilham o mesmo sistema operacional e provém um conjunto de comandos
que permitem a execução e controle da sua aplicação ou processo.

[Veja a diferença entre *Vagrant* e *Docker*](https://www.youtube.com/watch?v=pGYAg7TMmp0 "Docker Tutorial - What is Docker & Docker Containers, Images, etc?").


## Instalando

Talvez você se depare com alguns artigos na *Internet*, que ao falar sobre a
instalação do *Docker*, também mencionem **boot2docker** ou a necessidade do
**docker-machine**. Houve um tempo onde utilizar *Docker* em máquinas
*Windows* ou *OSX* não era tão trivial assim... mas esse tempo ficou para trás.

Hoje, basta acessar a [página de *download*](https://www.docker.com/community-edition#/download "Baixe o Docker Community Edition"),
selecionar o seu sistema operacional, e seguir o passo a passo
(que geralmente consiste em uma série de "next-next-finish").

[Entenda a diferença entre o Docker Toolbox e Docker for Mac](https://docs.docker.com/docker-for-mac/docker-toolbox/ "Docker for Mac vs. Docker Toolbox").

Uma vez instalado, através do terminal execute o seguinte comando:

```
$ docker images

REPOSITORY   TAG   IMAGE  ID   CREATED   SIZE
```

Esse é o momento ideal para falarmos de outro conceito muito importante dentro
do *Docker*: **Images**.

## Imagens

Segundo a documentação oficial:

> An image is a lightweight, stand-alone, executable package that includes
> everything needed to run a piece of software, including the code, a runtime,
> libraries, environment variables, and config files.

Ou seja, um *Docker Image* é um binário que inclui todos os requisitos
necessários para rodar um *Container*. Podemos pensar sobre esse
conceito como uma tecnologia para empacotamento (ou até mesmo como uma espécie *snapshot*),
onde não só definimos nossa distribuição *Linux* ou serviços utilizados
(como *Postgres* ou *Nginx*, por exemplo), como também adicionamos a nossa própria aplicação
ao pacote.

Uma imagem é imutável, ou seja, *read only*. Imagens
geralmente são compostas por outras camadas de imagens (*image layers*). Isso é um
*approach* interessante, já que uma vez que uma camada seja baixada ela não precisará ser
baixada novamente, mesmo se outras imagens utilizarem da mesma camada:

{% img align-center /images/blog/docker-image-container.jpg 610 424 Esquema representando o Sistema de Arquivo (docs.docker.com) %}

Um *Docker Container* em vias práticas é uma "instância" da imagem... é o que a imagem se torna em memória
ao ser executada. De forma preguiçosa, podemos fazer a analogia com a [Orientação a Objetos]({tag}oop "Leia mais sobre OOP"),
onde a imagem pode ser comparada com uma classe, e a instância com um *Container*. Podemos ter
tantos *containers* quanto necessário para uma mesma imagem.


## Um pouco de prática

Vamos baixar a nossa primeira imagem *Docker*. Para isso, execute o seguinte comando:

```
$ docker pull docker/whalesay
```

O comando `docker pull` fará o *download* da imagem `docker/whalesay`
para o seu computador. Essa imagem está hospedada (por padrão) no [*Docker Hub*](https://hub.docker.com/r/docker/whalesay/),
uma espécie de "Github para imagens Docker".

[Leia mais sobre o *Docker Hub*](https://hub.docker.com/ "Docker Hub").

É possível visualizarmos a imagem através do comando `docker images`:

```
$ docker images

REPOSITORY         TAG       IMAGE ID        CREATED          SIZE
docker/whalesay    latest    6b362a9f73eb    23 months ago    247 MB
```

É uma prática comum o repositório/nome da imagem ser chamado de
`<repositório>/<nome de imagem>`. Isso evita que haja duplicidade no *Docker Hub*. Para
executar a imagem (e por consequência criar um *Container*), temos o comando `docker run`:

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

É claro que o *Docker*  é muito mais poderoso do que isso. Por exemplo, vamos baixar o
[*Nginx*]({tag}nginx "Leia mais sobre o Nginx") e ver como podemos receber uma simpática tela de "It's working":

```
$ docker pull nginx
```

Notou a ausência do `<repositório>/`? Repositórios oficiais no *Docker Hub* não necessitam
de um prefixo, e você pode encontrá-los na interface *Web* através do *path* `_/<nome da imagem>`.
Por exemplo, o endereço do *Nginx* no *Docker Hub* é [https://hub.docker.com/_/nginx/](https://hub.docker.com/_/nginx/).

{% img align-center /images/blog/memento-docker.png 610 458 Assim como em Memento, o Docker também depende de imagens e tem memória curta (problemasfilosoficos.blogspot.com.br) %}

Vamos executar o *Nginx*:

```
$ docker run -p 5000:80 nginx
```

Mapemos a porta `5000` da nossa máquina para apontar para a porta `80` do *Container*. Logo, ao acessarmos
o `http://localhost:5000`, recebemos a simpática tela de boas vindas ao *Nginx*.

Podemos dar um nome ao processo, e ainda executá-lo em modo *daemon*:

```
$ docker run --name docker-nginx -p 5000:80 -d nginx

796ab2f0a662c045d0cfc99ff836a364a384406b8c6eaf03bcfb65e6cfd87751
```

O valor de retorno é o *ID* do *Container*. Note a presença dos parâmetros `--name` e `-d`.

Para listar os *Containers* ativos, usamos o comando `ps`:

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

Lembro até hoje do momento em que ouvi falar sobre *Docker* pela primeira vez,
e me questionei: Onde é que eu encaixo a minha ferramenta de provisionamento?

Pois bem, não se faz necessário ter uma ferramenta de provisionamento uma vez que a sua
aplicação seja empacotada em uma imagem *Docker*. A forma de pensar no *deploy* da
aplicação muda, uma vez que ela esteja "containerizada".

No próximo *post* da série vamos utilizar *Docker* em uma aplicação [*Python*]({tag}python "Leia mais sobre Python")
e [*Django*]({tag}django "Leia mais sobre Django"), e nos deparar com
algumas peculiaridades de ambientes *Docker* (como por exemplo, os ambiente efêmeros).

Até a próxima!

## Referências

- [*Docker Docs* - *Get started, Part 1: Orientation and Setup*](https://docs.docker.com/get-started/)
- [*MundoDocker* - O que é uma imagem?](http://www.mundodocker.com.br/o-que-e-uma-imagem/)
- [*Openshift* - *Docker images*](https://docs.openshift.com/enterprise/3.0/architecture/core_concepts/containers_and_images.html#docker-images)
- [*Semaphore* - *Dockerizing a Python Django Web Application*](https://semaphoreci.com/community/tutorials/dockerizing-a-python-django-web-application)
- [*Stackoverflow* - *Docker image vs container*](http://stackoverflow.com/questions/23735149/docker-image-vs-container)
