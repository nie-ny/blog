// index.js
const app = getApp()

Page({
  data: {
    orders: [],
    hasAddress: false,
    address: {},
    isAdmin: undefined,
    openId: '',
    adiminArr: ['oPPF15Apc8jilLhpqiOeTp6zPv_w']
  },

  // 获取用户openid
  getOpenId() {
    var that = this
    wx.cloud
      .callFunction({
        name: 'fruitFunctions',
        config: {
          env: that.data.envId
        },
        data: {
          type: 'getOpenId'
        }
      })
      .then((resp) => {
        console.log('云函数获取到的openid: ', resp.result.openid)
        const openid = resp.result.openid
        that.setData({
          openId: openid,
          isAdmin: that.data.adiminArr.indexOf(openid)
        })

        // 获取本人订单信息
        app.getInfoWhere(
          'order_master',
          {
            openid: openid
          },
          (e) => {
            console.log(e.data)
            var tmp = []
            var len = e.data.length
            for (var i = 0; i < len; i++) {
              tmp.push(e.data.pop())
            }
            that.setData({
              orders: tmp
            })
          }
        )
      })
      .catch((e) => {
        console.error(e)
      })
  },

  goToBgInfo: function () {
    wx.navigateTo({
      url: '/pages/bgInfo/bgInfo'
    })
  },
  goToBgManage: function () {
    wx.navigateTo({
      url: '/pages/bgManage/bgManage'
    })
  },

  // ------------生命周期函数------------
  onLoad() {
    this.getOpenId()
  },

  onShow() {
    const that = this
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function (res) {
        that.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })

    this.getOpenId()
  },
  onPullDownRefresh: function () {
    var that = this
    that.getOpenId()
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 500)
  }
})
