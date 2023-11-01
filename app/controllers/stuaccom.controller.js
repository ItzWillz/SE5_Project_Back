const db = require("../models");
const StuAccom = db.studentAccommodation;
const Op = db.Sequelize.Op;

// Create and Save a new Accommodation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "Accommodation must be approved or declined!",
    });
    return;
  }

  // Create a accommodation
  const accom = {
    title: req.body.title,
    semester: req.body.semester,
    type: req.body.type,
    addDoc: req.body.addDoc,
  };

  // Save accommodation in the database
  StuAccom.create(accom)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the accommodation.",
      });
    });
};

// Retrieve all accommodations from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  StuAccom.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving accommodations.",
      });
    });
};

// Find a single accommodation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  StuAccom.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find accommodation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving accommodation with id=" + id,
      });
    });
};

// Retrieve all requests for a specific student in the database.
exports.findAllForUser = async (req, res) => {
  const studentId = req.params.id;
  console.log(studentId)

  const [results, metadata] = await db.sequelize.query(
    `SELECT r.* FROM studentAccommodation r
    WHERE r.studentId = ${studentId}`
  );
  res.send(results)
};


// Update an accommodation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  StuAccom.update(req.body, {
    where: { accID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "accommodation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update accommodation with id=${id}. Maybe accommodation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating accommodation with id=" + id,
      });
    });
};

// Delete a accommodation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  StuAccom.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "accommodation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete accommodation with id=${id}. Maybe accommodation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete accommodation with id=" + id,
      });
    });
};

// Delete all accommodation requests from the database.
exports.deleteAll = (req, res) => {
  StuAccom.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} accommodations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all accommodations.",
      });
    });
};
