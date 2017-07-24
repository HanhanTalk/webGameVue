function resJson(res, err, data) {
  res.json({
    status: err ? false : true,
    desc: err,
    data: data
  });
}


function needAuth(req, res, next) {
  if (req.session.name) {
    next();
  }
  resJson(res, '请登陆后再执行此操作');
}


module.exports = {
  resJson: resJson
}