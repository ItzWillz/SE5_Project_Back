module.exports = (sequelize, Sequelize) => {
    const Approval = sequelize.define("approval", {
      approvalID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      body: {
        type: Sequelize.STRING(3000),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      semester: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return Approval;
  };