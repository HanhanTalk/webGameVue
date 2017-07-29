var _ = require('lodash');

/**
 * 以后处理用户信息的返回
 * @param {*} userInfo 
 */
function userInfo(userInfo) {
  if (!userInfo.nick) {
    userInfo.nick = userInfo.name;
  }
  userInfo.accout = userInfo.name;
  var _userInfo = _.assign({}, userInfo);
  _userInfo.uid = userInfo._id;
  return _userInfo;
}


function roomInfo(roomStatus, usrInfo) {

}

module.exports = {
  userInfo: userInfo
}