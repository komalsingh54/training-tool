const Joi = require('@hapi/joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    givenName: Joi.string().required(),
    surName: Joi.string(),
    oracleId: Joi.string(),
    jobTitle: Joi.string(),
    officeLocation: Joi.string(),
    phoneNumber: Joi.string(),
    roles: Joi.array().required(),
    password: Joi.string().custom(password),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    givenName: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      givenName: Joi.string(),
      surName: Joi.string(),
      oracleId: Joi.string(),
      jobTitle: Joi.string(),
      officeLocation: Joi.string(),
      phoneNumber: Joi.string(),
      roles: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const assignRole = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  assignRole,
};
