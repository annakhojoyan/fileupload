'use strict';
const fs = require('fs');
const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const config = require('./config/config');
const mongoose = require('mongoose');
const db = mongoose.connection;
const morgan = require('morgan');
const notebook = require('./routings/notebook');
const options = { 
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              }; 
const notebooks = db.collection('notebooks');                  

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.get("/", (req, res) => res.json({message: "Welcome to our NoteBookstore!"}));

app.route("/notebook")
    .get(notebook.getnoteBooks)
    .post(notebook.postnoteBook);
app.route("/notebook/:id")
    .get(notebook.getnoteBook)
    .delete(notebook.deletenoteBook)
    .put(notebook.updatenoteBook);

module.exports = app; 


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(fileUpload());   

app.get('/download', function(req, res){
  var file = __dirname + '/uploads/csv.csv';
  res.download(file); 
});

// fs.readFile('./package.json', 'utf8', function(error, data){
// 	console.log(data);
// });

app.post('/upload', (req, res) => {
    console.log(req.files.file);
    req.files.file.mv(path.resolve(__dirname, './uploads/csv.csv'), function(err) {
        if (err)
      return res.status(500).send(err);
    res.send('File uploaded!');
  });
     
});

var Converter = require('csvtojson').Converter;
var converter = new Converter({});

converter.fromFile('./uploads/csv.csv',function(err,result){
    if(err){
        console.log("Error");
        console.log(err);  
    } 
    var data = result;

console.log(data);
var str = JSON.stringify(data, null, 2);
fs.writeFile('./uploadsjson/csvtojson.json', str, function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log(str);
 });
notebooks.insert(data, function(err, data) {
    console.log(data);
if(err) throw err;
  });
});

require('./config/express.config')(app);
require('./config/mongoose.config')(config);

app.listen(config.dev.port, () => {
  console.log("Listening ..");
});

