#!/usr/bin/env python
# -*- coding: utf-8 -*- #

AUTHOR = u'Klaus Peter Laube'
SITENAME = u'Klaus Laube'
SITESUBTITLE = u'Python, Django e desenvolvimento Web'
SITEURL = ''

TIMEZONE = 'America/SaoPaulo'
DEFAULT_LANG = u'pt_BR'

DELETE_OUTPUT_DIRECTORY = True
WEBASSETS = True

THEME = 'themnific-pelican-theme'

FEED_ALL_RSS = 'feed/rss.xml'
FEED_ALL_ATOM = 'feed/atom.xml'

DEFAULT_PAGINATION = 10

# Menu
MENUITEMS = (
    ('Blog', '/'),
    ('Portfolio', '/portfolio/'),
)

# Blogroll
LINKS = (
    ('Pelican', 'http://docs.notmyidea.org/alexis/pelican/'),
    ('Python.org', 'http://python.org'),
    ('Jinja2', 'http://jinja.pocoo.org'),
    ('You can modify those links in your config file', '#'),
)

# Social
SOCIAL = (
    ('You can add links in your config file', '#'),
    ('Another social link', '#'),
)

TWITTER_USER = 'kplaube'

LICENSE = 'Creative Commons Attribution 3.0'
LICENSE_URL = 'http://creativecommons.org/licenses/by/3.0/deed.pt_BR'
SOURCE_CODE_URL = 'https://github.com/kplaube/klauslaube.com.br/'

PLUGINS = (
    'pelican.plugins.assets',
    'pelican.plugins.global_license',
)
