const path = require('path');
const pathIsAbsolute = requier('path-is-absolute');
const loader = require('../lib/loader');
const commandLine = loader.get('command-line');

const commands = commandLine.parse();
if (!commands._[0]) return console.error('Provide script path');

const scriptPath = pathIsAbsolute(commands._[0]) ? commands._[0] : path.join(__dirname, '../../..', commands._[0]);
loader.get(scriptPath);