/*

  command-line Lib v0.0.1
  by Nelonn (nelonn@list.ru)
  
*/
self.name = 'naemon@command-line';

// Disable warn
exports.warn = true;

// Command types
exports.types = {
  SpaceValue: 'SPACE_VALUE',
  EqualSymbolValue: 'EQUAL_SYMBOL_VALUE'
};

/**
 * @param {string} name
 * @param {string} type
 * @param {boolean} [required]
 */
exports.Command = class Command {
  constructor(name = '', type, required) {
    this.name = name;
    this.type = Object.values(export.types).includes(type) ? type : null;
    this.required = Boolean(required);
  };
};

/**
 * Parse command line commands moduled < fix it
 * @param {Command[]} [commands] 
 * @returns {object}
 */
exports.parse = (commands = []) => {
  // Parse array of commands
  const commandsObject = {};
  const commandsRequired = new KeyArray();

  for (const cmd of commands) {
    if (commandsObject[cmd.name]) {
      const err = new Error('Command duplicate');
      throw err;
    };
    if (!cmd.name.startsWith('-') && export.warn) {
      console.warn(`command-line WARN: It is recommended to use '-' before the command name\nTo disable this message use 'commandLine.set('warn', false)'`);
    };
    commandsObject[cmd.name] = cmd;
    if (cmd.required) commandsRequired.add(cmd.name);
  };

  // Define args
  const args = process.argv.slice(2);
  var parsed = {
    _: []
  };

  // Helper value
  let nextWillBeValueOf = null;

  // Parsing
  for (let arg of args) {
    const [name, ...cmdArgs] = arg.split('=');

    if (nextWillBeValueOf) {
      if (commandsObject[name]) {
        console.error('Invalid args');
        process.exit(1);
      };
      
      parsed[nextWillBeValueOf] = arg;
      if (commandsRequired.get(nextWillBeValueOf)) commandsRequired.delete(nextWillBeValueOf);

      nextWillBeValueOf = null;
      continue;
    };

    if (commandsObject[name]) {
      const command = commandsObject[name];

      if (command.type) {
        if (command.type === export.types.EqualSymbolValue) {
          parsed[name] = cmdArgs.join('=');
          if (commandsRequired.get(name)) commandsRequired.delete(name);
        } else if (command.type === export.types.SpaceValue) {
          nextWillBeValueOf = name;
        }
      } else {
        parsed[name] = true;
        if (commandsRequired.get(name)) commandsRequired.delete(name);
      }
    } else {
      parsed._.push(arg);
    };
  };

  commandsRequired.forEach((rc) => {
    console.error(`'${rc}' in command line required`);
    process.exit(1);
  });

  // Return parsed commands
  return parsed;
};