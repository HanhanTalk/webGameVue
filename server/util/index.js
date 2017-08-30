function resJson(res, err, data) {
  res.json({
    status: err ? false : true,
    desc: err,
    data: data
  });
}


function needAuth(req, res, next) {
  if (req.session.userName) {
    next();
  } else {
    resJson(res, '请登陆后再执行此操作');
  }
}

function resErrorHandle(res) {
  return (err) => {
    if (typeof err === 'string') {
      resJson(res, err);
    } else {
      resJson(res, err.toString());
    }
  }
}


/**
 * 返回用户默认头像，使用github上的静态文件
 */
function getDefaultPortrait() {
  var nameArray = [
    'anonym.jpg',
    'user-01.jpg',
    'user-02.jpg',
    'user-03.jpg',
    'user-04.jpg',
    'user-05.jpg',
    'user-06.jpg',
    'user-07.jpg',
    'user-08.jpg',
    'user-09.jpg',
    'user-10.jpg',
    'user-11.jpg'
  ];
  var index = Math.floor(Math.random() * nameArray.length);
  return 'https://raw.githubusercontent.com/HanhanTalk/webGameVue/master/src/assets/userpic/' + nameArray[index];
  //https://raw.githubusercontent.com/HanhanTalk/webGameVue/master/src/assets/10.png
}


module.exports = {
  resJson: resJson,
  needAuth: needAuth,
  getDefaultPortrait: getDefaultPortrait,
  resErrorHandle: resErrorHandle
}