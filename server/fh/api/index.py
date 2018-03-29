import flask
import fh
import json
from collections import OrderedDict


@fh.app.route('/api/freshman-handbook/get-article-content/', methods=['GET'])
def get_article_content():
    title = flask.request.args.get('title')
    return fh.model.get_article_content(title)
