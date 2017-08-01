var mongoose = require('mongoose');
var Schema = mongoose.Schema;
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


var Friend = mongoose.model('friend', {
  myId: String,
  friendId: String
});


var Room = mongoose.model('Room', {
  // _id为房间号
  roomId: Schema.Types.ObjectId,                        // 房间号
  type: String,                                         // 房间类型 'drawGuess'  'wolfKill'
  status: Number,                                       // 0 为等待  1 选题状态 2 正在游戏  3 游戏结束
  player: Array,                                        // 所有本房间的玩家
  drawPlayerUid: String,                                // 画画玩家的uid
  drawWord: {type: Schema.Types.Mixed, default: null},  // 玩家选的词对象，包含词，词提示，和长度
  drawData: {type: Schema.Types.Mixed, default: {}},  // 画的数据
  winPlayerUid: String,                                 // 猜对玩家的uid
});


module.exports = {
  User: User,
  Friend: Friend,
  Room: Room
}