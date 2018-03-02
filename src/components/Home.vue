<template>
	<app-wrap>
		<!-- 标题栏 -->
		<app-bar slot="appBar" v-bind:class="{opacity0: !isShowAppBar}">
			<mu-icon-button icon="icon-caidan" slot="left" @click="showAppSlide" />
			<div slot="title" class="search-title">
				<img src="../assets/image/icon/search.png" class="search-icon">
				<input type="search" readonly id="head-search" class="head-search" placeholder="搜索社团、大学、 搜你感兴趣的" @click="go('/other/homeSearch')">
			</div>
			<mu-icon-button icon="icon-saomiao" slot="right" @click="scanQrCode" />
		</app-bar>
		
		<!-- 主内容 -->
		<app-content slot="appContent">
			<div class="refresh-div" id="refresh-div">
				<div class="runner-wrap" v-show="!isShowAppBar">
					<div class='kai animate' id='home-running' :style="{backgroundImage: 'url(' + runnerImgSrc + ')'}">
					</div>
				</div>
			</div>
			<swiper :options="swiperOption">
				<swiper-slide>
					<img src="../assets/image/other/demoTemp/zx.jpg" class="swiper-img" />
				</swiper-slide>
				<swiper-slide>
					<img src="../assets/image/swiper/swiper2.jpg" class="swiper-img" />
				</swiper-slide>
				<swiper-slide>
					<img src="../assets/image/swiper/swiper3.jpg" class="swiper-img" />
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
			<div class="common-menu-wrap">
				<div class="common-menu">
					<img src="../assets/image/icon/homeItem/myself.png" class="common-menu-img"/>
					<p class="common-menu-desc">我的</p>
				</div>
				<div class="common-menu">
					<img src="../assets/image/icon/homeItem/suggest.png" class="common-menu-img"/>
					<p class="common-menu-desc">推荐</p>
				</div>
				<div class="common-menu">
					<img src="../assets/image/icon/homeItem/circle.png" class="common-menu-img"/>
					<p class="common-menu-desc">圈子</p>
				</div>
				<div class="common-menu">
					<img src="../assets/image/icon/homeItem/step.png" class="common-menu-img"/>
					<p class="common-menu-desc">足迹</p>
				</div>
			</div>
			
			<div class="common-item-wrap">
				<h4>
					活跃社团
					<img src="../assets/image/icon/ellipsis.png" class="common-item-btn">
					<img src="../assets/image/icon/refresh.png" v-show="!isOrgInRefresh" class="common-item-btn" id="refresh-org-btn" @click="refreshOrg">
					<img src="../assets/image/icon/refresh_active.png" v-show="isOrgInRefresh" class="common-item-btn rotate360">
				</h4>
				<div class="common-item" v-for="(item, index) in activeOrgList">
					<img :src="item.orgImg" class="common-item-img">
					<div class="common-item-tip">
						<img src="../assets/image/icon/fire.png" class="common-item-tip-icon"> {{item.hotCount}}
						<img src="../assets/image/icon/member.png" class="common-item-tip-icon" style="margin-left: 5px;"> {{item.orgMemberCount}}
					</div>
					<p class="common-item-desc">{{item.desc}}</p>
					<p class="common-item-add-desc">{{item.addDesc}}</p>
				</div>
			</div>
			
			<div class="common-item-wrap">
				<h4>热门活动</h4>
				<div class="common-item" v-for="(item, index) in activeOrgList">
					<img :src="item.orgImg" class="common-item-img">
					<div class="common-item-tip">
						<img src="../assets/image/icon/fire.png" class="common-item-tip-icon"> {{item.hotCount}}
						<img src="../assets/image/icon/member.png" class="common-item-tip-icon" style="margin-left: 5px;"> {{item.orgMemberCount}}
					</div>
					<p class="common-item-desc">{{item.desc}}</p>
					<p class="common-item-add-desc">{{item.addDesc}}</p>
				</div>
			</div>
		</app-content>
		
		<!-- 侧边栏 -->
		<app-slide slot="appSlide" @closeAppSlideEvent="hiddenAppSlide">
			<div class="user-wrap" :style="{backgroundImage: 'url(' + (user.userHeadImg ? user.userHeadImg : initUserHeadImg) + ')'}" @click="go('/user/userInfo')">
				<div class="user-content">
					<img :src="user.userHeadImg ? user.userHeadImg : initUserHeadImg" class="user-avatar" />
					<h4 v-html="user.userName ? user.userName : '无名大侠'"></h4>
					<p v-html="user.userInfo ? user.userInfo : '这个人很懒，什么都没留下哦'"></p>
				</div>
				<div :style="{backgroundImage: 'url(' + (user.userHeadImg ? user.userHeadImg : initUserHeadImg) + ')'}" class="user-wrap-bg"></div>
			</div>
			<mu-list>
				<mu-list-item title="我 的 社 团" @click="go('/association/myAssociation')">
					<mu-icon slot="left" value="icon-team"/>
				</mu-list-item>
				<mu-list-item title="我 的 活 动">
					<mu-icon slot="left" value="icon-huodong" />
				</mu-list-item>
				<mu-list-item title="调 试" @click="go('/other/test')">
					<mu-icon slot="left" value="icon-xiaoxitixing"/>
				</mu-list-item>
			</mu-list>
			<div class="drawer-bottom">
				<mu-flat-button label="设置" icon="icon-shezhi" @click="go('/user/userSet')" />
				<mu-flat-button label="退出" icon="icon-tuichudenglu" @click="backToLogin" />
			</div>
		</app-slide>
	</app-wrap>
