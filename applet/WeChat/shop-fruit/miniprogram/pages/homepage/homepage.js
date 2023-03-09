// index.js
const app = getApp()

const { envList } = require('../../envList.js')

Page({
  data: {
    // 是否维护
    offLine: null,
    // 是否显示首页
    isShow: true,
    searchWord: '',
    // 推荐列表
    fruitInfo: [],
    // 分类
    typeCat: [
      { id: 0, name: '美味鲜果' },
      { id: 1, name: '今日特惠' },
      { id: 2, name: '新鲜上架' },
      { id: 3, name: '店主推荐' }
    ],
    activeTypeId: 0,

    // 云环境ID
    envId: envList[0].envId,
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
        name: 'fruitFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: 'getOpenId'
        }
      })
      .then((resp) => {
        console.log('云函数获取到的openid: ', resp.result.openid)
        this.setData({
          haveGetOpenId: true,
          openId: resp.result.openid
        })
        // wx.hideLoading()
      })
      .catch((e) => {
        console.error(e)
        // wx.hideLoading()
      })
  },
  /**
   * 分类切换
   * @param {*} e
   */
  typeSwitch: function (e) {
    this.setData({
      activeTypeId: parseInt(e.currentTarget.id)
    })
    switch (e.currentTarget.id) {
      // 全部展示
      case '0':
        app.getInfoByOrder('fruit', 'fruitId', 'desc', (data) => {
          this.setData({
            fruitInfo: data.data
          })
        })
        break
      // 今日特惠
      case '1':
        app.getInfoWhere('fruit', { myClass: '1' }, (data) => {
          this.setData({
            fruitInfo: data.data
          })
        })
        break
      // 销量排行
      case '2':
        app.getInfoByOrder('fruit', 'purchaseFreq', 'asc', (data) => {
          this.setData({
            fruitInfo: data.data
          })
        })
        break
      // 店主推荐
      case '3':
        app.getInfoWhere('fruit', { myClass: '0' }, (data) => {
          this.setData({
            fruitInfo: data.data
          })
        })
        break
    }
  },

  // ------------生命周期函数------------
  // 页面加载时触发。一个页面只会调用一次
  onLoad: function (options) {
    console.log('111', options)

    var that = this
    wx.showLoading({
      title: '生活要领鲜'
    })
    that.setData({
      isShow: false,
      envId: options.envId
    })
    // 获取openId
    this.getOpenId()
  },
  // 页面初次渲染完成时触发。一个页面只会调用一次
  onReady: function () {},

  // 页面显示/切入前台时触发。
  onShow: function () {
    const that = this

    app.getInfoByOrder('fruit', 'fruitId', 'desc', (e) => {
      that.setData({
        fruitInfo: e.data,
        isShow: true
      })
      wx.hideLoading()
    })
    // console.log(app.globalData.offLine)
    // 是否下线
    // app.getInfoWhere('setting', { option: 'offLine' }, (e) => {
    //   that.setData({
    //     offLine: e.data['0'].offLine
    //   })
    // })
  },

  // 页面隐藏/切入后台时触发
  onHide: function () {},

  // 页面卸载时触发
  onUnload: function () {},

  // 右上角转发
  onShareAppMessage: function () {
    return {
      title: '水果店',
      imageUrl: '../../images/icon/fruit.jpg',
      path: '/pages/homepage/homepage'
    }
  }
})
