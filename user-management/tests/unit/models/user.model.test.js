const faker = require('faker');
const { User } = require('../../../src/models');

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
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
    });

    test('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidEmail';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain numbers', async () => {
      newUser.password = 'password';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain letters', async () => {
      newUser.password = '11111111';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if role is unknown', async () => {
      newUser.roles = 'invalid';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });
  });

  describe('User toJSON()', () => {
    test('should not return user password when toJSON is called', () => {
      const newUser = {
        givenName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        roles: ['5ebac534954b54139806c112'],
      };
      expect(new User(newUser).toJSON()).not.toHaveProperty('password');
    });
  });
});
