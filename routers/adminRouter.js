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
const { type } = require('express/lib/response');
const { isAdmin } = require('./user');
const formidable = require("formidable");
//const fetch = require("node-fetch")


//CREATE POI
router.get('/pois/new', async (req, res,) => {

    res.render('pois/new');
})


router.post('/newpoi', async (req, res) => {
    const poi = new Poi(req.body);

    poi.geometry.type = 'Point';
    poi.type = 'Feature';
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
        poi.geometry.coordinates = [poiTable[i].coordinates.lng, poiTable[i].coordinates.lat];
        poi.properties.time_spent = poiTable[i].time_spent
        poi.properties.populartimes = poiTable[i].populartimes

        console.log(i);
        await poi.save();

    }
    res.send('ok')
})

router.post('/uploadfile', async (req, res, next) => {

    try {
        let file2 = null;
        new formidable.IncomingForm().parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error', err)
                throw err
            }
            console.log('Fields', fields)
           // console.log('Files', files)
           
           
            for (const file of Object.entries(files)) {
                console.log(file)
                const data =  fs.readFileSync(file);
                const jsondata = JSON.parse(data);
                console.log(jsondata);
                res.send(jsondata)
            }
            
        })
        
        const data = await fs.readFileSync(res);
        const jsondata = JSON.parse(data);

        console.log("this is what i send", jsondata)

        for (let i = 0; i < jsondata.length; i++) {

            // const poiTables = JSON.parse(poiTable)
            const poi = new Poi();
            console.log(jsondata[i].coordinates)
            poi.properties.name = poiTable[i].name
            poi.properties.address = poiTable[i].address
            poi.properties.types = poiTable[i].types
            poi.properties.rating = poiTable[i].rating
            poi.properties.rating_n = poiTable[i].rating_n
            poi.type = 'Feature';
            poi.geometry.type = 'Point';
            poi.geometry.coordinates = [poiTable[i].coordinates.lng, poiTable[i].coordinates.lat];
            poi.properties.time_spent = poiTable[i].time_spent
            poi.properties.populartimes = poiTable[i].populartimes

            console.log(i);
            await poi.save();
        }

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


