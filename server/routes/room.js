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
 * @api {post} /drawguess/join 加入一个房间返回房间信息
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
  return room.save();
  // });
}

module.exports = router;