</template>

<script>
	//轮播图组件加载
	import Vue from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	Vue.use(VueAwesomeSwiper)
	import 'swiper/dist/css/swiper.css'
	export default {
		name: 'home',
		data() {
			return {
				user: {},
				isHeadLoading: false,
				isShowAppBar: true,
				isOrgInRefresh: false,
				nowTurn: null,
				runnerImgSrc: require('../assets/image/other/head-loading-runner.png'),
				
				activeOrgList: [{
					orgImg: require('../assets/image/other/demoTemp/ymq.jpg'),
					desc: '渤海大学羽毛球协会欢迎广大渤大的学生加入本社，共同交流技术',
					addDesc: '羽毛球协会',
					hotCount: 1290,
					orgMemberCount: 51,
				},{
					orgImg: require('../assets/image/other/demoTemp/bwt.jpg'),
					desc: '青春激情飞扬，没有极限...',
					addDesc: '渤舞堂',
					hotCount: 995,
					orgMemberCount: 39,
				},{
					orgImg: require('../assets/image/other/demoTemp/sfxh.jpg'),
					desc: '以文会友，活动地址渤海大学图书馆，报名请加微信群',
					addDesc: '书法协会',
					hotCount: 723,
					orgMemberCount: 102,
				},{
					orgImg: require('../assets/image/other/demoTemp/blxh.jpg'),
					desc: '舌战群儒，毫无畏惧',
					addDesc: '辩论协会',
					hotCount: 1290,
					orgMemberCount: 51,
				}],
				initUserHeadImg: require('../assets/image/dlrb.jpg'),

				swiperOption: {
					autoplay: {
						delay: 3000,
						disableOnInteraction: false
					},
					pagination: {
						el: '.swiper-pagination',
					}
				}
			}
		},
		methods: {
			refresh() {
				console.log('home页刷新');
				setTimeout(() => {
					$('#refresh-div').animate({
						height: 0
					}, 300, () => {
						$('#home-running').removeClass('run');
						this.isHeadLoading = false;
						this.isShowAppBar = true;
						this.nowTurn = null;
					});
				}, 3000)
			},
			refreshOrg() {
				this.isOrgInRefresh = true;
				setTimeout(() => {
					this.isOrgInRefresh = false;
				}, 800)
			},
			backToLogin() {
				util.ui.confirm('是否退出登录', () => {
					util.common.loginOut();
				})

			},
			scanQrCode() {
				util.cordovaNative.scanQrCode((qrCodeText) => {
					util.ui.alert("扫描内容为：" + qrCodeText);
					console.log(qrCodeText);
				}, (error) => {
					console.log(error);
				})
			},
			showAppSlide() {
				this.nowTurn = 'left';
				$('#app-slide-content').animate({
					left: 0,
					opacity: 1,
				}, 200, 'swing', () => {
					$('#app-slide-model').css('display', 'block');
					$('#app-slide-model').animate({
						opacity: 0.3,
					}, 200)
				});
			},
			hiddenAppSlide() {
				$('#app-slide-content').animate({
					left: -250,
					opacity: 0,
				}, 200, 'swing', () => {
					$('#app-slide-model').animate({
						opacity: 0,
					}, 200, () => {
						$('#app-slide-model').css('display', 'none');
						this.nowTurn = null;
					})
				});
			},
			hiddenSlideThenGo(path) {
				$('#app-slide-content').animate({
					left: -250,
				}, 200, 'swing', () => {
					$('#app-slide-model').animate({
						opacity: 0,
					}, 200, () => {
						$('#app-slide-model').css('display', 'none');
						this.nowTurn = null;
						this.go(path);
					})
				});
			}
		},
		mounted() {
			this.user = util.cache.get('user');
			//如果为登陆页跳转过来则去获取用户详细信息
			if(!this.user.userId){
				//获取用户信息
				util.http.normalReq.get('/USER-CLIENT/userdetail', {
				}, (data) => {
					if(data.result == true){
						util.common.copyFieldValue(this.user, data.data);
						util.cache.set('user', this.user);
						
						//在取到当前登陆用户信息后 将用户头像存入保存的用户登陆信息，用于退出登陆时回显
						let rememberUserLoginMsg = util.cache.get('rememberUserLoginMsg');
						rememberUserLoginMsg.userHeadImg = this.user.userHeadImg,
						util.cache.set('rememberUserLoginMsg', rememberUserLoginMsg);
						console.log('取得用户头像的用户登录信息：', rememberUserLoginMsg);
					}
				}, (err) => {
					
				})
			}
			
			$('#head-search').width($(window).width() - 130);
			$(window).resize(() => {
				console.log('window resize');
				$('#head-search').width($(window).width() - 130);
			})
			
			//下拉刷新,侧滑出侧滑菜单事件注册
			
			let startX = 0;
			let beforeX = 0;
			let afterX = 0;
			let maxPullX = 0;
			let isLeft = true;
			let isTryToLeft = true;
			let minPullLeft = 60;	//左滑触发出现侧边栏的最小左滑宽度为60
			
			let startY = 0;
			let beforeY = 0;
			let afterY = 0;
			let maxPullY = 0;
			let minPullTop = 30;	//下拉刷新触发的最下拉高度为30
			
			let refreshDiv = $('#refresh-div');
			let appSlideContent = $('#app-slide-content');
			let appSlideModel = $('#app-slide-model');
			$(window).on('touchmove', (event) => {
				let scrollTop = $('#app-wrap').scrollTop();
				let touch = event.targetTouches[0];
				beforeX = afterX;
				afterX = touch.pageX;
				maxPullX = maxPullX > (afterX - startX) ? maxPullX : (afterX - startX);
				
				beforeY = afterY;
				afterY = touch.pageY;
				maxPullY = maxPullY > (afterY - startY) ? maxPullY : (afterY - startY);
//				console.log(this.nowTurn);
				if(this.nowTurn == null){
					if((afterX - startX) > (afterY - startY)){
						if(maxPullX > minPullLeft){
							this.nowTurn = 'left';
						}
					}else{
						if(scrollTop == 0 && maxPullY > minPullTop){
							this.nowTurn = 'top';
						}
					}
				}
//				console.log(this.nowTurn);
				if(this.nowTurn == 'left'){
					if(beforeX < afterX){
						isTryToLeft = true;
					}else{
						isTryToLeft = false;
					}
					let left;
					if(isLeft){
						left = -250 + (afterX - startX) * 1.5;
					}else{
						left = 0 + (afterX - startX) * 1.5;
					}
					if(left > minPullLeft){
						left = minPullLeft;
					}else if(left < -250){
						left = -250;
					}
					if(isLeft){
						let contentOpacity = 1 - 1 * ((left - minPullLeft) / -250);
						appSlideContent.css('left', left - minPullLeft);
						appSlideContent.css('opacity', contentOpacity);
						
						let modelOpacity = 0.3 - 0.3 * ((left - minPullLeft) / -250);
						appSlideModel.css('display', 'block');
						appSlideModel.css('opacity', modelOpacity);
					}else{
						let contentOpacity = 1 - 1 * ((left - minPullLeft) / -250);
						appSlideContent.css('left', left - minPullLeft);
						appSlideContent.css('opacity', contentOpacity);
						
						let modelOpacity = 0.3 - 0.3 * ((left - minPullLeft) / -250);
						appSlideModel.css('display', 'block');
						appSlideModel.css('opacity', modelOpacity);
					}
				}
				
				if(this.nowTurn == 'top'){
					if(scrollTop == 0 && this.isHeadLoading == false){
						let height = (afterY - startY) / 2;
						if(height < 0){
							height = 0;
						}else if(height > 70){
							height = 70;
						}
						$('#app-wrap').addClass('overflowHidden');
						this.isShowAppBar = false;
						refreshDiv.height(height);
					}
				}
			});
			$(window).on('touchstart', (event) => {
				appSlideContent.stop(true);
				let touch = event.targetTouches[0];
				startX = touch.pageX;
				beforeX = 0;
				afterX = startX;
				maxPullX = 0;
				isLeft = parseInt(appSlideContent.css('left')) == 0 ? false : true;
				isTryToLeft = isLeft ? true : false;
				
				startY = touch.pageY;
				beforeY = 0;
				afterY = startY;
				maxPullY = 0;
			});
			$(window).on('touchend', (event) => {
				if(this.nowTurn == 'left'){
//					console.log(isTryToLeft);
					if(isTryToLeft){
						this.showAppSlide();	
					}else{
						this.hiddenAppSlide();
					}
				}
				
				if(this.nowTurn == 'top'){
					$('#app-wrap').removeClass('overflowHidden');
					if(this.isHeadLoading == false){
						if(refreshDiv.height() > 60){
							$('#home-running').addClass('run');
							this.isHeadLoading = true;
							this.refresh();
						}else{
							refreshDiv.animate({
								height: 0
							}, 300, () => {
								this.isShowAppBar = true;
								this.nowTurn = null;
							});
						}
					}
				}
			});
		},
		destroyed() {
			$(window).off('resize');
			$(window).off('touchmove');
			$(window).off('touchstart');
			$(window).off('touchend');
		}
	}
