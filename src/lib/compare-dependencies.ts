import path from 'path';
import process from 'process'
import chalk from 'chalk'
import { getJSON }  from './read-file'
import { pkg } from '../interface/pkg';

const nodeModules = path.resolve('') + '/node_modules';

function compare(dependencies: pkg[]): pkg[] {
  const needInstall = [];
  dependencies.forEach((item) => {
    try {
      const nodeModule: any = getJSON(
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

export {
  compare,
};
