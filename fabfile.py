import os
from fabric.api import env, local, run, task
from fabric.context_managers import shell_env
from fabric.contrib.project import rsync_project

HERE = os.path.dirname(os.path.abspath(__file__))

env.config_file = os.path.join(HERE, 'blog', 'pelicanconf.py')
env.input_dir = os.path.join(HERE, 'content')
env.output_dir = os.path.join(HERE, 'output')
env.pelican_opts = ''
env.remote_content_dir = '/srv/blog/'


@task()
def vagrant():
    env.siteurl = 'http://local.klauslaube.com.br:8080'
    env.hosts = ['localhost', ]
    env.port = 2222


@task()
def prod():
	env.siteurl = 'http://192.241.239.141'
	env.hosts = ['192.241.239.141', ]


@task(default=True)
def bootstrap():
    install_salt()
    provision()
    publish()
    upload_content()


@task()
def install_salt():
    add_apt_repository()
    apt_get_update()

    run('apt-get install salt-minion')


@task()
def add_apt_repository():
    run('apt-get install software-properties-common')
    run('add-apt-repository ppa:saltstack/salt')


@task()
def apt_get_update():
    run('apt-get update')


@task()
def provision(loglevel='info'):
    upload_state_tree()
    run('salt-call --local state.highstate -l {0}'.format(loglevel))


@task()
def upload_state_tree():
    local_state_tree_path = os.path.join(HERE, 'salt', 'roots', '*')
    remote_state_tree_path = '/srv/salt/'
    rsync_project(local_dir=local_state_tree_path,
                  remote_dir=remote_state_tree_path)


@task()
def upload_content():
    local_content_path = os.path.join(env.output_dir, '*')
    rsync_project(local_dir=local_content_path,
                  remote_dir=env.remote_content_dir)


@task()
def publish():
    with shell_env(SITEURL=env.siteurl):
        local('pelican {input_dir} -o {output_dir} -s {config_file} {pelican_opts}'.format(**env))
