const NeamonModule = require('./NeamonModule');

class Exports {
  #setFunc;

  constructor(Module) {
    /**
		 * Module that this command is for
		 * @name Exports#module
		 * @type {NeamonModule}
		 * @readonly
		 */
    Object.defineProperty(this, 'module', { 
      value: Module,
      enumerable: false
    });
  };

  /**
   * Update module exports
   * @param {Object} exports 
   */
  __update__ (exports) {
    if (typeof exports !== 'object') throw new TypeError(`'exports' must be an object`);
    
    let thisExports = Object.keys(this);
    let newExports = Object.keys(exports);
    
    for (const exportKey of newExports) {
      this[exportKey] = exports[exportKey];

      const index = thisExports.indexOf(exportKey);
      if (index > -1) {
        thisExports.splice(index, 1);
      };
    };
    
    for (const exportKey of thisExports) {
      delete this[exportKey];
    };

    return this;
  };

  /**
   * Change export value
   * @param {String} name 
   * @param {*} value 
   */
  set (name, value) {
    if (typeof name !== 'string') {
      const err = new TypeError(`'name' must be an string`);
      throw err;
    };
    this.#setFunc(name, value);
  };

  _setfunc (func) {
    this.#setFunc = func;
  };

  /**
   * Bind exported function
   * @param {String} name 
   */
  bind (name) {
    return (...data) => {
      return this[name](...data);
    };
  };
};

module.exports = Exports;