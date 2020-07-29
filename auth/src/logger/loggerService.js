"use strict";
/**
 * @description logger service
 */
var appRoot = require("app-root-path");
const winston = require("winston");
const { format } = winston;
const { combine, timestamp, label, printf } = format;
const CONFIG = require("./../config/config");
const logLevel = CONFIG.loglevel;

const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

var options = {
    file: {
        level: logLevel,
        filename: `${appRoot}/${CONFIG.logPath}/auth-service-${logLevel}.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: logLevel,
        format: combine(label({ label: CONFIG.serviceName }), timestamp(), customFormat),
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const fileWinston = new winston.transports.File(options.file);
const consoleWinston = new winston.transports.Console(options.console);
const logger = winston.createLogger({
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        fileWinston,
        consoleWinston,
    ],
});

module.exports = logger;
