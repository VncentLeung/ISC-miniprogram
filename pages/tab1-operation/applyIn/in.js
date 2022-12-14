const app = getApp();
var globalFun = require('../../../utils/util').default;

Page({

  data: {
    name: '',
    learnToWorkId: '',
    reason: '',
    startTime: '',
    endTime: '',
    prove: '',
    selfOrOthersApply: '',


    realName: '',
    idCard: '',
    nucleicAcidProof: '',
    phone: '',
    photo: '',
    destination: '',
    healthCode: '',
    relation: '',
    carNumber: '',
  },

  onLoad: function (options) {
    console.log('申请对象：' + options.person)
    this.changeView(options.person)
  },
  bindDate1Change: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },
  bindDate2Change: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },
  changeView: function (person) {

    if (person == 'self') {
      this.setData({
        name: app.globalData.userInfo.name,
        learnToWorkId: app.globalData.userInfo.learnToWorkId,
        selfOrOthersApply: true
      })
    } else if (person == 'others') {

      this.setData({
        name: app.globalData.userInfo.name,
        learnToWorkId: app.globalData.userInfo.learnToWorkId,
        selfOrOthersApply: false
      })
    } else {
      console.log('错误')
      wx.reLaunch({
        url: '../tab1-operation/index',
      })
    }
  },
  reason: function (e) {
    this.setData({
      reason: e.detail.value
    })
  },
  realName: function (e) {
    this.setData({
      realName: e.detail.value
    })
  },
  destination: function (e) {
    this.setData({
      destination: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  idCard: function (e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  carNumber: function (e) {
    this.setData({
      carNumber: e.detail.value
    })
  },

  async  imgToBase64(img) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader()
      reader.readAsDataURL(img.raw)
      reader.onload = (e) => {
        const result = String(e.target.result).replace(
          'data:image/jpeg;base64,',
          ''
        )
        resolve(result)
      }
    })
  },



  verifyForm: function (that) {

    if (that.data.learnToWorkId == ''  || that.data.startTime == '' || that.data.endTime == '' || !(that.data.prove != '' || that.data.photo != '')) {
      console.log(
        that.data.name + that.data.learnToWorkId + that.data.reason + that.data.startTime + that.data.endTime + that.data.prove
      )
      wx: wx.showToast({
        title: '表单不完整，请继续填写',

      })
      return false
    } else if (that.data.startTime >= that.data.endTime) {
      wx: wx.showToast({
        title: '截止日期应小于起始日期',
      })
      return false
    }
    else if(!globalFun.checkIdCard(that.data.idCard))
    {
      wx: wx.showToast({
        title: '请检查身份证格式！',
      })
      return false
    }
    else if(!globalFun.checkPhone(that.data.phone)){
      wx: wx.showToast({
        title: '请检查手机号格式！',
      })
      return false
    }
    else  {
      return true
    }
  },
  formSubmit: function (e) {
    console.log(e)
    var that = this
    if (this.verifyForm(that)) {
      let formattedTime1 = globalFun.formatDate(this.data.startTime)
      let formattedTime2 = globalFun.formatDate(this.data.endTime)
      console.log('图片地址：' + this.data.prove)
  
      //格式化证明
      var formattednucleicAcidProof = ''
      var formattedProve = ''
      var formattedPhoto = ''
      var formattedhealthCode = ''

      if (that.data.selfOrOthersApply) {
        formattedProve = wx.getFileSystemManager().readFileSync(this.data.prove, 'base64')
        console.log('_调试：formattedProve' + formattedProve)
      } else {
        formattedPhoto = wx.getFileSystemManager().readFileSync(this.data.photo, 'base64')
        // formattedPhoto = 'data:image/jpeg;base64,' + formattedPhoto
        // _错误1
        if (this.data.healthCode != '') {
          formattedhealthCode = wx.getFileSystemManager().readFileSync(this.data.healthCode, 'base64')
        }
        if (this.data.nucleicAcidProof != '') {
          formattednucleicAcidProof = wx.getFileSystemManager().readFileSync(this.data.nucleicAcidProof, 'base64')
        }
      }
      if (that.data.selfOrOthersApply)
        wx.request({
          url: app.globalData.url_11_Apply_Submit_in,
          method: 'POST',
          data: {
            learnToWorkId: this.data.learnToWorkId,
            reason: this.data.reason,
            prove: formattedProve,
            startTime: formattedTime1,
            endTime: formattedTime2,
            flag:false,
            type:"入校"
          },
          header: {
            'content-type': 'application/json',
            'token': app.globalData.token  // 小程序post所需要的配置信息
          },
          success(res) {
            console.log(JSON.stringify(res.data))
            if (res.data.result == 'success') {
              //返回上一级
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
                function(){
                  wx.navigateBack({ delta: 1 // 返回上一级页面。 
                  })
              },0)
            } else {
              wx.showModal({
                title: '申请提示',
                content: '错误信息' + res.data.message + '\n请联系管理员',
                success: function (res) {
                  if (res.confirm) { //这里是点击了确定以后
                    console.log('用户点击确定')
                  } else { //这里是点击了取消以后
                    console.log('用户点击取消')
                  }
                }

              })

            }
          }
        })
      else {
        wx.request({
          url: app.globalData.url_11_Apply_Submit_ex,
          method: 'POST',
          data:{
            learnToWorkId: this.data.learnToWorkId,
            idCard:this.data.idCard,
            realName: this.data.realName,
            reason: this.data.reason,
            startTime: formattedTime1,
            endTime: formattedTime2,
            relation: this.data.relation,
            carNumber: this.data.carNumber,
            destination:this.data.destination,
            phone:this.data.phone,
            healthCode: formattedhealthCode,
            photo: formattedPhoto,
            nucleicAcidProof: formattednucleicAcidProof,

          },
          header: {
             'content-type': 'application/json', 
            'token': app.globalData.token
            // 小程序post所需要的配置信息
          },
          success(res) {
            console.log(JSON.stringify(res.data))
            if (res.data.result == 'success') {
              //返回上一级
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
                function(){
                  wx.navigateBack({ delta: 1 // 返回上一级页面。 
                  })
              },2000)
            } else {
              wx.showModal({
                title: '申请提示',
                content: '错误信息' + res.data.message + '\n请联系管理员',
                success: function (res) {
                  if (res.confirm) { //这里是点击了确定以后
                    console.log('用户点击确定')
                  } else { //这里是点击了取消以后
                    console.log('用户点击取消')
                  }
                }

              })

            }
          }
        })
      }
    }

    // wx.showLoading({
    //   title: '申请中',
    //   mask: true,
    // })

    //传递参数到后端，判断密码是否正确


    //成功则返回首页


    // setTimeout(() => {
    //     wx.hideLoading();
    //  }, 1000);

    // setTimeout(() => {
    //    wx.showToast({
    //     title: '申请成功',
    //     icon: "success",
    //    })
    //  }, 500);

    //  setTimeout(() => {
    //     wx.switchTab({
    //         url: '../index/index',
    //       })
    //  }, 1000);

  },

  chooseMedia: function (e) {
    var that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        console.log('文件路径' + res.tempFiles[0].tempFilePath)
        console.log(e)
        console.log(e.currentTarget.id)
        const _fileName = e.currentTarget.id
        this.setData({
          [_fileName]: res.tempFiles[0].tempFilePath
        })


        console.log('文件大小:' + res.tempFiles[0].size)
      }
    })
  },




  // upLoadMedia(){
  // 	wx.request({
  //   		url: '你的接口', 
  //   		data: {
  //    			img:this.prove,//转base64后的字符串
  //   		},
  //  		 header: {
  //    		 'content-type': 'application/json' 
  //   		},
  //   		success (res) {
  //     		console.log(res.data)
  //   		}
  // 	})
  // }
  // ,
  returnindex: function (res) {
    wx.switchTab({
      url: '/pages/tab1-operation/index',
    })
  }

})