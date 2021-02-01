const { collectionDependencies } = require('./lib/collection-dependencies');
const { compare } = require('./lib/compare-dependencies');
const { install } = require('./lib/install-package');
const { resolveConfig } = require('./config/index');
const chalk = require('chalk');
const Alphabet = require('alphabetjs')
const log = console.log

function start(config) {
  const str = Alphabet('JD FE tibao','planar')
  log(chalk.green(str))
  const dependencies = collectionDependencies(resolveConfig(config));
  const isntallDependencies = compare(dependencies);

  if (isntallDependencies.length) {
    install(isntallDependencies);
  } else {
    log(chalk.green('依赖暂不需要更新'))
  }
}

module.exports = {
  start,
};
