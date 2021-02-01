
function resolveConfig(config) {
  if (!config) { 
    config = {
      slectAll: true,
      dependencies: [],
      packagePath: ''
    }
  }
  return config
}

module.exports = {
  resolveConfig
}