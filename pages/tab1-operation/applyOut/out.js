const app=getApp();
var globalFun = require('../../../utils/util').default;

Page({

    data: {
      name:'',
      learnToWorkId:'',
      reason:'',
      startTime:'',
      endTime:'',
      prove:'',
    },
 
    onLoad:function(options){
      this.initView()
      // console.log('申请对象：'+options.person)
      // this.changeView(options.person)
    },
    imgBase64:function(img_url) {
      let res = wx.getFileSystemManager().readFileSync(img_url, 'base64')
      console.log("输出base64",res.data)
     
      return 'data:image/jpeg;base64,'+res.data
    },
     imgToBase64: function(img_url){
      
      wx.getFileSystemManager().readFileSync({
        filePath:img_url,
        encoding:"base64",
        success:(res)=>{
             img64='data:image/jpeg;base64,' + res.data
             console.log(img64)  
            
             //这里有问题2
        }
      })
     return img64;
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
    initView:function(){
      this.setData({
        name:app.globalData.userInfo.name,
        learnToWorkId:app.globalData.userInfo.learnToWorkId,
      })
    },
    changeView:function(person){

      if(person=='self'){
        this.setData({
          name:app.globalData.userInfo.name,
          learnToWorkId:app.globalData.userInfo.learnToWorkId,
          selfOrOthersApply:true
        })
      }
      else if(person=='others'){
          this.setData({
            selfOrOthersApply:false
          })
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

     if(that.data.name==''||that.data.learnToWorkId==''||that.data.reason==''||that.data.startTime==''||that.data.endTime==''||that.data.prove==''){
      console.log(
        that.data.name+that.data.learnToWorkId+that.data.reason+that.data.startTime+that.data.endTime+that.data.prove
       )
        wx:wx.showToast({
       title: '表单不完整，请继续填写',
       
     })
     return false
     }
    
     else if(that.data.startTime>=that.data.endTime){
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
        let formattedTime1=globalFun.formatDate(this.data.startTime)
        let formattedTime2=globalFun.formatDate(this.data.endTime)
        console.log('图片地址：'+this.data.prove)
        //问题处
        // let formattedProve= this.imgToBase64(this.data.prove)
        let formattedProve= wx.getFileSystemManager().readFileSync(this.data.prove,'base64')
        // formattedProve='data:image/jpeg;base64,'+formattedProve
        console.log('_调试：formattedProve'+formattedProve)
         wx.request({
        url: app.globalData.url_11_Apply_Submit_in,
        method:'POST',
        data:{
          learnToWorkId: this.data.learnToWorkId,
          reason:this.data.reason,
          prove:formattedProve,
          startTime:formattedTime1,
          endTime:formattedTime2,
          flag:false,
          type:"出校"
        },
        header: {
          'content-type': 'application/json',
            'token': app.globalData.token // 小程序post所需要的配置信息
        },
        success(res){
          console.log(JSON.stringify(res.data))
          if(res.data.result=='success'){
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

    chooseMedia (){
      var that=this;
      wx.chooseMedia({
        count: 1,
        mediaType: ['image','video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        camera: 'back',
        success:(res)=> {
          console.log('文件路径'+res.tempFiles[0].tempFilePath)
          this.setData({
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