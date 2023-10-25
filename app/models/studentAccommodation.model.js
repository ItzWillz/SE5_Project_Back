module.exports = (sequelize, Sequelize) => {
    const StudentAccommodation = sequelize.define("studentAccommodation", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        semester: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },

    }, 
    {
        freezeTableName: true,
    }
    );
  
    return StudentAccommodation;
  };