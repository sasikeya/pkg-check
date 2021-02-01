

function resolveConfig(config, env) {
  if (!config) { 
    config = {
      slectAll: true,
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