const path = require('path');
const pathIsAbsolute = require('path-is-absolute');
const regExps = require('./utils/regExps');
const requireMiddleware = require('./utils/requireMiddleware');
const extendedConsole = require('./utils/extendedConsole');
const class_Map = require('./classes/Map');
const KeyArray = require('./classes/KeyArray');

module.exports.list = [
  'self',
  'exports',
  'get',
  'require',
  'console',

  'Map',
  'KeyArray',
  'sleep'
];

const init = (njsPath, loader, self, exports) => {
  const get = (id) => {
    const sendRawId = pathIsAbsolute(id) || regExps.nm_module.test(id);
    return loader.get( sendRawId ? id : path.join(path.dirname(njsPath), id));
  };
  get.resolve = (id) => {
    return loader.resolve(path.join(path.dirname(njsPath), id));
  };
  get.reload = (id) => {
    return loader.reload(path.join(path.dirname(njsPath), id));
  };
  get.unload = (id) => {
    return loader.unload(path.join(path.dirname(njsPath), id));
  };
  get.cache = loader.cache;

  /**
   * Sleep
   * @param {Number} ms 
   * @param {Function} [callback] 
   * @param {[]} [arguments] 
   */
  const sleep = (ms, callback, arguments) => {
    if (!callback) return new Promise(resolve => setTimeout(resolve, ms));
    setTimeout(callback, ms, arguments);
  };

  return {
    self,
    exports,
    get,
    require: requireMiddleware,
    console: extendedConsole,

    Map: class_Map,
    KeyArray,
    sleep
  };
};

module.exports.init = init;