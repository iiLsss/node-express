var express = require('express');

var app = express(); //生成一个express实例 app
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var settings = require('./settings');
var flash = require("connect-flash");
var users = require('./routes/users');

var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

app.set('views', path.join(__dirname, 'views')); //设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('view engine', 'ejs'); //设置视图模板引擎为 ejs


/*使用 express-session 和 connect-mongo 模块实现了将会化信息存储到mongoldb中。secret 用来防止篡改 cookie，key 的值为 cookie 的名字，通过设置 cookie 的 maxAge 值设定 cookie 的生存期，这里我们设置 cookie 的生存期为 30 天，设置它的 store 参数为 MongoStore 实例，把会话信息存储到数据库中，以避免丢失。在后面的小节中，我们可以通过 req.session 获取当前用户的会话对象，获取用户的相关信息。*/




app.use(flash());
// uncomment after placing your favicon in /public 在将你的图标放在/公开后取消评论
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //设置 / public / favicon.ico为favicon图标
app.use(logger('dev')); //加载日志中间件。
app.use(bodyParser.json()); //加载解析json的中间件。
app.use(bodyParser.urlencoded({ extended: false })); //加载解析urlencoded请求体的中间件。
app.use(cookieParser()); //加载解析cookie的中间件。
app.use(express.static(path.join(__dirname, 'public'))); //设置public文件夹为存放静态文件的目录。
// console.log(settings)
app.use(session({
    secret: settings.cookieSecret,
    key: settings.db, //cookie name
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }, //30 days
    store: new MongoStore({
        /*db: settings.db,
        host: settings.host,
        port: settings.port*/
        url: 'mongodb://localhost/blog'
    })
}))


// view engine setup 视图引擎设置

/**
 * 加载路由模块 
 */
app.use('/', index); // 路由控制器。 
app.use('/u', users); //用户的主页
// app.use('/post', post); // 发表信息
// app.use('/reg', reg); // 用户注册
// app.use('/login', login); // 用户登录
// app.use('/logout', logout); //用户登出




// catch 404 and forward to error handler  捕获404 并转发错误处理程序
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler 错误处理
app.use(function(err, req, res, next) {
    // set locals, only providing error in development  设置局部，只提供开发中的错误
    //开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中。
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page 呈现错误页面 
    //生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中。
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app; //导出app实例供其他模块调用。