import path from 'path';
import { getJSON } from './read-file';
import { changePkg } from './change-dependencies';
import { pkg } from '../interface/pkg';
import { config } from '../interface/config';

let pkg: object = getJSON(path.resolve('') + '/package.json');

async function xorDependencies(config: config, pkgList: pkg[]): Promise<pkg[]> {
  return await changePkg(config.dependencies, pkgList, config.env);
}

// 从package.json 里找到所有依赖包
function selectDependencies(): pkg[] {
  const dependencies = [];
  const pkgObj = Object.assign(pkg['devDependencies'], pkg['dependencies']);
  for (const key in pkgObj) {
    if (pkgObj.hasOwnProperty(key)) {
      dependencies.push({
        dependencies: key,
        version: pkgObj[key].replace(/\^|\~/g, ''),
      });
    }
  }
  return dependencies;
}

async function collectionDependencies(config: config): Promise<pkg[]> {
  if (config.packagePath) {
    pkg = getJSON(path.resolve(config.packagePath));
  }
  const dependencies = selectDependencies();
  return await xorDependencies(config, dependencies);
}

function checkCollectionDependencies(config: config): pkg[] {
  if (config.packagePath) {
    pkg = getJSON(path.resolve(config.packagePath));
  }
  const dependencies = selectDependencies();
  return checkPkgVersion(config, dependencies);
}

function checkPkgVersion(config: config, pkgList: pkg[]): pkg[] {
  let dependencies = config.dependencies;
  const packagejson = [];
  if (dependencies && dependencies.length) {
    for (let index = 0; index < dependencies.length; index++) {
      const item = dependencies[index];
      pkgList.forEach((pkg) => {
        if (item === pkg.dependencies) {
          packagejson.push(pkg);
        }
      });
    }
  }
  return packagejson;
}

export { collectionDependencies, checkCollectionDependencies };
