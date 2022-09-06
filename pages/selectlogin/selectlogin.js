// pages/selectlogin/selectlogin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    // register: function(res){
    //     wx.navigateTo({
    //       url: './register/register',
    //     })
    // },

    registerbywechat: function(res){
        wx.navigateTo({
          url: './registerbywechat/registerbywechat',
        })
    },

    scan: function(res){
      wx.navigateTo({
        url: './scan/index',
      })
    }
   
})