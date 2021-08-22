#!/usr/bin/env node

const path = require('path');
const pathIsAbsolute = require('path-is-absolute');
const loader = require('../lib/loader');
const commandLine = loader.get('command-line');

const commands = commandLine.parse();
if (!commands._[0]) return console.error('Provide script path');

const scriptPath = pathIsAbsolute(commands._[0]) ? commands._[0] : path.join(process.cwd(), commands._[0]);
loader.get(scriptPath);