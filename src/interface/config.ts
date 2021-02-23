export interface dependencies {
  name: string,   // 依赖名称
  origin?: string, // 依赖来源
  autoUpdate?: boolean  // true代表每次检查都会检查最新版本 如果有新版就安装最新版本
}

export interface config {
  dependencies: [string, dependencies];
  packagePath?: string;
  env?: string
}