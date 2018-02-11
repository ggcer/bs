<template>
	<div class="app-bar" id="app-bar" v-bind:class="{'opacity-appbar': isOpacityAppbar}">
		<div class="status"></div>
		<div class="bar-content">
			<div class="left">
				<slot name="left"></slot>
			</div>
			<span v-if="title" v-html="title" class="app-bar-title"></span>
			<span v-if="!title" class="app-bar-title">
				<slot name="title"></slot>
			</span>
			<div class="right">
				<slot name="right"></slot>
			</div>
		</div>
		<div class="runner-wrap" v-if="loading.isShowHeadLoading">
			<div class='kai animate' id='running' :style="{backgroundImage: 'url(' + runnerImgSrc + ')'}">
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				isOpacityAppbar: false,
				runnerImgSrc: require('../../../assets/image/other/head-loading-runner.png')
			}
		},
		methods: {

		},
		computed: {
			...mapState({
				loading: state => state.loading
			})
		},
		props: ['title'],
		mounted() {
			$('#app-wrap').off('scroll');

			$('#app-wrap').scroll(() => {
				let scrollTop = $('#app-wrap').scrollTop();
				if(scrollTop > $('#app-bar').height()) {
					this.isOpacityAppbar = true;　　
				} else {
					this.isOpacityAppbar = false;
				}
			});
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.app-bar {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		min-height: 70px;
		max-height: 150px;
		letter-spacing: 3px;
		/*background: linear-gradient(20deg, #00A9B6, #00E1B6);*/
		background-color: #4AA1FF;
		color: white;
		font-size: 17px;
		z-index: 2;
		transition: background-color 1s;
	}
	
	.status {
		height: 20px;
	}
	
	.bar-content {
		position: relative;
		height: 50px;
		line-height: 50px;
	}
	.app-bar-title{
		width: 100%;
		display: block;
		height: 50px;
		line-height: 50px;
		margin: 0 auto;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.left,
	.right {
		position: absolute;
		top: 5px;
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		z-index: 3;
	}
	
	.left .mu-icon-button,
	.right .mu-icon-button {
		width: 40px;
		height: 40px;
		padding: 7px;
	}
	
	.left .img-icon,
	.right .img-icon {
		width: 24px;
		height: 32px;
		margin: 0 8px;
		padding-top: 8px;
	}
	.left .text-btn,
	.right .text-btn {
		font-size: 14px;
		width: 60px;
		text-align: center;
	}
	
	.left {
		left: 0;
	}
	
	.right {
		right: 0;
	}
	
	.opacity-appbar {
		box-shadow: 0 .5em 1em rgba(0, 0, 0, 0.6)!important;
		background: rgba(0, 0, 0, 0.4)!important;
	}
	/*loader*/
	
	.runner-wrap {
		height: 100px;
		margin-top: -35px;
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
		animation: animate 0.75s steps(19) infinite;
	}
	
	@keyframes animate {
		to {
			background-position: -1330px;
		}
	}
</style>