
Page({
  data: {
    
  },
  
out: function(res){
  wx.navigateTo({
    url: '../out/out',
  })
},

in: function(res){
  wx.navigateTo({
    url: '../in/in',
  })
},

  bindCar: function(res){
    wx.navigateTo({
      url: '../bindcar/bindcar',
    })
  }
})
