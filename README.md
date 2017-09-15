klauslaube.com.br
=================

The implementation of my [*blog*][], powered by [*Pelican*][].

The current theme is [*yapeme*][]. To check out all the plugins used, please, visit the [plugins path][].

The blog is nowadays hosted at [*Digital Ocean*][] (but it's not an obligation). The project structure is very simple:

* **conf:** NGINX configuration files
* **content:** All the articles written
* **plugins:** Custom *Pelican* plugins used to power up the *blog*
* **vendor:** *Pelican* plugins installed via `git submodule`

Installing
----------

You can install the project using **make**:

    make setup

It'll install *Pelican*, *Python 3* dependencies, and *Pelican* plugins.

Development environment
-----------------------

You can serve the *blog* using *Pelican's* development server:

    make run

Now, accessing **localhost:8000** everything should be fine.

Production environment
----------------------

Once you have a production environment provisioned, you just need to run the **publish** task:

    make prod publish user=<USER>

Contributions are very welcome!

  [*blog*]: http://klauslaube.com.br "My personal blog"
  [*Pelican*]: https://github.com/getpelican/pelican "Static site generator that supports Markdown and reST syntax. Powered by Python"
  [*yapeme*]: https://github.com/kplaube/yapeme "A responsive (and simple) theme for Pelican"
  [plugins path]: https://github.com/kplaube/blog/tree/master/plugins "See all plugins used by the project"
  [*Digital Ocean*]: https://www.digitalocean.com/ "Simple cloud hosting, built for developers"
