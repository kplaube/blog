---
title: "Automatize o deploy dos seus projetos com Fabric"
date: 2012-02-26 19:40:13
modified: 2023-10-04 16:20
tags: ["desenvolvimento-web", "python", "django", "fabric", "deploy"]
slug: automatize-o-deploy-dos-seus-projetos-com-fabric
thumbnail: /media/deploy.jpg
---

Durante a minha árdua trajetória com o [*PHP*][],
sempre fiz “subidas” de projetos utilizando um cliente [*FTP*][]. Um
processo manual, extremamente repetitivo (e chato).

Já com [*Python*][], pude utilizar o [*SSH*][], que me proporcionou
maior agilidade e liberdade dentro do ambiente de produção. Mas que não
deixou de ser um processo manual, extremamente repetitivo, chato e muito
suscetível a falhas.

Foi utilizando o [*Django*][] que conheci o [*Fabric*][], e percebi
quanto tempo podemos economizar automatizando o processo de _deploy_ de
nossos projetos.

## O agile e o deploy contínuo

Todo e qualquer procedimento de _upload_ do seu projeto para o ambiente
de produção corre algum tipo de risco. Com o _deploy_ automatizado,
a tendência é que este risco seja reduzido, e que você possa fazer a
entrega do seu projeto para [diversos ambientes][] com o menor esforço
possível.

Logo, não consigo imaginar um cenário eficiente de _deploy_
contínuo, sem a utilização de alguma ferramenta de automatização. É
através destas que respeitamos uma das premissas do [*agile*][], e
diminuímos a incidência de falha humana.

## Mas o que é o Fabric?

O **_Fabric_** é uma _lib_ _Python_, e ferramenta de linha de comando,
para auxiliá-lo em seu _deploy_ e na administração remota dos seus
sistemas.

Embora seja feita em _Python_, pode ser utilizada em projetos escritos
em qualquer linguagem. Equivale ao [*Capistrano*][], alternativa mais
famosa, escrita em _Ruby_.

## Em casa de ferreiro, espeto de ferro

Para dar um exemplo de uso do _Fabric_, podemos utilizar o esquema de
_deploy_ deste _blog_. Sim! O processo está automatizado, e você pode
[conferí-lo no *BitBucket*][].

Antes de mais nada, é necessário ter o _Fabric_ instalado:

```text
pip install fabric
```

Todo o procedimento será escrito em um arquivo chamado **fabfile.py**.
Com o comando **fab**, a ferramenta carregará este arquivo e permitirá a
execução de todos os métodos públicos definidos dentro dele.

Vamos listar todos os métodos que [criei no **fabfile.py** do *blog*][]:

```text
$ fab -l

Available commands:

bootstrap            Initialize remote host environment.
collect_static       Collect all static files from Django apps and copy ...
create_virtualenv    Setup virtualenv on remote host.
database_restart     Restart the database server on remote server.
deploy               Send the code to the remote host.
http_restart         Restart the HTTP server on remote server.
migrate              Execute South on remote host, to update the databas...
production           Use production environment on remote host.
staging              Use staging environment on remote host.
syncdb               Execute syncdb on remote host.
update_apache_conf   Move apache and fastcgi files to the public html.
update_requirements  Update Python dependencies on remote host.
```

Como é possível notar na listagem acima, temos operações de _deploy_
(**deploy**, **syncdb**, **update_requirements** e
**update_apache_conf**) e operações de administração remota
(**database_restart**, **http_restart**, **migrate**, etc). Os métodos
**production** e **staging** são basicamente para “setar” para qual
ambiente o _deploy_ será realizado. Por exemplo, a cada nova subida de
_release_, executo o seguinte comando:

```text
fab production deploy http_restart
```

Onde basicamente:

- Defino o usuário, _IP_, e _paths_ para o ambiente de produção através do método **production**.
- Executo o envio dos arquivos através de [**Rsync**][] para o servidor, com o método **deploy**.
- Reinicio o _Apache_ através do método **http_restart**.

Se olharmos atentamente o [método **deploy**][], utilizamos uma _lib_
(importada no início do arquivo) chamada **rsync_project**. Que
corresponde a ferramenta de linha de comando (encontrada em sistemas
baseados em _Unix_) chamada **rsync**. O que o _Fabric_ faz (com
maestria) é “abstrair” essas operações para que possamos fazer os nossos
procedimentos através de uma interface simples (outros comandos, como
**scp** e **sudo** também são utilizados pelo _Fabric_).

A função [**run**][] faz grande parte da magia acontecer. Com ela,
abrimos uma conexão _SSH_ com o nosso servidor, e executamos comandos
como se estívessemos em um terminal. Extremamente útil para fazer
_restart_ de serviços, escalonamento de _logs_, limpeza de temporários,
etc.

## Considerações finais

O _Fabric_ é muito simples de usar. Lendo o básico da documentação, já
somos capazes de automatizar os processos mais triviais.

Recomendo o [**fabfile.py**][] da [*Caktus Consulting Group*][]. Simples
e bem escrito, foi nele que me baseei para escrever o _script_
apresentado neste _post_.

## Referências

- [*Fabric – Documentation*][]
- [*Useful Stuff – Fabric Deployment Script and Example*][]

[*php*]: /tag/php.html "Leia mais sobre PHP"
[*ftp*]: http://pt.wikipedia.org/wiki/File_Transfer_Protocol "Leia mais sobre File Transfer Protocol"
[*python*]: /tag/python.html "Leia mais sobre Python"
[*ssh*]: http://pt.wikipedia.org/wiki/SSH "Leia mais sobre Secure Shell"
[*django*]: /tag/django.html "Leia mais sobre Django"
[*fabric*]: http://docs.fabfile.org/en/1.4.0/index.html "A library and command-line tool for streamlining the use of SSH for application deployment or systems administration tasks"
[diversos ambientes]: /2011/03/07/diferentes-ambientes.html "Diferentes ambientes: Development, Testing, Staging e Production"
[*agile*]: /tag/agile.html "Leia mais sobre Agile"
[*capistrano*]: http://en.wikipedia.org/wiki/Capistrano "Leia mais sobre o Capistrano"
[conferí-lo no *bitbucket*]: https://bitbucket.org/kplaube/klauslaube.com.br/src/d579e9d81641/fabfile.py "Confira o script Fabric no repositório do BitBucket"
[criei no **fabfile.py** do *blog*]: https://bitbucket.org/kplaube/klauslaube.com.br/src/d579e9d81641/fabfile.py "Veja no BitBucket"
[**rsync**]: http://pt.wikipedia.org/wiki/Rsync "Leia mais sobre Rsync"
[método **deploy**]: https://bitbucket.org/kplaube/klauslaube.com.br/src/d579e9d81641/fabfile.py#cl-101 "Veja em detalhes o método deploy"
[**run**]: https://bitbucket.org/kplaube/klauslaube.com.br/src/d579e9d81641/fabfile.py#cl-199 "Veja um exemplo de uso no fabfile.py"
[**fabfile.py**]: https://bitbucket.org/copelco/caktus-deployment/src/6ad8ad84a938/example-django-project/caktus_website/fabfile.py "Veja-o no BitBucket"
[*caktus consulting group*]: http://www.caktusgroup.com/ "Visite o site da Caktus"
[*fabric – documentation*]: http://docs.fabfile.org/en/1.4.0/index.html "Fabric: a library and command-line tool for streamlining the use of SSH for application deployment or systems administration tasks"
[*useful stuff – fabric deployment script and example*]: http://yuji.wordpress.com/2011/04/09/django-python-fabric-deployment-script-and-example/ "Excelente exemplo de uso do Fabric"
