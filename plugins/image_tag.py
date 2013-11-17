import pelican
import re

IMAGE_MARKER = re.compile('\|img "(?P<src>[\w/._-]+)"\s+(?P<width>\d+)\s+(?P<height>\d+)\s?(\"(?P<alt_text>[\w\s\?\!,._-]+)\")?\s?(\"(?P<css_classes>[\w\s_-]+)\")?\s?\|',
                          re.UNICODE)


def image_tag(src, width, height, alt_text=None, css_classes=None):
    img = '<img src="{filename}%s" width="%s" height="%s" ' % (src, width, height)

    if alt_text:
        img += 'alt="%s" ' % alt_text
    if css_classes:
        img += 'class="%s" ' % css_classes

    img += '>'

    return img


def replace_image_tag(match):
    return image_tag(**match.groupdict())


def content_object_init(instance):
    if not instance._content:
        return

    content = instance._content
    instance._content = re.sub(IMAGE_MARKER, replace_image_tag, content)


def register():
    pelican.signals.content_object_init.connect(content_object_init)
