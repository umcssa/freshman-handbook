import codecs
import os

files = os.listdir('content')

for file in files:
    if file.endswith('.html'):
        content = codecs.open(os.path.join('content', file), 'r', 'utf-8').read()
        if '<a href=' in content:
            print(file)
        codecs.open(os.path.join('content', file), 'w+', 'utf-8').write(content.replace('<a href=', '<a target="_blank" href='))
