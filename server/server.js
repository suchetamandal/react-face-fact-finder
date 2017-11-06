
var express = require('express');
var path = require('path');
var file = require('file-system');
var fs = require('fs');
var routes = require('./routes/router');
var formidable = require('formidable');
var app = express();
var port = 4200;
app.use(express.static('client'));
app.set('view engine', 'html');
app.set('html', function(path,options,callback){
	fs.readFile(path,'utf-8',callback);
});
app.use(express.static(path.join(__dirname,'../client')));
app.set('views', __dirname + '../client');

app.use(function(err, req, res, next){
	res.status(err.status || 500);
});

app.use('/', routes);

app.listen(port, function(){
  console.log('Server is running on Port: ',port);
});

module.exports = app;