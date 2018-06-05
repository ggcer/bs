<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar title="我的账单" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="goBack"/>
		</app-bar>
		
		<app-content slot="appContent" :refreshMethod="refresh">
      <div class="ma-search">
				<img src="../../assets/image/icon/search.png" class="search-icon">
				<input type="search" id="head-search" v-model="searchKeyword" class="head-search" placeholder="从我的账单中搜索...">
			</div>
      <div class="invite-item" :key="index" v-for="(item, index) in payListWithSortAndFilterKeyword" @click="goToDetail(item)" :style="{backgroundImage: 'url(' + payBgSrc + ')'}">
    		<div class="item-top">
          <div class="item-top" style="float: left; margin-left: 30px;">
            支付类型：<span v-html="item.type"></span>
          </div>
    		</div>
    		<div class="item-bottom">
    			<div style="float: left; margin-left: 30px;">
    				支付给：<span v-html="item.assName"></span>
    			</div>
    			<div style="float: right; margin-right: 30px;">
    				支付状态：<span v-html="item.payStates"></span>
    			</div>
    		</div>
    	</div>
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'payList',
		data() {
			return {
        searchKeyword: null,  //搜索关键字
        user: {},
        payList: [],

        payBgSrc: require('../../assets/image/other/pay-bg.png')
			}
		},
		methods: {
      refresh() {
        let reqObj = {
          userId: this.user.userId
        }
        //查询用户的订单列表
        util.http.normalReq.post(
          "/userPay/queryList",
          reqObj,
          data => {
            util.ui.hideLoading("TOP");
            console.log(JSON.stringify(data));
            this.payList = data.data;
            //转译payList
            this.payList.forEach((item, index) => {
              //payInfo
              if(!item.payInfo){
                item.payInfo = '无';
              }
              //payStates
              if(item.payStates){
                if(item.payStates == '0'){
                  item.payStates = '未支付';
                }else if(item.payStates == '1'){
                  item.payStates = '支付成功';
                }else if(item.payStates == '2'){
                  item.payStates = '支付异常';
                }
              }
              //type
              if(item.type){
                if(item.type == '1'){
                  item.type = '入团费';
                }else if(item.type == '2'){
                  item.type = '平时团费';
                }else if(item.type == '3'){
                  item.type = '赞助';
                }
              }
              //createTime
              if(item.createTime){
                item.createTime = util.common.formatDateObjToDateStr(
                  new Date(item.createTime)
                );
              }
            })
          },
          err => {

          }, window.ipStr);
      },
      goBack() {
				this.back();
      },
      goToDetail(item) {
        console.log(item);
        this.goWithQuery('payDetail', item);
      }
    },
    computed: {
      payListWithSortAndFilterKeyword: function() {
        let temp = [];
        let payListWithFilterKeyword = [];
        //先根据关键字过滤数据
        this.payList.forEach((item, index) => {
          if (this.searchKeyword) {
            if (
              item.assName.indexOf(this.searchKeyword) != -1 ||
              item.payStates.indexOf(this.searchKeyword) != -1 ||
              item.type.indexOf(this.searchKeyword) != -1
            ) {
              //浅拷贝对象(展示的list与实际list不同，展示的list中有可能带keyword高亮的部分)
              let pushItem = util.common.shallowCopyObj(item);
              //查找keyword匹配项
              let assNameRegStr = this.searchKeyword;
              let assNameReg = new RegExp(assNameRegStr, "gim");
              pushItem.assName = pushItem.assName.replace(
                assNameReg,
                '<span class="red-span">' + this.searchKeyword + "</span>"
              );
              let payStatesRegStr = this.searchKeyword;
              let payStatesReg = new RegExp(payStatesRegStr, "gim");
              pushItem.payStates = pushItem.payStates.replace(
                payStatesReg,
                '<span class="red-span">' + this.searchKeyword + "</span>"
              );
              let typeRegStr = this.searchKeyword;
              let typeReg = new RegExp(typeRegStr, "gim");
              pushItem.type = pushItem.type.replace(
                typeReg,
                '<span class="red-span">' + this.searchKeyword + "</span>"
              );
              payListWithFilterKeyword.push(pushItem);
            }
          } else {
            payListWithFilterKeyword.push(item);
          }
        });
        return temp.concat(payListWithFilterKeyword)
      }
    },
		mounted() {
      this.user = util.cache.get('user');
      util.ui.showLoading('CENTER');
      this.refresh();      
		},
		destroyed() {
		}
	}
</script>

<style scoped>
.invite-item{
  margin: 10px auto;
  width: 96%;
  height: 100px;
  background-size: 100% 100%;
  background-position: center center;
  color: #FFFFFF;
  
}
.invite-item .item-top{
  height: 50px;
  line-height: 50px;
  font-size: 15px;
}
.invite-item .item-bottom{
  height: 50px;
  line-height: 50px;
  font-size: 12px;
}
.ma-search {
  width: 100%;
  padding: 5px 0;
  overflow: hidden;
  background-color: white;
}
.search-icon {
  margin-left: 15px;
  margin-top: 4px;
  width: 20px;
  height: 20px;
  float: left;
}
.head-search {
  padding: 5px 15px;
  height: 28px;
  outline: none;
  border: none;
  font-size: 14px;
  color: #4b4b4b;
  float: left;
  background-color: white;
}
</style>