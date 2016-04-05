var express = require('express');
var request = require('request');

var router = express.Router();

var validate = function(req, res, next) {
  var auth = 'http://localhost:3000/api/user';
  var url = auth+'/'+req.params.userid;
  request(url, function(err, response, body) {
    var result = JSON.parse(body);
    console.log('user query result',result);
    if (err) {
      res.status(500).json({
        success: false, 
        message: err.message
      });
    } else {
      if (result) {
        console.log('keep going, we got result', result);
        req.name = result.name;
        next();
      } else {
        res.status(400).json({
          success: false,
          message: 'No user '+req.params.userid
        });
      }
    }
  });
};

router.use('/hello/:userid', validate);

router.route('/hello/:userid')
.get(function(req,res) {
  res.status(200).json({
    message: req.name+' says hello!'
  });
});
module.exports = router;
