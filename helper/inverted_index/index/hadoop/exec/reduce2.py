#!/usr/bin/env python3
"""Reduce example."""

import sys
import collections
import math

DOCDICT = {}
NORMSUM = {}
for line in sys.stdin:
    id = line.split("\t")[0]
    if id.strip() != '':
        if id in DOCDICT:
            word_values_str = line.split("\t")[1][:-1]
            DOCDICT[id].append(word_values_str)
            word_values = word_values_str.split(' ')
            NORMSUM[id] += math.pow(float(word_values[1]), 2) + math.pow(float(word_values[2]), 2)
        else:
            word_values_str = line.split("\t")[1][:-1]
            DOCDICT[id] = [word_values_str]
            word_values = word_values_str.split(' ')
            NORMSUM[id] = math.pow(float(word_values[1]), 2) + math.pow(float(word_values[2]), 2)

SORTEDDICT = collections.OrderedDict(sorted(DOCDICT.items()))
for key in SORTEDDICT:
    print(key + '\t' + str(NORMSUM[key]) + ' ' + ' '.join(SORTEDDICT[key]))
