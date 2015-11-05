var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/employeeDb');

var Person = mongoose.model('Person', new Schema({'firstName':String, 'lastName':String, 'salary':String, 'yearsService':String}, {collection:'employeeDb'}));

app.set("port", process.env.PORT || 4999);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.route('/data').get(function (req, res) {
              console.log('/data was sent this should show up on the server console');

              Person.find({}, function (err, data) {
                  res.send(data);
              });
            })
            .delete(function (req, res) {
                console.log("/delete was sent this should show up on the server console",req.body.id);
                  Person.findByIdAndRemove(req.body.id, function(err, data){
                      res.send(data);
                  });
            });

app.get("/*", function(req, res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get("port"), function(){
    console.log("Meow", app.get("port"));
});
