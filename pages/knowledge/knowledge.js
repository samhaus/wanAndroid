var app = getApp()
var util = require('../../utils/util.js')
var Api = require('../../net/API.js')
var requestData = []

Page({
   data: {
      navLeftItems: requestData,
      navRightItems: requestData,
      curNav: 0,
      curIndex: 0
   },
   onLoad: function () {
      console.log('onLoad')
      this.getList();
   },
   onUnload: function () {
   },
   //获取数据
   getList: function () {
      var that = this
      var index_api = Api.getAPI() + 'tree/json';
      util.getData(index_api).then((res) => {
         console.log("请求的分类" + JSON.stringify(res.data.data[0]));
         requestData = res.data.data;
         console.log("列表长度 " + requestData.length);
         this.setData({
            navLeftItems: requestData,
            navRightItems: requestData
         });
      });
   },

   //事件处理函数
   switchRightTab: function (e) {
      let id = e.target.dataset.id;
      console.log("点击事件 " + JSON.stringify(e.target.dataset));
      var index = parseInt(e.target.dataset.index);
      this.setData({
         curNav: id,
         curIndex: index
      })
   }

})