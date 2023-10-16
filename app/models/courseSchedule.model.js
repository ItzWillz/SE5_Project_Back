module.exports = (sequelize, Sequelize) => {
    const CourseSchedule = sequelize.define("courseSchedule", {
        schedID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        semester: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        dateFrom: {
            type: Sequelize.DATE,
            allowNull: false
        },
        dateTo: {
            type: Sequelize.DATE,
            allowNull: false
        },
        term: {
            type: Sequelize.STRING(1),
            allowNull: false
        },
    }
    );
  
    return CourseSchedule;
  };