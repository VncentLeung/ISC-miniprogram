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
  
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '提示',
        content: '确认修改？',
        success (res) {
            if (res.confirm) {
              console.log("用户选择确认")

              //此处用于发送数据到后端，传递参数到后端，等待修改结果

              //返回true则跳转到个人页面
    
              //返回false则提示修改失败

            }
          } 
      })
    },
    
    returnMy: function(res){
        wx.switchTab({
          url: '../my/my',
        })
    }
  })