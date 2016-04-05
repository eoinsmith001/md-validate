var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
app.use(bodyParser.json());
var router = require('./routes');
app.use('/api', router);
var mongoose = require('mongoose');
var dbString = 'mongodb://localhost:27017/md-validate';
mongoose.connect(dbString);
app.listen(port, function() {
  console.log('http on ', port);
});
