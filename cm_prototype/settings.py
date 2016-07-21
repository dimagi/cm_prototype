import os
import tempfile
import localsettings as local



class Config(object):
    SECRET_KEY = local.SECRET_KEY

    COMPASS_CONFIGS = os.path.join(os.path.dirname(__file__), 'static/config.rb')


class ProdConfig(Config):
    ENV = 'prod'


class DevConfig(Config):
    ENV = 'dev'
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = True
    ASSETS_DEBUG = True


class TestConfig(Config):
    ENV = 'test'
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    WTF_CSRF_ENABLED = False
