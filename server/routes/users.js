var express = require('express');

var util = require('../util');
var _response = require('../util/response');
var db = require('../data/db');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * @api {get} /users/signup 注册用户
 * @apiName userSignup
 * @apiGroup Users
 *
 * @apiParam {String} name 用户名.
 * @apiParam {String} password 密码
 *
 * @apiSuccess {Boolean} data 注册成功.
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
        util.resJson(res, err.toString());
      }
    })
});


/**
 * @api {get} /users/signin 用户登陆
 * @apiName userSignin
 * @apiGroup Users
 *
 * @apiParam {String} name 用户名
 * @apiParam {String} password 密码
 *
 * @apiSuccess {Boolean} data 登陆成功
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
    req.session.userId = response._id;
    return util.resJson(res, null, _response.userInfo(response));
  })
  .catch(function(err) {
    if (typeof err === 'string') {
      util.resJson(res, err);
    } else {
      util.resJson(res, err.toString());
    }
  });
});


/**
 * @api {get} /users/info   获得用户信息
 * @apiName userInfo
 * @apiGroup Users
 *
 *
 * @apiSuccess {Object} data 登陆信息
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true,
 *       "data": {
 *         uid: '23482342492312'                      // 用户id
 *         name: 'Tony',                              // 用户名   
 *         nick: '卖火财的小男生',                     // 昵称 
 *         ulevel: 0,                                 // 等级
 *         gold: 0,                                   // 金币
 *         flower: 0,                                 // 鲜花
 *         portrait: '',                              // 头像地址
 *         onlineStatus: true                         // 在线状态
 *       }
 *     }
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": false,
 *       "desc": "what error is happend"
 *     }
 */
router.get('/info', function(req, res) {
  if (req.session.userName) {
    db.User.findOne({
      name: req.session.userName
    }).then(function(response) {
      util.resJson(res, null, _response.userInfo(response));
    }).catch(function(err) {
      console.dir(err);
      if (typeof err === 'string') {
        util.resJson(res, err);
      } else {
        util.resJson(res, err.toString());
      }
    });
  } else {
    util.resJson(res, null, '');
  }
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
