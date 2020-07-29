const httpStatus = require('http-status');

const { Role } = require('../models');
const ApiError = require('../utils/ApiError');
const { isExists } = require('../utils/utility');

/**
 * Roles List
 * @returns {Promise<Role>}
 */
const getRoles = async () => {
  const roles = await Role.find({ isActive: true });
  return roles;
};

/**
 * Get Role
 * @param {String} roleId
 * @returns {Promis<Role>}
 */
const getRole = async (roleId) => {
  try {
    const role = await Role.findById({ _id: roleId });
    if (!role) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
    }
    return role;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bad Request');
  }
};

/**
 * Create a Role
 * @param {Object} roleBody
 * @returns {Promise<Role>}
 */
const createRole = async (role) => {
  if (await Role.isRoleTaken(role.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role already taken');
  }
  const result = await Role.create(role);
  return result;
};

/**
 * Add permnissions to existing Role
 * @param {String} roleId
 * @param {Array} permissions
 */
const addPermissions = async (roleId, permissions) => {
  const role = await getRole(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  if (isExists(role.permissions, permissions)) return role;
  const result = await Role.findByIdAndUpdate(
    roleId,
    { $addToSet: { permissions: { $each: permissions } } },
    { new: true, useFindAndModify: false }
  );
  return result;
};

/**
 * Remove Permissions from existing Role
 * @param {String} roleId
 * @param {*} permissions
 */
const pullPermissions = async (roleId, permissions) => {
  const role = await getRole(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  let result;
  permissions.forEach(async (element) => {
    result = await Role.update({ _id: roleId }, { $pull: { permissions: { key: element.key } } }, { multi: true });
  });
  return result;
};

/**
 * Delete Role
 * @param {String} roleId
 * @returns {Promise<Role}
 */
const removeRole = async (roleId) => {
  const role = await getRole(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  const result = await Role.remove({ _id: roleId });
  return result;
};

module.exports = {
  getRoles,
  createRole,
  addPermissions,
  pullPermissions,
  getRole,
  removeRole,
};
