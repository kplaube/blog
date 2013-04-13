import pelican
import re

TAG_MARKER = re.compile('\|filename\|\/tag\/', re.UNICODE)


def content_object_init(sender, instance):
    content = instance._content
    instance._content = re.sub(TAG_MARKER, '/tag/', content)


def register():
    pelican.signals.content_object_init.connect(content_object_init)
