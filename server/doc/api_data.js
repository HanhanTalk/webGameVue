define({ "api": [
  {
    "type": "post",
    "url": "/friend/add",
    "title": "添加好友",
    "name": "addFriend",
    "group": "Friend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "friendId",
            "description": "<p>需要添加的好友的uId</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data",
            "description": "<p>添加好友成功</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"data\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": false,\n  \"desc\": \"what error is happend\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/friend.js",
    "groupTitle": "Friend"
  },
  {
    "type": "get",
    "url": "/friend/all",
    "title": "获得我的好友",
    "name": "allFriends",
    "group": "Friend",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>我的好友数据，数组里每个对象是一个好友</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"data\": [\n     {\n       \"uid\": \"23482342492312\"                      // 用户id\n       \"name\": \"Tony\",                              // 用户名   \n       \"nick\": \"卖火财的小男生\",                     // 昵称 \n       \"ulevel\": 0,                                 // 等级\n       \"gold\": 0,                                   // 金币\n       \"flower\": 0,                                 // 鲜花\n       \"portrait\": \"\",                              // 头像地址\n       \"onlineStatus\": true                         // 在线状态\n     },\n     {\n       \"uid\": \"23482342492314\"                      // 用户id\n       \"name\": \"Tony2\",                             // 用户名   \n       \"nick\": \"美国队长\",                           // 昵称 \n       \"ulevel\": 0,                                 // 等级\n       \"gold\": 0,                                   // 金币\n       \"flower\": 0,                                 // 鲜花\n       \"portrait\": \"\",                              // 头像地址\n       \"onlineStatus\": true                         // 在线状态\n     }   \n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": false,\n  \"desc\": \"what error is happend\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/friend.js",
    "groupTitle": "Friend"
  },
  {
    "type": "post",
    "url": "/friend/remove",
    "title": "删除好友",
    "name": "removeFriend",
    "group": "Friend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "friendId",
            "description": "<p>需要删除的好友的uid</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data",
            "description": "<p>删除好友成功</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"data\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": false,\n  \"desc\": \"what error is happend\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/friend.js",
    "groupTitle": "Friend"
  },
  {
    "type": "get",
    "url": "/users/info",
    "title": "获得用户信息",
    "name": "userInfo",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>登陆信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"data\": {\n    \"uid\": \"23482342492312\"                      // 用户id\n    \"name\": \"Tony\",                              // 用户名   \n    \"nick\": \"卖火财的小男生\",                     // 昵称 \n    \"ulevel\": 0,                                 // 等级\n    \"gold\": 0,                                   // 金币\n    \"flower\": 0,                                 // 鲜花\n    \"portrait\": \"\",                              // 头像地址\n    \"onlineStatus\": true                         // 在线状态\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": false,\n  \"desc\": \"what error is happend\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/signin",
    "title": "用户登陆",
    "name": "userSignin",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data",
            "description": "<p>登陆成功</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"data\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": false,\n  \"desc\": \"what error is happend\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/signout",
    "title": "用户退出登陆",
    "name": "userSignout",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data",
            "description": "<p>退出成功</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"data\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "注册用户",
    "name": "userSignup",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>用户名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data",
            "description": "<p>注册成功.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": true,\n  \"data\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": false,\n  \"desc\": \"what error is happend\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/users.js",
    "groupTitle": "Users"
  }
] });
