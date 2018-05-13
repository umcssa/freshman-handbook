import flask
import fh
import json
from collections import OrderedDict


@fh.app.route('/api/freshman-handbook/get-article-content/', methods=['GET'])
def get_article_content():
    title = flask.request.args.get('title')
    return fh.model.get_article_content(title)

@fh.app.route('/api/freshman-handbook/search/', methods=['GET'])
def get_search_results():
    # input: a string of user input keywords
    # output: e.g. [['Title', '<p>content</p><p>content</p>'], ['Title', '<p>content</p><p>content</p>']]
    keywords = flask.request.args.get('q')
    return fh.model.get_search_results(keywords)
