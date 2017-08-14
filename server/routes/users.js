var express = require('express');

var util = require('../util');
var responseFormat = require('../util/response');
var db = require('../data/db');
var userModel = require('../model/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/**
 * @api {post} /users/signup 注册用户
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

  var userInfo = {
    name: name,
    password: password
  }
  userModel.signupUser(userInfo)
    .then(() => {
      return util.resJson(res, null, true);
    })
    .catch(util.resErrorHandle(res));
});


/**
 * @api {post} /users/signin 用户登陆
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

  userModel.signinUser({
    name: name,
    password: password
  })
  .then((response) => {
    req.session.userName = name;
    req.session.userId = response._id;
    req.session.nick = response.nick;
    return util.resJson(res, null, responseFormat.userInfo(response));
  })
  .catch(util.resErrorHandle(res));
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
 *         "uid": "23482342492312"                      // 用户id
 *         "name": "Tony",                              // 用户名   
 *         "nick": "卖火财的小男生",                     // 昵称 
 *         "ulevel": 0,                                 // 等级
 *         "gold": 0,                                   // 金币
 *         "flower": 0,                                 // 鲜花
 *         "portrait": "",                              // 头像地址
 *         "onlineStatus": true                         // 在线状态
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
      util.resJson(res, null, responseFormat.userInfo(response));
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
 * @api {post} /users/signout 用户退出登陆
 * @apiName userSignout
 * @apiGroup Users
 *
 * @apiSuccess {Boolean} data 退出成功
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": true,
 *       "data": true
 *     }
 */
router.post('/signout', function(req, res) {
  // 清空session
  req.session.userName = '';
  return util.resJson(res, null, true);
});


module.exports = router;
