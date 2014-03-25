klauslaube.com.br
=================

The implementation of my [*blog*][], powered by [*Pelican*][].

The current theme is [*maggner-pelican*][]. To check out all the plugins used, please, visit the [plugins path][].

Provisioned with [*Fabric*][] and [*SaltStack*][], the blog is nowadays hosted on [*Digital Ocean*][] (but it's not an obligation). It's structure is very simple:

* **bin:** *Pelican* command line tool
* **blog:** The blog configuration files
* **content:** All the articles written
* **plugins:** *Pelican* plugins used to power up the *blog*
* **salt:** The pile of instructions used by *SaltStack*

Installing
----------

You can install the project using **make**:

    make install

It'll install *Pelican* and all *Python* dependencies. Also will install **vagrant-salt**, to be possible to use *SaltStack* with **Vagrant**!

[Download *Vagrant*][].

Development environment
-----------------------

You can serve the *blog* using *Pelican's* development server:

    make devserver
    
Now, accessing **localhost:8000** everything is fine.

You can stop the development server using the **devserver_stop** task:

    make devserver_stop

Provisioning
------------

To start the project using *Vagrant*, you need to do the following:

    vagrant up
    
It'll automatically provision the *Vagrant* instance for you.

You must publish and send content to the *Vagrant* instance. To do that, you can use the **rsync_upload** task:

    make rsync_upload host=vagrant

Finally, you can access the project through **localhost:8080**.

Production environment
----------------------

To provision your production environment, there is a *Fabric* task called **bootstrap**:

    fab prod bootstrap

This task will install *SaltStack* on your remote host, will provision, publish the current content and send them to the host.

Once you have a production environment provisioned, you just need to run the **rsync_upload** task:

    make rsync_upload host=prod
    
**Remember:** The hosts are configured in [**fabfile.py**][].

Contributions are very welcome!

  [*blog*]: http://klauslaube.com.br "My personal blog"
  [*Pelican*]: https://github.com/getpelican/pelican "Static site generator that supports Markdown and reST syntax. Powered by Python"
  [*maggner-pelican*]: https://github.com/kplaube/maggner-pelican "A responsive (and simple) theme for Pelican"
  [plugins path]: https://github.com/kplaube/blog/tree/master/plugins "See all plugins used by the project"
  [*Fabric*]: http://docs.fabfile.org/ "Fabric is a Python (2.5-2.7) library and command-line tool for streamlining the use of SSH for application deployment or systems administration tasks."
  [*SaltStack*]: http://www.saltstack.com/ "Fast, scalable and flexible software for data center automation, from infrastructure and any cloud, to the entire application stack"
  [*Digital Ocean*]: https://www.digitalocean.com/ "Simple cloud hosting, built for developers" 
  [Download *Vagrant*]: https://www.vagrantup.com/downloads "Download Vagrant"
  [**fabfile.py**]: https://github.com/kplaube/blog/blob/master/fabfile.py
