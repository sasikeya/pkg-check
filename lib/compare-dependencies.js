const path = require('path');
const process = require('process');
const chalk = require('chalk');
const { getJSON } = require('./read-file');
const nodeModules = path.resolve('') + '/node_modules';

function compare(dependencies) {
  const needInstall = [];
  dependencies.forEach((item) => {
    try {
      const nodeModule = getJSON(
        `${nodeModules}/${item.dependencies}/package.json`
      );
      if (
        nodeModule.name === item.dependencies &&
        nodeModule.version !== item.version
      ) {
        needInstall.push({
          dependencies: item.dependencies,
          version: item.version,
        });
      }
    } catch (error) {
      console.log(
        chalk.red(`找不到本地依赖包 需要 npm i ${item.dependencies}`)
      );
      process.exit();
    }
  });
  return needInstall;
}

module.exports = {
  compare,
};
