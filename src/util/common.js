import bo from '../assets/js/bo'
import router from '../router'
const common = {
	/*----------------------------------对象相关----------------------------------*/
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
	//判断一个对象是否为空对象
	isEmptyObj(obj) {
		for(let name in obj) {
			return false;
		}
		return true;
	},
	//对象浅拷贝
	shallowCopyObj(obj){
		return JSON.parse(JSON.stringify(obj));
	},
	
	/*----------------------------------日期相关----------------------------------*/
	//yyyy-mm-dd HH:mm:ss转Date对象
	formatDateStrToDateObj(dateStr){
		if(dateStr){
			let dateArr = dateStr.split(' ');
			let ymd = dateArr[0].split('-');
			
			let year = ymd[0];
			let month = ymd[1].indexOf('0') == -1 ? ymd[1] : ymd[1].substr(1, 1);
			let day = ymd[2].indexOf('0') == -1 ? ymd[2] : ymd[2].substr(1, 1);
			
			let hour = null;
			let minute = null;
			let second = null;
			if(dateArr.length > 1){
				let hms = dateArr[1].split(':');
				hour = hms[0].indexOf('0') == -1 ? hms[0] : hms[0].substr(1, 1);
				minute = hms[1].indexOf('0') == -1 ? hms[1] : hms[1].substr(1, 1);
				second = hms[2].indexOf('0') == -1 ? hms[2] : hms[2].substr(1, 1);
			}
			return new Date(year, month - 1, day, hour, minute, second);
		}else{
			return null;
		}
	},
	
	//转化日期字符串为时间戳
	formatDateStrToTimestamp(dateStr){
		if(dateStr){
			return this.formatDateStrToDateObj(dateStr).getTime();
		}else{
			return null;
		}

	},
	
	//获得当前时间的字符串yyyy-mm-dd HH:mm:ss或yyyy-mm-dd
	getCurrentDateStr(type){
		let nowDateObj = new Date();
		let year = nowDateObj.getFullYear();
		let month = nowDateObj.getMonth() + 1;
		if(month < 10){
			month = '0' + month;
		}
		let day = nowDateObj.getDate();
		if(day < 10){
			day = '0' + day;
		}
		let hour = nowDateObj.getHours();
		if(hour < 10){
			hour = '0' + hour;
		}
		let minute = nowDateObj.getMinutes();
		if(minute < 10){
			minute = '0' + minute;
		}
		let second = nowDateObj.getSeconds();
		if(second < 10){
			second = '0' + second;
		}
		if(type == 'yyyy-mm-dd'){
			return `${year}-${month}-${day}`;
		}
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	},
	
	/*----------------------------------其他----------------------------------*/
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