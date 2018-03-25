<template>
	<div id="app">
		<router-view style="width: 100%;"></router-view>


		<!--底部提示框-->
		<mu-toast v-show="toast.isShowToast" v-bind:class="{'success-toast': toast.isSuccessToast, 'warn-toast': toast.isWarnToast}" :message="toast.toastContent" />
		<!-- alert框 -->
		<mu-dialog :open="alert.isShowAlert">
			{{alert.alertContent}}
			<mu-flat-button label="确定" slot="actions" primary @click="alert.alertConfirmCb" />
		</mu-dialog>
		<!-- confirm框 -->
		<mu-dialog :open="confirm.isShowConfirm">
			{{confirm.confirmContent}}
			<mu-flat-button slot="actions" @click="confirm.confirmConfirmCb" primary label="确定" />
			<mu-flat-button slot="actions" @click="confirm.confirmCancelCb" label="取消" />
		</mu-dialog>
		<!-- loading框 -->
		<!--遮罩层-->
		<div id="loading-wrap" class="loading-wrap" v-show="loading.isShowCenterLoading"></div>
		<mu-circular-progress :size="40" :strokeWidth="2" v-show="loading.isShowCenterLoading" />
		
		<!--图片查看层-->
		<transition name="fadeIn05">
			<div id="img-viewer" class="img-viewer" v-show="imgViewer.isShowImgViewer" onclick="util.ui.hideImgViewer()">
				<div class="img-wrap" id="img-wrap" 
					v-bind:style="{width: 'calc(' + imgViewer.imgSrcList.length * 100 + '% + ' + imgViewer.imgSrcList.length * 15 + 'px)' , left: 'calc(-' + imgViewer.nowActiveIndex * 100 + '% - ' + imgViewer.nowActiveIndex * 15 + 'px)'}">
					<div class="img-div" v-for="(item, index) in imgViewer.imgSrcList" v-bind:style="{backgroundImage: 'url(' + item + ')'}"></div>
				</div>
				<div class="img-circle-wrap" v-show="imgViewer.imgSrcList.length > 1">
					<div class="img-circle" v-for="(item, index) in imgViewer.imgSrcList" v-bind:class="{'img-circle-active': index == imgViewer.nowActiveIndex}"></div>
				</div>
				<!--<img src="./assets/image/icon/cancel-white.png" class="img-viewer-cancel" onclick="util.ui.hideImgViewer()">-->
			</div>
		</transition>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { mapState } from 'vuex'
	import './assets/css/common.css'
	import './assets/css/museui-overwrite.css'
  import './assets/font/font.css'
  import '../debuggap'
	export default {
		name: 'app',
		data() {
			return {}
		},
		methods: {
		},
		computed: {
			...mapState({
				toast: state => state.toast,
				alert: state => state.alert,
				confirm: state => state.confirm,
				loading: state => state.loading,
				imgViewer: state => state.imgViewer,
			})
		},
		mounted() {},
	}
</script>