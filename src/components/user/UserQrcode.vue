<template>
	<app-wrap>
		<app-bar title="我的二维码" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
		</app-bar>
		<app-content slot="appContent">
			<mu-card class="qrcode-card" id="qrcode-card">
				<mu-card-header :title="user.userName ? user.userName : '无名大侠'" :subTitle="qrcodeDesc">
					<mu-avatar :src="user.userHeadImg ? user.userHeadImg : initUserHeadImg" slot="avatar" />
				</mu-card-header>
				<mu-card-media>
					<img :src="qrcodeImgSrc" alt="我的二维码" class="qrcode-img" id="qrcode-img" />
				</mu-card-media>
				<mu-card-text style="text-align: center;">
					我的二维码共被他人扫过<span class="scan-count">{{scanCount}}</span>次
				</mu-card-text>
			</mu-card>
		</app-content>
	</app-wrap>
</template>

<script>
	import QRCode from 'qrcode-svg'
	export default {
		name: 'userQrcode',
		data() {
			return {
				user: {},
				qrcodeDesc: '快来加我好友吧~',
				qrcodeImgSrc: '',
				scanCount: 3,
				
				initUserHeadImg: require('../../assets/image/dlrb.jpg'),
			}
		},
		componets: {},
		methods: {
		},
		mounted() {
			this.user = util.cache.get('user');
			let qrcode = new QRCode({
				content: '{"userId": "' + this.user.userId + '"}',
				width: 240,
				height: 240,
				color: "#4AA1FF",
				background: "#ffffff",
				ecl: "M"
			});
			let svg = qrcode.svg();
			this.qrcodeImgSrc = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));
		}
	}
</script>

<style scoped>
	.qrcode-card {
		width: 280px;
		margin: 30px auto;
		padding: 10px;
	}
	
	.scan-count{
		padding: 0 5px;
		color: #4AA1FF;
		font-size: 18px;
	}
</style>