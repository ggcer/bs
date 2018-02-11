import appBarComponent from './AppBar.vue'

const appBar = {
	install: (Vue) => {
		Vue.component('app-bar', appBarComponent)
	}
}

export default appBar
