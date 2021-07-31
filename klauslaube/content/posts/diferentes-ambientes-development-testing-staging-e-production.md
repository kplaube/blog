---
title: "Diferentes ambientes: Development, Testing, Staging e Production"
date: 2011-03-07 12:37:00
tags: ["desenvolvimento-web", "infraestrutura", "agile", "qualidade", "testes"]
slug: diferentes-ambientes
thumbnail: /images/server-rack.jpg
---

Uma das práticas mais interessantes nessa
“nova onda” de qualidade que está “encrostada” nas práticas [*agile*][]
de desenvolvimento de _software_, é o uso de diferentes ambientes para
diferentes estágios do ciclo de vida de uma aplicação.

Com auxílio da [virtualização][], podemos implementar (sem dificuldades)
estes ambientes em qualquer empresa que tenha como cultura entregar
_software_ de qualidade.

## Development

Ter um ambiente isolado só seu, onde você possa codificar sem se
preocupar com o resto da equipe. Essa é a premissa do ambiente de
desenvolvimento.

Em [*Python*][], é muito simples construirmos um [ambiente isolado][] em
nossas máquinas, isolado até mesmo do nosso SO. Podemos codificar,
testar, errar e corrigir, sem afetar diretamente os outros membros da
equipe.

[Onde eu trabalho atualmente][], o ambiente de desenvolvimento é
totalmente construído em uma máquina virtual, devido as fortes
dependências entre ferramentas como [*Nagios*][] e [*RRDTools*][].

Ao fim do dia (ou de uma _feature_), você pode “comitar” suas alterações
para uma máquina central, comumente chamada de “Integration” (podendo
ser o responsável por manter um servidor [*SVN*][] ou um repositório
central quando for um [*DVCS*][]).

Antes de implantar o método descrito acima, o ambiente de
desenvolvimento era um servidor compartilhado onde os membros da equipe
trabalhavam simultaneamente (no mesmo ambiente). Funcionou e tenho
certeza que funcionaria até hoje, mas acredito que ambientes isolado
sejam mais organizados e seguros.

## Testing

Quando você possui uma equipe de testes em seu projeto, nada melhor do
que montar um servidor onde você possa por à prova as últimas
modificações inseridas em sua aplicação.

Como eu nunca tive a oportunidade de trabalhar com pessoas dedicadas a
testes, geralmente utilizo o próprio ambiente de _staging_ para testes.

Embora [testes unitários][] e de [aceitação][] sejam amplamente
executados em ambiente de desenvolvimento, quando o projeto ficar
gigante, executar todos os testes do projeto a cada nova feature
desenvolvida pode lhe consumir muito tempo. Neste caso é interessante
você construir um [servidor de integração contínua][].

Na [*Uptime*][], trabalhávamos da seguinte maneira: Existia um servidor
que era responsável apenas por clonar o repositório central e executar
os testes automatizados. Quando um teste falhava, um membro da equipe
era notificado, e ele designava alguém para resolver conflitos e
problemas. O conceito é o mesmo apresentado no _link_ acima, a exceção é
que esse processo era uma tarefa agendada e executava em determinada
hora do dia (e não diretamente a cada _commit_ ou em um determinado
momento do processo de integração).

## Staging

O papel do ambiente de _staging_ é ser o mais próximo da realidade, ou
seja, ele deve ser uma réplica perfeita do ambiente de produção.
Tratando-se de desenvolvimento [*web*][], deve-se utilizar o mesmo
serviço _web_, o mesmo banco de dados, os mesmos módulos e _plugins_.
Isso garantirá um _deploy_ muito mais “suave” para o ambiente de
produção.

No meu caso específico, utilizei o ambiente de _staging_ para, além de
testar a aplicação em um ambiente mais “real”, demonstrar as _features_
para o cliente. Logo, ele tinha algo real, e com dados que faziam
sentido, antes mesmo do projeto ir para o ar.

Ficou mais simples determinar se a solução soluciona o seu problema ou
não.

## Production

E finalmente, o ambiente de produção.

É neste ambiente que a sua aplicação ganha vida e enfrenta a dura
realidade do mundo :)

## Referências

- [*Effective Development Environments: Development, Test, Staging/Pre-prod and Production Environments*][]
- [*Caelum*: Integração Contínua][]
- [Integração Contínua][]
- [*PHP Environment: Development Staging Production*][]
- [*Traditional Development/Integration/Staging/Production Practice for Software Development*][]

Acompanhe a produção dos posts da série [Montando seu ambiente de
desenvolvimento *Django* no *Linux*][] assinando o [*Feeds RSS*][] ou me
seguindo no [*Twitter*][].

Até a próxima…

[*agile*]: /tag/agile.html "Leia mais sobre Agile"
[virtualização]: {virtualbox-uma-maneira-interessante-de-possuir-varios-sos-em-uma-maquina-so.md "Virtualbox: Uma maneira interessante de possuir vários SOs em uma máquina só"
[*python*]: /tag/python.html "Leia mais sobre Python"
[ambiente isolado]: http://blog.triveos.com.br/2010/04/25/trabalhando-com-python-e-django/ "Trabalhando com Python e Django"
[onde eu trabalho atualmente]: http://www.setinet.com.br/ "Setinet, Internet Controlada"
[*nagios*]: http://www.nagios.org/ "Monitore a sua infraestrutura com Nagios"
[*rrdtools*]: http://www.mrtg.org/rrdtool/ "Data logging e gráficos com RRDTools"
[*svn*]: http://subversion.tigris.org/ "Versionamento de projetos com Subversion"
[*dvcs*]: http://en.wikipedia.org/wiki/Distributed_Version_Control_System "Leia mais sobre Distributed Version Control System no Wikipedia"
[testes unitários]: /tag/tdd.html "Leia mais sobre TDD"
[aceitação]: /tag/bdd.html "Leia mais sobre BDD"
[servidor de integração contínua]: http://blog.caelum.com.br/integracao-continua/ "Leia artigo da Caelum falando sobre Continuous Integration"
[*uptime*]: http://uptimetecnologia.com.br/ "Uptime, garantindo a sua segurança na internet"
[*web*]: /tag/desenvolvimento-web.html "Leia mais sobre Web"
[*effective development environments: development, test, staging/pre-prod and production environments*]: http://spacebug.com/effective_development_environments/ "Uma excelente referência, um artigo bem escrito e objetivo."
[*caelum*: integração contínua]: http://blog.caelum.com.br/integracao-continua/ "A Caelum é uma das melhores referências do país sobre agile e desenvolvimento em geral."
[integração contínua]: http://devagil.wordpress.com/2007/04/14/4611-integracao-continua/ "Excelente artigo sobre Integração Contínua dentro do contexto de agile."
[*php environment: development staging production*]: http://www.dotkernel.com/php-development/php-environment-development-staging-production/ "Um artigo claro e objetivo sobre os ambientes de Development, Staging e Production."
[*traditional development/integration/staging/production practice for software development*]: http://dltj.org/article/software-development-practice/ "Um post muito bom sobre desenvolvimento de software com qualidade."
[montando seu ambiente de desenvolvimento *django* no *linux*]: /2011/03/03/montando-seu-ambiente-de-desenvolvimento-django.html "Saiba como montar o seu ambiente de desenvolvimento para trabalhar com Django"
[*feeds rss*]: https://klauslaube.com.br/feed/rss.xml "Leia os posts deste blog no seu leitor RSS favorito"
[*twitter*]: http://www.twitter.com/kplaube "Siga-me no Twitter"
