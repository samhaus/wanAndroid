//logs.js
var util = require('../../utils/util.js')
var Api = require('../../net/API.js')
var app = getApp()
var requestTabData = [];
var requestListData = [];
var page = 1;//神坑鸿洋 页码一会0开始一会1开始
var curNavTab = '1';
var isReFresh = 0;

var onfire = require("../../utils/onfire.js");
var refresh = onfire.on('onRefresh', function () {
   console.log('项目页刷新--------------');
   isReFresh = 1;
});
Page({
   //默认数据
   data: {
      navTab: [{ name: '', id: '1' }],
      currentNavtab: curNavTab,
      feed: [],
      feed_length: 0
   },
   onLoad: function () {
      var that = this
      //调用应用实例的方法获取全局数据
      this.getTabData();
   },
   onShow: function () {
      if (isReFresh == 1) {
         page = 1;
         this.getTabData();
         isReFresh = 0;
      }
   },
   //下拉刷新
   upper: function () {
      console.log("upper");
      wx.showNavigationBarLoading()
      this.refresh();
      setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
   },

   // 上拉加载
   lower: function () {
      console.log("lower")
      wx.showNavigationBarLoading();
      var that = this;
      setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
      
   },

   //下拉刷新
   refresh: function () {
      wx.showToast({
         title: '刷新中',
         icon: 'loading',
         duration: 3000
      });
      page = 1;
      this.getList(curNavTab);
   },

   //上拉加载
   nextLoad: function () {
      wx.showToast({
         title: '加载中',
         icon: 'loading',
         duration: 3000
      })
      this.getList(curNavTab);
      setTimeout(function () {
         wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 1500
         })
      }, 3000)
   },

   //切换tab
   switchTab: function (e) {
      console.log(JSON.stringify(e.currentTarget.dataset));
      curNavTab = e.currentTarget.dataset.idx;
      page = 1;
      //获取数据
      this.getList(curNavTab);
      this.setData({
         currentNavtab: curNavTab,
      });
   },

   //item跳转事件处理函数
   bindItemTap: function (e) {
      var index = e.currentTarget.dataset.idx;
      console.log('点击跳转 ' + JSON.stringify(e.currentTarget.dataset));
      var item = requestListData[index];
      console.log(JSON.stringify(item));
      wx.navigateTo({
         url: '../artical/artical?item=' + item.link
      })
   },

   //网络请求tab数据
   getTabData: function () {
      var index_api = Api.getAPI() + '/project/tree/json';
      util.getData(index_api).then((feed) => {
         //  console.log(JSON.stringify(feed.data.data));
         requestTabData = feed.data.data;
         curNavTab = requestTabData[0].id;
         this.setData({
            navTab: requestTabData,
            currentNavtab: curNavTab,
         });
         //获取数据
         this.getList(curNavTab);
      });
   },
   //网络请求列表数据
   getList: function (id) {
      var index_api = Api.getAPI() + '/project/list/' + page + '/json?cid=' + id;
      // console.log(index_api);
      util.getData(index_api).then((feed) => {
         // requestListData = feed.data.data.datas;
         // console.log(JSON.stringify(requestListData[0]));
         if (page == 1) {
            requestListData = feed.data.data.datas;
         } else {
            requestListData = requestListData.concat(feed.data.data.datas);
         }
         page++;
         this.setData({
            feed: requestListData,
            feed_length: requestListData.length
         });
      });
   },
   //点击收藏
   clickCollect: function (e) {
      var index = e.currentTarget.dataset.idx;
      var item = requestListData[index];
      console.log("点击的是  " + JSON.stringify(item));
      //判断是否收藏
      if (item.collect) {
         console.log("取消收藏");
         this.cancelCollect(index, item.id);
      } else {
         console.log("收藏");
         this.getCollect(index, item.id);
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
         requestListData[index].collect = true;
         that.setData({
            feed: requestListData,
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
         requestListData[index].collect = false;
         that.setData({
            feed: requestListData,
         })
      });
   },

})
