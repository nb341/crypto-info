const Currency = require('./model').Currency;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get(`/`, async (req, res) =>{
    let filter = {};
    if(req.query)
    {
         filter = {}
    }

    const currencyList = await Currency.find();

    if(!currencyList) {
        res.status(500).json({success: false})
    } 
    res.send(currencyList);
})


module.exports =router;