const log = require('single-line-log').stdout
const chalk = require('chalk')

class ProgressBar {
  constructor(opt) {
    this.width = (opt && opt.width) || 25
    this.timer = null
    this.percentage = 0
  }

  render(percentage, message) {
    this.percentage = Math.max(this.percentage, percentage)

    const cellNum = Math.floor(this.percentage * this.width) || 0
    // 拼接黑色条
    let fill = ''
    for (let i = 0; i < cellNum; i++) {
      fill += '█'
    }

    // 拼接灰色条
    let empty = ''
    for (let j = 0; j < this.width - cellNum; j++) {
      empty += '░'
    }

    let msg = ''
    if (this.percentage == 1) {
      msg = 'done'
    } else {
      msg = message
    }

    const cmdText = chalk.cyanBright(msg) + ': ' + fill + empty + (100 * this.percentage).toFixed(2) + '% \n'
    log(cmdText)
  }
}

module.exports = ProgressBar
