// pages/my/my.js
Page({

    data: {

    },
    
    updatePassword: function(res){
        wx.navigateTo({
          url: '../updatepassword/updatepassword',
        })
    },

    myinformation: function(res){
      wx.navigateTo({
        url: '../myinformation/myinformation',
      })
    }
})