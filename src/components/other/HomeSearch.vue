<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back"/>
			<div slot="title" class="search-title">
				<img src="../../assets/image/icon/search.png" class="search-icon">
				<input type="search" v-model="searchDesc" id="head-search" class="head-search" placeholder="搜索社团、大学、 搜你感兴趣的">
			</div>
			<div slot="right" class="text-btn" @click="switchActiveSRHIAbled ? search() : ''">搜索</div>
		</app-bar>
		
		<app-content slot="appContent">
			<transition name="leftToRight05">
				<div class="search-suggest" v-if="!isShowSearchResult">
					<mu-list>
						<mu-sub-header>大家都在搜</mu-sub-header>
						<div class="search-item-wrap">
							<div class="search-item" :key="index" v-for="(item, index) in searchSuggestList" @click="searchDesc = item.desc; search()">
								{{item.desc}}
							</div>
						</div>
					</mu-list>
					<mu-list v-show="searchRecord.length > 0">
						<mu-sub-header>搜索记录</mu-sub-header>
						<mu-list-item disableRipple v-for="(item, index) in searchRecord" :key="index" :title="item.desc" @click="searchDesc = item.desc; search()">
							<mu-icon-button icon="icon-shanchu" slot="right" @click.stop="searchRecord.splice(index, 1)" style="color: #F97A7A"/>
						</mu-list-item>
						<div class="full-btn-wrap">
							<mu-raised-button icon="icon-lajitong" v-show="searchRecord.length > 1" @click="emptySearchRecord" label="清 空 历 史 记 录" primary fullWidth/>
						</div>
					</mu-list>
				</div>
			</transition>
			
			<transition name="rightToLeft05">
				<div id="search-result" class="search-result" v-if="isShowSearchResult">
					<div class="org-full-item-wrap" v-show="nowActiveSearchResultHeaderItemIndex == 0">
						<div class="org-full-item" :key="index" v-for="(item, index) in searchResultList">
							<img :src="item.imgSrc" />
							<div class="org-full-item-right">
								<h4>{{item.title}}</h4>
								<p class="desc">{{item.desc}}</p>
								<p class="more">
									<img src="../../assets/image/icon/position.png" class="more-icon"/>
									{{item.position}}
								</p>
							</div>
						</div>
					</div>
				
					<div class="org-full-item-wrap" v-show="nowActiveSearchResultHeaderItemIndex == 1">
						<div class="org-full-item" :key="index" v-for="(item, index) in searchResultList">
							<img :src="item.imgSrc" />
							<div></div>
						</div>
					</div>
				
					<div class="org-full-item-wrap" v-show="nowActiveSearchResultHeaderItemIndex == 2">
						<div class="org-full-item" :key="index" v-for="(item, index) in searchResultList">
							<img :src="item.imgSrc" />
							<div></div>
						</div>
					</div>
				
					<div class="org-full-item-wrap" v-show="nowActiveSearchResultHeaderItemIndex == 3">
						<div class="org-full-item" :key="index" v-for="(item, index) in searchResultList">
							<img :src="item.imgSrc" />
						</div>
					</div>
					
					<!--无记录-->
					<div class="no-record-wrap" v-show="isNoRecord">
						<div class="no-record">
							<img src="../../assets/image/other/no-record.png"/>
							<p class="no-record-desc">搜索结果和我一样都是一片空白</p>
						</div>
					</div>
				</div>
			</transition>
			
			<transition name="fadeIn">
				<div class="search-result-header" v-show="isShowSearchResult">
					<div class="search-result-header-item" :key="index" v-for="(item, index) in searchResultHeaderItem" 
						@click="switchActiveSRHIAbled ? switchActiveSRHI(index) : ''">
						{{item.desc}}
						<div id="active-item-bottom-line" class="active-item-bottom-line" v-if="index == 0"></div>
					</div>
				</div>
			</transition>
			
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'homeSearch',
		data() {
			return {
				user: {},
				searchDesc: null,
				isShowSearchResult: false,
				nowActiveSearchResultHeaderItemIndex: 0,
				
				isNoRecord: false,
				switchActiveSRHIAbled: true,		//当前时候能切换查询结果标签页
				searchResultHeaderItem: [{
					desc: '社团'
				},{
					desc: '活动'
				},{
					desc: '学校'
				},{
					desc: '用户'
				},],
				
				searchSuggestList: [{
					desc: '羽毛球社'
				},{
					desc: '篮球社'
				},{
					desc: '跑协'
				},{
					desc: '跆拳道社'
				},{
					desc: '尚武堂'
				},{
					desc: '辩协'
				},],
				
				searchResultList: [],
				searchRecord: [],				
			}
		},
		methods: {
			search() {
				$('#head-search').blur();
				
				if(!this.searchDesc){
					util.ui.alert('请先输入搜索内容');
					return;
				}
				
				//清空原有数据
				this.searchResultList = [];
				
				this.isShowSearchResult = true;
				$('#loading-wrap').css('top', 109);
				
				//将搜索记录存入缓存
				this.searchRecord.forEach((item, index) => {
					if(item.desc == this.searchDesc){
						this.searchRecord.splice(index, 1)
					}
				})
				this.searchRecord.unshift({
					desc: this.searchDesc
				});
				
				//调用搜索方法
				this.switchActiveSRHI(this.nowActiveSearchResultHeaderItemIndex);
				
			},
			switchActiveSRHI(index) {
				let left = $($('.search-result-header-item').get(index)).offset().left;
				if(index == 0){
					left = 20;
				}
				$('#active-item-bottom-line').css('left', left - 20);
				this.nowActiveSearchResultHeaderItemIndex = index;
				
				this.searchResultList = [];
				
				$('#loading-wrap').css('top', 109);
				util.ui.showLoading('CENTER');
				this.switchActiveSRHIAbled = false;
				this.isNoRecord = false;
				setTimeout(() => {
					util.ui.hideLoading('CENTER');
					this.switchActiveSRHIAbled = true;
					$('#loading-wrap').css('top', 0);
					if(index != 0){
						this.isNoRecord = true;
					}else{
						this.searchResultList =	[{
							title: '羽毛球协会',
							imgSrc: require('../../assets/image/swiper/swiper1.jpg'),
							desc: '渤海大学羽毛球协会欢迎广大渤大的学生加入本社，共同交流技术，促进共同发展',
							position: '辽宁 锦州 渤海大学'
						},{
							title: '辩论协会',
							imgSrc: require('../../assets/image/swiper/swiper2.jpg'),
							desc: '舌战群儒，毫无畏惧',
							position: '辽宁 锦州 渤海大学'
						},{
							title: '书法协会',
							imgSrc: require('../../assets/image/swiper/swiper3.jpg'),
							desc: '以文会友，活动地址渤海大学图书馆，报名请加微信群',
							position: '辽宁 锦州 渤海大学'
						}]
					}
				}, 2000);
			},
			emptySearchRecord() {
				util.ui.confirm('确定清空所有搜索记录吗', () => {
					this.searchRecord = [];
				})
			}
		},
		mounted() {
			$('#app-wrap').off('scroll');
			this.user = util.cache.get('user');
			this.searchRecord = this.user.searchRecord;
			$('#head-search').width($(window).width() - 150);
			$('#head-search').focus();
			$('#head-search').focus(() => {
				util.ui.hideLoading('CENTER');
				this.isShowSearchResult = false;
			})
			$("#head-search").on('keypress',(e) => {  
	            let keycode = e.keyCode;  
	            if(keycode=='13') {
	            	this.search();
	                e.preventDefault();    
	            }  
	        }); 
			$(window).resize(() => {
				console.log('window resize');
				$('#head-search').width($(window).width() - 150);
			})
		},
		destroyed() {
			//保存更新搜索记录的user
			util.cache.set('user', this.user);
			$("#head-search").off('keypress');
		}
	}
