var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/webgame', 
  {
    promiseLibrary: global.Promise,
    useMongoClient: true
  }
);


var User = mongoose.model('user', { 
  name: String,
  password: String,
  nick: String,
  ulevel: {type: Number, default: 1},
  gold: {type: Number, default: 0},
  flower: {type: Number, default: 0},
  portrait: {type: String, default: ''}
});


module.exports = {
  User: User
}