# -*- coding: utf-8 -*- #

import os

AUTHOR = u"Klaus Peter Laube"
SITENAME = u"Klaus Laube"
SITESUBTITLE = u"Python, Django e desenvolvimento Web"
SITEURL = os.environ.get("SITEURL", "http://localhost:8000")
SITEDESCRIPTION = u"Artigos sobre desenvolvimento Web, Python e Django."

RELATIVE_URLS = False

TIMEZONE = "America/Sao_Paulo"
DEFAULT_LANG = u"pt_BR"
I18N_TEMPLATES_LANG = u"EN"
DEFAULT_DATE_FORMAT = "%d %b, %Y"
LOCALE = ["pt_BR"]

DIRECT_TEMPLATES = ("index", "tags", "categories", "sitemap")
DELETE_OUTPUT_DIRECTORY = True
WEBASSETS = True
STATIC_PATHS = ["images", "extra/favicon.ico", "extra/robots.txt"]
EXTRA_PATH_METADATA = {
    "extra/favicon.ico": {"path": "favicon.ico"},
    "extra/robots.txt": {"path": "robots.txt"},
}
SITEMAP_SAVE_AS = "sitemap.xml"
THEME = "yapeme"

PLUGIN_PATHS = ["vendor", "plugins"]
PLUGINS = [
    "summary",
    "assets",
    "extended_meta",
    "global_license",
    "i18n_subsites",
    "liquid_tags.img",
    "optimize_images",
    "slideshare",
]

JINJA_ENVIRONMENT = {"extensions": ["jinja2.ext.i18n"]}
I18N_GETTEXT_NEWSTYLE = True

FEED_ALL_ATOM = False
FEED_ALL_RSS = "feed/rss.xml"
TAG_FEED_RSS = "feeds/tags/%s.xml"
USE_FOLDER_AS_CATEGORY = False
DEFAULT_PAGINATION = 10

# Article
ARTICLE_URL = "{date:%Y}/{date:%m}/{date:%d}/{slug}.html"
ARTICLE_SAVE_AS = "{date:%Y}/{date:%m}/{date:%d}/{slug}.html"

TAG_URL = "tag/{slug}.html"

FAVICON_URL = "%s/favicon.ico" % SITEURL
DEFAULT_OG_IMAGE = "%s/images/opengraph.jpg" % SITEURL

DEFAULT_METADATA = {"status": "published"}

# Menu
MENUITEMS = (("Contato", "https://about.me/klauslaube"),)

# Blogroll
LINKS = ()

# Social
SOCIAL = (
    ("Facebook", "http://facebook.com/klaus.laube"),
    ("GitHub", "http://github.com/kplaube"),
    ("LinkedIn", "http://www.linkedin.com/in/klauslaube"),
    ("Slideshare", "http://www.slideshare.net/kplaube"),
    ("Twitter", "http://www.twitter.com/kplaube"),
)

DISQUS_SITENAME = "klauslaube"
FACEBOOK_APP_ID = "262757647133878"
GOOGLE_ANALYTICS = "UA-19657400-1"
GOOGLE_SITE_VERIFICATION = "xCq0H3B3JhkPcAdZ03J0vayijvH_g1rQVMZ_DVcMsQY"
TWITTER_USERNAME = "kplaube"

# License
LICENSE = "Creative Commons Attribution 3.0"
LICENSE_URL = "http://creativecommons.org/licenses/by/3.0/deed.pt_BR"
LICENSE_TITLE = "Distribua, adapte, use. Mas mencione o autor."
SOURCE_CODE_URL = "https://github.com/kplaube/blog/"
SOURCE_CODE_REPOSITORY = "GitHub"
