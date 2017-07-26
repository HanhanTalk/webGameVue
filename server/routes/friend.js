var express = require('express');

var db = require('../data/db');
var util = require('../util');
var _response = require('../util/response');

var router = express.Router();


/**
 * 这个文件里提供的接口都需要验证
 */
router.use('/', util.needAuth);


/**
 * @api {post} /friend/add 添加好友
 * @apiName addFriend
 * @apiGroup Friend
 *
 * @apiParam {String} friendId 需要添加的好友的uId
 *
 * @apiSuccess {Boolean} data 添加好友成功
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true,
 *       "data": true
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": false,
 *       "desc": "what error is happend"
 *     }
 */
router.post('/add', function(req, res) {
  var userId = req.body.friendId;
  if (!userId) {
    return util.resJson(res, '添加的好友不存在');
  }

  var friendDoc = {};
  var myDoc = {};
  db.User.findOne({
    _id: userId
  }).then(function(response) {
    if (!response) {
      throw '添加的好友不存在';
    }
    friendDoc = response;
    return db.User.findOne({
      _id: req.session.userId
    });
  }).then(function(response) {
    myDoc = response;
    var myId = response._id;
    return db.Friend.findOne({
      myId: myId,
      friendId: friendDoc._id
    });
  }).then(function(response) {
    if (response) {
      throw '您已经添加过该好友';
    }
    var _doc = new db.Friend({
      myId: myDoc._id,
      friendId: friendDoc._id
    });
    return _doc.save();
  }).then(function() {
    return util.resJson(res, null,  true);  
  }).catch(function(err) {
    if (typeof err === 'string') {
      util.resJson(res, err);
    } else {
      util.resJson(res, err.toString());
    }
  });
});


/**
 * @api {post} /friend/remove 删除好友
 * @apiName removeFriend
 * @apiGroup Friend
 *
 * @apiParam {String} friendId 需要删除的好友的uid
 *
 * @apiSuccess {Boolean} data 删除好友成功
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true,
 *       "data": true
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": false,
 *       "desc": "what error is happend"
 *     }
 */
router.post('/remove', function(req, res) {
  var usreId = req.body.friendId;
  if (!userId) {
    return util.resJson(res, '删除的好友id不存在');
  }
  db.Friend.remove({
    myId: req.session.userId,
    friendId: userId
  }).then(function(response) {
    util.resJson(res, null, true)
  }).catch(function(err) {
    if (typeof err === 'string') {
      util.resJson(res, err);
    } else {
      util.resJson(res, err.toString());
    }
  })
});


/**
 * @api {get} /friend/all 获得我的好友
 * @apiName allFriends
 * @apiGroup Friend
 *
 * @apiSuccess {Array} data 我的好友数据，数组里每个对象是一个好友
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true,
 *       "data": [
 *          {
 *            "uid": "23482342492312"                      // 用户id
 *            "name": "Tony",                              // 用户名   
 *            "nick": "卖火财的小男生",                     // 昵称 
 *            "ulevel": 0,                                 // 等级
 *            "gold": 0,                                   // 金币
 *            "flower": 0,                                 // 鲜花
 *            "portrait": "",                              // 头像地址
 *            "onlineStatus": true                         // 在线状态
 *          },
 *          {
 *            "uid": "23482342492314"                      // 用户id
 *            "name": "Tony2",                             // 用户名   
 *            "nick": "美国队长",                           // 昵称 
 *            "ulevel": 0,                                 // 等级
 *            "gold": 0,                                   // 金币
 *            "flower": 0,                                 // 鲜花
 *            "portrait": "",                              // 头像地址
 *            "onlineStatus": true                         // 在线状态
 *          }   
 *        ]
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": false,
 *       "desc": "what error is happend"
 *     }
 */
router.get('/all', function(req, res) {
  // 首先要获得好友的userid(_id),然后根据userid获得这些用户的userInfo
  db.Friend.find({
    myId: req.session.userId
  }).then(function(docs) {
    var _ids = [];
    docs.forEach(function(item) {
      _ids.push(String(item.friendId));
    });
    console.log(_ids);
    return db.User.find({
      _id: {$in: _ids}
    }, { 
      password: 0
    });
  }).then(function(docs) {
    var resArray = [];
    docs.forEach(function(item) {
      resArray.push(_response.userInfo(item));
    });
    util.resJson(res, null, resArray);
  }).catch(function(err) {
    if (typeof err === 'string') {
      util.resJson(res, err);
    } else {
      util.resJson(res, err.toString());
    }
  })
});


module.exports = router;