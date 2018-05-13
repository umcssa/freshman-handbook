#!/usr/bin/env python3
"""Reduce example."""

import sys
import collections
import math

WORDDICT = {}
NUMDOCS = 55
for line in sys.stdin:
    word = line.split("\t")[0]
    if word.strip() != '':
        if word in WORDDICT:
            WORDDICT[word].append(line.split("\t")[1][:-1])
        else:
            WORDDICT[word] = [line.split("\t")[1][:-1]]

SORTEDDICT = collections.OrderedDict(sorted(WORDDICT.items()))
for key in SORTEDDICT:
    print(key + '\t' + str(math.log10(NUMDOCS / len(SORTEDDICT[key]))) + ' ' + ' '.join(SORTEDDICT[key]))
