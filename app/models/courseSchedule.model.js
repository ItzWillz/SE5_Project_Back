module.exports = (sequelize, Sequelize) => {
    const CourseSchedule = sequelize.define("courseSchedule", {
        id: {
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
    },
    {
        freezeTableName: true,
    }
    );
  
    return CourseSchedule;
  };