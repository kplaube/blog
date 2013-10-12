import os
from fabric.api import env, run, task
from fabric.contrib.project import rsync_project

HERE = os.path.dirname(os.path.abspath(__file__))

env.hosts = ['192.241.239.141']


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
    local_content_path = os.path.join(HERE, 'output', '*')
    remote_content_path = '/srv/blog/'
    rsync_project(local_dir=local_content_path,
                  remote_dir=remote_content_path)
