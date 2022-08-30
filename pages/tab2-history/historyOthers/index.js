// pages/historyOthers/index.js
const app=getApp();
var globalFun = require('../../../utils/util').default;
Page({

    /**
     * 页面的初始数据
     */
    data: {
      selected:-1,
      pageScoll:0,
      total:0,
      account: "",
      list:[
        {'applyFormId':'1',
         'learnToWorkId':'000',
         'reason':'无',
         'startTime':'',
         'endTime': '',
         'applyTime':'无数据 请检查是否出错',
         'nucleicAcidProof':'核酸结果','phone':'照片','healthCode':'健康码','destination':'目的地',
'relation':'关系','carNumber':'车牌号','idCard':'身份证号',
           
         'auditState':'状态',
         'realName':'姓名'
         },
        {'applyformId':'2',
        'learnToWorkId':'000',
        'reason':'无',
        'startTime':'',
        'endTime': '',
        'applyTime':'无数据 请检查是否出错',
        'nucleicAcidProof':'核酸结果','phone':'照片','healthCode':'健康码','destination':'目的地',
'relation':'关系','carNumber':'车牌号','idCard':'身份证号',
          
        'auditState':'状态',
        'realName':'姓名'}
    ]
    },
    onLoad: function (options) {
         this.getListInfo()
    },
    clickOpen:function(e){
      console.log(e)
      if(this.data.selected!=e.target.dataset.id)
      //获取设置的id（即applyformId）,用以控制详情展示
      this.setData({
        selected:e.target.dataset.id
      })
      else
      this.setData({
        selected:-1
      })
    },
getListInfo:function() {

 
      var that = this;
      // wx.showLoading({
      //   title: '加载中',
      // })
      console.log(app.globalData.learnToWorkId)
      wx.request({
        //此处用于获取后端数据,这里是根据account去后端查，也可以根据其他的，但是storage中没存其他的，只有accoutn
        url: app.globalData.url_13_Get_OthersHistory,
        method:'POST',
        data:{learnToWorkId: app.globalData.learnToWorkId,
          applyFormId:"",
          reason:"",
          startTime:"",
          endTime:"",
          idCard:"",
          realName:"",
          type:"",
          relation:"",
          destination:"",
          carNumber:"",
          phone:"",
          nucleicAcidProof:"",
          healthCode:"",
          photo:""
        }
          
        ,
        header: {
          // 小程序post所需要的配置信息
          'content-type': 'application/json',
          'token':app.globalData.token
        },
        success (res) {
          if(res.data.result=='success'){
            
            var listFormatted=res.data.data;
            console.log('listFormatted-1')
            console.log(listFormatted)
             globalFun.base64toImg(listFormatted)
            console.log('listFormatted-2')
            console.log(listFormatted)
            that.setData({
              list:listFormatted
            })

          }
          else{
            wx.showToast({
              title: '错误,尝试联系管理员',
              icon:'error'
            })
          }

        }
        
      })
    },
  
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      if (this.data.pageScoll<5) {
        this.getListInfo();
        this.setData({
          pageScoll:pageScoll+1
        })
      } else {
        wx.showToast({
          title: '没有更多数据',
          icon:"none"
        })
      }
    },
})