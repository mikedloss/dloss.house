require('dotenv').config();
const chalk = require('chalk')

const cl = console.log;

const INFO = chalk.blue('info:')
const ERROR = chalk.red.bold('ERROR:');
const DEBUG = chalk.yellow('DEBUG:');

const AVAILABLE_LOGGING_LEVELS = ['info', 'error', 'debug', 'true']

const hasLevel = (level) => AVAILABLE_LOGGING_LEVELS.includes(level);

const log = (level = '', ...message) => {
  switch(level) {
    case 'info': cl(INFO, ...message); break;
    case 'error': cl(ERROR, ...message); break;
    default: process.env.LOGGING_LEVEL === "true" && cl(DEBUG, ...message);
  }
}

module.exports = {
  info: (...msg) => log('info', ...msg),
  error: (...msg) => log('error', ...msg),
  debug: (...msg) => log('debug', ...msg),
}