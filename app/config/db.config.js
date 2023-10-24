module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'password',
    DB: 'se4p3',
    dialect: 'mysql',   // 'mysql' for local database, 'mariadb' for AWS database
    dialectOptions: {
        
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};