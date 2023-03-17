<template>
	<view class="container">
		<uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
			<uni-forms-item name="type" label="类型">
				<uni-data-select placeholder="请选择账单所属类型" v-model="formData.type" :localdata="formOptions.type"
					@change="handleTypeChange">
				</uni-data-select>
			</uni-forms-item>
			<uni-forms-item name="name" label="名称">
				<uni-easyinput placeholder="请输入账单开销名称" v-model="formData.name"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="unit" label="单位">
				<uni-data-select placeholder="请选择账单开销单位" v-model="formData.unit" :localdata="formOptions.unit"
					@change="handleUnitChange">
				</uni-data-select>
			</uni-forms-item>
			<uni-forms-item name="count" label="数量">
				<uni-easyinput placeholder="请输入账单开销数值" v-model="formData.count"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item name="price" label="价格">
				<uni-easyinput placeholder="请输入账单开销价格" v-model="formData.price"></uni-easyinput>
			</uni-forms-item>
			<view class="uni-button-group">
				<button type="primary" class="uni-button" @click="submit">提交</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	let canUse = true;
	export default {
		data() {
			return {
				formData: {},
				formOptions: {
					type: [{
						text: '穿的',
						value: 'wearings',
					}, {
						text: '吃的',
						value: 'eattings',
					}, {
						text: '用的',
						value: 'usings',
					}, {
						text: '玩的',
						value: 'playings'
					}, {
						text: '教育',
						value: 'educations'
					}, {
						text: '医疗',
						value: 'medicals'
					}, {
						text: '其他',
						value: 'others'
					}],
					unit: [{
						text: '件',
						value: 'jian'
					}, {
						text: '次',
						value: 'ci',
					}, {
						text: '个',
						value: 'ge',
					}, {
						text: '辆',
						value: 'liang'
					}, {
						text: '千克',
						value: 'kg',
					}, {
						text: '毫升',
						value: 'ml'
					}, {
						text: '其他',
						value: 'other'
					}]
				},
				rules: {
					type: {
						rules: [{
							required: true,
							errorMessage: '请输入类型'
						}]
					},
					name: {
						rules: [{
							required: true,
							errorMessage: '请输入名称'
						}]
					},
					price: {
						rules: [{
							required: true,
							errorMessage: '请输入价格'
						}]
					}
				}

			}
		},
		methods: {
			handleTypeChange() {},
			handleUnitChange() {},
			async submit() {
				uni.showLoading({
					title: '处理中...'
				});
				const formRes = await this.$refs.form.validate();
				const res = await uniCloud.callFunction({
					name: 'add',
					data: {
						...formRes,
						openid: uni.getStorageSync('openid'),
						createTime: Date.now()
					}
				});
				uni.showModal({
					content: `添加成功`,
					showCancel: false
				})
				uni.hideLoading();

			}
		}
	}
</script>

<style>
	.container {
		padding: 30rpx;
	}
</style>
