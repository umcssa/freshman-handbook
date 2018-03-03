import glob
import codecs
import re

content_files = list(glob.iglob('raw/**/*.txt', recursive=True))

for content_file in content_files:
    content = open(content_file).read()
    new_filename = re.findall(r'(/\d+\. (.+?))+\.txt', content_file)[0][1] + '.txt'
    open('content/' + new_filename,'w').write(content)
