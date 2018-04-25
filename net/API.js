/**
 * 用于保存api
 **/

var HttpsUrl ='https://wxapi.hotapp.cn/proxy/?appkey=hotapp420038284&url=';
var API = 'http://www.wanandroid.com/';
//玩Android的url
function getAPI(){
   return HttpsUrl+API;
}

//测试其他url用
function getHttpsUrl() {
   return HttpsUrl ;
}

module.exports.getAPI = getAPI; 
module.exports.getHttpsUrl = getHttpsUrl;