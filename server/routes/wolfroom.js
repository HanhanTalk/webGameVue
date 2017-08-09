var express = require('express');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema.Types.ObjectId,
//  new mongoose.Types.ObjectId;

var db = require('../data/db');
var util = require('../util');
var _response = require('../util/response');
var wolfFunc = require('../model/wolfroom');
var userFunc = require('../model/user');

var router = express.Router();

router.use('/', util.needAuth);

/* 8人局 */
router.post('/join/8', function(req, res) {
  // 先找到能不能加入的房间，如果能加入
  var maxCount = 8;
  var gUserInfo = {};
  userFunc.getUserInfoByUid(req.session.userId)
    .then((userInfo) => {
      gUserInfo = userInfo
       return wolfFunc.findCanJoinRoom(userInfo.uid);
    })
    .then((room) => {
      if (!room) {
        return wolfFunc.createJoinRoom(gUserInfo, maxCount);
      } else {
        return wolfFunc.joinOneExistRoom(room, gUserInfo);
      }
    })
    .then((room) => {
      return util.resJson(res, null, room);
    })
    .catch((err) => {
      console.log(err);
      if (typeof err === 'string') {
        util.resJson(res, err);
      } else {
        util.resJson(res, err.toString());
      }
    })
});


/**
 * 10人局
 */
router.get('/join/10', function(req, res) {

});

module.exports = router;
