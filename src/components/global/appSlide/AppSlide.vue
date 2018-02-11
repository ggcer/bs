<template>
	<div class="app-slide">
		<div class="app-slide-content" id="app-slide-content">
			<slot>

			</slot>
		</div>
		<div class="app-slide-model" id="app-slide-model"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {

		},
		mounted() {
			$('#app-slide-model').click(() => {
				this.$emit('closeAppSlideEvent');
			})
			$('#app-slide-content').click((e) => {
				let target = e.target;
				if(target.id != 'app-slide-content'){
//					this.$emit('closeAppSlideEvent');
				}
			})
		},
		destoryed() {
			$('#app-slide-model').off('click');
			$('#app-slide-content').off('click');
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.app-slide {
		position: fixed;
		top: 0;
		left: 0;
		width: 0;
		height: 100%;
		z-index: 2;
	}
	
	.app-slide-content {
		position: fixed;
		top: 0;
		left: -255px;
		width: 250px;
		height: 100%;
		background-color: rgb(244, 244, 244);
		z-index: 4;
	}
	
	.app-slide-model {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 3;
		background-color: rgb(0, 0, 0);
		opacity: 0;
		display: none;
	}
</style>