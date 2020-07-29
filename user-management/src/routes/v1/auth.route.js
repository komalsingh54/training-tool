const express = require('express');

const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

router.delete('/permission/:permissionId', validate(authValidation.permissionId), authController.deletePermission);
router.get('/permission/:permissionId', validate(authValidation.permissionId), authController.getPermission);
router.post('/permission', validate(authValidation.addPermission), authController.createPermission);
router.get('/permissions', authController.permissions);

router
  .route('/role/:roleId')
  .get(validate(authValidation.role), roleController.getRole)
  .delete(validate(authValidation.role), roleController.removeRole);

router.post('/role', validate(authValidation.createRole), roleController.createRole);

router.post('/role/permissions/add', validate(authValidation.permissoinToRole), roleController.addPermissions);
router.post('/role/permissions/remove', validate(authValidation.permissoinToRole), roleController.removePermission);
router.get('/roles', roleController.getRoles);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * path:
 *  /auth/register:
 *    post:
 *      summary: Register as user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - givenName
 *                - email
 *              properties:
 *                givenName:
 *                  type: string
 *                surName:
 *                  type: string
 *                jobTitle:
 *                  type: string
 *                officeLocation:
 *                  type: string
 *                oracleId:
 *                  type: string
 *                phoneNumber:
 *                  type: string
 *                roles:
 *                  type: array
 *                email:
 *                  type: string
 *                  format: email
 *                  description: must be unique
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *              example:
 *                givenName: fake
 *                surName: Name
 *                email: fake2@example.com
 *                oracleId: "12345"
 *                officeLocation: gurgaon
 *                jobTitle: SSL1
 *                password: password1
 *                roles: [5f1c4b4cc9e3fa5fe0b685e8]
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 */

/**
 * @swagger
 * path:
 *  /auth/login:
 *    post:
 *      summary: Login
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *                password:
 *                  type: string
 *                  format: password
 *              example:
 *                email: fake@example.com
 *                password: password1
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *                  tokens:
 *                    $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          description: Invalid email or password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */

/**
 * @swagger
 * path:
 *  /auth/refresh-tokens:
 *    post:
 *      summary: Refresh auth tokens
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - refreshToken
 *              properties:
 *                refreshToken:
 *                  type: string
 *              example:
 *                refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/AuthTokens'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * path:
 *  /auth/forgot-password:
 *    post:
 *      summary: Forgot password
 *      description: An email will be sent to reset password.
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *              properties:
 *                email:
 *                  type: string
 *                  format: email
 *              example:
 *                email: fake@example.com
 *      responses:
 *        "204":
 *          description: No content
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * path:
 *  /auth/reset-password:
 *    post:
 *      summary: Reset password
 *      tags: [Auth]
 *      parameters:
 *        - in: query
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *          description: The reset password token
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - password
 *              properties:
 *                password:
 *                  type: string
 *                  format: password
 *                  minLength: 8
 *                  description: At least one number and one letter
 *              example:
 *                password: password1
 *      responses:
 *        "204":
 *          description: No content
 *        "401":
 *          description: Password reset failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Password reset failed
 */

/**
 * @swagger
 * path:
 *  /auth/permission:
 *    post:
 *      summary: Create a permission
 *      description: Only admins can create permission.
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - key
 *              properties:
 *                name:
 *                  type: string
 *                key:
 *                  type: string
 *                description:
 *                  type: string
 *                read:
 *                  type: boolean
 *                write:
 *                  type: boolean
 *                delete:
 *                  type: boolean
 *                isActive:
 *                  type: boolean
 *              example:
 *                name: training permission
 *                key: TRAINING_CONFIGURATION
 *                read: true
 *                write: true
 *                delete: true
 *                isActive: true
 *                description: Premissions for training
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/DuplicatePermission'
 *        "400":
 *          $ref: '#/components/responses/DuplicatePermission'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 */

/**
 * @swagger
 * path:
 *  /auth/permissions:
 *    get:
 *      summary: Get All Permissions
 *      tags: [Auth]
 *      responses:
 *        "200":
 *          description: List of Permission
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/Permission'
 *        "401":
 *          description: Failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Password reset failed
 */

