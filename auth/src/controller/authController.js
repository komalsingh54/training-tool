"use strict";
const logger = require("./../logger/loggerService");
const AuthService = require("./../services/authService");
const UTILS = require("./../utils/common");
const __moduleName = UTILS.getLabel(module);

const authService = new AuthService();

class AuthController {
    initLogin(req, res) {
        logger.debug(__moduleName + " => initLogin(): Hello from login controller");
        const data = authService.loginService();
        res.send(data);
    }
}

module.exports = AuthController;
