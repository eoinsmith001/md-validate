var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3001;
app.use(bodyParser.json());
var router = require('./routes');
app.use('/api', router);
app.listen(port, function() {
  console.log('http on ', port);
});
