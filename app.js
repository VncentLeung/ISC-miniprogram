// app.js
var  baseRequestUrl="http://127.0.0.1:5000/"
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {

    userInfo: null,//可能需要删除
    openid: "",//可能需要删除
   
    url_01_OpenidCheckUser:baseRequestUrl+"getUserInfoByOpenid/",
    url_02_User_Get:baseRequestUrl+"user/get/"
  }
})
