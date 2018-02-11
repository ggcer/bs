import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		//设备是否加载完
		isDeviceReady: false,
		//当前是前进还是后退
		direction: 'forward',
		
		//用户设置
		userSet: {
			isEnableAppNotice: true,		//是否开启应用提醒
			isEnableBackgroundMode: false,	//是否开启后台模式
		},

		//toast
		toast: {
			isShowToast: false,
			isWarnToast: false,
			isSuccessToast: false,
			toastContent: null,
		},
		
		//alert
		alert: {
			isShowAlert: false,
			alertContent: null,
			alertConfirmCb: null,
		},

		//confirm
		confirm: {
			isShowConfirm: false,
			confirmContent: null,
			confirmConfirmCb: null,
			confirmCancelCb: null,
		},

		//loading
		loading: {
			isShowHeadLoading: false,
			isShowCenterLoading: false,
		}
	},
	getters: {
		isDeviceReady: state => {
			return state.isDeviceReady;
		},
	    userSet: state => {
	      return state.userSet;
	    }
	},
	mutations: {
		UPDATE_ISDEVICEREADY(state, payLoad){
			state.isDeviceReady = payLoad.isDeviceReady;
		},
		UPDATE_DIRECTION(state, payLoad) {
			state.direction = payLoad.direction
		},
		UPDATE_USERSET(state, payLoad){
			for(let key in payLoad){
				state.userSet[key] = payLoad[key]
			}
		},
		UPDATE_TOAST(state, payLoad) {
			for(let key in payLoad){
				state.toast[key] = payLoad[key]
			}
		},
		UPDATE_ALERT(state, payLoad) {
			for(let key in payLoad){
				state.alert[key] = payLoad[key];
			}
		},
		UPDATE_CONFIRM(state, payLoad) {
			for(let key in payLoad){
				state.confirm[key] = payLoad[key];
			}
		},
		UPDATE_LOADING(state, payLoad) {
			for(let key in payLoad){
				state.loading[key] = payLoad[key];
			}
		},
	}
})
