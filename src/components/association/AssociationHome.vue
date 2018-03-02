<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar :title="isShowAppTitle ? associationName : ''" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back"/>
		</app-bar>
		
		<app-content slot="appContent" :loadMoreMethod="loadMoreActivity" :loadMoreDesc="loadMoreDesc">
			<div class="association-bg-img" id="association-bg-img" :style="{backgroundImage: 'url(' + (association.associationBgImg ? association.associationBgImg : initAssociationBgImg) + ')'}"></div>
			<transition name="fadeIn">
				<div class="user-base-msg" v-show="!isShowAppTitle">
					<img :src="association.associationHeadImg ? association.associationHeadImg : initAssociationHeadImg" class="user-avatar-img">
					<h4 v-html="associationName"></h4>
					<div class="common-item-tip">
						<img src="../../assets/image/icon/fire.png" class="common-item-tip-icon"> {{association.hotCount}}
						<img src="../../assets/image/icon/member.png" class="common-item-tip-icon" style="margin-left: 5px;"> {{association.orgMemberCount}}
					</div>
					<p v-html="association.desc ? association.desc : '这个社团长很懒，还没有设置任何社团说明哦'"></p>
				</div>
			</transition>
			<div class="ah-header">
				<div class="ah-header-item" v-bind:class="{'blue-span': nowActiveSearchAHHeaderItemIndex == index}" v-for="(item, index) in ahHeaderItem" @click="switchActiveAHHIAbled ? switchActiveAHHI(index) : ''">
					{{item.desc}}
					<div id="active-item-bottom-line" class="active-item-bottom-line" v-if="index == 0"></div>
				</div>
			</div>
			
			<div class="ah-main">
				<div class="hot-activity-wrap" v-show="nowActiveSearchAHHeaderItemIndex == 0">
					<div class="hot-activity-item" v-for="(item, index) in hotActivityList">
						<div class="leftAvatar-rightDesc-item">
							<div class="lri-avatar">
								<img :src="association.associationHeadImg ? association.associationHeadImg : initAssociationHeadImg" />
							</div>
							<div class="lri-desc">
								<h4>{{association.addDesc}}</h4>
								<p>{{item.hotActivityDate}}</p>
							</div>
						</div>
						<p class="hot-activity-item-desc">
							{{item.hotActivityDesc}}
						</p>
						<div class="hot-activity-item-img-wrap">
							<img :src="imgItem" v-for="(imgItem, imgIndex) in item.hotActivityImgList" @click="showImgViewer(item.hotActivityImgList, imgIndex)"/>
						</div>
						<div class="hot-activity-item-btns">
							<div class="hot-activity-item-btn" @click="showCommentPopup(item)">
								<img src="../../assets/image/icon/liuyan.png">
								{{item.hotActivityPLCount}}
							</div class="hot-activity-item-btn">
							<div class="hot-activity-item-btn" @click="giveTheThumbsUp(item)">
								<img :src="item.isGivenTheThumbsUp ? require('../../assets/image/icon/dianzan-active.png') : require('../../assets/image/icon/dianzan.png')">
								{{item.hotActivityDZCount}}
							</div class="hot-activity-item-btn">
						</div>
					</div>
				</div>
			</div>
			
			<!--评论popup-->
			<transition name="bottomToTop05">
				<div id="comment-popup" class="comment-popup" v-show="isShowCommentPopup">
					<div id="comment-popup-wrap">
						<div class="hot-activity-item" style="padding-top: 20px; margin-top: 0;">
							<div class="leftAvatar-rightDesc-item">
								<div class="lri-avatar">
									<img :src="association.associationHeadImg ? association.associationHeadImg : initAssociationHeadImg" />
								</div>
								<div class="lri-desc">
									<h4>{{association.addDesc}}</h4>
									<p>{{commentItem.hotActivityDate}}</p>
								</div>
							</div>
							<p class="hot-activity-item-desc">
								{{commentItem.hotActivityDesc}}
							</p>
							<div class="hot-activity-item-img-wrap">
								<img :src="imgItem" v-for="(imgItem, imgIndex) in commentItem.hotActivityImgList" @click="showImgViewer(commentItem.hotActivityImgList, imgIndex)"/>
							</div>
							<div class="hot-activity-item-btns">
								<div class="hot-activity-item-btn" @click="showWriteCommentPopup">
									<img src="../../assets/image/icon/liuyan.png">
									{{commentItem.hotActivityPLCount}}
								</div class="hot-activity-item-btn">
								<div class="hot-activity-item-btn" @click="giveTheThumbsUp(commentItem)">
									<img :src="commentItem.isGivenTheThumbsUp ? require('../../assets/image/icon/dianzan-active.png') : require('../../assets/image/icon/dianzan.png')">
									{{commentItem.hotActivityDZCount}}
								</div class="hot-activity-item-btn">
							</div>
						</div>
						<!--评论-->
						<div class="comment-content">
							<h4 class="comment-content-header">
								讨论圈
							</h4>
							<div class="comment-content-item" v-for="(item, index) in commentItem.commentList">
								<div class="leftAvatar-rightDesc-item">
									<div class="lri-avatar">
										<img :src="item.userHeadImg ? item.userHeadImg : initUserHeadImg" />
									</div>
									<div class="lri-desc">
										<h4>{{item.userName}}</h4>
										<p>{{item.commentDate}}</p>
									</div>
								</div>
								<div class="comment-content-text" v-html="item.commentContent"></div>
							</div>
							
							<div class="comment-load-more" v-show="isShowCommentLoadMore" v-html="commentLoadMoreHtml">
								<div class="mu-circle-wrapper  active" style="width: 20px; height: 20px; margin-top: 10px!important">
									<div class="mu-circle-spinner active" style="border-color: #4AA1FF!important">
										<div class="mu-circle-clipper left">
											<div class="mu-circle" style="border-width: 1px;"></div>
										</div>
										<div class="mu-circle-gap-patch">
											<div class="mu-circle"></div>
										</div>
										<div class="mu-circle-clipper right">
											<div class="mu-circle" style="border-width: 1px;"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<img src="../../assets/image/icon/cancel-black.png" class="comment-popup-cancel" @click="hideCommentPopup">
				</div>
			</transition>
			
			<!--评论popup-->
			<transition name="bottomToTop05">
				<div id="write-comment-popup" class="comment-popup write-comment-popup" v-show="isShowWriteCommentPopup">
					<h4 class="comment-popup-title">写下你的评论</h4>
					<textarea class="write-comment-popup-textarea" v-model="writeCommentContent" placeholder="说些什么吧..."></textarea>
					<img src="../../assets/image/icon/cancel-black.png" class="comment-popup-cancel" @click="hideWriteCommentPopup">
					<mu-raised-button label="发 送" class="write-comment-popup-send" :disabled="!writeCommentContent" primary @click="writeComment"/>
				</div>
			</transition>
		</app-content>
	</app-wrap>
