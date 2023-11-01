---
title: "Esse é mais um post sobre Vagrant"
date: 2015-10-03 14:00:00
modified: 2023-11-01 10:08:00
tags: ["infraestrutura", "virtualizacao", "provisionamento", "vagrant"]
slug: esse-e-mais-um-post-sobre-vagrant
thumbnail: ./images/vagrant-logo.png
---

Sim! Esse é mais um _post_ sobre _Vagrant_, entre tantos outros espalhados pela
[_web_](/tag/desenvolvimento-web.html "Leia mais sobre Web"). Sim! Se você já conhece a ferramenta,
provavelmente não terá nada de novo para você nesse artigo.

Já falamos um pouco sobre [ambientes virtuais](/tag/virtualizacao.html "Leia mais sobre Virtualização"),
e as vantagens são numerosas. A "atomicidade" de poder construir e destruir um
ambiente inteiro, sem acarretar efeitos colaterais ao seu ambiente de trabalho,
traz agilidade sem perder segurança e sanidade.

Sem dúvida o que levou "virtualização" de um _buzzword_ para uma necessidade
real na vida dos profissionais foi a diminuição do _overhead_ na criação de
ambientes virtuais. Hoje, uma porção de ferramentas é capaz de realizar essa
operação de maneira muito fácil.

Entre essas ferramentas está o _Vagrant_.

## Quanto mais perto de produção, melhor

Por quê? Por que usar _Vagrant_? Por que adicionar essa complexidade na minha
_stack_ de desenvolvimento?

Quem utiliza [mais de um ambiente](/2011/03/07/diferentes-ambientes.html)
(como _dev_, _qa_, _staging_, etc) defende que
eles servem como "peneiras" para pegarmos eventuais _bugs_ e problemas de
integração de código.

Você já deve ter se deparado com o famoso problema "works on my machine":
Instalou aquela dependência que resolve a sua vida, mas quando sobe para algum
ambiente ela simplesmente não funciona.

Ter um ambiente muito próximo de produção disponível para você em tempo de
desenvolvimento pode ser uma excelente ideia para economizar tempo, otimizar
processos, e lhe dar segurança para fazer aquela subida de código em plena
sexta-feira.

## Vagrant FTW

Segundo o [_Wikipedia_](https://en.wikipedia.org/wiki/Vagrant_%28software%29 "Leia sobre Vagrant"):

> Vagrant is computer software that creates and configures virtual development environments. It can be seen as a higher-level wrapper around virtualization software such as VirtualBox, VMware, KVM and Linux Containers (LXC), and around configuration management software such as Ansible, Chef, Salt, and Puppet.

É isso mesmo o que você leu! O _Vagrant_ é uma ferramenta que serve como uma
"cola" entre a sua máquina _VirtualBox_ e o seu provisionamento por _Puppet_.

Nesse _blog_, eu uso o _Vagrant_ para simular o meu ambiente de produção da
_Digital Ocean_, composto por uma máquina _Ubuntu Linux_ com [_Nginx_](/tag/nginx.html "Leia mais sobre NGINX"),
provisionada através de _Salt Stack_. O meu `Vagrantfile` ficou [assim](https://raw.githubusercontent.com/kplaube/blog/master/Vagrantfile "Veja no GitHub"):

```ruby
# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu1210-64"
  config.vm.box_url = "https://github.com/downloads/roderik/VagrantQuantal64Box/quantal64.box"

  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.synced_folder "salt/roots/", "/srv/salt/"

  config.vm.provision :salt do |salt|

    salt.minion_config = "salt/minion"
    salt.run_highstate = true
    salt.verbose = true

  end
end
```

Quer entender o que está acontecendo no exemplo acima? A documentação de [_Getting started_ do _Vagrant_](https://docs.vagrantup.com/v2/getting-started/index.html "Leia a documentação do Vagrant")
é uma excelente dica para começar. Engloba desde a instalação até o provisionamento.

![Não é desse Vagrant que estamos falando... (deathsdoormatt.com)](/media/the-vagrant.jpg "Não é desse Vagrant que estamos falando... (deathsdoormatt.com)")

O [_Salt Stack_](http://saltstack.com/ "Conheça o SaltStack") é uma excelente
ferramenta de provisionamento escrita em [_Python_](/tag/python.html "Leia mais sobre Python"). Vale muito a pena conhecer.

## Considerações finais

Além da vantagem de ter um ambiente próximo de produção disponível para você em
tempo de desenvolvimento, com o _Vagrant_ temos uma segunda vantagem: Quando um
novo integrante fazer parte do seu time, basta ele clonar o projeto e dar
um `vagrant up`. Pronto! O ambiente levanta-se em uma máquina virtual, e é
provisionado sem necessidade de intervenção humana.

Existem toneladas de artigos na _Web_ sobre o _Vagrant_. O [Usando o Vagrant como ambiente de desenvolvimento no Windows](http://simplesideias.com.br/usando-o-vagrant-como-ambiente-de-desenvolvimento-no-windows "Leia o artigo no SimplesIdeias"), do **Simples Ideias** e [Vagrant: Fácil E útil](http://flaviosilveira.com/2012/vagrant-facil-e-util/ "Leia no blog do Flavio") do **Flávio Silveira** são duas boas referências para quem está iniciando.

Nos próximos _posts_ pretendo dar uma pincelada no _Salt Stack_ e _Ansible_.

Até a próxima.

## Referências

- _[SaltStack - Automation for CloudOps](http://saltstack.com/ "Conheça o Salt Stack")_
- _[Vagrant - Development environments made easy](https://www.vagrantup.com/ "Conheça o Vagrant")_
- [_Wikipedia - Vagrant (software)_](https://en.wikipedia.org/wiki/Vagrant_%28software%29 "Leia mais no Wikipedia")
