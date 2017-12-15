Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserImage: '',
    Username: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
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