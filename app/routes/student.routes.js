module.exports = (app) => {
  const student = require("../controllers/student.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Retrieve a single student by userId
  router.get("/:userId", [authenticate], student.findOne);
  // Retrieve a single student by studentID
  router.get("/std/:stuId", [authenticate], student.findstudentWithStudentId);

  app.use("/accommodations-t2/student", router);
};
