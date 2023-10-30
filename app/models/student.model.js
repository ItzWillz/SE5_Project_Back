module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
    }, 
    {
        freezeTableName: true,
    }
    );
  
    return Student;
  };