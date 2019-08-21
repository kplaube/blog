import sys
import os

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from pelicanconf import *

SITEURL = "https://klauslaube.com.br"

PLUGINS += [
    "optimize_images",
]
