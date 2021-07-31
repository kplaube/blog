---
title: "Uma ode ao Docker - Parte 1"
date: 2017-01-14 18:20:00
tags: ["infraestrutura", "virtualizacao", "containerizacao", "docker"]
slug: uma-ode-ao-docker-parte-1
thumbnail: /images/docker-logo.png
---

Virtualização é um dos assuntos que mais evoluiu nesses últimos anos de TI. Mas
foi o termo "containerização" que teve um "boom" de popularidade recentemente. Isso graças
ao [_Docker_](https://www.docker.com/ "Build, ship, run"), popular ferramenta que tem
tornado a virtualização/containerização em uma _commodity_ no universo de desenvolvimento de _Software_.

Para ser sincero, eu só "parei para olhar" o _Docker_ no final do ano passado,
através de um
[excelente curso do _Udemy_](https://www.udemy.com/docker-tutorial-for-devops-run-docker-containers/learn/v4/overview "The Complete Docker Course for DevOps and Developers").
Se você assim como eu ainda não teve tempo para ver "qualé", vem comigo que eu te mostro :)

## Antes do Docker: Containers

Eu só comecei a entender realmente o que era o _Docker_ a partir do momento
que compreendi o que é um container.

No mundo "pré-virtualização", quando lidávamos com problemas como escalabilidade ou isolamento,
precisávamos adquirir uma nova máquina física, instalar e configurar o Sistema Operacional,
bem como instalar e configurar a própria aplicação:

!["Diagrama de era pré-virtualização (udemy.com)"](/images/docker-pre-virtualization.png "Diagrama de era pré-virtualização (udemy.com)")

Além do custo altíssimo para replicar a arquitetura acima, o tempo para solicitar uma
nova máquina e realizar uma possível migração eram absurdamente altos. Além disso,
há um incrível desperdício de recursos, já que não é necessário um _hardware_
exclusivo para servir uma aplicação [_web_](/tag/desenvolvimento-web.html "Leia mais sobre web") simples.

### Hypervisor

O conceito de [máquina virtual](/tag/virtualizacao.html "Leia mais sobre virtualização") vem bem a calhar para sanar o problema acima: Através de uma
configuração de _hardware_, ser possível servir de forma isolada diferentes aplicações.

Quando falamos de máquinas virtuais [_Virtualbox_](/tag/virtualbox.html "Leia mais sobre Virtualbox") ou _VMWare_,
estamos nos referindo ao _Hypervisor-based Virtualization_. Nessa modalidade temos uma ferramenta responsável
por abstrair diferentes Sistemas Operacionais funcionando dentro de um mesmo _hardware_:

!["Diagrama de virtualização por hypervisor (udemy.com)"](/images/docker-hypervisor-virtualization.png "Diagrama de virtualização por hypervisor (udemy.com)")

Para cada máquina virtual, é necessário um Sistema Operacional instalado e configurado, bem como
a própria aplicação.

Agora somos capazes de reaproveitar o processador, memória e banda de rede, reduzindo consideravelmente o custo.
Essa "abstração" que há entre a aplicação e o _hardware_ permite maior flexibilidade quando houver a necessidade
de escalar ou migrar a aplicação para outra máquina física.

Bom! Mas e se pudéssemos compartilhar o mesmo Sistema Operacional para as 3 _apps_ ilustradas acima, mas ainda assim
mantê-las isoladas?

### Containers

Segundo o _ZDNet_, _containers_:

> (...) use shared operating systems. That means they are much more efficient than hypervisors
> in system resource terms. Instead of virtualizing hardware, containers rest on top of a single
> Linux instance. This in turn means you can leave behind the useless 99.9% VM junk, leaving you
> with a small, neat capsule containing your application.

Através de _Containers_ é possível utilizar o conceito de virtualização, só que de uma
maneira diferente: Não temos mais um Sistema Operacional por ambiente virtualizado,
e sim compartilhamos os mesmos recursos do Sistema Operacional da máquina hospedeira:

!["Diagrama de containerização (udemy.com)"](/images/docker-containers.png "Diagrama de containerização (udemy.com)")

Com isso reduzimos ainda mais os custos de operação, além de proporcionar um tempo ainda menor
de _deployment_ de uma nova aplicação. Agora, do ponto de vista da aplicação, precisamos apenas
do _app_ instalado e configurado.

## Enfim: O que é Docker?

_Docker_ é uma ferramenta _open source_, responsável por tornar fácil a criação, _deploy_ e execução
de aplicações através do uso de _containers_. Com a containerização _Docker_, o desenvolver pode
empacotar a aplicação com todas as suas dependências, e distribuí-la através de um pacote único. Esse
pacote único executará em qualquer máquina _Linux_ (com _Docker_, claro), podendo ser o seu ambiente
de desenvolvimento local, seu [ambiente de testes e homologação](/2011/03/07/diferentes-ambientes.html "Development, staging e production"),
ou até mesmo o ambiente de produção.

!["Vim falar de Docker mas só encontrei containers (marvelcinematicuniverse.wikia.com)"](/images/iron-man-containers.png "Vim falar de Docker mas só encontrei containers (marvelcinematicuniverse.wikia.com)")

Se até aqui você achou o _Docker_ semelhante ao [_Vagrant_](/2015/10/03/esse-e-mais-um-post-sobre-vagrant.html "Esse é mais um post sobre Vagrant"),
você não está de todo errado. A principal diferença é justamente o conceito de _containers_: _Docker_ permite
que aplicações utilizem o mesmo _kernel_ _Linux_ da máquina hospedeira, reduzindo drasticamente o
tamanho da aplicação e reduzindo o consumo de recursos da máquina hospedeira.

## Considerações finais

_Docker_ é no fim das contas uma ferramenta extremamente útil, e que possui umas das comunidades mais
ativas e empenhadas no momento. Ferramentas de _PaaS_ como o [_Tsuru_](https://tsuru.io/ "Extensible and open source Platform as a Service")
utilizam _Docker_ ativamente e servem inúmeros serviços e aplicações nesse exato momento.

Se até aqui você não está bem certo sobre o que é de fato o _Docker_, não se preocupe! Na parte 2 falaremos mais
sobre a ferramenta (e menos sobre o conceito) de uma forma bem prática.

Até a próxima.

## Referências

- [_Opensource.com - What is Docker?_](https://opensource.com/resources/what-docker)
- [_TechTarget - Hypervisor definition_](http://searchservervirtualization.techtarget.com/definition/hypervisor)
- [_ZDNet - What is Docker and why is it so darn popular?_](http://www.zdnet.com/article/what-is-docker-and-why-is-it-so-darn-popular/)
