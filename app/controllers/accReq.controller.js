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
          sendAcceptedEmail(req.body.emailData.facultyEmail,req.body.emailData.studentName,req.body.emailData.studentId,req.body.type)
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
    subject: "Initial Accommodations Request Email",
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

const sendAcceptedEmail = async (facultyEmail, studentName, studentId,accType) => {
    let message="";
    let subject="";
    if(accType.toLowerCase()=="chapel"){
      message = `
      <html>
      <p>${studentName}(${studentId}) is a student at Oklahoma Christian University. ${studentName} has a medical condition or disability that qualifies the student for special accommodations to have their required chapel attendance set at for the current semester.
   </P>
   <p>
    Thank you for your assistance. If you have any questions, please contact me at ext. 5922.
    </p>
      </html>
      `;
      subject= "Accommodated Chapel Absences";
    }
    if(accType.toLowerCase()=="housing"){
      message = `
      <html>
      <p>${studentName}(${studentId})is a student at Oklahoma Christian University. ${studentName} has a disability, which qualifies the student for special accommodations.</p>
      <p>We are asking that you provide the following:</p>
       <ul>
        <li>Private room accommodations</li>
        <li>ESA</li>
        <li>Access to a private  bathroom</li>
        <li>Access to a kitchen</li>
        <li>Off Campus</li>
        <p><b>Oklahoma Christian University defers to the Fair Housing Act regarding all reasonable accommodations for people with disabilities</b></p>
   <p>
    Thank you for your assistance. If you have any questions, please contact me at ext. 5922.
    </p>
      </html>
      `;
      subject = "ADA Housing  Accommodations";
    }
    if(accType.toLowerCase()=="special"){
      message = `
      <!DOCTYPE html>
<html lang="en">
<body>
  <p>${studentName}is a student in your class. ${studentName} has a disability, which qualifies the student for special accommodations.</p>
  <p>We ask that you provide the following:</p>
  <ul>
    <li>Accommodations vary for each student and decided on a case-by-case basis</li>
    <li>Print everything in <span style="font-size: 28pt; font-family: Arial;"><b>28 pt. Arial font</b></span></li>
    <li>Time plus ½</li>
    <li>Private Testing</li>
    <li>Reduced distraction environment for testing</li>
    <li>Paper copy of test if possible</li>
    <li>Oral Testing</li>
    <li>Take exams on lavender paper (provided by me)</li>
    <li>Use of ear plugs during exam</li>
    <li>Use of headphones (for laptop to read exams and quizzes, preferred if possible to a personal reader)</li>
    <li>Noise Canceling Device during testing</li>
    <li>Noise reducing headphones during class</li>
    <li>Paper copy of exams (enlarged, if possible)</li>
    <li>Copy of the professor’s notes or PowerPoint presentations, preferably before class</li>
    <li>Note taking Assistance</li>
    <li>Use of laptop or iPad with note-taking software</li>
    <li>Use of calculator during exams</li>
    <li>Preferential Seating</li>
    <li>Please do not call upon student unless their hand is raised</li>
    <li>Permission to step out of class when needed on occasion</li>
    <li>Please do not ask to read aloud unless student’s hand is raised</li>
    <li>Student may need to stand, shift, or take a short break</li>
    <li>A meeting with student to discuss alternative forms of oral in-class participation</li>
    <li>Occasional tardiness</li>
    <li>Flexibility in Attendance (See additional Flexibility of Attendance Attachment: Student action required)</li>
    <li>Flexibility in Assignments (See additional Flexibility of Assignments Attachment: Student action required)</li>
    <li>Audio Books (provided by me)</li>
    <li>Spelling considerations on handwritten work</li>
    <li>Eating during class</li>
    <li>Test blood sugar during class</li>
    <li>Blood sugar monitor may sound during class</li>
    <li>Test blood sugar before exams. If it is high/low, student may delay exam up to 24 hours</li>
    <li>Blood sugar monitor may sound during class</li>
    <li>Warning before class if the class will be discussing triggering topics such as abuse and sexual violence, people spying on or controlling others, the world or elements of the world not being real, graphic descriptions of pain or injury, if the class will involve loud noises</li>
  </ul>
  <p>Thank you for your assistance. If you have any questions, please contact me at ext. 5922.</p>
  
  <h2>Note Taking Assistance</h2>
  <p>Student – please follow the steps below:</p>
  <ol>
    <li>Try to identify someone you know in the class and ask the person if you can share notes.</li>
    <li>If you cannot find someone, tell your instructor you would like a note-taking assistant.</li>
    <li>You must attempt to take your own notes. You will not receive the notes if you are absent from class on the day the notes are taken.</li>
  </ol>
  <p>Instructor - if the student requests a note-taker, please follow the steps below:</p>
  <ol>
    <li>If you know an individual in the class who would be a good note-taker, you may ask that person to help.</li>
    <li>You may also tell the class you need a note-taker and ask for a volunteer.</li>
    <li>Provide the students with each other's names after class or through email.</li>
    <li>Please tell the note-taker that carbon paper is available for those who handwrite notes or copies can be made in the Student Life Office.</li>
    <li>Student must be present in class to receive notes and must attempt to take his/her own notes.</li>
    <li>If you do not feel comfortable requesting a note-taker, please send me your roster, and I will find someone.</li>
  </ol>
</body>
</html>

      `;
      subject = "ADA/504 Accommodations";
    }

    if(accType.toLowerCase()=="special2"){
      message = `
      <html>
      p>${studentName}is a student in your class. ${studentName} has a disability, which qualifies the student for special accommodations.</p>
  <p>We ask that you provide the following:</p>
       <ul>
        <li>Eating during class</li>
        <li>Test blood sugar during class</li>
        <li>Blood sugar monitor may sound during class</li>
        <li>Test blood sugar before exams. If it is high/low, Student may delay exam upt to 24 hours</li>
        <li>Time and a half for exams</li>
        <p><b>Oklahoma Christian University defers to the Fair Housing Act regarding all reasonable accommodations for people with disabilities</b></p>
   <p>
    Thank you for your assistance. If you have any questions, please contact me at ext. 1876.
    </p>
      </html>
      `;
      subject = "ADA/504 Accommodations ";
    }
    const mailOptions = {
      from: 'mauriceirakoze77@gmail.com', 
      to: facultyEmail,
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
