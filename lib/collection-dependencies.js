const path = require('path')
let pkg = require(path.resolve('') + '/package.json')


function judgeMode(config = { slectAll: true}) {
  if (config && !config.slectAll) {
    return true 
  } else {
    return false
  }
}

function xorDependencies(config, pkgList) {
  if (judgeMode(config)) {
    const dependencies = config.dependencies
    const mustDependencies = []
    if (dependencies && dependencies.length) {
      dependencies.forEach(item => {
        pkgList.forEach(pkg => {
          if (item === pkg.dependencies) {
            mustDependencies.push(pkg)
          }
        })
      })
    }
    return mustDependencies
  }
  return pkgList
}

function selectDependencies(name) {
  const dependencies = []
  if (pkg[name]) {
    const pkgObj = pkg[name]
    for (const key in pkgObj) {
      if (pkgObj.hasOwnProperty(key)) {
        dependencies.push({
          dependencies: key,
          version: pkgObj[key].replace(/\^/g, '')
        })
      }
    }
  }
  return dependencies
}

function collectionDependencies(config) {
  if (judgeMode(config) && config.packagePath) {
    pkg = require(path.resolve(config.packagePath))
  }
  const dependencies = [...selectDependencies('devDependencies'), ...selectDependencies('dependencies')]
  return xorDependencies(config, dependencies)
}

// console.log(nodeModules)
module.exports = {
  collectionDependencies
}