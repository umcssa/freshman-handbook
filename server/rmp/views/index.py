"""RMP index view."""
import flask
import rmp
import rmp.model
import random


@rmp.app.route(rmp.app.config['APPLICATION_ROOT'], methods=['GET'])
def index():
    """Display / route."""
    return flask.render_template('index.html')