//INSERT POI JSON FILE
router.post('/uploadfile', async (req, res, next) => {

    try {
        console.log("this is res", res)


        // const data = await fs.readFileSync(res);
        // const jsondata = JSON.parse(data);

        // console.log("this is what i send", jsondata)

        // for (let i = 0; i < jsondata.length; i++) {

        //     // const poiTables = JSON.parse(poiTable)
        //     const poi = new Poi();
        //     console.log(jsondata[i].coordinates)
        //     poi.properties.name = poiTable[i].name
        //     poi.properties.address = poiTable[i].address
        //     poi.properties.types = poiTable[i].types
        //     poi.properties.rating = poiTable[i].rating
        //     poi.properties.rating_n = poiTable[i].rating_n
        //     poi.type = 'Feature';
        //     poi.geometry.type = 'Point';
        //     poi.geometry.coordinates = [poiTable[i].coordinates.lng, poiTable[i].coordinates.lat];
        //     poi.properties.time_spent = poiTable[i].time_spent
        //     poi.properties.populartimes = poiTable[i].populartimes

        //     console.log(i);
        //     await poi.save();
        // }

        // Poi.insertMany(jsondata).then(() => {
        //     res.send('success')
        // }).catch((e) => {
        //     res.send(e)
        // });
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

//CREATE VISIT (and check if user is positive)

router.post('/visit', async (req, res) => {
    const visit = new Visit(req.body);
    const user = await User.findById(visit.userId);
    if (user.positive) visit.positive = true;
    else visit.positive = false;

    visit.save();
})

//Statistics queries

//query: total number of visits.
router.get('/statistics/total_visits', async (req, res) => {
    const total_visits = await Visit.count();

    res.render('chart2', { visits: total_visits });
})

//query: total number of active covid cases.
router.get('/statistics/active', async (req, res) => {
    //query: total active covid cases.
    const total_users = await User.count();
    const active_covid_cases = await User.aggregate([
        { $match: { positive: "positive" } },
        { $count: 'total_active_covid_cases' }
    ])
    res.render('chart1', { users: total_users, active: active_covid_cases[0].total_active_covid_cases });
});

//query: total vists of covid infected people.
router.get('/statistics/covid_visits', async (req, res) => {
    const positive_users = await User.find({ positive: "positive" })

    for (let user of positive_users) {
        //Calculate the dates before 7 day of covid diagnosis and after 14 days of covid diagnosis
        const date_before_7_days = new Date(user.positive_datetime);
        date_before_7_days.setDate(date_before_7_days.getDate() - 7);
        const date_after_14_days = new Date(user.positive_datetime);
        date_after_14_days.setDate(date_after_14_days.getDate() + 14);
        //Count the positive visits the specified interval
        const user_visits = await Visit.aggregate([
            { $match: { $and: [{ userId: user.id }, { positive: "positive" }] } },
            { $match: { createdAt: { $gte: date_before_7_days, $lt: date_after_14_days } } },
            { $group: { _id: null, myCount: { $sum: 1 } } },
            { $project: { _id: 0 } }
        ])
        //In case that a user is positive but has no visits.
        if (user_visits.length > 0) {
            var total = [];
            total.push(user_visits[0].myCount)
        }

    }
    res.render('chart5', { total })
})

//query: pois classification based on type and number of visits
router.get('/statistics/type_classification', async (req, res) => {
    //Find all the pois types that exist in our DB.
    const all_types = await Poi.aggregate([
        {
            $group: {
                "_id": "",
                "type": {
                    $push: "$properties.types"
                }
            }
        },
        { $project: { "type": 1, "_id": 0 } }
    ])
    unified_array = all_types[0].type.join(",").split(",");

    const poi_types = [...new Set(unified_array)];

    const dictionary = {};
    const visits = await Visit.find();

    for (let visit of visits) {
        var poi_type = await Poi.aggregate([
            { $match: { "properties.name": visit.poiName } },
            { $unwind: "$properties.types" },
        ])
        for (let type of poi_type) {
            if (Object.hasOwn(dictionary, type.properties.types)) {
                dictionary[type.properties.types]++
            } else {
                dictionary[type.properties.types] = 0;
                dictionary[type.properties.types]++
            }
        }

    }
    //res.send(dictionary)
    array = Object.keys(dictionary)
    values = Object.values(dictionary)
    console.log(array)
    res.render('chart3', { array, values })
})

//query : e
router.get('/statistics/type_classification_cases', async (req, res) => {
    const positive_users = await User.find({ positive: "positive" })

    const dictionary = {};

    for (let user of positive_users) {
        //Calculate the dates before 7 day of covid diagnosis and after 14 days of covid diagnosis
        const date_before_7_days = new Date(user.positive_datetime);
        date_before_7_days.setDate(date_before_7_days.getDate() - 7);
        const date_after_14_days = new Date(user.positive_datetime);
        date_after_14_days.setDate(date_after_14_days.getDate() + 14);

        const user_visits = await Visit.aggregate([
            { $match: { $and: [{ userId: user.id }, { positive: "positive" }] } },
            { $match: { createdAt: { $gte: date_before_7_days, $lt: date_after_14_days } } }
        ])

        for (let visit of user_visits) {
            var poi_type = await Poi.aggregate([
                { $match: { "properties.name": visit.poiName } },
                { $unwind: "$properties.types" },
            ])
            for (let type of poi_type) {
                if (Object.hasOwn(dictionary, type.properties.types)) {
                    dictionary[type.properties.types]++
                } else {
                    dictionary[type.properties.types] = 0;
                    dictionary[type.properties.types]++
                }
            }
        }

    }
    //res.send(dictionary)
    array = Object.keys(dictionary)
    values = Object.values(dictionary)
    console.log(dictionary)
    res.render('chart4', { array, values })
})


module.exports = router;