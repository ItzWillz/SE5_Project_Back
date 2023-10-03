module.exports = (sequelize, Sequelize) => {
    const StudentAccomodation = sequelize.define("studentAccomodation", {
        studentAccID: {
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
    // {
    //     timestamps: false
    // }
    );
  
    return StudentAccomodation;
  };