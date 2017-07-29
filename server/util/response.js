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
  return userInfo;
}


function roomInfo(roomStatus, usrInfo) {
  
}

module.exports = {
  userInfo: userInfo
}