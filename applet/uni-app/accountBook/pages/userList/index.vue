<template>
	<view class="container">
		<view class="btn-group">
			<button :type="state.current === 'week' ? 'primary' : 'default'" size="mini"
				@click="getListByDate('week')">近一周</button>
			<button :type="state.current === 'month' ? 'primary' : 'default'" size="mini"
				@click="getListByDate('month')">近一月</button>
			<button :type="state.current === 'season' ? 'primary' : 'default'" size="mini"
				@click="getListByDate('season')">近三月</button>
			<button :type="state.current === 'halfyear' ? 'primary' : 'default'" size="mini"
				@click="getListByDate('halfyear')">近半年</button>

		</view>

		<uni-list>
			<uni-list-chat :avatar="typeImg(item.type)" v-for="item in state.list" :key="item._id" :title="item.price"
				:note="item.name" :time="dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')"></uni-list-chat>
		</uni-list>

	</view>
</template>

<script setup>
	import aImg from '@/static/type/1.png';
	import bImg from '@/static/type/2.png';
	import cImg from '@/static/type/3.png';
	import dImg from '@/static/type/4.png';
	import eImg from '@/static/type/5.png';
	import fImg from '@/static/type/6.png';
	import gImg from '@/static/type/7.png';

	import {
		onMounted,
		reactive
	} from "vue";
	import {
		onShow
	} from '@dcloudio/uni-app'
	import dayjs from 'dayjs';


	let state = reactive({
		list: [],
		current: 'week'
	})

	// 数据加载
	const getListByDate = (type) => {
		state.current = type;
		const db = uniCloud.database()

		uni.showLoading({
			title: '处理中...'
		})
		let beginTime = null;
		let now = new Date().getTime();
		let day = 24 * 60 * 60 * 1000;
		switch (type) {
			case 'week':
				beginTime = now - 7 * day;
				break;
			case 'month':
				beginTime = now - 30 * day;
				break;
			case 'season':
				beginTime = now - 90 * day;
				break;
			case 'halfyear':
				beginTime = now - 180 * day;
				break;
		}

		uniCloud.callFunction({
			name: 'getWhere',
			data: {
				whereData: {
					openid: uni.getStorageSync('openid')
				},
				gt: {
					createTime: beginTime
				}
			}
		}).then((res) => {
			uni.hideLoading()
			state.list = res.result.data;
			console.log(state.list);
		})
	}

	const typeImg = (type) => {
		switch (type) {
			case 'wearings':
				return aImg
				break;
			case 'eattings':
				return bImg
				break;
			case 'usings':
				return cImg
				break;
			case 'playings':
				return dImg
				break;
			case 'educations':
				return eImg
				break;
			case 'medicals':
				return fImg
				break;
			case 'others':
				return gImg
				break;
			default:
				return aImg
				break;
		}
	}



	onMounted(() => {
		getListByDate('week')
	})

	onShow(() => {
		getListByDate('week')
	})
</script>

<style lang="scss">
	.container {
		padding: 30rpx;

		.btn-group {
			display: flex;
			justify-content: space-around;
		}
	}
</style>
