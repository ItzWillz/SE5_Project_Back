const db_host = process.env.DB_HOST;

module.exports = {
    HOST: db_host,
    USER: 't22023',
    PASSWORD: 'CS@oc2023t2',
    DB: 'accommodations-t2',
    dialect: 'mariadb',   // 'mysql' for local database, 'mariadb' for AWS database
    dialectOptions: {
        
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};