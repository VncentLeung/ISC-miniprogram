// index.js
// 获取应用实例
var app = getApp()

Page({
  data: {
    code: '',
    success:true//_调试
  },
  onLoad(){
    var that=this
    wx.login({
      success(res){
       that.setData({
         code:res.code
       })
       console.log(res.code)
       that.scan()
     }
    })
  },
  scan:function(e){
    var that=this
    wx.scanCode({
      onlyFromCamera: false,
      success(res){
        console.log(res)
        var token=res.result
        app.globalData.token=token
        //第一次存放token
        // wx.setStorageSync('token', token) 
        console.log(token)
        console.log('第二次输出：code'+that.data.code)
        wx.request({
          url: app.globalData.url_00_Scan_Login,
          method:"POST",
          data:{
               token: token,
               code: that.data.code
          },
          success: function(res){
            console.log(res)
            if(res.data.data){
              console.log("已绑定，无需绑定")
              that.setData({
                success:true
              })
              wx.showModal({
                cancelColor: 'cancelColor',
                title: '提示',
                content: '登录成功'
              })
            }
            else{

              console.log('未绑定')
              wx.navigateTo({
                url: '/pages/selectlogin/scan/fail/fail',
                
              })
            }
          },
        
        })
      }
    })
  }
})
  
  

