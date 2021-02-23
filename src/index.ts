import {
  collectionDependencies,
  checkCollectionDependencies,
} from './lib/collection-dependencies';
import { compare } from './lib/compare-dependencies';
import { install } from './lib/install-package';
import { resolveConfig } from './config/index';
import chalk from 'chalk';
import Alphabet from 'alphabetjs';
import { program } from 'commander';

import { config } from './interface/config';
import { pkg } from './interface/pkg';

const log = console.log;

async function start(config: config) {
  const str = Alphabet('JD FE tibao', 'planar');
  log(chalk.green(str));

  const env = program.parse(process.argv).args[0];
  const changeConfig = resolveConfig(config, env);
  const dependencies = await collectionDependencies(changeConfig);
  const isntallDependencies = compare(dependencies);

  if (isntallDependencies.length) {
    install(isntallDependencies);
  } else {
    log(chalk.green('依赖暂不需要更新'));
  }
}

async function check(config: config): Promise<pkg[]> {
  const str = Alphabet('JD FE tibao', 'planar');
  log(chalk.green(str));

  const changeConfig = resolveConfig(config);
  const dependencies = checkCollectionDependencies(changeConfig);
  const isntallDependencies = compare(dependencies);
  if (isntallDependencies.length) {
    log(
      '当前依赖版本不一致 ' +
        chalk.red(
          isntallDependencies
            .map((i) => `${i.dependencies}@${i.version}`)
            .join(' ')
        )
    );
  }
  return isntallDependencies;
}
exports.install = start;
export { start, check };
