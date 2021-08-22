<p align="center"><a href="https://nodei.co/npm/neamonjs/"><img src="https://nodei.co/npm/neamonjs.png"></a></p>
<p align="center"><img src="https://img.shields.io/npm/v/neamonjs"> <img src="https://img.shields.io/github/repo-size/Nelonn/neamonjs"> <img src="https://img.shields.io/npm/l/neamonjs"></p>

# NeamonJS
- A lightweight and easy to use language based and written on javascript.
- Allows you to reload modules in real time.
- If you need help write to me at Telegram @nelonn
- If you encounter any of those fell free to open an issue in our <a href="https://github.com/Nelonn/neamonjs/issues">github repository</a>.

# Download & Update
You can download it from npm:
```cli
npm i neamonjs
```
You can update to a newer version to receive updates using npm.
```cli
npm update neamonjs
```

# Changelog
...

# Setting Up
The first option (allows you to package the application) <br />
`index.js`:
```js
const neamon = require('neamonjs');
neamon(__dirname, 'script.njs');
```

The second option (no .js files) <br />
`package.json`:
```json
...
"scripts": {
  "start": "neamon script.njs"
},
...
```

# Example
Example modules: <br /><br />
`hello_world.njs`:
```js
exports.sayHello = () => {
  console.log('Hello World!');
};
```
`script.njs`:
```js
const hello_world = get('./hello_world.njs');

hello_world.sayHello();
```

# Differences from JS
**get**

Warning, `get` ≠ `require`!<br />
Use `get(filename)` only for `.njs` files<br />
and use `require(filename)` for everyone else

**Exports**
```js
exports = 'simple_string';
```
This will return an error, you need to do this:
```js
exports.string = 'simple_string';
```
**Map**

Now Map has a `find` method:
```js
const testMap = new Map();
testMap.set('some_key', { string: 'some string', number: 10 });
console.log(testMap.find(e => e.number === 10));
```
- Output:
```js
{ string: 'some string', number: 10 }
```

# New Methods & Classes
**sleep**
```js
const asyncFunction = async () => {
  await sleep(1000); // sleep 1000ms
  console.log('hello');
};
asyncFunction();
```
- Output after 1000ms:
```
hello
```

**KeyArray**
```js
const key_array = new KeyArray();
key_array.add('sun');
key_array.add(['moon', 'earth']);

console.log(key_array.get('sun')); // true

key_array.delete('sun');
console.log(key_array.get('sun')); // false

console.log(key_array);
```
- Output:
```js
KeyArray(2) [ 'moon', 'earth' ]
```