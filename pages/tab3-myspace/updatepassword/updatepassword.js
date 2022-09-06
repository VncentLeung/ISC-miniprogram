const app=getApp();
var globalFun = require('../../../utils/util').default;
var md5Fun=require('../../../utils/md5')
Page({

    data: {
        oldpassword: "",
        newpassword: "",
        repassword: ""
    },
  
    inputOldpassword: function (e) {
      console.log(e)
      this.setData({
        oldpassword: e.detail.value,
      })
      console.log(this.data.oldpassword)
    },
    inputNewpassword: function (e) {
        console.log(e)
        this.setData({
            newpassword: e.detail.value,
        })
        console.log(this.data.newpassword)
    },
    inputRepassword: function (e) {
        console.log(e)
        this.setData({
            repassword: e.detail.value,
        })
        console.log(this.data.repassword)
    },

toMD5:function(str){
  return md5Fun.hexMd5(str + md5Fun.getKey())
},

formSubmit: function (e) {
    var that=this
      console.log(e)
      //获取旧密码
      var oldpassword=e.detail.value.oldpassword;
      //获取新密码
      var newpassword=e.detail.value.newpassword;
      //获取再次输入的密码
      var repassword = e.detail.value.repassword
      console.log('旧密码'+oldpassword)
      console.log('新密码'+newpassword)
      if(repassword==newpassword)
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '提示',
        content: '确认修改？',
        success (res) {
            if (res.confirm) {
              console.log("用户选择确认")
              newpassword=that.toMD5(newpassword)
              oldpassword=that.toMD5(oldpassword)
              wx.request({
                url: app.globalData.url_14_Password_Update+app.globalData.learnToWorkId,
                method:'PUT',
                data:{
                  oldPWD:oldpassword,
                  newPWD:newpassword
                },
                header: {
                  'content-type': 'application/json', 
                  'token': app.globalData.token//_问题1 这里可能会有错
                }
                ,
                success(res){
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
                    },2000)
                  
                  }
                  else
                  wx.showToast({
                    icon:'error',
                    title: res.data.message,
                  })
                }
              })
              //此处用于发送数据到后端，传递参数到后端，等待修改结果

              //返回true则跳转到个人页面
    
              //返回false则提示修改失败

            }
          } 
      })
      else{
        wx.showModal({
          cancelColor: 'cancelColor',
          title:'提示',
          content:'两次新密码不一致，请检查输入'
        })
      }
    },
    
    returnMy: function(res){
        wx.switchTab({
          url: '../my/my',
        })
    }
  })