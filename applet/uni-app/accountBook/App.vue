<script>
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	export default {
		onLaunch: async function() {
			console.log('App Launch')
			// #ifdef MP-WEIXIN
			uniCloud.initSecureNetworkByWeixin()
			// #endif
			checkUpdate() //更新升级
			
			// #ifdef MP-WEIXIN
			// 微信平台
			wx.login({
				success: (res) => {
					console.log('wx.login22222', res);
					uniCloud.callFunction({
						name: 'login',
						data: {
							code: res.code
						},
						success: (rsp) => {
							// 用户唯一openid
							uni.setStorageSync('openid', rsp.result.data.openid);
						}
					})
				}
			})
			// #endif
		},
		mounted() {
			// #ifdef H5
			//const VConsole = require('@/common/js/vconsole.min.js')
			//new VConsole()
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	view {
		box-sizing: border-box;
	}

	@font-face {
		font-family: "iconfont";
		src: url('https://at.alicdn.com/t/font_2354462_s00xh8caffp.ttf');
	}

	.ico {
		font-family: iconfont;
	}

	/* #endif */
</style>
