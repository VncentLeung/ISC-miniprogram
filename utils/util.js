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

const json2Form = function(json) {//用于处理post请求的，post请求在微信端有谜之问题
  //参见：微信小程序开发之网络请求(POST请求)
  //链接：https://blog.csdn.net/qq_31383345/article/details/52839482
  var str = [];
  for(var p in json){
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}


const promisic = function (func) {//供Http类调用
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

class Http {
    // 同步Http请求
    static async asyncRequest(url, method, data, backMethod) {//供页面中的同步请求调用
        let res = await promisic(wx.request)({
            url: url,
            method: method,
            data: data,
        })
        backMethod(res)
    }
}

//向外暴露,供页面调用
export default {
  promisic,
  formatTime,
  json2Form
}

export {Http}
