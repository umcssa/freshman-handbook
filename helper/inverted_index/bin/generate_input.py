#!/usr/bin/env python3

import os
import shutil
import re
from bs4 import BeautifulSoup
import urllib.parse

CONTENT_DIR = '../generate_content/content'
HADOOP_DIR = 'index/hadoop'

shutil.rmtree(os.path.join(HADOOP_DIR, 'input'), ignore_errors=True)
os.mkdir(os.path.join(HADOOP_DIR, 'input'))

f = open(os.path.join(HADOOP_DIR, 'input/input'), 'a+')

id = 0
for file in os.listdir(CONTENT_DIR):
    if file.endswith('.html'):
        soup = BeautifulSoup(open(os.path.join(CONTENT_DIR, file)).read(), "html.parser")
        all_text = ''.join(soup.findAll(text=True))
        all_text = re.sub(r'\s+', ' ', all_text)
        f.write(str(id) + '\t' + file[:-5] + '\t' + all_text + '\n')
        id += 1
