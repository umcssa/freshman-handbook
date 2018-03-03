"""FH index view."""
import flask
import fh
import fh.model
import random


@fh.app.route(fh.app.config['APPLICATION_ROOT'], methods=['GET'])
def index():
    """Display / route."""
    return flask.render_template('index.html')
