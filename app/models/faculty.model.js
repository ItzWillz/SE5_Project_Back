module.exports = (sequelize, Sequelize) => {
    const Faculty = sequelize.define("faculty", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
    }
    );
  
    return Faculty;
  };