var express = require('express');
var User = require('../app/models/user');

var router = express.Router();

router.route('/user/:userid')
.get(function(req,res) {
  console.log('get', req.params);
  User.findOne({
    id: req.params.userid
  }, function(err, user) {
    if (err) {
      res.status(404).json({
        success: false,
        message: 'No such user '+req.params.userid
      });
    } else {
      console.log('got', user);
      res.status(200).json(user);
    }
  });
});
router.route('/user')
.post(function(req,res) {
  var user = new User({
    id  : req.body.id,
    name: req.body.name
  });
  user.save(function(err, saved) {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        success: false, 
        message: err.message
      });
    } else {
      res.status(201).json(saved);
    }
  });
});

module.exports = router;
