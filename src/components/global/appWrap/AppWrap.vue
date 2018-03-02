<template>
	<transition :name="direction">
		<div class="app-wrap" id="app-wrap">
			<slot name="appBar"></slot>
			<slot name="appContent"></slot>
			<slot name="appSlide"></slot>
		</div>
	</transition>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		methods: {

		},
		props: [],
		computed: {
			...mapState({
				direction: state => state.direction
			})
		},
		mounted() {
			//隐藏所有loading
			util.ui.hideLoading('ALL');
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.app-wrap {
		width: 100%;
		height: 100%;
		position: absolute;
		overflow-x: hidden;
		background-color: #F4F4F4;
		transition: all 0.3s cubic-bezier(.55,0,.1,1);
	}
	
	.forward-enter, .back-leave-active {
	  opacity: 0;
	  transform: translate(80px, 0);
	}
	.forward-leave-active, .back-enter {
	  opacity: 0;
	  transform: translate(-80px, 0);
	}
</style>