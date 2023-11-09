module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '123456778',
    DB: 'todo',
    port:3306,
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