const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Training Tool - User Management API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'git@pscode.lioncloud.net:xt-capability/training-tool.git',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/v1`,
    },
  ],
};

module.exports = swaggerDef;
