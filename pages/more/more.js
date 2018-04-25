//logs.js
var util = require('../../utils/util.js')
var Api = require('../../net/API.js')
var app = getApp()
var userInfo = {}

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
      this.loginWanAndroid();
   },
   //跳转到登录页面
   loginPage: function () {
      console.log('获取userInfo' + userInfo.password);
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
            userInfo = res.data.data;
            console.log("userInfo信息 " + JSON.stringify(userInfo));
            //判断本地是否存储登录信息
            that.setData({
               wanUserName: userInfo.username == '' ?
                  '登录玩Android账户' : userInfo.username,
            })
         }
      })
   }
})