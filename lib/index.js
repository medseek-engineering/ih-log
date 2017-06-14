var winston = require('winston');
var config = require('ih-config');
require('winston-logio');
require('winston-daily-rotate-file');

var level = config.get('log:level') || 'info';
var isConsoleActive = config.get('log:console') === true;
var isTestEnv = process.env.NODE_ENV === 'test';

if (config.get('log:filename')) {
  winston.add(winston.transports.DailyRotateFile, {
    filename: config.get('log:filename'),
    level: level,
    maxFiles: config.get('log:maxFiles') || 15
  });
}

if (config.get('log:logio')) {
  winston.add(winston.transports.Logio, {
    name: config.get('log:logio:name'),
    localhost: config.get('log:logio:localhost'),
    host: config.get('log:logio:host'),
    port: config.get('log:logio:port'),
    node_name: config.get('log:logio:node_name'),
    pid: config.get('log:logio:pid')
  });
}

winston.remove(winston.transports.Console);

if (isConsoleActive && !isTestEnv) {
  winston.add(winston.transports.Console, { level: level, colorize: true });
}

module.exports = winston;
