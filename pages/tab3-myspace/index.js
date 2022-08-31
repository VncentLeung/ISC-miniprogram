// pages/my/my.js
Page({

    data: {

    },
    
    updatePassword: function(res){
        wx.navigateTo({
          url: '/pages/tab3-myspace/updatepassword/updatepassword',
        })
    },

    forgetPassword: function(res){
      wx.navigateTo({
        url: '/pages/tab3-myspace/forgetpassword/forgetpassword',
      })
  },


    myinformation: function(res){
      wx.navigateTo({
        url: '/pages/tab3-myspace/myinformation/myinformation',
      })
    }
})