// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    code: ''
  },
  onLoad(){
    var that=this
    wx.login({
      success(res){
        wx.setStorageSync('code3', res.code)
       that.setData({
         code:res.code
       })
       console.log(res.code)
     }
    })
  },
  scan:function(e){
    wx.scanCode({
      onlyFromCamera: false,
      success(res){
        console.log(res)
        var token=res.result
        var code=wx.getStorageSync('code3')
        wx.setStorageSync('token', token) 
        console.log(token)
        console.log(code)
        wx.request({
          url: 'http://192.168.1.109:9090/user/codeLogin',
          method:"POST",
          data:{
               token: token,
               code: code
          },
          success: function(res){
            console.log(res)
            if(res.data.data){
              console.log("已绑定，无需绑定")
              wx.showModal({
                cancelColor: 'cancelColor',
                title: '提示',
                content: '登录成功'
              })
            }
            else{
              console.log('未绑定')
              wx.navigateTo({
                url: '../scan/fail/fail',
              })
            }
          },
        
        })
      }
    })
  }
})
  
  

