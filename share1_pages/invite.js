Page({

  /**
   * 页面的初始数据
   */
  data: {
    fun_id: 2,
    time: '获取验证码',
    currentTime: 60,
    hidden_name: true,
    hidden_name3: true,
    flag: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var interval = null;
    wx.setStorage({
      key: 'name',
      data: 'res.data',
    })
    var student = wx.getStorageSync('name');
  },

  searchInput: function(e) {
    this.setData({
      name: e.detail.value,
      
    })
    wx.setStorage({
      key: 'name',
      data: e.detail.value,
    })
  },
  phoneinput: function(e) {
    this.setData({
      phone: e.detail.value
    })
    wx.setStorage({
      key: 'phone',
      data: e.detail.value,
    })
  },
  is_code: function(e) {
    this.setData({
      code: e.detail.value,
    })
    wx.setStorage({
      key: 'code',
      data: e.detail.value,
    })


  },

  click: function() {

    this.setData({
      hidden_name: !this.data.hidden_name,
      flag: 0
    })
    wx.request({
      url: 'https://www.csst.com.cn/index.php?m=invform&c=phone&a=index',
      data: {
        name: wx.getStorageSync('name'),
        phone: wx.getStorageSync('phone'),
        code: wx.getStorageSync('code'),
      },
      method: 'post',
      success: function() {}
    })
  },
  // 验证码按钮
  yanzheng: function(event) {
    let that = this;
    var interval = null;
    wx.navigateTo({
      url: 'this.data.time',

    })
    this.setData({
      disabled: true
    })
    // 收发验证码
    var currentTime = that.data.currentTime;
    interval = setInterval(function() {
      currentTime--;
      that.setData({
        time: currentTime + '秒后获取'
      })
      if (currentTime <= 0) {

        clearInterval(interval)
        that.setData({
          disabled: false,
          time: '获取验证码',
          currentTime: 60,

        })
      }
    }, 1000)
    wx.request({
      url: 'https://www.csst.com.cn/index.php?m=invform&c=phone&a=index',
      data: 'form',
      method: 'post',
      success: function(res) {

      },
      fail: function(res) {

      }
    });
  },
  click2: function(e) {
    this.setData({
      hidden_name: true,
      hidden_name3: !this.data.hidden_name3,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  }, 

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})