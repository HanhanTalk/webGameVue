var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var corsWhiteList = [/github/, /http:\/\/localhost/, /192\.168\./];
app.use(cors({
  origin: corsWhiteList,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTION'],
  credentials: true // 这里设置运行跨域带cookie，编写前端代码时就可以本地调试
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'womendoushileihuodong',
  resave: false,
  store: new MongoStore({url: 'mongodb://localhost/webgame'}),
  saveUninitialized: false,
  cookie: {path: '/', httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24}
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/friend', require('./routes/friend'));
app.use('/room', require('./routes/room'));
app.use('/wolfroom', require('./routes/wolfroom'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
