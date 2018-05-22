<template>
	<app-wrap>
		<app-bar title="设置" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="back" />
		</app-bar>
		<app-content slot="appContent">
			<mu-list>
				<mu-sub-header>基本设置</mu-sub-header>
				<mu-list-item title="开启应用提醒" id="enableAppNotice-switch">
					<mu-switch @change="switchByIndex(0)" v-model="user.isEnableAppNotice" slot="right" />
				</mu-list-item>
				<mu-list-item title="退出后进入后台" id="enableBackgroundMode-switch">
					<mu-switch @change="switchByIndex(1)" v-model="user.isEnableBackgroundMode" slot="right" />
				</mu-list-item>
			</mu-list>
			<mu-list>
				<mu-sub-header>缓存信息</mu-sub-header>
				<mu-list-item disableRipple title="应用缓存数据">
					<div slot="right">{{cacheSize}}</div>
				</mu-list-item>
			</mu-list>
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'userSet',
		data() {
			return {
				user: {},
				cacheSize: null,
			}
		},
		methods: {
			switchByIndex(index) {
				if(index == 0){
					if(this.user.isEnableAppNotice){
						this.user.isEnableAppNotice = false;
						util.cordovaNative.disableAppNotice();
					}else{
						this.user.isEnableAppNotice = true;
						util.cordovaNative.enableAppNotice();
						util.cordovaNative.jPushByLocal('小提示', '您已开启应用提醒');
					}
				}
				if(index == 1){
					this.user.isEnableBackgroundMode = !this.user.isEnableBackgroundMode;
					if(this.user.isEnableBackgroundMode){
						//开启后台模式
						util.cordovaNative.enableBackgroundMode();
					}else{
						//关闭后台模式
						util.cordovaNative.disableBackgroundMode();
					}
				}
			}
		},
		mounted() {
			let cacheSize = 0;
			for(let item in window.localStorage) {
				if(window.localStorage.hasOwnProperty(item)) {
					cacheSize += window.localStorage.getItem(item).length;
				}
			}
			this.cacheSize = (cacheSize / 1024).toFixed(2) + 'KB';
			
			this.user = util.cache.get('user');
		},
		destroyed() {
			util.cache.set('user', this.user);
		}
	}
</script>

<style scoped>

</style>