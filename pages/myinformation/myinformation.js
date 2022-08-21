// pages/my/my.js
const app=getApp();
var globalFun = require('../../utils/util').default;

Page({
    data: {
        photo: "/images/my.png",
        name: "未获取到信息",
        state: "未获取到信息",
        learnToWorkId: "未获取到信息",
        idCard: "未获取到信息",
        departId: "未获取到信息",
    },
    /**
      * 生命周期函数--监听页面加载
    */
    onLoad: function (options) {
         //此处通过从磁盘读取登陆时所用的用户名，到数据库提取个人信息
        // var account=wx.getStorageSync('account')
        //  var that=this;
        // //此处设计request获取数据库的个人信息
        this.getInfo(this);
        // //获取到内容在此处复制给即将显示的页面
        //  that.setData({
            
        //  })

    },
    onShow: function (options) {
        //此处通过从磁盘读取登陆时所用的用户名，到数据库提取个人信息
        // var account=wx.getStorageSync('account')
        //  var that=this;
        // //此处设计request获取数据库的个人信息

        // //获取到内容在此处复制给即将显示的页面
        //  that.setData({
            
        //  })
   },
   getInfo(that){
      wx.request({
        url: app.globalData.url_02_User_Get,
        method:'POST',
        data:globalFun.json2Form({
          learnToWorkId: app.globalData.userInfo.learnToWorkId
        }),
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 小程序post所需要的配置信息
        },
        success(res){
          if(res.data.result=='success'){
            console.log('获取信息成功');
            console.log(JSON.stringify(res.data))
            that.setData({
            learnToWorkId:res.data.data.learnToWorkId,
            name:res.data.data.name,
            idCard:res.data.data.idCard,
            departId:res.data.data.departId,
            state:res.data.data.state,
            facialFeature:res.data.data.facialFeature,
            photo:res.data.data.photo,
          })
          }
          else {
           console.log(JSON.stringify(res)) 
           console.log('获取的学工号为'+app.globalData.userInfo.learnToWorkId)
          }
          
        }
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
          app.globalData.userInfo=null;
          wx.reLaunch({//关闭页面 跳转回登录
            url: '../selectlogin/selectlogin',
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