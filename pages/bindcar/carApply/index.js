// pages/bindcar/carApply/index.js
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
    selected: 0,
    color: "#999999",
    selectedColor: "#032F82",
    list: [
      {
      type: 'text',
      text: "首页"
    }, 
   
    {
      type: 'text',
      text: "我的"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      this.setData({selected: data.index})
      this.triggerEvent("setTab", data.index)
      if(data.index==1)
      wx.switchTab({
        url: '../carApply/index',
      })
      if(data.index==0)
      wx.switchTab({
        url: '../carList/index',
      })
    }
  }
})
