module.exports = (app) => {
    const faculty = require("../controllers/faculty.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Retrieve a single faculty by userId
    router.get("/:userId", [authenticate], faculty.findOne);
  
    // Retrieve all students that are in a class with the faculty member
    router.get("/students/:facultyId", [authenticate], faculty.findAllStudents);
  
    // Retrieve all accommodations that a student has
    router.get("/student/:id", [authenticate], faculty.findAllStudentAccommodations);
  
    app.use("/accommodations-t2/faculty", router);
  };