</script>

<style scoped>
	.app-bar{
		transition: all 0.5s!important;
		background-color: #4AA1FF!important;
	}
	.search-title{
		position: relative;
	}
	.head-search{
		background-color: white;
		padding: 5px 15px 5px 30px;
		height: 28px;
		width: 250px;
		outline:none;
		border: none;
		border-radius: 15px;
		font-size: 14px;
		color: #4B4B4B;
		position: relative;
		left: -10px;
	}
	.search-icon{
		position: absolute;
		z-index: 2;
		top: 15px;
		left: 50px;
		width: 20px;
		height: 20px;
	}
	.app-content{
		padding-top: 0!important;
	}
	.search-suggest{
		position: absolute;
		top: 70px;
		left: 0;
		width: 100%;
	}
	.search-item-wrap{
		padding-left: 16px;
		overflow: hidden;
		margin-top: -10px;
		padding-bottom: 20px;
		border-bottom: 1px dashed #CCCCCC;
	}
	.search-item{
		color: #757575;
		padding: 5px 10px;
		background-color: rgba(204, 204, 204, 0.5);
		float: left;
		border-radius: 5px;
		margin-right: 10px;
		margin-top: 10px;
	}
	
	.mu-item{
		padding: 0!important;
	}
	.full-btn-wrap{
		width: 60%;
		margin-left: 20%;
	}
	.search-result{
		position: absolute;
		top: 109px;
		left: 0;
		width: 100%;
	}
	.search-result-header{
		position: fixed;
		display: flex;
		top: 69px;
		left: 0;
		width: calc(100% + 1px);
		height: 40px;
		background-color: #4AA1FF;
	}
	.search-result-header .search-result-header-item{
		position: relative;
		flex: 1;
		text-align: center;
		height: 39px;
		line-height: 39px;
		margin: 0 20px;
		color: white;
	}
	.active-item-bottom-line{
		position: absolute;
		left: 0;
		bottom: -1px;
		width: 100%;
		height: 3px;
		background-color: white;
		transition: all 0.5s;
	}
	
	.org-full-item{
		width: 100%;
		padding: 10px;
		margin-bottom: 5px;
		position: relative;
		background-color: white;
		overflow: hidden;
	}
	.org-full-item img{
		float: left;
		border-radius: 6px;
		width: 140px;
		height: 80px;
	}
	.org-full-item-right{
		float: left;
		position: relative;
		margin-left: 10px;
		width: calc(100% - 150px);
		height: 80px;
	}
	.org-full-item-right h4{
		font-size: 15px;
		font-weight: normal;
		letter-spacing: 2px;
		color: #4B4B4B;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.org-full-item-right .desc{
		margin-top: 5px;
		font-size: 11px;
		color: #A8A8A8;
		font-weight: normal;
		letter-spacing: 1px;
		line-height: 15px;
		height: 30px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.org-full-item-right .more{
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 11px;
		color: #A8A8A8;
		width: 100%;
		height: 15px;
		line-height: 15px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.org-full-item-right .more .more-icon{
		width: 14px;
		height: 14px;
		margin-right: 5px;
		vertical-align: middle;
	}
	
	.no-record-wrap{
		position: fixed;
		top: 109px;
		width: 100%;
		height: calc(100% - 109px);
	}
	.no-record{
		position: absolute;
		width: 100%;
		/*105 * 1.5*/
		height: 157.5px;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
	.no-record-wrap img{
		display: block;
		width: 80px;
		margin: 0 auto;
		height: 80px;
	}
	.no-record-wrap .no-record-desc{
		margin-top: 5px;
		height: 20px;
		line-height: 20px;
		font-size: 13px;
		text-align: center;
		letter-spacing: 1px;
		color: #A8A8A8;
	}
</style>