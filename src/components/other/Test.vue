<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar title="调试" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back"/>
		</app-bar>
		
		<app-content slot="appContent">
			<mu-text-field v-model="payInfo" hintText="请输入支付宝payInfo" multiLine :rows="3" :rowsMax="100"/><br/>
			<mu-raised-button label="支 付 宝 调 试" primary fullWidth @click="alipayDebug" />
			<mu-raised-button label="登 录 后 普 通 接 口 调 试" primary fullWidth @click="normalInterfaceTest" />
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'test',
		data() {
			return {
				payInfo: null,
			}
		},
		methods: {
			alipayDebug(){
				if(this.payInfo){
					util.cordovaNative.callAlipay(this.payInfo, (payResult) => {
						if(payResult){
							//用户取消不进入支付结果页面
							if(payResult.resultStatus != 6001){
								this.goWithParams('payResult', payResult);
							}
						}
					});
				}else{
					util.ui.alert('请输入payInfo');
				}
				
			},
			normalInterfaceTest() {
				util.http.normalReq.post('/me', {
					
				}, (data) => {
					console.log('/me调用成功');
				}, (err) => {
					
				})
			}
		},
		mounted() {
		},
		destroyed() {
		}
	}
</script>

<style scoped>
	.mu-text-field{
		width: calc(100% - 20px);
		margin: 10px;
		background-color: #DBDBDB;
	}
</style>