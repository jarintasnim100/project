"use strict";

var express = require("express");
var router = express.Router();

// GET /questions
// Route for questions collection
router.get("/", function (req, res) {
    res.json({ response: "You sent me a GET request" });
});

// POST /questions
// Route for creating questions
router.post("/", function (req, res) {
    res.json({
        response: "You sent me a POST request",
        body: req.body,
    });
});

// GET /questions/:id
// Route for specific questions
router.get("/:ID", function (req, res) {
    res.json({
        response: "You sent me a GET request for ID " + req.params.qID,
    });
});

module.exports = router;
