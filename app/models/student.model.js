module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        studentID: {
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
            type: Sequelize.STRING(4),
            allowNull: false
        },
    }, 
    // {
    //     timestamps: false
    // }
    );
  
    return Student;
  };