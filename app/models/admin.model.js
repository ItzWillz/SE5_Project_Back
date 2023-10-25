module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
    }, 
    {
        freezeTableName: true,
    }
    );
  
    return Admin;
  };