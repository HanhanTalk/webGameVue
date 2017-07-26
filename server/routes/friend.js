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
 * 添加好友
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
 * 删除好友
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
 * 拉去好友详细
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