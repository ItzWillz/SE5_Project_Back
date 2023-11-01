const db = require("../models");
const Faculty = db.faculty;
const Op = db.Sequelize.Op;

// Find a single faculty with a userId
exports.findOne = (req, res) => {
    const userSentId = req.params.userId;
  
    Faculty.findOne(
        { where: {userId: userSentId}})
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find faculty with userId=${userSentId}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving faculty with userId=" + userSentId,
        });
      });
  };

// Retrieve all students that are in a course with the specified faculty member from the database.
exports.findAllStudents = async (req, res) => {
  const facultyId = req.params.facultyId;
  console.log(facultyId)

  const [results, metadata] = await db.sequelize.query(
    `SELECT DISTINCT s.id, s.name, s.email FROM student s
    JOIN studentcourseschedule scs ON s.id = scs.studentId
    JOIN courseschedule cs ON scs.courseScheduleId = cs.id
    JOIN faculty f ON cs.facultyId = f.id
    WHERE f.id = ${facultyId}`
  );
  res.send(results)
};

// Find all accommodations that the specified student has
exports.findAllStudentAccommodations = (req, res) => {
  const studentId = req.params.id;

  Faculty.findAll({ where: condition })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find accommodations with studentId=${studentId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving accommodations with studentId=" + studentId,
      });
    });
};