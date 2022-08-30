var md5Fun=require('../../utils/md5')
var app=getApp()
import {
  Http
} from '../../utils/util.js';

Page({

  data: {
    account: "",
    password: "",
    code:''
  },
  onLoad(){
    
  var that=this
   wx.login({
     success(res){
      that.setData({
        code:res.code
      })
      console.log(res.code)
    }
   })
  
  },
  inputName: function (e) {
    console.log(e)
    this.setData({
      account: e.detail.value,
    })
    console.log(this.data.account)
  },
  inputPassword: function (e) {
    console.log(e)
    this.setData({
      password: e.detail.value,
    })
    console.log(this.data.password)
  },
  toMD5:function(str){
    return md5Fun.hexMd5(str + md5Fun.getKey())
  },
  formSubmit:function (e) {
    this.formSubmit2(e,this)
  },
  async formSubmit2(e,that) {
    //var that=this
    //获取code
    console.log(e)
    //获取登录用户名
    var account = e.detail.value.account
    //获取登陆密码
    var password = e.detail.value.password
    password=this.toMD5(password)
    //传递参数到后端，判断密码是否正确
    if(that.data.code!=''){

      await Http.asyncRequest(
       app.globalData.url_00_OpenidCheckUser + account,
       'PUT',
       { password:password,code:that.data.code },
       { 'content-type': 'application/json;charset=utf-8'},
       res=>{
        if (res.data.result == 'success') {
          console.log('请求-0 绑定账号')
          console.log(res.data)
          
          // app.globalData.token=res.data.data
          // console.log('token获取成功'+app.globalData.token)
        }
          else{
              console.log(res.data.message)
              wx.showToast({
                icon:"error",
                title: '提示-登录失败',
              })
              return
          }
        
       }
      )

      await Http.asyncRequest(
        app.globalData.url_00_OpenidCheckUser+that.data.code,
        'GET',{},{},
        res=>{
          console.log('请求1-获取账号登录信息token')
          console.log(JSON.stringify(res.data))
          app.globalData.token = res.data.data;
          if(res.data.result=='fail'){
            wx.showModal({
              cancelColor: 'cancelColor',
              title:'提示',
              content:'未注册',
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
          console.log('请求2-获取learnToWorkId')
          console.log(JSON.stringify(res.data))
          app.globalData.learnToWorkId = res.data.data;
        }
      )

      await Http.asyncRequest(
        app.globalData.url_02_User_Get+app.globalData.learnToWorkId,
        'GET',{},{'token': app.globalData.token},
        res=>{
          console.log('请求3-获取用户信息')
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
              url: '../tab1-operation/index',
            })
          }, 1000);
        }
      )

   
    }
   
    //登陆成功一定要将用户的信息存到磁盘，以便于后面查询个人信息时通过用户名查询
    // wx.setStorageSync('account', account)
    // wx.setStorageSync('password', password)
    
   /*
    //密码错误则提示是否忘记密码
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '提示',
      content: '用户名或密码错误',
      cancelText: '忘记密码',
      confirmText: '重新输入',
      success (res) {
        if (res.confirm) {
          console.log("用户选择重新输入")
        } else if (res.cancel) {
          wx.navigateTo({
            url: '../forgetpassword/forgetpassword',
          })
        }
      }
    })*/
  }
})