

------
最近才开始针对项目性学习了一点js，和同事一起用MUI写了个项目，就敢拿出来献丑，我也是diaodiao的。经过几十个工时业余时间（最近两周有点忙，周期拖得有点长，本来计划五一之前发出来的），在[仿知乎微信小程序demo](https://github.com/RebeccaHanjw/weapp-wechat-zhihu)基础上，结合[玩Android开源API](https://www.zybuluo.com/cmd/)，完成了玩Android小程序版的初版（和群里基佬们做得比感觉做的太简单了，练练手，练练手），主要包含以下几大模块：

> * 首页
> * 项目
> * 体系
> * 我的
> * 登录

![cmd-markdown-logo](https://www.zybuluo.com/static/img/logo.png)

先上预览图：

####首页：
![首页.gif](https://upload-images.jianshu.io/upload_images/4332108-1507d7a3f1019d13.gif?imageMogr2/auto-orient/strip)
####项目：
![项目.gif](https://upload-images.jianshu.io/upload_images/4332108-b21c8c3fe4995eb9.gif?imageMogr2/auto-orient/strip)
####体系：
![体系.gif](https://upload-images.jianshu.io/upload_images/4332108-1efd0e4a1e5ebfbd.gif?imageMogr2/auto-orient/strip)
####我的：
![我的.gif](https://upload-images.jianshu.io/upload_images/4332108-86cac187b5a45439.gif?imageMogr2/auto-orient/strip)



> 为什么要写这个？学了点js就飘了，群里大佬们写的都是Android版本的，微信小程序大家似乎都有接触但是可能都觉得比较简单，也是为了便于手持iPhone的基佬们随时点赞刷玩Android。

------

## 说几点：
#### 1. 微信小程序开发入门注意事项
- 这里就不赘述太多，看我基友**阿汤哥**的一篇文章[小程序基本介绍](https://www.jianshu.com/p/028addf07971)就差不多了。简单归简单，不过微信小程序在开发过程中坑还是很多的，我也是边学边百度，我这个人踩坑踩惯了，建议大家初学的时候，找个优质一点的demo照葫芦画瓢，学着写很容易上手。

#### 2. 未实现的功能

-  首页文章列表搜索（计划V1.1实现）
-  收藏列表（计划V1.1实现）
-  查看文章详情等需要跳转h5页面的功能（计划搞到企业账号实现）
-  收藏项目等（目前已实现收藏文章）
-  剩下的你们提，我做不出来（或者没时间）你们fork去

#### 3. 微信小程序代码写法的一些特点

- #####工具类等输出对公共方法
写方法体还是一样
```js
function formatNumber(n) {
   n = n.toString()
   return n[1] ? n : '0' + n
}
```
或者
```JS
function getData(url) {
     XXXXXX
}
```
都和我们原生js写法、jquery等几乎一致，然鹅要注意一点就是如果该方法需要外部调用，需要多加一个：
```js
module.exports = {
   formatTime: formatTime
};
```
在文件里加上这个，或者也可以写成：
``` js
module.exports.getData = getData;
```
- #####js页面数据刷新html（wxml）
- #####利用第三方工具fire实现类似EventBus全局事件通知
- #####列表单个Item点击控件冲突
- #####URL的限制， 不论什么请求必须Https
- #####其他的就不多赘述了

再一次感谢您花费时间看我啰嗦了这么久，觉得还不错可以 **[star star star](https://github.com/samhaus/wanAndroid)** 一波。微信小程序我并不打算深耕太多，年中旬以后会把重心转移到其他技术方面。如果您对本项目有什么想法欢迎[去提issue](https://github.com/samhaus/wanAndroid/issues)，有兴趣可以自己参与进来迭代维护。祝您生活愉快！


作者 [@samhaus](https://www.jianshu.com/u/5b8df438b435)  
2018 年 05月 01日 

