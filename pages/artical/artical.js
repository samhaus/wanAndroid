// artical.js
var url = '';
//在使用的View中引入WxParse模块
var wxParse = require('../../wxParse/wxParse.js');
Page({
   /**
    * 页面的初始数据
    */
   data: {
      url: ''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      var item = options.item;
      console.log("接收到的 " + JSON.stringify(item));
      this.setData({
         url: "https://wxapi.hotapp.cn/proxy/?appkey=hotapp420038284&url=" + item,
      })
      // var that = this;
      // wx.request({
      //    url: "https://wxapi.hotapp.cn/proxy/?appkey=hotapp420038284&url=" + item,
      //    success: (res) => {
      //       // console.log("请求下来的 " + res.data);
      //       wxParse.wxParse('article', 'html', res.data, that, 5);
      //    }
      // })
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})