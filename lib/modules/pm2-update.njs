/*

  pm2-update Lib v0.0.1
  by Nelonn (nelonn@list.ru)
  
*/
self.name = 'module@pm2-update';

exports.init = () => {
  process.on('message', (data) => {
    const message = data.data;
    if (message.type !== 'pm2@module_reload') return;

    if (message.data.file_id) {
      get.cache.get(get.resolve(message.data.file_id)).reload();
    } else if (message.data.file_name) {
      get.cache.find(c => c.name === message.data.file_name).reload();
    };
  });
};