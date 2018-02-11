import Vue from 'vue'
import Router from 'vue-router'

import common from './common'
import user from './user'
import association from './association'
import pay from './pay'
import other from './other'

Vue.use(Router)

export default new Router({
	routes: [
	   	//默认home页
		{
		  path: '',
		  name: 'home',
		  meta: {
		  },
		  component: (resovle) => { 
		  	require.ensure([], () => resovle(require('@/components/Home.vue')), 'home')
		  }
	   	},
	   	
		//分模块配置[等于一个XXX模块的路由分开配置在XXX.js文件中]
	  	...user,
	  	...association,
	  	...common,
	  	...pay,
	  	...other,
	]
})
