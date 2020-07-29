"use strict";

const express = require("express");
const router = express.Router();
const logger = require("./../logger/loggerService");
const resolveLogger = require("./../logger/resolveLogger");
const statusCodes = require("./../enums/statusCodes");
const AuthController = require("./../controller/authController");
const UTILS = require("./../utils/common");
const __moduleName = UTILS.getLabel(module);

const authController = new AuthController();

router.get("/login", authController.initLogin);

module.exports.init = (app) => {
    app.use("/auth", router);

    // handle 404 response
    app.use((req, res) => {
        logger.debug(
            __moduleName + ": Invalid Route",
            resolveLogger({
                url: req.url,
                statusCode: statusCodes.NOT_FOUND,
                error: "Route Not Found",
            })
        );
        res.status(statusCodes.NOT_FOUND);
        res.send({
            statusCode: statusCodes.NOT_FOUND,
            error: "Requested resource is either not acessible or unavailable on the server",
        });
    });
};
