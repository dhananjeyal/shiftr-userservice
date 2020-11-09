const chalk = require('chalk');

function logs() {
  function _print(type) {
    return (...msg) =>
      console.log(...msg.map(x => (typeof x === 'object' ? x : chalk[type](x))));
  }
  const methods = {
    log: (...msg) => _print('green')(...msg),
    info: (...msg) => _print('blue')(...msg),
    error: (...msg) => _print('red')(...msg),
    pretty: (...msg) => _print('blue')(...msg.map(x => JSON.stringify(x, null, 2))),
  };

  return Object.freeze(methods)
}

// exporting the logs 
module.exports = logs();
