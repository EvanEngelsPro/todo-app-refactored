if (process.env.MYSQL_HOST && process.env.NODE_ENV !== 'test')
    module.exports = require('./mysql');
else module.exports = require('./sqlite');
