<template>
	<app-wrap>
		<app-bar title="个人头像" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
			<div slot="right" class="text-btn" @click="isOpenBottomSheet = true">更换</div>
		</app-bar>
		<app-content slot="appContent">
			<div class="user-img-wrap" id="user-img-wrap">
				<img :src="userHeadImg ? userHeadImg : initUserHeadImg" class="user-avatar">
			</div>
			
			<mu-bottom-sheet :open="isOpenBottomSheet" @close="isOpenBottomSheet = false">
				<mu-list @itemClick="isOpenBottomSheet = false">
					<mu-sub-header>
						请选择设置头像的方式
					</mu-sub-header>
					<mu-list-item title="现在拍一张" @click="setAvatar(1)" />
					<mu-list-item title="从相册中选取" @click="setAvatar(2)" />
				</mu-list>
			</mu-bottom-sheet>
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'userHeadImg',
		data() {
			return {
				userHeadImg: null,
				isOpenBottomSheet: false,
				
				initUserHeadImg: require('../../assets/image/dlrb.jpg'),
			}
		},
		componets: {},
		methods: {
			setAvatar(type) {
				util.cordovaNative.takePhoto(type, 'userHeadImg', {
					targetWidth: 300,
					targetHeight: 300,
				});
			}
		},
		mounted() {
			let user = util.cache.get('user');
			let userHeadImg = util.cache.get('userHeadImg', true);
			if(userHeadImg){
				util.http.normalReq.post('/USER-CLIENT/user', {
					userId: user.userId,
					userHeadImg: userHeadImg
				},
				(data) => {
					if(data.result){
						this.userHeadImg = userHeadImg;
						user.userHeadImg = userHeadImg;
						util.cache.set('user', user);
					}else{
						util.ui.toast(data.msg, 'WARN');
					}
				})
			}else{
				this.userHeadImg = user.userHeadImg;
			}
			let userImgWrap = $('#user-img-wrap');
			userImgWrap.height(userImgWrap.width());
			console.log(($(window).height() - userImgWrap.height()) / 2 + 'px');
			userImgWrap.css('marginTop', ($(window).height() - userImgWrap.height()) / 2 - 70 + 'px');
			
		}
	}
</script>

<style scoped>
	.app-bar{
		background-color: #000000!important;
	}
	.user-img-wrap{
		position: relative;
		width: 100%;
		background-color: #131313;
	}
	.user-avatar{
		max-width: 100%;
		display: block;
		margin: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.app-content{
		height: 100%!important;
		background-color: #000000!important;
	}
</style>