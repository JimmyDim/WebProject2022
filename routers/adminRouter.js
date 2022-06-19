const express = require('express')
const router = new express.Router()
//router.use(express.json());
const Poi = require('../models/poiModel')
const Visit = require('../models/visitModel')
const User = require('../models/user');
const FileReader = require('filereader');
var fs = require('fs');
const methodOverride = require('method-override');
const req = require('express/lib/request');
const poiTable = require('../public/starting_pois_original.json');
//const fetch = require("node-fetch")


//CREATE POI
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
})


//INSERT POIS

router.post('/poiTable', async (req, res,) => {

    for (let i = 0; i < poiTable.length; i++) {
        
        // const poiTables = JSON.parse(poiTable)
        const poi = new Poi();
        console.log(poiTable[i].coordinates)
        poi.properties.name = poiTable[i].name
        poi.properties.address = poiTable[i].address
        poi.properties.types = poiTable[i].types
        poi.properties.rating = poiTable[i].rating
        poi.properties.rating_n = poiTable[i].rating_n
        poi.type = 'Feature';
        poi.geometry.type = 'Point';
        poi.geometry.coordinates = [poiTable[i].coordinates.lng,poiTable[i].coordinates.lat];
        poi.properties.time_spent = poiTable[i].time_spent
        poi.properties.populartimes = poiTable[i].populartimes

        console.log(i);
        await poi.save();

    }
    res.send('ok')
})


//INSERT POI JSON FILE
/*router.post('/addjsonfile', async (req, res, next) => {

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
*/


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

//CREATE VISIT (and check if user is positive)

router.post('/visit', async (req, res) => {
    const visit = new Visit(req.body);
    const user = await User.findById(visit.userId);
    if (user.positive) visit.positive = true;
    else visit.positive = false;

    visit.save();
})

//Statistics queries

router.get('/statistics/active_cases', async (req, res)=>{
    const total_users = await User.count()
    const active_covid_cases = await User.aggregate([
        {$match: {positive : "positive"}},
        {$count : 'total_active_covid_cases'}
    ])

    percentage = (active_covid_cases[0].total_active_covid_cases/total_users)*100
    res.send({active_cases_percentage:percentage})
})


module.exports = router;