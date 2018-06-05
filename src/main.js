import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import $ from 'jquery'
import util from './util'
import globalConfig from './assets/js/globalConfig'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'

//jquery, util, globalConfig挂载到window中
window.$ = $;
window.util = util;
window.globalConfig = globalConfig;

//使用MuseUI
Vue.use(MuseUI)

if(util.cache.get('ipStr')){
  window.ipStr = util.cache.get('ipStr');
}

//自定义组件加载
import appWrap from '@/components/global/appWrap'
import appbar from '@/components/global/appBar'
import appContent from '@/components/global/appContent'
import appSlide from '@/components/global/appSlide'
Vue.use(appWrap);
Vue.use(appbar);
Vue.use(appContent);
Vue.use(appSlide);

//记录当前是前进还是后退
window.sessionStorage.setItem('storePath', '');
router.beforeEach((to, from, next) => {
	//未登录跳转到登录注册页
	let user = util.cache.get('user');
	if(!user && to.name != 'loginAndRegister'){
		console.log('go to loginAndRegister');
		next('/user/loginAndRegister');
		return;
	}
	let toPathName = to.name;
	let fromPathName = from.name;
	let storePath = window.sessionStorage.getItem('storePath');
	console.log('path before: ' + storePath);
	let toPathNameIndex = storePath.indexOf(toPathName);
	let fromPathNameIndex = storePath.indexOf(fromPathName);
	//为返回操作
	if(fromPathNameIndex!= -1 && toPathNameIndex != -1){
		store.commit('UPDATE_DIRECTION', {direction: 'back'})
		storePath = storePath.substr(0, fromPathNameIndex - 1);
	}else{
		store.commit('UPDATE_DIRECTION', {direction: 'forward'})
		storePath = storePath + '/' + toPathName;
	}
	window.sessionStorage.setItem('storePath', storePath);
	console.log('path after: ' + storePath);
	//setTimeout排在store.commit之后(防止路由转场动画名不一致)
	setTimeout(() => {
		next()
	}, 100)
	
});

//关闭生产模式下给出的提示
Vue.config.productionTip = false

//Vue全局扩展
Vue.mixin({
	data() {
		return {
			/*-----------------------------------注入路由相关-----------------------------------*/
			//指定path跳转(不带参数)
			go: (path) => {
				this.$router.push(path)
			},
			//指定path跳转，带query参数(在url地址栏显示)
			goWithQuery: (path, dataObj) => {
				this.$router.push({
					path: path,
					query: dataObj
				});
			},
			//指定路由名字跳转，带params参数(不在url地址栏显示)
			goWithParams: (name, dataObj) => {
				this.$router.push({
					name: name,
					params: dataObj
				});
			},
			//获取路由跳转的参数对象
			getRouterDataObj: () => {
				return util.common.isEmptyObj(this.$route.query) ? this.$route.params : this.$route.query;
			},
			//回到上一个页面
			back: () => {
				router.back();
			},
			
		}
	}
})
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})