# Freshman Handbook
[![Build Status](https://travis-ci.com/umcssa/freshman-handbook.svg?branch=master)](https://travis-ci.com/umcssa/freshman-handbook)

A web application produced by the CSSA APPs development team, which provides useful information for freshman students at the University of Michigan, including course selection, student apartments, campus transportation, etc.

## Website
[http://app.um-cssa.org/freshman-handbook/](http://app.um-cssa.org/freshman-handbook/)

## Development Setup
* Preparation
```
git clone https://github.com/umcssa/freshman-handbook.git
cd freshman-handbook
```
* Back-end in Flask
```
cd server
python3 -m venv env
source env/bin/activate
pip install -e .
./bin/fhrun
```
* Front-end in React
```
cd client
npm install
npm start
```

## Inverted Index based on tf-idf
* Install Java.
```
sudo -s
sudo apt-get update
sudo apt-get install default-jdk
```
* Download Hadoop and unpack.
```
cd /opt
wget http://apache.osuosl.org/hadoop/common/hadoop-2.8.4/hadoop-2.8.4.tar.gz
tar -xvzf hadoop-2.8.4.tar.gz
rm hadoop-2.8.4.tar.gz
```
* Locate the path to your Java interpreter.
```
which java | xargs readlink -f | sed 's:bin/java::'
```
* Edit /opt/hadoop-2.8.4/etc/hadoop/hadoop-env.sh to change the JAVA_HOME.
```
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre
```
* Write a launch script, /usr/local/bin/hadoop
```
#!/bin/bash
exec "/opt/hadoop-2.8.4/bin/hadoop" "$@"
```
* Make the script executable and check that it’s working.
```
chmod +x /usr/local/bin/hadoop
hadoop  -h
exit  # drop root privileges
```
* Setup Python environment
```
cd helper/inverted_index/
python3 -m venv env
source env/bin/activate
pip install -e .
```
* Run Hadoop pipeline
```
./bin/hadoop_pipeline
```
* For more details on the implementation of MapReduce indexing, please refer to https://eecs485staff.github.io/p5-search-engine/.


## Contributing
If you are a member of UM-CSSA and have passion for web development, welcome to join our CSSA APPs development team! Please contact [kezian@umich.edu](mailto://kezian@umich.edu).
