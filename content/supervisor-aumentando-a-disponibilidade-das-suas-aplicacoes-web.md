Title: Supervisor: Aumentando a disponibilidade das suas aplicações Web
Date: 2012-01-23 21:28:00
Category: infra-estrutura
Tags: infra-estrutura, ambiente-de-desenvolvimento, web, supervisor, linux
Slug: supervisor-gerencie-os-processos-seu-servidor-web
meta_description: A proposta do Supervisor é simples: permitir que usuários possam controlar e monitorar processos (e grupos de processos) em um sistema Unix-like.


|img "/images/blog/supervisor-logo.gif" 180 180 "Logotipo do Supervisor" "align-left"|
E se você pudesse controlar uma série de processos
através de um comando? Ou de garantir que serviços “down” sejam
reiniciados automaticamente? Ou ainda, agrupar seus serviços e poder
reiniciá-los com um simples comando de terminal?

O ***Supervisor*** aparece para facilitar muito a vida de quem precisa
administrar servidores [*Web*][], e não tem muito tempo a perder com
criação de rotinas, ou mesmo com trabalho manual.


<!-- PELICAN_END_SUMMARY -->


Afinal, o que é o Supervisor?
-----------------------------

A proposta do [*Supervisor*][] é simples: permitir que usuários possam
controlar e monitorar processos (e grupos de processos) em um sistema
*Unix-like*.

Em suma, o *Supervisor* é um programa escrito em [*Python*][], capaz de
iniciar, reiniciar e parar outros programas. Mas, o que me chamou mais a
atenção, é que ele é capaz de reiniciar programas “crashados”
automaticamente.

Isso é possível pois, por baixo dos panos, o *Supervisor* é um serviço
que inicia todos os demais como subprocessos. Desse modo, é capaz de
monitorar o estado dos mesmos, e numa eventual “queda”, reiniciar um
determinado processo/serviço imediatamente.

Ou seja, funciona como uma ferramenta centralizadora e de monitoramento.
E que ainda serve uma *API* para gerenciamento remoto, [através de *XML-RPC*][].


Instalar para administrar
-------------------------

Para instalar, basta utilizar o *pip*:

    ::bash
    $ pip install supervisor

Vamos gerar um arquivo de configuração básico:

    ::bash
    $ echo_supervisord_conf > /etc/supervisord.conf

Vamos aproveitar que [falamos recentemente sobre a instalação do *Nginx*][],
para demonstrar o princípio do *Supervisor*. Adicione as
seguintes linhas ao arquivo **/etc/supervisord.conf**:

    ::nginx
    [program:nginx]
    command=/usr/local/nginx/sbin/nginx

Agora iniciamos o serviço do *Supervisor*:

    ::bash
    $ supervisord

E através do **supervisorctl**, vamos iniciar e parar o *Nginx*:

    ::bash
    $ supervisorctl start all
    nginx: started

    $ ps aux | grep nginx
    root      1863  0.0  0.1 (...) /usr/local/nginx/sbin/nginx

    $ supervisorctl stop nginx
    nginx: stopped

E agora, o “pulo do gato”. Com o *Nginx* iniciado via *Supervisor*,
vamos fechá-lo através de um comando **kill**:

    ::bash
    $ supervisorctl start nginx
    nginx: started

    $ killall nginx

    $ ps aux | grep nginx
    root      1917  0.0  0.1 (...) /usr/local/nginx/sbin/nginx

Magia? Que nada! É a ferramenta garantindo que os nossos processos não
fiquem “down”. [*Brandon Konkle*][] e [*Senko Rasic*][] possuem exemplos
utilizando um cenário real com [*Django*][] e [*Nginx*][].


Considerações finais
--------------------

Embora o *Supervisor* seja uma ferramenta espetacular, acredito que
muitos profissionais já possuam intimidade com os seus servidores, bem
como já tenham construído *sets* de *scripts*, e atalhos em geral. Isso,
de fato, faz a gente questionar a utilidade dela.

A possibilidade de monitorar e garantir a disponibilidade dos processos
foi o que mais me agradou. Se você tem “poderes administrativos” na sua
hospedagem, talvez o *Supervisor* seja a ferramenta que faltava para
você possa dormir mais tranquilo.


Referências
-----------

* [*Supervisor* – Documentação oficial][]
* [*Brandon Konkle – Django on uWSGI and Nginx*][]
* [*Mike Naberezny – Supervisor as a Platform*][]
* [*Senko’s Blog – A Django setup using Nginx and Gunicorn*][]


  [*Web*]: {tag}web "Leia mais sobre Web"
  [*Supervisor*]: http://supervisord.org/ "Conheça o projeto Supervisor"
  [*Python*]: {tag}python
    "Leia mais sobre Python"
  [através de *XML-RPC*]: http://supervisord.org/api.html
    "Leia mais sobre a API do Supervisor"
  [falamos recentemente sobre a instalação do *Nginx*]: {filename}/08-nginx-poderoso-rapido-e-facil.md
    "Nginx: Poderoso, rápido e fácil"
  [*Brandon Konkle*]: http://brandonkonkle.com/blog/2010/sep/14/django-uwsgi-and-nginx/
    "Django on uWSGI and Nginx"
  [*Senko Rasic*]: http://senko.net/en/django-nginx-gunicorn/
    "A Django setup using Nginx and Gunicorn"
  [*Django*]: {tag}django
    "Leia mais sobre Django"
  [*Nginx*]: {tag}nginx "Leia mais sobre Nginx"
  [*Supervisor* – Documentação oficial]: http://supervisord.org/
    "Supervisor - A process control system"
  [*Brandon Konkle – Django on uWSGI and Nginx*]: http://brandonkonkle.com/blog/2010/sep/14/django-uwsgi-and-nginx/
    "Saiba como montar um servidor Nginx com Django, uWSGI e Supervisor"
  [*Mike Naberezny – Supervisor as a Platform*]: http://www.plope.com/static/misc/supervisor-pycon2008.pdf
    "Apresentação para a PyCon 2008, sobre Supervisor"
  [*Senko’s Blog – A Django setup using Nginx and Gunicorn*]: http://senko.net/en/django-nginx-gunicorn/
    "Um ótimo exemplo de uso do Nginx, Django e Supervisor"
