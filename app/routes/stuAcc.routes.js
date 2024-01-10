module.exports = (app) => {
  const stucom = require("../controllers/stuaccom.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Accommodation
  router.post("/", [authenticate], stucom.create);

  // Retrieve all Accommodations
  router.get("/", [authenticate], stucom.findAll);

  // Retrieve a single Accommodation with id
  router.get("/:id/:stuid", [authenticate], stucom.findOne); 

  // Retrieve all accommodations that are specifically Academic
  router.get("/:id/:int/:int1", [authenticate], stucom.findAcademic); 

  // Retrieve all Student Accommodations with a Student Id
  router.get("/:id", [authenticate], stucom.findAllForUser);

  // Update an Accommodation with id
  router.put("/:id", [authenticate], stucom.update);

  // Delete an Accommodation with id
  router.delete("/:id", [authenticate], stucom.delete);

  // Delete all Accommodations
  router.delete("/", [authenticate], stucom.deleteAll);

  app.use("/accommodations-t2/stucom", router);
};
