Title: Uma ode ao Docker - Parte 1
Date: 2017-01-14 18:20:00
Category: infraestrutura
Tags: infraestrutura, virtualizacao, containerizacao, docker
Slug: uma-ode-ao-docker-parte-1
meta_description: Venha ficar por dentro da containerização, utilizada pelo Docker para criar ambientes virtuais.

{% img align-left /images/blog/docker-logo.png 180 180 Logotipo do Docker %}

Virtualização é um dos assuntos que mais evoluiu nesses últimos anos de TI. Mas
foi o termo "containerização" que teve um "boom" de popularidade recentemente. Isso graças
ao [*Docker*](https://www.docker.com/ "Build, ship, run"), popular ferramenta que tem
tornado a virtualização/containerização em uma *commodity* no universo de desenvolvimento de *Software*.

<!-- PELICAN_END_SUMMARY -->

Para ser sincero, eu só "parei para olhar" o *Docker* no final do ano passado,
através de um
[excelente curso do *Udemy*](https://www.udemy.com/docker-tutorial-for-devops-run-docker-containers/learn/v4/overview "The Complete Docker Course for DevOps and Developers").
Se você assim como eu ainda não teve tempo para ver "qualé", vem comigo que eu te mostro :)

## Antes do Docker: Containers

Eu só comecei a entender realmente o que era o *Docker* a partir do momento
que compreendi o que é um container.

No mundo "pré-virtualização", quando lidávamos com problemas como escalabilidade ou isolamento,
precisávamos adquirir uma nova máquina física, instalar e configurar o Sistema Operacional,
bem como instalar e configurar a própria aplicação:

{% img align-center-keep-size /images/blog/docker-pre-virtualization.png 400 292 Diagrama de era pré-virtualização (udemy.com) %}

Além do custo altíssimo para replicar a arquitetura acima, o tempo para solicitar uma
nova máquina e realizar uma possível migração eram absurdamente altos. Além disso,
há um incrível desperdício de recursos, já que não é necessário um *hardware*
exclusivo para servir uma aplicação [*Web*]({tag}web "Leia mais sobre Web") simples.

### Hypervisor

O conceito de [máquina virtual]({tag}virtualizacao "Leia mais sobre virtualização") vem bem a calhar para sanar o problema acima: Através de uma
configuração de *hardware*, ser possível servir de forma isolada diferentes aplicações.

Quando falamos de máquinas virtuais [*Virtualbox*]({tag}virtualbox "Leia mais sobre Virtualbox") ou *VMWare*,
estamos nos referindo ao *Hypervisor-based Virtualization*. Nessa modalidade temos uma ferramenta responsável
por abstrair diferentes Sistemas Operacionais funcionando dentro de um mesmo *hardware*:

{% img align-center-keep-size /images/blog/docker-hypervisor-virtualization.png 400 499 Diagrama de virtualização por hypervisor (udemy.com) %}

Para cada máquina virtual, é necessário um Sistema Operacional instalado e configurado, bem como
a própria aplicação.

Agora somos capazes de reaproveitar o processador, memória e banda de rede, reduzindo consideravelmente o custo.
Essa "abstração" que há entre a aplicação e o *hardware* permite maior flexibilidade quando houver a necessidade
de escalar ou migrar a aplicação para outra máquina física.

Bom! Mas e se pudéssemos compartilhar o mesmo Sistema Operacional para as 3 *apps* ilustradas acima, mas ainda assim
mantê-las isoladas?

### Containers

Segundo o *ZDNet*, *containers*:

> (...) use shared operating systems. That means they are much more efficient than hypervisors
> in system resource terms. Instead of virtualizing hardware, containers rest on top of a single
> Linux instance. This in turn means you can leave behind the useless 99.9% VM junk, leaving you
> with a small, neat capsule containing your application.

Através de *Containers* é possível utilizar o conceito de virtualização, só que de uma
maneira diferente: Não temos mais um Sistema Operacional por ambiente virtualizado,
e sim compartilhamos os mesmos recursos do Sistema Operacional da máquina hospedeira:

{% img align-center-keep-size /images/blog/docker-containers.png 400 239 Diagrama de containerização (udemy.com) %}

Com isso reduzimos ainda mais os custos de operação, além de proporcionar um tempo ainda menor
de *deployment* de uma nova aplicação. Agora, do ponto de vista da aplicação, precisamos apenas
do *app* instalado e configurado.

## Enfim: O que é Docker?

*Docker* é uma ferramenta *open source*, responsável por tornar fácil a criação, *deploy* e execução
de aplicações através do uso de *containers*. Com a containerização *Docker*, o desenvolver pode
empacotar a aplicação com todas as suas dependências, e distribuí-la através de um pacote único. Esse
pacote único executará em qualquer máquina *Linux* (com *Docker*, claro), podendo ser o seu ambiente
de desenvolvimento local, seu [ambiente de testes e homologação]({filename}diferentes-ambientes-development-testing-staging-e-production.md "Development, staging e production"),
ou até mesmo o ambiente de produção.

{% img align-center /images/blog/iron-man-containers.png 640 342 Vim falar de Docker mas só encontrei containers (marvelcinematicuniverse.wikia.com) %}

Se até aqui você achou o *Docker* semelhante ao [*Vagrant*]({filename}esse-e-mais-um-post-sobre-vagrant.md "Esse é mais um post sobre Vagrant"),
você não está de todo errado. A principal diferença é justamente o conceito de *containers*: *Docker* permite
que aplicações utilizem o mesmo *kernel* *Linux* da máquina hospedeira, reduzindo drasticamente o
tamanho da aplicação e reduzindo o consumo de recursos da máquina hospedeira.

## Considerações finais

*Docker* é no fim das contas uma ferramenta extremamente útil, e que possui umas das comunidades mais
ativas e empenhadas no momento. Ferramentas de *PaaS* como o [*Tsuru*](https://tsuru.io/ "Extensible and open source Platform as a Service")
utilizam *Docker* ativamente e servem inúmeros serviços e aplicações nesse exato momento.

Se até aqui você não está bem certo sobre o que é de fato o *Docker*, não se preocupe! Na parte 2 falaremos mais
sobre a ferramenta (e menos sobre o conceito) de uma forma bem prática.

Até a próxima.

## Referências

* [*Opensource.com - What is Docker?*](https://opensource.com/resources/what-docker)
* [*TechTarget - Hypervisor definition*](http://searchservervirtualization.techtarget.com/definition/hypervisor)
* [*ZDNet - What is Docker and why is it so darn popular?*](http://www.zdnet.com/article/what-is-docker-and-why-is-it-so-darn-popular/)
