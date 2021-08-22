const extendedConsole = {};

extendedConsole.prefix = null;
extendedConsole.debugMode = false;

const main = (type, message, ...optionalParams) => {
  if (extendedConsole.prefix && typeof extendedConsole.prefix !== 'undefined') {
    if (typeof extendedConsole.prefix === 'function') {
      console[type](extendedConsole.prefix(type), message, ...optionalParams);
    } else console[type](extendedConsole.prefix, message, ...optionalParams);
  } else console[type](message, ...optionalParams);
};

extendedConsole.log = (message, ...optionalParams) => {
  main('log', message, ...optionalParams);
};
extendedConsole.info = (message, ...optionalParams) => {
  main('info', message, ...optionalParams);
};
extendedConsole.warn = (message, ...optionalParams) => {
  main('warn', message, ...optionalParams);
};
extendedConsole.error = (message, ...optionalParams) => {
  main('error', message, ...optionalParams);
};
extendedConsole.debug = (message, ...optionalParams) => {
  if (extendedConsole.debugMode) main('debug', message, ...optionalParams);
};

extendedConsole.table = (...data) => {
  return console.table(...data);
};

extendedConsole.Console = console.Console;

module.exports = extendedConsole;