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

# Blogroll
LINKS =  (('Pelican', 'http://docs.notmyidea.org/alexis/pelican/'),
          ('Python.org', 'http://python.org'),
          ('Jinja2', 'http://jinja.pocoo.org'),
          ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

PLUGINS = (
    'pelican.plugins.assets',
)
