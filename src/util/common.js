import bo from '../assets/js/bo'
import router from '../router'
const common = {
	//拷贝数据传输对象模板
	copyObjFromBo(objName) {
		let obj = bo[objName];
		let copyObj = null
		if(obj) {
			let jsonStr = JSON.stringify(obj);
			copyObj = JSON.parse(jsonStr);
		}
		return copyObj;
	},

	//判断一个对象是否为空对象
	isEmptyObj(obj) {
		for(let name in obj) {
			return false;
		}
		return true;
	},
	
	//若fromObj里面有对应toObj的属性，则把该属性的值赋给toObj
	copyFieldValue(toObj, fromObj) {
		if(fromObj){
			for(let key in toObj){
				if(fromObj[key]){
					toObj[key] = fromObj[key];
				}
			}
		}
	},
	
	//base64编码
	encodeByBase64(str) {
		let bs64 = new Base64();
		return bs64.encode(str);
	},
	
	//时间戳转换
	
	//用户退出
	loginOut() {
		//清除除rememberUserLoginMsg以外的缓存数据
		let rememberUserLoginMsg = util.cache.get('rememberUserLoginMsg');
		util.cache.clear();
		util.cache.set('rememberUserLoginMsg', rememberUserLoginMsg);
		//清除路径索引
		sessionStorage.setItem('storePath', '');
		router.push('/user/loginAndRegister');
	}
}
export default common