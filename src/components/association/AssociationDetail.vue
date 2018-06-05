<template>
	<app-wrap>
		<app-bar title="社团详情" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
		</app-bar>
		<app-content slot="appContent">
			<div class="avatar-wrap">
				<img :src="association.assLogo ? association.assLogo : initAssLogo" class="avatar-img" alt="头像" />
			</div>

			<div class="input-content">
				<mu-list>
					<mu-list-item class="input-item">
						<div class="input-item-label">社团名称</div>
						<input type="text" v-model="association.assName" class="input-item-input"/>
					</mu-list-item>
          <mu-list-item class="input-item">
						<div class="input-item-label">成立时间</div>
						<input type="text" v-model="association.assCreate" class="input-item-input"/>
					</mu-list-item>
          <mu-list-item class="input-item">
						<div class="input-item-label">社团简介</div>
						<input type="text" v-model="association.assInfo" class="input-item-input"/>
					</mu-list-item>
          <mu-list-item class="input-item">
						<div class="input-item-label">社团余额</div>
						<input type="text" v-model="association.assMoney" class="input-item-input"/>
            <img src="../../assets/image/icon/get-money.png" class="get-money" @click="bottomPopup = true">
					</mu-list-item>
				</mu-list>

        <mu-popup position="left" :open="bottomPopup" @close="bottomPopup = false">
          <mu-appbar title="团费提现">
            <mu-flat-button slot="right" label="提现" color="white" @click="getMoney"/>
          </mu-appbar>
          <mu-content-block>
            <mu-list>
              <mu-list-item class="input-item">
                <div class="input-item-label">提现金额</div>
                <input type="text" v-model="getMoneyObj.payAmount" class="input-item-input"/>
              </mu-list-item>
              <mu-list-item class="input-item">
                <div class="input-item-label">提现用途</div>
                <input type="text" v-model="getMoneyObj.payInfo" class="input-item-input"/>
              </mu-list-item>
            </mu-list>
          </mu-content-block>
        </mu-popup>
			</div>
			
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'associationDetail',
		data() {
			return {
        user: {},
        association: {},  //当前社团对象
        bottomPopup: false, //底部弹窗

        //提现对象
        getMoneyObj: {  
          payeeAccount: 'fmtqdo6505@sandbox.com', //提现账户
          assId: null,
          payAmount: null,  //提现金额
          payInfo: null //提现说明
        },

        initAssLogo: require("../../assets/image/other/demoTemp/ymqtx.jpg"),
			}
		},
		methods: {
      getMoney() {  //提现
        let getMoneyObj = this.getMoneyObj;
        //提现校验
        if(!getMoneyObj.payAmount){
          util.ui.alert('请输入提现金额');
          return;
        }else{
          let reg = /^[1-9]\d*$/;
          if(reg.test(getMoneyObj.payAmount)){
            if(getMoneyObj.payAmount > this.association.assMoney){
              util.ui.alert('提现金额不能比当前社团余额大');
              return;
            }
          }else{
            util.ui.alert('请输入合法的提现金额');
            return;
          }
        }
        if(!getMoneyObj.payInfo){
          util.ui.alert('请输入提现用途后方可提现');
          return;
        }

        util.ui.showLoading('CENTER');
        //进行提现操作
        util.http.normalReq.post(
        "/aliPay/trade/toaccount",
        getMoneyObj,
        data => {
          console.log(JSON.stringify(data))
          if(data.result){
            this.association.assMoney = parseInt(this.association.assMoney) - parseInt(this.getMoneyObj.payAmount) + '';
            util.ui.toast('提现成功', 'SUCCESS');
            this.bottomPopup = false;
          }else{
            util.ui.toast('提现失败', 'WARN');
          }
        }, err => {

        }, window.ipStr)
      }
		},
		mounted() {
      this.user = util.cache.get('user');
      this.association = this.getRouterDataObj();
      this.getMoneyObj.assId = this.association.assId;
		}
	}
</script>

<style scoped>
	.avatar-wrap {
		margin-top: 20px;
		text-align: center;
	}
	
	.avatar-img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		box-shadow: 0 0 0 2px white;
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
  .get-money{
    position: absolute;
    right: 10px;
    top: 15px;
    width: 25px;
    height: 25px;
    animation: arrowDownAndUp 0.8s infinite linear;
  }
  @keyframes arrowDownAndUp{
    0%{
      top: 15px;
    }
    50%{
      top: 20px;
    }
    100%{
      top: 15px;
    }
  }
</style>