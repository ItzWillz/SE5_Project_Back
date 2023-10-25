module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("request", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      body: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      semester: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(45),
        allowNull: false
      }
    },
    {
      freezeTableName: true,
    }
    );
  
    return Request;
  };