</template>

<script>
	import store from '../../vuex/store'
	export default {
		name: 'associationHome',
		data() {
			return {
				isShowAppTitle: false,
				user: {},
				association: {},
				associationName: null,
				nowActiveSearchAHHeaderItemIndex: 0,
				switchActiveAHHIAbled: true,
				loadMoreDesc: '下拉加载更多热门活动',
				
				isShowCommentPopup: false,
				isShowCommentLoadMore: false,
				commentLoadMoreHtml: null,
				
				isShowWriteCommentPopup: false,
				writeCommentContent: null,
				
				resizeActivityPicSign: null,
				commentItem: {},
				ahHeaderItem: [{
					desc: '热门活动'
				},{
					desc: '社团印记'
				}],
				hotActivityList: [{
					hotActivityDate: '2018-02-15',
					hotActivityDesc: '想要了解羽毛球四大天王的赫赫战功吗？加入我们本周六举行的羽毛球大赏，带你了解更多，地点：渤海大学西区北门，不见不散',
					hotActivityImgList: [
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519831791841&di=7fff5a3b06a5e3d840ad470698db0ff0&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2F2%2F8c%2F86c91134714.jpg',
						'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519831912899&di=8fc94e33d735be3d50806bc078d84553&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140217%2F20140217142131-1985753059.jpg',
						'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2322073416,3141053592&fm=27&gp=0.jpg',
						'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3600124518,1358717921&fm=27&gp=0.jpg',
					],
					hotActivityPLCount: 71,
					hotActivityDZCount: 201,
					isGivenTheThumbsUp: false,
				},{
					hotActivityDate: '2018-02-13',
					hotActivityDesc: '凉凉',
					hotActivityImgList: [
						require('../../assets/image/dlrb.jpg'),
					],
					hotActivityPLCount: 1,
					hotActivityDZCount: 17,
					isGivenTheThumbsUp: false,
				},{
					hotActivityDate: '2018-02-11',
					hotActivityDesc: '国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具',
					hotActivityImgList: [
						'http://demo.somethingwhat.com/images/flower1.jpg',
						require('../../assets/image/swiper/swiper1.jpg'),
						require('../../assets/image/dlrb.jpg'),
						require('../../assets/image/association-head-img.jpg'),
						require('../../assets/image/dlrb.jpg'),
						require('../../assets/image/association-head-img.jpg'),
						require('../../assets/image/dlrb.jpg'),
						require('../../assets/image/association-head-img.jpg'),
						require('../../assets/image/dlrb.jpg'),
					],
					hotActivityPLCount: 171,
					hotActivityDZCount: 2018,
					isGivenTheThumbsUp: false,
				},{
					hotActivityDate: '2018-02-13',
					hotActivityDesc: '凉凉',
					hotActivityImgList: [],
					hotActivityPLCount: 1,
					hotActivityDZCount: 17,
					isGivenTheThumbsUp: false,
				}],
				
				initAssociationBgImg: require('../../assets/image/bg/association-bg.jpg'),
				initAssociationHeadImg: require('../../assets/image/other/demoTemp/ymqtx.jpg'),
				initUserHeadImg: require('../../assets/image/dlrb.jpg'),
			}
		},
		methods: {
			refresh() {
				console.log('我被刷新了');
				setTimeout(() => {
					console.log('刷新结束');
					this.associationName = this.association.addDesc ? this.association.addDesc : '无名社团';
				}, 2000)
			},
			loadMoreActivity(){
				console.log('下拉刷新');
				setTimeout(() => {
					util.ui.hideLoading('BOTTOM');
					
					if(this.hotActivityList.length < 7){
						this.hotActivityList.push({
							hotActivityDate: '2018-02-15',
							hotActivityDesc: '国内功能很强大且图标内容很丰富的矢量图标库,提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造,设计和前端开发的便捷工具',
							hotActivityImgList: [
								'https://wx1.sinaimg.cn/large/6a8c26b5gy1fllawrban1j20p00e2jt3.jpg',
								'https://wx4.sinaimg.cn/large/abe18f24ly1fllasgxerqj20qo0zkdm8.jpg',
								'https://wx3.sinaimg.cn/orj360/006Dzg9bly1fojbhpcuzyj32kw3vb7wo.jpg',
								require('../../assets/image/association-head-img.jpg'),
							],
							hotActivityPLCount: 71,
							hotActivityDZCount: 201,
							isGivenTheThumbsUp: false,
						});
					}else{
						this.loadMoreDesc = '已经是全部的热门活动哦';
					}
				}, 2000)
			},
			loadMoreComment() {
				console.log('开始加载更多评论');
				if(this.commentLoadMoreHtml != '没有更多评论啦'){
					this.commentLoadMoreHtml = '' +
						'<div class="mu-circle-wrapper  active" style="width: 20px; height: 20px; margin-top: 10px!important">' +
						'<div class="mu-circle-spinner active" style="border-color: #4AA1FF!important">' +
						'<div class="mu-circle-clipper left"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
						'<div class="mu-circle-gap-patch"><div class="mu-circle"></div></div>' +
						'<div class="mu-circle-clipper right"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
						'</div>' +
						'</div>' +
						'';
					this.isShowCommentLoadMore = true;
					setTimeout(() => {
						this.isShowCommentLoadMore = false;
						if(this.commentItem.commentList.length < 5){
							this.commentItem.commentList.push({
								userName: 'Dare',
								commentDate: '2018-2-15 16: 59: 52',
								commentContent: 'I hope ~',
							})
						}else{
							this.isShowCommentLoadMore = true;
							this.commentLoadMoreHtml = '没有更多评论啦';
						}
						
					}, 2000)
				}
			},
			switchActiveAHHI(index) {
				let left = $($('.ah-header-item').get(index)).offset().left;
				console.log(left);
				if(index == 0){
					left = 0;
				}
				$('#active-item-bottom-line').css('left', left);
				this.nowActiveSearchAHHeaderItemIndex = index;
			},
			giveTheThumbsUp(item) {
				if(item.isGivenTheThumbsUp){
					item.hotActivityDZCount--;
					item.isGivenTheThumbsUp = false;
				}else{
					item.hotActivityDZCount++;
					item.isGivenTheThumbsUp = true;
				}
			},
			showImgViewer(imgSrcList, nowActiveIndex){
				util.ui.showImgViewer(imgSrcList, nowActiveIndex);
			},
			showCommentPopup(item){
				this.commentLoadMoreHtml = null,
				this.isShowCommentLoadMore = false;
				this.commentItem = item;
				this.commentItem.commentList = [{
					userName: '迪丽热巴',
					commentDate: '2018-2-21 19: 32: 42',
					commentContent: '哎呦，不错哦，有我当年的风范，ohohoh~~',
				},{
					userName: '古力娜扎',
					commentDate: '2018-2-19 09: 52: 21',
					commentContent: '上面样例点击按钮后，滚动条位置直接改变，会显得很生硬。我们可以使用 animate() 方法给其添加个滚动过渡的动画效果。',
				}]
				this.isShowCommentPopup = true;
			},
			hideCommentPopup(){
				$('#comment-popup').scrollTop(0);
				this.isShowCommentPopup = false;
			},
			showWriteCommentPopup(){
				this.isShowWriteCommentPopup = true;
			},
			hideWriteCommentPopup(){
				this.writeCommentContent = null;
				this.isShowWriteCommentPopup = false;
			},
			writeComment(){
				this.commentItem.commentList.unshift({
					userName: this.user.userName,
					userHeadImg: this.user.userHeadImg,
					commentDate: util.common.getCurrentDateStr(),
					commentContent: this.writeCommentContent,
				});
				this.hideWriteCommentPopup();
			},
			resizeActivityPic(){
				$('.hot-activity-item-img-wrap img').height($('.hot-activity-item-img-wrap img').width());
			}
		},
		mounted() {

			//重新调整活动图片的高度
			this.resizeActivityPic();
			this.resizeActivityPicSign = setInterval(() => {
				this.resizeActivityPic();
			}, 200)
			this.user = util.cache.get('user');
			this.association = this.getRouterDataObj();
			this.associationName = this.association.addDesc ? this.association.addDesc : '无名社团';
			//下拉刷新事件注册
			let startY = 0;
			let beforeY = 0;
			let afterY = 0;
			
			$('#app-wrap').scroll(() => {
				let scrollTop = $('#app-wrap').scrollTop();
				if(scrollTop > $('#app-bar').height()) {
					this.isShowAppTitle = true;
				} else {
					this.isShowAppTitle = false;
					$('#comment-popup-wrap').scrollTop($('#comment-popup-wrap').height() - $(window).height() - 100);
				}
			});
			
			let associationBgImg = $('#association-bg-img');
			let bgImgWidth = associationBgImg.width();
			let bgImgHeight = 190;
			$(window).on('touchmove', (event) => {
				let scrollTop = $('#app-wrap').scrollTop();
				let touch = event.targetTouches[0];
				beforeY = afterY;
				afterY = touch.pageY;
				if(scrollTop == 0 && beforeY != 0 && startY <= afterY && !this.isShowCommentPopup && !store.getters.imgViewer.isShowImgViewer) {
					if(bgImgWidth > 190) {
						$('#app-wrap').addClass('overflowHidden');
					}
					let overScrollHeight = (afterY - beforeY) / 2;
					if(associationBgImg.height() + overScrollHeight < 190) {
						associationBgImg.height(190);
						associationBgImg.css('backgroundSize', associationBgImg.width() + 'px 190px');
						return;
					}
					//					console.log(overScrollHeight);
					associationBgImg.height(associationBgImg.height() + overScrollHeight);
					bgImgHeight += (overScrollHeight * 1.2);
					bgImgWidth += (overScrollHeight * 1.2) / 190 * associationBgImg.width();
					associationBgImg.css('backgroundSize', bgImgWidth + 'px ' + bgImgHeight + 'px');
				}
			});
			$(window).on('touchstart', (event) => {
				let touch = event.targetTouches[0];
				startY = touch.pageY;
				associationBgImg.removeClass('trans');
				beforeY = 0;
				afterY = startY;
				bgImgWidth = associationBgImg.width();
				bgImgHeight = 190;
			});
			$(window).on('touchend', (event) => {
				//设置最小触发高度并且防止重复刷新
				if(associationBgImg.height() > 240 && this.associationName.indexOf('mu-circle-wrapper') == -1) {
					this.associationName = '' +
						'<div class="mu-circle-wrapper title-mu-circle-wrapper active" style="width: 20px; height: 20px; margin-top: 0">' +
						'<div class="mu-circle-spinner active" style="border-color: white!important">' +
						'<div class="mu-circle-clipper left"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
						'<div class="mu-circle-gap-patch"><div class="mu-circle"></div></div>' +
						'<div class="mu-circle-clipper right"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
						'</div>' +
						'</div>' +
						'';
					//调用刷新函数
					this.refresh();
				}
				associationBgImg.addClass('trans');
				$('#app-wrap').removeClass('overflowHidden');
				associationBgImg.css({
					backgroundSize: '100% 190px',
					height: '190px',
				})
			});
			
			let commentPopup = $('#comment-popup');
			//评论区滑动到最底部loadmore
			commentPopup.scroll(() => {
				let isBottom = Math.abs(commentPopup.scrollTop() + $(window).height() - $('#comment-popup-wrap').height()) < 1 ? true : false;
				if(isBottom){
					if(!this.isShowCommentLoadMore){
						this.loadMoreComment();
					}
				}
			})
		},
		destroyed() {
			clearInterval(this.resizeActivityPicSign);
			$(window).off('touchmove');
			$(window).off('touchstart');
			$(window).off('touchend');
		}
	}
