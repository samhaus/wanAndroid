//discovery.js
var util = require('../../utils/util.js')
var Api = require('../../net/API.js')
var requestData = []

Page({
  data: {
    imgUrls: [
       '../../images/24213.jpg',
       '../../images/1444983318907-_DSC1826.jpg',
       '../../images/24213.jpg',
       '../../images/1444983318907-_DSC1826.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 800,
    //联动列表
    navLeftItems: requestData,
    navRightItems: requestData,
    curNav: 0,
    curIndex: 0,
    imgApi: Api.getAPI() + "resources/image/pc/android.png"
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    that.refresh0();
    that.getList();
  },

  bindItemTap: function(e) {
     wx.showToast({
        title: '敬请期待',
        icon:'none',
     })
     var index = e.currentTarget.dataset.idx;
     var item = requestData[index];
     console.log(JSON.stringify(item));
     wx.navigateTo({
      //   url: '../artical/artical?item=' + item.link
     })
   //  wx.navigateTo({
   //    url: '../answer/answer'
   //  })
  },
  
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },

  //网络请求轮播图
  refresh0: function(){
     var bannerUrl = Api.getAPI() + 'banner/json';
     util.getData(bannerUrl)
        .then((data)=>{
         //   console.log("请求图片信息 "+JSON.stringify (data.data));
           this.setData({
              imgUrls: data.data.data,
          });
        });
  },

  //获取所有列表数据
  getList: function () {
     var that = this
     var index_api = Api.getAPI() + 'tree/json';
     util.getData(index_api).then((res) => {
        console.log("请求的分类" + JSON.stringify(res.data.data[0]));
        requestData = res.data.data;
        console.log("列表长度 " + requestData.length);
        this.setData({
           curNav: requestData[0].id,
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
  },


  //使用本地 fake 数据实现继续加载效果
  nextLoad: function(){
   
  }
});
