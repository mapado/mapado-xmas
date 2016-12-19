class Storage {
  constructor(prefix = '') {
    this.prefix = prefix;
  }

  getItem(key) {
    return sessionStorage.getItem(this._getKey(key)) && JSON.parse(sessionStorage.getItem(this._getKey(key)));
  }
  setItem(key, value) {
    return sessionStorage.setItem(this._getKey(key), JSON.stringify(value));
  }

  _getKey(key) {
    const prefix = this.prefix && `${this.prefix}-`;
    return `${prefix}${key}`;
  }
}

export default Storage;
