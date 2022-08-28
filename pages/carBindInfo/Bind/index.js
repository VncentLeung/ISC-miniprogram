// pages/carBindInfo/Bind/index.js
const app=getApp();
var globalFun = require('../../../utils/util').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNum:''
  },
  isCarLicense:function(license){
    //匹配民用车牌和使馆车牌
    //判断标准
    //1.第一位为汉子省份缩写
    //2.第二位为大写字母城市编码
    //3.后面是5位仅含字母和数字的组合
    if(/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新使]{1}[A-Z]{1}[0-9a-zA-Z]{5}$/u.exec(license)){
      return true;
    }
    //匹配特种车牌(挂,警,学,领,港,澳)
    if(/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[0-9a-zA-Z]{4}[挂警学领港澳]{1}$/u.exec(license)){
      return true;
    }
   
    //匹配武警车牌
    if(/^WJ[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]?[0-9a-zA-Z]{5}$/u.exec(license)){
      return true;
    }

    //匹配新能源车辆6位车牌
    //小型新能源车
    if(/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[DF]{1}[0-9a-zA-Z]{5}$/u.exec(license)){
      return true;
    }
    //大型新能源车
    if(/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[0-9a-zA-Z]{5}[DF]{1}$/u.exec(license)){
      return true;
    }
    return false;
},
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if(this.isCarLicense(e.detail.value.input))
      this.bindRequest(e.detail.value.input)
    else{
      wx.showToast({
        title: '车牌号不符合规范，请检查',
        icon:'error'
      })
    }
  },

  bindRequest:function(num){
    wx.request({
      url: app.globalData.url_12_Add_Auto,
      method:'POST',
      data:globalFun.json2Form({
        learnToWorkId: app.globalData.userInfo.learnToWorkId,
        carNumber:num
      }),
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 小程序post所需要的配置信息
      },
      success:function(res){
        if(res.data.result=='success'){
          wx.showToast({
            title: '申请成功',
          })

          setTimeout(
            function(){
              wx.navigateBack({ delta: 1 // 返回上一级页面。 
              })
          },1000)
        }
        else{
          wx.showToast({
            title: '申请失败，请检查车牌号是否正确',
            icon:'error'
          })
        }
        }
      })
    
  
      
        
      
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  inputVerify: function (e) {
    let item = e.currentTarget.dataset.model;
    this.setData({
     [item]: e.detail.value
    });
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