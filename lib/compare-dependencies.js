const path = require('path')
const nodeModules = path.resolve('') + '/node_modules'

function compare(dependencies) {
  const needInstall = []
  dependencies.forEach(item => {
    const nodeModule = require(`${nodeModules}/${item.dependencies}/package.json`)
    if (nodeModule.name === item.dependencies && nodeModule.version !== item.version) {
      needInstall.push({
        dependencies: item.dependencies,
        version: item.version
      })
    }
  })
  return needInstall
}




module.exports = {
  compare
}