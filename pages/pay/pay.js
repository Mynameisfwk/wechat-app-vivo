var json = require('../../data/Home_data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    array: ['不限时送货时间', '工作日送货', '双休日、假日送货'],
    index:0,
    hasAddress: false,
  },
  select:function(e){
    this.setData({
      index:e.detail.value
    })
  },
  goaddress:function(){
    wx.navigateTo({
      url: '../../pages/address/address',
    })
  },

  onShow:function(){
    var _this=this
    wx.getStorage({
      key: 'address',
      success(res) {
        _this.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },

  pay:function(e){
    wx.showModal({
      title: '支付提示',
      content: '本程序仅用于演示，支付接口API已屏蔽！',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var payId = options.id
    var data = json.homeIndex[payId]
    this.setData({
      data:data
    })
  }
})