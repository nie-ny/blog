// miniprogram/pages/bgInfo/bgInfo.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 1:添加水果 2:上架修改 3:送货管理
    cardNum: 1,
    // 水果信息
    fruitID: null, // 水果编号
    fruitName: null, // 水果名称
    price: null, // 价格
    unit: null, // 单位
    detail: '', // 描述
    // 0:普通 1:店主推荐
    myClass: 0,
    // 0:原价 1:特惠
    recommend: 0,
    onShow: true, // 上架
    files: [],
    tmpUrlArr: [], // 图片
    myClass_Arr: ['否', '是'],
    recommend_Arr: ['否', '是'],

    manageList: []
  },

  // 获取水果编号
  getFruitID: function (e) {
    this.setData({
      fruitID: parseInt(e.detail.value)
    })
  },

  // 获取水果名称
  getName: function (e) {
    this.setData({
      fruitName: e.detail.value
    })
  },

  // 获取价格
  getPrice: function (e) {
    this.setData({
      price: e.detail.value
    })
  },

  // 获取单位
  getUnit: function (e) {
    this.setData({
      unit: e.detail.value
    })
  },
  // 详细信息
  getInfoText: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },

  // 今日特惠
  getMyClass: function (e) {
    console.log(e)
    this.setData({
      myClass: e.detail.value.toString()
    })
  },

  // 店主推荐
  getRecommend: function (e) {
    this.setData({
      recommend: e.detail.value.toString()
    })
  },

  // 选择照片并预览（预览地址在files，上传后的地址在tmpUrlArr）
  chooseImage: function (e) {
    var that = this
    wx.chooseMedia({
      count: 9,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: function (res) {
        res.tempFiles.forEach((row) => {
          // 上传文件
          const fruitName = that.data.fruitName || '水果'
          app.upToClound('fruitImg', fruitName + Math.random().toString(), row.tempFilePath, (tmpUrl) => {
            that.data.tmpUrlArr.push(tmpUrl)

            that.setData({
              files: that.data.files.concat(tmpUrl)
            })
          })
        })
      }
    })
  },
  // 预览图片
  previewImage: function (e) {
    var that = this
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: that.data.tmpUrlArr // 需要预览的图片http链接列表
    })
  },

  /**
   * 切换选项
   * @param {*} e
   */
  tapTo: function (e) {
    const tab = parseInt(e.currentTarget.dataset.tab)
    //添加
    this.setData({
      cardNum: tab
    })
  },

  /**
   * 查询水果数据
   */
  getManageList: function () {
    var that = this
    app.getInfoByOrder('fruit', 'time', 'desc', (e) => {
      that.setData({
        manageList: e.data
      })
    })
  },

  /**
   *  添加水果信息表单
   * @param {*} e
   */
  addFruitInfo: function (e) {
    const that = this
    if (that.data.fruitName && that.data.price && that.data.unit && that.data.tmpUrlArr.length > 0) {
      new Promise((resolve, reject) => {
        const { fruitID, fruitName, price, unit, detail, myClass, recommend, tmpUrlArr, onShow } = that.data
        const theInfo = { fruitID, fruitName, price, unit, detail, myClass, recommend, tmpUrlArr, onShow }
        theInfo['imgUrl'] = that.data.tmpUrlArr[0]
        theInfo['time'] = parseInt(app.CurrentTime())
        resolve(theInfo)
      }).then((theInfo) => {
        // 上传所有信息
        app.addRowToSet('fruit', theInfo, (e) => {
          wx.showToast({
            title: '添加成功'
          })

          // 进入管理标签
          that.setData({
            cardNum: 2,
            fruitID: '',
            fruitName: '',
            price: '',
            unit: '',
            detail: '',
            myClass: 0,
            recommend: 0,
            tmpUrlArr: [],
            files: []
          })

          that.getManageList()
        })
      })
    } else {
      wx.showToast({
        icon: 'error',
        title: '信息不完全'
      })
    }
  },

  // 上架水果
  upToLine: function (e) {
    const that = this
    app.updateInfo(
      'fruit',
      e.currentTarget.id,
      {
        onShow: true
      },
      (e) => {
        that.getManageList()
        wx.showToast({
          title: '已上架'
        })
      }
    )
  },

  // 下架水果
  downFromLine: function (e) {
    const that = this
    app.updateInfo(
      'fruit',
      e.currentTarget.id,
      {
        onShow: false
      },
      (e) => {
        that.getManageList()
        wx.showToast({
          title: '已下架'
        })
      }
    )
  },

  // 绑定删除水果名称参数
  delFruitId: function (e) {
    const that = this
    wx.showModal({
      title: '删除',
      content: '确认删除',
      success(res) {
        if (res.confirm) {
          app.deleteInfoFromSet('fruit', e.currentTarget.id, () => that.getManageList())
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 店铺下线打烊
  offLine: function () {
    app.getInfoWhere('setting', {}, (res) => {
      let ch = !res.data[0].offLine
      app.updateInfo(
        'setting',
        res.data['0']._id,
        {
          offLine: ch
        },
        (e) => {
          let str = '开始营业'
          if (ch) {
            str = '结束营业'
          }
          wx.showToast({
            title: str
          })
        }
      )
      // console.log(res)
    })
  },

  /**
   * ----------------------!!!  生命周期函数--监听页面加载  !!!----------------------
   */
  onLoad: function (options) {
    this.getManageList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getManageList()
  },

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
  onPullDownRefresh: function () {
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})
