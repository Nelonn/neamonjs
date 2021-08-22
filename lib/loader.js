const fs = require('fs');
const path = require('path');
const methods = require('./methods');
const con = require('./utils/extendedConsole');
const fsExists = require('./utils/fsExists');
const regExps = require('./utils/regExps');
const NeamonModule = require('./classes/NeamonModule');

const loader = {
  cache: new Map()
};

const run = (id, self, sourceId) => {
  const [script, e] = self.load(id);
  if (e === 'NOT_FOUND') {
    const err = new Error(`Cannot find module '${sourceId}'`);
    throw err;
  };
  
  var exports = {};
  script(methods.init(id, loader, self, exports));

  if (exports) {
    self.exports._setfunc((name, value) => {
      self.exports[name] = value;
      exports[name] = value;
    });

    if (exports.set) {
      const err = new TypeError(`${id}\nexport.set = ...\n       ^^^\n\nTypeError: Identifier expected. 'set' is a reserved word that cannot be used here.`);
      throw err;
    };
    if (exports.bind) {
      const err = new TypeError(`${id}\nexport.bind = ...\n       ^^^^\n\nTypeError: Identifier expected. 'bind' is a reserved word that cannot be used here.`);
      throw err;
    };
    if (exports.__update__) {
      const err = new TypeError(`${id}\nexport.__update__ = ...\n       ^^^^^^^^^^\n\nTypeError: Identifier expected. '__update__' is a reserved word that cannot be used here.`);
      throw err;
    };
  };

  return exports || {};
};
loader._run = run;

loader.resolve = (id) => {
  if (!id.endsWith('.njs')) {
    const indexExists = fsExists(fs, path.join(id, 'index.njs'));
    if (indexExists) return path.join(id, 'index.njs');
    return `${id}.njs`;
  };
  return id;
};

loader.get = (id) => {
  var sourceId = id;

  if (regExps.nm_module.test(id))
    id = path.join(__dirname, 'modules', `${id}.njs`);
  else id = loader.resolve(id);
  
  const cached = loader.cache.get(id);
  if (cached) return cached.exports;

  const Module = new NeamonModule(id, loader);

  const exports = run(id, Module, sourceId);

  Module.exports.__update__(exports);
  loader.cache.set(id, Module);

  return Module.exports;
};

loader.reload = (id) => {
  id = loader.resolve(id);

  const Module = loader.cache.get(id);
  if (!Module) return con.error(new Error('Module not found'));

  const exports = Module.reload();

  return exports;
};

loader.unload = (id) => {
  id = loader.resolve(id);

  if (!loader.cache.get(id))
  return con.error(new Error('Module not found'));

  loader.cache.delete(id);
};

module.exports = loader;