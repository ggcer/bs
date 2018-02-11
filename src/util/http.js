import axios from 'axios'
import store from '../vuex/store'
import globalConfig from '../assets/js/globalConfig'

//一般axios
let normalAxios = axios.create({
	//超时秒数
	timeout: globalConfig.requestTimeout,
	//标志为跨域请求
	withCredentials: true,
});
//一般axios请求拦截器[一般接口验证accessToken]
normalAxios.interceptors.request.use(config => {
	//显示加载模态层
	util.ui.showLoading();
	
	console.log('一般请求成功发出--config：', config);
	let accessToken = util.cache.get('user').accessToken;
	let refreshToken = util.cache.get('user').refreshToken;
	let tokenType = util.cache.get('user').tokenType;
	//如果没有token和refresh_token直接取消请求并提示重新登录
	if(accessToken && refreshToken && tokenType){
		config.headers.Authorization = `${tokenType} ${accessToken}`;
	}else{
		let source = axios.CancelToken.source();
		config.cancelToken = source.token;
		source.cancel('用户未登录，缺少accessToken或refreshToken或tokenType');
		util.ui.alert('登录状态异常，请重新登录', () => {
			util.common.loginOut();
		});
	}
	return config;
}, error => {
	//关闭加载模态层
	util.ui.hideAllLoading();
	
	console.error(error);
	util.ui.toast('发出请求时出错[1]', 'WARN');
	return Promise.reject(error);
});
//一般axios返回拦截器
normalAxios.interceptors.response.use(response => {
	//关闭加载模态层
	util.ui.hideAllLoading();

	console.log('一般请求成功返回--data：', response.data);
	return response;
}, error => {
	//关闭加载模态层
	util.ui.hideAllLoading();
	
	return Promise.reject(error);
})

//一般请求错误处理器
function normalReqErrorHandler(error, succCb, failCb){
	//取消请求的情况，未经过服务器
	//[一般为路由切换时停止前一页面的所有请求或者token不存在时停止请求，并不是真的出错，不处理]
	if(axios.isCancel(error)) {
		console.log('一般请求被取消：', error.message);
	}else{	//非取消请求的情况，出现错误
		//服务器返回错误信息，有response
		if(error.response){
			//返回状态为401可能为accessToken过期，需使用refreshToken重新请求accessToken并刷新refreshToken
			if(error.response.status == 401){
				console.log('token过期，请求更新token');
				let refreshToken = util.cache.get('user').refreshToken;
				let recoverToken = customReq.post('/oauth/token', {
					grant_type: 'refresh_token',
					refresh_token: refreshToken,
					scope: 'all'
				}, {
					//header Authorization
					auth: {
					    username: globalConfig.username,
					    password: globalConfig.password
					},
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					transformRequest: [function (data) {
					    let ret = ''
					    for (let it in data) {
					      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					    }
					    return ret
					}],
				}, (data) => {
					console.log('更新token成功：', data);
					//更新user
					let user = util.cache.get('user');
					user.accessToken = data.access_token;
					user.refreshToken = data.refresh_token;
					user.tokenType = data.token_type;
					util.cache.set('user', user);
					
					//重新请求原请求
					let reConfig = error.response.config;
					//使用更新后的token重新进行原请求
					reConfig.headers.Authorization = `${user.tokenType} ${user.accessToken}`;
					//显示加载模态层
					console.log('二次请求成功发出--reConfig：', reConfig);
					util.ui.showLoading();
					axios.request(reConfig)
					.then((res) => {
						console.log('二次请求成功返回--data：', res.data);
						//关闭加载模态层
						util.ui.hideAllLoading();
						succCb(res.data);
					})
					.catch((err) => {
						//关闭加载模态层
						util.ui.hideAllLoading();
						if(err.response){	//服务器出错
							console.error('二次请求失败，服务器出错，错误代码：' + err.response.status);
							util.ui.toast('二次请求失败，服务器出错，错误代码：' + err.response.status, 'WARN');
						}else if(err.request){	//无网络或服务器未响应
							console.error('二次请求时无网络或服务器未响应：' + err.request);
							util.ui.toast('二次请求时无网络或服务器未响应', 'WARN');
						}else{		//一般程序级错误
							console.error('二次请求时出现程序级错误：', err);
							util.ui.toast('二次请求时出现程序级错误', 'WARN');
						}
						if(failCb){
							failCb(err);
						}
					})
				}, failCb)
			}else{
				console.error('服务器出错，错误代码：' + error.response.status);
				util.ui.toast('服务器出错，错误代码：' + error.response.status, 'WARN');
				if(failCb){
					failCb(error);
				}
			}
		}else if(error.request){	//请求发出但是没有接受到服务器返回信息
			console.error('无网络或服务器未响应');
			util.ui.toast('无网络或服务器未响应', 'WARN');
			if(failCb){
				failCb(error);
			}
		}else{		//一般程序级错误
			console.error('请求时出现程序级错误：', error);
			util.ui.toast('请求时出现程序级错误', 'WARN');
			if(failCb){
				failCb(error);
			}
		}
	}
}

