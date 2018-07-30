## 功能

增加了照片墙

在 web/assets/img 下加了photo文件夹,里面存放f开头1递增的jpg文件

## 下一步

加载动画,和随时加入照片的事件
----
## 功能

两个功能

* 将一个图片转成灰色(黑白)图片.

    在 web/assets/js/index.js 有注释如何是灰色,如何是黑白

* 将一个图片关键点标出来,放在一个二维数组中.

    在console中查看,数组标记的很明显.

## 代码结构

* server.js package.json package-loca.json  这几个文件是node做了一个web服务

    命令 npm start ,然后用 http://localhost:3000 打开就可以了.

* web文件夹才是上面介绍的功能.

## 下一步

将用小图标或者粒子,按生成的二维数组,重新组合成一个图片(?).