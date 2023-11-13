const db_host = process.env.DB_HOST;
const db_pw = process.env.DB_PW;
const db_user = process.env.DB_USER;
const db_name = process.env.DB_NAME;

module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '123456778',
    DB: 'accommodation',
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