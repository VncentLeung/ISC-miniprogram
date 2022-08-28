
Page({
  data: {
    
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
