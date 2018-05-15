import codecs
import os
import re

files = os.listdir('content')

for file in files:
    if file.endswith('.html'):
        content = codecs.open(os.path.join('content', file), 'r', 'utf-8').read()
        # results = re.findall('\./uploads/(.+?).tiff',content)
        # if results:
        #     for result in results:
        #         content = content.replace(result + '.tiff', result + '.jpg')
        #         codecs.open(os.path.join('content', file), 'w+', 'utf-8').write(content)

        # if '<a href=' in content:
        #     print(file)
        # codecs.open(os.path.join('content', file), 'w+', 'utf-8').write(content.replace('<a href=', '<a target="_blank" href='))
