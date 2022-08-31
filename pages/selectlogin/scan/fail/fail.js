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
        code:''
      },
      onLoad(){
        var that=this
        wx.login({
          success(res){
            wx.setStorageSync('code2', res.code)
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
         var code=wx.getStorageSync('code2')
         //获取登录用户名
         var account = e.detail.value.account
         //获取登陆密码
         var password = e.detail.value.password
         password=this.toMD5(password)
         wx.request({
           url: 'http://192.168.1.109:9090/user/wechatToken/'+account,
           method:'PUT',
           data:{
               code: code,
               password: password
           },
           success: function(res){
               console.log(res)
           }
         })
      },
})