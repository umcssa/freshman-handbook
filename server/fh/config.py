"""
FH development configuration.
"""

import os

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/freshman-handbook/'

# Secret key for encrypting cookies
SECRET_KEY = b'\x88\xd05)\xf5\xfb\xd1\xaf\x9a\\\x86\xaf\xa7\x84,\xcc\xa5T\x17|\xa8`@\xbf'  # noqa: E501  pylint: disable=line-too-long
SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'var', 'uploads'
)
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

# Database file is var/fh.sqlite3
DATABASE_FILENAME = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    'var', 'fh.sqlite3'
)

STATIC_FOLDER = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    '../client/build/static'
)

INVERTED_INDEX_FILE_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    '../helper/inverted_index/index/hadoop/output/part-00000')

DOC_ID_DICT_FILE_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.realpath(__file__))),
    '../helper/inverted_index/index/hadoop/input/input')

INVERTED_INDEX = {}
f = open(INVERTED_INDEX_FILE_PATH)
for line in f.readlines():
    tokens = line.split()
    word = tokens[0]
    INVERTED_INDEX[word] = [float(tokens[1]), {}]
    for i in range(2, len(tokens), 3):
        INVERTED_INDEX[word][1][int(tokens[i])] = [int(tokens[i + 1]), float(tokens[i + 2])]

DOC_ID_DICT = {}
f = open(DOC_ID_DICT_FILE_PATH)
for line in f.readlines():
    DOC_ID_DICT[int(line.split('\t')[0])] = line.split('\t')[1]
