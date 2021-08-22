module.exports = (fs, path) => {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    if(err.code === 'ENOENT') return false;
    else return false;
  };
};