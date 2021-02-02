
# pkg-check
检查本地包与package.json依赖包版本一致性

# 使用场景
适用于本地打包发版，可配置某些依赖包严格根据package版本打包，对于某个依赖包经常更新但本地未更新的场景

# 安装
```
npm install pkg-check -D
```
### 环境
* Node >= 10


# 使用配置
```
const pkgCheck = require('pkg-check')

const config = {
  slectAll?: true,  默认所有依赖, 可选
  dependencies?: [opt], string or Object 指定监控的包
  packagePath?: '' package.json 相对与根目录路径
}

xxx 通过命令行获取参数对应自定义环境的版本
opt = {
  name: 'xx',   依赖名称
  ['xxx']: '1.0.0',
  env: 'test' 环境
  origin: 'npm', 依赖来源
  autoUpdate: true  true代表每次检查都会检查最新版本 如果有新版就安装最新版本
}

pkgCheck.start(config)

```

# 后续支持

- [x] 支持环境控制 安装依赖版本号
- [x] 支持自动安装最新版本依赖

## License
MIT.









