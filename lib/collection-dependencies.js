const path = require('path')
let pkg = require(path.resolve('') + '/package.json')
const { changePkg } = require('./change-dependencies')


function judgeMode(config = { slectAll: true}) {
  if (config && !config.slectAll) {
    return true 
  } else {
    return false
  }
}

async function xorDependencies(config, pkgList) {
  if (judgeMode(config)) {
    return await changePkg(config.dependencies, pkgList, config.env)
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

async function collectionDependencies(config) {
  if (judgeMode(config) && config.packagePath) {
    pkg = require(path.resolve(config.packagePath))
  }
  const dependencies = [...selectDependencies('devDependencies'), ...selectDependencies('dependencies')]
  return await xorDependencies(config, dependencies)
}

// console.log(nodeModules)
module.exports = {
  collectionDependencies
}