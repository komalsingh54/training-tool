const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { permissionSchema } = require('./permission.model');
// const { roles } = require('../config/roles');

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
      unique: false,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    permissions: [permissionSchema],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

/**
 * Check if role is taken
 * @param {string} name - The role name
 * @returns {Promise<boolean>}
 */
roleSchema.statics.isRoleTaken = async function (name) {
  const role = await this.findOne({ name });
  return !!role;
};

/**
 * @typedef Role
 */
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
