//logs.js
var util = require('../../utils/util.js')
var Api = require('../../net/API.js')
var onfire = require("../../utils/onfire.js");
var app = getApp()
var userInfo = {}
var isReFresh = 0;

var refresh = onfire.on('onRefresh', function () {
   console.log('我的页面刷新--------------');
   isReFresh = 1;
});

Page({
   data: {
      motto: 'Hello World',
      userInfo: {},
      wanUserName: '登录玩Android账户',
   },
   //事件处理函数
   bindViewTap: function () {
      wx.navigateTo({
         url: ''
      })
   },
   onLoad: function () {
      this.loginWanAndroid();
      var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
         console.log('onLoad ' + userInfo.avatarUrl)
         //更新数据
         that.setData({
            userInfo: userInfo
         })
      })
   },

   //生命周期函数--监听页面显示
   onShow: function () {
      if (isReFresh == 1) {
         this.loginWanAndroid();
         isReFresh = 0;
      }
   },
   //跳转到登录页面
   loginPage: function () {
      console.log(JSON.stringify(userInfo));
      //判断是否userinfo为空 不能根据username判断
      if (userInfo.password == undefined) {
         console.log('跳转到登录页面');
         wx.navigateTo({
            url: '../login/login'
         })
      }
   },

   //登录玩Android账户
   loginWanAndroid: function () {
      var that = this;
      wx.getStorage({
         key: 'userInfo',
         success: function (res) {
            userInfo = res.data;
            console.log("userInfo信息 " + JSON.stringify(userInfo));
            if (userInfo == undefined) {
               console.log("userInfo是空的");
               that.setData({
                  wanUserName: '登录玩Android账户',
               })
            } else {
               //这里需要判断缓存的cookie是否过期
               that.cookieCheck(userInfo.username, userInfo.password);
            }
         }
      })
   },

   //验证cookie是否有效
   cookieCheck: function (username, password) {
      var that = this;
      var index_api = Api.getAPI() + '/user/login';
      var data = util.json2Form({ username: username, password: password });
      util.postData(index_api, data).then((feed) => {
         console.log("登录");
         console.log(JSON.stringify(feed.data.data));
         var cookie = '';
         if (feed.data.errorCode != 0) {
            userInfo = {};
         } else {
            userInfo = feed.data.data;
            cookie = feed.header["set-cookie"];
         }
         that.setData({
            wanUserName: userInfo.username
         })
         //存储一些信息到本地
         wx.setStorageSync('userInfo', userInfo);
         wx.setStorageSync('cookie', cookie);
         // 触发全局刷新事件
         setTimeout(function () { onfire.fire('onRefresh'), 1000 });
      });
   },
})