import angular from 'angular';

const bulk = require('bulk-require');
const providersModule = angular.module('app.providers', []);
const providers = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(providerMap) {
  Object.keys(providerMap).forEach((key) => {
    let item = providerMap[key];

    if (!item) {
      return;
    }

    if (item.fn && typeof item.fn === 'function') {
      providersModule.provider(item.name, item.fn);
    } else {
      declare(item);
    }
  });
}

declare(providers);

export default providersModule;
