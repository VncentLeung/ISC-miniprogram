const app=getApp();
var globalFun = require('../../utils/util').default;

Page({

    data: {
        oldpassword: "",
        newpassword: "",
        repassword: ""
    },
  
    inputOldpassword: function (e) {
      console.log(e)
      this.setData({
        oldpassword: e.detail.value,
      })
      console.log(this.data.oldpassword)
    },
    inputNewpassword: function (e) {
        console.log(e)
        this.setData({
            newpassword: e.detail.value,
        })
        console.log(this.data.newpassword)
    },
    inputRepassword: function (e) {
        console.log(e)
        this.setData({
            repassword: e.detail.value,
        })
        console.log(this.data.repassword)
    },
  
formSubmit: function (e) {
      console.log(e)
      //获取旧密码
      var oldpassword=e.detail.value.oldpassword;
      //获取新密码
      var newpassword=e.detail.value.newpassword;
      //获取再次输入的密码
      var repassword = e.detail.value.repassword
  
      if(repassword==newpassword)
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '提示',
        content: '确认修改？',
        success (res) {
            if (res.confirm) {
              console.log("用户选择确认")
              wx.request({
                url: app.globalData.url_14_Password_Update+'/'+app.globalData.userInfo.learnToWorkId,
                method:'PUT',
                data:globalFun.json2Form({
                  oldPWD:oldpassword,
                  newPWD:newpassword
                }),
                header: {
                  'content-type': 'application/json'//_问题1 这里可能会有错
                }
                ,
                success(res){
                  if(res.data.result=='success'){
                    wx.showToast({
                      title: '修改成功！',
                    })
                  
                  }
                  else
                  wx.showToast({
                    icon:'error',
                    title: res.data.message,
                  })
                }
              })
              //此处用于发送数据到后端，传递参数到后端，等待修改结果

              //返回true则跳转到个人页面
    
              //返回false则提示修改失败

            }
          } 
      })
      else{
        wx.showModal({
          cancelColor: 'cancelColor',
          title:'提示',
          content:'两次新密码不一致，请检查输入'
        })
      }
    },
    
    returnMy: function(res){
        wx.switchTab({
          url: '../my/my',
        })
    }
  })