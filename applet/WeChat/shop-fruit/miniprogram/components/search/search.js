// components/search/search.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取搜索词
    listenerSearchInput: function (e) {
      getCurrentPages()['0'].setData({
        searchWord: e.detail.value
      })
    },

    // 点击查找按钮
    toSearch: function (e) {
      const searchWord = getCurrentPages()['0'].data.searchWord

      app.getInfoWhere('fruit', { fruitName: searchWord }, (e) => {
        if (e.data.length <= 0) {
          wx.showToast({
            title: '没有喔~'
          })
        } else {
          getCurrentPages()['0'].setData({
            fruitInfo: e.data,
            activeTypeId: -1
          })
          console.log('🚀 ~ file: search.js:41 ~ getCurrentPages ~ e.data:', e.data)
        }
      })
    }
  }
})

// {
//   detail: '这是水果',
//   fruitId: 1,
//   iLike: 0,
//   imgUrl: 'admin',
//   myClass: '1',
//   fruitName: '苹果',
//   onShow: true,
//   price: 10,
//   purchaseFreq: 0,
//   unit: '个'
// }
