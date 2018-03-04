import glob
import codecs
import re
import os

content_files = list(glob.iglob('raw/**/*.txt', recursive=True))

image_files = os.listdir('../../server/sql/uploads')
all_image_files = '/' + '/'.join(image_files) + '/'
print(all_image_files)

for content_file in content_files:
    content = open(content_file).read()
    new_filename = re.findall(r'(/\d+\. (.+?))+\.txt', content_file)[0][1] + '.txt'
    paragraphs = content.split('\n')
    html = ''
    for paragraph in paragraphs:
        if paragraph == '':
            html += '<br />\n'
        elif re.match('<[\d\w-]+\.(jpe?g|png)>', paragraph):
            result = re.findall('<(([\d\w-]+)\.(jpe?g|png|tiff))>', paragraph)
            html += '<img src="/freshman-handbook/uploads/{}" alt="{}" style="width:100%" />\n'.format(
                re.findall('({}\.(jpe?g|png|tiff))'.format(result[0][1]), all_image_files)[0][0], result[0][1])
        else:
            html += '<p>' + paragraph + '</p>\n'
    open('content/' + new_filename, 'w').write(html)
