"use strict";

/* global process */
const logger = require("../logger/loggerService");

/**
 * @description Global Error Handler
 * @modules [handleError]
 */
module.exports.handleError = () => {
    /**
     * @description Error handling for uncaught exception
     * @modules [err]
     */
    process.on("uncaughtException", (err) => {
        logger.error("=============> UNCAUGHT EXCEPTION OCCUR! <=============");
        logger.error("ERROR is - ", err);
        logger.error("ERROR stack is - ", err.stack);
        process.exit(0);
    });

    /**
     * @description Error handling for unhandled rejection
     * @modules [err]
     */
    process.on("unhandledRejection", (err) => {
        logger.error("=============> UNHANDLED REJECTION CAUGHT! <=============");
        logger.error("ERROR is - ", err);
        logger.error("ERROR stack is - ", err.stack);
        process.exit(0);
    });
};
