#!/usr/bin/env python3
"""Map example."""

import sys
import re
import jieba

for line in sys.stdin:
    tokens = line.split('\t')
    id = tokens[0]
    content = re.sub(r'[^a-zA-Z0-9\u4e00-\u9fff]+', ' ', tokens[2])
    for word in jieba.cut_for_search(content):
        if word.strip() != '':
            print(id + ' ' + word.lower() + '\t1')
