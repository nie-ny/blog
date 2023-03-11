// miniprogram/pages/detail/detail.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    fruitDetail: {}, // 水果信息
    popUpHidden: true, // 是否隐藏弹窗
    popCartCount: 1, // 购物车数量
    curIndex: 0
  },

  // 跳转至购物车
  goToCart: function () {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  // 弹出购物车选项
  addToCart: function () {
    this.setData({
      popUpHidden: false
    })
  },
  popCancelCatch: function () {},
  // 关闭弹窗
  popCancel: function (e) {
    console.log(e)
    this.setData({
      popUpHidden: true
    })
  },

  // 立即购买
  toBuy: function () {
    const that = this
    const cartItem = that.data.fruitDetail
    cartItem.num = that.data.popCartCount

    app.isNotRepeteToCart(cartItem)
    // console.log(app.globalData.carts)
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  // 数量加减
  plusCount: function () {
    const that = this
    let tmp = that.data.popCartCount + 1
    that.setData({
      popCartCount: tmp
    })
  },
  minusCount: function () {
    const that = this
    let tmp = that.data.popCartCount - 1
    if (tmp === 0) tmp = 1
    that.setData({
      popCartCount: tmp
    })
  },

  // 添加购物车
  toCart: function () {
    const that = this
    const cartItem = that.data.fruitDetail
    cartItem.num = that.data.popCartCount
    // console.log(newCartItem)
    app.isNotRepeteToCart(cartItem)
    wx.showToast({
      title: '已添加至购物车'
    })
    that.setData({
      popUpHidden: true
    })
    // console.log(app.globalData.carts)
  },

  // 详细信息切换
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      curIndex: index
    })
  },

  // ------------生命周期函数------------
  // 页面加载时触发。一个页面只会调用一次
  onLoad: function (e) {
    var that = this
    app.getInfoWhere('fruit', { _id: e._id }, (e) => {
      // console.log(e.data[0])
      that.setData({
        fruitDetail: e.data[0]
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
