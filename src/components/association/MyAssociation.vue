<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar title="我的社团" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back"/>
		</app-bar>
		
		<app-content slot="appContent" :refreshMethod="refresh">
			<div class="ma-search">
				<img src="../../assets/image/icon/search.png" class="search-icon">
				<input type="search" id="head-search"v-model="searchKeyword" class="head-search" placeholder="从我的社团中搜索...">
			</div>
			<div class="sort-row">
				<div class="sort-row-col">
		  			<span class="order-span" @click="sort('RECENTLY_VIEWED')">
						<span v-bind:class="{'blue-span':user.MASortField == 'RECENTLY_VIEWED'}">最近浏览</span>
						<div class="triangle-wrap">
							<img src="../../assets/image/icon/triangle-up.png" v-show="user.MASortField != 'RECENTLY_VIEWED' || user.MASortType !== ''">
							<img src="../../assets/image/icon/triangle-up-active.png" v-show="user.MASortField == 'RECENTLY_VIEWED' && user.MASortType === ''">
							<img src="../../assets/image/icon/triangle-down.png" v-show="user.MASortField != 'RECENTLY_VIEWED' || user.MASortType !== '-'">
							<img src="../../assets/image/icon/triangle-down-active.png" v-show="user.MASortField == 'RECENTLY_VIEWED' && user.MASortType === '-'">
						</div>
					</span>
		  		</div>
		  		<div class="sort-row-col">
		  			<span class="order-span" @click="sort('ACTIVENESS')">
						<span v-bind:class="{'blue-span':user.MASortField == 'ACTIVENESS'}">活跃度</span>
						<div class="triangle-wrap">
							<img src="../../assets/image/icon/triangle-up.png" v-show="user.MASortField != 'ACTIVENESS' || user.MASortType !== ''">
							<img src="../../assets/image/icon/triangle-up-active.png" v-show="user.MASortField == 'ACTIVENESS' && user.MASortType === ''">
							<img src="../../assets/image/icon/triangle-down.png" v-show="user.MASortField != 'ACTIVENESS' || user.MASortType !== '-'">
							<img src="../../assets/image/icon/triangle-down-active.png" v-show="user.MASortField == 'ACTIVENESS' && user.MASortType === '-'">
						</div>
					</span>
		  		</div>
		  		<div class="sort-row-col">
		  			<span class="order-span" @click="sort('JOIN_DATE')">
						<span v-bind:class="{'blue-span':user.MASortField == 'JOIN_DATE'}">加入时间</span>
						<div class="triangle-wrap">
							<img src="../../assets/image/icon/triangle-up.png" v-show="user.MASortField != 'JOIN_DATE' || user.MASortType !== ''">
							<img src="../../assets/image/icon/triangle-up-active.png" v-show="user.MASortField == 'JOIN_DATE' && user.MASortType === ''">
							<img src="../../assets/image/icon/triangle-down.png" v-show="user.MASortField != 'JOIN_DATE' || user.MASortType !== '-'">
							<img src="../../assets/image/icon/triangle-down-active.png" v-show="user.MASortField == 'JOIN_DATE' && user.MASortType === '-'">
						</div>
					</span>
		  		</div>
		  		<div class="show-type">
		  			<img src="../../assets/image/icon/grid.png" @click="user.isMAGrid = !user.isMAGrid" v-show="user.isMAGrid">
		  			<img src="../../assets/image/icon/laptop.png" @click="user.isMAGrid = !user.isMAGrid" v-show="!user.isMAGrid">
		  		</div>
			</div>
			<div class="common-item-wrap">
				<div class="common-item" v-bind:class="{'common-item-laptop': !user.isMAGrid}" v-for="(item, index) in myAssociationListWithSortAndFilterKeyword" @click="goToAssociationHome(item)">
					<img :src="item.associationBgImg" class="common-item-img" v-bind:class="{'common-item-img-laptop': !user.isMAGrid}">
					<div class="common-item-tip" v-bind:class="{'common-item-tip-laptop': !user.isMAGrid}">
						<img src="../../assets/image/icon/fire.png" class="common-item-tip-icon" v-bind:class="{'common-item-tip-icon-laptop': !user.isMAGrid}"> {{item.hotCount}}
						<img src="../../assets/image/icon/member.png" class="common-item-tip-icon" v-bind:class="{'common-item-tip-icon-laptop': !user.isMAGrid}" style="margin-left: 5px;"> {{item.orgMemberCount}}
					</div>
					<p class="common-item-desc" v-html="item.desc"></p>
					<p class="common-item-add-desc" v-html="item.addDesc"></p>
				</div>
			</div>
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'myAssociation',
		data() {
			return {
				user: {},
				searchKeyword: '',
				myAssociationList: [{
					associationBgImg: require('../../assets/image/other/demoTemp/ymq.jpg'),
					desc: '渤海大学羽毛球协会欢迎广大渤大的学生加入本社，共同交流技术',
					addDesc: '羽毛球协会',
					hotCount: 1290,
					orgMemberCount: 51,
					joinDate: '2018-01-21 18:56:43',	
					
					recentlyVisitedDate: '2018-02-08 00:00:08'
				},{
					associationBgImg: require('../../assets/image/other/demoTemp/bwt.jpg'),
					desc: '青春激情飞扬，没有极限...',
					addDesc: '渤舞堂',
					hotCount: 995,
					orgMemberCount: 39,
					joinDate: '2018-01-17 15:50:33',
					
					recentlyVisitedDate: '2018-02-03 08:30:38'
				},{
					associationBgImg: require('../../assets/image/other/demoTemp/sfxh.jpg'),
					desc: '以文会友，活动地址渤海大学图书馆，报名请加微信群',
					addDesc: '书法协会',
					hotCount: 723,
					orgMemberCount: 102,
					joinDate: '2018-01-20 14:22:31',
					
					recentlyVisitedDate: '2018-02-06 21:11:15'
				},{
					associationBgImg: require('../../assets/image/other/demoTemp/blxh.jpg'),
					desc: '舌战群儒，毫无畏惧',
					addDesc: '辩论协会',
					hotCount: 1290,
					orgMemberCount: 51,
					joinDate: '2018-01-31 19:26:03',
					
					recentlyVisitedDate: '2018-02-06 11:31:52'
				}],
			}
		},
		methods: {
			refresh() {
				setTimeout(() => {
					util.ui.hideLoading('TOP');
				}, 2000)
			},
			sort(sortField) {
				if(this.user.MASortField == sortField){
					this.user.MASortType = this.user.MASortType == '' ? '-' : '';
					return;
				}
				this.user.MASortField = sortField;
				this.user.MASortType = '-';
			},
			goToAssociationHome(associationData){
				this.goWithParams('associationHome', associationData);
			}
 		},
 		computed: {
 			myAssociationListWithSortAndFilterKeyword: function() {
 				let temp = [];
 				let myAssociationListWithFilterKeyword = [];
 				//先根据关键字过滤数据
 				this.myAssociationList.forEach((item, index) => {
 					if(this.searchKeyword){
 						if(item.desc.indexOf(this.searchKeyword) != -1 || item.addDesc.indexOf(this.searchKeyword) != -1){
	 						//浅拷贝对象(展示的list与实际list不同，展示的list中有可能带keyword高亮的部分)
	 						let pushItem = util.common.shallowCopyObj(item);
	 						//查找keyword匹配项
	 						let descRegStr=this.searchKeyword;
							let descReg =new RegExp(descRegStr, 'gim');
							pushItem.desc = pushItem.desc.replace(descReg, '<span class="red-span">' + this.searchKeyword + '</span>');
							
	 						let addDescRegStr=this.searchKeyword;
							let addDescReg =new RegExp(addDescRegStr, 'gim');
							pushItem.addDesc = pushItem.addDesc.replace(addDescReg, '<span class="red-span">' + this.searchKeyword + '</span>');
	 						myAssociationListWithFilterKeyword.push(pushItem);
	 					}
 					}else{
 						myAssociationListWithFilterKeyword.push(item);
 					}
 				})
				return temp.concat(myAssociationListWithFilterKeyword).sort((val1,val2) => {
					let val1CompareValue;
					let val2CompareValue;
					if(this.user.MASortField == 'RECENTLY_VIEWED'){
						val1CompareValue = util.common.formatDateStrToDateObj(val1.recentlyVisitedDate).getTime();
						val2CompareValue = util.common.formatDateStrToDateObj(val2.recentlyVisitedDate).getTime();
					}else if(this.user.MASortField == 'ACTIVENESS'){
						val1CompareValue = val1.hotCount
						val2CompareValue = val2.hotCount;
					}else if(this.user.MASortField == 'JOIN_DATE'){
						val1CompareValue = util.common.formatDateStrToDateObj(val1.joinDate).getTime();
						val2CompareValue = util.common.formatDateStrToDateObj(val2.joinDate).getTime();
					}
					if(val1CompareValue > val2CompareValue){
						return this.user.MASortType == '-' ? -1 : 1
					}else if(val1CompareValue < val2CompareValue){
						return this.user.MASortType == '-' ? 1 : -1 
					}else{
						return 0;
					}
				});
 			},
 		},
		mounted() {
			this.user = util.cache.get('user');
		},
		destroyed() {
			util.cache.set('user', this.user);
		}
	}
