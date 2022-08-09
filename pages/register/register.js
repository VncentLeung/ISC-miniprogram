Page({

  data: {
    account: "",
    password: "",
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

  formSubmit: function (e) {
    console.log(e)
    //获取登录用户名
    var account = e.detail.value.account
    //获取登陆密码
    var password = e.detail.value.password

    //传递参数到后端，判断密码是否正确

    
    //密码正确则登陆成功，进入首页，即申请页面
    wx.switchTab({
      url: '../index/index',
    }) 
    //登陆成功一定要将用户的信息存到磁盘，以便于后面查询个人信息时通过用户名查询
    wx.setStorageSync('account', account)
    wx.setStorageSync('password', password)
    
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