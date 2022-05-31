#!/usr/bin/env node

/*
上面这句并不是注释，
这段代码是告诉你的脚本工具(bash/zsh), 
下面的内容是要在node环境下运行的代码。
千万不能省略！！！
*/

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const cwd = process.cwd()

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  const files = fs.readdirSync(dir)
  for (const item of files) {
    try {
      const abs = path.resolve(dir, item)
      const stat = fs.lstatSync(abs)
      if (stat.isDirectory()) {
        emptyDir(abs)
        fs.rmdirSync(abs)
      } else {
        fs.unlinkSync(abs)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

async function getValidPackageName(projectName) {
  const packageNameRegExp =
    /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/
  if (packageNameRegExp.test(projectName)) {
    return projectName
  } else {
    const suggestedPackageName = projectName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/^[._]/, '')
      .replace(/[^a-z0-9-~]+/g, '-')

    /**
     * @type {{ inputPackageName: string }}
     */
    const { inputPackageName } = await inquirer.prompt({
      type: 'input',
      name: 'inputPackageName',
      message: `Package name:`,
      initial: suggestedPackageName,
      validate: (input) =>
        packageNameRegExp.test(input) ? true : 'Invalid package.json name'
    })
    return inputPackageName
  }
}

function copyTemplate(root, templateDir) {
  const files = fs.readdirSync(templateDir)
  for (const file of files.filter(
    (f) => f !== 'package.json' && f !== '_gitignore'
  )) {
    const targetPath = path.join(root, file)
    copy(path.join(templateDir, file), targetPath)
  }
}

async function init() {
  const { projectName } = await inquirer.prompt([
    {
      name: 'projectName',
      message: 'Please enter your projectName',
      type: 'input',
      default: 'ik-project'
    }
  ])

  const root = path.join(cwd, projectName)
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  } else {
    const { yes } = await inquirer.prompt([
      {
        name: 'yes',
        message:
          'The directory already exists. Do you want to clear the directory and continue?',
        type: 'confirm',
        default: true
      }
    ])
    if (yes) {
      emptyDir(root)
    } else {
      return
    }
  }

  const { buildTool } = await inquirer.prompt([
    {
      name: 'buildTool',
      message: 'select your buildTool',
      type: 'list',
      choices: ['webpack', 'vite'],
      default: 'webpack'
    }
  ])

  const { framework } = await inquirer.prompt([
    {
      name: 'framework',
      message: 'select your framework',
      type: 'list',
      choices: ['vue2', 'vue3'],
      default: 'vue3'
    }
  ])

  const { language } = await inquirer.prompt([
    {
      name: 'language',
      message: 'select your development language',
      type: 'list',
      choices: ['javascript', 'typescript'],
      default: 'javascript'
    }
  ])

  const templateDir = path.join(
    __dirname,
    `templates/${buildTool}-${framework}-${language === 'typescript' ? 'ts' : 'js'}`
  )

  copyTemplate(root, templateDir)

  // package.json
  const packageName = await getValidPackageName(projectName)
  const pkg = require(path.join(templateDir, `package.json`))
  pkg.name = packageName
  fs.writeFileSync(
    path.join(root, `package.json`),
    JSON.stringify(pkg, null, 2)
  )
  // .gitignore
  copy(path.join(templateDir, '_gitignore'), path.join(root, `.gitignore`))

  const pkgManager = /yarn/.test(process.env.npm_execpath) ? 'yarn' : 'npm'

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`)
  }
  console.log(`  ${pkgManager === 'yarn' ? `yarn` : `npm install`}`)
  console.log(`  ${pkgManager === 'yarn' ? `yarn dev` : `npm run dev`}`)
  console.log()
}

init().catch((e) => {
  console.error(e)
})
