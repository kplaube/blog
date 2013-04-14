Title: Virtualbox: Uma maneira interessante de possuir vários SOs em uma máquina só
Date: 2010-12-01 21:14
Category: infra-estrutura
Tags: infra-estrutura, sistemas-operacionais, virtualizacao, virtualbox
Slug: virtualbox-varios-sos-numa-maquina-so

|img "/images/blog/virtualizacao.jpg" 180 180 "Representação de virtualização" "align-left"|
Sabe quando você quer testar uma distribuição (ou *SO*) diferente mas não quer mexer diretamente no
particionamento do seu *HD*? Ou quando você precisar propor uma máquina
individual para serviços [*Web*][web], mas não tem *hardware* sobrando para
isto? Ou quando você precisa ficar movendo um ambiente completo entre
máquinas ou locais? Ou ainda, quando você precisa disponibilizar um
*sandbox* dentro do seu sistema em uso?

Virtualização pode ser a resposta para os seus problemas!

<!-- PELICAN_END_SUMMARY -->


Virtualização? What the hell?
-----------------------------

Segundo o nosso bom e velho [*Wikipedia*][wikipedia], virtualização é:

> (…) uma forma de esconder as características físicas de uma plataforma
> computacional dos utilizadores, mostrando outro hardware virtual,
> emulando um ou mais ambientes isolados.

Em outras palavras, é a capacidade de você executar um ou mais sistemas
operacionais através de plataformas que são emuladas através de um
segundo sistema operativo… não ajudei né? Então vamos para a forma
“vulgar”:

> É o conceito ou *software* que permite a você executar *Ubuntu*, *Mac OS
> X* e *FreeBSD* em seu *Windows XP* sem necessitar particionar seu *HD*,
> e ao mesmo tempo. Neste caso, um *hardware* virtual é criado e você
> opera (instala, configura, usa) o *SO* normalmente, como se estivesse em
> uma “máquina física”.

O [artigo no *Wikipedia* sobre virtualização][wikipedia] está bem
bacana, inclusive citando vantagens e inconvenientes.


O Virtualbox
------------

|img "/images/blog/virtualbox-logo.png" 174 180 "Logotipo do Virtualbox" "align-left"|
Existem diversas formas e ferramentas para virtualizar ambientes em seu *desktop*
ou servidor. A ferramenta que tenho utilizado com muito sucesso
(em meu *desktop*, sou programador e não *expert* em infra (: ) é o
***Virtualbox*** (também chamado de ***Virtualbox OSE***).

Hoje mantido pela *Oracle* (que adquiriu a *Sun Microsystems*), o
*Virtualbox* é uma solução ágil e objetiva no que diz respeito a
virtualização. Não sei a opinião dos profissionais de infra-estrutura
sobre esta ferramenta, mas já passei por duas empresas especializadas em
serviços/produtos focados em servidores, e o *Virtualbox* estava lá
atendendo a demanda.

O que me chamou a atenção foi a facilidade de uso. Como programador,
utilizo-o para criar *sandboxes* e máquinas de testes. Na empresa onde
trabalho atualmente, utilizamos o programa para manter nossos
*workspaces* isolados (já que a aplicação em que eu trabalho é
empacotada como uma verdadeira distribuição *Linux*). Já no meu
computador pessoal, tenho *VMs* (*Virtual Machines* – Máquinas Virtuais)
para testar distribuições como o *Debian*, *Slackware* e até mesmo o
*Android*.


Instalando o Virtualbox
-----------------------

Existem milhares de tutoriais que ensinam a instalar o *Virtualbox*. Não
vou “reinventar a roda”… vou apenas indicar alguns tutoriais:

-   [*Viva o Linux*: Instalando o *Virtualbox* no *Ubuntu 10.04*][virtualbox_ubuntu]
-   [*Viva o Linux*: Instalação do *Virtualbox* no *Debian (Etch)*][virtualbox_debian]
-   [*Bruno Russo*: Instalando o *Virtualbox* em uma máquina com
    *Slackware*][virtualbox_slackware]
-   [*Blog do Vicente*: Como instalar e usar o *Virtualbox*
    (*Windows*)][virtualbox_windows]

Até a próxima…

  [web]: |filename|/tag/web.html "Leia mais sobre Web"
  [wikipedia]: http://pt.wikipedia.org/wiki/Virtualiza%C3%A7%C3%A3o
    "Leia mais sobre Virtualização na Wikipedia"
  [virtualbox_ubuntu]: http://www.vivaolinux.com.br/artigo/Instalando-o-VirtualBox-no-Ubuntu-10.04/
    "Artigo de Leandro Bruno para o Viva o Linux sobre Virtualbox no Ubuntu-10.04"
  [virtualbox_debian]: http://www.vivaolinux.com.br/dica/Instalacao-do-Virtualbox-no-Debian-Etch-4-Linux
    "Artigo de Ronnie Robson Campos para o Viva o Linux sobre o Virtualbox no Debian Etch"
  [virtualbox_slackware]: http://www.brunorusso.eti.br/virtualizacao/instalando-o-virtualbox-em-uma-maquina-com-slackware/
    "Um excelente post de Bruno Russo sobre Virtualbox em Slackware"
  [virtualbox_windows]: http://blogdovicente.com/2009/03/04/como-instalar-e-usar-o-virtualbox/
    "Post feito pelo Vicente sobre o Virtualbox no Windows"
