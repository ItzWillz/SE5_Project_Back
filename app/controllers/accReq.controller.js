const db = require("../models");
const AccRequest = db.request;
const Op = db.Sequelize.Op;

// Create and Save a new Request
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "Accommodation request must have a type!",
    });
    return;
  }

  // Create a accommodation request
  const accRequest = {
    body: req.body.body,
    semester: req.body.semester,
    type: req.body.type,
    status: req.body.status,
    studentId: req.body.studentId
  };

  // Save accommodation in the database
  AccRequest.create(accRequest)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the accommodation request.",
      });
    });
};

// Retrieve all accommodations from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  AccRequest.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving accommodation requests.",
      });
    });
};

// Find a single accommodation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AccRequest.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find accommodation request with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving accommodation request with id=" + id,
      });
    });
};

// Update an accommodation request by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  AccRequest.update(req.body, {
    where: { accID: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "accommodation request was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update accommodation request with id=${id}. Maybe accommodation request was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating accommodation request with id=" + id,
      });
    });
};

// Delete a accommodation request with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AccRequest.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "accommodation request was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete accommodation request with id=${id}. Maybe accommodation request was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete accommodation request with id=" + id,
      });
    });
};

// Delete all accommodation requests from the database.
exports.deleteAll = (req, res) => {
  AccRequest.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} accommodation requests were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all accommodation requests.",
      });
    });
};
