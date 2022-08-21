Page({

    data: {

    },
 
    formSubmit: function (e) {
      console.log(e)
      //获取出校原因
      var reason = e.detail.value.reason
      //获取出校目的地
      var  destination= e.detail.value.destination
      //获取出校时间
      var outtime=e.detail.value.outtime
      //获取相关证明
      var promise=e.detail.value.promise
     
      wx.showLoading({
        title: '申请中',
        mask: true,
      })

      //传递参数到后端，判断密码是否正确

      
      //成功则返回首页
      

    setTimeout(() => {
        wx.hideLoading();
     }, 1000);

    setTimeout(() => {
       wx.showToast({
        title: '申请成功',
        icon: "success",
       })
     }, 500);
      
     setTimeout(() => {
        wx.switchTab({
            url: '../index/index',
          })
     }, 1000);
        
    },

  returnindex: function(res){
      wx.switchTab({
        url: '../index/index',
      })
  }

})