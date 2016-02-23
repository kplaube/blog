klauslaube.com.br
=================

The implementation of my [*blog*][], powered by [*Pelican*][].

The current theme is [*yapeme*][]. To check out all the plugins used, please, visit the [plugins path][].

Provisioned with [*SaltStack*][], the blog is nowadays hosted at [*Digital Ocean*][] (but it's not an obligation). The project structure is very simple:

* **content:** All the articles written
* **plugins:** *Pelican* plugins used to power up the *blog*
* **salt:** The pile of instructions used by *SaltStack*

Installing
----------

You can install the project using **make**:

    make setup

It'll install *Pelican* and all *Python 3* dependencies. Also will install **vagrant-salt**, to be possible to use *SaltStack* with **Vagrant**!

[Download *Vagrant*][].

Development environment
-----------------------

You can serve the *blog* using *Pelican's* development server:

    make run

Now, accessing **localhost:8000** everything should be fine.

Provisioning
------------

To start the project using *Vagrant*, you need to do the following:

    vagrant up

It'll automatically provision the *Vagrant* instance for you.

You must publish and send content to the *Vagrant* instance. To do that, you can use the **publish** task:

    make vagrant publish

Finally, you can access the project through **localhost:8080**.

Production environment
----------------------

Once you have a production environment provisioned, you just need to run the **publish** task:

    make prod publish user=<USER>

Contributions are very welcome!

  [*blog*]: http://klauslaube.com.br "My personal blog"
  [*Pelican*]: https://github.com/getpelican/pelican "Static site generator that supports Markdown and reST syntax. Powered by Python"
  [*yapeme*]: https://github.com/kplaube/yapeme "A responsive (and simple) theme for Pelican"
  [plugins path]: https://github.com/kplaube/blog/tree/master/plugins "See all plugins used by the project"
  [*SaltStack*]: http://www.saltstack.com/ "Fast, scalable and flexible software for data center automation, from infrastructure and any cloud, to the entire application stack"
  [*Digital Ocean*]: https://www.digitalocean.com/ "Simple cloud hosting, built for developers"
  [Download *Vagrant*]: https://www.vagrantup.com/downloads "Download Vagrant"
