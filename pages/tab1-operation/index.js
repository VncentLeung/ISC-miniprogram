const app=getApp();
Page({
  data: {
    staff:false
  },
  onLoad:function(){
    console.log(String(app.globalData.learnToWorkId).length)
    if(String(app.globalData.learnToWorkId).length<9)
      this.setData({
        staff:true
      })
  },
out: function(res){
  wx.navigateTo({
    url: '../applyOut/out',
  })
},

inSelf: function(res){
  wx.navigateTo({
    url: '../applyIn/in?person=self',
  })
},
inOthers: function(res){
  wx.navigateTo({
    url: '../applyIn/in?person=others',
  })
},

  bindCar: function(res){
    wx.navigateTo({
      url: '../carBindInfo/index',
    })
  }
})
