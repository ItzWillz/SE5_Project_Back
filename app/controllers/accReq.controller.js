const db = require("../models"); 
const AccRequest = db.request;
const Op = db.Sequelize.Op;
const nodemailer = require('nodemailer');

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
    studentId: req.body.studentId,
    email: req.body.email
  };

  // Save accommodation in the database
  AccRequest.create(accRequest)
    .then((data) => {
      sendEmail(accRequest.email)
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

// Retrieve all requests for a specific student in the database.
exports.findAllForUser = async (req, res) => {
  const id = req.params.id;
  console.log(id)

  const [results, metadata] = await db.sequelize.query(
    `SELECT * FROM request
    WHERE Id = ${id}`
  );
  res.send(results)
};

// Update an accommodation request by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  AccRequest.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
         if(req.body.emailData){
          // If request is of type 'academic', get all faculty members affected by the request. Send email to each one + the student.
          if (req.body.type.toLowerCase() == "academic" && req.body.emailData.accStatus == "accepted") {
            emailRelevantFaculty(req.body.emailData.studentId, req.body.emailData.studentName, req.body.type)
          }
          // Else if request is of any other type ('meal plan', 'housing', 'chapel'), just send an email to the student.
          emailStudent(req.body.emailData.studentEmail, req.body.emailData.studentName, req.body.emailData.studentId, req.body.type, req.body.emailData.accStatus)

        }
        else {
          console.log("No email data provided. Unable to send email.");
        }
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
      console.log(err)
      res.status(500).send({
        message: "Error updating accommodation request with id=" + id + req.body,
      });
    });
};

const emailRelevantFaculty = async (studentId, studentName, accType) => {
  // Get all faculty members that teach a course the student is in.
  const [results, metadata] = await db.sequelize.query(
    `SELECT DISTINCT f.email FROM studentcourseschedule scs 
    JOIN courseschedule cs ON scs.courseScheduleId = cs.id 
    JOIN faculty f ON cs.facultyId = f.id 
    WHERE studentId = "${studentId}";`
  );

  // Send an email to each faculty email from the results of the query
  console.log(results)
  for (i=0; i < results.length; i++) {
    sendAcceptedEmail(results[i].email, studentName, studentId, accType, "faculty")
  }
}

const emailStudent = async (studentEmail, studentName, studentId, accType, status) => {
  if (status == "accepted") {
    sendAcceptedEmail(studentEmail, studentName, studentId, accType, "student")
  }
  else {
    sendRejectedEmail(studentEmail, studentName, studentId, accType)
  }
}

// Create transporter for sending emails.
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'mauriceirakoze77@gmail.com', // replace with desired sender email
    pass: 'juqd nsox ueka ywag',
  },

});

sendEmail = (email) => {
  
  const mailOptions = {
    from: 'mauriceirakoze77@gmail.com',
    to: email,
    subject: "Accommodation Request- Further Steps",
    html: 
    `
    <html>
    <body>
      <p>Thank you for submitting your request for accommodations. We require supporting documentation to fulfill your request.</p>

      <p>Documentation must be from an appropriate, qualified professional who has seen you within the past 18 months and must contain the following information:</p>

      <ul>
        <li>You are a person with a disability.</li>
        <li>The diagnosis (what is the disability?)</li>
        <li>Information about the necessary classroom accommodations you will need to successfully complete the semester. There must be a nexus between the disability and the accommodations requested.</li>
        <li>Name and credentials (license #, etc.) of the diagnostic clinician.</li>
      </ul>

      <p>Documentation may be emailed to me, but it must be on official letterhead. If your doctor’s office is unwilling to email me (this is the most likely scenario), they may mail the document to you. Then, scan and email it to me.</p>

      <p>Once the information is submitted, we will schedule a time to meet to discuss the details (in person or via video conference). After our meeting, I will email your professors your specific ADA academic accommodations letter. Accommodations MUST BE RENEWED EACH SEMESTER.</p>

      <p>Please let me know if you have any other questions or concerns. I look forward to hearing from you.</p>

      <p>Sincerely,</p>
    </body>
    </html>
    ` 
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

const sendAcceptedEmail = async (email, studentName, studentId, accType, role) => {
    let message="";
    let subject="";

    // TODO: Put accommodation information in email
    // Chapel email
    if(accType.toLowerCase()=="chapel"){
      message = `
      <html>
      <p>Your chapel accommodation has been accepted!</p>
      </html>
      `;
      subject= "Chapel Accommodation";
    }

    // Housing email
    if(accType.toLowerCase() == "housing"){
      message = `
      <html>
      <p>Your housing accommodation has been accepted! </p>
      </html>
      `;
      subject = "Housing Accommodation";
    }
    // Meal Plan email
    if(accType.toLowerCase() == "meal plan"){
      message = `
      <html>
      <p>Your meal plan accommodation has been accepted! </p>
      </html>
      `;
      subject = "Meal Plan Accommodation";
    }
    // Academic email to student
    
    // Academic email to faculty
    if (accType.toLowerCase() == "academic") {
      if (role == "faculty") {
        message = `
        <html>
        <p>${studentName} ${studentId} is a student in your class. ${studentName} has a disability, which qualifies the student for special accommodations.</p>
        </html>
        `;
        subject = "Academic Accommodation";
      }
      else {
        message = `
        <html>
        <p>Your academic accommodation has been accepted!</p>
        </html>
        `;
        subject = "Academic Accommodation";
      }
  }

    const mailOptions = {
      from: 'mauriceirakoze77@gmail.com', 
      to: email,
      subject: subject,
      html: message
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }

  };

  const sendRejectedEmail = async (email, studentName, studentId, accType) => {
    let message="";
    let subject="";

    // TODO: Put accommodation information in email
    message = `
    <html>
    <p>Your accommodation request has been rejected. Sorry!</p>
    </html>
    `;
    subject= "Rejected Accommodation Request";

    const mailOptions = {
      from: 'mauriceirakoze77@gmail.com', 
      to: email,
      subject: subject,
      html: message
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }

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