</script>

<style scoped>
	.ma-search{
		width: 100%;
		padding: 5px 0;
		overflow: hidden;
		background-color: white;
	}
	.search-icon{
		margin-left: 15px;
		margin-top: 4px;
		width: 20px;
		height: 20px;
		float: left;
	}
	.head-search{
		padding: 5px 15px;
		height: 28px;
		outline:none;
		border: none;
		font-size: 14px;
		color: #4B4B4B;
		float: left;
		background-color: white;
	}
	.sort-row{
		width: 100%;
		display: flex;
		margin-top: 5px;
	}
	.sort-row .sort-row-col{
		height: 30px;
		flex: 2;
	}
	.show-type{
		height: 30px;
		line-height: 30px;
		flex: 1;
	}
	.show-type img{
		display: block;
		width: 18px;
		height: 18px;
		margin: 6px 15px;
		float: right;
	}
	.order-span{
		display: inline-block;
		height: 30px;
		width: 85px;
		margin-left: 15px;
	}
	.order-span span{
		display: inline-block;
		height:30px;
		line-height: 30px;
		float: left;
		font-size: 14px;
		letter-spacing: 1px;
		color: #707070;
		text-align: left;
		
	}
	.order-span .triangle-wrap{
		width: 10px;
		height: 20px;
		margin-left: 5px;
		margin-top: 5px;
		float: left;	
	}
	.order-span .triangle-wrap img{
		width: 10px;
		height: 10px;
		display: block;
	}
	.order-span .ion-arrow-up-b{
		margin-top: 5px;
	}
	.common-item-wrap {
		overflow: hidden;
	}
	.common-item-wrap h4{
		height: 20px;
		line-height: 20px;
		color: rgba(0, 0, 0, 0.54);
		text-align: left;
		margin-left: 10px;
		border-left: 2px solid #7DBBFF;
		padding: 0 10px;
		font-size: 15px;
		font-weight: normal;
		letter-spacing: 2px;
	}
	.common-item-btn{
		width: 20px;
		height: 20px;
		vertical-align: middle;
		float: right;
		margin-left: 10px;
	}
	.common-item{
		position: relative;
		width: calc(50% - 15px);
		margin-left: 10px;
		float: left;
		border-radius: 6px;
		background-color: white;
		box-shadow: 1px 1px 0.5px 0.5px #DDDDDD;
		margin-top: 10px;
	}
	.common-item-laptop{
		width: calc(100% - 20px);
		transition: all 0.3s;
	}
	.common-item-img{
		width: calc(100% + 0.5px);
		height: 100px;
		border-radius: 6px 6px 0 0;
	}
	.common-item-img-laptop{
		height: 200px;
		transition: all 0.3s;
	}
	.common-item-tip{
		position: absolute;
		left: 0;
		top: 80px;
		width: calc(100% + 0.5px);
		height: 20px;
		line-height: 20px;
		background-color: rgba(0, 0, 0, 0.3);
		color: white;
		font-size: 12px;
		text-align: right;
		padding-right: 8px;
	}
	.common-item-tip-laptop{
		top: 170px;
		height:30px;
		line-height: 30px;
		font-size: 14px;
		transition: all 0.3s;
	}
	.common-item-tip-icon{
		width: 13px;
		height: 13px;
		vertical-align: middle;
	}
	.common-item-tip-icon-laptop{
		width: 16px;
		height: 16px;
	}
	.common-item-desc{
		padding: 0 10px;
		letter-spacing: 1px;
		font-size: 14px;
		line-height: 20px;
		height: 40px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #4B4B4B;
	}
	.common-item-add-desc{
		padding: 0 10px;
		letter-spacing: 1px;
		font-size: 13px;
		line-height: 30px;
		color: #757575;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>