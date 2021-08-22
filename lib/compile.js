const colors = require('colors/safe');
const nodeEval = require('node-eval');
const methods = require('./methods');
const regExps = require('./utils/regExps');
const con = require('./utils/extendedConsole');

const compile = (moduleContents, id) => {
  var result = moduleContents;

  const lines = result.replace(regExps.a_comment, '').split('\r\n');

  for (let index = 0; index < lines.length; index++) {
    var line = lines[index];
    var line_ns = line.replace(regExps.string, '');

    if (regExps.method('module').test(line_ns)) {
      const err = new SyntaxError(`Unexpected token 'module'`);
      con.error(`${id}\nmodule\n^^^^^^\n`);
      con.error(err);
      process.exit(1);
    };

    line = line.replace(regExps.method('self.exports'), `__script__.exports`);
    
    for (const method of methods.list) {
      line = line.replace(regExps.method(method), `__script__.${method}`);
    };

    lines[index] = line;
  };
  
  result = lines.join('\r\n');

  // wrap
  const wrapper = [
    'module.exports = (__script__) => { ',
    '\n};'
  ];

  result = wrapper[0] + result + wrapper[1];  

  con.debug(colors.yellow('|---------/ parsed njs \\---------|'));
  con.debug(colors.gray(result));
  con.debug(colors.yellow('|--------------------------------|'));
  
  return nodeEval(result, id);
};

module.exports = compile;