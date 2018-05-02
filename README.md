
#玩Android微信小程序版
------
最近开始针对项目性全面学习了一点js，和同事一起用MUI写了个项目，就敢拿出来献丑，我也是diaodiao的。经过几十个工时业余时间*（最近两周有点忙，周期拖得有点长，本来计划五一之前发出来的）*，在[仿知乎微信小程序demo](https://github.com/RebeccaHanjw/weapp-wechat-zhihu)基础上，结合[玩Android开源API](https://www.zybuluo.com/cmd/)，完成了玩Android小程序版的初版*（和群里基佬们做得比感觉做的太简单了，练练手，练练手）*，主要包含以下几大模块：

> * 首页
> * 项目
> * 体系
> * 我的
> * 登录


先上预览图：


![首页.gif](https://upload-images.jianshu.io/upload_images/4332108-1507d7a3f1019d13.gif?imageMogr2/auto-orient/strip)

![项目.gif](https://upload-images.jianshu.io/upload_images/4332108-b21c8c3fe4995eb9.gif?imageMogr2/auto-orient/strip)

![体系.gif](https://upload-images.jianshu.io/upload_images/4332108-1efd0e4a1e5ebfbd.gif?imageMogr2/auto-orient/strip)

![我的.gif](https://upload-images.jianshu.io/upload_images/4332108-86cac187b5a45439.gif?imageMogr2/auto-orient/strip)


------

> 为什么要写这个？学了点js就飘了，群里大佬们写的都是Android版本的，微信小程序大家似乎都有接触但是可能都觉得比较简单，也是为了便于手持iPhone的基佬们随时点赞刷玩Android。

------

# 说几点：
## 1. 微信小程序开发入门注意事项

- 这里就不赘述太多，看我基友**阿汤哥**的一篇文章[小程序基本介绍](https://www.jianshu.com/p/028addf07971)就差不多了。简单归简单，不过微信小程序在开发过程中坑还是很多的，我也是边学边百度，我这个人踩坑踩惯了，建议大家初学的时候，找个优质一点的demo照葫芦画瓢，学着写很容易上手。

## 2. 未实现的功能

-  首页文章列表搜索*（计划V1.1实现）*
-  收藏列表*（计划V1.1实现）*
-  查看文章详情等需要跳转h5页面的功能*（计划搞到企业账号实现）*
-  收藏项目等*（目前已实现收藏文章）*
-  剩下的你们提，我做不出来*（或者没时间）*你们fork去

## 3. 微信小程序代码写法的一些特点

- 工具类等输出对公共方法
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
- js页面数据刷新html（wxml）
微信小程序绑定js数据不像angular那样，在每个页面的js文件中，都有个类似oncreat的方法，即Page() 函数，它是用来注册一个页面。接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等这里每个页面的WXML 中的动态数据均来自对应 Page 的 data。给页面初始赋值可以在data里面直接放置：
``` js
 data: {
      motto: 'Hello World',
      userInfo: {},
      wanUserName: '登录玩Android账户',
   }
``` 
而我们经过数据处理以后，需要实时更新页面则可以直接调用：
``` 
         //更新数据
         that.setData({
            userInfo: userInfo
         })
``` 
对，就是键值对的方式，和data一样。这里需要注意的是**that**这个，我们一般会在方法体内部先var一个参数that去获取全局实例**this**，这样避免方法自己的实例取代了页面的全局实例。this代表着当前对象，会随着程序的执行过程中的上下文改变，例如在wx.request({});方法的回调函数中，对象已经发生改变，所以已经不是wx.request({});方法对象了，data属性也不存在了。

- ##页面销毁与返回
那么在微信小程序里我们怎么管理页面呢。微信小程序固然没有AMS这些东西，那么我们可以判断page来管理：
``` 
         // 返回上个页面
         setTimeout(function () {
            wx.navigateBack({
               delta: 1
            })
         }, 1500);
``` 
这里我设置了一个延迟，核心的代码是wx.navigateBack(),这里面的参数delta指的是退回页面的层数，比如我这里是返回上一页，那么值就是1，以此类推。。。但是我们一般返回上个页面的时候也会带一定的参数，这里就有三种*（可能更多）*介绍给大家：
1、利用本地存储 *（类似Android的sp）* 方式存储起来，这里去看看官方文档很简单，都是wx.XXX的。
2、利用生命周期传递，例如：
``` 
var pages = getCurrentPages();
var currPage = pages[pages.length - 1];   //当前页面
var prevPage = pages[pages.length - 2];  //上一个页面
//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
prevPage.setData({
  mydata: {a:1, b:2}
})
``` 
这里是在简书的[微信小程序从子页面退回父页面时的数据传递](https://www.jianshu.com/p/aa8254b23847)学习到的。这种方式在逻辑上要清晰得多，也不存在对数据的销毁有额外的管理工作，看起来十分优雅，从一定的角度说类似于Android的ActivityForResult方式。当然有利也是有弊的，比如使用这个页面的有多个入口，这样做很可能会导致获取到的页面实例不正确。当然如果对于逻辑层次简单的、耦合少的页面还是比较方便的。

3、使用fire传递，这个方式是类似于我们EventBus的方式，后面有详解。

- 利用第三方工具fire实现类似EventBus全局事件通知

之前说到，fire是一个非常轻量级的第三方的组件库，在微信小程序限制项目大小2MB的情况下，在js调用中可以实现类似EventBus的全局事件订阅管理，非常简单好用。
1、首先，导fire文件，这个去网上下载一个*（不到1KB）*就可以，直接把onfire.js文件拷过来。
2、写订阅事件和接受者的时候：
> - A 页面先订阅一个事件，并定义处理方法；
> - 从 B 页面返回时，发送消息；
> - A 页面卸载时，解除订阅。

是不是一毛一样的？不仅仅在微信小程序中，包括vue、React等都可以使用，具体使用*（无非是一行代码发送消息，接收消息的时候写一个方法）*可以去自行百度。

- 列表单个Item点击控件冲突
焦点冲突什么的在Android里面问题多多，在这里就要简单太多了。之前我曾尝试使用Android的方式去做，发现总是碰壁。无奈又要求助一波百度*（文档看的太少）*。在点击事件的时候，我们一般是给被点击View添加一个bindtap方法，后面写上方法名即可：
```
bindtap="bindItemTap"
``` 
而如果这个View里面包含了其他的子View需要添加点击事件的时候，我们需要使用另一种写法了：
``` 
catchtap="clickCollect"
``` 
这里的点击事件也很有趣，包括手指的手势都有涉及，包括手指点下去的时候、抬起来的时候、移动的时候等等，和Android的ACTION_DOWN及 ACTION_UP等异曲同工。
- URL的限制， 不论什么请求必须Https
微信小程序对于网络请求有一定的限制，比如我们的玩Android是仅支持http的，但是微信是要求必须使用https请求才被许可，这也简单。我采用的方法是利用[第三方搭建的网站](https://wxapi.hotapp.cn/proxy/)进行url桥接。把网络管理类里面的baseUrl前面加上*https://wxapi.hotapp.cn/proxy/*，然后拼上你在网站申请的key*（可以写死）*，然后拼上你http协议的url即可。

提到微信的url限制，不得不说微信目前限制个人开发者和海外开发者使用webview打开第三方h5页面。所以，咱们在预览的时候只能用编译器去预览，想看具体的文章目前还是有限制的，我就不求赞助申请企业认证了。当然也欢迎有企业账户的基佬把代码fork过去给大家提供个福利*（别犯法哦）*。


- 其他的就不多赘述了


------
    **再一次感谢您花费时间看我啰嗦了这么久，觉得还不错可以 [star star star](https://github.com/samhaus/wanAndroid)一波。微信小程序我并不打算深耕太多，后面会把重心转移到其他技术方面。如果您对本项目有什么想法欢迎[去提issue](https://github.com/samhaus/wanAndroid/issues)，有兴趣可以自己参与进来迭代维护。祝您生活愉快！**

------
作者 [@samhaus](https://www.jianshu.com/u/5b8df438b435)  
2018 年 05月 01日 

