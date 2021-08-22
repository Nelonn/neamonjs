module.exports = class extends Map {
  constructor(...data) {
    super(...data);
  };

  find(fn) {
    for (const [key, val] of this) {
      console.log(key);
      if (fn(val, key, this)) return val;
    };
    return undefined;
  };
};