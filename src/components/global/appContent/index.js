import appContentComponent from './AppContent.vue'

const appContent = {
	install: (Vue) => {
		Vue.component('app-content', appContentComponent)
	}
}

export default appContent
