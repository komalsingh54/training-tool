const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const permissionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    key: {
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
    read: {
      type: Boolean,
      required: false,
      default: false,
    },
    write: {
      type: Boolean,
      required: false,
      default: false,
    },
    delete: {
      type: Boolean,
      required: false,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
permissionSchema.plugin(toJSON);
permissionSchema.plugin(paginate);

/**
 * Check if permission is taken
 * @param {string} name - The permission name
 * @param {string} key - The Permission key
 * @returns {Promise<boolean>}
 */
permissionSchema.statics.isPermissionTaken = async function (name, key) {
  const permission = await this.find({ $or: [{ name }, { key }] });
  return !!permission.length;
};

/**
 * @typedef Permission
 */
const Permission = mongoose.model('Permission', permissionSchema);

module.exports = {
  Permission,
  permissionSchema,
};
