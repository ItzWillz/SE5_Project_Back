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
      sendEmail(req.body.email);
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

sendEmail = (email) => {
  const mailOptions = {
    from: 'mauriceirakoze77@gmail.com',
    to: email,
    subject: "Initial Accommodations Request Email",
    text: 
    `
    Thank you for submitting your request for accommodations. We require supporting documentation to fulfill your request. 


    Documentation must be from an appropriate, qualified professional who has seen you within the past 18 months and must contain the following information:
    
    
    You are a person with a disability.
    The diagnosis (what is the disability?)
    Information about the necessary classroom accommodations you will need to successfully complete the semester. There must be a nexus between the disability and the accommodations requested.
    Name and credentials (license #, etc.) of the diagnostic clinician.
    
    
    Documentation may be emailed to me, but it must be on official letterhead. If your doctor’s office is unwilling to email me (this is the most likely scenario), they may mail the document to you. Then, scan and email it to me. 
    
    
    Once the information is submitted, we will schedule a time to meet to discuss the details (in person or via video conference). After our meeting, I will email your professors your specific ADA academic accommodations letter. Accommodations MUST BE RENEWED EACH SEMESTER.
    
    
    Please let me know if you have any other questions or concerns. I look forward to hearing from you.
    
    
    Sincerely,
    
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Email could not be sent.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully.');
    }
  });
}
