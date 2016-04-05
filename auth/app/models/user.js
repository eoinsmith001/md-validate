var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  id : {
    type: Number,
    required: true,
    index: {
      unique: true
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
