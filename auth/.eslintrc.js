var OFF = 0,
    WARN = 1,
    ERROR = 2;
module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jasmine: true,
    },
    extends: "eslint:recommended",
    rules: {
        strict: ["error", "global"],
        "max-len": [ERROR, 120],
        indent: ["error", 4],
        "brace-style": [ERROR, "stroustrup"],
        "max-params": [ERROR, 7],
        "max-nested-callbacks": [ERROR, 4],
        "func-call-spacing": [ERROR, "never"],
        "keyword-spacing": [
            ERROR,
            {
                overrides: {
                    if: { after: false },
                    for: { after: false },
                    while: { after: false },
                },
            },
        ],
        "space-before-function-paren": [
            ERROR,
            {
                anonymous: "never",
                named: "never",
                asyncArrow: "always",
            },
        ],
        "object-curly-spacing": [ERROR, "always", { objectsInObjects: true }],
        "prefer-arrow-callback": [ERROR],
        "linebreak-style": ["error", "unix"],
        // quotes: ["error", "single"],
        semi: ["error", "always"],
    },
    parserOptions: {
        ecmaVersion: 2020,
    },
};
