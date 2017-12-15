var json = require('../../data/Home_data.js')

Page({
  data: {
    cartItems:[],
    total:0,
    CheckAll:true
  },
  onLoad:function(e){
    
  },
   onShow: function () {
     var cartItems = wx.getStorageSync("cartItems")
     this.setData({
       cartList: false,
       cartItems: cartItems
     })
     this.getsumTotal()
     
   },

  //选择
   select:function(e){
    var CheckAll = this.data.CheckAll;
    CheckAll = !CheckAll
    var cartItems = this.data.cartItems

    for(var i=0;i<cartItems.length;i++){
      cartItems[i].selected = CheckAll
    }

    this.setData({
      cartItems: cartItems,
      CheckAll: CheckAll
    })
    this.getsumTotal()
   },
   add:function (e) {
     var cartItems = this.data.cartItems   //获取购物车列表
     var index = e.currentTarget.dataset.index //获取当前点击事件的下标索引
     var value = cartItems[index].value  //获取购物车里面的value值
     
     value++
     cartItems[index].value = value;
     this.setData({
       cartItems: cartItems
     });
     this.getsumTotal()
     
     wx.setStorageSync("cartItems", cartItems)  //存缓存
   },
   
    //减
   reduce: function (e){
     var cartItems = this.data.cartItems  //获取购物车列表
     var index = e.currentTarget.dataset.index  //获取当前点击事件的下标索引
     var value = cartItems[index].value  //获取购物车里面的value值

    if(value==1){
       value --
       cartItems[index].value = 1
     }else{
       value --
       cartItems[index].value = value;
     }
     this.setData({
       cartItems: cartItems
     });
     this.getsumTotal()
     wx.setStorageSync("cartItems", cartItems)
   },
  
    // 选择
   selectedCart:function(e){
     
    var cartItems = this.data.cartItems   //获取购物车列表
    var index = e.currentTarget.dataset.index;  //获取当前点击事件的下标索引
    var selected = cartItems[index].selected;    //获取购物车里面的value值

    //取反
    cartItems[index].selected =! selected;
    this.setData({
      cartItems: cartItems
    })
    this.getsumTotal();   
    wx.setStorageSync("cartItems", cartItems)
   },

  
   

   //删除
   shanchu:function(e){
     var cartItems = this.data.cartItems  //获取购物车列表
     var index = e.currentTarget.dataset.index  //获取当前点击事件的下标索引
     cartItems.splice(index,1)
     this.setData({
       cartItems: cartItems
     });
     if (cartItems.length) {
       this.setData({
         cartList: false
       });
     }
     this.getsumTotal()
     wx.setStorageSync("cartItems", cartItems)
   },

      //提示
   go:function(e){
     this.setData({
       cartItems:[]
     })
     wx.setStorageSync("cartItems", [])
   },


   //合计
   getsumTotal: function () {
     var sum = 0
     for (var i = 0; i < this.data.cartItems.length; i++) {
       if (this.data.cartItems[i].selected) {
         sum += this.data.cartItems[i].value * this.data.cartItems[i].price
       }
     }
     //更新数据
     this.setData({
       total: sum
     })
   },
})