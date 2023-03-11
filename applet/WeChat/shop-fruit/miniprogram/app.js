// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'cloud1-7gif9t7cde154830',
        traceUser: true
      })
    }

    this.globalData = {
      appid: 'wx825cee6bc02c8213',
      // 支付商户号
      mch_id: '',
      apikey: '',
      school_Arr: ['1栋', '2栋', '3栋'],

      // 购物车
      carts: []
    }
  },

  // 随机数生成函数
  RndNum: function () {
    return Math.random().toString(32).substring(3)
  },

  /**
   * 加入购物车数组
   * @param {*} cartItem
   */
  isNotRepeteToCart: function (cartItem) {
    const that = this
    const isRepete = function () {
      return new Promise((resolve, reject) => {
        var flag = false
        that.globalData.carts.forEach((v) => {
          if (v._id === cartItem._id) {
            flag = true
          }
        })
        resolve(flag)
      })
    }
    isRepete().then((flag) => {
      if (flag) {
        wx.showToast({
          title: '已经添加过了~'
        })
      } else {
        that.globalData.carts.push(cartItem)
      }
    })
  },

  /**
   * 上传文件
   * @param {*} imgFolder 云地址
   * @param {*} imgName 文件名
   * @param {*} myFilePath 本地地址
   * @param {*} fileIDCallback 回调
   */
  upToClound: (imgFolder, imgName, myFilePath, fileIDCallback) => {
    wx.cloud.uploadFile({
      cloudPath: imgFolder + '/' + imgName, // 上传至云端的路径
      filePath: myFilePath, // 小程序临时文件路径
      success: (res) => {
        // 返回文件 ID
        wx.showToast({
          title: '图片已上传'
        })
        fileIDCallback(res.fileID)
      },
      fail: console.error
    })
  },

  /**
   * 向集合内新增记录
   * @param {*} setName  集合名
   * @param {*} infoObject 数据对象
   * @param {*} callback 回调函数
   */
  addRowToSet: function (setName, infoObject, callback) {
    const db = wx.cloud.database()
    db.collection(setName).add({
      data: infoObject,
      success: callback,
      fail: console.error
    })
  },
  /**
   * 修改集合中的数据
   * @param {*} setName 集合名
   * @param {*} _id id
   * @param {*} updateInfoObj 修改的数据
   * @param {*} callback
   */
  updateInfo: function (setName, _id, updateInfoObj, callback) {
    const db = wx.cloud.database()
    db.collection(setName).doc(_id).update({
      data: updateInfoObj,
      success: callback,
      fail: console.error
    })
  },
  /**
   * 删除集合中的数据
   * @param {*} setName 集合名
   * @param {*} _id id
   * @param {*} callback
   */
  deleteInfoFromSet: function (setName, _id, callback) {
    const db = wx.cloud.database()
    db.collection(setName)
      .doc(_id)
      .remove({
        success: (e) => {
          callback()
          wx.showToast({
            title: '删除成功'
          })
        },
        fail: console.error
      })
  },

  /**
   * 排序后取出数据
   * @param {*} setName 集合名
   * @param {*} ruleItem 排序字段
   * @param {*} orderFuc 排序方式
   * @param {*} callback 回调
   */
  getInfoByOrder: function (setName, ruleItem, orderFuc, callback) {
    const db = wx.cloud.database()
    db.collection(setName).orderBy(ruleItem, orderFuc).get().then(callback).catch(console.error)
  },

  /**
   * 根据条件查询集合中的数据
   * @param {*} setName 集合名
   * @param {*} ruleObj 对象条件 {name:""}
   * @param {*} callback 回调
   */
  getInfoWhere: function (setName, ruleObj, callback) {
    // 查询云数据库
    const db = wx.cloud.database()

    if (setName === 'fruit' && ruleObj.fruitName) {
      // 字段模糊查询
      ruleObj.fruitName = db.RegExp({
        regexp: ruleObj.fruitName,
        // 大小写不区分
        options: 'i'
      })
    }

    db.collection(setName).where(ruleObj).get().then(callback).catch(console.error)
  },

  // 获取时间戳
  CurrentTime: function () {
    var now = new Date()
    var year = now.getFullYear() //年
    var month = now.getMonth() + 1 //月
    var day = now.getDate() //日
    var hh = now.getHours() //时
    var mm = now.getMinutes() //分
    var ss = now.getSeconds() //秒

    var clock = year.toString()
    if (month < 10) clock += '0'
    clock += month
    if (day < 10) clock += '0'
    clock += day
    if (hh < 10) clock += '0'
    clock += hh
    if (mm < 10) clock += '0'
    clock += mm
    if (ss < 10) clock += '0'
    clock += ss
    return clock
  },
  CurrentTime_show: function () {
    var now = new Date()
    var year = now.getFullYear() //年
    var month = now.getMonth() + 1 //月
    var day = now.getDate() //日
    var hh = now.getHours() //时
    var mm = now.getMinutes() //分
    var ss = now.getSeconds() //秒

    var clock = year.toString() + '-'
    if (month < 10) clock += '0'
    clock += month + '-'
    if (day < 10) clock += '0'
    clock += day + ' '
    if (hh < 10) clock += '0'
    clock += hh + ':'
    if (mm < 10) clock += '0'
    clock += mm + ':'
    if (ss < 10) clock += '0'
    clock += ss

    return clock
  }
})
