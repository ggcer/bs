//ui控件相关
import store from '../vuex/store'
import Picker from 'better-picker'
import city from '../assets/js/json/city'
import college from '../assets/js/json/college'
const ui = {
	//toast
	toast(content, toastType, duration) {
		store.commit('UPDATE_TOAST', {
			isShowToast: true,
			isWarnToast: toastType == 'WARN' ? true : false,
			isSuccessToast: toastType == 'SUCCESS' ? true : false,
			toastContent: content
		});
		duration = duration ? duration : 2000;
		setTimeout(() => {
			store.commit('UPDATE_TOAST', {
				isShowToast: false,
				isWarnToast: false,
				isSuccessToast: false,
				toastContent: null
			});
		}, duration)
	},
	
	//提示框
	alert(content, confirmCb) {
		let confirmCbWithClose = () => {
			if(confirmCb) {
				confirmCb();
			}
			store.commit('UPDATE_ALERT', {
				isShowAlert: false,
			})
		}
		store.commit('UPDATE_ALERT', {
			isShowAlert: true,
			alertContent: content,
			alertConfirmCb: confirmCbWithClose
		})
	},

	//确认框
	confirm(content, confrimCb, cancelCb) {
		let confrimCbWithClose = () => {
			if(confrimCb) {
				confrimCb();
			}
			store.commit('UPDATE_CONFIRM', {
				isShowConfirm: false,
			})
		}
		let cancelCbWithClose = () => {
			if(cancelCb) {
				cancelCb();
			}
			store.commit('UPDATE_CONFIRM', {
				isShowConfirm: false,
			})
		}
		store.commit('UPDATE_CONFIRM', {
			isShowConfirm: true,
			confirmContent: content,
			confirmConfirmCb: confrimCbWithClose,
			confirmCancelCb: cancelCbWithClose
		})
	},

	//显示加载框
	showLoading() {
		store.commit('UPDATE_LOADING', {
			isShowCenterLoading: true,
		})
	},
	//隐藏加载框
	hideAllLoading() {
		store.commit('UPDATE_LOADING', {
			isShowHeadLoading: false,
			isShowCenterLoading: false
		})
		$('#app-bar').height(70);
		$('#app-content').css('paddingTop', 70);
		$('#app-bar').css('backgroundColor', '#4AA1FF');
	},

	//获取性别picker
	getSexPicker(sexObj) {
		let sexData = [{
			value: 1,
			text: '男'
		}, {
			value: 2,
			text: '女'
		}];

		let sexPicker = new Picker({
			data: [sexData],
			selectedIndex: [0],
			title: '请选择性别'
		});
		sexPicker.on('picker.valuechange', (selectedVal, selectedIndex) => {
			sexObj.value = sexData[selectedIndex[0]].value;
			sexObj.text = sexData[selectedIndex[0]].text;
		});

		return sexPicker;
	},

	//获取生日picker
	getBirthdayPicker(birthdayObj) {
		let years = [];
		let months = [];
		let days = [];
		let nowDate = new Date();
		let nowYear = nowDate.getFullYear();
		let nowMonth = nowDate.getMonth() + 1;
		let nowDay = nowDate.getDate();

		for(let i = 1; i <= 100; i++) {
			years.push({
				value: nowYear - 100 + i,
				text: nowYear - 100 + i
			});
		}
		for(let i = 1; i <= nowMonth; i++) {
			months.push({
				value: i,
				text: i
			});
		}
		for(let i = 1; i <= nowDay; i++) {
			days.push({
				value: i,
				text: i
			});
		}
		let birthdayPicker = new Picker({
			data: [years, months, days],
			selectedIndex: [years.length - 1, months.length - 1, days.length - 1],
			title: '请选择生日'
		});

		birthdayPicker.on('picker.change', (index, selectedIndex) => {
			let selectYear = nowYear - 99 + birthdayPicker.selectedIndex[0];
			let selectMonth = birthdayPicker.selectedIndex[1] + 1;
			let selectDay = birthdayPicker.selectedIndex[2] + 1;

			if(index == 0) { //年份改变
				months = [];
				days = [];
				for(let i = 1; i <= 12; i++) {
					months.push({
						value: i,
						text: i
					});
				}
				for(let i = 1; i <= 31; i++) {
					days.push({
						value: i,
						text: i
					});
				}
				birthdayPicker.refillColumn(1, months);
				birthdayPicker.refillColumn(2, days);
				birthdayPicker.scrollColumn(1, 0)
				birthdayPicker.scrollColumn(2, 0)
			} else if(index == 1) { //月份改变
				days = [];
				let monthWith31DayArr = [1, 3, 5, 7, 8, 10, 12];
				//当前选中2月
				if(selectMonth == 2) {
					//判断是否为闰年
					if((selectYear % 4 == 0 && selectYear % 100 != 0) || selectYear % 400 == 0) {
						for(let i = 1; i <= 29; i++) {
							days.push({
								value: i,
								text: i
							});
						}
					} else {
						for(let i = 1; i <= 28; i++) {
							days.push({
								value: i,
								text: i
							});
						}
					}
				} else {
					if(monthWith31DayArr.indexOf(selectMonth) != -1) {
						for(let i = 1; i <= 31; i++) {
							days.push({
								value: i,
								text: i
							});
						}
					} else {
						for(let i = 1; i <= 30; i++) {
							days.push({
								value: i,
								text: i
							});
						}
					}
				}
				birthdayPicker.refillColumn(2, days);
				birthdayPicker.scrollColumn(2, 0)
			}
		});
		birthdayPicker.on('picker.valuechange', (selectedVal, selectedIndex) => {
			birthdayObj.year = years[selectedIndex[0]].text;
			birthdayObj.month = months[selectedIndex[1]].text;
			birthdayObj.day = days[selectedIndex[2]].text;
		});

		return birthdayPicker;
	},

	//获取地址picker
	getAddressPicker(addressObj) {
		let first = []; /* 省，直辖市 */
		let second = []; /* 市 */

		let selectedIndex = [0, 0]; /* 默认选中的地区 */

		let checked = [0, 0]; /* 已选选项 */

		function creatList(obj, list) {
			obj.forEach(function(item, index, arr) {
				let temp = new Object();
				temp.text = item.name;
				temp.value = index;
				list.push(temp);
			})
		}

		creatList(city, first);

		if(city[selectedIndex[0]].hasOwnProperty('sub')) {
			creatList(city[selectedIndex[0]].sub, second);
		} else {
			second = [{
				text: '',
				value: 0
			}];
		}

		let addressPicker = new Picker({
			data: [first, second],
			selectedIndex: selectedIndex,
			title: '地址选择'
		});

		addressPicker.on('picker.select', (selectedVal, selectedIndex) => {
			addressObj.province = first[selectedIndex[0]].text;
			addressObj.city = second[selectedIndex[1]].text;
		});

		addressPicker.on('picker.change', (index, selectedIndex) => {
			if(index === 0) {
				firstChange();
			}

			function firstChange() {
				second = [];
				checked[0] = selectedIndex;
				let firstCity = city[selectedIndex];
				if(firstCity.hasOwnProperty('sub')) {
					creatList(firstCity.sub, second);

					let secondCity = city[selectedIndex].sub[0]
				} else {
					second = [{
						text: '',
						value: 0
					}];
					checked[1] = 0;
					checked[2] = 0;
				}

				addressPicker.refillColumn(1, second);
				addressPicker.scrollColumn(1, 0)
			}
		});

		return addressPicker;
	},
	
	getAddressPickerFull(addressObj) {
		let first = []; /* 省，直辖市 */
		let second = []; /* 市 */
		let third = []; /* 镇 */

		let selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

		let checked = [0, 0, 0]; /* 已选选项 */

		function creatList(obj, list) {
			obj.forEach(function(item, index, arr) {
				let temp = new Object();
				temp.text = item.name;
				temp.value = index;
				list.push(temp);
			})
		}

		creatList(city, first);

		if(city[selectedIndex[0]].hasOwnProperty('sub')) {
			creatList(city[selectedIndex[0]].sub, second);
		} else {
			second = [{
				text: '',
				value: 0
			}];
		}

		if(city[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
			creatList(city[selectedIndex[0]].sub[selectedIndex[1]].sub, third);
		} else {
			third = [{
				text: '',
				value: 0
			}];
		}

		let addressPicker = new Picker({
			data: [first, second, third],
			selectedIndex: selectedIndex,
			title: '地址选择'
		});

		addressPicker.on('picker.select', (selectedVal, selectedIndex) => {
			addressObj.province = first[selectedIndex[0]].text;
			addressObj.city = second[selectedIndex[1]].text;
			addressObj.area = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
		});

		addressPicker.on('picker.change', (index, selectedIndex) => {
			if(index === 0) {
				firstChange();
			} else if(index === 1) {
				secondChange();
			}

			function firstChange() {
				second = [];
				third = [];
				checked[0] = selectedIndex;
				let firstCity = city[selectedIndex];
				if(firstCity.hasOwnProperty('sub')) {
					creatList(firstCity.sub, second);

					let secondCity = city[selectedIndex].sub[0]
					if(secondCity.hasOwnProperty('sub')) {
						creatList(secondCity.sub, third);
					} else {
						third = [{
							text: '',
							value: 0
						}];
						checked[2] = 0;
					}
				} else {
					second = [{
						text: '',
						value: 0
					}];
					third = [{
						text: '',
						value: 0
					}];
					checked[1] = 0;
					checked[2] = 0;
				}

				addressPicker.refillColumn(1, second);
				addressPicker.refillColumn(2, third);
				addressPicker.scrollColumn(1, 0)
				addressPicker.scrollColumn(2, 0)
			}

			function secondChange() {
				third = [];
				checked[1] = selectedIndex;
				let first_index = checked[0];
				if(city[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
					let secondCity = city[first_index].sub[selectedIndex];
					creatList(secondCity.sub, third);
					addressPicker.refillColumn(2, third);
					addressPicker.scrollColumn(2, 0)
				} else {
					third = [{
						text: '',
						value: 0
					}];
					checked[2] = 0;
					addressPicker.refillColumn(2, third);
					addressPicker.scrollColumn(2, 0)
				}
			}

		});

		return addressPicker;
	},


	//获取大学picker
	getCollegePicker(collegeObj) {
		let provincesData = [];
		let collegeData = [];
		let nowCollegeDataIndex = 0;
		college.forEach(function(item, index) {
			for(let key in item) {
				//省数组
				provincesData.push({
					value: index,
					text: key
				});

				//各省大学数组
				let provincesCollege = [];
				item[key].forEach(function(item, index) {
					provincesCollege.push({
						value: index,
						text: item
					});
				})
				collegeData.push(provincesCollege);
			}
		})

		let collegePicker = new Picker({
			data: [provincesData, collegeData[0]],
			selectedIndex: [0, 0],
			title: '请选择大学'
		});
		collegePicker.on('picker.change', (index, selectedIndex) => {
			if(index == 0) {
				nowCollegeDataIndex = selectedIndex;
				collegePicker.refillColumn(1, collegeData[selectedIndex]);
				collegePicker.scrollColumn(1, 0);
			}
		});
		collegePicker.on('picker.select', (selectedVal, selectedIndex) => {
			collegeObj.belongProvince = provincesData[selectedIndex[0]].text;
			collegeObj.collegeName = collegeData[nowCollegeDataIndex][selectedIndex[1]].text;
		});
		return collegePicker;
		
	}

}

export default ui