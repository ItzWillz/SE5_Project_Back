const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;

// Find a single student with a userId
exports.findOne = (req, res) => {
    const userSentId = req.params.userId;
  
    Student.findOne(
        { where: {userId: "1"}})
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Student with userId=${userSentId}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Student with userId=" + userSentId,
        });
      });
  };