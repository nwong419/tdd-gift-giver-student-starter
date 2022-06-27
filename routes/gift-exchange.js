const GiftExchange = require("../models/gift-exchange");
const { BadRequestError } = require("../utils/errors");

const express = require("express");
const router = express.Router();

router.post('/pairs', (req,res, next) => {
    try {
        const result = GiftExchange.pairs(req.body.names);
        res.status(200).json(result);
    } catch(err) {
        next(new BadRequestError(err));
    }
});

router.post('/traditional', (req,res, next) => {
    try {
        const result = GiftExchange.traditional(req.body.names);
        res.status(200).json(result);
    } catch(err) {
        next(new BadRequestError(err));
    }
});

module.exports = router;