/**
 * @swagger
 * path:
 *  /auth/permission/{permissionId}:
 *    get:
 *      summary: Get a Permission
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: permissionId
 *          required: true
 *          schema:
 *            type: string
 *          description: permission id
 *      responses:
 *        "200":
 *          description: Get a Permission
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Permission'
 *        "401":
 *          description: Get Permission failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Get Permission failed
 */

/**
 * @swagger
 * path:
 *  /auth/permission/{permissionId}:
 *    delete:
 *      summary: Delete a Permission
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: permissionId
 *          required: true
 *          schema:
 *            type: string
 *          description: permission id
 *      responses:
 *        "200":
 *          description: Delete a Permission
 *        "401":
 *          description: Delete Permission failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Delete Permission failed
 */

/**
 * @swagger
 * path:
 *  /auth/role/{roleId}:
 *    get:
 *      summary: Get a Role by Id
 *      tags: [Auth]
 *      parameters:
 *        - in: path
 *          name: roleId
 *          required: true
 *          schema:
 *            type: string
 *          description: role id
 *      responses:
 *        "200":
 *          description: Role
 *          content:
 *            application/json:
 *              type: object
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *        "401":
 *          description: Failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Failed
 */

/**
 * @swagger
 * path:
 *  /auth/roles:
 *    get:
 *      summary: Get All Roles
 *      tags: [Auth]
 *      responses:
 *        "200":
 *          description: List of Roles
 *          content:
 *            application/json:
 *              type: array
 *              schema:
 *                $ref: '#/components/schemas/Role'
 *        "401":
 *          description: Failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Password reset failed
 */

/**
 * @swagger
 * path:
 *  /auth/role/{roleId}:
 *    delete:
 *      summary: Delete a Role
 *      tags: [Auth]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: roleId
 *          required: true
 *          schema:
 *            type: string
 *          description: role id
 *      responses:
 *        "200":
 *          description: Delete a Role
 *        "401":
 *          description: Delete Role failed
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Delete role failed
 */

/**
 * @swagger
 * path:
 *  /auth/role:
 *    post:
 *      summary: Create Role
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - permissions
 *              properties:
 *                name:
 *                  type: string
 *                description:
 *                  type: string
 *                permissions:
 *                  type: array
 *              example:
 *                name: Admin
 *                description: Admin Role
 *                permissions: [
 *                  {
 *                    name: "Training Configuration",
 *                    key: "TRAINING_CONFIGURATION",
 *                    read: true,
 *                    write: true,
 *                    delete: true,
 *                    isActive: true
 *                  }
 *                ]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  role:
 *                    $ref: '#/components/schemas/Role'
 *        "401":
 *          description: Invalid Authenticate
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */

/**
 * @swagger
 * path:
 *  /auth/role/permissions/add:
 *    post:
 *      summary: Add Permissions to existing Role
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - roleId
 *                - permissions
 *              properties:
 *                roleId:
 *                  type: string
 *                permissions:
 *                  type: array
 *                  $ref: '#/components/schemas/Permission'
 *              example:
 *                roleId: 5f1400c433ecba59088d033a
 *                permissions: [
 *                  {
 *                    name: "Training Configuration",
 *                    key: "TRAINING_CONFIGURATION",
 *                    read: true,
 *                    write: true,
 *                    delete: true,
 *                    isActive: true
 *                  }
 *                ]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  role:
 *                    $ref: '#/components/schemas/Role'
 *        "401":
 *          description: Invalid Authenticate
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */

/**
 * @swagger
 * path:
 *  /auth/role/permissions/remove:
 *    post:
 *      summary: Remove Permissions from existing Role
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - roleId
 *                - permissions
 *              properties:
 *                roleId:
 *                  type: string
 *                permissions:
 *                  type: array
 *                  $ref: '#/components/schemas/Permission'
 *              example:
 *                roleId: 5f1400c433ecba59088d033a
 *                permissions: [
 *                  {
 *                    name: "Training Configuration",
 *                    key: "TRAINING_CONFIGURATION",
 *                    read: true,
 *                    write: true,
 *                    delete: true,
 *                    isActive: true
 *                  }
 *                ]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  role:
 *                    $ref: '#/components/schemas/Role'
 *        "401":
 *          description: Invalid Authenticate
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                code: 401
 *                message: Invalid email or password
 */
