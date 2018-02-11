const cache = {
	set(key, value) {
		if (typeof value == 'string') {
			localStorage.setItem(key, value);
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	},
	get(key, isRemoveWhenGetFinish) {
		let value = localStorage.getItem(key);
		if(isRemoveWhenGetFinish){
			localStorage.removeItem(key);
		}
		if (value && (value.substr(0, 1) == '{' || value.substr(0, 1) == '[')) {
			try {
				value = eval('(' + value + ')');
			} catch (e) {
				console.log('eval error, key:' + key + ', value:' + value);
			}
		}
		return value;
	},
	remove(key) {
		localStorage.removeItem(key);
	},
	clear() {
		localStorage.clear();
	}
}

export default cache