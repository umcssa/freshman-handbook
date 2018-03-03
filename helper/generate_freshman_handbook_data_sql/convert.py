import glob
import codecs

content_files = list(glob.iglob('content/**/*.txt', recursive=True))

for content_file in content_files:
    content = codecs.open(content_file, "r", "GB18030").read()
    codecs.open(content_file, "w", "utf-8").write(content)
