const exec = require('child_process').exec;
const chalk = require('chalk');
const ora = require('ora');

const log = console.log;


module.exports = {
  install: (packageList) => {
    let cmdStr = 'npm install';
    packageList.forEach(item => {
      cmdStr += ` ${item.dependencies}@${item.version} `
    })
    log(chalk.cyan(cmdStr))
    const spinner = ora('为了保证组件版本统一，开始安装package版本号的依赖').start();
    exec(cmdStr, (err) => {
      spinner.stop()
      if (err) {
        log(err);
      } else {
        log(chalk.green('依赖更新完成'));
      }
    });
  },
};
