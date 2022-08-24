// pages/bindcar/carList/index.js
const app=getApp()
var globalFun = require('../../../utils/util').default;
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    numlist:[]
  },
  pageLifetimes: {
    show: function() {
      this.initPage()
      // 页面被展示  初始化数据的时候操作
      console.log('pageLifetimes执行了show')
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initPage:function(){
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
            this.setData({
            numlist:res.data.data
          })
          }
          else {
           console.log(JSON.stringify(res)) 
           
            
          }
          
        }
      })
    }
  }
})
