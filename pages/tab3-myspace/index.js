// pages/my/my.js
Page({

    data: {
      photo:'',
      imgUrl:"/images/my.png",
      name:'加载中'
    },
    onLoad(){
     this.getBaseInfo()
    },
    getBaseInfo:function () {
      console.log('同步获取缓存信息')
      var userInfo=wx.getStorageSync('userInfo')
      console.log(userInfo)
      console.log(userInfo.name)
      this.setData({
        photo:userInfo.photo,
        name:userInfo.name
      })
      this.imageFix()
      // wx.getStorageSync({
      //   key:'userInfo',
      //   success:res=>{
      //     console.log(res.data)
      //     if(res.data!=null ){
      //       this.setData({
      //         photo:res.data.photo,
      //         name:res.data.name
      //       })
            
      //     }
            
      //   }
      // }) 
    },
    imageFix:function(){
      var base64 = "data:image/jpg;base64," + this.data.photo;
      var imgPath = wx.env.USER_DATA_PATH + '/e-invoice' + Date.parse(new Date()) + '.jpg';
      var imageData = base64.replace(/^data:image\/\w+;base64,/, "");
      var fs = wx.getFileSystemManager();
      fs.writeFileSync(imgPath, imageData, "base64");
      fs.close();
      this.setData({
        imgUrl: imgPath
      })
     },
    updatePassword: function(res){
        wx.navigateTo({
          url: '/pages/tab3-myspace/updatepassword/updatepassword',
        })
    },
    scan:function () {
      wx.navigateTo({
        url: '/pages/selectlogin/scan/index',
      })
    }
   ,

    myinformation: function(res){
      wx.navigateTo({
        url: '/pages/tab3-myspace/myinformation/myinformation',
      })
    }
})