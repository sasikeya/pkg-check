
function resolveConfig(config) {
  if (!config) { 
    config = {
      mode: 'strict',
      dependencies: [],
      packagePath: ''
    }
  }
  return config
}

module.exports = {
  resolveConfig
}