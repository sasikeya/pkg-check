

function resolveConfig(config, env) {
  if (!config) { 
    config = {
      dependencies: [],
      packagePath: ''
    }
  }
  if (env) {
    return Object.assign(config, {env})
  }
  return config
}

module.exports = {
  resolveConfig
}