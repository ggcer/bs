<template>
	<app-wrap id="app-wrap" :style="{backgroundImage: 'url(' + bgImgSrc + ')'}">
		<app-bar :title="title" slot="appBar">
			<mu-icon-button icon="icon-fanhui" slot="left" @click="goToLogin" v-show="isShowRegister" />
		</app-bar>
		<app-content slot="appContent">
			<transition name="bottomToTop">
				<div class="main-content" v-show="isShowLogin">
					<div class="avatar-wrap">
						<img :src="this.rememberUserHeadImg ? this.rememberUserHeadImg : this.initUserHeadImg" class="avatar-img" alt="头像" />
					</div>

					<div class="input-content login-input-content">
						<transition name="leftToRight05">
							<div v-show="isShowLogin && isShowPasswordLogin" class="main-input">
								<mu-text-field v-model="passwordLoginObj.username" hintText="请输入您的账号/手机号/邮箱" id="loginUsername"/><br/>
								<mu-text-field v-model="passwordLoginObj.password" hintText="请输入您的密码" type="password" id="loginPassword"/><br/>
								<div class="mobile-login-wrap">
									<div class="mobile-login" @click="goToMobileLogin">手 机 登 录</div>
								</div>
							</div>
						</transition>
						<transition name="rightToLeft05">
							<div v-show="isShowLogin && isShowMobileLogin" class="main-input">
								<mu-text-field v-model="mobileLoginObj.mobile" hintText="请输入您的手机号" id="loginMobile"/><br/>
								<div style="width: 100%; text-align: left; position: relative;">
									<mu-text-field v-model="mobileLoginObj.smsCode" hintText="请输入手机验证码" id="loginSmsCode"/>
									<div class="get-span login-get-span" @click="getLoginSmsCodeDisableSeconds > 0 ? '' : getSmsCode('LOGIN')" v-bind:class="{'disable-get-span': getLoginSmsCodeDisableSeconds > 0}">获 取 <span v-show="getLoginSmsCodeDisableSeconds > 0">({{getLoginSmsCodeDisableSeconds}})</span></div>
								</div>
								<div class="password-login-wrap">
									<div class="password-login" @click="goToPasswordLogin">密 码 登 录</div>
								</div>
							</div>
						</transition>
						<div class="login-bottom-btn">
							<mu-raised-button label="登 录" primary fullWidth @click="login" />
							<mu-raised-button label="加 入 我 们" @click="goToRegister" primary fullWidth/>
						</div>
					</div>

				</div>
			</transition>

			<transition name="leftToRight">
				<div class="main-content" style="margin-top: 20px;" v-show="isShowRegister">
					<div class="input-content register-input-content">
						<mu-text-field v-model="registerObj.userPhone" hintText="请输入您的手机号" id="registerUserPhone"/><br/>
						<mu-text-field v-model="registerObj.password" hintText="请输入您的密码" type="password" id="registerPassword"/><br/>
						<mu-text-field v-model="registerObj.repassword" hintText="请确认您的密码" type="password" id="registerRepassword"/><br/>
						<mu-select-field v-model="registerObj.type" hintText="请选择您的注册身份" id="registerType">
							<mu-menu-item v-for="text,index in registerTypelist" :key="index" :value="index + 1" :title="text" />
						</mu-select-field><br/>
						<div style="width: 100%; text-align: left; position: relative;">
							<mu-text-field v-model="registerObj.smsCode" hintText="请输入手机验证码" style="width: 65%;" id="registerSmsCode"/>
							<div class="get-span register-get-span" @click="getRegisterSmsCodeDisableSeconds > 0 ? '' : getSmsCode('REGISTER')" v-bind:class="{'disable-get-span': getRegisterSmsCodeDisableSeconds > 0}">获 取 <span v-show="getRegisterSmsCodeDisableSeconds > 0">({{getRegisterSmsCodeDisableSeconds}})</span></div>
						</div>
						<mu-raised-button label="注 册" primary fullWidth @click="register" />
					</div>
				</div>
			</transition>

			<transition name="fadeIn">
				<div class="others-login" v-show="isShowOthersLogin">
					<div class="others-login-head">
						<span class="line-span"></span> 第三方登录
						<span class="line-span"></span>
					</div>
					<div class="others-login-content">
						<img src="../../assets/image/icon/wechat.png" alt="wechat" style="margin-right: 20px;" />
						<img src="../../assets/image/icon/qq.png" alt="qq" style="margin-right: 20px;" />
						<img src="../../assets/image/icon/weibo.png" alt="weibo" />
					</div>
				</div>
			</transition>
		</app-content>
	</app-wrap>
