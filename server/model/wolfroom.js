var mongoose = require('mongoose');

var db = require('../data/db');
var util = require('../util');


/**
 * 找到能加入的房间
 * @param {*} userId 
 */
function findCanJoinRoom(userId) {
  return new Promise((resolve, reject) => {
    db.WolfRoom.findOne({
      status: 0,
    }).then((doc) => {
      resolve(doc ? doc : null);
    }).catch((err) => {
      reject(err);
    })
  })
}


/**
 * 创建一个房间
 * @param {*} userId 
 * @param {*} nick 
 */
function createJoinRoom(userInfo, maxCount) {
  return new Promise((resolve, reject) => {
    var _room = new db.WolfRoom({
      roomId: new mongoose.Types.ObjectId,
      status: 0,
      player: [{
        uid: userInfo.uid,
        seat: 1,            // 座位号
        nick: userInfo.nick,
        portrait: userInfo.portrait,
        idCard: '',   // 身份牌 1,2,3,4等是神 0是平民 k是狼人
        alive: true,  // 是否还活着
        verify: false   // 是否被验身
      }],
      memberCount: maxCount,
      gameCountDown: 0,
      waitOutOfTime: (new Date()).getTime() + (60 * 10 * 1000)
    });
    _room.save().then((doc)=> {
      resolve(doc);
    }).catch((err) => {
      reject(err);
    })
  })
}


/**
 * 加入某个已经存在的房间
 * @param {*} roomId 
 * @param {*} userId 
 */
function joinOneExistRoom(room, userInfo) {
  room.player.push({
    uid: userInfo.uid,
    seat: room.player.length + 1,            // 座位号
    nick: userInfo.nick,
    portrait: userInfo.portrait,
    idCard: '',   // 身份牌 1,2,3,4等是神 0是平民 k是狼人
    alive: true,  // 是否还活着
    verify: false   // 是否被验身
  });
  
  // 这里有一个开始逻辑，如果玩家数大于等于2，就更改status
  if (room.player.length > 8) {
    room.status = 1; // 进入选题状态，房主开始选题
  }

  return room.save();
}


module.exports = {
  findCanJoinRoom: findCanJoinRoom,
  createJoinRoom: createJoinRoom,

}