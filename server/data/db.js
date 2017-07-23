var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/webgame', {
  promiseLibrary: global.Promise,
  useMongoClient: true});


var User = mongoose.model('user', { 
  name: String,
  password: String,
  nick: String
});


module.exports = {
  User: User
}