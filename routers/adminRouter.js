const express = require('express')
const router = new express.Router()
const Poi = require('../models/poiModel')
const FileReader = require('filereader');
var fs = require('fs');
const methodOverride = require('method-override');
const req = require('express/lib/request');

//const fetch = require("node-fetch")


//POST POI
router.get('/pois/new', async (req, res,) => {

    res.render('pois/new');
})


router.post('/newpoi', async (req, res) => {
    const poi = new Poi(req.body);
    poi.geometry.coordinates = [poi.coordinates.lat, poi.coordinates.lng];
    poi.geometry.type = 'Point';
    console.log("creating poi");

    poi.save();
    res.redirect('/pois/' + poi._id);
    //res.redirect('/pois/${poi._id}')

})

//Post POI JSON FILE
router.post('/addjsonfile', async (req, res, next) => {

    try {
        const data = await fs.readFileSync('public/starting_pois.json');
        const jsondata = JSON.parse(data);
        Poi.insertMany(jsondata).then(() => {
            res.send('success')
        }).catch((e) => {
            res.send(e)
        });
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
    console.log("creating poi");
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


//EDIT POI

router.get('/pois/:id/edit', async (req, res) => {
    const { id } = req.params;
    const poi = await Poi.findById(id)
    res.render('pois/edit', { poi });
})

router.put('/pois/:id', async (req, res) => {
    const { id } = req.params;
    const poi = await Poi.findByIdAndUpdate(id, { ...req.body });
    res.redirect('/pois/' + poi._id);

})


//DELETE POI
router.delete('/pois/:id', async (req, res) => {
    const { id } = req.params;
    await Poi.findByIdAndDelete(id);
    res.redirect('/pois');

})


module.exports = router;