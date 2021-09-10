const exec = require('child_process').exec;
import chalk from 'chalk'
import ora from 'ora'

const log = console.log;

function install (packageList) {
  return new Promise((s) => {
    let cmdStr = 'npm install';
      packageList.forEach(item => {
        cmdStr += ` ${item.dependencies}@${item.version} `
      })
      log(chalk.cyan(cmdStr))
      const spinner = ora('为了保证组件版本统一，开始安装package版本号的依赖').start();
      exec(cmdStr, (err) => {
        spinner.stop()
        if (err) {
          throw new Error(err);
        } else {
          log(chalk.green('依赖更新完成'));
          s(true)
        }
      });
  })
}

export {
  install
};
