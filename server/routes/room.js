var express = require('express');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema.Types.ObjectId,
//  new mongoose.Types.ObjectId;

var db = require('../data/db');
var util = require('../util');
var _response = require('../util/response');

var router = express.Router();

router.use('/', util.needAuth);

/**
 * @api {post} /room/drawguess/join 加入一个房间返回房间信息
 * @apiName drawguessJoin
 * @apiGroup Room
 *
 *
 * @apiSuccess {Object} data 一个房间的信息
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true,
 *       "data": {
 *         "_id": "597a01e615296134a4385d2f",       
 *         "roomId": "597a01e615296134a4385d2e",          // 房间号
 *         "type": "drawGuess",                           // 房间类型 'drawGuess'  'wolfKill'
 *         "status": 1,
 *         "drawPlayerUid": "5974495ec17c35226882d3db",   // 画画玩家的uid
 *         "__v": 1,
 *         "drawData": null,                              // 玩家选的词对象，包含词，词提示，和长度
 *         "drawWord": null,                              // 画的数据
 *         "player": [
 *           "5974495ec17c35226882d3db",
 *           "dfio33452342342342342343"
 *          ]
 *        }
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": false,
 *       "desc": "what error is happend"
 *     }
 */
router.post('/drawguess/join', function(req, res, next) {
  // 如果用户重新条用接口，会把用户以前所有创建的房间都重置为结束
  // 先判断有没有可以直接进入的房间，如果有的话 我们就进去
  // 如果没有的话，就创建一个房间来加入
  var gRoom = {};
  findCanJoinRoom('drawGuess', req.session.userId)
    .then((joinRoom) => {
      if (!joinRoom) {
        // 没有房间，就创建一个房间
        return createJoinRoom('drawGuess', req.session.userId);
      } else {
        // 存在房间,直接返回房间id
        return joinOneExistRoom(joinRoom, req.session.userId);
      }
    })
    .then((room) => {
      // 把房间表里的player字段换成用户信息
      return getUserInfoByUids(room.player);
    })
    .then((userInfos) => {
      room.player = userInfos;
      util.resJson(res, null, room);
    })
    .catch((err) => {
      console.dir(err);
      if (typeof err === 'string') {
        util.resJson(res, err);
      } else {
        util.resJson(res, err.toString());
      }
    });
});


/**
 * 前端会轮询这个接口，然后根据返回的信息，显示前端状态
 */
router.get('/drawguess/room/info',  function(req, res, next) {
  var roomId = req.query.roomId;
  var _gRoomInfo = {};
  findRoomInfoByRoomId('drawGuess', roomId)
    .then((roomInfo) => {
      _gRoomInfo = roomInfo;
      return getUserInfoByUids(roomInfo.player);
    })
    .then((userInfos) => {
      _gRoomInfo.player = userInfos;
      return _gRoomInfo;
    })
    .catch((err) => {
      console.dir(err);
      if (typeof err === 'string') {
        util.resJson(res, err);
      } else {
        util.resJson(res, err.toString());
      }
    })
});


/**
 * 当前端获得房间状态为1时，就进入选题状态
 * 房主获得4个词语，其他玩家还是处于等待状态
 */
router.get('/drawguess/words', function(req, res) {
  // TODO 这里要验证当前用户是不是房主
  var roomId = req.query.roomId;
  var userId = req.session.userId;

  // TODO 先写死4个词，过后再做成从数据库取的
  var words = [
    {
      name: '长颈鹿',
      length: 3,
      type: '动物'
    },
    {
      name: '东京铁塔',
      length: 4,
      type: '景点'
    },
    {
      name: '达康书记',
      length: 4,
      type: '电视人物'
    },
    {
      name: '瑜伽',
      length: 2,
      type: '健身运动'
    }
  ];
  util.resJson(res, null, words);
});


/**
 * 用户选好词
 */
router.post('/drawguess/chooise/words', function(req, res) {
  var wordObject = req.body.word;
  var roomId = req.body.roomId;

  // TODO 验证参数

  // 更新当前房间的状态和词语
  db.Room.update({
    roomId: roomId
  }, {
    $set: {
      drawWord: word,
      status: 2
    }
  }).then((response) => {
    util.resJson(res, null, response);
  }).catch((err) => {
    if (typeof err === 'string') {
      util.resJson(res, err);
    } else {
      util.resJson(res, err.toString());
    }
  });
});


/**
 * 提交用户画画的数据
 */
router.post('/drawguess/drawdata', function(req, res) {
  var drawData = req.body.drawData;
  var roomId = req.body.roomId;
  db.Room.update({
    roomId: roomId
  }, {
    $set: {
      drawData: drawData
    }
  }).then((doc) => {
    util.resJson(res, null, doc);
  }).catch((err) => {
    if (typeof err === 'string') {
      util.resJson(res, err);
    } else {
      util.resJson(res, err.toString());
    }
  });
});


/**
 * 通过uid批量获得用户信息
 * @param {*} uidArray 
 */
function getUserInfoByUids(uidArray) {
  return db.User.find({
      _id: {$in: _ids}
    }, { 
      password: 0
    });
}


/**
 * 通过房间号获得房间信息
 * @param {*} type 
 * @param {*} roomId 
 */
function findRoomInfoByRoomId(type, roomId) {
  return db.Room.findOne({
    roomId: roomId,
  });
}


/**
 * 
 * @param {*} type 
 * @param {*} userId 
 */
function findCanJoinRoom(type, userId) {
  return new Promise((resolve, reject) => {
    db.Room.findOne({
      type: type,
      status: 1
    }).then((doc) => {
      resolve(doc ? doc : null);
    }).catch((err) => {
      reject(err);
    })
  })
}


/**
 * 
 * @param {*} type 
 * @param {*} userId 
 */
function createJoinRoom(type, userId) {
  return new Promise((resolve, reject) => {
    var _room = new db.Room({
      roomId: new mongoose.Types.ObjectId,
      type: type,
      status: 1,
      player: [userId],
      drawPlayerUid: userId
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
function joinOneExistRoom(room, userId) {
  // return new Promise((resolve, reject) => {
  room.player.push(userId);
  
  // 这里有一个开始逻辑，如果玩家数大于等于3，就更改status
  if (room.player.length > 2) {
    room.status = 1; // 进入选题状态，房主开始选题
  }

  return room.save();
  // });
}

module.exports = router;
