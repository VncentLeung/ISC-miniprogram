// pages/my/my.js
Page({

    data: {

    },
    
    updatePassword: function(res){
        wx.navigateTo({
          url: '/pages/tab3-myspace/updatepassword/updatepassword',
        })
    },

   

    myinformation: function(res){
      wx.navigateTo({
        url: '/pages/tab3-myspace/myinformation/myinformation',
      })
    }
})