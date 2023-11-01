module.exports = (app) => {
    const accom = require("../controllers/accom.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Accommodation
    router.post("/", [authenticate], accom.create);
  
    // Retrieve all Accommodations
    router.get("/", [authenticate], accom.findAll);
  
    //Retrieve a single Accommodation with id
    router.get("/:id", [authenticate], accom.findOne);
  
    // Retrieve all Accommodations with a StudentId
    // router.get("/:id", [authenticate], accom.findAllForUser);
  
    // Update an Accommodation with id
    router.put("/:id", [authenticate], accom.update);
  
    // Delete an Accommodation with id
    router.delete("/:id", [authenticate], accom.delete);
  
    // Delete all Accommodations
    router.delete("/", [authenticate], accom.deleteAll);
  
    app.use("/accommodations-t2/accom", router);
  };
  