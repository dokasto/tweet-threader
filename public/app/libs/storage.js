export default {
	get(key) {
		try {
			return JSON.parse(localStorage.getItem(key));
		} catch (e) {
			return null;
		}
	},
	set(key, data) {
		localStorage.setItem(key, JSON.stringify(data));
	}
};
