参考 
- NodeJs开发指南
- http://ourjs.com/detail/56b2a6f088feaf2d031d2468?utm_source=tuicool&utm_medium=referral
- http://www.tuicool.com/articles/jueARjE

经过ctrl+c ctrl+v 终于完成这个留言板系统 
注释杂乱 

#### Q1：Express无法再命令行运行?
- 使用express的办法有两种：
    + 第一种是：
卸载: npm uninstall -g express
安装指定版本: npm install -g express@3.5.0
    + 第二种是：
npm install -g express-generator(个人推荐使用这种方法)
- 安装完之后输入 express -V 查看一下express版本看看是否可以使用了。

#### Q2：Express搭建的文件部分看不懂
- 待解决

#### Q3：Express模板引擎
- 改成ejs
```
<%- include header %>
中间部分
<%- include footer %>
```

ejs 的标签系统非常简单，它只有以下三种标签：
- <% code %>：JavaScript 代码。
- <%= code %>：显示替换过 HTML 特殊字符的内容。
- <%- code %>：显示原始 HTML 内容。

注意：  <%= code %> 和  <%- code %> 的区别，当变量 code 为普通字符串时，两者没有区别。当 code 比如为  \<h1>hello\</h1> 这种字符串时， <%= code %> 会原样输出  \<h1>hello\</h1> ，而  <%- code %> 则会显示 H1 大的 hello 字符串。

#### Q4：mongodb数据库
MongoDB 是一个基于分布式文件存储的 NoSQL（非关系型数据库）的一种，由 C++ 语言编写，旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。MongoDB 支持的数据结构非常松散，是类似 json 的 bjson 格式，因此可以存储比较复杂的数据类型。MongoDB 最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

#### Q5：等等等等 后面完全粘贴了

