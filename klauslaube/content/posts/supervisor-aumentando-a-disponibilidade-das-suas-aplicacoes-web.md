---
title: "Supervisor: Aumentando a disponibilidade das suas aplicações Web"
date: 2012-01-23 21:28:00
tags: ["desenvolvimento-web", "infraestrutura", "supervisor", "linux"]
slug: supervisor-gerencie-os-processos-seu-servidor-web
thumbnail: /images/supervisor-logo.png
---

E se você pudesse controlar uma série de processos
através de um comando? Ou de garantir que serviços “down” sejam
reiniciados automaticamente? Ou ainda, agrupar seus serviços e poder
reiniciá-los com um simples comando de terminal?

O **_Supervisor_** aparece para facilitar muito a vida de quem precisa
administrar servidores [*web*][], e não tem muito tempo a perder com
criação de rotinas, ou mesmo com trabalho manual.

## Afinal, o que é o Supervisor?

A proposta do [*Supervisor*][] é simples: permitir que usuários possam
controlar e monitorar processos (e grupos de processos) em um sistema
_Unix-like_.

Em suma, o _Supervisor_ é um programa escrito em [*Python*][], capaz de
iniciar, reiniciar e parar outros programas. Mas, o que me chamou mais a
atenção, é que ele é capaz de reiniciar programas “crashados”
automaticamente.

Isso é possível pois, por baixo dos panos, o _Supervisor_ é um serviço
que inicia todos os demais como subprocessos. Desse modo, é capaz de
monitorar o estado dos mesmos, e numa eventual “queda”, reiniciar um
determinado processo/serviço imediatamente.

Ou seja, funciona como uma ferramenta centralizadora e de monitoramento.
E que ainda serve uma _API_ para gerenciamento remoto, [através de *XML-RPC*][].

## Instalar para administrar

Para instalar, basta utilizar o `pip`:

```text
$ pip install supervisor
```

Vamos gerar um arquivo de configuração básico:

```text
$ echo_supervisord_conf > /etc/supervisord.conf
```

Vamos aproveitar que [falamos recentemente sobre a instalação do *Nginx*][],
para demonstrar o princípio do _Supervisor_. Adicione as
seguintes linhas ao arquivo `/etc/supervisord.conf`:

```config
[program:nginx]
command=/usr/local/nginx/sbin/nginx
```

Agora iniciamos o serviço do _Supervisor_:

```text
$ supervisord
```

E através do `supervisorctl`, vamos iniciar e parar o _Nginx_:

```text
$ supervisorctl start all
nginx: started

$ ps aux | grep nginx
root      1863  0.0  0.1 (...) /usr/local/nginx/sbin/nginx

$ supervisorctl stop nginx
nginx: stopped
```

E agora, o “pulo do gato”. Com o _Nginx_ iniciado via _Supervisor_,
vamos fechá-lo através de um comando `kill`:

```text
$ supervisorctl start nginx
nginx: started

$ killall nginx

$ ps aux | grep nginx
root      1917  0.0  0.1 (...) /usr/local/nginx/sbin/nginx
```

Magia? Que nada! É a ferramenta garantindo que os nossos processos não
fiquem “down”. [*Brandon Konkle*][] e [*Senko Rasic*][] possuem exemplos
utilizando um cenário real com [*Django*][] e [*Nginx*][].

## Considerações finais

Embora o _Supervisor_ seja uma ferramenta espetacular, acredito que
muitos profissionais já possuam intimidade com os seus servidores, bem
como já tenham construído _sets_ de _scripts_, e atalhos em geral. Isso,
de fato, faz a gente questionar a utilidade dela.

A possibilidade de monitorar e garantir a disponibilidade dos processos
foi o que mais me agradou. Se você tem “poderes administrativos” na sua
hospedagem, talvez o _Supervisor_ seja a ferramenta que faltava para
você possa dormir mais tranquilo.

## Referências

- [*Supervisor* – Documentação oficial][]
- [*Brandon Konkle – Django on uWSGI and Nginx*][]
- [*Mike Naberezny – Supervisor as a Platform*][]
- [*Senko’s Blog – A Django setup using Nginx and Gunicorn*][]

[*web*]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[*supervisor*]: http://supervisord.org/ "Conheça o projeto Supervisor"
[*python*]: /tag/python.html "Leia mais sobre Python"
[através de *xml-rpc*]: http://supervisord.org/api.html "Leia mais sobre a API do Supervisor"
[falamos recentemente sobre a instalação do *nginx*]: /2011/12/19/nginx-poderoso-rapido-facil.html "Nginx: Poderoso, rápido e fácil"
[*brandon konkle*]: http://brandonkonkle.com/blog/2010/sep/14/django-uwsgi-and-nginx/ "Django on uWSGI and Nginx"
[*senko rasic*]: http://senko.net/en/django-nginx-gunicorn/ "A Django setup using Nginx and Gunicorn"
[*django*]: /tag/django.html "Leia mais sobre Django"
[*nginx*]: /tag/nginx.html "Leia mais sobre Nginx"
[*supervisor* – documentação oficial]: http://supervisord.org/ "Supervisor - A process control system"
[*brandon konkle – django on uwsgi and nginx*]: http://brandonkonkle.com/blog/2010/sep/14/django-uwsgi-and-nginx/ "Saiba como montar um servidor Nginx com Django, uWSGI e Supervisor"
[*mike naberezny – supervisor as a platform*]: http://www.plope.com/static/misc/supervisor-pycon2008.pdf "Apresentação para a PyCon 2008, sobre Supervisor"
[*senko’s blog – a django setup using nginx and gunicorn*]: http://senko.net/en/django-nginx-gunicorn/ "Um ótimo exemplo de uso do Nginx, Django e Supervisor"
