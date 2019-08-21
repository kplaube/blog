import sys
import os

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from pelicanconf import *

SITEURL = "https://klauslaube.com.br"

# TODO: Should use EXTRA_PATH_METADATA instead
FAVICON_URL = "%s/favicon.ico" % SITEURL
DEFAULT_OG_IMAGE = "%s/images/opengraph.jpg" % SITEURL

PLUGINS += [
    "minify",
    "optimize_images",
]
