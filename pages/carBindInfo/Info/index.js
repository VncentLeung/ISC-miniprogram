// pages/carBindInfo/Info/index.js
const app=getApp()
var globalFun = require('../../../utils/util').default;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    numlist:'暂未绑定车辆信息'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPage()
  },
  initPage:function(){
    var that=this
    wx.request({
      url: app.globalData.url_03_User_CarInfo_Get,
      method:'POST',
      data:globalFun.json2Form({
        learnToWorkId: app.globalData.userInfo.learnToWorkId
      }),
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 小程序post所需要的配置信息
      },
      success:res=>{
        if(res.data.result=='success'){
          console.log('获取信息成功');
          console.log(JSON.stringify(res.data))
          that.setData({
          numlist:res.data.data
        })
        }
        else {
         console.log(JSON.stringify(res)) 
         
          
        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})