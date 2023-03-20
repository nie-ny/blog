// eslint-disable-next-line no-undef
export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/cart/index',
    'pages/user/index',
    'pages/detail/index',
    'pages/size/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#000000',
    selectedColor: '#000000',
    backgroundColor: '#000000',
    backgroundColor: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './images/tab/home.png',
        selectedIconPath: './images/tab/home-active.png'
      },
      {
        pagePath: 'pages/cart/index',
        text: '衣袋',
        iconPath: './images/tab/cart.png',
        selectedIconPath: './images/tab/cart-active.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: './images/tab/user.png',
        selectedIconPath: './images/tab/user-active.png'
      }
    ]
  }
});
