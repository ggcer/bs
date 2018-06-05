<template>
	<app-wrap>
		<app-bar :title="title" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
			
			<mu-icon-button icon="icon-bianji" slot="right" @click="go('/user/userEdit')" />
			<mu-icon-button icon="icon-erweima" slot="right" @click="goToUserQrcode" />
		</app-bar>
		<app-content slot="appContent">
			<div class="user-bg-img" id="user-bg-img" :style="{backgroundImage: 'url(' + (user.userBgImg ? user.userBgImg : initUserBgImg) + ')'}" @click="isOpenBottomSheet = true"></div>
			<div class="user-base-msg">
				<img :src="user.userHeadImg ? user.userHeadImg : initUserHeadImg" class="user-avatar-img">
				<h4 v-html="user.userName ? user.userName : '无名大侠'"></h4>
				<p class="center" v-html="user.userInfo ? user.userInfo : '这个人很懒，什么都没留下哦'"></p>
			</div>
			<mu-list>
				<mu-list-item :title="userTypeStr">
					<mu-icon slot="left" value="icon-id" />
				</mu-list-item>
				<mu-list-item :title="summaryMsg ? summaryMsg : '未填写'">
					<mu-icon slot="left" value="icon-zhanghuziliao" />
				</mu-list-item>
				<mu-list-item :title="user.userSchool ? user.userSchool : '未填写'">
					<mu-icon slot="left" value="icon-xuexiao" />
				</mu-list-item>
			</mu-list>
			<mu-grid-list class="my-org">
				<mu-sub-header>我的社团</mu-sub-header>
				<img src="../../assets/image/other/userInfo-fgx.png" class="fgx" />
				<mu-grid-tile>
					<img src="../../assets/image/other/demoTemp/ymq.jpg" />
					<span slot="title">羽毛球社</span>
					<span slot="subTitle">from <b>渤海大学</b></span>
					<mu-icon-button icon="person_add" slot="action" />
				</mu-grid-tile>
				<mu-grid-tile>
					<img src="../../assets/image/other/demoTemp/bwt.jpg" />
					<span slot="title">书法协会</span>
					<span slot="subTitle">from <b>渤海大学</b></span>
					<mu-icon-button icon="person" slot="action" />
				</mu-grid-tile>
			</mu-grid-list>

			<mu-bottom-sheet :open="isOpenBottomSheet" @close="isOpenBottomSheet = false">
				<mu-list @itemClick="isOpenBottomSheet = false">
					<mu-sub-header>
						请选择更换封面的方式
					</mu-sub-header>
					<mu-list-item title="现在拍一张" @click="setUserBg(1)" />
					<mu-list-item title="从相册中选取" @click="setUserBg(2)" />
				</mu-list>
			</mu-bottom-sheet>

		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'userInfo',
		data() {
			return {
				title: null,
				user: {},
				summaryMsg: '',
				isOpenBottomSheet: false,

				initUserHeadImg: require('../../assets/image/dlrb.jpg'),
				initUserBgImg: require('../../assets/image/bg/user-bg.jpg'),
			}
		},
		methods: {
			refresh() {
				console.log('我被刷新了');
				setTimeout(() => {
					console.log('刷新结束');
					this.title = this.user.userName ? this.user.userName : '无名大侠';
				}, 2000)
			},
			setUserBg(type) {
				util.cordovaNative.takePhoto(type, 'userBgImg', {
					targetWidth: 375,
					targetHeight: 250,
				});
			},
			goToUserQrcode() {
				this.go('/user/userQrcode');
			}
		},
		computed: {
			userTypeStr: function() {
				switch(this.user.userType + ''){
					case '1': 
						return '学生';
					case '2': 
						return '老师';
					case '3': 
						return '赞助商';
					default: 
						return '错误的用户类型';
				}
			},
		},
		mounted() {
			this.user = util.cache.get('user');
			let userBgImgCache = util.cache.get('userBgImg', true);
			if(userBgImgCache){
        util.ui.showLoading('CENTER');
				util.http.normalReq.post('/USER-CLIENT/user', {
					userId: this.user.userId,
					userBgImg: userBgImgCache
				},
				(data) => {
					if(data.result){
						this.user.userBgImg = userBgImgCache;
						util.cache.set('user', this.user);
					}
				}, (err) => {
					util.ui.toast(data.msg, 'WARN');
				})
			}
			let user = this.user;
			this.title = user.userName ? user.userName : '无名大侠';
			let userSexStr = null;
			if(user.userSex == 1) {
				userSexStr = '男';
			} else if(user.userSex == 2) {
				userSexStr = '女';
			}

			let age = null;
			if(user.userBirthday) {
				let userBirthdayDateObj = new Date(user.userBirthday);
				let birthdayYear = userBirthdayDateObj.getFullYear();
				let birthdayMonth = userBirthdayDateObj.getMonth() + 1;
				let birthdayDay = userBirthdayDateObj.getDate();

				let nowDate = new Date();
				let nowYear = nowDate.getFullYear();
				let nowMonth = nowDate.getMonth() + 1;
				let nowDay = nowDate.getDate();

				age = nowYear - birthdayYear;
				if(nowMonth < birthdayMonth || (nowMonth == birthdayMonth && nowDay < birthdayDay)) {
					age--;
				}
			}
			
			let userAddress = '';
			if(user.userProvince){
				userAddress = user.userProvince;
			}
			if(user.userProvince && user.userCity){
				userAddress = user.userProvince + '-' + user.userCity;
			}
			
			//拼接summaryMsg
			if(userSexStr) {
				this.summaryMsg += userSexStr + ' ';
			}
			if(age || age == 0) {
				this.summaryMsg += age + '岁 ';
			}
			if(userAddress) {
				this.summaryMsg += userAddress;
			}
			//下拉刷新事件注册
			let startY = 0;
			let beforeY = 0;
			let afterY = 0;
			let userBgImg = $('#user-bg-img');
			let bgImgWidth = userBgImg.width();
			let bgImgHeight = 250;
			$(window).on('touchmove', (event) => {
				let scrollTop = $('#app-wrap').scrollTop();
				let touch = event.targetTouches[0];
				beforeY = afterY;
				afterY = touch.pageY;
				if(scrollTop == 0 && beforeY != 0 && startY <= afterY) {
					if(bgImgWidth > 250) {
						$('#app-wrap').addClass('overflowHidden');
					}
					let overScrollHeight = (afterY - beforeY) / 2;
					if(userBgImg.height() + overScrollHeight < 250) {
						userBgImg.height(250);
						userBgImg.css('backgroundSize', userBgImg.width() + 'px 250px');
						return;
					}
					//					console.log(overScrollHeight);
					userBgImg.height(userBgImg.height() + overScrollHeight);
					bgImgHeight += (overScrollHeight * 1.2);
					bgImgWidth += (overScrollHeight * 1.2) / 250 * userBgImg.width();
					userBgImg.css('backgroundSize', bgImgWidth + 'px ' + bgImgHeight + 'px');
				}
			});
			$(window).on('touchstart', (event) => {
				let touch = event.targetTouches[0];
				startY = touch.pageY;
				userBgImg.removeClass('trans');
				beforeY = 0;
				afterY = startY;
				bgImgWidth = userBgImg.width();
				bgImgHeight = 250;
			});
			$(window).on('touchend', (event) => {
				//设置最小触发高度并且防止重复刷新
				if(userBgImg.height() > 300 && this.title.indexOf('mu-circle-wrapper') == -1) {
					this.title = '' +
						'<div class="mu-circle-wrapper title-mu-circle-wrapper active" style="width: 20px; height: 20px;">' +
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
				userBgImg.addClass('trans');
				$('#app-wrap').removeClass('overflowHidden');
				userBgImg.css({
					backgroundSize: '100% 250px',
					height: '250px',
				})
			});
		},
		destroyed() {
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
	
	.user-bg-img {
		width: 100%;
		height: 250px;
		background-size: 100% 250px;
		background-position: center center;
		min-height: 250px;
	}
	
	.user-base-msg {
		text-align: center;
		margin-top: -30px;
	}
	
	.user-avatar-img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
	}
	
	.user-base-msg h4 {
		height: 30px;
		line-height: 30px;
		font-size: 17px;
		letter-spacing: 1px;
		padding: 0 20px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-top: 5px;
		font-weight: normal;
		text-align: center;
	}
	
	.user-base-msg p {
		margin-top: 10px;
		font-size: 13px;
		letter-spacing: 1px;
		padding: 0 30px;
		max-height: 54px;
		line-height: 18px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #757575;
		text-align: center!important;
	}
	
	.mu-sub-header {
		text-align: center!important;
		font-size: 16px!important;
		letter-spacing: 2px!important;
		color: #4B4B4B!important;
	}
</style>