<template>
	<app-wrap>
		<app-bar title="图片编辑" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="confirmBack" />
			<mu-icon-button icon="icon-ok" slot="right" @click="saveImgEdit" v-show="!isShowResult"/>
		</app-bar>
		<app-content slot="appContent">
			<div class="edit-img-wrap" id="edit-img-wrap">
				<transition name="bottomToTop">
					<mu-card class="result-card" v-show="isShowResult">
					  <mu-card-media>
					    <img :src="resultImgUrl"/>
					  </mu-card-media>
					  <mu-card-actions style="text-align: center;">
					    <mu-flat-button icon="icon-ok" @click="finishCrop" color="#FFF" backgroundColor="#4AA1FF" style="margin-right: 50px;"/>
					    <mu-flat-button icon="icon-shuaxin" @click="reCrop" color="#4AA1FF"/>
					  </mu-card-actions>
					</mu-card>
				</transition>
			</div>
		</app-content>
	</app-wrap>
</template>

<script>
	import AlloyCrop from '../../assets/js/plugin/alloycrop/alloy-crop'
	export default {
		name: 'userEdit',
		data() {
			return {
				photoType: null,
				imgSrc: null,
				cropWidth: null,
				cropHeight: null,
				alloyCrop: null,
				
				originalImgSrc: null,
				isShowResult: false,
				resultImgUrl: null,
			}
		},
		methods: {
			initAlloyCrop() {
				this.alloyCrop = new AlloyCrop({
				    image_src: this.originalImgSrc,
				    width: this.cropWidth, // crop width
				    height: this.cropHeight, // crop height
				    output: 1, // output resolution --> 倍数
				});
			},
			saveImgEdit() {
				this.alloyCrop.crop();
				this.resultImgUrl = this.alloyCrop.canvas.toDataURL("image/" + this.type);
				this.isShowResult = true;
				this.closeCropModel();
			},
			finishCrop() {
				if(this.photoType == 'userHeadImg'){
					util.cache.set('userHeadImg', this.resultImgUrl);
				}else if(this.photoType == 'userBgImg'){
					util.cache.set('userBgImg', this.resultImgUrl);
				}
				this.back();
			},
			reCrop() {
				this.isShowResult = false;
				setTimeout(() => {
					this.resultImgUrl = null;
					this.closeCropModel();
					this.initAlloyCrop();
				}, 800);
			},
			closeCropModel() {
				this.alloyCrop._css(this.alloyCrop.croppingBox, {
	                display: "none"
	            });
			},
			
			confirmBack() {
				util.ui.confirm('确定退出图片编辑吗', () => {
					this.back();
				})
			}
		},
		mounted() {
			let routerDataObj = this.getRouterDataObj();
			this.photoType = routerDataObj.photoType;
			this.originalImgSrc = routerDataObj.originalImgSrc;
			this.cropWidth = routerDataObj.cropWidth;
			this.cropHeight = routerDataObj.cropHeight;
			console.log(this.cropWidth);
			console.log(this.cropHeight);
			setTimeout(() => {
				this.initAlloyCrop();
			}, 600)
			
		},
		destroyed() {
			this.closeCropModel();
		}
	}
</script>

<style scoped>
	.edit-img-wrap{
		position: relative;
		width: 100%;
	}
	.result-card{
		position: absolute;
		margin-top: 40px;
		width: 300px;
		margin: calc(50% - 150px);
		z-index: 999;
	}
</style>