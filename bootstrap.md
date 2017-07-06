## Bootstrap
### 1、目录结构
```
├─ /projec-tname/ ··················· 项目所在目录
└─┬─ /css/ ······················· 我们自己的CSS文件
  ├─ /font/ ······················ 使用到的字体文件
  ├─ /img/ ······················· 使用到的图片文件
  ├─ /js/ ························ 自己写的JS脚步
  ├─ /lib/ ······················· 从第三方下载回来的库【只用不改】
  ├─ /favicon.ico ················ 站点图标
  └─ /index.html ················· 入口文件
```

#### 基础的Bootstrap模板
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>Hello, world!</h1>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```

#### Global settings
HTML
- 需要HTML5 doctype
```
<!DOCTYPE html>
<html lang="zh-CN">
  ...
</html>
```
- 在head中引入必要的CSS文件，优先引用第三方的CSS，方便我们自己的样式覆盖
- 在body末尾引入必要的JS文件，优先引用第三方的JS，注意JS文件之间的依赖关系，比如bootstrap.js依赖jQuery，那就应该先引用jquery.js 然后引用bootstrap.js

CSS
- 除了公共级别样式，其余样式全部由 模块前缀
- 尽量使用 直接子代选择器， 少用间接子代 避免错杀
以下样式都能在 scaffolding.less 文件中找到对应的源码。
- 为 body 元素设置 background-color: #fff;
- 使用 @font-family-base、@font-size-base 和 @line-height-base 变量作为排版的基本参数
- 为所有链接设置了基本颜色 @link-color ，并且当链接处于 :hover 状态时才添加下划线


#### Viewport设置
为了确保适当的绘制和触屏缩放，需要在 <head> 之中添加 viewport 元数据标签。
```
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
```
在移动设备浏览器上，通过为视口（viewport）设置 meta 属性为 user-scalable=no 可以禁用其缩放（zooming）功能。    
这样禁用缩放功能后，用户只能滚动屏幕，就能让你的网站看上去更像原生应用的感觉。注意，这种方式我们并不推荐所有网站使用，还是要看你自己的情况而定！
- 视口的作用：在移动浏览器中，当页面宽度超出设备，浏览器内部虚拟的一个页面容器，将页面容器缩放到设备这么大，然后展示
- 目前大多数手机浏览器的视口（承载页面的容器）宽度都是980；
- 视口的宽度可以通过meta标签设置
- 此属性为移动端页面视口设置，当前值表示在移动端页面的宽度为设备的宽度，并且不缩放（缩放级别为1）
   + width:视口的宽度
   + initial-scale：初始化缩放
   + user-scalable:是否允许用户自行缩放（值：yes/no; 1/0）
   + minimum-scale:最小缩放，一般设置了用户不允许缩放，就没必要设置最小和最大缩放
   + maximum-scale:最大缩放
#### 浏览器兼容模式 Compatible
```
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```
> 此属性为文档兼容模式声明，表示如果在IE浏览器下则使用最新的标准渲染当前文档      
> html中插入兼容模式设置，可以通过 __meta:compat__ 插入
#### favicon（站点图标）
```
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
```
#### 布局容器
Bootstrap 需要为页面内容和栅格系统包裹一个 .container 容器。我们提供了两个作此用处的类。       
注意，由于 padding 等属性的原因，这两种 容器类不能互相嵌套。
.container 类用于固定宽度并支持响应式布局的容器。
```
<div class="container">
  ...
</div>
```
.container-fluid 类用于 100% 宽度，占据全部视口（viewport）的容器。
```
<div class="container-fluid">
  ...
</div>
```

### 2、栅格系统

Bootstrap 提供了一套响应式、移动设备优先的流式栅格系统，随着屏幕或视口（viewport）尺寸的增加，系统会自动分为最多12列。       
它包含了易于使用的预定义类，还有强大的mixin 用于生成更具语义的布局。
- Bootstrap提供了响应式栅格系统 ，
- 其使用方式就是将一个容器划分成12列，
- 通过col-xx-xx的类名控制每一小块的比例

##### row 行
- 必须包含在 .container （固定宽度）或 .container-fluid （100% 宽度）中
- 因为每一个列默认有一个15px的左右外边距
- row类的一个作用就是通过左右-15px屏蔽掉这个边距
```
<div class="container">
  <div class="row"></div>
</div>
```

##### Col-XX-XX类

- col-xs-[列数]：在超小屏幕下展示几份
- col-sm-[列数]：在小屏幕下展示几份
- col-md-[列数]：在中等屏幕下展示几份
- col-lg-[列数]：在大屏幕下展示几份
- xs : 超小屏幕 手机 (<768px)
- sm : 小屏幕 平板 (≥768px)
- md : 中等屏幕 桌面显示器 (≥992px)
- lg : 大屏幕 大桌面显示器 (≥1200px)
```
<div class="row">
  <div class="col-md-8">.col-md-8</div>
  <div class="col-md-4">.col-md-4</div>
</div>
```
- hidden-xx : 在某种屏幕下隐藏
- visible-xx : 在某种屏幕尺寸下显示



