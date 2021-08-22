const fs = require('fs');
const path = require('path');
const compile = require('../compile');
const Exports = require('./Exports');

class NeamonModule {
  /**
   * @param {fs.PathLike} id 
   */
  constructor(id, neamon) {
    Object.defineProperty(this, 'neamon', { value: neamon });
    /**
     * File id
     */
    this.id = id;

    /**
     * File path
     */
    this.path = '';

    /**
     * Whether or not the module is done loading, or is in the process of loading.
     */
    this.loaded = false;

    /**
     * The module exports
     */
    this.exports = new Exports(this);
  };

  _compile(content) {
    return compile(content, this.id);
  };

  load(filename) {
    this.filename = filename;
    this.path = path.dirname(filename);

    let content;
    try {
      content = fs.readFileSync(filename, 'utf8');
    } catch (e) {
      return [null, 'NOT_FOUND'];
    };

    const compiled = this._compile(content);

    this.loaded = true;

    return [compiled, null];
  };

  reload() {
    const exports = this.neamon._run(this.id, this, this.id);
    this.exports.__update__(exports);
    return this.exports;
  };
};

module.exports = NeamonModule;