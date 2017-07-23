var express = require('express');

var util = require('../util');
var db = require('../data/db');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * 注册用户
 */
router.post('/signup', function(req, res) {
  var name = req.body.name;
  var password = req.body.password;

  if (!name || !password) {
    return util.resJson(res, '账号或密码不能为空');
  }

  if (password.length < 6) {
    return util.resJson(res, '密码不能少于6位');
  }
  
  // 先判断用户名是否已经被注册，如果没有，就新建一个用户
  db.User.findOne({name: name})
    .then(function(response) {
      console.log(response)
      if (response) {
        throw '此账号已经存在，请使用其他用户名';
      }
      var _user = new db.User({
        name: name,
        password: password
      });
      return _user.save();
    })
    .then(function() {
      return util.resJson(res, null, true);
    })
    .catch(function(err) {
      if (typeof err === 'string') {
        util.resJson(res, err);
      } else {
        util.resJson(res, JSON.stringify(err));
      }
    })
});


/**
 * 用户登陆
 */
router.post('/signin', function(req, res) {
  var name = req.body.name;
  var password = req.body.password;

  if (!name || !password) {
    return util.resJson(res, '账号密码不能为空');
  }

  // 查询用户输入的账号密码是否正确
  db.User.findOne({
    name: name,
    password: password
  })
  .then(function(response) {
    if (!response) {
      throw '账号或密码错误'; 
    }
    req.session.userName = name;
    return util.resJson(res, null, {
        uid: response._id,
        accout: name,
        nick: name,
        ulevel: 1,
        gold: 0,
        flower: 0,
        portrait:'./src/assets/userpic/anonym.jpg'
    });
  })
  .catch(function(err) {
    if (typeof err === 'string') {
      util.resJson(res, err);
    } else {
      util.resJson(res, JSON.stringify(err));
    }
  });
});


/**
 * 返回用户基本信息
 */
router.get('/info', function(req, res) {
  if (req.session.userName) {
    return util.resJson(res, null, {
        uid: '00023203',
        accout: req.session.userName,
        nick: req.session.userName,
        ulevel: '18',
        gold: '1000',
        flower: '2',
        portrait:'./src/assets/userpic/user-01.jpg'});
  }
  return util.resJson(res, null, null);
})


/**
 * 退出登陆
 */
router.post('/signout', function(req, res) {
  // 清空session
  req.session.userName = '';
  return util.resJson(res, null, true);
});


module.exports = router;
