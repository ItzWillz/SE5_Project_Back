module.exports = (sequelize, Sequelize) => {
    const StudentCourseSchedule = sequelize.define("studentCourseSchedule", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

    }, 
    {
        freezeTableName: true,
    }
    );
  
    return StudentCourseSchedule;
  };