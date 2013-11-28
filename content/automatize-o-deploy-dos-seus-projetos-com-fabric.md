Title: Automatize o deploy dos seus projetos com Fabric
Date: 2012-02-26 19:40:13
Category: desenvolvimento
Tags: desenvolvimento, ambiente-de-desenvolvimento, python, django, fabric, deploy
Slug: automatize-o-deploy-dos-seus-projetos-com-fabric


|img "/images/blog/deploy.jpg" 180 180 "Deploy now!" "align-left"|
Durante a minha árdua trajetória com o [*PHP*][],
sempre fiz “subidas” de projetos utilizando um cliente [*FTP*][]. Um
processo manual, extremamente repetitivo (e chato).

Já com [*Python*][], pude utilizar o [*SSH*][], que me proporcionou
maior agilidade e liberdade dentro do ambiente de produção. Mas que não
deixou de ser um processo manual, extremamente repetitivo, chato e muito
suscetível a falhas.

<!-- PELICAN_END_SUMMARY -->

Foi utilizando o [*Django*][] que conheci o [*Fabric*][], e percebi
quanto tempo podemos economizar automatizando o processo de *deploy* de
nossos projetos.


O Agile e o deploy contínuo
---------------------------

Todo e qualquer procedimento de *upload* do seu projeto para o ambiente
de produção corre algum tipo de risco. Com o *deploy* automatizado,
a tendência é que este risco seja reduzido, e que você possa fazer a
entrega do seu projeto para [diversos ambientes][] com o menor esforço
possível.

Logo, não consigo imaginar um cenário eficiente de *deploy*
contínuo, sem a utilização de alguma ferramenta de automatização. É
através destas que respeitamos uma das premissas do [*Agile*][], e
diminuímos a incidência de falha humana.


Mas o que é o Fabric?
---------------------

O ***Fabric*** é uma *lib* *Python*, e ferramenta de linha de comando,
para auxiliá-lo em seu *deploy* e na administração remota dos seus
sistemas.

Embora seja feita em *Python*, pode ser utilizada em projetos escritos
em qualquer linguagem. Equivale ao [*Capistrano*][], alternativa mais
famosa, escrita em *Ruby*.


Em casa de ferreiro, espeto de ferro
------------------------------------

Para dar um exemplo de uso do *Fabric*, podemos utilizar o esquema de
*deploy* deste *blog*. Sim! O processo está automatizado, e você pode
[conferí-lo no *BitBucket*][].

Antes de mais nada, é necessário ter o *Fabric* instalado:

> $ pip install fabric

Todo o procedimento será escrito em um arquivo chamado **fabfile.py**.
Com o comando **fab**, a ferramenta carregará este arquivo e permitirá a
execução de todos os métodos públicos definidos dentro dele.

Vamos listar todos os métodos que [criei no **fabfile.py** do *blog*][]:

> $ fab -l<br>
> 
> Available commands:<br>
>
> bootstrap            Initialize remote host environment.<br>
> collect_static       Collect all static files from Django apps and copy ...<br>
> create_virtualenv    Setup virtualenv on remote host.<br>
> database_restart     Restart the database server on remote server.<br>
> deploy               Send the code to the remote host.<br>
> http_restart         Restart the HTTP server on remote server.<br>
> migrate              Execute South on remote host, to update the databas...<br>
> production           Use production environment on remote host.<br>
> staging              Use staging environment on remote host.<br>
> syncdb               Execute syncdb on remote host.<br>
> update_apache_conf   Move apache and fastcgi files to the public html.<br>
> update_requirements  Update Python dependencies on remote host.

Como é possível notar na listagem acima, temos operações de *deploy*
(**deploy**, **syncdb**, **update\_requirements** e
**update\_apache\_conf**) e operações de administração remota
(**database\_restart**, **http\_restart**, **migrate**, etc). Os métodos
**production** e **staging** são basicamente para “setar” para qual
ambiente o *deploy* será realizado. Por exemplo, a cada nova subida de
*release*, executo o seguinte comando:

> $ fab production deploy http_restart

