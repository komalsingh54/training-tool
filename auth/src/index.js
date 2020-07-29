"use strict";

const express = require("express");
const app = express();

const CONFIG = require("./config/config");
const essentials = require("./middlewares/essentialPackages");
const port = CONFIG.authPort;
const logger = require("./logger/loggerService");
const UTILS = require("./utils/common");

const authRouter = require("./routes/authRoutes");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

// Getting current module name
const __moduleName = UTILS.getLabel(module);

// essential middlewares initiated
essentials.init(app);

// App route initiated
authRouter.init(app);

// Global Error Handler
globalErrorHandler.handleError();

app.listen(port, (err) => {
    if(err) return console.error(err);
    logger.debug(`${__moduleName}: Auth service is listening on ${port}`);
    return;
});
