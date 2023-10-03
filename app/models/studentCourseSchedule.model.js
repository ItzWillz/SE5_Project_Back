module.exports = (sequelize, Sequelize) => {
    const StudentCourseSchedule = sequelize.define("studentCourseSchedule", {
        studentSchedID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

    }, 
    // {
    //     timestamps: false
    // }
    );
  
    return StudentCourseSchedule;
  };