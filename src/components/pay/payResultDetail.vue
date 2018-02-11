<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar title="支付详情" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back"/>
		</app-bar>
		
		<app-content slot="appContent">
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'payResultDetail',
		data() {
			return {
				payResult: {},
			}
		},
		methods: {
		},
		mounted() {
			this.payResult = this.getRouterDataObj();
		},
		destroyed() {
		}
	}
</script>

<style scoped>
</style>