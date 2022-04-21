const express = require('express')
const router = new express.Router()
const Poi = require('../models/poiModel')

//const fetch = require("node-fetch")

//Post POI
router.post('/newpoi', async (req, res, next) => {
    const poi = new Poi(req.body);
    console.log("creating poi");

    poi.save().then(() => {
        res.send(poi)
    }).catch((e) => {
        res.send(e)
    })

})

module.exports = router;