</script>

<style scoped>
	.app-bar{
		background-color: transparent!important;
		transition: all 0.5s!important;
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
	}
	.search-icon{
		position: absolute;
		top: 15px;
		left: 50px;
		width: 20px;
		height: 20px;
	}
	.app-content{
		padding-top: 0!important;
	}
	.refresh-div{
		width: 100%;
		background-color: transparent;
	}
	.user-wrap {
		width: 100%;
		height: 250px;
		background-size: 100% 100%;
		background-position: center center;
		text-align: center;
		color: white;
		position: relative;
	}
	.swiper-container{
		height: 200px!important;
	}
	.swiper-img {
		width: 100%;
		height: 200px;
	}
	
	.user-wrap-bg {
		width: 100%;
		height: 250px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		filter: blur(2px);
		background-size: 100% 100%;
		background-position: center center;
	}
	
	.user-content {
		position: absolute;
		top: 50px;
		left: 0;
		width: 100%;
		text-align: center;
		z-index: 101;
	}
	
	.user-avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		box-shadow: 0 0 0 2px white;
	}
	
	.user-content h4 {
		height: 30px;
		line-height: 30px;
		font-weight: normal;
		font-size: 17px;
		letter-spacing: 3px;
		padding: 0 20px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-top: 5px;
	}
	
	.user-content p {
		margin-top: 10px;
		font-size: 13px;
		letter-spacing: 1px;
		padding: 0 30px;
		height: 54px;
		line-height: 18px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.shadow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 250px;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 100;
	}
	
	.drawer-bottom {
		position: absolute;
		bottom: 10px;
		left: 0;
		margin-left: 10px;
	}
	
	.drawer-bottom .mu-flat-button {
		color: #757575;
	}
	
	.common-menu-wrap{
		height: 66px;
		background-color: white;
		box-shadow: 0 0.5px 0.5px 0.5px #CCCCCC;
	}
	.common-menu{
		width: 25%;
		float: left;
	}
	.common-menu .common-menu-img{
		display: block;
		margin: 8px auto 5px;
		width: 25px;
		height: 25px;
	}
	.common-menu-desc{
		height: 20px;
		line-height:20px ;
		text-align: center;
		font-size: 12px;
		letter-spacing: 1px;
		color: #757575;
	}
	
	.common-item-wrap {
		overflow: hidden;
		padding: 10px 0 20px 0;
		margin-top: 20px;
		background-color: white;
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
	.common-item-img{
		width: calc(100% + 0.5px);
		height: 100px;
		border-radius: 6px 6px 0 0;
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
	.common-item-tip-icon{
		width: 13px;
		height: 13px;
		vertical-align: middle;
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
		color: #939393;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	/*loader*/
	
	.runner-wrap {
		position: absolute;
		top: 0;
		left: calc(50% - 32px);
		height: 40px;
		transform: scale(0.5);
	}
	
	.kai {
		height: 100px;
		width: 68px;
		margin: 0 auto;
		left: 50%;
		z-index: 999;
	}
	
	.kai.animate {
		animation: animate 0.75s steps(1) infinite;
	}
	.run{
		animation: animate 0.75s steps(19) infinite!important;
	}
	
	@keyframes animate {
		to {
			background-position: -1330px;
		}
	}
	
	@keyframes rotate360{
		from {transform: rotate(0deg);}
		to {transform: rotate(360deg);}
	}
	.rotate360{
		animation: rotate360 0.5s linear infinite;
	}
</style>