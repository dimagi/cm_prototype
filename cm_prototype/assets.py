from flask_assets import Bundle

# todo serve from Amazon S3
common_css = Bundle(
    'components/font-awesome/css/font-awesome.min.css',
    Bundle(
        'sass/style.scss',
        filters=('cssmin', 'pyscss', 'compass'),
        output='public/css/screen.css'
    ),
)

common_js = Bundle(
    'components/jquery/dist/jquery.min.js',
    'components/knockout/dist/knockout.js',
    'components/underscore/underscore-min.js',
    output='public/js/common.js'
)
