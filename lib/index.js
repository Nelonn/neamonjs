const path = require('path');
const loader = require('./loader');
const class_NeamonModule = require('./classes/NeamonModule');
const class_Exports = require('./classes/Exports');
const class_Map = require('./classes/Map');
const class_KeyArray = require('./classes/KeyArray');

const neamon = (...paths) => {
  return loader.get(path.join(...paths));
};

neamon.get = loader.get;
neamon.cache = loader.cache;
neamon.resolve = loader.resolve;
neamon.reload = loader.reload;
neamon.unload = loader.unload;

neamon.NeamonModule = class_NeamonModule;
neamon.Exports = class_Exports;
neamon.Map = class_Map;
neamon.KeyArray = class_KeyArray;

module.exports = neamon;