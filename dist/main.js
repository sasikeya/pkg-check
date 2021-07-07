'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var fs = require('fs');
var axios = require('axios');
var packageJson = require('package-json');
var ora = require('ora');
var process$1 = require('process');
var chalk = require('chalk');
var Alphabet = require('alphabetjs');
var commander = require('commander');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var packageJson__default = /*#__PURE__*/_interopDefaultLegacy(packageJson);
var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);
var process__default = /*#__PURE__*/_interopDefaultLegacy(process$1);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var Alphabet__default = /*#__PURE__*/_interopDefaultLegacy(Alphabet);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function getJSON(path) {
    var file = {};
    try {
        file = JSON.parse(fs__default['default'].readFileSync(path, 'utf-8'));
    }
    catch (error) {
    }
    return file;
}

var loadingText = '正在查询版本中';
// 依赖jnpm 页面 如果页面调整 此方法失效
function getJnpmVerison(name) {
    return __awaiter(this, void 0, void 0, function () {
        var spinner, version, res, str, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner = ora__default['default'](loadingText).start();
                    version = '0';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios__default['default'].get("http://npm.jd.com/package/" + name)];
                case 2:
                    res = _a.sent();
                    spinner.stop();
                    str = res.data.match(/<div class="pack-ver">([\s\S]*?)<\/div>/)[1];
                    version = str.match(/<img title="([\s\S]*?)"/)[1] || 0;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    throw new Error(error_1);
                case 4: return [2 /*return*/, version];
            }
        });
    });
}
function getNpmVersion(name) {
    return __awaiter(this, void 0, void 0, function () {
        var spinner, version, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner = ora__default['default'](loadingText).start();
                    version = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, packageJson__default['default'](name)];
                case 2:
                    data = _a.sent();
                    version = data.version;
                    spinner.stop();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    throw new Error(error_2);
                case 4: return [2 /*return*/, version];
            }
        });
    });
}

function changePkg(dependencies, pkgList, env) {
    return __awaiter(this, void 0, void 0, function () {
        var installPackage, _loop_1, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    installPackage = [];
                    if (!(dependencies && dependencies.length)) return [3 /*break*/, 5];
                    _loop_1 = function (index) {
                        var item, _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    item = dependencies[index];
                                    if (!(typeof item === 'string')) return [3 /*break*/, 1];
                                    pkgList.forEach(function (pkg) {
                                        if (item === pkg.dependencies) {
                                            installPackage.push(pkg);
                                        }
                                    });
                                    return [3 /*break*/, 4];
                                case 1:
                                    if (!(env || item.autoUpdate)) return [3 /*break*/, 3];
                                    _b = (_a = installPackage).push;
                                    return [4 /*yield*/, getObjectDependencies(item, env)];
                                case 2:
                                    _b.apply(_a, [_c.sent()]);
                                    return [3 /*break*/, 4];
                                case 3:
                                    installPackage.push.apply(installPackage, pkgList.filter(function (i) { return i.dependencies === item.name; }));
                                    _c.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < dependencies.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(index)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 6];
                case 5:
                    installPackage.push.apply(installPackage, pkgList);
                    _a.label = 6;
                case 6: return [2 /*return*/, installPackage];
            }
        });
    });
}
function getObjectDependencies(item, env) {
    return __awaiter(this, void 0, void 0, function () {
        var version, version;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(Object.prototype.toString.call(item) === '[object Object]')) return [3 /*break*/, 6];
                    if (!(item.autoUpdate && !env)) return [3 /*break*/, 5];
                    if (!(item.origin === 'jd')) return [3 /*break*/, 2];
                    return [4 /*yield*/, getJnpmVerison(item.name)];
                case 1:
                    version = _a.sent();
                    return [2 /*return*/, {
                            dependencies: item.name,
                            version: version
                        }];
                case 2: return [4 /*yield*/, getNpmVersion(item.name)];
                case 3:
                    version = _a.sent();
                    return [2 /*return*/, {
                            dependencies: item.name,
                            version: version
                        }];
                case 4: return [3 /*break*/, 6];
                case 5: return [2 /*return*/, {
                        dependencies: item.name,
                        version: item[env]
                    }];
                case 6: return [2 /*return*/];
            }
        });
    });
}

