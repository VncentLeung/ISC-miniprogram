// app.js
var  baseRequestUrl="http://127.0.0.1:9090/"
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
    learnToWorkId:'',
    userInfo: [],//_调试-待取消注释
    // userInfo: {
    // 'learnToWorkId': '92019101001',
    // 'idCard': '362427200104115614',
    // 'name': '梁峰',
    // 'photo': '/images/user.png',
    // 'departId': '1',
    // 'state': '校内',
    // 'facialFeature': '脸部特征'
    // },//_调试-待注释
    openid: "",//可能需要删除
   token:"",
  //  url_00_PasswordLogin:baseRequestUrl+"user/token/",//账号密码登录，后接学工号和密码
    url_00_OpenidCheckUser:baseRequestUrl+"user/wechatToken/",//通过传递code获取用户openid,并登录、关联账户
    url_01_Token_Get_LTWid:baseRequestUrl+"user/loginState/",//后接token
    url_02_User_Get:baseRequestUrl+"user/",//获取用户信息 //后接learnToWorkId
    url_11_Apply_Submit_in:baseRequestUrl+"internalApply",//提交申请
    url_11_Apply_Submit_ex:baseRequestUrl+'externalApply',
    url_03_User_CarInfo_Get:baseRequestUrl+"user/auto/",//获取车辆等级信息
    //附加学工号
    //url_03_User_CarInfo_Add:baseRequestUrl+"user/auto",//添加车辆信息
    url_12_Add_Auto:baseRequestUrl+'user/auto',
    url_12_EditDelete_Auto:baseRequestUrl+'user/auto/',
    url_13_Get_SelfHistory:baseRequestUrl+'internalApply/get',
    url_13_Get_OthersHistory:baseRequestUrl+'externalApply/get',
    url_14_Password_Update:baseRequestUrl+'user/changePWD/'
    //后面接学工号
  }
})
