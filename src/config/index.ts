import { config } from '../interface/config';


function resolveConfig(config: config, env?: string) {
  if (env) {
    return Object.assign(config, {env})
  }
  if (!config) {
    return Object.assign({ dependencies: []})
  }
  return config
}

export {
  resolveConfig
}