# Freshman Handbook
A web application produced by the CSSA APPs development team, which provides useful information for freshman students at the University of Michigan, including course selection, student apartments, campus transportation, etc.

## Website (Coming Soon)
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

## Contributing
If you are a member of UM-CSSA and have passion for web development, welcome to join our CSSA APPs development team! Please contact [kezian@umich.edu](mailto://kezian@umich.edu).
