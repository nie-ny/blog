// index.js
// const app = getApp()

Page({
  data: {
    haveGetOpenId: false,
    openId: ''
  },

  // 获取用户openid
  getOpenId() {
    wx.showLoading({
      title: ''
    })
    wx.cloud
      .callFunction({
        name: 'quickstartFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: 'getOpenId'
        }
      })
      .then((resp) => {
        console.log('云函数获取到的openid: ', res.result.openId)
        this.setData({
          haveGetOpenId: true,
          openId: resp.result.openid
        })
        wx.hideLoading()
      })
      .catch((e) => {
        this.setData({
          showUploadTip: true
        })
        wx.hideLoading()
      })
  }
})
