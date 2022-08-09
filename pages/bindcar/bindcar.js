// pages/bindcar/bindcar.js
Page({
    data: {
       carid: "",
    },

  updateBindcar: function(res){
      wx.navigateTo({
        url: '../bindcar/bindcar',
      })
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
  //获取车牌号
  var carid=e.detail.value.account;

  wx.showModal({
    cancelColor: 'cancelColor',
    title: '提示',
    content: '确定绑定该车牌号？',
    success(res){
        if (res.confirm) {
            console.log("用户选择绑定")
            //此处用于传递信息到后端进行绑定


          } else if (res.cancel) {
            wx.switchTab({
              url: '../index/index',
            })
          }
    }
  })
  //传递参数到后端，修改后端数据库
  
}
    
})