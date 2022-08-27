// pages/carInfoBinding/index.js
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
    currentTab: 0,
    tab1show:true,
    tab2show:true
  },
  onShow(){
    this.setData({
      tab1show:true,
      tab2show:true,
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      console.log(e)
      let tab = e.currentTarget.id
      if (tab === 'tableft') {
       this.setData({ currentTab: 0 })
       this.setData({tab1show:false})
       this.setData({tab1show:true})
      //  const child = this.selectComponent('#carlist')
       
      } else if (tab === 'tabright') {
       this.setData({ currentTab: 1 })
       this.setData({tab2show:false})
       this.setData({tab2show:true})
      }
     }
  }
})