//定制axios(无需token验证的情况或者某些特殊的需要定制的请求)
let customAxios = (config) => {
	let returnCustomAxios = axios.create({
		//超时毫秒数
		timeout: globalConfig.requestTimeout,
		//标志为跨域请求
		withCredentials: true,
		...config
	})
	//定制axios请求拦截器
	returnCustomAxios.interceptors.request.use(config => {
		//显示加载模态层
		util.ui.showLoading();
		
		console.log('定制请求成功发出--config：', config);
		return config;
	}, error => {
		//关闭加载模态层
		util.ui.hideAllLoading();
	
		console.error(error);
		util.ui.toast('发出请求时出错[2]', 'WARN');
		return Promise.reject(error)
	})
	//定制axios返回拦截器
	returnCustomAxios.interceptors.response.use(response => {
		//关闭加载模态层
		util.ui.hideAllLoading();
		
		console.log('定制请求成功返回--data：', response.data);
		return response;
	}, error => {
		//关闭加载模态层
		util.ui.hideAllLoading();
		
		return Promise.reject(error)
	})
	
	return returnCustomAxios;
}

//定制请求错误处理器
function customReqErrorHandler(error, succCb, failCb){
	//取消请求的情况，未经过服务器
	//[一般为路由切换时停止前一页面的所有请求或者token不存在时停止请求]
	if(axios.isCancel(error)) {
		console.log('定制请求被取消：', error.message);
	}else{	//非取消请求的情况，出现错误
		//服务器返回错误信息，有response
		if(error.response){
			if(error.response.status == 401){
				let url = error.response.config.url;
				//为refresh_token过期，直接提示重新登录
				if(url.indexOf('/oauth/token') != -1){
					console.log('更新token失败：refresh_token过期');
					util.ui.alert('由于您长时间未登录，为验证您的身份，请重新登录', () => {
						util.common.loginOut();
					});
				}else{
					console.error('服务器出错，错误代码：' + error.response.status);
					util.ui.toast('服务器出错，错误代码：' + error.response.status, 'WARN');
				}
			}else{
				console.error('服务器出错，错误代码：' + error.response.status);
				util.ui.toast('服务器出错，错误代码：' + error.response.status, 'WARN');
			}
		}else if(error.request){	//请求发出但是没有接受到服务器返回信息
			console.error('无网络或服务器未响应');
			util.ui.toast('无网络或服务器未响应', 'WARN');
		}else{		//一般程序级错误
			console.error('请求时出现程序级错误：', error);
			util.ui.toast('请求时出现程序级错误', 'WARN');
		}
		if(failCb){
			failCb(error);
		}
		
	}
}

/*----------------------------------封装请求(请求地址, 请求参数, [成功回调(data)], [失败回调(err)])----------------------------------*/
//一般接口请求
let normalReq = {
	post(requestUrl, params, succCb, failCb) {
		return normalAxios.post(process.env.API_HOST + requestUrl, params)
		.then((res) => {
			//res不存在表示手动取消请求，不需要进入成功回调
			if(succCb && res){
				succCb(res.data)
			}
		})
		.catch((err) => {
			normalReqErrorHandler(err, succCb, failCb);
		});
	},
	delete(requestUrl, params, succCb, failCb) {
		return normalAxios.delete(process.env.API_HOST + requestUrl, params)
		.then((res) => {
			//res不存在表示手动取消请求，不需要进入成功回调
			if(succCb && res){
				succCb(res.data)
			}
		})
		.catch((err) => {
			normalReqErrorHandler(err, succCb, failCb);
		});
	},
	put(requestUrl, params, succCb, failCb) {
		return normalAxios.put(process.env.API_HOST + requestUrl, params)
		.then((res) => {
			//res不存在表示手动取消请求，不需要进入成功回调
			if(succCb && res){
				succCb(res.data)
			}
		})
		.catch((err) => {
			normalReqErrorHandler(err, succCb, failCb);
		});
	},
	get(requestUrl, params, succCb, failCb) {
		return normalAxios.get(process.env.API_HOST + requestUrl, {params: params})
		.then((res) => {
			//res不存在表示手动取消请求，不需要进入成功回调
			if(succCb && res){
				succCb(res.data)
			}
		})
		.catch((err) => {
			normalReqErrorHandler(err, succCb, failCb);
		});
	}
}

//定制接口请求
let customReq = {
	post(requestUrl, params, config, succCb, failCb) {
		return customAxios(config).post(process.env.API_HOST + requestUrl, params)
		.then((res) => {
			//res不存在表示手动取消请求，不需要进入成功回调
			if(succCb && res){
				succCb(res.data)
			}
		})
		.catch((err) => {
			customReqErrorHandler(err, succCb, failCb);
		});
	},
	delete(requestUrl, params, config, succCb, failCb) {
		return customAxios(config).delete(process.env.API_HOST + requestUrl, params)
		.then((res) => {
			//res不存在表示手动取消请求，不需要进入成功回调
			if(succCb && res){
				succCb(res.data)
			}
		})
		.catch((err) => {
			customReqErrorHandler(err, succCb, failCb);
		});
	},
	put(requestUrl, params, config, succCb, failCb) {
		return customAxios(config).put(process.env.API_HOST + requestUrl, params)
		.then((res) => {
			//res不存在表示手动取消请求，不需要进入成功回调
			if(succCb && res){
				succCb(res.data)
			}
		})
		.catch((err) => {
			customReqErrorHandler(err, succCb, failCb);
		});
	},
	get(requestUrl, params, config, succCb, failCb) {
		return customAxios(config).get(process.env.API_HOST + requestUrl, {params: params})
		.then((res) => {
			//res不存在表示手动取消请求，不需要进入成功回调
			if(succCb && res){
				succCb(res.data)
			}
		})
		.catch((err) => {
			customReqErrorHandler(err, succCb, failCb);
		});
	}
}

/*----------------------------------导出----------------------------------*/
export default {
	axios: axios,
	normalReq: normalReq,
	customReq: customReq
}