<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar title="支付结果" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="goBack"/>
		</app-bar>
		
		<app-content slot="appContent">
			<div class="payResult-wrap" v-if="payResult.resultStatus == '9000'">
				<img src="../../assets/image/other/pay-success.png"/>
				<p class="payResult-desc">支付成功 <span style="color: #2196F3;" @click="goToPayResultDetail">查看详情</span></p>
				<p class="confirm-p">
					<mu-raised-button label="确 定" @click="back" primary style="width: 50%"/>
				</p>
			</div>
			<div class="payResult-wrap" v-if="payResult.resultStatus == '8000'">
				<img src="../../assets/image/other/pay-progressing.png"/>
				<p class="payResult-desc">支付正在处理中 <span style="color: #2196F3;" @click="goToPayResultDetail">查看详情</span></p>
				<p class="confirm-p">
					<mu-raised-button label="确 定" @click="back" primary style="width: 50%"/>
				</p>
			</div>
			<div class="payResult-wrap" v-if="payResult.resultStatus != '9000' && payResult.resultStatus != '8000'">
				<img src="../../assets/image/other/pay-fail.png"/>
				<p class="payResult-desc">支付失败，错误代码：<span style="color: #FF335C">{{payResult.resultStatus}}</span></p>
				<p class="confirm-p">
					<mu-raised-button label="确 定" @click="back" primary style="width: 50%"/>
				</p>
			</div>
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'payResult',
		data() {
			return {
				payResult: {},
			}
		},
		methods: {
			goToPayResultDetail() {
				this.goWithQuery('payResultDetail', this.payResult);
			},
			goBack() {
				util.cache.remove('payResult');
				this.back();
			}
		},
		mounted() {
			let payResult = this.getRouterDataObj();
			if(payResult.resultStatus){
				util.cache.set('payResult', payResult);
			}else{
				payResult = util.cache.get('payResult');
			}
			this.payResult = payResult;
		},
		destroyed() {
		}
	}
</script>

<style scoped>
	.payResult-wrap{
		margin-top: 150px;
	}
	.payResult-wrap img{
		display: block;
		width: 60px;
		margin: 0 auto;
		height: 60px;
	}
	.payResult-wrap .payResult-desc{
		margin-top: 10px;
		height: 20px;
		line-height: 20px;
		font-size: 13px;
		text-align: center;
		letter-spacing: 1px;
		color: #A8A8A8;
	}
	.confirm-p{
		margin-top: 20px;
		text-align: center;
	}
</style>