# 微信小程序-vivo商城

## 项目说明
最近微信小程序也是挺火的了，看了微信官方文档语法和vue.js有点相似，正好学过vue 也用vue写过一个商城项目，就尝试用小程序写个商城，一般来说你学过vue.js写个小程序那是很简单的，小程序和vue.js无非就是路由跳转、传参、传数据.

如果你想学vue.js可以来看看我用vue.js写的一个商城项目 [地址点这里](https://github.com/Mynameisfwk/vivo-shop)</br>
刚出来的快应用，可以看看我写的商城项目 [地址点这里](https://github.com/Mynameisfwk/shop-quickapp)<br>
运行需要安装微信开发者工具，在开发者工具中打开该项目则可预览 [下载地址](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)</br>
另外：微信小程序商城，长期维护版本更新，欢迎大家踊跃 [提出建议](http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=dkRERU9AQ0FAQ0I2BwdYFRkb)



## 目录结构
* data — 存放本地数据
* image — 图片
* pages — 项目页面文件

## 项目截图
![](https://github.com/Mynameisfwk/wechat-app-vivo/blob/master/image/1.0.gif)
![](https://github.com/Mynameisfwk/wechat-app-vivo/blob/master/image/1.png)
![](https://github.com/Mynameisfwk/wechat-app-vivo/blob/master/image/2.png)
![](https://github.com/Mynameisfwk/wechat-app-vivo/blob/master/image/3.png)
![](https://github.com/Mynameisfwk/wechat-app-vivo/blob/master/image/4.png)
![](https://github.com/Mynameisfwk/wechat-app-vivo/blob/master/image/5.png)

## 微信登陆

``` bash
Page({

  /* 页面的初始数据 */
  data: {
    UserImage: '',
    Username: '',
  },
  
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    var _this=this
    wx.getUserInfo({
      success:function(res){
        _this.setData({
          UserImage: res.userInfo.avatarUrl,
          Username: res.userInfo.nickName
        })
      }
    })
  },
  about:function(){
    wx.navigateTo({
      url: '../../pages/about/about' ,
    })
  }
})

```

## 加入购物车
```bash
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

```

## 购物车功能

```bash
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

```
