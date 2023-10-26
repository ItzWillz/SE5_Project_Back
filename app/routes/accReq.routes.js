module.exports = (app) => {
  const accReq = require("../controllers/accReq.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new Accommodation request
  router.post("/", [authenticate], accReq.create);

  // Retrieve all Accommodation requests
  router.get("/", [authenticate], accReq.findAll);

  // Retrieve a single Accommodation request with id
  router.get("/:id", [authenticate], accReq.findOne);

  // Update an Accommodation request with id
  router.put("/:id", [authenticate], accReq.update);

  // Delete an Accommodation request with id
  router.delete("/:id", [authenticate], accReq.delete);

  // Delete all Accommodation requests
  router.delete("/", [authenticate], accReq.deleteAll);

  app.use("/accommodations-t2/accReq", router);
};
