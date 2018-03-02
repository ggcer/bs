import router from '../router'
import store from '../vuex/store'
//cordovaNative相关
const cordovaNative = {
	//获取图片	type(1:拍照，2:本地相册), photoType(照片类型), options[拍照参数]
	takePhoto(type, photoType, options) {
		let returnImgBase64 = '';
		if(navigator.camera) {
			let cameraOptions = {
				quality: 100,
				destinationType: Camera.DestinationType.DATA_URL,
				encodingType: Camera.EncodingType.JPEG,
				targetWdith: 100,
				targetHeight: 100,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				mediaType: Camera.MediaType.PICTURE
			};

			//替换默认拍照参数
			for(let key in options) {
				cameraOptions[key] = options[key];
			}

			if(type == 1) {
				//调用相机拍摄
				cameraOptions.sourceType = Camera.PictureSourceType.CAMERA;
			} else if(type == 2) {
				//调用相册选取
				cameraOptions.sourceType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
			}
			navigator.camera.getPicture((imageBase64) => {
				let cropWidth = 100;
				let cropHeight = 100;
				if(options){
					if(options.targetWidth){
						cropWidth = options.targetWidth;
					}
					if(options.targetHeight){
						cropHeight = options.targetHeight;
					}
				}
				router.push({
					name: 'imgEdit',
					params: {
						photoType: photoType,
						originalImgSrc: 'data:image/jpeg;base64,' + imageBase64,
						cropWidth: cropWidth,
						cropHeight: cropHeight,
					},
				});
				
			}, () => {
				util.ui.toast('拍照失败或被取消', 'WARN');
			}, cameraOptions);
		}else{
			util.ui.toast('拍照失败，不存在的camera对象', 'WARN');
		}
	},

	//极光推送-app端本地推送
	jPushByLocal(title, content, dataObj) {
		if(window.plugins) {
			if(plugins.jPushPlugin) {
				plugins.jPushPlugin.addLocalNotification(0, content, title, 0, 1000, JSON.stringify(dataObj));
			} else {
				util.ui.toast('极光推送失败-不存在的jPushPlugin对象', 'WARN');
			}
		} else {
			util.ui.toast('极光推送失败-不存在的plugins对象', 'WARN');
		}
	},

	//二维码扫描
	scanQrCode(succCb, failCb) {
		if(window.cordova){
			if(window.cordova.plugins){
				if(window.cordova.plugins.barcodeScanner){
					cordova.plugins.barcodeScanner.scan(
						(result) => {
							if(!result.cancelled){
								succCb(result.text);
							}
						},
						(error) => {
							failCb(error);
						}
					);
				}else{
					util.ui.toast('调用二维码扫描失败-不存在的barcodeScanner对象', 'WARN');
				}
			}else{
				util.ui.toast('调用二维码扫描失败-不存在的plugins对象', 'WARN');
			}
		}else{
			util.ui.toast('调用二维码扫描失败-不存在的cordova对象', 'WARN');
		}
	},
	
	//获取地理定位
	getMyPosition(cb) {
		if(window.baidumap_location){
			baidumap_location.getCurrentPosition((result) => {
				let position = {
					country: null,			//所在国家
					province: null,			//所在省份
					city: null,				//所在城市
					district: null,			//所在区
					street: null,			//所在街道
					locationDescribe: null,	//附近信息
				};
				if(result.country){
					position.country = result.country;
				}
				if(result.province){
					position.province = result.province;
				}
				if(result.city){
					position.city = result.city;
				}
				if(result.district){
					position.district = result.district;
				}
				if(result.street){
					position.street = result.street;
				}
				if(result.locationDescribe){
					position.locationDescribe = result.locationDescribe;
				}
				cb(position);
			}, (error) => {
				console.log(error);				
				cb(null);
			});
		}else{
			util.ui.toast('不存在的baidumap_location对象', 'WARN');
			cb(null);
		}
	},
	
	//sqlite数据库操作
	db: {
		insert() {
			if(window.db){
				db.transaction((tx) => {
					
				});
			}
		},
		delete() {
			if(window.db){
				db.transaction((tx) => {
					
				});
			}
		},
		update() {
			if(window.db){
				db.transaction((tx) => {
					
				});
			}
		},
		select() {
			if(window.db){
				db.transaction((tx) => {
					
				});
			}
		}
	},
	
	//拉起支付宝
	callAlipay(payInfo, cb) {
		//e.resultStatus  状态代码  e.result  本次操作返回的结果数据 e.memo 提示信息
 		//e.resultStatus  9000  订单支付成功 ;8000 正在处理中  调用function success
 		//e.resultStatus  4000  订单支付失败 ;6001  用户中途取消 ;6002 网络连接出错  调用function error
 		//当e.resultStatus为9000时，请去服务端验证支付结果
            /**
             * 同步返回的结果必须放置到服务端进行验证（验证的规则请看https://doc.open.alipay.com/doc2/
             * detail.htm?spm=0.0.0.0.xdvAU6&treeId=59&articleId=103665&
             * docType=1) 建议商户依赖异步通知
             */
        if(window.cordova){
        	if(window.cordova.plugins){
				if(window.cordova.plugins.alipay){
					cordova.plugins.alipay.payment(payInfo, (e) => {
						console.log('success: ', e);
						cb(e);
					}, (e) => {
						console.log('error: ', e);
						cb(e);
					});
				}else{
					util.ui.toast('拉起支付宝失败，不存在的alipay对象', 'WARN');
					cb(null);
				}
			}else{
				util.ui.toast('拉起支付宝失败，不存在的plugins对象', 'WARN');
				cb(null);
			}
        }else{
        	util.ui.toast('拉起支付宝失败，不存在的cordova对象', 'WARN');
        	cb(null);
        }
	},
	
	//开启应用消息提醒
	enableAppNotice(isSilence) {
		store.commit('UPDATE_USERSET', {
			isEnableAppNotice: true
		})
		if(!isSilence){
			util.ui.toast('应用消息提醒已开启', 'SUCCESS');
		}
	},
	
	//关闭应用消息提醒
	disableAppNotice() {
		store.commit('UPDATE_USERSET', {
			isEnableAppNotice: false
		})
	},
	
	//开启应用后台模式
	enableBackgroundMode(isSilence) {
		if(window.cordova){
        	if(window.cordova.plugins){
				if(window.cordova.plugins.backgroundMode){
					cordova.plugins.backgroundMode.enable();
					cordova.plugins.backgroundMode.setDefaults({
					    title: '小提示',
					    text: '主人，我已进入后台，点我返回哦',
					    icon: 'icon' // this will look for icon.png in platforms/android/res/drawable|mipmap 
					})
					store.commit('UPDATE_USERSET', {
						isEnableBackgroundMode: true
					})
					if(!isSilence){
						util.ui.toast('已切换至退出自动进入后台模式', 'SUCCESS');
						
					}
					return true;
				}else{
					util.ui.toast('开启应用后台模式失败，不存在的backgroundMode对象', 'WARN');
				}
			}else{
				util.ui.toast('开启应用后台模式失败，不存在的plugins对象', 'WARN');
			}
        }else{
        	util.ui.toast('开启应用后台模式失败，不存在的cordova对象', 'WARN');
        }
		return false;
	},
	
	//关闭应用后台模式
	disableBackgroundMode() {
		if(window.cordova){
        	if(window.cordova.plugins){
				if(window.cordova.plugins.backgroundMode){
					cordova.plugins.backgroundMode.disable();
					store.commit('UPDATE_USERSET', {
						isEnableBackgroundMode: false
					})
				}else{
					util.ui.toast('关闭应用后台模式失败，不存在的backgroundMode对象', 'WARN');
				}
			}else{
				util.ui.toast('关闭应用后台模式失败，不存在的plugins对象', 'WARN');
			}
        }else{
        	util.ui.toast('关闭应用后台模式失败，不存在的cordova对象', 'WARN');
        }
	}
}

