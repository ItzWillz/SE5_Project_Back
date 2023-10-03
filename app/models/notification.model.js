module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notification", {
        notificationID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    }
    );
  
    return Notification;
  };