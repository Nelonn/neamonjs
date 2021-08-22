class KeyArray extends Array {
  #keys = {};
  constructor(keys = []) {
    super();

    if (keys && Array.isArray(keys)) for (const key of keys) this.#keys[key] = true;
  };

  /**
   * Add key(s)
   * @param {string|string[]} key 
   */
  add(key) {
    if (typeof key === 'string') {
      if (!this.#keys[key]) super.push(key);
      this.#keys[key] = true;
      return this;
    } else if (Array.isArray(key)) {
      for (const Key of key) {
        if (!this.#keys[Key]) super.push(Key);
        this.#keys[Key] = true;
      };
      return this;
    } else {
      const err = new TypeError(`'key' must an string or array`);
      throw err;
    };
  };

  /**
   * Get key(s)
   * @param {string|string[]} key 
   */
  get(key) {
    if (typeof key === 'string') {
      return Boolean(this.#keys[key]);
    } else if (Array.isArray(key)) {
      const list = {};
      for (const Key of key) {
        list[Key] = Boolean(this.#keys[Key]);
      };
      return list;
    } else {
      const err = new TypeError(`'key' must an string or array`);
      throw err;
    };
  };

  /**
   * delete key(s)
   * @param {string|string[]} key 
   */
  delete(key) {
    if (typeof key === 'string') {
      if (this.#keys[key]) {
        delete this.#keys[key];
        const index = super.indexOf(key);
        if (index > -1) super.splice(index, 1);
      };
      return this;
    } else if (Array.isArray(key)) {
      for (const Key of key) {
        if (this.#keys[Key]) {
          delete this.#keys[Key];
          const index = super.indexOf(Key);
          if (index > -1) super.splice(index, 1);
        };
      };
      return this;
    } else {
      const err = new TypeError(`'key' must an string or array`);
      throw err;
    };
  };

  /**
   * 
   * @param {function(string)} callbackfn 
   */
  forEach(callbackfn) {
    return this.toArray().forEach(callbackfn);
  };

  toArray() {
    return Object.keys(this.#keys);
  };

  /**
   * @param {*} arg 
   */
  static isKeyArray(arg) {
    return arg instanceof this;
  };
};

module.exports = KeyArray;