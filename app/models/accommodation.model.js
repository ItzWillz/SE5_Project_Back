module.exports = (sequelize, Sequelize) => {
    const Accommodation = sequelize.define("accommodation", {
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
    },
    {
      freezeTableName: true,
    }
    );
  
    return Accommodation;
  };