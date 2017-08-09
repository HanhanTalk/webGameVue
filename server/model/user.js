var db = require('../data/db');
var util = require('../util');

/**
 * 通过uid批量获得用户信息
 * @param {*} uidArray 
 */
function getUserInfoByUids(uidArray) {
  return db.User.find({
      _id: {$in: uidArray}
    }, { 
      password: 0
    });
}


/**
 * 获得用户信息
 * @param {*} uid 
 */
function getUserInfoByUid(uid) {
  return db.User.findOne({
    _id: uid
  });
}


/**
 * 获得其他用户 不包含密码
 * @param {*} uid 
 */
function getUserInfoByOtherUid(uid) {
  return db.User.findOne({
    _id: uid
  }, {
    password: 0
  });
}


module.exports = {
  getUserInfoByUids: getUserInfoByUids,
  getUserInfoByUid: getUserInfoByUid,
  getUserInfoByOtherUid: getUserInfoByOtherUid
}