//cordova初始化
document.addEventListener('deviceready', () => {
	//隐藏开机动画
	if(navigator.splashscreen) {
		navigator.splashscreen.hide();
	}

	//极光推送配置
	if(plugins.jPushPlugin) {
		//启用极光推送服务
		try {
			plugins.jPushPlugin.init();
			plugins.jPushPlugin.getRegistrationID((id) => {
				//将获取到的id存入服务端   
				console.log('jpush id: ' + id);
			});
			//点击通知栏的回调，在这里编写特定逻辑  
			plugins.jPushPlugin.openNotificationInAndroidCallback = (data) => {
				console.log(data);
			}
			//清空本地消息  
			plugins.jPushPlugin.clearLocalNotifications();
			//设置为debug模式
			plugins.jPushPlugin.setDebugMode(true);
		} catch(exception) {
			alert(exception);
		}
	}else{
		cosole.log('不存在的jPushPlugin对象');
	}
	
	//监听返回键
	var isExitApp = false;
	document.addEventListener("backbutton", () => {
		if(cordova){
			if(cordova.plugins){
				if(cordova.plugins.backgroundMode){
					//判断当前是否在主页
					if(sessionStorage.getItem('storePath').endsWith('home') || sessionStorage.getItem('storePath').endsWith('loginAndRegister')){
						if(store.getters.userSet.isEnableBackgroundMode){	//程序进入后台
							cordova.plugins.backgroundMode.moveToBackground();
						}else{
							//退出app
							if (isExitApp) {
								navigator.app.exitApp();
			                } else {
			                	util.ui.toast('再按一次返回键退出');
			                    isExitApp = true;
			                    setTimeout(function () {
			                        isExitApp = false;
			                    }, 2000);
			                }
						}
					}else{
						//当显示图片查看层时关闭图片查看层
						if(store.getters.imgViewer.isShowImgViewer){
							util.ui.hideImgViewer();
						}else{
							router.back();
						}
					}
				}else{
					console.log('监听返回按钮失败-不存在的backgroundMode对象');
				}
			}else{
				console.log('监听返回按钮失败-不存在的plugins对象');
			}
		}else{
			console.log('监听返回按钮失败-不存在的cordova对象');
		}
	}, false);
	
	//监听键盘显示与收起[防止软键盘挡住输入框]
	window.addEventListener('native.keyboardshow', (e) => {
    	let windowHeight = $(window).height();
    	let eleOffetTop = $(document.activeElement).offset().top;
    	let keyboardHeight = e.keyboardHeight + $(document.activeElement).height() + 20; //显示在软键盘上20px的位置
    	console.log(windowHeight, eleOffetTop);
		let offsetTopWithBottom = windowHeight - eleOffetTop;
		if(offsetTopWithBottom < keyboardHeight){
			if($(document).scrollTop() + $(window).height() + keyboardHeight >= $(document).height()){
				$('#app-content').css('marginBottom', keyboardHeight - ($(document).height() - $(document).scrollTop() - $(window).height()) + 'px');
			}
			$('#app-wrap').animate({  
	            scrollTop: $('#app-wrap').scrollTop() + keyboardHeight - offsetTopWithBottom
	        }, 300); 
		}
	});
	window.addEventListener('native.keyboardhide', (e) => {
		$('#app-content').css('marginBottom', 0);
	});
	
	//开启sqlite数据库
	window.db = window.sqlitePlugin.openDatabase({
		name: "wxstDB",
		location: 'default'
	});
	
	//更新isDeviceReady
	store.commit('UPDATE_ISDEVICEREADY', {
		isDeviceReady: true,
	});
	
	//取得缓存中的userSet静默进行app设置
	let user = util.cache.get('user');
	if(user){
		if(user.isEnableAppNotice){
			cordovaNative.enableAppNotice(true);
		}
		if(user.isEnableBackgroundMode){
			cordovaNative.enableBackgroundMode(true);
		}
	}
	
	cordovaNative.getMyPosition((position) => {
		console.log('定位结果：' + position);
		let positionDesc = '';
		if(position){
			if(position.country != null){
				if(position.province == position.city){
					positionDesc = "当前位置：" + position.province + " " + position.district + " " + position.street;
				}else{
					positionDesc = "当前位置：" + position.province + " " + position.city + " " + position.district + " " + position.street;
				}
				util.ui.toast(positionDesc, 'SUCCESS', 4000);
			}else{
				positionDesc = "定位失败，请检查网络";
				util.ui.toast(positionDesc, 'WARN', 4000);
			}
		}else{
			positionDesc = "定位失败，请重试";
			util.ui.toast(positionDesc, 'WARN', 4000);
		}
	})
})

export default cordovaNative