Onde basicamente:

* Defino o usuário, *IP*, e *paths* para o ambiente de produção através do método **production**.
* Executo o envio dos arquivos através de [**Rsync**][] para o servidor, com o método **deploy**.
* Reinicio o *Apache* através do método **http\_restart**.

Se olharmos atentamente o [método **deploy**][], utilizamos uma *lib*
(importada no início do arquivo) chamada **rsync\_project**. Que
corresponde a ferramenta de linha de comando (encontrada em sistemas
baseados em *Unix*) chamada **rsync**. O que o *Fabric* faz (com
maestria) é “abstrair” essas operações para que possamos fazer os nossos
procedimentos através de uma interface simples (outros comandos, como
**scp** e **sudo** também são utilizados pelo *Fabric*).

A função [**run**][] faz grande parte da magia acontecer. Com ela,
abrimos uma conexão *SSH* com o nosso servidor, e executamos comandos
como se estívessemos em um terminal. Extremamente útil para fazer
*restart* de serviços, escalonamento de *logs*, limpeza de temporários,
etc.


Considerações finais
--------------------

O *Fabric* é muito simples de usar. Lendo o básico da documentação, já
somos capazes de automatizar os processos mais triviais.

Recomendo o [**fabfile.py**][] da [*Caktus Consulting Group*][]. Simples
e bem escrito, foi nele que me baseei para escrever o *script*
apresentado neste *post*.


Referências
-----------

* [*Fabric – Documentation*][]
* [*Useful Stuff – Fabric Deployment Script and Example*][]

  [*PHP*]: {tag}php
    "Leia mais sobre PHP"
  [*FTP*]: http://pt.wikipedia.org/wiki/File_Transfer_Protocol
    "Leia mais sobre File Transfer Protocol"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [*SSH*]: http://pt.wikipedia.org/wiki/SSH
    "Leia mais sobre Secure Shell"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [*Fabric*]: http://docs.fabfile.org/en/1.4.0/index.html
    "A library and command-line tool for streamlining the use of SSH for application deployment or systems administration tasks"
  [diversos ambientes]: {filename}/diferentes-ambientes-development-testing-staging-e-production.md
    "Diferentes ambientes: Development, Testing, Staging e Production"
  [*Agile*]: {tag}agile "Leia mais sobre Agile"
  [*Capistrano*]: http://en.wikipedia.org/wiki/Capistrano
    "Leia mais sobre o Capistrano"
  [conferí-lo no *BitBucket*]: https://bitbucket.org/kplaube/klauslaube.com.br/src/d579e9d81641/fabfile.py
    "Confira o script Fabric no repositório do BitBucket"
  [criei no **fabfile.py** do *blog*]: https://bitbucket.org/kplaube/klauslaube.com.br/src/d579e9d81641/fabfile.py
    "Veja no BitBucket"
  [**Rsync**]: http://pt.wikipedia.org/wiki/Rsync
    "Leia mais sobre Rsync"
  [método **deploy**]: https://bitbucket.org/kplaube/klauslaube.com.br/src/d579e9d81641/fabfile.py#cl-101
    "Veja em detalhes o método deploy"
  [**run**]: https://bitbucket.org/kplaube/klauslaube.com.br/src/d579e9d81641/fabfile.py#cl-199
    "Veja um exemplo de uso no fabfile.py"
  [**fabfile.py**]: https://bitbucket.org/copelco/caktus-deployment/src/6ad8ad84a938/example-django-project/caktus_website/fabfile.py
    "Veja-o no BitBucket"
  [*Caktus Consulting Group*]: http://www.caktusgroup.com/
    "Visite o site da Caktus"
  [*Fabric – Documentation*]: http://docs.fabfile.org/en/1.4.0/index.html
    "Fabric: a library and command-line tool for streamlining the use of SSH for application deployment or systems administration tasks"
  [*Useful Stuff – Fabric Deployment Script and Example*]: http://yuji.wordpress.com/2011/04/09/django-python-fabric-deployment-script-and-example/
    "Excelente exemplo de uso do Fabric"
