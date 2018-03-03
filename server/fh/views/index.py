"""FH index view."""
import flask
import fh
import fh.model
import random



@fh.app.route(fh.app.config['APPLICATION_ROOT'], defaults={'path': ''})
@fh.app.route(fh.app.config['APPLICATION_ROOT'] + '<path:path>')
def index(path):
    """Display / route."""
    return flask.render_template('index.html')

@fh.app.route(fh.app.config['APPLICATION_ROOT'] + 'static/<path:filename>')
def client_static(filename):
    """Display /static/<path:filename> route."""
    return flask.send_from_directory(
        fh.app.config['STATIC_FOLDER'], filename)
