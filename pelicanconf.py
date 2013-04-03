#!/usr/bin/env python
# -*- coding: utf-8 -*- #

import sys
sys.path.append('.')

AUTHOR = u'Klaus Peter Laube'
SITENAME = u'Klaus Laube'
SITESUBTITLE = u'Python, Django e desenvolvimento Web'
SITEURL = ''

TIMEZONE = 'America/Sao_Paulo'
DEFAULT_LANG = u'pt_BR'

DELETE_OUTPUT_DIRECTORY = True
WEBASSETS = True

THEME = 'themnific-pelican'

FEED_ALL_RSS = 'feed/rss.xml'
FEED_ALL_ATOM = 'feed/atom.xml'

DEFAULT_PAGINATION = 10

# Article
ARTICLE_URL = '{date:%Y}/{date:%m}/{date:%d}/{slug}.html'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{date:%d}/{slug}.html'

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

TWITTER_USERNAME = 'kplaube'

LICENSE = 'Creative Commons Attribution 3.0'
LICENSE_URL = 'http://creativecommons.org/licenses/by/3.0/deed.pt_BR'
SOURCE_CODE_URL = 'https://github.com/kplaube/klauslaube.com.br/'


from pelican.plugins import assets, global_license
from plugins import summary

PLUGINS = (
    assets,
    global_license,
    summary,
)
