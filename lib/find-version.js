const axios = require('axios');
const packageJson = require('package-json');
const ora = require('ora');
const loadingText = '正在查询版本中'


// 依赖jnpm 页面 如果页面调整 此方法失效

async function getJnpmVerison(name) {
  const spinner = ora(loadingText).start();
  const res = await axios.get(`http://npm.jd.com/package/${name}`);
  spinner.stop()
  const str = res.data.match(/<div class="pack-ver">([\s\S]*?)<\/div>/)[1];
  const version = str.match(/<img title="([\s\S]*?)"/)[1] || 0;
  return version
}

async function getNpmVersion(name) {
  const spinner = ora(loadingText).start();
  const data = await packageJson(name)
  spinner.stop()
  return data.version
}

module.exports = {
  getJnpmVerison,
  getNpmVersion
}
