var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var User = require("../models/user.js")
var Post = require('../models/post.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    Post.get(null, function(err, posts) {
        if (err) {
            posts = [];
        }
        res.render('index', {
            title: '主页',
            user: req.session.user,
            posts: posts,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });
});
router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res, next) {
    res.render('reg', {
        title: '注册',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
router.post('/reg', checkNotLogin);
router.post('/reg', function(req, res) {
    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    // console.log(req)
    // console.log(name)
    // console.log(password)
    //检验用户两次输入的密码是否一致
    if (password_re != password) {
        req.flash('error', '两次输入的密码不一致!');
        return res.redirect('/reg'); //返回注册页
    }
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: name,
        password: password
    });
    //检查用户名是否已经存在 
    User.get(newUser.name, function(err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        if (user) {
            req.flash('error', '用户已存在!');
            return res.redirect('/reg'); //返回注册页
        }
        //如果不存在则新增用户
        newUser.save(function(err, user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg'); //注册失败返回主册页
            }
            req.session.user = newUser; //用户信息存入 session
            req.flash('success', '注册成功!');
            res.redirect('/'); //注册成功后返回主页
        });
    });
});
router.get('/login', checkNotLogin);
router.get('/login', function(req, res, next) {
    res.render('login', {
        title: '登录',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
router.post('/login', checkNotLogin);
router.post('/login', function(req, res) {
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检查用户是否存在
    User.get(req.body.name, function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在!');
            return res.redirect('/login'); //用户不存在则跳转到登录页
        }
        //检查密码是否一致
        if (user.password != password) {
            req.flash('error', '密码错误!');
            return res.redirect('/login'); //密码错误则跳转到登录页
        }
        //用户名密码都匹配后，将用户信息存入 session
        req.session.user = user;
        req.flash('success', '登陆成功!');
        res.redirect('/'); //登陆成功后跳转到主页
    });
});

router.get('/post', checkLogin);
router.get('/post', function(req, res) {
    res.render('post', {
        title: '发表',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

router.post('/post', checkLogin);
router.post('/post', function(req, res) {
    var currentUser = req.session.user,
        post = new Post(currentUser.name, req.body.title, req.body.post);
    post.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发布成功!');
        res.redirect('/'); //发表成功跳转到主页
    });
});

router.post('/', checkLogin);
router.post('/', function(req, res) {
    var currentUser = req.session.user,
        post = new Post(currentUser.name, req.body.title, req.body.post);
    post.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发布成功!');
        res.redirect('/'); //发表成功跳转到主页
    });
});

router.get('/logout', checkLogin);
router.get('/logout', function(req, res) {
    req.session.user = null;
    req.flash('success', '登出成功!');
    res.redirect('/'); //登出成功后跳转到主页
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录!');
        res.redirect('/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登录!');
        res.redirect('back');
    }
    next();
};
module.exports = router;









/*
生成一个路由实例用来捕获访问主页的GET请求，导出这个路由并在app.js中通过app.use('/', routes); 加载。
这样，当访问主页时，就会调用res.render('index', { title: 'Express' });
渲染views/index.ejs模版并显示到浏览器中。
*/

/*

  我们通过 app.use(express.static(path.join(__dirname, 'public'))) 
  设置了静态文件目录为 public 文件夹，所以上面代码中的 href='/stylesheets/style.css' 
  就相当于href='public/stylesheets/style.css' 。

ejs 的标签系统非常简单，它只有以下三种标签：

<% code %>：JavaScript 代码。
<%= code %>：显示替换过 HTML 特殊字符的内容。
<%- code %>：显示原始 HTML 内容。
注意： <%= code %> 和 <%- code %> 的区别，当变量 code 为普通字符串时，两者没有区别。
当 code 比如为 <h1>hello</h1> 这种字符串时，<%= code %> 会原样输出 <h1>hello</h1>，
而 <%- code %> 则会显示 H1 大的 hello 字符串。

*/