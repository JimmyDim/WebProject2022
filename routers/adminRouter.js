const express = require('express')
const router = new express.Router()
const Poi = require('../models/poiModel')

//const fetch = require("node-fetch")


//POST POI
router.get('/pois/new', async (req, res,) => {

    res.render('pois/new');
})

router.post('/pois', async (req, res) => {
    res.send(req.body);

    //const poi = new Poi(req.body);
    // await poi.save();
    // res.redirect('poi/${poi._id}');
})




//Post POI JSON
router.post('/newpoi', async (req, res, next) => {
    const poi = new Poi(req.body);
    console.log("creating poi");

    poi.save().then(() => {
        res.send(poi)
    }).catch((e) => {
        res.send(e)
    })
    //res.redirect('/pois/${poi._id}')

})





//GET ALL POIS
router.get('/pois', async (req, res,) => {

    const pois = await Poi.find({})
    res.render('pois/index', { pois });
})


//GET POI BY ID
router.get('/pois/:id', async (req, res,) => {
    const { id } = req.params;
    const poi = await Poi.findById(id)
    res.render('pois/show', { poi });
})



module.exports = router;