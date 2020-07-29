"use strict";

const logger = require("./../logger/loggerService");
const UTILS = require("./../utils/common");
const __moduleName = UTILS.getLabel(module);

class AuthService {
    loginService() {
        logger.debug(__moduleName + " => loginService(): Hello from login service");
        return "Hello auth service.";
    }
}

module.exports = AuthService;
