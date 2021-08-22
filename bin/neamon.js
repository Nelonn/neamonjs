const path = require('path');
const loader = require('../lib/loader');
const commandLine = loader.get('command-line');

const commands = commandLine.parse();
if (!commands._[0]) return console.error('Provide script path');

const scriptPath = path.join(__dirname, '../..', commands._[0]);
loader.get(scriptPath);