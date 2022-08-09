// pages/myhistory/myhistory.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    total:0,
    account: "",
    list:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getListInfo()
  },

getListInfo:function() {

    this.setData({
          shipName: wx.getStorageSync('account')
        });
    this.setData({page:1});
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      //此处用于获取后端数据,根据本人account去查找我为他人申请历史，但是我不知道后端是不是根据某个状态来查，还是说根据account
      url: url,
      success (res) {
        wx.hideLoading();
        console.log(that.data.page)
        if(that.data.page == 1) {
          //如果页数为1，则继续将得到的数据加入list
          that.setData({
            list: res.data.data.data
          })
        } else {
          var itemList = that.data.list;
          console.log(res.data.data.data)
          that.setData({
            list: itemList.concat(res.data.data.data)
          })
        } 
        that.setData({page: that.data.page+1});
        that.setData({total:res.data.data.total});
        console.log(res.data.data.data)
      },
      fail: function (res) {
        wx.hideLoading()
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
