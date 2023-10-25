module.exports = (sequelize, Sequelize) => {
    const Accomodation = sequelize.define("accomodation", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      addDoc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  
    return Accomodation;
  };