var pkg = getJSON(path__default['default'].resolve('') + '/package.json');
function xorDependencies(config, pkgList) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, changePkg(config.dependencies, pkgList, config.env)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// 从package.json 里找到所有依赖包
function selectDependencies() {
    var dependencies = [];
    var pkgObj = Object.assign(pkg['devDependencies'], pkg['dependencies']);
    for (var key in pkgObj) {
        if (pkgObj.hasOwnProperty(key)) {
            dependencies.push({
                dependencies: key,
                version: pkgObj[key].replace(/\^|\~/g, '')
            });
        }
    }
    return dependencies;
}
function collectionDependencies(config) {
    return __awaiter(this, void 0, void 0, function () {
        var dependencies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (config.packagePath) {
                        pkg = getJSON(path__default['default'].resolve(config.packagePath));
                    }
                    dependencies = selectDependencies();
                    return [4 /*yield*/, xorDependencies(config, dependencies)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function checkCollectionDependencies(config) {
    if (config.packagePath) {
        pkg = getJSON(path__default['default'].resolve(config.packagePath));
    }
    var dependencies = selectDependencies();
    return checkPkgVersion(config, dependencies);
}
function checkPkgVersion(config, pkgList) {
    var dependencies = config.dependencies;
    var packagejson = [];
    if (dependencies && dependencies.length) {
        var _loop_1 = function (index) {
            var item = dependencies[index];
            pkgList.forEach(function (pkg) {
                if (item === pkg.dependencies) {
                    packagejson.push(pkg);
                }
            });
        };
        for (var index = 0; index < dependencies.length; index++) {
            _loop_1(index);
        }
    }
    else {
        packagejson.push.apply(packagejson, pkgList);
    }
    return packagejson;
}

var nodeModules = path__default['default'].resolve('') + '/node_modules';
function compare(dependencies) {
    var needInstall = [];
    dependencies.forEach(function (item) {
        try {
            var nodeModule = getJSON(nodeModules + "/" + item.dependencies + "/package.json");
            if (nodeModule.name === item.dependencies &&
                nodeModule.version !== item.version) {
                needInstall.push({
                    dependencies: item.dependencies,
                    version: item.version
                });
            }
        }
        catch (error) {
            console.log(chalk__default['default'].red("\u627E\u4E0D\u5230\u672C\u5730\u4F9D\u8D56\u5305 \u9700\u8981 npm i " + item.dependencies));
            process__default['default'].exit();
        }
    });
    return needInstall;
}

var exec = require('child_process').exec;
var log = console.log;
function install(packageList) {
    var cmdStr = 'npm install';
    packageList.forEach(function (item) {
        cmdStr += " " + item.dependencies + "@" + item.version + " ";
    });
    log(chalk__default['default'].cyan(cmdStr));
    var spinner = ora__default['default']('为了保证组件版本统一，开始安装package版本号的依赖').start();
    exec(cmdStr, function (err) {
        spinner.stop();
        if (err) {
            throw new Error(err);
        }
        else {
            log(chalk__default['default'].green('依赖更新完成'));
        }
    });
}

function resolveConfig(config, env) {
    if (env) {
        return Object.assign(config, { env: env });
    }
    if (!config) {
        return Object.assign({ dependencies: [] });
    }
    return config;
}

var log$1 = console.log;
function start(config) {
    return __awaiter(this, void 0, void 0, function () {
        var str, env, changeConfig, dependencies, isntallDependencies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    str = Alphabet__default['default']('JD FE tibao', 'planar');
                    log$1(chalk__default['default'].green(str));
                    env = commander.program.parse(process.argv).args[0];
                    changeConfig = resolveConfig(config, env);
                    return [4 /*yield*/, collectionDependencies(changeConfig)];
                case 1:
                    dependencies = _a.sent();
                    isntallDependencies = compare(dependencies);
                    if (isntallDependencies.length) {
                        install(isntallDependencies);
                    }
                    else {
                        log$1(chalk__default['default'].green('依赖暂不需要更新'));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function check(config) {
    return __awaiter(this, void 0, void 0, function () {
        var str, changeConfig, dependencies, isntallDependencies;
        return __generator(this, function (_a) {
            str = Alphabet__default['default']('JD FE tibao', 'planar');
            log$1(chalk__default['default'].green(str));
            changeConfig = resolveConfig(config);
            dependencies = checkCollectionDependencies(changeConfig);
            isntallDependencies = compare(dependencies);
            if (isntallDependencies.length) {
                log$1('当前依赖版本不一致 ' +
                    chalk__default['default'].red(isntallDependencies
                        .map(function (i) { return i.dependencies + "@" + i.version; })
                        .join(' ')));
            }
            return [2 /*return*/, isntallDependencies];
        });
    });
}
exports.install = start;

exports.check = check;
exports.start = start;
