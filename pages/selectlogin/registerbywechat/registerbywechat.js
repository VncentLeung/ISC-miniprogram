// pages/registerbywechat/registerbywechat.js
import {
  Http
} from '../../../utils/util.js';
var app = getApp();
var globalFun = require('../../../utils/util').default;

Page({
  data: {
    //用户基本信息（头像、昵称、电话）
    userinfo: {
      avatarUrl: '/images/my.png',
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
    //   'GET', {},{},
    //   res => {
    //     console.log(res);
    //     userInfo.openid = res.data.openid
    //     console.log("我的openid为：" + userInfo.openid);
    //     wx.setStorageSync('openid', userInfo.openid)
    //   })

    //注意 这里免去了前端请求openid的麻烦了，这里后端直接接受用户code,并且计算openid,再通过openid查找数据库是否存在数据，并且返回token
    await Http.asyncRequest(
      app.globalData.url_00_OpenidCheckUser+code,
      'GET',{},{},
      res=>{
        console.log('请求1')
        console.log(JSON.stringify(res.data))
        app.globalData.token = res.data.data;
        if(res.data.result=='fail'){
          wx.showModal({
            cancelColor: 'cancelColor',
            title:'提示',
            content:'未注册或暂未绑定微信，请先尝试密码登录',
            success(res){
              setTimeout(
                function () {
                  let pages = getCurrentPages(); //获取小程序页面栈
                  let beforePage = pages[pages.length - 2]; //获取上个页面的实例对象
                  // beforePage.setData({ //直接修改上个页面的数据（可通过这种方式直接传递参数）
                  //   txt: '修改数据了'
                  // })
                  // 如果找不到go_update(),可以打印beforePage根据层级调用
                  console.log(beforePage)
                  beforePage.initPage();
    
                  wx.navigateBack({
                    delta: 1 // 返回上一级页面。 
                  })
                }, 0)
            }
          })

        }
      }
    )
    await Http.asyncRequest(
      app.globalData.url_01_Token_Get_LTWid+app.globalData.token,
      'GET',{},{},
      res=>{
        console.log('请求2-通过token获取学工号')
        console.log(JSON.stringify(res.data))
        app.globalData.learnToWorkId = res.data.data;
      }
    )
    await Http.asyncRequest(
      app.globalData.url_02_User_Get+app.globalData.learnToWorkId,
      'GET',{},{'token': app.globalData.token},
      res=>{
        console.log('请求3-通过学工号、配合token获取用户信息')
        console.log(JSON.stringify(res.data))
        app.globalData.userInfo = res.data.data;
        app.globalData.userInfo.learnToWorkId=app.globalData.learnToWorkId
        console.log(app.globalData.userInfo)
        setTimeout(() => {
          wx.showToast({
            title: '登录成功',
            icon: "success",
          })
        }, 500);

        setTimeout(() => {
          wx.switchTab({
            url: '/pages/tab1-operation/index',
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