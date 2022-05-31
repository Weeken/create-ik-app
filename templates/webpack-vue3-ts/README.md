# vue3-ts-admin

## 技术栈

`Vue-cli5` 、`Vue3` 、`Typescript` 、`Pinia` 、`Vue-Router` 、`Element-Plus` 、`jest`

## 项目启动

> <font color=red>建议使用 npm 或 pnpm 作为 package 管理</font>

- 安装依赖

```js
npm install
```

- 开发模式运行

```js
npm run serve
```

- 编译项目

```js
npm run build:prod
```

- 其他指令

```js
npm run report
//打包并在 dist 目录下产生 report.html 文件

npm run test
// 跑单元测试

npm run stylelint
// 样式修复

npm run stylelint-check
// 检查 stylelint 与 prettier 冲突项

npm run commit
// 执行 git cz，用户代码提交

git cz
// git 提交信息 Conventional commits 规范快捷方式
```

## node 和 npm 版本说明

由于框架使用比较新的技术，推荐使用 <font color=#ff502c>`node`</font> 和 <font color=#ff502c>`npm`</font> 较新的版本

- nvm 管理 node 版本（下载 nvm.setup.zip 进行一键式安装）

  下载地址： https://github.com/coreybutler/nvm-windows/releases

  不同 node 版本内置不同版本的 npm, 故使用 nvm 来切换 node 版本即可

- 使用 `nrm` 切换 `npm` 镜像源 (安装：npm install nrm -g)

### nvm 常规命令

```js
// 安装 node 版本
nvm install (version)
// 显示已安装 node 版本列表
nvm ls
// 切换到 node 版本
nvm use (version)
```

### nrm 常规命令

```js
// 显示镜像源列表
nrm ls
// 切换到某个镜像源
nrm use xxx (例如 nrm use taobao)
// 删除某个镜像源
nrm delete xxx
// 测试某个镜像源的速度
nrm test xxx (例如 nrm test taobao)
```

## 框架规范

### 1、代码规范

**使用 Eslint、Prettier 来统一开发者的代码风格，保证代码质量**

- eslint 配置项进行中...

- prettier 配置项进行中...

#### 1.1、VScode 配置 Eslint、Prettier 相关说明

框架设置有相关插件使用推荐，vscode 打开项目默认会弹窗提醒安装，如果没有弹窗，切换到 vscode 插件界面，

搜索 <font color=red>`@recommended`</font> 进行安装并重启 vscode

### 2、Git commit 规范

框架使用 git commit message 规范，即约定式提交（conventional commit），以确保提交格式的统一性以及提交的动作类型，通过 husky、commitlint 触发 pre-commit 来检测提交格式是否符合标准

查看文档--[约定式提交文档](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

#### 2.1、提交结构与格式

```tex
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

译：
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

#### 2.2、type (类型)种类

| 类型                            | 说明                                                            |
| ------------------------------- | --------------------------------------------------------------- |
| <font color=red>feat</font>     | 新的特性或功能                                                  |
| <font color=red>fix</font>      | 修复问题或 bug                                                  |
| <font color=red>docs </font>    | 文档变更                                                        |
| <font color=red>style</font>    | 样式的修改，并不影响其他代码                                    |
| <font color=red>refactor</font> | 重构：不是 bug 修复，而是对代码性能、可读性、封装等进行代码重构 |
| <font color=red>perf</font>     | 提升性能的修改                                                  |
| <font color=red>test</font>     | 添加丢失或纠正性的测试                                          |
| <font color=red>build</font>    | 构造工具的或者外部依赖的改动：如 webpack                        |
| <font color=red>ci</font>       | 与 CI（持续集成服务）有关的改动                                 |
| <font color=red>chore</font>    | 不修改 src 或者 test 的其余修改                                 |
| <font color=red>revert</font>   | 执行 git revert 回滚操作                                        |

- 举例

  1、假如修改了 router 的代码，提交格式为:

  <font color=red>fix(router): 修改 xxx</font>

  2、对 webpack 性能上的修改，提交格式为：

  <font color=red>pref(webpack):  提升 webpack 编译构建性能</font>

### 2.3、Git commit 对代码规范的检测

> husky 与 prettier、eslint、stylelint、jest 的配合

框架配置了多项自动修复功能，当 git commit 时会对框架代码进行 Prettier --write 和 Eslint --fix，即提交代码时会自动对框架代码进行格式化 以及 eslint 检测，如果符合规范会提交成功，否则提交失败，需要进行修复再提交; 于此同时，stylelint 对也会在提交时进行修复操作，单元测试则需要通过才能够提交

- 修复/验证流程为

  > prettier --> eslint --> stylelint --> jest

- 单元测试说明
  > 如果 tests 文件没有变更（修改、增加、删除），则提交时不会跑 npm run test，相关脚本可查看 .husky/pre-commit

```
// 判断单元测试文件变动，变动则执行 npm run test
{ # try
  files_to_test=$(git status -s | grep 'tests')
  if [ -n "$files_to_test" ] ; then
    npm run test
  fi
} || { # catch
echo 'error'
}
```

## Webpack 相关说明

### 文件路径引入

为了提高 webpack 构建性能以及简便文件引入，尽量使用文件路径别名，常用文件路径别名配置如下

| 文件路径别名 | 对应路径       | 说明         |
| ------------ | -------------- | ------------ |
| @            | src            | 公共入口     |
| @comp        | src/components | 组件         |
| @assets      | src/assets     | 静态资源     |
| @api         | src/api        | 接口         |
| @utils       | src/utils      | 工具文件目录 |
| @router      | src/router     | 路由         |
| @store       | src/store      | 状态管理     |

注：如需要添加其它文件路径别名请在 `vue.config.js` 进行配置，并且在 `tsconfig.json` 中的 paths 下进行添加即可

### webpack 构建性能

框架已经为 webpack 开发环境和生产环境做了相关调优，具体操作步骤如下

首先本地先运行一遍 <font color=red>`npm run serve`</font>, 第二次再运行，会直接使用缓存来达到快速启动

注：如果有修改 vue.config.js 的文件，webpack 会清除现有缓存，因为每次修改 vue.config.js 的相关配置，webpack 会重新做相关缓存操作，可查看 `node_modules/ .cache/ webpack` 文件目录

### webpack 资源版本号管理

为了静态资源实现增量更新，webpack 构建时 css 使用 contenthash, js 使用 chunkhash; 如果只修改某个文件，构建后只改变这个文件的 hash, 其它没有变更则 hash 不会变动
