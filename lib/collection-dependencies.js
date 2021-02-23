const path = require('path')
const { getJSON } = require('./read-file');
const { changePkg } = require('./change-dependencies')

let pkg = getJSON(path.resolve('') + '/package.json')

async function xorDependencies(config, pkgList) {
  return await changePkg(config.dependencies, pkgList, config.env)
}

function selectDependencies(name) {
  const dependencies = []
  if (pkg[name]) {
    const pkgObj = pkg[name]
    for (const key in pkgObj) {
      if (pkgObj.hasOwnProperty(key)) {
        dependencies.push({
          dependencies: key,
          version: pkgObj[key].replace(/\^|\~/g, '')
        })
      }
    }
  }
  return dependencies
}

async function collectionDependencies(config) {
  if (config.packagePath) {
    pkg = getJSON(path.resolve(config.packagePath))
  }
  const dependencies = [...selectDependencies('devDependencies'), ...selectDependencies('dependencies')]
  return await xorDependencies(config, dependencies)
}

function checkCollectionDependencies(config) {
  if (config.packagePath) {
    pkg = getJSON(path.resolve(config.packagePath))
  }
  const dependencies = [...selectDependencies('devDependencies'), ...selectDependencies('dependencies')]
  return checkPkgVersion(config, dependencies)
}

function checkPkgVersion(config, pkgList) {
  let dependencies = config.dependencies
  const packagejson = []
  if (dependencies && dependencies.length) {
    for (let index = 0; index < dependencies.length; index++) {
      const item = dependencies[index];
      pkgList.forEach(pkg => {
        if (item === pkg.dependencies) {
          packagejson.push(pkg)
        }
      })
    } 
  }
  return packagejson
}

module.exports = {
  collectionDependencies,
  checkCollectionDependencies
}