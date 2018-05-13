#!/usr/bin/env python3
"""Map example."""

import sys

for line in sys.stdin:
    tokens = line.split('\t')
    key = tokens[0]
    id = key[:str(key).index(' ')]
    word = key[str(key).index(' ') + 1:]
    frequency = tokens[1]
    if word.strip() != '':
        print(word + '\t' + id + ' ' + frequency)
