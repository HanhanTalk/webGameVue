var express = require('express');

var db = require('../data/db');
var util = require('../util');
var _response = require('../util/response');

var router = express.Router();


/**
 * 这个文件里提供的接口都需要验证
 */
router.use('/', needAuth);


/**
 * 添加好友
 */
router.post('/add', function(req, res) {

});


/**
 * 删除好友
 */
router.post('/remove', function(req, res) {

});


/**
 * 拉去好友详细
 */
router.get('/all', function(req, res) {

});


module.exports = router;