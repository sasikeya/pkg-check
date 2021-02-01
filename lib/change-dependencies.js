const {getJnpmVerison, getNpmVersion} = require('./find-version')

async function changePkg(dependencies, pkgList, env) {
  const installPackage = []
  if (dependencies && dependencies.length) {
    for (let index = 0; index < dependencies.length; index++) {
      const item = dependencies[index];
      if (typeof item === 'stirng') {
        pkgList.forEach(pkg => {
          if (item === pkg.dependencies) {
            installPackage.push(pkg)
          }
        })
      } else {
        installPackage.push(await getObjectDependencies(item, env)) 
      } 
    }
    
  }
  console.log(installPackage)
}

async function getObjectDependencies(item, env) {
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

module.exports = {
  changePkg
}