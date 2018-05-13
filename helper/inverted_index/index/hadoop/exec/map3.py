#!/usr/bin/env python3
"""Map example."""

import sys

for line in sys.stdin:
    tokens = line.split('\t')
    id = tokens[0]
    values = tokens[1].split()
    norm = values[0]

    for i in range(int(len(values[1:]) / 3)):
        word = values[1:][3 * i]
        frequency = values[1:][3 * i + 1]
        idf = values[1:][3 * i + 2]
        print(word + ' ' + idf + '\t' + id + ' ' + frequency + ' ' + norm)
