const db = require("../models");
const Accommodation = db.accommodation;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a accommodation
  const accommodation = {
    title: req.body.fName,
    description: req.body.lName,
    type: req.body.email,
    addDoc: req.body.addDoc
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };

  // Save accommodation in the database
  Accommodation.create(accommodation)
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

  Accommodation.findAll({ where: condition })
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

  Acommodation.findByPk(id)
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

// Update an accommodation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Accommodation.update(req.body, {
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

  Accommodation.destroy({
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

// Delete all accommodations from the database.
exports.deleteAll = (req, res) => {
  Accommodation.destroy({
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
