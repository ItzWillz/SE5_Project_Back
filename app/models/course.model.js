module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        courseNum: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        dept: {
            type: Sequelize.STRING(4),
            allowNull: false
        },
        level: {
            type: Sequelize.STRING(1),
            allowNull: false
        },
        hours: {
            type: Sequelize.STRING(1),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(1500),
            allowNull: true
        },

    }, 
    {
        freezeTableName: true,
    }
    );
  
    return Course;
  };