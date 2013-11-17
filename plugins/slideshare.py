import pelican
import re

SLIDESHARE_MARKER = re.compile('({|)slideshare\s+id=(?P<id>\d+)&amp;[\w\s\&\=\_\-]+(}|)')
SLIDESHARE_IFRAME = ('<iframe src="http://slideshare.net/slideshow'
					 '/embed_code/%s" width="590" height="481" '
					 'marginwidth="0" marginheight="0" scrolling="no"></iframe>')


def slideshare_iframe(**kwargs):
	return SLIDESHARE_IFRAME % kwargs['id']


def replace_slideshare_iframe(match):
	return slideshare_iframe(**match.groupdict())


def content_object_init(instance):
	if not instance._content:
		return

	content = instance._content
	instance._content = re.sub(SLIDESHARE_MARKER, replace_slideshare_iframe, content)


def register():
	pelican.signals.content_object_init.connect(content_object_init)
