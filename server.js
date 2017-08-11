var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname + '/'));
app.use("/images/", express.static(__dirname + '/app/images'));
app.use("/css/", express.static(__dirname + '/app/css'));
app.use("/js/", express.static(__dirname + '/app/js'));

app.listen(port);
