// pages/historySelf/index.js
const app=getApp();
var globalFun = require('../../utils/util').default;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      selected:-1,
      page:1,
      total:0,
      account: "",
      list:[
        {'inOutFormId':'1',
         'learnToWorkId':'92019101003',
         'reason':'申请的原因是11',
         'startTime':'2022-01-01 11:11:11',
         'endTime': '2022-01-03 11:11:11',
         'applyTime':'2019-12-01 11:11:11',
         'prove':'证明',
         'type':'type字段',
         'auditState':'auditState字段',
         'name':'名字字段3'
         },
        {'inOutFormId':'2',
         'learnToWorkId':'92019101004',
         'reason':'申请的原因是22',
         'startTime':'2022-02-01 11:11:11',
         'endTime': '2022-02-03 11:11:11',
         'applyTime':'2019-12-02 11:11:11',
         'prove':'证明',
         'type':'type字段',
         'auditState':'auditState字段',
         'name':'名字字段4'},
        {
            'inOutFormId': '3',
            'learnToWorkId': '92019101003',
            'reason': '申请的原因是33',
            'startTime': '2022-02-03 11:11:11',
            'endTime': '2022-02-05 11:11:11',
            'applyTime': '2019-12-05 11:11:11',
            'prove': '证明',
            'type': 'type字段',
            'auditState': 'auditState字段',
            'name': '名字字段2'
        },
        {'inOutFormId':'4',
         'learnToWorkId':'92019101004',
         'reason':'申请的原因是44',
         'startTime':'2022-03-01 11:11:11',
         'endTime': '2022-03-05 11:11:11',
         'applyTime':'2019-12-05 11:11:11',
         'prove':'证明',
         'type':'type字段',
         'auditState':'auditState字段',
         'name':'名字字段4'}
    ]
  
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getListInfo()
    },
    clickOpen:function(e){
      if(this.data.selected!=e.target.dataset.id)
      //获取设置的id（即inOutFormId）,用以控制详情展示
      this.setData({
        selected:e.target.dataset.id
      })
      else
      this.setData({
        selected:-1
      })
    },
getListInfo:function() {

      // this.setData({
      //       shipName: wx.getStorageSync('account')
      //     });
      this.setData({page:1});
      var that = this;
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        //此处用于获取后端数据,这里是根据account去后端查，也可以根据其他的，但是storage中没存其他的，只有accoutn
        url: app.globalData.url_13_Get_SelfHistory,
        method:'POST',
        data:globalFun.json2Form({
          learnToWorkId: app.globalData.userInfo.learnToWorkId
        }),
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 小程序post所需要的配置信息
        },
        success (res) {
          if(res.data.result=='success'){
            
          }

        }
      })
    },
  
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      if (this.data.list.length != this.total) {
        this.getListInfo();
      } else {
        wx.showToast({
          title: '没有更多数据',
        })
      }
    },
})