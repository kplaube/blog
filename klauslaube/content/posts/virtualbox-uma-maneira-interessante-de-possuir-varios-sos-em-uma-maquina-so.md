---
title: "Virtualbox: Uma maneira interessante de possuir vários SOs em uma máquina só"
date: 2010-12-01 21:14:00
tags: ["infraestrutura", "sistemas-operacionais", "virtualizacao", "virtualbox"]
slug: virtualbox-varios-sos-numa-maquina-so
thumbnail: /images/virtualizacao.jpg
---

Sabe quando você quer testar uma distribuição (ou _SO_) diferente mas não quer mexer diretamente no
particionamento do seu _HD_? Ou quando você precisar propor uma máquina
individual para serviços [_web_][web], mas não tem _hardware_ sobrando para
isto? Ou quando você precisa ficar movendo um ambiente completo entre
máquinas ou locais?

Virtualização pode ser a resposta para os seus problemas!

## Virtualização? What the hell?

Segundo o nosso bom e velho [_Wikipedia_][wikipedia], virtualização é:

> (…) uma forma de esconder as características físicas de uma plataforma
> computacional dos utilizadores, mostrando outro hardware virtual,
> emulando um ou mais ambientes isolados.

Em outras palavras, é a capacidade de você executar um ou mais sistemas
operacionais através de plataformas que são emuladas através de um
segundo sistema operativo… não ajudei né? Então vamos para a forma
“vulgar”:

> É o conceito ou _software_ que permite a você executar _Ubuntu_, _Mac OS
> X_ e _FreeBSD_ em seu _Windows XP_ sem necessitar particionar seu _HD_,
> e ao mesmo tempo. Neste caso, um _hardware_ virtual é criado e você
> opera (instala, configura, usa) o _SO_ normalmente, como se estivesse em
> uma “máquina física”.

O [artigo no _Wikipedia_ sobre virtualização][wikipedia] está bem
bacana, inclusive citando vantagens e inconvenientes.

## O Virtualbox

!["Logotipo do Virtualbox"](/images/virtualbox-logo.png "Logotipo do Virtualbox")

Existem diversas formas e ferramentas para virtualizar ambientes em seu _desktop_
ou servidor. A ferramenta que tenho utilizado com muito sucesso
(em meu _desktop_, sou programador e não _expert_ em infra (: ) é o
**_Virtualbox_** (também chamado de **_Virtualbox OSE_**).

Hoje mantido pela _Oracle_ (que adquiriu a _Sun Microsystems_), o
_Virtualbox_ é uma solução ágil e objetiva no que diz respeito a
virtualização. Não sei a opinião dos profissionais de infraestrutura
sobre esta ferramenta, mas já passei por duas empresas especializadas em
serviços/produtos focados em servidores, e o _Virtualbox_ estava lá
atendendo a demanda.

O que me chamou a atenção foi a facilidade de uso. Como programador,
utilizo-o para criar _sandboxes_ e máquinas de testes. Na empresa onde
trabalho atualmente, utilizamos o programa para manter nossos
_workspaces_ isolados (já que a aplicação em que eu trabalho é
empacotada como uma verdadeira distribuição _Linux_). Já no meu
computador pessoal, tenho _VMs_ (_Virtual Machines_ – Máquinas Virtuais)
para testar distribuições como o _Debian_, _Slackware_ e até mesmo o
_Android_.

## Instalando o Virtualbox

Existem milhares de tutoriais que ensinam a instalar o _Virtualbox_. Não
vou “reinventar a roda”… vou apenas indicar alguns tutoriais:

- [_Viva o Linux_: Instalando o _Virtualbox_ no _Ubuntu 10.04_][virtualbox_ubuntu]
- [_Viva o Linux_: Instalação do _Virtualbox_ no _Debian (Etch)_][virtualbox_debian]
- [_Bruno Russo_: Instalando o _Virtualbox_ em uma máquina com
  _Slackware_][virtualbox_slackware]
- [_Blog do Vicente_: Como instalar e usar o _Virtualbox_
  (_Windows_)][virtualbox_windows]

Até a próxima…

[web]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[wikipedia]: http://pt.wikipedia.org/wiki/Virtualiza%C3%A7%C3%A3o "Leia mais sobre Virtualização na Wikipedia"
[virtualbox_ubuntu]: http://www.vivaolinux.com.br/artigo/Instalando-o-VirtualBox-no-Ubuntu-10.04/ "Artigo de Leandro Bruno para o Viva o Linux sobre Virtualbox no Ubuntu-10.04"
[virtualbox_debian]: http://www.vivaolinux.com.br/dica/Instalacao-do-Virtualbox-no-Debian-Etch-4-Linux "Artigo de Ronnie Robson Campos para o Viva o Linux sobre o Virtualbox no Debian Etch"
[virtualbox_slackware]: http://www.brunorusso.eti.br/virtualizacao/instalando-o-virtualbox-em-uma-maquina-com-slackware/ "Um excelente post de Bruno Russo sobre Virtualbox em Slackware"
[virtualbox_windows]: http://blogdovicente.com/2009/03/04/como-instalar-e-usar-o-virtualbox/ "Post feito pelo Vicente sobre o Virtualbox no Windows"
