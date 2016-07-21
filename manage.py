#!/usr/bin/env python

# Based on the the Flask Foundation best practices from Jack Stouffer.
# https://github.com/JackStouffer/Flask-Foundation

import os

from flask.ext.script import Manager, Server
from flask.ext.script.commands import ShowUrls, Clean

from cm_prototype import create_app

env = os.environ.get('CM_PROTOTYPE_ENV', 'dev')
app = create_app('cm_prototype.settings.%sConfig' % env.capitalize())

manager = Manager(app)
manager.add_command("server", Server())
manager.add_command("show-urls", ShowUrls())
manager.add_command("clean", Clean())


@manager.shell
def make_shell_context():
    """ Creates a python REPL with several default imports
        in the context of the app
    """

    return dict(app=app)


if __name__ == "__main__":
    manager.run()
