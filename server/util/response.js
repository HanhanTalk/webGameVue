var _ = require('lodash');

/**
 * 以后处理用户信息的返回
 * @param {*} userInfo 
 */
function userInfo(userInfo) {
  var _userInfo = {};
  _userInfo.name = userInfo.name;
  _userInfo.nick = '';
  if (!_userInfo.nick) {
    _userInfo.nick = userInfo.name;
  }
  _userInfo.uid = userInfo._id;
  _userInfo.portrait = userInfo.portrait;
  _userInfo.ulevel = userInfo.ulevel;
  _userInfo.gold = userInfo.gold;
  _userInfo.flower = userInfo.flower;
  _userInfo.onlineStatus = userInfo.onlineStatus;
  return _userInfo;
}


function roomInfo(roomStatus, usrInfo) {

}

module.exports = {
  userInfo: userInfo
}