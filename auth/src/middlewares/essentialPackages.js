"use strict";

const helmet = require("helmet");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const expressSanitized = require("express-sanitize-escape");

/**
 * @description export common middleware
 */
module.exports.init = (app) => {
    // helmet for necessary headers
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(expressSanitized.middleware());
    app.use(compression());
    app.use(cors());
};
