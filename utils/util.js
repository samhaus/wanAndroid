function formatTime(date) {
   var year = date.getFullYear()
   var month = date.getMonth() + 1
   var day = date.getDate()

   var hour = date.getHours()
   var minute = date.getMinutes()
   var second = date.getSeconds()


   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
   n = n.toString()
   return n[1] ? n : '0' + n
}

module.exports = {
   formatTime: formatTime
};

var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')

//get请求
function getData(url) {
   return new Promise(function (resolve, reject) {
      var cookie = '';
      wx.getStorage({
         key: 'cookie',
         success: function (res) {
            cookie = res.data
            wx.request({
               url: url,
               data: {},
               header: {
                  //'Content-Type': 'application/json',
                  "cookie": cookie
               },
               success: function (res) {
                  if (res.data.errorCode != 0) {
                     wx.showToast({
                        title: res.data.errorMsg,
                        icon: 'none',
                     })
                  }
                  resolve(res)
               },
               fail: function (res) {
                  reject(res)
                  wx.showToast({
                     title: '请求失败',
                     icon: 'none',
                  })
               }
            })
         },
      })
   })
}
// post请求
function postData(url, data) {
   console.log("post请求来一发");
   return new Promise(function (resolve, reject) {
      var cookie = '';
      wx.getStorage({
         key: 'cookie',
         success: function (res) {
            cookie=res.data;
            // console.log("令人激动地cookie "+cookie);
            wx.request({
               url: url,
               data: data,
               method: 'POST',
               header: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "cookie": cookie
               },
               success: function (res) {
                  console.log("post请求回调 "+JSON.stringify(res.data));
                  if (res.data.errorCode != 0) {
                     wx.showToast({
                        title: res.data.errorMsg,
                        icon: 'none',
                     })
                  }
                  resolve(res)
               },
               fail: function (res) {
                  reject(res)
                  wx.showToast({
                     title: '请求失败',
                     icon: 'none',
                  })
                  console.log("request failed")
               }
            })
         },
      })
   })
}

function json2Form(json) {
   var str = [];
   for (var p in json) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
   }
   return str.join("&");
}

function getData2() {
   return index.index;
}

function getNext() {
   return index_next.next;
}

function getDiscovery() {
   return discovery.discovery;
}

function discoveryNext() {
   return discovery_next.next;
}



module.exports.getData = getData;
module.exports.postData = postData;
module.exports.json2Form = json2Form;

module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;




