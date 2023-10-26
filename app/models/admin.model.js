module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
        adminID: {
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
    // {
    //     timestamps: false
    // }
    );
  
    return Admin;
  };