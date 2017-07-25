var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/webgame', 
  {
    promiseLibrary: global.Promise,
    useMongoClient: true
  }
);


var User = mongoose.model('user', { 
  name: String,                              // 用户名   
  password: String,                          // 密码
  nick: String,                              // 昵称 
  ulevel: {type: Number, default: 1},        // 等级
  gold: {type: Number, default: 0},          // 金币
  flower: {type: Number, default: 0},        // 鲜花
  portrait: {type: String, default: ''},     // 头像
  onlineStatus: {type: Boolean}              // 在线状态
});


var Firend = mongoose.model('firend', {
  myId: String,
  friendId: String
});


module.exports = {
  User: User,
  Firend: Firend
}