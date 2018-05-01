var Api = require('../../net/API.js');
var util = require('../../utils/util.js');
var onfire = require("../../utils/onfire.js");

Page({
   data: {
      loading: false,
      username: '',
      password: '',
      error: ""
   },

   onLoad: function () {

   },
   //动态绑定账户名的值
   bindUserNameInput: function (e) {
      this.setData({
         username: e.detail.value,
      })
   },

   bindPasswordInput: function (e) {
      this.setData({
         password: e.detail.value,
      })
   },

   //登录玩Android账户
   loginWanAndroid: function () {
      var that = this;
      var username = that.data.username;
      var password = that.data.password;
      var index_api = Api.getAPI() + '/user/login';
      var data = util.json2Form({ username: username, password: password });
      util.postData(index_api, data).then((feed) => {
         console.log("登录");
         console.log(JSON.stringify(feed.data.data));
         wx.showToast({
            title: '欢迎大佬归来',
            duration: 1500,
         })
         //存储一些信息到本地
         wx.setStorageSync('userInfo', feed.data.data);
         wx.setStorageSync('cookie', feed.header["set-cookie"]);
         
         // 返回上个页面
         setTimeout(function () {
            wx.navigateBack({
               delta: 1
            })
         }, 1500);
         // 触发全局刷新事件
         setTimeout(function () {onfire.fire('onRefresh'), 2000});
         
      });
   },

   // 验证token(登录)
   isLogin: function () {
      var that = this;
      var accesstoken = that.data.accesstoken;
      var ApiUrl = Api.accesstoken;

      if (accesstoken == "") return;
      that.setData({ loading: true });
   }
})
