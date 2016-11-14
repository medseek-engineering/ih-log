var winston = require('winston');
var config = require('ih-config');
require('winston-logio');


var level = config.get('log:level') || 'info';

if (config.get('log:filename')) {
  winston.add(winston.transports.DailyRotateFile, {
    filename: config.get('log:filename'),
    level: level,
    maxFiles: config.get('log:maxFiles') || 15
  });
}

if (config.get('log:logio')) {
  winston.add(winston.transports.Logio, {
    port: config.get('log:logio:port'),
    node_name: config.get('log:logio:node_name'),
    host: config.get('log:logio:host'),
    level: level
  });
}

winston.remove(winston.transports.Console);

if (config.get('log:console') !== false) {
  winston.add(winston.transports.Console, { level: level, colorize: true });
}

module.exports = winston;
