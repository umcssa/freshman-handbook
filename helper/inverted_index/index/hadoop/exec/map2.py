#!/usr/bin/env python3
"""Map example."""

import sys

for line in sys.stdin:
    tokens = line.split('\t')
    word = tokens[0]
    values = tokens[1].split()
    idf = values[0]


    for i in range(int(len(values[1:]) / 2)):
        id = values[1:][2 * i]
        frequency = values[1:][2 * i + 1]
        print(id + '\t' + word + ' ' + frequency + ' ' + idf)
