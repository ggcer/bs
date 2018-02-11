<template>
	<div class="app-content" id="app-content">
		<slot>
		</slot>
	</div>
</template>

<script>
	import Vue from 'vue'
	import store from '../../../vuex/store'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				prototype: Vue.prototype,
			}
		},
		methods: {},
		computed: {
			...mapState({
				loading: state => state.loading
			})
		},
		props: ['needRefresh', 'refreshMethod'],
		mounted() {
			$(window).off('touchmove');
			$(window).off('touchstart');
			$(window).off('touchend');

			//下拉刷新事件注册
			let beforeY = 0;
			let afterY = 0;
			let firstPullDown = true;
			let appBar = $('#app-bar');
			let appContent = $('#app-content');
			if(this.needRefresh) {
				$(window).on('touchmove', (e) => {
					let scrollTop = $('#app-wrap').scrollTop();
					let touch = event.targetTouches[0];
					beforeY = afterY;
					afterY = touch.pageY;
					if(scrollTop == 0 && beforeY != 0) {
						if(firstPullDown && afterY > beforeY) {
							appBar.css('backgroundColor', '#7DBCFF');
							firstPullDown = false;
						}
						if(afterY > beforeY) {
							$('#app-wrap').addClass('overflowHidden');
						}
						let overScrollHeight = (afterY - beforeY) / 2;
						if(overScrollHeight < 0 && this.loading.isShowHeadLoading && (appBar.height() + overScrollHeight < 110)) {
							return;
						}
						let appBarHeight = appBar.height() + overScrollHeight;
						let appContentPaddingTop = parseFloat(appContent.css('paddingTop')) + overScrollHeight;
						appBar.height(appBarHeight);

						//保证最大与最小paddingTop
						if(appContentPaddingTop > 150) {
							appContentPaddingTop = 150;
						}
						if(appContentPaddingTop < 70) {
							appContentPaddingTop = 70;
						}
						appContent.css('paddingTop', appContentPaddingTop);
//						console.log(appBar.height(), appContent.css('paddingTop'));
					}

				});
				$(window).on('touchstart', (e) => {
					appBar.css('transition', 'background-color 0.5s');
					appContent.css('transition', 'none');
					firstPullDown = true;
					beforeY = 0;
					afterY = 0;
				});
				$(window).on('touchend', (e) => {
					$('#app-wrap').removeClass('overflowHidden');
					appBar.css('transition', 'height 0.5s, background-color 0.5s');
					appContent.css('transition', 'padding-top 0.5s');
					if(!this.loading.isShowHeadLoading) {
						if(appBar.height() > 110) {
							appBar.height(110);
							appContent.css('paddingTop', 110);
							//显示头部加载框
							store.commit('UPDATE_LOADING', {
								isShowHeadLoading: true
							})
							//调用刷新函数
							this.refreshMethod();
						} else {
							store.commit('UPDATE_LOADING', {
								isShowHeadLoading: false
							})
							appBar.css('backgroundColor', '#4AA1FF');
							appBar.height(70);
							appContent.css('paddingTop', 70);
						}
					} else {
						appBar.height(110);
						appContent.css('paddingTop', 110);
					}
				});
			}

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.app-content {
		position: relative;
		padding-top: 70px;
	}
</style>