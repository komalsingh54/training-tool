"use strict";

/**
 * @description Error Codes
 */
const statusEnum = {
    SUCCESS_OK: 200,
    SUCCESS_CREATED: 201,
    SUCCESS_ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
};

/**
 * @description Export modules
 * @modules [ErrorsEnum]
 */
module.exports = statusEnum;
