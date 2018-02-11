import appSlideComponent from './AppSlide.vue'

const appSlide = {
	install: (Vue) => {
		Vue.component('app-slide', appSlideComponent)
	}
}

export default appSlide
