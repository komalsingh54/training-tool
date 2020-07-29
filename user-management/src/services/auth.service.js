const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const { Permission } = require('../models/permission.model');
const ApiError = require('../utils/ApiError');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, 'refresh');
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, 'resetPassword');
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: 'resetPassword' });
    await userService.updateUserById(user.id, { password: newPassword });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 *  Get All Permissions
 * @returns {Promise<Permission>};
 */
const getPermissions = async () => {
  try {
    return Permission.find({ isActive: true });
  } catch (error) {
    throw new ApiError(500, 'Internal Error');
  }
};

/**
 * Add Permission
 * @param {Object} PermissionBody
 * @returns {Promise<Permission>};
 */

const addPermission = async (permission) => {
  if (await Permission.isPermissionTaken(permission.name, permission.key)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Permission already taken');
  }
  const response = await Permission.create(permission);
  return response;
};

/**
 * Remove Permission
 * @param {String} permissionId - Permission id
 * @returns {Promise<Permission>};
 */
const removePermission = async (permissionId) => {
  const response = await Permission.findByIdAndUpdate(permissionId, { isActive: false });
  return response;
};

/**
 *
 * @param {string} permissionId
 * @returns {Prmoise<Permission>}
 */
const getPermission = async (permissionId) => {
  const permission = await Permission.findById(permissionId);
  return permission;
};

module.exports = {
  loginUserWithEmailAndPassword,
  refreshAuth,
  resetPassword,
  getPermission,
  getPermissions,
  addPermission,
  removePermission,
};
