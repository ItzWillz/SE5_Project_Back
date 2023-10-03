module.exports = (sequelize, Sequelize) => {
    const Faculty = sequelize.define("faculty", {
        facultyID: {
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
    }
    );
  
    return Faculty;
  };