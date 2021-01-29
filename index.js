const { collectionDependencies } = require('./lib/collection-dependencies');
const { compare } = require('./lib/compare-dependencies');
const { install } = require('./lib/install-package');
const { resolveConfig } = require('./config/index');
const chalk = require('chalk');
const Alphabet = require('alphabetjs')

function start(config) {
  const str = Alphabet('JD FE tibao','planar')
  console.log(chalk.green(str))
  const dependencies = collectionDependencies(resolveConfig(config));
  const isntallDependencies = compare(dependencies);

  if (isntallDependencies.length) {
    install(isntallDependencies);
  } else {
    console.log(chalk.green('很好，没得问题'))
  }
}
start()

module.exports = {
  start,
};
