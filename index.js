const { collectionDependencies } = require('./lib/collection-dependencies');
const { compare } = require('./lib/compare-dependencies');
const { install } = require('./lib/install-package');
const { resolveConfig } = require('./config/index');
const chalk = require('chalk');
const Alphabet = require('alphabetjs')
const { program } = require('commander');
const log = console.log

async function start(config) {
  const str = Alphabet('JD FE tibao','planar')
  log(chalk.green(str))

  const env = program.parse(process.argv).args[0]
  const changeConfig = resolveConfig(config, env)
  const dependencies = await collectionDependencies(changeConfig);
  const isntallDependencies = compare(dependencies);

  if (isntallDependencies.length) {
    install(isntallDependencies);
  } else {
    log(chalk.green('依赖暂不需要更新'))
  }
}

async function check (config) {
  const str = Alphabet('JD FE tibao','planar')
  log(chalk.green(str))

  const env = program.parse(process.argv).args[0]
  const changeConfig = resolveConfig(config, env)
  const dependencies = await collectionDependencies(changeConfig);
  const isntallDependencies = compare(dependencies);
  if (isntallDependencies.length) {
    log('当前依赖版本不一致 ' + chalk.red(isntallDependencies.map(i => `${i.dependencies}@${i.version}`).join(' ')))
  }
  return isntallDependencies
}

module.exports = {
  start,
  check
};
