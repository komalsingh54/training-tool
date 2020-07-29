"use strict";

const getLabel = (callingModule) => {
    var parts = callingModule.filename.split("/");
    return parts[parts.length - 2] + "/" + parts.pop();
};

module.exports = {
    getLabel,
};
