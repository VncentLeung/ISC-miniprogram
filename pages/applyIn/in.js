const app=getApp();
var globalFun = require('../../utils/util').default;

Page({

    data: {
      name:'',
      learnToWorkID:'',
      reason:'',
      startTime:'',
      endTime:'',
      prove:''
    },
 
    onLoad:function(options){
      console.log('申请对象：'+options.person)
      this.changeView(options.person)
    },
    imgBase64:function(img_url) {
      let res = wx.getFileSystemManager().readFileSync(img_url, 'base64')
      console.log("输出base64",res)
     
      return 'data:image/jpeg;base64,'+res.data
    },
    bindDate1Change: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        startTime: e.detail.value
      })
    },
    bindDate2Change: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        endTime: e.detail.value
      })
    },
    changeView:function(person){

      if(person=='self'){
        this.setData({
          name:app.globalData.userInfo.name,
          learnToWorkId:app.globalData.userInfo.learnToWorkId

        })
      }
      else if(person=='others'){

      }
      else
      {
        console.log('错误')
        wx.reLaunch({
          url: '../tab1-operation/index',
        })
      }
    }
    ,
    reason:function(e){
      this.setData({
        reason:e.detail.value
      })
    },
   verifyForm:function(that){

     if(that.name==''||that.learnToWorkID==''||that.reason==''||that.startTime==''||that.endTime==''||that.prove==''){
        wx:wx.showToast({
       title: '表单不完整，请继续填写',
     })
     return false
     }
    
     else if(that.startTime>=that.endTime){
      wx:wx.showToast({
        title: '截止日期应小于起始日期',
      })
      return false
     }
     else{
       return true
     }

   }
,    formSubmit: function (e) {
      console.log(e)
      var that=this
      if(this.verifyForm(that))
      {
        let formattedTime1=globalFun.formatDate(this.startTime)
        let formattedTime2=globalFun.formatDate(this.endTime)
        let formattedProve=this.imgBase64(this.prove)
         wx.request({
        url: app.globalData.url_11_Apply_Submit_in,
        data:globalFun.json2Form({
          learnToWorkId: this.learnToWorkId,
       
          reason:this.reason,
          prove:formattedProve,
          startTime:formattedTime1,
          endTime:formattedTime2
        }),
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 小程序post所需要的配置信息
        },
        success(res){
          console.log(JSON.stringify(res.data))
          if(res.data.result=='success'){
            wx.showToast({
              title: '提交成功',
              icon: "success",
            })
            setTimeout(() => {
              wx.reLaunch({
                url:'../tab1-operation/index',
              })
            }, 1000);
          }
          else{
            wx.showModal({
               title: '申请提示',
                content:'错误信息'+res.data.message+'\n请联系管理员',
              success: function (res) {
                if (res.confirm) {//这里是点击了确定以后
                  console.log('用户点击确定')
                } else {//这里是点击了取消以后
                  console.log('用户点击取消')
                }
              }
          
            })
         
          }
        }
      })
      }
     
      // wx.showLoading({
      //   title: '申请中',
      //   mask: true,
      // })
      
      //传递参数到后端，判断密码是否正确

      
      //成功则返回首页
      

    setTimeout(() => {
        wx.hideLoading();
     }, 1000);

    setTimeout(() => {
       wx.showToast({
        title: '申请成功',
        icon: "success",
       })
     }, 500);
      
     setTimeout(() => {
        wx.switchTab({
            url: '../index/index',
          })
     }, 1000);
        
    },

    chooseMedia (){
      var that=this;
      wx.chooseMedia({
        count: 1,
        mediaType: ['image','video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success(res) {
          console.log('文件路径'+res.tempFiles[0].tempFilePath)

          that.setData({
            prove:res.tempFiles[0].tempFilePath
          })
          console.log('文件大小:'+res.tempFiles[0].size)
        }
      })
    }
 ,

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
  returnindex: function(res){
      wx.switchTab({
        url: '../index/index',
      })
  }

})