"use strict";

var express = require("express");
var app = express();
var routes = require("./routes");

var jsonParser = require("body-parser").json;
var logger = require("morgan");

const Joi = require("joi");

app.use(logger("dev"));
app.use(jsonParser());

app.post("/addNumbers", (req, res) => {
    const { error } = validateNumbers(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let { firstNumber, secondNumber } = req.body;

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    let result = firstNumber + secondNumber;

    const response = {
        success: true,
        firstNumber,
        secondNumber,
        result,
    };

    res.send(response);
});

app.use("/questions", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error Handler

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

function validateNumbers(numbers) {
    const schema = Joi.object({
        firstNumber: Joi.number().required(),
        secondNumber: Joi.number().required(),
    });

    return schema.validate(numbers);
}

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Express server is listening on port", port);
});
