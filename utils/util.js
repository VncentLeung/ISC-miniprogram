const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const json2Form = function (json) { //用于处理post请求的，post请求在微信端有谜之问题
  //参见：微信小程序开发之网络请求(POST请求)
  //链接：https://blog.csdn.net/qq_31383345/article/details/52839482
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

const formatDate = function (times) {
  var date = new Date(times);
  var year = date.getFullYear(); //年份
  var month = date.getMonth() + 1; //月份
  var day = date.getDate(); //日
  var hour = function () { //获取小时
    return date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  }
  var minute = function () { //获取分钟
    return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  }

  var second = function () { //获取秒数
    return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  }
  return year + '-' + month + '-' + day + ' ' + hour() + ':' + minute() + ':' + second()

}
const promisic = function (func) { //供Http类调用
  return function (params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res);
        },
        fail: (error) => {
          reject(error);
        }
      });
      func(args);
    });
  };
};
const baseToImgOne = function (obj, name) {
  var base64 = "data:image/jpg;base64," + obj[name];
  var imgPath = wx.env.USER_DATA_PATH + '/e-invoice' + Date.parse(new Date()) + Math.random() + '.jpg';
  var imageData = base64.replace(/^data:image\/\w+;base64,/, "");
  var fs = wx.getFileSystemManager();
  fs.writeFileSync(imgPath, imageData, "base64");
  fs.close();
  obj[i].photo = imgPath
  console.log(imgPath)
}
const base64toImg = function (obj) {
  console.log(obj.length)
  for (var i = 0, len = obj.length; i < len; i++) {

    if (obj[i].hasOwnProperty('photo'))
      if (obj[i].photo) {
        var base64 = "data:image/jpg;base64," + obj[i].photo;
        var imgPath = wx.env.USER_DATA_PATH + '/e-invoice' + Date.parse(new Date()) + Math.random() + '.jpg';
        var imageData = base64.replace(/^data:image\/\w+;base64,/, "");
        var fs = wx.getFileSystemManager();
        fs.writeFileSync(imgPath, imageData, "base64");
        fs.close();
        obj[i].photo = imgPath
        console.log(imgPath)
      };
    if (obj[i].hasOwnProperty('prove'))
      if (obj[i].prove)
        obj[i].prove = "data:image/jpeg;base64," + obj[i].prove.replace(/[\r\n]/g, '')
        ;
        ;
    if (obj[i].hasOwnProperty('nucleicAcidProof'))
      if (obj[i].nucleicAcidProof)
        obj[i].nucleicAcidProof = "data:image/jpeg;base64," + obj[i].nucleicAcidProof.replace(/[\r\n]/g, '')
        ;
      ;
    if (obj[i].hasOwnProperty('healthCode'))
      if (obj[i].healthCode)
        obj[i].healthCode = "data:image/jpeg;base64," + obj[i].healthCode.replace(/[\r\n]/g, '')
      ;
    ;

  }



}

class Http {
  // 同步Http请求
  static async asyncRequest(url, method, data, header, backMethod) { //供页面中的同步请求调用
    let res = await promisic(wx.request)({
      url: url,
      method: method,
      data: data,
      header: header
    })
    backMethod(res)
  }
}

//向外暴露,供页面调用
export default {
  promisic,
  formatTime,
  json2Form,
  formatDate,
  base64toImg
}

export {
  Http
}