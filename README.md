# att-project

To setup a project 
1. clone the repo and go to the project folder
 then install node packages with "npm install"
2. To run the server Please run the command "node server.js" 
in a shell


To backup the database of mongodb
mongodump --host localhost --port 27017 --db att_project --out path/to/destination


To restore mongodb dump from dump folder
mongorestore --host localhost --port 27017 path/to/dumpfolder