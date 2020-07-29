"use strict";

/**
 * @description Resolve Logger
 * @modules []
 */
function replacer(key, value) {
    if (value instanceof Error) return value.toString();
    return value;
}
module.exports = (logText) => JSON.stringify(logText, replacer);
