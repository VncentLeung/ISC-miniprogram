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

    // userInfo: null,//_调试-待取消注释
    userInfo: {
    'learnToWorkId': '92019101001',
    'idCard': '362427200104115614',
    'name': '梁峰',
    'photo': '/images/user.png',
    'departId': '1',
    'state': '校内',
    'facialFeature': '脸部特征'
    },//_调试-待注释
    openid: "",//可能需要删除
   
    url_01_OpenidCheckUser:baseRequestUrl+"getUserInfoByOpenid",//通过Openid获取用户账户
    url_02_User_Get:baseRequestUrl+"user/get",//获取用户等级信息
    url_11_Apply_Submit_in:baseRequestUrl+"internalApply/add",//提交申请
    url_03_User_CarInfo_Get:baseRequestUrl+"user/getAuto",//获取车辆等级信息
    url_12_Add_Auto:baseRequestUrl+'user/addAuto'
  }
})
