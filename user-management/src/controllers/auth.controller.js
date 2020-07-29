const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const permissions = catchAsync(async (req, res) => {
  const permission = await authService.getPermissions();
  res.json(permission);
});

const createPermission = catchAsync(async (req, res) => {
  await authService.addPermission(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const deletePermission = catchAsync(async (req, res) => {
  const { permissionId } = req.params;
  await authService.removePermission(permissionId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getPermission = catchAsync(async (req, res) => {
  const { permissionId } = req.params;
  const permission = await authService.getPermission(permissionId);
  res.json(permission);
});

module.exports = {
  register,
  login,
  refreshTokens,
  forgotPassword,
  resetPassword,
  permissions,
  createPermission,
  deletePermission,
  getPermission,
};
