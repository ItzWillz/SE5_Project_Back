module.exports = (app) => {
  const accommodation = require("../controllers/accommodation.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Accommodation
  router.post("/", [authenticate], accommodation.create);

  // Retrieve all Accommodations
  router.get("/", [authenticate], accommodation.findAll);

  // Retrieve a single Accommodation with id
  router.get("/:id", [authenticate], accommodation.findOne);

  // Update an Accommodation with id
  router.put("/:id", [authenticate], accommodation.update);

  // Delete an Accommodation with id
  router.delete("/:id", [authenticate], accommodation.delete);

  // Delete all Accommodations
  router.delete("/", [authenticate], accommodation.deleteAll);

  app.use("/accommodations-t2/accommodation", router);
};
