// pages/bindcar/carList/index.js
import{
  Http
}from '../../../utils/util.js'
const app=getApp()
var globalFun = require('../../../utils/util').default;

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在 methods 段中定义的方法名
    attached: function () {this.initPage },
    moved: function () {this.initPage },
    detached: function () { this.initPage},
  },

  // behavior:  ['wx://component-export'],

  // export : {
  //    initPage()
  // },
  /**
   * 组件的初始数据
   */
  getList:function(){
    this.initPage()
  },
  data: {
    numlist:'无'
  },
  pageLifetimes: {
    show: function() {
      this.initPage()
      // 页面被展示  初始化数据的时候操作
      console.log('pageLifetimes执行了show')
    },
    hide: function() {
      this.initPage
    },
    resize: function(size) {
      this.initPage
    }
  },
 
  /**
   * 组件的方法列表
   */
  methods: {
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
     getList: async function(){
      var list
      await Http.asyncRequest(
        app.globalData.url_03_User_CarInfo_Get,
        'POST',{
          learnToWorkId: app.globalData.userInfo.learnToWorkId
        },
        res=>{
          console.log(res);
          list=res.data.data
          console.log('_调试3:调试成功')
        }
      )
      this.setData({
          numlist:list
      })
    }
  }
})
