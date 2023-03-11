Page({
  data: {
    address: {
      name: '',
      phone: '',
      detail: '',
      message: '',
      building: 0 // 地址
    },

    school_Arr: ['1栋', '2栋', '3栋']
  },

  onLoad() {
    var that = this
    wx.getStorage({
      key: 'address',
      success: function (res) {
        that.setData({
          address: res.data
        })
      }
    })
  },

  // 楼栋
  getSchool: function (e) {
    var that = this
    let tmp = that.data.address
    tmp['building'] = parseInt(e.detail.value)
    that.setData({
      address: tmp
    })
  },

  formSubmit(e) {
    const value = e.detail.value
    // console.log(value)
    if (value.name && value.phone.length === 11 && value.detail) {
      console.log(value)
      wx.setStorage({
        key: 'address',
        data: value,
        success() {
          wx.navigateBack()
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  }
})
