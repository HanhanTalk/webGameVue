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

/* 8人局或10人局 */
router.post('/join/:count', function(req, res) {
  var count = req.params.count;
  if (count != 8) {
    count = 10;
  }
  // 先找到能不能加入的房间，如果能加入
  var maxCount = count;
  userFunc.getUserInfoByUid(req.session.userId)
    .then((userInfo) => {
      return wolfFunc.joinOneRoom(userInfo, maxCount);
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


module.exports = router;
