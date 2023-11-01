module.exports = (app) => {
  const accReq = require("../controllers/accReq.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Accommodation
  router.post("/", [authenticate], accReq.create);

  // Retrieve all Accommodations
  router.get("/", [authenticate], accReq.findAll);

  // Retrieve a single Accommodation with id
  //router.get("/:id", [authenticate], accReq.findOne);

  // Retrieve all Accommodations with a StudentId
  router.get("/:id", [authenticate], accReq.findAllForUser);

  // Update an Accommodation with id
  router.put("/:id", [authenticate], accReq.update);

  // Delete an Accommodation with id
  router.delete("/:id", [authenticate], accReq.delete);

  // Delete all Accommodations
  router.delete("/", [authenticate], accReq.deleteAll);

  app.use("/accommodations-t2/accReq", router);
};
