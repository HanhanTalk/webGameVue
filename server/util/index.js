function resJson(res, err, data) {
  res.json({
    status: err ? false : true,
    desc: err,
    data: data
  });
}


module.exports = {
  resJson: resJson
}