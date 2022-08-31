Page({

    data: {
        account: "",
        name: "",
        idcard: "",
    },
  
    inputName: function (e) {
      console.log(e)
      this.setData({
        name: e.detail.value,
      })
      console.log(this.data.name)
    },
    inputIdcard: function (e) {
        console.log(e)
        this.setData({
          idcard: e.detail.value,
        })
        console.log(this.data.idcard)
    },
    inputAccount: function (e) {
        console.log(e)
        this.setData({
          account: e.detail.value,
        })
        console.log(this.data.account)
    },
  
    formSubmit: function (e) {
      console.log(e)
      //获取账号
      var account=e.detail.value.account;
      //获取身份证号
      var idcard=e.detail.value.idcard;
      //获取姓名
      var name = e.detail.value.name
  
      //传递参数到后端，向教师报告，等待结果
      wx.showLoading({
        title: '忘记密码处理中',
        mask: true,
      }) 
      setTimeout(() => {
        wx.hideLoading();
     }, 1000);
      
      //修改成功则返回重新登录
      setTimeout(() => {
         wx.showToast({
              title: '重置密码成功',
              mask: true,
              icon: 'success',
              duration: 2000
          });
      }, 500);
      setTimeout(()=> {
        wx.navigateTo({
          url: '../register/register',
        })
      }, 1000)
    },

  returnLogin: function(res){
      wx.navigateTo({
        url: '../register/register',
      })
      }
  })