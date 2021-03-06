import axios from 'axios'
import packageJson from 'package-json'
import ora from 'ora'
const loadingText = '正在查询版本中'

// 依赖jnpm 页面 如果页面调整 此方法失效

async function getJnpmVerison(name: string): Promise<string> {
  const spinner = ora(loadingText).start();
  let version = '0'
  try {
    const res = await axios.get(`http://npm.jd.com/package/${name}`);
    spinner.stop()
    const str = res.data.match(/<div class="pack-ver">([\s\S]*?)<\/div>/)[1];
    version = str.match(/<img title="([\s\S]*?)"/)[1] || 0;
  } catch (error) {
    throw new Error(error);
  }
  return version
}

async function getNpmVersion(name: string): Promise<string> {
  const spinner = ora(loadingText).start();
  let version = ''
  try {
    const data: any = await packageJson(name)
    version = data.version
    spinner.stop()
  } catch (error) {
    throw new Error(error);
  }
  
  return version
}

export {
  getJnpmVerison,
  getNpmVersion
}
