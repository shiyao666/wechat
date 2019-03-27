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
    flag: 2,
    img: 'src/ae,jpeg',
    invite_name: '姓名',
    start_time: "时间",
    address: "地址",
    price: "价格",
    contents: "内容",
    max_background: "",
    logo: "",
    disabled: false,
    loadingHidden: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onPullDownRefresh: function() {
    this.setData({
      loadingHidden: false
    });
    var that = this;
    wx.request({
      url: 'https://www.geekxz.com/action/works/recWorks',
      data: {
        num: '5',
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data.data.works);
        that.setData({
          recWorks: res.data.data.works,
        })
      },
      complete: function() { // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
    setTimeout(function() {
      that.setData({
        loadingHidden: true
      });
    }, 2000);
    wx.getExtConfig({
      success: function() {

      },
      fail: function() {

      },
      complete: function() {

      }
    })
    const query = wx.createSelectorQuery();
    query.select('#the-id').boundingClientRect()
    query.selectViewport().scrollOffset();
    query.exec(function(res) {
      res[0].top
      res[1].scrollTop
    })
  },

  /**扫码 */
  scanInfo: function() {
    var that = this;
    var show;

    wx.scanCode({
      success: (res) => {
        this.show = res.result;
        console.log(this.show)
        that.setData({
          addName: this.show
        })
        // wx.navigateTo({
        //   url: "invite",
        // })
        wx.showToast({
          title: '扫码成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showModal({
          title: '提示',
          content: "未获取到二维码",
          showCancel: false,
          success: function(res) {}
        })
      },
      complete: (res) => {}
    })

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
        phone: parseInt(e.detail.value),
      }),
      wx.setStorage({
        key: 'phone',
        data: parseInt(e.detail.value),
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
    var that = this;
    wx.request({
      url: 'https://api.csst.com.cn/index.php?m=invform&c=phone&a=logon',
      data: {
        phone: wx.getStorageSync('phone'),
        code: wx.getStorageSync('code'),
        token_user: wx.getStorageSync('token_user'),
        form_id: 1001
      },
      method: 'post',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.code == 10004) {
          that.setData({
            hidden_name: !that.data.hidden_name,
            flag: 0
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function(res) {}
          })
        }
      },
    })
  },
  onLoad: function(options) {
    var that = this;
    var token_user;
    wx.request({
      url: 'https://api.csst.com.cn/index.php?m=invform&c=phone&a=index',
      data: {
        form_id: parseInt(1001),

        // https:api.weixin.qq.com/wxa/getwxacodeaccess_token=ACCESS_TOKEN
        token_user: '',
      },
      method: 'post',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        console.log(res.data.data.name)
        // var wxparse = require('../lib/wxParse/wxParse.js');
        // var article = res.data.data.content;
        // wxparse.wxParse('article', 'html', article, that, 5);
        that.setData({
          token_user: res.data.data.token_user,
          invite_name: res.data.data.name,
          start_time: res.data.data.start_time,
          address: res.data.data.address,
          price: res.data.data.price,
          contents: res.data.data.content,
          max_background: res.data.data.bg_image,
          logo: res.data.data.image,
        })
        console.log(res.data.data.content);
        if (wx.getStorageSync('token_user') == undefined || wx.getStorageSync('token_user') == null) {
          wx.setStorage({
            key: 'token_user',
            data: res.data.data.token_user,
          })
        }
        that.setData({
          loadingHidden: true
        });
      },
      fail: function(res) {}
    });
    var address_data = new Array(["a", 2, "s"])
    // 获取token转化为cookie
    var interval = null;
    wx.setStorage({
      key: 'name',
      data: 'res.data',
    })
    var student = wx.getStorageSync('name');
  },



  // 验证码按钮
  yanzheng: function(event) {
    var token_user;
    let that = this;
    var interval = null;
    // 收发验证码
    wx.request({
      url: 'https://api.csst.com.cn/index.php?m=invform&c=phone&a=send_mes',
      data: {
        name: wx.getStorageSync('name'),
        phone: wx.getStorageSync('phone'),
        form_id: parseInt(1001),
        token_user: 'wdwacpdsc',
      },
      method: 'post',
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.code == 10003) {

          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            success: function(res) {}
          })
        } else {

          token_user = parseInt(res.data.msg);
          wx.showModal({
            title: '提醒',
            content: '信息已发送',
            showCancel: false,
            success: function(res) {}
          })
          var currentTime = that.data.currentTime;
          interval = setInterval(function() {
            currentTime--;
            that.setData({
              time: currentTime + '秒后获取'
            })
            that.setData({
              disabled: true
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
        }
      },
      fail: function(res) {}
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
    return {
      title: "分享活动报名系统",
      desc: "报名页面",
      path: '/page/share1_pages/id=123'
    }
  }
})