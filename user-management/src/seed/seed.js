const { Seeder } = require('mongo-seeding');

const config = {
  database: {
    host: '127.0.0.1',
    port: 27017,
    name: 'trainingtool',
  },
  dropDatabase: true,
};

// eslint-disable-next-line no-unused-vars
const seeder = new Seeder(config);
