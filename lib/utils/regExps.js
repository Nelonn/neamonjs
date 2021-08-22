// Custom comments or string syntax: /<<((?:(?>[^>]+)|>(?!>))*)>>/ (Not JS Formatted)

module.exports.a_comment = new RegExp(`(\\/\\*(?:([^\\/\\*]+)|\\*(?!\\/))*\\*\\/|\\/\\/.*)`, 'gm'); // - (\/\*(?:([^\/\*]+)|\*(?!\/))*\*\/|\/\/.*)
module.exports.ml_comment = new RegExp(`\\/\\*(?:([^\\/\\*]+)|\\*(?!\\/))*\\*\\/`, 'gm');            // - \/\*(?:([^\/\*]+)|\*(?!\/))*\*\/
module.exports.sl_comment = new RegExp(`\\/\\/.*`, 'gm'); // - \/\/.*

module.exports.nm_module = new RegExp('^[a-zA-Z0-9_-]*$');

/*module.exports.method = (method) => {
  return new RegExp(`(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(${method})?)\\b(?!\\$)`, 'gm');
};*/

/*module.exports.method = (method) => {
  return new RegExp(`(?<=\\)|\\(|;|\\s|\\\`|'|"|^|\\()${method}\\b(?!\\$)`, 'gm');
};*/

module.exports.method = (method) => {
  return new RegExp(`(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))${method}\\b(?!\\$)`, 'gm');
};

module.exports.string = new RegExp(`(\\\`(?:[^\\\`]+)*\\\`|'(?:[^']+)*'|"(?:[^"]+)*")`, 'gm'); // - (\`(?:[^\`]+)*\`|'(?:[^']+)*'|"(?:[^"]+)*")