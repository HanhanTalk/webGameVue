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
  if (room.player.length >= room.memberCount) {
    room.status = 1; // 进入开始阶段，大家确定身份
    randomRole(room);
  }

  return room.save();
}


function randomRole(room) {
  var member8 = ['1', '2', '3', '0', '0', '0', 'k', 'k'];
  var member10 = ['1', '2', '3', '0', '0', '0', '0', 'k', 'k', 'k'];

  var len = room.player.length;

  // 随机一次默认的身份数组，然后依次赋值给用户的数组，让用户得到自己的身份
  var setIdCard = (_arr) => {
    for (var i = 0; i < len; i++) {
      var rand = parseInt(Math.random() * len);
      var temp = _arr[rand];
      _arr[rand] = _arr[i];
      _arr[i] = temp;
    };
    for (var i = 0; i < len; i++) {
      room.player[i].idCard = _arr[i];
    }
    return room.markModified('player');
  }
  switch (room.memberCount) {
    case 8: {
      //3神+3平+2狼
      setIdCard(member8);
      break;
    }
    case 10: {
      //3神+4平+3狼
      setIdCard(member10);
      break;
    }
    default: {
      //暂时不用12人
    }
  }
}


/**
 * 加入函数
 * @param {*} userInfo 
 * @param {*} maxCount 
 */
function joinOneRoom(userInfo, maxCount) {
  return findCanJoinRoom(userInfo.uid)
    .then((room) => {
      if (!room) {
        return createJoinRoom(userInfo, maxCount);
      } else {
        return joinOneExistRoom(room, userInfo);
      }
    });
}


module.exports = {
  findCanJoinRoom: findCanJoinRoom,
  createJoinRoom: createJoinRoom,
  joinOneExistRoom: joinOneExistRoom,
  joinOneRoom: joinOneRoom
}