var assert = require('assert');
var Promise = require("bluebird");

var db = require('../data/db');
var userFunc = require('../model/user');
var wolfFunc = require('../model/wolfroom');

var users = [
  {
    name: 'test1',
    password: 'testtest'
  },
  {
    name: 'test2',
    password: 'testtest'
  },
  {
    name: 'test3',
    password: 'testtest'
  },
  {
    name: 'test4',
    password: 'testtest'
  },
  {
    name: 'test5',
    password: 'testtest'
  },
  {
    name: 'test6',
    password: 'testtest'
  },
  {
    name: 'test7',
    password: 'testtest'
  },
  {
    name: 'test8',
    password: 'testtest'
  },
  {
    name: 'test9',
    password: 'testtest'
  },
  {
    name: 'test10',
    password: 'testtest'
  },
]

var roomId = null;

describe('测试狼人杀', function() {
  // 清空所有的配置
  before(function() {
    // return db.WolfRoom.remove({});
  });
  // it('1个人先创建房间', function(done) {
  //   userFunc.signinUser(users[0])
  //     .then((userInfo) => {
  //       return wolfFunc.joinOneRoom(userInfo, 8);
  //     })
  //     .then((roomInfo) => {
  //       roomId = roomInfo.roomId;
  //       assert.equal(0, roomInfo.status);
  //       done();
  //     });
  // });

  it('7个人加入到房间，开始游戏', function(done) {
    var sevenUsers = users.slice(1, 8);
    var promises = sevenUsers.map((user) => {
      return userFunc.signinUser(user)
    });
    Promise.mapSeries(promises, function(item) {
        //console.log(item);
        //return item.then((userInfo) => {
          return wolfFunc.joinOneRoom(item, 8);
        //});;
      })
      .then((results) => {
        assert.equal(results[6].status, 1);
        done();
      })
      .catch((err) => {
        done(err);
      })
  });
});