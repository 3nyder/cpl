var config = {
    test: {
        database: {
            host    : 'localhost',
            user    : 'user',
            password: 'password',
            database: 'db_test'
        }
    },
    prod: {
        database: {
            host    : 'localhost',
            user    : 'user',
            password: 'password',
            database: 'db'
        }
    }
};
module.exports = config;