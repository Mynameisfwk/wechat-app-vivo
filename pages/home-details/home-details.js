var json = require('../../data/Home_data.js')

Page({
  data:{
    HomeIndex:0
  },
  goPay:function(e){
    var Id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/pay/pay?id=' + Id
    })
  },
  boxtwo: function (e) {
    var index = parseInt(e.currentTarget.dataset.index) 
    this.setData({
      HomeIndex: index
    })
  },
  addcart: function (e) {
    var cartItems = wx.getStorageSync("cartItems") || []
    var exist = cartItems.find(function (el) {
      return el.id == e.target.dataset.id
    })

    //如果购物车里面有该商品那么他的数量每次加一
    if (exist){
      exist.value = parseInt(exist.value) + 1
    }else{
      cartItems.push({
        id: e.target.dataset.id,
        title:e.target.dataset.title,
        image: e.target.dataset.image,
        price: e.target.dataset.price,
        value:1,
        selected:true
      })
    }

    wx.showToast({
      title: "加入购物车成功！",
      duration: 1000
    })
        
    //更新缓存数据
    wx.setStorageSync("cartItems", cartItems)

  },

  onLoad: function (option){
    var homeid = option.id
    var Homedata = json.homeIndex[homeid];
    this.setData({
      data: Homedata
    })
  }

})