export default {
  get: function(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },
  set: function(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
