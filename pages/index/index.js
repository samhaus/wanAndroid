//index.js
var util = require('../../utils/util.js')
var Api = require('../../net/API.js')
var app = getApp()
var requestData = [];
var page = 0;
var isReFresh = 0;

var onfire = require("../../utils/onfire.js");
var refresh = onfire.on('onRefresh', function () {
   console.log('首页刷新--------------');
   isReFresh = 1;
});

Page({
   data: {
      feed: [],
      feed_length: 0,
   },
   onLoad: function () {
      console.log('onLoad')
      var that = this
      //调用应用实例的方法获取全局数据
      this.getData();
   },
   onUnload: function () {
   },
   onShow: function () {
      if (isReFresh == 1) {
         page = 0;
         this.getData();
         isReFresh = 0;
      }
   },
   upper: function () {
      wx.showNavigationBarLoading()
      this.refresh();
      console.log("upper");
      setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
   },
   lower: function (e) {
      wx.showNavigationBarLoading();
      var that = this;
      setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
      console.log("lower")
   },

   //事件处理函数
   bindItemTap: function (e) {
      var index = e.currentTarget.dataset.idx;
      console.log('点击item跳转' + index);
      var item = requestData[index];
      // console.log(JSON.stringify(item));
      wx.navigateTo({
         url: '../artical/artical?item=' + item.link
      })
   },

   //网络请求数据实现刷新效果
   getData: function () {
      var index_api = Api.getAPI() + 'article/list/' + page + '/json';
      util.getData(index_api).then((feed) => {
         setTimeout(function () {
            wx.showToast({
               title: '刷新成功',
               icon: 'success',
               duration: 2000
            })
         }, 3000)
         if (page == 0) {
            requestData = feed.data.data.datas;
         } else {
            requestData = requestData.concat(feed.data.data.datas);
         }
         page++;
         this.setData({
            feed: requestData,
            feed_length: requestData.length
         });
      });
   },
   //下拉刷新
   refresh: function () {
      wx.showToast({
         title: '刷新中',
         icon: 'loading',
         duration: 3000
      });
      page = 0;
      this.getData();
   },

   //上拉加载
   nextLoad: function () {
      wx.showToast({
         title: '加载中',
         icon: 'loading',
         duration: 3000
      })
      this.getData();
      setTimeout(function () {
         wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 1500
         })
      }, 3000)
   },

   //点击收藏
   clickCollect: function (e) {
      var index = e.currentTarget.dataset.idx;
      var item = requestData[index];
      console.log("点击的是  " + JSON.stringify(e.currentTarget.dataset));
      //判断是否收藏
      if (item.collect) {
         console.log("取消收藏");
         this.cancelCollect(index,item.id);
      } else {
         console.log("收藏");
         this.getCollect(index,item.id);
      }
   },

   //网络请求 收藏文章
   getCollect: function (index,id) {
      var that = this;
      var index_api = Api.getAPI() + '/lg/collect/' + id + '/json';
      util.postData(index_api, '').then((feed) => {
         // console.log(JSON.stringify(feed.data));
         wx.showToast({
            title: '收藏成功',
            duration: 1500,
         })
         requestData[index].collect = true;
         that.setData({
            feed: requestData
         })
      });
   },

   //网络请求 取消收藏
   cancelCollect: function (index,id) {
      var that = this;
      var index_api = Api.getAPI() + '/lg/uncollect_originId/' + id + '/json';
      util.postData(index_api, '').then((feed) => {
         console.log(JSON.stringify(feed.data));
         wx.showToast({
            title: '已取消',
            duration: 1500,
         })
         requestData[index].collect = false;
         that.setData({
            feed: requestData
         })
      });
   },

//收藏按钮按下去
   collectStart: function (e) {
      var index = e.currentTarget.dataset.idx;
      var that = this
      requestData[index].style_img = 'transform:scale(1.3);';
      that.setData({
         feed: requestData
      })
   },
   //收藏按钮手指离开
   collectEnd: function (e) {
      var index = e.currentTarget.dataset.idx;
      var that = this
      setTimeout(function () {
      requestData[index].style_img = 'transform:scale(1);';
      that.setData({
         feed: requestData,
      })
      }, 200)
   },
})
