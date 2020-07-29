"use strict";
/* global process */
require("dotenv").config();

// to get the values from .env
if(typeof process.env.NODE_ENV === "undefined" || process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const config = {
    serviceName: "AUTH_SERVICE",
    authPort: process.env.PORT || "3001",
    env: process.env.NODE_ENV || "local",
    loglevel: "info",
    logPath: process.env.LOG_PATH || "logs",
};

let envConfig;
// require could error out if
// the file don't exist so lets try this statement
// and fallback to an empty object if it does error out
try {
    envConfig = require(`./${config.env}-config.js`);
    envConfig = envConfig || {};
}
catch (e) {
    envConfig = {};
}

// merge the two config files together
// the envConfig file will overwrite properties
// on the config object
const finalConfig = { ...config, ...envConfig };
module.exports = finalConfig;