</script>

<style scoped>
	.app-bar {
		background: transparent!important;
	}
	
	.app-content {
		margin-top: -70px;
	}
	
	.association-bg-img {
		width: 100%;
		height: 190px;
		background-size: 100% 190px;
		background-position: center center;
		min-height: 190px;
	}
	
	.user-base-msg {
		text-align: center;
		margin-top: -165px;
		height: 165px;
	}
	
	.user-avatar-img {
		width: 70px;
		height: 70px;
		border-radius: 50%;
		box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
	}
	
	.user-base-msg h4 {
		height: 30px;
		line-height: 30px;
		font-size: 17px;
		letter-spacing: 1px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-top: 5px;
		font-weight: normal;
		color: white;
	}
	
	.user-base-msg p {
		margin-top: 5px;
		margin-top: 5px;
		font-size: 13px;
		letter-spacing: 1px;
		padding: 0 30px;
		max-height: 54px;
		line-height: 18px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: white;
	}
	
	.common-item-tip{
		height: 20px;
		line-height: 20px;
		color: white;
		font-size: 12px;
		text-align: center;
		padding-right: 8px;
		background-color: rgba(0, 0, 0, 0.15);
	}
	.common-item-tip-icon{
		width: 13px;
		height: 13px;
		vertical-align: middle;
	}
	
	.ah-header{
		position: relative;
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: white;
		box-shadow: 0 .1em 0.4em rgba(0, 0, 0, 0.1)!important;
	}
	.ah-header .ah-header-item{
		position: relative;
		flex: 1;
		text-align: center;
		height: 39px;
		line-height: 39px;
		color: #7D7D7D;
		font-size: 14px;
		letter-spacing: 1px;
	}
	.active-item-bottom-line{
		position: absolute;
		left: 0;
		width: 100%;
		height: 3px;
		background-color: #5EACFF;
		transition: all 0.5s;
	}
	.hot-activity-wrap{
	}
	.hot-activity-item{
		box-shadow: 0 0 0.4em rgba(0, 0, 0, 0.1)!important;
		background-color: white;
		padding: 15px;
		margin-top: 15px;
	}
	.leftAvatar-rightDesc-item{
		
	}
	.leftAvatar-rightDesc-item{
		overflow: hidden;
	}
	.leftAvatar-rightDesc-item .lri-avatar{
		float: left;
		width: 40px;
		height: 40px;
		margin-right: 15px;
	}
	.leftAvatar-rightDesc-item .lri-avatar img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: block;
	}
	.leftAvatar-rightDesc-item .lri-desc{
		float: left;
	}
	.lri-desc h4{
		height: 20px;
		line-height: 20px;
		color: #4B4B4B;
		font-size: 14px;
		letter-spacing: 1px;
		font-weight: normal;
	}
	.lri-desc p{
		height: 20px;
		line-height: 20px;
		color: #939393;
		font-size: 13px;
	}
	.hot-activity-item .hot-activity-item-desc{
		margin-top: 15px;
		font-size: 14px;
		color: #4B4B4B;
		line-height: 20px;
		letter-spacing: 1px;
	}
	.hot-activity-item  .hot-activity-item-img-wrap{
		overflow: hidden;
	}
	.hot-activity-item-img-wrap img{
		float: left;
		width: calc(33.3% - 5px);
		margin-right: 5px;
		margin-top: 5px;
		object-fit: cover;
	}
	.hot-activity-item-btns{
		margin-top: 15px;
		display: flex;
		height: 25px;
		line-height: 25px;
		font-size: 13px;
		color: #939393;
	}
	.hot-activity-item-btns .hot-activity-item-btn{
		flex: 1;
		text-align: center;
	}
	.hot-activity-item-btn img{
		width: 25px;
		height: 25px;
		vertical-align: middle;
	}
	
	.comment-popup{
		position: fixed;
		z-index: 3;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #F4F4F4;
		overflow-y: scroll;
	}
	.comment-popup .comment-popup-title{
		font-weight: normal;
		font-size: 16px;
		height: 20px;
		line-height: 20px;
		letter-spacing: 2px;
		text-align: center;
		margin-top: 20px;
	}
	.comment-content{
		margin-top: 10px;
		background-color: white;
		padding: 15px;
		box-shadow: 0 0 0.4em rgba(0, 0, 0, 0.1)!important;
	}
	.comment-content .comment-content-header{
		height: 20px;
		line-height: 20px;
		color: rgba(0, 0, 0, 0.54);
		text-align: left;
		border-left: 2px solid #7DBBFF;
		padding: 0 10px;
		font-size: 14px;
		font-weight: normal;
		letter-spacing: 2px;
		margin-bottom: 15px;
	}
	.comment-content-text{
		margin-left: 55px;
		margin-top: 5px;
		font-size: 14px;
	}
	.comment-content-item{
		margin-top: 15px;
	}
	.comment-load-more{
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 13px;
		letter-spacing: 1px;
		color: #939393;
	}
	.comment-popup-cancel{
		position: fixed;
		right: 10px;
		top: 20px;
		width: 20px;
		height: 20px;
	}
	.write-comment-popup .write-comment-popup-send{
		position: absolute;
		bottom: 20px;
		left: calc(50% - 50px);
		right: 10px;
		width: 100px!important;
		height: 30px;
		font-size: 13px;
		line-height: 30px;
		text-align: center;
		padding: 0 10px;
	}
	.write-comment-popup-textarea{
		border: none;
		resize: none;
		outline: none;
		width: 100%;
		padding: 10px;
		font-size: 14px;
		background-color: #F4F4F4;
	}
</style>