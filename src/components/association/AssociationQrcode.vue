<template>
	<app-wrap>
		<app-bar :title="title" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
		</app-bar>
		<app-content slot="appContent">
			<mu-card class="qrcode-card" id="qrcode-card">
				<mu-card-header :title="association.assName ? association.assName : '无名社团'" :subTitle="qrcodeDesc">
					<mu-avatar :src="association.assLogo ? association.assLogo : initAssLogo" slot="avatar" />
				</mu-card-header>
				<mu-card-media>
					<img :src="qrcodeImgSrc" :alt="title" class="qrcode-img" id="qrcode-img" />
				</mu-card-media>
				<mu-card-text style="text-align: center;">
					本社团二维码共被他人扫过<span class="scan-count">{{scanCount}}</span>次
				</mu-card-text>
			</mu-card>
		</app-content>
	</app-wrap>
</template>

<script>
	import QRCode from 'qrcode-svg'
	export default {
		name: 'associationQrcode',
		data() {
			return {
        title: null,
				user: {},
        association: {},  //当前社团对象
				qrcodeDesc: '快来扫一扫加入社团吧~',
				qrcodeImgSrc: '',
				scanCount: 4,
				
        initAssLogo: require("../../assets/image/other/demoTemp/ymqtx.jpg"),
			}
		},
		componets: {},
		methods: {
		},
		mounted() {
			this.user = util.cache.get('user');
      this.association = this.getRouterDataObj();
      this.title = this.association.assName + '的社团二维码';
			let qrcode = new QRCode({
				content: '{"assId": "' + this.association.assId + '"}',
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