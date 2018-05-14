"""FH model (database) API."""
import os
import re
import hashlib
import uuid
import shutil
import tempfile
import sqlite3
import flask
import arrow
import jieba
import fh
import json
import math
from bs4 import BeautifulSoup
from fh.api.invalid_usage import InvalidUsage


def dict_factory(cursor, row):
    """
    Convert database row objects to a dictionary.

    This is useful for building dictionaries which
    are then used to render a template. Note that
    this would be inefficient for large queries.
    """
    output = {}
    for idx, col in enumerate(cursor.description):
        output[col[0]] = row[idx]
    return output


def get_db():
    """Open a new database connection."""
    if not hasattr(flask.g, 'sqlite_db'):
        flask.g.sqlite_db = sqlite3.connect(
            fh.app.config['DATABASE_FILENAME'])
        flask.g.sqlite_db.row_factory = dict_factory

        # Foreign keys have to be enabled per-connection.  This is an sqlite3
        # backwards compatibility thing.
        flask.g.sqlite_db.execute("PRAGMA foreign_keys = ON")

    return flask.g.sqlite_db


@fh.app.teardown_appcontext
def close_db(error):
    # pylint: disable=unused-argument
    """Close the database at the end of a request."""
    if hasattr(flask.g, 'sqlite_db'):
        flask.g.sqlite_db.commit()
        flask.g.sqlite_db.close()


# Freshman Handbook

def get_article_content(title):
    cur = get_db().execute("SELECT content FROM article WHERE title=?", (title,))
    result = cur.fetchone()
    if result:
        return result['content']
    else:
        return ''


def get_search_results(keywords):
    inverted_index = fh.app.config['INVERTED_INDEX']
    keywords = list(filter(lambda word: word.strip() != '',
                           jieba.cut_for_search(re.sub(r'[^a-zA-Z0-9\u4e00-\u9fff]+', ' ', keywords.lower()))))
    keywords_dict = {}

    for keyword in keywords:
        if keyword in keywords_dict:
            keywords_dict[keyword] += 1
        else:
            keywords_dict[keyword] = 1

    doc_ids = get_doc_ids(keywords_dict, inverted_index)
    if not doc_ids:
        return json.dumps([])
    normq = 0
    vectorq = {}
    for keyword, count in keywords_dict.items():
        normq += (count * inverted_index[keyword][0]) ** 2
        vectorq[keyword] = count * inverted_index[keyword][0]

    hits = []
    for doc_id in doc_ids:
        dot_product = 0
        norm = 0
        for keyword in keywords_dict:
            dot_product += inverted_index[keyword][1][doc_id][0] * inverted_index[keyword][0] * vectorq[keyword]
            norm = inverted_index[keyword][1][doc_id][1]

        hits.append({"docid": doc_id, "score": dot_product / math.sqrt(norm) / math.sqrt(normq)})
    hits = sorted(hits, key=lambda x: x["score"], reverse=True)

    results = []
    for hit in hits[:10]:
        title = fh.app.config['DOC_ID_DICT'][hit['docid']]
        content = get_article_content(title)

        # remove all html tags
        soup = BeautifulSoup(content, "html.parser")
        content = ''.join(soup.findAll(text=True))
        content = re.sub(r'\s+', ' ', content)

        # find all displayed intervals in search result's abstract
        intervals = []
        for keyword in keywords_dict:
            intervals += [[m.start() - 20, m.end() + 20] for m in re.finditer(keyword, content, re.IGNORECASE)]

        union_intervals = []
        for begin, end in sorted(intervals):
            if union_intervals and union_intervals[-1][1] >= begin - 1:
                union_intervals[-1][1] = max(union_intervals[-1][1], end)
            else:
                union_intervals.append([begin, end])

        print(union_intervals)

        if union_intervals:
            if union_intervals[0][0] > 0:
                union_intervals = [[0, 0]] + union_intervals
            if union_intervals[-1][1] < len(content):
                union_intervals += [[len(content), len(content)]]

        content = ' ...... '.join(list(
            map(lambda x: content[(x[0] if x[0] > 0 else 0):(x[1] if x[1] < len(content) else len(content))],
                union_intervals)))
        for keyword in keywords_dict:
            replace_words = [content[m.start(): m.end()] for m in re.finditer(keyword, content, re.IGNORECASE)]
            for replace_word in replace_words:
                content = content.replace(replace_word, '<b>{}</b>'.format(replace_word))
        results.append([title, content])
    return json.dumps(results)


def get_doc_ids(keywords_dict, inverted_index):
    doc_ids = 0
    for keyword in keywords_dict:
        if keyword in inverted_index:
            new_doc_ids = inverted_index[keyword][1].keys()
        else:
            new_doc_ids = []

        if doc_ids == 0:
            doc_ids = set(new_doc_ids)
        else:
            doc_ids = doc_ids.intersection(set(new_doc_ids))
    return doc_ids
