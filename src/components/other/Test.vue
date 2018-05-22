<template>
  <app-wrap>
    <!-- 标题栏 -->
    <app-bar title="调试" slot="appBar">
      <mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
    </app-bar>

    <app-content slot="appContent">
      <mu-list>
        <mu-list-item class="input-item">
          <div class="input-item-label">支付人ID</div>
          <input type="text" v-model="pay.payUser" readonly class="input-item-input" placeholder="未填写"/>
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">支付金额</div>
          <input type="text" v-model="pay.payAmount" class="input-item-input" placeholder="未填写"/>
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">支付用途</div>
          <input type="text" v-model="pay.payInfo" class="input-item-input" placeholder="未填写"/>
        </mu-list-item>
      </mu-list>
      <mu-raised-button label="支 付 宝 支 付 调 试" primary fullWidth @click="alipayDebug" />

      <mu-list>
        <mu-list-item class="input-item">
          <div class="input-item-label">转账给</div>
          <input type="text" v-model="withdraw.payeeAccount" readonly class="input-item-input" placeholder="未填写"/>
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">转账金额</div>
          <input type="text" v-model="withdraw.payAmount" class="input-item-input" placeholder="未填写"/>
        </mu-list-item>
        <mu-list-item class="input-item">
          <div class="input-item-label">转账用途</div>
          <input type="text" v-model="withdraw.payInfo" class="input-item-input" placeholder="未填写"/>
        </mu-list-item>
      </mu-list>
      <mu-raised-button label="支 付 宝 转 账 调 试" primary fullWidth @click="aliWithdrawDebug" /><br>
      <mu-raised-button label="登 录 后 普 通 接 口 调 试" primary fullWidth @click="normalInterfaceTest" />
    </app-content>
  </app-wrap>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return {
        pay: {
          payUser: '123456',
          payAmount: null,
          payInfo: null,
        },
        withdraw: {
          payeeAccount: 'fmtqdo6505@sandbox.com',
          payAmount: null,
          payInfo: null
        }
      }
    },
    methods: {
      alipayDebug() {
        if (this.pay.payUser && this.pay.payAmount && this.pay.payInfo) {
          util.ui.showLoading('CENTER');
          util.http.normalReq.post('/aliPay/order/sign', this.pay, (data) => {
            if(data.data){
              util.cordovaNative.callAlipay(data.data, (payResult) => {
                if (payResult) {
                  //用户取消不进入支付结果页面
                  if (payResult.resultStatus != 6001) {
                    this.goWithParams('payResult', payResult);
                  }
                }
              });
            }else{
              util.ui.alert('不存在的data属性');
            }
          }, (err) => {

          })
        } else {
          util.ui.alert('请输入完整的支付信息');
        }
      },
      aliWithdrawDebug() {
        if (this.withdraw.payeeAccount && this.withdraw.payAmount && this.withdraw.payInfo) {
          util.ui.showLoading('CENTER');
          util.http.normalReq.post('/aliPay/trade/toaccount', this.withdraw, (data) => {
            util.ui.alert(data);
          }, (err) => {
          })
        }else{
          util.ui.alert('请输入完整的转账信息');
        }
      },
      normalInterfaceTest() {
        util.ui.showLoading('CENTER');
        util.http.normalReq.post('/me', {

        }, (data) => {
          util.ui.alert('/me调用成功');
        }, (err) => {

        })
      }
    },
    mounted() {},
    destroyed() {}
  }

</script>

<style scoped>

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
