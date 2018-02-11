import appWrapComponent from './AppWrap.vue'

const appWrap = {
	install: (Vue) => {
		Vue.component('app-wrap', appWrapComponent)
	}
}

export default appWrap
