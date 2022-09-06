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
        // obj[i].photo=obj[i].photo.replace(/[\r\n]/g, '')
        obj[i].photo = "data:image/jpeg;base64," + obj[i].photo.replace(/[\r\n]/g, '')
      }
        // obj[i].photo = "data:image/jpeg;base64," + obj[i].photo.replace(/[\r\n]/g, '')
      ;
    ;
    
    
    if (obj[i].hasOwnProperty('prove'))
      if (obj[i].prove)
      {
        // obj[i].prove= obj[i].prove.replace(/[\r\n]/g, '')
        obj[i].prove = "data:image/jpeg;base64," + obj[i].prove.replace(/[\r\n]/g, '')
      }
        // obj[i].prove = "data:image/jpeg;base64," + obj[i].prove.replace(/[\r\n]/g, '')
      ;
    ;

    if (obj[i].hasOwnProperty('nucleicAcidProof'))
      if (obj[i].nucleicAcidProof)
        obj[i].nucleicAcidProof = "data:image/jpeg;base64," + obj[i].nucleicAcidProof.replace(/[\r\n]/g, '')
      ;
    ;

    if (obj[i].hasOwnProperty('healthCode'))
      if (obj[i].healthCode)
        obj[i].healthCode = "data:image/jpeg;base64,"+obj[i].healthCode.replace(/[\r\n]/g, '')
        // + obj[i].healthCode.replace(/[\r\n]/g, '')
      ;
    ;

  }



}


function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 身份证号验证
 */
function checkIdCard(idCard) {
  idCard = trim(idCard.replace(/ /g, "")); //去掉字符串头尾空格
  if (idCard.length == 15) {
    return isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证
  } else if (idCard.length == 18) {
    var a_idCard = idCard.split(""); // 得到身份证数组
    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { //进行18位身份证的基本验证和第18位的验证
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
  var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  var sum = 0; // 声明加权求和变量
  if (a_idCard[17].toLowerCase() == 'x') {
    a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
  }
  for (var i = 0; i < 17; i++) {
    sum += Wi[i] * a_idCard[i]; // 加权求和
  }
  var valCodePosition = sum % 11; // 得到验证码所位置
  if (a_idCard[17] == ValideCode[valCodePosition]) {
    return true;
  } else {
    return false;
  }
}

/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18) {
  var year = idCard18.substring(6, 10);
  var month = idCard18.substring(10, 12);
  var day = idCard18.substring(12, 14);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 这里用getFullYear()获取年份，避免千年虫问题
  if (temp_date.getFullYear() != parseFloat(year) ||
    temp_date.getMonth() != parseFloat(month) - 1 ||
    temp_date.getDate() != parseFloat(day)) {
    return false;
  } else {
    return true;
  }
}

/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15) {
  var year = idCard15.substring(6, 8);
  var month = idCard15.substring(8, 10);
  var day = idCard15.substring(10, 12);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  if (temp_date.getYear() != parseFloat(year) ||
    temp_date.getMonth() != parseFloat(month) - 1 ||
    temp_date.getDate() != parseFloat(day)) {
    return false;
  } else {
    return true;
  }
}

function checkPhone(phone) {
  var phone = phone;
  if(!phone){
    console.log('手机号为空')
    return false;
  }
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false
  }
  if (phone.length >= 11) {
      return false;
  }
  
    return true;
  
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
  base64toImg,
  checkIdCard,
  checkPhone
}

export {
  Http
}