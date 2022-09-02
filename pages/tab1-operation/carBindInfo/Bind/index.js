// pages/carBindInfo/Bind/index.js
const app = getApp();
var globalFun = require('../../../../utils/util').default;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carNum: '',
    newCarNum: '',
    edit: false, //默认不允许编辑
    operation: ''
  },
  onLoad: function (options) {
    this.setData({
      operation: options.operation
    })
    if (options.operation == 'edit_or_delete') {
      this.setData({
        carNum: options.carNumber,
        newCarNum:options.carNumber
      })
    }
  },
  isCarLicense: function (license) {

    if(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/u.exec(license)) {
        return true;
      }

    //匹配民用车牌和使馆车牌
    //判断标准
    //1.第一位为汉子省份缩写
    //2.第二位为大写字母城市编码
    //3.后面是5位仅含字母和数字的组合
    // if (/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新使]{1}[A-Z]{1}[0-9a-zA-Z]{5}$/u.exec(license)) {
    //   return true;
    // }
    // //匹配特种车牌(挂,警,学,领,港,澳)
    // if (/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[0-9a-zA-Z]{4}[挂警学领港澳]{1}$/u.exec(license)) {
    //   return true;
    // }

    // //匹配武警车牌
    // if (/^WJ[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]?[0-9a-zA-Z]{5}$/u.exec(license)) {
    //   return true;
    // }

    // //匹配新能源车辆6位车牌
    // //小型新能源车
    // if (/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[DF]{1}[0-9a-zA-Z]{5}$/u.exec(license)) {
    //   return true;
    // }
    // //大型新能源车
    // if (/[京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新]{1}[A-Z]{1}[0-9a-zA-Z]{5}[DF]{1}$/u.exec(license)) {
    //   return true;
    // }
   else return false;
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if(this.isCarLicense(e.detail.value.input))
    // if (true)
      this.bindRequest(e.detail.value.input)
    else {
      wx.showToast({
        title: '车牌号不符合规范，请检查',
        icon: 'error'
      })
    }
  },
  inputListener: function (e) {
    this.setData({
      newCarNum: e.detail.value
    })
  },
  editButton: function () {
    this.setData({
      edit: true
    })
  },
  editCancelButton: function () {
    this.setData({
      edit: false
    })
  },
  editSubmitButton: function () {
    var that = this;
    if (this.data.carNum != this.data.newCarNum)
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '提示',
        content: '确认修改？',
        success(res) {
          if (res.confirm) {
            console.log("用户选择确认")
            wx.request({
              url: app.globalData.url_12_EditDelete_Auto + that.data.carNum,
              method: 'PUT',
              data: {
                newCarNumber: that.data.newCarNum
              },
              header: {
                'content-type': 'application/json;charset=utf-8',
                'token': app.globalData.token //_问题1 这里可能会有错
              },
              success(res) {
                if (res.data.result == 'success') {
                  //持续显示
                  setTimeout(() => {
                    wx.showToast({
                      title: '修改成功',
                      icon: "success",
                    });
                    setTimeout(() => {
                      wx.hideToast();
                    }, 2000)
                  }, 0);
                  setTimeout(
                    function () {
                      let pages = getCurrentPages(); //获取小程序页面栈
                      let beforePage = pages[pages.length - 2]; //获取上个页面的实例对象
                      // beforePage.setData({ //直接修改上个页面的数据（可通过这种方式直接传递参数）
                      //   txt: '修改数据了'
                      // })
                      // 如果找不到go_update(),可以打印beforePage根据层级调用
                      console.log(beforePage)
                      beforePage.initPage();
        
                      wx.navigateBack({
                        delta: 1 // 返回上一级页面。 
                      })
                    }, 0)
                } else {
                  wx.showModal({
                    cancelColor: 'cancelColor',
                    title: "修改失败",
                    content: res.data.message
                  })
                }
              }
            })
            //此处用于发送数据到后端，传递参数到后端，等待修改结果

            //返回true则跳转到个人页面

            //返回false则提示修改失败

          }
        }
      })
    else {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '提示',
        content: '两次新密码不一致，请检查输入'
      })
    }
  },
  deleteSubmitButton: function () {
    var that = this;
   
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '提示',
        content: '确认解绑车牌：' + that.data.carNum + "?",
        success(res) {
          if (res.confirm) {
            console.log("用户选择确认")
            wx.request({
              url: app.globalData.url_12_EditDelete_Auto + that.data.carNum,
              method: 'delete',
              data: {

              },
              header: {
                'content-type': 'application/json;charset=utf-8',
                'token': app.globalData.token //_问题1 这里可能会有错
              },
              success(res) {
                if (res.data.result == 'success') {
                  //持续显示
                  setTimeout(() => {
                    wx.showToast({
                      title: '解绑成功',
                      icon: "success",
                    });
                    setTimeout(() => {
                      wx.hideToast();
                    }, 2000)
                  }, 0);
                  setTimeout(
                    function () {
                      let pages = getCurrentPages(); //获取小程序页面栈
                      let beforePage = pages[pages.length - 2]; //获取上个页面的实例对象
                      // beforePage.setData({ //直接修改上个页面的数据（可通过这种方式直接传递参数）
                      //   txt: '修改数据了'
                      // })
                      // 如果找不到go_update(),可以打印beforePage根据层级调用
                      console.log(beforePage)
                      beforePage.initPage();
        
                      wx.navigateBack({
                        
                        delta: 1 // 返回上一级页面。 
                      })
                    }, 0)
                } else {
                  wx.showModal({
                    cancelColor: 'cancelColor',
                    title: "解绑失败",
                    content: res.data.message
                  })
                }
              }
            })
            //此处用于发送数据到后端，传递参数到后端，等待修改结果

            //返回true则跳转到个人页面

            //返回false则提示修改失败

          }
        }
      })
   
  },
  bindRequest: function (num) {

    wx.request({
      url: app.globalData.url_12_Add_Auto,
      method: 'POST',
      data: {
        learnToWorkId: app.globalData.learnToWorkId,
        carNumber: num
      },
      header: {
        'content-type': 'application/json;charset=utf-8',
        'token': app.globalData.token // 小程序post所需要的配置信息
      },
      success: function (res) {
        if (res.data.result == 'success') {
          //持续显示
          setTimeout(() => {
            wx.showToast({
              title: '提交成功',
              icon: "success",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 2000)
          }, 0);
          setTimeout(
            function () {

              let pages = getCurrentPages(); //获取小程序页面栈
              let beforePage = pages[pages.length - 2]; //获取上个页面的实例对象
              // beforePage.setData({ //直接修改上个页面的数据（可通过这种方式直接传递参数）
              //   txt: '修改数据了'
              // })
              // 如果找不到go_update(),可以打印beforePage根据层级调用
              console.log(beforePage)
              beforePage.initPage();

              wx.navigateBack({
                delta: 1 // 返回上一级页面。 
              })
            }, 0)
        } else {
          wx.showModal({
            cancelColor: 'cancelColor',
            title: "申请失败",
            content: res.data.message
          })
        }
      }
    })





  },


  /**
   * 生命周期函数--监听页面加载
   */

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