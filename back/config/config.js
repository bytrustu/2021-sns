const { DB_PASSWORD } = require('./index');

module.exports = {
  'development': {
    'username': 'root',
    'password': DB_PASSWORD,
    'database': 'sns',
    'host': '127.0.0.1',
    'port': '3306',
    'dialect': 'mysql',
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql',
  },
  'production': {
    'username': 'root',
    'password': null,
    'database': 'database_production',
    'host': '127.0.0.1',
    'dialect': 'mysql',
  },
};
