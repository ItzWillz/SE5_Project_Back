module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    fName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
<<<<<<< HEAD
    permission: {
      type: Sequelize.STRING,  
      allowNull: true,
      default: "student",
    },
  },
  {
    freezeTableName: true,
  }
);
=======
    permission: {              // Don't need permission because a user is either a student or an admin and
      type: Sequelize.STRING,  // have unique userIDs
      allowNull: false,
    },
    
    // refresh_token: {
    //   type: Sequelize.STRING(512),
    //   allowNull: true
    // },
    // expiration_date: {
    //   type: Sequelize.DATE,
    //   allowNull: true
    // },
  });
>>>>>>> 0903ecc (Server.js Port Change)

  return User;
};
