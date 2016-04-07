var express      = require('express');
var cacheManager = require('cache-manager');
var redisStore   = require('cache-manager-redis');

var User = require('../app/models/user');

var router = express.Router();

var ttl = 5;

var redisCache = cacheManager.caching({
  store: redisStore,
  host: 'localhost',
  port: 6379,
  db: 0,
  ttl: 600
});

redisCache.store.events.on('redisError', function(err) {
  console.log(err.message);
});

function getUser(userid, cb) {
  setTimeout(function() {
    User.findOne({
      id: userid
    }, cb);
  }, 5000);
}


router.route('/user/:userid')
.get(function(req,res) {
  console.log('get', req.params);
  var key = req.params.userid;
  redisCache.wrap(key, function(cb) {
    getUser(key, cb);
  }, ttl, function(err, user) {
    if (err) {
      res.status(404).json({
        success: false,
        message: 'No such user '+req.params.userid
      });
    } else {
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
