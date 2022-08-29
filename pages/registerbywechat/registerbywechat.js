// pages/registerbywechat/registerbywechat.js
import {
  Http
} from '../../utils/util.js';
var app = getApp();
var globalFun = require('../../utils/util').default;

Page({
  data: {
    //用户基本信息（头像、昵称、电话）
    userinfo: {
      avatarUrl: '../../images/my.png',
      nickName: '未授权',
    },
    //是否已经获取用户信息
    hasUserInfo: false,
    //是否可以调用获取信息的函数
    canIUseGetUserProfile: false,
  },
  onLoad() {
    console.log('registerbywechart page onload')
    this.info();
  },
  info() {
    wx.getUserInfo({
      //成功后会返回
      success: (res) => {
        console.log(res);
        // 把你的用户信息存到一个变量中方便下面使用
        let userInfo = res.userInfo
        //获取openId（需要code来换取）这是用户的唯一标识符
        // 获取code值
        wx.login({
          //成功放回
          success: (res) => {
            console.log(res);
            let code = res.code

            //对openid等进行验证
            this.verify(userInfo, code)
          }
        })

      }
    })

  },

  async verify(userInfo, code) {
    //调用封装的同步类，发送同步请求
    // await Http.asyncRequest(
    //   `https://api.weixin.qq.com/sns/jscode2session?appid=wx6f99bf2b59706cb7&secret=44d3d3b30820282dd14061b7f0970ecd&js_code=${code}&grant_type=authorization_code`,
    //   'GET', {},
    //   res => {
    //     console.log(res);
    //     userInfo.openid = res.data.openid
    //     console.log("我的openid为：" + userInfo.openid);
    //     wx.setStorageSync('openid', userInfo.openid)
    //   })

    await Http.asyncRequest(
      app.globalData.url_00_OpenidCheckUser+code,
      'GET',{},{},
      res=>{
        console.log('请求1')
        console.log(JSON.stringify(res.data))
        app.globalData.token = res.data.data;
      }
    )
    await Http.asyncRequest(
      app.globalData.url_01_Token_Get_LTWid+app.globalData.token,
      'GET',{},{},
      res=>{
        console.log('请求2')
        console.log(JSON.stringify(res.data))
        app.globalData.learnToWorkId = res.data.data;
      }
    )
    await Http.asyncRequest(
      app.globalData.url_02_User_Get+app.globalData.learnToWorkId,
      'GET',{},{'token': app.globalData.token},
      res=>{
        console.log('请求3')
        console.log(JSON.stringify(res.data))
        app.globalData.userInfo = res.data.data;
        userInfo.learnToWorkId=app.globalData.learnToWorkId
        console.log(app.globalData.userInfo)
        setTimeout(() => {
          wx.showToast({
            title: '登录成功',
            icon: "success",
          })
        }, 500);

        setTimeout(() => {
          wx.switchTab({
            url: '../tab1-operation/index',
          })
        }, 1000);
      }
    )
    //利用获得的openid，向后端询问是否存在或者绑定
    // wx.request({
    //   url: app.globalData.url_01_OpenidCheckUser+userInfo.openid,
    //   method: 'GET',
    //   // data: globalFun.json2Form({
    //   //   openid: userInfo.openid
    //   // }),
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 小程序post所需要的配置信息
    //   },
    //   success(res) {
    //     console.log(JSON.stringify(res.data))
    //     app.globalData.token = res.data.data.token;
       
    //     setTimeout(() => {
    //       wx.showToast({
    //         title: '登录成功',
    //         icon: "success",
    //       })
    //     }, 500);

    //     setTimeout(() => {
    //       wx.switchTab({
    //         url: '../tab1-operation/index',
    //       })
    //     }, 1000);
    //   }
    // })
  }


})