var assert = require('assert');

var db = require('../data/db');
var userModel = require('../model/user');

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

// 需要一个函数清空数据库
function cleanUser() {
  return db.User.remove({});
}

function cleanRoom() {
  return db.Room.remove({});
}

function cleanWolfRoom() {
  return db.WolfRoom.remove({});
}

function cleanAllDatabase() {
  return cleanUser()
    .then(() => {
      return cleanRoom();
    })
    .then(() => {
      return cleanWolfRoom();
    });
}

// 需要一个函数批量注册许多用户
function regAllUser() {
  var promises = users.map((userInfo) => {
    return userModel.signupUser(userInfo);
  });
  return Promise.all(promises)
}


// 需要函数模拟8个登陆用户，加入到一个wolfman的房间

describe('小游戏后端测试', function() {
  before(function() {
    return cleanAllDatabase()
      //.then(done);
  });
  describe('注册登陆流程', function() {
    it('注册10个用户', function() {
      return regAllUser()
        .then((users) => {
          assert.equal('test10', users[users.length - 1].name);
          //done();
      });
    });
  });
});