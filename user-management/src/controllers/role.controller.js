const httpStatus = require('http-status');

const catchAsync = require('../utils/catchAsync');

const roleService = require('../services/role.service');

const getRoles = catchAsync(async (req, res) => {
  const roles = await roleService.getRoles();
  res.json(roles);
});

const getRole = catchAsync(async (req, res) => {
  const { roleId } = req.params;
  const role = await roleService.getRole(roleId);
  res.json(role);
});

const createRole = catchAsync(async (req, res) => {
  const { name, description, permissions } = req.body;
  const role = await roleService.createRole({ name, description, permissions });
  res.status(httpStatus.CREATED).json(role);
});

const addPermissions = catchAsync(async (req, res) => {
  const { permissions, roleId } = req.body;
  const role = await roleService.addPermissions(roleId, permissions);
  res.json(role);
});

const removePermission = catchAsync(async (req, res) => {
  const { permissions, roleId } = req.body;
  const role = await roleService.pullPermissions(roleId, permissions);
  res.json(role);
});

const removeRole = catchAsync(async (req, res) => {
  const { roleId } = req.params;
  await roleService.removeRole(roleId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getRoles,
  createRole,
  addPermissions,
  removePermission,
  getRole,
  removeRole,
};
