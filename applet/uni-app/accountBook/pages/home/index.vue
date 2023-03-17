<template>
	<view class="content">
		<view>
			<uni-card>
				<text class="uni-body">您一共消费了：{{total}}元</text>
			</uni-card>
		</view>
		<view>
			<uni-card v-for="item in feeList" :key="item._id" :title="item.name" :extra="item.price">
				<text class="uni-body">{{item.createTime}}</text>
			</uni-card>
		</view>
		<view class="button-group">
			<button type="primary" @click="viewMore">查看更多</button>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';

	export default {
		data() {
			return {
				total: 0,
				feeList: [],
				limit: 5,
				pageNo: 1,
				totalbol: false
			}
		},
		mounted() {
			// this.getTotalFee();
		},
		methods: {
			getTotalFee() {
				let that = this
				uni.showLoading({
					title: '查询中...'
				})
				uniCloud.callFunction({
					name: 'getWhere',
					data: {
						whereData: {
							openid: uni.getStorageSync('openid')
						},
						limit: that.limit,
						pageNo: that.pageNo
					}
				}).then((res) => {
					uni.hideLoading()

					let total = 0
					const temArr = res.result.data.map((item) => {
						total = total + Number(item.price)
						return {
							...item,
							price: item.price + '元',
							createTime: dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
						}
					});
					that.feeList = that.feeList.concat(temArr);
					that.total = total

					if (temArr && temArr.length < that.limit) {
						// 无更多数据
						that.totalbol = true
					}
				})
			},
			viewMore() {
				if (this.totalbol) {
					uni.showToast({
						title: '没有更多数据了',
						icon: 'none'
					})
					return;
				}

				this.pageNo++;
				this.getTotalFee();
			}
		},
		onShow: function() {
			this.feeList = []
			this.limit = 5
			this.pageNo = 1
			this.getTotalFee();
		},
	}
</script>

<style>
	.container {
		padding: 30rpx;
	}

	.button-group {
		padding: 20rpx;
	}
</style>
