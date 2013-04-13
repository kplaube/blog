import pelican
import types


def initialized(pelican):
    pelican.settings.setdefault('SUMMARY_BEGIN_MARKER',
                                '<!-- PELICAN_BEGIN_SUMMARY -->')
    pelican.settings.setdefault('SUMMARY_END_MARKER',
                                '<!-- PELICAN_END_SUMMARY -->')


def content_object_init(sender, instance):
    # if summary is already specified, use it
    if 'summary' in instance.metadata:
        return

    def _get_content(self):
        content = self._content
        if self.settings['SUMMARY_BEGIN_MARKER']:
            content = content.replace(
                self.settings['SUMMARY_BEGIN_MARKER'], '', 1)
        if self.settings['SUMMARY_END_MARKER']:
            content = content.replace(
                self.settings['SUMMARY_END_MARKER'], '', 1)
        return content
    instance._get_content = types.MethodType(_get_content, instance)

    # extract out our summary
    if not hasattr(instance, '_summary') and instance._content is not None:
        content = instance._content
        begin_summary = -1
        end_summary = -1
        if instance.settings['SUMMARY_BEGIN_MARKER']:
            begin_summary = content.find(instance.settings['SUMMARY_BEGIN_MARKER'])
        if instance.settings['SUMMARY_END_MARKER']:
            end_summary = content.find(instance.settings['SUMMARY_END_MARKER'])
        if begin_summary != -1 or end_summary != -1:
            # the beginning position has to take into account the length
            # of the marker
            begin_summary = (begin_summary +
                            len(instance.settings['SUMMARY_BEGIN_MARKER'])
                            if begin_summary != -1 else 0)
            end_summary = end_summary if end_summary != -1 else None
            instance._summary = instance._update_content(content[begin_summary:end_summary],
                                                         instance._context['SITEURL'])


def register():
    pelican.signals.initialized.connect(initialized)
    pelican.signals.content_object_init.connect(content_object_init)
