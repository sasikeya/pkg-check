
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
  mode: 'stirct',  ===> 目前stirct是对package 所有依赖进行监控, 可选
  dependencies: ['xx'], 指定监控的包
  packagePath: '' package.json 相对路径
}

pkgCheck.start(config)

```
## License
MIT.









