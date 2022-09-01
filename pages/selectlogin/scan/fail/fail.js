// pages/scan/success.js
var md5Fun=require('../../../../utils/md5')
var app=getApp()
import {
  Http
} from '../../../../utils/util.js';

Page({
    data: {
        account: "",
        password: "",
        code:'',
        success:false
      },
      onLoad(){
        var that=this
        wx.login({
          success(res){
            // wx.setStorageSync('code2', res.code)
           that.setData({
             code:res.code
           })
           console.log('fail页面获取的code'+res.code)
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
         var code=this.data.code
         console.log('绑定微信的时候获取的code'+code)
         //获取登录用户名
         var account = e.detail.value.account
         //获取登陆密码
         var password = e.detail.value.password
         password=this.toMD5(password)
         wx.request({
           url: app.globalData.url_00_OpenidCheckUser+account,
           method:'PUT',
           data:{
               code: code,
               password: password,
               token:app.globalData.token
           },
           success: function(res){
               console.log(res)
               if(res.data.result=='success'){
                setTimeout(() => {
                  wx.showToast({
                    title: '绑定成功',
                    icon: "success",
                  });
                  setTimeout(() => {
                    wx.hideToast();
                  }, 2000)
                }, 0);
                
               }
           }
         })
      },
})