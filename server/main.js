//引入模块依赖
const app = require('express')();
const http = require('http').Server(app);

app.get('/', function (req, res) {
  res.send('<h1>Welcome Realtime Server</h1>');
});




//监听
http.listen(3000,function(){
    console.log('listening on *:3000');
});