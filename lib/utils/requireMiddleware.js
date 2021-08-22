const fsExists = require('./fsExists');

module.exports = (id) => {
  const script = require(id);

  //Extend fs
  if (id === 'fs') {
    script.exists = (path) => {
      return fsExists(script, path);
    };
  };

  return script;
};