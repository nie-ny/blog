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
      offLine: false
    }
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
  }
})
