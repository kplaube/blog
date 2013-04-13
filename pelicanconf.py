#!/usr/bin/env python
# -*- coding: utf-8 -*- #

import sys
sys.path.append('.')

AUTHOR = u'Klaus Peter Laube'
SITENAME = u'Klaus Laube'
SITESUBTITLE = u'Python, Django e desenvolvimento Web'
SITEURL = 'http://klauslaube.com.br'

TIMEZONE = 'America/Sao_Paulo'
DEFAULT_LANG = u'pt_BR'
DEFAULT_DATE_FORMAT = '%d %b, %Y'

DELETE_OUTPUT_DIRECTORY = True
WEBASSETS = True

THEME = 'themnific-pelican'

FEED_ALL_RSS = 'feed/rss.xml'
USE_FOLDER_AS_CATEGORY = False
DEFAULT_PAGINATION = 10

# Article
ARTICLE_URL = '{date:%Y}/{date:%m}/{date:%d}/{slug}.html'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{date:%d}/{slug}.html'
DISQUS_SITENAME = 'klauslaube'

# Menu
MENUITEMS = (
    ('Blog', '/'),
    ('Projetos', '/projetos/'),
)

# Blogroll
LINKS = ()

# Social
SOCIAL = (
    ('Bitbucket', 'http://bitbucket.org/kplaube/'),
    ('Coderwall', 'http://coderwall.com/kplaube'),
    ('Duolingo', 'http://duolingo.com/#/kplaube'),
    ('GitHub', 'http://github.com/kplaube'),
    ('LinkedIn', 'http://www.linkedin.com/in/klauslaube'),
    ('ProfissionaisTI', 'http://www.profissionaisti.com.br/author/klaus-peter-laube/'),
    ('Skoob', 'http://skoob.com.br/usuario/118855'),
    ('Twitter', 'http://www.twitter.com/kplaube'),
    ('Zootool', 'http://zootool.com/user/kplaube/'),
)

TWITTER_USERNAME = 'kplaube'

LICENSE = 'Creative Commons Attribution 3.0'
LICENSE_URL = 'http://creativecommons.org/licenses/by/3.0/deed.pt_BR'
SOURCE_CODE_URL = 'https://github.com/kplaube/klauslaube.com.br/'

# Plugins
from pelican.plugins import assets, global_license
from plugins import summary

PLUGINS = (
    assets,
    global_license,
    summary,
)
