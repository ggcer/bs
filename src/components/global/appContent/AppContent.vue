<template>
	<div class="app-content" id="app-content">
		<slot>
		</slot>
		<div id="load-more-div" class="load-more-div" v-html="loadMoreDescCpt" v-show="loadMoreMethod">
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import store from '../../../vuex/store'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				loadMoreDescWhenActive: null,
			}
		},
		methods: {},
		computed: {
			loadMoreDescCpt: function(){
				//当前正在加载，显示加载框
				if(this.loading.isShowBottomLoading){
					return this.loadMoreDescWhenActive;
				}else{
					return this.loadMoreDesc ? this.loadMoreDesc : '见底了，下拉加载更多';
				}
			},
			...mapState({
				loading: state => state.loading
			})
		},
		props: ['refreshMethod',  'loadMoreMethod', 'loadMoreDesc'],
		mounted() {
			let appWrap = $('#app-wrap');
			let appBar = $('#app-bar');
			let appContent = $('#app-content');
			let loadMoreDiv = $('#load-more-div');
			
			if(this.refreshMethod) {
				//下拉刷新事件注册
				let beforeY = 0;
				let afterY = 0;
				let firstPullDown = true;
				$(window).on('touchmove', (event) => {
					let scrollTop = appWrap.scrollTop();
					let touch = event.targetTouches[0];
					beforeY = afterY;
					afterY = touch.pageY;
					if(scrollTop == 0 && beforeY != 0) {
						if(firstPullDown && afterY > beforeY) {
							appBar.css('backgroundColor', '#7DBCFF');
							firstPullDown = false;
						}
						if(afterY > beforeY) {
							appWrap.addClass('overflowHidden');
						}
						let overScrollHeight = (afterY - beforeY) / 2;
						if(overScrollHeight < 0 && this.loading.isShowTopLoading && (appBar.height() + overScrollHeight < 110)) {
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
				$(window).on('touchstart', (event) => {
					appBar.css('transition', 'background-color 0.5s');
					appContent.css('transition', 'none');
					firstPullDown = true;
					beforeY = 0;
					afterY = 0;
				});
				$(window).on('touchend', (event) => {
					appWrap.removeClass('overflowHidden');
					appBar.css('transition', 'height 0.5s, background-color 0.5s');
					appContent.css('transition', 'padding-top 0.5s');
					if(!this.loading.isShowTopLoading) {
						if(appBar.height() > 110) {
							appBar.height(110);
							appContent.css('paddingTop', 110);
							//显示头部加载框
							store.commit('UPDATE_LOADING', {
								isShowTopLoading: true
							})
							//调用刷新函数
							this.refreshMethod();
						} else {
							store.commit('UPDATE_LOADING', {
								isShowTopLoading: false
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
			
			if(this.loadMoreMethod){
				let beforeY = 0;
				let afterY = 0;
				$(window).on('touchmove', (event) => {
					let touch = event.targetTouches[0];
					beforeY = afterY;
					afterY = touch.pageY;
					let scrollTop = appWrap.scrollTop();
					//1而不是0是为了防止精度问题不触发
					let isBottom = Math.abs(scrollTop + $(window).height() - appContent.height()) < 1 ? true : false;
					if(isBottom) {
						let addHeight = (beforeY - afterY) * 0.5;
						let height = loadMoreDiv.height() + addHeight;
						if(height < 40){
							height = 40;
						}
						if(height > 100){
							height = 100;
						}
						loadMoreDiv.height(height);
						appWrap.scrollTop(appContent.height() - $(window).height());
					}
				});
				$(window).on('touchstart', (event) => {
					loadMoreDiv.css('transition', 'none');
					
					let touch = event.targetTouches[0];
					beforeY = 0;
					afterY = touch.pageY;
				});
				$(window).on('touchend', (event) => {
					loadMoreDiv.css('transition', 'height 0.5s');
					if(loadMoreDiv.height() == 100 && !this.loading.isShowBottomLoading) {
						this.loadMoreDescWhenActive = '' +
							'<div class="mu-circle-wrapper  active" style="width: 20px; height: 20px; margin-top: 10px!important">' +
							'<div class="mu-circle-spinner active" style="border-color: #4AA1FF!important">' +
							'<div class="mu-circle-clipper left"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
							'<div class="mu-circle-gap-patch"><div class="mu-circle"></div></div>' +
							'<div class="mu-circle-clipper right"><div class="mu-circle" style="border-width: 1px;"></div></div>' +
							'</div>' +
							'</div>' +
							'';
						//显示底部加载框
						store.commit('UPDATE_LOADING', {
							isShowBottomLoading: true
						})
						//调用加载更多函数
						this.loadMoreMethod();
					}
					loadMoreDiv.height(40);
					
				});
			}
		},
		destroyed() {
			$(window).off('touchmove');
			$(window).off('touchstart');
			$(window).off('touchend');
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.app-content {
		position: relative;
		padding-top: 70px;
	}
	.load-more-div{
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 13px;
		text-align: center;
		letter-spacing: 1px;
		color: #939393;
	}
</style>