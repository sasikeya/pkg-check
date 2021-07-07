import {getJnpmVerison, getNpmVersion} from './find-version'
import { pkg } from '../interface/pkg'
import { dependencies } from '../interface/config'

async function changePkg(dependencies: [string, dependencies], pkgList: pkg[], env):Promise<pkg[]> {
  const installPackage = []
  if (dependencies && dependencies.length) {
    for (let index = 0; index < dependencies.length; index++) {
      const item = dependencies[index];
      // 如果是字符串类型
      if (typeof item === 'string') {
        pkgList.forEach(pkg => {
          if (item === pkg.dependencies) {
            installPackage.push(pkg)
          }
        })
      } else {
        if (env || item.autoUpdate) {
          installPackage.push(await getObjectDependencies(item, env)) 
        } else {
          installPackage.push(...pkgList.filter(i => i.dependencies === item.name))
        }
      } 
    } 
  } else {
    installPackage.push(...pkgList)
  }
  return installPackage
}

async function getObjectDependencies(item: dependencies, env): Promise<pkg> {
  if (Object.prototype.toString.call(item) === '[object Object]') {
    if (item.autoUpdate && !env) {
      if (item.origin === 'jd') {
        const version = await getJnpmVerison(item.name)
        return {
          dependencies: item.name,
          version
        }
      } else {
        const version = await getNpmVersion(item.name)
        return {
          dependencies: item.name,
          version
        }
      }
    } else {
      return {
        dependencies: item.name,
        version: item[env]
      }
    }
  }
}

export {
  changePkg
}