</template>

<script>
	export default {
		name: 'loginAndRegister',
		data() {
			return {
				title: '登录',
				
				isShowLogin: false,
				isShowPasswordLogin: true,
				isShowMobileLogin: false,
				
				registerTypelist: ['学生', '老师', '赞助商'],
				isShowRegister: false,
				isShowOthersLogin: false,
				isOpenBottomSheet: false,
				bgImgSrc: require('../../assets/image/bg/bg.jpg'),
				getLoginSmsCodeDisableSeconds: 0,
				getRegisterSmsCodeDisableSeconds: 0,

				//密码登录对象
				passwordLoginObj: {
					username: null,
					password: null,
				},
				//手机登录对象
				mobileLoginObj: {
					mobile: null,
					smsCode: null,
				},
				//注册对象
				registerObj: {
					userPhone: null,
					password: null,
					repassword: null,
					type: null,
					smsCode: null,
				},
				
				devicedId: window.device ? window.device.uuid : ((new Date()).getTime()) + '',
				
				rememberUserHeadImg: null,
				initUserHeadImg: require('../../assets/image/dlrb.jpg'),
			}
		},
		methods: {
			goToLogin() {
				this.isShowLogin = true;
				this.isShowRegister = false;
				this.title = '登录';
			},
			goToRegister() {
				this.isShowLogin = false;
				this.isShowRegister = true;
				this.title = '加入我们';
			},
			goToMobileLogin() {
				this.isShowPasswordLogin = false;
				this.isShowMobileLogin = true;
			},
			goToPasswordLogin() {
				this.isShowPasswordLogin = true;
				this.isShowMobileLogin = false;
			},
			login() {
				//用户名密码登录
				if(this.isShowPasswordLogin){
					if(!this.passwordLoginObj.username){
						util.ui.alert('请输入账号', () => {
							$('#loginUsername .mu-text-field-input').get(0).focus();
						});
						return;
					}
					if(!this.passwordLoginObj.password){
						util.ui.alert('请输入密码', () => {
							$('#loginPassword .mu-text-field-input').get(0).focus();
						});
						return;
					}
					util.http.customReq.post('/authentication/form', this.passwordLoginObj, {
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
						if(data.refreshToken){
							this.loginSuccessHandler(data, 'PASSWORD');
						}else{	//登录失败，登录信息不通过
							util.ui.toast(data.msg, 'WARN');
						}
					})
				}else if(this.isShowMobileLogin){	//手机登录
					if(!this.mobileLoginObj.mobile){
						util.ui.alert('请输入手机号', () => {
							$('#loginMobile .mu-text-field-input').get(0).focus();
						});
						return;
					}
					if(!this.mobileLoginObj.smsCode){
						util.ui.alert('请输入手机验证码', () => {
							$('#loginSmsCode .mu-text-field-input').get(0).focus();
						});
						return;
					}
					
					//手机验证码登录
					util.http.customReq.post('/authentication/mobile', this.mobileLoginObj, {
						auth: {
						    username: globalConfig.username,
						    password: globalConfig.password
						},
						headers: {
							'devicedId': this.devicedId,
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
						//登录成功
						if(data.refreshToken){
							this.loginSuccessHandler(data, 'SMSCODE');
						}else{	//登录失败，登录信息不通过
							util.ui.toast(data.msg, 'WARN');
						}
					})
				}
			},
			loginSuccessHandler(loginReturnData, loginType){
				let user = util.common.copyObjFromBo('user');
				//储存accessToken,refreshToken,tokenType
				user.accessToken = loginReturnData.value;
				user.refreshToken = loginReturnData.refreshToken.value;
				user.tokenType = loginReturnData.tokenType;
				util.cache.set('user', user);
				console.log('用户登陆成功，token缓存完毕：', user);
				
				//存入该次用户登录的信息，用于退出登陆时回显
				let rememberUserLoginMsg = {
					username: this.passwordLoginObj.username,	//当为账号密码登陆时会有此信息
					mobile: this.mobileLoginObj.mobile,				//当为手机验证码登陆时会有此信息
					isLoginByPassword: loginType == 'PASSWORD' ? true : false,		//是否为账号密码登陆
				};
				util.cache.set('rememberUserLoginMsg', rememberUserLoginMsg);
				console.log('存入的用户登录信息：', rememberUserLoginMsg);
				
				//进入主页
				this.go('/');
			},
			register() {
				let registerObj = this.registerObj;
				if(!registerObj.userPhone){
					util.ui.alert('请输入您的手机号', () => {
						$('#registerUserPhone .mu-text-field-input').get(0).focus();
					});
					return;
				}
				if(!registerObj.password){
					util.ui.alert('请输入您的密码', () => {
						$('#registerPassword .mu-text-field-input').get(0).focus();
					});
					return;
				}
				if(!registerObj.repassword){
					util.ui.alert('请再次输入您的密码', () => {
						$('#registerRepassword .mu-text-field-input').get(0).focus();
					});
					return;
				}else{
					if(registerObj.password != registerObj.repassword){
						util.ui.alert('两次输入的密码不一致');
						return;
					}
				}
				if(!registerObj.type){
					util.ui.alert('请选择您的注册身份', () => {
						$('#registerType .mu-dropDown-menu-text').get(0).click();
					});
					return;
				}
				if(!registerObj.smsCode){
					util.ui.alert('请输入您的手机验证码', () => {
						$('#registerSmsCode .mu-text-field-input').get(0).focus();
					});
					return;
				}
				util.http.customReq.post('/register/user', registerObj, {
					headers: {
						'devicedId': this.devicedId,
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
					if(data.result){
						util.ui.toast('注册成功', 'SUCCESS');
						this.goToLogin();
						this.goToPasswordLogin();
						this.passwordLoginObj.username = registerObj.userPhone;
						this.passwordLoginObj.password = registerObj.password;
					}else{	//注册，注册信息不通过
						util.ui.toast(data.msg, 'WARN');
					}
					
				})
			},
			getSmsCode(type) {
				let reg = /^1[34578]\d{9}$/;
				if(type == 'LOGIN'){
					let mobile = this.mobileLoginObj.mobile;
					if(!mobile){
						util.ui.alert('请输入手机号');
						return;
					}else{
						if(!reg.test(mobile)){
						 	util.ui.alert('请输入正确的手机号');
							return false;
						}
					}
					util.ui.confirm(`我们将发送短信验证码到：${mobile}`, () => {
						util.http.customReq.get('/code/sms', {
							mobile: mobile
						}, {
							headers: {
								'devicedId': this.devicedId,
							}
						}, (data) => {
							if(data.result === false){
								util.ui.toast(data.msg, 'WARN');
							}else{
								//发送成功后60秒后才能再次发送验证码
								this.getLoginSmsCodeDisableSeconds = 60;
								let getLoginSmsCodeDisableSecondsInterval = setInterval(() => {
									this.getLoginSmsCodeDisableSeconds--;
									if(this.getLoginSmsCodeDisableSeconds <= 0){
										clearInterval(getLoginSmsCodeDisableSecondsInterval);
									}
								}, 1000)
								util.ui.toast(`短信验证码已发送至：${mobile}`, 'SUCCESS');
								console.log(data);
							}
						})
					})
				}else if(type == 'REGISTER'){
					let mobile = this.registerObj.userPhone;
					if(!mobile){
						util.ui.alert('请输入手机号');
						return;
					}else{
						if(!reg.test(mobile)){
						 	util.ui.alert('请输入正确的手机号');
							return false;
						}
					}
					util.ui.confirm(`我们将发送短信验证码到：${mobile}`, () => {
						util.http.customReq.get('/register/code', {
							mobile: mobile
						}, {
							headers: {
								'devicedId': this.devicedId,
							}
						}, (data) => {
							if(data.result){
								//发送成功后60秒后才能再次发送验证码
								this.getRegisterSmsCodeDisableSeconds = 60;
								let getRegisterSmsCodeDisableSecondsInterval = setInterval(() => {
									this.getRegisterSmsCodeDisableSeconds--;
									if(this.getRegisterSmsCodeDisableSeconds <= 0){
										clearInterval(getRegisterSmsCodeDisableSecondsInterval);
									}
								}, 1000)
								util.ui.toast(`短信验证码已发送至：${mobile}`, 'SUCCESS');
								console.log(data);
							}else{
								util.ui.toast(data.msg, 'WARN');
							}
						})
					})
				}
			},
		},
		mounted() {
			//获取上一次登录的用户登录信息
			let rememberUserLoginMsg = util.cache.get('rememberUserLoginMsg');
			if(rememberUserLoginMsg){
				//回显头像
				this.rememberUserHeadImg = rememberUserLoginMsg.userHeadImg;
				//前一次登录是账号密码登录
				if(rememberUserLoginMsg.isLoginByPassword){
					this.isShowPasswordLogin = true;
					this.isShowMobileLogin = false;
					this.passwordLoginObj.username = rememberUserLoginMsg.username;
				}else{	//前一次登录是手机登录
					this.isShowPasswordLogin = false;
					this.isShowMobileLogin = true;
					this.mobileLoginObj.mobile = rememberUserLoginMsg.mobile;
				}
//				this.loginObj.username = rememberUserLoginMsg.username;
//				this.rememberUserHeadImg = rememberUserLoginMsg.userHeadImg;
			}
			//0.5秒后加载登录页面
			setTimeout(() => {
				this.isShowLogin = true;
			}, 500)
			
			//1.5秒后加载第三方登录块
			setTimeout(() => {
				this.isShowOthersLogin = true;
			}, 1500)

		}
	}
</script>

<style scoped>
	.app-wrap {
		background-size: 100% 100%;
		background-position: center center;
	}
	
	.app-bar {
		background: transparent!important;
	}
	
	.main-content {
		position: absolute;
		width: 100%;
		text-align: center;
	}
	
	.avatar-img {
		margin: 40px 0;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		box-shadow: 0 0 0 2px white;
	}
	
	.input-content {
		position: relative;
		width: 70%;
		margin: 0 auto;
	}
	.login-input-content{
		height: 250px;
	}
	.main-input{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
	}
	.login-bottom-btn{
		position: absolute;
		top: 132px;
		left: 0;
		width: 100%;
	}
	
	.input-content .mu-text-field{
		width: 100%;
	}
	.others-login {
		position: fixed;
		bottom: 10px;
		letter-spacing: 2px;
		color: #888996;
		font-size: 13px;
		width: 70%;
		text-align: center;
		margin: 0 15%;
	}
	
	.others-login-head {
		height: 30px;
		line-height: 30px;
		margin-bottom: 10px;
	}
	
	.line-span {
		display: inline-block;
		border-top: 1px solid #888996;
		vertical-align: middle;
		width: 60px;
	}
	
	.others-login-content img {
		width: 35px;
		height: 35px;
		border-radius: 50%;
		border-radius: 50%;
	}
	.get-span{
		padding-top: 4px; 
		width: 35%; 
		height: 32px; 
		line-height: 32px; 
		font-size: 14px; 
		float: right; 
		
	}
	.login-get-span{
		text-align: right;
		color: white;
		position: absolute; right: 0; top: 0
	}
	.register-get-span{
		text-align: center; 
		color: white;
	}
	.disable-get-span {
		color: rgba(255, 255, 255, 0.6)!important;
	}
	.mobile-login-wrap, .password-login-wrap{
		width: 100%;
		color: rgba(255, 255, 255, 0.6); 
		font-size: 13px; 
		height: 20px; 
		line-height: 20px;
	}
	.mobile-login, .password-login{
		width: 100px;
		float: right;
		text-align: right;
		height: 20px; 
		line-height: 20px;
	}
</style>