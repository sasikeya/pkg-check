import { config } from '../interface/config';


function resolveConfig(config: config, env?: string) {
  if (env) {
    return Object.assign(config, {env})
  }
  return config
}

export {
  resolveConfig
}