const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const User = require('../../src/models/user.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  givenName: 'John',
  surName: 'Doe',
  phoneNumber: '9876543211',
  jobTitle: 'SAL1',
  officeLocation: 'Gurgaon',
  email: 'John.Doe@abc.com',
  password: 'password1',
  oracleId: '12345',
  roles: ['5ebac534954b54139806c112'],
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  givenName: faker.name.findName(),
  surName: faker.name.findName(),
  phoneNumber: '9876543211',
  jobTitle: 'SAL1',
  officeLocation: 'Gurgaon',
  email: faker.internet.email().toLowerCase(),
  password: 'password1',
  oracleId: '12345',
  roles: ['5ebac534954b54139806c112'],
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  givenName: faker.name.findName(),
  surName: faker.name.findName(),
  phoneNumber: '9876543211',
  jobTitle: 'SAL1',
  officeLocation: 'Gurgaon',
  email: faker.internet.email().toLowerCase(),
  password: 'password1',
  oracleId: '12345',
  roles: ['5ebac534954b54139806c112'],
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};
