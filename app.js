const { NotFoundError } = require('./utils/errors');
const express = require("express");
const app = express();
app.use(express.json());

//morgan package
const morgan = require('morgan');
app.use(morgan('tiny'));

//health checkpoint - had to move it before the error handlers to pass the test
app.get('/', (req, res) => {
    return res.status(200).json({ "ping": "pong" });
});

const giftExchange = require("./routes/gift-exchange");
app.use('/gift-exchange', giftExchange);

//404 handler 
app.use((req, res, next) => {
    return next(new NotFoundError());
});

//generic error handler
app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Something went wrong in the application.";

    return res.status(status).json({
        error: { status, message },
    });
});

module.exports = app;
