// pages/my/my.js
Page({
    data: {
        photo: "/images/my.png",
        name: "李小红",
        sex: "男",
        xuehao: "1917000049",
        idcard: "52242619990101833X",
        xueyuan: "计算机科学与技术",
    },
    /**
      * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
         //此处通过从磁盘读取登陆时所用的用户名，到数据库提取个人信息
        var account=wx.getStorageSync('account')
         var that=this;
        //此处设计request获取数据库的个人信息

        //获取到内容在此处复制给即将显示的页面
         that.setData({
            
         })

    },
    onShow: function (options) {
        //此处通过从磁盘读取登陆时所用的用户名，到数据库提取个人信息
        var account=wx.getStorageSync('account')
         var that=this;
        //此处设计request获取数据库的个人信息

        //获取到内容在此处复制给即将显示的页面
         that.setData({
            
         })
   },

   logout: function(res){
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '提示',
        content: '确定退出？',
        confirmText: '确认',
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../register/register',
          })
        }
        else if(res.cancel){
          wx.switchTab({
            url: '../my/my',
          })
        }
       }
      })
   },
   
})