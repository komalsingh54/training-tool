const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    givenName: Joi.string().required(),
    surName: Joi.string(),
    oracleId: Joi.string(),
    jobTitle: Joi.string(),
    officeLocation: Joi.string(),
    phoneNumber: Joi.string(),
    roles: Joi.array(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

const addPermission = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    read: Joi.boolean(),
    write: Joi.boolean(),
    key: Joi.string().required(),
    delete: Joi.boolean(),
    description: Joi.string(),
    isActive: Joi.boolean(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const permissionId = {
  params: Joi.object().keys({
    permissionId: Joi.string().custom(objectId),
  }),
};

const role = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    isActive: Joi.boolean(),
    permissions: Joi.array().required(),
  }),
};

const permissoinToRole = {
  body: Joi.object().keys({
    roleId: Joi.string().required(),
    permissions: Joi.array(),
  }),
};

module.exports = {
  register,
  login,
  refreshTokens,
  forgotPassword,
  resetPassword,
  addPermission,
  permissoinToRole,
  permissionId,
  createRole,
  role,
};
