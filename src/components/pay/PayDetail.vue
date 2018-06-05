<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar title="账单详情" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="goBack"/>
		</app-bar>
		
		<app-content slot="appContent">
      <mu-list class="pay-list">
        <mu-list-item class="input-item">
          <div class="input-item-label">支付单号</div>
          <input type="text" v-model="payDetail.orderId" :disabled="true" class="input-item-input"/>
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">支付流水号</div>
          <input type="text" v-model="payDetail.payId" :disabled="true" class="input-item-input"/>
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">支付人</div>
          <input type="text" v-model="user.userName" :disabled="true" class="input-item-input"/>
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">支付给</div>
          <input type="text" v-model="payDetail.assName" :disabled="true" class="input-item-input" >
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">支付类型</div>
          <input type="text" v-model="payDetail.type" :disabled="true" class="input-item-input" >
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">支付说明</div>
          <input type="text" v-model="payDetail.payInfo" :disabled="true" class="input-item-input" >
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">支付时间</div>
          <input type="text" v-model="payDetail.createTime" :disabled="true" class="input-item-input" >
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">支付状态</div>
          <input type="text" v-model="payDetail.payStates" :disabled="true" class="input-item-input" >
        </mu-list-item>
      </mu-list>
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'payDetail',
		data() {
			return {
        user: {},
        payDetail: {}
			}
		},
		methods: {
      goBack() {
				this.back();
			}
		},
		mounted() {
      this.user = util.cache.get('user');
      //获取上一个页面的对象
      this.payDetail = this.getRouterDataObj();
		},
		destroyed() {
		}
	}
</script>

<style scoped>
  .pay-list{
    padding-top: 0;
  }
  .input-item {
		background-color: white;
		width: 100%;
	}
	
	.input-item-label {
		width: 100px;
		float: left;
		height: 30px;
		line-height: 30px;
		letter-spacing: 2px;
	}
	
	.input-item-input {
		width: 30px;
		height: 30px;
		float: left;
		width: calc(100% - 100px);
		border: none;
		outline: none;
		background-color: transparent;
	}
</style>