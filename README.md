# Flask Project Generator

This is a blank Flask project I use as a starting point for building flask-driven
websites.

## Setup Repo and Virtual Env

1. `git clone <url> project/src` this repo to where it should live
2. `cd` into the repo src and `rm -r .git` to remove the current git history
3. Find and replace `cm_prototype` and `cm_prototype_ENV` with your new intended name (also update text in 
4. Run `git init` to initialize git your new repo
5. Update this readme to be relevant to your project, and commit your changes 
6. Run `mkvirtualenv <project_name>` and then `pip install -r requirements.txt`

## Setup Postgres

1. Run `which psql` and `cd` into the `bin` directory of your sql install
2. Run `createdb <project_name>`
3. `cp <project>/localsettings.py.example <project>/localsettings.py` and update relevant info
4. Run `manage.py createdb`

## Installing Compass + Susy

If you haven't yet, install SASS, then install compass and susy with:

```
gem update --system
gem install compass
gem install compass-rails
compass install susy
```

Also to get `assets.py` to compile correctly, `mkdir <project>/static/public/css`

## Pycharm project setup

1. Go to Project > Settings...
2. Click on project intpreter and choose the python2.7 bin from the virtualenv you created
3. Click on Compass Support. Enable Compass support and point to the config


