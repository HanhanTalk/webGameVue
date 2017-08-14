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


/**
 * 注册一个用户
 * @param {*} userInfo 对象，包含用户名(name)密码password
 */
function signupUser(userInfo) {
  return new Promise((resolve, reject) => {
    var name = userInfo.name;
    var password = userInfo.password;

    if (!name || !password) {
      return reject('账号或密码不能为空');
    }

    if (password.length < 6) {
      return reject('密码不能少于6位');
    }
    // 先判断用户名是否已经被注册，如果没有，就新建一个用户
    db.User.findOne({name: name})
      .then(function(response) {
        if (response) {
          return reject('此账号已经存在，请使用其他用户名');
        }
        var _user = new db.User({
          name: name,
          password: password,
          nick: name + '^_^',
          portrait: util.getDefaultPortrait()
        });
        resolve(_user.save());
      })
  });
}


/**
 * 登陆用户
 * @param {*} userInfo 
 */
function signinUser(userInfo) {
  return new Promise((resolve, reject) => {
    var name = userInfo.name;
    var password = userInfo.password;

    if (!name || !password) {
      return reject('账号密码不能为空');
    }

    // 查询用户输入的账号密码是否正确
    db.User.findOne({
      name: name,
      password: password
    })
    .then(function(response) {
      if (!response) {
        return reject('账号或密码错误'); 
      }
      return resolve(response);
    });
  });
}

module.exports = {
  getUserInfoByUids: getUserInfoByUids,
  getUserInfoByUid: getUserInfoByUid,
  getUserInfoByOtherUid: getUserInfoByOtherUid,
  signupUser: signupUser,
  signinUser: signinUser
}